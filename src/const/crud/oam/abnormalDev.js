let  dicData={
        disposalStatus:[{
            label:'未处置',
            value:'n',
        },{
            label:'处置中',
            value:'c',
        },{
            label:'已处置',
            value:'y',
        }],
        disposalResults:[{
            label:'正常预警',
            value:'zcyj',
        },{
            label:'持续观察',
            value:'cxgc',
        },{
            label:'设备异常',
            value:'sbyc',
        },{
            label:'外界干扰',
            value:'wjgr',

        }],
        deviceStatus:[{
            label: '在线',
            value: 0
        }, {
            label: '离线',
            value: 1
        }],
        abnormalType:[{
            label: '数据突刺',
            value: "spike",
        },{
            label: '数据长期不波动',
            value: "invariant",
        },{
            label: '超出数据范围',
            value: "out_range",
        },{
            label: '数据频繁波动',
            value: "fluctuation",
        },{
            label: '设备离线',
            value: "offline",
        },{
            label: '数据重复',
            value: "repeat",
        }]
}


var validatePassExpect = (rule, value, callback) => {
    let time = getNowTime();
    let date1 = new Date(time);
    let date2 = new Date(value);
    var s1 = date1.getTime(),
      s2 = date2.getTime();
    var total = (s2 - s1) / 1000;
    if (value == "") {
      callback(new Error('请选择期望完成日期'));
    } else if (total < 0) {
      callback(new Error('请选择大于当前日期'));
    } else {
      callback();
    }
  };
  function addZero(s) {
    return s < 10 ? ('0' + s) : s;
  }

  function getNowTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var time = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second);
    return time;
  }

