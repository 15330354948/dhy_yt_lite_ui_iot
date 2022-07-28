var DIC = {
  VAILD: [{
    label: '是',
    value: 'true'
  }, {
    label: '否',
    value: 'false'
  }],
  SEX: [{
    label: '男',
    value: 0
  }, {
    label: '女',
    value: 1
  }]
}

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  labelWidth: 180,
  stripe: true,
  // selection: true,
  menuAlign: 'center',
  searchMenuSpan: 6,
  searchLabelWidth: 100,
  reserveSelection: false,
  selectClearBtn: false,
  showClomnuBtn: false,
  refreshBtn: false,
  columnBtn: false,
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  dialogClickModal: false,
  column: [{
      label: '预警编号',
      prop: 'disasterBatchNo',
      search: true,
    }, {
      label: '街道',
      prop: 'streetCode',
      hide: true,
      // search: true,
      span: 12,
      type: "select",
      dicData: [],
      props: {
        label: "name",
        value: "id",
      },
      dicUrl: "/area/parentId/440308",
      cascaderItem: ["communityCode"], //关联
      dicFormatter: res => {
        return res.data;
      },
      display: true,
    }, {
      display: false,
      label: '街道',
      prop: 'streetName',
    }, {
      label: '社区',
      prop: 'communityCode',
      hide: true,
      // search: true,
      span: 12,
      type: "select",
      dicData: [],
      props: {
        label: "name",
        value: "id",
      },
      dicUrl: "/area/parentId/{{key}}",
      dicFormatter: res => {
        return res.data;
      }
    }, {
      display: false,
      label: '社区',
      prop: 'communityName',
    }, {
      label: '监测点编号',
      prop: 'disasterNo',
      search: true,
    },
    {
      label: '监测点名称',
      prop: 'disasterName',
      search: true,
    },
    {
      label: '监测点位置',
      prop: 'location',
      search: true,
    }, 
    // {
    //   label: '处置状态',
    //   prop: 'disposeStatus',
    //   type: 'select',
    //   search: true,
    //   dicData: [{
    //     label: '处置中',
    //     value: 1
    //   }, {
    //     label: '已处置',
    //     value: 2,
    //   }]
    // },
    {
      label: '首次告警等级',
      prop: 'firstLevel',
      type: 'select',
      dicData: [{
        label: '红色告警',
        value: 4
      }, {
        label: '橙色告警',
        value: 3,
      }, {
        label: '黄色告警',
        value: 2,
      }, {
        label: '蓝色告警',
        value: 1,
      },
      {
        label: '无预警',
        value: 0,
      }]
    },
    {
      label: '当前告警等级',
      prop: 'amendLevel',
      type: 'select',
      hide: false,
      search: false,
      dicData: [{
          label: '红色告警',
          value: 4
        }, {
          label: '橙色告警',
          value: 3,
        }, {
          label: '黄色告警',
          value: 2,
        }, {
          label: '蓝色告警',
          value: 1,
        },
        {
          label: '无预警',
          value: 0,
        }
      ]
    // }, {
    //   label: '最高告警等级',
    //   prop: 'highestLevel',
    //   type: 'select',
    //   hide: false,
    //   search: true,
    //   dicData: [{
    //       label: '红色告警',
    //       value: 4
    //     }, {
    //       label: '橙色告警',
    //       value: 3,
    //     }, {
    //       label: '黄色告警',
    //       value: 2,
    //     }, {
    //       label: '蓝色告警',
    //       value: 1,
    //     },
    //     {
    //       label: '无预警',
    //       value: 0,
    //     }
    //   ]
    }, {
      width: 220,
      label: '最新告警时间',
      prop: 'time',
      type: 'datetime',
      // type: 'datetimerange',
      dateDefault: true,
      // format: 'yyyy-MM-dd HH:mm:ss', // 这是组件展示的日期格式
      // valueFormat: 'yyyy-MM-dd HH:mm:ss', // 这是组件value值的格式
      searchSpan: 12,
      searchRange: true,
      search: true,
      searchClearable: false,
      pickerOptions: {
        //时间范围限制
        disabledDate(time) {
          var times = Date.now() - 24 * 60 * 60 * 1000;
          return time.getTime() > times;
        },
      },
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
  menu: true,
  dialogClickModal: false,
  column: [{
      label: '设备编号',
      prop: 'deviceNo',
      search: true,
    }, {
      label: '设备名称',
      prop: 'deviceName',
      search: true,
    },
    {
      label: '设备类型',
      prop: 'deviceType',
      // search: true,
      type: 'select',
      overHidden: true,
      dicUrl: './admin/dict/type/device_type',
    },
    {
      label: '传感器类型',
      prop: "sensorType",
      type: "select",
      multiple: true,
      dicUrl: '/admin/dict/types?types=sensor_type',
      dicFormatter: res => {
        return res.data.sensor_type
      },
    },
    {
      label: '告警类型',
      prop: 'warnType',
      type: 'select',
      search: true,
      dicData: [
        { label: "累计告警", value: "leiji" },
        { label: "相邻告警", value: "xianglin" }
      ]
    }, {
      label: '告警等级',
      prop: 'warnLevel',
      type: 'select',
      search: true,
      dicData: [{
          label: "红色告警",
          value: "4",
        },
        {
          label: "橙色告警",
          value: "3",
        }, {
          label: "黄色告警",
          value: "2",
        },
        {
          label: "蓝色告警",
          value: "1",
        }, {
          label: '无告警',
          value: "0",
        }
      ]
    },
    // {
    //   label: '告警内容',
    //   // width: 320,
    //   prop: 'warnInfo'
    // },
    // {
    //   label: '告警类型',
    //   prop: 'warnType',
    //   type: 'select',
    //   search: true,
    //   dicData: [{
    //       label: "累计告警",
    //       value: "1",
    //     },
    //     {
    //       label: "相邻告警",
    //       value: "2",
    //     },
    //   ]
    // },
    // {
    //   label: '监测数据',
    //   prop: 'warnMsg',
    //   // prop: 'measuredData',
    //   overHidden:true,
    //   // search: true,
    // },
    {
      label: '维度',
      prop: 'attr',
      overHidden:true,
    },
    {
      label: '监测值',
      prop: 'monitorValue',
      overHidden:true,
    },
    {
      label: '阈值',
      prop: 'threshold',
      overHidden:true,
    },
    {
      label: '告警时间',
      prop: 'createTime',
      type: 'datetime',
      dateDefault: true,
      valueFormat: 'yyyy-MM-dd HH:mm:ss', // 这是组件value值的格式
      searchSpan: 12,
      searchRange: true,
      search: true,
      searchClearable: false,
    },
  ]
}


export const macroOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  labelWidth: 80,
  stripe: true,
  // selection: true,
  menuAlign: 'center',
  searchMenuSpan: 6,
  // reserveSelection: false,
  selectClearBtn: false,
  showClomnuBtn: false,
  refreshBtn: false,
  columnBtn: false,
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  menu: false,
  dialogClickModal: false,
  column: [{
      label: '群测群防人员',
      prop: 'username',
      search: true,
    },
    {
      label: '告警等级',
      prop: 'warnLevel',
      type: 'select',
      search: true,
      dicData: [{
        label: '红色告警',
        value: 4
      }, {
        label: '橙色告警',
        value: 3,
      }, {
        label: '黄色告警',
        value: 2,
      }, {
        label: '蓝色告警',
        value: 1,
      }, {
        label: '正常',
        value: 0,
      }]
    },
    {
      label: '宏观现象',
      prop: 'macroInfo',
      width: 500,
    },

    {
      label: '告警时间',
      prop: 'createTime',
      type: 'datetimerange',
      dateDefault: true,
      valueFormat: 'yyyy-MM-dd HH:mm:ss', // 这是组件value值的格式
      searchSpan: 12,
      searchRange: true,
      search: true,
      searchClearable: false,
    },
  ]
}

export const editOption = {
  submitBtn: true,
  emptyBtn: true,
  column: [{
      label: '红色预警',
      prop: 'redLevel',
      type: "textarea",
      span: 24,
    },
    {
      label: '橙色预警',
      prop: 'orangeLevel',
      type: "textarea",
      span: 24,
    },
    {
      label: '黄色预警',
      prop: 'yellowLevel',
      type: "textarea",
      span: 24,
    },
    {
      label: '蓝色预警',
      prop: 'blueLevel',
      type: "textarea",
      span: 24,
    },
  ]
}
