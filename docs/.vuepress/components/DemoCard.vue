<template>
  <div class="demo-card">
    <div class="source">
      <slot />
    </div>
    <div
      v-show="showCode"
      class="code"
    >
      <div
        v-if="$slots.codeDesc"
        class="code-desc"
      >
        <slot name="codeDesc" />
      </div>
      <div class="code-src">
        <slot name="code" />
      </div>
    </div>
    <div
      class="action"
      @click="showCode=!showCode"
    >
      <span>{{ `${showCode?'隐藏':'显示'}代码` }}</span>
      <span
        v-if="$attrs.onlineRunLink"
        class="open"
        @click="open"
      >
        在线运行
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showCode: false
    };
  },
  methods: {
    open() {
      window.open(this.$attrs.onlineRunLink)
    }
  }
};
</script>
<style lang="less" scoped>
.demo-card {
  margin-bottom: 24px;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }
  .source {
    padding: 24px;
  }
  .code {
    padding: 10px;
    background-color: #fafafa;
    transition: 0.2s;
    &-desc {
      padding: 10px;
      margin-bottom: 20px;
      font-size: 13px;
      background-color: #fff;
    }
  }
  .action {
    height: 48px;
    margin-top: -1px;
    line-height: 48px;
    color: #409eff;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    border-top: 1px solid #eaeefb;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    box-sizing: border-box;
    .open {
      float: right;
      margin-right: 30px;
    }
  }
}
</style>
