import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/file/page',
    method: 'get',
    params: query
  })
}

export function getObj(id) {
  return request({
    url: '/file/' + id,
    method: 'get'
  })
}

export function getFiles(ids) {
  return request({
    url: '/file/getFiles',
    method: 'get',
    params:{
      fileIdList: ids
    }
  })
}

export function delObj(id) {
  return request({
    url: '/file/delete/' + id,
    method: 'delete'
  })
}

export function batchDelObj(fileIdList) {
  return request({
    url: '/file/deleteFiles',
    method: 'delete',
    params: fileIdList
  })
}

export function putObj(obj) {
  return request({
    url: '/file',
    method: 'put',
    data: obj
  })
}

export function downloadFiles(ids) {
  return request({
    url: '/file/downloadLocalFile?fileIdList=' + ids,
    method: 'get',
    responseType: 'blob'
  })
}

export function editPass(query) {
  return request({
    url: '/admin/user/updatePassword',
    method: 'put',
    params: query
    // data: query
  })
}