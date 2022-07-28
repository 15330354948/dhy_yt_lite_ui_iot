<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="16">
        <div class="tree_title">
          <div style="font-size: 13px;">所属机构</div>
          <div class="filter_item">
            <el-input
              prefix-icon="el-icon-search"
              placeholder="请输入关键词"
              v-model="filterText"
            >
            </el-input>
          </div>
        </div>
        <div class="tree_box">
          <el-row>
            <el-col :span="12" class="left_tree">
              <div>
                <el-tree
                  class="filter-tree"
                  :data="treeData"
                  :props="treeProps"
                  default-expand-all
                  :default-checked-keys="department"
                  node-key="id"
                  :filter-node-method="filterNode"
                  ref="companyTree"
                  @node-click="handleNodeClick"
                >
                </el-tree>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-tree
                  class="filter-tree"
                  :data="treeData2"
                  :props="treeProps"
                  default-expand-all
                  :filter-node-method="filterNode2"
                  :default-checked-keys="people"
                  ref="personTree"
                  @node-click="handleNodeClick2"
                >
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}({{ data.spare }})</span>
                  </span>
                </el-tree>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="selectPeople ">
          <div class="select_title">
            <span class="selectText">已选</span>
            <el-button
              type="text"
              class="delAll"
              :disabled="!selectList.length"
              @click="delAll()"
              >清空</el-button
            >
          </div>
          <ul class="filter-tree ulul">
            <li
              v-for="(item, index) in selectList"
              :key="index"
              @mouseenter="enter(item)"
              @mouseleave="leave()"
            >
              <span>{{ item.name }}({{item.spare}})</span>
              <i
                class="el-icon-circle-close"
                v-show="rowId == item.id"
                @click="handleDelSelect(item)"
              ></i>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <div class="tree_btn">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="save">确认</el-button>
    </div>
  </div>
</template>

<script>
import {
  companyInfo,
  findByOrganInfo,
  exceptionOff,
  operatfindPersons,
  operatoffPersons,
  addOffperson
} from "@/api/oamMsg/abnormalNotice";
import { mapGetters } from "vuex";
export default {
  props:["subprojectId","activeName"],
  watch: {
    filterText(val) {
      this.$refs.companyTree.filter(val);
      this.$refs.personTree.filter(val);
    },
    activeName:{
    }
  },
  computed: {
    ...mapGetters(["permissions", "projectId"]),
  },
  mounted() {
    this.getTreeData();
   
  },
  data() {
    return {
      department:[],
      people:[],
      dataException:[],
      treeData: [],
      treeData2: [],
      treeProps: {
        children: "childrens",
        label: "name",
      },
      filterText: "",
      selectList: [],
      rowId: "",
    };
  },
  methods: {
    getShow(activeName){
        if(activeName=="first"){
          operatfindPersons({
          projectId:this.projectId,
          subprojectId:this.subprojectId
        }).then(v=>{
          if(v.data.data||v.data.data.length){
            this.selectList=v.data.data
            this.handleNodeClick(this.treeData[0].childrens[0].id)
          }
        })
        }else{
          operatoffPersons({
          projectId:this.projectId,
          subprojectId:this.subprojectId
        }).then(v=>{
          if(v.data.data||v.data.data.length!=0){
            this.selectList=v.data.data
            this.handleNodeClick(this.treeData[0].childrens[0].id)
          }
        })
        }
    },
    getTreeData() {
      companyInfo({
        projectId: this.projectId,
      }).then((v) => {
        this.treeData = v.data.data;
        this.getShow(this.activeName)
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    filterNode2(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      findByOrganInfo({
        projectId: this.projectId,
        subprojectId:this.subprojectId,
        deptId:data.id
      }).then((v) => {
        this.treeData2 = v.data.data;
      });
    },
    handleNodeClick2(data) {
      this.selectList.push(data);
      Array.from(new Set(this.selectList));
      for (var i = 0; i < this.selectList.length; i++) {
        for (var j = i + 1; j < this.selectList.length; j++) {
          if (this.selectList[i].id == this.selectList[j].id) {
            this.selectList.splice(j, 1);
            j--;
          }
        }
      }
      this.rowId = "";
    },
    delAll() {
      this.$confirm("确认要清空所有数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.selectList = [];
        this.$message({
          message: "清空成功",
          type: "success",
        });
      });
    },
    handleDelSelect(data) {
      this.$confirm("确认要删除该数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        for (var i = 0; i < this.selectList.length; i++) {
          if (this.selectList[i].id == data.id) {
            this.selectList.splice(i, 1);
          }
        }
        this.rowId = "";
        this.$message({
          message: "清空成功",
          type: "success",
        });
      });
    },
    enter(node) {
      this.rowId = node.id;
    },
    leave() {
      this.rowId = "";
    },
    handleCancel() {
      this.$parent.$parent.isDetail = false;
    },
    //提交
    save() {
      this.dataException={projectId:this.projectId,subprojectId:this.subprojectId}
      let arr=[]
      this.selectList.map(v=>{
        arr.push(v.id)
      })
       this.dataException.personIds=arr.join(',')
      if(this.activeName=="first"){
        exceptionOff(this.dataException).then(v=>{
        if(v.data.code==0){
          this.$parent.$parent.isDetail = false;
          this.$parent.$parent.getList(this.subprojectId)
          this.$message.success(v.data.msg)
        }else{
          this.$message.error("保存失败")
        }
      })
      }else{
        this.dataException.offLineId=this.$parent.$parent.offLineId
        addOffperson(this.dataException).then(v=>{
        if(v.data.code==0){
          this.$parent.$parent.isDetail = false;
          this.$parent.$parent.getList(this.subprojectId)
          this.$message.success(v.data.msg)
        }else{
          this.$message.error("保存失败")
        }
      })
      }
    },
  },
};
</script>

<style scoped lang="scss">
.filter-tree{
  height: 50vh;
  overflow-y: scroll;
}
.ulul{
  padding-bottom: 10px;
}
.tree_title {
  height: 50px;
  line-height: 50px;
  background-color: rgb(245, 245, 245);
  padding-left: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(233, 233, 233);
  border-radius: 3px 3px 0px 0px;
  box-shadow: none;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.tree_box {
  border: 1px solid rgb(233, 233, 233);
  border-top: unset;
  height: calc(100% - 55px);

  .el-input {
    margin-right: 10px;
  }

  .left_tree {
    border-right: 1px solid rgb(233, 233, 233);
  }

  > div:nth-child(2) {
    height: calc(100% - 48px);
    overflow-y: auto;
    padding-bottom: 10px;
  }
}

.selectPeople {
  border-width: 1px;
  border-style: solid;
  border-color: rgb(233, 233, 233);

  .select_title {
    height: 50px;
    line-height: 50px;
    background-color: rgb(245, 245, 245);
    padding-left: 10px;
    border-bottom: 1px solid rgb(233, 233, 233);
    border-radius: 3px 3px 0px 0px;
    box-shadow: none;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }

  ul {
    margin: 0;
    margin-bottom: 7px;
    padding: 0;

    li {
      display: flex;
      justify-content: space-between;
      list-style: none;
      padding: 0 6px;
      line-height: 26px;

      .el-icon-circle-close {
        text-align: center;
        line-height: 26px;
        cursor: pointer;
      }
    }

    li:hover {
      background-color: #f5f7fa;
    }
  }
}

.tree_btn {
  float: right;
}
</style>
