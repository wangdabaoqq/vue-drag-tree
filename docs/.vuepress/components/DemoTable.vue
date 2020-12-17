<template>
  <div class="demo-wrap">
    <h3>{{title}}</h3>
    <el-table
      :data="tableData"
      v-bind="$attrs"
      v-on="$listeners"
      style="width: 100%;"
    >
      <template v-for="(item, index) in tableHeader">
        <el-table-column
          :prop="index+''"
          :label="item"
        >
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'DemoTable',
  props: {
    type: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    tableBody: Array,
    tableHead: String
  },
  computed: {
    tableHeader() {
      return this.tableHead.split('|').map((s) => s.replace(/^\s*|\s*$/g, ''))
    },
    tableData() {
      return this.tableBody.map((str) => {
        let data = {}
        str.split('|').map((s, i) => (data[i] = s.replace(/^\s*|\s*$/g, '')))
        return data
      })
    }
  }
}
</script>

<style lang="less">
.demo-wrap {
  padding: 40px 0;
  &:first-child {
    margin-top: 80px;
  }
  &:last-child {
    margin-bottom: 80px;
  }
}
.el-table {
  table {
    margin: 0;
    border-collapse: collapse;
  }

  th,
  td,
  th.is-leaf {
    border: none;
  }

  .el-table__body,
  .el-table__footer,
  .el-table__header {
    border-collapse: collapse;
  }
}
</style>
