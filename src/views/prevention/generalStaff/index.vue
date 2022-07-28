
<template>
  <div>
    <basic-container>
      <el-row>
        <el-col :span="4">
          <div class="hide_data">
            <div class="hide_data__tree">
              <div class="hide_data__btn">
                <el-button
                  type="primary"
                  @click="handleAdd"
                  :disabled="isSelect1"
                  >新增人员类型</el-button
                >
                <el-button type="info" @click="xiougai" :disabled="isSelect"
                  >修改</el-button
                >
                <el-button type="danger" @click="delshuxin" :disabled="isSelect"
                  >删除</el-button
                >
              </div>
              <avue-tree
                :loading="loading"
                :option="option1"
                :data="datas"
                @node-click="nodeClick"
              ></avue-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="user">
            <avue-crud
              :option="option"
              ref="crud"
              v-model="form"
              :page="page"
              :upload-before="uploadBefore"
              @on-load="getList"
              @size-change="sizeChange"
              @current-change="currentChange"
              @search-change="handleFilter"
              @search-reset="handlereset"
              @refresh-change="handleRefreshChange"
              @row-del="rowDel"
              @row-save="handleSave"
              @row-update="handleUpdate"
              :table-loading="listLoading"
              :data="list"
              @selection-change="selectionChange"
            >
              <template slot-scope="{ row }" slot="inputForm">
                <el-tag>{{ row }}</el-tag>
              </template>
              <template slot="menuLeft">
                <!-- <el-button
                  class="filter-item"
                  @click="upLoadBtn"
                  type="primary"
                  icon="el-icon-upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                  >导入</el-button
                > -->
                <el-button
                  class="filter-item"
                  @click="handleCreate"
                  type="primary"
                  icon="el-icon-plus"
                  v-if="permissions.generator_qcqfperson_add && addBtn"
                  >新增人员
                </el-button>
                <el-button
                  class="filter-item"
                  @click="handleDel"
                  type="danger"
                  icon="el-icon-delete"
                  v-if="permissions.generator_qcqfperson_del"
                  >批量删除</el-button
                >
              </template>
              <template slot="menu" v-if="flag" slot-scope="scope">
                <el-button
                  @click="handleAddUser(scope.row, scope.index)"
                  class="none-border"
                  size="small"
                  type="text"
                  >添加用户</el-button
                >
              </template>
            </avue-crud>
          </div>
        </el-col>
      </el-row>
    </basic-container>
    <el-dialog
      title="新增人员"
      :visible.sync="dialogVisibleaddlist"
      append-to-body
      width="30%"
    >
      <el-form :model="renyuanForm">
        <el-form-item label="人员类型:">
          <el-input
            v-model="renyuanForm.name"
            autocomplete="off"
            style="width: 400px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleaddlist = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleadd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改文件夹"
      :visible.sync="Modifyfoldername"
      append-to-body
      width="30%"
    >
      <el-form :model="wenjianjia">
        <el-form-item label="修改文件夹名:">
          <el-input
            v-model="wenjianjia.name"
            autocomplete="off"
            style="width: 400px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Modifyfoldername = false">取 消</el-button>
        <el-button type="primary" @click="Modifyfoldernameadd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      @closed="handleClosed"
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
  </div>
</template>

