
<template>
  <div class="user">
    <basic-container>
      <avue-crud
        :option="option"
        ref="crud"
        :page="page"
        @on-load="getList"
        @size-change="sizeChange"
        @current-change="currentChange"
        @search-change="handleFilter"
        @search-reset="handlereset"
        @refresh-change="handleRefreshChange"
        @row-save="handleSave"
        @row-update="handleUpdate"
        :table-loading="listLoading"
        :data="list"
        @selection-change="selectionChange"
      >
        <template slot="headUrlForm">
          <el-upload
            :disabled="rowView"
            v-model="form.headUrl"
            accept=".jpg,.jpeg,.png"
            class="avatar-uploader"
            :action="baseUrlLoad"
            list-type="picture-list"
            :headers="headers"
            :limit="1"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            v-loading="loading"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传JPG、PNG、JPEG文件
            </div>
          </el-upload>
        </template>

        <template slot="menuLeft">
          <el-button
            class="filter-item"
            @click="handleCreate"
            type="primary"
            icon="el-icon-plus"
            >新增
          </el-button>
          <!-- <el-button
                        class="filter-item"
                        @click="handleExcel"
                        type="primary"
                        icon="el-icon-download"
                        >导出
                    </el-button>
                    <el-button
                        class="filter-item"
                        @click="handleImport"
                        type="primary"
                        icon="el-icon-upload"
                        >导入</el-button
                    > -->
          <el-button
            class="filter-item"
            @click="handleDel"
            type="danger"
            icon="el-icon-delete"
            v-if="permissions.generator_qcqfperson_del"
            >批量删除</el-button
          >
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button
            size="small"
            type="text"
            icon="el-icon-edit"
            v-if="permissions.generator_qcqfperson_edit"
            @click.stop="handleEdit(scope.row, scope.index)"
            >编辑
          </el-button>
          <el-button
            @click="handleView(scope.row, scope.index)"
            icon="el-icon-view"
            class="none-border"
            size="small"
            type="text"
            >查看</el-button
          >
          <el-button
            @click="handleAddUser(scope.row, scope.index)"
            class="none-border"
            size="small"
            type="text"
            v-if="permissions.generator_qcqfperson_add_user"
            >添加用户</el-button
          >
        </template>
        <template slot="disasterIdsForm">
          <avue-crud
            ref="cruds"
            :data="data"
            :option="tableOptionInfo"
            @row-save="DisasterSave"
          >
            <template slot="menuLeft">
              <el-button
                class="filter-item"
                @click="addHandle"
                type="primary"
                icon="el-icon-plus"
                v-if="permissions.generator_qcqfperson_add"
                :disabled="disDisabled"
                >新增
              </el-button>
            </template>
            <template slot="menu" slot-scope="scope">
              <el-button
                size="small"
                type="text"
                icon="el-icon-delete"
                @click.stop="delHandle(scope.row, scope.index)"
                :disabled="disDisabled"
                >删除
              </el-button>
            </template>
          </avue-crud>
        </template>
      </avue-crud>
      <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        @closed="handleClose"
        append-to-body
        width="40%"
      >
        <avue-form
          ref="userForm"
          v-model="userForm"
          :option="userOption"
          @submit="addUserSave"
          @reset-change="resetChange"
        >
          <template slot="deptId">
            <div>
              <el-cascader
                ref="deptCascader"
                placeholder="请选择职务"
                v-model="cascaderCurrentValue"
                :props="deptCascaderProps"
                @change="setDeptId"
              ></el-cascader>
            </div>
          </template>
        </avue-form>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
