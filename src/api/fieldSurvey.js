import request from '@/router/axios'

export function disasters_lope_field_questionnaire_update(query) {//修改野外调查表
    return request({
        // url: '/disaster/disasters_lope_field_questionnaire',
        url:'/disaster_base_info',
        method: 'PUT',
        data: query
    })
}

export function disasters_lope_field_questionnaire(query) {//查询野外调查表
    return request({
        // url: '/disaster/disasters_lope_field_questionnaire/disasterId/' + query,
        url:'/disaster_base_info/' + query,
        method: 'GET',
    })
}