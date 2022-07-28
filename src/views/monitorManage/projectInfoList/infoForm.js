export const options = {
  emptyBtn: false,
  submitBtn: false,
  labelWidth: 200,
  // readonly:true,
  disabled: true,
  column: [{
      label: '项目编号',
      prop: 'code',
      span: 12,
      maxlength: 50,
      fixed: true,
      rules: [{
        required: true,
        message: "请输入项目编号",
        trigger: "blur"
      }],
      disabled: true
    }, {
      label: '项目名称',
      prop: 'name',
      span: 12,
      maxlength: 50,
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
      emitPath: false,
      formslot: true,
      rules: [{
        required: true,
        message: "请选择行政区划",
        trigger: 'blur'
      }],
    },
    {
      label: '地理位置',
      prop: 'address',
      maxlength: 50,
      span: 12,
      rules: [{
        required: true,
        message: "请输入地理位置",
        trigger: 'blur'
      }],
    }, {
      label: '经度',
      prop: 'longitude',
      maxlength: 30,
      span: 12,
      formslot: true,
      rules: [{
        required: true,
        pattern: /^[\-\+]?(0(\.\d{1,99})?|([1-9](\d)?)(\.\d{1,99})?|1[0-7]\d{1}(\.\d{1,99})?|180\.0{1,99})$/,
        message: '请输入正确的经度',
        trigger: 'blur'
      }],
    }, {
      label: '纬度',
      prop: 'latitude',
      rules: [{
        required: true,
        pattern: /^[\-\+]?((0|([1-8]\d?))(\.\d{1,99})?|90(\.0{1,99})?)$/,
        message: '请输入正确的纬度',
        trigger: 'blur'
      }]
    }, {
      label: '中心坐标X',
      prop: 'abscissa',
      span: 12,
      maxlength: 30
    }, {
      label: '中心坐标Y',
      prop: 'ordinate',
      span: 12,
      maxlength: 30
    }, {
      label: '项目类型',
      prop: 'type',
      span: 12,
      type: 'select',
      dicUrl: '/admin/dict/type/project_type',
      props: {
        label: 'label',
        value: 'dictValue'
      },
      dicFormatter: res => {
        return res.data
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
      span: 12,
    },
    {
      label: '负责人员',
      prop: 'personName',
      span: 12,
    },
    {
      label: '负责人员电话',
      maxlength: 11,
      rules: [{
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: "请输入正确的手机号码",
        trigger: "blur"
      }],
      prop: 'phoneNumber',
      span: 12,
    },
    {
      label: '运维人员',
      prop: 'mainteName',
      span: 12,
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
      span: 12,
    },
    {
      label: '项目状态',
      type: 'select',
      prop: 'status',
      span: 12,
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
      span: 12,
      prop: 'cycle',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      type: "datetimerange",
      formslot: true,
    },
    {
      label: '项目说明',
      prop: 'remark',
      type: 'textarea',
      hide: true
    }
  ]
}
