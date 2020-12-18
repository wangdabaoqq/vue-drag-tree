<template>
  <div
    v-show="node.visible"
    ref="node"
    class="org-tree-node"
    :class="{
      collapsed: !expanded,
      'is-hidden': !node.visible,
      'is-checked': !node.disabled && node.checked,
      'is-leaf': expanded
    }"
    role="treeitem"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :aria-checked="node.checked"
    :draggable="tree.draggable"
    @contextmenu="($event) => this.handleContextMenu($event)"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop"
  >
    <div class="org-tree-node-label">
      <!-- <span @click.prevent.stop="toggle" :class="['org-tree-node-btn', { 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded }]" v-if="node.children &&  node.children.length > 0"></span> -->
      <span
        v-if="node.childNodes && node.childNodes.length > 0"
        :class="[
          'org-tree-node-btn',
          { 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded },
          'org-tree-node__expand-icon'
        ]"
        @click.stop="handleExpandIconClick"
      />
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
        class="org-tree-node__loading-icon el-icon-loading"
      />
      <node-content :node="node" />
    </div>
    <!-- <el-collapse-transition> -->
    <div
      v-if="(!renderAfterExpand || childNodeRendered) && node.childNodes.length > 0"
      v-show="expanded"
      class="org-tree-node-children"
      role="group"
      :aria-expanded="expanded"
    >
      <tree-node
        v-for="child in node.childNodes"
        :key="getNodeKey(child)"
        :render-content="renderContent"
        :render-after-expand="renderAfterExpand"
        :show-checkbox="showCheckbox"
        :node="child"
        @node-expand="handleChildNodeExpand"
      />
    </div>
    <!-- </el-collapse-transition> -->
  </div>
</template>

<script type="text/jsx">
// import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition';
// import ElCheckbox from 'element-ui/packages/checkbox';
import emitter from '../model/emiter'
import { getNodeKey } from '../model/util'

export default {
  name: 'TreeNode',

  componentName: 'TreeNode',

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
        const parent = this.$parent
        const tree = parent.tree
        const node = this.node
        const { data, store } = node
        return (
          parent.renderContent
            ? parent.renderContent.call(parent._renderProxy, h, { _self: tree.$vnode.context, node, data, store })
            : tree.$scopedSlots.default
              ? tree.$scopedSlots.default({ node, data })
              : '111'
        )
      }
    }
  },

  mixins: [emitter],

  props: {
    node: {
      default() {
        return {}
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

  data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      oldChecked: null,
      oldIndeterminate: null
    }
  },

  watch: {
    'node.indeterminate'(val) {
      this.handleSelectChange(this.node.checked, val)
    },

    'node.checked'(val) {
      this.handleSelectChange(val, this.node.indeterminate)
    },

    'node.expanded'(val) {
      console.log(this.node.expanded, this.node)
      this.$nextTick(() => this.expanded = val)
      if (val) {
        this.childNodeRendered = true
      }
    }
  },

  created() {
    const parent = this.$parent

    if (parent.isTree) {
      this.tree = parent
    } else {
      this.tree = parent.tree
    }

    const tree = this.tree
    if (!tree) {
      console.warn('Can not find node\'s tree.')
    }

    const props = tree.props || {}
    const childrenKey = props['children'] || 'children'

    this.$watch(`node.data.${childrenKey}`, () => {
      this.node.updateChildren()
    })

    if (this.node.expanded) {
      this.expanded = true
      this.childNodeRendered = true
    }

    if (this.tree.accordion) {
      this.$on('tree-node-expand', node => {
        if (this.node !== node) {
          this.node.collapse()
        }
      })
    }
  },

  methods: {
    getNodeKey(node) {
      return getNodeKey(this.tree.nodeKey, node.data)
    },

    handleSelectChange(checked, indeterminate) {
      if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
        this.tree.$emit('check-change', this.node.data, checked, indeterminate)
      }
      this.oldChecked = checked
      this.indeterminate = indeterminate
    },

    handleClick() {
      const store = this.tree.store
      store.setCurrentNode(this.node)
      this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode)
      this.tree.currentNode = this
      if (this.tree.expandOnClickNode) {
        this.handleExpandIconClick()
      }
      if (this.tree.checkOnClickNode && !this.node.disabled) {
        this.handleCheckChange(null, {
          target: { checked: !this.node.checked }
        })
      }
      this.tree.$emit('node-click', this.node.data, this.node, this)
    },

    handleContextMenu(event) {
      if (this.tree._events['node-contextmenu'] && this.tree._events['node-contextmenu'].length > 0) {
        event.stopPropagation()
        event.preventDefault()
      }
      this.tree.$emit('node-contextmenu', event, this.node.data, this.node, this)
    },

    handleExpandIconClick() {
      if (this.node.isLeaf) return
      if (this.expanded) {
        this.tree.$emit('node-collapse', this.node.data, this.node, this)
        this.node.collapse()
      } else {
        this.node.expand()
        this.$emit('node-expand', this.node.data, this.node, this)
      }
    },

    handleCheckChange(value, ev) {
      this.node.setChecked(ev.target.checked, !this.tree.checkStrictly)
      this.$nextTick(() => {
        const store = this.tree.store
        this.tree.$emit('check', this.node.data, {
          checkedNodes: store.getCheckedNodes(),
          checkedKeys: store.getCheckedKeys(),
          halfCheckedNodes: store.getHalfCheckedNodes(),
          halfCheckedKeys: store.getHalfCheckedKeys()
        })
      })
    },

    handleChildNodeExpand(nodeData, node, instance) {
      this.broadcast('TreeNode', 'tree-node-expand', node)
      this.tree.$emit('node-expand', nodeData, node, instance)
    },

    handleDragStart(event) {
      if (!this.tree.draggable) return
      this.tree.$emit('tree-node-drag-start', event, this)
    },

    handleDragOver(event) {
      if (!this.tree.draggable) return
      this.tree.$emit('tree-node-drag-over', event, this)
      event.preventDefault()
    },

    handleDrop(event) {
      event.preventDefault()
    },

    handleDragEnd(event) {
      if (!this.tree.draggable) return
      this.tree.$emit('tree-node-drag-end', event, this)
    }
  }
}
</script>
<style lang="stylus">
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
    content: '';
    display: table;
  }

  &:after {
    clear: both;
  }
}

