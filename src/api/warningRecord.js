import request from '@/router/axios'

export function sendRecord(data) {
  return request({
    url: '/sms/short/msg/record/page',
    method: 'GET',
    params: data
  })
}

export function sendRecordmodel(data) {
  return request({
    url: '/sms/sms_stencil/getSmsStencil',
    method: 'GET',
  })
}
// 手动预警短信
//人员分页 
export function getwarnInfo(query) {
  return request({
    url: '/sms/sms_warn_personnel_info/page',
    method: 'GET',
    params: query
  })
}
// 新增
export function getAdd1(query) {
  return request({
    url: '/sms/manual-sms-receiver',
    method: 'POST',
    data: query
  })
}
// 编辑
export function getedit(query) {
  return request({
    url: '/sms/manual-sms-receiver',
    method: 'PUT',
    data: query
  })
}
// 批量删除
export function getDel(query) {
  return request({
    url: '/sms/manual-sms-receiver/batch',
    method: 'DELETE',
    data: query
  })
}
// 手动下发短信
export function getendMessage(query) {
  return request({
    url: '/sms/manual_send_sms',
    method: 'POST',
    data: query
  })
}
// 记录
export function getjiluInfo(query) {
  return request({
    url: '/sms/sms_manual_record/page',
    method: 'GET',
    params: query
  })
}
