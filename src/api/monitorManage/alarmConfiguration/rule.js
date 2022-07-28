import request from '@/router/axios'
export function fetchList(query) {//表格列表接口
  return request({
    url: '/warn/open_sensor_warn_rules/page',
    params: query,
    method: 'get'
  })
}
export function addObj(obj) {//新增接口
  return request({
    url: '/warn/open_sensor_warn_rules',
    method: 'post',
    data: obj
  })
}
export function putObj(obj) {//修改接口
  return request({
    url: '/warn/open_sensor_warn_rules',
    data: obj,
    method: 'put',
  })
}
export function delObj(id,projectId) {//删除接口
  return request({
    url: '/warn/open_sensor_warn_rules/' + id+'?projectId='+projectId,
    method: 'delete'
  })
}
export function mulDel(dataArr,projectId) {
  return request({
    url: '/warn/open_sensor_warn_rules/batch?projectId='+projectId,
    method: 'delete',
    data: dataArr
  })
}


