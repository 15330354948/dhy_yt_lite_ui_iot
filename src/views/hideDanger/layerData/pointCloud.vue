<template>
  <div class="bc_cloud-main">
    <div class="bc_label">
      <label slot="label">
        <div class="bc_cloud-label">
          <el-button type="primary" v-if="permissions.JCD_layer_pointCloud_edit" @click="addParentTab">{{cloudSave?'保存':'编辑'}}</el-button>
        </div>
      </label>
    </div>
    <el-form v-model="cloudForm" ref="cloudForm" :rules="cloudForm.cloudRules">
      <el-form-item prop="tableCloudData">
        <el-table
          class="bc_cloud-table"
          :data="cloudForm.tableCloudData"
          style="width: 100%"
          row-key="id"
          border
          lazy
          v-loading="cloudLoad"
          :load="getColudData"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column type="index" label="序号" align="center" width="70">
            <template slot="header" slot-scope="scope">
              <el-button type="primary" v-if="cloudSave" icon="el-icon-plus" circle @click="addCloud(scope)"></el-button>
              <span v-else>序号</span>
            </template>
            <template slot-scope="scope">
              <span>{{scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="点云名称" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" type="text" :disabled="saveStatus"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="url" label="链接" align="center">
            <template slot-scope="scope">
              <el-input v-if="scope.row.parentId !== 0" v-model="scope.row.url"  type="text" :disabled="saveStatus"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" align="center" width="100" >
            <template slot-scope="scope">
              <el-input v-if="scope.row.parentId == 0" v-model="scope.row.sort" type="number" min="0" max="100" :disabled="saveStatus"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.parentId == 0 && cloudSave" @click="addCloudNew(scope.row,scope.$index)" type="text" size="small">新增点云图层</el-button>
              <el-button v-if="cloudSave" @click="delCloud(scope.row)" type="text" size="small">删除</el-button>
              <el-button v-if="!cloudSave" @click="previewCloud(scope.row)" v-show="permissions.JCD_layer_pointCloud_preview" type="text" size="small">{{scope.row.parentId == 0?'总预览':'预览'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>

    <el-dialog
      class="hide_dialog evacuate_dialog"
      :visible.sync="isPreview"
      v-if="isPreview"
      append-to-body
      width="45%"
      height="50%">
      <div slot="title" class="dialog-title">
        <span class="title-text">点云预览</span>
      </div>
      <map-com></map-com>
    </el-dialog>
   </div>
</template>

<script>
import {mapGetters} from "vuex"
import { getCloudTree, getAddCloud, getPutCloud, deleteCloud } from '@/api/hideDanger/cloud.js'

export default {
  name: "cloudTable",
  props: ['openTab','moduleConfig','disasterId'],
  data () {
    return {
      cloudRes: [],
      cloudLoad: false,
      cloudSave: false,
      saveStatus: true,
      isPreview: false,
      disasterData: {},
      cloudForm:{
        tableCloudData: [],
        tableIndex: [],
        cloudRules:{
          name: [{ required: true, message: "点云名称不能为空", trigger: "blur" }],
          url: [{ required: true, message: "链接不能为空", trigger: "blur" }],
          sort: [{ required: true, message: "请输入排序序号", trigger: "blur" }],
        },
      },

      cloudRowForm: {},
      cloudObj: {
        name: null,
        url: null
      }
    };
  },
  computed:{
    ...mapGetters(["permissions"]),
    rowId(){
      return this.$store.state.hideDanger.rowId;   //获取状态机state里面的rowId
    },
  },
  watch: {
    "openTab":{
      deep: true,
      handler(x, u) {
        if(x == 6){
          this.getColudData()
        }
      }
    },
    "disasterId": {
      immediate: true,
      handler(x, y) {
        if (x && this.moduleConfig.data.moduleTitle == "点云") {
          this.getColudData();
        }
      },
    },
  },
  methods: {
    /**
    * 获取点云列表
    */
    getColudData(addRow){
      this.disasterData = this.isMap ? this.$store.getters.analysisDetails.data.data : JSON.parse(window.sessionStorage.getItem('disasterData'));
      getCloudTree({disasterId: this.disasterId}).then(res=>{
        if(res.data.data) {
          this.cloudRes = res.data.data
          this.cloudForm.tableCloudData = []
          this.cloudForm.tableIndex = []
          if(this.cloudRes.length > 0){
            this.cloudRes.forEach((clos,index)=>{
              let closChilds = []
              clos.children.length && clos.children.forEach((child,i)=>{
                closChilds.unshift({
                  id: `${(index+1) +'-'+ (i+1)}`,
                  index: child.id,
                  name: child.name,
                  url: child.url,
                  sort: child.sort/1,
                  parentId: child.parentId
                })
              })
              this.cloudForm.tableCloudData.push({
                id: index/1 + 1,
                index: clos.id,
                name: clos.name,
                url: clos.url,
                sort: clos.sort/1,
                parentId: clos.parentId,
                children: closChilds
              })
              this.cloudForm.tableIndex.push(index + 1)
            })

            if(addRow){
              this.cloudForm.tableCloudData.forEach((item, index)=>{
                if(item.name == addRow.name){
                  item.children.unshift({
                    id: (index+1) + '-' + (item.children.length + 1),
                    name: "",
                    url: "",
                    parentId: item.index,
                    disasterId: this.disasterId,
                  })
                }
              })
            }
          }
        }
      })
    },

    /**
     * 新增父级点云
     */
    addParentTab() {
      let canSubmit = true;
      if(!this.cloudSave){
        this.cloudLoad = false;
        this.cloudSave = true
        this.saveStatus = false
      }else{
        this.cloudLoad = true;
        this.cloudForm.tableCloudData.forEach(cloudItem => {
          if(cloudItem.name == ""){
            this.$message.warning("请输入点云名称及链接")
            this.cloudLoad = false;
            canSubmit = false
          }
          for(let i = 0; i < cloudItem.children.length; i++){
            if(cloudItem.children[i].url == "" || cloudItem.children[i].name == ""){
              this.$message.warning("请输入点云名称及链接")
              this.cloudLoad = false;
              canSubmit = false
            }
          }
        })
        if(canSubmit){
          this.cloudForm.tableCloudData.forEach(cloudItem => {
            for(let i = 0; i < cloudItem.children.length; i++){
              if(!cloudItem.children[i].index){
                let queryChildRow = cloudItem.children[i]
                queryChildRow['id'] = undefined;
                getAddCloud(queryChildRow).then(childRes=>{
                  if (childRes.data.data) return
                })
              }else{
                let queryChildRow = cloudItem.children[i]
                queryChildRow['id'] = cloudItem.children[i].index;
                queryChildRow['disasterId'] = this.disasterData.id;
                getPutCloud(queryChildRow).then(childRes=>{
                  if (childRes.data.data) return
                })
              }
            }
            if(cloudItem.index){
              let putItem = cloudItem
              putItem.id = cloudItem.index
              putItem.children = [];
              putItem.disasterId= this.disasterData.id;
              putItem.sort = cloudItem.sort/1;
              getPutCloud(putItem).then(parentRes=>{
                if(parentRes.data.data) return;
              })
            }else{
              let addItem = cloudItem
              addItem.id = undefined
              addItem.children = [];
              addItem.disasterId= this.disasterData.id;
              addItem.sort = cloudItem.sort/1;
              getAddCloud(addItem).then(parentRes=>{
                if (parentRes.data.data) return;
              })
            }
          })
          this.$message.success("保存成功")
          setTimeout(()=>{
            this.getColudData()
            this.cloudLoad = false;
          }, 1000)

          this.saveStatus = true
          this.cloudSave = false
        }
      }
    },

    addCloudNew(row,index) {
      if(row.name ==""){
        this.$message.error("请输入图层名称")
        return;
      }
      if(row.index == ""){
        this.cloudForm.tableCloudData.forEach((item, index)=>{
          if(item.index == "" ){
            getAddCloud(item).then(res=>{
              if(res.data.data){
                this.getColudData(row)
              }
            })
          }
        })
      }else{
        this.cloudForm.tableCloudData.forEach((item, index)=>{
          if(item.id == row.id){
            item.children.unshift({
              id: (index+1) + '-' + (item.children.length + 1),
              name: "",
              url: "",
              parentId: row.index,
              disasterId: this.disasterId,
            })
          }
        })
      }
    },
    /**
     * 新增点云数据
     */
    addCloud() {
      if(this.disasterId){
        this.cloudRowForm = {
          id: this.cloudForm.tableCloudData.length + 1,
          index: "",
          name: "",
          url: "",
          disasterId: this.disasterId,
          parentId: 0,
          children: []
        }
        this.cloudForm.tableCloudData.push(this.cloudRowForm)
      }
    },
    /**
     * 预览点云数据
     * @param {row} 列表行数据
     */
    previewCloud(row) {
      if(row.parentId == 0){
        if(row.children && !row.children.length){
          this.$message.warning("当前点云没有对应URL地址")
          return
        }else{
          this.$message("点云加载中...");
          this.isPreview = true
          row.children.forEach(layerItem=>{
            if(layerItem.url && layerItem.index){
              this.mapFunc.addCloudSenceLayer(layerItem.index, layerItem.url);
            }
          })
        }
      } else {
        if(row.url && row.index){
          this.$message("点云加载中...");
          this.isPreview = true
          this.mapFunc.addCloudSenceLayer(row.index, row.url);
        }else{
          this.$message('请配置点云地址')
        }
      }
    },

    editCloudBtn(row,index){  //编辑点云按钮
      if(row.parentId == 0){
        this.tableCloudOption.column.forEach(item=>{
          if(item.prop == 'url'){
            item.editDisplay = false
          }
        })
      }else{
        this.tableCloudOption.column.forEach(item=>{
          if(item.prop == 'url'){
            item.editDisplay = true
          }
        })
      }
      this.$refs.cloud.rowEdit(row,index)
    },

    delCloud(row) {
      this.$confirm("是否确认删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if(row.index){
            deleteCloud(row.index).then(res => {
              if(res.data !== null){
                this.getColudData();
              }else{
                this.$message.success("删除成功" )
              }
            });
          }else{
            this.cloudForm.tableCloudData.forEach((item, index)=>{
              if(item.index == row.parentId){
                item.children = item.children.filter(item=>{
                  return item.id !== row.id
                })
              }
            })
            this.cloudForm.tableCloudData = this.cloudForm.tableCloudData.filter(item=>{
              return item.id !== row.id
            })
          }
        })
        .catch(err=>{
          this.$message.warning("删除失败" )
        })
    },
    validateField(form,index){
      let result = true;
      for (let item of this.$refs[form].fields) {
        if(item.prop.split(".")[1] == index){
          this.$refs[form].validateField(item.prop,(error)=>{
            if(error!=""){
              result = false;
            }
          });
        }
        if(!result) break;
      }
      return result;
    }
  }
}
</script>

<style lang='scss' scoped>
.bc_cloud-main{
  .el-form-item__label{
    width: 200px;
  }
  .bc_cloud-table{
    .bc_cloud-add{
      width: 100%;
      height: 100%;
    }
    .el-input{
      width: 90%;
      ::v-deep .el-input__inner{
        text-align: center;
      }
    }

    ::v-deep .el-table__indent{
      display: none;
    }
    .el-input.is-disabled{
      ::v-deep .el-input__inner{
        color: #000;
        background: transparent;
        border: none;
        cursor: default;
      }
    }
  }
}
</style>
