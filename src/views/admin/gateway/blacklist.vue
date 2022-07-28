<template>
  <div class="execution">
    <basic-container>
      <avue-crud ref="crud"
                 :page="page"
                 :data="tableData"
                 :permission="permissionList"
                 :table-loading="tableLoading"
                 :option="tableOption"
                 @on-load="getList"
                 @search-change="searchChange"
                 @refresh-change="refreshChange"
                 @size-change="sizeChange"
                 @current-change="currentChange"
                 @row-update="handleUpdate"
                 @row-save="handleSave"
                 @row-del="rowDel">
        <template slot="status" slot-scope="scope">
          <el-tag  :type="scope.row.status ? 'success' : 'danger'">
            {{ scope.row.status ? "启用" : "关闭" }}
          </el-tag>
        </template>


        <template slot="requestUriForm" slot-scope="scope">
          <el-tooltip placement="bottom">
            <el-input type="text" v-model="scope.row.requestUri"/>
            <div slot="content">

                <pre>
The mapping matches URLs using the following rules:
? matches one character
* matches zero or more characters
** matches zero or more directories in a path
{spring:[a-z]+} matches the regexp [a-z]+ as a path variable named "spring"
Examples
com/t?st.jsp — matches com/test.jsp but also com/tast.jsp or com/txst.jsp
com/*.jsp — matches all .jsp files in the com directory
com/**/test.jsp — matches all test.jsp files underneath the com path
org/springframework/**/*.jsp — matches all .jsp files underneath the org/springframework path
org/**/servlet/bla.jsp — matches org/springframework/servlet/bla.jsp but also org/springframework/testing/servlet/bla.jsp and org/servlet/bla.jsp
com/{filename:\\w+}.jsp will match com/test.jsp and assign the value test to the filename variable
Note: a pattern and a path must both be absolute or must both be relative in order for the two to match. Therefore it is recommended that users of this implementation to sanitize patterns in order to prefix them with "/" as it makes sense in the context in which they're used
</pre>

            </div>
          </el-tooltip>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
  import {fetchList, getBlacklistById, addObj, putObj, delObj, setStatus} from '@/api/admin/gateway/blacklist'
  import {tableOption} from '@/const/crud/admin/gateway/blacklist'
  import {mapGetters} from 'vuex'
  import {dateFormat} from '@/util/date'

  export default {
    name: 'sysblacklist',
    data() {
      return {
        searchForm: {},
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20 // 每页显示多少条
        },
        tableLoading: false,
        tableOption: tableOption,
      }
    },
    computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permissions.admin_sys_blacklist_add, false),
          delBtn: this.vaildData(this.permissions.admin_sys_blacklist_del, false),
          editBtn: this.vaildData(this.permissions.admin_sys_blacklist_edit, false),
          setStatusBtn: this.vaildData(this.permissions.admin_sys_blacklist_update_status, false),
        };
      }
    },
    methods: {
      getList(page, params) {
        this.tableLoading = true
        fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params, this.searchForm)).then(response => {
          let records = response.data.data.records;
          if (records) {
            for (let i = 0, len = records.length; i < len; i++) {
              records[i].timerange = [
                new Date('1990-01-01 ' + records[i].startTime),
                new Date('1990-01-01 ' + records[i].endTime)
              ]
            }
          }
          this.tableData = records
          this.page.total = response.data.data.total
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        })
      },
      rowDel: function (row, index) {
        this.$confirm('是否确认删除ID为' + row.id, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return delObj(row.id)
        }).then(data => {
          this.$message.success('删除成功')
          this.getList(this.page)
        })
      },
      handleUpdate: function (row, index, done, loading) {
        this.setStartTimeAndEndTime(row);
        putObj(row).then(data => {
          this.$message.success('修改成功')
          done()
          this.getList(this.page)
        }).catch(() => {
          loading();
        });
      },
      handleSave: function (row, done, loading) {
        this.setStartTimeAndEndTime(row);
        addObj(row).then(data => {
          this.$message.success('添加成功')
          done()
          this.getList(this.page)
        }).catch(() => {
          loading();
        });
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize
      },
      currentChange(current) {
        this.page.currentPage = current
      },
      searchChange(form, done) {
        this.page.currentPage =1
        this.searchForm = form
        this.getList(this.page, form)
        done()
      },
      refreshChange() {
        this.getList(this.page)
      },
      setStartTimeAndEndTime: function (row) {
        if (row.timerange) {
          row.startTime = dateFormat(row.timerange[0], 'HH:mm:ss');
          row.endTime = dateFormat(row.timerange[1], 'HH:mm:ss');
        }
      },
    }
  }
</script>