export const tableOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 6,
    labelWidth: 130,
    searchLabelWidth: 100,
    addBtnText: "新增异常设备",
    addTitle: "新增异常设备",
    editTitle: "编辑异常设备",
    addBtnIcon: " ",
    delBtnIcon: ' ',
    editBtnIcon: ' ',
    selection: true,
    columnBtn: false,
    editBtn: false,
    align:"center",
    dialogCustomClass:"abnormal_dev_table",
    group: [{
        //用于新增、修改
        label: '设备基础信息',
        prop: 'basicInfo',
        column: [{
            label: '设备编号',
            prop: 'deviceCode',
            type: "select",
            formslot:true,
            rules: [{
                required: true,
                message: "请选择设备编号",
                trigger: "change"
            }],

        }, {
            label: '点位名称',
            prop: 'deviceName',
            addDetail: true,
            editDetail: true,
        }, {
            label: '设备类型',
            prop: 'deviceType',
            addDetail: true,
            editDetail: true,
            type: "select",
            dicUrl: '/admin/dict/type/device_type',
            // filter:true,
        }, {
            label: '设备状态',
            prop: 'deviceStatus',
            addDetail: true,
            editDetail: true,
            type: "select",
            dicData:dicData.deviceStatus,
        }, {
            label: '监测点名称',
            prop: 'monitorName',
            addDetail: true,
            editDetail: true,

        }, {
            label: '所属项目',
            prop: 'subprojectName',
            addDetail: true,
            editDetail: true,
            // formslot:true,

        }, {
            label: '设备厂商',
            prop: 'factoryName',
            addDetail: true,
            editDetail: true,
            // type: "select",
            // dicUrl: '/device/viewfactory/page',
            // filter:true,
            // props: {
            //     label: "name",
            //     value: 'id'
            // },
            // dicFormatter: res => {
            //     return res.data.records
            // },
        }, {
            label: '安装位置',
            prop: 'deviceLocation',
            addDetail: true,
            editDetail: true,

        }]
    }, {
        label: '异常情况',
        prop: 'abnormalInfo',
        column: [{

            label: '异常类型',
            prop: 'abnormalType',
            hide: true,
            type: "select",
            dicData:dicData.abnormalType,
            rules: [{
                required: true,
                message: "请选择异常类型",
                trigger: "change"
            }],
        }, {
            label: '异常时间',
            prop: 'abnormalTime',
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            rules: [{
                required: true,
                message: "请选择异常时间",
                trigger: "change"
            }],
            pickerOptions: {
                //时间范围限制
                disabledDate(time) {
                    return time > Date.now()
                },
              },

        }, {
            label: '异常描述',
            prop: 'abnormalDescription',
            type: "textarea",
            hide: true,
            span: 24,
            rules: [{
                required: true,
                message: "请输入异常描述",
                trigger: "blur"
            }],
        }, {
            label: '监测数据',
            prop: 'timeRange',
            hide: true,
            span: 24,
            type: 'datetimerange',
            format: 'yyyy-MM-dd HH:mm:ss',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            pickerOptions: {
                //时间范围限制
                disabledDate(date) {
                    return date.getTime() >= Date.now();
                },
            },
            tip: "建议选择不超过7天的监测数据范围"
        }, {
            label: '附件',
            prop: 'abnormalDeviceRecordFileList',
            addDisplay:false,
            editDisplay:false,
            hide: true,
            span: 24,
            type: 'upload',
            fileSize: 20480,
            listType: 'picture-card',
            tip: '文件格式不限，单个文件不能超过20MB',
            propsHttp: {
                url: 'url',
                name: 'id',
                res: 'data.infos.0'
            },
            action: "/file/upload"
        }]
    }],
    //用于列表展示
    column: [{
        label: '异常批次号',
        prop: 'abnormalBatchNumber',
        display: false,
        search: true,
        searchRules: [{ required: false }],
        width:180,
        overHidden:true,
    }, {
        label: '设备编号',
        prop: 'deviceCode',
        display: false,
        search: true,
        searchRules: [{ required: false }],
        width:180,
        overHidden:true,
    }, {
        label: '设备类型',
        prop: 'deviceType',
        type: "select",
        display: false,
        search: true,
        searchRules: [{ required: false }],
        dicUrl: '/admin/dict/type/device_type',
        overHidden:true,
        searchFilterable: true,
    }, {
        label: '设备状态',
        prop: 'deviceStatus',
        type: "select",
        dicData:dicData.deviceStatus,
        display: false,
        search: true,
        searchRules: [{ required: false }],
        overHidden:true,
    }, {
        label: '异常类型',
        prop: 'abnormalType',
        type: "select",
        dicData:dicData.abnormalType,
        display: false,
        hide: true,
        overHidden:true,
        searchFilterable: true,
    }, {
        label: '处置结果',
        prop: 'disposalResults',
        display: false,
        type: "select",
        dicData:dicData.disposalResults,
        // hide: true,
        search: true,
        searchRules: [{ required: false }],
        overHidden:true,
    }, {
        label: '异常时间',
        prop: 'abnormalTime',
        display: false,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        width:140,
        search: true,
        searchRange: true,
        searchSpan:12,
        searchRules: [{ required: false }],
        pickerOptions: {
            //时间范围限制
            disabledDate(date) {
                return date.getTime() >= Date.now();
            },
        },
        overHidden:true,
    }, {
        label: '异常次数',
        prop: 'recordDetailTotal',
        display: false,
        overHidden:true,

    }, {
        label: '处置状态',
        prop: 'disposalStatus',
        display: false,
        type:"select",
        dicData:dicData.disposalStatus,
        overHidden:true,
    }, {
        label: '点位名称',
        prop: 'deviceName',
        display: false,
        search: true,
        searchRules: [{ required: false }],
        overHidden:true,
    }, {
        label: '监测点名称',
        prop: 'monitorName',
        display: false,
        search: true,
        searchRules: [{ required: false }],
        overHidden:true,
    }, {
        label: '所属项目',
        prop: 'subprojectName',
        display: false,
        overHidden:true,
    }, {
        label: '所属项目',
        prop: 'subprojectId',
        display: false,
        hide:true,
        overHidden:true,
        type: "select",
        search: true,
        searchRules: [{ required: false }],
        searchFilterable: true,
        searchslot:true,
    }, {
        label: '设备厂商',
        prop: 'factoryName',
        display: false,
        type: "select",

        dicUrl: '/device/viewfactory/page?size=-1',
        props: {
            label: "name",
            value: 'id'
        },
        dicFormatter: res => {
            return res.data.records
        },
        overHidden:true,
    }, {
        label: '设备厂商',
        prop: 'factoryId',
        display: false,
        hide: true,
        type: "select",
        search: true,
        searchFilterable: true,
        searchRules: [{ required: false }],
        dicUrl: '/device/viewfactory/page?size=-1',
        props: {
            label: "name",
            value: 'id'
        },
        dicFormatter: res => {
            return res.data.records
        },
        overHidden:true,


    }]
}

