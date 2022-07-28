// //监测点坐标
// import request from '@/router/axios';

// export function addDisasterScopeData(query) {//保存监测点范围绘制坐标数据
//     return request({
//         url: '/disaster_scope_data',
//         method: 'POST',
//         data: query
//     })
// }
// // export function getDisasterScopeDataList(query) {//通过监测点范围id查询监测点范围绘制坐标数据列表分页
// //     return request({
// //         url: '/disaster_scope_data/pageByDisasterScopeId?disasterId=' + query,
// //         method: 'GET',
       
// //     })
// // }
// export function deleteDisasterScopeData(query) { //通过id删除监测点范围绘制坐标数据
//     return request({
//         url: '/disaster_scope_data?ids=' + query,
//         method: 'DELETE',
//     })
// }

// export function editDisasterScopeData(query) {    //修改监测点范围绘制坐标数据
//     return request({
//         url: '/disaster_scope_data',
//         method: 'PUT',
//         data: query
//     })
// }



// export function getLayerData(query) {  //通过id查询监测点范围绘制坐标数据
//     return request({
//         url: '/disaster_scope_data/'+query,
//         method: 'GET',
//     })
// }