<script>
import {
  fetchList,
  delObj,
  getObj,
  putObj,
  addObj,
  foler,
  delduo,
  folerlist,
  delrenyuan,
  modifyobj,
  uploadlist,
} from "@/api/admin/generalStaff";
import { tableOption, userOption } from "@/const/crud/prevention/generalStaff";
import { lazyFetchTree } from "@/api/admin/dept";
import { addUser, getUser } from "@/api/prevention/preventMag";
import { mapGetters } from "vuex";
import { Loading } from "element-ui";
import logs from "../../../store/modules/logs";
export default {
  name: "table_user",
  data() {
    return {
      userForm: {},
      Modifyfoldername: false,
      data: [],
      addBtn: false,
      save: true,
      searchForm: {},
      option: tableOption,
      userOption: userOption,
      checkedKeys: [],
      cascaderCurrentValue: [],
      openlist: {},
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false, //是否倒序
      },
      selectionData: [],
      list: [],
      listLoading: false,
      form: {},
      renyuanForm: {}, //新增文件夹
      wenjianjia: {
        name: "",
      }, //修改文件夹名
      colorChange: false,
      isSelect: true, //是否有文件选中
      isSelect1: false,
      loading: false,
      datas: [],
      option1: {
        //防止重复刷新列表
        defaultExpandAll: true,
        props: {
          label: "name",
          value: "id",
          children: "twoList",
        },
      },
      fileList: [],
      flag: false,
      disDisabled: false,
      dialogVisible: false,
      dialogVisibleaddlist: false,
      gridPersonnelId: "",
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
    ...mapGetters(["permissions"]),
  },
  mounted() {
    this.getTree();
  },
  created() {},
  methods: {
    //新增用户
    handleAddUser(row) {
      this.gridPersonnelId = row.id;
      // this.dialogVisible = true;
      getUser({
        userId: row.accountId ? row.accountId : "0",
      }).then((res) => {
        if (res.data) {
          if (res.data.data.password) {
            this.userOption.column[1].display = false;
          }
          this.cascaderCurrentValue = res.data.data.deptId;
          this.userForm = res.data.data;
        } else {
          this.userOption.column[1].display = true;
        }
        this.dialogVisible = true;
      });
    },

    addUserSave(form, done) {
      addUser({
        gridPersonnelType: 4,
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

    setDeptId(value) {
      this.userForm.deptId = value;
    },

    resetChange() {
      this.cascaderCurrentValue = [];
    },

    handleClosed() {
      this.$refs.userForm.resetForm();
      this.cascaderCurrentValue = [];
      this.dialogVisible = false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //确认关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    tip(node, data) {
      this.$message.success(JSON.stringify(data));
    },
    //删除综合人员文件夹
    delshuxin: function () {
      var _this = this;
      this.$confirm(
        '是否确认删除ID为"' + this.openlist.id + '"的所有数据?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function (done) {
          delrenyuan(_this.openlist.id).then((res) => {});
        })
        .then((data) => {
          this.$message.success("删除成功");
          setTimeout(() => {
            _this.getList(this.page);
            _this.getTree();
          }, 1000);
        });
    },
    update(parent, data, done, loading) {
      this.$message.success("更新回调");
      done();
    },
    //修改综合人员文件夹
    xiougai() {
      this.Modifyfoldername = true;
      this.wenjianjia.name = this.openlist.name;
    },
    Modifyfoldernameadd(row, done, loading) {
      this.Modifyfoldername = false;
      modifyobj(
        Object.assign({
          id: this.openlist.id,
          name: this.wenjianjia.name,
        })
      ).then((res) => {
        this.$message.success("修改成功");
        this.getList(this.page);
        this.getTree();
      });
    },
    // 点击上传
    upLoadBtn() {
      // uploadlist
      // this.$message.success("上传");
    },
    // save(parent, data, done, loading) {
    //   this.$message.success("新增回调");
    //   this.form.id = new Date().getTime();
    //   this.form.value = new Date().getTime();
    //   this.form.children = [];
    //   done();
    // },
    nodeClick(data) {
      this.flag = true;
      this.openlist = data;
      this.getList(this.page);
      if (this.openlist) {
        this.addBtn = true;
      }
      if (this.openlist) {
        this.isSelect = false;
      } else {
        this.isSelect = true;
      }
      if (this.openlist.level == 2) {
        this.isSelect1 = true;
      } else {
        this.isSelect1 = false;
      }
    },

    selectionChange(selection) {
      this.selectionData = selection;
    },
    //新增综合人员
    handleAdd() {
      this.dialogVisibleaddlist = true;
    },
    dialogVisibleadd(row, done, loading) {

      this.dialogVisibleaddlist = false;
      foler(
        Object.assign(
          {
            parentId: this.openlist.id ? this.openlist.id : null,
            level: this.openlist.id == undefined ? 1 : 2,
            sort: this.openlist.sort,
          },
          this.renyuanForm
        )
      )
        .then((res) => {
          this.renyuanForm.name = "";
          this.$message.success("添加成功");
          this.getList(this.page);
          this.getTree();
          done();
        })
        .catch(() => {
          // loading();
        });
    },
    getList(page, params) {
      console.log(this.openlist);

      this.listLoading = true;
      //分页查询
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
            "orders[0].column": "create_time",
            "orders[0].asc": false,
          },
          {
            parentId: this.openlist.id,
            level: 3,
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

    //获取树形
    getTree() {
      this.loading = true;
      folerlist().then((res) => {
        this.datas = res.data.data;
        let parentid = res.data.data.parentId;
        this.loading = false;
      });
    },

    getSelectionDataId() {
      let idList = new Array();
      if (this.selectionData.length > 0) {
        this.selectionData.forEach((d) => idList.push(d.id));
      }
      return idList;
    },
    handleCreate(){
      this.$refs.crud.rowAdd();
    },
    //批量删除
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
          return delduo({ ids: idList.join() });
        })
        .then((data) => {
          this.$message.success("删除成功");
          this.$refs.crud.selectClear();
          this.getList(this.page);
        });
    },

    getNodeData(data) {
      this.setRoleOptions();
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    //搜索
    handleFilter(form, done) {
      this.searchForm = form;
      this.page.currentPage = 1;
      this.addBtn = false;
      this.getList(this.page, form);
      done();
    },
    //清空
    handlereset() {
      this.openlist = {};
      this.page.currentPage = 1;
      this.addBtn = false;
      this.getList(this.page);
      this.flag = false;
    },
    // 删除数据
    rowDel: function (row, index) {
      this.$confirm('是否确认删除ID为"' + row.id + '"的数据?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delObj(row.id);
        })
        .then((data) => {
          this.getList(this.page);
          this.$message.success("删除成功");
        });
    },
    // 修改数据
    handleUpdate: function (row, index, done, loading) {
      putObj(row)
        .then((data) => {
          this.$message.success("修改成功");
          done();
          this.getList(this.page);
        })
        .catch(() => {
          loading();
        });
    },
    // 新增数据
    handleSave: function (row, done, loading) {
      addObj(
        Object.assign(
          {
            parentId: this.openlist.id,
            sort: this.openlist.sort,
            level: 3,
          },
          row
        )
      )
        .then((data) => {
          done();
          this.$message.success("添加成功");
          this.getList(this.page);
        })
        .catch(() => {
          loading();
        });
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
    uploadError(error, column) {
      this.$message.success("上传失败");
    },
  },
};
</script>

<style lang="scss">
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
::v-deep.hide_data {
  display: flex;
  height: 100%;
  ::v-deep.hide_data__tree {
    width: 100% !important;
  }
  &__btn {
    margin-bottom: 5px;
  }
  &__tree {
    max-height: 63vh;
    padding-top: 3px;
  }

  &__preview {
    width: calc(75% - 10px);
    height: 63vh;
    margin-left: 10px;
    max-height: 63vh;
    overflow: hidden;
    background: #ccc;
  }
  .Avue-tree {
    &__filter {
      display: block;
    }
  }
}
.avue-tree__filter {
  opacity: 0;
}
</style>


