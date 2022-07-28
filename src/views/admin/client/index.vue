<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        :permission="permissionList"
        @on-load="getList"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="refreshChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="rowDel"
      >
        <!-- <template slot-scope="scope" slot="additionalInformationForm">
          <vue-json-editor
            v-model="form.additionalInformation"
            :showBtns="false"
            mode="tree"
            :modes="['tree', 'code']"
            :lang="lang"
            :expandedOnStart="expandedOnStart"
          />
        </template> -->
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor'
import { addObj, delObj, fetchList, putObj } from '@/api/admin/client'
import { tableOption } from '@/const/crud/admin/client'
import { mapGetters } from 'vuex'

export default {
  name: 'client',
  data() {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      lang: 'zh',
      expandedOnStart: true,
      tableOption: tableOption
    }
  },
  components: {
    vueJsonEditor
  },
  created() {
  },
  mounted: function () {
  },
  computed: {
    ...mapGetters(['permissions']),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.sys_client_add, false),
        delBtn: this.vaildData(this.permissions.sys_client_del, false),
        editBtn: this.vaildData(this.permissions.sys_client_edit, false)
      }
    }
  },
  methods: {
    getList(page, params) {
      this.tableLoading = true
      fetchList(Object.assign({
        current: page.currentPage,
        size: page.pageSize
      }, params)).then(response => {
        let datas=response.data.data.records;
        datas.forEach(element => {
          if(element.additionalInformation){
              element.additionalInformation=JSON.parse(element.additionalInformation);
          }
        });
        this.tableData = datas;
        this.page.total = response.data.data.total
        this.tableLoading = false
      })
    },
    rowDel: function (row, index) {
      this.$confirm('是否确认删除ID为' + row.clientId, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delObj(row.clientId)
      }).then(data => {
        this.$message.success('删除成功')
        this.refreshChange()
      })
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

