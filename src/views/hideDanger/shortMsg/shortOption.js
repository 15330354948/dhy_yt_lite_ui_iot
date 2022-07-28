export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  labelWidth: 120,
  // searchLabelWidth: 100,
  stripe: true,
  showHeader: true,
  menu:false,
  menuAlign: 'center',
  searchMenuSpan: 6,
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  dialogClickModal: false,
  column: [{
    prop: 'warnLevel',
    label: '预警等级',
    span: 12,
    hide:true
  },
  {
    prop: 'warnLevelName',
    label: '预警等级',
    span: 12,
  }, {
    label: '姓名',
    prop: 'sendPersonName',
    search: true,
    span: 12,
  }, {
    label: '手机号',
    prop: 'phoneNumber',
    search: true,
    span: 12
  }, {
    label: '发生时间',
    prop: 'sendTime',
    search: true,
    span: 12,
    type:'datetime',
    valueFormat:"yyyy-MM-dd hh:mm:ss"
  }, {
    label: '短信内容',
    prop: 'content',
    span: 12
  }]
}
