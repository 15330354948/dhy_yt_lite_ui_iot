export const tableOption = {
  border: true,
  index: true,
  indexLabel: "序号",
  stripe: true,
  menuAlign: "left",
  align: "left",
  searchMenuSpan: 6,
  height: 530,
  maxHeight: 530,
  selection: true,
  addBtn: false,
  editBtn: true,
  viewBtn: true,
  column: [
    {
      type: "input",
      label: "服务ID",
      editDisabled: true,
      prop: "serviceId"
    },
    {
      type: "input",
      label: "接口编码",
      search: true,
      hide: true,
      editDisabled: true,
      prop: "code"
    }, {
      type: "input",
      label: "接口名称",
      search: true,
      prop: "name"
    }, {
      type: "input",
      label: "接口描述",
      hide: true,
      search: true,
      prop: "notes"
    }, {
      type: "input",
      label: "请求方法",
      editDisabled: true,
      prop: "method"
    }, {
      type: "input",
      label: "类名",
      editDisabled: true,
      hide: true,
      prop: "className"
    }, {
      type: "input",
      label: "方法名",
      editDisabled: true,
      hide: true,
      search: true,
      prop: "methodName"
    }, {
      type: "input",
      label: "请求路径",
      editDisabled: true,
      search: true,
      prop: "path"
    }, {
      type: "input",
      label: "匹配模式",
      editDisabled: true,
      hide: true,
      prop: "pattern"
    }, {
      type: "input",
      label: "响应类型",
      editDisabled: true,
      hide: true,
      prop: "contentType"
    }, {
      label: "API状态",
      search: true,
      prop: "status",
      slot: true,
      type: "radio",
      border: true,
      width: 70,
      valueFormat: "string",
      dicData: [
        {
          label: "禁用",
          value: false
        },
        {
          label: "启用",
          value: true
        },
      ]
    }, {
      label: "是否认证",
      prop: "auth",
      slot: true,
      type: "radio",
      search: true,
      border: true,
      editDisabled: true,
      width: 90,
      valueFormat: "string",
      dicData: [
        {
          label: "忽略认证",
          value: "0"
        },
        {
          label: "身份认证",
          value: "1"
        },
      ]
    }]
}
