<template>
  <div class="log">
    <basic-container>
      <avue-crud ref="crud" :page="page" :data="tableData" :table-loading="tableLoading" :option="tableOption"
        :permission="permissionList" @on-load="getList" @search-change="searchChange" @search-reset="searchresret"
        @size-change="sizeChange" @current-change="currentChange" @selection-change="selectionChange"
        @row-update="handleUpdate" @row-save="handleSave">
        <template slot="menuLeft">
          <el-button @click="handleAdd" class="filter-item" type="primary" icon="el-icon-plus"
            v-if="permissions['generator_professionalfactory_add']">新增
          </el-button>
          <el-button @click="upload" class="filter-item" type="primary" icon="el-icon-bottom"
            v-if="permissions['generator_professionalfactory_upload']">导出
          </el-button>
          <el-button type="danger" @click="handleBatchDelete" icon="el-icon-delete"
            v-if="permissions['generator_professionalfactory_del']">批量删除
          </el-button>
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button icon="el-icon-edit" @click="editFunc(scope.row)" size="small" type="text"
            v-if="permissions['generator_professionalfactory_edit']">编辑
          </el-button>
          <el-button @click="handleDeviceList(scope.row)" size="small" type="text">设备列表
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
    <div></div>
  </div>
</template>

<script>
  import {
    delObj,
    fetchList,
    addObj,
    putObj,
  } from "@/api/monitorManage/manufacturer";
  import {
    tableOption
  } from "@/const/crud/monitorManage/manufacturerList";
  import {
    mapGetters
  } from "vuex";
  import layout from "@/page/index/layout.vue";

  export default {
    components: {
      layout
    },
    name: "log",
    data() {
      return {
        tableData: [],
        searchObj: {
          "orders[0].asc": false,
          "orders[0].column": "create_time",
        },
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
        },
        tableLoading: false,
        tableOption: tableOption,
        type: {},
        id: {},
        selectionData: [],
        //自定义权限
        customPermissions: {
          monitor_device_del: false,
        },
      };
    },
    computed: {
      ...mapGetters(["permissions", "projectId"]),
      permissionList() {
        return {
          delBtn: this.vaildData(this.permissions.monitor_device_del, false),
        };
      },
      infoData() {
        return this.form.info || [];
      },
    },
    watch: {
      projectId: {
        immediate: true,
        handler(val, oVal) {
          window.sessionStorage.setItem('projectId', val)
          this.getList(this.page);
          this.$nextTick(() => {
            this.$refs.crud.selectClear();
            this.$refs.crud.searchReset();
          })
        },
        deep: true,
      },
    },
    created() {
      this.type = this.tableOption.column[0];
      this.customPermissions = {
        monitor_device_del: this.vaildData(
          this.permissions.monitor_device_del,
          false
        ),
      };
    },
    methods: {
      upload() {},
      // 分页查询
      getList(page, params) {
        this.tableLoading = true;
        fetchList(
          Object.assign({
              current: page.currentPage,
              size: page.pageSize,
            }, {
              projectId: this.projectId
            },
            params
          )
        ).then((response) => {
          this.tableData = response.data.data.records;
          this.page.total = response.data.data.total;
          this.tableLoading = false;
          this.searchObj;
        });
      },
      // 提交
      submit(form, done) {},

      selectionChange(selection) {
        this.selectionData = selection;
      },
      getSelectionDataId() {
        let idList = new Array();
        if (this.selectionData.length > 0) {
          this.selectionData.forEach((d) => idList.push(d.id));
        }
        return idList;
      },
      // 设备列表
      handleDeviceList(id) {
        this.$router.push({
          path: "../deviceList/index",
          query: {
            id: id.id
          }
        });
      },
      // 批量删除
      handleBatchDelete() {
        let idList = this.getSelectionDataId();

        if (idList.length == 0) {
          this.$message.warning("请选择需要删除的数据");
          return idList;
        }
        this.$confirm("是否确认删除当前选中的数据？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(function () {
            // idList = idList.join();
            return delObj({
              idList: idList.join()
            });
          })
          .then((data) => {
            this.$message.success("删除成功");
            this.$refs.crud.selectClear();
            this.getList(this.page);
          });
      },
      // 编辑提交
      editFunc: function (row) {
        this.$refs.crud.rowEdit(row);
      },
      handleUpdate: function (row, index, done) {
        putObj(row).then((data) => {
          this.$message.success("修改成功");
          this.getList(this.page);
          done();
        });
      },
      handleAdd() {
        this.$refs.crud.rowAdd();
      },
      // 新增提交
      handleSave: function (row, done) {
        addObj(row).then((data) => {
          this.$message.success("添加成功");
          this.getList(this.page);
          done();
        });
      },
      // 搜索
      searchChange(form, done) {
        this.page.currentPage = 1;
        this.getList(this.page, form);
        done();
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
      },
      currentChange(current) {
        this.page.currentPage = current;
      },
      //清空

      searchresret() {
        this.getList(this.page);
      },
      //  toPercent(point){
      //   if (point==0) {
      //       return 0;
      //   }
      //           var str=Number(point*100).toFixed();
      //           str+="%";
      //           return str;
      // }
    },
  };

</script>

<style lang="scss" scoped>
  .el-textarea {
    border: 1px solid #f0f0f0;
  }

  .el-form-item__label {
    width: 130px;
  }

  ::v-deep.el-col-24 {
    width: 25% !important;
  }

</style>
