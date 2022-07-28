import request from '@/router/axios'
//获取项目设备总览、新增安装及总安装量
export function getIndexNumbers() {
    return request({
        url: '/device/statisticsHomePage/getStatisticsInfo',
        method: 'get',
    })
}
//柱状图数据接口
export function getBarChartData() {
    return request({
        url: '/device/statisticsHomePage/installCharts',
        method: 'get'
    })
}
//设备告警分页
export function fetchDeviceAlarmList(query) {//表格列表接口
    return request({
        url: '/device-data/statisticsHomePage/pageAlarm',
        params: query,
        method: 'get'
    })
}
//字典接口
export function getTypeData(dicName) {
    return request({
        url: '/admin/dict/type/' + dicName,
        method: 'get'
    })
}
// 根据id查询经纬度
export function getPlaceLonLat(id) {
    return request({
        url: '/area/' + id,
        method: 'get'
    })
}
// 聚合接口
export function mappolymerization(query) {
    return request({
        url: '/device/statisticsHomePage/gatherDevice',
        params: query,
        method: 'get'
    })
}
// 栽点接口
export function mappoints(query) {
    return request({
        url: '/device/statisticsHomePage/plantDevice',
        params: query,
        method: 'get'
    })
}