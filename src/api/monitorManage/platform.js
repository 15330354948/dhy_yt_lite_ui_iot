import request from '@/router/axios'

export function getViewConfigList (query) {
  return request({
    url: '/home/panel/getPanelInfoByProjectId',
    method: 'get',
    params: query
  })
}

export function setViewConfigArr (query) {
  return request({
    url: '/home/panel/savePanelInfoByProjectId',
    method: 'post',
    data: query
  })
}


export function addObj (query) {
  return request({
    url: '/app/banner_truns/',
    method: 'post',
    data: query
  })
}

export function getPage (query) {
  return request({
    url: '/app/banner_truns/page',
    method: 'get',
    params: query
  })
}

export function delData (query) {
  return request({
    url: '/app/banner_truns/delete',
    method: 'delete',
    data: query
  })
}