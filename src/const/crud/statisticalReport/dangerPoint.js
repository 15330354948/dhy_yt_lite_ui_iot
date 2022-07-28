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
    columnBtn:false,
    refreshBtn: false,
    columnBtn: false,
    searchBtn: true,
    menu:false,
    column: [{
        label: "年",
        prop: "year",
        type: "year",
        dateDefault: false,
        search: true,
        searchClearable: false,
        display: false,
        hide:true
    },{
        label: "全市统一编号",
        prop: "bianhao",
    },{
        label: "监测点名称",
        prop: "yinhuandianName",
    },{
        label: '汛前',
        children: [{
            label: '应上报次数',
            prop: 'xunqianying',
        }, {
            label: '实上报次数',
            prop: 'xunqianshi',
        }]
    },{
        label: '汛中',
        children: [{
            label: '应上报次数',
            prop: 'xunzhongying',
        }, {
            label: '实上报次数',
            prop: 'xunzhongshi',
        }]
    },{
        label: '汛后',
        children: [{
            label: '应上报次数',
            prop: 'xunhouying',
        }, {
            label: '实上报次数',
            prop: 'xunhoushi',
        }]
    }]
}