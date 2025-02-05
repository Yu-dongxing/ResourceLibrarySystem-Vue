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

  // 根据id删除资源
  deleteResource(id) {
    return request({
      url: `/admin/delete/${id}`,
      method: 'get'
    })
  },

  // 更新资源
  updateResource(data,id) {
    return request({
      url: '/admin/update/'+id,
      method: 'put',
      data:{
        name: data.name,
        url: data.url,
        tab: data.tab,
        img: data.img
      }
    })
  },
  // 根据id获取资源/public/get/{id}
  getResourceById(id) {
    return request({
      url: '/public/get/'+id,
      method: 'get'
    })
  },
  // 关键字搜索/public/search/keyword?keyword=UI
  searchResource(keyword) {
    return request({
      url: '/public/search/keyword?keyword='+keyword,
      method: 'get'
    })
  }
} 