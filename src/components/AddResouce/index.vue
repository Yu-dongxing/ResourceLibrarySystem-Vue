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
            <el-input-tag v-model="from.tag" placeholder="请输入标签" tag-type="success"/>
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
import { resourceApi } from '@/api/resource'
import { ElMessage } from 'element-plus'

export default {
    name: 'AddResouce',
    data() {
      return {
        from: {
          name: '',
          url: '',
          tag: [],
          author: 'Admin', // 默认作者
          img: '@/assets/depng/png.svg' // 默认图片
        }
      }
    },
    methods:{
      async onSubmit() {
        try {
          const submitData = {
            ...this.from,
            tab: this.from.tag.join(',') // 将标签数组转换为字符串
          }
          await resourceApi.addResource(submitData)
          ElMessage.success('添加成功')
          this.$router.push('/')
        } catch (error) {
          ElMessage.error('添加失败')
          console.error('添加资源失败:', error)
        }
      },
      resetSubmit(){
        this.from = {
          name: '',
          url: '',
          tag: [],
          author: 'Admin',
          img: '@/assets/depng/png.svg'
        }
      }
    }

}
</script>

<style>

</style>