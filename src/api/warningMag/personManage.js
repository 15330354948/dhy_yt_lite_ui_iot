import request from '@/router/axios'

export function fetchList(query){
  return request({
    url:'/sms/sms_warn_personnel_info/page',
    method:'GET',
    params:query
  })
}

export function addObj(obj) {
  return request({
    url: '/sms/sms_warn_personnel_info',
    method: 'post',
    data: obj
  })
}

export function delObj(ids) {
  return request({
    url: '/sms/sms_warn_personnel_info',
    method: 'delete',
    params: ids
  })
}

export function batchDelObj(ids) {
  return request({
    url: '/sms/sms_warn_personnel_info',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj) {
  return request({
    url: '/sms/sms_warn_personnel_info',
    method: 'put',
    data: obj
  })
}
