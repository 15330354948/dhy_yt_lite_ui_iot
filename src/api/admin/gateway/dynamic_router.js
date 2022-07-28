import request from '@/router/axios'

export function getRouteDataConfig() {
  return request({
    url: '/admin/nacos/config/getRouteDataConfig',
    method: 'get'
  })
}

export function publishRouters(obj) {
  return request({
    url: '/admin/nacos/config/publish',
    method: 'post',
    data: obj
  })
}
