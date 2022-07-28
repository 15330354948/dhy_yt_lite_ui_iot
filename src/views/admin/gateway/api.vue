<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <el-container>
        <el-aside>
          <div style="position: fixed;width: 300px;height: 100%;">
            <div style=" position: absolute;right: 0px;position: absolute; z-index: 2; right: 6px; top: 7px;
          font-size: 18px; color: #409eff; cursor: pointer;">
              <el-button type="primary" icon="el-icon-refresh-right" size="mini" @click="loadRouteList()">刷新</el-button>
            </div>
            <el-tabs type="border-card" style="position: fixed;width: 300px;">
              <el-tab-pane style="max-height: 698px;overflow: auto ">
                <span slot="label">ALL</span>
                <el-menu class="group-menu" mode="vertical" default-active="all" v-loading="groupListLoading">
                  <el-menu-item index="all" @click="switchRoute('')">
                    <i class="el-icon-menu"></i>
                    <span>全部</span>
                  </el-menu-item>
                  <template v-for="(item,index) in routeItem.data">
                    <el-menu-item
                      :index="'' + index"
                      @click="switchRoute(item.serviceId)"
                      v-bind:key="'all'+index">
                      <div flex="dir:left box:last">
                        <div style="overflow: hidden;text-overflow: ellipsis">
                          <i class="el-icon-menu"></i>
                          <span :title="item.name || item.serviceId">
                          {{item.name || item.serviceId }}
                        </span>
                          <i class="el-icon-success" style="color: #67c23a" v-if="item.status=='up'"
                             :title="item.serviceId + '在线'"></i>
                          <i class="el-icon-warning" style="color: #f56c6c" v-if="item.status=='down'"
                             :title="item.serviceId + '离线'"></i>
                        </div>
                      </div>
                    </el-menu-item>
                  </template>
                </el-menu>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label" style="color: #67c23a">在线</span>
                <el-menu class="group-menu" mode="vertical" v-loading="groupListLoading">
                  <el-menu-item index="all"
                                @click="switchRoute('')"
                                v-bind:key="'all'">
                    <i class="el-icon-menu"></i>
                    <span>全部</span>
                  </el-menu-item>
                  <template v-for="(item,index) in routeItem.data">
                    <el-menu-item
                      v-if="item.status=='up'"
                      :index="'' + index"
                      @click="switchRoute(item.serviceId)"
                      v-bind:key="'up'+index">
                      <div flex="dir:left box:last">
                        <div style="overflow: hidden;text-overflow: ellipsis">
                          <i class="el-icon-menu"></i>
                          <span :title="item.name || item.serviceId">
                          {{item.name || item.serviceId }}
                        </span>
                          <i class="el-icon-success" style="color: #67c23a" :title="item.serviceId + '在线'"></i>
                        </div>
                      </div>
                    </el-menu-item>
                  </template>
                </el-menu>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label" style="color: #f56c6c">离线</span>
                <el-menu class="group-menu" mode="vertical" v-loading="groupListLoading">
                  <el-menu-item index="all" @click="switchRoute('')">
                    <i class="el-icon-menu"></i>
                    <span>全部</span>
                  </el-menu-item>
                  <template v-for="(item,index) in routeItem.data">
                    <el-menu-item
                      v-if="item.status=='down'"
                      :index="'' + index"
                      @click="switchRoute(item.serviceId)"
                      v-bind:key="'down'+index">
                      <div flex="dir:left box:last">
                        <div style="overflow: hidden;text-overflow: ellipsis">
                          <i class="el-icon-menu"></i>
                          <span :title="item.name || item.serviceId">
                          {{item.name || item.serviceId }}
                        </span>
                          <i class="el-icon-warning" style="color: #f56c6c" :title="item.serviceId + '离线'"></i>
                        </div>
                      </div>
                    </el-menu-item>
                  </template>
                </el-menu>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-aside>
        <el-main>
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
                     @selection-change="selectionChange"
                     @row-update="handleUpdate"
                     @row-save="handleSave"
                     @row-del="rowDelete">
            <template slot="menuLeft">
              <el-button type="success" icon="el-icon-refresh-right" plain @click="handleSync">同步API</el-button>
              <el-button type="warning" icon="el-icon-open" plain @click="handleStatus(1)">启用</el-button>
              <el-button type="danger" icon="el-icon-turn-off" plain @click="handleStatus(0)">禁用</el-button>
              <el-button type="danger" plain icon="el-icon-delete" @click="handleDelete">删除</el-button>
            </template>

            <template slot="status" slot-scope="scope">
              <el-tag  :type="scope.row.status == 1 ? 'success' : 'danger'">
                {{ scope.row.status == 1 ? "启用" : "禁用" }}
              </el-tag>
            </template>
            <template slot="auth" slot-scope="scope">
              <el-tag  :type="scope.row.auth == 1 ? 'success' : 'danger'">
                {{ scope.row.label == 1 ? "身份认证" : "忽略认证" }}
              </el-tag>
            </template>
          </avue-crud>
        </el-main>
      </el-container>
    </basic-container>
  </div>
