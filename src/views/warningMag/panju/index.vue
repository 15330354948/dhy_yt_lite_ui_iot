 <!-- 判断依据 -->
<template>
    <div class="criterion">
        <div class="wrapper">
            <div class="top">
                <div class="formbox">
                    <el-form
                        ref="form"
                        :model="form"
                        label-width="80px"
                        size="mini"
                    >
                        <el-form-item label="判据名称" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="监测类型" prop="type">
                            <el-select
                                v-model="form.type"
                                placeholder="请选择监测类型"
                                @change="waicengChoise"
                            >
                                <el-option v-for="(item,index) in jianceleixing" :key="index" :label="item.staticName" :value="item.staticKeyval"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="btnBox">
                    <el-button type="primary" size="mini" @click="query" :disabled="loading">查询</el-button>
                    <el-button size="mini" @click="reset" :disabled="loading">重置</el-button>
                </div>

                <div class="pageBox">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-sizes="[10, 20, 50, 100]"
                        layout="total, prev, pager, next, sizes"
                        :total="getdata.total"
                        :pager-count="5"
                        :disabled="loading"
                    >
                    </el-pagination>
                </div>
            </div>

            <div class="content" v-loading="loading" :style="loading?'overflow-y:hidden!important':''">
                <div class="add-group" @click="addPanju">
                    <div class="panju-div">
                        <div class="panju-wrap">
                            <div class="add-pj">
                                <i
                                    class="el-icon-s-claim add-icon"
                                    style="color: #e7565d"
                                ></i>
                                <span class="add-text">新增判据</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="group" v-for="(item,index) in getdata.records" :key="index">
                    <div class="panju-div">
                        <div class="panju-wrap">
                            <div class="panju-listdata">
                                <div class="pj-top">
                                    <!-- <img :src="require('@/assets/images/icons/img/' + imgType[item.monitorType][0].img)" alt=""> -->
                                    <span>{{ item.criterionName }}</span>
                                </div>
                                <div class="bot-btn">
                                    <button class="edit" @click="edit(item)">编辑</button>
                                    <i class="column"></i>
                                    <button class="del" @click="del(item.id)">删除</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <editAddPanju v-if="add_panju" v-on:close_addPanju="close_addPanju" :editpanjudata="editpanjudataValue"></editAddPanju>
    </div>
</template>

<script>
// import { getSensorList } from '@/api/menus/panjuHoutai';
import editAddPanju from "./editAddPanju";
// import { imgType } from '@/util/panjuObj.js';

// import {
//     panjusearch,
//     panjudelete,
// } from "@/api/menus/dangerCriterion";

export default {
    components:{
        "editAddPanju" : editAddPanju
    },
    data() {
        return {
            // imgType:imgType,
            loading:false,
            jianceleixing:[],
            
            form:{
                name:'',
                type:'',
            },
            currentPage: 1,
            add_panju:false,
            inforScreenType:false,
            getdata:{},

            current:1,
            size:10,
            editpanjudataValue:{}
        };
    },
    created() {
        // getSensorList().then(res => {
        //     if(res.status == 200){
        //         this.jianceleixing = res.data.data;
        //     }
        // })

        this.getDataList();
    },
    methods: {
        getDataList:function(){
            this.loading = false;
            setTimeout(() => {
                // panjusearch({
                //     criterionName:this.form.name,
                //     monitorType:this.form.type,
                //     current:this.current,
                //     size:this.size
                // }).then((res) => {
                //     this.loading = false;
                //     this.getdata = res.data.data;
                // })
            }, 300);
        },
        close_addPanju:function(val){
            if(val == false){
                this.add_panju = false;
            }else if (val == 'shuaxinData'){
                this.add_panju = false;
                this.current = 1;
                this.size = 10;
                this.getDataList();
            }
        },
        waicengChoise:function(e){
            // console.log(e)
        },
        addPanju:function(){//新增
            this.add_panju = true;
            this.editpanjudataValue = {};
        },
        handleSizeChange(val) {//页码
            this.current = 1;
            this.size = val;
            this.getDataList();
        },
        handleCurrentChange(val) {//点击其他分页
            this.current = val;
            this.getDataList();
        },
        query(){//查询
            this.loading = false;
            // panjusearch(
            //     {
            //         criterionName:this.form.name,
            //         monitorType:this.form.type,
            //     }
            // ).then((res) => {
            //     this.loading = false;
            //     if(res.status == 200){
            //         // console.log(res)
            //         this.getdata = res.data.data;
            //     }else{
                     
            //     }
            //     // setTimeout(() => {
            //     //     this.loading = false;
            //     //     this.$message({
            //     //         message:'查询成功。',
            //     //         type:'success',
            //     //         center:true
            //     //     })
            //     // }, 300);
            // })
            
        },
        reset:function(){
            this.$refs.form.resetFields();
            this.current = 1;
            this.currentPage = 1;
            this.getDataList();
        },
        edit(num) {//编辑
            this.editpanjudataValue = num;
            if(num.modelId > 0){
                this.editpanjudataValue.jingzhiChoiseType = false;
            }
            this.add_panju = true;
        },
        del(num) {//删除
            this.$confirm(" 是否删除该判据?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                // panjudelete(num).then((res) => {
                //     if(res.status == 200){
                //         this.$message({
                //             type: "success",
                //             message: "删除成功!",
                //         });
                //         this.getDataList();
                //     }else{
                //         this.$message({
                //             type: "warning",
                //             message: "删除失败!",
                //         });
                //     }
                // })
            }).catch(() => {
                // this.$message({
                //     type: "info",
                //     message: "已取消删除",
                // });
            });
        },
    },
};
</script>

