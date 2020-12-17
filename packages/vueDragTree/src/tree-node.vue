<template>
  <div
    class="org-tree-node"
    @contextmenu="($event) => this.handleContextMenu($event)"
    v-show="node.visible"
    :class="{
      'collapsed': !expanded,
      'is-hidden': !node.visible,
      'is-checked': !node.disabled && node.checked,
      'is-leaf': node.isLeaf
    }"
    role="treeitem"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :aria-checked="node.checked"
    :draggable="tree.draggable"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop"
    ref="node"
  >
    <div class="org-tree-node-label"
     >
      <!-- <span @click.prevent.stop="toggle" :class="['org-tree-node-btn', { 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded }]" v-if="node.children &&  node.children.length > 0"></span> -->
      <span
       @click.stop="handleExpandIconClick"
        v-if="node.childNodes &&  node.childNodes.length > 0"
        :class="[
        'org-tree-node-btn',
          { 'is-leaf': node.isLeaf, 'expanded': !node.isLeaf && expanded },
          'org-tree-node__expand-icon'
        ]"
      >
      </span>
      <!-- <el-checkbox
        v-if="showCheckbox"
        v-model="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="!!node.disabled"
        @click.native.stop
        @change="handleCheckChange"
      >
      </el-checkbox> -->
      <span
        v-if="node.loading"
        class="org-tree-node__loading-icon el-icon-loading">
      </span>
      <node-content :node="node"></node-content>
    </div>
    <!-- <el-collapse-transition> -->
      <div
        class="org-tree-node-children"
        v-if="(!renderAfterExpand || childNodeRendered) && node.childNodes.length > 0"
        v-show="expanded"
        role="group"
        :aria-expanded="expanded"
      >
        <el-tree-node
          :render-content="renderContent"
          v-for="child in node.childNodes"
          :render-after-expand="renderAfterExpand"
          :show-checkbox="showCheckbox"
          :key="getNodeKey(child)"
          :node="child"
          @node-expand="handleChildNodeExpand">
        </el-tree-node>
      </div>
    <!-- </el-collapse-transition> -->
  </div>
</template>

