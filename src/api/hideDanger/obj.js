/*
 * @Author: your name
 * @Date: 2021-03-02 09:06:49
 * @LastEditTime: 2021-04-20 19:02:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\api\hideDanger\obj.js
 */
import request from '@/router/axios';

export function projectType() {
  return request({
    url: `/project/professional_project_management/project_list`,
    method: 'get',
  })
}

// 搜索改变监测点类型
export function getsearchType(query) {
  return request({
    url: `/monitor_base_info/findMonitorTypeByProjectId`,
    method: 'get',
    params: query
  })
}
// 可视化接口
// 监测点数量
export function getMonitorTotal(query) {
  return request({
    url: '/home/getMonitorTotalByProjectId',
    method: 'get',
    params: query
  })
}
// 设备数量/home/getDeviceTotalByProjectId
export function getDeviceTotal(query) {
  return request({
    url: '/home/getDeviceTotalByProjectId',
    method: 'get',
    params: query
  })
}
// 今日预警个数
export function gettodayMonitor(query) {
  return request({
    url: '/home/todayMonitorWarnNumStatistics',
    method: 'get',
    params: query
  })
}
// 监测点列表
export function getPageList(query) { //监测点列表
   return request({
      url: '/home/viewMonitorPageList',
      method: 'get',
      params: query
   })
  }
export function getBackPageList(query) { //监测点分页
  return request({
    url: '/monitor_base_info/page',
    method: 'get',
    params: query
  })
}

export function addPageList(query) { //新增监测点
  return request({
    url: '/monitor_base_info',
    method: 'POST',
    data: query
  })
}


export function editPageList(query) { //修改监测点
  return request({
    url: '/monitor_base_info',
    method: 'PUT',
    data: query
  })
}

export function searchPageList(query) { //通过监测点id查询监测点详情
  return request({
    url: '/monitor_base_info/' + query,
    method: 'GET',
  })
}

export function delMore(query) { //通过监测点id查询监测点详情
  return request({
    url: '/monitor_base_info/ids',
    method: 'DELETE',
    params: query
  })
}

export function qcqfPerson(type) { //群测群防员表
  return request({
    url: '/mpadp/qcqfperson/page',
    method: 'GET',
    params: type
  })
}

export function qcqfPersonDatas(query) { //群测群防员表
  return request({
    url: '/mpadp/qcqfperson/page',
    method: 'GET',
    params: query
  })
}

export function zhryPersonDatas(query) { //群测群防员表
  return request({
    url: '/mpadp/qcqfcomprehensiveperson/page',
    method: 'GET',
    params: query
  })
}

export function qcqfPersonData(query) { //通过id查询群测群防员
  return request({
    url: '/mpadp/qcqfperson/' + query,
    method: 'GET',
  })
}

export function dictionary(type) { //字典
  return request({
    url: '/admin/dict/type/' + type,
    method: 'GET',
  })
}

export function areaData(id) { //行政区
  return request({
    url: '/area/parentId/' + id,
    method: 'GET',
  })
}

export function updateAltitude(query) { //修改监测点
  return request({
    url: '/disaster_base_info/disaster/updateAltitude',
    method: 'PUT',
    data: query
  })
}
export function fileSet(ids) { //查询文件集
  return request({
    url: '/file/getFiles?fileIdList=' + ids,
    method: 'GET',
  })
}
export function getByDisasterId(ids) {
  return request({
    url: '/disasterwarnpersonnel/getByDisasterId?disasterId=' + ids,
    method: 'GET',
  })
}

// 查询经纬度
export function queryLatAndLon() {
  return request({
    url: 'http://api.tianditu.gov.cn/administrative',
    method: 'get',
  })
}

export function getArea(id) {
  return request({
    url: '/area/parentId/' + id,
    method: 'get',
  })
}

export function editState(query) {
  return request({
    url: '/monitor_base_info/updateWarnHornBroadcastById',
    method: 'get',
    params: query
  })
}

export function monitorUpdateLonLatById(query) {
  return request({
    url: '/monitor_base_info/updateLongitudeAndLatitudeById',
    method: 'put',
    data: query
  })
}
