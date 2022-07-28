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
          <el-tag  :type="scope.row.status == 1 ? 'success' : 'danger'">
            {{ scope.row.status == 1 ? "启用" : "禁用" }}
          </el-tag>
        </template>
        <template slot="runStatus" slot-scope="scope">
          <el-tag  :type="scope.row.runStatus == 'on-line' ? 'success' : 'danger'">
            {{ scope.row.runStatus=='on-line'?'在线':'离线' }}
          </el-tag>
        </template>

        <template slot="menu"
                  slot-scope="scope">
          <el-button v-if="instanceInfosBtn"
                     
                     type="text"
                     icon="el-icon-tickets"
                     @click="getInstanceList(scope.row.serviceId)">实例信息
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog
      :visible.sync="instanceDialogFormVisible"
      :close-on-click-modal="false"
      title="服务实例管理"
      width="90%"
      append-to-body
      @close="instanceVisible">

      <el-alert
        title="服务下线警告"
        description="实例下线后在将无法对外提供服务，若是该服务只有一个实例，不建议在此处下线服务，实例一旦下线需到Nacos控制台手动上线，请谨慎操作"
        type="warning"
        effect="dark"
        show-icon
      style="margin-bottom: 5px">
      </el-alert>

      <avue-crud
        ref="crudItem"
        :data="tableInstanceData"
        :permission="permissionList"
        :option="tableInstanceOption"
        @refresh-change="instanceRefreshChange"
        @row-update="handleUpdateInstance">
        <template slot="enabled" slot-scope="scope">
          <el-tag  :type="scope.row.enabled ? 'success' : 'danger'">
            {{ scope.row.enabled ?'在线':'离线' }}
          </el-tag>
        </template>

        <template slot="healthyForm"
                  slot-scope="scope">
          <el-switch
            disabled
            v-model="scope.row.healthy"
            active-color="#13ce66"
            inactive-color="#f2f3f7">
          </el-switch>
        </template>
        <template slot="enabledForm"
                  slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            active-color="#13ce66"
            inactive-color="#f2f3f7">
          </el-switch>
        </template>
        <template slot="ephemeralForm"
                  slot-scope="scope">
          <el-switch
            disabled
            v-model="scope.row.ephemeral"
            active-color="#13ce66"
            inactive-color="#f2f3f7">
          </el-switch>
        </template>
        <template slot="metadataForm"
                  slot-scope="scope">
          <el-input
            type="textarea"
            :value="JSON.stringify(scope.row.metadata)"
            :autosize="{ minRows: 4 ,maxRows: 20}"
            placeholder="请输入内容">
          </el-input>
        </template>
      </avue-crud>
    </el-dialog>
  </div>
</template>

<script>
  import {
    fetchList, fetchInstanceList, getObj, addObj, putObj, delObj,
    updateInstance, deregisterInstance, deleteNacosService
  } from '@/api/admin/gateway/route'
  import {tableOption, tableInstanceOption} from '@/const/crud/admin/gateway/route'
  import {mapGetters} from 'vuex'

  export default {
    name: 'sysroute',
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
        instanceInfosBtn: false,

        serviceId: '',
        instanceDialogFormVisible: false,
        tableInstanceData: [],
        tableInstanceOption: tableInstanceOption,
        instancePage: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20 // 每页显示多少条
        },
      }
    },
    computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permissions['admin_sys_route_add'], false),
          delBtn: this.vaildData(this.permissions['admin_sys_route_del'], false),
          editBtn: this.vaildData(this.permissions['admin_sys_route_edit'], false)
        };
      }
    },
    created() {
      this.instanceInfosBtn = this.vaildData(this.permissions['admin_sys_route_instance_infos'], false);
    },
    methods: {
      getList(page, params) {
        this.tableLoading = true
        fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params, this.searchForm)).then(response => {
          this.tableData = response.data.data.records
          this.page.total = response.data.data.total
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        })
      },
      rowDel: function (row, index) {
        this.$confirm('是否确认删除:' + row.name, '提示', {
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
        putObj(row).then(data => {
          this.$message.success('修改成功')
          done()
          this.getList(this.page)
        }).catch(() => {
          loading();
        });
      },
      handleSave: function (row, done, loading) {
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

      instanceVisible: function () {
        this.serviceId = undefined;
        this.instanceDialogFormVisible = false
      },
      getInstanceList(serviceId) {
        this.instanceDialogFormVisible = true
        this.serviceId = serviceId;
        fetchInstanceList(this.serviceId).then(response => {
          this.tableInstanceData = response.data.data
        })
      },
      instanceRefreshChange: function () {
        this.getInstanceList(this.serviceId);
      },
      handleUpdateInstance: function (row, done, loading) {
        updateInstance({
          serviceName: this.serviceId,
          instanceId: row.instanceId,
          weight: row.weight,
          enabled: row.enabled
        }).then(data => {
          this.$message.success('修改成功')
          done()
          this.getInstanceList(this.serviceId)
        }).catch(() => {
          loading();
        });
      },
    }
  }
</script>
