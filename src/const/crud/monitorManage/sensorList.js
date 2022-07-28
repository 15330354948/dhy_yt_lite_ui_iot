const DIC = {
  types: [{
    label: '累计位移',
    value: 1
  }, {
    label: '变化速率',
    value: 0
  }],
  times: [{
    label: '日',
    value: 1
  }, {
    label: '月',
    value: 0
  }],
  state: [{
    label: '使用',
    value: 1
  }, {
    label: '未使用',
    value: 0
  }],
  deviceStatus: [{
    label: '离线',
    value: 1
  }, {
    label: '在线',
    value: 0
  }]
}
// import {
//   byId
// } from "@/api/monitorManage/sensor";
// import {
//   lazyFetchTree
// } from "../../../api/admin/dept";
// var validatePass = (rule, value, callback) => {
//   if (value === '') {
//     callback(new Error('请输入传感器编号'))
//   }
//   byId({。
//     sensorNo: value
//   }).then(res => {
//     if (res.data.data == false) {
//       callback(new Error('传感器编号重复'));
//     } else {
//       callback();
//     }
//   })
// };
let _this = this;
export const tableOption = {
  align: 'center',
  menuAlign: 'center',
  searchLabelWidth: 100,
  menuWidth: 400,
  searchSpan: 6,
  clearable: false,
  labelWidth: 100,
  searchMenuSpan: 4,
  viewBtn: false,
  excelBtn: true,
  border: true,
  addBtn: false,
  editBtn: false,
  selection: true,
  delBtn: false,
  reserveSelection: true,
  column: [{
      label: '传感器编号',
      disabled: false,
      search: true,
      prop: 'sensorCode',
      rules: [{
        required: true,
        // validator: validatePass,
        message: "请输入传感器编号",
        trigger: "blur",
        pattern: /^\S*$/,
      }],
    },
    {
      label: "传感器类型",
      prop: "sensorType",
      type: "select",
      search: true,
      props: {
        label: 'label',
        value: 'value'
      },
      rules: [{
        required: true,
        message: "请选择传感器类型",
        trigger: "blur",
      }],
      dicUrl: '/admin/dict/types?types=sensor_type',
      dicFormatter: res => {
        return res.data.sensor_type
      },
      change: ({
        value,
        column
      }) => {
        if (value) {
          tableOption.column[9].display = true;
        }
      },
    },
    {
      label: '点位名称',
      prop: 'deviceName',
      search: true,
      addDisplay: false,
      editDisplay: false,
    },
    {
      label: '传感器状态',
      type: 'select',
      prop: 'deviceStatus',
      dicData: DIC.deviceStatus,
    },
    {
      label: '使用状态',
      type: 'select',
      prop: 'state',
      dicData: DIC.state,
    },
    {
      label: '监测点编号',
      prop: 'disasterCode',
      formslot: true,
      type: "select",
      cascaderItem: ["disasterName"],
      rules: [{
        required: true,
        message: "请选监测点编号",
        trigger: "change",
      }]
    },
    {
      label: '监测点名称',
      // search: true,
      prop: 'disasterName',
      maxlength: 30,
      // disabled: true,
      type: "select",
      formslot: true,
      props: {
        label: "monitorName",
        value: 'monitorName'
      },
    },
    {
      label: '监测点id',
      hide: true,
      prop: 'disasterId',
      // addDisplay: false,
      // editDisplay: false,
      display: false,
      // type: "select",
      // props: {
      //   label: "id",
      //   value: 'id'
      // },
      // cascaderIndex: 0,
      // dicUrl: ``,
      // dicFormatter: res => {
      //   return res.data.records;
      // }
    }, {
      label: '安装位置',
      search: true,
      maxlength: 30,
      prop: 'installLocation'
    },
    {
      label: '初始值设置',
      prop: 'initType',
      formslot: true,
      display: false,
      // labelslot: true,
      // errorslot: true,
      type: "select",
      dicData: [{
        label: "不设置初始值",
        value: 0
      }, {
        label: '使用中台初始值',
        value: 1,
      }, {
        label: '自定义初始值',
        value: 2,
      }],
    },
    {
      label: 'X轴初始值',
      maxlength: 30,
      prop: 'x',
      display: false,
      disabled: false,
      hide: true
    },
    {
      label: 'Y轴初始值',
      maxlength: 30,
      prop: 'y',
      display: false,
      disabled: false,
      hide: true
    },
    {
      label: 'Z轴初始值',
      maxlength: 30,
      prop: 'z',
      display: false,
      disabled: false,
      hide: true
    },
    {
      label: 'value初始值',
      maxlength: 30,
      prop: 'value',
      display: false,
      disabled: false,
      hide: true
    },
  ]
}
export const errorDataOption = {
  labelWidth: 120,
  resetForm: true,
  emptyBtn: false,
  column: [{
    label: '数据频率',
    prop: 'freq',
    formslot: true,
    span: 24,
    rules: [{
      pattern: /^-?\d+(\.\d{1,6})?$/,
      message: "请输入正确的值",
      trigger: "blur"
    }],
  }, {
    label: '数据范围',
    prop: 'range',
    formslot: true,
    span: 24
  }, {
    label: 'X（MM）',
    prop: 'xGreater',
    formslot: true,
    span: 12,
    display: true,
    rules: [{
      pattern: /^-?\d+(\.\d{1,6})?$/,
      message: "请输入正确的值",
      trigger: "blur"
    }],
  }, {
    label: '',
    prop: 'xLess',
    formslot: true,
    span: 12,
    rules: [{
      pattern: /^-?\d+(\.\d{1,6})?$/,
      message: "请输入正确的值",
      trigger: "blur"
    }],
    display: true,
  }, {
    label: 'Y（MM）',
    prop: 'yGreater',
    formslot: true,
    rules: [{
      pattern: /^-?\d+(\.\d{1,6})?$/,
      message: "请输入正确的值",
      trigger: "blur"
    }],
    display: true,
  }, {
    label: '',
    prop: 'yLess',
    formslot: true,
    rules: [{
      pattern: /^-?\d+(\.\d{1,6})?$/,
      message: "请输入正确的值",
      trigger: "blur"
    }],
    display: true,
  }, {
    label: 'Z（MM）',
    prop: 'zGreater',
    formslot: true,
    rules: [{
      pattern: /^-?\d+(\.\d{1,6})?$/,
      message: "请输入正确的值",
      trigger: "blur"
    }],
    display: true
  }, {
    label: '',
    prop: 'zLess',
    formslot: true,
    rules: [{
      pattern: /^-?\d+(\.\d{1,6})?$/,
      message: "请输入正确的值",
      trigger: "blur"
    }],
    display: true,
  }]
}
export const curveOption = {
  labelWidth: 0,
  submitBtn: false,
  emptyBtn: false,
  column: [{
    label: "",
    prop: "type",
    type: "select",
    dicData: DIC.types,
    span: 4,
    mock: {
      type: 'dic',
    }
  }, {
    label: "",
    prop: "time",
    type: "select",
    dicData: DIC.times,
    span: 4,
    mock: {
      type: 'dic',
    }
  }, {
    label: "",
    prop: "daterange",
    type: "daterange",
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    span: 10,
    display: true,
  }, {
    label: "",
    prop: "monthrange",
    type: "monthrange",
    startPlaceholder: '开始月份',
    endPlaceholder: '结束月份',
    span: 10,
  }]
}



