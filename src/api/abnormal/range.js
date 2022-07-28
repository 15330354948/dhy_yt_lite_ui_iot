import request from '@/router/axios'

export function getDataRange(query) {//表格列表接口
  return request({
    url: '/abnormal/sensor/config/data-range/' + query,
    method: 'GET'
  })
}

export function saveDataRange(query) {//表格列表接口
  return request({
    url: '/abnormal/sensor/config/saveOrUpdateDataRange',
    data: query,
    method: 'PUT'
  })
}

export function getSensorDimension(query) {//表格列表接口
  return request({
    url: '/abnormal/sensor/dimension/list',
    method: 'get',
    params: query
  })
}
