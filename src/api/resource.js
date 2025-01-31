import request from '@/utils/request'

// 资源相关接口
export const resourceApi = {
  // 获取资源列表
  getResources() {
    return request({
      url: '/public/get',
      method: 'get'
    })
  },

  // 添加资源
  addResource(data) {
    return request({
      url: '/admin/add',
      method: 'post',
      data
    })
  },

  // 删除资源
  deleteResource(id) {
    return request({
      url: `/admin/delete/${id}`,
      method: 'get'
    })
  },

  // 更新资源
  updateResource(data) {
    return request({
      url: '/admin/update',
      method: 'put',
      data
    })
  }
} 