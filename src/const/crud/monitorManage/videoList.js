const DIC = {
    vaild: [{
        label: '否',
        value: 'false'
    }, {
        label: '是',
        value: 'true'
    }],
    status: [{
        label: '离线',
        value: 'false'
    }, {
        label: '在线',
        value: 'true'
    }]
}
export const tableOption = {
    align: 'center',
    searchLabelWidth: 100,
    searchSpan: 6,
    labelWidth: 100,
    selection: true,
    tip: false,
    viewBtn:true,
    excelBtn: true,
    border: true,
    column: [{
        label: '设备编号',
        search: true,
        prop: 'deviceNo',
        rules: [{
            required: true,
            message: "请输入设备编号",
            trigger: "blur"
        }]
    },{
        label: '设备名称',
        search: true,
        prop: 'deviceName',
        rules: [{
            required: true,
            message: "请输入设备名称",
            trigger: "blur"
        }]
    }, {
        label: '是否绑点',
        prop: 'point',
        type: 'select',
        dicData: DIC.vaild,
        search: true,
        addDisplay: false,
        editDisplay: false,
        mock: {
            type: 'dic',
        },
    }, {
        label: '监测点编号',
        search: true,
        prop: 'hiddenNo',
        type: 'select',
    }, {
        label: '监测点名称',
        search: true,
        prop: 'hiddenName'
    }, {
        label: '厂商名称',
        prop: 'name',
        type: 'select',
        dicUrl: '/admin/dict/type/log_type',
        search: true,
    }, {
        label: '经度',
        search: false,
        prop: 'longitude',
        hide: true
    }, {
        label: '纬度',
        search: false,
        prop: 'latitude',
        hide: true
    }, {
        label: '安装时间',
        search: false,
        prop: 'times',
        hide: true,
        type: "datetime",
        format: "yyyy-MM-dd hh:mm:ss",
        valueFormat: "timestamp",
    }, {
        label: '安装位置',
        search: true,
        prop: 'installation'
    }, {
        label: '通道',
        search: false,
        prop: 'passageway',
        hide: true,
        rules: [{
            required: true,
            message: "请输入通道",
            trigger: "blur"
        }]
    }, {
        label: 'IP',
        search: false,
        prop: 'ip',
        hide: true,
        rules: [{
            required: true,
            message: "请输入IP",
            trigger: "blur"
        }]
    }, {
        label: '端口号',
        search: false,
        prop: 'port',
        hide: true
    }, {
        label: '账号',
        search: false,
        prop: 'username',
        hide: true,
        rules: [{
            required: true,
            message: "请输入账号",
            trigger: "blur"
        }]
    }, {
        label: '密码',
        search: false,
        prop: 'password',
        hide: true,
        rules: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
        }]
    }, {
        label: '在线状态',
        type: 'select',
        prop: 'state',
        dicData: DIC.status,
        search: true,
        addDisplay: false,
        editDisplay: false,
        mock: {
            type: 'dic',
        },
    }, {
        label: '备注',
        prop: 'remark',
        search: false,
        addDisplay: false,
        editDisplay: false,
        mock: {
            type: 'dic',
        },
    }, 
    // {
    //     label: '设备二维码',
    //     type: 'upload',
    //     prop: 'imgUrl',
    //     search: false,
    //     hide: true,
    //     propsHttp: {
    //         res: 'data'
    //     },
    //     listType: 'picture-img',
    //     action: '/imgupload',
    //     tip: '只能上传jpg/png文件，且不超过500kb',
    //     action: '/imgupload',
    //     span: 24
    // }
]
}