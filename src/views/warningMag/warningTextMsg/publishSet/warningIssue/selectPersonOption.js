export const selectPersonOption = {
    index:true,
    indexLabel:'序号',
    menuAlign:'center',
    align:'center',
    border:true,
    stripe:true,
    addBtn:false,
    columnBtn:false,
    menu:false,
    selection:true,
    selectClearBtn:true,
    searchBtn:true,
    // filterBtn:true,
    searchMenuSpan:6,
    reserveSelection:true,
    clearExclude:["type"],
    column:[
        {
            prop:'name',
            label:'姓名',
            search: true,
            searchRules: [{ required: false }]
        },
        {
            prop:'phone',
            label:'电话',
            search: true,
            searchRules: [{ required: false }]
        // },
        // {
        //     prop:'streetName',
        //     label:'街道',
        // },
        // {
        //     prop:'streetCode',
        //     label: '街道',
        //     hide:true,
        //     // search: true,
     // searchRules: [{ required: false }],
        //     // type:'select',
        //     // dicData:[],
        //     // props:{
        //     //     label:'name',
        //     //     value:'id'
        //     // },
        //     // dicUrl:'/area/parentId/440303',
        //     // cascaderItem:["communityCode"],
        //     // dicFormatter:res => {
        //     //     return res.data;
        //     // },
        // },
        // {
        //     prop:'communityName',
        //     label:'社区',
        // },
        // {
        //     label: '社区',
        //     prop: 'communityCode',
        //     hide:true,
        //     // search: true,
     // searchRules: [{ required: false }],
        //     // type: "select",
        //     // dicData: [],
        //     // props: {
        //     //   label: "name",
        //     //   value: "id",
        //     // },
        //     // dicUrl:"/area/parentId/{{key}}",
        //     // dicFormatter:res => {
        //     //   return res.data;
        //     // }
          }, 
        {
            prop:'type',
            label:'用户类别',
            // search: true,
            // searchRules: [{ required: false }],
            type:'select',
            // dicData: [],
            props: {
              label: "label",
              value: "dictValue",
            },
            dicUrl:"/admin/dict/types?types=warn_person_type",
            dicFormatter:res => {
              return res.data.warn_person_type;
            },
            // hide:true,
        // },
        // {
        //     prop:'typeName',
        //     label:'用户类别'
        },
        {
            prop:'id',
            label:'用户id',
            hide:true
        }
    ]
}