import request from '@/router/axios'

export function getDataUnChange(query) {//表格列表接口
  return request({
    url: '/abnormal/sensor/config/data-invariant/' + query,
    method: 'GET'
  })
}

export function saveDataUnChange(query) {//表格列表接口
  return request({
    url: '/abnormal/sensor/config/batch-data-long-term-invariant',
    data: query,
    method: 'PUT'
  })
}
