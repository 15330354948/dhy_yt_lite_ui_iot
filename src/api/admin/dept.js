

import request from '@/router/axios'

export function fetchTree (query) {
  return request({
    url: '/admin/dept/tree',
    method: 'get',
    params: query
  })
}

export function lazyFetchTree(parentId, excludeNotCanSelectDepts = false) {
  return request({
    url: '/admin/dept/tree/parentId/'+parentId+"?excludeNotCanSelectDepts="+excludeNotCanSelectDepts,
    method: 'get',
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/dept',
    method: 'post',
    data: obj
  })
}

export function getObj(id, includeParentIds = false) {
  return request({
    url: '/admin/dept/' + id + "?includeParentIds=" + includeParentIds,
    method: 'get',
  })
}

export function delObj (id) {
  return request({
    url: '/admin/dept/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/dept',
    method: 'put',
    data: obj
  })
}

export function getdetails (obj) {
  return request({
    url: '/admin/dept/details/' + obj,
    method: 'get'
  })
}

export function resetSort (parentId) {
  return request({
    url: '/admin/dept/resetSort/' + parentId,
    method: 'get'
  })
}

export function saveSort (obj) {
  return request({
    url: '/admin/dept/saveSort',
    method: 'post',
    data: obj
  })
}

