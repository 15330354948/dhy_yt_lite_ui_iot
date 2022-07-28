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
    column:[
        {
            label:'姓名',
            prop:'nameParam',
            hide:true,
            diaplay:false,
            search: true,
            searchRules: [{ required: false }]
        },
        {
            label:'项目名称',
            prop:'projectName',
            overHidden:true,
            width:350,
        },
        {
            label:'用户名和电话号码',
            prop:'personNamePhone',
            overHidden:true,
        },
        {
            label:'手机号码',
            prop:'phoneParam',
            hide:true,
            diaplay:false,
            maxlength:11,
            search: true,
            searchRules: [{ required: false }]
       
        },
        {
            label:'短信内容',
            prop:'content',
            overHidden:true,
        },
        {
            label:'时间',
            prop:'sendTime',
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
        }
    ]
}