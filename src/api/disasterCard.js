import request from '@/router/axios'
export function disaster_prevention_card_add(query) {//新增防灾明白卡
    return request({
        url: '/disaster/disaster_prevention_card',
        method: 'POST',
        data: query
    })
}

export function disaster_prevention_card_update(query) {//修改防灾明白卡
    return request({
        url: '/disaster/disaster_prevention_card',
        method: 'PUT',
        data: query
    })
}

export function disaster_prevention_card(query) {//查询防灾明白卡
    return request({
        url: '/disaster/disaster_prevention_card/disasterById/' + query,
        method: 'GET',
    })
}