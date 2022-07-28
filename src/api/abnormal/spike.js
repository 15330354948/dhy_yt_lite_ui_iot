import request from '@/router/axios'

export function getDataSpike(query) {//表格列表接口
  return request({
    url: '/abnormal/sensor/config/spike/' + query,
    method: 'GET'
  })
}

export function saveDataSpike(query) {//表格列表接口
  return request({
    url: '/abnormal/sensor/config/saveOrUpdateDataSpike',
    data: query,
    method: 'PUT'
  })
}
