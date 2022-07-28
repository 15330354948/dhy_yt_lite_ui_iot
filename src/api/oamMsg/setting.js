import request from '@/router/axios'
export function sendRecord(query) {
    return request({
        url: '/sms/short/msg/record/page',
        method: 'get',
        params: query
    })
}

export function sendPersonData(query) {
    return request({
        url: '/view-operation-personnel/page?current=1&size=-1',
        method: 'get',
        params: query
    })
}

export function sendMsg(query) {
    return request({
        url: '/sms/public-send-sms',
        method: 'post',
        data: query
    })
}