.org-tree-node,
.org-tree-node-children {
  position: relative;
  margin: 0;
  padding: 0;
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
  width: 20px;
  height: 20px;
  z-index: 10;
  margin-left: -11px;
  margin-top: 9px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, .15);
  cursor: pointer;
  transition: all .35s ease;

  &:hover {
    background-color: #e7e8e9;
    transform: scale(1.15);
  }

  &:before, &:after {
    content: '';
    position: absolute;
  }

  &:before {
    top: 50%;
    left: 4px;
    right: 4px;
    height: 0;
    border-top: 1px solid #ccc;
  }

  &:after {
    top: 4px;
    left: 50%;
    bottom: 4px;
    width: 0;
    border-left: 1px solid #ccc;
  }

  &.expanded:after {
    border: none;
  }
}
.org-tree-node-children {
  .org-tree-node {
    padding-top: 20px;
    display: table-cell;
    vertical-align: top;

    &.is-leaf, &.collapsed {
      padding-left: 10px;
      padding-right: 10px;
    }

    &:before, &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 19px;
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
}
.org-tree-node-children {
  .org-tree-node.collapsed {
    padding-bottom: 30px;

    .org-tree-node-label:after {
          content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 50%;
    height: 20px;
    // border-right: 1px solid #ddd;
      // content: '';
      // position: absolute;
      // top: 0;
      // left: 100%;
      // width: 20px;
      // height: 20px;
      // border-bottom: 1px solid #ddd;
    }
  }
}
.org-tree > .org-tree-node {
  padding-top: 0;

  &:after {
    border-left: 0;
  }
}
.org-tree-node-children {
  padding-top: 20px;
  display: table;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 20px;
    border-left: 1px solid #ddd;
  }

  &:after {
    content: '';
    display: table;
    clear: both;
  }
}

.horizontal {
  .org-tree-node-children {
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
        padding-top: 10px;
        padding-bottom: 10px;
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
      // &:first-child:after {
      //   border none
      // }
      //  &:first-child:before {
      //   border none
      // }
      &:not(:only-child):after {
        border-top: 1px solid #ddd;
      }

      .org-tree-node-inner {
        display: table;
      }
    }
  }

  .org-tree-node-label {
    display: table-cell;
    vertical-align: middle;
  }

 .org-tree-node-children .org-tree-node.collapsed {
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

  & > .org-tree-node:only-child:before {
    border-bottom: 0;
  }

  .org-tree-node-children {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: flex-start;
    display: table-cell;
    padding-top: 0;
    padding-left: 20px;

    &:before {
      top: 50%;
      left: 0;
      width: 20px;
      height: 0;
      border-left: 0;
      border-top: 1px solid #ddd;
    }

    &:after {
      display: none;
    }

    & > .org-tree-node {
      display: block;
    }
  }
}
</style>
