const DIC = {
  vaild: [{
    label: '否',
    value: 'false'
  }, {
    label: '是',
    value: 'true'
  }]
}
export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  searchMenuSpan: 6,
  column: [{
    width: 150,
    label: '编号',
    prop: 'clientId',
    sortable: true,
    rules: [{
      required: true,
      message: '请输入clientId',
      trigger: 'blur'
    }]
  }, {
    label: '密钥',
    prop: 'clientSecret',
    sortable: true,
    overHidden: true,
    width: 120,
    rules: [{
      required: true,
      message: '请输入clientSecret',
      trigger: 'blur'
    }]
  }, {
    label: '域',
    prop: 'scope',
    rules: [{
      required: true,
      message: '请输入scope',
      trigger: 'blur'
    }]
  },
  //  {
  //   type: 'checkbox',
  //   label: '授权模式',
  //   prop: 'authorizedGrantTypes',
  //   overHidden: true,
  //   span: 24,
  //   dataType: "string",
  //   dicUrl: "/admin/dict/type/oauth_client_grant_types",
  //   formatter: function (row) {
  //     return row['authorizedGrantTypes'].split(" ")
  //   },
  //   hide:true,
  //   addDisplay: false,
  //   editDisplay: false,
  //   viewDisplay: false,
  //   rules: [{
  //     required: true,
  //     message: '请输入授权模式',
  //     trigger: 'blur'
  //   }],
  // }, 
  {
    label: '回调地址',
    prop: 'webServerRedirectUri',
    span: 24,
    hide: true
  }, {
    label: '权限',
    prop: 'authorities',
    hide: true
  }, {
    label: '自动放行',
    prop: 'autoapprove',
    type: 'radio',
    border: true,
    dicData: DIC.vaild,
    rules: [{
      required: true,
      message: '请选择是否放行',
      trigger: 'blur'
    }]
  }, {
    label: '令牌时效',
    prop: 'accessTokenValidity',
  }, {
    label: '刷新时效',
    prop: 'refreshTokenValidity',
  },
  //  {
  //   span: 24,
  //   type: 'textarea',
  //   label: '扩展信息',
  //   prop: 'additionalInformation',
  //   formslot:true,
  //   hide: true
  // }
]
}
