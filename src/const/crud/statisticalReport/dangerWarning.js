export const dangerPointOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    labelWidth: 100,
    stripe: true,
    selection:true,
    menuAlign: 'center',
    searchMenuSpan: 6,
    reserveSelection: false,
    selectClearBtn: false,
    showClomnuBtn:false,
    editBtn: false,
    delBtn: false,
    emptyBtn:true,
    align: 'center',
    addBtn: false,
    dialogClickModal: false,
    columnBtn: false,
    refreshBtn: false,
    searchBtn: true,
    menu:false,
    column: [{
        label: "年",
        prop: "year",
        type: "year",
        search: true,
        display: false,
        hide:true
    },{
        label: "月份",
        prop: "mouth",
        type:"select",
        dicData: [
            {
                label: '全年',
                value: 0
            }, {
                label: '1月',
                value: 1,
            }, {
                label: '2月',
                value: 2,
            }, {
                label: '3月',
                value: 3,
            }, {
                label: '4月',
                value: 4,
            }, {
                label: '5月',
                value: 5,
            }, {
                label: '6月',
                value: 6,
            }, {
                label: '7月',
                value: 7,
            }, {
                label: '8月',
                value: 8,
            }, {
                label: '9月',
                value: 9,
            }, {
                label: '10月',
                value: 10,
            }, {
                label: '11月',
                value: 11,
            }, {
                label: '12月',
                value: 12,
            }
        ],
        search: true,
        display: false,
        hide:true
    },{
        label: "监测点名称",
        prop: "yinhuandianName",
    },{
        label: "预警等级",
        prop: "yujingdengji",
    },{
        label: "预警总次数",
        prop: "yujingall",
    },{
        label: "蓝色预警次数",
        prop: "lanseyujing",
    },{
        label: "黄色预警次数",
        prop: "huangsdeuyjing",
    },{
        label: "橙色预警次数",
        prop: "chengseyujing",
    },{
        label: "红色预警次数",
        prop: "hongseyujing",
    },{
        label: '街道',
        prop: 'streetCode',
        hide: true,
        search: true,
        span: 12,
        type: "select",
        dicData: [],
        props: {
          label: "name",
          value: "id",
        },
        rules: [{
          required: true,
          message: '请选择街道',
        }],
        dicUrl: "/area/parentId/440308",
        cascaderItem: ["communityCode"], //关联
        dicFormatter: res => {
          return res.data;
        },
        display: true,
      },{
        label: '社区',
        prop: 'communityCode',
        hide: true,
        search: true,
        span: 12,
        rules: [{
          required: true,
          message: '请选择社区',
        }],
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
      }]
}