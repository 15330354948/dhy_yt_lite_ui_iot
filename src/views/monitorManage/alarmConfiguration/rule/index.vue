<template>
  <div>
    <basic-container>
      <avue-crud
        :data="tableData"
        :option="tableOption"
        :permission="permissionList"
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
        ref="warnRule"
        :before-open="beforeOpen"
      >
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
            v-if="permissions.generator_sensorwarnrules_batch_del" 
            >批量删除</el-button
          >
        </template>
        <template slot="isEnable" slot-scope="scope">
          <el-switch
            v-model="scope.row.isEnable"
            :active-value="true"
            :inactive-value="false"
            inactive-color="#ff4949"
            active-color="#13ce66"
            inactive-text="禁用"
            active-text="启用"
            :disabled="true"
          >
          </el-switch>
        </template>
        <template slot-scope="scope" slot="parameterJsonForm">
          <el-form
            label-position="left"
            label-width="150px"
            class="history_form"
          >
            <div v-for="(item, ikey) in paramsArr" :key="ikey">
              <el-form-item
                :label="item.description"
                v-if="item.dataType == 'fixed'"
              >
                <el-input v-model="item.value"></el-input>
              </el-form-item>
              <el-form-item
                :label="item.description"
                v-if="(item.dataType == 'history'||item.dataType == 'interval')"
              >
                <el-input v-model.number="item.timeNumber"
                 oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                 style="width: 49%">
                  <template slot="prepend">
                    <!-- <el-tooltip
                      effect="light"
                      content="时间长度"
                      placement="top"
                    >
                      <i class="el-icon-warning" style="color: red"></i>
                    </el-tooltip> -->
                    <span>时间长度</span>
                  </template>
                </el-input>
                <el-select
                  v-model="item.timeType"
                  @change="changeSelect($event, ikey)"
                  style="width: 49% !important; margin-left: 2%"
                >
                  <el-option
                    v-for="(dicItem, dicKey) in timeTypeOptions"
                    :key="dicKey"
                    :label="dicItem.label"
                    :value="dicItem.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
        </template>
        <template slot-scope="scope" slot="scriptDecForm">
          <span style="color: red; font-weight: bold">{{ scriptDecText }}</span>
        </template>
        <template slot="isEnable" slot-scope="scope">
          <span>{{scope.row.isEnable?'启用':'禁用'}}</span>
        </template>
        <!-- <template slot-scope="scope" slot="projectIdSearch">
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
        </template> -->
        <!-- <template  slot-scope="scope" slot="scriptIdForm">
          <el-select
            v-model="obj.scriptId"
            placeholder="请选择脚本"
          >
            <el-option
              v-for="(item, ikey) in scriptIdOptions"
              :key="ikey"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template> -->
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { tableOption } from "@/const/crud/monitorManage/alarmConfiguration/rule";
import store from "@/store";
import { fetchList, addObj, putObj, delObj, mulDel } from "@/api/monitorManage/alarmConfiguration/rule";
import { getObj, getSensorType, getScriptId} from "@/api/monitorManage/alarmConfiguration/model";
//model.js文件的fetchList与上面rule.js文件的接口名称重复，故而取别名getScriptId来进行调用
import { projectInfo } from "@/api/monitorManage/device"
import { deepClone } from '../../../../util/util';

