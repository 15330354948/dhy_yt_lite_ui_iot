export const tableOption = {
  border: true,
  index: false,
  indexLabel: "序号",
  stripe: true,
  menuAlign: "center",
  align: "center",
  searchSpan: 8,
  searchMenuSpan: 4,
  selection: true,
  reserveSelection: true,
  selectClearBtn: true,
  addBtn: false,
  viewBtn: true,
  menuWidth: 250,
  column: [
    {
      type: "input",
      label: "标识",
      prop: "id",
      addDisplay: false,
      editDisabled: true,
      width: 80,
      sortable: true,
      search: true
    },
    {
      type: "input",
      label: "业务编码",
      prop: "businessCode",
      addDisplay: true,
      editDisabled: false,
      sortable: true,
      search: true
    }, {
      type: "input",
      label: "原始名",
      prop: "originalName",
      addDisplay: false,
      editDisabled: true,
      slot: true,
      search: true
    }, {
      type: "input",
      label: "自定义名",
      prop: "customName",
      addDisplay: true,
      editDisabled: false,
      slot: true,
      search: true
    }, {
      type: "input",
      label: "相对路径",
      prop: "relativePath",
      addDisplay: false,
      editDisabled: true,
      slot: true,
      search: true
    },
     {
      type: "input",
      label: "类型",
      prop: "filetype",
      addDisplay: false,
      editDisabled: true,
      sortable: true,
      search: true
    },
     {
      type: "number",
      label: "大小(B)",
      prop: "fileSize",
      addDisplay: false,
      editDisabled: true,
      slot: true,
      search: true,
      sortable: true
    }, {
      type: "datetime",
      label: "上传时间",
      prop: "createtime",
      addDisplay: false,
      editDisabled: true,
      sortable: true
    }, {
      type: "datetime",
      label: "上传时间",
      prop: "createtimeRange",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
      format: "yyyy年MM月dd HH时mm分ss秒",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      hide: true,
      addDisplay: false,
      editDisplay: false,
      searchRange: true,
      showColumn: false,
      search: true
    }, {
      type: "textarea",
      label: "备注",
      prop: "remark",
      hide: true,
      showColumn: false,
      span: 24,
    },
    //  {
    //   label: "预览",
    //   prop: "filePreviewRelativePath",
    //   hide: true,
    //   addDisplay: false,
    //   editDisabled: true,
    //   formslot: true,
    //   span: 24,
    //   showColumn: false,
    // }
  ]
}
