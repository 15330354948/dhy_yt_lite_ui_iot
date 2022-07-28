import request from '@/router/axios'
//获取下拉选择内容——项目
export function getProjectList() {
    return request({
        url: '/device/statisticsdatapoints/turnProject',
        method: 'get',
    })
}
//根据项目ID查询设备、数据点、转发等统计情况
export function getObj(id) {
    return request({
        url: '/device/statisticsdatapoints/getProjectBaseStatistics/' + id,
        method: 'get'
    })
}
//根据项目ID查询Chart图(设备、数据点、转发等统计情况)
export function getChartObj(startDate,endDate,id) {
    return request({
        url: '/device/statisticsdatapoints/statisticsCharts/'+startDate+'/'+endDate+'/'+ id,
        method: 'get'
    })
}