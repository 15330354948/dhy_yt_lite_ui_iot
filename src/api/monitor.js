import request from '@/router/axios'
export function monitor_base_info(query) {//分页查询监测点
    return request({
        url: '/disaster/disaster_monitoring_point/page',
        method: 'get',
        params: query
    })
}

export function monitor_base_info_add(query){//新增监测点
    return request({
        url:'/disaster/disaster_monitoring_point',
        method:'POST',
        data:query
    })
}

export function monitor_base_info_update(query){//修改监测点
    return request({
        url:'/disaster/disaster_monitoring_point',
        method:'PUT',
        data:query
    })
}
export function monitor_base_info_delete(query){//删除监测点
    return request({
        url:'/disaster/disaster_monitoring_point?ids=' + query,
        method:'DELETE',
    })
}