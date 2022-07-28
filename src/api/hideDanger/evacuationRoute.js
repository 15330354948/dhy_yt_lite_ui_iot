//监测点图层撤离路线表
import request from '@/router/axios';

export function addEvacuationRoute(query) {//新增撤离路线
    return request({
        url: '/disaster_evacuation_route_map',
        method: 'POST',
        data: query
    })
}
export function deleteEvacuationRoute(query) { //通过监测点id通过id删除撤离路线图
    return request({
        url: '/disaster_evacuation_route_map?ids=' + query,
        method: 'DELETE',
    })
} 

export function editEvacuationRoute(query) {  //修改撤离路线
    return request({
        url: '/disaster_evacuation_route_map',
        method: 'PUT',
        data: query
    })
}

export function getEvacuationRouteList(query) {   //通过id查询撤离路线列表
    return request({
        url: '/disaster_evacuation_route_map/pageByDisasterId',
        method: 'GET',
        params:query
    })
}

export function getEvacuationRoute(query) { //通过id查询撤离路线
    return request({
        url: '/disaster_evacuation_route_map/'+query,
        method: 'GET',
    })
}