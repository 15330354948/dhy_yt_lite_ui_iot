import request from '@/router/axios'
// 列表
export function preventionList(query) {
  return request({
    url: '/monitor_disaster_prevention_card/page',
    method: 'get',
    params: query
  })
}
// 修改
export function preventionedit(query) {
  return request({
    url: '/monitor_disaster_prevention_card',
    method: 'post',
    data: query
  })
}
export function fetchList(query) {
  return request({
    url: '/mpadp/qcqfperson/page',
    method: 'get',
    params: query
  })
}

export function fetchIdList(id) {
    return request({
      url: '/mpadp/qcqfperson/'+id,
      method: 'get',
    })
  }


export function addObj(obj) {
  return request({
    url: '/mpadp/qcqfperson',
    method: 'post',
    data: obj
  })
}

export function putObj(obj) {
  return request({
    url: '/mpadp/qcqfperson',
    method: 'put',
    data: obj
  })
}

export function delObj(query) {
  return request({
    url: '/mpadp/qcqfperson/del',
    method: 'delete',
    params: query
  })
}

// 根据上级id获取行政区域数据
export function getArea(id) {
    return request({
      url: '/area/parentId/' + id,
      method: 'get',
    })
  }


//   获取文件
export function getFile(id) {
    return request({
      url: '/file/getFiles?fileIdList=' + id,
      method: 'get',
    })
  }

//   新增用户
export function addUser(obj) {
    return request({
      url: '/mpadp/qcqfperson/users',
      method: 'post',
      data: obj
    })
  }

//   获取用户
export function getUser(query) {
    return request({
      url: '/mpadp/qcqfperson/users',
      method: 'get',
      params: query
    })
  }



