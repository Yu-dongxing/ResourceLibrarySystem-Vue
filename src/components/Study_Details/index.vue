<template>
  <div class="study-details-container">
    <!-- 页面头部：任务标题和核心信息 -->
    <el-card class="page-header-card" shadow="never">
      <div class="header-content">
        <div class="header-title">
          <el-icon :size="28" class="title-icon"><Grid /></el-icon>
          <h1>{{ studyDetails.taskTitle }}</h1>
        </div>
        <!-- 这里可以放一些次要信息，比如发布时间、截止日期等 -->
        <!-- <div class="header-meta">
          <span>发布者：Admin</span>
          <span>截止日期：2025-12-31</span>
        </div> -->
      </div>
    </el-card>

    <!-- 主体内容区：左右布局 -->
    <div class="main-content-grid">
      <!-- 左侧：任务详情和附件 -->
      <div class="content-left">
        <el-card class="content-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon><DocumentText /></el-icon>
              <span>任务详情</span>
            </div>
          </template>
          <!-- 使用 v-html 时要确保内容是可信的，防止 XSS 攻击 -->
          <div class="task-description" v-html="studyDetails.description"></div>
        </el-card>

        <el-card v-if="task_fileList.length > 0" class="content-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon><FolderOpened /></el-icon>
              <span>任务附件</span>
            </div>
          </template>
          <el-table :data="task_fileList" style="width: 100%">
            <el-table-column prop="fileName" label="文件名" show-overflow-tooltip />
            <el-table-column label="操作" width="120" align="center">
              <template #default="scope">
                <el-button @click="downloadFile(scope.row.fileUrl, scope.row.fileName)" type="primary" link size="small">
                  <el-icon style="margin-right: 4px;"><Download /></el-icon>下载
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>

      <!-- 右侧：提交区域 -->
      <div class="content-right">
        <el-card class="submission-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon><EditPen /></el-icon>
              <span>提交我的任务</span>
            </div>
          </template>
          <el-form :model="answerStudyTask" label-position="top">
            <el-form-item label="完成情况说明">
              <wangeditor v-model="answerStudyTask.userFinishDesc" />
            </el-form-item>
            
            <el-form-item label="上传附件">
              <!-- 将上传组件和已上传列表整合在一起，体验更好 -->
              <FileUploadNoPost :value="postFileList" class="upload-component"></FileUploadNoPost>
            </el-form-item>

            <!-- 已提交的文件列表 -->
            <div v-if="user_fileList.length > 0" class="uploaded-list">
                <el-divider>已提交的文件</el-divider>
                <el-table :data="user_fileList" style="width: 100%">
                    <el-table-column prop="fileName" label="文件名" show-overflow-tooltip />
                    <el-table-column label="操作" width="160" align="center">
                        <template #default="scope">
                            <el-button tag="a" target="_blank" :href="scope.row.fileUrl" type="primary" link size="small">查看</el-button>
                            <el-button @click="deleteFile(scope.row.id)" type="danger" link size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
          </el-form>
          
          <template #footer>
            <div class="submission-footer">
                <el-button type="primary" @click="answerTask" size="large" :disabled="isSubmitting">
                    <el-icon style="margin-right: 8px;"><Promotion /></el-icon>
                    {{ isSubmitting ? '正在提交...' : '确认提交' }}
                </el-button>
            </div>
          </template>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { StudyApi } from '@/api/study'
import { FileApi } from '@/api/file'
import { resourceApi } from '@/api/resource'
import { v4 as uuidv4 } from 'uuid';
import FileUpload from '@/components/FileUpload.vue'
import wangeditor from '@/components/wangeditor.vue'
import FileUploadNoPost from "@/components/FileUploadNoPost.vue"

