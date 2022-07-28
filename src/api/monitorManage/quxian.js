import request from '@/router/axios';

// // 根据设备编号查询传感器列表
// export function searchSensorList (query) {
//     return request({
//         url: '/device/viewsensor/sensorlist_deviceid',
//         method: 'post',
//         data: query
//     })
// }
export function searchDevTree (query) {
  return request({
      url: '/admin/dict/type',
      method: 'get',
      params: query
  })
}
// 根据设备编号查询传感器列表(全部)
export function searchSensorListAll (query) {
    return request({
        url: '/device/professionaldeviceinfo/sameMonitorDeviceAndSensorTreeList',
        method: 'post',
        data: query
    })
}

// 通过字典类型查找字典
export function searchSersorType (query) {
    return request({
        url: '/admin/dict/type/' + query,
        method: 'get',
    })
}
//
export function quxianDataReturn (query) {
    return request({
        url: '/device/sensor/factory',
        // url: '/device_data/sensor/factory',
        method: 'post',
        data: query
    })
}

// 三维构型图数据列表（日均）
export function quxianDataReturnDay (query) {
    return request({
        url: '/device/sensor/findL5ZbDataDay',
        method: 'post',
        data: query
    })
}

// 深部位移累计
export function getCumulateData (query) {
    return request({
        url: '/device/sensor/getMapDataSbwyResultant',
        method: 'post',
        data: query
    })
}

// 深部位移累计（日均）
export function getCumulateDataDay (query) {
    return request({
        url: '/device/sensor/getMapDataDaySbwyResultant',
        method: 'post',
        data: query
    })
}

// 返回曲线数据统一接口
export function getRelativeData (query) {
    return request({
        url: '/device/sensor/getMapDataRelative',
        method: 'post',
        data: query
    })
}

// 返回曲线数据统一接口
export function getRelativeDataDay (query) {
    return request({
        url: '/device/sensor/getMapDayDataRelative',
        method: 'post',
        data: query
    })
}

// 深部位移趋势图 (小时)
export function getTrendChartHour (query) {
    return request({
        url: '/device/sensor/getMapDataSbwyTrendChart',
        method: 'post',
        data: query
    })
}

// 深部位移趋势图（日均）
export function getTrendChartDay (query) {
    return request({
        url: '/device/sensor/getMapDataSbwyDayTrendChart',
        method: 'post',
        data: query
    })
}

// 深部位移节点位移数据图
export function getNodeMovementChart (query) {
    return request({
        url: '/device/sensor/getMapDataSbwyNodeWyDataChart',
        method: 'post',
        data: query
    })
}

// 深部位移节点位移数据图
export function getTrajectoryChart (query) {
    return request({
        url: '/device/sensor/getMapDataSbwyTrajectory',
        method: 'post',
        data: query
    })
}

// 相对位移 累计位移 运移轨迹列表
export function getTableDataListNew (query) {
    return request({
        url: '/device/sensor/getMapDataTimelist',
        method: 'get',
        params: query
    })
}

// 测试数据接口新深部位移
export function getTableDataListNewDay (query) {
    return request({
        url: '/device/sensor/getMapDataDaylist',
        method: 'get',
        params: query
    })
}

// 监测点可视化
export function getDisasterGroupList (query) {
    return request({
        url: '/home/disasterDistributionStatistics',
        method: 'get',
        params: query
    })
}

// 设备统计查询
export function deviceAccount (query) {
    return request({
        url: '/home/deviceOnlineStatistics',
        method: 'get',
        params: query
    })
}

// 设备统计查询
export function deviceInformation (query) {
    return request({
        url: '/device/professionaldeviceinfo/' + query,
        method: 'get',
    })
}

// 返回数据列表统一接口
export function quxianDataList (query) {
    return request({
        url: '/device/sensor/dataList',
        // url: '/device_data/sensor/dataList',
        method: 'get',
        params: query
    })
}

// 深部位移传感器所有node节点
export function nodeSW (query) {
    return request({
        url: '/device/swChoiceDisplayNode/selectBySensorCode',
        method: 'get',
        params: query
    })
}

// 深部位移传感器新增修改node节点
export function nodeSWChange (query) {
    return request({
        url: '/device/swChoiceDisplayNode/updateDisplayNodeByDeviceNo',
        method: 'put',
        data: query
    })
}

// 测试数据接口
export function ceDataList (query) {
    return request({
        url: '/device_data_test/test_sensor/dataList',
        method: 'get',
        params: query
    })
}

// 深部位移节点数查询
export function SWNodeSearch (query) {
    return request({
        url: '/device/swChoiceDisplayNode/selectMaxNodeNum',
        method: 'get',
        params: query
    })
}

// 通知测试接口开始推送
export function putCeshidata (type,url) {
    return new Promise(function(resolve,reject){// Promis实例化
        var xhr = new XMLHttpRequest();
        xhr.open(type,url);
        xhr.send();
        xhr.addEventListener("timeout",6000*10);
        xhr.addEventListener("readystatechange",function(){
            if(xhr.readyState !=4 ){// 监听状态不对的时候 不指定函数
                return;
            }
            if(xhr.readyState==4&&xhr.status==200){
                var res = JSON.parse(xhr.responseText);
                console.log("ajaxPromise",res)
                resolve(res); // 回调成功返回
            }else{
                reject();// 回调失败返回
            }
        })
    })
}

// 测试数据接口
export function qinjiaoData (query) {
    return request({
        url: '/device/viewsensor/qj_newest_data',
        method: 'get',
        params: query
    })
}

// 时间+设备id查询设备下对应时间节点的倾角数据
export function qinjiaoTimeData (query) {
    return request({
        url: '/device/viewsensor/qj_id_date',
        method: 'get',
        params: query
    })
}

