<template>
  资源库详情{{ this.resouceId }}//{{ this.resource.name }}
  
</template>

<script>
import { resourceApi } from '@/api/resource'
export default {
  name:'resouce_detail',
  data(){
    return{
      // resouceId:'',
      resource:{}
    }
  },
  methods:{
    // 根据id获取资源库详情getResourceById(id)
    async getResourceById(id){
      try{
        const res = await resourceApi.getResourceById(id);
        this.resource = res.data;
        console.log(res);
      }catch(err){
        console.log(err);
      }
      
    }

  },
  created() {
    // this.resouceId = this.$route.query.id; // 从路由的 query 中获取id
    this.getResourceById(this.$route.query.id);
  }
}
</script>

<style>

</style>