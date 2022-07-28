export const tableOption = {
  border: true,
  stripe: true,
  index: true,
  indexLabel: "序号",
  selection: true,
  menuAlign: "center",
  labelWidth: 120,
  searchLabelWidth: 120,
  searchMenuSpan: 6,
  editBtn: false,
  delBtn: false,
  align: "center",
  viewBtn: false,
  // viewBtnIcon: false,
  // viewBtnText: "详情",
  // searchBtn:false,
  // addBtn: false,
  dialogClickModal: false,
  column: [
    {
      label: '监测点编号',
      maxlength: 30,
      // disabled: true,
      addDisplay: false,
      editDisabled: false,
      prop: 'disasterCode',
    },
    {
      label: '监测点编号',
      search: false,
      prop: 'disasterId',
      hide: true,
      //   maxlength: 16,
      viewDisplay: false,
      formslot: true,
      type: "select",
      dicUrl: '/device/viewfactory/page?size=-1',
      props: {
        label: "pikk",
        value: 'pikk'
      },
      dicFormatter: res => {
        return res.data.records
      },
        rules: [{
          // required: true,
          message: "请选监测点编号",
          trigger: "blur",
        }]
    }, {
      label: '监测点名称',
      search: false,
      maxlength: 30,
      // disabled: true,
      prop: 'disasterName',
      formslot: true,
      
    }, 
    {
      label: "任务名称",
      prop: "name",
      search: true,
      maxlength: 30,
      span: 12,
      rules: [
        {
          required: true,
          message: "请输入",
          trigger: "blur"
        }
      ]
    },
    {
      label: "任务描述",
      prop: "remark",
      maxlength: 60,
      span: 12,
      rules: [
        {
          required: true,
          message: "请输入",
          trigger: "blur"
        }
      ],
      hide: true
    },
    {
      label: "任务地点",
      prop: "location",
      search: true,
      maxlength: 30,
      span: 12,
      rules: [
        {
          required: true,
          message: "请输入",
          trigger: "blur"
        }
      ],
      hide: true,
    },
    {
      label: "任务接收人",
      // search: true,
      prop: "recipient",
      // type:'select',
      dicUrl:'/mpadp/qcqfperson/page',
      slot:"true",
      rules: [
        {
          // required: true,
          message: "请选择",
          trigger: "change"
        }
      ],
      props: {
        label: "name",
        value: 'id'
      },
      dicFormatter: res => {
        return res.data.data.records
      },
      maxlength: 30,
      formslot: true,
      viewDisplay:false,
      hide:true
    },
    {
      prop:"recipientName",
      label: "任务接收人",
      editDisplay: false,
      addDisplay: false,
      
    },
    {
      label: "巡检情况",
      prop: "situation",
      span: 12,
      rules: [
        {
          required: true,
          message: "请选择",
          trigger: "blur"
        }
      ],
      addDisplay: false,
      editDisplay: false,
      hide: true,
      maxlength: 30
    },
    {
      label: "现场照片",
      prop: "siteImage",
      span: 24,
      type: "upload",
      search: false,
      listType: "picture-img",
      addDisplay: false,
      editDisplay: false,
      hide: true,
      maxlength: 30
    },
    {
      label: "负责人",
      prop: "createUserId",
      span: 12,
      maxlength: 30,
      addDisplay: false,
      hide: true,
      rules: [
        {
          required: true,
          message: "请输入",
          trigger: "blur"
        }
      ]
    },
    // {
    //   label: "接收时间",
    //   prop: "completeTime",
    //   maxlength: 30,
    //   span: 12,
    //   type: "datetime",
    //   addDisplay: false,
    //   // editDisabled: true,
    //   hide: true,
    //   format: "yyyy-MM-dd HH:mm",
    //   valueFormat: "yyyy-MM-dd HH:mm:ss"
    // },
    {
      label: "创建时间",
      prop: "createTime",
      maxlength: 30,
      span: 12,
      type: "datetime",
      addDisplay: false,
      search: true,
      format: "yyyy-MM-dd HH:mm",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    },
    {
      type: "select",
      label: "任务状态",
      prop: "state",
      required: true,
      search: true,
      addDisplay: false,
      editDisplay: false,
      labelWidth: 120,
      rules: [
        {
          required: true,
          message: "请选择",
          trigger: "change"
        }
      ],
      span: 11,
      dataType: "number",
      dicUrl: "/admin/dict/types?types=EmergencyTask_status",
      dicFormatter: res => {
        console.log(res);
        
        return res.data.EmergencyTask_status;
      }
    },
    
    {
      label: "创建人",
      prop: "userName",
      search: true,
      span: 12,
      maxlength: 30,
      addDisplay: false,
      viewDisplay: false,
      rules: [
        {
          required: true,
          message: "请输入",
          trigger: "blur"
        }
      ]
    },
    
    {
      label: "完成时间",
      prop: "completeTime",
      maxlength: 30,
      span: 12,
      type: "datetime",
      addDisplay: false,
      // editDisabled: true,
      hide: true,
      format: "yyyy-MM-dd HH:mm",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  ]
};
