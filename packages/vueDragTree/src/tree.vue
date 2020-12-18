<template>
  <div
    class="org-tree  collapsable"
    :class="[
      {
        'el-tree-node--highlight-current': highlightCurrent,
        'is-dragging': !!dragState.draggingNode,
        'is-drop-not-allow': !dragState.allowDrop,
        'is-drop-inner': dragState.dropType === 'inner'
      },
      direction
    ]"
    role="tree"
  >
    <tree-node
      v-for="child in root.childNodes"
      :key="getNodeKey(child)"
      :node="child"
      :props="props"
      :render-after-expand="renderAfterExpand"
      :show-checkbox="showCheckbox"
      :render-content="renderContent"
      @node-expand="handleNodeExpand"
    />
    <div
      v-if="isEmpty"
      class="el-tree-node__empty-block"
    >
      <span class="el-tree-node__empty-text">{{ emptyText }}</span>
    </div>
    <div
      v-show="dragState.showDropIndicator"
      ref="dropIndicator"
      class="el-tree-node__drop-indicator"
    />
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
    checkStrictly: Boolean,
    defaultExpandAll: Boolean,
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    checkOnClickNode: Boolean,
    checkDescendants: {
      type: Boolean,
      default: false
    },
    autoExpandParent: {
      type: Boolean,
      default: true
    },
    defaultCheckedKeys: Array,
    defaultExpandedKeys: Array,
    currentNodeKey: [String, Number],
    renderContent: Function,
    showCheckbox: {
      type: Boolean,
      default: false
    },
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
          label: 'label',
          disabled: 'disabled'
        }
      }
    },
    lazy: {
      type: Boolean,
      default: false
    },
    highlightCurrent: Boolean,
    load: Function,
    filterNodeMethod: Function,
    accordion: Boolean,
    indent: {
      type: Number,
      default: 18
    },
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
        showDropIndicator: false,
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
    defaultCheckedKeys(newVal) {
      this.store.setDefaultCheckedKey(newVal)
    },

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
    },

    checkStrictly(newVal) {
      this.store.checkStrictly = newVal
    }
  },

  created() {
    this.isTree = true

    this.store = new TreeStore({
      key: this.nodeKey,
      data: this.data,
      lazy: this.lazy,
      props: this.props,
      load: this.load,
      currentNodeKey: this.currentNodeKey,
      checkStrictly: this.checkStrictly,
      checkDescendants: this.checkDescendants,
      defaultCheckedKeys: this.defaultCheckedKeys,
      defaultExpandedKeys: this.defaultExpandedKeys,
      autoExpandParent: this.autoExpandParent,
      defaultExpandAll: this.defaultExpandAll,
      filterNodeMethod: this.filterNodeMethod
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
      const oldDropNode = dragState.dropNode
      if (oldDropNode && oldDropNode !== dropNode) {
        removeClass(oldDropNode.$el, 'is-drop-inner')
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

      const targetPosition = dropNode.$el.getBoundingClientRect()
      console.log(targetPosition)
      const treePosition = this.$el.getBoundingClientRect()

      let dropType
      const prevPercent = dropPrev ? (dropInner ? 0.25 : dropNext ? 0.45 : 1) : -1
      const nextPercent = dropNext ? (dropInner ? 0.75 : dropPrev ? 0.55 : 0) : 1

      let indicatorTop = -9999
      const distance = event.clientY - targetPosition.top
      if (distance < targetPosition.height * prevPercent) {
        dropType = 'before'
      } else if (distance > targetPosition.height * nextPercent) {
        dropType = 'after'
      } else if (dropInner) {
        dropType = 'inner'
      } else {
        dropType = 'none'
      }

      const iconPosition = dropNode.$el
        .querySelector('.org-tree-node-label')
        .getBoundingClientRect()
      const dropIndicator = this.$refs.dropIndicator
      if (dropType === 'before') {
        indicatorTop = iconPosition.top - treePosition.top
      } else if (dropType === 'after') {
        indicatorTop = iconPosition.bottom - treePosition.top
      }
      dropIndicator.style.top = indicatorTop + 'px'
      dropIndicator.style.left = iconPosition.right - treePosition.left + 'px'

      if (dropType === 'inner') {
        addClass(dropNode.$el, 'is-drop-inner')
      } else {
        removeClass(dropNode.$el, 'is-drop-inner')
      }

      dragState.showDropIndicator = dropType === 'before' || dropType === 'after'
      dragState.allowDrop = dragState.showDropIndicator || userAllowDropInner
      dragState.dropType = dropType
      this.$emit('node-drag-over', draggingNode.node, dropNode.node, event)
    })

    this.$on('tree-node-drag-end', (event) => {
      const { draggingNode, dropType, dropNode } = dragState
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'

      if (draggingNode && dropNode) {
        const draggingNodeCopy = { data: draggingNode.node.data }
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

        removeClass(dropNode.$el, 'is-drop-inner')

        this.$emit('node-drag-end', draggingNode.node, dropNode.node, dropType, event)
        if (dropType !== 'none') {
          this.$emit('node-drop', draggingNode.node, dropNode.node, dropType, event)
        }
      }
      if (draggingNode && !dropNode) {
        this.$emit('node-drag-end', draggingNode.node, null, dropType, event)
      }

      dragState.showDropIndicator = false
      dragState.draggingNode = null
      dragState.dropNode = null
      dragState.allowDrop = true
    })
  },

  mounted() {
    this.initTabIndex()
    this.$el.addEventListener('keydown', this.handleKeydown)
  },

  updated() {
    this.treeItems = this.$el.querySelectorAll('[role=treeitem]')
    this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]')
  },

  methods: {
    filter(value) {
      if (!this.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter')
      this.store.filter(value)
    },

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
    },

    initTabIndex() {
      this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]')
      this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]')
      const checkedItem = this.$el.querySelectorAll('.is-checked[role=treeitem]')
      if (checkedItem.length) {
        checkedItem[0].setAttribute('tabindex', 0)
        return
      }
      this.treeItems[0] && this.treeItems[0].setAttribute('tabindex', 0)
    },

    handleKeydown(ev) {
      const currentItem = ev.target
      if (currentItem.className.indexOf('el-tree-node') === -1) return
      const keyCode = ev.keyCode
      this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]')
      const currentIndex = this.treeItemArray.indexOf(currentItem)
      let nextIndex
      if ([38, 40].indexOf(keyCode) > -1) {
        // up、down
        ev.preventDefault()
        if (keyCode === 38) {
          // up
          nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0
        } else {
          nextIndex = currentIndex < this.treeItemArray.length - 1 ? currentIndex + 1 : 0
        }
        this.treeItemArray[nextIndex].focus() // 选中
      }
      if ([37, 39].indexOf(keyCode) > -1) {
        // left、right 展开
        ev.preventDefault()
        currentItem.click() // 选中
      }
      const hasInput = currentItem.querySelector('[type="checkbox"]')
      if ([13, 32].indexOf(keyCode) > -1 && hasInput) {
        // space enter选中checkbox
        ev.preventDefault()
        hasInput.click()
      }
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

.collapsable .org-tree-node.is-leaf {
    // padding-right: 30px;

    .org-tree-node-label:after {
      top: 0;
      left: 100%;
      width: 20px;
      height: 50%;
      border-right: 0;
      border-bottom: 0;
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
      padding-top: 10px;
      padding-bottom: 10px;
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
