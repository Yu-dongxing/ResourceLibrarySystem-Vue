<template>
  <!-- 分页测试 -->
  <div class="page">
    <!-- 分页组件 -->
    <el-pagination
      size="small"
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
    <!-- 图书列表展示区域 -->
    <div v-for="(book, index) in books" :key="index">
      <p>{{ book.name }}</p>
    </div>
  </div>

  <!-- 分片文件上传测试 -->
  <div v-loading="isLoading" style="width: 50%;">
    <el-upload
      class="upload-demo"
      :auto-upload="false"
      :on-change="handleUpload"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :file-list="filelist"
      multiple
      accept="*"
    >
      <el-button type="primary">点击选择文件</el-button>
    </el-upload>
    <el-button @click="fileChankUpload()">上传</el-button>
  </div>
</template>

<script>
import { FileApi } from '@/api/file';
import { BooksApi } from '@/api/book';
import SparkMD5 from 'spark-md5';
//
export default {
  // props: {
  //   // 通过 prop 接收父组件传递的文件列表
  //   value: {
  //     type: Array,
  //     default: () => [],
  //   },
  // },
  data() {
    return {
      filelist: [],
      fileAssociationId:"test",
      // 
      total: 0, // 总记录数
      pageSize: 2, // 每页显示条数
      currentPage: 1, // 当前页码
      books: [] // 图书数据
    };
  },
  // watch: {
  //   // 监听父组件传递的 value，更新本地的 filelist
  //   value: {
  //     immediate: true,
  //     handler(newVal) {
  //       this.filelist = newVal;
  //     },
  //   },
  // },
  methods: {
    handleUpload(file) {
      // 将文件添加到 filelist 中
      this.filelist.push(file.raw); // 如果 file.raw 是文件对象，直接添加
      console.log('文件上传',  this.filelist);
      //通过 事件通知父组件文件列表已更新
      // this.$emit('input', this.filelist);
    },
    // 处理文件移除
    handleRemove(file, fileList) {
      // 在 filelist 中移除文件
      const index  = this.filelist.findIndex(f => f.name === file.name);
      if (index !== -1) {
        this.filelist.splice(index, 1); // 从数组中移除文件
      }
      // 更新 filelist
      this.filelist = fileList;
      // 通过事件通知父组件文件列表已更新
      this.$emit('input', this.filelist);
      console.log('文件移除', file, fileList);
    },
    // 移除文件前的确认
    beforeRemove(file, fileList) {
      // 弹出确认框，返回 Promise
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    ////////////////////////////////////////////////////////
    //处理文件分片上传
    // 文件分片上传
    async fileUpload(file,fileName,chunknum,chunks ,fileMD5,fileAssociationId){
      await FileApi.mergeFileChunks(file, chunknum,chunks ,fileMD5,fileName,fileAssociationId);
    },
    //文件分片上传通知合并
    async fileMerge(totalChunks,fileMD5,fileName,fileAssociationId){
      await FileApi.megerFileChunksSuccess(totalChunks,fileMD5,fileName,fileAssociationId);
    },
    async fileChankUpload(){
      try{
        for(const file of this.filelist){
          const fileMD5 = await this.filemd5(file);
          console.log(fileMD5);
          const fileName = file.name;
          const chunkSize = 5 * 1024 * 1024; // 每片5M
          const chunks = Math.ceil(file.size / chunkSize); // 计算切片数量
          for (let i = 0; i < chunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(file.size, start + chunkSize);
            const chunk = file.slice(start, end); // 切片
            console.log('文件分片', chunk);
            await this.fileUpload(chunk,fileName,i,chunks,fileMD5,this.fileAssociationId);
            console.log('文件分片上传', i, chunks);
          }
          await this.fileMerge(chunks,fileMD5,fileName,this.fileAssociationId);
          console.log('文件分片上传完成', fileMD5);
        }
      }catch(e){
        console.log(e);
      }
      
    },
    async  filemd5(file) {
      return new Promise((resolve, reject) => {
        try {
          let fileReader = new FileReader();
          let Spark = new SparkMD5.ArrayBuffer();
          fileReader.readAsArrayBuffer(file);
          fileReader.onload = function (e) {
            Spark.append(e.target.result);
            let md5 = Spark.end();
            resolve(md5);
          };
          fileReader.onerror = function (e) {
            reject(e);
          };
        } catch (e) {
          reject(e);
        }
      });
    },
    // 
    // 获取图书列表
    fetchBookList() {
      BooksApi.findBookPage(this.currentPage, this.pageSize).then(response => {
        // 假设接口返回的数据结构是：{ total: 50, data: [...]}
        this.total = response.data.total
        this.books = response.data.records
      }).catch(error => {
        console.error('获取图书列表失败:', error)
      })
    },
    // 分页切换事件处理
    handleCurrentChange(page) {
      this.currentPage = page
      this.fetchBookList()
    }
  },
  created(){
    this.fetchBookList()
  }
};
</script>

<style>
</style>