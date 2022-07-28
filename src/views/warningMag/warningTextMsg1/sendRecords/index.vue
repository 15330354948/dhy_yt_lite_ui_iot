<template>
  <basic-container>
    <div class="text-msg">
      <!-- @on-load="getTable" -->
      <avue-crud
        :option="sendOption"
        :page="page"
        ref="cruds"
        v-model="sendForm"
        
        @size-change="sizeChange"
        @current-change="currentChange"
        :table-loading="listLoading"
        @search-change="handleFilter"
        @search-reset="searchReset"
        @refresh-change="handleRefreshChange"
        :data="tableData"
      >
        <template slot="menuLeft">
          <el-button
            type="primary"
            @click="handleBatch"
            v-if="permissions.sendRecords_manual_sendMsg"
            icon="el-icon-s-promotion"
            >下发短信
          </el-button>
        </template></avue-crud
      >
      <el-dialog
        title="下发短信"
        :visible.sync="dialogVisible"
        width="60%"
        append-to-body
        :before-close="handleClose"
      >
        <div class="titleLabel">
          短信内容：<span class="titleSpan">项目：{{userInfo.projectName}}，预警内容</span>：
        </div>
        <!-- maxlength="90" ，不超过90字（含标点符号） -->
        <el-input
          style="width: 80%; margin-left: 80px"
          type="textarea"
          :rows="7"
          placeholder="请输入预警内容"
          v-model="formxiafa.content"
          show-word-limit
        >
        </el-input>
        <div class="titleText">
          请持续观察数据变化情况，加强人工巡查，做好安全措施
        </div>

        <div
          class="tab-header"
          style="margin: 20px"
          v-show="!projectId ? true : false"
        >
          <el-row :gutter="2">
            <el-col :span="2"><span>项目：</span></el-col>
            <el-col :span="6">
              <el-select
                v-model="projectId"
                clearable
                placeholder="所属项目"
                @change="projectChange"
                class="project_select"
              >
                <el-option
                  v-for="item in projectOptions"
                  :key="item.id"
                  :label="item.projectName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>

        <div class="titleLabel">选择短信接收人：</div>
        <div style="text-align: center">
          <el-transfer
            ref="yourTransfer"
            style="text-align: left; display: inline-block"
            v-model="value"
            filterable
            :left-default-checked="[]"
            :right-default-checked="[]"
            :render-content="renderFunc"
            :titles="['全部人员', '确定人员']"
            :button-texts="['取消', '选中']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}',
            }"
            @change="handleChange"
            :data="data"
          >
          </el-transfer>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogClose">取 消</el-button>
          <el-button type="primary" @click="xiafaClick">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </basic-container>
