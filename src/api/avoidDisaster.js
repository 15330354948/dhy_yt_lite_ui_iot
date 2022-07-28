import request from '@/router/axios'
 
// /monitor_hedge_card/page
export function avoidList(query){
    return request({
        url:'/monitor_hedge_card/page',
        method:'GET',
        params:query
    })
}
// /monitor_hedge_card
export function avoidadd(query){
    return request({
        url:'/monitor_hedge_card',
        method:'POST',
        data:query
    })
}
// /monitor_hedge_card
export function avoidedit(query){
    return request({
        url:'/monitor_hedge_card',
        method:'PUT',
        data:query
    })
}
// /monitor_hedge_card/{id}
export function avoidedata(id){
return request({
    url:'/monitor_hedge_card/' + id,
    method:'GET'
})
} 
// /monitor_hedge_card/ids
export function avoideDelete(query){//删除
    return request({
        url:'/monitor_hedge_card/ids?ids='+query,
        method:'DELETE',
        // data:query
    })
}
//查询避险明白卡分页查询
export function avoidDisasterList(query){
    return request({
        url:'/disaster_hedge_card/page',
        method:'GET',
        params:query
    })
}

export function avoidDisasterData(id){
    return request({
        url:'/disaster_hedge_card/' + id,
        method:'GET'
    })
}

export function avoidDisasterAdd(query){//增加避险明白卡
    return request({
        url:'/disaster_hedge_card',
        method:'POST',
        data:query
    })
}

export function avoidDisasterUpdate(query){//修改避险明白卡
    return request({
        url:'/disaster_hedge_card',
        method:'PUT',
        data:query
    })
}

export function avoidDisasterDelete(ids){//删除
    return request({
        url:'/disaster_hedge_card?ids=' + ids,
        method:'DELETE',
    })
}

export function dictionary(type){//字典
    return request({
        url:'/admin/dict/type/' + type,
        method:'GET',
    })
}
