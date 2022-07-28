import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/dict/page',
    method: 'get',
    params: query
  })
}

export function fetchItemList(query) {
  return request({
    url: '/admin/dict/item/page',
    method: 'get',
    params: query
  })
}

export function addItemObj(obj) {
  return request({
    url: '/admin/dict/item',
    method: 'post',
    data: obj
  })
}

export function getItemObj(id) {
  return request({
    url: '/admin/dict/item/' + id,
    method: 'get'
  })
}

export function delItemObj(id) {
  return request({
    url: '/admin/dict/item/' + id,
    method: 'delete'
  })
}

export function putItemObj(obj) {
  return request({
    url: '/admin/dict/item',
    method: 'put',
    data: obj
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/dict/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/dict/' + id,
    method: 'get'
  })
}

export function delObj(row) {
  return request({
    url: '/admin/dict/' + row.id,
    method: 'delete'
  })
}
export function previewDictEnum(params) {
  return request({
    url: '/admin/dict/gen/enum/preview/' + params.dictId,
    method: 'get',
    params: params
  })
}

export function downloadEnumFile(params) {
  return request({
    url: '/admin/dict/gen/enum/' + params.dictId,
    method: 'get',
    params: params,
    responseType: 'arraybuffer'
  }).then((response) => { // 处理返回的文件流
    const blob = new Blob([response.data], { type: 'text/plain' })
    const filename = params.enumFileName + '.java'
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    window.setTimeout(function () {
      URL.revokeObjectURL(blob)
      document.body.removeChild(link)
    }, 0)
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/dict/',
    method: 'put',
    data: obj
  })
}

export function dictRemoteByType(type) {
  return request({
    url: '/admin/dict/type/' + type,
    method: 'get'
  })
}
