<template>
  <div id="app" >
    <router-view></router-view> 
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
    }
  },
  methods:{}

}
</script>

<style>
.search_App{
    display: none;
}
#app {
    font-family: var(--el-font-family);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    --border-radius-de: 10px;
    --border-radius-min: 15px;
    --border-radius-max: 20px;
    --box-shadow-de: 0 2px 4px rgba(0, 0, 0, .1);
    transition: all 3s ease;
    
}
/* 取消 router-link 的点击文字效果 */
.no-link-style {
  text-decoration: none; /* 取消下划线 */
  color: inherit; /* 继承父元素的颜色 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
}

/* 可选：取消 hover 时的样式 */
.no-link-style:hover {
  text-decoration: none;
  color: inherit;
}
.MAIN{
    transition: all 3s ease;
    margin-top: 0px;
    box-sizing: border-box;
    padding: 5px;
    /* height: calc(100vh - 70px - 40px - 10px); */
    width: 100%;
    background-color: var(--bg-100);
    /* overflow: auto; */
    border-radius: 10px;
}
/* 当屏幕宽度小于500px */
@media screen and (max-width: 600px) {
  .search_App{
    display: block;
  }
}
</style>
