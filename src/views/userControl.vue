<template>
     <div class="container">
        <el-card :body-style="{ display: 'flex'}">
            <div class="header-avatar card">
                <el-avatar 
                    :size="60" 
                    :src="userInfo?.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
                />
            </div>
            <div class="header-userinfo ">
                <div class="userinfo-name">
                    <el-text>{{ userInfo?.username || '未登录' }}</el-text>
                </div>
                <div class="userinfo-id">
                    <el-tag>ID: {{ userInfo?.id || 'N/A' }}</el-tag>
                </div>
            </div>
            <div class="header-actions card">
                <el-button type="danger" @click="handleLogout">退出登录</el-button>
            </div>
        </el-card>
    </div>
    <div class="control">
        <!-- <div class="control-table"></div>
        <div class="control-main"></div> -->
        <el-card>
            <el-tabs v-model="active"  @tab-click="handleClick">
            <el-tab-pane label="资源管理" name='1' v-if="userInfo?.roleName === 'admin'">
                <admin_Resouce_data></admin_Resouce_data>
            </el-tab-pane>
            <el-tab-pane label="用户管理" name='2'>Config</el-tab-pane>
        </el-tabs>
        </el-card>
        
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import admin_Resouce_data from '../components/admin_Resouce_data/index.vue'
export default {
    components: {
        admin_Resouce_data,
    },
    data(){
        return {
            active:'1'
        }
    },
    methods:{
        handleClick(tab, event){
            console.log(tab, event)
        }
    },
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
        align-items: center;
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
        .header-actions{
            float: right;
        }
    }
}
.control{
    margin-top: 10px;
    .control-table{
        width: 100%;
        height: 80px;
        background-color: var(--primary-100);
        border-radius: 20px;
    }
    .control-main{
        width: 80%;
        height: 100%;
        margin-left: 10px;
        background-color: var(--bg-300);
        border-radius: 20px;
    }
}
</style>