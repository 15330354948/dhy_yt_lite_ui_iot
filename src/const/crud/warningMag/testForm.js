export const tableOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    labelWidth: 100,
    stripe: true,
    selection:true,
    menuAlign: 'center',
    searchMenuSpan: 4,
    // editBtn: false,
    // delBtn: false,
    align: 'center',
    viewBtn:true,
    viewBtnText:'详情',
    // searchBtn:false,
    // addBtn: false,
    dialogClickModal: false,
    column: [ {
      label: '预案名称',
      prop: 'jiedao',
      search: true,
      
    }, {
      label: '适用范围',
      type: 'select',
      prop: 'shequ',
    }, {
      label: '创建人',
      prop: 'username',
      search: true,
    }, {
      label: '创建时间',
      prop: 'warnTime',
      search: true,
      type: 'datetime',
      // addDisplay: false,
      // editDisabled: true,
      // hide: true,
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    },]
  }
  