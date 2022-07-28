import request from '@/router/axios'

export function warnPersonnel(data){
    return request({
        url:'/sms/warn_personnel_config/page',//预警人员数据
        method:'GET',
        params:data
    })
}

export function warnPersonnelDel(id){
    return request({
        url:'/sms/warn_personnel_config/' + id,//预警人员数据
        method:'DELETE'
    })
}

export function warnPersonnelAdd(data){
    return request({
        url:'/sms/warn_personnel_config',//预警人员数据
        method:'POST',
        data:data
    })
}
