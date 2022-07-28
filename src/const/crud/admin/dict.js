export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'left',
  refreshBtn: true,
  columnBtn: false,
  searchMenuSpan: 8,
  searchSpan: 12,
  dialogClickModal: false,
  menuWidth: 250,
  viewBtn: true,
  searchSize: 'mini',
  addBtnText: '新增字典',
  height: 500,
  column: [{
    label: '类型',
    prop: 'type',
    width: 280,
    /*editDisabled: true,*/
    rules: [{
      required: true,
      message: '请输入字典类型',
      trigger: 'blur'
    }]
  }, {
    label: '描述',
    prop: 'description',
    search: true,
    rules: [{
      required: true,
      message: '请输入字典描述',
      trigger: 'blur'
    }]
  }, {
    label: '字典类型',
    prop: 'system',
    type: 'select',
    hide: true,
    dicUrl: '/admin/dict/type/dict_type',
    rules: [{
      required: true,
      message: '请输入字典类型',
      trigger: 'blur'
    }],
    search: true,
  }, {
    label: '备注信息',
    prop: 'remarks',
    search: true,
    hide: true,
  }, {
    width: 150,
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    addDisplay: false,
    editDisabled: true,
    hide: true,
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm:ss'
  }]
}

export const tableDictItemOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  refreshBtn: true,
  columnBtn: false,
  dialogClickModal: false,
  searchMenuSpan: 8,
  searchSpan: 12,
  searchSize: 'mini',
  addBtnText: '新增字典项',
  height: 500,
  column: [{
    labelWidth: 120,
    label: '类型',
    prop: 'type',
    hide: true,
    addDisabled: true,
    editDisabled: true
  },  {
    labelWidth: 120,
    label: '枚举字段编码',
    prop: 'enumCode',
    editDisabled: false,
    rules: [{
      required: true,
      message: '请输入枚举字段编码',
      trigger: 'blur'
    }]
  }, {
    labelWidth: 120,
    width: 150,
    label: '数据值',
    prop: 'value',
    search: true,
    rules: [{
      required: true,
      message: '请输入数据值',
      trigger: 'blur'
    }]
  },{
    labelWidth: 120,
    label: '标签名',
    prop: 'label',
    search: true,
    rules: [{
      required: true,
      message: '请输入标签名',
      trigger: 'blur'
    }]
  }, {
    labelWidth: 120,
    label: '描述',
    hide: true,
    search: true,
    prop: 'description',
    rules: [{
      required: true,
      message: '请输入字典描述',
      trigger: 'blur'
    }]
  }, {
    labelWidth: 120,
    label: '排序',
    prop: 'sort',
    type: 'number',
    hide: true,
    rules: [{
      required: true,
      message: '请输入排序',
      trigger: 'blur'
    }]
  }, {
    labelWidth: 120,
    type: "textarea",
    label: '备注信息',
    hide: true,
    prop: 'remarks',
    span: 24
  }]
}
