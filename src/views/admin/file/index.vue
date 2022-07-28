<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page="page"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="rowDel"
        @selection-change="selectionChange"
        @sort-change="sortChange"
      >
        <template slot="menuLeft">
            <!-- v-if="customPermissions.admin_file_upload" -->
          <el-button
            type="primary"
            @click="dialogVisible = true"
            icon="el-icon-upload"
            >上传文件
          </el-button>

            <!-- v-if="customPermissions.admin_file_batch_delete" -->
          <el-button
            type="danger"
            @click="handleBatchDelete"
            icon="el-icon-delete"
            >批量删除
          </el-button>
        </template>

        <template slot="tip">
          <span style="color: red; margin-left: 10px">
            因为文件一旦关联到业务表中，文件记录的删除会直接影响业务数据中的文件使用，数据本无价，删除需谨慎!!
          </span>
        </template>

        <template slot="menuRight">
          <el-radio-group
            v-model="serverSideSorting"
            style="margin-right: 10px"
          >
            <el-radio-button :label="false">
              <i class="el-icon-sort"></i>
              本地排序
            </el-radio-button>
            <el-radio-button :label="true">
              <i class="el-icon-sort"></i>
              服务端排序
            </el-radio-button>
          </el-radio-group>
        </template>

        <template slot-scope="scope" slot="menu">
            <!-- v-if="customPermissions.admin_file_download" -->
          <el-button
            type="text"
            icon="el-icon-download"
            @click="downloadFile(scope.row)"
            >下载
          </el-button>
        </template>

        <template slot="originalName" slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.originalName"
            placement="top-start"
          >
            <span>{{ subStr(scope.row.originalName) }}</span>
          </el-tooltip>
        </template>

        <template slot="customName" slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.customName"
            placement="top-start"
          >
            <span>{{ subStr(scope.row.customName) }}</span>
          </el-tooltip>
        </template>

        <template slot="relativePath" slot-scope="scope">
          <div
            class="demo-image__preview"
            v-if="isImageFile(scope.row.filetype)"
          >
            <el-image
              style="width: 50px; height: 50px"
              :src="fileUrl(scope.row.relativePath)"
              :alt="scope.row.relativePath"
              :lazy="true"
              :preview-src-list="[fileUrl(scope.row.relativePath)]"
            >
            </el-image>
          </div>
          <el-tooltip
            v-if="!isImageFile(scope.row.filetype)"
            class="item"
            effect="dark"
            :content="scope.row.relativePath"
            placement="top-start"
          >
            <span>{{ subStr(scope.row.relativePath) }}</span>
          </el-tooltip>
        </template>

        <template slot="fileSize" slot-scope="scope">
          <span>{{ fileSizeConve(scope.row.fileSize) }}</span>
        </template>

        <template slot="filePreviewRelativePathForm" slot-scope="scope">
          <div
            class="demo-image__preview"
            v-if="isImageFile(scope.row.filetype)"
          >
            <el-image
              :src="fileUrl(scope.row.relativePath)"
              :alt="scope.row.relativePath"
              :lazy="true"
              :preview-src-list="[fileUrl(scope.row.relativePath)]"
            >
            </el-image>
          </div>
          <span v-if="!isImageFile(scope.row.filetype)">
            {{ fileUrl(scope.row.relativePath) }}
              <!-- v-if="customPermissions.admin_file_open_link_url" -->
            <el-link
              type="primary"
              icon="el-icon-link"
              target="_blank"
              :href="fileUrl(scope.row.relativePath)"
              >打开链接</el-link
            >
          </span>
        </template>
      </avue-crud>

      <el-dialog
        class="file_manager_dialog"
        title="上传文件"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="beforeClose"
        :close-on-click-modal="false"
        append-to-body
      >
        <el-alert
          style="margin-bottom: 5px"
          title="为保证文件记录的有效性，
        您必须提供文件的自定义名称和业务编码，业务编码建议使用该文件所关联的表名加字段名组合，
        例如：用户头像文件所对应的业务编码应为“sys_user:avatar”"
          type="info"
          effect="dark"
        >
        </el-alert>
        <el-upload
          class="file-upload"
          ref="upload"
          :multiple="true"
          :action="baseUrl + '/file/multipart_files_upload'"
          :file-list="uploadTableList"
          :auto-upload="false"
          :show-file-list="false"
          :drag="drag"
          :limit="limit"
          :name="name"
          :headers="uploadHeaders"
          :on-preview="handlePreview"
          :on-error="handleError"
          :on-success="handleSuccess"
          :on-exceed="handleExceed"
          :on-change="handleChange"
        >
          <template v-if="drag">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>(文件最大不超过1GB,一次最多上传10个文件)
            </div>
            <div class="el-upload__tip" slot="tip"></div>
          </template>
          <el-button slot="trigger" type="primary" v-if="!drag"
            >选取文件
          </el-button>
        </el-upload>
        <avue-crud
          ref="uploadTableCrud"
          :data="uploadTableList"
          :option="uploadTableOption"
          @row-update="handleUploadTableUpadate"
          @row-del="handleUploadTableDelete"
        >
          <template slot="status" slot-scope="scope">
            <el-tag>{{ scope.row.status }}</el-tag>
          </template>
          <template slot="percentage" slot-scope="scope">
            <el-tag if>{{ scope.row.percentage.toFixed(2) }}%</el-tag>
          </template>
        </avue-crud>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="submitUpload" icon="el-icon-upload"
            >上传到服务器</el-button
          >
        </span>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
