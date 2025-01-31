<!-- header -->
<template>
  <div class="header">
    <div class="header-left">
      <div class="logo">
      </div>
      <router-link to="/" class="title no-link-style">资源库</router-link>
    </div>
    <div class="header-search">
      <el-input
        v-model="input1"
        style="width: 240px"
        size="large"
        placeholder="Please Input"
        :prefix-icon="Search"
      />
    </div>
    <div class="header-right">
      <router-link to="/add" class="right-item no-link-style">
        <img src="@/assets/header-right/up2.svg" alt="">
        <span>添加资源</span>
      </router-link>
      <router-link to="/about" class="right-item no-link-style">
        <img src="@/assets/UpdateLog/log.svg" alt="">
        <span>更新日志</span>
      </router-link>
      <router-link to="/user" class="right-item no-link-style">
        <img src="@/assets/user/header-user.svg" alt="">
        <span class="item-t">用户</span>
      </router-link>
    </div>
    <div class="header-right-app">
      <el-dropdown trigger="click">
        <span class="header-right-app-ii">
          <img src="@/assets/header-right/list.svg" alt="">
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(item,index) in header_link" :key="index">
              <!-- <el-icon v-if="item.icon" :component="item.icon" /> -->
              <router-link :to="item.link" class="no-link-style" style="width: 100%;">{{ item.title }}</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
export default {
  name: 'HeaderIndex',
  data() {
    return {
      header_link:[
      {id:1,icon:"",link:'/',title:'首页'},
      {id:2,icon:"/assets/header-right/up2.svg",link:'/add',title:'添加资源'},
      {id:3,icon:"@/assets/header-right/log.svg",link:'/about',title:'更新日志'},
      {id:4,icon:"@/assets/header-right/header-user.svg",link:'/user',title:'用户'}
    ]
    }
  },
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
      width: 30px;
      height: 30px;
    }
    span{
      margin-left: 5px;
      font-weight: bold;
      line-height: 40px;
      // display: none;
    }
    .item-t{

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
.header-right-app:focus{
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
