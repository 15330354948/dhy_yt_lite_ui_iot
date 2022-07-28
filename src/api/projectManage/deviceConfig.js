import request from '@/router/axios'
export function fetchList(query) {//表格列表接口
    return request({
      url: '/device/project_data_transfer_config/page',
      params: query,
      method: 'get'
    })
  }
export function addObj(obj) {//新增接口

    return request({
        url: '/device/project_data_transfer_config',
        method: 'post',
        data: obj
      })
  }
export function putObj(obj) {//修改接口
    return request({
        url: '/device/project_data_transfer_config',
        data: obj,
      method: 'put',
    })
  }
export function delObj(id) {//删除接口
    return request({
        url: '/device/project_data_transfer_config/'+id,
        method: 'delete'
      })
  }

