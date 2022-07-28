/*
 * @Author: 张峻霖
 * @Date: 2021-03-04 15:19:26
 * @LastEditTime: 2021-03-29 09:11:57
 * @LastEditors: Please set LastEditors
 * @Description: 文件配置
 * @FilePath: \LH-UI\src\const\crud\dataAnalysis\configuration.js
 */
export const configuration = [{
    moduleName: "danger",
    listTitle: '监测点列表',//模块展示名字
    list_templateUrl: 'listFile/dangerList',//列表模块文件路径
    chartTitle: '监测点分析',//模块展示名字
    chart_templateUrl: 'chartFile/dangerChart',//图表模块文件路径
    details: {
        details_templateUrl: 'danger',
        details_list: 'dangerList',
        details_left_title: "监测点详情",
        details_list_title: "设备列表",
    }
},
// {
//     moduleName: "device",
//     listTitle: '设备列表',//模块展示名字
//     list_templateUrl: 'listFile/deviceList',//列表模块文件路径
//     chartTitle: '设备分析',//模块展示名字
//     chart_templateUrl: 'chartFile/deviceChart',//图表模块文件路径
//     details: {
//         details_templateUrl: 'device',
//         details_list: 'deviceList',
//         details_left_title: "设备详情",
//         details_list_title: "传感器列表",
//     }
// },
{
    moduleName: "warn",
    listTitle: '告警列表',//模块展示名字
    list_templateUrl: 'listFile/warnList',//列表模块文件路径
    chartTitle: '告警分析',//模块展示名字
    chart_templateUrl: 'chartFile/deviceChart',//图表模块文件路径
    details: false
}]