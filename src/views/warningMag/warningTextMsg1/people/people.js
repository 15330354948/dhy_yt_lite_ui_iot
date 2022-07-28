export const peopleOption = {
    // addBtn: false,
    // editBtn: false,
    viewBtn:true,
    delBtn: false,
    reserveSelection: true,
    selectClearBtn: true,
    selection: true,
    searchBtn: true,
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    align: 'center',
    // menu: false,
    searchMenuSpan: 6,
    column: [{
        label: '姓名',
        prop: 'name',
        search: true,
        rules: [{
            required: true,
            message: '请输入姓名',}]
      },
      {
        label: '手机号码',
        prop: 'phoneNum',
        search: true,
        maxlength: 11,
        minlength: 11,
        rules: [{
            required: true,
            message: '请输入正确的手机号码',
            trigger: 'blur',
            pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
          }]
      },
      {
        label: '职务',
        prop: 'description',
        search: true,
        rules: [{
            required: true,
            message: '请输入职务',}]
      },
    ]
  }
  