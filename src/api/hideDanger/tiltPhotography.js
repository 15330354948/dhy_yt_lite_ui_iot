 //监测点图层倾斜摄影
 import request from '@/router/axios';

 export function addTiltPhotography(query){  //新增倾斜摄影
    return request({
        url:'/disaster_oblique_photography',
        method:'POST',
        data:query
    })
 }
 export function getTiltPhotographyList(query) {//通过监测点id查询倾斜摄影列表分页
     return request({
         url: '/disaster_oblique_photography/pageByDisasterId',
         method: 'GET',
         params: query
     })
 }
 export function deleteTiltPhotography(query) { //通过id删除倾斜摄影
     return request({
         url: '/disaster_oblique_photography?ids=' + query,
         method: 'DELETE',
     })
 }
 
 export function editTiltPhotography(query) {   //修改倾斜摄影
     return request({
         url: '/disaster_oblique_photography',
         method: 'PUT',
         data: query
     })
 }
 
 export function getTiltPhotography (query) {
     return request({
       url: '/disaster_oblique_photography/' + query,
       method: 'GET',
     })
   }