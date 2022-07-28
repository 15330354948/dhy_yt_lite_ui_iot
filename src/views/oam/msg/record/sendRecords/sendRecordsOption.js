export const sendOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  reserveSelection: true,
  selectClearBtn: true,
  selection: true,
  searchBtn: true,
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  align: 'center',
  menu: false,
  searchMenuSpan: 6,
  column: [
    {
      label: '姓名',
      prop: 'name',
      search: true,
      hide:true
    },{
      label: '姓名',
      prop: 'personName',
      // search: true,
      // hide:true
    },{
      label:'子项目名称',
      prop:'subprojectName',
      overHidden:true,
      hide:true
      // width:350,
  },
    {
      label: '手机号码',
      prop: 'telephone',
      search: true,
      rules: [{
        required: true,
        message: '请输入正确的手机号码',
        trigger: 'blur',
        pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
      }],
      // hide:true
    },{
      label: '短信内容',
      prop: 'msgContent',
      with:300,
      overHidden:true,
    },
    {
      label: '发送时间',
      prop: 'createTime',
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      type:"datetime",
      rangeSeparator:"-",
      startPlaceholder:"开始日期",
      endPlaceholder:"结束日期",
      search: true,
      searchRange: true,
      searchMenuSpan: 10,
      // hide:true,
    },
    
    // {
    //   label:'短信接收人',
    //   prop:'personNamePhone',
    //   overHidden:true,
    // }
  ]
}