// 实时预警统计
export function yujingTongji (query) {
    return request({
        url: '/home/todayDisasterWarnNumStatistics',
        method: 'get',
        params: query
    })
}
export function yujingTongjiNew (query) {
    return request({
        url: '/home/realTimeWarnStatistics',
        method: 'get',
        params: query
    })
}

// 历史预警
export function yujingTongjiOld(query) {
    return request({
        url:'/home/historyWarnStatistics',
        method: 'get',
        params: query
    })
}


// 安全态势分析
export function anquanTaishi (query) {
    return request({
        url: '/device/professionaldeviceinfotest/deviceSecuritySituation',
        method: 'get',
        params: query
    })
}

// 传感器请求预警值
export function postYujing (query) {
    return request({
        url: 'warn/warn_setting/listBySensorNo',
        method: 'get',
        params: query
    })
}

// 可视化今日值班人员新
export function dayDutyListNew(query) {
    return request({
        url: '/home/todayDutyPersonList',
        method: 'get',
        params: query,
    })
}

// 今日预警监测点数
export function todayYujing(query) {
    return request({
        url: '/home/todayDisasterWarnNumStatistics',
        method: 'get',
        params: query,
    })
}

// 气象预警信息
export function tianqi(query) {
    return request({
        url: '/disaster/weather/getProduct1',
        method: 'get',
        params: query,
    })
}

// 分页查询宏观观测设置表
export function disaster_macro_observe_config(query) {
    return request({
        url: '/disaster/disaster_macro_observe_config/page',
        method: 'get',
        params: query,
    })
}

// 修改宏观观测设置表
export function edit_observe_config(query) {
    return request({
        url: '/disaster/disaster_macro_observe_config',
        method: 'put',
        data: query,
    })
}

// 宏观实测数据管理fenye
export function disaster_macro_measured_data(query) {
    return request({
        url: '/disaster/disaster_macro_measured_data/page',
        method: 'get',
        params: query,
    })
}

// 宏观实测数据管理fenye
export function disasterGetVideos(query) {
    return request({
        url: '/device/professionaldeviceinfo/getDeviceVideoListByDisasterId',
        method: 'get',
        params: query,
    })
}

// 今日降雨量
export function getTodayRainfall(query) {
    return request({
        url: '/disaster/weather/getDisasterRain',
        method: 'get',
        params: query,
    })
}


// 通知测试接口开始推送
// export function upLoadDeviceData (type,url,data) {
//     return new Promise(function(resolve,reject){// Promis实例化
//         var xhr = new XMLHttpRequest();
//         xhr.open(type,url);
//         xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//         xhr.send(`beginTime=${data.beginTime}&endTime=${data.endTime}&ids=[${data.ids}]`);
//         // xhr.addEventListener("timeout",6000*10);
//         xhr.addEventListener("readystatechange",function(){
//             if(xhr.readyState !=4 ){// 监听状态不对的时候 不指定函数
//                 return;
//             }
//             if(xhr.readyState==4&&xhr.status==200){
//                 var res = JSON.parse(xhr.responseText);
//                 console.log("ajaxPromise",res)
//                 resolve(res); // 回调成功返回
//             }else{
//                 reject();// 回调失败返回
//             }
//         })
//     })
// }

//导出原始数据
export function getSourceData (query) {
    return request({
        url: '/device/dataExcelExport/excelExportData',
        method: 'post',
        responseType: 'blob',
        overTime:true,//取消30秒时间限制
        data: query,
    })
}

// dataExcelExport
export function upLoadDeviceData(query) {
    return request({
        url: `/device/dataExcelExport/dataExcelExport`,
        method: 'post',
        responseType: 'blob',
        overTime:true,//取消30秒时间限制
        data: query,
    })
}
export function shibao(query) {
    return request({
        url: '/device/dataExcelExport/excelExportHour',
        method: 'post',
        responseType: 'blob',
        overTime:true,//取消30秒时间限制
        data: query,
    })
}

export function getListOfDaily(query) {
    return request({
        url: '/device/dataExcelExport/excelExportDay',
        method: 'post',
        responseType: 'blob',
        overTime: true,//取消30秒时间限制
        data: query,
    })
}

export function upLoadDeviceDataNew(query) {
    return request({
        url: `/device/dataExcelExport/dataExcelExportNew`,
        method: 'post',
        responseType: 'blob',
        overTime:true,//取消30秒时间限制
        data: query,
    })
}
export function upLoadDeviceDataNew1(query) {
    return request({
        url: `/device/dataExcelExport/proCheckMonitorDataExcelExport`,
        method: 'post',
        data: query,
    })
}
export function upLoadDeviceDataNew2(query) {
    return request({
        url: `/device/dataExcelExport/monitorData`,
        method: 'post',
        responseType: 'blob',
        overTime:true,//取消30秒时间限制
        data: query,
    })
}
// export function upLoadDeviceDataNew3(query) {
//     return request({
//         url: `/device/dataExcelExport/monitorDataFixedTime `,
//         method: 'post',
//         responseType: 'blob',
//         overTime:true,//取消30秒时间限制
//         data: query,
//     })
// }
export function getVideoImg(query) {
    return request({
        url: '/home/getViewVideoDevicePictureUrlList',
        method: 'get',
        params: query,
    })
}

export function getSw2Ddata(query) {
    return request({
        url: '/device_data/sensor/getSwDataByNode',
        method: 'post',
        data: query,
    })
}

//项目资料下载访问id
export function uploadFileBtn(query) {
    return request({
        url: '/file/' + query,
        method: 'get',
    })
}
