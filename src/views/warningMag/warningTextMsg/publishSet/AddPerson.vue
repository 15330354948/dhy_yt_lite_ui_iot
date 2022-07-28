<template>
    <div class="add-person">
        <div class="person-box">
            <el-tag
                    v-for="(item,index) in personNames"
                    :key="item.id"
                    closable
                    @close="delPerson(index,item)">{{item.name}}</el-tag>
        </div>
        <div class="select-button">
            <el-button type="primary" size="medium" @click="closeDialog(1)">确认</el-button>
            <el-button size="medium" @click="closeDialog(0)">取消</el-button>
        </div>
        <avue-crud :option="selectPersonOption"
                   :data="selectPersonList"
                   :page.sync="page"
                   ref="personCruds"
                   @on-load="getSelectPersonList"
                   :table-loading="tableLoading"
                   @search-change="handleFilter"
                   @refresh-change="handleRefreshChange"
                   @size-change="sizeChange"
                   @current-change="currentChange"
                   @selection-change="selectionChange"></avue-crud>
    </div>
</template>

<script>
import {selectPersonOption} from './selectPersonOption'
export default {
    data(){
        return{
            personNames:[
        // {
        // name:'张三',
        // id:1
        // },
        // {
        // name:'李四',
        // id:2
        // },
        // {
        // name:'王麻子',
        // id:3
        // }
        ],
        page: {
                total: 100, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 20, // 每页显示多少条,
                isAsc: false//是否倒序
            },
        selectPersonOption:selectPersonOption,
        selectPersonList:[
            {
                name:'张1',
                phone:'9090900',
                streetName:'XX街道',
                communityName:'XX社区',
                type:'群测群防员',
                id:2
            },
            {
                name:'张2',
                phone:'9090900',
                streetName:'XX街道',
                communityName:'XX社区',
                type:'群测群防员',
                id:3
            },
            {
                name:'张4',
                phone:'9090900',
                streetName:'XX街道',
                communityName:'XX社区',
                type:'群测群防员',
                id:4
            },
            {
                name:'张5',
                phone:'9090900',
                streetName:'XX街道',
                communityName:'XX社区',
                type:'群测群防员',
                id:5
            },{
                name:'张6',
                phone:'9090900',
                streetName:'XX街道',
                communityName:'XX社区',
                type:'群测群防员',
                id:6
            }
        ],
        tableLoading:false,
        searchForm:{}
        }
    },
    watch:{

    },
    methods:{
        delPerson(index,item){
            this.$refs.personCruds.toggleRowSelection(item,false);
        },
        sizeChange(pageSize) {
        this.page.pageSize = pageSize
        },
        currentChange(current) {
        this.page.currentPage = current
        },
        getSelectPersonList(){
            this.tableLoading = true;
            setTimeout(()=>{
                this.tableLoading = false;
            })
        },
        selectionChange(list) {
            this.personNames = [];
            list.forEach(e => {
                this.personNames.push(e);
            });
        },
        handleFilter(form, done) {
            this.searchForm = form;
            this.page.currentPage = 1;
            this.getSelectPersonList(this.page, form);
            done()
        },
        handleRefreshChange() {
            this.getSelectPersonList(this.page);
        },
        closeDialog(n){
            this.$emit('closeDialog',n)
        }
    }
}
</script>
<style lang="scss" scoped>
.person-box{
    height: 100px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    .el-tag{
        font-size: 15px;
        margin: 4px;
    }
}
.select-button{float: right;margin: 20px 0;}
.avue-crud{margin-top: 80px;}
</style>
