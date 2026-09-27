<template>
  <div class="index_optimized">
    <div class="card">
      <div class="box">
        <div class="content-wrapper">
          <div class="header">
            <img src="https://vuejs.org/images/logo.png" alt="Project Logo" class="avatar"/>
            <div class="title-group">
              <!-- 动态标题 -->
              <h2 class="title">{{ isLoginMode ? '欢迎回来' : '创建账户' }}</h2>
              <p class="subtitle">项目代号：深空</p>
            </div>
          </div>
          
          <!-- 表单区域 -->
          <div class="content-body">
            <form @submit.prevent="handleSubmit" class="auth-form">
              <div class="form-group">
                <input type="text" v-model="form.username" placeholder="用户名 / 邮箱" required />
              </div>
              <div class="form-group">
                <input type="password" v-model="form.password" placeholder="密码" required />
              </div>
              <!-- 仅在注册模式下显示 -->
              <div class="form-group" v-if="!isLoginMode">
                <input type="password" v-model="form.confirmPassword" placeholder="确认密码" required />
              </div>
            </form>
          </div>

          <div class="footer">
            <!-- 动态按钮文本 -->
            <button @click="handleSubmit" class="action-button">
              {{ isLoginMode ? '连接矩阵 (登录)' : '立即加入 (注册)' }}
            </button>
            <div class="toggle-container">
              <span @click="toggleMode" class="toggle-link">
                {{ isLoginMode ? '还没有账户？立即注册' : '已有账户？前往登录' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="particles"></div>
  </div>
</template>

<script>
export default {
  name: "IndexOptimized",
  data() {
    return {
      // 控制当前是登录模式还是注册模式
      isLoginMode: true,
      // 表单数据
      form: {
        username: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    // 切换模式
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
      // 切换时清空表单
      this.form.username = '';
      this.form.password = '';
      this.form.confirmPassword = '';
    },
    // 处理表单提交
    handleSubmit() {
      if (this.isLoginMode) {
        // --- 登录逻辑 ---
        console.log('尝试登录:', {
          username: this.form.username,
          password: this.form.password,
        });
        // 在这里可以添加 API 调用等
        alert(`欢迎回来, ${this.form.username}! (模拟登录)`);

      } else {
        // --- 注册逻辑 ---
        if (this.form.password !== this.form.confirmPassword) {
          alert('两次输入的密码不一致！');
          return;
        }
        console.log('尝试注册:', {
          username: this.form.username,
          password: this.form.password,
        });
        // 在这里可以添加 API 调用等
        alert(`账户 ${this.form.username} 创建成功! (模拟注册)`);
      }
    }
  }
}
</script>

<style scoped lang="less">
/* 引入字体 (保持不变) */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Roboto:wght@300;400&display=swap');

.index_optimized {
  color: #E0F2FF;
  width: 100%;
  background-color: #010409;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', 'Microsoft YaHei', sans-serif;
}

/* 宇宙感背景 (保持不变) */
.index_optimized::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 200%; height: 100%;
  background-image: radial-gradient(circle at 20% 30%, rgba(20, 80, 150, 0.25), transparent 40%),
                    radial-gradient(circle at 80% 70%, rgba(100, 30, 120, 0.25), transparent 40%);
  animation: background-pan 40s linear infinite;
  z-index: 0;
}

@keyframes background-pan {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.card {
  width: 90%;
  max-width: 480px;
  height: auto;
  border-radius: 16px;
  background: rgba(10, 25, 47, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(139, 195, 255, 0.25);
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 40px rgba(0, 120, 220, 0.25);
  transition: all 0.4s ease-out;
  transform: rotate(-3deg); /* 调整了初始角度 */

  &:hover {
    transform: rotate(0deg) scale(1.03);
    box-shadow: 0 0 60px rgba(0, 150, 255, 0.4);
  }
}

.box {
  width: 100%;
  border-radius: 10px;
  padding: 25px 30px;
  box-sizing: border-box;
  text-align: left;
  background: transparent;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 25px; /* 调整间距以适应表单 */
}

.header {
  display: flex;
  align-items: center;
  gap: 18px;
}

.avatar {
  width: 50px;
  height: 50px;
  filter: drop-shadow(0 0 8px rgba(0, 180, 255, 0.7));
}

.title-group {
  flex: 1;
}

.title {
  margin: 0;
  font-family: 'Orbitron', 'Microsoft YaHei', sans-serif;
  font-size: 1.7rem;
  font-weight: 700;
  color: #E0F2FF;
  text-shadow: 0 0 5px #B4E1FF, 0 0 10px rgba(0, 166, 255, 0.7);
}

.subtitle {
  margin: 6px 0 0;
  font-size: 0.9rem;
  color: #88a1b8;
  font-weight: 300;
}

/* --- 新增: 表单样式 --- */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px; /* 输入框之间的间距 */
}

.form-group input {
  width: 100%;
  background: rgba(0, 166, 255, 0.08);
  border: 1px solid rgba(0, 166, 255, 0.3);
  color: #E0F2FF;
  border-radius: 8px;
  padding: 12px 15px;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &::placeholder {
    color: #88a1b8;
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: rgba(0, 166, 255, 0.7);
    background: rgba(0, 166, 255, 0.15);
    box-shadow: 0 0 15px rgba(0, 166, 255, 0.4);
  }
}
/* --- 样式结束 --- */

.footer {
  text-align: center;
  padding-top: 5px; /* 调整上边距 */
}

.action-button {
  width: 100%; /* 让按钮更宽 */
  font-family: 'Orbitron', sans-serif;
  background: transparent;
  border: 1px solid rgba(0, 166, 255, 0.6);
  color: #B4E1FF;
  padding: 12px 30px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-shadow: 0 0 8px rgba(0, 166, 255, 0.3), inset 0 0 8px rgba(0, 166, 255, 0.2);

  &:hover {
    background: #00A6FF;
    color: #010409;
    box-shadow: 0 0 25px #00A6FF;
    transform: translateY(-2px) scale(1.02);
  }
}

/* --- 新增: 切换链接样式 --- */
.toggle-container {
  margin-top: 20px;
}

.toggle-link {
  color: #88a1b8;
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #B4E1FF;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
}
/* --- 样式结束 --- */


/* 粒子效果 (保持不变) */
.particles {
  position: absolute;
  width: 100%; height: 100%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><circle cx="100" cy="100" r="1.5" fill="%23ffffff"/></svg>'),
                    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><circle cx="300" cy="400" r="1" fill="%23ffffff"/></svg>'),
                    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><circle cx="600" cy="200" r="2" fill="%23ffffff"/></svg>');
  background-repeat: no-repeat;
  animation: move-particles 20s linear infinite;
  opacity: 0.3;
  z-index: 1;
}

@keyframes move-particles {
  from { transform: translateY(0); }
  to { transform: translateY(-800px); }
}
</style>