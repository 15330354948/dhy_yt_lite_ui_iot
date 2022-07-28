import {
    infoPage,
  } from "@/api/monitorManage/device";
const DIC = {
    vaild: [{
        label: '绑点',
        value: true
    }, {
        label: '未绑点',
        value: false
    }],
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
    viewBtn:true,
    tip: false,
    addBtn:false,
    viewBtn:false,
    editBtn: false,
    menu:true,
    delBtn: false,
    header: true,
    border: true,
    column: [
        {
        label: '设备编号',
        search: true,
        prop: 'deviceCode',
        rules: [{
            required: true,
            message: "请输入设备编号",
            trigger: "blur"
        }, 
        ]
    }, {
        label: '设备类型',
        prop: 'deviceType',
        type: 'select',
        dicUrl: './admin/dict/type/device_type',
        search: true,
        rules: [{
            required: true,
            message: "请选择设备类型",
            trigger: "change"
        }]
    },{
        label: '厂商名称',
        prop: 'factoryName',
        type: 'select',
        dicUrl: '/device/viewfactory/page?size=-1',
        search: true,
        props: {
            label: "name",
            value: 'name'
        },
        dicFormatter: res => {
            return res.data.records
        },
        rules: [{
            required: true,
            message: "请选择厂商名称",
            trigger: "change"
        }]
    },{
        label: '监测点编号',
        search: true,
        prop: 'disasterCode',
        rules: [{ pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{0,16}$/, message: '当前可输入最大值为16位数字/字母/特殊字符', trigger: 'blur' }]
    }, {
        label: '监测点名称',
        search: true,
        prop: 'disasterName',
        overHidden:true,
    }, {
        label: '异常分类',
        search: true,
        prop: 'classify',
        overHidden:true,
        type: 'select',
            dicData: [{
                label: "无",
                value: 0
            }, {
                label: '平台原因',
                value: 1,
            }, {
                label: '施工原因',
                value: 2,
            }, {
                label: '设备原因',
                value: 3,
            }]
    }, {
        label: '异常原因',
        prop: 'reason',
        overHidden:true,
        width:'150',
    }, {
        label: '安装位置',
        search: true,
        prop: 'location',
        overHidden:true,
    }, {
        label: '创建日期',
        search: false,
        prop: 'createTime',
        format: 'yyyy-MM-dd HH:mm:ss',
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        overHidden:true,
    }, 
    {
        label: '状态',
        type: 'select',
        search: false,
        prop: 'auditState',
        dicData: [{
            label: "未处置",
            value: 0
        }, {
            label: '正在处置',
            value: 1,
        }, {
            label: '已处置',
            value: 2,
        }],
    }, 
]
}
export const addOption = {
    align: 'center',
    menuAlign: 'center',
    labelWidth: 120,
    span: 12,
    menuBtn:false,
    menuPosition:'right',
    column: [
        {
            label: '监测点名称',
            prop: 'disasterName',
            type: 'select',
            filterable:true,
            props: {
            label: "name",
            value: "pikk",
            },
            formslot: true,
            rules: [{
                required: true,
                message: "请选择监测点名称",
                trigger: "change"
            }],
        dicUrl: "/disaster_base_info/page",
        dicFormatter: res => {
            return res.data.records;
        },
        cascaderItem: ["disasterCode"], //关联
        },{
            label: '全市统一编号',
            prop: 'disasterCode',
            disabled:true,
            formslot: true,
            props: {
                label: "pikk",
                value: "pikk",
            },
            cascaderIndex: 0,
            dicUrl: "/disaster_base_info/page?pikk={{key}}",
            dicFormatter: res => {
                return res.data.records;
            },
            cascaderItem: ["deviceName"], 
        },{
            label: '异常设备名称',
            prop: 'deviceName',
            type: 'select',
            rules: [{
                required: true,
                message: "请选择异常设备名称",
                trigger: "change"
            }],
            props: {
                label: "name",
                value: "name",
            },
            formslot: true,
            dicUrl: "/device/viewprofessionaldeviceinfo/page?disasterCode={{key}}",
        },{
            label: '异常设备编码',
            prop: 'deviceCode',
            disabled:true,
            formslot: true,
        },{
            label: '异常设备类型',
            prop: 'deviceType',
            disabled:true,
            type: 'select',
            overHidden: true,
            formslot: true,
            dicUrl: './admin/dict/type/device_type',
        }, {
            label: '厂商名称',
            prop: 'factoryName',
            remote: true,
            disabled:true,
            type: 'select',
            overHidden: true,
            dicUrl: '/device/viewfactory/page?size=-1',
            formslot: true,
            props: {
                label: "name",
                value: 'name'
            },
            dicFormatter: res => {
                return res.data.records
            },
        },{
            label: '安装位置',
            prop: 'location',
            overHidden: true,
            formslot: true,
            disabled:true,
        }, {
            label: '异常日期',
            prop: 'abnormalTime',
            format: 'yyyy-MM-dd HH:mm:ss',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            type: "datetime",
            rules: [{
                required: true,
                message: "请选择安装时间",
                trigger: "change"
            }],
        },{
            label: '异常分类',
            prop: 'classify',
            type: 'select',
            dicData: [{
                label: "无",
                value: 0
            }, {
                label: '平台原因',
                value: 1,
            }, {
                label: '施工原因',
                value: 2,
            }, {
                label: '设备原因',
                value: 3,
            }]
        },{
            label: '异常原因',
            prop: 'reason',
            type: 'textarea',
            span:24,
            rules: [{
                required: true,
                message: "请填写异常原因",
                trigger: "change"
            }],
        },{
            label: '异常截图',
            prop: 'imgUrl',
            span:24,
            formslot: true,
            // tip: '仅可上传一张异常截图',
        },{
            label: '处置状态',
            prop: 'auditState',
            type: 'select',
            dicData: [{
                label: "未处置",
                value: 0
            }, {
                label: '正在处置',
                value: 1,
            }, {
                label: '已处置',
                value: 2,
            }]
        },{
            label: '处置结果',
            prop: 'auditResult',
            span:24,
            type: 'textarea',
        },

    ]
}
export const startOption = {
    detail: true,
    submitBtn: false,
    emptyBtn: false,
    column: [

    ]
}