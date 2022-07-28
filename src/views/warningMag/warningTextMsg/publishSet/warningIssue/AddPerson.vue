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
                   @selection-change="selectionChange"
                   @search-reset="searchReset">
                  
                   </avue-crud>
    </div>
</template>

<script>
import {selectPersonOption} from './selectPersonOption';
import {warnPersonnelAdd} from '@/api/warningIssue';
import {dictionary,areaData,qcqfPersonDatas,zhryPersonDatas} from "@/api/hideDanger/obj";
import {  fetchList } from '@/api/warningMag/personManage'
export default {
    props:['warnLevel','addDialog','personsType',"dataParent"],
    data(){
        return{
        personNames:[],
        addPersons:[],//
        streetCodes:[],
        communityCodes:[],
        personType:[
            {label:'群测群防员',value:0},
            {label:'综合人员',value:1}
        ],
        page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 10, // 每页显示多少条,
                isAsc: false//是否倒序
            },
        selectPersonOption:selectPersonOption,
        selectPersonList:[],
        tableLoading:false,
        searchForm:{},
        selectType:1,
        customSearchForm:{}
        }
    },
    watch:{
        addDialog(val){
            if(val){
                this.selectType = 1;
                this.$refs.personCruds.searchReset();
                this.searchReset();
            }
        },
    },
    methods:{
        // getDictionary(){
        //     dictionary("qcqf_person_type").then( res =>{
        //         this.personsType = res.data.data;
        //     });
        //     this.getSelectPersonList();

        // },
        streetChange(code){
            code ? this.getArea(code) : (this.communityCodes = []);
        },
        getArea(code){
            let areaCode = code ? code : 440303;
            areaData(areaCode).then( res => {
                if(code){
                this.communityCodes = res.data.data;
                }else{
                this.streetCodes = res.data.data;
                }
            })
        },
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
            this.getArea();
            this.tableLoading = true;
            let form = Object.assign({current:this.page.currentPage,size:this.page.pageSize,
            "projectId":this.dataParent.projectId,
            },this.searchForm,this.customSearchForm);
            // let form = Object.assign({current:this.page.currentPage,size:this.page.pageSize,type:this.selectType},this.searchForm,this.customSearchForm);
            let getData;
            // getData = this.searchForm.type == 4 ? zhryPersonDatas : qcqfPersonDatas;
            getData=fetchList
            getData(form).then(res => {
                this.selectPersonList = res.data.data.records;
                this.page.total = res.data.data.total;
                this.tableLoading = false;
            })
        },
        selectionChange(list) {
            this.personNames = [];
            this.addPersons = [];
            // let disasterId = JSON.parse(window.sessionStorage.getItem('disasterData')).id
            list.forEach(e => {
                this.personNames.push(e);
                this.addPersons.push(Object.assign({warnLevel:this.warnLevel,type:e.type,personId:e.id}));
                // this.addPersons.push(Object.assign({warnLevel:this.warnLevel,type:e.type,disasterId:disasterId,delFlag:e.delFlag,personId:e.id}));
            });
        },
        handleFilter(form, done) {
            this.searchForm = form;
            // this.searchForm.type = this.selectType;
            this.page.currentPage = 1;
            this.getSelectPersonList(this.page, this.searchForm);
            done()
        },
        handleRefreshChange() {
            this.getSelectPersonList(this.page);
        },
        closeDialog(n){
            if(n == 1){//确定时提交新增接口
                warnPersonnelAdd(this.addPersons).then(res => {
                    this.$message.success("选择成功！");
                    this.$emit('closeDialog',n);
                })
            }else{
                    this.$emit('closeDialog',n);
            }
        },
        selectClear(){
            this.$refs.personCruds.selectClear();
        },
        searchReset(){//搜索清空
            this.communityCodes = [];
            this.customSearchForm = {};
            this.searchForm = {};
            this.getSelectPersonList();
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