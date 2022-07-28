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
        @row-update="handleEdit"
        @row-del="handleDel"
        :before-open="beforeOpen"
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
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { tableOption } from "@/const/crud/projectManage/deviceConfig";
import {
  fetchList,
  addObj,
  putObj,
  delObj,
} from "@/api/projectManage/deviceConfig";
export default {
  props: ["parentData"],
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
       orders: [],
      serverSideSorting: false,
    };
  },

  created() {},
  mounted() {
    this.getList(this.page); //初始展示表格
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
    getList() {
      this.tableLoading = true;
      fetchList(
        Object.assign(
          {
            current: this.page.currentPage,
            size: this.page.pageSize,
            // "orders[0].column": "create_time",
            // "orders[0].asc": false,
            projectId: "==" + this.parentData.id,
          },
          this.searchParams, this.orders
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
    },
    handelAdd(row, done, loading) {
      //新增
      this.obj.projectId = this.parentData.id;
      loading();
      addObj(this.obj).then((res) => {
        done();
        this.page.current = 1;
        this.page.currentPage = 1;
        this.getList(this.page);
      });
    },
    handleEdit(row, index, done, loading) {
      //修改
      this.obj.projectId = this.parentData.id;
      loading();
      putObj(this.obj).then((res) => {
        done();
        this.page.current = 1;
        this.page.currentPage = 1;
        this.getList(this.page);
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
            this.page.current = 1;
            this.page.currentPage = 1;
            this.getList(this.page);
          });

          //  this.$message.success('删除成功')
        })
        .catch(function () {});
    },
    beforeOpen(done, type) {
      let httpUrl = this.findObject(this.tableOption.column, "httpUrl");
      let mqExchange = this.findObject(this.tableOption.column, "mqExchange");
      let mqHost = this.findObject(this.tableOption.column, "mqHost");
      let mqPassword = this.findObject(this.tableOption.column, "mqPassword");
      let mqPort = this.findObject(this.tableOption.column, "mqPort");
      let mqQueue = this.findObject(this.tableOption.column, "mqQueue");
      let mqUsername = this.findObject(this.tableOption.column, "mqUsername");
      let mqVirtualHost = this.findObject(
        this.tableOption.column,
        "mqVirtualHost"
      );

      if (type == "add") {
        this.obj = {};
        this.obj.pushType = null;
        this.obj.enableStatus = 1;
        httpUrl.addDisplay = false;
        mqExchange.addDisplay = false;
        mqHost.addDisplay = false;
        mqPassword.addDisplay = false;
        mqPort.addDisplay = false;
        mqQueue.addDisplay = false;
        mqUsername.addDisplay = false;
        mqVirtualHost.addDisplay = false;
      }
      done();
    },
  },
  computed: {
    ...mapGetters(["permissions"]), //获取权限
    permissionList() {
      return {
        addBtn: this.vaildData(
          this.permissions.device_project_data_transfer_config_add,
          false
        ),
        delBtn: this.vaildData(
          this.permissions.device_project_data_transfer_config_del,
          false
        ),
        editBtn: this.vaildData(
          this.permissions.device_project_data_transfer_config_edit,
          false
        ),
      };
    },
  },
  watch: {
    "obj.pushType": {
      handler(x) {
        let httpUrl = this.findObject(this.tableOption.column, "httpUrl");
        let mqExchange = this.findObject(this.tableOption.column, "mqExchange");
        let mqHost = this.findObject(this.tableOption.column, "mqHost");
        let mqPassword = this.findObject(this.tableOption.column, "mqPassword");
        let mqPort = this.findObject(this.tableOption.column, "mqPort");
        let mqQueue = this.findObject(this.tableOption.column, "mqQueue");
        let mqUsername = this.findObject(this.tableOption.column, "mqUsername");
        let mqVirtualHost = this.findObject(
          this.tableOption.column,
          "mqVirtualHost"
        );

        if (x == 1) {
          this.obj.httpUrl = null;
          httpUrl.addDisplay = false;
          httpUrl.editDisplay = false;
          httpUrl.viewDisplay = false;
          mqExchange.addDisplay = true;
          mqExchange.editDisplay = true;
          mqExchange.viewDisplay = true;
          mqHost.addDisplay = true;
          mqHost.editDisplay = true;
          mqHost.viewDisplay = true;
          mqPassword.addDisplay = true;
          mqPassword.editDisplay = true;
          mqPassword.viewDisplay = true;
          mqPort.addDisplay = true;
          mqPort.editDisplay = true;
          mqPort.viewDisplay = true;
          mqQueue.addDisplay = true;
          mqQueue.editDisplay = true;
          mqQueue.viewDisplay = true;
          mqUsername.addDisplay = true;
          mqUsername.editDisplay = true;
          mqUsername.viewDisplay = true;
          mqVirtualHost.addDisplay = true;
          mqVirtualHost.editDisplay = true;
          mqVirtualHost.viewDisplay = true;
        } else if (x == 2) {
          httpUrl.addDisplay = true;
          httpUrl.editDisplay = true;
          httpUrl.viewDisplay = true;

          mqExchange.addDisplay = false;
          mqExchange.editDisplay = false;
          mqExchange.viewDisplay = false;
          mqHost.addDisplay = false;
          mqHost.editDisplay = false;
          mqHost.viewDisplay = false;
          mqPassword.addDisplay = false;
          mqPassword.editDisplay = false;
          mqPassword.viewDisplay = false;
          mqPort.addDisplay = false;
          mqPort.editDisplay = false;
          mqPort.viewDisplay = false;
          mqQueue.addDisplay = false;
          mqQueue.editDisplay = false;
          mqQueue.viewDisplay = false;
          mqUsername.addDisplay = false;
          mqUsername.editDisplay = false;
          mqUsername.viewDisplay = false;
          mqVirtualHost.addDisplay = false;
          mqVirtualHost.editDisplay = false;
          mqVirtualHost.viewDisplay = false;
          this.obj.mqExchange = null;
          this.obj.mqHost = null;
          this.obj.mqPassword = null;
          this.obj.mqPort = null;
          this.obj.mqQueue = null;
          this.obj.mqUsername = null;
          this.obj.mqVirtualHost = null;
        }
      },
    },
    parentData: {
      handler(x, y) {
        if (x) {
          this.getList(this.page);
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
</style>