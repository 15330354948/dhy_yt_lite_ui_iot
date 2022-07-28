<template>
        <div class="set-container">
            <div class="set-content">
                <div class="left-tree pd-20">
                    <avue-tree :option="treeOption"
                               :data="treeData"
                               @node-click="nodeClick"
                    ></avue-tree>
                </div>
                <div class="right-table pd-20 flex-1">
                    <div class="warning-issue field_data">
                      <div class="field_data__tree">
                          <p class="field_data__title">预警发布设置</p>
                          <div class="tab-header">
                          <avue-tabs :option="option" @change="handleChange"></avue-tabs>
                      </div>
                      <basic-container class="tab-content">
                          <avue-crud :option="personOption"
                                    v-model = "personForm"
                                    :data="personList"
                                    ref="cruds"
                                    @on-load="getPersonList"
                                    :table-loading="listLoading"
                                    @size-change="sizeChange"
                                    @current-change="currentChange"
                                    >
                                    <template slot="menuLeft">
                                        <el-button class="filter-item"
                                                    @click="handleAdd"
                                                    type="primary"
                                                    icon="el-icon-document-add">添加短信接收人</el-button>
                                    </template>
                                    </avue-crud>
                      </basic-container>
                      </div>

                  </div>
                </div>
            </div>
            <el-dialog  title="选择接收人"
                        :visible.sync="dialogVisible"
                        width="65%"
                        :before-close="beforeClose"
                        @close="dialogClose"
                        append-to-body
                        >
                        <add-person class="person-dialog" ref="addPerson" @closeDialog="dialogClose"></add-person>
                        </el-dialog>
        </div>
</template>
<script>
import { log } from 'three';
import {treeOption} from './treeOption'
import {personOption} from './personOption'
import AddPerson from './AddPerson'
export default {
    components:{AddPerson},
    data(){
        return{
            treeOption:treeOption,
            treeData:[
                {
              value:0,
              label:'一级部门',
              children:[
                {
                  value:1,
                  label:'一级部门1',
                },{
                  value:2,
                  label:'一级部门2',
                }
              ]
            },{
              value:3,
              label:'二级部门',
              children:[
                {
                  value:4,
                  label:'二级部门1',
                },{
                  value:5,
                  label:'二级部门2',
                }
              ]
            }
            ],
            personOption:personOption,
            option:{
                column:[
                    {
                        label:'蓝色预警',
                        prop:'blue'
                    },
                    {
                        label:'黄色预警',
                        prop:'yellow'
                    },
                    {
                        label:'橙色预警',
                        prop:'orange'
                    },
                    {
                        label:'红色预警',
                        prop:'red'
                    }
                ]
            },
            page: {
            total: 0, // 总页数
            currentPage: 1, // 当前页数
            pageSize: 20, // 每页显示多少条,
            isAsc: false//是否倒序
        },
            personList: [
                {name:'张三',phone:'123456789',type:'管理员'}
            ],
            personForm:{},
            listLoading: true,
            dialogVisible:false
        }
    },
    watch:{
    },
    methods:{
      handleChange(column){
        },
        handleAdd(){
            // this.$refs.cruds.rowAdd();
            this.dialogVisible = true;
        },
        getPersonList(page,params){
            this.listLoading = true;//数据请求完后改为false
            setTimeout(() => {
                this.listLoading = false;
            }, 1000);
        },
        sizeChange(pageSize) {
        this.page.pageSize = pageSize
        },
        currentChange(current) {
        this.page.currentPage = current
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
        dialogClose(n){
            this.dialogVisible = false;
            this.$refs.addPerson.addForm = {};
            if(n == 1){
              this.getPersonList();
            }
        },
        nodeClick(data){

        }


    }
}
</script>
<style lang="scss" scoped>
.set-container{background-color: #fff;height: 100%;}
.set-content{
    display: flex;
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    // position: absolute;
    // transform: translate(-50%,-50%);
    // margin: 50px;
}
.left-tree{width: 340px;border-right: 2px solid #ddd;}
.avue-tree {
    ::v-deep .avue-tree__filter{opacity: 1;}
   ::v-deep .el-input-group__append{display: none;}
}
</style>
<style lang="scss">
.pd-20{padding: 20px;}
</style>
