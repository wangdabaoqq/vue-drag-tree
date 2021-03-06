<template>
  <div
    v-show="node.visible"
    ref="node"
    class="org-tree-node"
    :class="{
      collapsed: !expanded,
      'is-hidden': !node.visible,
      'is-leaf': expanded,
    }"
    :draggable="tree.draggable"
    @contextmenu="($event) => this.handleContextMenu($event)"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop"
  >
    <div
      ref="nodelabel"
      class="org-tree-node-label"
    >
      <node-icon
        v-if="node.childNodes && node.childNodes.length > 0"
        :node="node"
      />
      <node-content :node="node" />
    </div>
    <div
      v-if="expanded && (!renderAfterExpand || childNodeRendered) && node.childNodes.length > 0"
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
  </div>
</template>

<script>
// import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition';
// import ElCheckbox from 'element-ui/packages/checkbox';
// import emitter from '../model/emiter'
import { getNodeKey } from '../model/util'
import NodeContent from './node-content'
import NodeIcon from './node-icon'
export default {
  name: 'TreeNode',

  componentName: 'TreeNode',

  components: {
    // ElCollapseTransition,
    // ElCheckbox,
    NodeContent,
    NodeIcon
  },

  // mixins: [emitter],

  props: {
    node: {
      type: Object,
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
      this.$nextTick(() => {
        this.expanded = val
      })
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
      console.warn("Can not find node's tree.")
    }

    const props = tree.props || {}
    const childrenKey = props['children'] || 'children'
    // console.log(`node.data.${childrenKey}`)
    this.$watch(`node.data.${childrenKey}`, (val) => {
      console.log(val, 11)
      this.node.updateChildren()
    })
    if (this.node.expanded) {
      this.expanded = true
      this.childNodeRendered = true
    }

    if (this.tree.accordion) {
      this.$on('tree-node-expand', (node) => {
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

    // handleClick() {
    //   const store = this.tree.store
    //   store.setCurrentNode(this.node)
    //   this.tree.$emit(
    //     'current-change',
    //     store.currentNode ? store.currentNode.data : null,
    //     store.currentNode
    //   )
    //   this.tree.currentNode = this
    //   if (this.tree.expandOnClickNode) {
    //     this.handleExpandIconClick()
    //   }
    //   // if (!this.node.disabled) {
    //   //   this.handleCheckChange(null, {
    //   //     target: { checked: !this.node.checked }
    //   //   })
    //   // }
    //   this.tree.$emit('node-click', this.node.data, this.node, this)
    // },

    handleContextMenu(event) {
      if (
        this.tree._events['node-contextmenu'] &&
        this.tree._events['node-contextmenu'].length > 0
      ) {
        event.stopPropagation()
        event.preventDefault()
      }
      this.tree.$emit('node-contextmenu', event, this.node.data, this.node, this)
    },

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
