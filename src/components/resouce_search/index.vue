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
      <el-empty description="未能找到相关资源">
        <template #default>
            <p>尝试更换一个关键词搜索吧</p>
        </template>
      </el-empty>
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
  background-color: var(--bg-200); 
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
  background: var(--bg-200);
  color: var(--app-text-color-secondary);
}

.card-content {
  padding: 16px;
  flex-grow: 1;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--app-text-color-primary);
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-author {
  font-size: 0.9rem;
  color: var(--app-text-color-secondary);
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
  background: var(--app-border-color-light);
  animation: skeleton-flash 1.5s infinite ease-in-out;
}

.skeleton-content {
  padding: 16px;
}

.skeleton-line {
  height: 16px;
  margin-bottom: 10px;
  border-radius: 4px;
  background: var(--app-border-color-light);
  animation: skeleton-flash 1.5s infinite ease-in-out;
}

.search-nothing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  color: var(--app-text-color-secondary);
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
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
</style>