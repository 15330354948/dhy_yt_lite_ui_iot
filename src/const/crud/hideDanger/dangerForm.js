import {
  hasSpace,
  isNum,
  isInteger,
  validatePhoneNum
} from '@/util/validate'
let isEdit = false;
let node = 0;
export const tableOption = {
  addBtn: false,
  excelBtn: false,
  editBtn: false,
  delBtn: false,
  reserveSelection: true,
  selectClearBtn: true, // 清除选中按钮
  selection: true,
  searchBtn: true,

  border: true,
  index: true,
  indexLabel: '序号',
  labelWidth: 190,
  searchLabelWidth: 120,
  stripe: true,
  showHeader: true,
  menuAlign: 'center',
  searchMenuSpan: 6,
  align: 'center',
  dialogClickModal: false,
  column: [{
      label: "监测点编号",
      prop: "monitorCode",
      span: 12,
      search: true,
      rules: [{
          required: true,
          message: '请输入监测点编号',
        },
        {
          validator: hasSpace,
          trigger: 'blur'
        }
      ],
    }, {
      label: "监测点名称",
      prop: "monitorName",
      search: true,
      span: 12,
      rules: [{
        required: true,
        validator: hasSpace,
        trigger: 'blur'
      }]
    },
    {
      display: false,
      label: '行政区划',
      prop: 'cascader',
      type: "cascader",
      search: true,
      hide: true,
      checkStrictly: true, //可选任意级
      // emitPath: false,
      props: {
        label: 'name',
        value: 'code'
      },
      lazy: true,
      lazyLoad(node, resolve) {
        let stop_level = 4;
        let level = node.level;
        let data = node.data || {}
        let code = data.code;
        let list = [];
        let callback = () => {
          resolve((list || []).map(ele => {
            return Object.assign(ele, {
              leaf: level >= stop_level
            })
          }));
        }
        if (level == 0) {
          axios.get(`/area/parentId/0`).then(res => {
            list = res.data.data;
            callback()
          })
        }
        if (level == 1) {
          axios.get(`/area/parentId/${code}`).then(res => {
            list = res.data.data;
            callback()
          })
        }
        if (level == 2) {
          axios.get(`/area/parentId/${code}`).then(res => {
            list = res.data.data;
            callback()
          })
        }
        if (level == 3) {
          axios.get(`/area/parentId/${code}`).then(res => {
            list = res.data.data;
            callback()
          })
        }
        if (level == 4) {
          axios.get(`/area/parentId/${code}`).then(res => {
            list = res.data.data;
            callback()
          })
        } else {
          callback()
        }
      }
    },
    {
      label: '行政区划',
      prop: 'cascader',
      type: "cascader",
      hide: true,
      checkStrictly: true, //可选任意级
      emitPath: false,
      slot: true,
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

    {
      label: "地理位置",
      prop: "location",
      span: 12,
      rules: [{
        required: true,
        message: "请输入地理位置",
        trigger: 'blur'
      }],
      hide: true
    },
    {
      label: "经度",
      prop: "longitude",
      span: 12,
      slot: true,
      rules: [{
        required: true,
        pattern: /^[\-\+]?(0(\.\d{1,99})?|([1-9](\d)?)(\.\d{1,99})?|1[0-7]\d{1}(\.\d{1,99})?|180\.0{1,99})$/,
        message: '请输入正确的经度',
        trigger: 'blur'
      }],
      hide: true
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
      hide: true
    },
    {
      label: "监测点类型",
      prop: "type",
      type: "select",
      search: true,
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
      hide: true
    },
    {
      label: "监测运维单位",
      prop: "operationalUnit",
      span: 12,
      hide: true
    },
    {
      label: "施工单位",
      prop: "constructionUnit",
      span: 12,
      hide: true
    },
    {
      label: "监测预警员",
      prop: "monitoringWarningPerson",
      span: 12,
      hide: true
    },
    {
      label: "监测预警员电话",
      prop: "monitoringWarningPersonPhone",
      span: 12,
      hide: true
    },
    {
      label: "群测群防员",
      prop: "qcqfPerson",
      span: 12,
      hide: true
    },
    {
      label: "群测群防员电话",
      prop: "qcqfPersonPhone",
      span: 12,
      hide: true
    },
    {
      label: "告警喇叭播报",
      prop: "warnHornBroadcast",
      span: 12,
      search: true,
      type: 'switch', //类型
      slot: true,  //插槽
      // row: true,
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
      search: true,
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
        let datetime = tableOption.column.find(item => item.prop == 'cancellationTime')
        let textarea = tableOption.column.find(item => item.prop == 'cancellationRemark')
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
      hide: true,
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
        trigger: 'change'
      }]
    },
    {
      display: false,
      label: "注销原因",
      prop: "cancellationRemark",
      type: "textarea",
      hide: true,
      rules: [{
        required: true,
        message: "请输入注销原因",
        trigger: 'blur'
      }]
    },
    {
      display: false,
      label: "行政区划",
      prop: "xzqh",
      showWordLimit: true,
      overHidden: true,
      slot: true,
      display: false
    },
    // {
    //   label: "岩石特征",
    //   prop: "rockType",
    //   span: 12,
    //   formslot: true,
    //   // addDisplay: false,
    //   // editDisplay: false,
    //   // slot:true,
    //   hide: true,
    //   // rules: [
    //   //   { required: true, message: '岩石特征', }
    //   // ],
    // },
    // {
    //   label: "岩石特征",
    //   prop: "rockTypeName",
    //   span: 12,
    //   // display: false,
    //   addDisplay: false,
    //   editDisplay: false,
    //   hide: true
    // },{
    //   label: "稳定性",
    //   prop: "steady",
    //   span: 12,
    //   formslot: true,
    //   hide: true,
    //   // addDisplay: false,
    //   // editDisplay: false,
    //   rules: [
    //     { required: true, message: '稳定性', }
    //   ],
    // },
    // {
    //   label: "危害程度",
    //   prop: "extentHarm",
    //   // addDisplay: false,
    //   // editDisplay: false,
    //   span: 12,
    //   formslot: true,
    //   hide: true,
    //   rules: [
    //     { required: true, message: '危害程度', }
    //   ],
    // },
    // {
    //   label: "危险性",
    //   prop: "risk",
    //   span: 12,
    //   formslot: true,
    //   // addDisplay: false,
    //   // editDisplay: false,
    //   hide: true,
    //   rules: [
    //     { required: true, message: '危险性', }
    //   ],

    // },
    // {
    //   label: "涉险情况-建筑面积(m²)",
    //   prop: "hazardFloorArea",
    //   // addDisplay: false,
    //   // editDisplay: false,
    //   span: 12,
    //   // rules:[
    //   //   {validator:isNum,trigger:'blur'}
    //   // ],
    //   hide: true
    // },
    // {
    //   label: "涉险情况-人数",
    //   prop: "hazardPersonNum",
    //   // addDisplay: false,
    //   // editDisplay: false,
    //   span: 12,
    //   // rules:[
    //   //   {validator:isInteger,trigger:'blur',message:'请输入整数'}
    //   // ],
    //   hide: true
    // },
    // {
    //   label: "涉险情况-距离(m²)",
    //   prop: "hazardDistance",
    //   // addDisplay: false,
    //   // editDisplay: false,
    //   span: 12,
    //   // rules:[
    //   //   {validator:isNum,trigger:'blur'}
    //   // ],
    //   hide: true
    // },
    // {
    //   label: "威胁对象",
    //   prop: "threatObject",
    //   // addDisplay: false,
    //   // editDisplay: false,
    //   span: 12,
    //   hide: true,
    //   // rules:[
    //   //   {validator:hasSpace,trigger:'blur'}
    //   // ],
    // },
    // {
    //   label: "预测灾害发育程度",
    //   prop: "disasterDevelopmentDegree",
    //   // addDisplay: false,
    //   // editDisplay: false,
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
    //   // rules: [
    //   //   { validator: isNum, trigger: 'blur' }
    //   // ],
    //   span: 12,
    //   hide: true,
    // },
    // {
    //   label: "支护情况",
    //   prop: "shoring",
    //   // addDisplay: false,
    //   // editDisplay: false,
    //   span: 12,
    //   hide: true,
    //   // rules:[
    //   //   {validator:hasSpace,trigger:'blur'}
    //   // ],
    // },
    // {
    //   label: "治理完成时间",
    //   prop: "governFinishTime",
    //   // addDisplay: false,
    //   // editDisplay: false,
    //   span: 12,
    //   type: 'datetime',
    //   valueFormat: "yyyy-MM-dd hh:mm:ss",
    //   hide: true,
    //   rules: [
    //     { required: true, message: '请选择时间' }
    //   ]
    // },
    // {
    //   label: "采取治理措施",
    //   prop: "governMeasure",
    //   span: 12,
    //   // addDisplay: false,
    //   // editDisplay: false,
    //   // rules:[
    //   //   {validator:hasSpace,trigger:'blur'}
    //   // ],
    //   hide: true
    // },
    // {
    //   label: "图幅号",
    //   prop: "mapCode",
    //   span: 12,
    //   hide: true,
    //   rules: [
    //     {
    //       required: true,
    //       message: '请填写统一编号',
    //     },
    //     { validator: hasSpace, trigger: 'blur' }
    //   ]
    // },
    // {
    //   label: '隐患等级',
    //   prop: 'level',
    //   // formslot:true,
    //   hide: true,
    // },
    // {
    //   label: '隐患等级',
    //   prop: 'levelName',
    //   display: false,
    //   hide: true
    // },
  ]
}
