//监测点图层全景图
import request from '@/router/axios';

export function addPanorama(query) {//保存全景图
    return request({
        url: '/disaster_anorama',
        method: 'POST',
        data: query
    })
}
export function getPanoramaList(query) {//通过监测点id查询全景图列表分页
    return request({
        url: '/disaster_anorama/pageByDisasterId',
        method: 'GET',
        params: query
    })
}
export function deletePanorama(query) { //通过id删除全景图
    return request({
        url: '/disaster_anorama?ids=' + query,
        method: 'DELETE',
    })
}

// export function editPanorama(query) { //修改全景图
//     return request({
//         url: '/disaster_anorama',
//         method: 'PUT',
//         data: query
//     })
// }


export function getPanorama(path) { //通过id查询全景图
    return request({
        url: '/disaster_anorama/' + path,
        method: 'GET',
    })
}
