import request from '@/router/axios'
//分页查询
export function fetchList(query) {
  return request({
    url: '/device/emergency_task/view/page',
    method: 'get',
    params:query
  })
}
//新增
export function addObj(obj) {
  return request({
    url: '/device/emergency_task',
    method: 'post',
    data: obj
  })
}
//任务接收人
export function getPageList(){
  return request({
    url:'/mpadp/qcqfperson/page',
    method:'get'
  })
}
//删除
export function getObj(id) {
  return request({
    url: '/device/emergency_task/' + id,
    method: 'delete'
  })
}
//修改
export function delObj(a) {
  return request({
    url: '/device/emergency_task/update/updateStatus' ,
    method: 'put',
    params: a
  })
}
//字典
export function chaxun(){
  return request({
    url:'/admin/dict/types?types=EmergencyTask_status',
    method:'get'
  })
}
export function getPageListadd(query) {//监测点分页
  return request({
      url: '/disaster_base_info/page',
      method: 'get',
      params: query
  })
}
