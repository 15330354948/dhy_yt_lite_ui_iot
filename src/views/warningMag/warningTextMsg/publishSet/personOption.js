export const personOption = {
    index:true,
    indexLabel:'序号',
    menuAlign:'center',
    align:'center',
    border:true,
    sripe:true,
    addBtn:false,
    editBtn:false,
    column:[
        {
            prop:'name',
            label:'姓名',
            span: 12,
            // hide:true,//表单显隐
            rules: [{
            required: true,
            message: '请填写姓名',
            }]
        },
        {
            prop:'phone',
            label:'联系电话',
            span: 12,
            // hide:true,//表单显隐
            rules: [{
            required: true,
            message: '请填写联系电话',
            }]
        },
        {
            prop:'type',
            label:'用户类别',
            span: 12,
            // hide:true,//表单显隐
            rules: [{
            required: true,
            message: '请填写',
            }]
        },
    ]
}