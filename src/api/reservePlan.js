import request from '@/router/axios'

export function reservePlanData(query){
    return request({
        url:'/monitor_contingency_plan/page',//预案查询
        method:'GET',
        params: query
    })
}

export function reservePlanUpdate(query){
    return request({
        url:'/monitor_contingency_plan',
        method:'POST',
        data:query
    })
}

export function dictionary(type){//字典
    return request({
        url:'/admin/dict/type/' + type,
        method:'GET',
    })
}

export function imgFile(ids){//
    return request({
        url:'/file/getFiles?fileIdList=' + ids,
        method:'GET',
    })
}