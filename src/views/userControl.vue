<template>
     <div class="container">
        <el-card :body-style="{display: 'flex'}">
            <div class="header-avatar">
                <el-avatar :size="60" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div class="header-userinfo">
                <div class="userinfo-name">
                    <el-text>用户</el-text>
                </div>
                <div class="userinfo-id">
                    <el-tag>用户id</el-tag>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { userApi } from '@/api/user'
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      userInfo: {}
    }
  },
  async created() {
    try {
      const res = await userApi.getUserInfo()
      this.userInfo = res.data
    } catch (error) {
      ElMessage.error('获取用户信息失败')
      console.error('获取用户信息失败:', error)
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