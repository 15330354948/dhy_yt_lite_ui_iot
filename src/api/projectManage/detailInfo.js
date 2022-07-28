import request from '@/router/axios'
export function getBasicInfo(id) {//获取基础信息
    return request({
        url: '/device/statisticsdatapoints/getProjectSituationById/'+id,
        method: 'get'
      })
  }
//   获取设备类型统计
export function getDeviceAna(id) {
    return request({
        url: '/device/statisticsdatapoints/groupDeviceType/'+id,
        method: 'get'
      })
  }