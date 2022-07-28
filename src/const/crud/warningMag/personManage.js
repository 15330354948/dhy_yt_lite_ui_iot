
export const searchOption = {
  align: 'center',
  menuAlign: 'center',
  labelWidth: 120,
  span: 6,
  submitText: '搜索',
  menuSpan: 4,
  enter: true,
  column: [{
    label: '姓名',
    prop: 'name',
  }, {
    label: '手机号',
    prop: 'phone',
  }]
}

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  searchMenuSpan: 6,
  labelWidth: 130,
  column: [
    {
      label: '所属项目',
      prop: 'projectId',
      type: 'select',
      hide: false,
      showColume: true,
      // editDetail:true,
      // addDetail: true,
      // editDisplay: false,
      // editDisabled: true,
      // addDisabled: true,
      // addDisplay: false,
      overHidden: true,
      dicUrl: '/project/professional_project_management/project_list',
      props: {
        label: "projectName",
        value: 'id'
      },
      dicFormatter: res => {
        return res.data
      },
      rules: [{
        required: true,
        message: '请选择项目',
        trigger: 'change'
      }]
    },
    {
    label: '姓名',
    prop: 'name',
    rules: [{
      required: true,
      message: '请输入姓名',
      trigger: 'blur'
    }]
  }, {
    label: '手机号',
    prop: 'phone',
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
      message: '请输入手机号',
      trigger: ['blur','change']
    }]
  }, {
    label: '综合人员类型',
    type: 'select',
    prop: 'type',
    props: {
      label: "label",
      value: "dictValue",
    },
    dicUrl: '/admin/dict/types?types=warn_person_type',
    dicFormatter: res => {
      return res.data.warn_person_type
    },
    rules: [{
      required: true,
      message: '请输入综合人员类型',
      trigger: 'blur'
    }]
  }, {
    label: '职务',
    prop: 'jobTitle',
    rules: [{
      required: true,
      message: '请输入职务',
      trigger: 'blur'
    }]
  },{
    type: "input",
    label: "省名称",
    prop: "provinceName",
    overHidden: true,
    hide: true,
    display: false,
    addDisabled: true,
    editDisabled: true,
    sortable: true,
  },
    {
      type: "input",
      label: "市名称",
      prop: "cityName",
      overHidden: true,
      hide: true,
      display: false,
      addDisabled: true,
      editDisabled: true,
      sortable: true,
    },
    {
      type: "input",
      label: "县名称",
      prop: "countryName",
      overHidden: true,
      hide: true,
      display: false,
      addDisabled: true,
      editDisabled: true,
      sortable: true,
    },
    {
      type: "input",
      label: "乡镇名称",
      prop: "townName",
      overHidden: true,
      hide: true,
      addDisabled: true,
      editDisabled: true,
      display: false,
      sortable: true,
    },
    {
    type: "select",
    label: "省",
    prop: "province",
    hide: true,
    props: {
      label: 'name',
      value: 'code'
    },
    cascaderItem: ['city', 'county', 'town'],
    dicUrl: '/area/level/1',
  },
    {
      type: "select",
      label: "市",
      prop: "city",
      hide: true,
      props: {
        label: 'name',
        value: 'code'
      },
      dicUrl: '/area/parentId/{{key}}',
    },
    {
      type: "select",
      label: "县",
      prop: "county",
      hide: true,
      props: {
        label: 'name',
        value: 'code'
      },
      dicUrl: '/area/parentId/{{key}}',
    },
    {
      type: "select",
      label: "乡镇",
      prop: "town",
      hide: true,
      props: {
        label: 'name',
        value: 'code'
      },
      dicUrl: '/area/parentId/{{key}}',
    }, {
    label: '创建时间',
    type: 'datetime',
    prop: 'createTime',
    editDetail:true,
    addDisabled:true,
    addDisplay:false,
    editDisplay:false
  },{
    label: 'id',
    prop: 'id',
    editDetail:true,
    addDisabled:true,
    addDisplay:false,
    editDisplay:false,
    hide: true,
    showColume: false
  }
  ]
}
