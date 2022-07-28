import { getDetails } from '@/api/admin/user'

var validateUsername = (rule, value, callback) => {
  if (value) {
    getDetails(value).then(response => {
      if (window.boxType === 'edit') callback()
      let result = response.data.data
      if (result !== null) {
        callback(new Error('用户名已经存在'))
      } else {
        callback()
      }
    });
  } else {
    callback()
  }
}
export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  searchMenuSpan: 6,
  labelWidth:150,
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  dialogClickModal: false,
  column: [{
    fixed: true,
    type: 'number',
    label: '用户ID',
    prop: 'userId',
    span: 24,
    hide: true,
    showColumn: false,
    // editDisabled: true,
    addDisplay: false,
    editDisplay: false
  }, {
    fixed: true,
    label: '用户名',
    prop: 'username',
    editDisabled: true,
    slot: true,
    search: true,
    span: 24,
    rules: [{
      required: true,
      message: '请输入用户名'
    },
    {
      min: 3,
      max: 50,
      message: '请正确输入用户名,长度在 3 到 50,可选择(字母、数字、下划线)',
      pattern: /^[A-Za-z0-9_]{3,50}$/,
      trigger: 'blur'
    },
    // { validator: validateUsername, trigger: 'blur' }
    ]
  }, {
    fixed: true,
    label: '真实姓名',
    prop: 'realname',
    search: true,
    span: 24,
    rules: [{
      required: true,
      message: '请输入真实姓名'
    },
    {
      min: 0,
      max: 255,
      message: '长度在 0 到 255 个字符',
      trigger: 'blur'
    },
    ]
  }, {
    label: '密码',
    prop: 'password',
    type: 'password',
    hide: true,
    showColumn: false,
    editDisplay: false,
    span: 24,
    rules: [{
      required: true,
      min: 8,
      max: 20,
      message: '密码长度8-20,大写字母+小写字母+数字+特殊字符',
      trigger: 'blur',
      pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、])[a-zA-Z\d`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]{8,20}$/
    }]
  }, {
    label: '手机号',
    prop: 'phone',
    // type: 'number',
    value: '',
    span: 24,
    search: true,
    rules: [{
      required: true,
      validator: (rule, value, callback) => {
        if (value === '') {
          callback();
        } else if (!(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('手机号填写错误'))
        } else {
          callback()
        }
      },
      trigger: ['blur', "change"]
    }]
  },{
    label: '状态',
    prop: 'lockFlag',
    type: 'radio',
    slot: true,
    border: true,
    search: true,
    span: 24,
    rules: [{
      required: true,
      message: '请选择状态',
      trigger: 'blur'
    }],
    dicData: [{
      label: '有效',
      value: '0'
    }, {
      label: '锁定',
      value: '9'
    }]
  },{
    label: '平台属性',
    prop: 'type',
    span: 24,
    hide:true,
    border: true,
    rules: [{
      required: true,
      message: '请选择平台属性',
      trigger: 'blur'
    }],
    type: "radio",
    dicData: [{
      label: '平台(适用于平台用户)',
      value: 0
    },{
      label: '子平台(适用创建子平台管理员)',
      value: 1
    }],
    // cascaderItem: ["roleId"], //关联
    change: ({
      value,
      column
    }) => {
      if (value == 1) {
        tableOption.column.map(v => {
          if (v.prop == 'isAll') {
            v.dicData= [{
              label: '自定义选择(只能选择一个子平台)',
              value: 1
            }]
            v.label='子平台查看设置'
            v.disabled=true
            tableOption.column.map(v => {
              if (v.prop == 'projectIdss') {
                v.display = true
              }
            })
          }
        })
      } else {
        tableOption.column.map(v => {
          if (v.prop == 'isAll') {
            v.disabled=false
            v.dicData= [{
              label: '自定义选择',
              value: 1
            }, {
              label: '选择全部',
              value: 0
            }]
            v.label='平台查看设置'
            tableOption.column.map(v => {
              if (v.prop == 'projectIdss') {
                v.display = true
              }
            })
          }
        });
       
      }
    }
  },
  {
    label: '角色',
    prop: 'roleName',
    span: 24,
    addDisplay: false,
    editDisplay: false,
    hide: true,
    showColumn: false,
    search: true,
  },
  {
    label: '所属平台',
    prop: 'projectIds',
    type: 'select',
    multiple: true,
    showColume: true,
    overHidden: true,
    addDisplay:false,
    editDisplay:false,
    dicUrl: '/project/professional_project_management/project_list',
    props: {
      label: "projectName",
      value: 'id'
    },
    dicFormatter: (res) => {
      return res.data
    },
    span: 24,
    rules: [{
      required: true,
      message: '请选择项目',
      trigger: 'change'
    }],
  },
  {
    label: '角色',
    prop: 'roleId',
    type:'select',
    dataType:'number',
    formslot: true,
    slot: true,
    overHidden: true,
    span: 24,
    cascaderIndex: 0,
    filterable:true,
    props: {
      label: "roleName",
      value: 'roleId'
    },
    // dicUrl: `/admin/role/list?type={{key}}`,
    multiple:true,
    rules: [{
      required: true,
      message: '请选择角色',
      trigger: 'blur'
    }]
  },
  {
    label: '平台查看设置',
    prop: 'isAll',
    hide:true,
    type: 'select',
    span: 24,
    dicData: [{
      label: '自定义选择',
      value: 1
    }, {
      label: '选择全部',
      value: 0
    }],
    rules: [{
      required: true,
      message: '请选择平台查看设置',
      trigger: 'blur'
    }],
    change: ({
      value,
      column
    }) => {
      if (value == 1) {
        tableOption.column.map(v => {
          if (v.prop == 'projectIdss') {
            v.display = true
          }
        })
      } else {
        tableOption.column.map(v => {
          if (v.prop == 'projectIdss') {
            v.display = false
          }
        })
      }
    }
  },{
    label: '',
    labelWidth:100,
    prop: 'projectIdss',
    hide:true,
    slot:true,
    span:24,
    formslot:true,
    display:true,
  }, {
    label: '不可变角色',
    prop: 'fixedRole',
    formslot: true,
    slot: true,
    hide: true,
    showColumn: false,
    overHidden: true,
    editDisplay: false,
    // editDisplay: true,
    addDisplay: false,
    span: 24
  },  {
    width: 120,
    label: '创建人',
    prop: 'createName',
    editDisabled: true,
    addDisplay: false,
    span: 24
  },{
    width: 120,
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    format: 'yyyy-MM-dd',
    editDisabled: true,
    addDisplay: false,
    span: 24
  }]
}
