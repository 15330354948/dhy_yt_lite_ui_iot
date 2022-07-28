<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <avue-crud
        ref="crud"
        :option="tableOption"
        :data="list"
        :page="page"
        v-model="form"
        :table-loading="listLoading"
        :before-open="handleOpenBefore"
        @on-load="getList"
        @search-change="handleFilter"
        @refresh-change="handleRefreshChange"
        @row-update="update"
        @row-save="create"
      >
        <template slot="menuLeft">
          <!--  v-if="roleManager_btn_add" -->
          <el-button
           v-if="permissions.sys_role_add"
            class="filter-item"
            type="primary"
            icon="el-icon-edit"
            @click="handleCreate"
            >添加
          </el-button>
        </template>

        <template slot="menu" slot-scope="scope">
          <!-- v-if="roleManager_btn_edit && scope.row.isCanEdit" -->
          <el-button
            v-if="permissions.sys_role_edit"
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row, scope.index)"
            >编辑
          </el-button>
          <!--  v-if="roleManager_btn_del && scope.row.isCanDelete" -->
          <el-button
           v-if="permissions.sys_role_del"
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(scope.row, scope.index)"
            >删除
          </el-button>
          <!-- v-if="roleManager_btn_perm" -->
          <el-button
            v-if="permissions.sys_role_perm"
            type="text"
            size="mini"
            icon="el-icon-plus"
            @click="handlePermission(scope.row, scope.index)"
            >权限
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog
      width="960"
      append-to-body
      :visible.sync="dialogPermissionVisible"
      :close-on-click-modal="false"
      title="分配权限"
    >
      <div class="dialog-main-tree">
        <div class="topTik">
          <el-input
            placeholder="输入关键字进行过滤"
            class="menuTreeSearchInput"
            v-model="filterText"
          >
          </el-input>
          <el-button
            type="primary"
            icon="el-icon-folder-opened"
            size="mini"
            @click="unFoldAll()"
            >展开所有</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-folder"
            size="mini"
            @click="collapseAll"
            >收起所有</el-button
          >
        </div>
        <div class="menuTree">
          <el-tree
            ref="menuTree"
            :data="treeData"
            :default-checked-keys="checkedKeys"
            :check-strictly="false"
            :accordion="true"
            :props="defaultProps"
            :filter-node-method="filterNode"
            class="filter-tree"
            node-key="id"
            highlight-current
            show-checkbox
            default-expand-all
          />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          icon="el-icon-check"
          @click="updatePermession(roleId)"
        >
          <i class=""></i>
          更 新
        </el-button>
        <el-button type="warning" icon="el-icon-close" @click="cancal()">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addObj, delObj, fetchList, fetchRoleTree, permissionUpd, putObj } from '@/api/admin/role'
import { tableOption } from '@/const/crud/admin/role'
import {projectType} from '@/api/hideDanger/obj'
import { fetchTree } from '@/api/admin/dept'
import { fetchMenuTree } from '@/api/admin/menu'
import { mapGetters } from 'vuex'