</template>
<script>
import { sendOption } from "./sendRecordsOption";
import { mapGetters } from "vuex";
import { getendMessage, getwarnInfo, getjiluInfo } from "@/api/warningRecord";
import { projectInfo } from "@/api/monitorManage/device";
export default {
  computed: {
    ...mapGetters(["permissions", "projectId","userInfo"]),
  },
  props: ["show"],
  data() {
    return {
      projectOptions: [],
      arrdata: {},
      dialogVisible: false,
      sendOption: sendOption,
      sendForm: {},
      formxiafa: {
        content: "",
        phoneNumbers: [],
        receiverNameNumber: "",
        projectId: "",
      },
      form: {},
      //   page1: {
      //     total: 0,
      //     currentPage: 1, // 当前页数
      //     size: -1, // 每页显示多少条,
      //     isAsc: false, //是否倒序
      //   },
      name: "",
      listLoading: false,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false, //是否倒序
        projectId: ''
      },
      tableData: [],
      searchForm: {},
      dataArr: [],
      data: [],
      value: [],
      //   renderFunc(h, option) {
      //     return (
      //         <span>
      //         {option.label}
      //       </span>
      //     );
      //   },
    };
  },
  created() {
  },
  watch: {
    projectId: {
      immediate: true,
       handler(val, oVal) {
         this.page.projectId=val;
         window.sessionStorage.setItem('projectId', val)
         this.getdata(val);
        this.getTable(this.page);
      },
      deep: true,
    },
      show: {
        handler(newVal) {
          if (newVal == 2) {
            this.getTable(this.page);
            if (!this.projectId || this.projectId == 0) {
              this.isAdd = false;
              this.getdata(this.projectId);
            } else {
              // this.projectId = this.projectId;
              this.isAdd = true;
              this.getdata(this.projectId);
            }
            projectInfo().then((res) => {
              let dataRec = res.data.data;
              if (dataRec && dataRec.length > 0) {
                this.projectOptions = dataRec;
              }
            });
          }
        },
      },
      immediate: true,
      deep: true,
    // },
  },
  
  methods: {
    projectChange(val) {
      this.projectId = val;
      if (!val) {
        this.isAdd = false;
      } else {
        this.isAdd = true;
        this.getChange(num);
      }
    },

    dialogClose() {
      this.dialogVisible = false;
      this.$refs.yourTransfer.$children["0"].query = "";
      this.$refs.yourTransfer.$children["3"].query = "";
      this.formxiafa.content = "";
      this.formxiafa.phoneNumbers = [];
      this.formxiafa.receiverNameNumber = "";
      this.value = [];
    },
    searchReset() {
      this.searchForm = {};
      this.getTable(this.page);
    },
    xiafaClick() {
      if (
        this.formxiafa.receiverNameNumber.length != 0 &&
        this.formxiafa.content
      ) {
        this.dialogVisible = false;
        this.formxiafa.projectId = this.projectId;
        this.formxiafa.content+=" 请持续观察数据变化情况，加强人工巡查，做好安全措施！"
        getendMessage(this.formxiafa).then((v) => {
          if (v.data.code == 0) {
            this.$message.success(v.data.data);
            this.getTable(this.page);
            this.dialogClose();
          } else {
            this.$message.error(v.data.msg);
          }
        });
      } else {
        this.$message.error("下发短信，请填写短信内容和请选择通知人员");
      }
    },
    renderFunc(h, option) {
      return <span>{option.label}</span>;
    },
    getdata(num) {
      getwarnInfo({ size: -1, projectId: num }).then((v) => {
        this.dataArr = v.data.data.records;
        const dataN = [];
        for (let i = 0; i < this.dataArr.length; i++) {
          dataN.push({
            key: this.dataArr[i].name + "(" + this.dataArr[i].phone + ")",
            label: this.dataArr[i].name + "(" + this.dataArr[i].phone + ")",
          });
        }
        this.data = dataN;
      });
    },
    handleChange(value, direction, movedKeys) {
      if (value) {
        this.formxiafa.receiverNameNumber = value.join("、");
        let arr = [];
        arr = value;
        this.formxiafa.phoneNumbers = [];
        arr.map((v) => {
          if (v) {
            let a = v.substring(0, v.lastIndexOf(")"));
            let str = a.substring(a.lastIndexOf("(") + 1, a.length);
            this.formxiafa.phoneNumbers.push(str);
          }
        });
      } else {
        this.formxiafa.phoneNumbers = [];
        this.formxiafa.receiverNameNumber = "";
      }
    },
    handleBatch() {
      // this.formxiafa={}
      this.dialogVisible = true;
      // this.getdata();
      this.getdata(this.projectId);
    },
    handleClose() {
      this.dialogClose();
    },
    getTable(page, query) {
      this.listLoading = true;
      getjiluInfo(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
            projectId: this.projectId
          },
          query
        )
      ).then((res) => {
        this.tableData = res.data.data.records;
        this.page.total = res.data.data.total;
        this.listLoading = false;
      });
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.getTable(this.page);
    },
    currentChange(current) {
      this.page.currentPage = current;
      this.getTable(this.page);
    },
    handleFilter(form, done) {
      (form.startTimeParam = form.time ? form.time[0] : ""),
        (form.endTimeParam = form.time ? form.time[1] : ""),
        (this.searchForm = form);
      this.page.currentPage = 1;
      this.getTable(this.page, form);
      done();
    },
    handleRefreshChange() {
      this.getTable(this.page);
    },
  },
};
</script>
<style lang="scss" scoped>
.project_select {
  width: 100%;
}
.titleLabel {
  font-weight: bold;
  padding: 15px 0;
  font-size: 14px;
  .titleSpan {
    font-weight: normal;
    font-size: 12px;
  }
}
.titleText {
  margin-left: 80px;
  padding-top: 10px;
}
::v-deep.el-transfer-panel {
  width: 300px !important;
}
</style>