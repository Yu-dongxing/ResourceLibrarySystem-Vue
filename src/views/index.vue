<template>
  <div class="app-container" :class="{ 'is-collapsed': isCollapse }">
    <!-- Mobile Overlay -->
    <div class="mobile-overlay" :class="{ 'is-open': isMobileMenuOpen }" @click="toggleMobileMenu"></div>

    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'mobile-open': isMobileMenuOpen }">
      <div class="sidebar-header">
        <h1 class="logo">
          <el-icon class="logo-icon"><Grid /></el-icon>
          <span class="logo-text">资源库</span>
        </h1>
        <!-- Collapse Button (Desktop) -->
        <div class="collapse-trigger" @click="toggleCollapse">
            <el-icon v-if="isCollapse"><Expand /></el-icon>
            <el-icon v-else><Fold /></el-icon>
        </div>
      </div>
      
      <nav class="sidebar-nav custom-scrollbar">
        <router-link to="/" class="nav-item" active-class="active">
          <el-icon><HomeFilled /></el-icon>
          <span class="nav-text">首页</span>
        </router-link>
        <router-link to="/study" class="nav-item" active-class="active">
          <el-icon><Reading /></el-icon>
          <span class="nav-text">学习任务</span>
        </router-link>
        <router-link to="/user" class="nav-item" active-class="active">
          <el-icon><User /></el-icon>
          <span class="nav-text">我的资源</span>
        </router-link>
        <router-link to="/about" class="nav-item" active-class="active">
          <el-icon><Timer /></el-icon>
          <span class="nav-text">更新日志</span>
        </router-link>

        <div class="nav-divider">
          <p class="divider-text">分类</p>
          <el-divider v-if="isCollapse" style="margin: 12px 0;" />
        </div>

        <router-link to="/category/code" class="nav-item" active-class="active">
          <el-icon class="text-blue"><files /></el-icon>
          <span class="nav-text">代码库</span>
        </router-link>
        <router-link to="/category/docs" class="nav-item" active-class="active">
          <el-icon class="text-green"><Document /></el-icon>
          <span class="nav-text">技术文档</span>
        </router-link>
        <router-link to="/category/tools" class="nav-item" active-class="active">
          <el-icon class="text-amber"><Tools /></el-icon>
          <span class="nav-text">开发工具</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button class="theme-toggle-btn" @click="toggleTheme">
          <el-icon v-if="isDark"><Moon /></el-icon>
          <el-icon v-else><Sunny /></el-icon>
          <span class="nav-text">切换主题</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="main-header">
        <!-- Mobile Menu Button -->
        <div class="mobile-menu-btn" @click="toggleMobileMenu">
            <el-icon><Menu /></el-icon>
        </div>

        <div class="header-search-container">
          <div class="search-input-wrapper">
            <el-icon class="search-icon"><Search /></el-icon>
            <input 
              v-model="searchKeyword" 
              @keyup.enter="handleSearch"
              class="custom-search-input" 
              placeholder="请输入关键字搜索资源..." 
              type="text"
            />
          </div>
        </div>
        
        <div class="header-actions">
          <button class="add-btn" @click="$router.push('/add')">
            <el-icon size="20"><Plus /></el-icon>
            <span class="btn-text">添加资源</span>
          </button>
          
          <div class="user-avatar-container" @click="$router.push('/user')">
            <img 
              :src="userInfo?.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" 
              alt="User Avatar" 
              class="user-avatar"
            />
          </div>
        </div>
      </header>

      <el-scrollbar class="content-scroll">
        <div class="page-content">
           <router-view></router-view>
        </div>
        <FooterIndex />
      </el-scrollbar>
    </main>
  </div>
</template>

<script>
import FooterIndex from '@/components/footer/FooterIndex.vue'
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { iplogApi } from '@/api/ip_log'
import { sysinfoApi } from '@/api/sys_info'
import axios from 'axios'
import { ElNotification } from 'element-plus'

