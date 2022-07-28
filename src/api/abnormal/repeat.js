import request from '@/router/axios'

export function getDataRepeat(query) {//表格列表接口
  return request({
    url: '/abnormal/sensor/config/data-repeat/' + query,
    method: 'GET'
  })
}

export function saveDataRepeat(query) {//表格列表接口
  return request({
    url: '/abnormal/sensor/config/batch-data-repeat',
    data: query,
    method: 'PUT'
  })
}
