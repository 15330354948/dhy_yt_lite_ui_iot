<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        :permission="permissionList"
        v-model="tableObj"
        @on-load="getList"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="refreshChange"
        @row-save="handleSave"
      >
        <template slot="url1Form" slot-scope>
          <el-upload
            class="upload-demo"
            ref="upload"
            v-model="tableObj.url1"
            :headers="headers"
            :action="baseUrlLoad"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :limit='1'
            :on-success="handleAvatarSuccess"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <div slot="tip" class="el-upload__tip">
              提示：单次只能上传一个文件
            </div>
          </el-upload>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { addObj, fetchList } from "./apiApp";
import { tableOption } from "./appOption";
import { mapGetters } from "vuex";
import {baseUrl} from "@/config/env";
import store from "@/store";
export default {
  name: "app",
  data() {
    return {
      fileList: [],
      baseUrlLoad: baseUrl + "/file/uploadFileToServerDir?relativePath=apk",
      tableObj: {url1:''},
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
      },
      tableLoading: false,
      lang: "zh",
      expandedOnStart: true,
      tableOption: tableOption,
    };
  },
  created() {},
  mounted: function () {},
  computed: {
    ...mapGetters(["permissions", "access_token"]),
    headers: function () {
      return {
        Authorization: "Bearer " + store.getters.access_token,
      };
    },
    permissionList() {
      return {
        // addBtn: this.vaildData(this.permissions.sys_client_add, false),
      };
    },
  },
  methods: {
    handleView(row, index) {},

    getList(page, params) {
      this.tableLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
          },
          params
        )
      ).then((response) => {
        let datas = response.data.data.records;
        datas.forEach((element) => {
          if (element.additionalInformation) {
            element.additionalInformation = JSON.parse(
              element.additionalInformation
            );
          }
        });
        this.tableData = datas;
        this.page.total = response.data.data.total;
        this.tableLoading = false;
      });
    },

    handleSave: function (row, done) {
      delete this.tableObj.url1
      delete this.tableObj.createTime
      addObj( this.tableObj).then((data) => {
        if(data.data.code==0){
          this.$message.success("添加成功");
          this.refreshChange();
        }else{
          this.$message.error("添加失败");
        }
          done();
      });
    },
    refreshChange() {
      this.getList(this.page);
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      this.tableObj.url1.map((item, i) => {
        if (item == file.response.data.data[0].netUrl) {
          this.tableObj.url1.splice(i, 1);
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.tableObj.netUrl=res.data[0].netUrl
      this.tableObj.fileSize=file.size
    },
    handlePreview(file) {
      // console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
