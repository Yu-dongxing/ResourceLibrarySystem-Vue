<template>
  <div class="StudyDetails">
    <!-- 任务主题 -->
    <el-card class="ccard display-center" shadow="hover">
        <el-text class="title">{{ studyDetails.taskTitle }}</el-text>
    </el-card>
    
    <!-- 任务详细信息和附件布局 -->
    <div class="content-area">
      <!-- 任务详细信息 -->
      <el-card class="ccard details-info">
        <template #header>
            <div class="header card-header">
                <el-icon><Grid /></el-icon>
                <el-text style="margin-left: 10px">任务详细内容</el-text>
            </div>
        </template>
        <div class="hhtml" v-html="studyDetails.description"></div>
      </el-card>
      
      <!-- 任务附件 -->
      <el-card class="ccard attachment-info">
        <template #header>
            <div class="header card-header">
                <el-icon><Document /></el-icon>
                <el-text style="margin-left: 10px">任务附件</el-text>
            </div>
        </template>
        <el-table :data="task_fileList">
          <!-- fileName -->
          <el-table-column prop="fileName" label="文件名" />
          <el-table-column  label="附件下载" >
            <template #default="scope">
              <el-button @click="downloadFile(scope.row.fileUrl,scope.row.fileName)" type="primary" size="small">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    
    <!-- 任务完成提交 -->
    <el-card class="ccard">
        <template #header>
            <div class="header card-header">
                <el-icon><Finished /></el-icon>
                <el-text style="margin-left: 10px;">提交任务</el-text>
            </div>
        </template>
        <el-form :model="answerStudyTask"  class="demo-ruleForm">
            <el-form-item>
                <wangeditor v-model="answerStudyTask.userFinishDesc" />
            </el-form-item>
            <el-form-item label="选择附件">
                <FileUploadNoPost :value="postFileList"></FileUploadNoPost>
            </el-form-item>
            <el-table :data="user_fileList">
              <el-table-column prop="fileName" label="文件名" />
              <el-table-column  label="操作" >
                <template #default="scope">
                  <el-button tag="a" target="_blank" :href="scope.row.fileUrl" type="primary" size="small">查看</el-button>
                  <el-button @click="deleteFile(scope.row.id)" type="danger" size="small">删除</el-button>
                </template>
              </el-table-column>
          </el-table>
        </el-form>
        <template #footer>
          <el-button style="float: right;" type="primary" @click="answerTask">提交</el-button>
        </template>
    </el-card>
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
.margin-top-10 {
  margin-top: 10px;
}
.title {
  font-size: large;
  font-weight: bold;
  color: var(--text-200);
}
.icon-q {
  color: var(--el-text-color);
}
.display-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.display-x-center {
    display: flex;
    align-items: center;
}
.ccard {
  border-radius: 15px;
  margin-bottom: 10px;
}
.card-header {
  display: flex;
  align-items: center;
  color: var(--el-text-color);
}
.el-card__footer {
   display: flex;
   justify-content: flex-end;
}

/* 任务详细信息和附件布局 */
.content-area {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
}

.details-info, .attachment-info {
  width: 100%;
}
// .attachment-info{
//   width: 50%;
// }
/* 小屏布局调整 */
@media (max-width: 768px) {
  .content-area {
    grid-template-columns: 1fr;
  }
}
</style>