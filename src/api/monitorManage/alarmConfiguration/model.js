import request from '@/router/axios'

export function getScriptId(query) {//表格列表接口
  return request({
    url: '/warn/open_warn_script_info/page',
    method: 'get',
    params: query
  })
}
export function getObj(id,projectId) {
  return request({
    url: '/warn/open_warn_script_info/'+ id +'?projectId='+projectId,
    method: 'get',
  })
}
export function addObj(obj) {//新增接口
  return request({
    url: '/warn/open_warn_script_info',
    method: 'post',
    data: obj
  })
}
export function putObj(obj) {//修改接口
  return request({
    url: '/warn/open_warn_script_info/updateById',
    data: obj,
    method: 'post',
  })
}
export function delObj(id,projectId) {//删除接口
  return request({
    url: '/warn/open_warn_script_info/' + id+'?projectId='+projectId,
    method: 'delete'
  })
}
export function mulDel(dataArr,projectId) {
  return request({
    url: '/warn/open_warn_script_info/batch?projectId='+projectId,
    method: 'delete',
    data: dataArr
  })
}


export function testScript(obj,projectId) {//表格列表接口
  return request({
    url: '/warn/open_warn_script_info/testScript?projectId='+projectId,
    method: 'post',
    data: obj
  })
}

//获取传感器类型
export function getSensorType(type) {
  return request({
    url: '/warn/open_warn_script_info/type/'+type,
    method: 'get',
  })
}
//参数解释
export function getDimension(query) {
  return request({
    url: '/warn/open_sensor_warn_rules/getSensorDimension',
    method: 'get',
    params: query
  })
}
