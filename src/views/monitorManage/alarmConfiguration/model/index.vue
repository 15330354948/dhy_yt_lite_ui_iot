<template>
  <div>
    <basic-container>
      <avue-crud
        :data="tableData"
        :option="tableOption"
        v-model="obj"
        :page.sync="page"
        @search-change="searchChange"
        @search-reset="searchReset"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-save="handelAdd"
        @row-del="handleDel"
        @row-update="handleEdit"
        @sort-change="sortChange"
        :table-loading="loadingTableList"
        @selection-change="selectionChange"
        :before-open="beforeOpen"
        :before-close="beforeClose"
        :permission="permissionList"
        ref="modelRef"
      >
        <template slot="titletagForm" slot-scope>
          <div style="display: flex">
            <span style="color: red">注意事项：</span>
            <div>
              <i class="el-icon-warning" @click="pagetitle(1)">参数详解</i>
              <div class="pagetitle" v-show="showpage">
                脚本参数,主要分固定数据和传感器数据，固定数据可任意定义关键字，和数据值。
                传感器数据关键字必须为对应数据字段。<br />
                历史数据: 获取传感器对应字段历
                史N（天/时/分）内所有数据。关键字必须设置传感器对应直段（驼峰）<br />
                上条数据:
                获取传感器对应字段上一条数据。关键字必须设置传感器对应直段（驼峰）
                <br />间隔数据：获取传感器对应字段历史N（天/时/分）中的第1条和当前数据值。
                关键字必须设置传感器对应直段（驼峰）<br />实时数据：获取传感器对应字段当前数据的值。
                关键字必须设置传感器对应直段（驼峰）<br />固定数据：关键字驼峰自定义
              </div>
            </div>
            <div v-show="showTitle">
              <i class="el-icon-warning" @click="pagetitle(2)"
                >传感器字段详情</i
              >
              <div class="pagesize" v-show="showsize">
                <div class="main">
                  <div>字段名</div>
                  <div>描述</div>
                </div>
                <div class="body" v-for="(v, i) in sizeList" :key="i">
                  <div class="fieldName">{{ v.fieldName }}</div>
                  <div class="fieldName1">{{ v.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <!-- <template slot="menuRight">
          <el-radio-group
            v-model="serverSideSorting"
            style="margin-right: 10px"
          >
            <el-radio-button :label="false">
              <i class="el-icon-sort"></i>
              本地排序
            </el-radio-button>
            <el-radio-button :label="true">
              <i class="el-icon-sort"></i>
              服务端排序
            </el-radio-button>
          </el-radio-group>
        </template> -->
        <template slot="menuLeft">
          <el-button
            type="danger"
            @click.stop="handleMultDel"
            v-if="permissions.generator_warnscriptinfo_batch_del"
            >批量删除</el-button
          >
        </template>
        <template slot-scope slot="scriptForm">
          <div>
            <div
              style="margin-bottom: 10px; border: 1px solid #dcdcdc"
              class="java_box"
            >
              <Java
                :value="obj.script || ''"
                :readOnly="false"
                height="300px"
                ref="scriptCom"
              />
            </div>
            <el-row :gutter="10" v-show="isTestShow">
              <el-col :span="2">测试脚本</el-col>
              <el-col :span="6">
                <!-- <el-switch
                  v-model="isTest"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                >
                </el-switch
              > -->
                <el-button
                  class="no_decoration"
                  :icon="
                    iconClass ? 'el-icon-caret-bottom' : 'el-icon-caret-top'
                  "
                  size="mini"
                  @click="changeIcon"
                ></el-button>
              </el-col>
            </el-row>
            <div
              v-show="isTest"
              style="border: 2px solid #666; padding: 10px; border-radius: 5px"
            >
              <el-row :gutter="10">
                <el-col :span="4">测试脚本参数(JSON):</el-col>
                <el-col :span="4" :offset="16" v-show="isTest"
                  ><el-button type="primary" @click="toTest"
                    >点击测试脚本</el-button
                  ></el-col
                >
              </el-row>
              <el-row :gutter="10">
                <el-col :span="24">
                  <vue-json-editor
                    v-model="testForm.scriptParameters"
                    :showBtns="false"
                    mode="code"
                    :modes="['code']"
                    :lang="lang"
                    :expandedOnStart="expandedOnStart"
                    @json-change="onJsonChange"
                    class="json_other"
                  />
                </el-col>
              </el-row>

              <!-- <el-row :gutter="10" v-show="isTest">
              <el-col :span="15">
                <el-button
                  type="primary"
                  @click="handleScriptTest(scope.row.script)"
                  >脚本测试</el-button
                ></el-col
              >
            </el-row> -->
              <el-row :gutter="10">
                <el-col :span="6" class="red_text"> 测试结果： </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="24">
                  <el-input
                    type="textarea"
                    :rows="20"
                    :readonly="true"
                    v-model="testRES"
                  >
                  </el-input>
                </el-col>
              </el-row>
            </div>
          </div>
        </template>
        <template slot-scope slot="projectIdSearch">
          <el-select
            v-model="projectId"
            placeholder="请选择项目"
            @change="projectChange"
            v-show="isAdd"
          >
            <el-option
              v-for="(item, ikey) in projectIdOptions"
              :key="ikey"
              :label="item.projectName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </avue-crud>
      <el-dialog
        title="测试脚本"
        :visible.sync="isTestVisible"
        width="60%"
        :close-on-click-modal="false"
        :append-to-body="true"
        :before-close="cancelTest"
      >
        <div class="test_box">
          <el-row :gutter="10">
            <el-col :span="12">脚本参数(JSON):</el-col>
            <el-col :span="12">脚本内容:</el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <vue-json-editor
                v-model="testForm.scriptParameters"
                :showBtns="false"
                mode="code"
                :modes="['code']"
                :lang="lang"
                :expandedOnStart="expandedOnStart"
                @json-change="onJsonChange"
                class="json_other"
              />
            </el-col>
            <el-col :span="12" style="border: 1px solid #dcdcdc">
              <Java
                :value="testForm.script || ''"
                :readOnly="false"
                height="300px"
                ref="scriptTest"
              />
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelTest">取 消</el-button>
          <el-button type="primary" @click="handleTest">确 定</el-button>
        </span>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { tableOption } from "@/const/crud/monitorManage/alarmConfiguration/model";
import store from "@/store";
import Java from "@/components/editor/index";
import {
  getScriptId,
  addObj,
  putObj,
  delObj,
  mulDel,
  testScript,
  getSensorType,
  getDimension,
} from "@/api/monitorManage/alarmConfiguration/model";
import { projectInfo } from "@/api/monitorManage/device";
import vueJsonEditor from "vue-json-editor";
export default {
  components: { Java, vueJsonEditor },
  data() {
    return {
      showTitle: false,
      sizeList: [],
      showpage: false,
      showsize: false,
      tableOption: tableOption,
      obj: {
        scriptId: null,
      },
      searchParams: {},
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      fileList: [],
      ascColumns: [],
      descColumns: ["createTime"],
      serverSideSorting: false,
      loadingTableList: false,
      isTest: false,
      selectedArr: [],
      paramsArr: [],
      timeTypeOptions: [],
      isTestVisible: false,
      isTestShow: false,
      testForm: {
        script: "",
        scriptParameters: {},
      },
      lang: "zh",
      expandedOnStart: true,
      testRES: "",
      iconClass: true,
      projectIdOptions: [],
      isAdd: false,
    };
  },

  created() {
    // getSensorType("warn_model_param_time_type",{projectId:this.projectId}).then((res) => {
    //   this.timeTypeOptions = res.data.data;
    // });
    // projectInfo().then((res) => {
    //   this.projectIdOptions = res.data.data;
    // });
  },
  destroyed() {},
  mounted() {
    if (!this.projectId || this.projectId == 0) {
      if (this.$refs.modelRef) {
        setTimeout(() => {
          this.projectId = this.projectIdOptions[0].id;
          this.$refs.modelRef.objectOption.projectId.search = true;
        }, 200);
      }
      this.isAdd = true;
    } else {
      if (this.$refs.modelRef) {
        setTimeout(() => {
          this.$refs.modelRef.objectOption.projectId.search = false;
        }, 200);
      }
      this.isAdd = false;
    }
    setTimeout(() => {
      this.getList(this.page); //初始展示表格
    }, 220);
  },
  computed: {
    ...mapGetters(["permissions", "projectId"]), //获取权限
    permissionList() {
      return {
        addBtn: this.vaildData(
          this.permissions.generator_warnscriptinfo_add,
          false
        ),
        delBtn: this.vaildData(
          this.permissions.generator_warnscriptinfo_del,
          false
        ),
        editBtn: this.vaildData(
          this.permissions.generator_warnscriptinfo_edit,
          false
        ),
      };
    },
    uploadHeaders() {
      let token = store.getters.access_token;
      if (token) {
        return {
          Authorization: "Bearer " + token,
        };
      }
      return {};
    },
  },
  watch: {
    projectId: {
      immediate: true,
      handler(val, oVal) {
        window.sessionStorage.setItem("projectId", val);
        this.getList(this.page);
        this.tableOption.column.forEach((cols) => {
          if (cols.prop == "parameterStruct") {
            if (cols.children.column[1].prop == "dataType") {
              cols.children.column[1].dicUrl = `/warn/open_warn_script_info/type/warn_model_param_data_type?projectId=${val}&type='warn_model_param_time_type'`;
            }
          }
          if (cols.prop == "sensorType") {
            cols.dicUrl = `/warn/open_warn_script_info/type/sensor_type?projectId=${val}`;
          }
        });
        this.$refs.modelRef.init();
      },
      deep: true,
    },
    "obj.sensorType": {
      immediate: true,
      handler(val, oVal) {
        if ( val&&this.projectId != 0) {
          this.showTitle = true;
          getDimension({ sensorType: val, projectId: this.projectId }).then(
            (v) => {
              if(v.data.data){
                this.sizeList = v.data.data;
              }else{
                this.showsize=false;
                console.log("zanwu");
                this.$message.warning("暂无信息")
              }
            }
          );
        } else {
          this.showTitle = false;
        }
      },
      deep: true,
    },
  },
  destroyed() {},
  methods: {
    pagetitle(num) {
      if (num == 1) {
        this.showsize = false;
        this.showpage = !this.showpage;
      } else {
        this.showpage = false;
        this.showsize = !this.showsize;

      }
    },
    sortChange(sortColumn) {
      if (this.serverSideSorting) {
        this.ascColumns = new Array();
        this.descColumns = new Array();
        if (sortColumn.order != null) {
          if (sortColumn.order == "ascending") {
            this.ascColumns.push(sortColumn.prop);
          } else {
            this.descColumns.push(sortColumn.prop);
          }
        }
        this.getList(this.page);
      }
    },
    getList() {
      this.tableLoading = true;
      if (this.projectId != 0) {
        getScriptId(
          Object.assign(
            {
              current: this.page.currentPage,
              size: this.page.pageSize,
              projectId: this.projectId,
            },
            this.searchParams,
            {
              ascColumns: this.ascColumns,
              descColumns: this.descColumns,
            }
          )
        ).then((res) => {
          this.tableData = res.data.data.records;
          this.page.total = res.data.data.total;
          this.tableLoading = false;
        });
      }
    },
    searchChange(form, done) {
      this.page.currentPage = 1;
      this.searchParams = form;
      this.getList();
      //搜索
      done();
    },
    /**
     * 清空按钮
     */
    searchReset() {
      this.page.currentPage = 1;
      this.page.pageSize = 10;
      this.searchParams = {};
      this.getList();
    },
    sizeChange(pageSize) {
      //分页条数变化时
      this.page.pageSize = pageSize;
      this.getList(this.page);
    },
    currentChange(page) {
      //当前页码变化时
      this.page.currentPage = page;
      this.getList(this.page);
    },
    refreshChange() {
      //刷新
      this.getList(this.page);
    },
    handelAdd(row, done, loading) {
      //新增
      loading();
      let objPost = row;
      let tplArr = objPost.parameterStruct;
      if (tplArr && tplArr.length > 0) {
        tplArr.forEach((item) => {
          for (var i in item) {
            if (i.indexOf("$") != -1 || i.indexOf("_") != -1) {
              delete item[i];
            }
          }
          if (item.dataType == "history" || item.dataType == "interval") {
            item.timeNumber = "";
            item.timeType = "";
          }
          if (item.dataType == "fixed") {
            item.value = "";
          }
        });
      }
      objPost.parameterStruct = JSON.stringify(objPost.parameterStruct);
      objPost.script = this.$refs.scriptCom.getValue() || "";
      objPost.projectId = this.projectId;
      if (!objPost.script) {
        this.$message.error("请填写脚本内容");
        return false;
      } else {
        addObj(objPost).then((res) => {
          // this.page.pageSize = 10;
          this.page.currentPage = 1;
          done();
          this.getList(this.page);
        });
      }
    },
    handleEdit(row, index, done, loading) {
      //修改
      loading();
      let objPost = row;
      let tplArr = objPost.parameterStruct;
      if (tplArr && tplArr.length > 0) {
        tplArr.forEach((item) => {
          for (var i in item) {
            if (i.indexOf("$") != -1 || i.indexOf("_") != -1) {
              delete item[i];
            }
          }
          if (item.dataType == "history" || item.dataType == "interval") {
            item.timeNumber = "";
            item.timeType = "";
          } else {
            delete item.timeNumber;
            delete item.timeType;
          }
          if (item.dataType == "fixed") {
            item.value = "";
          } else {
            delete item.value;
          }
        });
      }
      objPost.parameterStruct = JSON.stringify(objPost.parameterStruct);
      objPost.script = this.$refs.scriptCom.getValue() || "";
      objPost.projectId = this.projectId;
      if (!objPost.script) {
        this.$message.error("请填写脚本内容");
        return false;
      } else {
        putObj(objPost).then((res) => {
          done();
          this.getList(this.page);
        });
      }
    },
    handleDel(row, index) {
      //删除
      this.$confirm("是否确认删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delObj(row.id, this.projectId).then((res) => {
            this.getList(this.page);
          });
        })
        .catch(function () {});
    },
    selectionChange(list) {
      this.selectedArr = list;
    },
    handleMultDel() {
      if (this.selectedArr && this.selectedArr.length > 0) {
        let idList = [];
        this.selectedArr.forEach((d) => idList.push(d.id));
        if (idList && idList.length > 0) {
          this.$confirm("是否确认删除当前选中的数据？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              return mulDel(idList, this.projectId);
            })
            .then((data) => {
              this.getList(this.page);
            });
        }
      } else {
        this.$message.error("请选择要删除的数据");
      }
    },

    beforeOpen(done, type) {
      done();
      this.showpage = false;
      this.showsize = false;
      if (type == "edit") {
        this.isTestShow = true;
        this.iconClass = true;
        this.obj.parameterStruct = JSON.parse(this.obj.parameterStruct);
      } else if (type == "add") {
        this.isTestShow = true;
        this.iconClass = true;
        this.obj.parameterStruct = [
          {
            dataType: "",
            description: "",
            key: "",
          },
        ];
      } else {
      }
    },
    beforeClose(done, type) {
      done();
      this.isTest = false;
      this.cancelTest();
      this.testRES = "";
      this.showpage = false;
      this.showsize = false;
    },
    onJsonChange(value) {
      this.testForm.scriptParameters = value;
    },
    handleScriptTest(data) {
      this.testForm.script = data || "";
      this.isTestVisible = true;
    },
    cancelTest() {
      this.isTestVisible = false;
      this.testForm = {
        script: "",
        scriptParameters: {},
      };
    },
    handleTest() {
      let objPost = {};
      objPost.script = this.testForm.script;
      objPost.scriptParameters = JSON.stringify(this.testForm.scriptParameters);
      if (
        objPost.scriptParameters &&
        objPost.scriptParameters != "{}" &&
        objPost.script
      ) {
        testScript(objPost, this.projectId).then((res) => {
          if (res.status == 200) {
            this.testRES = res.data.data || "";
          }
        });
        this.cancelTest();
      } else {
        this.$message.error("请输入测试数据");
      }
    },
    toTest() {
      this.testForm.script = this.$refs.scriptCom.getValue() || "";
      let objPost = {};
      objPost.script = this.testForm.script;
      objPost.scriptParameters = JSON.stringify(this.testForm.scriptParameters);
      if (
        objPost.scriptParameters &&
        objPost.scriptParameters != "{}" &&
        objPost.script
      ) {
        testScript(objPost, this.projectId).then((res) => {
          if (res.status == 200) {
            this.testRES = res.data.data || "";
          }
        });
      } else {
        this.$message.error("请输入测试数据");
      }
    },
    changeIcon() {
      if (this.iconClass) {
        this.isTest = true;
      } else {
        this.isTest = false;
      }
      this.iconClass = !this.iconClass;
    },
    projectChange(val) {
      this.projectId = val;
      if (val) {
        this.getList(this.page);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.history_form {
  div {
    ::v-deep .el-form-item {
      .el-form-item__label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.test_box,
.java_box {
  ::v-deep.json-editor {
    .CodeMirror {
      overflow-y: hidden;
      line-height: 1.5rem;
    }
  }
}
.json_other {
  ::v-deep.jsoneditor-vue {
    height: 312px;
  }
}
.res_box {
  ::v-deep.jsoneditor-vue {
    height: 200px;
    // overflow-y: auto;
  }
}
.red_text {
  color: red;
  font-weight: bold;
}
.no_decoration {
  border: none;
  font-size: 22px;
  position: relative;
  bottom: 6px;
  right: 15px;
  padding-left: 1px;
  padding-right: 1px;
}
.no_decoration:focus,
.no_decoration:hover {
  background-color: #fff;
  color: #606266;
}
::v-deep .el-icon-warning {
  position: relative;
  color: #409eff;
  margin-right: 20px;
  margin-left: 10px;
  cursor: pointer;
}
.pagetitle {
  color: #000;
  width: 86%;
  padding-left: 3%;
  position: absolute;
  bottom: 30px;
  left: 0;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  z-index: 1000;
}
.pagesize {
  height: 300px;
  overflow-y: scroll;
  color: #000;
  width: 320px;
  position: absolute;
  bottom: -150px;
  left: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  z-index: 1000;
  padding: 10px 2px;
  .main {
    display: flex;
    color: #ccc;
    justify-content: space-around;
  }
  .body {
    color: #000;
    display: flex;
    font-size: 12px;
    padding: 0 10px;
    // justify-content: space-between;
    border-top: 1px solid #f2f2f2;
    .fieldName {
      width: 36%;
      padding-left: 6%;
    }
    .fieldName1 {
      padding-left: 10%;
      width: 68%;
    }
  }
}
</style>
