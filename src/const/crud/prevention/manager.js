export const tableOption = {
  border: true,
  stripe: true,
  selection: true,
  menuAlign: 'center',
  searchSpan: 6,
  searchMenuSpan: 4,
  editBtn: false,
//   excelBtn: true,
  delBtn: false,
  align: 'center',
//   viewBtn: true,
//   viewBtnText: '详情',
  // searchBtn:false,
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
    }
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
  }, {
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
 ]
}


export const userOption = {
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
          trigger: 'blur',
          pattern: /^\S*$/,
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
  