function validatePhoneNum(rule,value,callback){
  const reg = /^1[0-9]{10}$/;
  if(!reg.test(value)){
    callback(new Error('请输入正确手机号！'))
  }else{
    callback();
  }
}

export const tableOption = {

  reserveSelection:true,
  selectClearBtn: true, // 清除选中按钮
  selection: true,
  searchBtn: true,
  viewBtn:false,
  // viewBtnText:'查看',
  editBtn: false,

  border: true,
  index: true,
  indexLabel: '序号',
  labelWidth: 120,
  searchLabelWidth: 120,
  stripe: true,
  showHeader: true,
  menuAlign: 'center',
  searchMenuSpan: 6,
  
  delBtn: false,
  align: 'center',
  addBtn: false,
  dialogClickModal: false,
  column: [{
    prop: 'no',
    label: '监测点编号',
    search: true,
    span: 12,
    // hide:true,//表单显隐
    rules: [{
      required: true,
      message: '请填写编号',
    }]
  }, {
    label: '监测点名称',
    prop: 'name',
    search: true,
    span: 12,
    rules: [{
      required: true,
      message: '请填写监测点名称',
    }]
  }, {
    label: '地理位置',
    prop: 'location',
    search: true,
    span: 12,
    rules: [{
      required: true,
      message: '请填写地理位置',
    }]
  },
  {
    label: '备注',
    prop: 'updateType',
    span: 12,
    // display:false,
    type:'select',
    // slot:true,
    props:{
      value:'value',
      label:'label'
    },
    dicData:[
      {
        value:1,
        label:'手动新增'
      },
      {
        value:2,
        label:'自动关联'
      }
    ]
  }
  ,{
    label: '灾害特性',
    prop: 'characteristic',
    span: 24,
    hide:true
  },{
    label: '专业监测内容',
    prop: 'content',
    span: 24,
    hide:true
  },{
    label: '群测群防建设时间',
    prop: 'qcqfCreateTime',
    span: 12,
    type:'datetime',
    hide:true,
    valueFormat:"yyyy-MM-dd hh:mm:ss"//绑定时间值格式
  },{
    label: '专业监测建设时间',
    prop: 'zyjcCreateTime',
    span: 12,
    hide:true,
    type:'datetime',
    valueFormat:"yyyy-MM-dd hh:mm:ss"

  },{
    label: '联系单位',
    prop: 'company',
    span: 12,
    hide:true
  }, {
    label: '联系人',
    prop: 'contacts',
    span: 12,
    hide:true
  },{
    label: '联系电话',
    prop: 'phone',
    span: 12,
    hide:true,
    rules: [{
      validator:validatePhoneNum,trigger:'blur'
    }]
  },{
    label: '运行状态',
    prop: 'runningStatus',
    span: 12,
    hide:true,
    formslot:true
  },{
    label: '终止时间',
    prop: 'finishTime',
    span: 12,
    hide:true,
    type:'datetime',
    valueFormat:"yyyy-MM-dd hh:mm:ss"
  },{
    label: '终止原因',
    prop: 'finishReason',
    span: 12,
    hide:true
  },{
    label: '监测点说明',
    prop: 'remark',
    span: 24,
    hide:true
  },{
    label: '警示牌',
    prop: 'warningPic',
    span: 24,
    hide:true,
    formslot:true,
    slot:true
  },
  {
    label: '界桩',
    prop: 'boundaryPic',
    span: 24,
    hide:true,
    formslot:true,
  },
  
]
}