export const formOption = {
    submitBtn: false,
    emptyBtn: false,
    align:"center",
    column: [{
        label: "处置状态",
        prop: "disposalStatus",
        type: "select",
        dicData:dicData.disposalStatus,
        rules: [{
            required: true,
            message: "请选择处置状态",
            trigger: "change"
        }],
    }, {
        label: "处置结果",
        prop: "disposalResults",
        type: "select",
        dicData:dicData.disposalResults,
        rules: [{
            required: true,
            message: "请选择处置结果",
            trigger: "change"
        }],
    }, {
        label: "备注",
        prop: "remark",
        type: "textarea",
        span: 24,
        maxlength: 100,
        showWordLimit: true,
    }],
}
export const detailDevBasicInfo = {
    submitBtn: false,
    emptyBtn: false,
    detail: true,
    align:"center",
    // menuSpan:6,
    labelWidth: 120,
    size: "mini",
    column: [{
        label: '设备编号',
        prop: 'deviceCode',
        type: "select",
        rules: [{
            required: true,
            message: "请选择设备编号",
            trigger: "change"
        }],
        span: 6,
    }, {
        label: '点位名称',
        prop: 'deviceName',
        span: 6,

    }, {
        label: '设备类型',
        prop: 'deviceType',
        filter:true,
        type: "select",
        dicUrl: '/admin/dict/type/device_type',
        span: 6,
    }, {
        label: '设备状态',
        prop: 'deviceStatus',
        type: "select",
        dicData:dicData.deviceStatus,
        span: 6,

    }, {
        label: '监测点名称',
        prop: 'monitorName',
        span: 6,

    }, {
        label: '所属项目',
        prop: 'subprojectName',

        span: 6,
    }, {
        label: '设备厂商',
        prop: 'factoryName',

        type: "select",
        span: 6,

    }, {
        label: '处置状态',
        prop: 'disposalStatus',
        type:"select",
        dicData:dicData.disposalStatus,
        span: 6,
    }, {
        label: '安装位置',
        prop: 'location',
        span: 24,
        formslot: true,
    }],
}




export const abnomalTableOption = {
    index: true,
    indexLabel: "序号",
    selection: true,
    columnBtn: false,
    editBtn: false,
    delBtn: false,
    addBtnText: "新增异常记录",
    addTitle: "新增异常记录",
    editTitle: "编辑异常记录",
    addBtnIcon: " ",
    delBtnIcon: ' ',
    editBtnIcon: ' ',
    align:"center",
    searchMenuSpan:6,
    // height:160,
    column: [{
        label: '异常时间',
        prop: 'abnormalTime',
        search: true,
        searchRules: [{ required: false }],
        searchRange: true,
        searchSpan:12,
        pickerOptions: {
            //时间范围限制
            disabledDate(date) {
                return date.getTime() > Date.now();
            },
        },
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        rules: [{
            required: true,
            message: "请选择异常时间",
            trigger: "change"
        }],

    }, {
        label: '异常类型',
        prop: 'abnormalType',
        search: true,
        searchRules: [{ required: false }],
        type: "select",
        dicData:dicData.abnormalType,
        rules: [{
            required: true,
            message: "请选择异常类型",
            trigger: "change"
        }],
    }, {
        label: '异常描述',
        prop: 'abnormalDescription',
        search: true,
        searchRules: [{ required: false }],
        type: "textarea",
        span: 24,
        maxlength:100,
        showWordLimit:true,
        rules: [{
            required: true,
            message: "请输入异常描述",
            trigger: "blur"
        }],
    }, {
        label: '监测数据',
        search: true,
        searchRules: [{ required: false }],
        searchRange: true,
        searchSpan:12,
        pickerOptions: {
            //时间范围限制
            disabledDate(date) {
                return date.getTime() >= Date.now();
            },
        },
        hide: true,
        prop: 'timeRange',
        hide: true,
        span: 24,
        type: 'datetimerange',
        format: 'yyyy-MM-dd HH:mm:ss',
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        pickerOptions: {
            //时间范围限制
            disabledDate(date) {
                return date.getTime() >= Date.now();
            },
        },
        tip: "建议选择不超过7天的监测数据范围"

    }, {
        label: '创建时间',
        prop: 'createTime',
        search: true,
        searchRules: [{ required: false }],
        searchRange: true,
        type: 'datetime',
        searchSpan:12,
        display:false,
        pickerOptions: {
            //时间范围限制
            disabledDate(date) {
                return date.getTime() >= Date.now();
            },
        },
    }, {
        label: '创建人',
        prop: 'createUserName',
        search: true,
        searchRules: [{ required: false }],
        display:false,

    }]
}

