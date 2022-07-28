import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/device/data_transfer_error_log/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/device/data_transfer_error_log',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/device/data_transfer_error_log/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/device/data_transfer_error_log/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/device/data_transfer_error_log',
    method: 'put',
    data: obj
  })
}

export function resendObj(obj) {
  return request({
    url: '/device/data_transfer_error_log/retryTransfer',
    method: 'POST',
    data: obj
  })
}
