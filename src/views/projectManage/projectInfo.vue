<template>
  <div>
    <basic-container>
      <avue-crud
        :data="tableData"
        :option="tableOption"
        :permission="permissionList"
        v-model="obj"
        :page.sync="page"
        :class="{ table_is_show: !tableCSSTab }"
        @search-change="searchChange"
        @search-reset="searchReset"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-save="handelAdd"
        @row-update="handleEdit"
        @row-del="handleDel"
        @sort-change="sortChange"
        ref="tableProjectInfo"
      >
        <template slot="menuRight">
          <el-radio-group
            v-model="serverSideSorting"
            style="margin-right: 10px"
            v-show="tableCSSTab"
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
        </template>
        <template slot="menuLeft">
          <el-button v-show="!tableCSSTab" type="primary" @click="cardMore"
            >加载更多数据</el-button
          >
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button
            v-if="permissions.project_send_config"
            type="text"
            @click="handleConfig(scope.row)"
            >转发配置</el-button
          >
          <el-button
            v-if="permissions.project_send_config"
            type="text"
            @click="getWorkDetail(scope.row)"
            >项目运行详情</el-button
          >
        </template>
        <template slot="searchMenu">
          <el-button type="primary" @click="tabTableCss">{{
            tablecssTabName
          }}</el-button>
        </template>
        <template slot="projectName" slot-scope="scope">
          <el-button type="text" @click="openDetailDialog(scope.row)">{{
            scope.row.projectName
          }}</el-button>
        </template>
      </avue-crud>
      <!-- 卡片式页面 -->
      <div v-show="!tableCSSTab" class="card_div">
        <div v-if="cardData && cardData.length > 0" class="div_box">
          <el-card
            class="box-card"
            v-for="(cardItem, cardIndex) in cardData"
            :key="cardIndex"
          >
            <div
              class="text item"
              style="text-align: center; font-size: 17px; margin-top: 20px"
            >
              <img src="@/assets/img/gk.png" v-if="cardItem.projectName=='深圳工勘展厅'" alt="" />
              <img src="@/assets/img/projectImg.png" v-else alt="" />
              <div>
                <!-- <span style="display: inline-block">(项目名称)</span> -->
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="cardItem.projectName"
                  placement="top"
                >
                  <span
                    style="
                      position: relative;
                      top: 5px;
                      display: inline-block;
                      max-width: 98%;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    <!-- {{ cardItem.projectName || "--" }} -->
                    <el-button
                      type="text"
                      @click="openDetailDialog(cardItem)"
                      >{{ cardItem.projectName }}</el-button
                    >
                  </span>
                </el-tooltip>
              </div>
            </div>
            <div class="text item" style="margin: 20px 0 10px 0">
              <div style="font-size: 14px">
                项目编号：
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="cardItem.projectNo"
                  placement="top"
                >
                  <span
                    style="
                      position: relative;
                      top: 3px;
                      display: inline-block;
                      max-width: calc(100% - 75px);
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    {{ cardItem.projectNo || "--" }}
                  </span>
                </el-tooltip>
              </div>

              <div style="font-size: 14px">
                创建时间：{{ cardItem.createTime }}
              </div>
            </div>
            <hr />
            <div class="text item">
              <el-button
                type="text"
                @click="cardView(cardItem, cardIndex)"
                style="color: #409eff; border-bottom: 1px solid #409eff"
                class="underLine_set"
                >查看</el-button
              >
              <el-button
                type="text"
                v-if="permissions.device_project_info_edit"
                @click="cardEdit(cardItem, cardIndex)"
                class="underLine_set"
                style="color: #e6a23c; border-bottom: 1px solid #e6a23c"
                >编辑</el-button
              >
              <el-button
                type="text "
                v-if="permissions.device_project_info_del"
                style="color: #f56c6c; border-bottom: 1px solid #f56c6c"
                class="underLine_set"
                @click="cardDel(cardItem, cardIndex)"
                >删除</el-button
              >
              <el-button
                type="text"
                class="underLine_set"
                v-if="permissions.project_send_config"
                style="color: #409eff; border-bottom: 1px solid #409eff"
                @click="handleConfig(cardItem)"
                >转发配置</el-button
              >
              <el-button
                type="text"
                class="underLine_set"
                v-if="permissions.project_send_config"
                style="color: #409eff; border-bottom: 1px solid #409eff"
                @click="getWorkDetail(cardItem)"
                >项目运行详情</el-button
              >
            </div>
          </el-card>
        </div>
        <div v-else>
          <el-card class="box-card">
            <div class="text item" style="text-align: center;">
              <img src="@/assets/img/nodata.png" alt="" />
            </div>
            <div class="text item" style="text-align: center">暂无数据</div>
          </el-card>
        </div>
      </div>
      <!-- 转发配置页面 -->
      <el-dialog
        title="项目设备数据转发配置管理"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        append-to-body
        width="80%"
      >
        <!-- height="auto" -->
        <div>
          <deviceConfig :parentData.sync="rowData"></deviceConfig>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
         
          <el-button type="primary" @click="dialogVisible = false"
            >关闭</el-button
          >
        </span> -->
      </el-dialog>
      <!-- 项目运行详情页面 -->
      <el-dialog
        title="项目运行详情"
        :visible.sync="dialogVisibleProjectWorkDetail"
        :close-on-click-modal="false"
        append-to-body
        width="92%"
        height="60%"
        custom-class="dialog_project_operation"
        :before-close="handleDialogClose"
      >
        <div>
          <projectOperation
            :parentData.sync="rowDataOperation"
            ref="projectOperationRef"
          ></projectOperation>
        </div>
      </el-dialog>
      <!-- 项目详情页面 -->
      <el-dialog
        title="项目详情"
        :visible.sync="dialogDetail"
        :close-on-click-modal="false"
        append-to-body
        width="92%"
        height="60%"
        custom-class="dialog_detail"
        :before-close="handleDialogDetailClose"
      >
        <div>
          <detailInfo
            :parentData.sync="rowDetail"
            ref="projectDetailRef"
          ></detailInfo>
        </div>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { tableOption } from "@/const/crud/projectManage/projectInfo";
