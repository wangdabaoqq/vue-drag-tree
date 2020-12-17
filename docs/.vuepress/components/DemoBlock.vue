<template>
  <div class="demo-block">
    <header>
      <h2>
        {{ bindValue.title }}
      </h2>
      <p class="desc">
        {{ bindValue.desc }}
      </p>
    </header>
    <DemoCard :online-run-link="bindValue.onlineRunLink">
      <slot />
      <template slot="codeDesc">
        <slot name="codeDesc" />
      </template>
      <template slot="code">
        <slot name="code" />
      </template>
    </DemoCard>
  </div>
</template>
<script>
import DemoCard from './DemoCard'
export default {
  components: { DemoCard },
  data() {
    return {};
  },
  computed: {
    bindValue() {
      return { ...this.$attrs, ...this.props }
    }
  }
};
</script>
<style lang="less" scoped>
.demo-block {
  .desc {
    font-size: 14px;
    line-height: 1.5em;
    color: #5e6d82;
  }
}
</style>
