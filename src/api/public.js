import request from '@/router/axios'

export function getZTDic(type){//中台系统的数据字典接口
    return request({
        url:'/warn/open_warn_script_info/type/'+type,
        method:'GET',
    })
}
export function dictionary(type){
    return request({
        url:'/admin/dict/types?types='+type,
        method:'GET',
    })
}

