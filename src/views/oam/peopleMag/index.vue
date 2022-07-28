<template>
  <div class="hide_data" ref="hide_data">
    <div class="hide_data__tree">
      <div class="hide_data__btn flex">
        <div class="addFlex">组织机构</div>
        <div class="el-icon-plus addFlex1" @click="addFileBtn"
          v-if="isEditTpl && permissions['peopleMag_org_point_add']" title="新增公司名称"></div>
      </div>
      <div class="inputSearch">
        <el-input placeholder="输入关键字进行过滤" prefix-icon="el-icon-search" v-model="filterValue" clearable>
        </el-input>
      </div>
      <el-tree class="tree__content" :data="fileData" default-expand-all node-key="id" ref="tree" highlight-current
        :props="defaultProps" :filter-node-method="filterNode" @node-click="nodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }" @mouseenter="enter(node, data)"
          @mouseleave="leave()">
          <span :title="node.label">{{ node.label }}</span>
          <span v-show="rowId == node.id">
            <i v-if="node.level==1 && permissions['peopleMag_org_point_add']" title="新增项目名称"
              @click="addFileBtn(2, data)" class="tree-btn append el-icon-plus">
            </i>
            <i :title="node.level==1 ?'编辑公司名称':'编辑部门名称'" v-if="permissions['peopleMag_org_point_edit']"
              @click="editFileBtn(3, data, node)" class="tree-btn edit el-icon-edit-outline">
            </i>
            <i :title="node.level==1 ? '删除公司' : '删除部门'" v-if="permissions['peopleMag_org_point_del']"
              @click="deleteUnit(data)" class="tree-btn delete el-icon-delete">
            </i>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="rightInfo">
      <avue-crud ref="crud" :page.sync="page" :data="tableData" :option="tableOption" v-model="tableObj"
        @selection-change="selectionChange" @search-change="searchChange" @search-reset="searchReset"
        @size-change="sizeChange" @current-change="currentChange" @row-update="handleUpdate" @row-save="handleSave"
        @refresh-change="refreshChange" @row-del="rowDel" :table-loading="tableLoading" :permission="permissionList">
        <template slot="menuLeft">
          <el-button type="primary" @click="rowAdd" icon="el-icon-plus"
            v-if="permissions['peopleMag_person_point_add']">新增
          </el-button>
          <el-button class="filter-item" @click="handleDel" type="danger"
            v-if="permissions['peopleMag_person_point_del']" icon="el-icon-delete">批量删除
          </el-button>
        </template>
        <template slot="deptIdForm" slot-scope>
          <el-select v-model="tableObj.deptId" v-if="deptId" placeholder="选择负责人员">
            <el-option v-for="(item,index) in deptData" :key="index" :label="item.name" :value="item.id ">
            </el-option>
          </el-select>
          <treeselect v-model="tableObj.deptId" v-else :disable-branch-nodes="true" :options="fileData"
            :normalizer="normalizer" @select="treeChange" :disabled="deptDisable" placeholder="选择负责人员" zIndex="99999"
            :appendToBody="true" />

        </template>
        <template slot="userIdForm" slot-scope>
          <el-select v-model="tableObj.userId" clearable placeholder="请选择账号" @change="userChange">
            <el-option v-for="(item,index) in userList" :key="index" :label="item.username" :value="item.userId ">
            </el-option>
          </el-select>
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-view" class="none-border"
            @click.stop="handleEdit(scope.row, scope.index)" v-if="permissions['peopleMag_person_point_edit']">编辑
          </el-button>
          <el-button type="text" size="small" icon="el-icon-view" class="none-border"
            @click.stop="handleView(scope.row, scope.index)" v-if="permissions['peopleMag_person_point_info']">查看
          </el-button>

        </template>
      </avue-crud>
    </div>

    <el-dialog append-to-body :title="ftaffTitle" :visible.sync="isFtaff" width="30%" :before-close="handleClose">
      <el-form ref="ftaffForm" :model="ftaffForm" label-width="80px" :rules="rules">
        <el-form-item prop="name" label="目录名称" label-width="180">
          <el-input v-model="ftaffForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isFtaff = false">取 消</el-button>
        <el-button type="primary" @click="addFileFix">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import {
    getTree,
    getPage,
    addFires,
    editFires,
    delFires,
    getDept,
    getUser,
    addPerson,
    editPerson,
    delPerson
  } from "@/api/peopleMag/peopleMag.js";
  import store from "../../../store";
  import {
    tableOption
  } from "@/const/crud/oam/peopleMag";
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  export default {
    name: "peopleMag",
    components: {
      Treeselect
    },
    data() {
      return {
        selectedArr: [],
        tableOption: tableOption,
        tableLoading: false,
        tableObj: {
          deptId: null
        },
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条,
          pageSizes: [10, 20, 50, 100, 200],
        },
        filterValue: "",
        isFtaff: false,
        showEditFileNameButton: false,
        rowId: "",
        treeId: "",
        fileType: 0,
        fileSrc: "",
        tabLoading: false,
        checkSelected: [],
        form: {},
        ftaffTitle: "",
        ftaffType: "",
        ftaffForm: {},
        rules: {
          name: [{
            required: true,
            message: "请输入目录名称",
            trigger: "blur"
          }],
        },
        fileData: [],
        defaultProps: {
          children: "childrens",
          label: "name",
        },
        deptDisable: false,
        isEditTpl: true,
        deptId: "",
        pid: "",
        menuOptions: [],
        userList: [],
        deptData: [],
        oldUsername: null
      };
    },
    computed: {
      ...mapGetters(["permissions", "projectId"]),
      permissionList() {
        return {
          delBtn: this.vaildData(
            this.permissions.peopleMag_person_point_del,
            false
          ),
        };
      },
      header() {
        return {
          Authorization: "Bearer " + store.getters.access_token
        };
      },
    },
    watch: {
      filterValue(val) {
        this.$refs.tree.filter(val);
      },
      projectId: {
        immediate: true,
        handler(val, old) {
          if (val) {
            this.getTreeFn(val);
            this.getUserList();
            this.getList(this.page);
          }
        },
      },
    },
    mounted() {},
    created() {},
    methods: {
      getUserList() {
        getUser({
          projectId: this.projectId
        }).then(res => {
          this.userList = res.data.data
        })
      },
      /** 查询菜单下拉树结构 */
      getTreeselect() {
        getDept({
          projectId: this.projectId,
          // isBind: true
        }).then(response => {
          this.menuOptions = response.data.data;
        });
      },
      /** 转换菜单数据结构 */
      normalizer(node) {
        if (node.childrens && !node.childrens.length) {
          node.isDisabled = true;
          delete node.childrens;
        }
        return {
          id: node.id,
          label: node.name,
          children: node.childrens ? node.childrens : delete node.childrens
        };
      },
      treeChange(node, ins) {
        this.chargePersonId = node.realId;
      },
      searchChange(form, done) {
        this.page.currentPage = 1;
        this.getList(this.page, form);
        done();
      },
      getSelectionDataId() {
        let idList = new Array();
        if (this.selectedArr.length > 0) {
          this.selectedArr.forEach((d) => idList.push(d.id));
        }
        return idList;
      },
      selectionChange(list) {
        //选中的数据
        this.selectedArr = list;
      },
      searchReset(form, page) {
        this.page.currentPage = 1;
        this.page.pageSize = 20;
        this.getList(this.page);
      },
      handleDel() {
        let idList = this.getSelectionDataId();
        if (idList.length == 0) {
          this.$message.warning("请选择需要删除的数据");
          return idList;
        }
        this.$confirm("是否确认删除当前选中的数据？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(function () {
            return delPerson({
              idList: idList.join()
            });
          })
          .then((data) => {
            this.$message.success("删除成功");
            this.refreshChange();
          });
      },
      rowDel(form, index, done) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            delPerson({
              idList: form.id
            }).then(res => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              done(form);
            })
          })
          .catch(() => {});
      },
      handleSave(row, done, loading) {
        loading();
        addPerson(Object.assign(row, {
          projectId: this.projectId
        })).then(res => {
          if (res.data.code == 0) {
            this.$message.success("新增成功");
            this.deptId = '';
            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey(this.fileData[0].id) // 默认选中节点第一个
            })
            done();
            this.getList();
          }

        })

      },
      refreshChange() {
        this.getList(this.page, this.form);
      },
      handleUpdate(row, index, done, loading) {
        row.userId = this.oldUsername;
        editPerson(row).then(res => {
          this.$message.success("修改成功");
          this.getList();
          this.getUserList();
        })
        done();
      },

      getList(page, params) {
        this.tableLoading = true;
        getPage(
          Object.assign({
              current: this.page.currentPage,
              size: this.page.pageSize,
              projectId: this.projectId,
              deptId: this.deptId,
              // parentId: this.pid
            },
            params
          )
        ).then((response) => {
          this.tableData = response.data.data.records;
          this.page.total = response.data.data.total;
          this.tableLoading = false;
        });
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
        this.getList(this.page);
      },
      currentChange(current) {
        this.page.currentPage = current;
        this.getList(this.page);
      },
      filterNode(value, data, node) {
        if (!value) {
          node.expanded = false;
          return true;
        }
        return this.checkBelongToChooseNode(value, data, node);
      },
      checkBelongToChooseNode(value, data, node) {
        if (data.name.indexOf(value) !== -1) {
          return true;
        }
        const level = node.level;
        if (level === 1) {
          return false;
        }
        let parentData = node.parent;
        let index = 0;
        while (index < level - 1) {
          if (parentData.data.name.indexOf(value) != -1) {
            return true;
          }
          parentData = parentData.parent;
          index++;
        }
        return false;
      },
      enter(node, data) {
        this.showEditFileNameButton = true;
        this.rowId = node.id;
      },
      leave() {
        this.showEditFileNameButton = false;
        this.rowId = "";
      },
      rowAdd(row) {
        this.deptDisable = false;
        this.tableObj.deptId = null;
        this.$refs.crud.rowAdd(row);
      },
      handleEdit(row) {
        this.oldUsername = row.userId;
        row.userId = row.username;
        this.deptDisable = false;
        this.$refs.crud.rowEdit(row);
      },
      handleView(row) {
        this.deptDisable = true;
        this.$refs.crud.rowView(row);
      },
      userChange(e) {
        this.oldUsername = e;
      },
      getTreeFn(id) {
        getTree({
          projectId: this.projectId
        }).then((res) => {
          this.fileData = res.data.data;
        });
      },
      handleClose(done) {
        done();
      },
      addFileBtn(type, data) {
        this.isFtaff = true;
        this.ftaffType = type;
        this.ftaffTitle = type == 3 ? "修改" : "新增";
        if (data && type == 2) {
          this.ftaffForm = {
            parentId: data.id,
            name: "",
            id: "",
            type: "d",
            projectId: this.projectId,
          };
        } else {
          this.ftaffForm = {
            parentId: 0,
            name: "",
            id: "",
            type: "c",
            projectId: this.projectId,
          };
        }
      },
      editFileBtn(type, data, node) {
        this.ftaffType = type;
        this.ftaffTitle = "修改"
        this.isFtaff = true;
        if (node.level == 1) {
          this.ftaffForm = {
            parentId: data.pid,
            name: data.name,
            id: data.id,
            type: "c",
            projectId: this.projectId,
          };
        } else {
          this.ftaffForm = {
            parentId: node.parent.data.id,
            name: data.name,
            id: data.id,
            type: "d",
            projectId: this.projectId,
          };
        }
      },
      deleteUnit(row) {
        this.$confirm("确认要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          delFires({
            id: row.id
          }).then((res) => {
            this.getTreeFn();
            this.getTreeFn();
            this.fileType = null;
            this.fileSrc = "";
            this.$message({
              message: "删除成功",
              type: "success",
            });
          });
        });
      },
      addFileFix() {
        this.$refs["ftaffForm"].validate((valid) => {
          if (valid) {
            if (this.ftaffType == "3") {
              editFires(this.ftaffForm).then((res) => {
                if (res.data.code === 0) {
                  this.getTreeFn();
                  this.$message({
                    message: "修改目录成功",
                    type: "success",
                  });
                }
              });
            } else {
              addFires(this.ftaffForm).then((res) => {
                if (res.data.code === 0) {
                  this.getTreeFn();
                  this.$message({
                    message: "新增目录成功",
                    type: "success",
                  });
                }
              });
            }
          } else {
            return false;
          }
        });
        this.isFtaff = false;
      },
      // save(parent, data, done, loading) {
      //   this.$message.success("新增回调");
      //   this.form.id = new Date().getTime();
      //   this.form.value = new Date().getTime();
      //   this.form.children = [];
      //   done();
      // },
      // 点击树
      nodeClick(data, node) {
        if (data.pid != 0) {
          this.deptData = node.parent.data.childrens;
        } else {
          this.deptData = data.childrens;
        }
        this.deptId = data.id;x
        this.pid = data.pid;
        this.$refs.crud.toggleSelection();
        this.getList();
      },
    },
  };

