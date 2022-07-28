<template>
    <div class="warning-model filed_data">
        <div class="field_data__tree">
            <p class="field_data__title">综合预警模型</p>
        </div>
        <div class="model-header center-v">
            <div class="model-header-left flex center-v">
                 <span class="flex-1">模型名称:</span>
                <el-input clearable class="name-input flex-2" v-model="params.name"></el-input>
                <div class="flex-2">
                <el-button type="primary" @click="searchModel">搜索</el-button>
                <el-button @click="clearForm">清空</el-button>
                </div>
            </div>
            <div class="model-header-right"> 
                <el-pagination background
                               :page-size="20"
                               :page-sizes="[20,30,40,50]"
                               :total="total"
                               layout="prev,pager,next,sizes"
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page.sync="page.currentPage"></el-pagination>
            </div>
        </div>
        <div class="model-content">
            <div class="model-item font-24 flex center-v center-h pointer" @click="addModel">+ 新增模型</div>
            <div class="model-item" v-for="item in 10" :key="item">
                <div class="model-item-header">综合预警模型名称</div>
                <div class="model-item-center"></div>
                <div class="model-item-footer flex">
                    <el-button type="primary">编辑</el-button>
                    <el-button type="danger">删除</el-button>
                </div>
            </div>
        </div>
        <el-dialog  title="新增预警模型"
                   :visible.sync="dialogVisible"
                   width="65%"
                   :before-close="beforeClose"
                   @close="dialogClose"
                   append-to-body
                   >
                   <add-model class="model-dialog" ref="addModelChild"></add-model>
                   <div slot="footer" class="dialog-footer">
                       <el-button @click="saveModel" type="primary" size="medium">确认</el-button>
                       <el-button @click="dialogClose" size="medium">取消</el-button>
                   </div>
                   </el-dialog>
    </div>
</template>

<script>
import AddModel from './AddModel'
export default {
    props:['openTab','dialogFormVisible'],
    components:{
        AddModel
    },
    data(){
        return{
            params:{
                name:''
            },
            page:{
                pageSize:20,
                currentPage:1,
            },
            total:100,
            dialogVisible:false

        }
    },
    watch:{
        dialogFormVisible(val){
            if(val){
                this.getTableData();
            }
        },
        openTab(n){
            if( n == 7){
                this.getTableData();
            }
        },
        openTab:{
            deep:true,
            immediate:true,
            handler(val,old){
                if(val == 7){
                this.getTableData();
                }
            }
            }
    },
    created(){},
    methods:{
        handleSizeChange(val){
        },
        handleCurrentChange(current){
        },
        clearForm(){
            this.page.pageSize = 20;
            this.page.currentPage = 1;
            this.params.name = null;
            this.getTableData();
        },
        getTableData(){

        },
        searchModel(){
            let obj = Object.assign(this.params,this.page);
        },
        addModel(){
            this.dialogVisible = true;
        },
        beforeClose(done){
            this.$confirm("确认关闭?",{
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(res => {
                this.dialogClose();
                done();
            }).catch(cancel => {
                this.dialogVisible = true;
            })
        },
        dialogClose(){
            this.dialogVisible = false;
            this.$refs.addModelChild.addForm = {};
        },
        saveModel(){
            this.dialogClose();
        }
    }
}
</script>

<style lang="scss" scoped>
.flex{display: flex;}
.flex-1{flex: 1;}
.flex-2{flex: 2;}
.font-24{font-size: 24px;}
.center-v{align-items: center;}
.center-h{justify-content: center;}
.pointer{cursor: pointer;}
.model-header{
    display: flex;
    justify-content: space-between;
    text-align: right;
    .model-header-left,.model-header-right{
        flex:1;
        span{
            margin-right: 10px;
        }
    }
}
.model-content{
    width: 100%;
    :nth-child(4n){
        margin-right: 0px;
    };
    padding: 60px 20px 20px;
}
.model-item{
    width: 22%;
    height: 300px;
    padding: 10px;
    margin-right: 4%;
    border: 1px solid #ddd;
    float: left;
    margin-bottom: 20px;
    box-sizing: border-box;
    .model-item-header{
        height: 30px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
    }
    .model-item-center{
        height: 210px;
    }
    .model-item-footer{
        height: 40px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
}
.model-dialog{padding: 50px 150px;}
</style>
<style lang="scss">
.flex{display: flex;}
.flex-1{flex: 1;}
.flex-2{flex: 2;}
.font-24{font-size: 24px;}
.center-v{align-items: center;}
.center-h{justify-content: center;}
.pointer{cursor: pointer;}
</style>