export const oamTableOption = {
    addBtn: false,
    editBtn: false,
    viewBtn: false,
    delBtn: false,
    columnBtn: false,
    index: true,
    indexLabel: '序号',
    searchLabelWidth: 130,
    align:"center",
    column: [{
        label: '工单标题',
        prop: 'title',
        search: true,
        searchRules: [{ required: false }],
    }, {
        label: '监测点名称',
        prop: 'monitorName',
        search: true,
        searchRules: [{ required: false }],
    }, {
        label: '设备编号',
        prop: 'deviceCode',
        search: true,
        searchRules: [{ required: false }],
    }, {
        label: '设备类型',
        prop: 'deviceType',
        filter:true,
        type: 'select',
        search: true,
        searchRules: [{ required: false }],
        dicUrl: '/admin/dict/type/device_type',
    }, {
        label: '负责人',
        prop: 'chargePersonName',
        search: true,
        searchRules: [{ required: false }],
        type: 'input',

    }, {
        label: '工单状态',
        prop: 'faultState',
        type: 'select',
        dicUrl: '/admin/dict/type/order_type',
        props: {
            label: "label",
            value: 'dictValue'
        },
        search: true,
        searchRules: [{ required: false }],
    }, {
        label: '紧急程度',
        prop: 'urgencyDegree',
        type: 'select',
        dicData: [{
            label: '一般',
            value: 0
          }, {
            label: '紧急',
            value: 1
          }, {
            label: '非常紧急',
            value: 2
          }],
        search: true,
        searchRules: [{ required: false }],
    }, {
        label: '故障原因',
        prop: 'faultReason',
        type: 'select',
        dicUrl: '/admin/dict/type/cause_of_failure',
        props: {
            label: "label",
            value: 'dictValue'
        },
        overHidden:true,
        hide:true,
        // search: true,
        // searchRules: [{ required: false }],
    }, {
        label: '期望完成时间',
        prop: 'expectCompleteTime',
        search: true,
        searchRules: [{ required: false }],
        type: "datetime",
        format: 'yyyy-MM-dd HH:mm:ss',
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        searchRange: true,
        searchSpan:12,
    }, {
        label: '创建时间',
        prop: 'createTime',
        search: true,
        searchRules: [{ required: false }],
        format: 'yyyy-MM-dd HH:mm:ss',
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        type: "datetime",
        searchRange: true,
        searchSpan:12,
        pickerOptions: {
            //时间范围限制
            disabledDate(date) {
                return date.getTime() >= Date.now();
            },
        },
    }]
}

export const oamOption={
    submitBtn: false,
    emptyBtn: false,
    labelWidth:120,
    span:24,
    column: [{
        label: '工单标题',
        prop: 'title',
        rules: [{
          required: true,
          message: "请输入工单标题",
          trigger: "blur"
        }],
    }, {
        label: '期望完成时间',
        prop: 'expectCompleteTime',
        type: "datetime",
        format: 'yyyy-MM-dd HH:mm:ss',
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        rules: [{
          required: true,
          validator: validatePassExpect,
          trigger: "blur"
        }],
      }, {
        label: '关联监测点',
        prop: 'monitorId',
        formslot:true,
        rules: [{
          required: true,
          message: "请选择监测点",
          trigger: "blur"
        }],

      }, {
        label: '设备编号',
        prop: 'deviceCode',
        hide: true,
        formslot:true,
        rules: [{
          required: true,
          message: "请选择设备编号",
          trigger: "blur"
        }],
      }, {
        label: '设备类型',
        prop: 'deviceType',
        disabled: true,
        overHidden: true,
        type: 'select',
        dicUrl: '/admin/dict/type/device_type',
      }, {
        label: '负责人员',
        prop: 'chargePersonId',

        type: 'select',
        formslot:true,
        // dicUrl: '/admin/dict/type/device_type',
        rules: [{
          required: true,
          message: "请选择设备类型",
          trigger: "change"
        }],
      },
      {
        label: '参与人员',
        prop: 'joinPersonId',
        type: 'tree',
        formslot:true,
        rules: [{
          required: true,
          message: "请选择参与人员",
          trigger: "change"
        }],
        filterable: true,
        multiple: true,
        // dicUrl: '/admin/dict/type/device_type',
      }, {
        label: '紧急程度',
        prop: 'urgencyDegree',
        type: 'radio',
        span: 24,
        button: true,
        dicData: [{
          label: '一般',
          value: 0
        }, {
          label: '紧急',
          value: 1
        }, {
          label: '非常紧急',
          value: 2
        }],
        rules: [{
          required: true,
          message: "请选择设备类型",
          trigger: "change"
        }],



      }, {
        label: '提醒方式',
        prop: 'msgMode',
        span: 24,
        type: 'checkbox',

        all: false,
        max:1,
        border: true,
        clearable: true,
        dicData: [{
            label: '短信通知',
            value: 1
        //   },
        //   {
        //     label: 'APP',
        //     value: 2
          }
        ],
      }, {
        label: '工单描述',
        prop: 'remark',
        type: 'textarea',
        span: 24,
        showWordLimit: true,
        maxlength:100,
        rules: [{
          required: true,
          message: "请填写工单描述",
          trigger: "blur"
        }],
      }, {
        label: '上传附件',
        prop: 'files',
        type: 'upload',
        span: 24,
        row: true,
        formslot: true,
      },
    ]
}




