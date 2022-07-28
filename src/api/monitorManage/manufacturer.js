import request from '@/router/axios'
//分页查询
export function fetchList (query) {
  return request({
    url: '/device/viewfactory/page',
    method: 'get',
    params: query
  })
}
//删除
export function delObj (a) {
  return request({
    url: '/factory/professionalfactory',
    method: 'delete',
    params:a
  })
}
//新增
export function addObj (obj) {
  return request({
    url: '/factory/professionalfactory',
    method: 'post',
    data: obj
  })
}
//查询
export function getObj (id) {
  return request({
    url: '/factory/professionalfactory/' + id,
    method: 'get'
  })
}
//修改
export function putObj (obj) {
  return request({
    url: '/factory/professionalfactory',
    method: 'put',
    data: obj
  })
}