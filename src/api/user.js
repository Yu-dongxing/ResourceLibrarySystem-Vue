import request from '@/utils/request'

// 用户相关接口
export const userApi = {
  // 用户登录
  login(data) {
    return request({
      url: '/login',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        phoneNumber: data.phoneNumber.toString(), // 确保是字符串类型
        password: data.password.toString()  // 确保是字符串类型
      }
    })
  },

  // 用户注册
  register(data) {
    return request({
      url: '/user/sign',
      method: 'post',
      data: {
        username: data.username,
        password: data.password,
        phoneNumber: data.phone
      }
    })
  },

  // 获取用户信息
  getUserInfo() {
    return request({
      url: '/user/details',
      method: 'get',
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