import { userApi } from '@/api/user'

const state = {
  token: localStorage.getItem('token'),
  userInfo: null
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  // 用户登录
  async login({ commit }, loginForm) {
    try {
      const res = await userApi.login(loginForm)
      const { token } = res.data
      commit('SET_TOKEN', token)
      return res
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  },

  // 获取用户信息
  async getUserInfo({ commit }) {
    try {
      const res = await userApi.getUserInfo()
      commit('SET_USER_INFO', res.data)
      return res.data
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  },

  // 退出登录
  logout({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_USER_INFO', null)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
} 