<DemoBlock title="测试" desc="基础文档展示">
   <!-- <button>test</button> -->
   <hello-world></hello-world>

  <!-- <template slot="codeDesc">
   按钮实体
  </template> -->

  <highlight-code slot="code" lang="vue">

<<< @/examples/components/helloWorld.vue

  </highlight-code>
</DemoBlock>

<DemoTable title="参数" :tableBody="tableBody" :tableHead="tableHead"/>

<script>
  export default {
    data() {
      return {
        //表头为字符串，写法和md一样，中间以`|`间隔就行
        tableHead: `参数 | 说明 | 类型 | 可选值 | 默认值`,
        //表格数据为数组，其中每一项为字符串，代表每一行要展示的数据，写法也和md一样，中间以`|`间隔就行
        tableBody: [
          `size | 尺寸 | String | medium / small / mini | —`
        ],
      }
    },

  }
</script>
