export const tableOption = {
  border: true,
  stripe: true,
  selection: true,
  reserveSelection: true,
  align: 'center',
  menuAlign: 'center',
  searchSpan: 6,
  searchMenuSpan: 4,
  editBtn: false,
  delBtn: false,
  addBtn: false,
  dialogClickModal: false,
  column: [{
      label: '姓名',
      prop: 'name',
      search: true,
      maxlength: 30,
      rules: [{
        required: true,
        message: '请输入姓名',
        trigger: 'blur',
        pattern: /^\S*$/,
      }]
    }, {
      label: '手机号码',
      prop: 'phone',
      search: true,
      maxlength: 30,
      rules: [{
        required: true,
        message: '请输入正确的手机号码',
        trigger: 'blur',
        pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
      }]
    }, {
      label: '街道',
      prop: 'streetCode',
      hide: true,
      search: true,
      span: 12,
      type: "select",
      dicData: [],
      props: {
        label: "name",
        value: "id",
      },
      rules: [{
        required: true,
        message: '请选择街道',
      }],
      dicUrl: "/area/parentId/440308",
      cascaderItem: ["communityCode"], //关联
      dicFormatter: res => {
        return res.data;
      },
      display: true,
    }, {
      display: false,
      label: '街道',
      prop: 'streetName',
    }, {
      label: '社区',
      prop: 'communityCode',
      hide: true,
      search: true,
      span: 12,
      rules: [{
        required: true,
        message: '请选择社区',
      }],
      type: "select",
      dicData: [],
      props: {
        label: "name",
        value: "id",
      },
      dicUrl: "/area/parentId/{{key}}",
      dicFormatter: res => {
        return res.data;
      }
    }, {
      display: false,
      label: '社区',
      prop: 'community',
    }, {
      label: '家庭住址',
      prop: 'location',
      search: true,
      maxlength: 30,
      rules: [{
        required: true,
        message: '请输入家庭住址',
        trigger: 'blur',
        pattern: /^\S*$/,
      }]
    }, {
      label: '监测内容',
      prop: 'content',
      maxlength: 30
    },
    {
      label: '头像',
      prop: 'headUrl',
      hide: true,
      //   type: 'upload',
      row: true,
      formslot: true,
      // loadText: '头像上传中，请稍等',
      // tip: '只能上传jpg/png/jpeg格式',
      // propsHttp: {
      //   res: 'data'
      // },
      // action: '/...'
    },
    {
      label: '关联监测点',
      prop: 'disasterIds',
      type: 'select',
      span: 24,
      hide: true,
      formslot: true,
    },
  ]
}

export const tableOptionInfo = {
  editBtn: false,
  page: false,
  align: 'center',
  menuAlign: 'center',
  addBtn: false,
  delBtn: false,
  disabled: false,
  column: [{
      label: '街道',
      prop: "streetCode",
      type: "select",
      props: {
        label: "name",
        value: "id",
      },
      rules: [{
        required: true,
        message: '请选择街道',
      }],
      dicUrl: "/area/parentId/440308",
      cascaderItem: ["communityCode"], //关联
      dicFormatter: res => {
        return res.data;
      },
    },
    {
      display: false,
      label: '社区',
      prop: 'communityName',
    },
    {
      label: '社区',
      prop: "communityCode",
      type: "select",
      props: {
        label: "name",
        value: "id",
      },
      hide: true,
      rules: [{
        required: true,
        message: '请选择社区',
      }],
      cascaderItem: ["name"],
      dicUrl: "/area/parentId/{{key}}",
      dicFormatter: res => {
        return res.data;
      }
    },
    {
      label: '监测点名称',
      prop: "name",
      type: "select",
      dicData: [],
      props: {
        label: "name",
        value: "pikk",
      },
      rules: [{
        required: true,
        message: '请选择监测点名称',
      }],
      cascaderItem: ["pikk"],
      dicUrl: '/disaster_base_info/page?communityCode={{key}}',
      dicFormatter: res => {
        return res.data.records;
      }
    },
    {
      label: '全市统一编号',
      prop: "pikk",
      type: "select",
      dicData: [],
      disabled: true,
      props: {
        label: "pikk",
        value: "id",
      },
      rules: [{
        required: true,
        message: '请选择全市统一编号',
      }],
      cascaderIndex: 0,
      dicUrl: '/disaster_base_info/page?pikk={{key}}',
      dicFormatter: res => {
        return res.data.records;
      }
    },
  ]

}


export const userOption = {
  submitBtn: true,
  emptyBtn: true,
  column: [{
      label: '用户名',
      prop: 'username',
      span: 24,
      maxlength: 20,
      rules: [{
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
        pattern: /^\S*$/,
      }]
    },
    {
      label: '密码',
      prop: 'password',
      display: true,
      span: 24,
      maxlength: 20,
      rules: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      }]
    },
    {
      label: '所属职务',
      prop: 'deptId',
      span: 24,
      formslot: true,
      addDisplay: true,
      editDisplay: true,
      showColumn: false,
      hide: true,
      showColumn: false,
      rules: [{
        required: true,
        message: '请选择职务',
        trigger: 'change'
      }]
    },
    {
      label: '手机号',
      prop: 'phone',
      span: 24,
      maxlength: 20,
      rules: [{
        required: true,
        message: '请输入正确的手机号码',
        trigger: 'blur',
        pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
      }]
    }
  ]
}
