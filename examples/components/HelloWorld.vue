<template>
  <div class="hello">
    <vueDragTree
      :data="data"
      :props="defaultProps"
      node-key="id"
      direction="horizontal"
    >
      <span
        slot-scope="{ node, data }"
        class="org-tree-node-label"
      >
        <span class="org-tree-node-label-inner clickable-node bg-lightpink">
          {{ data.label }}
        </span>
      </span>
    </vueDragTree>
  </div>
</template>

<script>
// import { Button } from 'element-ui'
import vueDragTree from '../../src/index'
console.log(vueDragTree)
// import 'element-ui/lib/theme-chalk/button.css'
export default {
  name: 'HelloWorld',
  components: { vueDragTree },
  data() {
    return {
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
                  label: 'UI设计'
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
  mounted() {
    console.log(this.data)
  }
}
</script>