export default {
  name: 'StudyDetails',
  components: { wangeditor, FileUpload, FileUploadNoPost },
  data() {
    return {
      studyDetails: {},
      task_fileList: [],
      user_fileList: [],
      postFileList: [],
      answerStudyTask: {
        "taskId": "",
        "userFinishDesc": "",
        "userFinishDescResoursefileid": ""
      }
    }
  },
  methods: {
    // 根据id获取任务信息
    async getStudyDetails() {
      const res = await StudyApi.getStudyTaskById(this.$route.query.id)
      this.studyDetails = res.data
      this.findFileByUuid(this.studyDetails.resourceFileUuid)
    },

    // resourceFileUuid 根据文件uuid获取文件列表
    async findFileByUuid(resourceFileUuid) {
      const res = await FileApi.findFileByUuid(resourceFileUuid)
      this.task_fileList = res.data
    },
    // 根据文件uuid获取用户文件列表
    async findFileByUserUuid(resourceFileUuid) {
      const res = await FileApi.findFileByUuid(resourceFileUuid)
      this.user_fileList = res.data
    },

    // 回答任务
    async answerTask() {
      this.answerStudyTask.taskId = this.$route.query.id;
      await StudyApi.answerStudyTask(this.answerStudyTask);
      if (this.postFileList.length > 0) {
        await this.submitResourceFiles();
      }
      this.findFileByUserUuid(this.answerStudyTask.userFinishDescResoursefileid);
      this.$message.success('任务提交成功')
    },

    // 提交任务文件
    async submitResourceFiles() {
        try {
          await resourceApi.submitResourceFiles(this.postFileList, this.answerStudyTask.userFinishDescResoursefileid);
          this.$message.success('文件提交成功')
          console.log("提交文件成功");
        } catch (error) {
          this.$message.success('文件提交失败')
          console.error('添加文件失败:', error);
        }
    },

    // 根据任务id获取回答信息
    /**
     * 获取答题学习任务详情
     * 根据路由参数ID获取答题任务数据，若不存在则初始化用户完成描述的文件ID
     * 若存在则设置用户完成描述和文件ID，并查找对应文件
     * @async
     */
    async getAnswerStudyTask() {
      const res = await StudyApi.getAnswerTaskById(this.$route.query.id)
      if (res.data == null) {
        this.answerStudyTask.userFinishDescResoursefileid = uuidv4()
      } else {
        this.answerStudyTask.userFinishDesc = res.data.userFinishDesc
        this.answerStudyTask.userFinishDescResoursefileid = res.data.userFinishDescResoursefileid
        this.findFileByUserUuid(this.answerStudyTask.userFinishDescResoursefileid)
      }
    },
    // 根据文件id删除文件
    deleteFile(fileId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {}).then(async () => {
        try {
          await resourceApi.deleteResourceFile(fileId)
          this.findFileByUserUuid(this.answerStudyTask.userFinishDescResoursefileid)
        } catch (error) {
          console.log(error);
        }
      })
    },
    // 文件下载
    downloadFile(fileUrl, fileName) {
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = fileName;
      a.style.display = 'none'; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); 
    }
  },
  created() {
    this.getStudyDetails()
    this.getAnswerStudyTask()
  }
}
</script>

<style lang="less" scoped>
// 使用 scoped 来确保样式只作用于当前组件
// 引入一些全局变量会更好，这里为了演示直接写颜色
:root {
  --custom-card-header-bg: #f9fafb;
  --custom-border-color: #e4e7ed;
}

.study-details-container {
  padding: 20px;
  background-color: #f0f2f5; // 给页面一个浅灰色背景，突出卡片
}

// 页面头部卡片
.page-header-card {
  border: none; // 去掉边框，让它更像一个页头而不是普通卡片
  margin-bottom: 20px;
  background-color: #ffffff;
  
  .header-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .header-title {
    display: flex;
    align-items: center;
    gap: 12px;
    
    h1 {
      font-size: 24px;
      font-weight: 600;
      color: #303133;
      margin: 0; // 重置 h1 的默认 margin
    }
    
    .title-icon {
      color: var(--el-color-primary);
    }
  }

  // .header-meta {
  //   font-size: 14px;
  //   color: #909399;
  //   display: flex;
  //   gap: 20px;
  // }
}

// 主体内容网格布局
.main-content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr; // 左右分栏，左边是右边的两倍宽
  gap: 20px;
}

// 左侧内容区
.content-left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content-card, .submission-card {
  border-radius: 12px; // 更大的圆角，更显柔和
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); // 一个更细微的初始阴影
  transition: transform 0.3s ease, box-shadow 0.3s ease; // 添加过渡效果

  &:hover {
    transform: translateY(-5px); // 鼠标悬浮时轻微上浮
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08); // 阴影变深，立体感更强
  }
  
  :deep(.el-card__header) {
    background-color: #ffffff; // 头部和身体同色，通过边框分割
    border-bottom: 1px solid #f0f0f0; // 一条非常细的分割线
  }
}

// 任务描述样式
.task-description {
  font-size: 14px;
  line-height: 1.8;
  color: #606266;

  // 如果 v-html 包含标题、列表等，可以做一些样式穿透优化
  :deep(h1), :deep(h2), :deep(h3) {
    margin-top: 1.2em;
    margin-bottom: 0.6em;
    font-weight: 600;
  }
  :deep(p) {
    margin-bottom: 1em;
  }
  :deep(ul), :deep(ol) {
    padding-left: 20px;
  }
}

// 提交区域卡片
.submission-card {
  position: sticky; // 右侧提交区吸顶，方便长页面操作
  top: 20px;

  .upload-component {
    width: 100%; // 让上传组件撑满
  }
  
  .uploaded-list {
      margin-top: 10px;
  }

  .submission-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 0 0;
  }
}

// 表格按钮使用 link 类型，更简洁
.el-table .el-button--text {
  padding-left: 0;
  padding-right: 0;
}

// 响应式布局：当屏幕宽度小于 992px 时，变为单栏布局
@media (max-width: 992px) {
  .main-content-grid {
    grid-template-columns: 1fr; // 变为一列
  }
  .submission-card {
    position: static; // 取消吸顶
  }
}
</style>