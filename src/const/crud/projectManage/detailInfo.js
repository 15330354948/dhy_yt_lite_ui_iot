export const tableOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    align: 'center',
    refreshBtn: false,
    columnBtn: false,
    dialogClickModal: false,
    menu: false,
    searchBtn: false,
    addBtn: false,
    editBtn: false,
    viewBtn: false,
    labelWidth: 120,
    // height:215,
    height:265,
    column: [{
        label: '设备编号',
        prop: 'deviceNo',

    }, {
        label: '时间',
        prop: 'time',
    }, {
        label: '告警类型',
        prop: 'alarmType',
        type: 'select',
        search: true,
        dicData: [
            { label: "累计告警", value: "leiji" },
            { label: "相邻告警", value: "xianglin" }
        ]
    }, {
        label: '告警等级',
        prop: 'alarmLevel',
        type: 'select',
        dataType:"number",
        props: {
            label: 'label',
            value: 'value'
        },
        dicUrl:'/admin/dict/type/alarm_level'

    }, {
        label: '告警描述',
        prop: 'alarmDesc',

    }]
}