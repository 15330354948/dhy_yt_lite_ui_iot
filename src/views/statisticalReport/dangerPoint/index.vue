<!--
群测群防工作统计
-->
<template>
  <div class="hide_mod">
    <basic-container>
      <avue-crud
        :option="option"
        ref="crud"
        v-model="form"
        :page="page"
        @on-load="getTable"
        @size-change="sizeChange"
        @current-change="currentChange"
        :table-loading="listLoading"
        @search-change="handleFilter"
        @refresh-change="handleRefreshChange"
        @row-style="rowStyle"
        @search-reset="searchReset"
        :data="list">
          <template slot="menuLeft">
              <el-button
              class="filter-item"
              @click="handleDaochu"
              type="primary"
              icon="el-icon-download"
              >导出
              </el-button>
          </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { dangerPointOption } from "@/const/crud/statisticalReport/dangerPoint";

export default {
  name: "hidedanger",
  props:['dialogFormVisible',"openTab"],
  data() {
    return {
      option:dangerPointOption,
      searchForm: {},
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false//是否倒序
      },
      list: [],
      listLoading: false,
      form: {},
      warnLevel:[],//预警等级
      customSearchForm:[],
      isMap:false

    };
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  watch: {
    dialogFormVisible(val){
      if(val){
      // this.getTable(this.page);
      }
    },
    openTab:{
        deep:true,
        immediate:true,
        handler(val,old){
            if(val == 7){
                // this.getTable(this.page);
                // this.getDictionary();
            }
        }
    }
  },
  created() {
    // this.sys_user_add = this.permissions["sys_user_add"];
    // this.sys_user_edit = this.permissions["sys_user_edit"];
    // this.sys_user_del = this.permissions["sys_user_del"];
    // this.sys_user_reset_password = this.permissions["sys_user_reset_password"];
  },
  methods: {
    handleDaochu(){
      this.$refs.crud.rowExcel();
    },
    sizeChange(pageSize) {
    //   this.page.pageSize = pageSize
    },
    currentChange(current) {
    //   this.page.currentPage = current
    },
    handleFilter(form, done) {
    //   this.searchForm = Object.assign(form,this.customSearchForm);
    //   this.page.currentPage = 1;
    //   this.getTable(this.page, form);
      done()
    },
    handleRefreshChange() {
    //   this.getTable(this.page)
    },
    getTable(page,query){
      
    },
    rowStyle({row, column, rowIndex}) {
    //   if(rowIndex%2 == 0){
    //     return {
    //       background: "#eee",
    //       color: "#fff"
    //     }
    //   }
    },
    getDictionary(){
            // dictionary('warn_level').then(
            //     res => {
            //         this.warnLevel = res.data.data;
            //     }
            // )
    },
    searchReset(){
    //   this.customSearchForm={};
    }
  }
};
</script>

<style lang="scss" scoped>
.hide_mod {
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
.el-cascader.color_dark {
  ::v-deep .el-input__inner::-webkit-input-placeholder {
    color: #606266;
  }
  ::v-deep .el-input__inner::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #606266;
  }
  ::v-deep .el-input__inner:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #606266;
  }
  ::v-deep .el-input__inner:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #606266;
  }
}
</style>

<style lang="scss">
.hide_dialog{
  .el-dialog__header{
    padding: 10px;
    background: rgba(0, 58, 106, 1);
    color: #fff;
  }
  .el-dialog__headerbtn{
    top: 10px;
  }
  .el-dialog__body{
    padding: 10px !important
  }
  .el-tabs--left .el-tabs__item.is-left{
    text-align: center !important;
  }
}
</style>