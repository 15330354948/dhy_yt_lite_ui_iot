<template>
  <div class="log">
    <basic-container>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        :permission="permissionList"
        @on-load="getList"
        @search-change="searchChange"
        @search-reset="searchReset1"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
        <template slot="menu" slot-scope="scope">
          <el-button @click="handleDeviceList(scope.row)" size="small" type="text">设备运维记录</el-button>
        </template>
      </avue-crud>
    </basic-container>
    <!-- 设备运维记录弹窗 -->
    <el-dialog :visible.sync="isDeviceRecord" v-if="isDeviceRecord" title="设备运维记录" class="avue-dialog" append-to-body>
      <avue-crud
        ref="crud1"
        :page.sync="pageDevice"
        :data="tableDataDevice"
        :table-loading="tableLoadingDevice"
        :option="deviceOption"
        :permission="permissionList"
        :model="devdata"
        @on-load="getListDevice"
        @search-change="searchChangeDevice"
        @search-reset="searchReset"
        @refresh-change="refreshChangeDevice"
        @size-change="sizeChangeDevice"
        @current-change="currentChangeDevice"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="rowDel"
      >
        <template slot="deviceImageForm">
          <div>
            <el-upload
              v-model="Form.deviceImage"
              list-type="picture-card"
              accept=".jpg, .jpeg, .png"
              :action="apiimg"
              :limit="1"
              :class="isurl ? '' : 'spanp'"
              :file-list="fileList"
              :headers="headers"
              :on-success="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <img
                v-if="dialogImageUrl"
                style="height=100%;background-size: cover!important;"
                :src="dialogImageUrl"
                width="100%"
                alt
              />
              <i v-if="!dialogImageUrl" class="el-icon-plus"></i>
              <div v-if="!dialogImageUrl" slot="tip" class="el-upload__tip">只能上传一张图片，且不超过500kb</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
        </template>
        <template slot="menuLeft">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            class="none-border"
            @click="handleAdd()"
            v-if="permissions['generator_professionaldevicemaintenance_add']"
          >添加</el-button>
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            class="none-border"
            @click.stop="handleEdit(scope.row, scope.index)"
            v-if="permissions['generator_professionaldevicemaintenance_edit']"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            class="none-border"
            @click.stop="handleDel(scope.row, scope.index)"
            v-if="permissions['generator_professionaldevicemaintenance_del']"
          >删除</el-button>
        </template>
      </avue-crud>
    </el-dialog>
  </div>
</template>

<script>
import {
  delObj,
  fetchList,
  addObj,
  putObj,
  getObj
} from "@/api/monitorManage/dailyoperation";
import { imgFile } from "@/api/monitorManage/device";
import {
  tableOption,
  deviceOption
} from "@/const/crud/monitorManage/dailyoperationList";
import store from "@/store";
import { mapGetters } from "vuex";
import { baseUrl } from "@/config/env";
import layout from "@/page/index/layout.vue";