<script type="text/jsx">
  // import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition';
  // import ElCheckbox from 'element-ui/packages/checkbox';
  import emitter from '../model/emiter';
  import { getNodeKey } from '../model/util';

  export default {
    name: 'ElTreeNode',

    componentName: 'ElTreeNode',

    mixins: [emitter],

    props: {
      node: {
        default() {
          return {};
        }
      },
      props: {},
      renderContent: Function,
      renderAfterExpand: {
        type: Boolean,
        default: true
      },
      showCheckbox: {
        type: Boolean,
        default: false
      }
    },

    components: {
      // ElCollapseTransition,
      // ElCheckbox,
      NodeContent: {
        props: {
          node: {
            required: true
          }
        },
        render(h) {
          const parent = this.$parent;
          const tree = parent.tree;
          const node = this.node;
          const { data, store } = node;
          return (
            parent.renderContent
              ? parent.renderContent.call(parent._renderProxy, h, { _self: tree.$vnode.context, node, data, store })
              : tree.$scopedSlots.default
                ? tree.$scopedSlots.default({ node, data })
                : '111'
          );
        }
      }
    },

    data() {
      return {
        tree: null,
        expanded: false,
        childNodeRendered: false,
        oldChecked: null,
        oldIndeterminate: null
      };
    },

    watch: {
      'node.indeterminate'(val) {
        this.handleSelectChange(this.node.checked, val);
      },

      'node.checked'(val) {
        this.handleSelectChange(val, this.node.indeterminate);
      },

      'node.expanded'(val) {
        this.$nextTick(() => this.expanded = val);
        if (val) {
          this.childNodeRendered = true;
        }
      }
    },

    methods: {
      getNodeKey(node) {
        return getNodeKey(this.tree.nodeKey, node.data);
      },

      handleSelectChange(checked, indeterminate) {
        if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
          this.tree.$emit('check-change', this.node.data, checked, indeterminate);
        }
        this.oldChecked = checked;
        this.indeterminate = indeterminate;
      },

      handleClick() {
        const store = this.tree.store;
        store.setCurrentNode(this.node);
        this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode);
        this.tree.currentNode = this;
        if (this.tree.expandOnClickNode) {
          this.handleExpandIconClick();
        }
        if (this.tree.checkOnClickNode && !this.node.disabled) {
          this.handleCheckChange(null, {
            target: { checked: !this.node.checked }
          });
        }
        this.tree.$emit('node-click', this.node.data, this.node, this);
      },

      handleContextMenu(event) {
        if (this.tree._events['node-contextmenu'] && this.tree._events['node-contextmenu'].length > 0) {
          event.stopPropagation();
          event.preventDefault();
        }
        this.tree.$emit('node-contextmenu', event, this.node.data, this.node, this);
      },

      handleExpandIconClick() {
        if (this.node.isLeaf) return;
        if (this.expanded) {
          this.tree.$emit('node-collapse', this.node.data, this.node, this);
          this.node.collapse();
        } else {
          this.node.expand();
          this.$emit('node-expand', this.node.data, this.node, this);
        }
      },

      handleCheckChange(value, ev) {
        this.node.setChecked(ev.target.checked, !this.tree.checkStrictly);
        this.$nextTick(() => {
          const store = this.tree.store;
          this.tree.$emit('check', this.node.data, {
            checkedNodes: store.getCheckedNodes(),
            checkedKeys: store.getCheckedKeys(),
            halfCheckedNodes: store.getHalfCheckedNodes(),
            halfCheckedKeys: store.getHalfCheckedKeys(),
          });
        });
      },

      handleChildNodeExpand(nodeData, node, instance) {
        this.broadcast('ElTreeNode', 'tree-node-expand', node);
        this.tree.$emit('node-expand', nodeData, node, instance);
      },

      handleDragStart(event) {
        if (!this.tree.draggable) return;
        this.tree.$emit('tree-node-drag-start', event, this);
      },

      handleDragOver(event) {
        if (!this.tree.draggable) return;
        this.tree.$emit('tree-node-drag-over', event, this);
        event.preventDefault();
      },

      handleDrop(event) {
        event.preventDefault();
      },

      handleDragEnd(event) {
        if (!this.tree.draggable) return;
        this.tree.$emit('tree-node-drag-end', event, this);
      }
    },

    created() {
      console.log(111)
      const parent = this.$parent;

      if (parent.isTree) {
        this.tree = parent;
      } else {
        this.tree = parent.tree;
      }

      const tree = this.tree;
      if (!tree) {
        console.warn('Can not find node\'s tree.');
      }

      const props = tree.props || {};
      const childrenKey = props['children'] || 'children';

      this.$watch(`node.data.${childrenKey}`, () => {
        this.node.updateChildren();
      });

      if (this.node.expanded) {
        this.expanded = true;
        this.childNodeRendered = true;
      }

      if(this.tree.accordion) {
        this.$on('tree-node-expand', node => {
          if(this.node !== node) {
            this.node.collapse();
          }
        });
      }
    }
  };
</script>
<style lang="stylus">
.org-tree-node.is-drop-inner >.org-tree-node-label .org-tree-node-label-inner {
  color: #606266;
  background-color: #ccc;
}
.org-tree-container {
  display: inline-block;
  padding: 15px;
  background-color: #fff;
}
.org-tree {
  // display: inline-block;
  display: table;
  text-align: center;

  &:before, &:after {
    display: table;
    content: '';
  }

  &:after {
    clear: both;
  }
}

