import {
  getStore
} from '@/util/store';

function getProjectId() {
  return window.sessionStorage.getItem('projectId')
};
const DIC = {
  vaild: [{
    label: '绑点',
    value: true
  }, {
    label: '未绑点',
    value: false
  }],
  status: [{
    label: '使用',
    value: 0
  }, {
    label: '损坏',
    value: 1
  }, {
    label: '注销',
    value: 2
  }],
  status1: [{
    label: '在线',
    value: 0
  }, {
    label: '离线',
    value: 1
  }],
  status2: [{
    label: '未使用',
    value: 0
  }, {
    label: '使用',
    value: 1
  }],
  video: [{
    label: '否',
    value: 0
  }, {
    label: '是',
    value: 1
  }],
  times: [{
    label: '日',
    value: 1
  }, {
    label: '月',
    value: 0
  }]
}
export const searchOption = {
  align: 'center',
  menuAlign: 'center',
  labelWidth: 120,
  span: 6,
  submitText: '搜索',
  menuSpan: 4,
  enter: true,
  column: [{
      label: '点位名称',
      prop: 'name',
      // maxlength: 30,
    }, {
      label: '设备编号',
      prop: 'code',
      // maxlength: 16,
    }, {
      label: '设备类型',
      prop: 'type',
      type: 'select',
      slot: true,
      dicUrl: './admin/dict/type/device_type',
    }, {
      label: '传感器类型',
      prop: "sensorType",
      type: "select",
      multiple: true,
      slot: true,
      dicUrl: '/admin/dict/types?types=sensor_type',
      dicFormatter: res => {
        return res.data.sensor_type
      },
    }, {
      label: '设备厂商',
      prop: 'factoryId',
      type: 'select',
      slot: true,
      dicUrl: '/device/viewfactory/page?size=-1',
      props: {
        label: "name",
        value: 'id'
      },
      dicFormatter: res => {
        return res.data.records
      },
    },
    {
      label: '设备状态',
      type: 'select',
      prop: 'status',
      dicData: DIC.status1,
    },
    {
      label: '使用状态',
      type: 'select',
      prop: 'useStatus',
      formslot: true,
      dicData: DIC.status,
    }, {
      label: '监测点名称',
      prop: 'disasterName',
      // maxlength: 16,
    }, {
      label: '所属项目',
      prop: 'subprojectId',
      formslot: true,
    }, {
      label: '行政区域',
      prop: 'cascader',
      type: "cascader",
      // hide: true,
      checkStrictly: true, //可选任意级
      emitPath: false,
      slot: true,
      // rules: [{
      //   message: "请选择行政区域",
      //   trigger: 'blur'
      // }],
      props: {
        label: 'name',
        value: 'code'
      },
    }, {
      label: '安装位置',
      prop: 'location',
    }, {
      label: '创建时间',
      prop: "daterange",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '日期开始',
      endPlaceholder: '日期结束',
    },
  ]
}
// table
export const tableOption = {
  align: 'center',
  menuAlign: 'center',
  clearable: false,
  labelWidth: 130,
  menuWidth: 300,
  selection: true,
  searchSize: 'mini',
  reserveSelection: true,
  // excelBtn:true,
  delBtn: false,
  addBtn: false,
  editBtn: false,
  border: true,
  column: [{
      label: '点位名称',
      sortable: true,
      prop: 'name',
      minWidth: 100,
      maxlength: 30,
      fixed: true,
      rules: [{
        required: true,
        message: "请输入设备名称",
        trigger: "blur"
      }],
    }, {
      label: '设备编号',
      prop: 'code',
      minWidth: 150,
      formslot: true,
      // maxlength: 16,
      fixed: true,
      rules: [{
        required: true,
        message: "请输入设备编号",
        trigger: "blur"
      }, ]
    }, {
      label: '设备类型',
      fixed: true,
      prop: 'type',
      showWordLimit: true,
      overHidden: true,
      type: 'select',
      rules: [{
        required: true,
        message: "请选择设备类型",
        trigger: "change"
      }],
      // overHidden: true,
      // formslot: true,
      dicUrl: '/admin/dict/type/device_type',
      change: ({
        value,
        column
      }) => {
        if (value == 6) {
          tableOption.column.map(v => {
            if (v.prop == 'info') {
              v.display = false
            }
          })
          tableOption.column.map(v => {
            if (v.prop == 'videoPassage' || v.prop == 'videoSerial' || v.prop == 'videoOperable' || v.prop == 'videoMonitorAddress' || v.prop == 'videoAppkey' || v.prop == 'videoAppsecret' || v.prop == 'videoPlayAddress' || v.prop == 'locationRemark') {
              v.display = true
            }
          })
        } else {
          tableOption.column.map(v => {
            if (v.prop == 'info') {
              v.display = true
            }
          })
          tableOption.column.map(v => {
            if (v.prop == 'videoPassage' || v.prop == 'videoSerial' || v.prop == 'videoOperable' || v.prop == 'videoMonitorAddress' || v.prop == 'videoAppkey' || v.prop == 'videoAppsecret' || v.prop == 'videoPlayAddress' || v.prop == 'locationRemark') {
              v.display = false
            }
          })
        }
        if (value == 'bjq_001' || value == 'cjz_001' || value == 'gnssjzz_001') {
          tableOption.column.map(v => {
            if (v.prop == 'info') {
              v.display = false
            }
          })
        }
      }
    }, {
      label: '传感器类型',
      minWidth: 180,
      fixed: true,
      prop: "sensorType",
      type: "select",
      // overHidden: true,
      multiple: true,
      addDisplay: false,
      editDisplay: false,
      dicUrl: '/admin/dict/types?types=sensor_type',
      dicFormatter: res => {
        return res.data.sensor_type
      },
      rules: [{
        required: true,
        message: "请选择传感器类型",
        trigger: "change"
      }],
    },
    {
      label: '设备状态',
      type: 'select',
      prop: 'status',
      fixed: true,
      dicData: DIC.status1,
      addDisplay: false,
      // startPlaceholder: '全部',
      editDisplay: false,
    },

    {
      label: '设备厂商',
      prop: 'factoryId',
      minWidth: 130,
      type: 'select',
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
      }],
      // hide: true,
    }, {
      label: '使用状态',
      fixed: true,
      type: 'select',
      prop: 'useStatus',
      dicData: DIC.status,
    },
    {
      label: '监测点名称',
      prop: 'disasterName',
      type: 'select',
      minWidth: 120,
      slot: true,
      filterable: true,
      props: {
        label: "monitorName",
        value: "monitorCode",
      },
      filters: true,
      // dicUrl: `/monitor_base_info/page?projectId=${getProjectId()}`,
      // dicFormatter: res => {
      //   return res.data.records;
      // },
      rules: [{
        required: true,
        message: "请选择监测点名称",
        trigger: "change"
      }],
      cascaderItem: ["disasterId"], //关联
    },
    {
      label: '全市统一编号',
      prop: 'disasterId',
      type: 'select',
      disabled: true,
      addDisplay: false,
      editDisplay: false,
      hide: true,
      props: {
        label: "id",
        value: "id",
      },
      cascaderIndex: 0,
      dicUrl: `/monitor_base_info/getMonitorInfoByCode?projectId=${getProjectId()}&monitorCode={{key}}`,
      cascaderItem: ["disasterId"], //关联
      dicFormatter: res => {
        let arr = []
        arr.push(res.data)
        return arr
      },
    }, {
      label: '行政区域',
      prop: 'cascader',
      minWidth: 200,
      showWordLimit: true,
      overHidden: true,
      slot: true,
      disabled: false,
      props: {
        label: 'name',
        value: 'code'
      },
      cascaderItem: ["location"],
    },
    {
      label: '安装位置',
      prop: 'location',
      showWordLimit: true,
      overHidden: true,
      minWidth: 200,
    }, {
      label: '经度',
      prop: 'longitude',
      hide: true,
      rules: [{
        required: true,
        pattern: /^[\-\+]?(0(\.\d{1,99})?|([1-9](\d)?)(\.\d{1,99})?|1[0-7]\d{1}(\.\d{1,99})?|180\.0{1,99})$/,
        message: '请输入正确的经度',
        trigger: 'blur'
      }],
    }, {
      label: '纬度',
      prop: 'latitude',
      hide: true,
      rules: [{
        required: true,
        pattern: /^[\-\+]?((0|([1-8]\d?))(\.\d{1,99})?|90(\.0{1,99})?)$/,
        message: '请输入正确的纬度',
        trigger: 'blur'
      }]
    }, {
      label: '安装时间',
      prop: 'installationTime',
      hide: true,
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      type: "datetime",
    }, {
      label: '创建时间',
      minWidth: 180,
      prop: 'createTime',
      addDisplay: false,
      editDisplay: false,
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      type: "dateTime",
    }, {
      label: 'MARK值',
      prop: 'mark',
      hide: true,
      placeholder: '主滑方向与正北的夹角',
    },
    {
      label: '所属项目',
      prop: 'subprojectId',
      hide: true,
      formslot: true,
      type: 'select',
    },
    {
      label: '所属项目',
      showWordLimit: true,
      overHidden: true,
      prop: 'subProjectName',
      display: false,
    },
    // {
    //     label: '接入平台',
    //     prop: 'platform',
    //     hide: true,
    //     display: false,
    // },
    // {
    //   label: '通信协议',
    //   prop: 'registerAgreement',
    //   hide: true,
    //   display: true,
    //   type: 'select',
    //   dicData: [{
    //       label: "NB-Iot",
    //       value: 0
    //     }, {
    //       label: 'MQTT',
    //       value: 1,
    //     }, {
    //       label: 'HTTP',
    //       value: 2,
    //     },
    //     {
    //       label: 'TCP',
    //       value: 3,
    //     }
    //   ]
    // },
    {
      label: '传感器',
      prop: 'info',
      span: 24,
      tags: true,
      display: true,
      hide: true,
      formslot: true,
    }, {
      label: '通道',
      prop: 'videoPassage',
      hide: true,
      display: false,
      rules: [{
        required: true,
        message: "请输入通道",
        trigger: "blur"
      }]
    }, {
      label: '序列号',
      prop: 'videoSerial',
      hide: true,
      display: false,
      rules: [{
        required: true,
        message: "请输入序列号",
        trigger: "blur"
      }]
    }, {
      label: '是否旋转',
      prop: 'videoOperable',
      type: 'select',
      dicData: DIC.video,
      hide: true,
      display: false,
      rules: [{
        required: true,
        message: "请选择是否旋转",
        trigger: "blur"
      }]
    }, {
      label: '监控地址',
      prop: 'videoMonitorAddress',
      hide: true,
      span: 24,
      display: false,
      rules: [{
        required: true,
        message: "请输入监控地址",
        trigger: "blur"
      }]
    }, {
      label: 'appkey(用户名)',
      prop: 'videoAppkey',
      hide: true,
      span: 24,
      display: false,
      rules: [{
        required: true,
        message: "请输入IP",
        trigger: "blur"
      }]
    }, {
      label: 'secret(密码)',
      prop: 'videoAppsecret',
      span: 24,
      hide: true,
      display: false,
      rules: [{
        required: true,
        message: "请输入账号",
        trigger: "blur"
      }]
    }, {
      label: '播放地址(IP:port)',
      prop: 'videoPlayAddress',
      span: 24,
      hide: true,
      display: false,
      rules: [{
        required: true,
        message: "请输入播放地址",
        trigger: "blur"
      }]
    },
    {
      label: '图片地址',
      prop: 'locationRemark',
      span: 24,
      hide: true,
      display: false,
      rules: [{
        // required: true,
        message: "请输入图片地址",
        trigger: "blur"
      }]
    },
    {
      label: '播放地址(备用)',
      prop: 'videoM3u8',
      span: 24,
      hide: true,
      display: false,
      rules: [{
        required: true,
        message: "请输入播放地址",
        trigger: "blur"
      }]
    }, {
      label: '离线时长设置',
      prop: 'offlineDuration',
      // tags: true,
      // display: true,
      value: 120,
      span: 16,
      hide: true,
      formslot: true,
      rules: [{
        required: true,
        message: "请输入离线时长设置",
        trigger: "blur"
      }]
    },

  ]
}

