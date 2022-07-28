export const tableOption = {
  border: true,
  stripe: true,
  index: true,
  indexLabel: "序号",
  selection: true,
  menuAlign: "center",
  labelWidth: 120,
  searchLabelWidth: 120,
  searchMenuSpan: 6,
  editBtn: false,
  delBtn: false,
  align: "center",
  addBtn: false,
  viewBtn: false,
  dialogClickModal: false,
  column: [
    {
      label: "全国统一编号",
      maxlength: 30,
      search: true,
      prop: "pikk"
    },
    {
      label: "监测点名称",
      prop: "name",
      search: true
    },

    {
      label: "群测群防人员",
      prop: "username",
      search: false,
      span: 12,
      maxlength: 30,
      addDisplay: false,
      viewDisplay: false,
      rules: [
        {
          required: true,
          message: "请输入",
          trigger: "blur"
        }
      ]
    },
    {
      type: "datetime",
      prop: "createTime",
      search: true,
      display: true,
      label: "开始时间",
      format: "yyyy-MM-dd HH:mm:ss", // 这是组件展示的日期格式
      valueFormat: "yyyy-MM-dd HH:mm:ss" // 这是组件value值的格式
    },
    {
      label: "预警等级",
      prop: "warnLevel",
      type: "select",
      search: true,
      dicData: [
        {
          label: "红色预警",
          value: 1
        },
        {
          label: "橙色预警",
          value: 2
        },
        {
          label: "黄色预警",
          value: 3
        },
        {
          label: "蓝色预警",
          value: 4
        },
        {
          label: "无预警",
          value: 5
        }
      ],
      span: 11,
      dataType: "number"
    },
    {
      label: "宏观现象",
      prop: "macroInfo",
      type: "textarea",
      search: true,
      typeslot: true,
      overHidden:true,
      dicData: [],
      cascaderIndex: 0, // formslot: true,
      dicUrl: "/disaster/disaster_macro_observe_record/marcoList",
      maxlength: 30,
      dicFormatter: res => {
        var obj = [];
        for (var i = 0; i < res.length; i++) {
          obj.push({
            label: res[i],
            value: res[i]
          });
        }
        return obj;
      },
      rules: [
        {
          required: false,
          message: "请选择",
          trigger: "blur"
        }
      ]
    },
    {
      label: "现场照片",
      prop: "netUrl",
      span: 24,
      type: "upload",
      search: false,
      listType: "picture-img",
      editDisplay: false,
      hide: true,
      maxlength: 30,
      formslot: true,
    },
    {
      label: "备注",
      prop: "remark",
      span: 12,
      rules: [
        {
          required: true,
          message: "请选择",
          trigger: "blur"
        }
      ],
      addDisplay: false,
      editDisplay: false,
      hide: true,
      maxlength: 30
    }
  ]
};
