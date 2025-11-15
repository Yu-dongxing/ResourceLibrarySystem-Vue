<template>
  <div class="resource-search-container">
    <!-- SKELETON LOADING / 骨架屏加载 -->
    <div v-if="isLoading" class="cards-grid">
      <div v-for="i in 6" :key="i" class="card-skeleton">
        <div class="skeleton-image"></div>
        <div class="skeleton-content">
          <div class="skeleton-line" style="width: 70%;"></div>
          <div class="skeleton-line" style="width: 40%;"></div>
          <div class="skeleton-line" style="width: 50%; height: 24px; margin-top: 10px;"></div>
        </div>
      </div>
    </div>

    <!-- SEARCH RESULTS / 搜索结果 -->
    <div v-else-if="resouce_data.length > 0" class="cards-grid">
      <div
        v-for="(item, index) in resouce_data"
        :key="item.id || index"
        class="resource-card"
        :style="{ animationDelay: index * 0.05 + 's' }"
        @click="goDetail(item.id)"
      >
        <div class="card-image-wrapper">
          <el-image :src="item.img" fit="contain" class="card-image" lazy>
            <template #placeholder>
              <div class="image-slot">加载中...</div>
            </template>
            <!-- 增加一个 error 插槽，优化图片加载失败时的显示 -->
            <template #error>
              <div class="image-slot">
                <i class="el-icon-picture-outline" style="font-size: 30px;"></i>
              </div>
            </template>
          </el-image>
        </div>
        <div class="card-content">
          <h3 class="card-title">{{ item.name }}</h3>
          <p class="card-author">作者: {{ item.author }}</p>
          <div class="card-tags">
            <el-tag type="success" size="small" effect="light" round>
              {{ item.tab }}
            </el-tag>
          </div>
        </div>
        <div class="card-footer">
          <el-button type="primary" round color="#626aef" plain @click.stop="goDetail(item.id)">
            查看详情
          </el-button>
        </div>
      </div>
    </div>

    <!-- NOT FOUND / 空状态 -->
    <div v-else class="search-nothing">
      <!-- 
        修复点 1: 替换失效的 img 标签为内联 SVG
        使用内联 SVG 可以保证图标始终可用，不受外部链接影响，且加载速度快。
        这是 Ant Design 默认的空状态插图。
      -->
      <svg width="184" height="152" viewBox="0 0 184 152" xmlns="http://www.w3.org/2000/svg" class="not-found-img">
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668"></ellipse>
            <path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.22-4.593-2.22h-51.44c-1.766 0-3.444.833-4.592 2.22L13.56 69.674v15.383h108.473V69.674z" fill="#AEB8C2"></path>
            <path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.092-1.867H31.99c-1.585 0-3.091.66-4.092 1.867L6.796 86.214v15.383h94.74v-15.383z" fill="url(#linearGradient-1)" transform="translate(13.56)"></path>
            <path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.333a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7"></path>
            <path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 73.293h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524z" fill="#DCE0E6"></path>
          </g>
          <path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c.29-1.03.836-1.97 1.56-2.763L154.06 20.43c.803-.896.803-2.36 0-3.256L150.52 14.32c-.803-.896-2.09-.896-2.893 0l-7.465 8.32c-.724.804-1.27 1.75-1.56 2.764l-1.938 6.206a1 1 0 0 1-1.316 1.23l-6.83-2.65c-1.096-.425-2.35.023-2.924 1.054l-3.588 6.215c-.574 1.03.023 2.35 1.12 2.776l6.83 2.65a1 1 0 0 1 .723 1.93l-1.937 6.207c-.29 1.03-.836 1.97-1.56 2.763l-7.466 8.32c-.802.896-.802 2.36 0 3.256l3.54 3.95c.803.896 2.09.896 2.893 0l7.465-8.32c.724-.804 1.27-1.75 1.56-2.764l1.938-6.206a1 1 0 0 1 .722-1.93l6.83 2.65c1.096.425 2.35-.023 2.924-1.054l3.588-6.215c.573-1.03-.024-2.35-1.12-2.776z" fill="#9FB0C1"></path>
        </g>
        <defs>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
            <stop stop-color="#fff" offset="0%"></stop>
            <stop stop-color="#F5F5F7" offset="100%"></stop>
          </linearGradient>
        </defs>
      </svg>
      <h3>未能找到相关资源</h3>
      <p>尝试更换一个关键词搜索吧</p>
    </div>
  </div>
</template>

<script>
import { resourceApi } from '@/api/resource';
export default {
  name: 'resource_search',
  data() {
    return {
      keyword: '',
      resouce_data: [],
      isLoading: true,
    };
  },
  methods:{
    async searchResource(keyword){
      try{
        this.isLoading = true;
        // await new Promise(resolve => setTimeout(resolve, 500)); 
        const res = await resourceApi.searchResource(keyword);
        this.resouce_data = res.data;
        this.isLoading = false;
      } catch(error){
        this.isLoading = false;
        console.log(error);
      }
    },
    goDetail(id) {
        this.$router.push({ path: '/detail', query:  { id: id } });
    },
  },
  watch: {
    '$route.query.keyword': {
      handler(newVal) {
        // 修复点 2: 处理空关键字
        // 如果路由中的关键字是 undefined, null 或空字符串，我们用一个空格字符串去搜索，
        // 这通常用于在后端接口代表“查询所有”。
        const keywordForSearch = (newVal === undefined || newVal === null || newVal.trim() === '') 
          ? ' ' 
          : newVal;
        
        // 保持组件内部的 keyword 状态与路由参数同步（可以为空字符串）
        this.keyword = newVal || ''; 

        this.searchResource(keywordForSearch);
      },
      immediate: true // 确保组件加载时立即执行一次 handler
    }
  },
  // 'created' 钩子中的逻辑已被 'watch' 的 'immediate: true' 覆盖，可以安全移除以简化代码
  created() {} 
}
</script>

<style lang="less" scoped>
// 样式部分保持不变
:root {
  --card-bg-color: #ffffff;
  --card-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  --card-hover-shadow: 0 12px 24px rgba(98, 106, 239, 0.2);
  --primary-color: #626aef;
  --text-color-primary: #333;
  --text-color-secondary: #888;
}

.resource-search-container {
  padding: 20px;
  min-height: 80vh;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
}

.resource-card {
  background-color: var(--card-bg-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  animation: card-fade-in 0.5s ease-out forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--card-hover-shadow);
  }
}

