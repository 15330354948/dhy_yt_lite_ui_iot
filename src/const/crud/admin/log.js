export const tableOption = {
  border: true,
  index: true,
  indexWidth: 80,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 150,
  align: 'center',
  refreshBtn: true,
  searchMenuSpan: 6,
  showClomnuBtn: false,
  searchSize: 'mini',
  dialogClickModal: false,
  addBtn: false,
  editBtn: false,
  viewBtn: true,
  props: {
    label: 'label',
    value: 'value'
  },
  column: [{
    label: 'ID',
    prop: 'id',
    hide: true
  }, {
    label: '用户名',
    search: true,
    prop: 'createBy'
  }, {
    label: '类型',
    prop: 'type',
    type: 'select',
    dicUrl: '/admin/dict/type/log_type',
    search: true
  }, {
    label: '标题',
    search: true,
    prop: 'title'
  }, {
    label: 'IP地址',
    search: true,
    prop: 'remoteAddr'
  }, {
    label: '请求方式',
    search: true,
    prop: 'method'
  }, {
    label: '客户端',
    search: true,
    prop: 'serviceId'
  }, {
    width: 80,
    label: '耗时(ms)',
    prop: 'time'
  },
  //  {
  //   span: 24,
  //   type: 'textarea',
  //   hide: true,
  //   label: '参数',
  //   prop: 'params',
  //   formslot: true
  // }, {
  //   span: 24,
  //   type: 'textarea',
  //   hide: true,
  //   label: 'body',
  //   prop: 'body'
  // }, 
  {
    width: 150,
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm:ss'
  }]
}
