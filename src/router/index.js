import { createRouter, createWebHistory } from 'vue-router'
// import App from '../App.vue'
import MainIndex from '@/components/main/MainIndex.vue'

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
    component: () => import('@/components/Login/login.vue'),
    
  },
  {
    path:'/add',
    name:'AddResouce',
    component: ()=>import('@/components/AddResouce/index.vue')
  },
  {
    path:'/user',
    name:'User',
    component:()=>import('@/views/index.vue')
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

export default router
