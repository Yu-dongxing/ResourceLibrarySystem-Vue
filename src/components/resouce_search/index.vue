<template>
  <div>
    <div class="search">
      <el-table :data="resouce_data"  style="width: 100%">
        <el-table-column prop="name" label="资源名称" width="180" />
        <el-table-column prop="author" label="作者" width="180" />
        <el-table-column prop="img" label="资源图片">
          <template #default="scope">
            <!-- <el-link :href="scope.row.img" target="_blank">
                <el-button>点击跳转</el-button>
            </el-link> -->
            <el-image :src="scope.row.img" fit="cover" style="width: 100px; height: 100px"></el-image>
          </template>
        </el-table-column>

        <el-table-column prop="tab" label="资源标签" >
          <template #default="scope">
                <el-tag>{{ scope.row.tab }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="资源地址" >
          <template #default="scope">
            <el-link :href="scope.row.url" target="_blank">
              <el-button>点击跳转</el-button>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { resourceApi } from '@/api/resource';
export default {
  name: 'resource_search',
  data() {
    return {
      keyword: '', // 用于存储关键字
      resouce_data:[],
    };
  },
  methods:{
    //根据关键字搜索资源searchResource(keyword)
    async searchResource(keyword){
      try{
        const res = await resourceApi.searchResource(keyword);
        this.resouce_data = res.data;
        console.log(res);
      } catch(error){
        console.log(error);
      }
    }
  },
  watch: {
    // 监听 $route.query.keyword 的变化
    '$route.query.keyword': {
      handler(newVal, oldVal) {
        this.keyword = newVal; // 更新 keyword 数据
        this.searchResource(this.keyword); // 调用搜索资源的方法
        console.log(`关键字从 ${oldVal} 改为 ${newVal}`);
        // 在这里可以执行关键字改变后的逻辑，例如发起搜索请求等
      },
      immediate: true // 立即执行一次，确保初始值也被处理
    }
  },
  created() {
    this.keyword = this.$route.query.keyword; // 从路由的 query 中获取关键字
    console.log(this.keyword); // 打印关键字
  }
}
</script>

<style>
</style>