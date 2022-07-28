export const tableOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    refreshBtn: true,
    columnBtn: false,
    dialogClickModal: false,
    menuWidth: 200,
    searchSize: 'mini',
    // addBtn: false,
    // editBtn: false,
    // viewBtn: true,
    labelWidth: 140,
    searchMenuSpan: 6,
    // refreshBtn:false,
    selection: true,
    column: [{
        label: '模型名称',
        prop: 'name',
        search: true,
        searchRules: [{ required: false }],
        rules: [{
            required: true,
            message: "请输入模型名称",
            trigger: "blur"
        }],
    },{
        label: '所属项目',
        prop: 'projectId',
        display:false,
        hide:true,
        searchslot:true,
        search: true,
        searchRules: [{ required: false }],
    }, {
        label: '传感器类型',
        prop: 'sensorType',
        type: 'select',
        dicUrl: "/warn/open_warn_script_info/type/sensor_type",
        // dicUrl: "/admin/dict/type/sensor_type",
        rules: [{
            required: true,
            message: "请选择",
            trigger: "change"
        }],
    },{
        label:'告警消息模板',
        prop:'warnMsgTemplate',
        span:12,
        hide:true,
        type: 'textarea',
        maxlength: 300,
        showWordLimit: true,
        overHidden: true,
        rules: [{
            required: true,
            message: "告警消息模板",
            trigger: "blur"
        }],
    }, {
        label: '描述',
        prop: 'description',
        type: 'textarea',
        maxlength: 200,
        showWordLimit: true,
        overHidden: true,
        span:12,
    }, 
    {
        label:'',
        prop:'titletag',
        hide:true,
        formslot:true,
        span:24,
    },{
        label: '脚本所需参数结构',
        prop: 'parameterStruct',
        span:24,
        hide:true,
        type: 'dynamic',
        children: {
            align: 'center',
            headerAlign: 'center',
            rowAdd:(done)=>{
                done();
            },
            rowDel:(row,done)=>{
              done();
            },
            column:[{
                label: '关键字',
                prop: "key",
                rules: [{
                    required: true,
                    message: "请输入",
                    trigger: "blur"
                }],
            },{
                label: '模型数据类型',
                prop: 'dataType',
                type: 'select',
                // dicUrl: "/admin/dict/type/warn_model_param_data_type",
                dicUrl: "/warn/open_warn_script_info/type/warn_model_param_data_type",
                rules: [{
                    required: true,
                    message: "请选择",
                    trigger: "change"
                }],
            },{
                label: '模型描述',
                prop: "description",
                rules: [{
                    required: true,
                    message: "请输入",
                    trigger: "blur"
                }],
            }]
        },
        rules: [{
            required: true,
            message: "脚本所需参数结构",
            trigger: "change"
        }],
    },{
        label:'脚本内容',
        prop:'script',
        span:24,
        hide:true,
        formslot:true,
        // rules: [{
        //     required: true,
        //     message: "脚本内容",
        //     trigger: "change"
        // }],
    }, {
        label: '创建时间',
        prop: 'createTime',
        type: 'datetime',
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        width: 180,
        addDisplay: false,
        editDisplay: false,
        sortable: true,
        // searchRange: true,
        // search: true,
        // searchRules: [{ required: false }],
        // searchSpan: 8,
    }]
}