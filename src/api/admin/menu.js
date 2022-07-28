/*
 * @Author: your name
 * @Date: 2021-01-28 16:01:53
 * @LastEditTime: 2021-04-20 21:26:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\api\admin\menu.js
 */
import request from '@/router/axios'

export function getMenu(id) {
  return request({
    url: '/admin/menu',
    params: { parentId: id },
    method: 'get'
  })
}

export const getTopMenu = () => request({
  url: '/admin/menu',
  params: { parentId: -1 },
  method: 'get'
});

export function fetchMenuTree(lazy, parentId) {
  return request({
    url: '/admin/menu/tree',
    method: 'get',
    params: { lazy: lazy, parentId: parentId }
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/menu',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/menu/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/menu/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/menu',
    method: 'put',
    data: obj
  })
}
export function updateMenuSort(obj) {
  return request({
    url: '/admin/menu/updateMenuSort',
    method: 'post',
    data: obj
  })
}
export const getDictionaries = () => request({
  url: '/admin/dict/types',
  params: { types: ["device_type", "sensor_type", "device_status", "steady_type", "disaster_type", "risk_type", "warn_level","warn_status","level_type", "running_state", "monitor_type"] },
  method: 'get'
})