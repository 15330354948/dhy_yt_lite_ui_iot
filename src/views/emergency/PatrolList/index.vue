
<template>
  <div class="user">
    <basic-container>
      <avue-crud
        :option="option"
        ref="crud"
        v-model="form"
        :page.sync="page"
        @on-load="getList"
        @size-change="sizeChange"
        @current-change="currentChange"
        @search-change="searchChange"
        @search-reset="handlereset"
        @refresh-change="handleRefreshChange"
        :table-loading="listLoading"
        :data="list"
      >
        <template slot-scope="scope" slot="menu">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-circle-close"
            @click="toView(scope.row)"
          >查看</el-button>
        </template>
        <template slot="netUrlForm">
          <div class="demo-image__preview">
            <el-image
              v-for="(item, index) in url"
              :key="index"
              style="width: 100px; height: 100px"
              :src="item.fileVO.netUrl"
              :preview-src-list="srcList"
            ></el-image>
          </div>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { fetchList } from "@/api/patrolList/patrollist";
// import { disInfo } from "@/api/monitorManage/device";
import { tableOption } from "@/const/crud/emergency/patrolList/patrollist1";
import { mapGetters } from "vuex";
// import store from "@/store";
import { baseUrl } from "@/config/env";
export default {
  name: "table_user",
  data() {
    return {
      searchForm1: {},//搜索数据
      option: tableOption,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false //是否倒序
      },
      list: [],
      listLoading: false,
      form: {},
      url: [],
      srcList: []
    };
  },
  computed: {
    ...mapGetters(["permissions,access_token"]),
    header() {
      return { Authorization: "Bearer " + store.getters.access_token };
    }
  },
  watch: {},
  created() {},
  methods: {
    toView(row, index) {
      this.url = row.voList;
      this.$refs.crud.rowView(row, index);
    },
    handleCurrentChange() {},
    //分页查询
    getList(page, params) {
      this.listLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
            "orders[0].asc": false,
            "orders[0].column": "create_time",
          },
          params,
          this.searchForm1
        )
      )
        .then(res => {
          this.list = res.data.data ? res.data.data.records : [];
          this.page.total = res.data.data.total;
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },

    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    //搜索
    searchChange(form, done) {
      this.searchForm1 = form;
      this.page.currentPage = 1;
      this.getList(this.page, form);
      done();
    },
    //清空
    handlereset(form, done) {
      this.searchForm1 = {};
      this.page.currentPage = 1;
      this.getList(this.page, form);
    },
    handleRefreshChange() {
      this.getList(this.page);
    }
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
.demo-image__preview {
  z-index: 2200 !important;
}
</style>


