export const tableOption = {
  border: true,
  index: true,
  indexLabel: "序号",
  stripe: true,
  menuAlign: "left",
  align: "left",
  dialogWidth: 600,
  menuWidth: 280,
  searchMenuSpan: 6,
  searchSpan: 8,
  addBtn: true,
  editBtn: true,
  delBtn: true,
  viewBtn: true,
  column: [{
    type: "input",
    label: "服务名称",
    prop: "name",
    search: true,
    span: 24
  }, {
    type: "input",
    label: "服务前缀",
    prop: "path",
    search: true,
    span: 24
  }, {
    type: "input",
    label: "服务编码",
    prop: "serviceId",
    search: true,
    span: 24
  }, {
    prop: "status",
    label: "服务状态",
    search: true,
    slot: true,
    type: "radio",
    border: true,
    span: 24,
    width: 70,
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
    prop: "runStatus",
    label: "运行状态",
    slot: true,
    width: 70,
    editDisplay: false,
    addDisplay: false,
  }, {
    type: "input",
    label: "实例总数",
    width: 80,
    prop: "instanceCount",
    disabled: true,
    addDisplay: false,
    editDisplay: false
  }, {
    type: "input",
    label: "启用实例数",
    prop: "enableInstanceCount",
    width: 90,
    disabled: true,
    addDisplay: false,
    editDisplay: false
  }, {
    type: "input",
    label: "健康实列数",
    prop: "healthyInstanceCount",
    width: 90,
    disabled: true,
    addDisplay: false,
    editDisplay: false
  },]
}

export const tableInstanceOption = {
  border: true,
  index: true,
  stripe: true,
  menuAlign: "left",
  align: "left",
  dialogWidth: 600,
  menuWidth: 150,
  searchMenuSpan: 6,
  searchSpan: 8,
  addBtn: false,
  editBtn: true,
  viewBtn: true,
  delBtn: false,
  column: [{
    label: "所在集群",
    prop: "clusterName",
    span: 24,
    width: 120,
    editDisabled: true,
  }, {
    label: "实例Id",
    prop: "instanceId",
    span: 24,
    editDisabled: true,
  }, {
    label: "实例名称",
    prop: "serviceName",
    span: 24,
    editDisabled: true,
  }, {
    label: "IP",
    prop: "ip",
    width: 100,
    editDisabled: true,
    span: 12,
  }, {
    label: "端口",
    prop: "port",
    width: 70,
    editDisabled: true,
    span: 12,
  }, {
    type: "radio",
    label: "是否健康",
    prop: "healthy",
    editDisabled: true,
    formslot: true,
    width: 70,
    span: 12,
    dicData: [
      {
        label: "否",
        value: false
      },
      {
        label: "是",
        value: true
      },
    ]
  }, {
    label: "临时实例",
    prop: "ephemeral",
    span: 12,
    width: 70,
    editDisabled: true,
    formslot: true,
    dicData: [
      {
        label: "否",
        value: false
      },
      {
        label: "是",
        value: true
      },
    ]
  }, {
    label: "是否上线",
    prop: "enabled",
    span: 12,
    slot: true,
    width: 70,
    formslot: true,
    dicData: [
      {
        label: "下线",
        value: false
      },
      {
        label: "上线",
        value: true
      },
    ]
  }, {
    type: "number",
    label: "权重",
    prop: "weight",
    width: 50,
    span: 12,
  }, {
    label: "METADATA",
    prop: "metadata",
    formslot: true,
    span: 24,
    hide: true,
  }]
}
