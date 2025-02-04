<template>
  <div class="resouce-data-admin">
    <el-table :data="resouce_data" height="250" style="width: 100%">
      <el-table-column prop="name" label="资源名称" width="180" />
      <el-table-column prop="author" label="作者" width="180" />
      <el-table-column prop="img" label="资源图片" />
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
          <el-button size="small" @click="handleEdit(scope.row.id)">
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="资源编辑" width="500">
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { resourceApi } from '@/api/resource'
export default {
name: 'admin_Resouce_data',
data(){
    return {
        resouce_data:[],
        dialogFormVisible:false,
    }
},
methods:{
    async getData() {
      try {
        const res = await resourceApi.getResources()
        this.resouce_data = res.data
      } catch (error) {
        console.error('获取资源列表失败:', error)
      } finally {
      }
    },
    handleEdit(id){
      this.dialogFormVisible = true
      this.getData()
      console.log('编辑',id)
    },
    handleDelete(id){
      this.getData()
      console.log('删除',id)
    }
},

//组件挂载成功后调用获取数据的方法


mounted(){
    this.getData()
},
}
</script>

<style>

</style>