export default {
  components: { layout },
  name: "log",
  data() {
    return {
      deviceId: "",
      devdata: { deviceId: "" },
      isurl: true,
      fileList: [],
      form:{},
      Form: { deviceImage: "" },
      tableData: [],
      tableDataDevice: [],
      dialogImageUrl: "",
      dialogVisible: false,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      pageDevice: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      tableLoading: false,
      tableLoadingDevice: false,
      tableOption: tableOption,
      deviceOption: deviceOption,
      isDeviceRecord: false, //设备列表弹窗
      type: {},
      //自定义权限
      customPermissions: {
        // monitor_device_del: false,
      }
    };
  },
  width: {
    // deviceId: {
    //   immediate: true,
    //   handler(newName) {
    //     this.$refs.crud1.searchReset();
    //   }
    // }
  },
  computed: {
    ...mapGetters(["permissions"]),
    ...mapGetters(["access_token"]),
    permissionList() {
      return {
        // delBtn: this.vaildData(this.permissions.monitor_device_del, false),
      };
    },
    headers: function() {
      return { Authorization: "Bearer " + store.getters.access_token };
    },
    infoData() {
      return this.form.info || [];
    }
  },
  created() {
    this.apiimg = baseUrl + "/file/upload/";
    this.customPermissions = {
      monitor_device_del: this.vaildData(
        this.permissions.monitor_device_del,
        false
      )
    };
  },
  methods: {
    handleDel(row,index){
      this.$refs.crud1.rowDel(row,index);
    },
    handleAdd() {
      this.dialogImageUrl = "";
      this.Form.deviceImage = "";
      this.isurl = true;
      this.devdata = {};
      this.$refs.crud1.rowAdd();
    },
    handleRemove(file, fileList) {
      this.dialogImageUrl = "";
      this.Form.deviceImage = "";
      console.log(file, fileList);
      this.isurl = true;
    },
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
      this.Form.deviceImage = file.data.infos[0].id;
      this.dialogImageUrl = file.data.infos[0].url;
      this.isurl = false;
      // console.log(file);
      // console.log(this.Form.deviceImage);
    },
    getList(page, params) {
      this.tableLoading = true;
      fetchList(
        Object.assign(
          {
            // descs: "create_time",
            current: page.currentPage,
            size: page.pageSize,
            ...this.form
          },
          params
        )
      ).then(response => {
        this.tableData = response.data.data.records;
        this.tableData.map(v => {
          if (v.sensorType) {
            v.sensorType = v.sensorType.split(",");
            return v.sensorType;
          }
        });
        this.page.total = response.data.data.total;
        this.tableLoading = false;
      });
    },
    getListDevice(page, params) {
      this.tableLoadingDevice = true;
      getObj(
        Object.assign(
          {
            // descs: "create_time",
            deviceId: this.deviceId,
            current: this.pageDevice.currentPage,
            size: this.pageDevice.pageSize
          },
          params
        )
      ).then(response => {
        this.tableDataDevice = response.data.data.records;
        this.pageDevice.total = response.data.data.total;
        this.tableLoadingDevice = false;
      });
    },
    rowDel: function(row, index) {
      this.$confirm("是否确认删除本条数据?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          console.log(row)
          return delObj(row.id);
        })
        .then(data => {
          this.$message.success("删除成功");
          this.getListDevice(row.id);
        });
    },
    // 设备运维记录
    handleDeviceList(row) {
      this.isDeviceRecord = true;
      this.deviceId = row.id;
      getObj({ deviceId: row.id }).then(v => {
        this.tableDataDevice = v.data.data.records;
      });
    },
    // 编辑
    handleEdit(row, index) {
      this.isurl = true;
      if (row.deviceImage) {
        this.Form.deviceImage = row.deviceImage;
        imgFile(row.deviceImage).then(v => {
          this.Form.deviceImage = v.data.data[0].id;
          this.dialogImageUrl = v.data.data[0].netUrl;
          console.log(this.dialogImageUrl, this.Form.deviceImage);
          this.fileList.push(this.dialogImageUrl);
          this.$refs.crud1.rowEdit(row, index);
        });
      } else {
        this.$refs.crud1.rowEdit(row, index);
      }
    },
    // 编辑提交
    handleUpdate: function(row, index, done) {
      // console.log(row);
      Object.assign(row, this.Form);
      putObj(row).then(data => {
        if (data.data.code == 0) {
          this.$message.success("修改成功");
          this.getListDevice(this.pageDevice, row.id);
          this.refreshChange();
          done();
        }
      });
    },
    // 新增提交
    handleSave: function(row, done) {
      // console.log(row);
      row.deviceImage = this.Form.deviceImage;
      this.devdata.deviceId = this.deviceId;
      Object.assign(row, this.devdata);
      addObj(row).then(data => {
        this.$message.success("添加成功");
        this.refreshChange();
        getObj({ deviceId: this.deviceId }).then(v => {
          this.tableDataDevice = v.data.data.records;
          done();
          this.getListDevice(this.pageDevice, { deviceId: this.deviceId });
        });
      });
    },
    searchChange(form, done) {
      this.form=form;
      this.page.currentPage = 1;
      this.getList(this.page, this.form);
      done();
    },
    searchReset1() {
      this.getList(this.page,this.form);
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.getList(this.page,this.form);
    },
    currentChange(current) {
      this.page.currentPage = current;
      this.getList(this.page,this.form);
    },
    refreshChange() {
      this.getList(this.page,this.form);
    },
    searchChangeDevice(form, done) {
      // console.log(this.tableDataDeviceForm)
      this.pageDevice.currentPage = 1;
      this.getListDevice(this.pageDevice, form);
      done();
    },
    searchReset() {
      this.getListDevice(this.pageDevice);
    },
    sizeChangeDevice(pageSize) {
      this.pageDevice.pageSize = pageSize;
    },
    currentChangeDevice(current) {
      this.pageDevice.currentPage = current;
    },
    refreshChangeDevice() {
      this.getListDevice(this.pageDevice);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-textarea {
  border: 1px solid #f0f0f0;
}
.el-form-item__label {
  width: 130px;
}
.spanp {
  ::v-deepdiv.el-upload.el-upload--picture-card {
    display: none !important;
  }
}
</style>
