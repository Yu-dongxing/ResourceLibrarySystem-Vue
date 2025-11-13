<template>
    <div class="login-container">
        <div class="login-panel">
            <!-- 标题区域 -->
            <div class="panel-header">
                <h2 class="title">{{ isLogin ? "欢迎回来" : "创建新账户" }}</h2>
                <p class="subtitle">{{ isLogin ? "登录您的账户" : "让我们开始新的旅程" }}</p>
            </div>

            <!-- 表单区域 -->
            <div class="panel-body">
                <transition name="form-fade" mode="out-in">
                    <!-- 登录表单 -->
                    <el-form v-if="isLogin" ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" @keyup.enter="handleLogin">
                        <el-form-item prop="phone">
                            <el-input v-model="loginForm.phone" placeholder="手机号" size="large">
                                <template #prefix><el-icon><User /></el-icon></template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="loginForm.password" type="password" placeholder="密码" size="large" show-password>
                                <template #prefix><el-icon><Lock /></el-icon></template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    
                    <!-- 注册表单 -->
                    <el-form v-else ref="registerFormRef" :model="registerForm" :rules="registerRules" class="login-form" @keyup.enter="handleRegister">
                        <el-form-item prop="username">
                            <el-input v-model="registerForm.username" placeholder="你的姓名" size="large">
                                <template #prefix><el-icon><User /></el-icon></template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="phone">
                            <el-input v-model="registerForm.phone" placeholder="手机号" size="large">
                                <template #prefix><el-icon><Phone /></el-icon></template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="registerForm.password" type="password" placeholder="设置密码" size="large" show-password>
                                <template #prefix><el-icon><Lock /></el-icon></template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="confirmPassword">
                            <el-input v-model="registerForm.confirmPassword" type="password" placeholder="确认密码" size="large" show-password>
                                <template #prefix><el-icon><CircleCheck /></el-icon></template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="roleId">
                            <el-select v-model="registerForm.roleId" placeholder="选择你的角色" size="large" style="width: 100%;">
                                <el-option v-for="item in roles" :key="item.id" :label="item.description" :value="item.id" />
                            </el-select>
                        </el-form-item>
                    </el-form>
                </transition>
            </div>
            
            <!-- 操作区域 -->
            <div class="panel-footer">
                <el-button class="action-button" type="primary" size="large" round :loading="loading" @click="isLogin ? handleLogin() : handleRegister()">
                    {{ isLogin ? "登 录" : "立即注册" }}
                </el-button>
                <el-link type="info" :underline="false" @click="toggleForm" class="switch-link">
                    {{ isLogin ? "还没有账户？" : "已有账户？" }}
                </el-link>
            </div>
        </div>
    </div>
</template>

<script setup>
// ... Script 部分和之前一样，无需修改 ...
import { ref, reactive, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { roleApi } from '@/api/role';
import { User, Lock, Phone, CircleCheck } from '@element-plus/icons-vue';

const router = useRouter();
const store = useStore();
const isLogin = ref(true); // 默认显示注册页，以匹配截图
const loading = ref(false);
const loginFormRef = ref();
const registerFormRef = ref();

const loginForm = reactive({ phone: '', password: '' });
const registerForm = reactive({
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
    roleId: null,
});
const roles = ref([]);

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== registerForm.password) {
        callback(new Error("两次输入的密码不一致!"));
    } else {
        callback();
    }
};

const loginRules = reactive({
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' },
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const registerRules = reactive({
    username: [{ required: true, message: '请输入你的姓名', trigger: 'blur' }],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
    ],
    confirmPassword: [{ required: true, validator: validatePass, trigger: 'blur' }],
    roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
});

const getRoles = async () => {
    try {
        const res = await roleApi.getAllRole();
        if (res.data) roles.value = res.data;
    } catch (error) {
        console.error('获取角色列表失败:', error);
    }
};

const toggleForm = () => {
    isLogin.value = !isLogin.value;
    nextTick(() => {
        loginFormRef.value?.clearValidate();
        registerFormRef.value?.clearValidate();
    });
};

const handleLogin = async () => {
    if (!loginFormRef.value) return;
    await loginFormRef.value.validate(async (valid) => {
        if (valid) {
            loading.value = true;
            try {
                const res = await store.dispatch('user/login', {
                    phoneNumber: loginForm.phone,
                    password: loginForm.password,
                });
                if (res.code === 200) {
                    await store.dispatch('user/getUserInfo');
                    ElMessage.success('登录成功，正在跳转...');
                    router.push('/');
                } else {
                    ElMessage.error(res.msg || '登录失败');
                }
            } catch (error) {
                ElMessage.error(error.msg || '登录请求异常');
            } finally {
                loading.value = false;
            }
        }
    });
};

const handleRegister = async () => {
    if (!registerFormRef.value) return;
    await registerFormRef.value.validate(async (valid) => {
        if (valid) {
            loading.value = true;
            try {
                await store.dispatch('user/register', {
                    username: registerForm.username,
                    password: registerForm.password,
                    phoneNumber: registerForm.phone,
                    roleId: registerForm.roleId,
                });
                ElMessage.success('注册成功！请登录。');
                isLogin.value = true; // 注册成功后切换到登录
            } catch (error) {
                ElMessage.error(error.msg || '注册失败');
            } finally {
                loading.value = false;
            }
        }
    });
};

onMounted(() => { getRoles(); });
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px 20px; /* 上下留出间距 */
  box-sizing: border-box;
}

.login-panel {
  width: 100%;
  max-width: 450px; /* 卡片最大宽度 */
  padding: 30px 40px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: var(--el-box-shadow-light); /* Element Plus 的浅色阴影 */
  box-sizing: border-box;
}

.panel-header {
  text-align: center;
  margin-bottom: 30px;
  .title {
    font-size: 28px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin: 0;
  }
  .subtitle {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    margin-top: 10px;
  }
}

.login-form {
  .el-form-item {
    margin-bottom: 22px;
    // 定制输入框样式
    :deep(.el-input__wrapper) {
        border-radius: 8px;
    }
    :deep(.el-select .el-input__wrapper) {
        border-radius: 8px;
    }
  }
}

.panel-footer {
  text-align: center;
  .action-button {
    width: 100%;
    font-size: 16px;
    // 匹配截图中的渐变色
    background: linear-gradient(90deg, #63a6ff 0%, #52e5e7 100%);
    border: none;
  }
  .switch-link {
    margin-top: 20px;
  }
}

/* 表单切换动画 */
.form-fade-enter-active,
.form-fade-leave-active {
    transition: opacity 0.3s ease;
}
.form-fade-enter-from,
.form-fade-leave-to {
    opacity: 0;
}
</style>