import {
  fetchList,
  addObj,
  putObj,
  delObj,
  getFile,
  fetchIdList,
  addUser,
  getUser,
} from "@/api/prevention/preventMag";
import {
  tableOption,
  tableOptionInfo,
  userOption,
} from "@/const/crud/prevention/preventMag";
import { getPageList } from "@/api/hideDanger/obj";
import { lazyFetchTree } from "@/api/admin/dept";
import { mapGetters } from "vuex";
import { Loading } from "element-ui";
import store from "@/store";
import { baseUrl } from "@/config/env";
export default {
  name: "table_user",
  data() {
    return {
      baseUrlLoad: "",
      searchForm: {},
      option: tableOption,
      checkedKeys: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false, //是否倒序
      },
      tableOptionInfo: tableOptionInfo,
      userOption: userOption,
      list: [],
      streetDic: [],
      listLoading: true,
      loading: false,
      form: {
        headUrl: "",
        disasterIds: [],
        dellDisasterIds: [],
      },
      data: [],
      userForm: {},
      selectView: false,
      SelectOption: [],
      selectpPage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10,
      },
      imageUrl: null,
      colorChange: false,
      selectionData: [],
      infoData: [],
      rowView: false,
      disDisabled: false,
      dialogVisible: false,
      gridPersonnelId: "",
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
    };
  },
  computed: {
    ...mapGetters(["permissions","access_token", "projectId"]),
    headers: function () {
      return { Authorization: "Bearer " + store.getters.access_token };
    },
  },

  watch: {},
  created() {
    this.baseUrlLoad = baseUrl + "/file/upload/";
  },
  methods: {
    getList(page, params) {
      this.listLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
            "orders[0].column": "create_time",
            "orders[0].asc": false,
          },
          {
            type: 1,
          },
          params,
          this.searchForm
        )
      ).then((response) => {
        response.data.data.records.forEach((item) => {
          item.streetCode *= 1;
          item.communityCode *= 1;
        });

        this.list = response.data.data.records;
        this.page.total = response.data.data.total;
        this.listLoading = false;
      });
    },
    getSelectList() {
      getPageList({
        current: this.selectpPage.currentPage,
        size: this.selectpPage.pageSize,
        projectId: this.projectId
      }).then((res) => {
        this.SelectOption = res.data.data.records;
        this.selectpPage.total = res.data.data.total;
      });
    },
    handleCurrentChange(page) {
      this.selectpPage.currentPage = page;
      this.getSelectList();
    },
    selectionChange(selection) {
      this.selectionData = selection;
    },
    getSelectionDataId() {
      let idList = new Array();
      if (this.selectionData.length > 0) {
        this.selectionData.forEach((d) => idList.push(d.id));
      }
      return idList;
    },
    // 批量删除
    handleDel() {
      let idList = this.getSelectionDataId();
      if (idList.length == 0) {
        this.$message.warning("请选择需要删除的数据");
        return;
      }
      this.$confirm("是否确认删除当前选中的数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delObj({ idList: idList.join() });
        })
        .then((data) => {
          this.getList(this.page);
          this.$message.success("删除成功");
          this.$refs.crud.selectClear();
        });
    },
    // 关联传感器新增保存
    DisasterSave(row, done, loading) {
      // console.log(this.data.length);
      if (this.data.length == 0) {
        this.data.push(row);
        this.form.disasterIds = [];
        this.data.forEach((item) => {
          if (item.id) {
            this.form.disasterIds.push(item.id);
          } else {
            this.form.disasterIds.push(item.pikk);
          }
        });
        done();
      } else {
        var arr = [];
        this.data.forEach((item) => {
          arr.push(item.$name, item.name);
        });
        if (arr.indexOf(row.$name) > -1) {
          this.$message.warning("不能关联重复的监测点");
          done();
        } else {
          this.data.push(row);
          this.form.disasterIds = [];
          this.data.forEach((item) => {
            if (item.id) {
              this.form.disasterIds.push(item.id);
            } else {
              this.form.disasterIds.push(item.pikk);
            }
          });
          done();
        }
        done();
      }
    },

    addHandle(row, index) {
      this.$refs.cruds.rowAdd();
    },

    delHandle(row, index) {
      var _this = this;
      this.$confirm("是否确认删除数据?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          _this.form.disasterIds = [];
          _this.form.dellDisasterIds = [];
          var arr = [];

          if (_this.data[index].id) {
            _this.form.dellDisasterIds.push(_this.data.splice(index, 1)[0].id);
          }
          if (_this.data[index] && !_this.data[index].id) {
            _this.form.dellDisasterIds.push(
              _this.data.splice(index, 1)[0].pikk
            );
          }
        })
        .then((data) => {
          this.$message.success("删除成功");
        });
    },

    setDeptId(value) {
      this.userForm.deptId = value;
    },
    // 导出
    handleExcel() {},
    // 导入
    handleImport() {},

    handleAvatarSuccess(res, file) {
      // this.imageUrl = res.data.infos[0].url;
      getFile(res.data.infos[0].id).then((res) => {
        this.imageUrl = res.data.data[0].netUrl;
      });
      this.form.headUrl = res.data.infos[0].id;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG 或者PNG 格式!");
      }
      return isJPG || isPNG;
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
    handlereset(form) {
      this.searchForm = form;
      this.page.currentPage = 1;
      this.getList(this.page, form);
    },
    handleRefreshChange() {
      this.getList(this.page);
    },
    uploadBefore(file, done, loading, column) {
      let name = file.name.split(".");
      let extension = name[name.length - 1];
      if (
        ["jpeg", "png", "jpg"].findIndex((item) => item == extension) === -1
      ) {
        this.$message.warning("只能上传拓展名为：png、jpg、jpeg的文件");
        //   return false
        done();
      }
      this.$message.success("上传前的方法");
    },
    handleRemove() {
      this.imageUrl = "";
      this.form.headUrl = "";
    },

    // 查看
    handleView(row, index) {
      this.disDisabled = true;
      if (row.headUrl) {
        getFile(row.headUrl).then((res) => {
          this.imageUrl = res.data.data[0].netUrl;
        });
      } else {
        this.imageUrl = "";
      }
      fetchIdList(row.id).then((res) => {
        row = res.data.data;
        row.disasterVoList.forEach((item) => {
          item.streetCode *= 1;
          item.communityCode *= 1;
        });
        row.streetCode *= 1;
        row.communityCode *= 1;
        this.data = row.disasterVoList;
        // this.form.disasterIds = row.disasterIds;
        this.selectView = true;
        this.rowView = true;
        this.$refs.crud.rowView(row, index);
      });
    },
    // 编辑
    handleEdit(row, index) {
      this.disDisabled = false;
      if (row.headUrl) {
        getFile(row.headUrl).then((res) => {
          this.imageUrl = res.data.data[0].netUrl;
        });
      } else {
        this.imageUrl = "";
      }
      fetchIdList(row.id).then((res) => {
        row = res.data.data;
        if (row.disasterVoList) {
          row.disasterVoList.forEach((item) => {
            item.streetCode *= 1;
            item.communityCode *= 1;
          });
        }
        row.streetCode *= 1;
        row.communityCode *= 1;
        this.data = row.disasterVoList;
        // this.form.disasterIds = row.disasterIds;
        this.selectView = true;
        this.rowView = false;
        this.$refs.crud.rowEdit(row, index);
      });
    },
    //新增用户
    handleAddUser(row) {
      this.gridPersonnelId = row.id;
      getUser({
        userId: row.accountId ? row.accountId : "0",
      }).then((res) => {
        if (res.data.data) {
          setTimeout(() => {
            this.cascaderCurrentValue = res.data.data.deptId;
            this.userForm = res.data.data;
          }, 300);
          this.userOption.submitBtn = false;
          this.userOption.emptyBtn = false;
          if (res.data.data.password) {
            this.userOption.column[1].display = false;
          }
        } else {
          this.userOption.column[1].display = true;
          this.userOption.submitBtn = true;
          this.userOption.emptyBtn = true;
        }
        this.dialogVisible = true;
      });
    },

    addUserSave(form, done) {
      addUser({
        gridPersonnelType: 1,
        gridPersonnelId: this.gridPersonnelId ? this.gridPersonnelId : "0",
        userDTO: form,
      }).then((res) => {
        if (res.data.code == "0") {
          this.$notify.success(res.data.data);
        }
        this.dialogVisible = false;
        done();
        this.getList(this.page);
      });
    },

    handleClose() {
      this.$refs.userForm.resetForm();
      this.cascaderCurrentValue = [];
      this.dialogVisible = false;
    },

    resetChange() {
      this.cascaderCurrentValue = [];
    },

    // 新增
    handleCreate() {
      this.disDisabled = false;
      (this.form = {
        headUrl: "",
        disasterIds: [],
      }),
        (this.selectView = false);
      this.getSelectList();
      this.imageUrl = null;
      this.data = [];
      this.rowView = false;
      this.$refs.crud.rowAdd();
    },

    // 新增提交
    handleSave: function (row, done) {
      row.streetName = row.$streetCode;
      row.communityName = row.$communityCode;
      this.data.forEach((item) => {
        this.form.disasterIds.push(item.disasterCode);
      });
      this.form.disasterIds = this.form.disasterIds.filter(Boolean);
      this.form.disasterId = this.form.disasterIds.filter(Boolean).join(",");
      addObj(Object.assign(row, this.form, { type: 1 })).then((data) => {
        // this.$message.success("添加成功");
        this.$notify.success("添加成功");
        this.handleRefreshChange();
        this.imageUrl = null;
        done();
      });
    },
    // 编辑提交
    handleUpdate: function (row, index, done) {
      row.streetName = row.$streetCode;
      row.communityName = row.$communityCode;
      if (row.disasterVoList) {
        row.disasterVoList = null;
      }
      this.form.disasterId = this.form.disasterIds.filter(Boolean).join(",");
      putObj(Object.assign(row, this.form, { type: 1 })).then((data) => {
        this.$notify.success("添加成功");
        this.handleRefreshChange();
        this.imageUrl = null;
        done();
      });
    },

    // // 传感器信息保存
    // handleInfoSave: function (row, done) {
    //     this.infoData.push(row);
    //     done();
    // },
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
.avatar-uploader ::v-deep.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep.avatar-uploader ::v-deep.el-upload:hover {
  border-color: #409eff;
}
::v-deep.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
::v-deep.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


