export const selectPersonOption = {
    index:true,
    indexLabel:'序号',
    menuAlign:'center',
    align:'center',
    border:true,
    stripe:true,
    addBtn:false,
    menu:false,
    selection:true,
    selectClearBtn:true,
    searchBtn:true,
    filterBtn:true,
    searchMenuSpan:6,
    reserveSelection:true,
    clearExclude:["type"],
    column:[
        {
            prop:'name',
            label:'姓名',
            search:true
        },
        {
            prop:'phone',
            label:'电话',
            search:true
        },
        {
            prop:'streetName',
            label:'街道',
        },
        {
            prop:'streetCode',
            label: '街道',
            hide:true,
            // search:true,
            // type:'select',
            // dicData:[],
            // props:{
            //     label:'name',
            //     value:'id'
            // },
            // dicUrl:'/area/parentId/440308',
            // cascaderItem:["communityCode"],
            // dicFormatter:res => {
            //     return res.data;
            // },
        },
        {
            prop:'communityName',
            label:'社区',
        },
        {
            label: '社区',
            prop: 'communityCode',
            hide:true,
            // search: true,
            // type: "select",
            // dicData: [],
            // props: {
            //   label: "name",
            //   value: "id",
            // },
            // dicUrl:"/area/parentId/{{key}}",
            // dicFormatter:res => {
            //   return res.data;
            // }
          }, 
        {
            prop:'type',
            label:'用户类别',
            // search:true,
            // type:'select',
            // dicData: [],
            // props: {
            //   label: "label",
            //   value: "value",
            // },
            // dicUrl:"/admin/dict/type/qcqf_person_type",
            // dicFormatter:res => {
            //   return res.data;
            // },
            hide:true,
        },
        {
            prop:'typeName',
            label:'用户类别'
        },
        {
            prop:'id',
            label:'用户id',
            hide:true
        }
    ]
}