const DIC = {
    status: [{
        label: '离线',
        value: 1
    }, {
        label: '在线',
        value: 0
    }],
}
export const tableOption = {
    align: 'center',
    searchLabelWidth: 120,
    menuWidth: 180,
    searchSpan: 6,
    labelWidth: 120,
    searchMenuSpan: 4,
    selection: true,
    tip:false,
    menu:true,
    addBtn:true,
    editBtn:false,
    delBtn:false,
    header:false,
    border: true,
    column: [{
        label: '设备编号',
        search: true,
        prop: 'code',
        // maxlength:16,
        overHidden: true,
        rules: [{
            required: true,
            message: "请输入设备编号",
            trigger: "blur"
        },]
    }, {
        label: '设备名称',
        search: true,
        prop: 'name',
        overHidden: true,
        rules: [{
            required: true,
            message: "请输入设备名称",
            trigger: "blur"
        }]
    }, {
        label: '设备类型',
        prop: 'type',
        type: 'select',
        dicUrl: './admin/dict/type/device_type',
        search: true,
        rules: [{
            required: true,
            message: "请选择设备类型",
            trigger: "change"
        }]
    }, {
        label: '传感器类型',
        prop: 'sensorType',
        overHidden: true,
        type: 'select',
        multiple: true,
        search: true,
        rules: [{
            required: true,
            message: "请选择传感器类型",
            trigger: "change"
        }],
        dicUrl: '/admin/dict/types?types=sensor_type',
        dicFormatter: res => {
            return res.data.sensor_type
        },
        addDisplay: false,
        editDisplay: false,
    }, {
        label: '厂商名称',
        prop: 'factoryId',
        type: 'select',
        overHidden: true,
        search: true,
        dicUrl: '/device/viewfactory/page?size=-1',
        props: {
            label: "name",
            value: 'id'
        },
        dicFormatter: res => {
            return res.data.records
        },
        rules: [{
            required: true,
            message: "请点击选择厂商名称",
            trigger: "change"
        }]
    }, {
        label: '监测点编号',
        search: true,
        overHidden: true,
        prop: 'disasterCode',
        rules: [{pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{0,16}$/,message:'当前可输入最大值为16位数字/字母/特殊字符', trigger: 'blur' }]
    }, {
        label: '监测点名称',
        search: true,
        overHidden: true,
        prop: 'disasterName',
    }, {
        label: '安装位置',
        overHidden: true,
        search: true,
        prop: 'location',
    }, ]
}
export const deviceOption = {
    align: 'center',
    searchSpan: 8,
    labelWidth: 100,
    searchMenuSpan: 6,
    selection: true,
    addBtn:false,
    editBtn:false,
    delBtn:false,
    tip:false,
    border: true,
    column: [{
        label: '设备状态',
        prop: 'state',
        type: 'select',
        // dicUrl: '/admin/dict/type/log_type',
        dicData: DIC.status,
        search: false,
        hide:true,
        rules: [{
            required: true,
            message: "请选择设备状态",
            trigger: "change"
        }],
    },{
        label: '维护记录',
        search: false,
        hide:true,
        prop: 'record',
        type:'textarea',
        maxlength:300,
        rules: [{
            required: true,
            message: "请输入维护记录",
            trigger: "blur"
        }],
        span: 24
    }, {
        label: '设备照片',
        type: 'upload',
        prop: 'deviceImage',
        formslot: true,
        search: false,
        hide: true,
        propsHttp: {
            res: 'data'
        },
        listType: 'picture-img',
        action: '/imgupload',
        span: 24
    },{
        label: '维护单位',
        search: true,
        prop: 'cbmu',
        overHidden: true,
        maxlength:30,
        // addDisplay:false,
    },{
        label: '维护人',
        search: true,
        prop: 'accendant',
        maxlength:30,
        rules: [{
            required: true,
            message: "请输入维护人",
            trigger: "blur"
        }],
    },{
        label: '联系电话',
        search: true,
        prop: 'phone',
        maxlength:11,
        rules: [{
            required: true,
            message: "请输入联系电话",
            trigger: "blur"
        },{
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
        }],
    },{
        label: '维护日期',
        search: true,
        overHidden: true,
        prop: 'maintenanceDate',
        type: "datetime",
        format: 'yyyy-MM-dd HH:mm:ss',
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        rules: [{
            required: true,
            message: "请输入维护日期",
            trigger: "blur"
        }],
    }]
}