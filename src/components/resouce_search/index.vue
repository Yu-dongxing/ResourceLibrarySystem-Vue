<template>
  <div>
    <h1>资源搜索</h1>
    <p>关键字：{{ keyword }}</p>
  </div>
</template>

<script>
export default {
  name: 'resouce_search',
  data() {
    return {
      keyword: '' // 用于存储关键字
    };
  },
  watch: {
    keyword(newVal, oldVal) {
    this.keyword = newVal;
      console.log(`关键字从 ${oldVal} 改为 ${newVal}`);
      // 在这里可以执行关键字改变后的逻辑，例如发起搜索请求等
    }
  },
  created() {
    this.keyword = this.$route.query.keyword; // 从路由的query中获取关键字
    console.log(this.keyword); // 打印关键字
  }
}
</script>

<style>

</style>