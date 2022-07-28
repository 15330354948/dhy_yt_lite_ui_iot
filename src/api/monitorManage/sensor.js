import request from '@/router/axios'

// 监测点code查询
export function codelook(query) {
  return request({
    url: '/monitor_base_info/getMonitorInfoByCode',
    method: 'get',
    params: query
  })
}

// 分页查询
export function fetchList(query) {
  return request({
    url: '/device/viewsensor/page/',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: '/device/professionalsensor/delete',
    method: 'delete',
    data: id
  })
}

export function addObj(obj) {
  return request({
    url: '/device/professionalsensor',
    method: 'post',
    data: obj
  })
}

// 新增异常
export function addError(obj) {
  return request({
    url: '/device/professionalsensorabnormal',
    method: 'post',
    data: obj
  })
}
// 编辑提交
export function putObj(obj) {
  return request({
    url: '/device/professionalsensor',
    method: 'put',
    data: obj
  })
}

// 数据异常查询
export function getError(query) {
  return request({
    url: '/device/professionalsensor/error_config',
    method: 'get',
    params: query
  })
}

//   数据异常编辑
export function editError(query) {
  return request({
    url: '/device/professionalsensor/update_error_config',
    method: 'post',
    data: query
  })
}

//   新增告警设置
export function addYujin(query) {
  return request({
    url: '/warn/warn_setting',
    method: 'post',
    data: query
  })
}

//   id查询告警信息
export function getYujin(query) {
  return request({
    url: "/warn/warn_setting/listBySensorNo",
    method: 'get',
    params: query
  })
}

//   修改告警信息
export function editYujin(query) {
  return request({
    url: "/warn/warn_setting",
    method: 'put',
    data: query
  })
}

//   通过传感器编号查询

export function byId(query) {
  return request({
    url: "/warn/professionalsensor/find_by_no",
    method: 'get',
    params: query
  })
}

// 批量阈值设置
export function someYuzhi(query) {
  return request({
    url: '/warn/warn_setting/updateByList',
    method: 'post',
    data: query
  })
}

// 初值批量修改
export function intallEdit(query) {
  return request({
    url: '/warn/professionalsensor/updateInitByType',
    method: 'post',
    data: query
  })
}


// 新增双控阈值
export function addDouble(query) {
  return request({
    url: '/warn/warn_settingsq',
    method: 'post',
    data: query
  })
}

// 批量新增双控阈值
export function handleAddDouble(query) {
  return request({
    url: '/warn/warn_settingsq/updateByList',
    method: 'post',
    data: query
  })
}

// 查询双控阈值
export function getDouble(query) {
  return request({
    url: "/warn/warn_setting/listBySensorSqNo",
    method: 'get',
    params: query
  })
}

//  单控变化率
export function warnsettingDk(query) {
  return request({
    url: '/warn/warn_settingDk',
    method: 'post',
    data: query
  })
}

export function getDk(query) {
  return request({
    url: "/warn/warn_settingDk/listBySensorDkNo",
    method: 'get',
    params: query
  })
}

export function plWarnsettingDk(query) {
  return request({
    url: '/warn/warn_settingDk/updateByDkList',
    method: 'post',
    data: query
  })
}

// 雨量阈值设置
export function setRainfull(query) {
  return request({
    url: '/warn/warn_settingRainfull',
    method: 'post',
    data: query
  })
}

export function editRainfull(query) {
  return request({
    url: '/warn/warn_settingRainfull',
    method: 'put',
    data: query
  })
}

export function getYUliang(query) {
  return request({
    url: '/warn/warn_settingRainfull/page',
    method: 'get',
    params: query
  })
}

// 查询中台初始值
export function getInitVal(query) {
  return request({
    url: 'device/professionalsensor/find_init_value',
    method: 'get',
    params: query
  })
}

// 删除传感器监测数据
export function delMonitorData(obj) {
  return request({
    url: '/device/sensor/deleteSensorMonitorData',
    method: 'delete',
    data: obj
  })
}