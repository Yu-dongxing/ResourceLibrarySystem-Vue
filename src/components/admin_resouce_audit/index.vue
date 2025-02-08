<template>
  <el-table :data="resouce_data" height="250" style="width: 100%">
      <el-table-column prop="name" label="资源名称" width="180" />
      <el-table-column prop="author" label="作者" width="180" />
      <el-table-column prop="img" label="资源图片">
        <template #default="scope">
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
      <el-table-column prop="id" label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.id)"
          >
            审核通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
import { resourceApi } from '@/api/resource'
export default {
    name:'admin_resouce_audit',
    data(){
        return{
            resouce_data:[],
        }
    },
    methods:{
        async getData(){
            try{
                const res = await resourceApi.ResourceAudit()
                this.resouce_data = res.data
            } catch(e){
                console.log(e)
            }
        },
        async ResourceAuditById(id){
            try{
                await resourceApi.ResourceAuditById(id)
            } catch(e){
                console.log(e)
            }
            this.getData()
        },
        handleDelete(id){
            console.log('审核',id)
            this.$confirm('此操作将该资源展示到主页中, 是否继续?', '提示', {
                confirmButtonText: '通过',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.ResourceAuditById(id)
                this.$message({
                type: 'success',
                message: '审核成功!'
                });
                this.time()
            }).catch(() => {
                this.$message
            });
            this.time()
        },
        // 定时器3秒后调用请求
        // async getData(){
        //     try{
        //         const res = await resourceApi.ResourceAudit()
        //         this.resouce_data = res.data
        //     } catch(e){
        //         console.log(e)
        //     }
        //     setTimeout(() => {
        //         this.getData()
        //     }, 3000);
        // }
        time(){
            setTimeout(() => {
                this.getData()
            }, 30);
        }
    },
    created(){
        this.getData()
    },
    mounted(){

    }

}
</script>

<style>

</style>