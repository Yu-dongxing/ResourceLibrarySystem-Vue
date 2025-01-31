<template>
     <div class="container">
        <el-card :body-style="{display: 'flex'}">
            <div class="header-avatar">
                <el-avatar 
                    :size="60" 
                    :src="userInfo?.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
                />
            </div>
            <div class="header-userinfo">
                <div class="userinfo-name">
                    <el-text>{{ userInfo?.username || '未登录' }}</el-text>
                </div>
                <div class="userinfo-id">
                    <el-tag>ID: {{ userInfo?.id || 'N/A' }}</el-tag>
                </div>
            </div>
            <div class="header-actions">
                <el-button type="danger" @click="handleLogout">退出登录</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const userInfo = computed(() => store.state.user.userInfo)

    const handleLogout = () => {
      store.dispatch('user/logout')
      router.push('/login')
      ElMessage.success('已退出登录')
    }

    return {
      userInfo,
      handleLogout
    }
  }
}
</script>

<style scoped lang="less">
.container {
    /* min-height: 100vh; 最小高度占满整个视口 */
    .card{
        display: flex;
    }
    .container-header{
        width: 80%;
        margin-left: 10%;
        height: 100px;
        // background-color: var(--bg-300);
        // display: flex;
        // align-items: center;
        border-radius: 20px;
        box-sizing: border-box;
        padding: 10px;
        .header-userinfo{
            margin-left: 10px;
            width: 100%;

        }
    }
}
// .container {
//             // display: flex;
//         }

//         .header-avatar {
//             margin-bottom: 10px;
//         }
//         .header-userinfo {
//             display: flex;
//             flex-direction: column;
//         }
//         .userinfo-name {
//             margin-bottom: 5px;
//         }
//         .userinfo-id {
//             display: flex;
//             align-items: center;
//         }
</style>