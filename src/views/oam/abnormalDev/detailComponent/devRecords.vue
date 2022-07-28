<template>
  <div class="container">
    <avue-crud :data="tableData" :option="tableOption" v-model="obj" :page.sync="page" :table-loading="tableLoading"
      @search-change="searchChange" @search-reset="searchReset" @refresh-change="refreshChange"
      @size-change="sizeChange" @current-change="currentChange" @row-save="handleRowSave" @row-update="handleRowUpdate"
      @row-del="handleDel" @selection-change="selectionChange" :before-open="beforeOpen" ref="crudRef"
      :permission="permissionList">
      <template slot="menuLeft">
        <el-button type="primary" @click="disposalBtnHandle"
          v-if="row.disposalStatus !== 'y' ? (permissions.abnormalDevOuter_detail_disposal?true:false) : false">处置
        </el-button>
        <el-button type="primary"
          v-if="row.disposalStatus !== 'y' ? (permissions.abnormalDevOuter_detail_publish_order?true:false) : false"
          @click="addOAM">发布运维工单
        </el-button>
        <el-button type="primary" v-if="permissions.abnormalDevOuter_detail_del_multi" @click="multiDelBtnHandle">批量删除
        </el-button>
      </template>
      <template slot-scope="{ row, index }" slot="menu">
        <el-button type="text" @click="handleMonitorData(row)" v-if="permissions.abnormalDevOuter_detail_monitorData">
          监测数据</el-button>
        <el-button type="text" @click="$refs.crudRef.rowEdit(row, index)"
          v-if="row.createUserName == '系统自动创建' ? false : (permissions.abnormalDevOuter_detail_edit?true:false)">编辑
        </el-button>
        <el-button type="text" @click="$refs.crudRef.rowDel(row, index)"
          v-if="row.createUserName == '系统自动创建' ? false : (permissions.abnormalDevOuter_detail_del?true:false)">删除
        </el-button>
      </template>
    </avue-crud>
    <el-dialog :title="titleTpl" :visible.sync="dialogVisible" width="70%" custom-class="set_dialog"
      :append-to-body="true" :close-on-click-modal="false" :close-on-press-escape="false" @close="cancelDisposal">
      <div>
        <avue-form ref="disposalForm" v-model="disposalObj" :option="formOption" @submit="batchDisposal">
        </avue-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="batchDisposal">确 定</el-button>
        <el-button @click="cancelDisposal">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 监测数据弹窗 -->
    <el-dialog class="hide_dialog" lass="data_show" :visible.sync="isMonitor" v-if="isMonitor"
      @closed="closeMonitorDataDialog" append-to-body width="80%" :fullscreen="dialogfull"
      :close-on-click-modal="false">
      <div slot="title" class="dialog-title">
        <span class="title-text">监测数据</span>
        <i class="el-icon-full-screen" @click="isfullscreen"></i>
      </div>
      <jianceData :dev-data="devData" dev-dw="false" ref="jianceDataRef"></jianceData>
    </el-dialog>
    <el-dialog title="新建运维工单" :visible.sync="oamAddVisible" width="40%" top="5vh" :close-on-click-modal="false"
      append-to-body @close="closeGD">
      <div style="height: 600px; overflow-y: auto">
        <avue-form ref="oamForm" v-model="oamObj" :option="oamOption" @submit="oamAddHandle">
          <template slot="monitorId">
            <el-select v-model="oamObj.monitorId" filterable placeholder="请选择监测点名称" disabled @change="monitorIdChange">
              <el-option v-for="(item, index) in monitorData" :key="index" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </template>
          <template slot="deviceCode">
            <el-select v-model="oamObj.deviceCode" filterable disabled placeholder="请选择设备编号">
              <el-option v-for="(item, index) in deviceData" :key="index" :label="item.code" :value="item.id">
              </el-option>
            </el-select>
          </template>
          <template slot="chargePersonId">
            <treeselect v-model="oamObj.chargePersonId" :value="null" :disable-branch-nodes="true"
              :options="menuOptions" :normalizer="normalizer" @select="treeChange" placeholder="选择负责人员" />
          </template>
          <template slot="joinPersonId">
            <treeselect v-model="oamObj.joinPersonId" :multiple="true" :disable-branch-nodes="true"
              :options="menuOptions" :normalizer="normalizer" @select="treeChange2" @deselect="deselect"
              placeholder="选择参与人员" />
          </template>
          <template slot="files">
            <el-upload class="upload-demo" ref="upload" v-model="oamObj.files" :headers="headers" :action="baseUrlLoad"
              :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"
              :on-success="handleAvatarSuccess">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">
                支持格式：单个文件不能超过20MB
              </div>
            </el-upload>
          </template>
        </avue-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="oamAddHandle" v-preventReClick>确 定</el-button>
        <el-button @click="closeGD">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  // import jianceData from "@/components/jianceData/index";
  import jianceData from "@/components/jianceData/dialogQuxian";
  import {
    abnomalTableOption,
    formOption,
    oamOption,
  } from "@/const/crud/oam/abnormalDev";
  import {
    FetchListInner,
    addObjInner,
    putObjInner,
    batchDelObjInner,
    disposalHanlde,
  } from "@/api/abnormal/abnormalDev";
  import {
    getDeviceId
  } from "@/api/warningMag/monitorList";
  import {
    addOrder,
    disasterNameDataType,
    getDeviceInfo,
    getPerson,
  } from "@/api/workOrder/release.js";
  import {
    baseUrl
  } from "@/config/env";
  import store from "@/store";
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import {
    deepClone
  } from '@/util/util';
  import {
    stallInfo,
  } from "@/api/monitorManage/device";
  import {
    searchSersorType,
  } from "@/api/monitorManage/quxian";

  export default {
    name: "",
    props: ["row"],
    components: {
      jianceData,
      Treeselect,
    },
    data() {
      return {
        currentId: null,
        tableOption: abnomalTableOption,
        formOption: formOption,
        obj: {},
        disposalObj: {},
        tableLoading: false,
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
        },
        selectedArr: [],
        dialogVisible: false,
        titleTpl: "",
        detailItem: null,
        isMonitor: false,
        devData: {},
        dialogfull: false,
        oamAddVisible: false,
        oamObj: {
          monitorId: null,
          deviceId: null,
          chargePersonId: null,
          joinPersonId: null,
          files: [],
        },
        oamOption: oamOption,
        monitorData: [],
        deviceData: [],
        menuOptions: [],
        chargePersonId: "",
        joinPersonId: [],
        baseUrlLoad: baseUrl + "/file/upload",
        fileList: [],
      };
    },
    computed: {
      ...mapGetters(["permissions", "projectId"]), //获取权限
      headers: function () {
        return {
          Authorization: "Bearer " + store.getters.access_token,
        };
      },
      permissionList() {
        return {
          addBtn: this.vaildData(this.permissions.abnormalDevOuter_detail_add, false),
        };
      },
    },
    created() {
      this.getMonitor();
      this.getTreeselect();
    },
    mounted() {},
    watch: {
      "row.disposalStatus": {
        handler(val) {
          if (val == 'y') {
            this.tableOption.addBtn = false
          } else {
            this.tableOption.addBtn = true
          }
        },
        immediate: true
      },
      "row.id": {
        handler(n, o) {
          this.currentId = n;
          this.getList();
        },
      },
      "oamObj.monitorId": {
        handler(val) {
          if (val) {
            this.monitorData.forEach((item) => {
              if (item.id == val) {
                this.oamObj.monitorName = item.name;
              }
            });
            this.getDevice();
          }
        },
        immediate: true,
      },
      "oamObj.deviceId": {
        handler(val) {
          if (val) {
            this.deviceData.forEach((item) => {
              if (item.id == val) {
                this.oamObj.deviceType = item.type;
              }
            });
          } else {
            this.oamObj.deviceType = ""
          }
        },
        immediate: true,
      },
    },
    methods: {
      getList() {
        this.tableLoading = true;
        // console.log(this.row);
        FetchListInner(
          Object.assign({
              current: this.page.currentPage,
              size: this.page.pageSize,
              abnormalDeviceRecordId: this.currentId,
              deviceId: this.row.deviceId,
              "orders[0].column": "create_time",
              "orders[0].asc": false,
            },
            this.searchParams
          )
        ).then((res) => {
          this.tableData = res.data.data.records;
          this.page.total = res.data.data.total;
          this.tableLoading = false;
        });
      },
      searchChange(form, done) {
        this.page.currentPage = 1;
        this.searchParams = form;
        if (
          this.searchParams.abnormalTime &&
          this.searchParams.abnormalTime.length == 2
        ) {
          this.searchParams.abnormalTime_begin =
            this.searchParams.abnormalTime[0];
          this.searchParams.abnormalTime_end = this.searchParams.abnormalTime[1];
          delete this.searchParams.abnormalTime;
        }
        if (
          this.searchParams.createTime &&
          this.searchParams.createTime.length == 2
        ) {
          this.searchParams.createTime_begin =
            this.searchParams.createTime[0];
          this.searchParams.createTime_end = this.searchParams.createTime[1];
          delete this.searchParams.createTime;
        }
        if (
          this.searchParams.timeRange &&
          this.searchParams.timeRange.length == 2
        ) {
          this.searchParams.monitorDataRangeStartTime =
            this.searchParams.timeRange[0];
          this.searchParams.monitorDataRangeEndTime =
            this.searchParams.timeRange[1];
          delete this.searchParams.timeRange;
        }
        this.getList();
        //搜索
        done();
      },
      /**
       * 清空按钮
       */
      searchReset() {
        this.page.currentPage = 1;
        this.page.pageSize = 10;
        this.searchParams = {};
        this.getList();
      },
      sizeChange(pageSize) {
        //分页条数变化时
        this.page.pageSize = pageSize;
        this.getList();
      },
      currentChange(current) {
        //当前页码变化时
        this.page.currentPage = current;
        this.getList();
      },
      refreshChange() {
        this.getList();
      },
      beforeOpen(done, type) {
        if (type == "edit") {
          this.obj.timeRange = [
            this.obj.monitorDataRangeStartTime,
            this.obj.monitorDataRangeEndTime,
          ];
        }
        done();
      },
      handleRowSave(row, done, loading) {
        let item = row;
        //新增
        let objPost = {
          abnormalDescription: item.abnormalDescription,
          abnormalDeviceRecordId: this.currentId,
          abnormalTime: item.abnormalTime,
          abnormalType: item.abnormalType,
          monitorDataRangeEndTime: item.timeRange && item.timeRange.length > 0 ?
            item.timeRange[1] : null,
          monitorDataRangeStartTime: item.timeRange && item.timeRange.length > 0 ?
            item.timeRange[0] : null,
        };
        addObjInner(objPost).then((res) => {
          loading();
          done();
          this.page.current = 1;
          this.page.currentPage = 1;
          this.getList();
        });
      },
      handleRowUpdate(row, index, done, loading) {
        let item = row;
        let objPost = {
          id: item.id,
          abnormalDeviceRecordId: item.abnormalDeviceRecordId,
          abnormalDescription: item.abnormalDescription,
          abnormalTime: item.abnormalTime,
          abnormalType: item.abnormalType,
          monitorDataRangeEndTime: item.timeRange && item.timeRange.length > 0 ?
            item.timeRange[1] : null,
          monitorDataRangeStartTime: item.timeRange && item.timeRange.length > 0 ?
            item.timeRange[0] : null,
        };
        //修改
        putObjInner(objPost).then((res) => {
          loading();
          done();
          this.page.current = 1;
          this.page.currentPage = 1;
          this.getList();
        });
      },

      handleDel(row, index) {
        //删除
        this.$confirm("是否确认删除?", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnClickModal: false,
            type: "warning",
          })
          .then(() => {
            batchDelObjInner(row.id).then((res) => {
              this.page.current = 1;
              this.page.currentPage = 1;
              this.getList();
            });

            //  this.$message.success('删除成功')
          })
          .catch(function () {});
      },
      selectionChange(list) {
        //选中的数据
        this.selectedArr = list;
      },
      multiDelBtnHandle() {
        if (this.selectedArr && this.selectedArr.length > 0) {
          let flag = false;
          for (var i = 0; i < this.selectedArr.length; i++) {
            if (this.selectedArr[i].createUserName == "系统自动创建") {
              flag = true;
              this.$message.error("系统自动创建的数据不可删除，请重新选择");
              return;
            }
          }
          if (!flag) {
            this.$confirm("是否确认批量删除?", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnClickModal: false,
                type: "warning",
              })
              .then(() => { 
                let objTpl = [];
                this.selectedArr.forEach((e) => {
                  objTpl.push(e.id);
                });
                let stringTpl = objTpl.join(",");
                batchDelObjInner(stringTpl).then((res) => {
                  this.page.current = 1;
                  this.page.currentPage = 1;
                  this.getList();
                });
              })
              .catch(function () {});
          }
        } else {
          this.$message.error("请选择要操作的数据！");
        }
      },
      cancelDisposal() {
        this.$refs.disposalForm.resetForm();
        this.dialogVisible = false;
        this.titleTpl = "";
      },
      disposalBtnHandle() {
        this.dialogVisible = true;
      },
      batchDisposal() {
        let objPost = {
          abnormalDeviceRecordId: this.currentId,
          disposalStatus: this.disposalObj.disposalStatus,
          disposalResults: this.disposalObj.disposalResults,
          remark: this.disposalObj.remark,
        };
        //
        disposalHanlde(objPost).then((res) => {
          // done()
          this.$refs.disposalForm.resetForm();
          this.dialogVisible = false;
          this.torefresh('d')
        });
      },
      getZh(value, typeArr) {
        //转义成中文
        let nameTpl = "";
        if (value) {
          typeArr.forEach((item) => {
            if (item.value == value) {
              nameTpl += item.label;
            } else {
              nameTpl += "";
            }
          });
        } else {
          nameTpl += "";
        }
        return nameTpl;
      },
      handleMonitorData(item) {
        // console.log(this.row, item, "_____________");
        if (this.row.deviceType == "bjq_001" || this.row.deviceType == "cjz_001") {
          this.$message.warning("智能报警器没有监测数据");
          this.isMonitor = false;
        } else if (this.row.deviceType == "gnssjzz_001") {
          this.$message.warning("gnss基准站没有监测数据");
          this.isMonitor = false;
        } else if (this.row.deviceType == 6) {
          this.$message.warning("监控设备没有监测数据");
          this.isMonitor = false;
        } else {
          this.isMonitor = true;
          this.devData = {
            row: {
              deviceId: this.row.deviceId,
              projectId: this.projectId,
              disasterId: this.row.monitorId,
              sensorType: [],
            },
          };
          setTimeout(() => {
            // monitorDataRangeEndTime
            // monitorDataRangeStartTime

            let arr = []

            function getFirstChild(data) {
              if (data[0].children && data[0].children.length > 0) {
                getFirstChild(data[0].children)
              } else {
                if (data && data.length > 0) {
                  arr.push(data[0])
                } else {
                  arr.push(data)
                }

              }
              return ((arr && arr.length > 0) ? arr[0] : null)
            }
            let domArr = []

            function getDomItem(data) {
              if (data && data.length > 1) {
                getDomItem(data[1].$children)
              } else {
                if (data && data.length > 0) {
                  domArr.push(data[0])
                } else {
                  domArr.push(data)
                }

              }
              return ((domArr && domArr.length > 0) ? domArr[0] : null)
            }

            setTimeout(() => {
              //默认第一个
              // let choiceOne=getFirstChild(this.$refs.jianceDataRef.treeData)
              // this.$refs.jianceDataRef.$refs.tree.setCurrentKey(choiceOne)
              // let choiceItem=getDomItem(this.$refs.jianceDataRef.$refs.tree.$children[0].$children)
              // choiceItem.$el.click();
              //组装devListone数据
              stallInfo(this.row.deviceId).then((v) => {
                let devData = v.data.data
                if (devData.platformSensors && devData.platformSensors.length > 0) {
                  let senseorData = devData.platformSensors
                  searchSersorType("sensor_type").then((prame) => {
                    let sersorTypeAll = prame.data.data;
                    let sensorTypeName = this.getZh(senseorData[0].type, sersorTypeAll)
                    this.$refs.jianceDataRef.devListone = {
                      label: sensorTypeName + '-' + senseorData[0].sensorCode,
                      sensorType: senseorData[0].type,
                      sensorCode: senseorData[0].sensorCode,
                      deviceId: this.row.deviceId,
                    }
                  });

                }
              })
              this.$refs.jianceDataRef.showOff = true
              setTimeout(() => {
                if (item.monitorDataRangeEndTime && item.monitorDataRangeStartTime) {

                  let rightTabBox = this.$refs.jianceDataRef.$refs.rightTabBox
                  rightTabBox.isOk = true
                  this.$refs.jianceDataRef.$refs.rightTabBox.changChildTime([item.monitorDataRangeStartTime,
                    item.monitorDataRangeEndTime
                  ])
                } else {
                  let rightTabBox = this.$refs.jianceDataRef.$refs.rightTabBox
                  rightTabBox.isOk = false
                  let timeArr = [rightTabBox.GetDateStr(-7, "hours"),
                    rightTabBox.GetDateStr(0, "hours")
                  ]
                  rightTabBox.$refs.monitorChartRef.chartForm.datetimerange = timeArr
                  rightTabBox.$refs.monitorTableRef.tableForm.datetimerange = timeArr

                }
              }, 400);

            }, 300);


          }, 300);
        }

      },
      closeMonitorDataDialog() {
        let rightTabBox = this.$refs.jianceDataRef.$refs.rightTabBox
        rightTabBox.isOk = false
        let timeArr = [rightTabBox.GetDateStr(-7, "hours"),
          rightTabBox.GetDateStr(0, "hours")
        ]
        rightTabBox.$refs.monitorChartRef.chartForm.datetimerange = timeArr
        rightTabBox.$refs.monitorTableRef.tableForm.datetimerange = timeArr

        this.isMonitor = false

      },
      isfullscreen() {
        this.dialogfull = !this.dialogfull;
        console.log("全屏");
      },

      addOAM() {
        this.oamAddVisible = true;
        this.oamObj.monitorId = this.row.monitorId
        this.oamObj.deviceCode = this.row.deviceCode
        this.oamObj.deviceType = this.row.deviceType
        this.oamObj.chargePersonId = null
      },
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.id,
          label: node.name,
          children: node.children ? node.children : delete node.children,
        };
      },
      treeChange(node, ins) {
        this.chargePersonId = node.realId;
      },
      treeChange2(node, ins) {
        this.joinPersonId.push(node.realId);
      },
      deselect(node) {
        this.joinPersonId.map((val, i) => {
          if (val == node.realId) {
            this.joinPersonId.splice(i, 1);
          }
        });
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handleAvatarSuccess(res, file) {
        this.oamObj.files.push(res.data.infos[0].id);
      },
      handlePreview(file) {
        // console.log(file);
      },
      getMonitor() {
        disasterNameDataType({
          projectId: this.projectId,
        }).then((res) => {
          this.monitorData = res.data.data;
        });
      },
      // 获取设备信息
      getDevice() {
        getDeviceInfo({
          projectId: this.projectId,
          monitorId: this.oamObj.monitorId,
        }).then((res) => {
          this.deviceData = res.data.data;
        });
      },
      getTreeselect() {
        getPerson({
          projectId: this.projectId,
          // isBind: true
        }).then(response => {
          this.menuOptions = response.data.data;
        });
      },
      oamAddHandle() {
        // console.log(this.chargePersonId);
        let dataTpl = deepClone(this.oamObj)
        dataTpl.chargePersonId = this.chargePersonId
        let objPost = {
          joinPersonId: this.joinPersonId.join(',')
        }
        if (this.oamObj.msgMode && this.oamObj.msgMode.length > 0) {
          objPost.msgMode = 1
        } else {
          objPost.msgMode = 0
        }
        if (this.oamObj.files && this.oamObj.files.length > 0) {
          objPost.files = this.oamObj.files.join(',')
        } else {
          objPost.files = ""
        }
        dataTpl.deviceId = parseInt(dataTpl.deviceId)
        dataTpl.monitorId = parseInt(dataTpl.monitorId)
        delete dataTpl.joinPersonId
        delete dataTpl.msgMode
        delete dataTpl.files
        addOrder(
          Object.assign(dataTpl, objPost, {
            source: 1,
            projectId: this.projectId,
            deviceId: this.row.deviceId
          })
        ).then((res) => {
          this.$refs.oamForm.resetForm();
          this.oamAddVisible = false;
          this.$message.success('新增成功')
          this.torefresh('o')
        });
      },
      torefresh(val) {
        //o 代表运营维护记录 ， d代表处置记录
        this.$emit('torefreshBychild', val)
      },
      monitorIdChange(val) {
        this.oamObj.deviceId = null
      },
      closeGD() {
        this.$refs.oamForm.resetForm();
        this.fileList = []
        this.oamAddVisible = false
      },
    },
  };

</script>

<style lang="scss" scoped>
  .container {
    min-height: 390px;
    overflow-x: hidden;
    overflow-y: auto;
  }

</style>
