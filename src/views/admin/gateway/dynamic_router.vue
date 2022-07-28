<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <el-alert
        style="margin-bottom: 5px;"
        title="路由更新警告"
        type="warning"
        description="动态路由的更新会直接影响各微服务与网关之间的映射关系，
        一旦配置错误微服务将无法正常为已经对接的前端应用提供服务，若非必要建
        议不要更新已存在的路由信息!!"
        show-icon>
      </el-alert>
      <el-container>
        <el-aside style="width: 30%;">
          <div class="el-aside-content">
            <vue-json-editor
              v-model="routers"
              :showBtns="showBtns"
              :mode="mode"
              :modes="modes"
              :lang="lang"
              :expandedOnStart="expandedOnStart"/>
          </div>
        </el-aside>
        <el-main>
          <avue-crud ref="crud"
                     :data="routers"
                     :table-loading="tableLoading"
                     :option="tableOption"
                     @row-update="handleUpdate"
                     @row-save="handleSave"
                     @row-del="rowDelete"
                     @refresh-change="getRouteDataConfigs">

            <template slot="menuLeft">
              <el-button type="danger" @click="publishRouters"><i class="el-icon-s-promotion"></i>发布路由
              </el-button>
              <el-alert
                style="margin-bottom: 5px; float: right; position: absolute; top: 0px; width: 500px; right: 45px;"
                title="注意：路由修改之后并未实时提交到服务器端，需要发布路由才会真正生效"
                type="info">
              </el-alert>
            </template>

            <template slot="argsForm" slot-scope="scope">
              <vue-json-editor
                v-model="scope.row.args"
                :showBtns="false"
                mode="tree"
                :modes="['tree','code']"
                :lang="lang"
                :expandedOnStart="expandedOnStart"
              />
            </template>
          </avue-crud>
        </el-main>
      </el-container>
    </basic-container>
  </div>
</template>
<script>
  import vueJsonEditor from 'vue-json-editor'
  import {getRouteDataConfig, publishRouters} from '@/api/admin/gateway/dynamic_router'

  export default {
    data() {
      return {
        mode: 'view',
        modes: ['view', 'code', 'tree'],
        showBtns: false,
        lang: 'zh',
        expandedOnStart: true,
        routers: [],
        searchForm: {},
        tableLoading: false,
        tableOption: {
          border: true,
          index: true,
          searchShow: false,
          indexLabel: "序号",
          stripe: true,
          align: "left",
          maxHeight: 670,
          addBtn: true,
          editBtn: true,
          menuAlign: 'left',
          refreshBtn: true,
          viewBtn: true,
          columnBtn: false,
          span: 24,
          editTitle: '路由编辑',
          column: [
            {
              type: "input",
              label: "路由ID",
              prop: "id"
            },
            {
              type: "input",
              label: "路由名称",
              prop: "routeName"
            }, {
              type: "input",
              label: "URI",
              prop: "uri"
            }, {
              type: "dynamic",
              label: "路由规则",
              prop: "predicates",
              children: {
                align: 'left',
                headerAlign: 'center',
                rowAdd: (done) => {
                  done({
                    name: 'PredicatName',
                    args: {
                      key: 'value'
                    }
                  });
                },
                rowDel: (row, done) => {
                  this.$confirm('是否确认删除名称为"' + row.name + '"的数据项?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }).then(function () {
                    done();
                  });
                },
                column: [{
                  label: '名称',
                  prop: "name",
                }, {
                  type: 'textarea',
                  label: '参数(光标悬浮于key或value上即可编辑)',
                  prop: "args",
                  formslot: true
                }]
              }
            }, {
              type: "dynamic",
              label: "过滤器",
              prop: "filters",
              children: {
                align: 'left',
                headerAlign: 'center',
                rowAdd: (done) => {
                  done({
                    name: 'FilterName',
                    args: {
                      key: 'value'
                    }
                  });
                },
                rowDel: (row, done) => {
                  this.$confirm('是否确认删除名称为"' + row.name + '"的数据项?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }).then(function () {
                    done();
                  });
                },
                column: [{
                  label: '名称',
                  prop: "name",
                }, {
                  type: 'textarea',
                  label: '参数(光标悬浮于key或value上即可编辑)',
                  prop: "args",
                  formslot: true
                }]
              }
            },
          ]
        }
      };
    },
    components: {
      vueJsonEditor
    },
    created() {
      this.getRouteDataConfigs();
    },
    methods: {
      getRouteDataConfigs() {
        this.tableLoading = true
        getRouteDataConfig().then(response => {
          this.routers = response.data.data;
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        });
      },
      publishRouters() {
        let newRouters = new Array();
        this.routers.forEach((router) => {
          newRouters.push({
            id: router.id,
            routeName: router.routeName,
            uri: router.uri,
            predicates: router.predicates,
            filters: router.filters
          });
        });
        this.tableLoading = true
        publishRouters(newRouters).then(response => {
          this.$message.success('发布成功!');
          this.tableLoading = false;
        }).catch(() => {
          this.tableLoading = false
        });
      },
      handleSave(row, done, loading) {
        let newRouter = {
          id: row.id,
          routeName: row.routeName,
          uri: row.uri,
          predicates: new Array(),
          filters: new Array(),
        };
        row.predicates.forEach((predicat) => {
          newRouter.predicates.push({
            name: predicat.name,
            args: predicat.args,
          });
        });
        row.filters.forEach((filter) => {
          newRouter.filters.push({
            name: filter.name,
            args: filter.args,
          });
        });
        this.routers.push(newRouter);
        this.$message.success('添加成功')
        done()
      },
      rowDelete(row) {
        let slef = this;
        this.$confirm('是否确认删除名称为"' + row.routeName + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          let index = row.$index;
          let newData = new Array();
          slef.routers.forEach((router) => {
            if (router.$index != index) {
              newData.push(router);
            }
          })
          slef.routers = newData;
        }).then(() => {
          this.$message.success("删除成功");
        }).catch(function (e) {
          console.log(e)
          this.$message.error("删除失败" + e);
        });
      },
      handleUpdate(row, index, done, loading) {
        this.routers[index].id = row.id;
        this.routers[index].routeName = row.routeName;
        this.routers[index].uri = row.uri;
        this.routers[index].predicates = new Array();
        this.routers[index].filters = new Array();
        row.predicates.forEach((predicat) => {
          this.routers[index].predicates.push({
            name: predicat.name,
            args: predicat.args,
          });
        });
        row.filters.forEach((filter) => {
          this.routers[index].filters.push({
            name: filter.name,
            args: filter.args,
          });
        });
        done();
      },
    }
  }
</script>
<style>
  .jsoneditor-poweredBy {
    display: none;
  }

  .el-aside-content .ace-jsoneditor, .el-aside-content .jsoneditor-text {
    height: 678px !important;
    max-height: 678px;
  }

  .el-aside-content .jsoneditor-tree {
    max-height: 678px;
  }

  .el-aside-content.jsoneditor-menu {
    display: initial;
  }

  .el-dialog table.jsoneditor-tree td {
    border: none;
    line-height: 12px;
  }

  .el-dialog div.jsoneditor {
    border: 1px solid #dcdfe6;
  }
</style>