// 传感器
export const infoOption = {
  align: 'center',
  menuAlign: 'center',
  menu: true,
  refreshBtn: false,
  columnBtn: false,
  // excelBtn: true,
  // menuTxet:'修改记录',
  searchLabelWidth: 120,
  searchSpan: 6,
  labelWidth: 120,
  selection: true,
  searchMenuSpan: 4,
  delBtn: false,
  addBtn: false,
  editBtn: false,
  cellBtn: false,
  // tip: false,
  border: true,
  column: [{
      label: '传感器类型',
      prop: "type",
      type: "select",
      props: {
        label: "label",
        value: 'dictValue'
      },
      disabled: false,
      dicUrl: '/admin/dict/types?types=sensor_type',
      dicFormatter: res => {
        return res.data.sensor_type
      },
      rules: [{
        required: true,
        message: "请选择传感器类型",
        trigger: "change"
      }],
      cascaderItem: ["sensorCode"], //关联
    }, {
      label: '传感器编号',
      prop: 'sensorCode',
      type: 'select',
      props: {
        label: "sensorCode",
        value: 'sensorCode'
      },
      disabled: false,
      rules: [{
        required: true,
        message: "请选择传感器编号",
        trigger: "change"
      }],
      dicUrl: `/device/viewsensor/sensorListByAddDevice?projectId=${getProjectId()}&size=-1&type={{key}}`,
      dicFormatter: res => {
        return res.data.records;
      },
      cascaderItem: ["sensorId"],
    },
    {
      label: '',
      prop: 'sensorId',
      type: 'select',
      props: {
        label: "sensorId",
        value: 'sensorId'
      },
      dicUrl: `/device/viewsensor/page?projectId=${window.sessionStorage.getItem('projectId')}&sensorCode={{key}}`,
      hide: true,
      addDisplay: false,
      editDisplay: false,
      cascaderIndex: 0, //默认选择0
      dicFormatter: res => {
        return res.data.records;
      },
      // cascaderItem: ["dataUnit"],
    },
    // ,
    // {
    //   label: '数据单位',
    //   prop: 'dataUnit',
    //   type: "select",
    //   placeholder: '数据单位',
    //   placeholder: '不可填写',
    //   dicUrl: '/device/viewsensor/page?id={{key}}',
    //   props: {
    //     label: "dataUnit",
    //     value: 'dataUnit'
    //   },
    //   addDisabled: true,
    //   editDisabled: true,
    //   cascaderIndex: 0, //默认选择0
    //   dicFormatter: res => {
    //     return res.data.records;
    //   },
    // }
    {
      label: "精度",
      prop: "accuracy",
      cell: true,
      rules: [{
        required: true,
        message: "请选择精度",
        trigger: "blur"
      }],
      cell: true,
      type: "select",
      // dicUrl: "/device/professionaldeviceinfo/find_by_deviceNo",
      dicData: [{
          label: "0",
          value: 0
        },
        {
          label: "0.0",
          value: 1
        },
        {
          label: "0.00",
          value: 2
        },
        {
          label: "0.000",
          value: 3
        },
      ],
    }, {
      label: '状态',
      type: 'select',
      cell: true,
      prop: 'state',
      headerslot: true,
      dicData: DIC.status2,
    }

  ]
}


