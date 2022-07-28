<template>
  <div class="box">
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="tree_title">所属项目</div>
        <div class="tree_box">
          <div>
            <el-input prefix-icon="el-icon-search" placeholder="请输入关键词" v-model="filterText" clearable>
            </el-input>
          </div>

          <div>
            <el-tree class="filter-tree" :data="treeData" :props="treeProps" highlight-current default-expand-all
              :filter-node-method="filterNode" node-key="id" @node-click="handleNodeClick" expand-on-click-node
              :default-checked-keys="expandDefault" ref="treeRef">
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="notice">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-row :gutter="10">
                <el-col :span="13">通知规则：离线率超过</el-col>
                <el-col :span="10">
                  <el-input v-model.number="offLine.offLineRate" maxlength="5" min="0" max="100" type="number"
                    @blur="checkPrice" oninput="if(value>100)value=100"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row :gutter="10">
                <el-col :span="13">% 或设备离线数超过</el-col>
                <el-col :span="10" :title="offLine.offLineNum">
                  <el-input v-model.number="offLine.offLineNum" oninput="if(value<0)value=0"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row :gutter="10">
                <el-col :span="14">台时下发短信通知，间隔</el-col>
                <el-col :span="10">
                  <el-input v-model.number="offLine.timeInterval" type="number" oninput="if(value<0)value=0"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row :gutter="10">
                <el-col :span="12"><i class="el-icon-warning" title="0代表设置后不生效"></i>小时再次发送。</el-col>
                <el-col :span="12">
                  <el-button type="primary" @click="addSavetime" v-if="permissions['offSave']">保存</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="18">
        <avue-crud :page.sync="page" :data="tableData" :option="tableOption" v-model="tableObj"
          @size-change="sizeChange" @current-change="currentChange" @selection-change="selectionChange" ref="crudRef">
          <template slot-scope="scope" slot="menuLeft">
            <el-button type="primary" @click="getperson" v-if="permissions['offSave']">选择人员</el-button>
            <el-button type="primary" @click="multiDelBtnHandle" v-if="permissions['offAllDel']">批量删除</el-button>
          </template>
          <template slot="menu" slot-scope="scope">
            <el-button type="text" size="small" icon="el-icon-delete" @click.stop="handleDel(scope.row, scope.index)"
              v-if="permissions['offAllDel']">删除</el-button>
          </template>
        </avue-crud>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="isDetail" v-if="isDetail" width="1000px" @close="detailClick" title="选择人员"
      class="avue-dialog" append-to-body>
      <PersonTree :subprojectId="subprojectId"></PersonTree>
    </el-dialog>
  </div>
</template>

<script>
  import {
    msgPublicOption
  } from "./publicOption.js";
  import PersonTree from "./personTree.vue";
  import {
    subprojectInfo,
    operationOff,
    offSaveOnline,
    operatoffFind,
    personDel,
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
    data() {
      return {
        expandDefault: [],
        offLineId: null,
        offLine: {
          offLineNum: "",
          offLineRate: "",
          timeInterval: "",
        },
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
        tableObj: {},
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
    computed: {
      ...mapGetters(["permissions", "projectId"]),
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
            this.getTreeData();
            if (this.subprojectId) {
              this.getMsgInfo(this.subprojectId);
            }
          }
        },
        deep: true,
        immediate: true
      },
      activeName: {
        handler(val) {
          if (val && val == "second" && this.subprojectId) {
            this.getTreeData();
            this.subprojectId = 0;
            this.expandDefault = [this.treeData[0].children[0].id];
            this.getMsgInfo(this.subprojectId);
          }
        },
        deep: true,
      },
      expandDefault: {
        handler(val) {
          this.$nextTick(() => {
            this.$refs.treeRef.setCheckedKeys(val);
          });
        },
      },
    },
    methods: {
      /**只能输入数字且有小数点最多保留两位*/
      checkPrice() {
        let checkPlan = "" + this.offLine.offLineRate;
        checkPlan = checkPlan
          .replace(/[^\d.]/g, "") // 清除“数字”和“.”以外的字符
          .replace(/\.{2,}/g, ".") // 只保留第一个. 清除多余的
          .replace(/^\./g, "") // 保证第一个为数字而不是.
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".");
        if (checkPlan.indexOf(".") < 0 && checkPlan !== "") {
          // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          checkPlan = parseFloat(checkPlan) + "";
        } else if (checkPlan.indexOf(".") >= 0) {
          checkPlan = checkPlan.replace(/^()*(\d+)\.(\d\d).*$/, "$1$2.$3"); // 只能输入两个小数
        }
        this.offLine.offLineRate = checkPlan;
      },
      addSavetime() {
        if (
          this.offLine.offLineNum &&
          this.offLine.offLineRate &&
          this.offLine.timeInterval>=0
        ) {
          offSaveOnline({
            ...this.offLine,
            projectId: this.projectId,
            subprojectId: this.subprojectId,
          }).then((v) => {
            if (v.data.code == 0) {
              this.offLineId = v.data.data;
              this.$message.success("保存成功");
            } else {
              this.$message.error("保存失败");
            }
          });
        } else {
          this.$message.warning("请先填写并报存通知规则");
        }
      },
      getTreeData() {
        subprojectInfo({
          projectId: this.projectId,
          state: 3
        }).then((v) => {
          if (v.data.code == 0) {
            this.treeData[0].children = v.data.data;
            // this.subprojectId = v.data.data[0].id;
            this.expandDefault = [v.data.data[0].id];
            this.getList(this.subprojectId);
          } else {
            this.treeData = [];
          }
        });
      },
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
        this.offLine.offLineNum = null;
        this.offLine.offLineRate = null;
        this.offLine.timeInterval = null;
        this.offLineId = "";
        this.getList(this.subprojectId);
        this.getMsgInfo(this.subprojectId);
      },
      async getMsgInfo(data) {
        await operatoffFind({
          projectId: this.projectId,
          subprojectId: data,
        }).then((v) => {
          if (v.data.data) {
            this.offLine = v.data.data;
            this.offLineId = v.data.data.id || "";
            this.getList(this.subprojectId);
          } else {
            this.offLine = {
              offLineNum: null,
              offLineRate: null,
              timeInterval: null,
            }
          }
          console.log(this.offLine);
        });
      },
      async getList(data) {
        await operationOff(
          Object.assign({
            current: this.page.currentPage,
            size: this.page.pageSize,
            projectId: this.projectId,
            subprojectId: data || this.subprojectId,
          })
        ).then((res) => {
          this.tableData = res.data.data.records;
          this.page.total = res.data.data.total;
        });
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
            personDel(row.id).then((v) => {
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
              personDel(arr.join(",")).then((v) => {
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
        if (this.offLineId) {
          this.isDetail = true;
        } else {
          this.$message.warning("请先填写并报存通知规则");
        }
      },
      detailClick() {
        this.isDetail = false;
      },
    },
  };

</script>

<style lang="scss" scoped>
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }

  ::v-deep input[type="number"] {
    -moz-appearance: textfield !important;
  }

  .box {
    height: 100%;
    margin: 5px 10px;

    .el-row:nth-child(2) {
      height: calc(100% - 75px);

      .el-col {
        height: 100%;
      }
    }
  }

  .notice {
    color: #666;
    font-size: 13px;
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
      height: calc(70vh - 48px);
      overflow-y: auto;
    }
  }

</style>
