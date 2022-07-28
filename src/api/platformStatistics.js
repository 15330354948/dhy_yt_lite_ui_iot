import request from '@/router/axios'
export function getTotal(id) { //统计总览
  return request({
    url: '/platform/census/total/'+ id,
    method: 'get',
  })
}

export function deviceType(id) { //设备类别
  return request({
    url: '/platform/census/device/type/'+ id,
    method: 'get',
  })
}

export function sensorType(id) { //传感器类型
  return request({
    url: '/platform/census/sensor/type/'+ id,
    method: 'get',
  })
}

export function historyData(query) {
  return request({
    url: '/platform/census/device/history',
    method: 'get',
    params: query
  })
}

export function getMsg(query) {
  return request({
    url: '/platform/census/msg',
    method: 'get',
    params: query
  })
}