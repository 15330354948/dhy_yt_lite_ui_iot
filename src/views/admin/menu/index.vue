<template>
  <basic-container>
    <div class="avue-crud">
      <el-form :inline="true">
        <el-form-item>
          <el-button v-if="permissions.sys_menu_add" icon="el-icon-plus" type="primary"
                     @click="addOrUpdateHandle(false)">
            添加
          </el-button>

          <el-button
            v-if="sys_menu_set_sort"
            type="primary"
            icon="el-icon-sort"
            @click="handleMenuSort">调整菜单顺序
          </el-button>
        </el-form-item>
      </el-form>

      <el-table
        border
        v-loading="loading"
        :data="menuList"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildrens'}">
        <el-table-column prop="name" label="菜单名称" :show-overflow-tooltip="true" width="180"></el-table-column>
        <el-table-column prop="icon" label="图标" align="center" width="100">
          <template slot-scope="scope">
            <i :class="scope.row.icon"/>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="60"></el-table-column>
        <el-table-column prop="path" label="组件路径" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="type" label="类型" width="80" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.type === '0'">菜单</el-tag>
            <el-tag type="info" v-if="scope.row.type === '1'">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="keepAlive" label="缓冲" width="80" align="center">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.keepAlive === '0'">关闭</el-tag>
            <el-tag type="success" v-if="scope.row.keepAlive === '1'">开启</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="permission" label="权限标识" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-plus"
              @click="addOrUpdateHandle(false,scope.row.id)"
              v-if="permissions.sys_menu_add">添加
            </el-button>
            <el-button type="text"
                       icon="el-icon-edit"
                       @click="addOrUpdateHandle(true,scope.row.id)"
                       v-if="permissions.sys_menu_edit">修改
            </el-button>
            <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
              v-if="permissions.sys_menu_del">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        :visible.sync="dialogMenuSortVisible"
        :close-on-click-modal="false"
        append-to-body
        title="调整菜单顺序">
        <div class="dialog-main-tree">
          <div class="topTik">
            <el-input
              placeholder="输入关键字进行过滤"
              class="menuTreeSearchInput"
              v-model="filterText">
            </el-input>
            <el-button type="primary" icon="el-icon-folder-opened" size="mini" @click="unFoldAll()">展开所有</el-button>
            <el-button type="primary" icon="el-icon-folder" size="mini" @click="collapseAll">收起所有</el-button>
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
              default-expand-all
              draggable
              :allow-drop="allowDrop"
            />
          </div>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button
            type="primary"
            
            @click="doUpdateMenuSort()">更 新
          </el-button>
          <el-button
            type="default"
            
            @click="cancal()">取消
          </el-button>
        </div>
      </el-dialog>

      <table-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getList"></table-form>
    </div>
  </basic-container>
</template>

<script>
  import {delObj, fetchMenuTree,updateMenuSort} from '@/api/admin/menu'
  import TableForm from './menu-form'
  import {mapGetters} from 'vuex'

  export default {
    name: "Menu",
    components: {TableForm},
    data() {
      return {
        addOrUpdateVisible: false,
        // 遮罩层
        loading: true,
        // 菜单表格树数据
        menuList: [],
        // 菜单树选项
        menuOptions: [],

        treeData: [],
        checkedKeys: [],
        defaultProps: {
          label: 'name',
          value: 'id'
        },
        dialogMenuSortVisible: false,
        filterText: '',
        sys_menu_set_sort: false,
      };
    },
    created() {
      this.sys_menu_set_sort = this.vaildData(this.permissions.sys_menu_set_sort, false)
      this.getList();
    },
    computed: {
      ...mapGetters(['permissions']),
    },
    methods: {
      addOrUpdateHandle(isEdit, id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(isEdit, id)
        })
      },
      getList() {
        this.loading = true;
        fetchMenuTree(false).then(response => {
          this.menuList = response.data.data
          this.loading = false;
        });
      },
      handleDelete(row) {
        this.$confirm('是否确认删除名称为"' + row.name + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delObj(row.id);
        }).then(() => {
          this.getList();
          this.$message.success('删除成功')
        })
      },

      doUpdateMenuSort() {
        function readChildren(sortedMenus, parentId, sort, node) {
          sortedMenus.push({
            id: node.id,
            parentId: parentId,
            sort: sort,
          });
          if (node.hasChildren) {
            for (let i = 0; i < node.children.length; i++) {
              readChildren(sortedMenus, node.id, i + 1, node.children[i])
            }
          }
        }

        let sortedMenus = new Array();
        let data = this.$refs.menuTree.store.data;
        for (let i = 0; i < data.length; i++) {
          readChildren(sortedMenus, -1, i + 1, data[i]);
        }
        updateMenuSort(sortedMenus).then(res => {
          if (res.data.data) {
            this.$message.success("更新成功!");
            this.cancal();
            this.onLoad();
          }
        });
      },
      cancal() {
        this.dialogMenuSortVisible = false;
      },
      handleMenuSort(row) {
        fetchMenuTree().then(response => {
          this.treeData = response.data.data
          // 解析出所有的太监节点
          this.checkedKeys = this.resolveAllEunuchNodeId(this.treeData, this.checkedKeys, [])
          this.dialogMenuSortVisible = true
        })
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
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
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
      allowDrop(draggingNode, dropNode, type) {
        //菜单调整
        if (draggingNode.data.type == 0 && dropNode.data.type == 0) {
          return true;
        } else {
          //按钮调整,只允许同级之间相互调整，不允许按钮嵌套
          let newVar = draggingNode.data.parentId === dropNode.data.parentId && type != 'inner';
          //按钮可以调整到其他菜单
          let b = draggingNode.data.parentId != dropNode.data.parentId && draggingNode.data.type == 1 && dropNode.data.type == 0;
          return newVar || b;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-dialog__wrapper {
    .el-dialog {
      width: 61% !important;

      .dialog-main-tree {
        max-height: 600px;
        overflow-y: auto;
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

  .dialog-main-tree {
    margin-top: 15px;
    border: 1px solid #DCDFE6;

    .topTik {
      position: absolute;
      top: 60px;
      left: 20px;
      z-index: 2;

      .menuTreeSearchInput {
        width: 400px !important;
        margin-right: 10px;
      }
    }
  }
</style>
