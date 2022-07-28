import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/blacklist/page',
    method: 'get',
    params: query
  })
}

export function getBlacklistById(id) {
  return request({
    url: '/admin/blacklist/get',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function addObj(data) {
  return request({
    url: '/admin/blacklist/add',
    method: 'post',
    data: data
  })
}
export function putObj(data) {
  return request({
    url: '/admin/blacklist/update',
    method: 'put',
    data: data
  })
}

export function delObj(ids) {
  return request({
    url: '/admin/blacklist/del',
    method: 'delete',
    params: {
      ids: ids
    }
  })
}

export function setStatus(ids, status) {
  return request({
    url: '/admin/blacklist/set-status',
    method: 'put',
    params: {
      ids: ids,
      status: status
    }
  })
}
