export const readOnlyOption = {
    reserveSelection:true,
    selectClearBtn: false, // 清除选中按钮
    
    clearable:false,
    // selection: true,
    // searchBtn: true,
    viewBtn:false,
    // viewBtnText:'查看',
    
    menuBtn:false,
    editBtn: false,
    submitBtn:false,
    clearBtn:false,
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
            label: "全市统一编号",
            prop: "pikk",
            span: 12,
          },
       
        {
          prop:'countyName',//county
          label:'区',
          span:12,
          placeholder:'不可编辑',
          // formslot:true,
      },
      {
          prop:'streetName',//streetCode
          label:'街道',
          span:12,
          placeholder:'不可编辑',
      },
      {
          prop:'communityName',//communityCode
          label:'社区',
          placeholder:'不可编辑',
          span:12,
      },
      {
          prop:'location',
          label:'灾害位置',
          placeholder:'不可编辑',
          span:12,
      },
  
    ]
}