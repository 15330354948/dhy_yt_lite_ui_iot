import request from '@/router/axios'
export function getPage(query) {//分页查询监测点
    return request({
        url: '/warn/warn_level_amend/getWarnDisasterListGroupByDisasterBatchNo/page',
        method: 'get',
        params: query
    })
}

// 历史预警分页
export function getHistoryPage(query) {//分页查询监测点
    return request({
        url: '/warn/warn_level_amend/getWarnDisasterListGroupByDisasterBatchNo/page',
        method: 'get',
        params: query
    })
}


// 详情页监测点查询
export function getDenger(id) {
    return request({
        // url: '/disaster_base_info/'+id,
        url: '/monitor_base_info/'+id,
        method: 'get',
    })
}

// // 详情页未处置分页
export function getRecordPage(query) {
    return request({
        url: '/device/warnsensor/getWarnRecordListPageByDisasterBatchNo/page',
        method: 'get',
        params: query
    })
}

// 详情页已处置分页
export function getTruePage(query) {
    return request({
        url: '/device/warnsensor/getWarnRecordDispositionListPage/page',
        method: 'get',
        params: query
    })
}
// 详情页已处置确认记录
export function getTruerink(query) {
    return request({
        url: '/warn/warn_level_amend/page',
        method: 'get',
        params: query
    })
}


// 宏观预警分页
export function getMacroPage(query) {
    return request({
        url: '/disaster/disaster_macro_observe_record/getMacroObserve',
        method: 'get',
        params: query
    })
}

export function saveSolve(obj) {
    return request({
        url: '/device/warnsensor/aKeyToDispose',
        method: 'post',
        data: obj
    })
}


export function getGrade(query) {
    return request({
        url: '/warn/warn_level_amend/getWarnRecordListByDisasterBatchNo/page',
        method: 'get',
        params: query
    })
}

export function getPerson(query) {
    return request({
        url: '/sms/warn_personnel_config/getPhoneListByProjectIdAndWarnLevel',
        method: 'get',
        params: query
    })
}

export function addGaojin(obj) {
    return request({
        url: '/warn/warn_level_amend',
        // url: '/device/warnlevelamend',
        method: 'post',
        data: obj
    })
}


// 宏观预警一件处置
export function GradeChuzhi(obj) {
    return request({
        url: '/disaster/disaster_macro_observe_record/handle',
        method: 'post',
        data: obj
    })
}


// 预警流程分页
export function getYujin(query) {
    return request({
        url: '/home/getWarnDisposalProcessDescriptionByProjectId',
        // url: '/home/getViewOneByProjectId',
        method: 'get',
        params: query
    })
}

// 预警流程新增
export function addYujin(obj) {
    return request({
        url: '/warn/warn_disposal_process_description',
        method: 'post',
        data: obj
    })
}

export function editYujin(obj) {
    return request({
        url: '/warn/warn_disposal_process_description',
        method: 'post',
        data: obj
    })
}
export function frontDeskAlarmList(query) {//分页查询监测点
    return request({
        url: '/device/warnsensor/frontDeskAlarmList/page',
        method: 'get',
        params: query
    })
}

// 获取设备信息
export function getShebei(query) {
    return request({
        url: '/device/professionaldeviceinfo/page',
        method: 'get',
        params: query
    })
}
// 获取设备id
export function getDeviceId(query) {
    return request({
        url: '/device/professionaldeviceinfo/getIdByDeviceCode',
        method: 'get',
        params: query
    })
}
