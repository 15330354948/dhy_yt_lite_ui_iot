import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/device/professionaldeviceabnormal/page',
    method: 'get',
    params: query
  })
}
export function delObj (query) {
  return request({
    // url: '/device/professionaldeviceabnormal',
    url:'/device/professionaldeviceabnormal/batch',
    method: 'delete',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/device/professionaldeviceabnormal',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/device/professionaldeviceabnormal/' + id,
    method: 'get'
  })
}
export function putObj (obj) {
  return request({
    url: '/device/professionaldeviceabnormal',
    method: 'put',
    data: obj
  })
}
export function disater (query) {
  return request({
    url: '/disaster_base_info/page',
    method: 'get',
    params: query
  })
}
export function infoPage (query) {
  return request({
    url:'/device/viewprofessionaldeviceinfo/page',
    method: 'get',
    params: query
  })
}