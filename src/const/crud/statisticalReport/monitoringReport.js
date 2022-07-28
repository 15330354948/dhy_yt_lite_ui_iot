/*
 * @Author: 张峻霖
 * @Date: 2021-05-19 15:11:57
 * @LastEditTime: 2021-05-19 22:40:11
 * @LastEditors: Please set LastEditors
 * @Description: 监测报告页面js文件
 * @FilePath: \LH-UI\src\const\crud\statisticalReport\monitoringReport.js
 */
export const tableOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    labelWidth: 100,
    stripe: true,
    menuAlign: 'center',
    reserveSelection: false,
    selectClearBtn: false,
    showClomnuBtn: false,
    editBtn: false,
    viewBtn: false,
    delBtn: true,
    emptyBtn: true,
    align: 'center',
    addBtn: true,
    dialogClickModal: false,
    columnBtn: false,
    refreshBtn: false,
    columnBtn: false,
    searchBtn: true,
    menuAlign: 'center',
    column: [{
        label: "文件上传",
        prop: "fileUrl",
        formslot: true,
        hide: true,
        rules: [{
            required: true,
            message: "请上传文件",
            trigger: "change"
        }],
    }, {
        label: "报告名称",
        prop: "reportName",
        rules: [{
            required: true,
            message: "请输入描述",
            trigger: "change"
        }],
    }, {
        label: "文件名称",
        prop: "fileName",
        display: false
    }, {
        label: "上传时间",
        prop: "createTime",
        display: false
    }]
}