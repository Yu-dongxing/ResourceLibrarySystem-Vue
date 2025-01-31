import request from '@/utils/request'

// 用户相关接口
export const userApi = {
  // 用户登录
  login(data) {
    return request({
      url: '/login',
      method: 'post',
      data: {
        phoneNumber: data.username,  // 使用手机号登录
        password: data.password
      }
    })
  },

  // 用户注册
  register(data) {
    return request({
      url: '/sign',
      method: 'post',
      data: {
        username: data.username,
        password: data.password,
        phone: data.phone
      }
    })
  },

  // 获取用户信息
  getUserInfo() {
    return request({
      url: '/userInfo',
      method: 'get'
    })
  },

  // 更新用户信息
  updateUserInfo(data) {
    return request({
      url: '/user/update',
      method: 'put',
      data
    })
  },

  // 修改密码
  updatePassword(data) {
    return request({
      url: '/user/password',
      method: 'put',
      data
    })
  }
} 