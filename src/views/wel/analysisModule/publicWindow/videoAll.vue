<template>
    <div class="video">
        <div class="bc_search">
            <el-row>
                <el-col :span="14">
                    <div class="videoModelChange">
                        <div class="bc_search_btn">
                            <el-input v-model="videoName" type="text" placeholder="输入视频编号或名称" :disabled="!modelShow" :clearable="true"></el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="small" @click="getData" :disabled="!modelShow">搜索</el-button>
                </el-col>
                <el-col :span="4">
                    <div class="videoModelChange bc_mod-nav">
                        <el-tabs v-model="modName" type="card" @tab-click="switchGrid">
                            <el-tab-pane name="list">
                                <span slot="label"><i class="bc_icon-list"></i>列表</span>
                            </el-tab-pane>
                            <el-tab-pane name="grid">
                                <span slot="label"><i class="bc_icon-grid"></i>九宫格</span>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="videoModelChange bc_mod-nav" v-if="!modelShow">
                        <div class="bc_icon-full" title="全屏" @click="gridFullShow"></div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-row class="bc_row-main">
            <el-col :span="4" style="height:100%;" v-if="modelShow">
                <el-tree
                    :data="treeData"
                    default-expand-all
                    ref="tree"
                    node-key="value"
                    :props="defaultProps"
                    :loading="loading"
                    :option="treeOption1"
                    @node-click="nodeClick"
                    v-model="treeForm"
                    height="80%"
                ></el-tree>
            </el-col>
            <el-col class="video_content" :span="20" v-if="modelShow">
                <videoPlayBox ref="playbox" :dev-data="devData"></videoPlayBox>
            </el-col>

            <el-col class="video_content" :span="24" v-if="!modelShow">
                <grid-video ref="playfullbox" :dev-data="devData"></grid-video>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {DivInfo} from "@/api/monitorManage/device";
import videoPlayBox from "@/components/videoPlayBox";
import gridVideo from "@/components/videoPlayBox/gridVideo";
import { mapGetters } from "vuex";

export default {
    name:"videoAll",
    components:{ videoPlayBox, gridVideo },
    computed: mapGetters(["publicWindowData","projectId"]),
    data(){
        return{
            modName: "list",
            modelShow: true,
            treeForm:{},
            treeOption1:{
                defaultExpandAll: true,
                menu: false,
                filter: false,
                multiple:true,
            },
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            videoName: "",
            loading:false,
            treeData:[],
            treeSelectData: [],
            devData:{},
            tree_data:0,
            new_number:0,
            winSelect: 0
        }
    },
    // mounted(){
    //     this.getData();
    // },
    watch:{
        tree_data() {
            this.$nextTick(() => {
              // console.log(document.querySelectorAll('.is-expanded'))
              if(this.new_number-1 == -1){
                  document.querySelectorAll('.is-expanded')[1].click();
              }else{
                  document.querySelectorAll('.is-expanded')[this.new_number-1].click();
              }
            })
        },

        "modName": {
            deep: true,
            handler(x, y) {
                if(x == 'list'){
                    this.modelShow = true
                }else{
                    this.videoName = "";
                    this.modelShow = false;
                    this.$nextTick(()=>{
                        this.$refs['playfullbox'].getDatas(this.treeData)
                    })
                }

                this.getData();
            }
        },
        projectId:{
            immediate: true,
            handler(val, oVal) {
                window.sessionStorage.setItem('projectId', val)
                this. getData();
            },
        deep: true,
    }
    },
    methods:{
        getData(){
            DivInfo({videoName:this.videoName,projectId:this.projectId}).then(v=>{
                this.treeData=v.data.data;
                if(this.treeData.length > 0){
                    var new_number = 0;
                    for(var i=0;i<this.treeData.length;i++){
                        new_number++;
                        if(this.treeData[i].children.length>0){
                            if(this.publicWindowData.data !== "1"){
                                for(var j=0;j<this.treeData[i].children.length;j++){
                                    new_number++;
                                    if(this.treeData[i].children[j].label == this.publicWindowData.data){
                                        this.new_number = new_number;
                                        break;
                                    }
                                }
                                this.tree_data = 1;
                            }else{
                                new_number++;
                                this.tree_data = 1;
                                break;
                            }
                        }
                    }
                }
            })
        },
        switchGrid() {

        },
        gridFullShow() {
            this.$refs.playfullbox.getScreenFull();
        },
        nodeClick(data){
            if(data.disasterId){
                this.devData = {
                    row:{
                        id: data.value,
                        factoryId: data.factoryId,
                        factoryName: data.factoryName,
                    }
                }
            }
        },
        // nodeClick(data){
        //     // this.$refs.tree.setCheckedNodes([data]);
        //     this.$refs['playbox'].getData(data.value)
        // }
    }
}
</script>

<style lang="scss" scoped>
    .video{
        padding:20px;
        height:calc(100% - 0px);
        background: rgba(0, 0, 0, 0.4);
        .bc_row-main{
            height: calc(100% - 40px);
        }
        .bc_mod-nav{
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            i{
                display: inline-block;
                width: 18px;
                height: 18px;
            }
            .bc_icon-grid{
                background: url('../../../../assets/img/icon/grid.png') no-repeat center;
                background-size: 18px 18px;
            }
            .bc_icon-list{
                background: url('../../../../assets/img/icon/list.png') no-repeat center;
                background-size: 18px 18px;
            }
            .bc_icon-full{
                height: 35px;
                width: 35px;
                background: url('../../../../assets/img/icon/full.png') no-repeat center;
                background-size: 16px 16px;
                cursor: pointer;
            }
        }
        .videoModelChange{
            display: flex;
            margin: auto;
            height: 30px;

            .bc_search_btn{
                padding: 0 5px;
                width: 100%;
                display: flex;
                justify-content: space-evenly;
                ::v-deep .el-button{
                    height: 30px;
                }
            }
        }
    }
    ::v-deep.el-row{
        height:100%;
    }
    .video_content{
        height:100%;
        background: #595959;
    }
    .monitor-content{
        width:100%;
        padding-top:10px;
        height:100%;
        border:none;
    }
    ::v-deep.avue-tree{
        height:100%;
    }
    ::v-deep.avue-tree .el-tree{
        color: #fff;
        background: transparent;
        max-height: 98%;
    }
</style>

<style lang="scss">
.bc_row-main{
    .el-tree{
        color: #fff;
        background: transparent;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        .el-tree-node__content:hover{
            background-color: transparent;
        }
        .el-tree-node.is-current>.el-tree-node__content{
            background-color: transparent;
        }
    }
}
.bc_mod-nav{
    .el-tabs--card>.el-tabs__header{
        border: none;
    }
    .el-tabs__nav {
        width: 100%;
        height: 100%;
        padding-right: 15px;
        border-radius: 15px !important;
        background-color: transparent;
        border: 1px solid #fff !important;

        .el-tabs__item {
            width: 120px;
            text-align: center;
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            border-radius: 15px;
            margin-right: -15px;
            background-color: transparent;
            height: 100%;
            line-height: 30px;

            span{
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .el-tabs__item.is-active {
            position: relative;
            color: #fff;
            border-radius: 15px;
            background: #66b1ff;
            z-index: 11;
        }
        .el-tabs__item:hover{
            color: #fff;
        }
    }
}

</style>