import { fetchList, getObj, putObj, delObj, batchDelObj, downloadFiles } from "@/api/admin/file/file";
import { tableOption } from "@/const/crud/admin/file/file";
import { mapGetters } from "vuex";
import { fileSizeConve, subStr } from "@/util/util";
import { saveAs } from "file-saver";
import store from "@/store";

export default {
  name: "file",
  data() {
    return {
      searchForm: {},
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
      selectionData: [],
      orders: [],
      serverSideSorting: false,
      urlPrefix: "",

      dialogVisible: false,
      limit: 10,
      drag: true,
      name: "file",
      fileList: [],
      uploadTableList: [],
      uploadTableOption: {
        border: true,
        index: true,
        indexLabel: "序号",
        stripe: true,
        menuAlign: "left",
        align: "left",
        addBtn: false,
        refreshBtn: false,
        columnBtn: false,
        editBtn: false,
        cellBtn: true,
        menuWidth: 150,
        column: [
          {
            type: "input",
            label: "文件名",
            prop: "name",
            addDisplay: false,
            editDisabled: true,
          },
          {
            type: "input",
            label: "自定义文件名",
            prop: "customName",
            addDisplay: false,
            editDisabled: true,
            cell: true,
            rules: [
              {
                required: true,
                message: "请输入自定义文件名",
                trigger: "blur",
              },
            ],
          },
          {
            type: "input",
            label: "业务编码",
            prop: "businessCode",
            addDisplay: false,
            editDisabled: true,
            cell: true,
            rules: [
              {
                required: true,
                message: "请输入业务编码",
                trigger: "blur",
              },
            ],
          },
          {
            type: "input",
            label: "状态",
            prop: "status",
            addDisplay: false,
            editDisabled: true,
            slot: true,
            width: 100,
          },
          {
            type: "input",
            label: "进度",
            prop: "percentage",
            addDisplay: false,
            editDisabled: true,
            slot: true,
            width: 100,
          },
        ],
      },
      //自定义权限
      customPermissions: {
        admin_file_upload: false,
        admin_file_download: false,
        admin_file_batch_delete: false,
        admin_file_open_link_url: false,
      }
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        viewBtn: this.vaildData(this.permissions.admin_file_view, false),
        delBtn: this.vaildData(this.permissions.admin_file_del, false),
        editBtn: this.vaildData(this.permissions.admin_file_edit, false),
      };
    },
    uploadHeaders() {
      let token = store.getters.access_token;
      let extFileInfos = new Array();
      for (let i = 0, len = this.uploadTableList.length; i < len; i++) {
        let customName = this.uploadTableList[i].customName;
        let businessCode = this.uploadTableList[i].businessCode;
        extFileInfos.push({
          fileInputName: this.name,
          customName: customName,
          businessCode: businessCode,
        });
      }
      if (token) {
        return {
          Authorization: "Bearer " + token,
          extFileInfos: encodeURIComponent(JSON.stringify(extFileInfos)),
        };
      }
      return {};
    },
  },
  created(){
      this.customPermissions = {
        admin_file_upload: this.vaildData(this.permissions.admin_file_upload, false),
        admin_file_download: this.vaildData(this.permissions.admin_file_download, false),
        admin_file_batch_delete: this.vaildData(this.permissions.admin_file_batch_delete, false),
        admin_file_open_link_url: this.vaildData(this.permissions.admin_file_open_link_url, false),
      }
  },
  methods: {
    fileSizeConve: fileSizeConve,
    subStr: subStr,
    fileUrl(relativePath) {
      return this.urlPrefix + (this.urlPrefix.endsWith("/") ? "" : "/") + relativePath;
    },
    isImageFile(filetype) {
      return ["jpg", "gif", "jpeg", "png"].indexOf((filetype || "").toLowerCase()) != -1;
    },
    downloadFile(row) {
      downloadFiles(row.id).then((res) => {
        let blob = res;
        let eleLink = document.createElement("a");
        let url = window.URL.createObjectURL(new Blob([blob.data]));
        eleLink.download = row.originalName || "";
        eleLink.href = url;
        eleLink.click();
      });
    },
    getList(page, params) {
      this.tableLoading = true;
      fetchList(Object.assign(
        {
          current: page.currentPage,
          size: page.pageSize,
        },
        params,
        this.searchForm,
        this.orders
      )).then((response) => {
        response.data.data.records.forEach(d => d.filePreviewRelativePath = d.relativePath);
        this.tableData = response.data.data.records;
        this.page.total = response.data.data.total;
        this.urlPrefix = response.data.extendData.urlPrefix;
        this.tableLoading = false;
      }).catch(() => {
        this.tableLoading = false;
      });
    },
    rowDel(row, index) {
      this.$confirm("是否确认删除ID为" + row.id, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        return delObj(row.id);
      }).then((data) => {
        this.$message.success("删除成功");
        this.getList(this.page);
      });
    },
    handleUpdate(row, index, done, loading) {
      putObj(row).then((data) => {
        this.$message.success("修改成功");
        done();
        this.getList(this.page);
      }).catch(() => {
        loading();
      });
    },
    handleSave(row, done, loading) {
      addObj(row).then((data) => {
        this.$message.success("添加成功");
        done();
        this.getList(this.page);
      }).catch(() => {
        loading();
      });
    },
    handleBatchDelete() {
      let idList = this.getSelectionDataId();
      if (idList.length == 0) {
        this.$message.warning("请选择需要删除的记录");
        return;
      }
      this.$confirm("是否确认删除当前选中的记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        return batchDelObj({ fileIdList: idList.join() });
      }).then((data) => {
        this.$message.success("删除成功");
        this.$refs.crud.selectClear();
        this.getList(this.page);
      });
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    searchChange(form, done) {
      if (form.createtimeRange) {
        form.createtime_begin = form.createtimeRange[0];
        form.createtime_end = form.createtimeRange[1];
      }
      this.searchForm = form;
      this.page.currentPage = 1;
      this.getList(this.page, form);
      done();
    },
    refreshChange() {
      this.getList(this.page);
    },
    sortChange(sortColumn) {
      if (this.serverSideSorting) {
        this.orders = new Array();
        if (sortColumn.order != null) {
          this.orders.push({
            column: sortColumn.prop,
            asc: sortColumn.order == "ascending",
          });
        }
        this.getList(this.page);
      }
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

    beforeClose() {
      this.dialogVisible = false;
      this.uploadTableList = new Array();
      this.$refs.upload.clearFiles();
    },

    submitUpload() {
      for (let i = 0, len = this.uploadTableList.length; i < len; i++) {
        let customName = this.uploadTableList[i].customName;
        let businessCode = this.uploadTableList[i].businessCode;
        if (/^\s*$/.test(customName)) {
          this.$message.error("第" + (i + 1) + "行：请输入自定义文件名!");
          return;
        }
        if (/^\s*$/.test(businessCode)) {
          this.$message.error("第" + (i + 1) + "行：请输入业务编码!");
          return;
        }
      }
      //上传文件
      this.$refs.upload.submit();
      this.getList(this.page);
    },
    handleUploadTableUpadate(form, index, done, loading) {
      done();
    },
    handleUploadTableDelete(row, index) {
      this.$confirm("是否确认移除成功【" + row.name + "】", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        this.$refs.upload.handleRemove(row);
        this.uploadTableList.splice(this.uploadTableList.indexOf(row), 1);
        this.$message.success("移除成功");
      });
    },
    handleChange(file, fileList) {
      //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
      if (fileList.length < this.uploadTableList) {
        //非新增模式下不处理
        return;
      }
      let existsArray = this.uploadTableList.filter(
        (row) => row.name == file.name
      );
      if (existsArray.length > 0) {
        this.$refs.upload.handleRemove(file);
        return;
      }
      file.customName = file.name.substr(0, file.name.lastIndexOf("."));
      file.businessCode = "";
      this.$refs.uploadTableCrud.rowCellAdd(file);
    },
    handlePreview(file) {
      //点击文件列表中已上传的文件时的钩子
    },
    handleSuccess(response, file, fileList) {
      //文件上传成功时的钩子
      this.$message.success(file.name + "上传成功");
    },
    handleError(err, file, fileList) {
      //文件上传失败时的钩子
      this.$message.warning(file.name + "上传失败");
    },
    handleExceed(files, fileList) {
      //	文件超出个数限制时的钩子
      this.$message.warning("文件超出个数限制");
    },
  },
};
</script>
<style>
.file_manager_dialog .el-upload-dragger,
.file_manager_dialog .el-upload,
.file_manager_dialog .avue-crud {
  width: 100%;
}

.file_manager_dialog .avue-crud__menu {
  display: none;
}

.el-image-viewer__close {
  color: white;
}
</style>
