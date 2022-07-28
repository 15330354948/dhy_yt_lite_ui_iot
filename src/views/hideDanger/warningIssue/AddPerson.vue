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
                   <!-- <template slot="menuLeft">
                       <avue-radio :dic="personType" v-model="selectedType"></avue-radio>
                   </template> -->
                   <template slot="search">
          <el-form label-position="right" label-width="80px">
            <el-form-item label="街道:">
              <el-select
                style="width: 250px"
                clearable
                v-if="streetCodes.length"
                v-model="customSearchForm.streetCode"
                @change="streetChange"
                placeholder="请选择街道"
              >
                <el-option
                  v-for="item in streetCodes"
                  :key="item.id * 1"
                  :label="item.name"
                  :value="item.id * 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </template>
         <template slot="search">
          <el-form label-position="right" label-width="80px">
            <el-form-item label="社区:">
              <el-select
                style="width: 250px"
                clearable
                v-model="customSearchForm.communityCode"
                placeholder="请选择社区"
              >
                <el-option
                  v-for="item in communityCodes"
                  :key="item.id * 1"
                  :label="item.name"
                  :value="item.id * 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </template>
                   <template slot="search">
                       <el-form-item label="用户类别">
                        <el-select  style="width:250px"
                                    v-if="personsType.length"
                                    v-model="selectType"
                                    >
                                    <el-option  v-for="item in personsType"
                                                :key="item.value * 1"
                                                :label="item.label"
                                                :value="item.value * 1"></el-option>
                                    </el-select>
                       </el-form-item>
                   </template>
                   </avue-crud>
    </div>
</template>

<script>
import {selectPersonOption} from './selectPersonOption';
import {warnPersonnelAdd} from '@/api/warningIssue';
import {dictionary,areaData,qcqfPersonDatas,zhryPersonDatas} from "@/api/hideDanger/obj";
export default {
    props:['warnType','addDialog','personsType'],
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
            let areaCode = code ? code : 440308;
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
            let form = Object.assign({current:this.page.currentPage,size:this.page.pageSize,type:this.selectType},this.searchForm,this.customSearchForm);
            let getData;
            getData = this.searchForm.type == 4 ? zhryPersonDatas : qcqfPersonDatas;
            getData(form).then(res => {
                this.selectPersonList = res.data.data.records;
                if(this.searchForm.type == 4){
                    this.selectPersonList.forEach(item => {
                    item.type = 4;
                    item.typeName = item.type ? this.personsType.filter( type =>{
                        return type.value*1 == item.type;
                    })[0].label : '';//类型名称
                })
                }else{
                    this.selectPersonList.forEach(item => {
                    item.typeName = item.type ? this.personsType.filter( type =>{
                        return type.value*1 == item.type;
                    })[0].label : '';//类型名称
                })
                }
                this.page.total = res.data.data.total;
                this.tableLoading = false;
            })
        },
        selectionChange(list) {
            this.personNames = [];
            this.addPersons = [];
            let disasterId = JSON.parse(window.sessionStorage.getItem('disasterData')).id
            list.forEach(e => {
                this.personNames.push(e);
                this.addPersons.push(Object.assign({warnType:this.warnType,type:e.type,disasterId:disasterId,delFlag:e.delFlag,personId:e.id}));
            });
        },
        handleFilter(form, done) {
            this.searchForm = form;
            this.searchForm.type = this.selectType;
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