import deviceConfig from "./deviceConfig";
import projectOperation from "./projectOperation";
import detailInfo from "./detailInfo";
import {
  fetchList,
  addObj,
  putObj,
  delObj,
} from "@/api/projectManage/projectInfo";
export default {
  components: {
    deviceConfig,
    projectOperation,
    detailInfo,
  },
  data() {
    return {
      tableOption: tableOption,
      obj: {},
      searchParams: {},
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      dialogVisible: false,
      dialogVisibleProjectWorkDetail: false,
      rowData: {},
      rowDataOperation: {},
      orders: [],
      serverSideSorting: false,
      tableCSSTab: false,
      // tablecssTabName: "卡片式展示",
      // tableCSSTab: true,
      tablecssTabName: "表格展示",
      tableDataPort: [],
      cardData: [],
      count: 1,
      portPages: 1,
      dialogDetail: false,
      rowDetail: {},
    };
  },

  created() {},
  mounted() {
    this.$refs.tableProjectInfo.option.refreshBtn = true;
    // this.$refs.tableProjectInfo.option.searchMenuSpan = 24;
    // this.$refs.tableProjectInfo.propOption.forEach((element) => {
    //   if (element.prop == "appId" || element.prop == "appSecret") {
    //     if (this.tableCSSTab) {
    //       element.search = true;
    //     } else {
    //       element.search = false;
    //     }
    //   }
    // });
    // this.getList(this.page); //初始展示表格
    this.cardData = [];
    this.count = 1;
    this.getCardDataByPort(1);
  },
  methods: {
    sortChange(sortColumn) {
      if (this.serverSideSorting) {
        this.orders = new Array();
        if (sortColumn.order != null) {
          this.orders.push({
            column: sortColumn.prop,
            asc: sortColumn.order == "ascending",
          });
        }
        this.getList(this.page);
      }
    },
    getList(page) {
      this.tableLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
            // "orders[0].column": "create_time",
            // "orders[0].asc": false,
          },
          this.searchParams,
          this.orders
        )
      ).then((res) => {
        this.tableData = res.data.data.records;
        this.tableDataPort = res.data.data.records;
        this.page.total = res.data.data.total;
        this.tableLoading = false;
      });
    },
    searchChange(form, done) {
      this.page.currentPage = 1;
      this.searchParams = form;
      this.getList(this.page);
      this.cardData = [];
      this.getCardDataByPort(1);
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
      this.getList(this.page);
      this.count = 1;
      this.cardData = [];
      this.getCardDataByPort(1);
    },
    sizeChange(pageSize) {
      //分页条数变化时
      this.page.currentPage = 1;
      this.page.pageSize = pageSize;
      this.getList(this.page);
    },
    currentChange(page) {
      //当前页码变化时
      this.page.currentPage = page;
      this.page.pageSize = 10;
      this.getList(this.page);
    },
    refreshChange() {
      this.getList(this.page);
      this.cardData = [];
      this.count = 1;
      this.getCardDataByPort(1);
    },
    handelAdd(row, done, loading) {
      //新增
      loading();
      addObj(this.obj).then((res) => {
        done();
        this.page.pageSize = 10;
        this.page.currentPage = 1;
        this.getList(this.page);
        this.cardData = [];
        this.count = 1;
        this.getCardDataByPort(1);
      });
    },
    handleEdit(row, index, done, loading) {
      //修改
      loading();
      putObj(this.obj).then((res) => {
        done();
        this.page.pageSize = 10;
        this.page.currentPage = 1;
        this.getList(this.page);
        this.cardData = [];
        this.count = 1;
        this.getCardDataByPort(1);
      });
    },
    handleDel(row, index) {
      //删除
      this.$confirm("是否确认删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delObj(row.id).then((res) => {
            this.page.pageSize = 10;
            this.page.currentPage = 1;
            this.getList(this.page);
            this.cardData = [];
            this.count = 1;
            this.getCardDataByPort(1);
          });

          //  this.$message.success('删除成功')
        })
        .catch(function () {});
    },
    handleConfig(row) {
      //转发配置按钮
      this.rowData = row;
      this.dialogVisible = true;
    },
    getWorkDetail(row) {
      //项目运行详情按钮
      this.rowDataOperation = row;
      this.dialogVisibleProjectWorkDetail = true;
    },
    handleDialogClose(done) {
      done();
      let childRef = this.$refs.projectOperationRef;
      childRef.searchFrom.time = [
        childRef.dateFormate(Date.now() - 24 * 60 * 60 * 1000 * 7),
        childRef.dateFormate(Date.now() - 24 * 60 * 60 * 1000),
      ];
      childRef.getChartDataByport();
      childRef.tabCard(1);
    },
    tabTableCss() {
      //切换展示事件
      this.tableCSSTab = !this.tableCSSTab;
      this.$refs.tableProjectInfo.option.refreshBtn = this.tableCSSTab;
      // this.$refs.tableProjectInfo.propOption.forEach((element) => {
      //   if (element.prop == "appId" || element.prop == "appSecret") {
      //     if (this.tableCSSTab) {
      //       element.search = true;
      //     } else {
      //       element.search = false;
      //     }
      //   }
      // });
      this.page.currentPage = 1;
      this.page.pageSize = 10;

      if (this.tableCSSTab) {
        // this.tablecssTabName = "表格展示";
        this.tablecssTabName = "卡片式展示";
        // this.$refs.tableProjectInfo.option.searchMenuSpan = 24;
        this.getList(this.page);
      } else {
        // this.tablecssTabName = "卡片式展示";
         this.tablecssTabName = "表格展示";
        // this.$refs.tableProjectInfo.option.searchMenuSpan = 8;
        // this.cardData = this.tableData;
        this.cardData = [];
        this.count = 1;
        this.getCardDataByPort(1);
      }
    },
    cardView(row, index) {
      //卡片内的查看
      this.$refs.tableProjectInfo.rowView(row, index);
    },
    cardEdit(row, index) {
      //卡片内的编辑
      this.$refs.tableProjectInfo.rowEdit(row, index);
    },
    cardDel(row, index) {
      //卡片内的删除
      this.handleDel(row, index);
    },
    getCardDataByPort(count) {
      fetchList(
        Object.assign(
          {
            current: count,
            size: 8,
            // size: 10,
            "orders[0].column": "create_time",
            "orders[0].asc": false,
          },
          this.searchParams,
          this.orders
        )
      ).then((res) => {
        this.portPages = res.data.data.pages;
        this.cardData = this.cardData.concat(res.data.data.records);
      });
    },
    cardMore() {
      //更多数据事件
      this.count++;
      if (this.count > this.portPages) {
        this.$message.info("没有更多数据了！");
        return false;
      }
      this.getCardDataByPort(this.count);
    },
    // detailInfo.vue
    openDetailDialog(row) {
      // this.$router.push({
      //   path: "/projectManage/detailInfo",
      //   query:{
      //     parentData: row,
      //   },
      //   // params: {
      //   //   parentData: row,
      //   // },
      // });
      //     this.$router.push({
      //     path: "projectManage/detailInfo",
      //   query: { parentData: row, },
      // });
      //打开项目详情
       this.rowDetail = row;
      this.dialogDetail = true;
    },
    handleDialogDetailClose(done) {
      done();
      let childRef = this.$refs.projectDetailRef;
      childRef.currentPage = 0;
      // childRef.currentPage=1;
      childRef.bottomShow = true;
      childRef.alarmLevel = "";
      childRef.alarmType = null;
      childRef.rangeData = {
        data_1: [], //省份聚合数据
        data_2: [], //市聚合数据
        data_3: [], //区县聚合数据
        data_4: [], //村级具体栽点数据
      };
      childRef.tableData = [];
      childRef.getTableDataByPort();
    },
  },
  computed: {
    ...mapGetters(["permissions"]), //获取权限
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.device_project_info_add, false),
        delBtn: this.vaildData(this.permissions.device_project_info_del, false),
        editBtn: this.vaildData(
          this.permissions.device_project_info_edit,
          false
        ),
      };
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.underLine_set {
  text-decoration: none;
  display: inline-block;
  padding-bottom: 1px; /*这里设置你要空的距离*/
}
::v-deep.el-dialog__header {
  border-bottom: 1px solid #f0f0f0;
}
.avue-crud.table_is_show {
  ::v-deep.avue-crud__pagination,
  ::v-deep.avue-crud__right,
  ::v-deep.el-table {
    display: none;
  }
  ::v-deep.avue-crud__menu {
    border: none;
  }
}
.card_div {
  margin-top: 10px;
  height: calc(100% - 160px);
  // height: 618px;
  // height: 615px;
  overflow-y: auto;

  .div_box {
    display: flex;
    flex-wrap: wrap;
    hr {
      display: inline-block;
      width: 98%;
      border: none;
      border-bottom: 1px dashed #ccc;
    }
  }
  .box-card {
    display: inline-block;
    margin: 4px;
    // margin: 5px;
    width: 24%;
    color: #606266;
  }

  .box-card.is-always-shadow {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    img {
      position: relative;
      // bottom: 10px;
      left: 10px;
      width: 27%;
    }
  }
}
/* --- 改变滚动条样式 --- */
.card_div::-webkit-scrollbar {
  width: 6px;
}

/* --- 滚动条里面的滚动块 --- */
.card_div::-webkit-scrollbar-thumb {
  // height:30px;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px #377dff;
  background: #377dff;
}

/* --- 滚动条里面轨道 --- */
.card_div::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: transparent;
}
::v-deep.dialog_project_operation {
  margin-top: 5px !important;
  .el-dialog__body {
    background-color: #f5f5f5;
  }
}
::v-deep.dialog_detail {
  margin-top: 30px !important;
}
</style>