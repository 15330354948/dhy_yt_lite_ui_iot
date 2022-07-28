<template>
  <div class="isInstructRecord">
    <avue-crud
      class="record"
      :option="recordOption"
      ref="crud"
      :page.sync="page"
      @on-load="getList"
      @size-change="sizeChange"
      @current-change="currentChange"
      @search-change="handleFilter"
      @search-reset="handlereset"
      @refresh-change="handleChange"
      :table-loading="loading"
      :data="data"
    >
    </avue-crud>
  </div>
</template>

<script>
import { recordOption } from "@/const/crud/monitorManage/deviceList";
import { getRecordPage } from "@/api/monitorManage/device";
export default {
  name: "isInstruct",
  props: ["devdata", "flag"],
  watch: {
    devdata: {
      immediate: true,
      handler: function (newval) {
        this.code = newval[0].code;
      },
    },
  },
  data() {
    return {
      recordOption: recordOption,
      loading: false,
      data: [],
      code:"",
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
      },
    };
  },
  methods: {
    async getList(page, params) {
      this.loading = true;
      await getRecordPage(
        Object.assign(
          {
            current: this.page.currentPage,
            size: this.page.pageSize,
          },
          {
              deviceSn:this.code
          },
          params
        )
      ).then((res) => {
        this.loading = false;
        res.data.data.records.forEach((item) => {
          this.$set(item, "deviceSn", JSON.parse(item.body).sn);
        });

        this.data = res.data.data.records;
        this.page.total = res.data.data.total;
      });
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
    handlereset(form) {
      this.searchForm = {};
      this.page.currentPage = 1;
      this.getList(this.page, form);
    },
    handleChange() {
      this.getList(this.page);
    },
  },
};
</script>

<style>
</style>