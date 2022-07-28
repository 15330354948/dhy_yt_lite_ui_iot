import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/route/page',
    method: 'get',
    params: query
  })
}

export function fetchInstanceList(serviceName) {
  return request({
    url: '/admin/route/instance/' + serviceName,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/route',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/route/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/route/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/route',
    method: 'put',
    data: obj
  })
}

export function listRoute() {
  return request({
    url: '/admin/route/list-item',
    method: 'get',
  })
}

export function updateInstance(obj) {
  return request({
    url: '/admin/route/instance',
    method: 'put',
    params: {
      serviceName: obj.serviceName,
      instanceId: obj.instanceId,
      weight: obj.weight,
      enabled: obj.enabled
    }
  })
}

export function deregisterInstance(serviceName, instanceId) {
  return request({
    url: '/admin/route/instance',
    method: 'delete',
    params: {
      serviceName: serviceName,
      instanceId: instanceId
    }
  })
}