export default {
  components: {},
  data() {
    return {
      deepstp:'',
      editpage:false,
      tableOption: tableOption,
      obj: {
        scriptId: null,
        warnMsgTemplate:null,
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

      selectedArr: [],
      paramsArr: [],
      timeTypeOptions: [],
      scriptDecText: "",
      projectIdOptions: [],
       isAdd: false,
      // projectId: null,
      scriptIdOptions:[],
    };
  },
  created() {
    // getSensorType("warn_model_param_time_type",{projectId:this.projectId}).then((res) => {
    //   this.timeTypeOptions = res.data.data;
    // });
    //  projectInfo().then((res) => {
    //   this.projectIdOptions = res.data.data;
    // });
  },
  mounted() {
     if (!this.projectId || this.projectId == 0) {
       
      if (this.$refs.warnRule) {
        setTimeout(() => {
          if(this.projectIdOptions&&this.projectIdOptions.length>0){
            this.projectId = this.projectIdOptions[0].id;
          }
          this.$refs.warnRule.objectOption.projectId.search = true;
        }, 200);
      }
      this.isAdd = true;
    } else {
      if (this.$refs.warnRule) {
        setTimeout(() => {
          this.$refs.warnRule.objectOption.projectId.search = false;
        }, 200);
      }
      this.isAdd = false;
    }
    setTimeout(() => {
        this.getScriptIdOption()
        this.getList(this.page); //初始展示表格
    }, 260);
  },
  computed: {
    ...mapGetters(["permissions","projectId"]), //获取权限
    permissionList() {
      return {
        addBtn: this.vaildData(
          this.permissions.generator_sensorwarnrules_add,
          false
        ),
        delBtn: this.vaildData(
          this.permissions.generator_sensorwarnrules_del,
          false
        ),
        editBtn: this.vaildData(
          this.permissions.generator_sensorwarnrules_edit,
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
    projectId:{
      immediate: true,
       handler(val, oVal) {
        if(val!=0){
          window.sessionStorage.setItem('projectId', val)
         this.getScriptIdOption()
         this.getList();
         this.tableOption.column.forEach((cols) => {
            if (cols.prop == "warnLevel") {
              cols.dicUrl = `/warn/open_warn_script_info/type/warn_level?projectId=${val}`;
            }
            if (cols.prop == "sensorType") {
              cols.dicUrl = `/warn/open_warn_script_info/type/sensor_type?projectId=${val}`;
            }
          });
              this.$refs.warnRule.init()
        }
      },
      deep: true,
    },
    "obj.sensorType":{
      immediate: true,
       handler(val, oVal) {
         if(val){
           this.tableOption.column.forEach((cols) => {
            if (cols.prop == "scriptId") {
              cols.dicUrl = `/warn/open_warn_script_info/page?sensorType=${val}&projectId=${this.projectId}`;
              if(this.editpage){
                if(val!=this.deepstp){
                  this.obj.scriptId=null;
                }else{

                }
              }
            }
          });
         this.$refs.warnRule.init()

         }else{
           this.tableOption.column.forEach((cols) => {
            if (cols.prop == "scriptId") {
              cols.dicUrl = `/warn/open_warn_script_info/page?projectId=${this.projectId}`;
            }
          });
          this.obj.scriptId=null;
         this.$refs.warnRule.init()
         }
      },
      deep: true,
    },
    "obj.scriptId": {
      handler(x, y) {
        if (x) {
          this.getParameterJson(x);

        } else {
          this.scriptDecText = "";
          this.obj.warnMsgTemplate=""
        }
      },
    },
  },
  methods: {
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
      fetchList(
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
      let objPost = row;
      delete objPost.scriptDec;
      //新增
      loading();

      if (this.paramsArr && this.paramsArr.length > 0) {
        objPost.parameterJson = JSON.stringify(this.paramsArr);
        objPost.projectId = this.projectId;
        let isNullData = this.paramsArr.every((o) =>
          Object.keys(o).every((i) => o[i])
        );
        if (isNullData) {
          addObj(objPost).then((res) => {
            // this.page.pageSize = 10;
            this.page.currentPage = 1;
            done();
            this.getList(this.page);
          });
        } else {
          this.$message.error("脚本参数描述需完整填写");
          return false;
        }
      } else {
        this.$message.error("脚本参数描述需填写");
        return false;
      }
    },
    handleEdit(row, index, done, loading) {
      //修改
      loading();
      let objPost = row;
      delete objPost.scriptDec;
      if (this.paramsArr && this.paramsArr.length > 0) {
        objPost.parameterJson = JSON.stringify(this.paramsArr);
        objPost.projectId = this.projectId;
        let isNullData = this.paramsArr.every((o) =>
          Object.keys(o).every((i) => o[i])
        );
        if (isNullData) {
          
          putObj(objPost).then((res) => {
            done();
            this.getList(this.page);
          });
        } else {
          this.$message.error("脚本参数描述需完整填写");
          return false;
        }
      } else {
        this.$message.error("脚本参数描述需填写");
        return false;
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
          delObj(row.id,this.projectId).then((res) => {
            // this.page.pageSize = 10;
            // this.page.currentPage = 1;
            this.getList(this.page);
          });

          //  this.$message.success('删除成功')
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
            .then( ()=> {
              return mulDel(idList,this.projectId);
            })
            .then((data) => {
              //   this.$message.info(data.data.msg)
              this.getList(this.page);
            });
        }
      } else {
        this.$message.error("请选择要删除的数据");
      }
    },
    getParameterJson(idV) {
      if (idV) {
        getObj(idV,this.projectId).then((res) => {
          let arrTpl = res.data.data.parameterStruct;
          this.scriptDecText = res.data.data.description || "";
          this.obj.warnMsgTemplate=res.data.data.warnMsgTemplate||""
          if (arrTpl && arrTpl.length > 0) {
            this.paramsArr = JSON.parse(arrTpl);
          }
        });
      }
    },
    changeSelect(val, index) {
      this.paramsArr[index].timeType = val;
    },
    beforeOpen(done, type) {
      if (type == "edit") {
        this.editpage=true;
        this.deepstp=deepClone(this.obj.sensorType);
        setTimeout(() => {
          this.paramsArr = JSON.parse(this.obj.parameterJson) || [];
          // this.obj = JSON.parse(this.obj.parameterJson) || [];
        }, 800);
      }
      done();
    },
     projectChange(val) {
      this.projectId = val;
      if(val){
        this.getScriptIdOption()
        this.getList(this.page);
      }
     
    },
    getScriptIdOption(){
      getScriptId({
        current:1,
        size:-1,
        projectId:this.projectId,
        sensorType:this.obj.sensorType
      }).then(res=>{
          this.scriptIdOptions =res.data.data.records
      })
    }
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
</style>
