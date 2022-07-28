import request from '@/router/axios'

export function getDeviceDisposalStatus (query) {
  return request({
      url: '/home/deviceDisposalStatusCensus',
      method: 'get',
      params: query
  })
}

export function getDeviceDifferStatus (query) {
  return request({
      url: '/home/device/differ',
      method: 'get',
      params: query
  })
}

export function getWorkOrderStatus (query) {
  return request({
      url: '/home/work',
      method: 'get',
      params: query
  })
}

export function getSubprojectStatus (query) {
  return request({
      url: '/home/subproject/status',
      method: 'get',
      params: query
  })
}

export function getAbnormalStatus (query) {
  return request({
      url: '/home/device/deviceAbnormalType',
      method: 'get',
      params: query
  })
}