.org-tree-node,
.org-tree-node-children {
  position: relative;
  padding: 0;
  margin: 0;
  list-style-type: none;

  &:before, &:after {
    transition: all .35s;
  }
}
.org-tree-node-label {
  position: relative;
  display: inline-block;

  .org-tree-node-label-inner {
    padding: 10px 15px;
    text-align: center;
    border-radius: 3px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .15);
  }
}
.org-tree-node-btn {
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 10;
  width: 20px;
  height: 20px;
  margin-top: 9px;
  margin-left: -11px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, .15);
  transition: all .35s ease;

  &:hover {
    background-color: #e7e8e9;
    transform: scale(1.15);
  }

  &:before, &:after {
    position: absolute;
    content: '';
  }

  &:before {
    top: 50%;
    right: 4px;
    left: 4px;
    height: 0;
    border-top: 1px solid #ccc;
  }

  &:after {
    top: 4px;
    bottom: 4px;
    left: 50%;
    width: 0;
    border-left: 1px solid #ccc;
  }

  &.expanded:after {
    border: none;
  }
}
.org-tree-node {
  display: table-cell;
  padding-top: 20px;
  vertical-align: top;

  &.is-leaf, &.collapsed {
    padding-right: 10px;
    padding-left: 10px;
  }

  &:before, &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 19px;
    content: '';
  }
  &:after {
    left: 50%;
    border-left: 1px solid #ddd;
  }

  &:not(:first-child):before,
  &:not(:last-child):after {
    border-top: 1px solid #ddd;
  }
}

.collapsable .org-tree-node.collapsed {
  padding-bottom: 30px;

  .org-tree-node-label:after {
    position: absolute;
    top: 100%;
    left: 0;
    width: 50%;
    height: 20px;
    content: '';
    // border-right: 1px solid #ddd;border-rightborder-right
  }
}
.org-tree > .org-tree-node {
  padding-top: 0;

  &:after {
    border-left: 0;
  }
}

.org-tree-node-children {
  display: table;
  padding-top: 20px;

  &:before {
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 20px;
    border-left: 1px solid #ddd;
    content: '';
  }

  &:after {
    display: table;
    clear: both;
    content: '';
  }
}

.horizontal {
  .org-tree-node {
    // display: flex;
    // flex-direction: row;
    // justify-content: flex-start;
    // align-items: center;
    display: table-cell;
    float: none;
    padding-top: 0;
    padding-left: 20px;

    &.is-leaf, &.collapsed {
      padding-top: 20px;
      padding-bottom: 20px;
    }
    &.:only-child:before {
     border-bottom: 0;
    }
    &:before, &:after {
      width: 19px;
      height: 50%;
    }

    &:after {
      top: 50%;
      left: 0;
      border-left: 0;
    }

    &:only-child:before {
      top: 1px;
      border-bottom: 1px solid #ddd;
    }

    &:not(:first-child):before,
    &:not(:last-child):after {
      border-top: 0;
      border-left: 1px solid #ddd;
    }

    &:not(:only-child):after {
      border-top: 1px solid #ddd;
    }

    .org-tree-node-inner {
      display: table;
    }
  }

  .org-tree-node-label {
    display: table-cell;
    vertical-align: middle;
  }

  .org-tree-node-children.org-tree-node.is-leaf {
    padding-right: 30px;

    .org-tree-node-label:after {
      top: 0;
      left: 100%;
      width: 20px;
      height: 50%;
      border-right: 0;
      border-bottom: 0;
    }
  }
  .org-tree-node.is-leaf {
    padding-right: 30px;

    .org-tree-node-label:after {
      top: 0;
      left: 100%;
      width: 20px;
      height: 50%;
      border-right: 0;
      border-bottom: 1px solid #ddd;
    }
  }

  .org-tree-node-btn {
    top: 50%;
    left: 100%;
    margin-top: -11px;
    margin-left: 9px;
  }

  .org-tree-node-children {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    display: table-cell;
    padding-top: 0;
    padding-left: 20px;

    &:before {
      top: 50%;
      left: 0;
      width: 20px;
      height: 0;
      border-top: 1px solid #ddd;
      border-left: 0;
    }

    &:after {
      display: none;
    }

    & > .org-tree-node {
      display: block;
    }
  }
}
.horizontal > .org-tree-node:only-child::before{
  border-bottom 0
}
</style>
