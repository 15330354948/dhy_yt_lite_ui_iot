<template>
  <div class="log">
    <basic-container>
      <!-- @on-load="getList" -->
      <avue-crud ref="crud" v-model="objdata" :page.sync="page" :data="tableData" :table-loading="tableLoading"
        :option="tableOption" @search-change="searchChange" @search-reset="handlereset" @refresh-change="refreshChange"
        @size-change="sizeChange" @current-change="currentChange" @row-update="handleUpdate" @row-save="handleSave"
        @selection-change="selectionChange">
        <template slot="menuLeft">
          <el-button @click="handleCreate" class="filter-item" type="primary" icon="el-icon-plus"
            v-if="permissions['generator_professionalsensor_add']">新增
          </el-button>
          <el-button @click="handleAbnormalEdit" type="primary" icon="el-icon-edit"
            v-if="permissions['generator_professionalsensor_del']">异常判断批量设置
          </el-button>
          <el-button @click="handleBatchDelete" type="danger" icon="el-icon-delete"
            v-if="permissions['generator_professionalsensor_del']">批量删除
          </el-button>

          <!-- <el-button @click="handleBatchYujin" type="primary"
            v-if="permissions['generator_professionalsensor_gjyz_setup']">批量告警阈值设置
          </el-button> -->

          <!-- <el-button @click="handlePlChuzhi" type="primary"
            v-if="permissions['generator_professionalsensor_start_value_setup']">批量数据初值设置
          </el-button> -->
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button @click.stop="handleEdit(scope.row, scope.index)" size="small" type="text" icon="el-icon-edit"
            v-if="permissions['generator_professionalsensor_edit']">编辑
          </el-button>
          <el-button @click.stop="rowDel(scope.row, scope.index)" size="small" type="text" icon="el-icon-delete"
            v-if="permissions['generator_professionalsensor_del']">删除
          </el-button>
          <el-button @click="handleView(scope.row, scope.index)" icon="el-icon-view" class="none-border" size="small"
            type="text" v-if="permissions['generator_professionalsensor_info']">查看</el-button>
          <el-button @click="handleMonitor(scope)" size="small" type="text"
            v-if="permissions['generator_professionalsensor_monitoring_data']">监测数据</el-button>
          <el-button @click="handleAbnormal(scope)" size="small" type="text"
            v-if="permissions['generator_professionalsensor_monitoring_data'] && scope.row.sensorType!=='l4_dx'">异常判断设置
          </el-button>
          <el-button @click="handelDelData(scope.row)" size="small" type="text"
            v-if="permissions['generator_professionalsensor_monitoring_data']">删除监测数据
          </el-button>
          <!-- <el-button v-if="
              scope.row.sensorType == 'l1_lf' ||
              scope.row.sensorType == 'l1_js' ||
              scope.row.sensorType == 'l1_qj' ||
              scope.row.sensorType == 'l3_yl' ||
               scope.row.sensorType == 'l1_gp' ||
              (scope.row.sensorType == 'l1_wy' &&
                permissions['generator_professionalsensor_error_config_get'])
            " @click="handlError(scope.row)" size="small" type="text">数据异常设置</el-button> -->
          <!-- <el-button v-if="
              scope.row.sensorType == 'l1_lf' ||
              scope.row.sensorType == 'l1_js' ||
              scope.row.sensorType == 'l1_qj' ||
              scope.row.sensorType == 'l1_sw' ||
              scope.row.sensorType == 'l3_yl' ||
              scope.row.sensorType == 'l1_gp' ||
              (scope.row.sensorType == 'l1_wy' &&
                permissions['generator_professionalsensor_error_config_update'])
            " @click="handlYujin(scope.row)" size="small" type="text">告警阈值设置</el-button> -->
          <el-button @click="nodeSetup(scope.row)" size="small" type="text" v-if="scope.row.sensorType == 'l1_sw'">节点设置
          </el-button>
        </template>
        <template slot="disasterCodeForm">
          <avue-select v-model="objdata.disasterCode" :props="propdis" :disabled="disabled23" placeholder="请选择内容"
            type="tree" :dic="disData" @change="disChange"></avue-select>
        </template>
        <template slot="disasterNameForm">
          <el-input placeholder="请输入内容" v-model="objdata.disasterName" :disabled="true">
          </el-input>
        </template>

        <template slot="initTypeForm">
          <el-select v-model="objdata.initType" placeholder="请选择初始值设置" :disabled="disabled23" @change="InitValChange">
            <el-option v-for="(item,index) in initOptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
      </avue-crud>

      <!-- 深部位移节点设置 -->
      <el-dialog :visible.sync="nodeShow" v-if="nodeShow" title="节点设置" class="avue-dialog" append-to-body>
        <el-transfer v-model="nodeValue" :data="nodeData" :titles="['未选择', '已选择']">
        </el-transfer>
        <div class="node_right">
          <el-button type="primary" icon="el-icon-circle-check" @click="nodeBingo">确认</el-button>
          <el-button icon="el-icon-circle-close" @click="nodeClose">取消</el-button>
        </div>
      </el-dialog>

      <!-- 更新传感器弹窗 -->
      <el-dialog :visible.sync="isSensor" title="更新传感器" class="avue-dialog" append-to-body>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isSensor = false">取 消</el-button>
          <el-button type="primary" @click="isSensor = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 监测数据弹窗 -->
      <el-dialog :visible.sync="isMonitor" v-if="isMonitor" width="1200px" title="监测数据" class="avue-dialog"
        @close="handleEmpty" append-to-body>
        <jianceData :dev-listone="devData"></jianceData>
      </el-dialog>
      <!-- 异常判断设置弹窗 -->
      <el-dialog :visible.sync="isAbnormal" v-if="isAbnormal" width="1000px" :title="`异常判断设置-${sensorTitle}`"
        @close="handleEmpty" append-to-body>
        <abnormalData :dev-listone="devData"></abnormalData>
      </el-dialog>
      <!-- 数据初值 -->
      <el-dialog :visible.sync="isInstall" width="600px" :title="installTitle + installNumber" class="avue-install"
        @close="handleInstall" append-to-body>
        <avue-form ref="InstallForm" v-model="InstallForm" :option="InstallOption" @submit="InstallSave">
        </avue-form>
      </el-dialog>
      <!-- 删除监测数据 -->
      <el-dialog :visible.sync="delDataShow" v-if="delDataShow" width="800px" title="删除监测数据" class="avue-install" @close="delDataClose"
        append-to-body>
        <isDadtaDel @isDataDelClose="closeShow" :devData="devData"></isDadtaDel>
      </el-dialog>
      <!-- 数据异常设置弹窗 -->
      <el-dialog :visible.sync="isError" width="800px" :title="errorTitle" class="avue-dialog" @close="handleEmpty2"
        append-to-body>
        <div>
          <avue-form v-model="errorForm" ref="errorForm" :option="errorDataOption" @submit="submit">
            <template slot="freq">
              <div>
                <el-col :span="6">
                  <el-input v-model="errorForm.freq" placeholder="请输入数据频率" oninput="value=value.replace(/[^\d]/g,'')">
                  </el-input>
                </el-col>
                <el-col :span="10" class="form-item-label">
                  小时内没有数据为异常。</el-col>
              </div>
            </template>
            <template slot="xGreater">
              <div>
                <el-col :span="4" class="form-item-label">大于</el-col>
                <el-col :span="10">
                  <el-input v-model="data_x.greater" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-col>

                <el-col :span="10" class="form-item-label">
                  视为数据异常</el-col>
              </div>
            </template>
            <template slot="xLess">
              <div>
                <el-col :span="4" class="form-item-label">小于</el-col>
                <el-col :span="10">
                  <el-input v-model="data_x.less" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-col>
                <el-col :span="10" class="form-item-label">
                  视为数据异常</el-col>
              </div>
            </template>
            <template slot="yGreater">
              <div>
                <el-col :span="4" class="form-item-label">大于</el-col>
                <el-col :span="10">
                  <el-input v-model="data_y.greater" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-col>
                <el-col :span="10" class="form-item-label">
                  视为数据异常</el-col>
              </div>
            </template>
            <template slot="yLess">
              <div>
                <el-col :span="4" class="form-item-label">小于</el-col>
                <el-col :span="10">
                  <el-input v-model="data_y.less" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-col>
                <el-col :span="10" class="form-item-label">
                  视为数据异常</el-col>
              </div>
            </template>
            <template slot="zGreater">
              <div>
                <el-col :span="4" class="form-item-label">大于</el-col>
                <el-col :span="10">
                  <el-input v-model="data_z.greater" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-col>
                <el-col :span="10" class="form-item-label">
                  视为数据异常</el-col>
              </div>
            </template>
            <template slot="zLess">
              <div>
                <el-col :span="4" class="form-item-label">小于</el-col>
                <el-col :span="10">
                  <el-input v-model="data_z.less" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-col>
                <el-col :span="10" class="form-item-label">
                  视为数据异常</el-col>
              </div>
            </template>
          </avue-form>
        </div>
      </el-dialog>

      <!-- 预警设置 -->
      <el-dialog :visible.sync="isYujin" width="1000px" :title="yujinTitle + number" class="avue-dialog"
        @close="handleClose" append-to-body>
        <span style="font-size: 16px">提示：请在下方设置阈值值初值，监测数据超过初值则会进行预警</span>
        <el-divider></el-divider>

        <avue-form v-if="hideX" v-model="xYujinForm" ref="xYujinForm" :option="xYujinOption" @submit="xYujinSubmit"
          append-to-body>
          <template slot="adjacent">
            <div style="color: #606266">
              根据两次单日监测数据的差值进行预警(单位:{{ company }})
            </div>
          </template>
          <template slot="cumulative">
            <div style="color: #606266">
              根据实际监测数据进行预警(单位:{{ company }})
            </div>
          </template>
        </avue-form>

        <avue-form v-if="hideX" ref="xDkForm" v-model="xDkForm" :option="xDkOption" @submit="xDkSubmit" append-to-body>
        </avue-form>

        <avue-form v-if="hideX" ref="xDoubleForm" v-model="xDoubleForm" :option="xDoubleOption" @submit="xDoubleSubmit"
          append-to-body>
        </avue-form>

        <avue-form v-if="hideY" v-model="yYujinForm" ref="yYujinForm" :option="yYujinOption" @submit="yYujinSubmit"
          append-to-body>
          <template slot="adjacent">
            <div style="color: #606266">
              根据两次单日监测数据的差值进行预警(单位:{{ company }})
            </div>
          </template>
          <template slot="cumulative">
            <div style="color: #606266">
              根据实际监测数据进行预警(单位:{{ company }})
            </div>
          </template>
        </avue-form>

        <avue-form v-if="hideY" ref="yDkForm" v-model="yDkForm" :option="yDkOption" @submit="yDkSubmit" append-to-body>
        </avue-form>

        <avue-form v-if="hideY" ref="yDoubleForm" v-model="yDoubleForm" :option="yDoubleOption" @submit="yDoubleSubmit"
          append-to-body>
        </avue-form>

        <avue-form v-if="hideZ" v-model="zYujinForm" ref="zYujinForm" :option="zYujinOption" @submit="zYujinSubmit"
          append-to-body>
          <template slot="adjacent">
            <div style="color: #606266">
              根据两次单日监测数据的差值进行预警(单位:{{ company }})
            </div>
          </template>
          <template slot="cumulative">
            <div style="color: #606266">
              根据实际监测数据进行预警(单位:{{ company }})
            </div>
          </template>
        </avue-form>

        <avue-form v-if="hideZ" ref="zDkForm" v-model="zDkForm" :option="zDkOption" @submit="zDkSubmit" append-to-body>
        </avue-form>

        <avue-form v-if="hideZ" ref="zDoubleForm" v-model="zDoubleForm" :option="zDoubleOption" @submit="zDoubleSubmit"
          append-to-body>
        </avue-form>

        <avue-form v-if="hideV" v-model="vYujinForm" ref="vYujinForm" :option="vYujinOption" @submit="vYujinSubmit"
          append-to-body>
          <template slot="adjacent">
            <div style="color: #606266">
              根据两次单日监测数据的差值进行预警(单位:{{ company }})
            </div>
          </template>
          <template slot="cumulative">
            <div style="color: #606266">
              根据实际监测数据进行预警(单位:{{ company }})
            </div>
          </template>
        </avue-form>

        <avue-form v-if="hideV" ref="vDkForm" v-model="vDkForm" :option="vDkOption" @submit="vDkSubmit" append-to-body>
        </avue-form>

        <avue-form v-if="hideV" ref="vDoubleForm" v-model="vDoubleForm" :option="vDoubleOption" @submit="vDoubleSubmit"
          append-to-body>
        </avue-form>

        <avue-form v-if="hideYL" ref="ylForm" v-model="ylForm" :option="ylOption" @submit="ylSubmit" append-to-body>
        </avue-form>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
  import {
    nodeSW,
    nodeSWChange
  } from "@/api/monitorManage/quxian";
  import {
    getBackPageList
  } from "@/api/hideDanger/obj"

  import {
    delObj,
    fetchList,
    addObj,
    putObj,
    getError,
    editError,
    addYujin,
    getYujin,
    editYujin,
    someYuzhi,
    intallEdit,
    addDouble,
    handleAddDouble,
    getDouble,
    warnsettingDk,
    getDk,
    plWarnsettingDk,
    setRainfull,
    editRainfull,
    getYUliang,
    codelook,
    getInitVal
  } from "@/api/monitorManage/sensor";
  import {
    tableOption,
    errorDataOption,
    curveOption,
    xYujinOption,
    yYujinOption,
    zYujinOption,
    vYujinOption,
    InstallOption,
    xDoubleOption,
    yDoubleOption,
    zDoubleOption,
    vDoubleOption,
    xDkOption,
    yDkOption,
    zDkOption,
    vDkOption,
    ylOption,
  } from "@/const/crud/monitorManage/sensorList";
  import {
    mapGetters
  } from "vuex";
  import layout from "@/page/index/layout.vue";
  import chartCom from "@/components/chartcom/index.vue";

  import jianceData from "@/components/jianceData/index";
  import abnormalData from "@/components/abnormalData/index";
  import isDadtaDel from "./isDataDel.vue"
  export default {
    components: {
      layout,
      chartCom,
      jianceData,
      abnormalData,
      isDadtaDel
    },
    name: "log",
    data() {
      return {
        propdis: {
          label: "monitorCode",
          value: 'monitorCode'
        },
        objdata: {
          disasterCode: "",
          disasterName: "",
          disasterId: null,
          initType: "",
          state: 1
        },
        disData: [],
        disData1: [],
        nodeShow: false,
        nodeValue: [],
        nodeData: [],

        devData: undefined,
        errorForm: {},
        xDoubleForm: {},
        yDoubleForm: {},
        zDoubleForm: {},
        vDoubleForm: {},
        xDkForm: {},
        yDkForm: {},
        zDkForm: {},
        vDkForm: {},
        xYujinForm: {},
        yYujinForm: {},
        zYujinForm: {},
        vYujinForm: {},
        ylForm: {},
        data_x: {},
        data_y: {},
        data_z: {},
        InstallForm: {},
        sensorId: "",
        tableData: [],
        curveForm: {
          time: 1,
        },
        SelectForm: {
          disasterCode: "",
          disasterName: "",
          disasterId: "",
        },
        SelectOption: [],
        selectpPage: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10,
        },
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
        },
        initOptions: [{
          label: "不设置初始值",
          value: 0
        }, {
          label: '使用中台初始值',
          value: 1,
        }, {
          label: '自定义初始值',
          value: 2,
        }],
        selectView: false,
        tableLoading: false,
        searchForm: {},
        xDoubleOption: xDoubleOption,
        xYujinOption: xYujinOption,
        yYujinOption: yYujinOption,
        zYujinOption: zYujinOption,
        vYujinOption: vYujinOption,
        xDkOption: xDkOption,
        yDkOption: yDkOption,
        zDkOption: zDkOption,
        vDkOption: vDkOption,
        yDoubleOption: yDoubleOption,
        zDoubleOption: zDoubleOption,
        vDoubleOption: vDoubleOption,
        ylOption: ylOption,
        tableOption: tableOption,
        InstallOption: InstallOption,
        errorDataOption: errorDataOption, //数据异常
        curveOption: curveOption, //监测曲线
        isMonitor: false, //监测数据弹窗
        isAbnormal: false, //异常判断设置
        isSensor: false, //更新传感器弹窗
        isError: false, //异常数据设置弹窗
        isYujin: false, //预警设置弹窗
        isInstall: false, //数据初值弹窗
        selectionData: [],
        MonitorOption: {
          column: [{
              label: "监测曲线",
              prop: "tab1",
            },
            {
              label: "监测数据",
              prop: "tab2",
            },
          ],
        },
        monitorType: {},
        curvelChartOption: {}, //图表
        quickNum: 0,
        //自定义权限
        customPermissions: {
          monitor_device_del: false,
        },
        rowData: {},
        hideX: true,
        hideY: true,
        hideZ: true,
        hideV: true,
        hideYL: true,
        number: "",
        installNumber: "",
        yujinTitle: "阈值设置",
        installTitle: "数据初值设置",
        errorTitle: "数据异常设置",
        sensorTitle: "", //异常判断设置弹窗标题
        company: "",
        yuzhiType: "",
        sensorNode: "",
        disabled23: false,
        delDataShow: false,
      };
    },
    computed: {
      ...mapGetters(["permissions", "projectId"]),
    },
    watch: {
      "curveForm.time": {
        handler(val) {
          var daterange = this.findObject(this.curveOption.column, "daterange");
          var monthrange = this.findObject(this.curveOption.column, "monthrange");
          if (val === 1) {
            daterange.display = true;
            monthrange.display = false;
          } else {
            daterange.display = false;
            monthrange.display = true;
          }
        },
        immediate: true,
      },
      "objdata.sensorType": {
        handler(val, old) {
          if (old != undefined) {
            this.objdata.initType = ""
          }
          if (val) {
            if (val == "l1_lf" || val == "l1_qj" || val == "l1_wy" || val == "l1_sw") {
              this.tableOption.column[9].display = true;
              this.objdata.initType = this.objdata.initType != null ? this.objdata.initType : 1
            } else {
              this.tableOption.column[9].display = false;
            }
          }
        },
        immediate: true,
      },
      "objdata.initType": {
        immediate: true,
        deep: true,
        handler(val) {
          if (val == 1) {
            let type = this.objdata.sensorType
            this.tableOption.column[10].display = false;
            this.tableOption.column[11].display = false;
            this.tableOption.column[12].display = false;
            this.tableOption.column[13].display = true;
            this.tableOption.column[10].disabled = true;
            this.tableOption.column[11].disabled = true;
            this.tableOption.column[12].disabled = true;
            this.tableOption.column[13].disabled = true;
            if (type == "l1_lf") {
              this.tableOption.column[10].display = false;
              this.tableOption.column[11].display = false;
              this.tableOption.column[12].display = false;
              this.tableOption.column[13].display = true;
            } else if (type == "l1_qj") {
              this.tableOption.column[10].display = true;
              this.tableOption.column[11].display = true;
              this.tableOption.column[12].display = true;
              this.tableOption.column[13].display = false;
            } else if (type == "l1_wy" || type == "l1_sw") {
              this.tableOption.column[10].display = true;
              this.tableOption.column[11].display = true;
              this.tableOption.column[12].display = false;
              this.tableOption.column[13].display = false;
            } else {
              this.tableOption.column[10].display = false;
              this.tableOption.column[11].display = false;
              this.tableOption.column[12].display = false;
              this.tableOption.column[13].display = false;
            }
          } else if (val == 2) {
            let type = this.objdata.sensorType
            this.tableOption.column[10].display = false;
            this.tableOption.column[11].display = false;
            this.tableOption.column[12].display = false;
            this.tableOption.column[13].display = true;
            this.tableOption.column[10].disabled = false;
            this.tableOption.column[11].disabled = false;
            this.tableOption.column[12].disabled = false;
            this.tableOption.column[13].disabled = false;
            if (type == "l1_lf") {
              this.tableOption.column[10].display = false;
              this.tableOption.column[11].display = false;
              this.tableOption.column[12].display = false;
              this.tableOption.column[13].display = true;
            } else if (type == "l1_qj") {
              this.tableOption.column[10].display = true;
              this.tableOption.column[11].display = true;
              this.tableOption.column[12].display = true;
              this.tableOption.column[13].display = false;
            } else if (type == "l1_wy" || type == "l1_sw") {
              this.tableOption.column[10].display = true;
              this.tableOption.column[11].display = true;
              this.tableOption.column[12].display = false;
              this.tableOption.column[13].display = false;
            } else {
              this.tableOption.column[10].display = false;
              this.tableOption.column[11].display = false;
              this.tableOption.column[12].display = false;
              this.tableOption.column[13].display = false;
            }
          } else {
            this.tableOption.column[10].display = false;
            this.tableOption.column[11].display = false;
            this.tableOption.column[12].display = false;
            this.tableOption.column[13].display = false;
          }
        },

      },
      "projectId": {
        immediate: true,
        handler(val, oVal) {
          if (val != 0 && val) {
            window.sessionStorage.setItem('projectId', val)
            getBackPageList({
              size: -1,
              projectId: val
            }).then(v => {
              this.disData = v.data.data.records
            })
            this.getList(this.page);
            this.tableOption.column.forEach((cols) => {
              if (cols.prop == "disasterCode") {
                cols.dicUrl = `/monitor_base_info/page?projectId=${val}&size=-1`;
              }
              if (cols.prop == "disasterName" || cols.prop == "disasterId") {
                cols.dicUrl = `/monitor_base_info/page?projectId=${val}&monitorCode={{key}}`;
              }
            });
            this.$nextTick(() => {
              this.$refs.crud.selectClear();
              this.$refs.crud.searchReset();
            })
          }
        }
      }
    },
    mounted() {
      this.monitorType = this.MonitorOption.column[0];
      this.showChart(); //初始化图表
      this.customPermissions = {
        monitor_device_del: this.vaildData(
          this.permissions.monitor_device_del,
          false
        ),
      };
    },
    created() {
      // this.getSelectList();
    },
    methods: {
      disChange(v) {
        this.objdata.disasterCode = v
        codelook({
          projectId: this.projectId,
          monitorCode: v
        }).then(v => {
          if (v.data.data) {
            this.objdata.disasterName = v.data.data.monitorName
            this.objdata.disasterId = v.data.data.id
          }
        })
      },
      getjcd() {
        getBackPageList({
          size: -1,
          projectId: this.projectId
        }).then(v => {
          this.disData = v.data.data.records

        })
      },
      // 确认节点选择
      nodeBingo: function () {
        const nodeMore = this.nodeValue.join(",");

        nodeSWChange({
          deviceNo: this.deviceCode,
          displayNodeList: nodeMore,
        }).then((res) => {
          if (res.data.data) {
            this.nodeClose();
            this.$message({
              type: "success",
              message: "选择节点成功！",
            });
          }
        });
      },
      // 关闭节点选择
      nodeClose: function () {
        this.nodeShow = false;
        this.nodeData = [];
        this.nodeValue = [];
        this.sensorNode = "";
      },
      // 点击节点设置
      nodeSetup(val) {
        this.nodeShow = true;
        this.deviceCode = val.deviceCode;
        nodeSW({
          sensorCode: val.sensorCode,
        }).then((res) => {
          const dataAll = res.data.data.allNodeList.split(",").reverse();
          if (res.data.data.displayNodeList == null) {
            this.nodeValue = [];
          } else {
            const nodeList = res.data.data.displayNodeList.split(",").map(Number);
            this.nodeValue = nodeList;
          }
          const dataN = [];
          for (let i = 0; i < dataAll.length; i++) {
            dataN.push({
              key: i + 1,
              label: -dataAll[i] + "M",
            });
          }
          const nodeS = dataN.reverse();
          this.nodeData = nodeS;
        });
      },
      //   分页查询
      getList(page, params) {
        this.tableLoading = true;
        fetchList(
          Object.assign({
              current: page.currentPage,
              size: page.pageSize,
              projectId: this.projectId
            },
            params,
            this.searchForm
          )
        ).then((response) => {
          this.tableData = response.data.data.records;
          this.page.total = response.data.data.total;
          this.tableLoading = false;
          this.tableData.forEach(item => {
            item.initType = item.initType * 1
          })
        });
      },

      // // 下拉框分页
      // getSelectList() {
      //   getPageList({
      //     current: this.selectpPage.currentPage,
      //     size: this.selectpPage.pageSize,
      //   }).then((res) => {
      //     this.SelectOption = res.data.data.records;
      //     this.selectpPage.total = res.data.data.total;
      //   });
      // },

      selectChange(e) {
        // this.SelectForm.disasterCode = e.disasterCode
        this.$refs.crud.tableForm.disasterCode = e.disasterCode;
        let obj = {};
        obj = this.SelectOption.find((item) => {
          if (item.pikk === e) {
            this.SelectForm.disasterName = item.name;
            this.SelectForm.disasterId = item.id;
          }
        });
      },
      // 编辑
      handleEdit(row, index) {
        row.initType = row.initType * 1
        this.objdata = row
        this.objdata.x = row.xdata;
        this.objdata.y = row.ydata;
        this.objdata.z = row.zdata;
        this.objdata.value = row.value;
        this.disabled23 = false,
          // this.getSelectList();
          this.tableOption.column[0].disabled = true;
        // this.tableOption.column[0].rules[0]
        this.selectView = false;
        (this.SelectForm = {
          disasterCode: "",
          disasterName: "",
        }),
        (this.SelectForm.disasterCode = row.disasterCode);
        this.SelectForm.disasterName = row.disasterName;
        this.$refs.crud.rowEdit(row, index);
      },

      // 初始值选择
      InitValChange(e) {
        if (e == 1) {
          if (this.objdata.sensorCode) {
            this.objdata.x = "";
            this.objdata.y = "";
            this.objdata.z = "";
            this.objdata.value = "";
            getInitVal({
              sensorNo: this.objdata.sensorCode,
              type: e
            }).then(res => {
              let data = res.data.data;
              if (JSON.stringify(data) == "{}") {
                this.$message.error("暂未获取到中台数据");
              } else {
                data.x ? this.objdata.x = data.x : "";
                data.y ? this.objdata.y = data.y : "";
                data.z ? this.objdata.z = data.z : "";
                data.value ? this.objdata.value = data.value : "";
              }
            })
          }
        }
      },

      // 查看
      handleView(row, index) {
        (this.SelectForm = {
          disasterCode: "",
          disasterName: "",
        }),
        this.disabled23 = true;
        (this.selectView = true);
        this.SelectForm.disasterCode = row.disasterCode;
        this.SelectForm.disasterName = row.disasterName;
        this.$refs.crud.rowView(row, index);
      },

      // 新增
      handleCreate() {
        this.disabled23 = false;
        // this.getSelectList();
        this.tableOption.column[9].display = false;
        this.tableOption.column[0].disabled = false;
        this.selectView = false;
        (this.SelectForm = {
          disasterCode: "",
          disasterName: "",
        }),
        this.getList(this.page);
        this.$refs.crud.rowAdd();
      },

      // 提交
      submit(form, done) {
        delete form.xGreater;
        delete form.xLess;
        delete form.yGreater;
        delete form.yLess;
        delete form.zGreater;
        delete form.zLess;
        form.range = [];
        this.$set(this.data_x, "type", "x");
        this.$set(this.data_y, "type", "y");
        this.$set(this.data_z, "type", "z");
        form.range.push(this.data_x);
        form.range.push(this.data_y);
        form.range.push(this.data_z);
        editError(
          Object.assign({
            sid: this.sensorId,
          }, {
            config: JSON.stringify(form),
          })
        ).then((res) => {
          if (res.data.code == "0") {
            this.$message.danger("保存失败");
            this.isError = false;
          } else {
            this.isError = false;
          }
        });
        this.isError = false;
        done();
      },

      xDoubleSubmit(form, done) {
        delete form.undefined;
        if (this.yuzhiType == false) {
          addDouble(
            Object.assign(
              form, {
                sensorId: this.rowData.sensorId,
              }, {
                dimensionality: "x",
              }
            )
          ).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        } else if (this.yuzhiType == true) {
          let arr = [];
          this.selectionData.forEach((item, index) => {
            arr.push(form);
          });
          var arr2 = [];
          arr.map((item, index) => {
            arr2.push(
              Object.assign({},
                item, {
                  sensorId: this.selectionData[index].sensorId,
                }, {
                  dimensionality: "x",
                }
              )
            );
          });
          handleAddDouble(Object.assign(arr2)).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        }
        setTimeout(() => {
          this.getYujinData(this.rowData);
          done();
        }, 2000);
      },
      yDoubleSubmit(form, done) {
        delete form.undefined;
        if (this.yuzhiType == false) {
          addDouble(
            Object.assign(
              form, {
                sensorId: this.rowData.sensorId,
              }, {
                dimensionality: "y",
              }
            )
          ).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        } else if (this.yuzhiType == true) {
          let arr = [];
          this.selectionData.forEach((item, index) => {
            arr.push(form);
          });
          var arr2 = [];
          arr.map((item, index) => {
            arr2.push(
              Object.assign({},
                item, {
                  sensorId: this.selectionData[index].sensorId,
                }, {
                  dimensionality: "y",
                }
              )
            );
          });
          handleAddDouble(Object.assign(arr2)).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        }
        setTimeout(() => {
          this.getYujinData(this.rowData);
          done();
        }, 2000);
      },
      zDoubleSubmit(form, done) {
        delete form.undefined;
        if (this.yuzhiType == false) {
          addDouble(
            Object.assign(
              form, {
                sensorId: this.rowData.sensorId,
              }, {
                dimensionality: "z",
              }
            )
          ).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        } else if (this.yuzhiType == true) {
          let arr = [];
          this.selectionData.forEach((item, index) => {
            arr.push(form);
          });
          var arr2 = [];
          arr.map((item, index) => {
            arr2.push(
              Object.assign({},
                item, {
                  sensorId: this.selectionData[index].sensorId,
                }, {
                  dimensionality: "z",
                }
              )
            );
          });
          handleAddDouble(Object.assign(arr2)).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        }
        setTimeout(() => {
          this.getYujinData(this.rowData);
          done();
        }, 2000);
      },
      vDoubleSubmit(form, done) {
        delete form.undefined;
        if (this.yuzhiType == false) {
          addDouble(
            Object.assign(
              form, {
                sensorId: this.rowData.sensorId,
              }, {
                dimensionality: "value",
              }
            )
          ).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        } else if (this.yuzhiType == true) {
          let arr = [];
          this.selectionData.forEach((item, index) => {
            arr.push(form);
          });
          var arr2 = [];
          arr.map((item, index) => {
            arr2.push(
              Object.assign({},
                item, {
                  sensorId: this.selectionData[index].sensorId,
                }, {
                  dimensionality: "value",
                }
              )
            );
          });
          handleAddDouble(Object.assign(arr2)).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        }
        setTimeout(() => {
          this.getYujinData(this.rowData);
          done();
        }, 2000);
      },

      xDkSubmit(form, done) {
        delete form.undefined;
        if (this.yuzhiType == false) {
          warnsettingDk(
            Object.assign(
              form, {
                sensorId: this.rowData.sensorId,
              }, {
                dimensionality: "x",
              }
            )
          ).then((res) => {
            this.getYujinData(this.rowData);
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        } else if (this.yuzhiType == true) {
          let arr = [];
          this.selectionData.forEach((item, index) => {
            arr.push(form);
          });
          var arr2 = [];
          arr.map((item, index) => {
            arr2.push(
              Object.assign({},
                item, {
                  id: this.xYujinForm.id,
                  sensorId: this.selectionData[index].sensorId,
                }, {
                  dimensionality: "x",
                }
              )
            );
          });
          plWarnsettingDk(arr2).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        }
        setTimeout(() => {
          done();
        }, 2000);
      },
      yDkSubmit(form, done) {
        delete form.undefined;
        if (this.yuzhiType == false) {
          warnsettingDk(
            Object.assign(
              form, {
                sensorId: this.rowData.sensorId,
              }, {
                dimensionality: "y",
              }
            )
          ).then((res) => {
            this.getYujinData(this.rowData);
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        } else if (this.yuzhiType == true) {
          let arr = [];
          this.selectionData.forEach((item, index) => {
            arr.push(form);
          });
          var arr2 = [];
          arr.map((item, index) => {
            arr2.push(
              Object.assign({},
                item, {
                  sensorId: this.selectionData[index].sensorId,
                }, {
                  dimensionality: "y",
                }
              )
            );
          });
          plWarnsettingDk(arr2).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        }
        setTimeout(() => {
          done();
        }, 2000);
      },
      zDkSubmit(form, done) {
        delete form.undefined;
        if (this.yuzhiType == false) {
          warnsettingDk(
            Object.assign(
              form, {
                sensorId: this.rowData.sensorId,
              }, {
                dimensionality: "z",
              }
            )
          ).then((res) => {
            this.getYujinData(this.rowData);
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        } else if (this.yuzhiType == true) {
          let arr = [];
          this.selectionData.forEach((item, index) => {
            arr.push(form);
          });
          var arr2 = [];
          arr.map((item, index) => {
            arr2.push(
              Object.assign({},
                item, {
                  sensorId: this.selectionData[index].sensorId,
                }, {
                  dimensionality: "z",
                }
              )
            );
          });
          plWarnsettingDk(arr2).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        }
        setTimeout(() => {
          done();
        }, 2000);
      },
      vDkSubmit(form, done) {
        delete form.undefined;
        if (this.yuzhiType == false) {
          warnsettingDk(
            Object.assign(
              form, {
                sensorId: this.rowData.sensorId,
              }, {
                dimensionality: "value",
              }
            )
          ).then((res) => {
            this.getYujinData(this.rowData);
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        } else if (this.yuzhiType == true) {
          let arr = [];
          this.selectionData.forEach((item, index) => {
            arr.push(form);
          });
          var arr2 = [];
          arr.map((item, index) => {
            arr2.push(
              Object.assign({},
                item, {
                  sensorId: this.selectionData[index].sensorId,
                }, {
                  dimensionality: "value",
                }
              )
            );
          });
          plWarnsettingDk(arr2).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        }
        setTimeout(() => {
          done();
        }, 2000);
      },

      xYujinSubmit(form, done) {
        delete form.adjacent;
        delete form.cumulative;
        if (this.yuzhiType == false) {
          if (!this.xYujinForm.id) {
            addYujin(
              Object.assign(
                form, {
                  sensorId: this.rowData.sensorId,
                }, {
                  dimensionality: "x",
                }
              )
            ).then((res) => {
              this.getYujinData(this.rowData);
              if (res.data.code == "0") {
                this.$message.success("保存成功");
              }
            });
          } else {
            editYujin(
              Object.assign(
                form, {
                  id: this.xYujinForm.id,
                  sensorId: this.rowData.sensorId,
                }, {
                  dimensionality: "x",
                }
              )
            ).then((res) => {
              this.getYujinData(this.rowData);
              if (res.data.code == "0") {
                this.$message.success("保存成功");
              }
            });
          }
        } else if (this.yuzhiType == true) {
          let arr = [];
          this.selectionData.forEach((item, index) => {
            arr.push(form);
          });
          var arr2 = [];
          arr.map((item, index) => {
            arr2.push(
              Object.assign({},
                item, {
                  sensorId: this.selectionData[index].sensorId,
                }, {
                  dimensionality: "x",
                }
              )
            );
          });
          someYuzhi(arr2).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        }
        setTimeout(() => {
          done();
        }, 2000);
      },

      yYujinSubmit(form, done) {
        delete form.adjacent;
        delete form.cumulative;
        if (this.yuzhiType == false) {
          if (!this.yYujinForm.id) {
            addYujin(
              Object.assign(
                form, {
                  sensorId: this.rowData.sensorId,
                }, {
                  dimensionality: "y",
                }
              )
            ).then((res) => {
              this.getYujinData(this.rowData);
              if (res.data.code == "0") {
                this.$message.success("保存成功");
                // this.isYujin = false;
              }
            });
          } else {
            editYujin(
              Object.assign(
                form, {
                  id: this.yYujinForm.id,
                  sensorId: this.rowData.sensorId,
                }, {
                  dimensionality: "y",
                }
              )
            ).then((res) => {
              this.getYujinData(this.rowData);
              if (res.data.code == "0") {
                this.$message.success("保存成功");
                // this.isYujin = false;
              }
            });
          }
        } else if (this.yuzhiType == true) {
          let arr = [];
          this.selectionData.forEach((item, index) => {
            arr.push(form);
          });
          var arr2 = [];
          arr.map((item, index) => {
            arr2.push(
              Object.assign({},
                item, {
                  sensorId: this.selectionData[index].sensorId,
                }, {
                  dimensionality: "y",
                }
              )
            );
          });
          someYuzhi(arr2).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        }
        setTimeout(() => {
          done();
        }, 2000);
      },

      zYujinSubmit(form, done) {
        delete form.adjacent;
        delete form.cumulative;
        if (this.yuzhiType == false) {
          if (!this.zYujinForm.id) {
            addYujin(
              Object.assign(
                form, {
                  sensorId: this.rowData.sensorId,
                }, {
                  dimensionality: "z",
                }
              )
            ).then((res) => {
              this.getYujinData(this.rowData);
              if (res.data.code == "0") {
                this.$message.success("保存成功");
                // this.isYujin = false;
              }
            });
          } else {
            editYujin(
              Object.assign(
                form, {
                  id: this.zYujinForm.id,
                  sensorId: this.rowData.sensorId,
                }, {
                  dimensionality: "z",
                }
              )
            ).then((res) => {
              this.getYujinData(this.rowData);
              if (res.code == "0") {
                this.data.$message.success("保存成功");
                // this.isYujin = false;
              }
            });
          }
        } else if (this.yuzhiType == true) {
          let arr = [];
          this.selectionData.forEach((item, index) => {
            arr.push(form);
          });
          var arr2 = [];
          arr.map((item, index) => {
            arr2.push(
              Object.assign({},
                item, {
                  sensorId: this.selectionData[index].sensorId,
                }, {
                  dimensionality: "z",
                }
              )
            );
          });
          someYuzhi(arr2).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        }
        setTimeout(() => {
          done();
        }, 2000);
      },

      vYujinSubmit(form, done) {
        if (this.yuzhiType == false) {
          if (!this.vYujinForm.id) {
            addYujin(
              Object.assign(
                form, {
                  sensorId: this.rowData.sensorId,
                }, {
                  dimensionality: "value",
                }
              )
            ).then((res) => {
              this.getYujinData(this.rowData);
              if (res.data.code == "0") {
                this.$message.success("保存成功");
              }
            });
          } else {
            editYujin(
              Object.assign(
                form, {
                  id: this.vYujinForm.id,
                  sensorId: this.rowData.sensorId,
                }, {
                  dimensionality: "value",
                }
              )
            ).then((res) => {
              this.getYujinData(this.rowData);
              if (res.data.code == "0") {
                this.$message.success("保存成功");
              }
            });
          }
        } else if (this.yuzhiType == true) {
          let arr = [];
          this.selectionData.forEach((item, index) => {
            arr.push(form);
          });
          var arr2 = [];
          arr.map((item, index) => {
            arr2.push(
              Object.assign({},
                item, {
                  sensorId: this.selectionData[index].sensorId,
                }, {
                  dimensionality: "value",
                }
              )
            );
          });
          someYuzhi(arr2).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
            }
          });
        }
        setTimeout(() => {
          done();
        }, 2000);
      },

      ylSubmit(form, done) {
        if (!this.ylForm.id) {
          setRainfull(
            Object.assign(form, {
              sensorCode: this.rowData.sensorCode,
            })
          ).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("保存成功");
              this.isYujin = false;
            }
          });
        } else {
          editRainfull(
            Object.assign(form, {
              id: this.ylForm.id,
              sensorCode: this.rowData.sensorCode,
            })
          ).then((res) => {
            this.getYujinData(this.rowData);
            if (res.data.code == "0") {
              this.$message.success("保存成功");
              this.isYujin = false;
            }
          });
        }
        setTimeout(() => {
          done();
        }, 2000);
      },
      rowDel: function (row, index) {
        this.$confirm("是否确认删除该条数据?", "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            // return delObj({id:row.id,projectId:this.projectId});
            return delObj([row.id]); //因为id是唯一的，跟项目没有关系，所以删除只需传id
          })
          .then((data) => {
            this.getList(this.page);
            this.$message.success("删除成功");
          });
      },

      //批量阈值设置
      handleBatchYujin() {
        this.yuzhiType = true;
        let idList = this.getSelectionDataId();
        if (idList.length == 0) {
          this.$message.warning("请选择需要设置的数据");
          return;
        }
        let arr = [];
        let arr2 = [];
        this.selectionData.forEach((item) => {
          arr.push(item.sensorType);
          arr2.push(item.$sensorType);
        });
        var tempbool = "";
        if (arr.length == 1) {
          tempbool = true;
        }
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
              tempbool = true;
            } else {
              tempbool = false;
            }
          }
        }
        if (tempbool == false && arr.length > 1) {
          this.$message.warning("请选择相同类型的传感器");
        } else if (tempbool == true) {
          if (arr2[0] == "裂缝计" || arr[0] == "l1_lf") {
            this.company = "mm(毫米)";
            this.hideX = false;
            this.hideY = false;
            this.hideZ = false;
            this.hideV = true;
            this.yujinTitle = "阈值设置(裂缝计)";
          } else if (arr2[0] == "加速度" || arr[0] == "l1_js") {
            this.company = "mg(加速度)";
            this.hideX = true;
            this.hideY = true;
            this.hideZ = true;
            this.hideV = false;
            this.yujinTitle = "阈值设置(加速度)";
          }
          //  else if (arr2[0] == "雨量计" || arr[0] == "l3_yl") {
          //   this.company = "mm(雨量计)";
          //   this.hideX = false;
          //   this.hideY = false;
          //   this.hideZ = false;
          //   this.hideV = false;
          //   this.hideYL = true;
          //   this.yujinTitle = "阈值设置(雨量计)";
          // }
          else if (arr2[0] == "倾斜仪" || arr[0] == "l1_qj") {
            this.company = "°(度)";
            this.hideX = true;
            this.hideY = true;
            this.hideZ = true;
            this.hideV = false;
            this.yujinTitle = "阈值设置(倾斜仪)";
          } else if (arr2[0] == "表面位移" || arr[0] == "l1_wy") {
            this.company = "mm(表面位移)";
            this.hideX = true;
            this.hideY = true;
            this.hideZ = false;
            this.hideV = false;
            this.yujinTitle = "阈值设置(表面位移)";
          } else if (arr2[0] == "深部位移" || arr[0] == "l1_sw") {
            this.company = "mm(深部位移)";
            this.hideX = true;
            this.hideY = true;
            this.hideZ = false;
            this.hideV = false;
            this.yujinTitle = "阈值设置(地表位移)";
          } else if (arr2[0] == "地表位移" || arr[0] == "l1_gp") {
            this.company = "mm(地表位移)";
            this.hideX = true;
            this.hideY = true;
            this.hideZ = true;
            this.hideV = false;
            this.yujinTitle = "阈值设置(地表位移)";
          } else {
            this.yujinTitle = "阈值设置";
          }
          for (let a = 0; a < this.selectionData.length; a++) {
            if (this.selectionData[a].sensorType == "l3_yl") {
              this.$message.warning("该类型不可批量设置阈值");
              return;
            }
            if (
              this.selectionData[a].sensorType != "l1_lf" &&
              this.selectionData[a].sensorType != "l1_qj" &&
              this.selectionData[a].sensorType != "l1_sw" &&
              this.selectionData[a].sensorType != "l1_wy" &&
              this.selectionData[a].sensorType != "l1_js"
              // this.selectionData[a].sensorType != "l3_yl"
            ) {
              this.$message.warning("该类型不可设置阈值");
              return;
            }
          }
          if (arr.length == 1) {
            this.getYujinData(this.selectionData[0]);
          }
          if (this.yuzhiType == true) {
            this.number = "已选择" + this.selectionData.length + "条";
          } else {
            this.number = "";
          }
          this.isYujin = true;
        }
      },

      selectionChange(selection) {
        this.selectionData = selection;
      },

      getSelectionData() {
        let dataList = new Array();
        if (this.selectionData.length > 0) {
          this.selectionData.forEach((d) => {
            dataList.push({
              type: d.sensorType,
              label: d.$sensorType
            })
          });
        }
        return dataList;
      },

      getSelectionDataId() {
        let idList = new Array();
        if (this.selectionData.length > 0) {
          this.selectionData.forEach((d) => idList.push(d.sensorId));
        }
        return idList;
      },

      // 下拉框分页
      // handleCurrentChange(page) {
      //   this.selectpPage.currentPage = page;
      //   // this.getSelectList();
      // },

      // 阈值设置
      handlYujin(row) {
        this.yuzhiType = false;
        if (row.sensorType == "l3_yl") {
          getYUliang({
            sensorCode: row.sensorCode,
          }).then((res) => {
            this.ylForm = res.data.data.records[0];
          });
        } else {
          this.getYujinData(row);
        }

        this.rowData = row;
        if (row.$sensorType == "裂缝计" || row.sensorType == "l1_lf") {
          this.company = "mm(毫米)";
          this.hideX = false;
          this.hideY = false;
          this.hideZ = false;
          this.hideV = true;
          this.hideYL = false;
          this.yujinTitle = "阈值设置(裂缝计)";
        } else if (row.$sensorType == "加速度" || row.sensorType == "l1_js") {
          this.company = "mg(加速度)";
          this.hideX = true;
          this.hideY = true;
          this.hideZ = true;
          this.hideV = false;
          this.hideYL = false;
          this.yujinTitle = "阈值设置(加速度)";
        } else if (row.$sensorType == "倾斜仪" || row.sensorType == "l1_qj") {
          this.company = "°(度)";
          this.hideX = true;
          this.hideY = true;
          this.hideZ = true;
          this.hideV = false;
          this.hideYL = false;
          this.yujinTitle = "阈值设置(倾斜仪)";
        } else if (row.$sensorType == "雨量计" || row.sensorType == "l3_yl") {
          this.company = "mm(雨量计)";
          this.hideX = false;
          this.hideY = false;
          this.hideZ = false;
          this.hideV = false;
          this.hideYL = true;
          this.yujinTitle = "阈值设置(雨量计)";
        } else if (row.$sensorType == "表面位移" || row.sensorType == "l1_wy") {
          this.company = "mm(表面位移)";
          this.hideX = true;
          this.hideY = true;
          this.hideZ = false;
          this.hideV = false;
          this.hideYL = false;
          this.yujinTitle = "阈值设置(表面位移)";
        } else if (row.$sensorType == "表面位移" || row.sensorType == "l1_gp") {
          this.company = "mm(表面位移)";
          this.hideX = true;
          this.hideY = true;
          this.hideZ = true;
          this.hideV = false;
          this.hideYL = false;
          this.yujinTitle = "阈值设置(表面位移)";
        } else if (row.$sensorType == "深部位移" || row.sensorType == "l1_sw") {
          this.company = "mm(深部位移)";
          this.hideX = true;
          this.hideY = true;
          this.hideZ = false;
          this.hideV = false;
          this.hideYL = false;
          this.yujinTitle = "阈值设置(深部位移)";
        } else {
          this.yujinTitle = "阈值设置";
        }
        this.isYujin = true;
      },
      // 批量初值设置
      handlePlChuzhi() {
        let idList = this.getSelectionDataId();
        if (idList.length == 0) {
          this.$message.warning("请选择需要设置的数据");
          return;
        }
        let arr = [];
        let arr2 = [];
        this.selectionData.forEach((item) => {
          arr.push(item.sensorType);
          arr2.push(item.$sensorType);
        });
        var tempbool2 = "";
        if (arr.length == 1) {
          tempbool2 = true;
        }
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
              tempbool2 = true;
            } else {
              tempbool2 = false;
            }
          }
        }
        for (let a = 0; a < this.selectionData.length; a++) {
          if (
            this.selectionData[a].sensorType != "l1_lf" &&
            this.selectionData[a].sensorType != "l1_qj" &&
            this.selectionData[a].sensorType != "l1_wy" &&
            this.selectionData[a].sensorType != "l1_sw"
          ) {
            this.$message.warning("该类型不可设置初值");
            return;
          }
        }
        if (tempbool2 == false && arr.length > 1) {
          this.$message.warning("请选择相同类型的传感器");
          return;
        } else if (tempbool2 == true) {
          if (arr[0] == "l1_wy") {
            this.installTitle = "数据初值设置(表面位移)";
            this.InstallOption.column[0].display = true;
            this.InstallOption.column[1].display = true;
            this.InstallOption.column[2].display = false;
            this.InstallOption.column[3].display = false;
          } else if (arr[0] == "l1_sw") {
            this.installTitle = "数据初值设置(深部位移)";
            this.InstallOption.column[0].display = true;
            this.InstallOption.column[1].display = true;
            this.InstallOption.column[2].display = false;
            this.InstallOption.column[3].display = false;
          } else if (arr[0] == "l1_qj") {
            this.installTitle = "数据初值设置(倾斜仪)";
            this.InstallOption.column[0].display = true;
            this.InstallOption.column[1].display = true;
            this.InstallOption.column[2].display = true;
            this.InstallOption.column[3].display = false;
          } else if (arr[0] == "l1_lf") {
            this.installTitle = "数据初值设置(裂缝计)";
            this.InstallOption.column[0].display = false;
            this.InstallOption.column[1].display = false;
            this.InstallOption.column[2].display = false;
            this.InstallOption.column[3].display = true;
          } else {
            this.installTitle = "数据初值设置";
            this.InstallOption.column[0].display = true;
            this.InstallOption.column[1].display = true;
            this.InstallOption.column[2].display = true;
            this.InstallOption.column[3].display = true;
          }
        }
        this.installNumber = "已选择" + this.selectionData.length + "条";
        this.isInstall = true;
      },

      handleInstall() {
        this.isInstall = false;
        this.$refs.InstallForm.resetForm();
      },

      InstallSave(form, done) {
        if (
          this.selectionData[0].sensorType == "l1_wy" ||
          this.selectionData[0].sensorType == "l1_sw"
        ) {
          delete form.z;
          delete form.value;
        } else if (this.selectionData[0].sensorType == "l1_qj") {
          delete form.value;
        } else if (this.selectionData[0].sensorType == "l1_lf") {
          delete form.x;
          delete form.y;
          delete form.z;
        }
        var sensorId = [];
        this.selectionData.forEach((item) => {
          sensorId.push(item.sensorId);
        });

        intallEdit(
          Object.assign(
            form, {
              ids: sensorId,
            }, {
              type: this.selectionData[0].sensorType,
            }
          )
        ).then((res) => {
          if (res.data.code == "0") {
            this.$message.success("保存成功");
          }
          done();
          this.isInstall = false;
          this.getList(this.page);
        });
      },
      // 删除监测数据
      handelDelData(row) {
        this.devData = row;
        this.delDataShow = true;
      },
      closeShow(){
        this.delDataShow = false;
      },
      delDataClose() {
        this.delDataShow = false;
      },
      // 异常判断批量设置
      handleAbnormalEdit() {
        let sensorList = this.getSelectionData();
        if (sensorList.length == 0) {
          this.$message.warning("请选择异常判断批量设置的数据");
          return;
        }
        sensorList.forEach(s => {
          s.type == 'l4_dx' ? (this.$message.warning('断线报警器不能设置异常判断')) : ""
        })
        if (sensorList.every(item => item.type === sensorList[0].type)) {
          this.isAbnormal = true
          this.sensorTitle = `${sensorList[0].label + '('+ sensorList.length + ')'} `
          this.devData = this.selectionData;
        } else {
          this.$message.warning("请选择相同类型传感器");
        }
      },

      // 批量删除
      handleBatchDelete() {
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
            return delObj(idList);
          })
          .then((data) => {
            this.$message.success("删除成功");
            this.$nextTick(() => {
              this.$refs.crud.selectClear();
            })
            this.getList(this.page);
          });
      },
      // 编辑提交
      handleUpdate: function (row, index, done, loading) {
        loading();
        if (this.tableOption.column[10].display == false) {
          row.x = null;
        }
        if (this.tableOption.column[11].display == false) {
          row.y = null;
        }
        if (this.tableOption.column[12].display == false) {
          row.z = null;
        }
        if (this.tableOption.column[13].display == false) {
          row.value = null;
        }
        putObj(
          Object.assign(
            row,
            this.SelectForm, {
              disasterCode: row.$disasterCode,
            }, {
              disasterName: row.$disasterName,
            }, {
              disasterId: row.$disasterId,
            }, {
              type: row.sensorType,
            }, {
              id: row.sensorId,
            }, {
              projectId: this.projectId
            }, this.objdata
          )
        ).then((data) => {
          this.$message.success("修改成功");
          this.refreshChange();
          done();
        });
      },
      // 新增提交
      handleSave: function (row, done, loading) {
        if (row.sensorType == "l1_wy" || row.sensorType == "l1_sw") {
          delete row.z;
          delete row.value;
        } else if (row.sensorType == "l1_qj") {
          delete row.value;
        } else if (row.sensorType == "l1_lf") {
          delete row.x;
          delete row.y;
          delete row.z;
        }
        if (this.tableOption.column[10].display == false) {
          row.x = null;
        }
        if (this.tableOption.column[11].display == false) {
          row.y = null;
        }
        if (this.tableOption.column[12].display == false) {
          row.z = null;
        }
        if (this.tableOption.column[13].display == false) {
          row.value = null;
        }
        loading();
        addObj(
          Object.assign(
            row,
            this.SelectForm, {
              disasterCode: row.$disasterCode,
            }, {
              disasterName: row.$disasterName,
            }, {
              disasterId: row.$disasterId,
            }, {
              type: row.sensorType,
            }, {
              projectId: this.projectId
            }, this.objdata
          )
        ).then((data) => {
          if (data.data.code == 0) {
            this.$message.success("添加成功");
            this.refreshChange();
            done();
          } else {
            this.$message.success(data.msg);
            this.refreshChange();
          }

          done();
        });
      },
      // 监测数据类型
      handleMonitor(data) {
        if (data.row.sensorType == "l1_gpbase") {
          this.$message.warning("基站没有监测数据");
          this.isMonitor = false;
          return
        }
        this.isMonitor = true;
        this.devData = data.row;
      },
      // 异常判断设置
      handleAbnormal(rowData) {
        let itemList = []
        let code = rowData.row.sensorCode
        if (code) {
          this.sensorTitle = code
        }
        this.isAbnormal = true;
        itemList.push(rowData.row)
        this.devData = itemList;
      },
      //  监测数据切换
      handleMonitorTab(column) {
        this.monitorType = column;
        // this.$message.success(JSON.stringify(column))
      },
      GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var nowM;
        var m =
          dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
        return y + "-" + m + "-" + d;
      },
      // 快速查询
      handleQuick(i) {
        this.curveForm.time = 1;
        this.quickNum = i;
        this.curveForm.daterange = [this.GetDateStr(-i), this.GetDateStr(0)];
      },
      // 监测曲线搜索
      // searchForm() {},
      // 绘制图表
      showChart() {
        this.curvelChartOption = {
          title: {
            text: "拉线",
            left: "center",
          },
          color: ["#FF0000"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
            },
          },
          grid: {
            width: 500,
          },
          xAxis: {
            type: "category",
            data: [
              "1-12-2021",
              "1-15-2021",
              "1-18-2021",
              "1-24-2021",
              "1-27-2021",
            ],
          },
          yAxis: {
            type: "value",
          },
          series: [{
            name: "拉线",
            data: [-230, -150, 0, 150, 230],
            type: "line",
          }, ],
        };
      },
      // 监测曲线清空
      handleEmpty() {
        if (this.$refs.curveForm !== undefined) {
          this.$refs.curveForm.resetForm();
        }
      },
      handleClose() {
        if (this.$refs.xYujinForm !== undefined) {
          this.$refs.xYujinForm.resetForm();
        }
        if (this.$refs.yYujinForm !== undefined) {
          this.$refs.yYujinForm.resetForm();
        }
        if (this.$refs.zYujinForm !== undefined) {
          this.$refs.zYujinForm.resetForm();
        }
        if (this.$refs.vYujinForm !== undefined) {
          this.$refs.vYujinForm.resetForm();
        }
        if (this.$refs.xDoubleForm !== undefined) {
          this.$refs.xDoubleForm.resetForm();
        }
        if (this.$refs.yDoubleForm !== undefined) {
          this.$refs.yDoubleForm.resetForm();
        }
        if (this.$refs.zDoubleForm !== undefined) {
          this.$refs.zDoubleForm.resetForm();
        }
        if (this.$refs.vDoubleForm !== undefined) {
          this.$refs.vDoubleForm.resetForm();
        }
        if (this.$refs.xDkForm !== undefined) {
          this.$refs.xDkForm.resetForm();
        }
        if (this.$refs.yDkForm !== undefined) {
          this.$refs.yDkForm.resetForm();
        }
        if (this.$refs.zDkForm !== undefined) {
          this.$refs.zDkForm.resetForm();
        }
        if (this.$refs.vDkForm !== undefined) {
          this.$refs.vDkForm.resetForm();
        }
        if (this.$refs.ylForm !== undefined) {
          this.$refs.ylForm.resetForm();
        }
      },
      handleEmpty2() {
        this.data_x = {};
        this.data_y = {};
        this.data_z = {};
        if (this.$refs.errorForm !== undefined) {
          this.$refs.errorForm.resetForm();
        }
      },
      // 数据异常设置
      handlError(row) {
        this.sensorId = row.sensorId;
        if (row.$sensorType == "裂缝计" || row.sensorType == "l1_lf") {
          this.errorTitle = "数据异常设置(裂缝计)";
          this.errorDataOption.column[2].display = true;
          this.errorDataOption.column[3].display = true;
          this.errorDataOption.column[4].display = true;
          this.errorDataOption.column[5].display = true;
          this.errorDataOption.column[6].display = false;
          this.errorDataOption.column[7].display = false;
        } else if (row.$sensorType == "加速度" || row.sensorType == "l1_js") {
          this.errorTitle = "数据异常设置(加速度)";
          this.errorDataOption.column[2].display = true;
          this.errorDataOption.column[3].display = true;
          this.errorDataOption.column[4].display = true;
          this.errorDataOption.column[5].display = true;
          this.errorDataOption.column[6].display = false;
          this.errorDataOption.column[7].display = false;
        } else if (row.$sensorType == "倾斜仪" || row.sensorType == "l1_qj") {
          this.errorTitle = "数据异常设置(倾斜仪)";
          this.errorDataOption.column[2].display = true;
          this.errorDataOption.column[3].display = true;
          this.errorDataOption.column[4].display = true;
          this.errorDataOption.column[5].display = true;
          this.errorDataOption.column[6].display = true;
          this.errorDataOption.column[7].display = true;
        } else if (row.$sensorType == "雨量计" || row.sensorType == "l1_yl") {
          this.errorTitle = "数据异常设置(雨量计)";
        } else if (row.$sensorType == "表面位移" || row.sensorType == "l1_wy") {
          this.errorTitle = "数据异常设置(表面位移)";
          this.errorDataOption.column[2].display = true;
          this.errorDataOption.column[3].display = true;
          this.errorDataOption.column[4].display = true;
          this.errorDataOption.column[5].display = true;
          this.errorDataOption.column[6].display = false;
          this.errorDataOption.column[7].display = false;
        } else {
          this.errorTitle = "数据异常设置";
          this.errorDataOption.column[2].display = true;
          this.errorDataOption.column[3].display = true;
          this.errorDataOption.column[4].display = true;
          this.errorDataOption.column[5].display = true;
          this.errorDataOption.column[6].display = true;
          this.errorDataOption.column[7].display = true;
        }
        getError({
          sid: row.sensorId,
        }).then((res) => {
          if (res.data.data) {
            this.errorForm = res.data.data;
            res.data.data.range.forEach((item) => {
              if (
                item.type.substr(item.type.length - 1, 1) == "x" ||
                item.type.substr(item.type.length - 1, 1) == "X"
              ) {
                this.data_x = item;
              }
              if (
                item.type.substr(item.type.length - 1, 1) == "y" ||
                item.type.substr(item.type.length - 1, 1) == "Y"
              ) {
                this.data_y = item;
              }
              // if (
              //   item.type.substr(item.type.length - 1, 1) == "z" ||
              //   item.type.substr(item.type.length - 1, 1) == "Z"
              // ) {
              //   this.data_z = item;
              //   this.errorDataOption.column[6].display = true;
              //   this.errorDataOption.column[7].display = true;
              // } else {
              //   this.errorDataOption.column[6].display = false;
              //   this.errorDataOption.column[7].display = false;
              // }
              if (item.type.slice(0, -2) == "tilt") {
                this.errorDataOption.column[2].label = "X(°)";
                this.errorDataOption.column[4].label = "Y(°)";
                this.errorDataOption.column[6].label = "Z(°)";
              }
              if (item.type.slice(0, -2) == "acc") {
                this.errorDataOption.column[2].label = "X(m/s²)";
                this.errorDataOption.column[4].label = "Y(m/s²)";
                this.errorDataOption.column[6].label = "Z(m/s²)";
              }
              if (item.type.slice(0, -2) == "wy") {
                this.errorDataOption.column[2].label = "X（MM）";
                this.errorDataOption.column[4].label = "Y（MM）";
                this.errorDataOption.column[6].label = "Z（MM）";
              }
            });
          }
        });
        this.isError = true;
      },

      getYujinData(row) {
        getYujin({
          sensorNo: row.sensorCode,
          projectId: this.projectId
        }).then((res) => {
          res.data.data.forEach((item) => {
            if (
              item.dimensionality.indexOf("x") != -1 ||
              item.dimensionality.indexOf("X") != -1
            ) {
              this.xYujinForm = item;
            }
            if (
              item.dimensionality.indexOf("y") != -1 ||
              item.dimensionality.indexOf("Y") != -1
            ) {
              this.yYujinForm = item;
            }
            if (
              item.dimensionality.indexOf("z") != -1 ||
              item.dimensionality.indexOf("Z") != -1
            ) {
              this.zYujinForm = item;
            }
            if (item.dimensionality.indexOf("value") != -1) {
              this.vYujinForm = item;
            }
          });
        });
        getDouble({
          sensorNo: row.sensorCode,
        }).then((res) => {
          res.data.data.forEach((item) => {
            if (
              item.dimensionality.indexOf("x") != -1 ||
              item.dimensionality.indexOf("X") != -1
            ) {
              this.xDoubleForm = item;
            }
            if (
              item.dimensionality.indexOf("y") != -1 ||
              item.dimensionality.indexOf("Y") != -1
            ) {
              this.yDoubleForm = item;
            }
            if (
              item.dimensionality.indexOf("z") != -1 ||
              item.dimensionality.indexOf("Z") != -1
            ) {
              this.zDoubleForm = item;
            }
            if (item.dimensionality.indexOf("value") != -1) {
              this.vDoubleForm = item;
            }
          });
        });

        getDk({
          sensorNo: row.sensorCode,
        }).then((res) => {
          res.data.data.forEach((item) => {
            if (
              item.dimensionality.indexOf("x") != -1 ||
              item.dimensionality.indexOf("X") != -1
            ) {
              this.xDkForm = item;
            }
            if (
              item.dimensionality.indexOf("y") != -1 ||
              item.dimensionality.indexOf("Y") != -1
            ) {
              this.yDkForm = item;
            }
            if (
              item.dimensionality.indexOf("z") != -1 ||
              item.dimensionality.indexOf("Z") != -1
            ) {
              this.zDkForm = item;
            }
            if (item.dimensionality.indexOf("value") != -1) {
              this.vDkForm = item;
            }
          });
        });
      },

      searchChange(form, done) {
        this.searchForm = form;
        this.page.currentPage = 1;
        this.getList(this.page, form);
        done();
      },

      handlereset(form) {
        this.searchForm = form;
        this.page.currentPage = 1;
        this.getList(this.page, form);
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
        this.getList(this.page, this.searchForm);
      },
      currentChange(current) {
        this.page.currentPage = current;
        this.getList(this.page, this.searchForm);
      },
      refreshChange() {
        this.getList(this.page, this.searchForm);
      },
    },
  };

</script>

<style lang="scss" scoped>
  .el-textarea {
    border: 1px solid #f0f0f0;
  }

  .el-form-item__label {
    width: 130px;
  }

  .form-item-label {
    font-size: 14px;
    color: #606266;
  }

  .quick-query {
    span {
      margin: 0 5px;
    }
  }

  .quick-active {
    color: #409eff;
  }

  .node_right {
    margin-top: 25px;
    display: flex;
    justify-content: flex-end;
  }

  // .avue-dialog{
  //   height:60%;
  //   overflow-y:scroll;
  // }

</style>