//
export const logOption = {
  index: true,
  indexLabel: '序号',
  menu: false,
  addBtn: false,
  align: 'center',
  labelWidth: 120,
  editBtn: false,
  border: true,
  column: [{
      label: '旧设备编号',
      prop: "oldDeviceNo",
    }, {
      label: '新设备编号',
      prop: 'newDeviceNo',
    },
    {
      label: '操作时间',
      prop: 'createTime',
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      type: "datetime",
    },
    {
      label: '操作人',
      prop: 'oprName',
    },
  ]
}
export const logSearchOption = {
  align: 'center',
  menuAlign: 'center',
  // labelWidth: 120,
  submitText: '搜索',
  // menuSpan: 4,
  enter: true,
  column: [{
    label: '设备编号',
    placeholder: '请输入现/原设备编号',
    prop: "deviceNo",
    span: 7
  }, {
    label: '操作时间',
    prop: 'ationTime',
    type: "daterange",
    span: 10,
    format: 'yyyy-MM-dd HH:mm:ss',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
  }, {
    label: '操作人',
    prop: 'oprName',
    span: 7
  }]
}
export const treeOption = {
  defaultExpandAll: true,
  menu: false,
  filter: true,
  filterText: "请输入点位名称或设备编号",
  addBtn: false,
}
export const curveOption = {
  labelWidth: 0,
  submitBtn: false,
  emptyBtn: false,
  column: [
    //     {
    //     label: "",
    //     prop: "type",
    //     type: "select",
    //     dicData: DIC.types,
    //     span: 4,
    //     mock: {
    //         type: 'dic',
    //     }
    // },
    {
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
    }
  ]
}


