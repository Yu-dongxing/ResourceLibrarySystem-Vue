<template>
  <div class="dashboard-container">
    <!-- 宇宙背景和粒子效果 (与登录页相同) -->
    <div class="particles"></div>
    <div class="background-glow"></div>

    <!-- 顶部导航栏 -->
    <header class="main-header">
      <div class="logo-area">
        <img src="https://vuejs.org/images/logo.png" alt="Logo" class="header-logo"/>
        <h1 class="header-title">深空矩阵控制台</h1>
      </div>
      <div class="user-area">
        <div class="status-indicator">
          <span class="indicator-dot"></span>
          <span>系统状态: 运行正常</span>
        </div>
        <div class="user-profile">
          <span class="username">Cmdr. {{ username }}</span>
          <img src="https://i.pravatar.cc/40?u=commander" alt="User Avatar" class="user-avatar"/>
          <button class="logout-btn" @click="logout">退出</button>
        </div>
      </div>
    </header>

    <!-- 主体内容区 -->
    <main class="main-content">
      <!-- 左侧导航菜单 -->
      <aside class="side-nav">
        <ul>
           <li class="nav-item active"><span>仪表盘</span></li>
    <li class="nav-item"><span>任务队列</span></li>
    <li class="nav-item"><span>数据分析</span></li>
    <li class="nav-item"><span>系统设置</span></li>
    <li class="nav-item"><span>帮助中心</span></li>
        </ul>
      </aside>

      <!-- 右侧内容仪表盘 -->
      <section class="content-grid">
        <!-- 卡片1: 欢迎信息 -->
        <div class="grid-card welcome-card">
          <h3>欢迎回来, Commander!</h3>
          <p>今天是 {{ currentDate }}。矩阵网络已连接，所有系统准备就绪。</p>
        </div>

        <!-- 卡片2: 系统核心状态 -->
        <div class="grid-card system-status-card">
          <h4>系统核心状态</h4>
          <div class="status-bars">
            <div class="bar-item">
              <span>CPU 负载</span>
              <div class="progress-bar"><div class="progress" style="width: 75%;"></div></div>
              <span>75%</span>
            </div>
            <div class="bar-item">
              <span>内存占用</span>
              <div class="progress-bar"><div class="progress" style="width: 60%;"></div></div>
              <span>60%</span>
            </div>
            <div class="bar-item">
              <span>网络流量</span>
              <div class="progress-bar"><div class="progress" style="width: 45%;"></div></div>
              <span>45 Mbps</span>
            </div>
          </div>
        </div>

        <!-- 卡片3: 数据图表 -->
        <div class="grid-card chart-card">
           <h4>数据上行链路 (模拟图)</h4>
           <!-- 在这里可以集成一个真实的图表库, e.g., Chart.js, ECharts -->
           <div class="chart-placeholder">
               <svg class="sparkline" width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                   <polyline fill="none" stroke="rgba(0, 166, 255, 0.8)" stroke-width="2" points="0,50 30,60 60,40 90,70 120,50 150,80 180,60 210,90 240,70 270,85 300,65" />
               </svg>
           </div>
        </div>
        
        <!-- 卡片4: 快捷操作 -->
        <div class="grid-card quick-actions-card">
            <h4>快捷操作</h4>
            <div class="actions">
                <button class="action-btn">启动扫描</button>
                <button class="action-btn">生成报告</button>
                <button class="action-btn">校准天线</button>
            </div>
        </div>

      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "MainDashboard",
  props: {
    // 假设从父组件或路由传递用户名
    username: {
      type: String,
      default: 'Guest'
    }
  },
  data() {
    return {
      currentDate: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
    }
  },
  methods: {
    logout() {
      console.log("用户退出");
      // 在这里可以添加返回登录页的逻辑
      alert("正在退出深空矩阵...");
    }
  }
}
</script>

<style scoped lang="less">
/* 引入和登录页一样的字体 */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Roboto:wght@300;400&display=swap');

/* --- 基础和背景 --- */
.dashboard-container {
  width: 100%;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  background-color: #010409;
  color: #E0F2FF;
  font-family: 'Roboto', 'Microsoft YaHei', sans-serif;
  display: flex;
  flex-direction: column;
}

.background-glow {
  // 与登录页类似的背景辉光效果
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 200%; height: 100%;
  background-image: radial-gradient(circle at 10% 20%, rgba(20, 80, 150, 0.3), transparent 40%),
                    radial-gradient(circle at 90% 80%, rgba(100, 30, 120, 0.3), transparent 40%);
  animation: background-pan 50s linear infinite alternate;
  z-index: 0;
}

