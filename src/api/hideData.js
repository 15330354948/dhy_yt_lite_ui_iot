import request from '@/router/axios'

export function disasterFile(id){//查询
    return request({
        url:'/disaster_data_file/disasterFile/' + id,
        method:'GET'
    })
}

export function disasterFileUpload(query){//上传
    return request({
        url:'/pmfileinfo',
        method:'POST',
        data:query
    })
}

export function delFiles(query){//删除
    return request({
        url:'/disaster_data_file?ids=' + query,
        method:'DELETE',
    })
}
export function getTree(query) {//结构树
    return request({
        url: '/disaster_file_tree/list',
        method: 'get',
        params: query
    })
}

export function addFires(query) {//结构树
    return request({
        url: '/disaster_file_tree',
        method: 'POST',
        data: query
    })
}

export function editFires (query) {//结构树
    return request({
        url: '/disaster_file_tree',
        method: 'PUT',
        data: query
    })
}
export function deleteFires(query) {//结构树
    return request({
        url: '/disaster_file_tree/' + query,
        method: 'DELETE'
    })
}

export function getFilesList(query) {//结构树
    return request({
        url: '/disaster_file_tree/page',
        method: 'get',
        params: query
    })
}

export function deleteFiresInfo(query) {//结构树
    return request({
        url: '/disaster_file_tree/' + query,
        method: 'DELETE'
    })
}

export function pullFileUrl(query) {//结构树
    return request({
        url: '/file/' + query,
        method: 'get'
    })
}