.card-image-wrapper {
  width: 100%;
  padding-top: 60%; 
  position: relative;
  overflow: hidden;
  background-color: #f5f7fa; 
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease;

  .resource-card:hover & {
    transform: scale(1.05);
  }
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: var(--text-color-secondary);
}

.card-content {
  padding: 16px;
  flex-grow: 1;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color-primary);
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-author {
  font-size: 0.9rem;
  color: var(--text-color-secondary);
  margin: 0 0 12px 0;
}

.card-footer {
  padding: 0 16px 16px;
  display: flex;
  justify-content: flex-end;
}

.card-skeleton {
  background-color: var(--card-bg-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
}

.skeleton-image {
  width: 100%;
  padding-top: 60%;
  background: #f2f3f5;
  animation: skeleton-flash 1.5s infinite ease-in-out;
}

.skeleton-content {
  padding: 16px;
}

.skeleton-line {
  height: 16px;
  margin-bottom: 10px;
  border-radius: 4px;
  background: #f2f3f5;
  animation: skeleton-flash 1.5s infinite ease-in-out;
}

.search-nothing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  color: var(--text-color-secondary);
  opacity: 0;
  animation: card-fade-in 0.5s ease-out forwards;
}
.not-found-img {
    margin-bottom: 24px;
}

@keyframes card-fade-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes skeleton-flash {
  0% { background-color: #f2f3f5; }
  50% { background-color: #e6e8eb; }
  100% { background-color: #f2f3f5; }
}
</style>