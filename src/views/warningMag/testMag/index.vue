
<template>
  <div class="user">
    <basic-container>
      <avue-crud
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
        <template slot="menuLeft">
          <el-button
            class="filter-item"
            @click="handleCreate"
            type="danger"
            icon="el-icon-delete"
            >批量删除
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { fetchList, putObj } from "@/api/admin/user";
import { tableOption } from "@/const/crud/warningMag/testForm";
import { mapGetters } from "vuex";
export default {
  name: "table_user",
  data() {
    return {
      searchForm: {},
      option: tableOption,
      checkedKeys: [],
      cascaderCurrentValue: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false //是否倒序
      },
      list: [],
      listLoading: true,
      form: {},
      colorChange: false
    };
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  watch: {},
  created() {},
  methods: {
    getList(page, params) {
      this.listLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize
          },
          params,
          this.searchForm
        )
      ).then(response => {
        this.list = response.data.data.records;
        this.page.total = response.data.data.total;
        this.listLoading = false;
      });
    },
    destill(data) {},
    rowedit(data) {},
    rowdel(data) {},
    handleCreate(){},
    getNodeData(data) {
      this.setRoleOptions();
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
    handlereset() {
      this.handleFilter();
    },
    handleRefreshChange() {
      this.getList(this.page);
    },
  }
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
::v-deep label.el-form-item__label {
  width: 90px !important;
}
::v-deep div.el-form-item__content {
  margin-left: 90px !important;
}
</style>


