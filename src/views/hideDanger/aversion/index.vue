

<template>
  <div class="hide_mod">
    <basic-container>
      <avue-crud
        :option="option"
        ref="crud"
        v-model="form"
        :page.sync="page"
        @on-load="getList"
        @size-change="sizeChange"
        @current-change="currentChange"
        :table-loading="listLoading"
        @search-change="handleFilter"
        @search-reset="searchReset"
        @refresh-change="handleRefreshChange"
        @row-update="update"
        @row-save="create"
        @row-style="rowStyle"
        @selection-change="selectionChange"
        :before-open="handleOpenBefore"
        :data="list"
      >
        <template slot="menuLeft">
          <!-- v-if="permissions.disaster_hedge_white_card_add" -->
          <el-button
            class="filter-item"
            @click="handleCreate"
            type="primary"
            icon="el-icon-document-add"
            v-if="permissions.JCD_detail_hedgeWhiteCard_add&&isEditTpl"
          >
            新增
          </el-button>
        </template>
        <template slot="menuLeft">
          <!-- v-if="permissions.disaster_hedge_white_card_del" -->
          <el-button
            class="filter-item"
            @click="handleDelete"
            type="danger"
            icon="el-icon-delete"
            v-if="permissions.JCD_detail_hedgeWhiteCard_del_multi&&isEditTpl"
            >批量删除
          </el-button>
        </template>
        <!-- <template slot="menuLeft">
          <el-button
            class="filter-item"
            @click="handleExcel"
            type="primary"
            icon="el-icon-download"
            >导出
          </el-button>
        </template> -->
        <!-- <template slot="lockFlag" slot-scope="scope">
          <el-tag>{{ scope.label }}</el-tag>
        </template> -->
        <template slot="menu" slot-scope="scope">
          <el-button
            size="small"
            type="text"
            icon="el-icon-info"
            v-if="permissions.JCD_detail_hedgeWhiteCard_detail"
            @click="handleInfo(scope.row, scope.index)"
            >详情
          </el-button>
          <!-- v-if="permissions.disaster_hedge_white_card_edit" -->
          <el-button
            size="small"
            type="text"
            icon="el-icon-edit"
            v-if="permissions.JCD_detail_hedgeWhiteCard_edit&&isEditTpl"
            @click="handleEdit(scope.row, scope.index)"
            >编辑
          </el-button>
           <el-button
            @click="handleDelete1(scope.row)"
            size="small"
            type="text"
            icon="el-icon-delete"
            v-if="permissions.JCD_detail_hedgeWhiteCard_del&&isEditTpl"
            >删除
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog
      :show-close="true"
      width="88%"
      :modal="false"
      :visible.sync="dialogTableShow"
      @close="dialogClose"
      :title="dialogTitle"
    >
      <avoid-table
        :isEdit="isEdit"
        :tableDatas="tableDatas"
        :isView="isView"
        :dialogShow="dialogTableShow"
        @closeDialogShow="saveTable"
        :isMap="isMap"
        ref="avoidtable"
      ></avoid-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  avoidList,
  avoidedata,
  avoideDelete,
} from "@/api/avoidDisaster";
import { tableOption } from "./aversionOption";
import { mapGetters } from "vuex";
import AvoidTable from "./AvoidTable";

