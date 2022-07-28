import request from '@/router/axios'
//分页查询
export function fetchList (query) {
  return request({
    url: '/subproject/info/page',
    method: 'get',
    params: query
  })
}

export function getProjectInfo (id) {
  return request({
    url: '/subproject/info/' + id,
    method: 'get'
  })
}
//删除
export function delObj (query) {
  return request({
    url: '/subproject/info/del',
    method: 'delete',
    params: query
  })
}
//添加
export function addObj (obj) {
  return request({
    url: '/subproject/info/save',
    method: 'post',
    data: obj
  })
}
export function editData (obj) {
  return request({
    url: '/subproject/info/update',
    method: 'put',
    data: obj
  })
}

// 获取树形结构
export function getTreeList (query) {
  return request({
    url: '/subproject_file_tree/list',
    method: 'get',
    params: query
  })
}

// 新增树形菜单
export function addFires (obj) {
  return request({
    url: '/subproject_file_tree',
    method: 'post',
    data: obj
  })
}
export function editFires (obj) {
  return request({
    url: '/subproject_file_tree',
    method: 'put',
    data: obj
  })
}
export function deleteFires (id) {
  return request({
    url: '/subproject_file_tree/' + id,
    method: 'delete',
  })
}

export function pullFileUrl(query) {//结构树
  return request({
      url: '/file/' + query,
      method: 'get'
  })
}
