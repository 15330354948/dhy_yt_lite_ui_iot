<template>
  <basic-container>
    <div class="text-msg">
      <avue-crud
        :option="peopleOption"
        :page="page"
        ref="cruds"
        v-model="sendForm"
        @on-load="getTable"
        @size-change="sizeChange"
        @current-change="currentChange"
        :table-loading="listLoading"
        @search-change="handleFilter"
        @row-update="handleUpdate"
        @refresh-change="handleRefreshChange"
        @search-reset="searchReset"
        @row-save="handleSave"
        @selection-change="selectionChange"
        :data="tableData"
      >
        <template slot="menuLeft">
          <el-button
            type="danger"
            @click="handleBatchDelete"
            icon="el-icon-delete"
            >批量删除
          </el-button>
        </template>
      </avue-crud>
    </div>
  </basic-container>
</template>
<script>
import { peopleOption } from "./people";
import { getwarnInfo, getAdd1,getDel,getedit} from "@/api/warningRecord";
export default {
  data() {
    return {
      peopleOption: peopleOption,
      sendForm: {},
      listLoading: false,
      selectionData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        // isAsc: false, //是否倒序
        order:[{asc:false,column:'id'}],
      },
     
      tableData: [],
      searchForm: {},
    };
  },
  created() {
    this.getTable(this.page);
  },
  methods: {
      searchReset(){
          this.searchForm={}
          this.getTable(this.page);
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
    // 编辑提交
    handleUpdate(row, index, done, loading) {
      loading();
      getedit(row).then((v) => {
        if (v.data.code == 0) {
          this.$message.success("修改成功");
          done();
          this.getTable(this.page);
        } else {
          this.$message.error("修改失败");
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
          return getDel( idList);
        })
        .then((data) => {
          this.$message.success("删除成功");
          this.getTable(this.page);
        });
    },
    handleSave(row, done, loading) {
      getAdd1(row).then((v) => {
        if (v.data.code == 0) {
          this.$message.success("新增人员成功");
          done();
          this.getTable(this.page);
        } else {
          this.$message.error("新增人员失败");
        }
      });
    },
    getTable(page, query) {
      this.listLoading = true;
      getwarnInfo(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
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
      this.searchForm = form;
      this.page.currentPage = 1;
      this.getTable(this.page, this.searchForm);
      done();
    },
    handleRefreshChange() {
      this.getTable(this.page);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>