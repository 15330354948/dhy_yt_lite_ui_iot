import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url:'/device/viewprofessionaldeviceinfo/page',
    method: 'get',
    params: query
  })
}

export function delObj (id) {
  return request({
    url: '/device/professionaldevicemaintenance/' + id,
    method: 'delete'
  })
}

export function addObj (obj) {
  return request({
    url: '/device/professionaldevicemaintenance',
    method: 'post',
    data: obj
  })
}

export function getObj (query) {
  return request({
    url: '/device/professionaldevicemaintenance/page',
    method: 'get',
    params: query
  })
}
export function putObj (query) {
  return request({
    url: '/device/professionaldevicemaintenance',
    method: 'put',
    data: query
  })
}