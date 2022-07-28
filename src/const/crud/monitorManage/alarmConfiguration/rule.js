export const tableOption={
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
            label: '中台设备序列号',
            prop: 'deviceNo',
            search: true,
            searchRules: [{ required: false }],
            rules: [{
                required: true,
                message: "请输入中台设备序列号",
                trigger: "blur"
            }],
        },{
            label: '设备编号',
            prop: 'mappingNo',
            search: true,
            addDisplay: false,
            editDisplay: false,
            searchRules: [{ required: false }],
            rules: [{
                required: true,
                message: "请输入设备编号",
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
            dicUrl: `/warn/open_warn_script_info/type/sensor_type`,
            // dicUrl: "/admin/dict/type/sensor_type",
            rules: [{
                required: true,
                message: "请选择",
                trigger: "change"
            }],
        }, {
            label: '告警等级',
            prop: 'warnLevel',
            type: 'select',
            dicUrl: `/warn/open_warn_script_info/type/warn_level`,
            // dicUrl: "/admin/dict/type/warn_level",
            props: {
                label: 'label',
                value: 'dictValue'
            },
            rules: [{
                required: true,
                message: "请选择",
                trigger: "change"
            }],
        }, {
            label: '是否启用',
            prop: 'isEnable',
            type: 'switch',
            dic: [{
                label: '禁用',
                value: false
            }, {
                label: '启用',
                value: true
            }],
            clearable: false,
            inactiveColor: "red",
            activeColor: "#13ce66",
            value: true,
            rules: [{
                required: true,
                message: "请选择启用状态",
                trigger: "change"
            }],
            slot:true,
        }, {
            label: '脚本',
            prop: 'scriptId',
            type: 'select',
            rules: [{
                required: true,
                message: "请选择",
                trigger: "change"
            }],
            dicUrl: `/warn/open_warn_script_info/page`,
            dicQuery:{
             current: 1,
             size: -1,
             },
            props: {
            label: 'name',
            value: 'id',
            },
            dicFormatter: (res) => {
            return res.data.records;//返回字典的层级结构
            },
            // formslot:true,
            control: (val, form) => {
                if (val) {
                    return {
                        parameterJson: {
                            display: true,
                        },
                    }
                } else {
                    return {
                        parameterJson: {
                            display: false
                        },
                    }
                }
            },

        },{
            label: '脚本说明',
            prop: 'scriptDec',
            hide:true,
            formslot:true,
            span:24,
        }, {
            label: '告警消息模板',
            prop: 'warnMsgTemplate',
            type: 'textarea',
            maxlength: 300,
            showWordLimit: true,
            overHidden: true,
            span:12,
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
        }, {
            label: '脚本参数描述',
            prop: 'parameterJson',
            formslot:true,
            span:24,
            hide:true,
            // rules: [{
            //     required: true,
            //     message: "脚本参数描述",
            //     trigger: "blur"
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
