import request from '@/router/axios'


export function roleType(query) {
  return request({
    url: '/admin/role/list?type='+query,
    method: 'get',
  })
}
export function fetchList(query) {
  return request({
    url: '/admin/user/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/user',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/user',
    method: 'put',
    data: obj
  })
}

export function resetPassword(userId) {
  return request({
    url: '/admin/user/resetPassword/'+userId,
    method: 'get',
  })
}

export function getDetails(obj) {
  return request({
    url: '/admin/user/details/' + obj,
    method: 'get'
  })
}
export function putBaseObj(obj) {
  return request({
    url: '/admin/user/edit',
    method: 'put',
    data: obj
  })
}