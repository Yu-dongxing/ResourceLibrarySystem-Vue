import request from '@/utils/request'

// 系统配置相关接口
export const SysConfigsApi = {
  addSysConfig(data) {
    return request({
      url: `/sys/config/add`,
      method: 'post',
      data
    })
  },
  //根据id获取系统配置
  findSysConfigById(id) {
    return request({
      url: `/sys/config/get/${id}`,
      method: 'get'
    })
  },
  //根据id修改配置   configView
  updateSysConfigById(id,data) {
    return request({
      url: `/sys/config/update/${id}`,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json' // 设置 Content-Type 为 application/json
      }
    })
  }
}