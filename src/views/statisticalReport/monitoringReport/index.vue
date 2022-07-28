<!--
 * @Author: 张峻霖
 * @Date: 2021-05-19 11:49:18
 * @LastEditTime: 2021-06-04 14:36:29
 * @LastEditors: Please set LastEditors
 * @Description: 监测报告页面
 * @FilePath: \LH-UI\src\views\statisticalReport\monitoringReport\index.vue
-->
<template>
  <div class="hide_mod">
    <basic-container>
      <avue-crud
        ref="crud"
        :option="option"
        :page="page"
        @on-load="getTable"
        @size-change="sizeChange"
        @current-change="currentChange"
        :data="list"
        @row-save="rowSave"
        v-model="data"
        @row-del="rowDel"
        :permission="permissionList"
      >
        <template slot="fileUrlForm">
          <el-upload
            class="upload-file flex"
            :action="uploadUrl"
            :on-success="handleSuccess"
            :headers="header"
            accept=".doc,.docx"
            :file-list="fileList"
            :on-change="getValChange"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </template>
        <template slot-scope="scope" slot="menu">
          <!-- <el-button
            icon="el-icon-view"
            size="small"
            type="text"
            @click="rowView(scope)"
            >查看文件</el-button
          > -->
          <el-button icon="el-icon-view" size="small" type="text"
            ><a
              style="color: #409eff"
              :download="scope.row.fileName"
              :href="scope.row.reportUrl"
              >下载文件</a
            ></el-button
          >
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { tableOption } from "@/const/crud/statisticalReport/monitoringReport";
import {
  tabelReportmonitor,
  addReportmonitor,
  delReportmonitor,
} from "@/api/statisticalReport/monitoringReport";
import store from "@/store";
import { baseUrl } from "@/config/env";

export default {
  name: "hidedanger",
  data() {
    return {
      option: tableOption,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false, //是否倒序
      },
      list: [],
      UploadPercent: 0,
      uploadUrl: baseUrl + "/file/upload",
      fileList: [],
      uploadData: {},
      data: {},
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
    header() {
      return { Authorization: "Bearer " + store.getters.access_token };
    },
    permissionList(){
      return{
        addBtn: this.permissions.statistical_reportmonitoring_report_add?true:false,
        delBtn: this.permissions.statistical_reportmonitoring_report_del?true:false,
      };
    }
  },
  watch: {},
  methods: {
    getTable() {
      let page = {
        current: this.page.currentPage,
        size: this.page.pageSize,
      };
      tabelReportmonitor(page).then((res) => {
        let data = res.data.data.records;
        this.list = data;
      });
    },
    sizeChange(pageSize) {},
    currentChange(current) {},
    beforeRemove(file, fileList) {},
    handleRemove(file, fileList) {},
    handleSuccess(res, file) {
      let data = res.data.infos[0];
      this.data.fileUrl = data;
    },
    getValChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      } else {
        this.fileList = fileList[0];
      }
    },
    beforeUpload(file) {},
    uploadVideoProcess(event, file, fileList) {},
    handleExceed() {},
    async rowSave(form, done) {
      let data = {
        reportName: form.reportName,
        fileName: form.fileUrl.name,
        reportUrl: form.fileUrl.url,
      };
      await addReportmonitor(data).then((res) => {});
      this.$message("上传成功");
      this.fileList = [];
      this.page = {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false, //是否倒序
      };
      this.getTable();
      done();
    },
    rowDel(form, index) {
      let data = {
        ids: [form.id],
      };
      this.$confirm("是否删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delReportmonitor(data).then((res) => {
            this.getTable();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    rowView(data) {
      window.open(
        "https://view.officeapps.live.com/op/view.aspx?src=" +
          data.row.reportUrl
      );
    },
  },
};
</script>
<style lang="scss">
</style>