export const xYujinOption = {
  labelWidth: 120,
  resetForm: true,
  submitText: "保存阈值",
  emptyBtn: false,
  group: [{
    //   icon:'el-icon-info',
    label: 'X轴单控阈值设置',
    display: true,
    arrow: false,
    collapse: true,
    prop: 'group',
    column: [{
        label: '相邻告警',
        prop: 'adjacent',
        formslot: true,
        span: 24
      }, {
        label: '红色预警',
        prop: 'warnValueEachRed',
        span: 12,
        rules: [{
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur",
          required: true,
        }]
      }, {
        label: '橙色预警',
        prop: 'warnValueEachOrange',
        span: 12,
        rules: [{
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur",
          required: true,
        }]
      }, {
        label: '黄色预警',
        prop: 'warnValueEachYellow',
        span: 12,
        rules: [{
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur",
          required: true,
        }]
      }, {
        label: '蓝色预警',
        prop: 'warnValueEachBlue',
        span: 12,
        rules: [{
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur",
          required: true,
        }]
      }, {
        label: '累计告警',
        prop: 'cumulative',
        span: 24,
        formslot: true,
      }, {
        label: '红色预警',
        prop: 'warnValueSumRed',
        span: 12,
        rules: [{
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur",
          required: true,
        }]
      },
      {
        label: '橙色预警',
        prop: 'warnValueSumOrange',
        span: 12,
        rules: [{
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur",
          required: true,
        }]
      }, {
        label: '黄色预警',
        prop: 'warnValueSumYellow',
        span: 12,
        rules: [{
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur",
          required: true,
        }]
      }, {
        label: '蓝色预警',
        prop: 'warnValueSumBlue',
        span: 12,
        rules: [{
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur",
          required: true,
        }]
      },
    ]
  }, ],
}

