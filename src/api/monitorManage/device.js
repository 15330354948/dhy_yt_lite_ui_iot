/*
 * @Author: your name
 * @Date: 2021-02-19 09:50:55
 * @LastEditTime: 2021-07-09 15:29:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\api\monitorManage\device.js
 */
import request from '@/router/axios'

//修改记录
export function mofigPage (query) {
  return request({
    url:'/device/professional_sensor_operator_record/page',
    method: 'get',
    params: query
  })
}
export function infoPage (query) {
  return request({
    // url: '/device/professionaldeviceinfo/page',
    url:'/device/viewprofessionaldeviceinfo/page',
    method: 'get',
    params: query
  })
}
export function deviceList (query) {
  return request({
    url: '/home/viewDevicePageList',
    method: 'get',
    params: query
  })
}
export function deviceListPageByDisasterId (query) {
  return request({
    url: '/device/professionaldeviceinfo/pageByDisasterId',
    method: 'get',
    params: query
  })
}
//
export function putObj (query) {  //修改专业监测-设备列表
  return request({
    url: '/device/professionaldeviceinfo',
    method: 'put',
    data: query
  })
}
//
export function addObj (query) {  //新增专业监测-设备列表
  return request({
    url: '/device/professionaldeviceinfo',
    method: 'post',
    data: query
  })
}
export function delObj (query) {
  return request({
    url: '/device/professionaldeviceinfo',
    method: 'delete',
    params: query
  })
}
//
export function stallInfo (query) {
  return request({
    url: '/device/professionaldeviceinfo/'+query,
    method: 'get',
    params: query
  })
}
//
export function runInfo (query) {
  return request({
    url: '/device/professionaldeviceruninginfo/'+query,
    method: 'get',
    params: query
  })
}
export function areaid (query) {
  return request({
    url: '/area/parentId/'+query,
    method: 'get',
  })
}

export function senerInfo (query) {
  return request({
    url: '/device/professionalsensor/find_by_device_id',
    method: 'get',
    params: query
  })
}
export function factoryInfo (query) {
  return request({
    url: '/device/viewfactory/page',
    method: 'get',
    params: query
  })
}
export function projectInfo (query) {
  return request({
    url: '/project/professional_project_management/project_list',
    method: 'get',
    params: query
  })
}
// ./admin/dict/type/device_type
export function deviceType (query) {
  return request({
    url: '/admin/dict/type/device_type',
    method: 'get',
    params: query
  })
}
export function newDeviceType (query) {
  return request({
    url: '/device/professionaldeviceinfo/findDeviceTypeByProjectId',
    method: 'get',
    params: query
  })
}
export function disasterNameDataType (query) {
  return request({
    url: '/monitor_base_info/page',
    method: 'get',
    params: query
  })
}
export function newProjectType (query) {
  return request({
    url: '/subproject/info/findName',
    method: 'get',
    params: query
  })
}
export function factoryType (query) {
  return request({
    url: '/factory/professionalfactory/findDeviceFactoryByProjectId',
    method: 'get',
    params: query
  })
}
export function disInfo (query) {
  return request({
    url: '/device/viewsensor/page',
    method: 'get',
    params: query
  })
}
export function disasterInfo (query) {
  return request({
    url: '/disaster_base_info/'+query,
    method: 'get',
    params: query
  })
}
//
export function DivInfo (query) {
  return request({
    url: '/home/getViewVideoDeviceList',
    method: 'get',
    params: query
  })
}
export function imgFile(ids){
    return request({
        url:'/file/getFiles?fileIdList=' + ids,
        method:'GET',
    })
}
export function updateAltitude (query) {/**设置设备高度 */
  return request({
    url: '/device/professionaldeviceinfo/device/updateAltitude',
    method: 'put',
    data: query
  })
}

export function monitorRunState(){
    return request({
        url:'/admin/dict/type/running_state',
        method:'GET',
    })
}

// 下发指令采样间隔
export function isinst (query) {/**设置设备高度 */
  return request({
    url: '/device/command/samplingInterval',
    method: 'post',
    data: query
  })
}

export function isinstYl (query) {/**设置设备高度 */
  return request({
    url: '/device/command/samplingInterval_rain',
    method: 'post',
    data: query
  })
}
// 下发指令采样间隔
export function statusCycleApi (query) {/**设置设备高度 */
  return request({
    url: '/device/command/statusCycle',
    method: 'post',
    data: query
  })
}
export function statusCycleApiYl (query) {/**设置设备高度 */
  return request({
    url: '/device/command/statusCycle_rain',
    method: 'post',
    data: query
  })
}
//
export function isinstworn (query) {/**设置设备高度 */
  return request({
    url: '/device/command/down_content',
    method: 'post',
    data: query
  })
}

//
export function getRealTimeDeviceWarnInfoByDisasterId (query) {    //
  return request({
    url: '/device/professionaldeviceinfo/page?size=-1',
    method: 'get',
    params: query
  })
}


export function getRecordPage (query) {
  return request({
    url: '/admin/log/page_order',
    method: 'get',
    params: query
  })
}
export function replaceEquipment (query) {
  return request({
    url: '/device/professionaldeviceinfo/changeSingleDeviceInfoNo',
    method: 'post',
    data: query
  })
}
export function update_device_code_log (query) {
  return request({
    url: '/device/update_device_code_log/page',
    method: 'get',
    params: query
  })
}
export function  synchronousSensor(query) {   //同步传感器   accuracy(精确度)，projectId(项目id) ,sensorCode(设备编号)，type(设备类型)
  return request({
    url: '/device/professionaldeviceinfo/find_by_deviceNo',
    method: 'GET',
    params: query
  })
}

export function getCodeData(query) {
  return request({
    url: '/device/professionaldeviceinfo/getCountByDeviceCode',
    method: 'get',
    params: query
  })
}

export function updateLongAndLatById(query) {
  return request({
    url: '/device/professionaldeviceinfo/updateLongitudeAndLatitudeById',
    method: 'put',
    data: query
  })
}

// 替换设备模板
export function deviceCodeTemplate() {
  return request({
    url: '/device/professionaldeviceinfo/exportChangeDeviceCodeTemplate',
    method: 'get',
    responseType: 'blob'
  })
}

// 批量替换设备
export function changeMultipleDeviceInfoNo(obj) {
  return request({
    url: '/device/professionaldeviceinfo/changeMultipleDeviceInfoNo',
    method: 'post',
    responseType: "blob",
    data: obj
  })
}

// 查询设备离线异常设置信息
export function getOffline(id) {
  return request({
    url: '/abnormal/sensor/config/offline/' + id,
    method: 'get',
  })
}
// 新增设备离线异常设置信息
export function addOffline(obj) {
  return request({
    url: '/abnormal/sensor/config/batch-device-offline',
    method: 'put',
    data: obj
  })
}