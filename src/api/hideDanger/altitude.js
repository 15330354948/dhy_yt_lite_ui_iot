 //监测点图层倾斜摄影
 import request from '@/router/axios';

 export function addTiltAltitude(query){  //新增倾斜摄影
    return request({
        url:'/disaster_elevation_photography',
        method:'POST',
        data:query
    })
 }
 export function getTiltAltitudeList(query) {//通过监测点id查询倾斜摄影列表分页
     return request({
         url: '/disaster_elevation_photography/pageByDisasterId',
         method: 'GET',
         params: query
     })
 }
 export function deleteTiltAltitude(query) { //通过id删除倾斜摄影
     return request({
         url: '/disaster_elevation_photography?ids=' + query,
         method: 'DELETE',
     })
 }

 export function editTiltAltitude(query) {   //修改倾斜摄影
     return request({
         url: '/disaster_oblique_photography',
         method: 'PUT',
         data: query
     })
 }

 export function getTiltAltitude (query) {
     return request({
       url: '/disaster_oblique_photography/' + query,
       method: 'GET',
     })
   }