export const xDkOption = {
  labelWidth: 120,
  resetForm: true,
  submitText: "保存阈值",
  emptyBtn: false,
  group: [{
    label: 'X轴单控变化率设置',
    display: true,
    arrow: false,
    collapse: true,
    prop: 'group2',
    column: [{
        label: '连续',
        labelWidth: 200,
        prop: 'warnRateDay',
        span: 24,
        placeholder: "请输入天数",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '红色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneRedValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '橙色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneOrangeValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '黄色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneYellowValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '蓝色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneBlueValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
    ]
  }],
}

export const yDkOption = {
  labelWidth: 120,
  resetForm: true,
  submitText: "保存阈值",
  emptyBtn: false,
  group: [{
    label: 'Y轴单控变化率设置',
    display: true,
    arrow: false,
    collapse: true,
    prop: 'group2',
    column: [{
        label: '连续',
        labelWidth: 200,
        prop: 'warnRateDay',
        span: 24,
        placeholder: "请输入天数",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '红色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneRedValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '橙色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneOrangeValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '黄色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneYellowValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '蓝色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneBlueValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
    ]
  }],
}

export const zDkOption = {
  labelWidth: 120,
  resetForm: true,
  submitText: "保存阈值",
  emptyBtn: false,
  group: [{
    label: 'Z轴单控变化率设置',
    display: true,
    arrow: false,
    collapse: true,
    prop: 'group2',
    column: [{
        label: '连续',
        labelWidth: 200,
        prop: 'warnRateDay',
        span: 24,
        placeholder: "请输入天",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '红色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneRedValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '橙色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneOrangeValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '黄色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneYellowValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '蓝色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneBlueValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
    ]
  }],
}

export const vDkOption = {
  labelWidth: 120,
  resetForm: true,
  submitText: "保存阈值",
  emptyBtn: false,
  group: [{
    label: 'value单控变化率设置',
    display: true,
    arrow: false,
    collapse: true,
    prop: 'group2',
    column: [{
        label: '连续',
        labelWidth: 200,
        prop: 'warnRateDay',
        span: 24,
        placeholder: "请输入天数",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '红色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneRedValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '橙色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneOrangeValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '黄色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneYellowValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '蓝色告警：变化速率超过',
        labelWidth: 200,
        prop: 'warnOneBlueValue',
        span: 12,
        placeholder: "mm/d",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
    ]
  }],
}


export const xDoubleOption = {
  labelWidth: 120,
  resetForm: true,
  submitText: "保存阈值",
  emptyBtn: false,
  group: [{
    label: 'X轴双控阈值设置',
    display: true,
    arrow: false,
    collapse: true,
    prop: 'group2',
    column: [{
        label: 'X轴单日变化量控制值',
        labelWidth: 160,
        prop: 'warnSumChangeValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: 'X轴变化速率控制值：连续',
        labelWidth: 200,
        prop: 'warnRateDay',
        span: 7,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '天超过',
        prop: 'warnRateDayValue',
        labelPosition: "left",
        labelWidth: 70,
        span: 5,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: 'mm/d',
        labelPosition: "left",
        formslot: true,
        span: 2,
      }, {
        label: '红色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleRedValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneRedValue',
        placeholder: " ",
        span: 10,
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
      {
        label: '橙色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleOrangeValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneOrangeValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
      {
        label: '黄色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleYellowValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneYellowValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
      {
        label: '蓝色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleBlueValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneBlueValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
    ]
  }],
}

export const yDoubleOption = {
  labelWidth: 120,
  resetForm: true,
  submitText: "保存阈值",
  emptyBtn: false,
  group: [{
    label: 'Y轴双控阈值设置',
    display: true,
    arrow: false,
    collapse: true,
    prop: 'group2',
    column: [{
        label: 'Y轴单日变化量控制值',
        labelWidth: 160,
        prop: 'warnSumChangeValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: 'Y轴变化速率控制值：连续',
        labelWidth: 200,
        prop: 'warnRateDay',
        span: 7,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '天超过',
        prop: 'warnRateDayValue',
        labelPosition: "left",
        labelWidth: 70,
        span: 5,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: 'mm/d',
        labelPosition: "left",
        formslot: true,
        span: 2,
      }, {
        label: '红色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleRedValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneRedValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
      {
        label: '橙色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleOrangeValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneOrangeValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
      {
        label: '黄色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleYellowValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneYellowValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
      {
        label: '蓝色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleBlueValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneBlueValue',
        span: 10,
        placeholder: " ",
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
    ]
  }],
}

export const zDoubleOption = {
  labelWidth: 120,
  resetForm: true,
  submitText: "保存阈值",
  emptyBtn: false,
  group: [{
    label: 'Z轴双控阈值设置',
    display: true,
    arrow: false,
    collapse: true,
    prop: 'group2',
    column: [{
        label: 'Z轴单日变化量控制值',
        labelWidth: 160,
        prop: 'warnSumChangeValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: 'Z轴变化速率控制值：连续',
        labelWidth: 200,
        prop: 'warnRateDay',
        span: 7,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '天超过',
        prop: 'warnRateDayValue',
        labelPosition: "left",
        labelWidth: 70,
        span: 5,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: 'mm/d',
        labelPosition: "left",
        formslot: true,
        span: 2,
      }, {
        label: '红色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleRedValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneRedValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
      {
        label: '橙色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleOrangeValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneOrangeValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
      {
        label: '黄色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleYellowValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneYellowValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
      {
        label: '蓝色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleBlueValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneBlueValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
    ]
  }],
}

export const vDoubleOption = {
  labelWidth: 120,
  resetForm: true,
  submitText: "保存阈值",
  emptyBtn: false,
  group: [{
    label: 'value双控阈值设置',
    display: true,
    arrow: false,
    collapse: true,
    prop: 'group2',
    column: [{
        label: 'value轴单日变化量控制值',
        labelWidth: 160,
        prop: 'warnSumChangeValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: 'value轴变化速率控制值：连续',
        labelWidth: 200,
        prop: 'warnRateDay',
        span: 7,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '天超过',
        prop: 'warnRateDayValue',
        labelPosition: "left",
        labelWidth: 70,
        span: 5,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: 'mm/d',
        labelPosition: "left",
        formslot: true,
        span: 2,
      }, {
        label: '红色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleRedValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneRedValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
      {
        label: '橙色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleOrangeValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneOrangeValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
      {
        label: '黄色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleYellowValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneYellowValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
      {
        label: '蓝色告警：累计变化量、变化速率均超过监控量测控值的',
        labelWidth: 380,
        prop: 'warnDoubleBlueValue',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '%时，或双控指标之一超过监控量测控制值的',
        labelWidth: 320,
        labelPosition: "left",
        prop: 'warnOneBlueValue',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: '%时',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
    ]
  }],
}


export const yYujinOption = {
  labelWidth: 120,
  resetForm: true,
  submitText: "保存阈值",
  emptyBtn: false,
  group: [{
    //   icon:'el-icon-info',
    label: 'Y轴单控阈值设置',
    display: true,
    arrow: false,
    collapse: true,
    prop: 'group',
    column: [{
        label: '相邻告警',
        prop: 'adjacent',
        formslot: true,
        span: 24
      }, {
        label: '红色预警',
        prop: 'warnValueEachRed',
        span: 12,
        rules: [{
          required: true,
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '橙色预警',
        prop: 'warnValueEachOrange',
        span: 12,
        rules: [{
          required: true,
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '黄色预警',
        prop: 'warnValueEachYellow',
        span: 12,
        rules: [{
          required: true,
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '蓝色预警',
        prop: 'warnValueEachBlue',
        span: 12,
        rules: [{
          required: true,
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '累计告警',
        prop: 'cumulative',
        span: 24,
        formslot: true,
      }, {
        label: '红色预警',
        prop: 'warnValueSumRed',
        span: 12,
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      },
      {
        label: '橙色预警',
        prop: 'warnValueSumOrange',
        span: 12,
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '黄色预警',
        prop: 'warnValueSumYellow',
        span: 12,
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '蓝色预警',
        prop: 'warnValueSumBlue',
        span: 12,
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      },
    ]
  }],
}


export const zYujinOption = {
  labelWidth: 120,
  resetForm: true,
  submitText: "保存阈值",
  emptyBtn: false,
  group: [{
    //   icon:'el-icon-info',
    label: 'Z轴单控阈值设置',
    display: true,
    arrow: false,
    collapse: true,
    prop: 'group',
    column: [{
        label: '相邻告警',
        prop: 'adjacent',
        formslot: true,
        span: 24
      }, {
        label: '红色预警',
        prop: 'warnValueEachRed',
        span: 12,
        rules: [{
          required: true,
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '橙色预警',
        prop: 'warnValueEachOrange',
        span: 12,
        rules: [{
          required: true,
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '黄色预警',
        prop: 'warnValueEachYellow',
        span: 12,
        rules: [{
          required: true,
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '蓝色预警',
        prop: 'warnValueEachBlue',
        span: 12,
        rules: [{
          required: true,
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '累计告警',
        prop: 'cumulative',
        span: 24,
        formslot: true,
      }, {
        label: '红色预警',
        prop: 'warnValueSumRed',
        span: 12,
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      },
      {
        label: '橙色预警',
        prop: 'warnValueSumOrange',
        span: 12,
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '黄色预警',
        prop: 'warnValueSumYellow',
        span: 12,
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '蓝色预警',
        prop: 'warnValueSumBlue',
        span: 12,
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      },
    ]
  }],
}

export const vYujinOption = {
  labelWidth: 120,
  resetForm: true,
  submitText: "保存阈值",
  emptyBtn: false,
  group: [{
    //   icon:'el-icon-info',
    label: 'value单控阈值设置',
    display: true,
    arrow: false,
    collapse: true,
    prop: 'group',
    column: [{
        label: '相邻告警',
        prop: 'adjacent',
        formslot: true,
        span: 24
      }, {
        label: '红色预警',
        prop: 'warnValueEachRed',
        span: 12,
        rules: [{
          required: true,
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '橙色预警',
        prop: 'warnValueEachOrange',
        span: 12,
        rules: [{
          required: true,
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '黄色预警',
        prop: 'warnValueEachYellow',
        span: 12,
        rules: [{
          required: true,
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '蓝色预警',
        prop: 'warnValueEachBlue',
        span: 12,
        rules: [{
          required: true,
          pattern: /^-?\d+(\.\d{1,6})?$/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '累计告警',
        prop: 'cumulative',
        span: 24,
        formslot: true,
      }, {
        label: '红色预警',
        prop: 'warnValueSumRed',
        span: 12,
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      },
      {
        label: '橙色预警',
        prop: 'warnValueSumOrange',
        span: 12,
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '黄色预警',
        prop: 'warnValueSumYellow',
        span: 12,
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      }, {
        label: '蓝色预警',
        prop: 'warnValueSumBlue',
        span: 12,
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "blur"
        }]
      },
    ]
  }],
}

// 雨量阈值
export const ylOption = {
  labelWidth: 120,
  resetForm: true,
  submitText: "保存阈值",
  emptyBtn: false,
  group: [{
    //   icon:'el-icon-info',
    label: '滑动雨量累计告警:根据实际监测数据进行预警(单位：mm(毫米))',
    display: true,
    arrow: false,
    collapse: true,
    prop: 'group',
    column: [{
        label: '红色告警：滑动雨量累计值在',
        labelWidth: 280,
        prop: 'redWarnDuringHour',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /^([0-9]|(1[0-9])|(2[0-9])|(3[0-9])|(4[0-9])|(5[0-9])|(6[0-9])|(7[0-2]))$/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '小时内超过',
        labelPosition: "left",
        prop: 'redWarnRainfall',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: 'mm',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
      {
        label: '橙色告警：滑动雨量累计值在',
        labelWidth: 280,
        prop: 'orangeWarnDuringHour',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /^([0-9]|(1[0-9])|(2[0-9])|(3[0-9])|(4[0-9])|(5[0-9])|(6[0-9])|(7[0-2]))$/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '小时内超过',
        labelPosition: "left",
        prop: 'orangeWarnRainfall',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: 'mm',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
      {
        label: '黄色告警：滑动雨量累计值在',
        labelWidth: 280,
        prop: 'yellowWarnDuringHour',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /^([0-9]|(1[0-9])|(2[0-9])|(3[0-9])|(4[0-9])|(5[0-9])|(6[0-9])|(7[0-2]))$/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '小时内超过',
        labelPosition: "left",
        prop: 'yellowWarnRainfall',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: 'mm',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
      {
        label: '蓝色告警：滑动雨量累计值在',
        labelWidth: 280,
        prop: 'blueWarnDuringHour',
        span: 12,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /^([0-9]|(1[0-9])|(2[0-9])|(3[0-9])|(4[0-9])|(5[0-9])|(6[0-9])|(7[0-2]))$/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      },
      {
        label: '小时内超过',
        labelPosition: "left",
        prop: 'blueWarnRainfall',
        span: 10,
        placeholder: " ",
        rules: [{
          required: true,
          pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[\.]{1}[0-9]{1,6}$)/,
          message: "请输入正确的值",
          trigger: "change",
        }]
      }, {
        label: 'mm',
        labelPosition: "left",
        formslot: true,
        span: 2,
      },
    ]
  }],
}

// 数据初值
export const InstallOption = {
  column: [{
      label: 'X轴初始值',
      prop: 'x',
      display: true,
      span: 24,
      maxlength: 20,
    },
    {
      label: 'Y轴初始值',
      prop: 'y',
      display: true,
      span: 24,
      maxlength: 20,
    },
    {
      label: 'Z轴初始值',
      prop: 'z',
      display: true,
      span: 24,
      maxlength: 20,
    },
    {
      label: 'value初始值',
      prop: 'value',
      display: true,
      span: 24,
      maxlength: 20,
    }
  ]
}
