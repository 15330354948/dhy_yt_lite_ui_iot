
<template>
  <div class="user">
    <basic-container>
      <avue-crud
        class="crud-form"
        :option="option"
        ref="crud"
        v-model="form"
        :page="page"
        @on-load="getList"
        @size-change="sizeChange"
        @current-change="currentChange"
        @search-change="handleFilter"
        @search-reset="handlereset"
        @refresh-change="handleRefreshChange"
        :table-loading="listLoading"
        :data="list"
      >
        <!-- <template slot="menuLeft">
          <el-button @click="handleEdit" class="filter-item" type="primary"
            >预警流程
          </el-button>
          <el-button
            @click="toggleSelection()"
            class="filter-item"
            type="primary"
            >选中
          </el-button>
        </template> -->
        <template slot-scope="scope" slot="menu">
          <el-button size="mini" type="text" @click="rowdata(scope.row)"
          v-if="permissions.warning_history_viewBtn"
            >查看</el-button
          >

          <!-- <el-button size="mini" type="text" @click="rowVideo(scope.row)"
            >视频监控</el-button
          > -->

          <!-- <el-button
            v-if="scope.row.trumpetNum != '0'"
            size="mini"
            type="text"
            @click="hornBtn(scope.row)"
            >喇叭</el-button
          > -->
        </template>
      </avue-crud>
    </basic-container>

    <!-- 喇叭 -->
    <el-dialog
      title="喇叭"
      class="video_dialog"
      :visible.sync="dialogHorn"
      @closed="handleCloseHorn"
      append-to-body
      width="50%"
    >
      <isInstruct
        :devdata="records"
        @handleCancel="handleCancel"
        :flag="true"
      ></isInstruct>
    </el-dialog>
    <!-- 视频监控 -->
    <el-dialog
      v-if="dialogVideo"
      title="视频监控"
      class="video_dialog"
      :visible.sync="dialogVideo"
      @closed="handleCloseVideo"
      append-to-body
      width="140vh"
    >
      <video-list :devdata="disasterData"></video-list>
    </el-dialog>

    <!-- 预警流程 -->
    <el-dialog
      title="预警流程"
      class="edit_dialog"
      :visible.sync="dialogEdit"
      @closed="handleCloseEdit"
      append-to-body
      width="50%"
    >
      <avue-form
        ref="editForm"
        v-model="editForm"
        :option="editOption"
        @submit="editSave"
      >
      </avue-form>
    </el-dialog>

    <el-dialog
      class="hide_dialog"
      :visible.sync="dialogFormVisible"
      @closed="handleClose"
      append-to-body
      width="90%"
      :fullscreen="dialogfull"
    >
      <div slot="title" class="dialog-title">
        <span class="title-text">查看</span>
        <i class="el-icon-full-screen" @click="isfullscreen"></i>
      </div>

      <!-- 预警详情 -->
      <warning-data :disasterData="disasterData" :show.sync='show'></warning-data>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList, putObj } from "@/api/admin/user";
