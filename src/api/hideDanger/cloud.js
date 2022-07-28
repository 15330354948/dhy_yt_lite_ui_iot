/*
 * @Author: 帅泊成  点云接口
 * @Date: 2021-03-02 09:06:49
 * @LastEditTime: 2021-04-20 19:02:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: src\api\hideDanger\cloud.js
 */

import request from '@/router/axios';

export function getCloudTree(query) {
  return request({
      url: '/disaster_point_cloud/list',
      method: 'GET',
      params: query
  })
}


export function getAddCloud(query) {//新增范围
  return request({
      url: '/disaster_point_cloud',
      method: 'POST',
      data: query
  })
}

export function getPutCloud(query) {//新增范围
  return request({
    url: '/disaster_point_cloud',
    method: 'PUT',
    data: query
  })
}

export function deleteCloud(query) {
  return request({
      url: '/disaster_point_cloud/' + query,
      method: 'DELETE',
  })
}