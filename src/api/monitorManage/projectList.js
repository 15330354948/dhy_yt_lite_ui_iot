import request from '@/router/axios'
//分页查询
export function fetchList (query) {
  return request({
    url: '/project/professional_project_management/page',
    method: 'get',
    params: query
  })
}

export function getProjectInfo (id) {
  return request({
    url: '/project/professional_project_management/' + id,
    method: 'get'
  })
}
//删除
export function delObj (id) {
  return request({
    url: '/project/professional_project_management/' + id,
    method: 'delete'
  })
}
//添加
export function addObj (obj) {
  return request({
    url: '/project/professional_project_management/save',
    method: 'post',
    data: obj
  })
}
// //查看详情
// export function getObj (id) {
//   return request({
//     url: '/device/professionalprojectmanagement/' + id,
//     method: 'get'
//   })
// }
//修改
export function putObj (obj) {
  return request({
    url: '/project/professional_project_management/updateById',
    method: 'put',
    data: obj
  })
}
//设备查询
export function equipment(query){
  return request ({
    url:'/project/professional_project_management/device',
    method:'get',
    params:query
  })
}

//批量删除
export function delduo(ids){
  return request({
    url:'/project/professional_project_management/ids?ids='+ids,
    method:'delete',
  })
}
//项目资料
export function projectinformation(id){
  return request ({
    url:'/project/professional_project_management/selectByProjectId?id='+id,
    method:'get',

  })
}
//设备列表分页
export function equipmentlist (query) {
  return request({
    url: '/project/professional_project_management/page',
    method: 'get',
    params: query
  })
}
//新增项目资料
export function  projectIn(query){
  return request({
    url:'/device/project_information_file',
    method:'post',
    data:query
  })
}
//修改项目资料
export function  modifydata(query){
  return request({
    url:"/device/project_information_file",
    method:"put",
    data:query
  })
}
//根据id显示项目资料
export function  exhibitionMaterials(projectId){
  return request ({
    url:'/device/project_information_file/project/'+projectId,
    method:'get'
  })
}
//通过id删除项目资料
export function deletedata(id){
  return request({
    url:'/device/project_information_file/'+id,
    method:'delete'
  })
}
//上传
export function getdownError(query){
  return request({
    url:'/file/upload',
    method:'post',
    params:query
  })
}

export function dutyPersonList (query) {
  return request({
    url: '/project/project_duty_person/page',
    method: 'get',
    params: query
  })
}

//删除
export function delDutyObj (id) {
  return request({
    url: '/project/project_duty_person',
    method: 'delete',
    data: id
  })
}
//添加
export function addDutyObj (obj) {
  return request({
    url: '/project/project_duty_person',
    method: 'post',
    data: obj
  })
}

//修改
export function putDutyObj (obj) {
  return request({
    url: '/project/project_duty_person',
    method: 'put',
    data: obj
  })
}
