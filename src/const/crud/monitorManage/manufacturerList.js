import {hasSpace,isNum,isInteger,validatePhoneNum} from '@/util/validate'
export const tableOption = {
  align: "center",
  searchLabelWidth: 100,
  searchSpan: 6,
  labelWidth: 100,
  selection: true,
  tip: false,
  delBtnText: "删除",
  excelBtn: false,
  border: true,
  editBtn:false,
  addBtn:false,
  column: [
    {
      label: "厂商名称",
      search: true,
      prop: "name",
      maxlength: 30,
      rules: [
        {
          required: true,
          message: "请输入厂商名称",
          trigger: "blur"
        },
        {
          validator:hasSpace,
          trigger: "blur"
        }
      ]
    },
    {
      label: "联系人",
      search: true,
      prop: "person",
      maxlength: 30,
      rules: [
        {
          required: true,
          message: "请输入联系人",
          trigger: "blur"
        },
        {
          validator:hasSpace,
          trigger: "blur"
        }
      ]
    },
    {
      label: "联系电话",
      search: true,
      prop: "phone",
      maxlength: 11,
      rules: [
        {
          required: true,
          message: "请输入联系电话",
          trigger: "blur"
        },
        {
          validator:validatePhoneNum,
          trigger: "blur"
        }
      ]
    },
    {
      label: "设备数",
      prop: "deviceCount",
      search: false,
      addDisplay: false,
      editDisplay: false
    },
    {
      label: "在线率",
      prop: "onlineRate",
      search: false,
      addDisplay: false,
      editDisplay: false,
      // formslot:true, 
      formatter: (row,value,label,column) => {
        if(value){
          var arr = value 
          return arr+"%"
        }
        
      }
    }
  ]
};

