<template>
  <div class="execution">
    <basic-container>
      <!--  @on-load="getList" -->
      <avue-crud ref="crud" :page="page" :data="tableData" :table-loading="tableLoading" :option="tableOption"
        @search-change="searchChange" @search-reset="searchresret" @size-change="sizeChange"
        @current-change="currentChange" @selection-change="selectionChange" @row-update="handleUpdate"
        @row-save="handleSave" :before-open="beforeOpen" v-model="tableObj" @row-del="rowDel">
        <!-- <template slot-scope="scope" slot="chinaWeatherNetworkCityCodeForm">
          <div class="bc_project-code">
            <el-input placeholder="请输入城市代码"></el-input>
            <el-button  @click="downCodeTxt">下载天气网城市代码</el-button>
          </div>
        </template> -->
        <template slot="menuLeft">
          <el-button class="filter-item" @click="addBtn" type="primary" icon="el-icon-plus"
            v-if="permissions['generator_professionalprojectmanagement_add']">新增
          </el-button>
          <el-button class="filter-item" @click="handleDelAll" type="danger" icon="el-icon-delete"
            v-if="permissions['generator_professionalprojectmanagement_del']">批量删除
          </el-button>
        </template>
        <!-- 查看 -->
        <template slot-scope="scope" slot="menu">
          <el-button icon="el-icon-edit" type="text" size="small" @click.stop="handleEdit(scope.row, scope.index)"
            v-if="permissions['generator_professionalprojectmanagement_edit']">编辑</el-button>
          <el-button icon="el-icon-delete" type="text" size="small" @click.stop="handleDel(scope.row, scope.index)"
            v-if="permissions['generator_professionalprojectmanagement_del']">删除</el-button>
          <el-button icon="el-icon-view" type="text" size="small" @click.stop="handleView(scope.row, scope.index)">查看
          </el-button>
          <el-button icon="el-icon-s-operation" type="text" size="small" @click.stop="setViewConfig(scope.row, scope.index)"
            v-if="permissions['generator_professionalprojectmanagement_del']">配置</el-button>
          <el-button icon="el-icon-s-data" type="text" size="small" @click.stop="statisticsBtn(scope.row, scope.index)"
            v-if="permissions['generator_professionalprojectmanagement_del']">统计</el-button>
        </template>
        <!-- logoId -->
        <template slot-scope="scope" slot="projectLogoUrlForm">
          <el-upload class="avatar-uploader" :action="uploadUrl" :headers="headers" :limit="2" :show-file-list="false"
            :on-success="handleLogoSuccess" :on-remove="handleLogoRemove" :before-upload="beforeLogoUpload">
            <img v-if="tableObj.projectLogoUrl" :src="tableObj.projectLogoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog title="查看详情" :visible.sync="outerVisible" append-to-body width="80%" @closed="handleClose">
      <el-scrollbar style="height: 100%">
        <div class="lookDetails">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="项目信息" name="first">
              <avue-form v-model="viewRow" :option="tableOptionView">
                <template slot-scope="scope" slot="projectLogoUrl">
                  <img :src="viewRow.projectLogoUrl" class="avatar">
                </template>
              </avue-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-scrollbar>
    </el-dialog>
    <el-dialog :visible.sync="isMonitor" width="1200px" title="项目资料" class="avue-dialog" append-to-body>
      <el-row>
        <el-col :span="24">
          <avue-crud :option="projectOption" :data="projectData" :table-loading="fileLoading">
            <template slot="menuLeft">
              <el-button type="primary" @click="addFolder" icon="el-icon-folder-opened"
                v-if="permissions['project_information_file_add']">新增文件夹
              </el-button>
            </template>
            <template slot="menu" slot-scope="scope">
              <el-button style="margin-right:10px" type="success" @click="addFolder(scope)" size="small"
                icon="el-icon-folder-opened" v-if="scope.row.type == 1 && permissions['project_information_file_add']">
                新增行文件夹</el-button>
              <el-upload style="display:inline-block" :action="uploadUrl" :show-file-list="false" ref="upload"
                :headers="headers" :limit="1" :on-exceed="handleExceed" :on-success="handleSuccess"
                :file-list="fileList" :on-remove="handleRemove" :auto-upload="true"
                v-if="scope.row.type == 1 && permissions['project_information_file_edit_file']">
                <el-button icon="el-icon-folder-opened" size="small" type="primary" @click="submitUpload(scope)">新增文档
                </el-button>
              </el-upload>
              <el-button style="margin-left:10px" @click="uploadFile(scope)" icon="el-icon-folder-opened" size="small"
                type="warning" v-if="scope.row.type == 2 && permissions['project_information_file_upload']">下载文档
              </el-button>
              <el-button style="margin-left:10px" @click="rowEditFolder(scope)" icon="el-icon-folder-opened"
                size="small" type="warning">修改名称</el-button>
              <el-button @click="rowDelFolder(scope)" icon="el-icon-delete" size="small" type="danger"
                v-if="permissions['project_information_file_del']">删除</el-button>
            </template>
          </avue-crud>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="新增文件夹" :visible.sync="dialogVisibleadd" v-if="dialogVisibleadd" append-to-body width="30%">
      <el-form :model="renyuanForm">
        <el-form-item label="新增文件夹:">
          <el-input v-model="renyuanForm.name" autocomplete="off" style="width:400px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleadd = false">取 消</el-button>
        <el-button type="primary" @click="addFileBtn">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改文件" :visible.sync="dialogVisible" append-to-body width="30%">
      <el-form :model="modify">
        <el-form-item label="修改文件:">
          <el-input v-model="modify.name" autocomplete="off" style="width:400px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyadd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    fetchList,
    addObj,
    putObj,
    delObj,
    delduo,
    HiddenTrouble,
    equipment,
    modifydata,
    projectIn,
    deletedata,
  } from "@/api/monitorManage/projectList";
  import {
    uploadFileBtn
  } from "@/api/monitorManage/quxian";
  import {
    baseUrl
  } from "@/config/env";
  import {
    tableOption,
    tableOptionView,
    tableDictItemOption,
    tableAppeaOption,
    projectOption
  } from "@/const/crud/monitorManage/projectList";
  import {
    downloadFile
  } from "@/util/index";
  import {
    mapGetters
  } from "vuex";
  export default {
    name: "supplier",
    data() {
      return {
        fileLoading: false,
        fileList: [],
        uploadUrl: "",
        searchForm1: {}, //搜索数据
        searchForm2: {}, //搜索数据
        tableData: [], //数据表格
        tableDictItemData: [], //设备数据表格
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20 // 每页显示多少条
        },
        page1: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        tableAppeakData: [],
        viewRow: {}, //查看数据
        appearForm: {},
        activeName: "first", //切换名称
        tableLoading: false,
        tabLoading: false,
        appeaTabLoading: false,
        outerVisible: false,
        isMonitor: false, //项目资料
        tableOption: tableOption,
        tableOptionView: tableOptionView,
        tableDictItemOption: tableDictItemOption,
        projectOption: projectOption,
        tableAppeaOption: tableAppeaOption(this),
        devId: null,
        selectionData: [],
        renyuanForm: {},
        modify: {
          name: ""
        },
        projectData: [],
        dialogVisibleadd: false,
        dialogVisible: false,
        parentId: "",
        datalist: "",
        rowAllListData: {},
        dataType: '',
        tableObj: {},
      };
    },
    computed: {
      ...mapGetters(["permissions", "projectId"]),
      ...mapGetters(["access_token"]),
      headers: function () {
        return {
          Authorization: "Bearer " + this.access_token
        };
      }
    },
    mounted() {
      this.getList()
    },
    created: function () {
      this.uploadUrl = `${baseUrl}/file/upload`;
    },
    watch:{
      projectId:{
        immediate: true,
        handler(n, o) {
          if(this.$refs.crud){
            this.$refs.crud.searchReset()
            this.$refs.crud.selectClear()
          }
          this.page.currentPage=1
          this.getList()
        },
      },
    },
    methods: {
      downCodeTxt() {
        let txtUrl = '/cityCode.txt'
        let aLink = document.createElement("a");
        aLink.href = txtUrl;
        aLink.download = '天气网城市代码.txt';
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink); //下载完成移除元素
        window.URL.revokeObjectURL(txtUrl); //释放掉blob对象
      },
      uploadFile: function (res) {
        uploadFileBtn(res.row.fileId).then(res => {
          var urls = res.data.data.netUrl;
          var name = res.data.data.originalName;
          downloadFile(urls, name, res.data.data.filetype);
        })
      },
      handleSuccess(response, file, fileList) {
        this.fileLoading = true;
        projectIn(
          Object.assign({
            projectId: this.parentId,
            parentId: this.datalist ? this.datalist : 0,
            type: 2,
            fileId: response.data.infos[0].id,
            name: response.data.infos[0].name
          }, )
        ).then(res => {
          this.renyuanForm.name = "";
          this.$message.success("添加成功");
          setTimeout(() => {
            this.getPorJectList();
          }, 200);
        });
      },
      //上传文档
      submitUpload(row) {
        // console.log(row.row)
        this.datalist = row.row.id;
        this.dataType = row.row.type;
        this.$refs.upload.submit();
      },
      handleExceed(files, fileList) {
        this.$message.warning(`只能选择一个文件`);
      },
      upLoadFileClose() {
        this.$emit("closeDialog", "uploadMakeUpDialogVisible");
      },
      handleRemove(file, fileList) {
        //删除
        // console.log(file, fileList);
      },

      //   项目管理分页查询
      getList(page, params) {
        this.tableLoading = true;
        if (params) {
          if (params.beginTime) {
            params.beginTime = "=" + params.beginTime
          }
          if (params.endTime) {
            params.endTime = "=" + params.endTime
          }
        }
        //分页查询
        //接口那里自己排序的，跟orders[0].asc 与orders[0].column无关
        fetchList(
            Object.assign({
                current: this.page.currentPage,
                size: this.page.pageSize,
                "orders[0].asc": false,
                "orders[0].column": "create_time",
                projectId: this.projectId
              },
              params,
              this.searchForm1
            )
          )
          .then(response => {
            this.tableData = response.data.data.records;
            this.page.total = response.data.data.total;
            this.tableLoading = false;
          })
          .catch(() => {
            this.tableLoading = false;
          });
      },
      // 项目列表分页查询
      selectionChange(selection) {
        this.selectionData = selection;
      },
      // 设备列表分页
      selectiontype(selection) {
        this.selectionData = selection;
      },
      //设备列表数据
      getEquipment(page, params) {
        this.appeaTabLoading = true;

        equipment(
            Object.assign({
                current: this.page1.currentPage,
                size: this.page1.pageSize,
                projectId: this.devId,
                "orders[0].asc": false,
                "orders[0].column": "create_time"
              },
              params,
              this.searchForm2
            )
          )
          .then(res => {
            this.tableAppeakData = res.data.data.records;
            this.page1.total = res.data.data.total;
            this.page1 = {
              pageSize: 10,
              pagerCount: 1,
              total: response.data.data.total
            };
            this.appeaTabLoading = false;
          })
          .catch(() => {
            this.appeaTabLoading = false;
          });
      },
      // 查看按钮
      handleView(row, index) {
        this.devId = row.id;
        this.outerVisible = true;
        this.viewRow = row;
        // this.getEquipment();
      },
    // 设备查看按钮
    handleFacility(row) {
      console.log(row);
    },
    // 切换按钮
    handleClick(tab, event) {
      if (tab.index == "1") {
      } else if (tab.index == "2") {
        this.getEquipment();
      }
    },

      // 查看关闭
      handleClose() {},

      // 批量删除
      handleDelAll() {
        let idList = this.getSelectionDataId();
        if (idList.length == 0) {
          this.$message.warning("请选择需要删除的数据");
          return;
        }
        this.$confirm("是否确认删除当前选中的数据？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(function () {
            return delduo(idList.join());
          })
          .then(data => {
            this.$message.success("删除成功");
            this.$refs.crud.selectClear();
            this.getList(this.page);
          });
      },

      getSelectionDataId() {
        let idList = new Array();
        if (this.selectionData.length > 0) {
          this.selectionData.forEach(d => idList.push(d.id));
        }

        return idList;
      },

      handleDel(row, index) {
        this.$refs.crud.rowDel(row, index);
      },
      // 删除数据
      rowDel: function (row, index) {
        this.$confirm("是否确认删除ID为" + row.id, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(function () {
            return delObj(row.id);
          })
          .then(data => {
            this.$message.success("删除成功");
            this.getList(this.page);
          });
      },

      handleEdit(row, index) {
        this.$refs.crud.rowEdit(row, index);
      },
      // 修改数据
      handleUpdate: function (row, index, done, loading) {
        !row.smsAccessKeyId ? delete row.smsAccessKeyId : row.smsAccessKeyId;
        !row.smsAccessKeySecret ? delete row.smsAccessKeySecret : row.smsAccessKeySecret;
        !row.smsSign ? delete row.smsSign : row.smsSign;
        !row.smsTemplateCode ? delete row.smsTemplateCode : row.smsTemplateCode;
        row.provinceName = row.$province;
        row.cityName = row.$city;
        row.countyName = row.$county;
        row.townName = row.$town;
        putObj(row)
          .then(data => {
            this.$message.success("修改成功");
            done();
            this.getList(this.page);
          })
          .catch(() => {
            loading();
          });
      },

      addBtn: function (row) {
        this.$refs.crud.rowAdd(row);
      },
      // 新增数据
      handleSave: function (row, done, loading) {
        !row.smsAccessKeyId ? delete row.smsAccessKeyId : row.smsAccessKeyId;
        !row.smsAccessKeySecret ? delete row.smsAccessKeySecret : row.smsAccessKeySecret;
        !row.smsSign ? delete row.smsSign : row.smsSign;
        !row.smsTemplateCode ? delete row.smsTemplateCode : row.smsTemplateCode;
        row.provinceName = row.$province
        row.cityName = row.$city
        row.countyName = row.$county
        row.townName = row.$town
        //时间转化；
        var a1 = row.createTime;
        var a2 = row.endTime;

        //判断是否时间选择错误;
        if (a1 > a2) {
          alert("结束时间不能小于开始时间!");
          return false;
        } else {
          addObj(row)
            .then(data => {
              this.$message.success("添加成功");
              done();
              this.getList(this.page);
            })
            .catch(() => {
              loading();
            });
        }
      },
      // 新增文件夹
      addFolder(row) {
        this.dialogVisibleadd = true;
        this.datalist = row.row.id;
        this.dataType = row.row.type;
      },
      addFileBtn(row, done, loading) {

        this.dialogVisibleadd = false;
        this.fileLoading = true;
        projectIn(
          Object.assign({
              projectId: this.parentId,
              parentId: this.datalist ? this.datalist : 0,
              type: this.dataType ? this.dataType : "",
              fileId: this.fileId ? this.fileId : 0
            },
            this.renyuanForm
          )
        ).then(res => {
          this.renyuanForm.name = "";
          this.$message.success("添加成功");
          setTimeout(() => {
            this.getPorJectList();
          }, 200);
        });
        // done();
      },
      // 新增文档
      rowAddFolder(row) {
        console.log(row);
      },
      // 修改名称
      rowEditFolder(row) {
        this.dialogVisible = true;
        this.datalist = row.row;
        this.modify.name = this.datalist.name;
      },
      modifyadd() {
        this.dialogVisible = false;
        this.fileLoading = true;
        modifydata(
          Object.assign({
            id: this.datalist.id,
            name: this.modify.name
          })
        ).then(res => {
          this.$message.success("修改成功");
          this.getPorJectList();
        });
      },
      // 删除文档
      rowDelFolder: function (row) {
        var that = this;

        this.$confirm("是否确认删除当前选中的数据？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(function (done) {
            that.fileLoading = true;
            deletedata(row.row.id).then(res => {
              that.$message.success("删除成功");
              that.getPorJectList();
            });
          })
      },
      // 项目分页
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
        this.getList();
      },
      // sizeChangelist(pageSize) {
      //   this.itemPage.pageSize = pageSize;
      // },
      currentChange(current) {
        this.page.currentPage = current;
        this.getList();
      },
      // currentChangelist(current) {
      //   this.itemPage.currentPage = current;
      // },
      // 项目搜索数据
      searchChange(form, done) {
        this.searchForm1 = form;
        this.page.currentPage = 1;
        this.getList(this.page, form);
        done();
      },
      // 清空搜索
      searchresret() {
        this.searchForm1 = {};
        this.page.currentPage = 1;
        this.getList(this.page);
      },
      // 设备搜索
      searchItemChange(form, done) {
        this.searchForm2 = form;
        this.page.currentPage = 1;
        this.getEquipment(this.page1, form);
        done();
      },
      searchresretlist() {
        this.searchForm2 = {};
        this.page1.currentPage = 1;
        this.getEquipment(this.page1);
      },
      beforeOpen(done, type) {
        // if(type=='add'){
        // }else{

        // }
        done()
      },
      handleLogoSuccess(res, file) { //上传成功后
        let urlData = res.data.infos
        if (urlData && urlData.length > 0) {
          this.tableObj.projectLogoUrl = urlData[0].url || ""
        }
      },
      beforeLogoUpload(file) { //上传图片前类型的判断
        const isJPG = file.type === "image/jpeg";
        const isPNG = file.type === "image/png";

        if (!isJPG && !isPNG) {
          this.$message.error("上传图片只能是 JPG 或者PNG 格式!");
        }
        return isJPG || isPNG;
      },
      handleLogoRemove(file, fileList) {},
      /**
       * 可视化平台配置页面
       */
      setViewConfig(row,index) {
        this.$router.push({
          path: `/sysManage/visualizedConfig`,
          query:{platformData:row},
        });
      },
      statisticsBtn(row,index){
        this.$router.push({
          path: `/sysManage/platformStatistics`,
          query:{platformData:row},
        });
      },
    }
  };

</script>
<style lang="scss" scoped>
  .el-scrollbar__wrap {
    size: 300px;
  }

  .bc_project-code {
    ::v-deep .el-input {
      width: 65%;
    }
  }

</style>
