//监测点图层正射影像
import request from '@/router/axios';

export function addOrthoPhoto(query) {//新增正射影像图
    return request({
        url: '/disaster_orthophoto_map',
        method: 'POST',
        data: query
    })
}
export function getOrthoPhotoList(query) {//通过监测点id查询正射影像图列表分页
    return request({
        url: '/disaster_orthophoto_map/pageByDisasterId',
        method: 'GET',
        params: query
    })
}
export function deleteOrthoPhoto(query) { //通过id删除正射影像图
    return request({
        url: '/disaster_orthophoto_map?ids=' + query,
        method: 'DELETE',
    })
}

export function editOrthoPhoto(query) { //修改正射影像图
    return request({
        url: '/disaster_orthophoto_map',
        method: 'PUT',
        data: query
    })
}


export function getOrthoPhoto(query) {  //通过id查询正射影像图
    return request({
        url: '/disaster_orthophoto_map/'+query,
        method: 'GET',
    })
}