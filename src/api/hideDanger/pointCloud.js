//隐患图层点云列表
import request from '@/router/axios';

export function addPointCloud(query) {//新增点云
    return request({
        url: '/disaster_point_cloud',
        method: 'POST',
        data: query
    })
}
export function getPointCloudList(query) {//通过监测点id查询点云列表分页
    return request({
        url: '/disaster_point_cloud/pageByDisasterId',
        method: 'GET',
        params: query
    })
}
export function deletePointCloud(query) { //通过id删除点云
    return request({
        url: '/disaster_point_cloud?ids=' + query,
        method: 'DELETE',
    })
}

// export function editPointCloud(query) {  //修改点云
//     return request({
//         url: '/disaster_point_cloud',
//         method: 'PUT',
//         data: query
//     })
// }


export function getPointCloud(query) { //通过id查询点云
    return request({
        url: '/disaster_point_cloud/'+query,
        method: 'GET',
    })
}