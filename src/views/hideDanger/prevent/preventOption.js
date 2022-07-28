
export const preventOption = {
    reserveSelection:true,
    selectClearBtn: true, // 清除选中按钮
    selection: true,
    searchBtn: true,
    viewBtn:false,
    // viewBtnText:'查看',
    editBtn: false,
    submitBtn:false,
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
    disabled:true,
    column:[
      
      {
          prop:'monitorUser',
          label:'监测负责人',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }],
      },
      {
          prop:'monitorPhone',
          label:'监测联系电话',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'monitorObject',
          label:'监测主要迹象',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'monitorMethod',
          label:'监测手段及方法',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'criterion',
          label:'临灾预报判据',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'avoidDisasterPlace',
          label:'预定避灾地点',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'evacuationRoute',
          label:'预定疏散路线',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'predeterminedAlarm',
          label:'预定报警信号',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'commandReleaseUser',
          label:'疏散命令发布人',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'commandUserPhone',
          label:'发布人电话',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'arrangingWires',
          label:'抢、排险单位、负责人',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'arrangingWiresPhone',
          label:'抢、排险电话',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      }
      ,{
          prop:'publicSecurity',
          label:'治安保卫单位、负责人',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'publicSecurityPhone',
          label:'保卫电话',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'medicalAid',
          label:'医疗救护单位、负责人',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'medicalAidPhone',
          label:'救助电话',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'companyName',
          label:'发放单位',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'companyPhone',
          label:'发放单位电话',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'releaseDate',
          label:'发卡日期',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }],
          type:'datetime',
          valueFormat:'yyyy-MM-dd hh:mm:ss'
      },
      {
          prop:'companyStamp',
          label:'发放单位盖章',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      {
          prop:'referencesOrUser',
          label:'持卡单位或个人',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }]
      },
      // {
      //     prop:'',
      //     label:'值班电话',
      //     span:12,
      //     rules:[{
      //         required:true,
      //         message:'请填写'
      //     }]
      // },
      {
          prop:'cardholderDate',
          label:'持卡日期',
          span:12,
          // rules:[{
          //     required:true,
          //     message:'请填写'
          // }],
          type:'datetime',
          valueFormat:'yyyy-MM-dd hh:mm:ss'
      },
    ]
  }