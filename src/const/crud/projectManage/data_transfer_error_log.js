export const tableOption = {
  border: true,
  index: true,
  indexLabel: "序号",
  stripe: true,
  menuAlign: "center",
  dialogClickModal: false,
  align: "center",
  searchMenuSpan: 6,
  addBtn: false,
  editBtn: false,
  viewBtn: true,
  delBtn: true,
  columnBtn: false,
  selection: true,
  column: [{
    type: "input",
    label: "设备编号",
    prop: "deviceNo",
    search: true,
    sortable: true,
  }, {
    type: "input",
    label: "转发类型",
    prop: "type"
  }, {
    type: "input",
    label: "数据",
    prop: "data",
    hide: true,
    formslot: true,
    span: 24,
  }, {
    type: "input",
    label: "转发参数",
    prop: "config",
    hide: true,
    formslot: true,
    span: 24,
  }, {
    type: "textarea",
    label: "异常描述",
    span: 24,
    hide: true,
    prop: "description",
    minRows: 30,
  }, {
    type: "input",
    label: "创建时间",
    prop: "createTime",
    sortable: true,
  }]
}