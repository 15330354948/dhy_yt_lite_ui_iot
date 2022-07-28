/*
 * @Author: 张峻霖
 * @Date: 2021-09-18 13:06:11
 * @LastEditTime: 2021-09-18 20:46:07
 * @LastEditors: 张峻霖
 * @Description: 
 * @FilePath: \LH-UI\src\views\hideDanger\aversion\aversionOption.js
 */
function validatePhoneNum(rule,value,callback){
  const reg = /^1[0-9]{10}$/;
  if(!reg.test(value)){
    callback(new Error('请输入正确手机号！'))
  }else{
    callback();
  }
}
export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  labelWidth: 120,
  searchLabelWidth: 120,
  stripe: true,
  showHeader: true,
  menuAlign: 'center',
  searchMenuSpan: 6,
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  dialogClickModal: false,
  showCheckbox:true,
  selection:true,
  column: [{
    prop: 'householderName',
    label: '户主姓名',
    search: true,
    span: 12
  }, {
    label: '户主联系电话',
    prop: 'householderPhone',
    search: true,
    span: 12,
    rules: [{
      validator:validatePhoneNum,trigger:'blur'
    }]
  }, {
    label: '家庭人数',
    prop: 'familyNumber',
    span: 12
  }, {
    label: '家庭住址',
    prop: 'homeAddress',
    span: 12,
    search: true,
  }]
}
