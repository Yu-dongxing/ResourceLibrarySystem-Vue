<template>
  <div class="resource-details-container">
    <!-- 左侧主内容区 -->
    <div class="main-content">
      <!-- 主卡片：标题、描述和操作按钮 -->
      <el-card shadow="never" class="card primary-card">
        <template #header>
          <div class="card-header">
            <div class="card-header-left">
              <el-icon :size="24" class="header-icon"><CollectionTag /></el-icon>
              <span class="card-title">{{ resource.name }}</span>
            </div>
            <div class="card-header-right">
              <el-button 
                v-if="resource.url"
                tag="a" 
                :href="resource.url" 
                target="_blank" 
                type="primary"
                round
              >
                <el-icon><Position /></el-icon>
                <span>访问资源</span>
              </el-button>
            </div>
          </div>
        </template>
        <div class="resource-description" v-html="resource.desc"></div>
      </el-card>
    </div>

    <!-- 右侧辅助信息区 -->
    <div class="sidebar">
      <!-- 资源文件列表卡片 (已移动到此处) -->
      <el-card shadow="never" class="card" v-if="resource.tab === '文件' && resource.fileData && resource.fileData.length > 0">
        <template #header>
          <div class="card-header single-item">
            <el-icon class="header-icon"><FolderOpened /></el-icon>
            <span class="card-title">资源文件</span>
          </div>
        </template>
        <div class="file-list">
          <a v-for="file in resource.fileData" :key="file.id" :href="file.fileUrl" target="_blank" class="file-item-link">
            <div class="file-item">
              <el-icon class="file-icon" :size="20"><Document /></el-icon>
              <span class="file-name">{{ file.fileName }}</span>
              <el-icon class="download-icon"><Download /></el-icon>
            </div>
          </a>
        </div>
      </el-card>

      <!-- 元数据卡片 -->
      <el-card shadow="never" class="card">
        <template #header>
          <div class="card-header single-item">
            <el-icon class="header-icon"><InfoFilled /></el-icon>
            <span class="card-title">元数据</span>
          </div>
        </template>
        <div class="meta-info">
          <div class="meta-item">
            <span class="meta-label">作者</span>
            <span class="meta-value">{{ resource.author || '未知' }}</span>
          </div>
          <el-divider />
          <div class="meta-item">
            <span class="meta-label">更新时间</span>
            <span class="meta-value">{{ resource.updateTime || '未知' }}</span>
          </div>
          <el-divider />
          <div class="meta-item">
            <span class="meta-label">创建时间</span>
            <span class="meta-value">{{ resource.createTime || '未知' }}</span>
          </div>
        </div>
      </el-card>
      <el-card shadow="never" class="card" v-if="resource.tab !== '文件' && url_info.title">
        <template #header>
          <div class="card-header single-item">
            <el-icon class="header-icon"><Link /></el-icon>
            <span class="card-title">网站快照</span>
          </div>
        </template>
        <div class="website-info">
          <p><strong>标题：</strong> {{ url_info.title || '暂无' }}</p>
          <p><strong>描述：</strong> {{ url_info.description || '暂无' }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { resourceApi } from '@/api/resource'
export default {
  name:'resouce_detail',
  data(){
    return{
      // resouceId:'',
      resource:{},
      url_info:{}
    }
  },
  methods:{
    // 根据id获取资源库详情getResourceById(id)
    async getResourceById(id){
      try{
        const res = await resourceApi.getResourceById(id);
        if(res.code === 400){
          this.$router.push('/201');
          console.log(res);
        }else{
          this.resource = res.data;
          console.log(res);
          this.getWebsiteInfo(this.resource.url);
        }
        
      }catch(err){
        console.log(err);
      }
      
    },
    extractDomainurl(url) {
        // 使用URL构造函数解析URL
        const parsedUrl = new URL(url);
        // 返回域名
        return parsedUrl.hostname;
      },
      // 获取网站详细信息 https://api.ahfi.cn/api/websiteinfo?url=
      async getWebsiteInfo(url) {
        if(this.resource.tab =='文件'){
          console.log("不执行");
        }else{
          try {
            const response = await fetch(`https://api.ahfi.cn/api/websiteinfo?url=${url}`);
            const data = await response.json();
            this.url_info=data.data;
            console.log(data.data);
            return true;
            // 处理数据
          } catch (error) {
            console.error(error);
            return false;
          }
        }
      }

  },
  created() {
    // this.resouceId = this.$route.query.id; // 从路由的 query 中获取id
    this.getResourceById(this.$route.query.id);
    
  }
}
</script>

<style lang="less" scoped>
.resource-details-container {
  display: flex;
  gap: 20px;
  padding: 20px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
}

.main-content {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 12px;
  :deep(.el-card__header) {
    padding: 15px 20px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }
  :deep(.el-card__body) {
    padding: 20px;
  }
}

.el-card.is-never-shadow {
    border: 1px solid var(--el-border-color-lighter);
}

// --- 主要修改区域 ---
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between; // 关键属性：让内部元素两端对齐
  width: 100%;

  // 对于那些只有一个标题的 card-header，保持原样
  &.single-item {
    justify-content: flex-start;
    gap: 10px;
  }
}

.card-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
// .card-header-right 不需要额外样式

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.header-icon {
  color: var(--el-color-primary);
}

.primary-card .card-title {
  font-size: 22px; // 可以稍微调整大小以适应布局
}

.resource-description {
  line-height: 1.8;
  color: var(--el-text-color-regular);
  :deep(p) { margin-bottom: 1em; }
  :deep(h3) { font-size: 1.2em; margin-top: 1.5em; }
}

// .action-button-container { // 这个样式不再需要，可以删除
//   display: flex;
//   justify-content: center;
//   margin-top: 20px;
// }

// --- 其他样式保持不变 ---
.website-info p {
  margin: 0 0 10px;
  color: var(--el-text-color-secondary);
  strong {
    color: var(--el-text-color-primary);
    margin-right: 8px;
  }
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.file-item-link {
  text-decoration: none;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  background-color: var(--el-color-success-light-9);
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;

  .file-icon { color: var(--el-color-success); margin-right: 12px; }
  .file-name { flex: 1; color: var(--el-text-color-primary); font-size: 15px; }
  .download-icon { color: var(--el-text-color-placeholder); opacity: 0; transition: opacity 0.3s ease; }

  &:hover {
    background-color: var(--el-color-success-light-8);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    .download-icon { opacity: 1; }
  }
}

.meta-info {
  .meta-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    .meta-label { color: var(--el-text-color-secondary); }
    .meta-value { font-weight: 500; color: var(--el-text-color-primary); }
  }
  .el-divider--horizontal { margin: 8px 0; }
}
</style>