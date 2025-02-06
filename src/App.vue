<template>
  <div id="app" >
    <HeaderIndex/>
    <el-scrollbar height="calc(100vh - 110px)" class="MAIN">
      <!-- <updata/> -->
        <!-- <MainIndex/> -->
        <router-view></router-view> <!-- 使用Vue Router的router-view组件，用于展示当前路由对应的组件内容 -->
    </el-scrollbar>
    <FooterIndex/>
  </div>
</template>

<script>
import HeaderIndex from './components/header/HeaderIndex.vue'
import FooterIndex from './components/footer/FooterIndex.vue'
import axios from 'axios';
import { logApi } from '@/api/log'
export default {
  name: 'app',
  data(){
    return {
      userIp:'',
      data:{
        sessionId:'',
        refererUrl:'',
        pageUrl:'',
        ipAddress:'',
        userAgent:'',
        statusCode:'',
        deviceType:'',
        logDetails:'',
      }
    }
  },
  methods:{
    // 获取IP地址api
    getUserInfo() {
      axios.get('https://ip.011102.xyz')
        .then(response => {
          console.log(response.data);
          const ipData = response.data.IP;
          const headers = response.data.Headers;
          const security = response.data.Security;

          this.data.ipAddress = ipData.IP;
          this.data.sessionId = ipData.City;
          this.data.refererUrl = ipData.Region
          this.data.pageUrl = ipData.ASOrganization;
          this.data.userAgent = headers['user-agent'];
          this.data.statusCode = response.status; // 假设状态码是响应的状态码
          this.data.deviceType = headers['sec-ch-ua-platform'] || 'Unknown'; // 假设设备类型可以从 sec-ch-ua-platform 获取
          this.data.logDetails = JSON.stringify({
            IP: ipData,
            Headers: headers,
            Security: security
          });

          this.onSubmit(this.data);
        })
        .catch(error => {
          console.error('Failed to fetch IP:', error);
        });
    },
    // 上传日志api-postLog(data)
    async onSubmit(data) {
        try {
          const res = await logApi.postLog(data)
          // console.log("上传成功",res);
        } catch (error) {
          // console.error('上传失败:', error)
        }
      },
  },
  // watch:{
  //   userIp(newVal,oldVal){
  //     if(newVal !== oldVal){
        
  //     }
  //   }
  // },
  components: {
    HeaderIndex,
    FooterIndex,
  },
  beforeCreate() {
    console.log('创建前')
  },
  created() {
    console.log('创建后')
    this.getUserInfo()
  }

}
</script>

<style>
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
</style>
