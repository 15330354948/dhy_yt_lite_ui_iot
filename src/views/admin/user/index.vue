<template>
  <div class="user">
    <basic-container>
      <avue-crud
        :option="option"
        ref="crud"
        v-model="form"
        :page="page"
        @on-load="getList"
        @size-change="sizeChange"
        @current-change="currentChange"
        :table-loading="listLoading"
        @search-change="handleFilter"
        @refresh-change="handleRefreshChange"
        @row-update="update"
        @row-save="create"
        :before-open="beforeOpen"
        :data="list"
      >
        <template slot="menuLeft">
          <el-button
            v-if="permissions.sys_user_add"
            class="filter-item"
            @click="handleCreate"
            size="small"
            type="primary"
            icon="el-icon-edit"
            >添加
          </el-button>
        </template>
        <template slot="username" slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
        <template slot="projectIdssForm">
          <div class="edit_dev">
            <el-transfer
              filterable
              :titles="['待选列表', '已选列表']"
              filter-placeholder="请输入关键词"
              @left-check-change="leftChange"
              v-model="value1"
              :props="{
                label: 'projectName',
                key: 'id',
              }"
              :key="tskRandom"
              :data="data1"
              @change="handleChange"
            >
            </el-transfer>
          </div>
        </template>
        <template slot="roleId" slot-scope="scope">
          <span v-for="(role, index) in scope.row.roleList" :key="index">
            <el-tag>{{ role.roleName }} </el-tag>&nbsp;&nbsp;
          </span>
        </template>
        <template slot="projectIds" slot-scope="scope">
          <span v-for="(role, index) in scope.row.projectNameList" :key="index">
            <el-tag>{{ role.projectName }} </el-tag>&nbsp;&nbsp;
          </span>
        </template>
        <template slot="lockFlag" slot-scope="scope">
          <el-tag>{{ scope.label }}</el-tag>
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button
            v-if="permissions.sys_user_edit"
            size="small"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row, scope.index)"
            >编辑
          </el-button>
          <el-button
            v-if="permissions.sys_user_del"
            size="small"
            type="text"
            icon="el-icon-delete"
            @click="deletes(scope.row, scope.index)"
            >删除
          </el-button>
          <el-button
            v-if="permissions.sys_user_reset_password"
            size="small"
            type="text"
            icon="icon-zhongzhimima"
            @click="resetPassword(scope.row, scope.index)"
            >重置密码
          </el-button>
        </template>
        <template slot="roleForm">
          <avue-select
            v-model="role"
            multiple
            placeholder="请选择角色"
            :dic="rolesOptions"
            :props="roleProps"
            @change="setFixedRoles()"
          ></avue-select>
        </template>
        <template slot="fixedRoleForm">
          <avue-select
            v-model="fixedRole"
            multiple
            disabled
            placeholder="请选择角色"
            :dic="rolesOptions"
            :props="roleProps"
          ></avue-select>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {
  addObj,
  delObj,
  fetchList,
  putObj,
  resetPassword,
  roleType,
} from "@/api/admin/user";
import { deptRoleList } from "@/api/admin/role";
import { projectType } from "@/api/hideDanger/obj";
import { tableOption } from "@/const/crud/admin/user";
import { mapGetters } from "vuex";
import { lazyFetchTree, getObj as getDeptById } from "@/api/admin/dept";
import { deepClone } from "@/util/util";

