<template>
    <div class="hongguan">
        <div class="hongguan_box">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="预警设置" name="first">
                    <table class="basic_table" border="1px" width="100%" style="table-layout: fixed">
                        <tr align="center">
                            <td class="basic_title" v-for="(item,index) in showList" :key="index">{{item.type}}</td>
                        </tr>
                        <tr align="center">
                            <td class="" v-for="(item,index) in showList" :key="index">
                                <span class="danClock" v-for="(itee,numer) in item.data" :key="numer">{{itee.text}}</span>
                            </td>
                        </tr>
                    </table>
                    <div class="inputyu_div">
                        <div class="inputyujing">
                            蓝色预警：<el-input size="large" v-model="yuzhiData.warnBlue" placeholder="蓝色预警阈值" :disabled="bianjiType"></el-input>
                        </div>
                        <div class="inputyujing">
                            黄色预警：<el-input size="large" v-model="yuzhiData.warnYellow" placeholder="黄色预警阈值" :disabled="bianjiType"></el-input>
                        </div>
                        <div class="inputyujing">
                            橙色预警：<el-input size="large" v-model="yuzhiData.warnOrange" placeholder="橙色预警阈值" :disabled="bianjiType"></el-input>
                        </div>
                        <div class="inputyujing">
                            红色预警：<el-input size="large" v-model="yuzhiData.warnRed" placeholder="红色预警阈值" :disabled="bianjiType"></el-input>
                        </div>
                    </div>
                    <div v-if="bianjiType">
                        <el-button type="primary" size="medium" @click="bianjia">编辑</el-button>
                    </div>
                    <div v-else>
                        <el-button type="primary" size="medium" @click="baocun">保存</el-button>
                        <el-button size="medium" @click="closeEvent">取消</el-button>
                    </div>
                </el-tab-pane>
                <!-- <el-tab-pane label="宏观现象设置" name="second">
                    <avue-crud
                        :option="cradOption"
                        ref="crud"
                        v-model="form"
                        :page="page"
                        @on-load="getList"
                        @size-change="sizeChange"
                        @current-change="currentChange"
                        @search-change="handleFilter"
                        @search-reset="handlereset"
                        @refresh-change="handleRefreshChange"
                        :table-loading="listLoading"
                        :data="list"
                    >
                        <template slot="menuLeft">
                        <el-button
                            class="filter-item"
                            @change="handleCreate"
                            type="danger"
                            icon="el-icon-delete"
                            >批量删除
                        </el-button>
                        </template>
                    </avue-crud>
                </el-tab-pane> -->
            </el-tabs>
        </div>
    </div>
</template>

<script>

import { cradOptionData } from "@/const/crud/warningMag/hongguan";
import { 
    disaster_macro_observe_config,
    searchSersorType,
    edit_observe_config,
    disaster_macro_measured_data
} from "@/api/monitorManage/quxian";

export default {
    name:"",
    data(){
        return{
            activeName: 'first',
            shezhiType:true,

            choiseList:{
                radioOne: '10',
                radioTwo: '10',
                radioShree: '10',
                radioFour: '10',
            },
            inputList:{
                blueSmall:'',
                blueBig:'',
            },

            listLoading:true,
            cradOption:cradOptionData,
            yuzhiData:{
                id: 0,
                warnBlue: 0,
                warnOrange: 0,
                warnRed: 0,
                warnYellow: 0
            },
            showList:[],
            bianjiType:true,
            fuyuanData:{},
        }
    },
    created(){
        this.getData()
    },
    methods:{
        closeEvent(){
            this.bianjiType = true;
            this.yuzhiData = {
                id:this.fuyuanData.id,
                warnBlue:this.fuyuanData.warnBlue,
                warnOrange:this.fuyuanData.warnOrange,
                warnRed:this.fuyuanData.warnRed,
                warnYellow:this.fuyuanData.warnYellow,
            };
        },
        bianjia(){
            this.bianjiType = false;
        },
        baocun(){
            this.$confirm('是否确认更改？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                edit_observe_config({
                    id:Number(this.yuzhiData.id),
                    warnBlue:Number(this.yuzhiData.warnBlue),
                    warnOrange:Number(this.yuzhiData.warnOrange),
                    warnRed:Number(this.yuzhiData.warnRed),
                    warnYellow:Number(this.yuzhiData.warnYellow),
                }).then(res => {
                    this.bianjiType = true;
                    this.$message.success("预警设置成功！")
                })
            }).catch(() => {
                         
            });
        },
        getData(){
            disaster_macro_observe_config().then(res => {
                this.yuzhiData = {
                    id:Number(res.data.data.records[0].id),
                    warnBlue:Number(res.data.data.records[0].warnBlue),
                    warnOrange:Number(res.data.data.records[0].warnOrange),
                    warnRed:Number(res.data.data.records[0].warnRed),
                    warnYellow:Number(res.data.data.records[0].warnYellow),
                };
                
                this.fuyuanData = {
                    id:Number(res.data.data.records[0].id),
                    warnBlue:Number(res.data.data.records[0].warnBlue),
                    warnOrange:Number(res.data.data.records[0].warnOrange),
                    warnRed:Number(res.data.data.records[0].warnRed),
                    warnYellow:Number(res.data.data.records[0].warnYellow),
                };
            });

            searchSersorType("marco_info").then(res => {
                disaster_macro_measured_data({
                    size:10000
                }).then(prames => {//宏观预警接口value参数
                    const valueData = prames.data.data.records;

                    var showList = [];
                    var constList = [];
                    var num = 0;
                    var list = res.data.data;

                    for(var k=0;k<list.length;k++){
                        list[k].number = valueData[k].value;
                    }
                    
                    for(var i=0;i<list.length;i++){
                        const typeData = list[i].description.split("：");
                        if(constList.indexOf(typeData[0]) == -1){
                            num++;
                            showList[num] = {
                                type:typeData[0],
                                data:[]
                            };
                            constList.push(typeData[0])
                        };
                        showList[num].data.push({
                            text:typeData[1] + "(" + list[i].number + ")"
                        })
                    }
                    setTimeout(() => {
                        if(showList[0] == undefined){
                            showList.splice(0,1);
                        }
                        this.showList = showList;
                    }, 0);
                })
            })
        },
        handleClick(e){
            console.log(e)
        },
    }
}
</script>

<style lang="scss" scoped>
.hongguan{
    padding:30px;
    display: flex;
    justify-content: center;
}
.basic_table {
    border-color: #ccc;
    border: 1px solid #ccc;
    color: #333333;
    font-size: 16px;
}
.basic_title {
    background: #F6F5F5;
    height:50px;
}
.hongguan_box{
    width:99%;
}
.danClock:first-child{
    margin-top:23px;
}
.danClock{
    display: block;
    text-align: left;
    margin-left: 20px;
    height: 45px;
    display: flex;
}
::v-deep.el-input{
    width:auto!important;
}
.inputyu_div{

}
.inputyujing:first-child{
    padding-top:20px;
}
.inputyujing:last-child{
    padding-bottom:20px;
}
.inputyujing{
    padding-top:10px;
}
::v-deep.el-radio__label{
    font-size:16px;
}
::v-deep.el-radio__inner{
    width:16px;
    height:16px;
}
::v-deep.el-tabs__item{
    font-size:16px;
}
::v-deep.el-radio, .el-radio__input{
    white-space: normal;
}
.zhi_number{
    margin-top:20px;
    span{
        font-size:20px;
        color:red;
        font-weight: bold;
    }
    
}
</style>