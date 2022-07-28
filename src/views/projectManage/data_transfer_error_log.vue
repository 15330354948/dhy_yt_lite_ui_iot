
<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page="page"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @search-change="searchChange"
        @search-reset="searchReset"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="rowDel"
        @selection-change="selectionChange"
        @sort-change="sortChange"
      >
        <template slot="menuRight">
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
        </template>
        <template slot="dataForm" slot-scope="scope">
          <vue-json-editor
            v-model="scope.row.data"
            :showBtns="false"
            mode="view"
            :modes="['view']"
            :lang="lang"
            :expandedOnStart="expandedOnStart"
          />
        </template>
        <template slot="configForm" slot-scope="scope">
          <vue-json-editor
            v-model="scope.row.config"
            :showBtns="false"
            mode="view"
            :modes="['view']"
            :lang="lang"
            :expandedOnStart="expandedOnStart"
          />
        </template>
        <template slot="menuLeft">
          <div>
            <el-button
              type="primary"
              size="mini"
              @click="resetPort"
              v-if="permissions.data_model_pass_back"
              >重发
            </el-button>
            <el-tooltip
              content="再次尝试发送数据至应用端"
              placement="right"
              effect="dark"
            >
              <i style="color: #409eff" class="el-icon-question"></i>
            </el-tooltip>
          </div>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {
  fetchList,
  getObj,
  addObj,
  putObj,
  delObj,
  resendObj,
} from "@/api/projectManage/data_transfer_error_log";
import { tableOption } from "@/const/crud/projectManage/data_transfer_error_log";
import { mapGetters } from "vuex";
import vueJsonEditor from "vue-json-editor";
export default {
  name: "datatransfererrorlog",
  data() {
    return {
      searchForm: {},
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
      lang: "zh",
      expandedOnStart: true,
      selectionData: [],
      orders: [],
      serverSideSorting: false,
    };
  },
  components: {
    vueJsonEditor,
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        viewBtn: this.vaildData(
          this.permissions.device_data_transfer_error_log_view,
          false
        ),
        delBtn: this.vaildData(
          this.permissions.device_data_transfer_error_log_del,
          false
        ),
      };
    },
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
    getList(page, params) {
      this.tableLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
            // "orders[0].column": "create_time",
            // "orders[0].asc": false,
          },
          params,
          this.searchForm,
          this.orders
        )
      )
        .then((response) => {
          this.tableData = response.data.data.records;
          if (this.tableData && this.tableData.length > 0) {
            this.tableData.forEach((element) => {
              element.data = JSON.parse(element.data);
              element.config = JSON.parse(element.config);
            });
          }
          this.page.total = response.data.data.total;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    rowDel: function (row, index) {
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
          });

          //  this.$message.success('删除成功')
        })
        .catch(function () {});
    },
    handleUpdate: function (row, index, done, loading) {
      putObj(row)
        .then((data) => {
          this.$message.success("修改成功");
          done();
          this.getList(this.page);
        })
        .catch(() => {
          loading();
        });
    },
    handleSave: function (row, done, loading) {
      addObj(row)
        .then((data) => {
          this.$message.success("添加成功");
          done();
          this.getList(this.page);
        })
        .catch(() => {
          loading();
        });
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.page.currentPage = 1;
    },
    currentChange(current) {
      this.page.currentPage = current;
      this.page.pageSize = 10;
    },
    searchChange(form, done) {
      this.searchForm = form;
      this.page.currentPage =1
      this.getList(this.page, form);
      done();
    },
    searchReset() {
      this.page.currentPage = 1;
      this.page.pageSize = 10;
      this.searchForm = {};
      this.getList(this.page);
    },
    refreshChange() {
      this.getList(this.page);
    },
    resetPort() {
      //重传解析
      if (this.selectionData && this.selectionData.length > 0) {
        let arrTpl = this.selectionData.map((item) => {
          return item.id;
        });
        resendObj(arrTpl).then((res) => {
          if (res.data.code == 0) {
            this.$message.success("重传解析成功");
          }
          this.page.currentPage = 1;
          this.page.pageSize = 10;
          this.getList(this.page);
        });
      } else {
        this.$message.error("请选择一条数据");
      }
    },
    selectionChange(list) {
      //选择变化
      this.selectionData = list;
    },
  },
};
</script>