import {
  getHistoryPage,
  getYujin,
  addYujin,
  editYujin,
  getShebei,
} from "@/api/warningMag/monitorList";
import { tableOption, editOption } from "@/const/crud/warningMag/monitor";
import isInstruct from "@/views/monitorManage/deviceList/isInstruct";
import warningData from "@/components/warningData/warningData";
import videoList from "./videoList";
import { mapGetters } from "vuex";
export default {
  name: "monitor",
  components: {
    warningData,
    videoList,
    isInstruct,
  },
  data() {
    return {
      show:false,
      searchForm: {},
      option: tableOption,
      editOption: editOption,
      checkedKeys: [],
      cascaderCurrentValue: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false, //是否倒序
      },
      editForm: {},
      list: [],
      listLoading: true,
      role: [],
      form: {},
      isMonitor: false,
      dialogFormVisible: false,
      dialogVideo: false,
      dialogEdit: false,
      dialogfull: false,
      dialogHorn: false,
      yujinType: true,
      disasterData: {},
      records: "",
    };
  },
  computed: {
    ...mapGetters(["permissions", "projectId"]),
  },
  watch: {
    list:{
      handler(val){
        for(var i = 0; i<val.length; i++){
          if(!val[i].highestLevel){
            val[i].highestLevel = "---"
          }else{
            val[i].highestLevel = val[i].highestLevel;
          }
        }
      }
    },
    projectId:{
      immediate: true,
       handler(val, oVal) {
         window.sessionStorage.setItem('projectId', val)
        this.getList(this.page);
      },
      deep: true,
    }
  },
  created() {
    this.searchForm.amendLevel = this.$route.query.amendLevel;
    // this.searchForm.disposeStatus = this.$route.query.disposeStatus;
    this.searchForm.disposeStatus = 2;
    this.isAmendLevel();
  },
  mounted() {
    this.option.column[9].hide = true;
    this.option.column[10].hide = false;
    this.option.column[9].search = false;
    this.option.column[10].search = true;

  },
  methods: {
    isAmendLevel() {
      if (this.searchForm.amendLevel) {
        getHistoryPage(
          Object.assign({
            current: this.page.currentPage,
            size: this.page.pageSize,
            amendLevel: this.searchForm.amendLevel,
            disposeStatus:2,
            projectId:this.projectId
          })
        ).then((res) => {
          this.list = res.data.data.records;
          this.page.total = res.data.data.total;
        });
      }
    },
    async getList(page, params) {
      this.listLoading = true;
      if (params) {
        if (params.time) {
          this.$set(params, "startTime", params.time[0]);
          this.$set(params, "endTime", params.time[1]);
          delete params.time;
        }
      }
      await getHistoryPage(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
            disposeStatus:2,
            projectId:this.projectId
          },
          params,
          this.searchForm
        )
      ).then((res) => {
        this.list = res.data.data.records;
        this.page.total = res.data.data.total;
        this.listLoading = false;
      });
    },
    rowdata(data) {
      this.dialogFormVisible = true;
      this.disasterData = data;
    },
    toggleSelection(val) {
      let obj = [];

      let arr = [];
      this.list.forEach((item) => {
        obj.forEach((it) => {
          if (it.obj2 == item.disasterBatchNo) {
            arr.push(item);
          }
        });
        return arr;
      });
      this.$refs.crud.toggleSelection(arr);
    },
    // 预警流程
    handleEdit() {
      this.dialogEdit = true;
      getYujin({
        size: -1,
        projectId: this.projectId
      }).then((res) => {
        if (res.data.data.records.length > 0) {
          this.editForm = res.data.data.records[0];
        } else {
          this.yujinType = false;
        }
      });
    },
    handleCloseEdit() {
      this.$refs.editForm.resetForm();
    },

    editSave(query, done) {
      if (this.yujinType == false) {
        addYujin(query).then((res) => {
          if (res.data.data == true) {
            this.$message.success("保存成功");
          } else {
            this.$danger.success("保存失败");
          }
        });
      } else {
        editYujin(query).then((res) => {
          if (res.data.data == true) {
            this.$message.success("修改成功");
          } else {
            this.$danger.success("修改失败");
          }
        });
      }
      this.dialogEdit = false;
      done();
    },

    // 视频监控
    rowVideo(row) {
      this.disasterData = row;
      this.dialogVideo = true;
    },

    hornBtn(row) {
      getShebei({
        disasterId: row.disasterId,
        type: "bjq_001",
        size: -1,
        projectId: this.projectId
      }).then((res) => {
        this.records = res.data.data.records;
      });
      this.dialogHorn = true;
    },
    handleCloseHorn() {},

    handleCancel(data) {
      this.dialogHorn = false;
    },
    handleCloseVideo() {},

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
    handlereset(form) {
      this.searchForm = form;
      this.page.currentPage = 1;
      this.getList(this.page, form);
    },
    handleRefreshChange() {
      this.getList(this.page);
    },
    isfullscreen() {
      this.dialogfull = !this.dialogfull;
    },
    handleClose() {
      this.getList(this.page);
      this.dialogFormVisible = false;
      this.disasterData = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
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

::v-deep.crud-form {
  ::v-deep label.el-form-item__label {
    width: 90px !important;
  }
  ::v-deep div.el-form-item__content {
    margin-left: 90px !important;
  }
}

::v-deep .el-dialog__body {
  padding: 10px 20px !important;
  ::v-deep [class*="el-col-"] {
    margin-bottom: 0 !important;
  }
}
.empty {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
>>> .form-plan .label.el-form-item__label {
  width: 130px !important;
}
::v-deep .form-plan .el-form-item__content {
  margin-left: 140px !important;
}
::v-deep.el-divider--horizontal {
  margin: 5px 0 !important;
}
::v-deep.avue-tabs {
  padding: 0 !important;
}
::v-deep.el-step.is-vertical .el-step__line {
  top: 10px;
  bottom: -30px !important;
}

::v-deep.el-steps--vertical {
  padding: 20px !important;
}
.dialog-title {
  color: #fff;
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  overflow: hidden;
}
.dialog-title i {
  position: absolute;
  right: 45px;
  top: 12px;
  color: #fff;
  text-align: right;
  font-size: 16px;
  cursor: pointer;
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
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>