export default {
  name: 'TableRole',
  data() {
    return {
      projectList:[],
      searchForm: {},
      tableOption: tableOption,
      treeData: [],
      checkedKeys: [],
      checkedDsScope: [],
      defaultProps: {
        label: 'name',
        value: 'id'
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      menuIds: '',
      list: [],
      listLoading: true,
      form: {},
      roleId: undefined,
      roleCode: undefined,
      rolesOptions: undefined,
      dialogPermissionVisible: false,
      // roleManager_btn_add: false,
      // roleManager_btn_edit: false,
      // roleManager_btn_del: false,
      // roleManager_btn_perm: false,
      filterText: '',
    }
  },
  created() {
    // this.roleManager_btn_add = this.permissions['sys_role_add']
    // this.roleManager_btn_edit = this.permissions['sys_role_edit']
    // this.roleManager_btn_del = this.permissions['sys_role_del']
    // this.roleManager_btn_perm = this.permissions['sys_role_perm']
  },
  computed: {
    ...mapGetters(['elements', 'permissions','userInfo','projectId'])
  },
  watch: {
    projectId: {
      handler(val, oVal) {
          if (val != 0 && val) {
            this.getList(this.page);
              this.$refs.crud.searchReset();
          }
        },
        immediate: true,
        deep:true,
      },
    filterText(val) {
      this.$refs.menuTree.filter(val);
    },
    userInfo:{
      handler(val,oval){
        projectType().then(v=>{
        this.projectList=v.data.data
      })
        if(val.isAdmin!==1&&val.isAdmin){
          this.tableOption.map(v=>{
            if(v.prop=='projectId'){
              v.addDisplay=false
              v.editDisplay=false
            }else{
              v.addDisplay=true
              v.editDisplay=true
            }
          })
        }
      },
      deep:true,
      immediate:true,
    },
  },
  methods: {
    getList(page, params) {
      this.listLoading = true
      fetchList(Object.assign({
        current: page.currentPage,
        size: page.pageSize
      }, params, this.searchForm)).then(response => {
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleRefreshChange() {
      this.getList(this.page)
    },
    handleFilter(form, done) {
      this.searchForm = form
      this.getList(this.page, form)
      done();
    },
    handleCreate() {
      this.$refs.crud.rowAdd()
    },
    handleOpenBefore(show) {
      show()
    },
    handleUpdate(row, index) {
      this.$refs.crud.rowEdit(row, index)
    },
    cancal() {
      this.dialogPermissionVisible = false;
    },
    handlePermission(row) {
      fetchRoleTree(row.roleId)
        .then(response => {
          this.checkedKeys = response.data.data
          return fetchMenuTree()
        })
        .then(response => {
          this.treeData = response.data.data
          // 解析出所有的太监节点
          this.checkedKeys = this.resolveAllEunuchNodeId(this.treeData, this.checkedKeys, [])
          this.dialogPermissionVisible = true
          this.roleId = row.roleId
          this.roleCode = row.roleCode
        })
    },
    /**
     * 解析出所有的太监节点id
     * @param json 待解析的json串
     * @param idArr 原始节点数组
     * @param temp 临时存放节点id的数组
     * @return 太监节点id数组
     */
    resolveAllEunuchNodeId(json, idArr, temp) {
      for (let i = 0; i < json.length; i++) {
        const item = json[i]
        // 存在子节点，递归遍历;不存在子节点，将json的id添加到临时数组中
        if (item.children && item.children.length !== 0) {
          this.resolveAllEunuchNodeId(item.children, idArr, temp)
        } else {
          temp.push(idArr.filter(id => id === item.id))
        }
      }
      return temp
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getNodeData(data, done) {
      done()
    },
    handleDelete(row, index) {
      var _this = this
      this.$confirm('是否确认删除名称为"' + row.roleName + '"' + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delObj(row.roleId)
      }).then(() => {
        this.getList(this.page)
        this.$notify.success('删除成功')
      })
    },
    create(row, done, loading) {
     this.projectList.map(v=>{
        if(this.projectId==v.id){
          return this.form.projectName=v.projectName
        }
      })||''
        this.form.projectId=this.projectId
        addObj(this.form).then(() => {
        this.getList(this.page)
        done()
        this.$notify.success('创建成功')
      }).catch(() => {
        loading()
      })
    },
    update(row, index, done, loading) {
      putObj(this.form).then(() => {
        this.getList(this.page)
        done()
        this.$notify.success('修改成功')
      }).catch(() => {
        loading()
      })
    },
    updatePermession(roleId) {
      let dialog = this.$loading({
        target: ".el-dialog__body",
        fullscreen: false,
        text: "更新中，请稍后...",
      });
      this.menuIds = ''
      this.menuIds = this.$refs.menuTree.getCheckedKeys().join(',').concat(',').concat(this.$refs.menuTree.getHalfCheckedKeys().join(','))
      permissionUpd(roleId, this.menuIds).then(() => {
        this.dialogPermissionVisible = false;
        // this.$store.dispatch('GetMenu', { type: false });
        this.$store.dispatch('GetMenu', 1000);
        this.$store.dispatch('GetTopMenu');
        this.$notify.success('修改成功');
        dialog.close();
        //  this.$message({
        //   message: '分配权限后，请重新登录',
        //   type: 'error',
        //   duration:1500,
        // });
        // setTimeout(() => {
        //     this.$store.dispatch('LogOut').then(() => {
        //             // location.reload() // 为了重新实例化vue-router对象 避免bug
        //             this.$router.push({
        //               path: "/login"
        //             });
        //              window.sessionStorage.clear();
        //           })
        //           dialog.close();
        // }, 1000);
         
      }).catch(() => {
        dialog.close();
      });
    },
    unFoldAll() {
      // 将没有转换成树的原数据
      let list = this.treeData;
      for (let i = 0; i < list.length; i++) {
        // 将没有转换成树的原数据设置key为... 的展开
        this.$refs.menuTree.store.nodesMap[list[i].id].expanded = true
      }
    },
    collapseAll() {
      // 将没有转换成树的原数据
      let list = this.treeData;
      for (let i = 0; i < list.length; i++) {
        this.$refs.menuTree.store.nodesMap[list[i].id].expanded = false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__wrapper {
  .el-dialog {
    width: 960px !important;
    .dialog-main-tree {
      max-height: 400px;
      overflow-y: auto;
      margin-top: 15px;
      border: 1px solid #dcdfe6;

      .topTik {
        width: 100%;
        position: absolute;
        top: 60px;
        left: 20px;
        z-index: 2;

        .menuTreeSearchInput {
          //width: 706px !important;
          width: 50% !important;
          margin-right: 10px;
        }
      }
    }
  }
  .el-form-item__label {
    width: 20% !important;
    padding-right: 20px;
  }
  .el-form-item__content {
    margin-left: 20% !important;
  }
}
</style>
