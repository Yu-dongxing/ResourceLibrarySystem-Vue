<template>
  <div id="app">
    <router-view></router-view> 
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
/* --- 全局样式重置 --- */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* --- 全局背景色 --- */
body {
  /* 你可以换成截图中的渐变色，或者使用一个柔和的单色 */
  background-color: #ffffff; /* Element Plus 默认的背景色，非常协调 */
}

/* --- 全局自定义变量 (可选，但推荐) --- */
:root {
  --custom-header-height: 60px;
  --custom-footer-height: 50px;
}

/* --- 取消 router-link 的点击文字效果 --- */
.no-link-style {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
.no-link-style:hover {
  text-decoration: none;
  color: inherit;
}
</style>