export default {
  name: 'index',
  components: {
    FooterIndex
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const searchKeyword = ref('')
    const isCollapse = ref(false)
    const isMobileMenuOpen = ref(false)
    
    const userInfo = computed(() => store.state.user.userInfo)
    const isDark = computed(() => store.state.theme.isDark)
    
    const toggleTheme = () => store.dispatch('theme/toggleTheme')
    
    const handleSearch = () => {
      router.push({ path: '/search', query: { keyword: searchKeyword.value } })
    }

    const toggleCollapse = () => {
        isCollapse.value = !isCollapse.value
    }

    const toggleMobileMenu = () => {
        isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    // 路由变化时关闭移动端菜单
    watch(() => router.currentRoute.value, () => {
        isMobileMenuOpen.value = false
    })

    return {
      userInfo,
      isDark,
      toggleTheme,
      searchKeyword,
      handleSearch,
      isCollapse,
      toggleCollapse,
      isMobileMenuOpen,
      toggleMobileMenu
    }
  },
  methods: {
    // 获取IP地址api
    getUserInfo() {
      axios.get('https://ip.011102.xyz')
        .then(response => {
          const ipData = response.data.IP;
          const headers = response.data.Headers;
          
          const ip_access_log = {
            ipAddress: ipData.IP,
            ipCity: ipData.City,
            ipProvince: ipData.Region,
            ipUserDevice: headers['sec-ch-ua-platform'] || 'Unknown',
            ipUserAgent: headers['user-agent']
          };
          this.onSubmit(ip_access_log);
        })
        .catch(error => {
          console.log('IP fetch skipped');
        });
    },
    async onSubmit(data) {
        try {
          await iplogApi.postIpLog(data)
        } catch (error) {
          // ignore
        }
    },
    async getSysWelcomeInfo() {
      try {
        const res = await sysinfoApi.getSysWelcomeInfo();
        if(res.data) {
          ElNotification({
            title: res.data.infoView,
            dangerouslyUseHTMLString: true,
            message: res.data.infoDesc,
            type: 'success',
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getUserInfo()
    this.getSysWelcomeInfo()
  }
}
</script>

<style lang="less" scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background-color: var(--app-bg-color);
  color: var(--app-text-color-primary);
  transition: all 0.3s;
}

/* Mobile Overlay */
.mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 15;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    backdrop-filter: blur(2px);
}

.mobile-overlay.is-open {
    opacity: 1;
    visibility: visible;
}

/* Sidebar Styles */
.sidebar {
  width: 256px;
  background-color: var(--sidebar-bg-color);
  border-right: 1px solid var(--app-border-color);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 20;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  left: 0;
  top: 0;
}

.sidebar-header {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  box-sizing: border-box;
  
  .logo {
    font-size: 24px;
    font-weight: 700;
    color: var(--primary-200);
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    white-space: nowrap;
    
    .logo-icon {
      font-size: 24px;
      flex-shrink: 0;
    }
  }
}

.collapse-trigger {
    cursor: pointer;
    color: var(--app-text-color-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
        background-color: var(--item-hover-bg-color);
        color: var(--primary-200);
    }
}

.sidebar-nav {
  flex: 1;
  padding: 0 16px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  color: var(--app-text-color-regular);
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
  height: 48px;
  box-sizing: border-box;
  
  .el-icon {
    font-size: 20px;
    flex-shrink: 0;
  }
  
  &:hover {
    background-color: var(--item-hover-bg-color);
    color: var(--app-text-color-primary);
  }
  
  &.active {
    background-color: rgba(59, 130, 246, 0.1); /* blue-50/blue-900/20 approx */
    color: var(--primary-200);
  }
}

.nav-divider {
  padding: 24px 16px 8px;
  
  .divider-text {
    font-size: 12px;
    font-weight: 600;
    color: var(--app-text-color-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
    white-space: nowrap;
  }
}

.text-blue { color: #3b82f6; }
.text-green { color: #10b981; }
.text-amber { color: #f59e0b; }

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid var(--app-border-color);
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: none;
  background: transparent;
  color: var(--app-text-color-regular);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  white-space: nowrap;
  height: 48px;
  box-sizing: border-box;
  
  .el-icon {
      font-size: 20px;
      flex-shrink: 0;
  }
  
  &:hover {
    background-color: var(--item-hover-bg-color);
  }
}

/* Collapsed State Styles */
.app-container.is-collapsed {
    .sidebar {
        width: 80px;
    }
    
    .main-content {
        margin-left: 80px;
    }

    .logo-text, .nav-text, .divider-text {
        display: none;
        opacity: 0;
    }
    
    .sidebar-header {
        justify-content: center;
        padding: 24px 0;
        flex-direction: column;
        gap: 10px;
    }
    
    .nav-item, .theme-toggle-btn {
        justify-content: center;
        padding: 12px;
    }
    
    .nav-divider {
        padding: 12px;
        display: flex;
        justify-content: center;
    }
}

/* Main Content Styles */
.main-content {
  flex: 1;
  margin-left: 256px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.main-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--header-bg-color);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--app-border-color);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mobile-menu-btn {
    display: none;
    cursor: pointer;
    font-size: 24px;
    margin-right: 16px;
    color: var(--app-text-color-primary);
}

.header-search-container {
  flex: 1;
  max-width: 600px;
  margin: 0 auto;
}

.search-input-wrapper {
  position: relative;
  
  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--app-text-color-secondary);
    font-size: 20px;
  }
  
  .custom-search-input {
    width: 100%;
    padding: 10px 16px 10px 48px;
    background-color: var(--item-hover-bg-color); /* slate-100 */
    border: none;
    border-radius: 16px;
    color: var(--app-text-color-primary);
    font-size: 14px;
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box; /* Important for width: 100% */
    
    &::placeholder {
      color: var(--app-text-color-placeholder);
    }
    
    &:focus {
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 24px;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--primary-200);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 16px;
  border: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.2);
  transition: all 0.2s;
  white-space: nowrap;
  
  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
}

.user-avatar-container {
  width: 40px;
  height: 40px;
  border-radius: 16px;
  background-color: var(--app-border-color);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  
  &:hover {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
  
  .user-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.content-scroll {
  flex: 1;
  /* height: calc(100vh - 73px);  Adjust based on header height */
}

.page-content {
  padding: 32px;
}

/* Mobile Responsive */
@media screen and (max-width: 1024px) {
  .app-container.is-collapsed .main-content {
      margin-left: 0;
  }
  
  .sidebar {
    transform: translateX(-100%);
    width: 256px !important; /* Force width on mobile */
    
    // Ensure text labels are visible on mobile even if isCollapse is true
    .logo-text, .nav-text, .divider-text {
        display: block !important;
        opacity: 1 !important;
    }
    
    .sidebar-header {
        justify-content: space-between !important;
        padding: 24px !important;
        flex-direction: row !important;
    }
    
    .nav-item, .theme-toggle-btn {
        justify-content: flex-start !important;
        padding: 12px 16px !important;
    }
  }
  
  .sidebar.mobile-open {
      transform: translateX(0);
  }
  
  .main-content {
    margin-left: 0;
  }

  .mobile-menu-btn {
      display: block;
  }
  
  .collapse-trigger {
      display: none; /* Hide collapse button on mobile */
  }
  
  .header-actions .btn-text {
      display: none;
  }
  
  .add-btn {
      padding: 10px;
  }
  
  .page-content {
      padding: 16px;
  }
}
</style>