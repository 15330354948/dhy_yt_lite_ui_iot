import request from '@/router/axios'
export function getPage(query) { //分页查询人员信息
  return request({
    url: '/view-operation-personnel/page',
    method: 'get',
    params: query
  })
}

export function getTree(query) { //查询菜单树
  return request({
    url: '/operation/company/tree',
    method: 'get',
    params: query
  })
}

export function addFires(obj) { //新增菜单树
  return request({
    url: '/operation/company',
    method: 'post',
    data: obj
  })
}

export function editFires(obj) { //修改菜单树
  return request({
    url: '/operation/company',
    method: 'post',
    data: obj
  })
}

export function delFires(query) { //删除菜单树
  return request({
    url: '/operation/company',
    method: 'delete',
    params: query
  })
}

export function getDept(query) { //获取部门
  return request({
    url: '/operation/personnel/findByOrgan',
    method: 'get',
    params: query
  })
}

export function getUser(query) { //获取用户信息
  return request({
    url: '/admin/user/getUserByProjectId',
    method: 'get',
    params: query
  })
}

export function addPerson(obj) { //新增人员
  return request({
    url: '/operation/personnel/save',
    method: 'post',
    data: obj
  })
}

export function editPerson(obj) { //新增人员
  return request({
    url: '/operation/personnel/update',
    method: 'put',
    data: obj
  })
}


export function delPerson(query) { //删除人员
  return request({
    url: '/operation/personnel/removeByIds',
    method: 'delete',
    params: query
  })
}
