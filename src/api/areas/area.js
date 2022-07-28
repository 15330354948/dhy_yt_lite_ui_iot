import request from '@/router/axios'
export function fetchList(query) {//表格列表接口
    return request({
      url: '/area/page',
      params: query,
      method: 'get'
    })
  }
export function addObj(obj) {//新增接口

    return request({
        url: '/area',
        method: 'post',
        data: obj
      })
  }
export function putObj(obj) {//修改接口
    return request({
        url: '/area',
        data: obj,
      method: 'put',
    })
  }
export function delObj(id) {//删除接口
    return request({
        url: '/area/' + id,
        method: 'delete'
      })
  }

