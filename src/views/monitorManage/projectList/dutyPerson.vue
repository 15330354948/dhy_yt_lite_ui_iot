<template>
  <div class="bc_duty-person">
     <basic-container>
       <avue-crud
        ref="crud"
        :page="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @search-change="searchChange"
        @search-reset="searchresret"
        @size-change="sizeChange"
        @current-change="currentChange"
        @selection-change="selectionChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="rowDel"
        :permission="permissionList"
      ></avue-crud>
     </basic-container>
  </div>
</template>

<script>
import {
  dutyPersonList,
  addDutyObj,
  putDutyObj,
  delDutyObj,
} from "@/api/monitorManage/projectList";
import { mapGetters, mapState } from "vuex";
import { dutyOption } from "@/const/crud/monitorManage/projectList";
export default {
  data() {
    return {
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableData: [], //数据表格
      tableLoading: false,
      tableOption: dutyOption,
      searchForm1:{}
    }
  },
  computed: {
    ...mapGetters([ "userInfo" ,"projectId","permissions"]),
     permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.dutyPerson_add, false),
        delBtn: this.vaildData(this.permissions.dutyPerson_edit, false),
        editBtn: this.vaildData(this.permissions.dutyPerson_del, false)
      };
    }
  },
  watch:{
    "projectId":{
      immediate: true,
       handler(val, oVal) {
         window.sessionStorage.setItem('projectId', val)
    //       this.tableOption.column.forEach((item) => {
    //     if(item.prop == "projectId"){
    //     item.dicData = this.userInfo.projectInfoList
    //   }
    // });
    if(this.$refs.crud){
            this.$refs.crud.searchReset()
            this.$refs.crud.selectClear()
          }
        this.getList(this.page);
      },
      deep: true,
    },
  },
  created(){
      if(this.userInfo.isAdmin==1){//超级管理员

    }else{
        let column=this.tableOption.column
        column.forEach(e => {
          if(e.prop=="projectId"){
            e.editDisabled=true
            e.addDisabled=true
            e.search=false
            e.value=this.projectId
          }
        });
    }
  },
  mounted() {
  },
  methods:{
    getList(page, params) {
      this.tableLoading = true;
      if (params) {
        if (params.beginTime) {
          params.beginTime = "="+ params.beginTime
        }
        if (params.endTime) {
          params.endTime = "="+ params.endTime
        }
      }
      //分页查询
      dutyPersonList(
        Object.assign({
          current: this.page.currentPage,
          size: this.page.pageSize,
          "orders[0].asc": false,
          "orders[0].column": "create_time",
          projectId: this.projectId
        }, params, this.searchForm1)
      ).then(response => {
        this.tableData = response.data.data.records;
        this.page.total = response.data.data.total;
        this.tableLoading = false;
      }).catch(() => {
        this.tableLoading = false;
      });
    },
    // 项目分页
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    sizeChangelist(pageSize) {
      this.itemPage.pageSize = pageSize;
    },
    // 搜索数据
    searchChange(form, done) {
      this.searchForm1 = form;
      this.page.currentPage = 1;
      this.getList(this.page, form);
      done();
    },
    // 清空搜索
    searchresret() {
      this.searchForm1 = {};
      this.page.currentPage = 1;
      this.getList(this.page);
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    // 列表分页查询
    selectionChange(selection) {
      this.selectionData = selection;
    },
    // 修改数据
    handleUpdate(row, index, done, loading) {
      putDutyObj(row).then(data => {
        this.$message.success("修改成功");
        done();
        this.getList(this.page);
      }).catch(() => {
        loading();
      });
    },
    // 新增数据
    handleSave(row, done, loading) {
      let queryRow = {}
      if(this.tableData.length<1){
        queryRow = {parentId: 0,...row}
      }else{
        queryRow = {parentId: "",...row}
      }
      addDutyObj(queryRow).then(data => {
        this.$message.success("添加成功");
        done();
        this.getList(this.page);
      }).catch(() => {
        loading();
      });
    },
    // 删除数据
    rowDel(row, index) {
      let _this = this
      this.$confirm("是否确认删除ID为" + row.id, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        // if(row.parentId !== "0"){
          let ids=[];
          ids.push(row.id);
          delDutyObj(ids).then(res=>{
            _this.$message.success("删除成功");
          });
          // return
        // }else{
        //   _this.$message.error("不能删除主要值班信息");
        // }
      }).then(data => {
        
        this.getList(this.page);
      });
    },
  }
}
</script>

<style>

</style>