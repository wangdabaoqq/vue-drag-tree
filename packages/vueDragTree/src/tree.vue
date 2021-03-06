<template>
<div class="org-tree-container">
  <div
    class="org-tree"
    :class="[
      {
        'el-tree--highlight-current': highlightCurrent,
        'is-dragging': !!dragState.draggingNode,
        'is-drop-not-allow': dragState.allowDrop,
      },
      direction
    ]"
  >
    <tree-node
      v-for="child in root.childNodes"
      :key="getNodeKey(child)"
      :node="child"
      :props="props"
      :render-after-expand="renderAfterExpand"
      :render-content="renderContent"
      @node-expand="handleNodeExpand"
    />
    <div
      v-if="isEmpty"
      class="el-tree-node__empty-block"
    >
      <span class="el-tree-node__empty-text">{{ emptyText }}</span>
    </div>
  </div>
</div>
</template>

<script>
import TreeStore from '../model/tree-store'
import { getNodeKey, findNearestComponent, addClass, removeClass } from '../model/util'
import TreeNode from './tree-node.vue'
// import {t} from 'element-ui/src/locale';
import emitter from '../model/emiter'

export default {
  name: 'VueDragTreeOrg',

  components: {
    TreeNode
  },

  mixins: [emitter],

  props: {
    data: {
      type: Array
    },
    direction: {
      type: String,
      default: () => {
        return ''
      }
    },
    emptyText: {
      type: String,
      default() {
        return ''
      }
    },
    renderAfterExpand: {
      type: Boolean,
      default: true
    },
    nodeKey: String,
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    // checkOnClickNode: Boolean,
    checkDescendants: {
      type: Boolean,
      default: false
    },
    autoExpandParent: {
      type: Boolean,
      default: true
    },
    // defaultCheckedKeys: Array,
    defaultExpandedKeys: Array,
    currentNodeKey: [String, Number],
    renderContent: Function,
    // showCheckbox: {
    //   type: Boolean,
    //   default: false
    // },
    draggable: {
      type: Boolean,
      default: false
    },
    allowDrag: Function,
    allowDrop: Function,
    props: {
      default() {
        return {
          children: 'children',
          label: 'label'
        }
      }
    },
    // lazy: {
    //   type: Boolean,
    //   default: false
    // },
    highlightCurrent: Boolean,
    // load: Function,
    // filterNodeMethod: Function,
    accordion: Boolean,
    // indent: {
    //   type: Number,
    //   default: 18
    // },
    iconClass: String
  },

  data() {
    return {
      store: null,
      root: null,
      currentNode: null,
      treeItems: null,
      checkboxItems: [],
      dragState: {
        // showDropIndicator: false,
        draggingNode: null,
        dropNode: null,
        allowDrop: true
      }
    }
  },

  computed: {
    children: {
      set(value) {
        this.data = value
      },
      get() {
        return this.data
      }
    },

    treeItemArray() {
      return Array.prototype.slice.call(this.treeItems)
    },

    isEmpty() {
      const { childNodes } = this.root
      return !childNodes || childNodes.length === 0 || childNodes.every(({ visible }) => !visible)
    }
  },

  watch: {
    // defaultCheckedKeys(newVal) {
    //   this.store.setDefaultCheckedKey(newVal)
    // }
    defaultExpandedKeys(newVal) {
      this.store.defaultExpandedKeys = newVal
      this.store.setDefaultExpandedKeys(newVal)
    },

    data(newVal) {
      this.store.setData(newVal)
    },

    checkboxItems(val) {
      Array.prototype.forEach.call(val, (checkbox) => {
        checkbox.setAttribute('tabindex', -1)
      })
    }
  },

  created() {
    this.isTree = true
    this.store = new TreeStore({
      key: this.nodeKey,
      data: this.data,
      // lazy: this.lazy,
      props: this.props,
      // load: this.load,
      currentNodeKey: this.currentNodeKey,
      // checkDescendants: this.checkDescendants,
      // defaultCheckedKeys: this.defaultCheckedKeys,
      defaultExpandedKeys: this.defaultExpandedKeys,
      autoExpandParent: this.autoExpandParent,
      defaultExpandAll: this.defaultExpandAll
      // filterNodeMethod: this.filterNodeMethod
    })

    this.root = this.store.root

    let dragState = this.dragState
    this.$on('tree-node-drag-start', (event, treeNode) => {
      if (typeof this.allowDrag === 'function' && !this.allowDrag(treeNode.node)) {
        event.preventDefault()
        return false
      }
      event.dataTransfer.effectAllowed = 'move'

      // wrap in try catch to address IE's error when first param is 'text/plain'
      try {
        // setData is required for draggable to work in FireFox
        // the content has to be '' so dragging a node out of the tree won't open a new tab in FireFox
        event.dataTransfer.setData('text/plain', '')
      } catch (e) {}
      dragState.draggingNode = treeNode
      this.$emit('node-drag-start', treeNode.node, event)
    })
    this.$on('tree-node-drag-over', (event, treeNode) => {
      const dropNode = findNearestComponent(event.target, 'TreeNode')
      // console.log(dropNode, dragState, 1111)
      const oldDropNode = dragState.dropNode
      if (oldDropNode && oldDropNode !== dropNode) {
        removeClass(oldDropNode.$refs.nodelabel, 'is-drop-inner')
      }
      const draggingNode = dragState.draggingNode
      if (!draggingNode || !dropNode) return

      let dropPrev = true
      let dropInner = true
      let dropNext = true
      let userAllowDropInner = true
      if (typeof this.allowDrop === 'function') {
        dropPrev = this.allowDrop(draggingNode.node, dropNode.node, 'prev')
        userAllowDropInner = dropInner = this.allowDrop(draggingNode.node, dropNode.node, 'inner')
        dropNext = this.allowDrop(draggingNode.node, dropNode.node, 'next')
      }
      event.dataTransfer.dropEffect = dropInner ? 'move' : 'none'
      console.log(dropNode.node, draggingNode.node)
      if ((dropPrev || dropInner || dropNext) && oldDropNode !== dropNode) {
        if (oldDropNode) {
          this.$emit('node-drag-leave', draggingNode.node, oldDropNode.node, event)
        }
        this.$emit('node-drag-enter', draggingNode.node, dropNode.node, event)
      }

      if (dropPrev || dropInner || dropNext) {
        dragState.dropNode = dropNode
      }

      if (dropNode.node.nextSibling === draggingNode.node) {
        dropNext = false
      }
      console.log(dropNode.node.previousSibling)
      if (dropNode.node.previousSibling === draggingNode.node) {
        dropPrev = false
      }
      if (dropNode.node.contains(draggingNode.node, false)) {
        dropInner = false
      }
      if (draggingNode.node === dropNode.node || draggingNode.node.contains(dropNode.node)) {
        dropPrev = false
        dropInner = false
        dropNext = false
      }

      const targetPosition = dropNode.$refs.nodelabel.getBoundingClientRect()
      // const treePosition = this.$el.getBoundingClientRect()
      // console.log(targetPosition)
      let dropType
      const prevPercent = dropPrev ? (dropInner ? 0.25 : dropNext ? 0.45 : 1) : -1
      const nextPercent = dropNext ? (dropInner ? 0.75 : dropPrev ? 0.55 : 0) : 1
      // let indicatorTop = -9999
      const distance = event.clientY - targetPosition.top
      // console.log(prevPercent, nextPercent, targetPosition.height * prevPercent, distance)
      if (distance < targetPosition.height * prevPercent) {
        dropType = 'before'
      } else if (distance > targetPosition.height * nextPercent) {
        dropType = 'after'
      } else if (dropInner) {
        dropType = 'inner'
      } else {
        dropType = 'none'
      }

      // const iconPosition = dropNode.$el
      // .querySelector('.org-tree-node-label')
      // .getBoundingClientRect()
      // const dropIndicator = this.$refs.dropIndicator
      // if (dropType === 'before') {
      //   indicatorTop = iconPosition.top - treePosition.top
      // } else if (dropType === 'after') {
      //   indicatorTop = iconPosition.bottom - treePosition.top
      // }
      // dropIndicator.style.top = indicatorTop + 'px'
      // dropIndicator.style.left = iconPosition.right - treePosition.left + 'px'
      if (dropType === 'inner') {
        addClass(dropNode.$refs.nodelabel, 'is-drop-inner')
      } else {
        removeClass(dropNode.$refs.nodelabel, 'is-drop-inner')
      }

      dragState.showDropIndicator = dropType === 'before' || dropType === 'after'
      dragState.allowDrop = dragState.showDropIndicator || userAllowDropInner
      // console.log(dragState.allowDrop)
      dragState.dropType = dropType
      this.$emit('node-drag-over', draggingNode.node, dropNode.node, event)
    })

    this.$on('tree-node-drag-end', (event) => {
      const { draggingNode, dropType, dropNode } = dragState
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'

      if (draggingNode && dropNode) {
        const draggingNodeCopy = { data: draggingNode.node.data }
        console.log(dropType)
        if (dropType !== 'none') {
          draggingNode.node.remove()
        }
        if (dropType === 'before') {
          dropNode.node.parent.insertBefore(draggingNodeCopy, dropNode.node)
        } else if (dropType === 'after') {
          dropNode.node.parent.insertAfter(draggingNodeCopy, dropNode.node)
        } else if (dropType === 'inner') {
          dropNode.node.insertChild(draggingNodeCopy)
        }
        if (dropType !== 'none') {
          this.store.registerNode(draggingNodeCopy)
        }

        removeClass(dropNode.$refs.nodelabel, 'is-drop-inner')

        this.$emit('node-drag-end', draggingNode.node, dropNode.node, dropType, event)
        if (dropType !== 'none') {
          this.$emit('node-drop', draggingNode.node, dropNode.node, dropType, event)
        }
      }
      if (draggingNode && !dropNode) {
        this.$emit('node-drag-end', draggingNode.node, null, dropType, event)
      }

      // dragState.showDropIndicator = false
      dragState.draggingNode = null
      dragState.dropNode = null
      dragState.allowDrop = true
    })
  },

  mounted() {
    // this.initTabIndex()
    // this.$el.addEventListener('keydown', this.handleKeydown)
  },

  // updated() {
  //   this.treeItems = this.$el.querySelectorAll('[role=treeitem]')
  //   // this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]')
  // },

  methods: {
    // filter(value) {
    //   if (!this.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter')
    //   this.store.filter(value)
    // },

    getNodeKey(node) {
      return getNodeKey(this.nodeKey, node.data)
    },

    getNodePath(data) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getNodePath')
      const node = this.store.getNode(data)
      if (!node) return []
      const path = [node.data]
      let parent = node.parent
      while (parent && parent !== this.root) {
        path.push(parent.data)
        parent = parent.parent
      }
      return path.reverse()
    },

    getCheckedNodes(leafOnly, includeHalfChecked) {
      return this.store.getCheckedNodes(leafOnly, includeHalfChecked)
    },

    getCheckedKeys(leafOnly) {
      return this.store.getCheckedKeys(leafOnly)
    },

    getCurrentNode() {
      const currentNode = this.store.getCurrentNode()
      return currentNode ? currentNode.data : null
    },

    getCurrentKey() {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getCurrentKey')
      const currentNode = this.getCurrentNode()
      return currentNode ? currentNode[this.nodeKey] : null
    },

    setCheckedNodes(nodes, leafOnly) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes')
      this.store.setCheckedNodes(nodes, leafOnly)
    },

    setCheckedKeys(keys, leafOnly) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedKeys')
      this.store.setCheckedKeys(keys, leafOnly)
    },

    setChecked(data, checked, deep) {
      this.store.setChecked(data, checked, deep)
    },

    getHalfCheckedNodes() {
      return this.store.getHalfCheckedNodes()
    },

    getHalfCheckedKeys() {
      return this.store.getHalfCheckedKeys()
    },

    setCurrentNode(node) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentNode')
      this.store.setUserCurrentNode(node)
    },

    setCurrentKey(key) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentKey')
      this.store.setCurrentNodeKey(key)
    },

    getNode(data) {
      return this.store.getNode(data)
    },

    remove(data) {
      this.store.remove(data)
    },

    append(data, parentNode) {
      this.store.append(data, parentNode)
    },

    insertBefore(data, refNode) {
      this.store.insertBefore(data, refNode)
    },

    insertAfter(data, refNode) {
      this.store.insertAfter(data, refNode)
    },

    handleNodeExpand(nodeData, node, instance) {
      console.log('test')
      this.broadcast('TreeNode', 'tree-node-expand', node)
      this.$emit('node-expand', nodeData, node, instance)
    },

    updateKeyChildren(key, data) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in updateKeyChild')
      this.store.updateChildren(key, data)
    }
  }
}
</script>
