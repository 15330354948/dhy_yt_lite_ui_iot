<template>
  <div class="log">
    <basic-container>
      <!-- 搜索表单 -->
      <avue-form ref="form" v-model="searchForm" :option="searchOption" @submit="searchChange"
        @reset-change="searchReset">
        <template slot="cascader" slot-scope>
          <el-cascader :props="props" v-model="searchForm.cascader" size="mini" ref="cascaderDev" clearable
            placeholder="请输入行政区划" @visible-change="visibleChange" @blur="noBlur"></el-cascader>
        </template>
        <template slot="type" slot-scope>
          <el-select v-model="searchForm.type" placeholder="请选择设备类型">
            <el-option v-for="(item,index) in typedicData" :key="index" :label="item.label" :value="item.value"
              @blur="noBlur">
            </el-option>
          </el-select>
        </template>
        <template slot="subprojectId" slot-scope>
          <el-select v-model="searchForm.subprojectId" clearable filterable placeholder="请选择所属项目">
            <el-option v-for="(item,index) in sProjectTypedicData" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </template>

        <template slot="factoryId" slot-scope>
          <el-select v-model="searchForm.factoryId" placeholder="请选择设备厂商">
            <el-option v-for="(item,index) in factorydicData" :key="index" :label="item.name" :value="item.id"
              @blur="noBlur">
            </el-option>
          </el-select>
        </template>
      </avue-form>

      <avue-crud ref="crud" :page.sync="page" :data="tableData" :table-loading="tableLoading" :option="tableOption"
        v-model="tableObj" :before-open="beforeClose" @size-change="sizeChange" @current-change="currentChange"
        @row-update="handleUpdate" @row-save="handleSave" @refresh-change="refreshChange"
        @selection-change="selectionChange">
        <template slot="cascader" slot-scope="scope">
          <div>
            {{scope.row.provinceName?scope.row.provinceName+scope.row.cityName+scope.row.countyName+scope.row.streetName+scope.row.communityName:''}}
          </div>
        </template>
        <template slot="cascaderForm" slot-scope>
          <el-input v-model="tableObj.cascader" disabled placeholder="请选择" clearable size="mini"></el-input>
        </template>
        <template slot="disasterNameForm" slot-scope>
          <el-select v-model="tableObj.disasterName" placeholder="请选择监测点名称">
            <el-option v-for="(item,index) in disasterNameData" :key="index" :label="item.monitorName"
              :value="item.monitorCode ">
            </el-option>
          </el-select>
        </template>
        <template slot="useStatusForm" slot-scope>
          <el-row>
            <el-col :span="23">
              <el-select v-model="tableObj.useStatus" placeholder="请选择使用状态">
                <el-option label="使用" :value="0"></el-option>
                <el-option label="损坏" :value="1"></el-option>
                <!-- <el-option label="注销" :value="2"></el-option> -->
              </el-select>
            </el-col>
            <el-col :span="1">
              <el-tooltip class="item" placement="top-start" effect="light" :open-delay="300">
                <i class="el-icon-warning-outline" style="margin-left:4px"></i>
                <div slot="content">
                  <span style="color: #67C23A">使用</span><span
                    style="color: #606266">：设备正常使用中，系统将正常展示该点位的监测数据，设备参与在离线统计。</span> <br /> <br />
                  <span style="color: #F56C6C">损坏</span><span
                    style="color: #606266">：已挂载的设备出现损坏，系统将保留原点位的监测数据，且设备不参与在线率统计。</span>
                  <!-- <span style="color: #EBB563">注销</span><span
                style="color: #606266">：设备已损坏不再使用，监测点或点位已核销时的情况，通过设备注销功能，系统将保留原点位的监测数据，且设备不参与在线率统计。</span> -->
                </div>
              </el-tooltip>
            </el-col>
          </el-row>

        </template>
        <template slot="longitudeForm">
          <el-input v-model="tableObj.longitude" placeholder="请输入经度" clearable size="mini">
            <el-button style="padding-right:10px" slot="suffix" type="text" @click="getLocation">定位
            </el-button>
          </el-input>
        </template>
        <template slot="offlineDurationForm">
          <div style="display:flex">
            <div style="width:70px">超过</div>
            <el-input v-model="offlineDuration" placeholder="请输入离线时长" clearable size="small">
            </el-input>
            <div style="width:400px">分钟未收到监测数据为离线。</div>
          </div>
        </template>

        <template slot="menuLeft">
          <el-button type="primary" @click="rowAdd" icon="el-icon-plus"
            v-if="permissions['generator_professionaldeviceinfo_add']">新增</el-button>
          <!-- <el-button
            type="primary"
            @click="handleInstructions"
            v-if="permissions['generator_professionaldeviceinfo_release'] && searchFormStatus"
            >指令下发</el-button
          > -->
          <!-- <el-button
            type="primary"
            @click="handleInstructionsRecord"
            v-if="permissions['generator_professionaldeviceinfo_release'] && searchFormStatus"
            >指令下发记录</el-button
          > -->
          <el-button type="primary" @click="rowecl" icon="el-icon-excel"
            v-if="permissions['generator_professionaldeviceinfo_dev_upload']">导出</el-button>
          <el-button type="danger" @click="handleBatchDelete" icon="el-icon-delete"
            v-if="permissions['generator_professionaldeviceinfo_handel_del']">批量删除</el-button>
          <el-button type="primary" @click="setHeight" icon="el-icon-excel"
            v-if="permissions['generator_professionaldeviceinfo_set_height']">设置高度</el-button>
          <el-button type="primary" @click="replaceEquipmentClick" icon="el-icon-excel"
            v-if="permissions['device_management_replace_code']">更换设备</el-button>
          <el-button type="primary" @click="handleNormal" icon="el-icon-excel"
            v-if="permissions['device_management_export_hourly']">批量设备异常设置
          </el-button>
          <el-button type="primary" @click="uploadMany" icon="el-icon-excel" v-if="
              permissions['device_management_export_qbjc'] && searchFormStatus
            ">导出监测数据报表
          </el-button>
          <!-- <el-button type="primary" @click="uploadAll" icon="el-icon-excel" v-if="
              permissions['device_management_export_qbtj'] && searchFormStatus
            ">导出监测数据
          </el-button> -->

          <el-button type="primary" @click="exportHour" icon="el-icon-excel"
            v-if="permissions['device_management_export_hourly']">导出时报
          </el-button>
          <el-button type="primary" @click="exportDay" icon="el-icon-excel"
            v-if="permissions['device_management_export_daily']">导出日报
          </el-button>
          <el-button type="primary" @click="exportSourceData" icon="el-icon-excel"
            v-if="permissions['generator_professionaldeviceinfo_original']">导出原始数据
          </el-button>
          <!-- <el-button
            type="primary"
            @click="uploadManyNew"
            icon="el-icon-excel"
            v-if="
              permissions['device_management_export_dxjc'] && searchFormStatus
            "
            >导出多选监测数据报表
          </el-button> -->
          <!-- <el-button type="primary" @click="uploadAllNewDiv" icon="el-icon-excel" v-if="
              permissions['device_management_export_qbjc'] && searchFormStatus
            ">导出全部监测数据报表
          </el-button> -->
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-edit" class="none-border"
            @click.stop="handleEdit(scope.row, scope.index)"
            v-if="permissions['generator_professionaldeviceinfo_edit']">编辑</el-button>
          <el-button @click.stop="handleDetail(scope)" v-if="permissions['generator_professionaldeviceinfo_info']"
            icon="el-icon-view" size="small" type="text">详情</el-button>
          <el-button v-if="scope.row.type !== '6' && permissions['generator_professionaldeviceinfo_monitoring_data']"
            @click="handleMonitor(scope)" icon="el-icon-s-tools" size="small" type="text">监测数据</el-button>
          <el-button v-if="scope.row.type === '6' && permissions['generator_professionaldeviceinfo_monitoring_data']"
            @click="handleMonitor(scope)" icon="el-icon-s-tools" size="small" type="text">实时监控</el-button>
          <el-button @click="handleNormal(scope)" icon="el-icon-s-tools" size="small" type="text">设备异常设置</el-button>
          <el-button type="text" @click.stop="rowDelete(scope.row)" icon="el-icon-delete" size="small"
            v-if="permissions['generator_professionaldeviceinfo_del']">删除</el-button>
        </template>
        <template slot="codeForm">
          <el-form-item prop="code" style="margin-bottom: 0" :rules="rules">
            <el-input v-model="tableObj.code" placeholder="请输入设备编号" clearable size="small">
            </el-input>
          </el-form-item>
        </template>

        <template slot="subprojectIdForm" slot-scope>
          <el-select v-model="tableObj.subprojectId" clearable filterable placeholder="请选择所属项目" @change="subProChange">
            <el-option v-for="(item,index) in projectTypedicData" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </template>

        <template slot="infoForm">
          <avue-crud ref="infoForm" v-model="infoObj" :option="infoOption" :data="infoData" @row-save="rowSave1"
            @row-update="rowEdit1" @row-del="sorDel">
            <template slot="stateHeader" slot-scope="{column}">
              <span>{{(column || {}).label}}</span>
              <el-tooltip class="item" placement="top-start" effect="light" :open-delay="300">
                <div slot="content">
                  <span>使用：</span><span style="color: #606266">该传感器使用中，可正常显示该传感器的监测数据。</span> <br /> <br />
                  <span>未使用：</span><span style="color: #606266">该传感器未使用，不显示该传感器的监测数据。</span>
                </div>
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </template>
            <template slot="menu" slot-scope="{row,index}">
              <el-button type="text" size="small" @click="rowCell(row,index)">{{row.$cellEdit?'关闭':'编辑'}}</el-button>
              <el-button v-show="modify" type="text" @click='writeBtn(row)'>修改记录</el-button>
              <el-button type="text" @click="sorDel(row)">删除</el-button>
            </template>
            <template slot="menuLeft">
              <el-button type="primary" @click="AddMenu" icon="el-icon-plus">新增</el-button>
              <el-button type="success" @click="handleSync" icon="el-icon-refresh-right">同步</el-button>
              <el-button type="danger" plain @click="handleDelete" icon="el-icon-delete">清空</el-button>
            </template>
          </avue-crud>
        </template>
      </avue-crud>
    </basic-container>

    <el-dialog :visible.sync="writeBox" v-if="writeBox" width="1000px" @close="closeWriteBox" title="修改记录"
      class="avue-dialog" append-to-body>
      <Remand :sensorId="sensorId" :writetableData="writetableData" :writepage="writepage"></Remand>
    </el-dialog>

    <!-- 导出全部报表New -->
    <!-- <el-dialog
      :visible.sync="uploadAllDivNew"
      v-if="uploadAllDivNew"
      width="1000px"
      @close="closeUploadAllNew"
      title="导出全部监测数据报表"
      class="avue-dialog"
      append-to-body
    >
      <uploadAllNew v-on:closeUploadAllTest="closeUploadAllNew"></uploadAllNew>
    </el-dialog> -->
    <!-- 导出全部报表New -->
    <el-dialog :visible.sync="uploadAllDivNew" v-if="uploadAllDivNew" width="1000px" @close="closeUploadAllNew"
      title="导出全部监测数据报表" class="avue-dialog" append-to-body>
      <uploadAllNew v-on:closeUploadAllTest="closeUploadAllNew" :idsData="idsData"></uploadAllNew>
    </el-dialog>
    <!-- 导出多选报表New -->
    <el-dialog :visible.sync="uploadManyNewDiv" v-if="uploadManyNewDiv" width="1000px" @close="closeuploadManyNew"
      title="导出多选监测数据报表" class="avue-dialog" append-to-body>
      <uploadManyNewBox :device-data="deviceData" v-on:closeUploadNew="closeuploadManyNew"></uploadManyNewBox>
    </el-dialog>
    <el-dialog :visible.sync="exportHourDiv" v-if="exportHourDiv" width="1000px" @close="closeExportHour"
      :title="hourOrDay ? '导出时报' : '导出日报'" class="avue-dialog" append-to-body>
      <exportHourPage v-if="hourOrDay" :device-data="deviceData" v-on:closeUploadNew="closeuploadManyNew">
      </exportHourPage>
      <exportDayPage v-else :device-data="deviceData" v-on:closeUploadNew="closeuploadManyNew"></exportDayPage>
    </el-dialog>
    <!-- 导出多选报表 -->
    <el-dialog :visible.sync="uploadManyDiv" v-if="uploadManyDiv" width="1000px" @close="closeUploadMany"
      title="导出监测数据报表" class="avue-dialog" append-to-body>
      <uploadManyBox :device-data="deviceData" v-on:closeUpload="closeUploadMany"></uploadManyBox>
    </el-dialog>
    <!-- 导出原始数据 -->
    <el-dialog :visible.sync="SourceData" v-if="SourceData" width="1000px" @close="closeSourceData" title="导出原始数据"
      class="avue-dialog" append-to-body>
      <uploadSourceData :device-data="deviceData" v-on:closeUpload="closeSourceData"></uploadSourceData>
    </el-dialog>
    <!-- 导出全部报表 -->
    <el-dialog :visible.sync="uploadAllDiv" v-if="uploadAllDiv" width="1000px" @close="closeUploadAll" title="导出监测数据"
      class="avue-dialog" append-to-body>
      <uploadAllBox v-on:closeUploadAll="closeUploadAll" :device-data="deviceData"></uploadAllBox>
    </el-dialog>
    <!-- 详情弹窗 -->
    <el-dialog :visible.sync="isDetail" width="1000px" @close="detailClick" title="设备详情" class="avue-dialog"
      append-to-body>
      <el-tabs @tab-click="handleChange" v-model="activeName">
        <el-tab-pane name="tab1" label="基础信息">
          <Tab1 :tabOption="tabOption" :infoData="infoData" :typeNum="typeNum" style="line-height: 40px"></Tab1>
        </el-tab-pane>
        <!-- <el-row v-show="type.prop == 'tab2'" style="line-height: 40px">
        <el-col :span="12">
          <label class="el-form-item__label">当前版本号:</label>
          {{ tabOption.devVersion || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">采样周期:</label>
          {{ tabOption.samplingPeriod || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">心跳上报周期:</label>
          {{ tabOption.heartbeatEscalationCycle || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">心跳上报最后时间:</label>
          {{ tabOption.heartbeatEscalationLastDateTime || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">模块上报周期:</label>
          {{ tabOption.moduleEscalationCycle || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">位置上报周期:</label>
          {{ tabOption.positionEscalationCycle || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">经度(GPS):</label>
          {{ tabOption.latitudeGps || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">纬度(GPS):</label>
          {{ tabOption.longitudeGps || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">当前电压:</label>
          {{ tabOption.voltage || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">当前电量:</label>
          {{ tabOption.electric || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">当前信号:</label>
          {{ tabOption.signalStrength || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">当前状态:</label>
          {{ tabOption.status || "" }}
        </el-col>
      </el-row> -->
        <el-tab-pane name="tab3" label="更换记录">
          <avue-form ref="form" v-model="logSearchForm" :option="logSearchOption" @submit="searchChange_log"
            @reset-change="searchReset_log">
          </avue-form>
          <avue-crud :option="logOption" :data="logTableData" :page.sync="logPage" @size-change="sizeChange_log"
            @current-change="currentChange_log">
          </avue-crud>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 下发记录 -->
    <el-dialog width="1200px" :visible.sync="isInstructRecordShow" title="指令下发记录" class="avue-dialog"
      @close="handleRecordClose" append-to-body v-if="false">
      <isInstructRecord :devdata="structForm"> </isInstructRecord>
    </el-dialog>

    <!-- 指令下发弹窗 -->
    <el-dialog width="1200px" :visible.sync="isInstructions" title="指令下发" class="avue-dialog" @close="handleCancel"
      append-to-body>
      <isInstruct :devdata="structForm" @handleCancel="handleCancel"></isInstruct>
    </el-dialog>

    <!-- 监测数据弹窗 -->
    <el-dialog class="hide_dialog" lass="data_show" :visible.sync="isMonitor" v-if="isMonitor" @closed="handleEmpty"
      append-to-body :width="typeNum == 6 ? '160vh' : '80%'" :fullscreen="dialogfull" :close-on-click-modal="false">
      <div slot="title" class="dialog-title">
        <span class="title-text">{{typeNum == 6 ? '视频监控' : '监测数据'}}</span>
        <i class="el-icon-full-screen" @click="isfullscreen"></i>
      </div>
      <jianceData v-if="typeNum != 6" :dev-data="devData" dev-dw="false"></jianceData>
      <videoPlayBox v-if="typeNum == 6" :dev-data="devData" dev-video="true"></videoPlayBox>
    </el-dialog>
    <el-dialog :visible.sync="isReplaceEquipment" v-if="isReplaceEquipment" width="800px" @close="rplaceEmpty"
      title="更换设备" class="avue-dialog isReplaceEquipmentDialog" append-to-body>
      <replaceEquipment v-if="replaceFlag"></replaceEquipment>
      <replaceEquipment2 v-if="!replaceFlag"></replaceEquipment2>
    </el-dialog>
    <el-dialog title="定位" :visible.sync="lonLatOpen" v-if=" lonLatOpen" width="1000px" append-to-body>
      <lon-lat :LatAndLon="LatAndLon"></lon-lat>
    </el-dialog>
    <el-dialog :title="normalTitle" :visible.sync="normalShow" v-if="normalShow" width="1000px" append-to-body>
      <normalForm :normalIds="normalIds"></normalForm>
    </el-dialog>
  </div>
</template>

<script>
  import {
    delObj,
    addObj,
    putObj,
    infoPage,
    stallInfo,
    runInfo,
    senerInfo,
    factoryInfo,
    deviceType,
    newDeviceType,
    disasterNameDataType,
    newProjectType,
    factoryType,
    disInfo,
    updateAltitude,
    projectInfo,
    update_device_code_log,
    synchronousSensor,
    mofigPage,
    getCodeData
  } from "@/api/monitorManage/device";
  import {
    baseUrl
  } from "@/config/env";
  import {
    tableOption,
    infoOption,
    curveOption,
    searchOption,
    logOption,
    writeOption,
    logSearchOption
  } from "@/const/crud/monitorManage/deviceList";
  import {
    getArea,
    getBackPageList
  } from "@/api/hideDanger/obj";
  import store from "@/store";
  import isInstruct from "./isInstruct.vue";
  import {
    mapGetters
  } from "vuex";
  import layout from "@/page/index/layout.vue";
  import jianceData from "@/components/jianceData/dialogQuxian";
  import videoPlayBox from "@/components/videoPlayBox/index.vue";
  import uploadManyBox from "./uploadManyBox";
  import uploadSourceData from "./uploadSource";
  import uploadAllBox from "./uploadAllBox";
  import uploadAllNew from "./uploadAllNew";
  import uploadManyNewBox from "./uploadManyNewBox";
  import isInstructRecord from "./isInstructRecord";
  import replaceEquipment from "./replaceEquipment";
  import replaceEquipment2 from "./replaceEquipment2";
  import exportHourPage from "./exportHourPage";
  import exportDayPage from "./exportDayPage";
  import LonLat from "@/components/Location";
  import normalForm from "./normalForm.vue"
  import {
    ToDegrees
  } from "@/util/util";
  import Tab1 from "./detailpage/Tab1";
  import Remand from "./detailpage/remend"
  import {
    deepClone
  } from '../../../util/util';
  export default {
    components: {
      Tab1,
      Remand,
      layout,
      jianceData,
      isInstruct,
      videoPlayBox,
      uploadSourceData,
      uploadManyBox,
      uploadAllBox,
      uploadAllNew,
      uploadManyNewBox,
      isInstructRecord,
      replaceEquipment,
      replaceEquipment2,
      exportHourPage,
      exportDayPage,
      LonLat,
      normalForm
    },
    name: "log",
    props: ["data"],
    data() {
      const validateDeliveryAddressMobile = (rule, value, callback) => {
        //允许为空
        if (!value) {
          callback(new Error('请输入设备编号'))
        } else {
          let timer
          clearTimeout(timer)
          timer = setTimeout(() => {
            getCodeData({
              deviceId: this.tableObj.id,
              projectId: this.projectId,
              deviceCode: value
            }).then(res => {
              if (res.data.data != 0) {
                this.devCode = false;
                callback(new Error('设备编号重复，请重新输入'))
              } else {
                //校验通过
                this.devCode = true;
                callback();
              }
            })
          }, 1000);
        }
      };
      return {
        SourceData: false,
        writeObj: {},
        modify: false,
        writeOption: writeOption,
        writetableData: [],
        writeBox: false,
        lonLatOpen: false,
        LatAndLon: {
          longitude: '',
          latitude: ''
        },
        devCode: true,
        rules: {
          required: true,
          trigger: 'blur',
          validator: validateDeliveryAddressMobile,
        },
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          // projectId: "",
          pageSize: 10, // 每页显示多少条,
          pageSizes: [10, 20, 50, 100, 200],
        },
        writepage: {
          total: 0, // 总页数
          current: 1, // 当前页数
          size: 10, // 每页显示多少条,
        },
        isSave: false,
        idsData: null,
        flag: false,
        uploadManyNewDiv: false,
        uploadAllDivNew: false,
        searchFormStatus: true,
        orderExportList: ["6", "cjz_001", "gnssjzz_001"],
        exportHourDiv: false,
        isEdit: false,
        showFiles: [],
        dialogVisible: false,
        devData: {},
        nbmb: ["NB-Iot", "MQTT", "其他"],
        status: ["在线", "离线"],
        typeNum: "",
        typedicData: [],
        disasterNameData: [],
        projectTypedicData: [],
        sProjectTypedicData: [],
        factorydicData: [],
        factId: 0,
        sensorSource: [0, 1],
        infoObj: {},
        infoData: [], //传感表格内数据-艾
        dialogUrl: false,
        deviceNo: "", //设备编号
        sensorNo: "", //传感器编号
        accuracy: 2, //精度
        // status: 1, //状态
        isNo: false,
        Noobj: {
          disasterCode: "",
          disasterName: ""
        },
        logSearchOption: logSearchOption,
        logSearchForm: {},
        searchForm: {},
        searchOption: searchOption,
        hourOrDay: false,
        offlineDuration: '',
        tableObj: {
          disasterId: "",
          sensorSource: "",
          type: "",
          sensorId: "",
          sensorCode: "",
          disasterCode: "",
          disasterName: "",
          platformSensors: [],
          provinceName: '',
          cityName: '',
          countyName: '',
          streetName: '',
          communityName: ''
        },
        searchobj: {},
        apiimg: "",
        imageUrl: "",
        form: {},
        curveForm: {
          time: 1,
        },
        normalTitle: "异常设置",
        normalShow: false,
        normalIds: null,
        tableData: [],
        logTableData: [],
        logPage: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条,
          pageSizes: [10, 20, 30],
        },
        tableLoading: false,
        tableOption: tableOption,
        infoOption: infoOption, //传感器表格头-艾
        curveOption: curveOption, //监测曲线
        logOption: logOption, //日志表格
        isDetail: false, //详情弹窗
        isInstructions: false, //指令下发弹窗
        isInstructRecordShow: false,
        structForm: {}, //指令下发
        isMonitor: false, //监测数据
        disabledList: [
          "code",
          "type",
          "streetCode",
          "communityCode",
          "disasterName",
        ],
        tabOption: {
          registerAgreementName: "",
        },
        tabOption1: {
          column: [{
              label: "基础信息",
              prop: "tab1",
            },
            // {
            //   label: "运行信息",
            //   prop: "tab2",
            // },
            {
              label: "更换记录",
              prop: "tab3",
            },
          ],
        },
        type: {
          prop: 'tab1'
        },
        activeName: 'tab1',
        selectionData: [],
        uploadManyDiv: false,
        deviceData: [],
        dialogfull: false,
        uploadAllDiv: false,
        isReplaceEquipment: false,
        replaceFlag: false,
        currentDetailsDeviceId: "",
        edit: false,
        oldSubProjectId: null,
        props: {
          lazy: true,
          checkStrictly: true,
          expandTrigger: 'hover',
          async lazyLoad(node, resolve) {
            const {
              level
            } = node;
            if (level == 0) {
              const {
                data
              } = await getArea(0); //获取省接口
              var nodes = data.data.map(item => {
                return {
                  value: item.code,
                  label: item.name,
                  longitude: item.longitude,
                  latitude: item.latitude,
                  leaf: false
                };
              });
              resolve(nodes);
            } else if (level == 1) {
              const {
                data
              } = await getArea(node.data.value); //获取市接口
              var nodes = data.data.map(item => {
                return {
                  value: item.code,
                  label: item.name,
                  longitude: item.longitude,
                  latitude: item.latitude,
                  leaf: false
                };
              });
              resolve(nodes);
            } else if (level == 2) {
              const {
                data
              } = await getArea(node.data.value); //获取区/县接口
              var nodes = data.data.map(item => {
                return {
                  value: item.code,
                  label: item.name,
                  leaf: false
                };
              });
              resolve(nodes);
            } else if (level == 3) {
              const {
                data
              } = await getArea(node.data.value); //获取区/县接口
              var nodes = data.data.map(item => {
                return {
                  value: item.code,
                  label: item.name,
                  leaf: false
                };
              });
              resolve(nodes);
            } else if (level == 4) {
              const {
                data
              } = await getArea(node.data.value); //获取区/县接口
              var nodes = data.data.map(item => {
                return {
                  value: item.code,
                  label: item.name,
                  leaf: true
                };
              });
              resolve(nodes);
            } else if (level == 5) {
              // that.$refs.cascaderDev.dropDownVisible = false;
              document.querySelectorAll('.el-icon-loading').forEach(e => {
                e.style.display = 'none'
              })
            }
          }
        }
      };
    },
    computed: {
      ...mapGetters(["permissions", "access_token", "projectId"]),
      headers: function () {
        return {
          Authorization: "Bearer " + store.getters.access_token
        };
      },
    },
    watch: {
      projectId: {
        immediate: true,
        handler(val, oVal) {
          window.sessionStorage.setItem("projectId", val);
          if (val !== 0 && val) {

            this.getSelect()
            this.$nextTick(() => {
              this.$refs.crud.toggleSelection();
              this.$refs.form.resetForm();
              this.getList(this.page, {
                projectId: val
              });

              this.tableOption.column.forEach((cols) => {
                if (cols.prop == "disasterName") {
                  cols.dicUrl = `/monitor_base_info/page?projectId=${val}&communityCode={{key}}&size=-1`;
                }
                if (cols.prop == "disasterCode" || cols.prop == "disasterId") {
                  if (this.$refs.crud) {
                    this.searchForm = {}
                    this.$nextTick(() => {
                      this.searchReset();
                    })
                    cols.dicUrl =
                      `/monitor_base_info/getMonitorInfoByCode?projectId=${val}&monitorCode={{key}}&size=-1`;
                    this.$refs.crud.init();
                  }
                }
              });
              this.infoOption.column.forEach((cols) => {
                if (cols.prop == "sensorCode") {
                  cols.dicUrl =
                    `/device/viewsensor/sensorListByAddDevice?projectId=${val}&size=-1&type={{key}}&size=-1`;
                }
                if (cols.prop == "sensorId") {
                  cols.dicUrl = `/device/viewsensor/page?projectId=${val}&sensorCode={{key}}&size=-1`;
                }
              });
            })
          }
          if (val && val != 0) {
            this.getSelect()
          }
        },
        deep: true,
      },
      "tableObj.disasterName": {
        immediate: true,
        handler(val, oVal) {
          if (val) {
            // this.tableObj.disasterCode = val;
            this.disasterNameData.forEach(item => {
              if (item.monitorCode == val) {
                this.tableObj.disasterName = item.monitorName;
                this.tableObj.disasterId = item.id;
                this.tableObj.disasterCode = item.monitorCode;
              }
            })
            // console.log(val);
            getBackPageList({
              monitorCode: val,
              projectId: this.projectId
            }).then(v => {
              let res = v.data.data.records[0];
              if (res) {
                this.tableObj.provinceName = res.provinceName || ''
                this.tableObj.provinceCode = res.provinceCode || ''
                this.tableObj.cityName = res.cityName || ''
                this.tableObj.cityCode = res.cityCode || ''
                this.tableObj.countyName = res.countyName || ''
                this.tableObj.countyCode = res.countyCode || ''
                this.tableObj.streetName = res.streetName || ''
                this.tableObj.streetCode = res.streetCode || ''
                this.tableObj.communityName = res.communityName || ''
                this.tableObj.communityCode = res.communityCode || ''
                this.tableObj.cascader = res.provinceName + res.cityName + res.countyName + res.streetName + res
                  .communityName
                this.tableObj.location = this.tableObj.cascader
              }
            })
          } else {
            this.tableObj.cascader = '',
              this.tableObj.location = ''
          }
        },
        deep: true,
      }
    },
    mounted() {
      this.type.prop = "tab1";
      setTimeout(() => {
        this.loading = false;
      }, 2000);
      this.getList()
      setInterval(function () {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            if (this.previousElementSibling) this.previousElementSibling.click()
          }
        })
      }, 200)
    },
    created() {
      this.$bus.$off("getPoints");
      this.$bus.$on("getPoints", (points) => {
        if (points) {
          let longitude = Number(points.longitude);
          let latitude = Number(points.latitude);
          this.$nextTick(() => {
            this.tableObj.longitude = longitude.toFixed(6);
            this.tableObj.latitude = latitude.toFixed(6);
            this.tableObj.location = points.province + points.city + points.district + points.street + points
              .streetNumber
          });
          this.lonLatOpen = false;
        }
      })
      this.factId = this.$route.query.id || 0;
      this.getFact();
      this.getSelect()
    },

    methods: {
      noBlur(event) {
        console.log(event, 'event');
      },
      visibleChange() {
        document.querySelectorAll('.el-icon-loading').forEach(e => {
          e.style.display = 'none'
        })
      },
      isfullscreen() {
        this.dialogfull = !this.dialogfull;
        console.log("全屏");
      },
      getSelect() {
        newDeviceType({
          projectId: this.projectId
        }).then(v => {
          this.typedicData = v.data.data;
        })
        newProjectType({
          projectId: this.projectId
        }).then(v => {
          this.projectTypedicData = v.data.data;
        })
        newProjectType({
          projectId: this.projectId,
          state: 0
        }).then(v => {
          this.sProjectTypedicData = v.data.data;
        })
        factoryType({
          projectId: this.projectId
        }).then(v => {
          this.factorydicData = v.data.data;
        })
        disasterNameDataType({
          projectId: this.projectId,
          size: "-1"
        }).then(v => {
          this.disasterNameData = v.data.data.records;
        })

      },
      rowCell(row, index) {
        this.$refs.infoForm.rowCell(row, index);
      },
      rowEdit1(row, index, done, loading) {
        let that = this;
        loading();
        that.infoData[index] = row;
        that.$refs.infoForm.init();
        done();
      },
      async getListWrite(page, params, form) {
        await mofigPage({
          current: page.currentPage,
          size: page.pageSize,
          sensorId: params,
          ...form
        }).then(v => {
          if (v.data.data.records) {
            this.writeBox = true;
            this.writetableData = v.data.data.records
            this.writepage.total = v.data.data.total;
          }
        })
      },

      writeBtn(row) {
        if (row.id) {
          this.sensorId = row.id;
          this.getListWrite(this.writepage, row.id, )
        } else {
          this.$message.warning("该传感器暂无修改记录")
        }
      },

      closeWriteBox() {
        this.writeBox = false
      },
      // 定位
      async getLocation() {
        if (this.tableObj.longitude && this.tableObj.latitude) {
          this.LatAndLon.longitude = this.tableObj.longitude
          this.LatAndLon.latitude = this.tableObj.latitude
        }
        this.lonLatOpen = true
      },

      toDegrees(val) {
        if (!val) {
          return;
        }
        return ToDegrees(val + "");
      },
      getList(page, params) {
        this.tableLoading = true;
        infoPage(
          Object.assign({
              current: this.page.currentPage,
              size: this.page.pageSize,
              projectId: this.projectId,
              ...this.form,
            },
            params
          )
        ).then((response) => {
          this.tableData = response.data.data.records;
          this.tableData.map((v) => {
            if (v.sensorType) {
              v.sensorType = v.sensorType.split(",");
              return v.sensorType;
            }
          });
          this.page.total = response.data.data.total;
          this.tableLoading = false;
        });
      },
      exportDay() {
        if (this.selectionData.length > 0) {
          this.exportHourDiv = true;
          this.hourOrDay = false;
          this.deviceData = [];
          for (var i = 0; i < this.selectionData.length; i++) {
            this.deviceData.push(this.selectionData[i].id);
          }
        } else {
          this.exportHourDiv = true;
          this.hourOrDay = false;
          this.deviceData = this.page.total
        }
      },
      exportSourceData() {
        if (this.selectionData.length > 0) {
          this.SourceData = true;
          this.deviceData = [];
          for (var i = 0; i < this.selectionData.length; i++) {
            this.deviceData.push(this.selectionData[i].id);
          }
        } else {
          this.SourceData = true;
          this.deviceData = this.page.total
        }
      },
      closeSourceData() {
        this.SourceData = false;
      },
      exportHour() {
        if (this.selectionData.length > 0) {
          this.exportHourDiv = true;
          this.hourOrDay = true;
          this.deviceData = [];
          for (var i = 0; i < this.selectionData.length; i++) {
            this.deviceData.push(this.selectionData[i].id);
          }
        } else {
          this.exportHourDiv = true;
          this.hourOrDay = true;
          this.deviceData = this.page.total
        }
      },
      closeExportHour() {
        this.exportHourDiv = false;
      },
      uploadMany() {
        //导出多选
        if (this.selectionData.length > 0) {
          this.uploadManyDiv = true;
          this.deviceData = [];
          for (var i = 0; i < this.selectionData.length; i++) {
            this.deviceData.push(this.selectionData[i].id);
          }
        } else {
          this.deviceData = this.page.total
          this.uploadManyDiv = true;
          // this.$message({
          //   type: "warning",
          //   message: "请选择需要导出报表的设备",
          // });
        }
      },
      closeUploadMany() {
        this.uploadManyDiv = false;
      },
      uploadAll() {
        if (this.selectionData.length > 0) {
          this.uploadAllDiv = true;
          this.deviceData = [];
          for (var i = 0; i < this.selectionData.length; i++) {
            this.deviceData.push(this.selectionData[i].id);
          }
        } else {
          this.uploadAllDiv = true;
          this.deviceData = this.page.total
        }
        //导出全部
        // this.uploadAllDiv = true;
      },
      closeUploadAll() {
        this.uploadAllDiv = false;
      },
      uploadAllNewDiv() {
        this.uploadAllDivNew = true;
        this.idsData = this.getSelectionDataId();
      },
      closeUploadAllNew() {
        this.uploadAllDivNew = false;
      },
      uploadManyNew() {
        if (this.selectionData.length > 0) {
          this.uploadManyNewDiv = true;
          var loadArray = [];
          for (var i = 0; i < this.selectionData.length; i++) {
            loadArray.push(this.selectionData[i].id);
          }
          this.deviceData = loadArray;
        } else {
          this.$message({
            type: "warning",
            message: "请选择需要导出的设备",
          });
        }
      },
      closeuploadManyNew() {
        this.uploadManyNewDiv = false;
      },
      beforeClose(done, type) {
        if (type && type == "add") {
          setTimeout(() => {
            let self = this; //防止取不到this
            for (let key in self.tableObj) {
              self.tableObj[key] = undefined;
            }
            done();
          }, 500);
        } else if (type == "edit") {
          // this.tableObj = {};
          done();
        }
      },
      searchChange_log(form, done) {
        this.$set(form, 'beginTime', form.ationTime[0]);
        this.$set(form, 'endTime', form.ationTime[1]);
        delete form.ationTime;
        this.logPage.currentPage = 1;
        this.logGitData(this.logPage, form);
        done();
      },
      searchReset_log() {
        this.logPage.currentPage = 1;
        this.logGitData(this.logPage);
      },
      detailClick() {
        this.isDetail = false;
      },
      AddMenu(index) {
        this.$refs.infoForm.rowAdd();
      },
      /** 批量删除操作-艾 */
      handleDelete() {
        if (this.infoData.lenght === 0) {
          this.$message.warning("请选择大于一条数据");
          return;
        }
        this.$confirm(`确认删除选中的${this.infoData.length}条数据?`, "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            return (this.infoData = []);
          })
          .then(() => {
            this.refreshChange();
            this.$message.success("删除成功");
          })
          .catch(function () {});
      },
      /** 同步中台设备-艾 */
      handleSync() {
        this.$confirm(`确认同步设备编号获取中台该设备的信息?`, "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            this.tableoading = true;
            if (this.tableObj.code) {
              getCodeData({
                deviceId: this.tableObj.id,
                projectId: this.projectId,
                deviceCode: this.tableObj.code
              }).then(res => {
                if (res.data.data != 0) {
                  this.devCode = false;
                } else {
                  //校验通过
                  this.devCode = true;
                }
              })
              if (this.devCode == true) {
                synchronousSensor({
                    deviceNo: this.tableObj.code,
                    projectId: this.projectId,
                    // deviceNo:"1F1101100000124E",
                    // projectId:33,
                  })
                  .then((res) => {
                    if (this.infoData.length < 1) {
                      res.data.data.forEach(v => {
                        v.accuracy ? v.accuracy : (v.accuracy = 2);
                        v.state ? v.state : (v.state = 1);
                      })
                      let newList = this.infoData.map(item => item.sensorCode)
                      let arr = []
                      arr = this.infoData
                      arr = res.data.data.filter(item => {
                        return !newList.includes(item.sensorCode)
                      })
                      this.infoData = this.infoData.concat(arr);
                      this.infoData.forEach((item) => {
                        // item.accuracy ? item.accuracy : (item.accuracy = 2);
                        item.$cellEdit = true;
                      });
                      this.refreshChange();
                      this.$message.success(`同步成功，已同步${res.data.data.length}个传感器`);
                      this.tableLoading = false;
                    } else {
                      function getArrEqual(arr1, arr2) {
                        let newArr = [];
                        for (let i = 0; i < arr2.length; i++) {
                          for (let j = 0; j < arr1.length; j++) {
                            if (arr1[j].sensorCode === arr2[i].sensorCode) {
                              newArr.push(arr1[j]);
                            }
                          }
                        }
                        return newArr;
                      }
                      let newArr = getArrEqual(this.infoData, res.data.data);
                      if (newArr.length == res.data.data.length) {
                        this.$message.error("该设备已无新传感器需要同步");
                      } else if (newArr.length > 0 && newArr.length != res.data.data.length) {
                        res.data.data.forEach(v => {
                          v.accuracy ? v.accuracy : (v.accuracy = 2);
                          v.state ? v.state : (v.state = 1);
                        })
                        let newArray = newArr.map(item => item.sensorCode)
                        let newArray2 = res.data.data.filter(item => {
                          return !newArray.includes(item.sensorCode)
                        })
                        let newList = this.infoData.map(item => item.sensorCode)
                        let arr = []
                        arr = this.infoData
                        arr = newArray2.filter(item => {
                          return !newList.includes(item.sensorCode)
                        })
                        this.infoData = this.infoData.concat(arr);
                        this.infoData.forEach((item) => {
                          item.$cellEdit = true;
                        });
                        this.refreshChange();
                        this.$message.success(`同步成功，已同步${newArray2.length}个传感器`);
                        this.tableLoading = false;
                      } else {
                        res.data.data.forEach(v => {
                          v.accuracy ? v.accuracy : (v.accuracy = 2);
                          v.state ? v.state : (v.state = 1);
                        })
                        let newList = this.infoData.map(item => item.sensorCode)
                        let arr = []
                        arr = this.infoData
                        arr = res.data.data.filter(item => {
                          return !newList.includes(item.sensorCode)
                        })
                        this.infoData = this.infoData.concat(arr);
                        this.infoData.forEach((item) => {
                          item.$cellEdit = true;
                        });
                        this.refreshChange();
                        this.$message.success(`同步成功，已同步${res.data.data.length}个传感器`);
                        this.tableLoading = false;
                      }
                    }

                  })
                  .catch(() => {
                    this.tableLoading = false;
                  });
              } else {
                this.$message.error("设备编号重复，同步失败");
              }
            } else {
              this.$message.error("请输入要同步的设备编码和设备类型");
            }
          })
          .catch(function () {});
      },
      getFact() {
        if (this.factId) {
          factoryInfo({
            id: this.factId
          }).then((v) => {
            this.searchobj.factoryName = v.data.data.records[0].name;
            infoPage(
              Object.assign({
                current: this.page.currentPage,
                size: this.page.pageSize,
                factoryName: this.searchobj.factoryName,
                projectId: this.projectId,
              })
            ).then((response) => {
              this.tableData = response.data.data.records;
              this.page.total = response.data.data.total;
            });
          });
        } else {
          infoPage(
            Object.assign({
              current: this.page.currentPage,
              size: this.page.pageSize,
              factoryName: this.searchobj.factoryName,
              projectId: this.projectId,
            })
          ).then((response) => {
            this.tableData = response.data.data.records;
            this.page.total = response.data.data.total;
          });
        }
      },
      rowecl() {
        this.$refs.crud.rowExcel();
      },
      //新增
      rowAdd() {
        this.tableOption.column.forEach((cols) => {
          if (cols.prop == "disasterCode" || cols.prop == "disasterId") {
            cols.dicUrl =
              `/monitor_base_info/getMonitorInfoByCode?projectId=${this.projectId}&monitorCode={{key}}&size=-1`;
            this.$refs.crud.init();
          }
        })
        this.infoOption.selection = true;
        this.$refs.crud.rowAdd();
        this.modify = false;
        this.edit = false
        this.tableOption.clearable = true;
        this.tableObj = {};
        this.infoData = [];
        this.infoObj = {};
        this.offlineDuration = '120'
        this.tableOption.column.forEach((e) => {
          this.disabledList.indexOf(e.prop) != -1 && (e.disabled = false);
          // this.disabledList.indexOf(e.label) != -1 && (e.disabled = false); //艾
        });

        deviceType().then((v) => {
          //设备类型
          this.typedicData = v.data.data.data;
        });
        // this.infoOption.disabled = false;
      },

      handleEmpty: function () {
        this.devData = {};
      },
      // //新增上传
      // handleAvatarSuccess(file, fileList) {
      //   this.dialogVisible = true;
      //   // console.log(this.imageUrl);
      // },
      // handleSuccess(file, fileList) {
      //   this.tableObj.qrCode = file.data.infos[0].id;
      //   this.imageUrl = file.data.infos[0].url;
      //   this.isurl = false;
      //   // console.log(this.imageUrl);
      // },
      // handleRemove(file) {
      //   this.imageUrl = "";
      //   this.tableObj.qrCode = "";
      //   this.isurl = true;
      // },
      // handleAvatar(file, fileList) {
      //   // console.log(file, fileList);
      // },

      logGitData(page, params) {
        update_device_code_log(Object.assign({
          deviceId: this.currentDetailsDeviceId,
          size: this.logPage.pageSize,
          current: this.logPage.currentPage,
        }, params)).then((res) => {
          this.logTableData = res.data.data.records;
          this.logPage.total = res.data.data.total;
        });
      },
      sorDel(row) {
        //删除选择的子表格
        this.$confirm("是否确认删除本条的数据吗?", "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            this.infoData.splice(row.$index, 1);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
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
      subProChange(e) {
        this.oldSubProjectId = e;
        if (!e) {
          this.oldSubProjectId = null;
          this.tableObj.subProjectName = null;
        }
      },
      // 详情
      handleDetail(data) {
        this.modify = true;
        this.infoOption.selection = false;
        this.activeName = 'tab1';
        this.typeNum = data.row.type;
        stallInfo(data.row.id).then((v) => {
          this.tabOption = v.data.data;
          this.tabOption.registerAgreementName =
            this.nbmb[this.tabOption.registerAgreement];
          this.tabOption.status = this.status[this.tabOption.status];
          setTimeout((v) => {
            this.isDetail = true;
          }, 100);
          setTimeout((v) => {
            this.tabOption.factoryId ?
              (this.tabOption.factoryId = this.tabOption.factoryName) :
              "";
            if (this.tabOption.projectId) {
              projectInfo({
                id: this.projectId
              }).then((v) => {
                this.tabOption.projectId = v.data.data[0].projectName;
              });
            }
            deviceType().then((w) => {
              w.data.data.map((v) => {
                if (this.tabOption.type == v.value) {
                  this.tabOption.type = v.label;
                }
              });
            });
          }, 500);
        });
        senerInfo({
          deviceId: data.row.id,
          projectId: this.projectId
        }).then(
          (v) => {
            this.infoData = v.data.data;

          }
        );
        runInfo(data.row.id).then((v) => {
          if (v.data) {
            this.tabOption = Object.assign(this.tabOption, v.data.data);
          }
        });
        this.currentDetailsDeviceId = data.row.id;
        this.logGitData();
      },

      // 详情tab切换
      handleChange(tab, event) {
        this.tabIndex = tab.index;
      },
      rplaceEmpty() {
        this.isReplaceEquipment = false;
        this.getList();
      },
      // 批量删除
      handleBatchDelete() {
        let idList = this.getSelectionDataId();
        if (idList.length == 0) {
          this.$message.warning("请选择需要删除的数据");
          return idList;
        }
        this.$confirm("是否确认删除当前选中的数据？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(function () {
            return delObj({
              idList: idList.join()
            });
          })
          .then((data) => {
            this.$message.success("删除成功");
            this.refreshChange();
            this.$nextTick(() => {
              this.$refs.crud.selectClear();
            })
          });
      },
      // rowDelete删除
      rowDelete(row) {
        this.$confirm("是否确认删除当前选中的数据？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(function () {
            return delObj({
              idList: row.id
            });
          })
          .then((data) => {
            this.$message.success("删除成功");
            this.refreshChange();
            this.$nextTick(() => {
              this.$refs.crud.selectClear();
            })
          });
      },
      handleInstructionsRecord() {
        let idList = this.getSelectionDataId();
        this.selectionData.forEach((item) => {
          if (item.type == "6" || item.type == "cjz_001") {
            this.$message.warning("该类型不能下发指令");
            return;
          }
        });
        if (idList.length == 0) {
          this.$message.warning("没有数据不能下发指令,请选择数据");
          return;
        } else if (idList.length == 1) {
          this.isInstructRecordShow = true;
          this.structForm = this.selectionData;
        } else {
          this.$message.warning("仅能一条数据下发指令");
        }
        // this.isInstructRecordShow = true;
      },
      // 指令下发
      handleInstructions() {
        let idList = this.getSelectionDataId();
        this.selectionData.forEach((item) => {
          if (item.type == "6" || item.type == "cjz_001") {
            this.$message.warning("该类型不能下发指令");
            return;
          }
          if (idList.length == 0) {
            this.$message.warning("没有数据不能下发指令,请选择数据");
            return;
          } else if (idList.length == 1) {
            this.isInstructions = true;
            this.structForm = this.selectionData;
          } else {
            this.$message.warning("仅能一条数据下发指令");
          }
        });
      },
      replaceEquipmentClick() {
        if (this.selectionData.length == 0) {
          // this.$message.warning("请选择设备进行 更换设备编号！");
          this.isReplaceEquipment = true;
          this.replaceFlag = false;
          // return;
        } else if (this.selectionData.length == 1) {
          this.isReplaceEquipment = true;
          this.replaceFlag = true;
        } else {
          this.$message.warning("仅能对单个设备进行 更换设备编号");
        }
      },
      // 取消
      handleCancel(data) {
        this.isInstructions = false;
        this.structForm = [];
      },
      handleRecordClose() {
        this.isInstructRecordShow = false;
      },
      // 编辑
      handleEdit(row, index) {
        this.modify = true;
        this.edit = true;
        this.imageUrl = "";
        this.infoOption.menu = true;
        this.infoOption.selection = true;
        this.typeNum = row.type;
        this.tableOption.column.forEach((cols) => {
          if (cols.prop == "disasterCode" || cols.prop == "disasterId") {
            cols.dicUrl =
              `/monitor_base_info/getMonitorInfoByCode?projectId=${this.projectId}&monitorCode={{key}}&size=-1`;
            this.$refs.crud.init();
          }
        })
        if (row) {
          row.cascader = this.tableObj.cascader
          stallInfo(row.id).then((v) => {
            row = v.data.data;
            this.oldSubProjectId = deepClone(row.subprojectId);
            if (row.subProjectStatus == 2) {
              row.subProjectFlag = v.data.data.subprojectId;
              row.subprojectId = v.data.data.subProjectName;
            }

            row.videoOperable = row.videoOperable * 1;
            this.tableObj.type = row.type;
            if(row.offlineDuration){
              this.offlineDuration = row.offlineDuration;
            }else{
              this.offlineDuration = '120';
            }
            deviceType().then((w) => {
              this.typedicData = w.data.data;
            });
            row.cascader = (row.provinceName + row.cityName + row.countyName + row.streetName + row
              .communityName) || '';
            row.subprojectId = row.subProjectName;
            this.tableObj.subprojectId = row.subProjectName;
            this.$refs.crud.rowEdit(row, index);
          });
          senerInfo({
            deviceId: row.id,
            projectId: this.projectId
          }).then((v) => {
            this.infoData = v.data.data;
          });
        }
      },
      // 编辑提交
      handleUpdate: async function (row, index, done, loading) {
        loading();
        this.tableObj.platformSensors = this.infoData
        this.tableObj.sensorSource = 1

        if (row.subProjectFlag) {
          row.subprojectId = row.subProjectFlag;
          this.tableObj.subprojectId = row.subProjectFlag;
          delete row.subProjectFlag;
          delete this.tableObj.subProjectFlag;
        }
        row.subprojectId = deepClone(this.oldSubProjectId);
        this.tableObj.subprojectId = deepClone(this.oldSubProjectId);
        let newRow = Object.assign(row, this.tableObj, {
          offlineDuration: this.offlineDuration
        });
        putObj(newRow).then((v) => {
          if (v.data.code == 0) {
            this.$message.success("修改成功");
            done();
            this.tableObj = {};
            this.refreshChange();
            this.infoData = [];
            this.getList(this.page, {
              projectId: this.projectId
            });
          } else {
            this.$message.error("修改失败");
          }
        });
      },
      // 新增提交
      async handleSave(row, done, loading) {
        loading();
        if (
          this.infoData.length == 0 &&
          row.type != 6 &&
          row.type != "bjq_001" &&
          row.type != "cjz_001" &&
          row.type != "gnssjzz_001"
        ) {
          this.$message.error("请添加至少一个传感器");
          return;
        } else {
          this.tableObj.platformSensors = this.infoData
          // row.projectId = this.projectId;
          this.tableObj.sensorSource = 1
          let newRow = Object.assign(row, this.tableObj, {
            offlineDuration: this.offlineDuration,
            projectId: this.projectId
          });
          addObj(newRow).then((data) => {
            if (data.data.code == 0) {
              done();
              this.$message.success("新增成功");
              this.tableObj = {};
              this.infoData = [];
              this.getList(this.page, {
                projectId: this.projectId
              });
            } else {
              this.$message.error("新增失败");
            }
          });
        }
      },
      //子新增表格
      async rowSave1(row, done, loading) {
        loading();
        if (row.$cellEdit) {
          done();
          return;
        } else {
          if (this.infoData.length > 0) {
            let flag = false;
            this.infoData.forEach(item => {
              if (row.sensorCode == item.sensorCode) {
                flag = false;
                this.$message.error("该传感器类型下传感器编号已存在,请勿重复选择！");
              } else {
                flag = true;
              }
            })
            if (flag == true) {
              this.infoData.push(row);
            }
          } else {
            this.infoData.push(row);
          }
        }
        done();
      },
      // 设备异常设置
      handleNormal(data) {
        if (data.row) {
          this.normalTitle = "异常设置";
          this.normalIds = String(data.row.id);
          this.normalShow = true;
        } else {
          if (this.selectionData.length == 0) {
            this.$message.warning("请选择设备进行设置！");
          } else {
            this.normalIds = this.selectionData.map(item => item.id);
            this.normalTitle = `异常设置(${this.selectionData.length})`;
            this.normalShow = true;
          }
        }
      },
      // 监测数据类型
      handleMonitor(data) {
        this.isMonitor = true;
        if (data.row.type == "bjq_001" || data.row.type == "cjz_001") {
          this.$message.warning("智能报警器没有监测数据");
          this.isMonitor = false;
        }
        if (data.row.type == "gnssjzz_001") {
          this.$message.warning("gnss基准站没有监测数据");
          this.isMonitor = false;
        }
        // console.log(data.row);
        // if(data.row.sensorType == null){
        //   this.$message.warning("该设备未绑定传感器");
        //   this.isMonitor = false;
        // }
        if (data.row.type == 6) {
          this.typeNum = data.row.type;
          setTimeout(() => {
            this.devData = {
              row: data.row,
            };
          }, 0);
        } else {
          this.devData.row = data.row;
          this.typeNum = data.row.type;
        }
      },

      searchChange(form, done) {
        if (form.cascader) {
          form.cascader[4] ? form.communityCode = form.cascader[4] : form.communityCode = "";
          form.cascader[3] ? form.streetCode = form.cascader[3] : form.streetCode = "";
          form.cascader[2] ? form.county = form.cascader[2] : form.county = "";
          form.cascader[1] ? form.city = form.cascader[1] : form.city = "";
          form.cascader[0] ? form.province = form.cascader[0] : form.province = "";
          delete form.cascader
        }
        if (this.orderExportList.indexOf(form.type) !== -1) {
          this.searchFormStatus = false;
        } else {
          this.searchFormStatus = true;
        }
        this.tableLoading = true;
        this.page.currentPage = 1;
        form.sensorType_or_like = form.sensorType;
        delete form.sensorType;
        this.form = form;
        this.getList(this.page, this.form, {
          projectId: this.projectId
        });
        done();
      },
      searchReset(form, page) {
        this.form = {};
        this.searchForm = {}
        this.searchFormStatus = true;
        this.page.currentPage = 1;
        this.page.pageSize = 20;
        this.getList(this.page, this.form);
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
        this.getList(this.page, this.form);
      },
      currentChange(current) {
        this.page.currentPage = current;
        this.getList(this.page, this.form);
      },
      sizeChange_log(pageSize) {
        this.logPage.pageSize = pageSize;
        this.logGitData();
      },
      currentChange_log(current) {
        this.logPage.currentPage = current;
        this.logGitData();
      },
      refreshChange() {
        this.getList(this.page, this.form);
      },
      setHeight() {
        if (this.selectionData.length == 0) {
          this.$message.warning("请选择数据");
        } else {
          this.$prompt("请输入高度", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /^[0-9]*$/,
            inputErrorMessage: "请输入数字",
            inputValue: this.selectionData[0].altitude,
            closeOnClickModal: false,
          }).then(({
            value
          }) => {
            let ids = [];
            this.selectionData.forEach((e) => {
              ids.push(e.id);
              e.altitude = value * 1;
            });
            updateAltitude({
              deviceIds: ids,
              altitude: value * 1,
            }).then((e) => {
              this.$message("设置成功");
              this.getList(this.page, this.form);
            });
          });
        }
      },
    },
  };

</script>

<style lang="scss" scoped>
  .el-tabs {
    padding: 10px 50px;
  }

  ::v-deep.hide_dialog {
    .el-dialog__body {
      padding-top: 30px !important;
    }
  }

  .el-cascader-panel .el-radio {
    width: 132px;
    height: 34px;
    line-height: 34px;
    padding: 0 10px;
    z-index: 10;
    position: absolute;
  }

  .el-cascader-panel .el-radio__input {
    visibility: hidden;
  }

  .el-cascader-panel .el-cascader-node__postfix {
    top: 10px;
  }

  .el-textarea {
    border: 1px solid #f0f0f0;
  }

  .el-form-item__label {
    width: 130px;
  }

  .inst-inp {
    .el-checkbox {
      font-weight: bold !important;
    }
  }

  .quick-query {
    span {
      margin: 0 5px;
    }
  }

  .inst-form {
    ::v-deep.el-input__inner {
      padding: 5px;
    }
  }

  .quick-active {
    color: #409eff;
  }

  .spanp {
    ::v-deepdiv.el-upload.el-upload--picture-card {
      display: none !important;
    }
  }

  .isReplaceEquipmentDialog {
    ::v-deep.el-dialog__body {
      padding: 0 20px;
    }
  }

  ::v-deep.el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*height:600px;*/
    max-height: calc(100% - 200px);
    max-width: calc(100% - 30px);
  }

</style>
