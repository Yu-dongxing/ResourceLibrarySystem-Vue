<template>
    <div class="user-center-page">
        <!-- 重置密码弹窗 -->
        <el-dialog v-model="resetPasswordVisible" title="重置密码" width="400px">
            <el-form :model="resetPasswordForm" label-position="top">
                <el-form-item label="原密码">
                    <el-input v-model="resetPasswordForm.oldPassword" type="password" show-password autocomplete="off" />
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="resetPasswordForm.newPassword" type="password" show-password autocomplete="off" />
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="resetPasswordForm.confirmPassword" type="password" show-password autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="resetPasswordVisible = false">取消</el-button>
                    <el-button type="primary" @click="resetPassword">确认重置</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 顶部用户信息卡片 -->
        <el-card class="profile-header-card">
            <div class="profile-header-content">
                <div class="user-info-left">
                    <el-avatar 
                        :size="60" 
                        :src="userInfo?.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
                    />
                    <div class="user-details">
                        <span class="username">{{ userInfo?.username || '未登录' }}</span>
                        <span class="user-id">ID: {{ userInfo?.id || 'N/A' }}</span>
                    </div>
                </div>
                <div class="header-actions">
                    <el-button type="danger" plain @click="handleLogout">退出登录</el-button>
                </div>
            </div>
        </el-card>

        <!-- 主内容区 -->
        <el-card class="content-card">
            <el-tabs v-model="activeTab" class="user-tabs">
                <el-tab-pane label="个人中心" name='profile'>
                    <el-form :model="userForm" label-position="top">
                        <el-form-item label="用户名">
                            <el-input v-model="userForm.username" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="用户邮箱">
                            <el-input v-model="userForm.email" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="用户手机号">
                            <el-input v-model="userForm.phoneNumber" autocomplete="off" />
                        </el-form-item>
                        <el-form-item class="form-actions">
                            <el-button @click="resetPasswordVisible = true">修改密码</el-button>
                            <el-button type="primary" @click="updateUserInfo">保存更改</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <!-- 管理员权限的 Tab -->
                <el-tab-pane v-if="isAdmin" label="资源管理" name='resource-manage'>
                    <admin_Resouce_data />
                </el-tab-pane>
                <el-tab-pane v-if="isAdmin" label="用户管理" name='user-manage'>
                    <admin_Users_data />
                </el-tab-pane>
                <el-tab-pane v-if="isAdmin" label="访问日志" name='access-log'>
                    <admin_ip_log />
                </el-tab-pane>
                <el-tab-pane v-if="isAdmin" label="待审核资源" name='audit-resource'>
                    <admin_resouce_audit />
                </el-tab-pane>
                <el-tab-pane v-if="isAdmin" label="更新日志管理" name='update-log-manage'>
                    <admin_update_log_data />
                </el-tab-pane>
                <el-tab-pane v-if="isAdmin" label="系统信息管理" name='sys-info-manage'>
                    <admin_sysinfo_date />
                </el-tab-pane>
                <el-tab-pane v-if="isAdmin" label="学习任务管理" name='study-task-manage'>
                    <Admin_Study_date />
                </el-tab-pane>
                 <el-tab-pane v-if="isAdmin" label="系统配置" name='sys-config'>
                    <Admin_Sys_Config/>
                </el-tab-pane>
                <!-- 普通用户可见的 Tab -->
                <el-tab-pane label="登录日志" name='login-log'>
                    <UserLoginLog />
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { userApi } from '@/api/user'
// 导入所有子组件
import admin_Resouce_data from '../components/admin_Resouce_data/index.vue'
import admin_Users_data from '../components/admin_Users_data/index.vue'
import admin_ip_log from '@/components/admin_ip_log/index.vue'
import admin_resouce_audit from "@/components/admin_resouce_audit/index.vue"
import admin_update_log_data from "@/components/admin_update_log_data/index.vue"
import admin_sysinfo_date from '@/components/admin_sysinfo_date/index.vue'
import Admin_Study_date from '@/components/Admin_Study_date/index.vue'
import UserLoginLog from "@/components/UserLoginLog/index.vue"
import Admin_Sys_Config from '@/components/Admin_Sys_Config/index.vue'

// --- 状态管理 ---
const store = useStore()
const router = useRouter()

const activeTab = ref('profile')
const resetPasswordVisible = ref(false)

const userInfo = computed(() => store.state.user.userInfo)
const isAdmin = computed(() => userInfo.value?.roleName === 'admin')

// 用户信息表单
const userForm = reactive({
    username: '',
    email: '',
    phoneNumber: '',
    roleId: '',
})

// 重置密码表单
const resetPasswordForm = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

// --- 逻辑方法 ---

// 退出登录
const handleLogout = () => {
    store.dispatch('user/logout')
    router.push('/login')
    ElMessage.success('已退出登录')
}

// 更新用户信息
const updateUserInfo = async () => {
    try {
        const res = await userApi.updateUserInfo(userForm, userInfo.value.id)
        if (res.code === 200) {
            ElMessage.success('更新成功')
            // 更新成功后，可以考虑重新获取用户信息以同步 store
            await store.dispatch('user/getUserInfo')
        } else {
            ElMessage.error(`更新失败: ${res.message}`)
        }
    } catch (error) {
        console.error('更新用户信息错误:', error);
        ElMessage.error('更新请求失败')
    }
}

// 重置密码
const resetPassword = async () => {
    if (resetPasswordForm.newPassword !== resetPasswordForm.confirmPassword) {
        ElMessage.error('两次输入的新密码不一致！')
        return
    }
    
    try {
        const res = await userApi.updatePassword(resetPasswordForm)
        if (res.code === 200) {
            ElMessage.success('密码更新成功，请重新登录')
            resetPasswordVisible.value = false
            // 密码修改成功后，强制用户重新登录
            handleLogout()
        } else {
            ElMessage.error(`更新失败: ${res.message}`)
        }
    } catch (error) {
        console.error('更新用户密码错误:', error);
        ElMessage.error('密码更新请求失败')
    }
}

// --- 侦听器 ---

// 使用 watchEffect 监听 userInfo 的变化，并自动同步到 userForm
// 这可以修复当 userInfo 异步加载时，表单为空的 bug
watchEffect(() => {
    if (userInfo.value) {
        userForm.username = userInfo.value.username || ''
        userForm.email = userInfo.value.email || ''
        userForm.phoneNumber = userInfo.value.phoneNumber || ''
        userForm.roleId = userInfo.value.roleId || ''
    }
})
</script>

<style scoped lang="less">
.user-center-page {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px; /* 优雅地设置卡片间距 */
}

.profile-header-card {
    :deep(.el-card__body) {
        padding: 20px;
    }
}

.profile-header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.user-info-left {
    display: flex;
    align-items: center;
    gap: 15px;
}

.user-details {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .username {
        font-size: 20px;
        font-weight: 600;
        color: var(--el-text-color-primary);
    }
    .user-id {
        font-size: 14px;
        color: var(--el-text-color-secondary);
    }
}

.content-card {
    :deep(.el-card__body) {
        padding: 10px 20px 20px;
    }
}

.user-tabs {
    // 穿透修改 tabs 样式
    :deep(.el-tabs__header) {
        margin-bottom: 25px;
    }
}

.form-actions {
    // 让按钮靠右对齐
    :deep(.el-form-item__content) {
        justify-content: flex-end;
    }
}
</style>