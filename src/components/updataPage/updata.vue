<template>
  <div class="update-log-page">
    <div class="timeline-container">
      <el-timeline v-if="updataLog.length > 0">
        <el-timeline-item
          v-for="(item, index) in updataLog"
          :key="index"
          :timestamp="item.logCreatTime"
          placement="top"
          :type="item.type || 'primary'"
          hollow
          class="log-timeline-item"
        >
          <el-card 
            class="log-card" 
            :class="`log-card--${item.type || 'primary'}`" 
            shadow="never"
            :style="{'animation-delay': `${index * 100}ms`}"
          >
            <template #header>
              <div class="card-header">
                <!-- 重点1: 图标颜色也动态绑定 -->
                <el-icon class="header-icon" :color="getTypeColor(item.type)"><CollectionTag /></el-icon>
                <span class="log-title">{{ item.logTitle }}</span>
              </div>
            </template>
            <div class="log-description" v-html="formatDescription(item.desc)"></div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-empty v-else description="暂无更新日志"></el-empty>
    </div>
  </div>
</template>

<script>
import { CollectionTag } from '@element-plus/icons-vue';
import { Update_Log_Api } from '@/api/update_log';

export default {
  components: {
    CollectionTag,
  },
  data() {
    return {
      updataLog: []
    }
  },
  methods: {
    async getUpdataLog() {
      try {
        const res = await Update_Log_Api.getAllLog();
        if (res && Array.isArray(res.data)) {
          this.updataLog = res.data;
        } else {
          console.error("日志数据格式不正确");
          this.updataLog = [];
        }
      } catch (error) {
        console.error("获取更新日志失败:", error);
        this.updataLog = [];
      }
    },
    // 重点2: 新增一个方法，根据类型返回对应的颜色值
    getTypeColor(type) {
      switch (type) {
        case 'success': return 'var(--el-color-success)';
        case 'warning': return 'var(--el-color-warning)';
        case 'danger': return 'var(--el-color-danger)';
        case 'info': return 'var(--el-color-info)';
        case 'primary':
        default:
          return 'var(--el-color-primary)';
      }
    },
    formatDescription(desc) {
      if (!desc) return '';
      return desc.replace(/\n/g, '<br />');
    }
  },
  computed: {
    reversedUpdataLog() {
      return this.updataLog.slice().reverse();
    }
  },
  created() {
    this.getUpdataLog();
  },
}
</script>

<style scoped>
.update-log-page {
  padding: 40px 20px;
  /* background-color: #f5f7fa; */
  min-height: 100vh;
}

.timeline-container {
  max-width: 800px;
  margin: 0 auto;
}

/* --- 卡片样式 --- */
.log-card {
  /* 默认边框，确保四个边都有一个基础样式 */
  border: 1px solid var(--app-border-color-light); 
  border-radius: 8px;
  background-color: var(--card-bg-color);
  /* 重点3: 明确定义左侧边框的宽度和样式 */
  border-left-width: 4px;
  border-left-style: solid;
  transition: all 0.3s ease;
  
  /* 入场动画 */
  opacity: 0;
  transform: translateY(30px);
  animation: card-fade-in 0.5s ease-out forwards;
}

.log-card:hover {
  box-shadow: 0 8px 24px -8px rgba(0, 32, 64, 0.15);
  transform: translateY(-5px);
}

/* 重点4: 直接为每个类型设置颜色，不再使用CSS变量，更直接可靠 */
.log-card--primary { border-left-color: var(--el-color-primary); }
.log-card--success { border-left-color: var(--el-color-success); }
.log-card--warning { border-left-color: var(--el-color-warning); }
.log-card--danger { border-left-color: var(--el-color-danger); }
.log-card--info { border-left-color: var(--el-color-info); }


/* 卡片头部 */
.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
}
.header-icon {
  font-size: 18px;
  /* 颜色已通过 :color 属性动态绑定 */
}
.log-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--app-text-color-primary);
}

/* 卡片内容 */
.log-description {
  line-height: 1.7;
  color: var(--app-text-color-regular);
  font-size: 14px;
  padding: 0 4px;
}

/* --- 动画定义 --- */
@keyframes card-fade-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* --- 深度修改 Element Plus 样式 --- */
:deep(.el-timeline-item) {
  padding-bottom: 20px;
}
:deep(.el-timeline-item__timestamp) {
  font-size: 14px;
  color: var(--app-text-color-secondary);
  margin-bottom: 12px;
}
:deep(.el-timeline-item__node) {
  width: 14px;
  height: 14px;
  border-width: 3px;
  left: -4px;
}
:deep(.el-card__header) {
  padding: 15px 20px;
  border-bottom: none;
}
:deep(.el-card__body) {
  padding: 0px 20px 20px;
}
</style>