<template>
  <div class="details">
    <el-card shadow="hover" class="ccard display-center margin-top-10" >{{this.resource.name}}</el-card>
    <el-card shadow="hover" class="ccard display-center" >
      <el-button tag="a" :href="resource.url" target="_blank" size="large" type="success">点击跳转<el-icon><CircleCheckFilled /></el-icon></el-button>
    </el-card>
    <el-card shadow="hover" class="ccard" v-if="this.url_info.title">
      <!-- v-if="this.getWebsiteInfo(this.resource.url)" -->
      <template #header>
        <div class="card-header card-header">
          <el-icon color="#409eff"><Document /></el-icon>
          <el-text type="primary" size="large">资源详情</el-text>
        </div>
      </template>
      <el-text>网站标题：{{ this.url_info.title }}</el-text>
      <el-divider />
      <el-text>网站介绍：{{ this.url_info.description }}</el-text>
    </el-card>
    <el-card shadow="hover" class="ccard">
      <template #header>
        <div class="card-header card-header">
          <el-icon color="#409eff"><FolderOpened /></el-icon>
          <el-text type="primary" size="large">资源文件列表</el-text>
        </div>
        
      </template>
    </el-card>
    <el-card shadow="hover" class="ccard">
      <template #header>
        <div class="card-header card-header">
          <el-icon color="#409eff"><InfoFilled /></el-icon>
          <el-text type="primary" size="large">资源创建信息</el-text>
        </div>
      </template>
      <el-text>资源创建作者：{{ this.resource.author }}</el-text>
      <el-divider />
      <el-text>资源更新时间：{{ this.resource.updateTime }}</el-text>
      <el-divider />
      <el-text>资源创建时间：{{ this.resource.createTime }}</el-text>
    </el-card>
    
  </div>
</template>

<script>
import { resourceApi } from '@/api/resource'
export default {
  name:'resouce_detail',
  data(){
    return{
      // resouceId:'',
      resource:{},
      url_info:{}
    }
  },
  methods:{
    // 根据id获取资源库详情getResourceById(id)
    async getResourceById(id){
      try{
        const res = await resourceApi.getResourceById(id);
        this.resource = res.data;
        console.log(res);
        this.getWebsiteInfo(this.resource.url);
      }catch(err){
        console.log(err);
      }
      
    },
    extractDomainurl(url) {
        // 使用URL构造函数解析URL
        const parsedUrl = new URL(url);
        // 返回域名
        return parsedUrl.hostname;
      },
      // 获取网站详细信息 https://api.ahfi.cn/api/websiteinfo?url=
      async getWebsiteInfo(url) {
        try {
          const response = await fetch(`https://api.ahfi.cn/api/websiteinfo?url=${url}`);
          const data = await response.json();
          this.url_info=data.data;
          console.log(data.data);
          return true;
          // 处理数据
        } catch (error) {
          console.error(error);
          return false;
        }
      }

  },
  created() {
    // this.resouceId = this.$route.query.id; // 从路由的 query 中获取id
    this.getResourceById(this.$route.query.id);
    
  }
}
</script>

<style lang="less" scoped>
.margin-top-10{
  margin-top: 10px;
}
.icon-q{
  color: var(--el-text-color);
}
.display-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.display-inline{
  // display: inline;
}
.details{
  // display: grid;
  // grid-template-columns: repeat(3, 1fr);
  // grid-gap: 10px;
}
.ccard{
  border-radius:15px ;
  margin-bottom: 10px;
  // aspect-ratio: 16/9;
}
.card-header{
  display: flex;
  align-items: center;
  color: var(--el-text-color);
}
</style>