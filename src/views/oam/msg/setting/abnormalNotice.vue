<template>
  <div class="box">
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="notice">
          通知规则：设备首次出现异常需立即下发短信，手动新增设备异常无需下发短信。
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="tree_title">所属项目</div>
        <div class="tree_box">
          <div>
            <el-input prefix-icon="el-icon-search" placeholder="请输入关键词" clearable v-model="filterText">
            </el-input>
          </div>
          <div>
            <el-tree class="filter-tree" :data="treeData" :props="treeProps" default-expand-all node-key="id"
              :filter-node-method="filterNode" highlight-current :default-checked-keys="expandDefault" ref="treeRef"
              @node-click="handleNodeClick">
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <avue-crud :page.sync="page" :data="tableData" :option="tableOption" v-model="tableObj"
          @size-change="sizeChange" @current-change="currentChange" @selection-change="selectionChange" ref="crudRef">
          <template slot-scope="scope" slot="menuLeft">
            <el-button type="primary" v-if="permissions['exceptionChange']" @click="getperson">选择人员</el-button>
            <el-button type="primary" v-if="permissions['exceptionAllDel']" @click="multiDelBtnHandle">批量删除</el-button>
          </template>
          <template slot="menu" slot-scope="scope">
            <el-button type="text" size="small" icon="el-icon-delete" @click.stop="handleDel(scope.row, scope.index)"
              v-if="permissions['exceptionAllDel']">删除</el-button>
          </template>
        </avue-crud>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="isDetail" v-if="isDetail" width="1000px" @close="detailClick" title="选择人员"
      class="avue-dialog" append-to-body>
      <PersonTree :subprojectId="subprojectId" :activeName="activeName"></PersonTree>
    </el-dialog>
  </div>
</template>

<script>
  import {
    msgPublicOption
  } from "./publicOption.js";
  import PersonTree from "./personTree.vue";
  import {
    exceptionInfo,
    subprojectInfo,
    exceptionDel,
  } from "@/api/oamMsg/abnormalNotice";
  import {
    mapGetters
  } from "vuex";
  export default {
    name: "",
    props: ["activeName"],
    components: {
      PersonTree,
    },
    computed: {
      ...mapGetters(["permissions", "projectId"]),
    },
    data() {
      return {
        expandDefault: [],
        tableObj: {},
        subprojectId: "0",
        filterText: "",
        treeData: [{
          id: 1,
          name: "全部项目",
          children: [],
        }, ],
        treeProps: {
          children: "children",
          label: "name",
        },
        tableData: [],
        tableOption: msgPublicOption,
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20, // 每页显示多少条
        },
        selectedArr: [],
        isDetail: false,
      };
    },
    created() {},
    mounted() {

    },
    watch: {
      filterText(val) {
        this.$refs.treeRef.filter(val);
      },
      projectId: {
        handler(val) {
          if (val && val != 0) {
            this.getList(this.subprojectId);
            this.getTreeData();
          }
        },
        deep: true,
        immediate: true
      },
      activeName: {
        handler(val) {
          if (val && val == "first") {
            this.getTreeData();
            this.subprojectId = 0;
            this.expandDefault = [this.treeData[0].children[0].id];
            this.getList(this.subprojectId);
          }
        },
        deep: true,
      },
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      handleNodeClick(data) {
        if (data.children) {
          this.subprojectId = 0
        } else {
          this.subprojectId = data.id;
        }
        this.getList(this.subprojectId);
      },
      getTreeData() {
        subprojectInfo({
          projectId: this.projectId,
          state: 3
        }).then((v) => {
          if (v.data.code == 0) {
            this.expandDefault = [];
            this.treeData[0].children = v.data.data;
            // this.subprojectId = v.data.data[0].id;
            this.expandDefault.push(v.data.data[0].id);
            // this.handleNodeClick(v.data.data[0])
            this.getList(this.subprojectId);
          } else {
            this.treeData = [];
          }
        });
      },
      getList(data) {
        exceptionInfo(
          Object.assign({
            current: this.page.currentPage,
            size: this.page.pageSize,
            projectId: this.projectId,
            subprojectId: data,
          })
        ).then((res) => {
          this.tableData = res.data.data.records;
          this.page.total = res.data.data.total;
        });
      },
      detailClick() {
        this.isDetail = false;
      },
      sizeChange(pageSize) {
        //分页条数变化时
        this.page.pageSize = pageSize;
        this.getList(this.subprojectId);
      },
      currentChange(current) {
        //当前页码变化时
        this.page.currentPage = current;
        this.getList(this.subprojectId);
      },
      selectionChange(list) {
        //选中的数据
        this.selectedArr = list;
      },
      handleDel(row, done, loading) {
        //删除
        this.$confirm("是否确认删除?", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnClickModal: false,
            type: "warning",
          })
          .then(() => {
            exceptionDel(row.id).then((v) => {
              if (v.data.code == 0) {
                this.getList(this.subprojectId);
                this.$message.success("删除成功");
              } else {
                this.$message.error("删除失败");
              }
            });
          })
          .catch(function () {});
      },
      multiDelBtnHandle() {
        if (this.selectedArr && this.selectedArr.length > 0) {
          this.$confirm("是否确认批量删除?", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              closeOnClickModal: false,
              type: "warning",
            })
            .then(() => {
              let arr = [];
              this.selectedArr.map((v) => {
                return arr.push(v.id);
              });
              exceptionDel(arr.join(",")).then((v) => {
                if (v.data.code == 0) {
                  this.getList(this.subprojectId);
                  this.$message.success("删除成功");
                } else {
                  this.$message.error("删除失败");
                }
              });
            })
            .catch(function () {});
        } else {
          this.$message.error("请选择要操作的数据！");
        }
      },
      getperson() {
        this.isDetail = true;
      },
    },
  };

</script>

<style lang="scss" scoped>
  .box {
    height: 100%;
    margin: 5px 10px;

    .el-row:nth-child(2) {
      height: calc(100% - 50px);

      .el-col {
        height: 100%;
      }
    }
  }

  .notice {
    color: #666;
    font-size: 16px;
    margin: 10px 0;
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
  }

  .tree_box {
    border: 1px solid rgb(233, 233, 233);
    border-top: unset;
    padding: 0 10px;
    height: calc(100% - 55px);

    .el-input {
      margin: 10px 0;
    }

    >div:first-child {
      height: 48px;
    }

    >div:nth-child(2) {
      height: calc(100% - 48px);
      overflow-y: auto;
    }
  }

</style>
