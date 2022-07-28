/*
 * @Author: 帅泊成
 * @Date: 2021-02-22 15:59:14
 * @LastEditTime: 2021-04-19 20:41:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\views\wel\index\dataAnalysis\data_analysis_configuration.js
 */
export const configuration = {
  left: [{
    moduleName: "viewWeatherForecast",
    moduleTitle: '天气预报',//模块展示名字
    templateUrl: 'dataAnalysis/viewWeatherForecast/index',//模块文件路径
    icon: "icon2.png",
    hasDetails: false
  }, {
    moduleName: "viewEquipmentOnline",
    moduleTitle: '监测设备在线情况',//模块展示名字
    templateUrl: 'dataAnalysis/viewEquipmentOnline',//模块文件路径
    icon: "icon2.png",
    hasDetails: true
  }, {
    moduleName: "viewMonitorDistribution",
    moduleTitle: '监测点分布',//模块展示名字
    templateUrl: 'dataAnalysis/viewMonitorDistribution',//模块文件路径
    icon: "icon2.png",
    hasDetails: true
  // }, {
  //   moduleName: "viewExceptionDeviceHand",
  //   moduleTitle: '异常设备处置情况',//模块展示名字
  //   templateUrl: 'dataAnalysis/viewExceptionDeviceHand',//模块文件路径
  //   icon: "icon1.png",
  //   hasDetails: true
  // }, {
  //   moduleName: "viewEquipmentAbnormality",
  //   moduleTitle: '设备异常情况',//模块展示名字
  //   templateUrl: 'dataAnalysis/viewEquipmentAbnormality',//模块文件路径
  //   icon: "icon1.png",
  //   hasDetails: true
  // }, {
  //   moduleName: "viewProjectSituation",
  //   moduleTitle: '项目情况统计',//模块展示名字
  //   templateUrl: 'dataAnalysis/viewProjectSituation',//模块文件路径
  //   icon: "icon1.png",
  //   hasDetails: true
  }],
  right: [{
  //   moduleName: "viewOfflineDuration",
  //   moduleTitle: '离线时长统计',//模块展示名字
  //   templateUrl: 'dataAnalysis/viewOfflineDuration',//模块文件路径
  //   icon: "icon2.png",
  //   hasDetails: true
  // }, {
  //   moduleName: "viewWorkorderProcess",
  //   moduleTitle: '当前工单处理进度',//模块展示名字
  //   templateUrl: 'dataAnalysis/viewWorkorderProcess',//模块文件路径
  //   icon: "icon1.png",
  //   hasDetails: true
  // }, {
    moduleName: "viewMonitorWarning",
    moduleTitle: '监测点预警统计',//模块展示名字
    moduleTitleChange: '设备预警统计',//模块展示名字
    templateUrl: 'dataAnalysis/viewMonitorWarning',//模块文件路径
    icon: "icon1.png",
    hasDetails: true,
    moduleVisible: true
  },{
    moduleName: "viewSurveillanceVideo",
    moduleTitle: '监控视频墙',//模块展示名字
    templateUrl: 'dataAnalysis/viewSurveillanceVideo',//模块文件路径
    icon: "icon2.png",
    hasDetails: false
  }, {
    moduleName: "viewProjectmembers",
    moduleTitle: '项目成员',//模块展示名字
    templateUrl: 'dataAnalysis/viewProjectmembers',//模块文件路径
    icon: "icon1.png",
    hasDetails: false
  }]
}
