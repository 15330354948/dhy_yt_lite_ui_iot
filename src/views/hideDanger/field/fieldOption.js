import {
  hasSpace,
  isNum,
  isInteger,
  validatePhoneNum
} from '@/util/validate'
import {
  queryLatAndLon
} from "@/api/hideDanger/obj";
export const fieldOption = {
  emptyBtn: false,
  submitBtn: false,
  labelWidth: 200,
  // readonly:true,
  disabled: true,

  column: [{
      label: "监测点编号",
      prop: "monitorCode",
      span: 12,
      rules: [{
        required: true,
        message: "请输入监测点编号",
        trigger: 'blur'
      }],
      disabled: true
    },
    {
      label: "监测点名称",
      prop: "monitorName",
      span: 12,
      rules: [{
        required: true,
        message: "请输入监测点名称",
        trigger: 'blur'
      }]
    },

    {
      label: '行政区划',
      prop: 'cascader',
      type: "cascader",
      checkStrictly: true, //可选任意级
      emitPath: false,
      formslot: true,
      rules: [{
        required: true,
        message: "请选择行政区划",
        trigger: 'blur'
      }],
      props: {
        label: 'name',
        value: 'code'
      },
    },
    // {
    //   label: "省",
    //   prop: "province",
    //   span: 12,
    //   props: {
    //     label: "name",
    //     value: "code",
    //   },
    //   rules: [{
    //     required: true,
    //     message: "请选择省",
    //     trigger: "change"
    //   }],
    //   type:'select',
    //   // placeholder: '洱源县',
    //   // disabled: true,
    //   dicUrl:'/area/parentId/0',
    //   cascaderItem: ["city","county","streetCode","communityCode"], //关联
    //   hide: true,
    //   dicFormatter: res => {
    //     return res.data
    //   },
    // },

    // {
    //   label: "市",
    //   prop: "city",//county provinceName
    //   span: 12,
    //   props: {
    //     label: "name",
    //     value: "code",
    //   },
    //   rules: [{
    //     required: true,
    //     message: "请选择市",
    //     trigger: "change"
    //   }],
    //   type:'select',
    //   // placeholder: '洱源县',
    //   // disabled: true,
    //   cascaderItem: ["county","streetCode","communityCode"], //关联
    //   dicUrl:'/area/parentId/{{key}}',
    //   hide: true,
    //   dicFormatter: res => {
    //     return res.data
    //   },
    // },
    // {
    //   label: "区/县",
    //   prop: "county",//county provinceName
    //   span: 12,
    //   props: {
    //     label: "name",
    //     value: "code",
    //   },
    //   rules: [{
    //     required: true,
    //     message: "请选择区/县",
    //     trigger: "change"
    //   }],
    //   cascaderItem: ["streetCode","communityCode"], //关联
    //   type:'select',
    //   // placeholder: '洱源县',
    //   // disabled: true,
    //   dicUrl:'/area/parentId/{{key}}',
    //   hide: true,
    //   dicFormatter: res => {
    //     return res.data
    //   },
    // },
    // {
    //   label: '街道',
    //   prop: 'streetCode',
    //   type: 'select',
    //   span: 12,
    //   hide: true,
    //   props: {
    //     label: "name",
    //     value: "code",
    //   },
    //   rules: [{
    //     required: true,
    //     message: "请选择街道",
    //     trigger: "change"
    //   }],
    //   dicUrl: "/area/parentId/{{key}}",
    //   cascaderItem: ["communityCode"], //关联
    //   dicFormatter: res => {
    //     return res.data;
    //   },
    // },
    //  {
    //   display:false,
    //   label: '街道',
    //   prop: 'streetName',
    // }, 
    // {
    //   label: '社区',
    //   prop: 'communityCode',
    //   type: 'select',
    //   span: 12,
    //   hide: true,
    //   props: {
    //     label: "name",
    //     value: "code",
    //   },
    //   rules: [{
    //     required: true,
    //     message: "请选择社区",
    //     trigger: "change"
    //   }],
    //   // cascaderItem: ["ccc"], //关联
    //   dicUrl: "/area/parentId/{{key}}",
    //   dicFormatter: res => {
    //     return res.data;
    //   },
    // },
    // {
    //   label: '社区12',
    //   prop: 'ccc',
    //   // type: 'select',
    //   span: 12,
    //   props: {
    //     label: "code",
    //     value: "code",
    //   },
    //   hide:true,
    //     disabled:true,
    //   addDisplay: false,
    //   editDisplay: false,
    //   viewDisplay:false,
    //   dicUrl: "/area/{{key}}",
    //   dicFormatter: res => {
    //     return res.data;
    //   },
    // },
    // {
    //   label: "行政区",
    //   prop: "provinceName",//county
    //   span: 12,
    //   placeholder:'罗湖区',
    //   disabled:true
    // },
    // {
    //   label: "图幅号",
    //   prop: "mapCode",
    //   span: 12,
    //   hide: true,
    //   rules: [
    //     // {validator:isNum,trigger:'blur'}
    //     {
    //       required: true,
    //       message: "请输入图幅号",
    //       // pattern: /^\.+|[^\d.]/,
    //       trigger: 'blur'
    //     }
    //   ]
    // },
    // {
    //   // display:false,
    //   label: '社区',
    //   prop: 'communityName',
    //   span: 12,
    //   display: false
    // },
    {
      label: "地理位置",
      prop: "location",
      span: 12,
      rules: [{
        required: true,
        message: "请输入地理位置",
        trigger: 'blur'
      }]
    },
    {
      label: "经度",
      prop: "longitude",
      span: 12,
      formslot: true,
      rules: [{
        required: true,
        pattern: /^[\-\+]?(0(\.\d{1,99})?|([1-9](\d)?)(\.\d{1,99})?|1[0-7]\d{1}(\.\d{1,99})?|180\.0{1,99})$/,
        message: '请输入正确的经度',
        trigger: 'blur'
      }],
    },
    {
      label: "纬度",
      prop: "latitude",
      span: 12,
      rules: [{
        required: true,
        pattern: /^[\-\+]?((0|([1-8]\d?))(\.\d{1,99})?|90(\.0{1,99})?)$/,
        message: '请输入正确的纬度',
        trigger: 'blur'
      }],
    },
    {
      label: "监测点类型",
      prop: "type",
      type: "select",
      props: {
        label: 'label',
        value: 'dictValue'
      },
      dicUrl: '/admin/dict/type/monitor_type',
      dicFormatter: res => {
        return res.data
      },
      span: 12,
      rules: [{
        required: true,
        message: "请选择监测点类型",
        trigger: 'blur'
      }]
    },
    {
      label: "监测单位",
      prop: "monitoringUnit",
      span: 12,
    },
    {
      label: "监测运维单位",
      prop: "operationalUnit",
      span: 12,
    },
    {
      label: "施工单位",
      prop: "constructionUnit",
      span: 12,
    },
    {
      label: "监测预警员",
      prop: "monitoringWarningPerson",
      span: 12,
    },
    {
      label: "监测预警员电话",
      prop: "monitoringWarningPersonPhone",
      span: 12,
    },
    {
      label: "群测群防员",
      prop: "qcqfPerson",
      span: 12,
    },
    {
      label: "群测群防员电话",
      prop: "qcqfPersonPhone",
      span: 12,
    },
    {
      label: "告警喇叭播报",
      prop: "warnHornBroadcast",
      span: 12,
      // search: true,
      type: 'switch', //类型
      slot: true,  //插槽
      dicData: [
        {
          label: "不播报",
          value: 0
        },
        {
          label: "播报",
          value: 1
        },
      ],
    },
    {
      label: "运行状态",
      prop: "runningStatus",
      type: "select",
      props: {
        label: 'label',
        value: 'dictValue'
      },
      dicUrl: '/admin/dict/type/running_state',
      dicFormatter: res => {
        return res.data
      },
      change: ({
        value,
        column
      }) => {
        let datetime = fieldOption.column.find(item => item.prop == 'cancellationTime')
        let textarea = fieldOption.column.find(item => item.prop == 'cancellationRemark')
        if (value == "cancellation") {
          datetime.display = true
          textarea.display = true
        } else {
          datetime.display = false
          textarea.display = false
        }
      },
      span: 12,
      rules: [{
        required: true,
        message: "请选择运行状态",
        trigger: 'blur'
      }]
    },
    {
      display: false,
      label: "注销时间",
      prop: "cancellationTime",
      type: "datetime",
      format: 'yyyy-MM-dd hh:mm:ss',
      valueFormat: 'yyyy-MM-dd hh:mm:ss',
      mock: {
        type: 'datetime',
        format: 'yyyy-MM-dd hh:mm:ss',
        now: true,
      },
      rules: [{
        required: true,
        message: "请选择注销时间",
        trigger: 'blur'
      }]
    },
    {
      display: false,
      label: "注销原因",
      prop: "cancellationRemark",
      type: "textarea",
      rules: [{
        required: true,
        message: "请输入注销原因",
        trigger: 'blur'
      }]
    },
    // {
    //   label: "岩石特征",
    //   prop: "rockType",
    //   span: 12,
    //   formslot: true
    // },
    // {
    //   label: "稳定性",
    //   prop: "steady",
    //   span: 12,
    //   formslot: true
    // },
    // {
    //   label: "危害程度",
    //   prop: "extentHarm",
    //   span: 12,
    //   formslot: true
    // },
    // {
    //   label: "危险性",
    //   prop: "risk",
    //   span: 12,
    //   formslot: true

    // },
    // {
    //   label: "涉险情况-建筑面积(m²)",
    //   prop: "hazardFloorArea",
    //   span: 12,
    //   // rules:[
    //   //   // {validator:isNum,trigger:'blur'}
    //   //   {
    //   //     required: true,
    //   //     message: "请输入",
    //   //     pattern: /^\.+|[^\d.]/,
    //   //     trigger:'blur'
    //   //   }
    //   // ]
    // },
    // {
    //   label: "涉险情况-人数",
    //   prop: "hazardPersonNum",
    //   span: 12,
    //   // rules:[
    //   //   // {validator:isInteger,trigger:'blur',message:'请输入整数'}
    //   //   {
    //   //     required: true,
    //   //     message: "请输入",
    //   //     pattern: /^[1-9]\d*$/,
    //   //     trigger:'blur'
    //   //   }
    //   // ]
    // },
    // {
    //   label: "涉险情况-距离(m²)",
    //   prop: "hazardDistance",
    //   span: 12,
    //   // rules:[
    //   //   {validator:isNum,trigger:'blur'}
    //   // ]
    // },
    // {
    //   label: "威胁对象",
    //   prop: "threatObject",
    //   span: 12,
    //   hide: true,
    // },
    // {
    //   label: '隐患等级',
    //   prop: 'level',
    //   formslot: true,
    //   hide: true
    // },
    // {
    //   label: '隐患等级',
    //   prop: 'levelName',
    //   display: false
    // },
    // {
    //   label: "隐患发生时间",
    //   prop: "disasterTime",
    //   span: 12,
    //   type: 'datetime',
    //   valueFormat: "yyyy-MM-dd hh:mm:ss",
    //   hide: true

    // },
    // {
    //   label: "预测灾害发育程度",
    //   prop: "disasterDevelopmentDegree",
    //   // type: "select",
    //   // dicData: [],
    //   // props: {
    //   //   label: "name",
    //   //   value: "id",
    //   // },
    //   // dicUrl:"/area/parentId/{{key}}",
    //   // dicFormatter:res => {
    //   //   return res.data;
    //   // },
    //   span: 12,
    //   hide: true,
    // },
    // {
    //   label: "支护情况",
    //   prop: "shoring",
    //   span: 12,
    //   hide: true,
    // },
    // {
    //   label: "治理完成时间",
    //   prop: "governFinishTime",
    //   span: 12,
    //   type: 'datetime',
    //   valueFormat: "yyyy-MM-dd hh:mm:ss",
    //   rules: [{
    //     required: true,
    //     message: '请选择时间'
    //   }]
    // },
    // {
    //   label: "采取治理措施",
    //   prop: "governMeasure",
    //   span: 12,
    //   // rules:[
    //   //   // {validator:hasSpace,trigger:'blur'}
    //   //   {
    //   //     required: true,
    //   //     message: "请输入采取治理措施",
    //   //     trigger:'blur'
    //   //   }
    //   // ]
    // },

  ]

}
