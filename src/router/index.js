import { createRouter, createWebHistory } from 'vue-router'
// import App from '../App.vue'
import MainIndex from '@/components/main/MainIndex.vue'
import store from '@/store'

const routes = [
  {
    path:'/',
    name:'MainIndex',
    component: MainIndex,
    //子路由-view/index
    // children:[
    //   {
    //     path:'main',
    //     name:'MainIndex',
    //     component: MainIndex
    //   }
    // ]
  },
  {
    path:'/about',
    name:'About',
    component: () => import('@/components/updataPage/updata.vue'),
  },
  {
    path:'/login',
    name:'Login',
    component: () => import('@/views/Login.vue'),
    
  },
  {
    path:'/add',
    name:'AddResouce',
    component: ()=>import('@/components/AddResouce/index.vue')
  },
  {
    path:'/user',
    name:'UserControl',
    component:()=>import('@/views/userControl.vue'),
    meta: { requiresAuth: true }
  },
   // 添加 404 错误页面路由
  {
    path: '/:pathMatch(.*)*',
    name: 'Err404',
    component: ()=>import('@/components/Err404/index.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  
  if (to.meta.requiresAuth) {
    if (!token) {
      next('/login')
      return
    }
    
    if (!store.state.user.userInfo) {
      try {
        await store.dispatch('user/getUserInfo')
      } catch (error) {
        store.dispatch('user/logout')
        next('/login')
        return
      }
    }
  }
  
  if (to.path === '/login' && token) {
    next('/')
    return
  }
  
  next()
})

export default router
