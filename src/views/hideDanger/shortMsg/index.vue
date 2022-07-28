

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
        <!-- <template slot="lockFlag" slot-scope="scope">
          <el-tag>{{ scope.label }}</el-tag>
        </template> -->
        
        <template slot="search">
          <el-form label-position="right" label-width="100px">
            <el-form-item label="预警等级:">
              <el-select style="width:200px" clearable v-if="warnLevel.length" v-model="customSearchForm.warnLevel"  placeholder="请选择隐患等级">
                  <el-option v-for="item in warnLevel"
                            :key="item.value*1"
                            :label="item.remarks"
                            :value="item.value*1"></el-option>
                </el-select>
            </el-form-item>
          </el-form>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {sendRecord} from '@/api/warningRecord'
import { tableOption } from './shortOption';
import { mapGetters } from "vuex";
import { dictionary } from "@/api/hideDanger/obj";

export default {
  name: "hidedanger",
  props:['dialogFormVisible',"openTab"],
  data() {
    return {
      searchForm: {},
      option: tableOption,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false//是否倒序
      },
      list: [],
      listLoading: true,
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
    // openTab(n){
    //   if(n == 8){
    //     this.getTable(this.page);
    //     this.getDictionary();
    //   }
    // },
    openTab:{
            deep:true,
            immediate:true,
            handler(val,old){
                if(val == 7){
                this.getTable(this.page);
                this.getDictionary();
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
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange(current) {
      this.page.currentPage = current
    },
    handleFilter(form, done) {
      this.searchForm = Object.assign(form,this.customSearchForm);
      this.page.currentPage = 1;
      this.getTable(this.page, form);
      done()
    },
    handleRefreshChange() {
      this.getTable(this.page)
    },
    getTable(page,query){
      let id = this.isMap ? this.$store.getters.analysisDetails.data.data.id : JSON.parse(window.sessionStorage.getItem('disasterData')).id;
            this.listLoading = true;
            sendRecord(
                Object.assign({
                  current: this.page.currentPage,
                  size: this.page.pageSize ,
                  id:id 
                },query)
            ).then( res => {
                this.list = res.data.data.records;
                if(this.list){
                  this.list.forEach(item =>{
                  item.warnLevelName = item.warnLevel ? this.warnLevel.filter(type => {
                    return type.value*1 == item.warnLevel;})[0].remarks : '';
                })
                }
                this.page.total = res.data.data.total
                this.listLoading = false;
            })
        },
    rowStyle({row, column, rowIndex}) {
      if(rowIndex%2 == 0){
        return {
          background: "#eee",
          color: "#fff"
        }
      }
    },
    getDictionary(){
            dictionary('warn_level').then(
                res => {
                    this.warnLevel = res.data.data;
                }
            )
        },
    searchReset(){
      this.customSearchForm={};
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
  :deep .el-input__inner::-webkit-input-placeholder {
    color: #606266;
  }
  :deep .el-input__inner::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #606266;
  }
  :deep .el-input__inner:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #606266;
  }
  :deep .el-input__inner:-ms-input-placeholder {
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


