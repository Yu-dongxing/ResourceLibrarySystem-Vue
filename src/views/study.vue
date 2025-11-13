<template>
  <div class="study-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" v-for="item in tasks" :key="item.id">
        <el-card class="task-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <div class="header-left">
                <el-icon><Reading /></el-icon>
                <span class="task-main-title">{{ item.title }}</span>
              </div>
              <el-tag :type="isOverdue(item.dueDate) ? 'danger' : 'success'">
                {{ isOverdue(item.dueDate) ? '已截止' : '进行中' }}
              </el-tag>
            </div>
          </template>

          <el-descriptions :column="1" border>
            <el-descriptions-item label="任务内容" label-class-name="my-label">
              {{ item.taskTitle }}
            </el-descriptions-item>
            <el-descriptions-item label="截止日期">
              <el-tag size="small" type="warning">{{ item.dueDate }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">
              <el-tag size="small">{{ item.createdAt }}</el-tag>
            </el-descriptions-item>
          </el-descriptions>

          <div class="card-footer">
            <el-button type="primary" plain @click="goDetail(item.id)">
              查看详情
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { StudyApi } from '@/api/study';
// 确保你已经从 element-plus 引入了图标
import { Reading } from '@element-plus/icons-vue';

export default {
  components: {
    Reading,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async getTasksAll() {
      try {
        // 模拟API数据
        // const res = {
        //     data: [
        //         { id: 1, title: 'Vue 3 深入学习', taskTitle: '完成官方文档的“深入组件”章节阅读和练习。', createdAt: '2025-11-10', dueDate: '2025-12-01' },
        //         { id: 2, title: 'Webpack 配置优化', taskTitle: '学习并实践代码分割和懒加载技术。', createdAt: '2025-11-01', dueDate: '2025-11-20' },
        //         { id: 3, title: 'TypeScript 实战', taskTitle: '使用 TypeScript 重构一个小型项目。', createdAt: '2025-11-12', dueDate: '2025-12-15' },
        //     ]
        // };
        const res = await StudyApi.getAllStudyTasks();
        this.tasks = res.data;
      } catch (e) {
        console.error(e);
      }
    },
    goDetail(id) {
      this.$router.push({ path: '/StudyDetails', query: { id: id } });
    },
    // 判断任务是否过期
    isOverdue(dueDate) {
      return new Date(dueDate) < new Date();
    },
  },
  created() {
    this.getTasksAll();
  },
};
</script>

<style scoped>
.study-container {
  padding: 20px;
}

.task-card {
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.task-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
}

.header-left .el-icon {
    margin-right: 8px;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

/* 自定义描述列表的标签样式 */
.my-label {
    width: 80px;
}
</style>