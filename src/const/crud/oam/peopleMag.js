export const tableOption = {
  align: 'center',
  menuAlign: 'center',
  menuWidth: 200,
  selection: true,
  searchSize: 'mini',
  reserveSelection: true,
  border: true,
  editBtn: false,
  addBtn: false,
  // viewBtn:true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 8,
  searchSpan: 8,
  labelWidth: 130,
  // searchLabelWidth: 100,
  column: [{
      label: '姓名',
      prop: 'name',
      rules: [{
        required: true,
        message: "请输入姓名",
        trigger: "blur"
      }],
      search: true,
    },
    {
      label: '性别',
      prop: 'sex',
      search: true,
      type: 'select',
      dicData: [{
        label: '男',
        value: 1
      }, {
        label: '女',
        value: 2
      }],
      rules: [{
        required: true,
        message: "请选择性别",
        trigger: "change"
      }],
      // addDisplay: false,
      // editDisplay: false,
    }, {
      label: '联系电话',
      prop: 'telephone',
      rules: [{
        required: true,
        validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入手机号'));
          } else if (!(/^1[3456789]\d{9}$/.test(value))) {
            callback(new Error('手机号填写错误'))
          } else {
            callback()
          }
        },
        trigger: ['blur', "change"]
      }],
      search: true,
    }, {
      label: '岗位',
      prop: 'position',
      search: true,
      rules: [{
        required: true,
        message: "请输入岗位",
        trigger: "blur"
      }],
    }, {
      label: '部门',
      prop: 'deptId',
      slot: true,
      hide: true,
      rules: [{
        required: true,
        message: "请输入部门",
        trigger: "blur"
      }],
      viewDisplay: false
    }, {
      label: '部门',
      prop: 'deptName',
      addDisplay: false,
      editDisplay: false,

    }, {
      label: '账号',
      prop: 'userId',
      type: 'select',
      slot: true,
      hide: true,
      viewDisplay: false
    },
    {
      label: '账号',
      prop: 'username',
      addDisplay: false,
      editDisplay: false,
    },
  ]
}
