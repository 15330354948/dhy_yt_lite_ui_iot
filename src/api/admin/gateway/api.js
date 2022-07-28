import request from '@/router/axios'

export function getApiList(search) {
    return request({
      url: '/admin/api/page',
      method: 'get',
      params: search
    })
  }

  export function getApiById(id) {
    return request({
      url: '/admin/api/get',
      method: 'get',
      params: {
        id: id
      }
    })
  }

  export function saveOrUpdateApi(data) {
    return request({
      url: '/admin/api/set',
      method: 'post',
      data: data
    })
  }

  export function deleteApi(ids) {
    return request({
      url: '/admin/api/del',
      method: 'delete',
      params: {
        ids: ids
      }
    })
  }

  export function statusApi(ids, status) {
    return request({
      url: '/admin/api/set-status',
      method: 'put',
      params: {
        ids: ids,
        status: status
      }
    })
  }

  export function syncApi() {
    return request({
      url: '/admin/api/sync',
      method: 'get',
    })
  }
