import {hasSpace,isNum,isInteger,validatePhoneNum} from '@/util/validate'
export const tableOption = {
  border: true,
  stripe: true,
  index: true,
  selection: true,
  indexLabel: '序号',
  menuAlign: 'center',
  searchSpan: 6,
  searchMenuSpan: 4,
  delBtn: false,
  align: 'center',
  delBtn: true,
  delBtnText: '删除',
  // excelBtn: true,
  addBtn: false,

  addDisabled: true,
  dialogClickModal: false,
  column: [{
      label: '姓名',
      prop: 'name',
      search: true,
      maxlength: 30,
      rules: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        },
        {
          validator:hasSpace,
          trigger: "blur"
        }
      ]
    }, {
      label: '手机号码',
      prop: 'phone',
      search: true,
      maxlength: 30,
      rules: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        },
        {
          validator:validatePhoneNum,
          trigger: "blur"
        }
      ]
    }, {
      label: '职位/职称',
      // type: 'select',
      prop: 'position',
      search: true,
      rules: [{
          required: true,
          message: '请输入职务',
          trigger: 'change'
        },
        {
          validator:hasSpace,
          trigger: "blur"
        }
      ],
      maxlength: 30
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
        message: '请输入',
        trigger: 'blur'
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
        message: '请输入',
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
        },

      ]
      },
      {
        label: '手机号',
        prop: 'phone',
        span: 24,
        maxlength: 20,
        rules: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
      },
      {
        validator:validatePhoneNum,
        trigger: "blur"
      }, ]
    }
  ]
}
