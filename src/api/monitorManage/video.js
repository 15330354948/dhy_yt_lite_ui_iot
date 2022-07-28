import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/admin/log/page',
    method: 'get',
    params: query
  })
}

export function delObj (id) {
  return request({
    url: '/admin/log/' + id,
    method: 'delete'
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/log',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/admin/log/' + id,
    method: 'get'
  })
}
export function putObj (obj) {
  return request({
    url: '/admin/client',
    method: 'put',
    data: obj
  })
}

// 视频id获取视频信息
export function getVideoData (query) {
  return request({
      url: 'device/professionaldeviceinfo/' + query,
      method: 'get',
  })
}

// 获取视频AccessToken
export function getAccessToken (query) {
  return request({
      url: '/ys7/api/lapp/token/get',
      method: 'post',
      params: query,
      isProxy:true,
  })
}

// addVideoPreset
export function addVideoPreset (query) {
  return request({
      url: '/ys7/api/lapp/device/preset/add',
      method: 'post',
      params: query,
      isProxy:true,
  })
}

// callVideoPreset
export function callVideoPreset (query) {
  return request({
      url: '/ys7/api/lapp/device/preset/move',
      method: 'post',
      params: query,
      isProxy:true,
  })
}

// callVideoPreset
export function deleteVideoPreset (query) {
  return request({
      url: '/ys7/api/lapp/device/preset/clear',
      method: 'post',
      params: query,
      isProxy: true,
  })
}

// 开始移动视频
export function moveVideoStart (query) {
  return request({
      url: '/ys7/api/lapp/device/ptz/start',
      method: 'post',
      params:query,
      isProxy:true,
  })
}

// 结束移动视频
export function moveVideoEnd (query) {
  return request({
      url: '/ys7/api/lapp/device/ptz/stop',
      method: 'post',
      params: query,
      isProxy: true,
  })
}

export function addPreset (query) {
  return request({
      url: 'video/preset/point/save',
      method: 'post',
      data: query,
  })
}

export function getPresetList(query) {
  return request({
      url: 'video/preset/point/getVideoPresetPointRecordList',
      method: 'GET',
      params: query
  })
}

export function editPreset(query) {
  return request({
      url: 'video/preset/point/update',
      method: 'PUT',
      data: query
  })
}

export function deletePreset(query) {
  return request({
      url: 'video/preset/point/del/' + query,
      method: 'DELETE',
  })
}

export function getAccessJsession(query) {
  return request({
    url: '/bd/StandardApiAction_login.action',
    method: 'post',
    params: query,
    isProxy:true,
  })
}

export function getJsessionControl(query) {
  return request({
    url: '/bd/StandardApiAction_sendPTZControl.action',
    method: 'post',
    params: query,
    isProxy: true,
  })
}


// 查询低功耗设备休眠状态
export function getMetaDataWakeupList (query) {
  return request({
    url: '/ys7/api/v3/open/device/metadata/wakeup',
    method: 'GET',
    header:{
      contentType: 'application/x-www-form-urlencoded',
      accessToken: query.accessToken,
      deviceSerial: query.deviceSerial
    },
    isProxy: true,
  })
}

// 唤醒低功耗设备休眠状态
export function wakeupLowPowerDevice (query) {
  return request({
      url: '/ys7/api/v3/open/device/metadata/wakeup',
      method: 'PUT',
      header:{
        contentType: 'application/x-www-form-urlencoded',
        accessToken: query.accessToken,
        deviceSerial: query.deviceSerial
      },
      isProxy: true,
  })
}

