import request from '@/router/axios'
export function getPage(query) { //分页查询工单信息
  return request({
    url: '/operation/work/order/page',
    method: 'get',
    params: query
  })
}

export function addOrder(obj) { //新增工单信息
  return request({
    url: '/operation/work/order/save',
    method: 'post',
    data: obj
  })
}
export function editOrder(obj) { //编辑工单信息
  return request({
    url: '/operation/work/order/update',
    method: 'put',
    data: obj
  })
}
export function delOrder(id) { //删除工单信息
  return request({
    url: '/operation/work/order/' + id,
    method: 'delete',
  })
}

export function getPerson(query) { //获取公司部门员工
  return request({
    url: '/operation/personnel/findByDept',
    method: 'get',
    params: query
  })
}

export function disasterNameDataType(query) {
  return request({
    url: '/operation/work/order/monitor',
    method: 'get',
    params: query
  })
}

//   查询设备信息
export function getDeviceInfo(query) {
  return request({
    url: '/operation/work/order/device',
    method: 'get',
    params: query
  })
}

// 根据id查询详情
export function getInfo(id) {
  return request({
    url: '/operation/work/order/' + id,
    method: 'get',
  })
}

export function infoOrder(id) {
  return request({
    url: '/operation/work/order/details/' + id,
    method: 'get',
  })
}

// 通过id集合查询文件
export function getFiles(query) {
  return request({
    url: '/file/getFiles',
    method: 'get',
    params: query
  })
}

// 查询故障类别
export function getFaults() {
  return request({
    url: '/admin/dict/type/cause_of_failure',
    method: 'get'
  })
}

// 负责人接单

export function accept(id) {
  return request({
    url: '/operation/work/order/accept/' + id,
    method: 'post',
  })
}

export function handle(obj) {
  return request({
    url: '/operation/work/order/handle',
    method: 'post',
    data: obj
  })
}

// 撤销工单
export function revoke(id) {
  return request({
    url: '/operation/work/order/revoke/' + id,
    method: 'put',
  })
}
