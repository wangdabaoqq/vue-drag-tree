<template>
  <div
    class="hello"
    style="text-align: center;"
  >
    <!-- <input
  placeholder="输入关键字进行过滤"
  v-model="filterText">
</input> -->
    <VueDragTreeOrg
      ref="tree"
      :data="data"
      :props="defaultProps"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      @node-contextmenu="contextmenu"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
    >
      <!-- <span
        slot="list"
        slot-scope="{ node, data }"
      > -->
      <span
        slot="node-icon"
        slot-scope="{ node }"
      >
        <div
          v-if="node.expanded"
          style="border: 1px solid red; background: #fff;width: 20px; height: 20px; display: flex; align-items: center; justify-content: center"
        >-</div>
        <div
          v-else
          style="border: 1px solid red; background: #fff; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center"
        >
          +
        </div>
      </span>
      <!-- </span> -->
    </VueDragTreeOrg>
  </div>
</template>

<script type="text/jsx">
// import { Checkbox, Row, Col } from 'element-ui'
// import vueDragTree from '../../src/index'
// import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-chalk/row.css'
export default {
  name: 'HelloWorld',
  // components: { vueDragTree },
  data() {
    return {
      direction: 'horizontal',
      isExpand: false,
      filterText: '',
      data: [
        {
          id: 0,
          label: 'XXX科技有限公司',
          children: [
            {
              id: 2,
              label: '产品研发部',
              children: [
                {
                  id: 5,
                  label: '研发-前端'
                },
                {
                  id: 6,
                  label: '研发-后端'
                },
                {
                  id: 9,
                  label: 'UI设计',
                  disabled: true
                },
                {
                  id: 10,
                  label: '产品经理'
                }
              ]
            },
            {
              id: 3,
              label: '销售部',
              children: [
                {
                  id: 7,
                  label: '销售一部'
                },
                {
                  id: 8,
                  label: '销售二部'
                }
              ]
            },
            {
              id: 4,
              label: '财务部'
            },
            {
              id: 9,
              label: 'HR人事'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    console.log(this.data)
  },
  methods: {
    contextmenu () {
      console.log(111)
    },
    handleDragStart(node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    }
  }
}
</script>
