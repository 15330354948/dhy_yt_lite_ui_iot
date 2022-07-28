/*
 * @Author: your name
 * @Date: 2021-02-25 14:29:55
 * @LastEditTime: 2021-03-29 09:12:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\views\wel\analysisModule\moduleGather\configuration.js
 */
export const configuration = [{
    moduleName: "danger",
    listTitle: '监测点列表',//模块展示名字
    list_templateUrl: 'listFile/dangerList',//列表模块文件路径
    chartTitle: '监测点分析',//模块展示名字
    chart_templateUrl: 'chartFile/dangerChart',//图表模块文件路径
    icon: "danger"
},
// {
//     moduleName: "device",
//     listTitle: '设备列表',//模块展示名字
//     list_templateUrl: 'listFile/deviceList',//列表模块文件路径
//     chartTitle: '设备分析',//模块展示名字
//     chart_templateUrl: 'chartFile/deviceChart',//图表模块文件路径
//     icon: "device"
// },
{
    moduleName: "warn",
    listTitle: '告警列表',//模块展示名字
    list_templateUrl: 'listFile/warnList',//列表模块文件路径
    chartTitle: '告警分析',//模块展示名字
    chart_templateUrl: 'chartFile/deviceChart',//图表模块文件路径
    icon: "warn"
}]