export const tableOption = {
  border: true,
  index: true,
  indexLabel: "序号",
  stripe: true,
  menuAlign: "left",
  align: "left",
  dialogWidth: 600,
  searchMenuSpan: 6,
  addBtn: true,
  editBtn: true,
  delBtn: true,
  viewBtn: true,
  column: [{
    prop: "ip",
    type: "input",
    label: "IP地址",
    search: true,
    span: 24
  }, {
    type: "input",
    label: "请求地址",
    prop: "requestUri",
    formslot:true,
    span: 24,
  }, {
    type: "select",
    label: "请求方法",
    prop: "requestMethod",
    search: true,
    span: 24,
    dicData: [
      {value: 'GET', label: "GET"},
      {value: 'POST', label: "POST"},
      {value: 'PUT', label: "PUT"},
      {value: 'DELETE', label: "DELETE"},
      {value: 'ALL', label: "ALL"}
    ]
  }, {
    label: "时间范围",
    prop: 'timerange',
    type: 'timerange',
    startPlaceholder: '时间开始范围自定义',
    endPlaceholder: '时间结束范围自定义',
    hide: true,
    span: 24
  }, {
    type: "time",
    label: "开始时间",
    prop: "startTime",
    search: true,
    addDisplay:false,
    editDisplay:false,
    span: 24
  }, {
    type: "time",
    label: "结束时间",
    prop: "endTime",
    search: true,
    addDisplay:false,
    editDisplay:false,
    span: 24
  }, {
    label: "状态",
    search: true,
    prop: "status",
    slot: true,
    type: "radio",
    border: true,
    valueFormat: "string",
    span: 24,
    dicData: [
      {
        label: "关闭",
        value: false
      },
      {
        label: "启用",
        value: true
      },
    ]
  }]
}