</template>

<script>
  import {
    getApiList,
    getApiById,
    saveOrUpdateApi,
    deleteApi,
    statusApi,
    syncApi
  } from "@/api/admin/gateway/api";
  import {listRoute} from "@/api/admin/gateway/route";

  import {tableOption} from '@/const/crud/admin/gateway/api'
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        searchForm: {},
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        tableLoading: false,
        tableOption: tableOption,
        serviceId: '',

        groupListLoading: false,

        // 表单参数
        methods: [
          {id: 1, name: "GET"},
          {id: 2, name: "POST"}
        ],
        selectionList: [],
        routeItem: [],
      };
    },
    created() {
      this.loadRouteList();
    },
    computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          delBtn: true// this.vaildData(this.permissions.generator_sysapi_del, false),
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      }
    },
    methods: {
      getList(page, params) {
        this.searchForm.serviceId = this.serviceId;
        this.tableLoading = true
        getApiList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params, this.searchForm)).then(response => {
          this.tableData = response.data.data.records;
          this.page.total = response.data.data.total;
          this.tableLoading = false;
        }).catch(() => {
          this.tableLoading = false;
        })
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
        console.log(form)
        this.getList(this.page, form)
        done()
      },
      refreshChange() {
        this.getList(this.page)
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      /**　查询路由列表 */
      loadRouteList() {
        this.groupListLoading = true;
        listRoute().then(response => {
          this.groupListLoading = false;
          this.routeItem = response.data;
        });
      },
      /** 根据serviceId切换路由 */
      switchRoute(serviceId) {
        this.serviceId = serviceId
        this.getList(this.page);
      },
      handleStatus(status) {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择大于一条数据");
          return;
        }
        let statusName = "";
        if (status == "1") {
          statusName = "启用";
        } else if (status == "0") {
          statusName = "禁用";
        }
        this.$confirm(
          `确认${statusName}选中的${this.selectionList.length}条数据?`,
          "警告",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          return statusApi(this.ids, status);
        }).then(() => {
          this.refreshChange();
          this.$message.success("操作成功");
        }).catch(function () {
        });
      },
      handleSync() {
        this.$confirm(
          `确认同步API数据么，同步后所有API数据将会进行新增和更新?`,
          "警告",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          this.tableLoading = true
          syncApi(this.ids, status).then(response => {
            this.refreshChange();
            this.$message.success("接口同步成功");
            this.tableLoading = false
          }).catch(() => {
            this.tableLoading = false
          });
        }).catch(function () {
        });
      },
      /** 批量删除操作 */
      handleDelete() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择大于一条数据");
          return;
        }
        this.$confirm(`确认删除选中的${this.selectionList.length}条数据?`, "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          return deleteApi(this.ids);
        }).then(() => {
          this.refreshChange();
          this.$message.success("删除成功");
        }).catch(function () {
        });
      },
      rowDelete(row) {
        this.$confirm('是否确认删除名称为"' + row.name + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return deleteApi(row.id);
        }).then(() => {
          this.refreshChange();
          this.$message.success("删除成功");
        }).catch(function () {
        });
      },
      handleUpdate: function (row, index, done, loading) {
        saveOrUpdateApi(row).then(data => {
          this.$message.success('修改成功')
          done()
          this.getList(this.page)
        }).catch(() => {
          loading();
        });
      },
    }
  };
</script>
