import { hasSpace, isNum, isInteger, validatePhoneNum } from "@/util/validate";
var DIC = {
  state: [
    {
      label: "1",
      value: "state"
    },
    {
      label: "2",
      value: "state"
    }
  ]
};

const validateMobile = (rule, value, callBack) =>{
  let landline = /^[0][1-9]{2,3}-[0-9]{5,10}$/
  let phone = /^[1]([3-9])[0-9]{9}$/
  if (!phone.test(value) && !landline.test(value)) {
    callBack(new Error("请输入正确的手机号格式"));
  }else{
    callBack();
  }
}

const Rules = {
  mobile: [{
    required: true,
    trigger: "blur",
    validator: validateMobile
  },{
    required:true,
    message:'请输入联系方式'
  },],
};

export const dutyOption = {
  border: true,
  selection: true,
  stripe: true,
  menuAlign: "center",
  align: "center",
  searchMenuSpan: 4,
  delBtn: true,
  columnBtn: false,
  refreshBtn: false,
  viewBtn: false,
  dialogClickModal: false,
  submitBtn: false,
  emptyBtn: false,
  column: [
    {
      type: "input",
      label: "姓名",
      prop: "name",
      span: 11,
      clearable: true,
      search: true,
      searchLabelWidth: 100,
      labelWidth: 120,
      maxlength: 50,
      rules:[{
        required:true,
        message:'请输入姓名'
      }]
    },{
      label: "联系方式",
      prop: "phone",
      span: 11,
      search: true,
      labelWidth: 120,
      rules: Rules["mobile"]
    },{
      type: "select",
      label: "所属项目",
      prop: "projectId",
      // dataType: "number",
      search: true,
      maxlength: 16,
      labelWidth: 120,
      span: 11,
      // hide: false,
      // showColume: true,
      // dicData: [],
      dicUrl: '/project/professional_project_management/project_list',
      props: {
        label: "projectName",
        value: 'id'
      },
      dicFormatter: res => {
        return res.data
      },
      rules:[{
        required:true,
        message:'请选择项目'
      }]
    },{
      label: "工种",
      prop: "work",
      span: 11,
      search: true,
      labelWidth: 120,
      rules:[{
        required:true,
        message:'请填写工种'
      }]
    }
  ]
};
export const tableOption = {
  border: true,
  selection: true,
  index: true,
  indexLabel: "序号",
  stripe: true,
  menuAlign: "center",
  menuWidth: 300,
  align: "center",
  searchMenuSpan: 6,
  delBtn: false,
  columnBtn: false,
  refreshBtn: false,
  editBtn:false,
  dialogClickModal: false,
  addBtn:false,
  // menuType:'menu',
  // dateDefault:true,
  labelWidth: 140,
  column: [
    {
      type: "input",
      label: "项目编号",
      prop: "projectCode",
      required: true,
      display: true,
      hide: true,
      // maxlength: 16,
      rules: [
        {
          required: true,
          message: "请填写正确项目编号",
          trigger: "blur"
        },
        {
          // validator: hasSpace,
          trigger: "blur"
        }
      ]
    },
    {
      type: "input",
      label: "平台名称",
      prop: "projectName",
      required: true,
      display: true,
      filterable: true,
      clearable: true,
      width: 250,
      overHidden: true,
      searchLabelWidth: 100,
      // maxlength: 50,
      search: true,
      searchSpan: 6,
      rules: [
        {
          required: true,
          message: "平台名称必须填写"
        },
        {
          // validator: hasSpace,
          trigger: "blur"
        }
      ]
    },
    {
    label: '省',
    prop: 'province',
    hide: true,
    type: "select",
    props: {
      label: "name",
      value: "code",
    },
    rules: [{
      required: true,
      message: '请选择',
    }],
    dicUrl: "/area/parentId/0",
    cascaderItem: ["city","county","town"],//关联
    dicFormatter: res => {
      return res.data;
    },

  },
  {

    label: '市',
    prop: 'city',
    hide: true,
    type: "select",
    props: {
      label: "name",
      value: "code",
    },
    rules: [{
      required: true,
      message: '请选择',
    }],
    dicUrl: "/area/parentId/{{key}}",
    cascaderItem: ["county","town"],//关联
    dicFormatter: res => {
      return res.data;
    },

  },
  {
    readonly: true,
    type: 'select',
    label: '区县',
    prop: 'county',
    hide: true,
    rules: [{
      required: true,
      message: '请选择',
    }],
    dicData: [],
    props: {
      label: "name",
      value: "code",
    },
    dicUrl: "/area/parentId/{{key}}",
    dicFormatter: res => {
      return res.data;
    },
    cascaderItem: ["town"],//关联

  },
  {
    label: '乡镇/街道',
    prop: 'town',
    type: 'select',
    props: {
      label: "name",
      value: "code",
    },
    dicUrl: "/area/parentId/{{key}}",
    dicFormatter: res => {
      return res.data;
    },
    rules: [{
      required: true,
      message: '请选择',
    }],
    hide: true,
  }, {
    display: false,
    label: '省',
    prop: 'provinceName',
  }, {
    display: false,
    label: '市',
    prop: 'cityName',
    overHidden: true,
  },
  {
    display: false,
    label: '区县',
    prop: 'countyName',
    overHidden: true,
  },
  {
    display: false,
    label: '乡镇/街道',
    prop: 'townName',
  },{
      type: "input",
      label: "项目地址",
      prop: "location",
      required: true,
      hide: true,
      maxlength: 50,
      span:12,
      rules: [
        {
          required: true,
          message: "项目地址必须填写",
          trigger: "blur"
        },
        {
          validator: hasSpace,
          trigger: "blur"
        }
      ]
    },{
      type: "number",
      label: "视角高度",
      prop: "altitude",
      hide: true,
      maxlength: 10,
      rules: [
        {
          required: true,
          message: "请填写视角高度(建议高度10000)",
          trigger: "blur"
        }
      ]
    },{
      type: "number",
      label: "x坐标",
      prop: "x",
      hide: true,
      maxlength: 10,
      rules: [
        {
          required: true,
          message: "请填写x坐标",
          trigger: "blur"
        }
      ]
    },
    {
      type: "number",
      label: "y坐标",
      prop: "y",
      maxlength: 10,
      hide: true,
      rules: [
        {
          required: true,
          message: "请填写y坐标",
          trigger: "blur"
        }
      ]
    },
    {
      type: "number",
      label: "经度",
      prop: "longitude",
      maxlength: 10,
      hide: true,
      rules: [
        {
          required: true,
          pattern: /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,8})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,8}|180)$/,
          message: '请正确输入经度值!',
          trigger: 'blur'
        }
      ]
    },
    {
      type: "number",
      label: "纬度",
      prop: "latitude",
      maxlength: 10,
      hide: true,
      rules: [
        {
          required: true,
          pattern: /^(\-|\+)?([0-8]?\d{1}\.\d{0,8}|90\.0{0,8}|[0-8]?\d{1}|90)$/,
          message: '请正确输入纬度值!',
          trigger: 'blur'
        }
      ]
    },

    {
      type: "input",
      label: "监测单位",
      prop: "monitorUnit",
      required: true,
      hide: true,
      maxlength: 11,
      rules: [

        {
          required: true,
          message: "监测单位必须填写"
        },
        {
          validator: hasSpace,
          trigger: "blur"
        }
      ]
    },
    {
      type: "input",
      label: "项目联系人电话",
      prop: "contactsPhone",
      required: true,
      hide: true,
      maxlength: 12,
      rules: [
        {
          required: true,
          message: "请输入正确的手机号码",
          trigger: "blur"
        },
        {
          validator: validatePhoneNum,
          trigger: "blur"
        }
      ]
    },
    {
      type: "input",
      label: "平台负责人",
      prop: "contacts",
      required: true,
      search: true,
      maxlength: 50,
      addDisplay: true,
      searchLabelWidth: 90,
      maxlength: 30,
      searchSpan: 6,
      rules: [
        {
          required: true,
          message: "主要联系人必须填写"
        },
        {
          validator: hasSpace,
          trigger: "blur"
        }
      ]
    },
    {
      type: "input",
      label: "灾害点数",
      prop: "disasterPointsSum",
      maxlength: 50,
      required: false,
      addDisabled: true,
      editDisabled: true,
      display: true
    },
    {
      type: "input",
      label: "设备数",
      prop: "devicesSum",
      maxlength: 50,
      // required: false,
      addDisabled: true,
      editDisabled: true,
      display: true
    },{
      type: "input",
      label: "appId",
      prop: "appId",
      maxlength: 300,
      required: true,
      display: true,
      hide: true,
      // rules: [
      //   {
      //     required: true,
      //     message: "请填写appId"
      //   },
      //   {
      //     validator: hasSpace,
      //     trigger: "blur"
      //   }
      // ]
    },{
      type: "input",
      label: "appSecret",
      prop: "appSecret",
      maxlength: 300,
      required: true,
      display: true,
      hide: true,
      // rules: [
      //   {
      //     required: true,
      //     message: "请填写应用序列"
      //   },
      //   {
      //     validator: hasSpace,
      //     trigger: "blur"
      //   }
      // ]
    },{
      type: "input",
      label: "applicationCode",
      prop: "applicationCode",
      maxlength: 300,
      required: true,
      display: true,
      hide: true,
      // rules: [
      //   {
      //     required: true,
      //     message: "请填写应用码"
      //   },
      //   {
      //     validator: hasSpace,
      //     trigger: "blur"
      //   }
      // ]
    },{
      type: "input",
      label: "数据队列",
      prop: "dataQueueName",
      maxlength: 300,
      required: true,
      display: true,
      hide: true,
      // rules: [
      //   {
      //     required: true,
      //     message: "请填写数据序列"
      //   },
      //   {
      //     validator: hasSpace,
      //     trigger: "blur"
      //   }
      // ]
    },{
      type: "input",
      label: "告警队列",
      prop: "warnQueueName",
      maxlength: 300,
      required: true,
      display: true,
      hide: true,
      // rules: [
      //   {
      //     required: true,
      //     message: "请填写告警序列"
      //   },
      //   {
      //     validator: hasSpace,
      //     trigger: "blur"
      //   }
      // ]
    },
    {
      type: "select",
      label: "状态",
      prop: "state",
      search: true,
      dicData: [
        {
          label: "未启用",
          value: 0
        },
        {
          label: "启用",
          value: 1
        }
      ],
      searchSpan: 6,
      dataType: "number",
      rules: [
        {
          required: true,
          message: "状态必选",
          trigger: "change"
        }
      ]
    },
    {
      type: "datetime",
      prop: "beginTime",
      search: true,
      display: true,
      label: "开始时间",
      overHidden: true,
      format: "yyyy-MM-dd HH:mm:ss", // 这是组件展示的日期格式
      valueFormat: "yyyy-MM-dd HH:mm:ss" // 这是组件value值的格式
    },
    {
      type: "datetime",
      label: "结束时间",
      prop: "endTime",
      search: true,
      display: true,
      overHidden: true,
      format: "yyyy-MM-dd HH:mm:ss", // 这是组件展示的日期格式
      valueFormat: "yyyy-MM-dd HH:mm:ss" // 这是组件value值的格式
    },
    {
      label: "天气网城市代码",
      prop: "chinaWeatherNetworkCityCode",
      remote: true,
      type: "select",
      dicUrl: `/china_weather_network_city_code/page?cityName={{key}}`,
      dicFormatter: function (res) {
        return res.data.records
      },
      props: {
        label: "cityName",
        value: "weatherNetworkCityCode"
      },
      search: false,
      hide: true
    },{
      label: "阿里云accessKeyID",
      prop: "smsAccessKeyId",
      hide: true,
    },{
      label: "阿里云accessKeySecret",
      prop: "smsAccessKeySecret",
      hide: true,
    },{
      label: "阿里云短信模板Code",
      prop: "smsSign",
      hide: true,
    },{
      label: "阿里云短信签名",
      prop: "smsTemplateCode",
      hide: true,
    },{
      type: "textarea",
      label: "备注",
      prop: "remark",
      required: true,
      display: true,
      hide: true,
      maxlength: 200,
      span:24,
      // rules: [
      //   {
      //     validator: hasSpace,
      //     trigger: "blur"
      //   }
      // ]
    },{
      label: "项目logo",
      prop: "projectLogoUrl",
      hide: true,
      formslot:true,
    }
  ]
};
export const tableOptionView = {
  border: true,
  selection: true,
  stripe: true,
  menuAlign: "center",
  align: "center",
  searchMenuSpan: 4,
  delBtn: true,
  columnBtn: false,
  refreshBtn: false,
  viewBtn: false,
  dialogClickModal: false,
  submitBtn: false,
  emptyBtn: false,
  column: [
    {
      type: "input",
      label: "项目编号",
      prop: "projectCode",
      hide: true,
      maxlength: 16,
      labelWidth: 120,
      span: 11,
      disabled: true
    },
    {
      type: "input",
      label: "平台名称",
      prop: "projectName",
      span: 11,
      clearable: true,
      searchLabelWidth: 100,
      labelWidth: 120,
      maxlength: 50,
      disabled: true
    },
    {
      label: "省份",
      prop: "provinceName",
      span: 11,
      labelWidth: 120,
      disabled: true,
      addDisabled: true,
      editDisabled: true
    },
    {
      label: "城市",
      prop: "cityName",
      span: 11,
      labelWidth: 120,
      disabled: true,
      addDisabled: true,
      editDisabled: true
    },
    {
      label: "区县",
      prop: "countyName",
      span: 11,
      labelWidth: 120,
      disabled: true,
      addDisabled: true,
      editDisabled: true
    },
    {
      label: "乡镇/街道",
      prop: "townName",
      span: 11,
      labelWidth: 120,
      disabled: true,
      addDisabled: true,
      editDisabled: true
    },
    {
      type: "input",
      label: "项目地址",
      prop: "location",
      labelWidth: 120,
      maxlength: 50,
      span: 22,
      disabled: true
    },

    {
      type: "input",
      label: "x坐标",
      prop: "x",
      labelWidth: 120,
      span: 11,
      disabled: true,
      hide: true
    },
    {
      type: "input",
      label: "y坐标",
      prop: "y",
      labelWidth: 120,
      span: 11,
      disabled: true
    },
    {
      type: "input",
      label: "经度",
      prop: "longitude",
      labelWidth: 120,
      span: 11,
      disabled: true
    },
    {
      type: "input",
      label: "纬度",
      prop: "latitude",
      labelWidth: 120,
      span: 11,
      disabled: true
    },
    {
      type: "input",
      label: "监测单位",
      prop: "monitorUnit",
      labelWidth: 120,
      maxlength: 11,
      span: 11,
      disabled: true
    },
    {
      type: "input",
      label: "项目联系人电话",
      prop: "contactsPhone",
      labelWidth: 120,
      maxlength: 11,
      span: 11,
      disabled: true
    },
    {
      type: "input",
      label: "项目负责人",
      prop: "contacts",
      span: 11,
      maxlength: 30,
      labelWidth: 120,
      disabled: true
    },

    //   {
    //     type: "input",
    //     label: "联系电话",
    //     prop: "phone",
    //     required: true,
    //     span: 15,
    //     search: true,
    //     labelWidth: 120,
    //     maxlength: 11,
    //     searchSpan: 5,
    //     formatter: function (row, value, label, column) {
    //       if (label && label.length == 11) {
    //         return label.substr(0, 3) + "***" + label.substr(7);
    //       }
    //       else {
    //         return "";
    //       }
    //     },
    //     rules: [
    //       {
    //         required: true,
    //         pattern: /^1[3456789]\d{9}$/,
    //         message: "联系电话格式不匹配",
    //         trigger: 'blur'
    //       }
    //     ],
    //     maxlength: 11
    //   },
    {
      type: "input",
      label: "灾害点数",
      prop: "disasterPointsSum",
      labelWidth: 120,
      maxlength: 50,
      span: 11,
      disabled: true
    },
    {
      type: "input",
      label: "设备数",
      prop: "devicesSum",
      labelWidth: 120,
      maxlength: 50,
      span: 11,
      disabled: true
    },
    {
      type: "select",
      label: "状态",
      prop: "state",
      labelWidth: 120,
      span: 11,
      dataType: "number",
      dicData: [
        {
          label: "未启用",
          value: 0
        },
        {
          label: "启用",
          value: 1
        }
      ],
      disabled: true
      // dicUrl: "/admin/dict/type/project_status",
      // change: ({ value }) => {
      //     if (value == 1) {
      //         vue.tableOption.column[22].display = true
      //     } else {
      //         vue.tableOption.column[22].display = false
      //     }
      // },
    },
    {
      type: "datetime",
      label: "项目开始时间",
      prop: "createTime",
      span: 11,
      labelWidth: 120,
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      disabled: true
    },
    {
      type: "datetime",
      label: "项目结束时间",
      prop: "endTime",
      span: 11,
      labelWidth: 120,
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      disabled: true
    },
    {
      type: "textarea",
      label: "备注",
      prop: "remark",
      labelWidth: 120,
      span: 22,
      maxlength: 200,
      disabled: true
    },{
      label: "项目logo",
      prop: "projectLogoUrl",
      formslot:true,
    }
  ]
};
export const tableDictItemOption = {
  border: true,
  index: true,
  // selection: true,
  stripe: true,
  menuAlign: "center",
  align: "center",
  searchMenuSpan: 4,
  addBtn: false,
  viewBtn: true,
  delBtn: false,
  editBtn: false,
  columnBtn: true,
  refreshBtn: false,
  column: [
    {
      type: "input",
      label: "灾害点编号",
      prop: "pikk",
      required: true,
      display: true,
      maxlength: 30,
      labelWidth: 150,
      span: 11
    },
    {
      type: "input",
      label: "灾害点名称",
      prop: "name",
      labelWidth: 120,
      required: true,
      display: true,
      span: 11
    },
    {
      label:'灾害类型',
      prop:'type',
      type:'select',
      labelWidth: 120,
      maxlength: 11,
      span: 11,
      dicData:[{
        label:'边坡',
        value: 1
      }],
      // dicUrl: "/admin/dict/type/disaster_type",
      // dicFormatter: res => {
      //   return res.data; //返回字典的层级结构
      // },
    },
    {
      type: "input",
      label: "灾害等级",
      prop: "DisasterGrade",
      labelWidth: 120,
      required: true,
      display: true,
      span: 11
    },
    {
      label: "险情等级",
      prop: "level",
      type:'select',
      labelWidth: 120,
      maxlength: 11,
      span: 11,
      dicData:[{
        label:'小',
        value: 0
      },{
        label:'中',
        value: 1
      },{
        label:'大',
        value:2
      },{
        label:"特大",
        value:3
      }],
      // props: {
      //   label: "label",
      //   value: "res.data"
      // },
      // // cascaderItem: ["city", "county", "town"],
      // dicUrl: "admin/dict/type/level_type",
      // dicFormatter: res => {
      //   // console.log(res.data,3333);

      //   return res.data; //返回字典的层级结构
      // },
    },
    {
      type: "slect",
      label: "库区属性",
      prop: "ReservoirAttributes",
      required: "true",
      hide: true,
      required: true,
      labelWidth: 120,
      maxlength: 11,
      span: 11
    },
    {
      type: "input",
      label: "经度",
      prop: "longitude",
      labelWidth: 120,
      span: 11,
      display: true,
      required: true,
      hide: true
    },
    {
      type: "input",
      label: "纬度",
      prop: "latitude",
      labelWidth: 120,
      span: 11,
      display: true,
      required: true,
      hide: true
    },
    {
      label: "所属省",
      prop: "provinceName",
      span: 11,
      labelWidth: 120,
      disabled: true,
      hide: true,
      addDisabled: true,
      editDisabled: true
    },
    {
      label: "所属城市",
      prop: "cityName",
      span: 11,
      labelWidth: 120,
      disabled: true,
      hide: true,
      addDisabled: true,
      editDisabled: true
    },
    {
      label: "所属区县",
      prop: "countyName",
      span: 11,
      labelWidth: 120,
      disabled: true,
      addDisabled: true,
      hide: true,
      editDisabled: true
    },
    {
      label: "所属乡镇",
      prop: "townName",
      span: 11,
      labelWidth: 120,
      disabled: true,
      addDisabled: true,
      hide: true,
      editDisabled: true
    },
    {
      type: "slect",
      label: "所属村",
      prop: "village",
      required: "true",
      hide: true,
      required: true,
      labelWidth: 120,
      maxlength: 11,
      span: 11
    },
    {
      type: "slect",
      label: "所属组",
      prop: "team",
      required: "true",
      hide: true,
      required: true,
      labelWidth: 120,
      maxlength: 11,
      span: 11
    },
    {
      type: "select",
      label: "灾情点位置",
      prop: "location",
      display: true,
      required: true,
      hide: true,
      labelWidth: 120,
      maxlength: 50,
      span: 22
      // dicUrl: "/admin/dict/type/disaster_level",
    },

    {
      type: "select",
      label: "调查单位",
      prop: "gywhdw",
      display: true,
      required: true,
      hide: true,
      labelWidth: 120,
      maxlength: 11,
      span: 11

      // dicUrl: "/admin/dict/type/danger_level",
    },

    {
      type: "input",
      label: "调查负责人",
      prop: "zdjcdwPerson",
      labelWidth: 120,
      span: 11,
      required: true,
      display: true,
      hide: true
    },
    {
      type: "input",
      label: "填表人员",
      prop: "FillingPersonnel ",
      display: true,
      required: true,
      hide: true,
      labelWidth: 120,
      maxlength: 11,
      span: 11
    },
    {
      type: "input",
      label: "审核人",
      prop: "cancellationRemark",
      labelWidth: 120,
      span: 11,
      required: true,
      display: true,
      hide: true
    },
    {
      type: "datetime",
      label: "填表日期",
      prop: "cancellationTime",
      labelWidth: 120,
      span: 11,
      required: true,
      display: true,
      hide: true
    },

    {
      type: "datetime",
      label: "是否销号",
      prop: "CancellationOrNot",
      labelWidth: 120,
      span: 11,
      required: true,
      display: true,
      hide: true
    },
    {
      // type: "input",
      label: "备注",
      prop: "remark",
      labelWidth: 120,
      span: 11,
      required: true,
      display: true,
      hide: true
      // type: "checkbox",
      // dicData: basic.disaster_hazard_objs,
      // mock: {
      //     type: 'dic',
      // },
  }]
};
export const tableAppeaOption = vue => {
  return {
    border: true,
    index: true,
    indexLabel: "序号",
    stripe: true,
    menuAlign: "center",
    align: "center",
    searchMenuSpan: 6,
    page:true,
    addBtn: false,
    delBtn: false,
    editBtn: false,
    viewBtn:true,
    column: [
      {
        label: "省份",
        prop: "province",
        type: "select",
        display: true,
        labelWidth: 120,
        span: 11,
        search: true,
        hide: true,
        props: {
          label: "name",
          value: "code"
        },
        cascaderItem: ["city", "county", "town"],
        dicUrl: `/area/level/1`,
        dicFormatter: res => {
          return res.data; //返回字典的层级结构
        },
        rules: [
          {
            required: true,
            message: "请选择省份",
            trigger: "blur"
          }
        ],
        change: function(e) {
          if (e.value === "") {
            //
            let searchForm = vue.$refs.appeaItem
              ? vue.$refs.appeaItem.$refs.headerSearch.$refs.form
              : {
                  form: {},
                  DIC: {}
                };
            searchForm.form.city = "";
            searchForm.DIC.city ? (searchForm.DIC.city = []) : null;
          }
        }
      },
      {
        label: "城市",
        prop: "city",
        type: "select",
        display: true,
        labelWidth: 120,
        span: 11,
        search: true,
        hide: true,
        props: {
          label: "name",
          value: "code"
        },
        row: true,
        dicFlag: false,
        dicUrl: `/area/parentId/{{key}}`,
        rules: [
          {
            required: true,
            message: "请选择城市",
            trigger: "blur"
          }
        ],
        change: function(e) {
          if (e.value === "") {
            //
            let searchForm = vue.$refs.appeaItem
              ? vue.$refs.appeaItem.$refs.headerSearch.$refs.form
              : {
                  form: {},
                  DIC: {}
                };
            //
            searchForm.form.county = "";
            searchForm.DIC.county ? (searchForm.DIC.county = []) : null;
          }
        }
      },
      {
        label: "区县",
        prop: "county",
        type: "select",
        display: true,
        search: true,
        labelWidth: 120,
        span: 11,
        hide: true,
        props: {
          label: "name",
          value: "code"
        },
        dicFlag: false,
        dicUrl: `/area/parentId/{{key}}`,
        rules: [
          {
            required: true,
            message: "请选择地区",
            trigger: "blur"
          }
        ],
        change: function(e) {
          if (e.value === "") {
            //
            let searchForm = vue.$refs.appeaItem
              ? vue.$refs.appeaItem.$refs.headerSearch.$refs.form
              : {
                  form: {},
                  DIC: {}
                };
            //
            searchForm.form.town = "";
            searchForm.DIC.town ? (searchForm.DIC.town = []) : null;
          }
        }
      },
      {
        label: "乡镇/街道",
        prop: "town",
        type: "select",
        display: true,
        search: true,
        hide: true,
        labelWidth: 120,
        span: 11,
        props: {
          label: "name",
          value: "code"
        },
        dicFlag: false,
        dicUrl: `/area/parentId/{{key}}`,
        rules: [
          {
            required: true,
            message: "请选择地区",
            trigger: "blur"
          }
        ]
      },
      {
        label: "省份",
        prop: "provinceName",
        display: false,
        addDisabled: true,
        editDisabled: true
      },
      {
        label: "城市",
        prop: "cityName",
        display: false,
        addDisabled: true,
        editDisabled: true
      },

      {
        type: "input",
        label: "设备编号",
        prop: "code",
        required: true,
        search: true,
        labelWidth: 120,
        span: 11
      },
      {
        type: "input",
        label: "设备名称",
        prop: "name",
        required: true,
        search: true,
        labelWidth: 120,
        span: 11
      },
      {
        type: "select",
        label: "设备类型",
        prop: "type",
        required: true,
        search: true,
        labelWidth: 120,
        span: 11,
        dataType: "string",
        dicUrl: "/admin/dict/type/device_type"
      },
      {
        type: "input",
        label: "安装位置",
        prop: "location",
        required: true,
        search: true,
        labelWidth: 120,
        span: 11
      },
      {
        type: "datetime",
        prop: "installationTime",
        search: true,
        display: true,
        label: "安装时间",
        format: "yyyy-MM-dd HH:mm:ss", // 这是组件展示的日期格式
        valueFormat: "yyyy-MM-dd HH:mm:ss" // 这是组件value值的格式
      }
    ]
  };
};

export const projectOption = {
  headerAlign: "center",
  align: "center",
  border: true,
  defaultExpandAll: true,
  refreshBtn: false,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  menuWidth: 600,
  column: [
    {
      label: "名称",
      prop: "name",
      align: 'left',
      width:400
    },
    {
      label: "类型",
      prop: "type",
      dicData: [
        {
          label: "文件夹",
          value: 1
        },
        {
          label: "文档",
          value: 2
        }
      ]
    }
  ]
};

export const NewFolder = {
  title: "表格的标题",
  menuType: "menu",
  menuBtnTitle: "自定义名称",
  page: false,
  align: "center",
  dateBtn: true,
  dateDefault: true,
  menuAlign: "center",
  column: [
    {
      label: "新增文件名",
      prop: "name"
    }
  ]
};
