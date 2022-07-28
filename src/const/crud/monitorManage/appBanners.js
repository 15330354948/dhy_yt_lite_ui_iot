export const tableOption = {
  align: 'center',
  menuAlign: 'center',
  editBtn: false,
  border: true,
  indexLabel: '序号',
  selection: true,
  column: [{
    label: '标题',
    prop: 'title',
    search: true,
    rules: [{
      required: true,
      message: "请输入标题",
      trigger: "blur"
    }],
  }, {
    label: '排序',
    prop: 'sort',
    type: 'number',
    span: 6,
    rules: [{
      required: true,
      message: "请输入排序",
      trigger: "blur"
    }],
    mock: {
      type: 'number',
      max: 1,
      min: 2,
    },
    minRows: 0,
    row: true,
  }, {
    label: '图片',
    prop: 'url',
    type: 'upload',
    listType: 'picture-img',
    fileSize: 20480,
    rules: [{
      required: true,
      message: "请上传图片",
      trigger: "blur"
    }],
    tip: '只能上传jpg/png文件，且不超过500kb',
    propsHttp: {
      url: 'url',
      name: 'id',
      res: 'data.infos.0'
    },
    action: "/file/upload"
  }]
}
