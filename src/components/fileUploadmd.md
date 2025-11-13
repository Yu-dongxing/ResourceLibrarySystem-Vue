好的，作为一名前端工程师，重构和封装组件是我的日常工作之一。将文件分片上传功能封装成一个独立的、可复用的组件是一个非常好的实践。这能让父组件更专注于业务逻辑，而不是文件上传的实现细节。

下面我将为你完成这个重构工作。

### 1. 创建文件上传组件 (`FileUpload.vue`)

首先，我们创建一个新的组件 `FileUpload.vue`，它将包含所有与文件分片上传相关的逻辑和模板。这个组件会通过 `v-model` (即 `value` prop 和 `input` 事件) 来接收和更新文件列表。

**`FileUpload.vue`**
```vue
<template>
  <div v-loading="isLoading" class="file-upload-container">
    <el-upload
      class="upload-demo"
      :auto-upload="false"
      :on-change="handleFileChange"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :file-list="localFilelist"
      multiple
      accept="*"
    >
      <el-button size="small" type="primary">点击选择文件</el-button>
    </el-upload>
    <el-button style="margin-top: 10px;" @click="startChunkUpload" :disabled="!localFilelist.length">上传到服务器</el-button>
  </div>
</template>

<script>
import { FileApi } from '@/api/file'; // 假设你的API路径是这样
import SparkMD5 from 'spark-md5';

export default {
  name: 'FileUpload',
  props: {
    // 通过 value prop 接收父组件传递的文件列表 (v-model)
    value: {
      type: Array,
      default: () => [],
    },
    // 关联业务ID，例如某个订单ID或文章ID
    associationId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      isLoading: false,
      localFilelist: [], // 使用本地副本以避免直接修改prop
    };
  },
  watch: {
    // 监听来自父组件的 value prop 的变化，同步到本地
    value: {
      immediate: true, // 立即执行一次
      handler(newVal) {
        // 将el-upload需要的数据结构和父组件的原始文件对象进行同步
        this.localFilelist = newVal.map(file => {
          // 如果父组件传来的已经是包含name和raw的对象，直接使用
          if (file.name && file.raw) {
             return file;
          }
          // 否则，创建一个符合el-upload格式的对象
          return { name: file.name, raw: file };
        });
      },
    },
  },
  methods: {
    /**
     * @description el-upload 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
     * @param {object} file 当前操作的文件对象
     * @param {Array} fileList 当前文件列表
     */
    handleFileChange(file, fileList) {
      // 我们只关心原始文件对象
      const rawFileList = fileList.map(f => f.raw);
      // 通过 'input' 事件更新父组件的 v-model
      this.$emit('input', rawFileList);
    },

    /**
     * @description el-upload 文件列表移除文件时的钩子
     * @param {object} file 被移除的文件对象
     * @param {Array} fileList 剩余的文件列表
     */
    handleRemove(file, fileList) {
      const rawFileList = fileList.map(f => f.raw);
      this.$emit('input', rawFileList);
      console.log('文件移除', file, fileList);
    },

    /**
     * @description el-upload 移除文件前的钩子
     * @param {object} file
     * @returns {Promise}
     */
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    /**
     * @description 核心方法：开始上传流程
     */
    async startChunkUpload() {
      this.isLoading = true;
      try {
        // this.value 就是父组件通过 v-model 传递过来的文件数组
        for (const file of this.value) {
          const fileMD5 = await this.calculateFileMD5(file);
          const fileName = file.name;
          const chunkSize = 5 * 1024 * 1024; // 每片5MB
          const chunks = Math.ceil(file.size / chunkSize);

          console.log(`开始上传文件: ${fileName}, MD5: ${fileMD5}, 总分片: ${chunks}`);

          for (let i = 0; i < chunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(file.size, start + chunkSize);
            const chunk = file.slice(start, end);
            
            // 调用上传分片接口
            await this.uploadChunk(chunk, fileName, i + 1, chunks, fileMD5, this.associationId);
            console.log(`文件 [${fileName}] 的分片 ${i + 1}/${chunks} 上传成功`);
          }
          
          // 所有分片上传完毕，通知后端合并
          await this.notifyMerge(chunks, fileMD5, fileName, this.associationId);
          console.log(`文件 [${fileName}] 所有分片上传完成，已通知后端合并。`);
        }
        this.$message.success('所有文件上传成功！');
        this.$emit('upload-success'); // 触发一个成功事件
      } catch (error) {
        console.error('文件上传过程中发生错误:', error);
        this.$message.error('文件上传失败，请查看控制台获取详情。');
        this.$emit('upload-error', error); // 触发一个失败事件
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * @description 上传单个分片
     */
    async uploadChunk(chunk, fileName, chunkNumber, totalChunks, fileMD5, associationId) {
      // 注意：这里的方法名和参数最好和你的API定义保持一致
      // 我根据你原代码中的 FileApi.mergeFileChunks 推测并优化了命名
      await FileApi.uploadFileChunk(chunk, fileName, chunkNumber, totalChunks, fileMD5, associationId);
    },

    /**
     * @description 通知后端合并分片
     */
    async notifyMerge(totalChunks, fileMD5, fileName, associationId) {
      // 同样，优化了命名
      await FileApi.notifyMergeChunks(totalChunks, fileMD5, fileName, associationId);
    },

    /**
     * @description 计算文件的MD5值
     * @param {File} file
     * @returns {Promise<string>}
     */
    calculateFileMD5(file) {
      return new Promise((resolve, reject) => {
        try {
          const fileReader = new FileReader();
          const spark = new SparkMD5.ArrayBuffer();
          
          fileReader.onload = (e) => {
            spark.append(e.target.result);
            const md5 = spark.end();
            resolve(md5);
          };

          fileReader.onerror = (e) => {
            reject(new Error('计算文件MD5时发生错误'));
          };
          
          fileReader.readAsArrayBuffer(file);
        } catch (e) {
          reject(e);
        }
      });
    },
  },
};
</script>

<style scoped>
.file-upload-container {
  width: 100%;
  border: 1px solid #dcdfe6;
  padding: 20px;
  border-radius: 4px;
}
</style>
```

