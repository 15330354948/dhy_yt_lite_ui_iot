import request from '@/router/axios'
export function getRise(query) {
  return request({
    url: '/home/census/device/rise',
    method: 'get',
    params: query
  })
}
export function getWork(query) { //工单统计
  return request({
    url: '/home/census/work',
    method: 'get',
    params: query
  })
}

export function getOnline(query) { //设备统计
  return request({
    url: '/home/census/device/online',
    method: 'get',
    params: query
  })
}

export function getDiffer(query) { //工单统计
  return request({
    url: '/home/census/device/differ',
    method: 'get',
    params: query
  })
}
  
export function deviceAbnormal(query) { //设备异常
  return request({
    url: '/home/census/device/deviceAbnormalType',
    method: 'get',
    params: query
  })
}

export function historyDevType(query) { //历史设备故障排名
  return request({
    url: '/home/census/device/fault',
    method: 'get',
    params: query
  })
}

export function getDic(type) {
  return request({
    url: '/admin/dict/type/' + type,
    method: 'get',
  })
}

export function factoryDevice(query) { //厂商异常
  return request({
    url: '/home/census/device/factoryDeviceRanking',
    method: 'get',
    params: query
  })
}

export function deviceStatus(query) { //设备处置
  return request({
    url: '/home/census/device/deviceDisposalStatusCensus',
    method: 'get',
    params: query
  })
}

export function projectList (query) {
  return request({
    url: '/subproject/info/page',
    method: 'get',
    params: query
  })
}

// 设备异常统计
export function abnormalList (query) {
  return request({
    url: '/home/census/device/abnormal',
    method: 'get',
    params: query
  })
}