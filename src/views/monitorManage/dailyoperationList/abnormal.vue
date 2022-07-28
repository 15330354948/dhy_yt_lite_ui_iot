<template>
  <div class="log">
    <basic-container>
      <!-- :permission="permissionList" -->
      <avue-crud
        ref="crud"
        :page.sync="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @search-change="searchChange"
        @search-reset="searchReset"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @selection-change="selectionChange"
      >
        <template slot="menuLeft">
          <el-button
            type="primary"
            @click="rowAdd"
            icon="el-icon-plus"
            size="small"
            v-if="permissions['generator_professionaldeviceabnormal_add']"
            >新增
          </el-button>
          <el-button
            type="danger"
            @click="handleBatchDelete"
            icon="el-icon-delete"
            v-if="permissions['generator_professionaldeviceabnormal_del']"
            >批量删除
          </el-button>
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            class="none-border"
            @click.stop="handleEdit(scope.row, scope.index)"
            v-if="permissions['generator_professionaldeviceabnormal_edit']"
          >编辑</el-button>
          <el-button
            @click="handleDetail(scope.row)"
            icon="el-icon-view"
            size="small"
            type="text"
          >详情</el-button>
        </template>
      </avue-crud>
    </basic-container>
    <!--  添加-->
    <el-dialog
      :visible.sync="isshow"
      :title="isAdd ? '新增' : '编辑'"
      class="avue-dialog"
      append-to-body
    >
      <avue-form ref="addOption1" v-model="infoData" :option="addOption">
        <template slot="imgUrl">
          <div>
            <el-upload
              ref="upload"
              v-model="Form.imgUrl"
              list-type="picture-card"
              accept=".jpg, .jpeg, .png"
              :class="isurl ? '' : 'spanp'"
              :limit="1"
              :file-list="showFiles"
              :action="apiimg"
              :headers="headers"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
            >
              <i v-show="!Form.dialogImageUrl" class="el-icon-plus"></i>
              <img
                v-if="Form.dialogImageUrl"
                style="background-size: cover;!important;height=100%"
                :src="Form.dialogImageUrl"
                width="100%"
                alt
              />
              <div slot="tip" v-if="!Form.dialogImageUrl" class="el-upload__tip">仅能上传一张异常截图</div>
            </el-upload>
          </div>
        </template>
        <template slot="disasterName">
          <avue-select
            clearable
            v-model="infoData.disasterName"
            filterable
            :props="disname"
            :dic="disData"
            placeholder="请选择监测点名称"
            @change="disName"
          ></avue-select>
        </template>
        <template slot="disasterCode">
          <avue-input disabled v-model="infoData.disasterCode" placeholder="全市统一编号"></avue-input>
        </template>
        <template slot="deviceName">
          <avue-select
            v-model="infoData.deviceName"
            clearable
            :props="disname"
            :dic="devNamedata"
            placeholder="请选择异常设备名称"
            @change="devData"
          ></avue-select>
        </template>
        <template slot="deviceCode">
          <avue-input disabled v-model="infoData.deviceCode" placeholder="异常设备编码"></avue-input>
        </template>
        <template slot="deviceType">
          <avue-select
            disabled
            :props="disType"
            :dic="devTypedata"
            v-model="infoData.deviceType"
            placeholder="异常设备类型"
          ></avue-select>
        </template>
        <template slot="deviceCode">
          <avue-input disabled v-model="infoData.deviceCode" placeholder="异常设备编码"></avue-input>
        </template>
        <template slot="factoryName">
          <avue-input disabled v-model="infoData.factoryName" placeholder="厂商名称"></avue-input>
        </template>
        <template slot="location">
          <avue-input disabled v-model="infoData.location" placeholder="安装位置"></avue-input>
        </template>
      </avue-form>
      <template slot="footer">
        <el-button type="primary" @click="addsubmit">提交</el-button>
        <el-button @click="addChange">取消</el-button>
      </template>
    </el-dialog>
    <!-- 详情弹窗 -->
    <el-dialog :visible.sync="isDetail" v-if="isDetail" title="详情" class="avue-dialog" width="900px" append-to-body>
      <el-row :option="tabOption" style="line-height: 40px">
        <el-col :span="12">
          <label class="el-form-item__label">全市统一编号:</label>
          {{ tabOption.disasterCode || "--" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">监测点名称:</label>
          {{ tabOption.disasterName || "--" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">异常设备名称:</label>
          {{ tabOption.deviceName || "--" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">异常设备类型:</label>
          {{ tabOption.deviceType || "--" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">厂商名称:</label>
          {{ tabOption.factoryName || "--" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">安装位置:</label>
          {{ tabOption.location || "--" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">异常时间:</label>
          {{ tabOption.abnormalTime || "--" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">异常分类:</label>
          {{ tabOption.$classify || "--" }}
        </el-col>
        <el-col :span="24">
          <label class="el-form-item__label">异常原因:</label>
          {{ tabOption.reason || "--" }}
        </el-col>
        <el-col :span="24">
          <label class="el-form-item__label">异常截图:</label>
          <el-image
            style="width: 100px; height: 100px"
            :src="Form.dialogImageUrl || ''"
            fit="cover"
          ></el-image>
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">处理状态:</label>
          {{ tabOption.$auditState || "--" }}
        </el-col>
        <el-col :span="24">
          <label class="el-form-item__label">处理结果:</label>
          {{ tabOption.auditResult || "--" }}
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  addObj,
  delObj,
  infoPage,
  disater,
  getObj,
  putObj
} from "@/api/monitorManage/erroroperation";
import { imgFile, deviceType } from "@/api/monitorManage/device";
import {
  tableOption,
  startOption,
  addOption
} from "@/const/crud/monitorManage/erroroperationList";
import store from "@/store";
import { mapGetters } from "vuex";
import { baseUrl } from "@/config/env";
import layout from "@/page/index/layout.vue";

export default {
  components: { layout },
  name: "log",
  watch:{
    disasterName: {
      immediate: true,
      handler: function (newval,oldVal) {
        console.log(newval);
        if(newval!=oldVal){
          this.infoData.deviceName = "";
          this.infoData.deviceCode = "";
          this.infoData.deviceType = "";
          this.infoData.factoryName = "";
          this.infoData.location = "";
        }
        
      },
    },
  },
  data() {
    return {
      disasterName:"",
      showFiles: [],
      isurl: true,
      devNamedata: [],
      disname: {
        label: "name",
        value: "name"
      },
      disType: {
        label: "label",
        value: "value"
      },
      classData: ["无", "平台原因", "施工原因", "设备原因"],
      stateData: ["未处置", "正在处置", "已处置"],
      devTypedata: [],
      disData: [],
      tableObj: {},
      tabOption: {},
      isshow: false,
      Form: { imgUrl: "", dialogImageUrl: "" },
      isAdd: false,
      infoData: {},
      startForm: {},
      selectionData: [],
      startManage: {},
      tableData: [],
      addForm: {},
      tableDataDevice: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
      // startOption:startOption,
      addOption: addOption,
      isDetail: false, //详情弹窗
      type: {},
      //自定义权限
      customPermissions: {
        monitor_device_del: false
      }
    };
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
    }
  },
  created() {
    this.getTT();
    this.apiimg = baseUrl + "/file/upload/";
    // this.type = this.tabOption.column[0];
    this.customPermissions = {
      // monitor_device_del: this.vaildData(this.permissions.monitor_device_del,false),
    };
  },
  methods: {
    getTT() {
      deviceType().then(v => {
        this.devTypedata = v.data.data;
      });
    },
    handleBatchDelete() {
      let idList = this.getSelectionDataId();
      // console.log(idList,1234564);
      if (idList.length == 0) {
        this.$message.warning("请选择需要删除的数据");
        return idList;
      }
      this.$confirm("是否确认删除当前选中的数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          console.log(idList);
          return delObj({ ids: idList.join(",") });
        })
        .then(data => {
          this.$message.success("删除成功");
          this.refreshChange();
          this.$refs.crud.selectClear();
        });
    },
    //获取监测点
    async disName(v) {
      if (v) {
        if(v!=this.infoData.deviceName&&this.isAdd){
          this.infoData.deviceName = "";
          this.infoData.deviceCode = "";
          this.infoData.deviceType = "";
          this.infoData.factoryName = "";
          this.infoData.location = "";
        }
        this.disData.map(w => {
          if (v == w.name) {
            this.infoData.disasterCode = w.pikk;
          }
        });
        await infoPage({ disasterName: v }).then(v => {
          this.devNamedata = v.data.data.records;
          // console.log( this.devNamedata);
          
        });
      } 
      else {
        this.infoData = {};
      }
    },
    //获取设备名称
    devData(v) {
      this.devNamedata.map(w => {
        if (v == w.name) {
          this.infoData.deviceCode = w.code;
          this.infoData.deviceType = w.type;
          this.infoData.factoryName = w.factoryName;
          this.infoData.location = w.location;
        }
      });
    },
    selectionChange(selection) {
      this.selectionData = selection;
    },
    getSelectionDataId() {
      let idList = new Array();
      if (this.selectionData.length > 0) {
        this.selectionData.forEach(d => idList.push(d.id));
      }
      return idList;
    },
    handleRemove(file, fileList) {
      this.isurl = true;
      this.Form.dialogImageUrl = "";
      this.Form.imgUrl = "";
    },
    handleSuccess(file, fileList) {
      this.Form.imgUrl = file.data.infos[0].id;
      this.Form.dialogImageUrl = file.data.infos[0].url;
      this.isurl = false;
    },
    // 新增
    rowAdd() {
      this.Form.dialogImageUrl = "";
      disater().then(res => {
        this.disData = res.data.data.records;
      });
      this.isurl = true;
      this.Form.imgUrl = "";
      this.isAdd = true;
      this.infoData = {};
      this.infoData.imgUrl = "";
      this.isshow = true;
      if (this.$refs.addOption1) {
        this.$refs.addOption1.resetForm();
      }
    },
    //取消
    addChange() {
      this.isshow = false;
      this.$refs.addOption1.resetForm();
      this.Form.dialogImageUrl = "";
      this.isurl = true;
      this.infoData = {};
      this.infoData.imgUrl = "";
      this.Form.imgUrl = "";
      this.$refs.upload.clearFiles();
    },
    addsubmit(form) {
      this.$refs.addOption1.validate((valid) => {
        if (!valid) return;
        if (this.isAdd) {
          form.imgUrl = this.Form.imgUrl;
          addObj(form).then(data => {
            if (data.data.code == 0) {
              this.$message.success("新增成功");
              this.refreshChange();
              this.getList(this.page);
              this.isshow = false;
            }
          });
        } else {
          this.infoData.imgUrl = this.Form.imgUrl;
          putObj(this.infoData).then(data => {
            if (data.data.code == 0) {
              this.isshow = false;
              this.$message.success("编辑成功");
              this.refreshChange();
              this.Form.dialogImageUrl = "";
              this.getList(this.page);
              this.$refs.upload.clearFiles();
            }
          });
        }
      })
    },
    // 编辑
    handleEdit(row) {
      this.isurl = true;
      this.isAdd = false;
      this.isshow = true;
      this.infoData.disasterName = row.disasterName;
      // console.log(this.infoData.deviceName);
      // this.disname.label=this.infoData.deviceName;
      if(this.devNamedata){
        this.infoData = row;
      }
      if (this.infoData.imgUrl) {
        this.Form.imgUrl = this.infoData.imgUrl;
        imgFile(this.Form.imgUrl).then(v => {
          this.Form.dialogImageUrl = v.data.data[0].netUrl;
        });
      } else {
        this.Form.dialogImageUrl = "";
      }
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
        this.page.total = response.data.data.total;
        this.page.pageSize = response.data.data.size;
        this.tableLoading = false;
      });
    },
    // 详情
    handleDetail(row) {
      this.tabOption = row;
      if (row.imgUrl) {
        this.Form.imgUrl = row.imgUrl;
        imgFile(this.Form.imgUrl).then(v => {
          this.Form.dialogImageUrl = v.data.data[0].netUrl;
        });
      }
      this.isDetail = true;
      setTimeout(v => {
        this.devTypedata.map(v => {
          if (v.value == row.deviceType) {
            row.deviceType = v.label;
          }
        });
      }, 0);
    },
    searchChange(form, done) {
      this.form=form;
      this.page.currentPage = 1;
      this.getList(this.page, this.form);
      done();
    },
    searchReset(form) {
      form = {};
      this.page.currentPage = 1;
      this.getList(this.page,form);
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
