//监测点图层影像图
import request from '@/router/axios';

export function addImgMap(query) {//新增新增影像图
    return request({
        url: '/disaster_image_map',
        method: 'POST',
        data: query
    })
}
export function getImgMapList(query) {   //通过监测点id查询影像图列表分页
    return request({
        url: '/disaster_image_map/pageByDisasterId',
        method: 'GET',
        params: query
    })
}
export function deleteImgMap(query) { //通过id删除影像图
    return request({
        url: '/disaster_image_map?ids=' + query,
        method: 'DELETE',
    })
}

export function editImgMap(query) {  //修改影像图
    return request({
        url: '/disaster_image_map',
        method: 'PUT',
        data: query
    })
}


export function getImgMap(query) {
    return request({
        url: '/disaster_image_map/'+query,
        method: 'GET',
    })
}