export const recordOption = {
  border: true,
  stripe: true,
  // selection: true,
  menuAlign: 'center',
  index: true,
  indexLabel: '序号',
  searchSpan: 6,
  searchMenuSpan: 4,
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  menu: false,
  dialogClickModal: false,
  column: [{
      label: '设备编号',
      prop: 'deviceSn',
      search: true,
    }, {
      label: '设备名称',
      prop: 'deviceName',
      search: true,
    },
    {
      label: '指令类型',
      prop: 'title',
      search: true,
      type: 'select',
      dicData: [{
        label: "下发指令-内容下发",
        value: "下发指令-内容下发"
      }, {
        label: '下发指令-采样间隔',
        value: "下发指令-采样间隔",
      }, {
        label: '下发指令-上报间隔',
        value: "下发指令-上报间隔",
      }]
    },
    {
      label: '指令下发内容',
      prop: "body",
    },

    {
      label: '下发时间',
      search: true,
      type: 'datetimerange',
      prop: 'createTime',
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      span: 12,
      row: true,
    },
  ]
}

// 修改记录
export const writeOption = {
  align: 'center',
  menuAlign: 'center',
  clearable: false,
  labelWidth: 120,
  refreshBtn: false,
  columnBtn: false,
  // menuWidth:100,
  menu: false,
  selection: false,
  reserveSelection: true,
  delBtn: false,
  addBtn: false,
  editBtn: false,
  index: true,
  indexLabel: '序号',
  border: true,
  column: [{
    label: '操作时间',
    prop: 'operatorTime',
    format: 'yyyy-MM-dd HH:mm:ss',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    type: 'datetime',
    searchSpan: 12,
    searchRange: true,
    search: true
  }, {
    label: '操作者',
    prop: 'operator',
    search: true
  }, {
    label: '操作描述',
    prop: "operationDescribe",
  }]
}