### 2. 修改原有的父组件

现在，我们来修改你原来的组件，让它使用新创建的 `FileUpload` 组件。原有的分页和图书列表逻辑保持不变。

**`ParentComponent.vue`** (你原来的那个文件)
```vue
<template>
  <div>
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

    <hr style="margin: 20px 0;">

    <!-- 使用封装好的分片文件上传组件 -->
    <FileUpload 
      v-model="filelist" 
      :association-id="fileAssociationId"
      @upload-success="handleUploadSuccess"
      @upload-error="handleUploadError"
    />

    <!-- 用于调试，查看父组件中的filelist是否正确更新 -->
    <div style="margin-top: 20px; font-family: monospace;">
      <p><strong>父组件中的文件列表 (v-model):</strong></p>
      <pre>{{ filelist.map(f => f.name) }}</pre>
    </div>

  </div>
</template>

<script>
// import { FileApi } from '@/api/file'; // 不再需要
import { BooksApi } from '@/api/book';
// import SparkMD5 from 'spark-md5'; // 不再需要

// 1. 导入新创建的组件
import FileUpload from './FileUpload.vue'; 

export default {
  // 2. 注册组件
  components: {
    FileUpload,
  },
  data() {
    return {
      // --- 文件上传相关数据 ---
      filelist: [], // 文件列表，通过v-model传递给子组件
      fileAssociationId:"test-business-id-123", // 业务ID，通过prop传递给子组件

      // --- 分页和图书列表相关数据 ---
      total: 0,       // 总记录数
      pageSize: 2,    // 每页显示条数
      currentPage: 1, // 当前页码
      books: []       // 图书数据
    };
  },
  methods: {
    // --- 文件上传相关方法（现在是事件监听） ---
    handleUploadSuccess() {
      console.log('父组件收到通知：所有文件上传成功！');
      // 在这里可以执行上传成功后的业务逻辑，比如刷新列表、清空文件列表等
      this.filelist = []; // 例如，上传成功后清空列表
    },
    handleUploadError(error) {
      console.log('父组件收到通知：文件上传失败！', error);
      // 处理上传失败的逻辑
    },
    
    // --- 分页和图书列表相关方法（保持不变） ---
    fetchBookList() {
      BooksApi.findBookPage(this.currentPage, this.pageSize).then(response => {
        this.total = response.data.total;
        this.books = response.data.records;
      }).catch(error => {
        console.error('获取图书列表失败:', error);
      })
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchBookList();
    }
  },
  created() {
    this.fetchBookList();
  }
};
</script>

<style>
</style>
```

### 重构说明和优势

1.  **组件职责单一**：
    *   `FileUpload.vue` 只负责文件处理、分片、计算MD5和上传，是一个功能内聚的“黑盒”。
    *   父组件（原来的文件）现在只负责业务逻辑，如展示图书列表、管理业务ID (`fileAssociationId`) 和要上传的文件列表 (`filelist`)。

2.  **双向数据绑定 (`v-model`)**：
    *   父组件通过 `v-model="filelist"` 将文件列表数据传递给子组件。
    *   子组件内部对文件列表的任何增删操作（通过 `el-upload`），都会通过 `$emit('input', updatedList)` 事件通知父组件，父组件的 `filelist` 会自动更新。这就是双向数据流。

3.  **可复用性**：
    *   现在你可以在项目的任何地方使用 `<FileUpload>` 组件，只需要给它传递一个 `v-model` 绑定的数组和一个业务 `association-id` 即可。

4.  **清晰的通信**：
    *   **Props Down**: 父组件通过 `value` (v-model) 和 `associationId` 两个 `prop` 向子组件传递数据。
    *   **Events Up**: 子组件通过 `input` (v-model) 事件向父组件同步数据，通过 `upload-success` 和 `upload-error` 事件通知父组件上传任务的状态。

5.  **代码整洁**：
    *   父组件的代码变得非常简洁，移除了大量与文件上传实现细节相关的代码，可读性和可维护性大大提高。

现在，你只需要将上述两个代码块放到对应的文件中，并确保 `FileUpload.vue` 的路径在父组件中被正确引入，就可以运行了。