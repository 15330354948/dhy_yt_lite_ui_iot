export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  editBtn: false,
  delBtn: false,
  searchMenuSpan: 6,
  align: 'center',
  addBtn: false,
  viewBtn: false,
  // viewBtn: true,
  dialogClickModal: false,
  column: [
    {
      label: '角色名称',
      prop: 'roleName',
      span: 24,
      search: true,
      rules: [{
        required: true,
        message: '角色名称不能为空',
        trigger: 'blur'
      },
        {
          min: 3,
          max: 64,
          message: '长度在 3 到 64 个字符',
          trigger: 'blur'
        }]
    },
    {
      width: 300,
      label: '角色标识',
      prop: 'roleCode',
      span: 24,
      editDisabled: true,
      search: true,
      rules: [{
        required: true,
        message: '角色标识不能为空',
        trigger: 'blur'
      },
        {
          min: 3,
          max: 64,
          message: '长度在 3 到 64 个字符',
          trigger: 'blur'
        }
      ]
    },
    // {
    //     label: '所属项目',
    //     prop: 'projectName',
    //     editDisplay: false,
    //     addDisplay: false,
    //     viewDisplay:false,
    // },{
    //   label: '所属项目',
    //   prop: 'projectId',
    //   type: 'select',
    //   hide: true,
    //   showColume: false,
    //   // editDetail:true,
    //   editDisplay: false,
    //   addDisplay: false,
    //   viewDisplay:false,
    //   overHidden: true,
    //   dicUrl: '/project/professional_project_management/project_list',
    //   props: {
    //     label: "projectName",
    //     value: 'id'
    //   },
    //   dicFormatter: res => {
    //     return res.data
    //   },
    //   span: 24,
    //   rules: [{
    //     required: true,
    //     message: '请选择项目',
    //     trigger: 'change'
    //   }]
    // },
    {
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      // format: 'yyyy-MM-dd HH:mm',
      // valueFormat: 'yyyy-MM-dd HH:mm:ss',
      format: 'yyyy-MM-dd',
      editDisplay: false,
      addDisplay: false,
      span: 24
    }, {
      label: '修改时间',
      prop: 'updateTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      hide: true,
      editDisplay: false,
      addDisplay: false,
      span: 24
    }, {
      type: 'textarea',
      width: 300,
      label: '角色描述',
      prop: 'roleDesc',
      overHidden: true,
      hide: true,
      span: 24,
      rules: [{
        required: true,
        message: '角色描述不能为空',
        trigger: 'blur'
      }, {
        min: 3,
        max: 255,
        message: '长度在 3 到 255 个字符',
        trigger: 'blur'
      }]
    }]
}
