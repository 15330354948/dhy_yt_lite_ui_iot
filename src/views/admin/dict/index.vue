<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <el-alert
        style="margin-bottom: 5px"
        title="单击左侧字典进行字典项的操作!"
        type="info"
        effect="dark"
        show-icon
      >
      </el-alert>
      <el-container>
        <el-aside style="position: relative; width: 50%">
          <avue-crud
            ref="crud"
            :page="page"
            :data="tableData"
            :permission="permissionList"
            :table-loading="tableLoading"
            :option="tableOption"
            @on-load="getList"
            @row-update="handleUpdate"
            @row-save="handleSave"
            @search-change="searchChange"
            @refresh-change="refreshChange"
            @size-change="sizeChange"
            @current-change="currentChange"
            @row-click="handleItem"
            @row-del="rowDel"
          >
            <template slot-scope="{ type, size, row }" slot="menu">
              <el-button
                v-if="permissionList.sys_dict_gen_enum"
                :size="size"
                :type="type"
                title="生成枚举"
                @click="showGenEnumContentDialog(row)"
              >
                <i class="el-icon-s-claim"></i>
                枚举
              </el-button>
            </template>
          </avue-crud>
        </el-aside>
        <el-main>
          <avue-crud
            ref="crudItem"
            :page="itemPage"
            :data="tableDictItemData"
            :permission="permissionList"
            v-model="form"
            :before-open="handleBeforeOpen"
            :option="tableDictItemOption"
            @refresh-change="itemRefreshChange"
            @search-change="itemSearchChange"
            @size-change="itemSizeChange"
            @current-change="itemCurrentChange"
            @row-update="handleItemUpdate"
            @row-save="handleItemSave"
            @row-del="rowItemDel"
          >
            <template slot="menuLeft">
              <el-tag type="danger" effect="plain">
                {{ (dictDescription || "描述") + "->" + (dictType || "类型") }}
              </el-tag>
            </template>
          </avue-crud>
        </el-main>
      </el-container>
    </basic-container>

    <template>
      <el-dialog
        title="字典枚举映射"
        top="5vh"
        :visible.sync="enumContentDialogVisible"
        append-to-body
        width="60%"
      >
        <div>
          <avue-form
            ref="form"
            v-model="selectedDict"
            :option="selectedDictOption"
          >
            <template slot="menuForm">
              <el-button
                type="primary"
                icon="el-icon-view"
                @click="genEnumContent"
              >
                预览代码
              </el-button>
              <el-button
                v-if="enumContent"
                type="primary"
                icon="el-icon-document-copy"
                @click="copyEnumContent"
              >
                复制到剪切板
              </el-button>
              <el-button
                type="primary"
                icon="el-icon-download"
                @click="downloadEnumFiele"
              >
                下载文件
              </el-button>
            </template>
          </avue-form>
          <highlightjs v-if="enumContent" language="java" :code="enumContent" />
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import { addItemObj, addObj, delItemObj, delObj, fetchItemList, fetchList, putItemObj, putObj, previewDictEnum, downloadEnumFile } from '@/api/admin/dict'
import { tableDictItemOption, tableOption } from '@/const/crud/admin/dict'
import { mapGetters } from 'vuex'