export default {
  name: "hidedanger",
  props: ["dialogFormVisibleparent", "openTab", "mapOpenTab"],
  components: {
    AvoidTable,
  },
  data() {
    return {
      tableDatas: {
        monitorFamilyMemberList: [
          {
            age: null,
            gender: "",
            id: null,
            name: "",
          },
           {
            age: null,
            gender: "",
            id: null,
            name: "",
          },
           {
            age: null,
            gender: "",
            id: null,
            name: "",
          },
           {
            age: null,
            gender: "",
            id: null,
            name: "",
          },
           {
            age: null,
            gender: "",
            id: null,
            name: "",
          },
           {
            age: null,
            gender: "",
            id: null,
            name: "",
          },
           {
            age: null,
            gender: "",
            id: null,
            name: "",
          },
           {
            age: null,
            gender: "",
            id: null,
            name: "",
          },
           {
            age: null,
            gender: "",
            id: null,
            name: "",
          },
           {
            age: null,
            gender: "",
            id: null,
            name: "",
          },

        ],
        monitorHedgeCard: {
          ambulanceUnit: "",
          ambulanceUnitResponsiblePerson: "",
          ambulanceUnitResponsiblePersonPhone: "",
          code: "",
          communityCode: null,
          communityName: "",
          countyCode: null,
          countyName: "",
          createTime: "",
          delFlag: false,
          disasterName: "",
          disasterScale: "",
          disasterType: "",
          evacuationRoute: "",
          familyNumber: null,
          homeAddress: "",
          houseType: "",
          householdNotes: "",
          householderName: "",
          householderPhone: "",
          id: null,
          locationRelation: "",
          monitorId: null,
          monitoringPerson: "",
          monitoringPersonPhone: "",
          releaseUnit: "",
          releaseUnitResponsiblePerson: "",
          releaseUnitResponsiblePersonPhone: "",
          resettlementUnitLocation: "",
          resettlementUnitResponsiblePerson: "",
          resettlementUnitResponsiblePersonPhone: "",
          signature: "",
          signatureTime: "",
          streetCode: null,
          streetName: "",
          triggerFactors: "",
          updateTime: "",
          warnSignal: "",
          warnSignalReleasePerson: "",
          warnSignalReleasePersonPhone: "",
        },
      }, //传给子的表数据
      isView: false,
      isEdit: false,
      dialogTitle: null,
      dialogTableShow: false,
      selecteData: [],
      searchForm: {},
      option: tableOption,
      checkedKeys: [],
      roleProps: {
        label: "roleName",
        value: "roleId",
      },
      cascaderCurrentLabels: "请选择",
      cascaderCurrentValue: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条,
        isAsc: false, //是否倒序
      },
      list: [],
      listLoading: true,
      role: [],
      fixedRole: [],
      form: {},
      rolesOptions: [],
      colorChange: false,
      dialogFormVisible: false,
      tabPosition: "left",
      isMap: null,
      isEditTpl: true,
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
  },
  watch: {
    role() {
      this.form.role = this.role;
    },
    cascaderCurrentValue(val) {},
    dialogFormVisibleparent(val) {
      this.getList(this.page);
    },
    openTab(n) {
      if (n == 2) {
        this.isMap = false;
        // this.getList(this.page);
      }
    },
    mapOpenTab(val) {
      if (val == 4) {
        this.isMap = true;
        this.isloading = true;
        // this.getList();
      }
    },
  },
  created() {
    // this.sys_user_add = this.permissions["sys_user_add"];
    // this.sys_user_edit = this.permissions["sys_user_edit"];
    // this.sys_user_del = this.permissions["sys_user_del"];
    // this.sys_user_reset_password = this.permissions["sys_user_reset_password"];
    // this.getList(this.page);
  },
  methods: {
    handleEdit(row, index) {
      avoidedata(row.id).then((res) => {
        this.tableDatas = res.data.data;
        this.dialogTableShow = true;
        this.dialogTitle = "编辑";
        this.isEdit = true;
        this.isView = false;
      });
    },
    saveTable() {
      this.dialogClose();
      this.getList(this.page);
    },
    changeStatus(val){
      if(val&&val=='view'){
          this.$refs.crud.tableOption.detail=true
          this.$refs.crud.init()
      }else{
        this.$refs.crud.tableOption.detail=false
          this.$refs.crud.init()
      }
    },
    dialogClose() {
      this.getList(this.page);
      this.dialogTableShow = false;
      this.isEdit = false;
      this.isView = false;
      this.isMap = null;
    },
    handleDelete() {
      //删除
      let idsAll = [];
      this.selecteData.forEach((item) => {
        idsAll.push(item.id);
      });
      let ids = idsAll.join(",");
      if (ids) {
        this.$confirm("此操作将删除选中信息,是否继续?", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          avoideDelete(ids)
            .then((res) => {
              this.getList(this.page);
              this.$notify.success("删除成功");
            })
            .catch((err) => {
              this.$notify.error("删除失败");
            });
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择删除数据",
        });
      }
    },
    handleDelete1(row) {
      //删除
      if (row.id) {
        this.$confirm("此操作将删除选中信息,是否继续?", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          avoideDelete(row.id)
            .then((res) => {
              this.getList(this.page);
              this.$notify.success("删除成功");
            })
            .catch((err) => {
              this.$notify.error("删除失败");
            });
        });
      } 
    },
    selectionChange(list) {
      let now = [];
      list.forEach((e) => {
        now.push(e);
      });
      this.selecteData = now;
    },
    getList(page, params) {
      this.listLoading = true;
      let id = this.isMap
        ? this.$store.getters.analysisDetails.data.data.id
        : JSON.parse(window.sessionStorage.getItem("disasterData")).id;
      avoidList(
        Object.assign(
          {
            current: this.page.currentPage,
            size: this.page.pageSize,
            monitorId: id,
          },
          params,
          this.searchForm
        )
      ).then((response) => {
        this.list = response.data.data.records;
        this.page.total = response.data.data.total;
        this.listLoading = false;
      });
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    handleFilter(form, done) {
      this.searchForm = form;
      this.page.currentPage = 1;
      this.getList(this.page, form);
      done();
    },
    searchReset() {
      this.searchForm = {};
      this.page.currentPage = 1;
      this.getList(this.page, this.searchForm);
    },
    handleRefreshChange() {
      this.getList(this.page);
    },
    handleCreate() {
      this.dialogTitle = "新增";
      this.dialogTableShow = true;
      this.isView = false;
      this.isEdit = false;
    },
    handleExcel() {
      this.$refs.crud.rowExcel();
    },
    handleOpenBefore(show, type) {
      window.boxType = type;
      
      show();
    },

    handleInfo(row, index) {
      avoidedata(row.id).then((res) => {
        this.tableDatas = res.data.data;
        this.dialogTableShow = true;
        this.dialogTitle = "详情";
        this.isEdit = false;
        this.isView = true;
      });
    },
    create(row, done, loading) {
      addObj(this.form)
        .then(() => {
          this.getList(this.page);
          done();
          this.$notify.success("创建成功");
        })
        .catch(() => {
          loading();
        });
    },
    update(row, index, done, loading) {
      putObj(this.form)
        .then(() => {
          this.getList(this.page);
          done();
          this.$notify.success("修改成功");
        })
        .catch(() => {
          loading();
        });
    },
    deletes(row, index) {
      this.$confirm(
        "此操作将删除该用户(用户名:" + row.username + "), 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        delObj(row.userId)
          .then(() => {
            this.getList(this.page);
            this.$notify.success("删除成功");
          })
          .catch(() => {
            this.$notify.error("删除失败");
          });
      });
    },
    rowStyle({ row, column, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return {
          background: "#eee",
          color: "#fff",
        };
      }
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.hide_mod {
  height: 100%;

  &__tree {
    padding-top: 3px;
    padding-right: 20px;
  }

  &__main {
    .el-card__body {
      padding-top: 0;
    }
  }
}
.el-cascader.color_dark {
  :deep .el-input__inner::-webkit-input-placeholder {
    color: #606266;
  }
  :deep .el-input__inner::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #606266;
  }
  :deep .el-input__inner:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #606266;
  }
  :deep .el-input__inner:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #606266;
  }
}
</style>

<style lang="scss">
.hide_dialog {
  .el-dialog__header {
    padding: 10px;
    background: rgba(0, 58, 106, 1);
    color: #fff;
  }
  .el-dialog__headerbtn {
    top: 10px;
  }
  .el-dialog__body {
    padding: 10px !important;
  }
  .el-tabs--left .el-tabs__item.is-left {
    text-align: center !important;
  }
}
</style>