</script>

<style lang="scss" scoped>
  .inputSearch {
    padding: 10px 0 20px;
  }

  .flex {
    display: flex;
  }

  .hide_data {
    display: flex;
    height: 100%;
    padding: 10px;
    margin: 10px;

    .hide_data__btn {
      justify-content: space-between;

      .addFlex {
        //   font-weight: bold;
        color: gray;
        font-size: 16px;
      }

      .addFlex1 {
        cursor: pointer;
        color: #409eff;
        font-size: 18px;
      }
    }

    &__btn {
      margin-bottom: 5px;
    }

    &__tree {
      width: 22%;
      max-height: 60vh;
      padding-top: 3px;
    }
  }

  .rightInfo {
    width: calc(100vw - 300px - 25%);
    margin-left: 30px;
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

  .upload-demo {
    margin-right: 10px !important;
  }

  .tab-loading {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tree__content {
    height: 56vh;
    overflow: auto;
  }

</style>

<style lang="scss" scoped>
  .custom-tree-node span:first-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 9vw;
    display: block;
  }

  .avue-tree .el-tree {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 55vh;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;

    .tree-btn {
      margin: 0px 5px;
    }

    .tree-btn.view {
      color: #409eff;
    }

    .tree-btn.insert {
      color: #409eff;
    }

    .tree-btn.append {
      color: #e6a23c;
    }

    .tree-btn.edit {
      color: #67c23a;
    }

    .tree-btn.delete {
      color: #f56c6c;
    }
  }

  :deep .el-select {
    width: 100%;
  }

</style>