export default {
  name: 'Dict',
  data() {
    return {
      searchForm: {},
      form: {
        type: undefined,
        dictId: undefined
      },
      dictDescription: "",
      dictType: "",
      dictId: undefined,
      tableData: [],
      tableDictItemData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      itemSearchForm: {},
      itemPage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
      tableDictItemOption: tableDictItemOption,

      selectedDict: {},
      selectedDictOption: {
        emptyBtn: false,
        submitBtn: false,
        labelWidth: 120,
        column: [
          {
            label: "模块包名",
            prop: "packageName",
            span: 24,
          },
          {
            label: "枚举文件名",
            prop: "enumFileName",
          },
          {
            type: "radio",
            label: "字典项数据类型",
            prop: "itemDataType",
            dicData: [
              {
                value: 'Integer',
                label: '数字'
              }, {
                value: 'String',
                label: '字符串'
              }
            ],
          }
        ]
      },
      packageName: "",
      enumContentDialogVisible: false,
      enumContent: ""
    }
  },
  watch: {
    "selectedDict.packageName": {
      handler(value) {
        this.packageName = value;
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.sys_dict_add, false),
        delBtn: this.vaildData(this.permissions.sys_dict_del, false),
        editBtn: this.vaildData(this.permissions.sys_dict_edit, false),
        sys_dict_gen_enum: this.vaildData(this.permissions.sys_dict_gen_enum, false),
      }
    }
  },
  methods: {
    //======字典表格相关=====
    getList(page, params) {
      this.tableLoading = true
      fetchList(Object.assign({
        current: page.currentPage,
        size: page.pageSize,
        'orders[0].column': 'create_time',
        'orders[0].asc': false
      }, params, this.searchForm)).then(response => {
        this.tableData = response.data.data.records
        this.page.total = response.data.data.total
        this.tableLoading = false
      })
    },
    rowDel: function (row) {
      this.$confirm('是否确认删除数据类型为"' + row.type + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delObj(row)
      }).then(() => {
        this.getList(this.page)
        this.$message.success('删除成功')
      }).catch(function () {
      })
    },
    handleUpdate: function (row, index, done) {
      putObj(row).then(() => {
        this.$message.success('修改成功')
        this.getList(this.page)
        done()
      })
    },
    handleSave: function (row, done) {
      addObj(row).then(() => {
        this.$message.success('添加成功')
        this.getList(this.page)
        done()
      })
    },
    searchChange(form, done) {
      this.searchForm = form
      this.page.currentPage = 1
      this.getList(this.page, form)
      done()
    },
    refreshChange: function () {
      this.getList(this.page)
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange(current) {
      this.page.currentPage = current
    },
    showGenEnumContentDialog(row) {
      this.selectedDict = row;
      this.enumContent = "";
      this.enumContentDialogVisible = true;

      let type = row.type;
      type = type.startsWith("_") ? type : ("_" + type);
      if (this.packageName) {
        this.selectedDict.packageName = this.packageName;
      } else {
        this.selectedDict.packageName = "com.dhy.luohu.模块名.enums";
      }
      this.selectedDict.enumFileName = type.replace(/(_.?)/g, function (word) { return word.substr(1).toLocaleUpperCase() }) + "Enum";
      this.selectedDict.itemDataType = "String";
    },
    genEnumContent() {
      let loading = this.$loading();
      previewDictEnum({
        dictId: this.selectedDict.id,
        packageName: this.selectedDict.packageName,
        enumFileName: this.selectedDict.enumFileName,
        itemDataType: this.selectedDict.itemDataType,
      }).then(response => {
        this.enumContent = response.data.data
        loading.close();
      }).catch(() => {
        loading.close();
      });
    },
    copyEnumContent() {
      this.$Clipboard({
        text: this.enumContent
      }).then(() => {
        this.$message.success('复制成功');
      }).catch(() => {
        this.$message.error('复制失败');
      });
    },
    downloadEnumFiele() {
      let loading = this.$loading();
      downloadEnumFile({
        dictId: this.selectedDict.id,
        packageName: this.selectedDict.packageName,
        enumFileName: this.selectedDict.enumFileName,
        itemDataType: this.selectedDict.itemDataType,
      }).then(() => {
        loading.close();
      }).catch(() => {
        loading.close();
      });
    },
    //======字典项表格相关=====
    handleItem: function (row) {
      this.itemPage.currentPage = 1;
      this.dictDescription = row.description;
      this.getDictItemList(row.id, row.type);
    },
    itemSearchChange(form, done) {
      if (!this.dictId) {
        this.$message.warning('请先选择左侧的字典项!')
        return;
      }
      this.itemSearchForm = form;
      this.itemPage.currentPage = 1;
      this.getDictItemList(this.dictId, this.dictType);
      done()
    },
    getDictItemList(dictId, type) {
      this.dictId = dictId
      this.dictType = type
      fetchItemList(Object.assign(this.itemSearchForm, {
        current: this.itemPage.currentPage,
        size: this.itemPage.pageSize,
        'orders[0].column': 'create_time',
        'orders[0].asc': false
      }, { dictId: "=" + dictId })).then(response => {
        this.tableDictItemData = response.data.data.records
        this.itemPage.total = response.data.data.total
      })
    },
    handleBeforeOpen(done) {
      if (!this.dictType) {
        this.$message.warning('请先选择左侧的字典项!')
        return;
      }
      this.form.type = this.dictType
      this.form.dictId = this.dictId
      done()
    },
    handleItemSave: function (row, done) {
      addItemObj(row).then(() => {
        this.$message.success('添加成功')
        this.getDictItemList(row.dictId, row.type)
        done()
      })
    },
    handleItemUpdate: function (row, index, done) {
      putItemObj(row).then(() => {
        this.$message.success('修改成功')
        this.getDictItemList(row.dictId, row.type)
        done()
      })
    },
    itemSizeChange: function (pageSize) {
      this.itemPage.pageSize = pageSize
      this.getDictItemList(this.dictId, this.dictType)
    },
    itemCurrentChange: function (current) {
      this.itemPage.currentPage = current
      this.getDictItemList(this.dictId, this.dictType)
    },
    itemRefreshChange: function () {
      this.getDictItemList(this.dictId, this.dictType)
    },
    rowItemDel: function (row) {
      this.$confirm('是否确认删除数据为"' + row.label + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delItemObj(row.id)
      }).then(() => {
        this.getDictItemList(row.dictId, row.type)
        this.$message.success('删除成功')
      }).catch(function () {
      })
    },
  }
}
</script>
