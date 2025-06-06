import request from '@/utils/request'

// 日志相关接口
export const iplogApi = {
  // 上传用户日志
  postIpLog(data) {
    return request({
      url: '/public/ip_log/add',
      method: 'post',
      data
    })
  },
// 查询所有日志
  getallIplog(){
    return request({
      url: '/public/ip_log/all',
      method: 'get'
    })
  },
  // 分页查询日志 /public/ip_log/page?pageNum=${page}&pageSize=${size}
  getIpLogPage(page, size) {
    return request({
      url: `/public/ip_log/page?pageNum=${page}&pageSize=${size}`,
      method: 'get'
    })
  },
  
}