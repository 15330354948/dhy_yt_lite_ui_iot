<template>
  <div class="appBanners">
    <basic-container>
      <avue-crud ref="crud" :page.sync="page" :table-loading="tableLoading" :option="tableOption" :data="tableData"
        @search-change="searchChange" @search-reset="searchReset" @refresh-change="refreshChange"
        @size-change="sizeChange" @current-change="currentChange" @row-del="rowDel" @row-save="handleSave"
        @selection-change="selectionChange">
        <template slot="menuLeft">
          <el-button type="primary" @click="handleDel">批量删除
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
  import {
    tableOption
  } from "@/const/crud/monitorManage/appBanners";
  import {
    addObj,
    getPage,
    delData
  } from "@/api/monitorManage/platform";
  import {
    mapGetters
  } from "vuex"
  export default {
    props: ["activeName"],
    computed: {
      ...mapGetters(["projectId"]), //获取权限
    },
    watch: {
      activeName: {
        handler(val) {
          if (val == "rotate") {
            this.page.currentPage = 1;
            this.getList();
            this.searchReset();
          }
        },
        immediate: true
      },
      projectId: {
        handler(val) {
          if (val && val != 0) {
            if (this.$refs.crud) {
              this.$refs.crud.toggleSelection();
              this.$refs.crud.selectClear();
              this.$refs.crud.searchReset();
              this.getList(this.page);
            }
          }
        }
      }
    },
    data() {
      return {
        tableOption: tableOption,
        tableLoading: false,
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条,
          pageSizes: [10, 20, 50, 100, 200],
        },
        tableData: [],
        searchParams: {},
        selectionData: [],
      }
    },
    methods: {
      getList(page, params) {
        this.tableLoading = true;
        getPage(
          Object.assign({
              current: this.page.currentPage,
              size: this.page.pageSize,
              projectId: this.projectId,
            },
            params,
            this.searchParams
          )
        ).then((response) => {
          this.tableData = response.data.data.records;
          this.page.total = response.data.data.total;
          this.tableLoading = false;
        });
      },
      handleSave(row, done, loading) {
        // row.url = row.url[0].value;
        addObj(Object.assign(row, {
          projectId: this.projectId,
        })).then((res) => {
          loading();
          done();
          this.page.current = 1;
          this.page.currentPage = 1;
          this.getList();
          this.$message.success('新增成功')
        });
      },
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
      rowDel(form, index, done) {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            delData([form.id]).then(res => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              done(form);
            })
          })
          .catch(() => {});
      },
      handleDel() {
        let idList = this.getSelectionDataId()
        if (idList.length == 0) {
          this.$message.warning("请选择需要删除的数据");
          return;
        }
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            delData(idList).then(res => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getList();
            })
          })
          .catch(() => {});
      },
      searchChange(form, done) {
        this.page.currentPage = 1;
        this.searchParams = form;
        this.getList();
        done();
      },
      searchReset() {
        this.page.currentPage = 1;
        this.page.pageSize = 10;
        this.searchParams = {};
        this.getList();
      },
      refreshChange() {
        this.getList();
      },
      sizeChange(pageSize) {
        //分页条数变化时
        this.page.pageSize = pageSize;
        this.getList();
      },
      currentChange(current) {
        //当前页码变化时
        this.page.currentPage = current;
        this.getList();
      },

    }
  }

</script>

<style lang="scss" scoped>

</style>
