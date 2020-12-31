<template>
  <div
    v-show="node.visible"
    ref="node"
    class="org-tree-node"
    :class="{
      collapsed:!expanded,
      'is-hidden': !node.visible,
      'is-leaf': expanded
    }"
    role="treeitem"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :draggable="tree.draggable"
    @contextmenu="($event) => this.handleContextMenu($event)"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop"
  >
    <div class="org-tree-node-label" ref="nodelabel" @click="handleClick">
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
      <!-- <span
        v-if="node.loading"
        class="org-tree-node__loading-icon el-icon-loading"
      /> -->
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
        :node="child"
        @node-expand="handleChildNodeExpand"
      />
    </div>
    <!-- </el-collapse-transition> -->
  </div>
</template>

<script>
// import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition';
// import ElCheckbox from 'element-ui/packages/checkbox';
import emitter from '../model/emiter'
import { getNodeKey } from '../model/util'
import NodeContent from './node-content'
export default {
  name: 'TreeNode',

  componentName: 'TreeNode',

  components: {
    // ElCollapseTransition,
    // ElCheckbox,
    NodeContent
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
    }
  },

  data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      leaf: false
      // oldChecked: null,
      // oldIndeterminate: null
    }
  },

  watch: {
    'node.expanded'(val) {
      console.log(this.node.expanded, this.node, val)
      this.$nextTick(() => {
        this.expanded = val
        // this.expanded =
        // if (val) {
        //   this.expanded = false
        // } else {
        //   this.expanded = true
        // }
        // if (val && this.node.childNodes.length > 0) {
        //   this.expanded = false
        // } else {
        //   console.log(this.node.childNodes)
        //   this.expanded = true
        // }
      })
      if (val) {
        this.childNodeRendered = true
      }
      // if (this.node.childNodes && this.node.childNodes.length > 0) {
      //   this.leaf = false
      // } else {
      //   this.leaf = true
      // }
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
      console.log('extendsextends')
      this.expanded = true
      this.childNodeRendered = true
    }

    if (this.tree.accordion) {
      this.$on('tree-node-expand', node => {
        // console.log(this.node, node)
        if (this.node !== node && this.node.childNodes.length > 0) {
          this.node.collapse()
        }
      })
    }
  },

  methods: {
    getNodeKey(node) {
      return getNodeKey(this.tree.nodeKey, node.data)
    },

    // handleSelectChange(checked, indeterminate) {
    //   if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
    //     this.tree.$emit('check-change', this.node.data, checked, indeterminate)
    //   }
    //   this.oldChecked = checked
    //   this.indeterminate = indeterminate
    // },

    handleClick() {
      const store = this.tree.store
      store.setCurrentNode(this.node)
      this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode)
      this.tree.currentNode = this
      if (this.tree.expandOnClickNode) {
        this.handleExpandIconClick()
      }
      // if (this.tree.checkOnClickNode && !this.node.disabled) {
      //   this.handleCheckChange(null, {
      //     target: { checked: !this.node.checked }
      //   })
      // }
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
        console.log(1233)
        this.tree.$emit('node-collapse', this.node.data, this.node, this)
        this.node.collapse()
      } else {
        this.node.expand()
        console.log(789, this.node.data)
        this.$emit('node-expand', this.node.data, this.node, this)
      }
    },

    // handleCheckChange(value, ev) {
    //   this.node.setChecked(ev.target.checked, !this.tree.checkStrictly)
    //   this.$nextTick(() => {
    //     const store = this.tree.store
    //     this.tree.$emit('check', this.node.data, {
    //       checkedNodes: store.getCheckedNodes(),
    //       checkedKeys: store.getCheckedKeys(),
    //       halfCheckedNodes: store.getHalfCheckedNodes(),
    //       halfCheckedKeys: store.getHalfCheckedKeys()
    //     })
    //   })
    // },

    handleChildNodeExpand(nodeData, node, instance) {
      this.broadcast('TreeNode', 'tree-node-expand', node)
      this.tree.$emit('node-expand', nodeData, node, instance)
    },

    handleDragStart(event) {
      if (!this.tree.draggable) return
      console.log(event)
      this.tree.$emit('tree-node-drag-start', event, this)
    },

    handleDragOver(event) {
      if (!this.tree.draggable) return
      console.log(event)
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