export default {
  name: "table_user",
  data() {
    return {
      userIds: {},
      proIds: [],
      keyeidt: "",
      addShow: "",
      data1: [],
      value1: [],
      pName: [],
      pRole: [],
      searchForm: {},
      option: tableOption,
      checkedKeys: [],
      roleProps: {
        label: "roleName",
        value: "roleId",
      },
      tskRandom: 0,
      cascaderCurrentLabels: "请选择",
      cascaderCurrentValue: [],
      deptCascaderProps: {
        label: "name",
        value: "id",
        multiple: false,
        checkStrictly: true,
        filterable: true,
        emitPath: false,
        lazy: true,
        lazyLoad(node, resolve) {
          let parentId = 0;
          if (node.data && node.data.id) {
            parentId = node.data.id;
          }
          lazyFetchTree(parentId, true).then((response) => {
            let nodes = new Array();
            let datas = response.data.data;
            datas.forEach((el) => {
              el.leaf = !el.hasChildren;
              nodes.push(el);
            });
            resolve(nodes);
          });
        },
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false, //是否倒序
      },
      list: [],
      listLoading: true,
      role: [],
      fixedRole: [],
      form: {},
      rolesOptions: [],
      colorChange: false,
      typeAdd: false,
    };
  },
  computed: {
    ...mapGetters(["permissions", "userInfo","projectId"]),
  },
  watch: {
    userInfo: {
      handler(val) {
        if (val.type == 0) {
          let column = this.option.column;
          column.forEach((e) => {
            if (e.prop == "type") {
              e.editDisplay = true;
              e.addDisplay = true;
            }
            if (e.prop == "isAll") {
              e.label = "平台查看设置";
            }
          });
        } else {
          let column = this.option.column;
          column.forEach((e) => {
            if (e.prop == "type") {
              e.editDisplay = false;
              e.addDisplay = false;
            }
            if (e.prop == "isAll") {
              e.dicData = [
                {
                  label: "自定义选择(只能选择一个子平台)",
                  value: 1,
                },
              ];
              e.label = "项目查看设置";
              this.$refs.crud.init();
              e.disabled = true;
              this.form.isAll = 1;
            }
          });
        }
      },
      deep: true,
      immediate: true,
    },
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
    "form.type": {
      handler(val) {
        if (this.addShow == "add") {
          this.value1 = [];
          if (val == 1 && val) {
            this.form.isAll = 1;
            this.option.column.forEach((e) => {
              if (e.prop == "roleId") {
                e.dicUrl = `/admin/role/list?type=` + 1;
              }
            });
          } else {
            this.form.roleId = "";
            this.option.column.forEach((e) => {
              if (e.prop == "roleId") {
                e.dicUrl = `/admin/role/list?type=` + 0;
                this.$refs.crud.updateDic();
              }
            });
          }
        } else {
          if (val == 1) {
            this.form.isAll = 1;
            this.value1 = this.proIds;
            this.option.column.forEach((e) => {
              if (e.prop == "roleId") {
                e.dicUrl = `/admin/role/list?type=` + 1;
                this.$refs.crud.updateDic();
              }
            });
          } else {
            this.option.column.forEach((e) => {
              if (e.prop == "roleId") {
                e.dicUrl = `/admin/role/list?type=` + 0;
                this.$refs.crud.updateDic();
              }
            });
          }
          if (this.keyeidt != this.form.type) {
            // this.form.roleId = "";//角色
            this.form.isAll = 1;
            this.value1 = [];
          } else {
            this.value1 = this.proIds;
          }
        }
        this.$refs.crud.updateDic();
        this.tskRandom = Math.random();
        if (val === 1 && this.value1 && this.value1.length) {
          this.data1.forEach((v) => {
            if (this.value1[0] !== v.id) {
              v.disabled = true;
            }
          });
        } else if (val === 0) {
          this.gitFF();
        }
      },
      deep: true,
      immediate: true,
    },
    role() {},
    cascaderCurrentValue(val) {},
  },
  created() {
    this.gitFF();
  },
  methods: {
    gitFF() {
      projectType().then((v) => {
        this.data1 = v.data.data;
      });
    },
    beforeOpen(done, type) {
      this.addShow = type;
      if (type == "edit") {
        this.keyeidt = deepClone(this.form.type);
      }
      done();
    },
    handleChange(value) {
      if (!value.length && this.form.type == 1) {
        this.gitFF();
      }
      if (value.length && this.form.type == 1) {
        this.data1.forEach((v) => {
          if (this.value1[0] !== v.id) {
            v.disabled = true;
          }
        });
      }
      this.form.projectIds = value;
    },
    leftChange(key, keys) {
      if (this.form.type == 1 && key.length) {
        this.data1.forEach((v) => {
          if (key[0] !== v.id) {
            v.disabled = true;
          }
        });
      } else if (this.form.type == 1 && !key.length) {
        this.gitFF();
      }
    },
    getList(page, params) {
      this.listLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
          },
          params,
          this.searchForm
        )
      ).then((response) => {
        this.list = response.data.data.records;
        this.page.total = response.data.data.total;
        this.listLoading = false;
      });
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    handleFilter(form, done) {
      this.searchForm = form;
      this.page.currentPage = 1;
      this.getList(this.page, form);
      done();
    },
    handleRefreshChange() {
      this.getList(this.page);
    },
    handleCreate() {
      this.form = {};
      this.gitFF();
      this.form.isAll=1;
      this.$refs.crud.rowAdd();
    },
    handleOpenBefore(show, type) {
      window.boxType = type;
      if (["edit", "views"].includes(type)) {
        this.colorChange = true;
        this.role = [];
        this.fixedRole = [];
        for (var i = 0, j = 0, k = 0; i < this.form.roleList.length; i++) {
          this.role[j++] = this.form.roleList[i].roleId;
          if (!this.form.roleList[i].isCanCancel) {
            this.fixedRole[k++] = this.form.roleList[i].roleId;
          }
        }

        let deptIdColumn = this.findObject(this.option.column, "deptId");
        let deptNameNoCanSelectColumn = this.findObject(
          this.option.column,
          "deptNameNoCanSelect"
        );
        if (this.form.deptCanSelect == null) {
          deptIdColumn.editDisplay = true;
          deptNameNoCanSelectColumn.editDisplay = false;
        } else {
          if (this.form.deptCanSelect) {
            deptIdColumn.editDisplay = true;
            deptNameNoCanSelectColumn.editDisplay = false;
          } else {
            deptIdColumn.editDisplay = false;
            deptNameNoCanSelectColumn.editDisplay = true;
          }
        }

        this.cascaderCurrentLabels = "";
        this.cascaderCurrentValue = [];
        getDeptById(this.form.deptId, true).then((res) => {
          let parentIds = res.data.data.parentIds;
          if (parentIds == undefined) {
            let getCascaderObj = (parentId, labels, values) => {
              getDeptById(parentId).then((response) => {
                let dept = response.data.data;
                let parentId = dept.parentId;
                labels.push(dept.name);
                values.push(dept.deptId);
                if (parentId != 0) {
                  getCascaderObj(parentId, labels, values);
                } else {
                  this.cascaderCurrentLabels = labels.reverse().join(" / ");
                  this.cascaderCurrentValue = values.reverse();
                }
              });
            };
            getCascaderObj(this.form.deptId, [], []);
          } else {
            this.cascaderCurrentLabels = this.form.deptName;
            this.cascaderCurrentValue = parentIds;
          }
        });
      } else if (type === "add") {
        this.colorChange = false;
        this.cascaderCurrentLabels = "";
        this.role = [];
        this.fixedRole = [];
      }
      this.setRoleOptions();
      show();
    },
    setDeptId(value) {
      this.form.deptId = value;
    },
    setRoleOptions() {
      deptRoleList().then((response) => {
        let rolesOptions = new Array();
        for (let i = 0; i < response.data.data.length; i++) {
          if (
            response.data.data[i].canSelect ||
            this.fixedRole.indexOf(response.data.data[i].roleId) != -1
          ) {
            rolesOptions.push(response.data.data[i]);
          }
        }
        this.rolesOptions = rolesOptions;
      });
    },

    handleUpdate(row, index) {
      let rolee = [];
      let projectNamee = [];
      row.roleList.map((v) => {
        rolee.push(v.roleId);
      });
      row.projectNameList.map((v) => {
        projectNamee.push(v.id);
      });
      this.value1 = projectNamee;
      row.roleId = rolee.join(",");
      row.projectIds = projectNamee;
      this.proIds = deepClone(projectNamee);
      this.userIds = deepClone(row);
      // row.type=row.type*1
      this.$refs.crud.rowEdit(row, index);
      this.form.roleId = rolee.join(",");
      if (this.form.type === 1 && projectNamee.length) {
        this.data1.forEach((v) => {
          if (projectNamee[0] !== v.id) {
            v.disabled = true;
          }
        });
      }
    },

    create(row, done, loading) {
      if (this.typeAdd) {
        return false;
      }
      this.form.type === 0 ? (this.form.type = 0) : (this.form.type = 1);
      this.typeAdd = true;
      delete this.form.projectIdss;
      if (this.form.isAll != 1) {
        let arr = [];
        this.data1.map((v) => {
          arr.push(v.id);
        });
        this.form.projectIds = arr;
      }
      addObj(this.form)
        .then((v) => {
          if (v.data.code == 0) {
            this.getList(this.page);
            done();
            this.typeAdd = false;
            this.$notify.success("创建成功");
          } else {
            this.$notify.error("创建失败");
          }
        })
        .catch(() => {
          loading();
          this.typeAdd = false;
        });
    },
    update(row, index, done, loading) {
      if (this.form.isAll != 1) {
        let arr = [];
        this.data1.map((v) => {
          arr.push(v.id);
        });
        this.form.projectIds = arr;
      }
      if (this.form.type == 1) {
        this.form.projectNameList = [];
        this.form.type = 1;
      } else {
        this.form.type = 0;
        this.form.projectNameList = [];
      }
      delete this.form.projectIdss;
      if (this.form.projectIds.length != 0) {
        putObj(this.form)
          .then(() => {
            this.getList(this.page);
            done();
            this.$notify.success("修改成功");
          })
          .catch(() => {
            loading();
          });
      } else {
        this.$notify.warning("请选择一个项目");
      }
    },
    deletes(row, index) {
      this.$confirm(
        "此操作将删除该用户(用户名:" + row.username + "), 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        delObj(row.userId)
          .then(() => {
            this.getList(this.page);
            this.$notify.success("删除成功");
          })
          .catch(() => {
            this.$notify.error("删除失败");
          });
      });
    },
    resetPassword(row, index) {
      this.$confirm("确认重置" + row.username + "的密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        resetPassword(row.userId)
          .then((res) => {
            this.getList(this.page);
            this.$notify.success("重置成功,新密码为：" + res.data.data);
          })
          .catch(() => {
            this.$notify.error("重置失败");
          });
      });
    },
    setFixedRoles() {
      if (this.fixedRole && this.fixedRole.length > 0) {
        for (let i = 0; i < this.fixedRole.length; i++) {
          if (this.role.indexOf(this.fixedRole[i]) != -1) {
            continue;
          }
          this.role.push(this.fixedRole[i]);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  height: 100%;

  &__tree {
    padding-top: 3px;
    padding-right: 20px;
  }

  &__main {
    .el-card__body {
      padding-top: 0;
    }
  }
}
.el-cascader.color_dark {
  ::v-deep .el-input__inner::-webkit-input-placeholder {
    color: #606266;
  }
  ::v-deep .el-input__inner::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #606266;
  }
  ::v-deep .el-input__inner:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #606266;
  }
  ::v-deep .el-input__inner:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #606266;
  }
}
</style>

<style scoped>
.edit_dev >>> .el-transfer-panel {
  width: 35%;
}
</style>
