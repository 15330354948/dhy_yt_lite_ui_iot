// "@/views/hideDanger/layerDate/index" 监测点范围表
import request from '@/router/axios';

export function addHiddenDanger(query){  //保存监测点范围
   return request({
       url:'/disaster_scope',
       method:'POST',
       data:query
   })
}
export function getHiddenDangerList(query) {//通过监测点id查询监测点范围列表分页
    return request({
        url: '/disaster_scope/pageByDisasterId',
        method: 'GET',
        params: query
    })
}
export function deleteHiddenDanger(query) { //通过id删除监测点范围
    return request({
        url: '/disaster_scope?ids=' + query,
        method: 'DELETE',
    })
}

export function editHiddenDanger(query) {   //修改监测点范围
    return request({
        url: '/disaster_scope',
        method: 'PUT',
        data: query
    })
}

// export function addLayerData(query) {
//     return request({
//         url: '/disaster_layer_data',
//         method: 'put',
//         data: query
//     })
// }
export function getHiddenDanger (query) {
    return request({
      url: '/disaster_scope/'+query,
      method: 'GET',
    })
  }