@keyframes background-pan {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.particles {
  // 与登录页类似的粒子效果
  position: absolute;
  width: 100%; height: 100%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><circle cx="100" cy="100" r="1.5" fill="%23ffffff"/></svg>'),
                    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><circle cx="300" cy="400" r="1" fill="%23ffffff"/></svg>'),
                    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><circle cx="600" cy="200" r="2" fill="%23ffffff"/></svg>');
  background-repeat: no-repeat;
  animation: move-particles 30s linear infinite;
  opacity: 0.25;
  z-index: 1;
}

@keyframes move-particles {
  from { transform: translateY(0); }
  to { transform: translateY(-800px); }
}


/* --- 顶部导航栏 --- */
.main-header {
  height: 60px;
  width: 100%;
  background: rgba(10, 25, 47, 0.5);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 166, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
  z-index: 10;
  flex-shrink: 0;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 15px;
  .header-logo {
    width: 30px;
    height: 30px;
    filter: drop-shadow(0 0 5px rgba(0, 180, 255, 0.7));
  }
  .header-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.4rem;
    margin: 0;
    color: #E0F2FF;
    text-shadow: 0 0 4px #B4E1FF;
  }
}

.user-area {
  display: flex;
  align-items: center;
  gap: 25px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #88a1b8;
  .indicator-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #28a745; // 绿色表示正常
    box-shadow: 0 0 6px #28a745;
  }
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  .username {
    font-weight: 400;
  }
  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid rgba(0, 166, 255, 0.5);
  }
  .logout-btn {
    background: transparent;
    border: 1px solid rgba(255, 82, 82, 0.5);
    color: #ff5252;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background: rgba(255, 82, 82, 0.8);
      color: #010409;
      box-shadow: 0 0 10px #ff5252;
    }
  }
}

/* --- 主体内容 --- */
.main-content {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  z-index: 5;
}

/* --- 左侧导航 --- */
.side-nav {
  width: 200px;
  flex-shrink: 0;
  background: rgba(10, 25, 47, 0.3);
  border-right: 1px solid rgba(0, 166, 255, 0.2);
  padding-top: 20px;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .nav-item {
    display: flex;
    align-items: center;
    padding: 15px 25px;
    color: #88a1b8;
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    gap: 15px;
    i { /* 简单用伪元素模拟图标 */
        font-style: normal;
        display: inline-block;
        width: 18px;
        height: 18px;
        background-color: currentColor; // 继承颜色
        // 这里可以用 mask-image 或者直接用字体图标库
       // &.icon-dashboard { mask: url('data:image/svg+xml;...') center / contain no-repeat; } // 示例
    }
    &:hover {
      background: rgba(0, 166, 255, 0.1);
      color: #E0F2FF;
      border-left-color: #00A6FF;
    }
    &.active {
      background: rgba(0, 166, 255, 0.15);
      color: #E0F2FF;
      border-left-color: #00A6FF;
      box-shadow: inset 5px 0 15px -10px #00A6FF;
    }
  }
}

/* --- 右侧内容网格 --- */
.content-grid {
  flex-grow: 1;
  padding: 25px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  grid-auto-rows: min-content;
}

.grid-card {
  background: rgba(10, 25, 47, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(139, 195, 255, 0.25);
  border-radius: 12px;
  padding: 20px 25px;
  box-shadow: 0 0 20px rgba(0, 120, 220, 0.15);
  transition: all 0.3s ease;
  &:hover {
      transform: translateY(-5px);
      border-color: rgba(139, 195, 255, 0.5);
      box-shadow: 0 8px 30px rgba(0, 120, 220, 0.25);
  }
  h3, h4 {
    font-family: 'Orbitron', sans-serif;
    margin-top: 0;
    color: #B4E1FF;
    text-shadow: 0 0 3px #B4E1FF;
    border-bottom: 1px solid rgba(0, 166, 255, 0.2);
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
  p {
      color: #88a1b8;
      line-height: 1.6;
  }
}

.welcome-card {
    grid-column: 1 / -1; // 占满整行
}

.system-status-card {
    .status-bars {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .bar-item {
        display: grid;
        grid-template-columns: 100px 1fr 60px;
        align-items: center;
        gap: 10px;
        font-size: 0.9rem;
    }
    .progress-bar {
        width: 100%;
        height: 8px;
        background: rgba(0, 166, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
    }
    .progress {
        height: 100%;
        background: #00A6FF;
        box-shadow: 0 0 8px #00A6FF;
        border-radius: 4px;
    }
}

.chart-card {
    .chart-placeholder {
        height: 120px;
        position: relative;
    }
    .sparkline {
        animation: sparkline-draw 2s ease-out forwards;
    }
}

@keyframes sparkline-draw {
    from {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
    }
    to {
        stroke-dasharray: 1000;
        stroke-dashoffset: 0;
    }
}

.quick-actions-card {
    .actions {
        display: flex;
        gap: 15px;
    }
    .action-btn {
        flex: 1;
        background: transparent;
        border: 1px solid rgba(0, 166, 255, 0.5);
        color: #B4E1FF;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover {
            background: #00A6FF;
            color: #010409;
            box-shadow: 0 0 15px #00A6FF;
        }
    }
}
</style>