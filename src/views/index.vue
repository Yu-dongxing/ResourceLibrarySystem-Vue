<template>
  <div id="index-container">
    <HeaderIndex/>
    <!-- el-scrollbar 会自动撑满剩余空间 -->
    <el-scrollbar class="main-content">
      <div class="search-mobile">
        <Search_App/>
      </div>
      <!-- 路由内容会在这里显示 -->
      <router-view></router-view>
    </el-scrollbar>
    <FooterIndex/>
  </div>
</template>

<script>
// ... 你的 script 部分保持不变 ...
import HeaderIndex from '@/components/header/HeaderIndex.vue'
import FooterIndex from '@/components/footer/FooterIndex.vue'
import Search_App from '@/components/Search_App/index.vue'
import axios from 'axios';
import { iplogApi } from '@/api/ip_log'
import {sysinfoApi} from '@/api/sys_info'
export default {
  name: 'index',
  data(){
    return {
      userIp:'',
      ip_access_log:{
        ipAddress: "",//地址
        ipCity: "",//城市
        ipProvince: "",//省份
        ipUserDevice: "",//用户设备
        ipUserAgent: ""//用户代理
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

          this.ip_access_log.ipAddress = ipData.IP;
          this.ip_access_log.ipCity = ipData.City;
          this.ip_access_log.ipProvince = ipData.Region;
          this.ip_access_log.ipUserDevice = headers['sec-ch-ua-platform'] || 'Unknown';
          this.ip_access_log.ipUserAgent = headers['user-agent'];
          this.onSubmit(this.ip_access_log);
        })
        .catch(error => {
          //console.error('Failed to fetch IP:', error);
        });
    },
    // 上传日志api-postLog(data)
    async onSubmit(data) {
        try {
          const res = await iplogApi.postIpLog(data)
          // console.log("上传成功",res);
        } catch (error) {
          // console.error('上传失败:', error)
        }
      },
      // 获取系统欢迎信息
      async getSysWelcomeInfo() {
        try {
          const res = await sysinfoApi.getSysWelcomeInfo();
          console.log("系统欢迎信息",res);
          this.$notify({
            title: res.data.infoView,
            dangerouslyUseHTMLString: true,
            message: res.data.infoDesc,
            type: 'success',
          });
        } catch (error) {
          console.log(error);
        }
      },
    open1() {
      const less = "https://github.com/Yu-dongxing/ResourceLibrarySystem-Vue/issues"
      this.$notify({
        title: '欢迎访问资源库系统！',
        dangerouslyUseHTMLString: true,
        message: '本系统为个人学习项目，数据来源于网络搜集，如有侵权，请联系删除<br>如出现问题请跳转<a href="'+less+'" target="_blank"><button>反馈</button></a>页面',
        type: 'success',
      });
    },
  },
  components: {
    HeaderIndex,
    FooterIndex,
    Search_App
  },
  created() {
    this.getUserInfo()
    this.getSysWelcomeInfo()
  }
}
</script>

<style scoped>
#index-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 占满整个视口高度 */
  overflow: hidden; /* 防止出现多余的滚动条 */
}

.main-content {
  /* flex: 1 会让这个元素自动填充 Header 和 Footer 之外的所有可用空间 */
  flex: 1;
  /* El-scrollbar 内部会自动处理滚动，我们不需要设置高度 */
}

/* 移动端搜索框 */
.search-mobile {
  display: none;
  padding: 10px;
}

@media screen and (max-width: 600px) {
  .search-mobile {
    display: block;
  }
}
</style>