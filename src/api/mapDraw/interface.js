/**
 * 地图绘制接口
 */
import request from '@/router/axios'

export function addMapDraw (query) {  //新增地图绘制
  return request({
    url: '/monitor_visual_drawing',
    method: 'POST',
    data: query
  })
}

export function editMapDraw (query) {  //修改地图绘制
  return request({
    url: '/monitor_visual_drawing',
    method: 'PUT',
    data: query
  })
}

export function deleteMapDraw (id) {  //删除地图绘制对象
  return request({
    url: '/monitor_visual_drawing/' + id,
    method: 'DELETE',
  })
}

export function getMapDrawList (query) {  //查询地图绘制列表
  return request({
    url: '/monitor_visual_drawing/page',
    method: 'GET',
    params: query
  })
}
