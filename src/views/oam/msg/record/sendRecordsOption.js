export const sendOption = {
    addBtn:false,
    editBtn:false,
    delBtn:false,
    reserveSelection:true,
    // selectClearBtn:true,
    // selection:true,
    searchBtn:true,
    border:true,
    index:true,
    indexLabel:'序号',
    stripe:true,
    align:'center',
    menu:false,
    searchMenuSpan:6,
    // searchLabelWidth:160,
    columnBtn:false,
    column:[{
        label: '姓名',
        prop: 'name',
        search: true,
        hide:true
      },
        {
            label:'姓名',
            prop:'personName',
            // hide:true,
            diaplay:false,
            // search: true,
            // searchRules: [{ required: false }]
        },
        {
            label:'子项目名称',
            prop:'subprojectName',
            overHidden:true,
            hide:true
            // width:350,
        },{
            label:'手机号码',
            prop:'telephone',
            // hide:true,
            diaplay:false,
            maxlength:11,
            search: true,
            searchRules: [{ required: false }]
       
        },
        {
            label:'短信内容',
            prop:'msgContent',
            overHidden:true,
            with:300
        },
        {
            label:'发送时间',
            prop:'createTime',
            format: 'yyyy-MM-dd HH:mm:ss',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            type:"datetime",
            // type:"datetimerange",
            rangeSeparator:"-",
            startPlaceholder:"开始日期",
            endPlaceholder:"结束日期",
            search: true,
            searchRange: true,
            searchRules: [{ required: false }],
            pickerOptions: {
                //时间范围限制
                disabledDate(time) {
                  var times = Date.now() - 24 * 60 * 60 * 1000;
                  return time.getTime() > times;
                },
              },
              width:220,
        },{
            label:'短信类型',
            prop:'type',
            dicData:[{
              label:'警告短信',value:0
            },{
              label:'设备异常短信',value:1
            },{
              label:'运维短信 ',value:2
            },{
                label:'自定义短信 ',value:3
            }]
          }
    ]
}