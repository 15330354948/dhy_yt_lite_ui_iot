import request from '@/router/axios'
export function exceptionInfo(query) {//短信异常分页查询
    return request({
        url: '/operation/data/exception/page',
        method: 'get',
        params: query
    })
}
export function subprojectInfo(query) {//项目分页查询
    return request({
        url: '/subproject/info/findName',
        method: 'get',
        params: query
    })
}
export function companyInfo(query) {//公司部门
    return request({
        url: '/operation/company/tree',
        method: 'get',
        params: query
    })
}
export function findByOrganInfo(query) {//部门人员
    return request({
        url: '/operation/personnel/findByOrgan',
        method: 'get',
        params: query
    })
}
export function operationOff(query) {//离线设置分页查询
    return request({
        url: '/operation/off/page',
        method: 'get',
        params: query
    })
}
export function exceptionOff(query) {//新增人员数据异常通知
    return request({
        url: '/operation/data/exception/save',
        method: 'post',
        data: query
    })
}
export function addOffperson(query) {//离线人员保存
    return request({
        url: '/operation/off/add/person',
        method: 'post',
        data: query
    })
}
export function exceptionDel(query) {//删除人员数据异常通知
    return request({
        url: '/operation/data/exception/del?ids='+query,
        method: 'delete',
    })
}
export function operatfindPersons(query) {//异常人员回显
    return request({
        url: '/operation/data/exception/findPersons',
        method: 'get',
        params: query
    })
}
export function operatoffPersons(query) {//离线人员回显
    return request({
        url: '/operation/off/findPersons',
        method: 'get',
        params: query
    })
}
export function offSaveOnline(query) {//离线人员保存
    return request({
        url: '/operation/off/save',
        method: 'post',
        data: query
    })
}
export function operatoffFind(query) {//离线设置查询
    return request({
        url: '/operation/off/find',
        method: 'get',
        params: query
    })
}
export function personDel(query) {//删除离线
    return request({
        url: '/operation/off/del/person?ids='+query,
        method: 'delete',
    })
}
