import request from '@/router/axios'
/**********************************外层表格******************************/
//设备异常外层的分页列表
export function fetchList (query) {
    return request({
      url: '/abnormal/view/device/record/page',
      method: 'get',
      params: query
    })
  }
  //设备编号数据获取接口
  export function getDevNo(query) {
    return request({
      url: '/device/professionaldeviceinfo/getListByProjectId',
      method: 'get',
      params: query
    })
  }
  //新增异常设备
  export function addObj(obj) {
    return request({
      url: '/abnormal/device/record',
      method: 'post',
      data: obj
    })
  }
  //删除、批量删除
  export function batchDelObj(string) {
    return request({
      url: '/abnormal/device/record?idList='+string,
      method: 'delete',
    })
  }
  //批量处置
  export function multiDisposalHanlde(obj) {
    return request({
      url: '/abnormal/device/record/disposal/batch-save',
      method: 'post',
      data: obj
    })
  }
  //查询设备异常的处置状态
  export function getdisposalStatusBydevId (deviceId) {
    return request({
      url: '/abnormal/device/record/selectLatestStatus?deviceId='+deviceId,
      method: 'get',
    })
  }
  /*********************************详情之设备异常记录*******************************/

  export function FetchListInner (query) {
    return request({
      url: '/abnormal/device/record/detail/page',
      method: 'get',
      params: query
    })
  }
  export function addObjInner(obj) {
    return request({
      url: '/abnormal/device/record/detail',
      method: 'post',
      data: obj
    })
  }
  export function putObjInner(obj) {
    return request({
      url: '/abnormal/device/record/detail',
      method: 'put',
      data: obj
    })
  }
    //删除、批量删除
    export function batchDelObjInner(string) {
      return request({
        url: '/abnormal/device/record/detail?idList='+string,
        method: 'delete',
      })
    }
    //手动新增处置记录
    export function disposalHanlde(obj) {
      return request({
        url: '/abnormal/device/record/disposal/add',
        method: 'post',
        data: obj
      })
    }
   
  /***************************************详情之处置记录*************************/
  export function getDisposalRecord(abnormalDeviceRecordId) {
    return request({
      url: '/abnormal/device/record/disposal/list/'+abnormalDeviceRecordId,
      method: 'get',
    })
  }


  /*****************************详情之运维记录 与 工单管理里面的全部工单接口一致***********************************/



  /****************************************************************/

    /***************************************详情之处置记录*************************/
    // 可视化视图分页查询
    export function abnormalViewList(query){
      return request({
        url: '/abnormal/view/device/record/visualization/page',
        method: 'get',
        params: query
      })
    }

    export function getDic(type) {
      return request({
        url: '/admin/dict/type/' + type,
        method: 'get',
      })
    }