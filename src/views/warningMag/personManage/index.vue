<template>
  <div class="execution">
    <basic-container>
      <avue-form
        ref="form"
        v-model="searchForm"
        :option="searchOption"
        @submit="searchChange"
        @reset-change="searchReset"
      ></avue-form>

      <avue-crud
        ref="crud"
        :data="tableData"
        :page.sync="page"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="refreshChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="rowDel"
        :permission="permissionList"
      >
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {tableOption,searchOption} from '@/const/crud/warningMag/personManage'
import { addObj, delObj, fetchList, putObj,batchDelObj } from '@/api/warningMag/personManage'

export default {
  name: 'personManage',
  data() {
    return {
      tableLoading: false,
      tableOption: tableOption,
      searchForm: {},
      searchOption: searchOption,
      tableData: [],
      form: {},
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
    }
  },
  components: {
  },
  created() {
    if(this.userInfo.isAdmin==1){//超级管理员

    }else{
        let column=this.tableOption.column
        column.forEach(e => {
          if(e.prop=="projectId"){
            e.editDisabled=true
            e.addDisabled=true
            e.value=this.projectId
          }
        });
    }
  },
  mounted() {
   
  },
  computed: {
    ...mapGetters(['permissions',"projectId","userInfo"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.generator_personmanage_add, false),
        delBtn: this.vaildData(this.permissions.generator_personmanage_del, false),
        editBtn: this.vaildData(this.permissions.generator_personmanage_edit, false)
      }
    }
  },
  watch: {projectId:{
      immediate: true,
       handler(val, oVal) {
         window.sessionStorage.setItem('projectId', val)
        this.getList(this.page);
      },
      deep: true,
    }},
  methods: {
    getList(page, params) {
      this.tableLoading = true
      fetchList(Object.assign({
        current: page.currentPage,
        size: page.pageSize,
        projectId:this.projectId,
      }, params)).then(response => {
        let datas = response.data.data.records;
        // datas.forEach(element => {
        //   if (element.additionalInformation) {
        //     element.additionalInformation = JSON.parse(element.additionalInformation);
        //     if (!element.accessTokenValidity) {
        //       element.accessTokenValidity = 43200;
        //     }
        //     if (!element.refreshTokenValidity) {
        //       element.refreshTokenValidity = 2592000;
        //     }
        //   }
        // });
        this.tableData = datas;
        this.page.total = response.data.data.total
        this.tableLoading = false
      })
    },
    rowDel: function (row, index) {
      this.$confirm('是否确认删除ID为' + row.id, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delObj({ids:row.id})
      }).then(data => {
        this.$message.success('删除成功')
        this.refreshChange()
      })
    },
    searchChange(form, done) {
      this.tableLoading = true;
      this.page.currentPage = 1;
      this.form = form;
      this.getList(this.page, this.form);
      done();
    },
    searchReset(form, page) {
      this.form = {};
      this.page.currentPage = 1;
      this.page.pageSize = 20;
      this.getList(this.page, this.form);
    },
    handleUpdate: function (row, index, done) {
      putObj(row).then(data => {
        this.$message.success('修改成功')
        this.refreshChange()
        done()
      })
    },
    handleSave: function (row, done) {
      addObj(row).then(data => {
        this.$message.success('添加成功')
        this.refreshChange()
        done()
      })
    },
    refreshChange() {
      this.getList(this.page)
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange(current) {
      this.page.currentPage = current
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

