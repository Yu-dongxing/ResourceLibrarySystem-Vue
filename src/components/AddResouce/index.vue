<template>
  <div>
    <div class="addResource">
      <el-card>
        <!-- style="min-width: 100px;max-width: 300px;" -->
          <el-form  label-position="top" label-width="80px" :model="form">
          <el-form-item label="资源名称">
            <el-input v-model="from.name" placeholder="请输入资源名称" />
          </el-form-item>
          <el-form-item label="资源地址">
            <el-input v-model="from.url" placeholder="请输入资源地址" />
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="from.tag" placeholder="请输入标签" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button  @click="resetSubmit">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      
    </div>
  </div>
</template>

<script>
export default {
    name: 'AddResouce',
    data() {
      return {
        from:{
          name:"",
          url:"",
          tag:""
        }
      }
    },
    methods:{
      onSubmit(){
        console.log(this.from)
      }
    }

}
</script>

<style>

</style>