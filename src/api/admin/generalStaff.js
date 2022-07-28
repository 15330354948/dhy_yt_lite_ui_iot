import request from '@/router/axios'
//分页查询
export function fetchList(query) {
    return request({
        url: '/mpadp/qcqfcomprehensiveperson/page',
        method: 'get',
        params: query
      })
}
//删除
export function delObj (ids) {
    return request({
      url: '/mpadp/qcqfcomprehensiveperson?ids='+ids,
      method: 'delete',
    })
  }
  //添加
  export function addObj (obj) {
    return request({
      url: '/mpadp/qcqfcomprehensiveperson',
      method: 'post',
      data: obj
    })
  }
  //查询
  export function getObj (id) {
    return request({
      url: '/mpadp/qcqfcomprehensiveperson/' + id,
      method: 'get'
    })
  }
  //修改
  export function putObj (obj) {
    return request({
      url: '/mpadp/qcqfcomprehensiveperson',
      method: 'put',
      data: obj
    })
  }
  //批量删除
  export function delduo(ids){
    return request({
      url:'/mpadp/qcqfcomprehensiveperson/',
      method:'delete',
      params:ids
    })
  }


//综合人员文件夹
export function foler(obj) {
    return request ({
        url:'/mpadp/qcqfcomprehensiveperson',
        method:'post',
        data:obj
    })
}

//返回文件夹
export function folerlist(obj) {
    return request ({
        url:'/mpadp/qcqfcomprehensiveperson/folder_list',
        method:'get',
        data:obj
    })
}
//综合人员文件夹删除
export function delrenyuan(ids){
  return request ({
    url:"/mpadp/qcqfcomprehensiveperson?ids=" +ids,
    method:"delete"

  })
}
//修改文件夹名
export function modifyobj (obj) {
  return request({
    url: '/mpadp/qcqfcomprehensiveperson',
    method: 'put',
    data: obj
  })
}
//上传文件
export function  uploadlist(){
  return request({
    url:"/file/multipart_upload",
    method:'post',

  })
}