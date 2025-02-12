<template>
    <div>
      <div class="addResource">
        <el-card>
          <el-form label-position="top" label-width="80px" :model="formData">
            <el-form-item label="资源名称:">
              <el-input v-model="formData.resourceData.name" placeholder="请输入资源名称" />
            </el-form-item>
  
            <el-form-item label="资源文件源地址:">
              <el-input @change="extractDomain" v-model="formData.resourceData.url" placeholder="请输入资源文件源地址" />
            </el-form-item>
  
            <el-form-item label="资源图标(资源地址输入完成后点击图标输入框自动获取网站图标):">
              <el-input v-model="formData.resourceData.img" placeholder="请输入资源展示图标" />
            </el-form-item>
  
            <el-form-item label="标签:">
              <el-input-tag disabled v-model="formData.resourceData.tab" placeholder="请输入标签" tag-type="success" />
            </el-form-item>
  
            <el-form-item label="文件上传：">
              <el-upload
                class="upload-demo"
                :auto-upload="false"
                :on-change="handleUpload"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-exceed="handleExceed"
                :file-list="filelist"
                multiple
                :limit="3"
                accept="*"
              >
                <el-button type="primary">点击上传文件</el-button>
              </el-upload>
            </el-form-item>
  
            <el-form-item>
              <el-button type="primary" @click="onSubmit()">提交</el-button>
              <el-button @click="resetSubmit">重置</el-button>
            </el-form-item>
          </el-form>
          <el-alert class="board-rids-10" title="提交后资源将进入审核阶段，审核通过后资源将展示在首页" type="info" show-icon />
        </el-card>
      </div>
    </div>
  </template>
  
  <script>
  import { resourceApi } from '@/api/resource'
  import { ElMessage } from 'element-plus'
  
  export default {
    name: 'AddFileResource',
    data() {
      return {
        formData: {
          resourceData: {
            name: "",
            url: "",
            tab: "文件", // 根据示例值设置默认值
            img: ""
          },
          files: [] // 用于存储多个文件
        },
        filelist: [] // 用于存储已上传文件的列表
      }
    },
    methods: {
      handleUpload(file) {
        this.formData.files.push(file.raw); // 将文件添加到数组中
        this.filelist.push(file); // 更新文件列表
        console.log(this.formData.files);
      },
      handleRemove(file, fileList) {
        const index = this.formData.files.findIndex(f => f.name === file.name);
        if (index !== -1) {
          this.formData.files.splice(index, 1); // 从数组中移除文件
        }
        this.filelist = fileList; // 更新文件列表
        console.log("文件移除", file, fileList);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      async onSubmit() {
        try {
          if (this.formData.files.length === 0) {
            ElMessage.error('请上传至少一个文件');
            return;
          }
          await resourceApi.submitResourceFile(this.formData);
          ElMessage.success('添加成功,等待审核！！！');
          this.$router.push('/');
        } catch (error) {
          ElMessage.error('添加失败');
          console.error('添加资源失败:', error);
        }
      },
      extractDomainurl(url) {
        const parsedUrl = new URL(url);
        this.formData.resourceData.img = `https://api.akams.cn/favicon/${parsedUrl.hostname}`;
        return `https://api.akams.cn/favicon/${parsedUrl.hostname}`;
      },
      extractDomain() {
        this.formData.resourceData.img = this.formData.resourceData.url ? this.extractDomainurl(this.formData.resourceData.url) : '';
      },
      resetSubmit() {
        this.formData = {
          resourceData: {
            name: '',
            url: '',
            tab: "文件",
            img: ""
          },
          files: []
        };
        this.filelist = [];
      }
    }
  }
  </script>
  
  <style>
  .board-rids-10 {
    border-radius: 10px;
  }
  </style>