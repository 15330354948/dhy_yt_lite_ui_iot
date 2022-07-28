export const errorDataOption = {
    labelWidth: 120,
    resetForm: true,
    emptyBtn: false,
    column: [
     {
      label: '汛前',
      prop: 'range',
      formslot: true,
      span: 24
    }, {
      hide: true,
      label: '上报频率',
      prop: 'xGreater',
      formslot: true,
      span: 12,
      display: true,
    }, {
      label: '',
      prop: 'xLess',
      formslot: true,
      span: 12,
      display: true,
    }, {
      label: "时间周期",
      prop: "yGreater",
      type: "daterange",
      startPlaceholder: '日期开始范围自定义',
      endPlaceholder: '日期结束范围自定义',
  },
  {
      label: '汛中',
      prop: 'range1',
      formslot: true,
      span: 24
    },  {
      label: '上报频率',
      prop: 'zGreater',
      formslot: true,
      display: true
    }, {
      label: '',
      prop: 'zLess',
      formslot: true,
      display: true,
    },
    {
      label: "时间周期",
      prop: "Sttiem",
      type: "daterange",
      startPlaceholder: '日期开始范围自定义',
      endPlaceholder: '日期结束范围自定义',
  },
  {
      label: '汛后',
      prop: 'range2',
      formslot: true,
      span: 24
    },
    {
      label: '上报频率',
      prop: 'fGreater',
      formslot: true,
      display: true
    }, {
      label: '',
      prop: 'yLess',
      formslot: true,
      display: true,
    },
    {
      label: "时间周期",
      prop: "timeFrame",
      type: "daterange",
      startPlaceholder: '日期开始范围自定义',
      endPlaceholder: '日期结束范围自定义',
  },
  {
      label: '巡检',
      prop: 'Inspection',
      formslot: true,
      span: 24
    },
    {
      label: '上报频率',
      prop: 'dGreater',
      formslot: true,
      display: true
    }, {
      label: '',
      prop: 'dLess',
      formslot: true,
      display: true,
    }]
  }