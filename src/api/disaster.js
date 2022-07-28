import request from '@/router/axios'
export function disaster_base_info(query) {//分页查询监测点
    return request({
        url: '/disaster_base_info/page',
        method: 'get',
        params: query
    })
}
