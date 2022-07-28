export const searchOption = {
  align: 'center',
  menuAlign: 'center',
  labelWidth: 120,
  span: 6,
  submitText: '搜索',
  menuSpan: 4,
  enter: true,
  column: [{
    label: '项目编号',
    prop: 'code',
    // maxlength: 16,
  }, {
    label: '项目名称',
    prop: 'name',
    // maxlength: 16,
  }, {
    label: '项目类型',
    prop: "type",
    type: "select",
    props: {
      label: 'label',
      value: 'dictValue'
    },
    dicUrl: '/admin/dict/type/project_type',
    dicFormatter: res => {
      return res.data
    },
  }, {
    label: '项目状态',
    prop: 'status',
    type: 'select',
    dicUrl: '/admin/dict/type/project_state',
    props: {
      label: 'label',
      value: 'dictValue'
    },
    dicFormatter: res => {
      return res.data
    },
  }, {
    label: '行政区域',
    prop: 'cascader',
    type: "cascader",
    // hide: true,
    checkStrictly: true, //可选任意级
    emitPath: false,
    slot: true,
    // rules: [{
    //   message: "请选择行政区域",
    //   trigger: 'blur'
    // }],
    props: {
      label: 'name',
      value: 'code'
    },
  }, ]
}

// table
export const tableOption = {
  align: 'center',
  menuAlign: 'center',
  labelWidth: 120,
  menuWidth: 300,
  selection: true,
  reserveSelection: true,
  stripe: true,
  index: true,
  indexLabel: '序号',
  showHeader: true,
  delBtn: false,
  addBtn: false,
  editBtn: false,
  border: true,
  dialogClickModal: false,
  column: [{
      label: '项目编号',
      prop: 'code',
      minWidth: 100,
      maxlength: 50,
      fixed: true,
      rules: [{
        required: true,
        message: "请输入项目编号",
        trigger: "blur"
      }],
    }, {
      label: '项目名称',
      prop: 'name',
      minWidth: 150,
      maxlength: 50,
      fixed: true,
      rules: [{
        required: true,
        message: "请输入项目名称",
        trigger: "blur"
      }, ]
    },
    {
      label: '行政区划',
      prop: 'cascader',
      type: "cascader",
      checkStrictly: true, //可选任意级
      hide: true,
      emitPath: false,
      slot: true,
      rules: [{
        required: true,
        message: "请选择行政区划",
        trigger: 'blur'
      }],
      props: {
        label: 'name',
        value: 'code'
      },
    },
    {
      display: false,
      label: "行政区划",
      showWordLimit: true,
      overHidden: true,
      prop: "xzqh",
      slot: true,
    },
    {
      label: '地理位置',
      hide: true,
      prop: 'address',
      maxlength: 50,
      minWidth: 200,
      rules: [{
        required: true,
        message: "请输入地理位置",
        trigger: 'blur'
      }],
    }, {
      label: '经度',
      prop: 'longitude',
      hide: true,
      slot: true,
      rules: [{
        required: true,
        pattern: /^[\-\+]?(0(\.\d{1,99})?|([1-9](\d)?)(\.\d{1,99})?|1[0-7]\d{1}(\.\d{1,99})?|180\.0{1,99})$/,
        message: '请输入正确的经度',
        trigger: 'blur'
      }],
    }, {
      label: '纬度',
      prop: 'latitude',
      hide: true,
      rules: [{
        required: true,
        pattern: /^[\-\+]?((0|([1-8]\d?))(\.\d{1,99})?|90(\.0{1,99})?)$/,
        message: '请输入正确的纬度',
        trigger: 'blur'
      }]
    }, {
      label: '中心坐标X',
      prop: 'abscissa',
      hide: true,
      minWidth: 200,
    }, {
      label: '中心坐标Y',
      prop: 'ordinate',
      hide: true,
      minWidth: 200,
    }, {
      label: '项目类型',
      prop: 'type',
      type: 'select',
      dicUrl: '/admin/dict/type/project_type',
      dicFormatter: res => {
        return res.data
      },
      props: {
        label: 'label',
        value: 'dictValue'
      },
      rules: [{
        required: true,
        message: "请点击选择项目类型",
        trigger: "change"
      }],
    },
    {
      label: '负责单位',
      prop: 'unitName',
      minWidth: 200,
      hide: true,
    },
    {
      label: '负责人员',
      prop: 'personName',
      minWidth: 200,
      hide: true,
    },
    {
      label: '负责人员电话',
      prop: 'phoneNumber',
      maxlength: 11,
      rules: [{
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: "请输入正确的手机号码",
        trigger: "blur"
      }],
      minWidth: 200,
      hide: true,
    },
    {
      label: '运维人员',
      prop: 'mainteName',
      minWidth: 200,
      hide: true,
    },
    {
      label: '运维人员电话',
      prop: 'maintePhone',
      maxlength: 11,
      rules: [{
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: "请输入正确的手机号码",
        trigger: "blur"
      }],
      minWidth: 200,
      hide: true,
    },
    {
      label: '项目状态',
      type: 'select',
      prop: 'status',
      dicUrl: '/admin/dict/type/project_state',
      dicFormatter: res => {
        return res.data
      },
      props: {
        label: 'label',
        value: 'dictValue'
      },
      rules: [{
        required: true,
        message: "请点击选择项目状态",
        trigger: "change"
      }],
    },
    {
      label: '项目周期',
      minWidth: 180,
      prop: 'cycle',
      hide: true,
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      type: "daterange",
    },
    {
      label: '创建时间',
      minWidth: 180,
      prop: 'createTime',
      display: false,
      //   addDisplay: false,
      //   editDisplay: false,
      type: "datetime",
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      mock: {
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm:ss',
        now: true,
      },
    },
    {
      label: '关联监测点/个',
      prop: 'monitorTotal',
      display: false,
      hide: false,
    },
    {
      label: '关联设备/台',
      prop: 'deviceTotal',
      span: 24,
      display: false,
      hide: false,
    },
    {
      label: '已完成后记录设备数',
      prop: 'completeDeviceTotal',
      span: 24,
      display: false,
      hide: true,
    },
    {
      label: '已完成后记录监测点数',
      prop: 'completeMonitorTotal',
      span: 24,
      display: false,
      hide: true,
    },
    {
      label: '项目说明',
      prop: 'remark',
      type: 'textarea',
      hide: true
    }
  ]
}
