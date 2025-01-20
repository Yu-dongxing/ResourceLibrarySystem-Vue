<!-- header -->
<template>
  <div class="header">
    <div class="header-left">
      <div class="logo">
      </div>
      <router-link to="/" class="title no-link-style">资源库系统</router-link>
    </div>
    <div class="header-right">
      <!-- <router-link to="/home" class="right-item"></router-link> -->
      <router-link to="/about" class="right-item no-link-style">
        <img src="@/assets/UpdateLog/log.svg" alt="">
        <span>更新日志</span>
      </router-link>
      <div class="right-item">
        <img src="@/assets/user/header-user.svg" alt="">
        <span>登录</span>
      </div>
    </div>
    <div class="header-right-app">
      <img src="@/assets/header-right/list.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderIndex',
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: var(--bg-200);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
}

.logo img {
  height: 40px;
  margin-right: 10px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  line-height: 60px;
}

.header-right {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // border: 1px solid red;
  .right-item {
    box-sizing: border-box;
    padding: 5px;
    width: auto;
    height: 40px;
    // background-color: red;
    border-bottom: #42b983 solid 1px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius-de);
    img{
      width: 40px;
      height: 40px;
    }
    span{
      font-weight: bold;
      line-height: 40px;
    }
  }
  .right-item:hover{
    background-color: var(--primary-200);
    //点击切换鼠标
    cursor: pointer;
  }
}
.header-right-app{
  width: 60px;
  height: 50px;
  background-color: var(--primary-100);
  border-radius: var(--border-radius-de);
  display: flex;
  justify-content: center;
  align-items: center;
  // margin-right: -20px;
  img{
    width: 40px;
    height: 40px;
  }
}
.header-right-app:hover{
  background-color: var(--primary-200);
}
.about {
  margin-right: 20px;
}
.username {
  margin-right: 20px;
}

.logout {
  cursor: pointer;
  color: #666;
}

.logout:hover {
  color: #42b983;
}
/* 当屏幕宽度小于500px */
@media screen and (max-width: 500px) {
  .logo,.header-right{
    display: none;
  }
}
/* 当屏幕宽度大于500px */
@media screen and (min-width: 500px) {
  .header-right-app{
    display: none;
  }
}

</style>
