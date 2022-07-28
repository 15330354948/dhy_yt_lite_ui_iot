export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  labelWidth: 100,
  stripe: true,
  selection:true,
  menuAlign: 'center',
  searchMenuSpan: 6,
  reserveSelection: false,
  selectClearBtn: false,
  showClomnuBtn:false,
  refreshBtn: false,
  columnBtn: false,
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  dialogClickModal: false,
  column: [ {
    label: '街道',
    prop: 'jiedao',
    search: true,
  }, {
    label: '社区',
    type: 'select',
    prop: 'shequ',
    search: true,
  }, {
    label: '监测点名称',
    prop: 'username',
    search: true,
  },{
    label: '位置',
    prop: 'roleName',
    search: true,
  }, {
    label: '预警时间',
    prop: 'warnTime',
    search: true,
    type: 'datetime',
    addDisplay: false,
    editDisabled: true,
    hide: true,
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm:ss'
  },{
    label: '预警等级',
    prop: 'deptNameNoCanSelect',
    type: 'select',
    search: true,
    dicData: [
      {
        label: "红色预警",
        value: 0,
      },
      {
        label: "橙色预警",
        value: 1,
      },{
        label: "黄色预警",
        value: 2,
      },
      {
        label: "蓝色预警",
        value: 3,
      },]
  }, {
    label: '预警状态',
    type: 'select',
    prop: 'status',
    search: true,
    dicData: [
      {
        label: "未出置",
        value: 0,
      },
      {
        label: "处置中",
        value: 1,
      },{
        label: "已关闭",
        value: 2,
      },
      {
        label: "预警响应",
        value: 3,
      },]
  }]
}
