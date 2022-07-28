
export const tableOption = {
  border: true,
  index: true,
  indexLabel: "序号",
  stripe: true,
  searchMenuSpan: 6,
  // addBtn:false,
  delBtn: false,
  editBtn: false,
  viewBtn:true,
  align: "center",
  menuAlign: "center",
  column: [
    {
      label: "版本号",
      prop: "code",
      rules: [
        {
          required: true,
          message: "请输入code",
          trigger: "blur",
        },
      ],
    },
    {
      label: "版本名称",
      prop: "name",
      rules: [
        {
          required: true,
          message: "请输入版本名称",
          trigger: "blur",
        },
      ],
    },
    {
      label: "上传附件",
      prop: "url1",
      span: 24,
      slot: true,
      formslot: true,
      hide: true,
      viewDisplay:false
    },
    {
      label: "文件大小",
      prop: "fileSize",
      addDisplay:false
    },{
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      addDisplay:false
    },
    {
      label: "备注",
      type: "textarea",
      span: 24,
      prop: "note",
      hide:true
    },
    {
      label: "下载地址",
      prop: "netUrl",
      span:24,
      addDisplay:false,
    },
  ],
};
