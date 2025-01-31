import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import router from '@/router'

// 创建axios实例
const request = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API || 'http://localhost:8080', // API的base_url
  baseURL:'http://localhost:8081/api/resources', // API的base_url
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    
    // 这里可以根据后端的响应结构统一处理
    if (res.code === 401) {
      // token过期
      store.dispatch('user/logout')
      router.push('/login')
      ElMessage.error('登录已过期，请重新登录')
      return Promise.reject(new Error('登录已过期'))
    }
    
    return res
  },
  error => {
    console.log('err' + error)
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request 