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
    menuWidth: 280,
    labelWidth: 100,
    searchSize: 'mini',
    // height: 500,
    viewBtn: true,
    column: [{
        label: '项目名称',
        prop: 'projectName',
        search: true,
        maxlength: 50,
        width:300,
        overHidden:true,
        sortable: true,
        rules: [{
            required: true,
            message: "请输入项目名称",
            trigger: "blur"
        }],
        slot:true,
    },
    {
        label: '项目编号',
        prop: 'projectNo',
        search: true,
        overHidden:true,
        sortable: true,
        maxlength: 50,
        rules: [{
            required: true,
            message: "请输入项目编号",
            trigger: "blur"
        }]
    },
    {
        label: '应用id',
        prop: 'appId',
        search: true,
        maxlength: 64,
        sortable: true,
        rules: [{
            required: true,
            message: "请输入项目应用id",
            trigger: "blur"
        }]
    },
    {
        type: "password",
        label: '密钥',
        prop: 'appSecret',
        search: true,
        maxlength: 128,
        rules: [{
            required: true,
            message: "请输入密钥",
            trigger: "blur"
        }]
    },
    {
        label: '创建时间',
        prop: 'createTime',
        type: 'datetime',
        sortable: true,
        format: 'yyyy-MM-dd HH:mm:ss',
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        editDisplay: false,
        addDisplay: false,
        viewDisplay: true,
        width:150,
    },
    {
        label: '更新时间',
        prop: 'updateTime',
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm:ss',
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        editDisplay: false,
        addDisplay: false,
        viewDisplay: true,
        hide: true,
    }, {
        label: '项目描述',
        type: 'textarea',
        prop: 'projectDesc',
        hide: true,
        editDisplay: true,
        addDisplay: true,
        span: 24,
        maxlength: 255,
    }]
}


