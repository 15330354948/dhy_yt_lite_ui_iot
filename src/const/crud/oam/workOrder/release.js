var DIC = {
  Overdue: [{
    label: '正常',
    value: '0'
  }, {
    label: '已逾期',
    value: '1'
  }],
};
var validatePass = (rule, value, callback) => {
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
  align: 'center',
  menuAlign: 'center',
  menuWidth: 200,
  selection: true,
  searchSize: 'mini',
  reserveSelection: true,
  border: true,
  index: true,
  editBtn: false,
  addBtn: false,
  delBtn: false,
  indexLabel: '序号',
  searchMenuSpan: 6,
  labelWidth: 130,
  searchLabelWidth: 100,
  column: [{
      label: '工单编号',
      prop: 'code',
      rules: [{
        required: true,
        message: "请输入工单编号",
        trigger: "blur"
      }],
      overHidden: true,
      addDisplay: false,
      editDisplay: false,
      search: true,
      order: 1
    }, {
      label: '工单标题',
      prop: 'title',
      rules: [{
        required: true,
        message: "请输入工单标题",
        trigger: "blur"
      }],
      overHidden: true,
      search: true,
      order: 1
    },
    {
      label: '监测点名称',
      prop: 'monitorName',
      search: true,
      overHidden: true,
      addDisplay: false,
      editDisplay: false,
    }, {
      label: '关联监测点',
      prop: 'monitorId',
      hide: true,
      slot: true,
      rules: [{
        required: true,
        message: "请选择监测点",
        trigger: "blur"
      }],
      // addDisplay:false,
      // editDisplay:false,
    }, {
      label: '设备编号',
      prop: 'deviceId',
      hide: true,
      slot: true,
      rules: [{
        required: true,
        message: "请选择设备编号",
        trigger: "blur"
      }],
    }, {
      label: '设备编号',
      prop: 'deviceCode',
      search: true,
      overHidden: true,
      addDisplay: false,
      editDisplay: false,
    }, {
      label: '设备类型',
      prop: 'deviceType',
      disabled: true,
      search: true,
      overHidden: true,
      type: 'select',
      dicUrl: '/admin/dict/type/device_type',
    },{
      label: '负责人员',
      prop: 'chargePersonId',
      hide: true,
      type: 'select',
      slot: true,
      rules: [{
        required: true,
        message: "请选择设备类型",
        trigger: "change"
      }],
    }, {
      label: '负责人员',
      prop: 'chargePersonName',
      search: true,
      addDisplay: false,
      editDisplay: false,
    },
    {
      label: '参与人员',
      prop: 'joinPersonId',
      type: 'tree',
      slot: true,
      rules: [{
        required: true,
        message: "请选择参与人员",
        trigger: "change"
      }],
      filterable: true,
      multiple: true,
      // dicUrl: '/admin/dict/type/device_type',
      hide: true
    }, {
      label: '工单状态',
      prop: 'faultState',
      type: 'select',
      dicUrl: '/admin/dict/type/order_type',
      search: true,
      slot: true,
      addDisplay: false,
      editDisplay: false,
    }, {
      label: '紧急程度',
      prop: 'urgencyDegree',
      type: 'radio',
      span: 24,
      button: true,
      search: true,
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
    },
    //  {
    //   label: '故障原因',
    //   prop: 'faultReason',
    //   type: 'select',
    //   dicUrl: '/admin/dict/type/cause_of_failure',
    //   search: true,
    //   addDisplay: false,
    //   editDisplay: false,
    // },
    {
      label: '是否逾期',
      prop: 'isOverdue',
      type: 'select',
      slot: true,
      dicData: DIC.Overdue,
      addDisplay: false,
      editDisplay: false,
      search: true,
      mock: {
        type: 'dic',
      },
    },
    {
      label: '期望完成时间',
      prop: 'expectCompleteTime',
      type: "datetime",
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      searchRange: true,
      overHidden: true,
      rules: [{
        required: true,
        validator: validatePass,
        trigger: "blur"
      }],
      search: true,
      order: 10,
    },
    {
      label: '创建时间',
      prop: 'createTime',
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      type: "datetime",
      overHidden: true,
      searchRange: true,
      search: true,
      addDisplay: false,
      editDisplay: false,
      order: 11
    }, {
      label: '提醒方式',
      prop: 'msgMode',
      span: 24,
      type: 'radio',
      border: true,
      dicData: [{
        label: '短信通知',
        value: 1
      }, ],
      hide: true,
    }, {
      label: '工单描述',
      prop: 'remark',
      type: 'textarea',
      span: 24,
      rules: [{
        required: true,
        message: "请填写工单描述",
        trigger: "blur"
      }],
      hide: true,
    }, {
      label: '上传附件',
      prop: 'files',
      type: 'upload',
      span: 24,
      row: true,
      formslot: true,
      hide: true,
    },
  ]
}
