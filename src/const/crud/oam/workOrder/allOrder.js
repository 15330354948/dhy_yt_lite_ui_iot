var DIC = {
  Overdue: [{
    label: '正常',
    value: '0'
  }, {
    label: '逾期',
    value: '1'
  }],
};
export const tableOption = {
  align: 'center',
  menuAlign: 'center',
  menuWidth: 100,
  selection: true,
  size: 'mini',
  reserveSelection: true,
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 6,
  labelWidth: 130,
  searchLabelWidth: 100,
  addBtn: false,
  delBtn: false,
  editBtn: false,
  filterBtn: false,
  column: [{
      label: '工单编号',
      prop: 'code',
      rules: [{
        required: true,
        message: "请输入工单编号",
        trigger: "blur"
      }],
      overHidden: true,
      addDisplay: false,
      editDisplay: false,
      // search: true,
      order: 1
    }, {
      label: '工单标题',
      prop: 'title',
      rules: [{
        required: true,
        message: "请输入工单标题",
        trigger: "blur"
      }],
      overHidden: true,
      search: true,
      order: 1
    },
    {
      label: '监测点名称',
      prop: 'monitorName',
      search: true,
      overHidden: true,
      addDisplay: false,
      editDisplay: false,
    }, {
      label: '关联监测点',
      prop: 'monitorId',
      hide: true,
      rules: [{
        required: true,
        message: "请输入设备名称",
        trigger: "blur"
      }],
      // addDisplay:false,
      // editDisplay:false,
    }, {
      label: '设备编号',
      prop: 'deviceCode',
      search: true,
      overHidden: true,
    }, {
      label: '设备类型',
      prop: 'deviceType',
      search: true,
      overHidden: true,
      type: 'select',
      dicUrl: '/admin/dict/type/device_type',
    }, {
      label: '负责人员',
      prop: 'chargePersonId',
      // search: true,
      // searchType: 'input',
      hide: true,
      type: 'select',
      slot: true,
      // dicUrl: '/admin/dict/type/device_type',
      rules: [{
        required: true,
        message: "请选择设备类型",
        trigger: "change"
      }],
    }, {
      label: '负责人员',
      prop: 'chargePersonName',
      search: true,
      addDisplay: false,
      editDisplay: false,
    }, {
      label: '工单状态',
      prop: 'faultState',
      type: 'select',
      dicUrl: '/admin/dict/type/order_type',
      search: true,
      slot: true,
      addDisplay: false,
      editDisplay: false,
    }, {
      label: '紧急程度',
      prop: 'urgencyDegree',
      type: 'radio',
      span: 24,
      button: true,
      search: true,
      dicData: [{
        label: '一般',
        value: 0
      }, {
        label: '紧急',
        value: 1
      }, {
        label: '非常紧急',
        value: 2
      }],
      rules: [{
        required: true,
        message: "请选择设备类型",
        trigger: "change"
      }],
    },
    // {
    //   label: '故障原因',
    //   prop: 'faultReason',
    //   type: 'select',
    //   dicUrl: '/admin/dict/type/cause_of_failure',
    //   addDisplay: false,
    //   editDisplay: false,
    //   search: true,
    // },
    {
      label: '是否逾期',
      prop: 'isOverdue',
      type: 'select',
      slot: true,
      dicData: DIC.Overdue,
      addDisplay: false,
      editDisplay: false,
      search: true,
      mock: {
        type: 'dic',
      },
    },
    // {
    //   label: '逾期天数',
    //   prop: 'overdueDay',
    //   addDisplay: false,
    //   editDisplay: false,
    // },
    {
      label: '期望完成时间',
      prop: 'expectCompleteTime',
      type: "datetime",
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      searchRange: true,
      overHidden: true,
      rules: [{
        required: true,
        message: "请输入设备名称",
        trigger: "blur"
      }],
      search: true,
      order: 10
    },
    {
      label: '创建时间',
      prop: 'createTime',
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      type: "datetime",
      searchRange: true,
      overHidden: true,
      search: true,
      addDisplay: false,
      editDisplay: true,
      order: 11
    }, {
      label: '提醒方式',
      prop: 'msgMode',
      span: 24,
      type: 'radio',
      border: true,
      dicData: [{
        label: '短信通知',
        value: 0
      }],
      hide: true,
    }, {
      label: '工单描述',
      prop: 'remark',
      type: 'textarea',
      span: 24,
      rules: [{
        required: true,
        message: "请填写工单描述",
        trigger: "blur"
      }],
      hide: true,
    }, {
      label: '上传附件',
      prop: 'files',
      span: 24,
      slot: true,
      formslot: true,
      hide: true,
    },
  ]
}