<style lang="scss" scoped>
$back_color : #238bf1;
$font_color : #3a3a3a;
$font_big : 18px;
$font-small : 14px;


.addpanju_btn{
    background:$back_color;
    color:white;
}
.yellow_color{
    background:#e8db09!important;
}
.orange_color{
    background:#fbac01!important;
}
.red_color{
    background:#ff0303!important;
}
.panju_padding{
    padding-left:15px;
    padding-right:15px;
}
.font-color{
    color:$back_color;
    cursor:pointer;
}

.criterion {
    height: 100%;
    padding: 10px;
    font-size: 14px;
    overflow: hidden !important;
    box-sizing: border-box;

    .wrapper {
        width: 100%;
        height: 100%;
        margin: 0 auto;

        .top {
            height: 60px;
            width: 100%;
            border: 1px solid #d9d9d9;
            display: flex;
            justify-content: space-between;
            background:white;
            align-items: center;

            .el-form-item {
                width: 50%;
                display: inline-block;
                margin: 0;
            }

            .el-form {
                width: 450px;
                padding-right: 10px;
            }

            ::v-deep.btnBox {
                flex: 1;
            }

            ::v-deep.el-pager>li, ::v-deep.btn-prev, ::v-deep.btn-next {
                margin: 0 4px;
                font-size: 14px;
                border-radius: 3px;
                border: 1px solid #DCDFE6;
                color: rgba(102, 102, 102, 0.9);
                font-weight: normal;
                min-width: 28px;
                height: 28px;
                line-height: 28px;
            }

            ::v-deep.btn-prev, ::v-deep.btn-next {
                padding: 0;
            }

            ::v-deep.el-pager li.active {
                border: 1px solid #238bf1;
                color: #238bf1;
            }
        }

        ::v-deep::-webkit-scrollbar-corner {
            background-color: #000;
        }

        ::v-deep::-webkit-scrollbar {
            width: 4px;
            height: 4px;
            background-color: #fff;
        }

        ::v-deep::-webkit-scrollbar-thumb {
            background-color: hsla(0, 0%, 63.5%, 0.8);
            border-radius: 0;
        }

        ::v-deep::-webkit-scrollbar-button {
            width: 4px;
            height: 4px;
            background-color: rgba(196, 175, 145, 0.25);
        }

        .content {
            height: calc(100% - 70px);
            margin-top: 10px;
            overflow-y: auto;
            background: white;
            box-sizing: border-box;
        }

        .panju-div{
            width:96%;
            height:96%;
            padding:2%;

            .panju-wrap{
                width:100%;
                height:100%;
                border: 1px dashed #d9d9d9;
                display :flex;
                align-items :center;
                justify-content :center;
            }

            .panju-listdata{
                width:100%;
                height:100%;
                position :relative;
            }


            .panju-wrap:hover{
                transition: all 0.3s, height 0s;
                border: 1px dashed #409EFF;
            }
        }

        .add-group {
            display: flex;
            justify-content: center;

            .add-pj {
                display: flex;
                flex-direction: column;
                align-items: center;

                i {
                    font-size: 45px;
                }
            }
        }

        .add-group, .group {
            width: 33.3%;
            height: 200px;
            margin-bottom: 15px;
            box-sizing: border-box;
            float: left;
        }

        

        .add-group:hover{
            cursor :pointer;
        }

        ::v-deep.add-group:hover .el-icon-s-claim {
            transition: all 0.3s, height 0s;
            color: #409EFF !important;
        }

        ::v-deep.add-group:hover .add-text {
            transition: all 0.3s, height 0s;
            color: #409EFF;
        }

        .group:hover .panju-wrap{
            transition: all 0.3s, height 0s;
            box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
        }

        .pj-top {
            display: flex;
            align-items: center;
            padding: 15px 10px;
            box-sizing: border-box;

            img{
                width:48px;
                margin-right:15px;
                margin-left:10px;
            }

            ::v-deepspan {
                word-break:break-all;
                font-weight:bold;
                font-size:17px;
            }
        }

        .icons {
            font-size: 45px;
            margin-right: 10px;
        }

        .bot-btn {
            width: 100%;
            position: absolute;
            bottom: 0;
        }

        .edit, .del {
            box-sizing: border-box;
            border: none;
            background-color: #fafafa;
            height: 40px;
            width: 50%;
        }

        .edit:hover, .del:hover {
            color: #409EFF;
        }

        .column {
            height: 22px;
            border-right: 1px solid #e8e8e8;
            position: absolute;
            top: 10px;
        }
    }
}
</style>