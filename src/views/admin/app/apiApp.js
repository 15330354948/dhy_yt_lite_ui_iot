import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/app/h5_version/page',
    method: 'get',
    params: query
  })
}
export function addObj(obj) {
    return request({
      url: '/app/h5_version/',
      method: 'post',
      data: obj
    })
  }
