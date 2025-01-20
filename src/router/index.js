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
    component: () => import('@/components/updataPage/updata.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
