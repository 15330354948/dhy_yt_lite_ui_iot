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
    // height: 300,
    viewBtn: true,
    labelWidth: 120,
    column: [{
        label: '推送类型',
        prop: 'pushType',
        search: true,
        type: 'select',
        props: {
            label: 'label',
            value: 'value'
        },
        dataType:'number',
        dicUrl: '/admin/dict/type/project_data_transfer_config_push_type',
        rules: [{
            required: true,
            message: "请选择推送类型",
            trigger: "change"
          }]
    },{
        label: '交换机名',
        prop: 'mqExchange',
        search: true,
        maxlength: 255,
        overHidden:true,
        sortable: true,
        rules: [{
            required: true,
            message: "请输入交换机名",
            trigger: "blur"
          }],
          editDisplay: false,
        addDisplay: false,
        viewDisplay: false,
    },  {
        label: 'mq地址',
        prop: 'mqHost',
        search: true,
        maxlength:50,
        overHidden:true,
        sortable: true,
        editDisplay: false,
        addDisplay: false,
        viewDisplay: false,
        rules: [{
            required: true,
            message: "请输入mq地址",
            trigger: "blur"
          }]
    },{
        label: 'mq端口',
        prop: 'mqPort',
        minlength:4,
        maxlength:10,
        editDisplay: false,
        addDisplay: false,
        viewDisplay: false,
        sortable: true,
        rules: [{
            validator: (rule, value, callback) => {
                let reg =/^[1-9]\d*$/
                if (reg.test(value)) {
                    callback();
                }else if(!value){
                    callback(new Error("请输入mq端口"));
                } else {
                    callback(new Error("格式：正整数，长度4-10位"));
                }
            },
            required: true,
         }]
    }, {
        label: 'mq队列名称',
        prop: 'mqQueue',
        maxlength: 255,
        overHidden:true,
        editDisplay: false,
        addDisplay: false,
        viewDisplay: false,
        rules: [{
            required: true,
            message: "请输入mq队列名称",
            trigger: "blur"
          }]
    },{
        label: 'mq虚拟空间',
        prop: 'mqVirtualHost',
        maxlength: 255,
        overHidden:true,
        editDisplay: false,
        addDisplay: false,
        viewDisplay: false,
        rules: [{
            required: true,
            message: "请输入mq虚拟空间",
            trigger: "blur"
          }]
    }, {
        label: 'mq用户名',
        prop: 'mqUsername',
        search: true,
        maxlength:50,
        overHidden:true,
        sortable: true,
        editDisplay: false,
        addDisplay: false,
        viewDisplay: false,
        rules: [{
            required: true,
            message: "请输入mq用户名",
            trigger: "blur"
          }]
    },  {
        label: 'mq密码',
        prop: 'mqPassword',
        type: 'password',
        hide: true,
        maxlength:50,
        editDisplay: false,
        addDisplay: false,
        viewDisplay: false,
        rules: [{
            required: true,
            message: "请输入mq密码",
            trigger: "blur"
          }]
    },  {
        label: 'http推送地址',
        prop: 'httpUrl',
        maxlength: 255,
        overHidden:true,
        editDisplay: false,
        addDisplay: false,
        viewDisplay: false,
        rules: [{
            required: true,
            message: "请输入http推送地址",
            trigger: "blur"
          }]
    }, {
        label: '启用状态',
        prop: 'enableStatus',
        type: 'switch',
        dataType:'number',
        props: {
            label: 'label',
            value: 'value'
        },
       
        clearable:false,
        activeColor:"red",
        inactiveColor:"#409EFF",
        dicUrl: '/admin/dict/type/project_data_transfer_config_enable_status',
        rules: [{
            required: true,
            message: "请选择启用状态",
            trigger: "change"
          }]
    }, {
        label: '创建时间',
        prop: 'createTime',
        type: 'datetime',
        sortable: true,
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        editDisplay: false,
        addDisplay: false,
        viewDisplay: true,
        width:180,
    }, {
        label: '更新时间',
        prop: 'updateTime',
        type: 'datetime',
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        editDisplay: false,
        addDisplay: false,
        viewDisplay: true,
        width:180,
        hide: true,
    }]
}


