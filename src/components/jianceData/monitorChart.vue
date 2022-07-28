<template>
  <div class="bc_monitor-chart">
    <avue-form ref="chartForm" v-if="fromShow" v-model="chartForm" :option="chartOption">
      <template slot="menuForm">
        <el-button type="primary" @click="searchFormQuxian">搜索</el-button>
        <!-- <el-button @click="handleEmpty">清 空</el-button> -->
        <el-button @click="handleRefresh">刷 新</el-button>
      </template>
    </avue-form>
    <div class="quick-query">
      快速查询：
      <span @click="handleQuick(1)" :class="quickNum == 1 ? 'quick-active' : ''">1日</span>
      <span @click="handleQuick(3)" :class="quickNum == 3 ? 'quick-active' : ''">3日</span>
      <span @click="handleQuick(7)" :class="quickNum == 7 ? 'quick-active' : ''">7日</span>
      <span @click="handleQuick(15)" :class="quickNum == 15 ? 'quick-active' : ''">15日</span>
      <span @click="handleQuick(30)" :class="quickNum == 30 ? 'quick-active' : ''">30日</span>
    </div>
    <div class="positionServer">
      <el-popover placement="top" :width="devListSwitch.sensorType !== 'l3_yl' ? 400 : 460" trigger="click">
        <div v-for="(item, index) in lineData" :key="index">
          <div v-if="devListSwitch.sensorType !== 'l3_yl'">
            <span class="yuzhi_name">{{ item.alias }}轴相邻阈值：({{ item.unit }})</span><br />
            <span class="rander lanse"></span><span class="font-14">{{
                panjuDataList[index] == undefined
                  ? "暂未设置"
                  : panjuDataList[index].warnValueEachBlue
              }}</span>
            <span class="rander huangse"></span><span class="font-14">{{
                panjuDataList[index] == undefined
                  ? "暂未设置"
                  : panjuDataList[index].warnValueEachYellow
              }}</span>
            <span class="rander chengse"></span><span class="font-14">{{
                panjuDataList[index] == undefined
                  ? "暂未设置"
                  : panjuDataList[index].warnValueEachOrange
              }}</span>
            <span class="rander hongse"></span><span class="font-14">{{
                panjuDataList[index] == undefined
                  ? "暂未设置"
                  : panjuDataList[index].warnValueEachRed
              }}</span>
            <span class="yuzhi_name">{{ item.alias }}轴累计阈值：({{ item.unit }})</span><br />
            <span class="rander lanse"></span><span class="font-14">{{
                panjuDataList[index] == undefined
                  ? "暂未设置"
                  : panjuDataList[index].warnValueSumBlue
              }}</span>
            <span class="rander huangse"></span><span class="font-14">{{
                panjuDataList[index] == undefined
                  ? "暂未设置"
                  : panjuDataList[index].warnValueSumYellow
              }}</span>
            <span class="rander chengse"></span><span class="font-14">{{
                panjuDataList[index] == undefined
                  ? "暂未设置"
                  : panjuDataList[index].warnValueSumOrange
              }}</span>
            <span class="rander hongse"></span><span class="font-14">{{
                panjuDataList[index] == undefined
                  ? "暂未设置"
                  : panjuDataList[index].warnValueSumRed
              }}</span>
          </div>
          <div v-else>
            <span class="yuzhi_name">雨量计阈值信息：({{ item.unit }})</span><br />
            <span class="rander lanse"></span><span class="font-14-yl">{{
                  panjuDataList[index] == undefined
                    ? "暂未设置"
                    : panjuDataList[index].blueWarnDuringHour +
                      "小时内蓝色预警值："
                }}{{
                  panjuDataList[index] == undefined
                    ? ""
                    : panjuDataList[index].blueWarnRainfall
                }}</span>
            <span class="rander huangse"></span><span class="font-14-yl">{{
                  panjuDataList[index] == undefined
                    ? "暂未设置"
                    : panjuDataList[index].yellowWarnDuringHour +
                      "小时内黄色预警值："
                }}{{
                  panjuDataList[index] == undefined
                    ? ""
                    : panjuDataList[index].yellowWarnRainfall
                }}</span><br />
            <span class="rander chengse"></span><span class="font-14-yl">{{
                  panjuDataList[index] == undefined
                    ? "暂未设置"
                    : panjuDataList[index].orangeWarnDuringHour +
                      "小时内橙色预警值："
                }}{{
                  panjuDataList[index] == undefined
                    ? ""
                    : panjuDataList[index].orangeWarnRainfall
                }}</span>
            <span class="rander hongse"></span><span class="font-14-yl">{{
                  panjuDataList[index] == undefined
                    ? "暂未设置"
                    : panjuDataList[index].redWarnDuringHour +
                      "小时内红色预警值："
                }}{{
                  panjuDataList[index] == undefined
                    ? ""
                    : panjuDataList[index].redWarnRainfall
                }}</span>
          </div>
        </div>
        <!-- <el-button el-button slot="reference">阈值信息</el-button> -->
      </el-popover>

      <!-- <div class="open_type" v-if="devListSwitch.sensorType == 'l1_js' || devListSwitch.sensorType == 'l1_lf' || devListSwitch.sensorType == 'l1_wy' || devListSwitch.sensorType == 'l1_qj'">
          <div>
            是否打开曲线点击事件：
          </div>
          <el-switch
            v-model="modelOpenType"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div> -->
    </div>
    <div class="bc_dev_chart" v-loading="searchAfter" v-if="modelFalse">
      <div class="dev_chat" :class="!threeModuleShow ? 'dev_chat-full' : ''">
        <div class="dev_chat_model" v-if="modelOpenType">
          <smallModel :modelData="modelData"></smallModel>
        </div>
        <chart-com :options="curvelChartOption" ref="curvelChartRef"></chart-com>
      </div>
      <div class="dev_model" v-if="threeModuleShow">
        <three-com :modelData="modelData"></three-com>
      </div>
    </div>
    <div class="bc_deep_model" v-loading="searchAfter" v-if="deepModelShow">
      <div class="bc_deep_title">
        <span class="dev_title">{{deviceName}}</span>
        <el-select v-model="modelValue" placeholder="请选择" @change="deepChartChange">
          <el-option v-for="item in modelOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!-- 数据点 & 日均 -->
      <div class="bc_deep_chart" v-if="modelValue === 0 || modelValue === 1">
        <data-chart :chartData="cumulateChart" :chartType="'cumulate'" :deviceList="deviceList"></data-chart>
        <data-chart :chartData="relativeChart" :chartType="'relative'" :deviceList="deviceList"></data-chart>
        <data-chart :chartData="threeDimChart" :chartType="'threeDim'" :deviceList="deviceList"></data-chart>
      </div>
      <!-- 趋势图 -->
      <div class="bc_deep_chart" v-if="modelValue === 2">
        <trend-chart :trandChartForm="trandChartForm"></trend-chart>
      </div>
      <!-- 节点位移 -->
      <div class="bc_deep_chart" v-if="modelValue === 3">
        <node-movement :trandChartForm="trandChartForm"></node-movement>
      </div>
      <!-- 地层运移轨迹 -->
      <div class="bc_deep_chart" v-if="modelValue === 4">
        <trajectory-chart :trajectData="trajectoryData"></trajectory-chart>
      </div>
    </div>
  </div>
</template>

<script>
  import smallModel from "../threecom/smallModel";
  import dataChart from "./chartLayers/dataChart.vue";
  import trajectoryChart from "./chartLayers/trajectoryChart.vue"
  import nodeMovement from "./chartLayers/nodeMovement.vue"
  import trendChart from "./chartLayers/trendChart.vue"

  import {
    quxianDataReturn,
    quxianDataReturnDay,
    getCumulateData,
    getCumulateDataDay,
    getRelativeData,
    getRelativeDataDay,
    postYujing,
    searchSersorType,
  } from "@/api/monitorManage/quxian";
  import {
    getYUliang
  } from "@/api/monitorManage/sensor";

  import {
    echartsType,
    echartsTypeYL,
    echartsTypeLF
  } from "@/const/crud/monitorManage/echartsType";

  export default {
    components: {
      dataChart,
      smallModel,
      trajectoryChart,
      nodeMovement,
      trendChart
    },
    props: ["devListSwitch", "formColumn", "deviceList",'isDevMangement'],
    data() {
      return {
        chartForm: {
          time: 0,
          rainfallEchartType: 0,
          datetimerange: [],
          daterange: ""
        },
        chartOption: {
          labelWidth: 0,
          submitBtn: false,
          emptyBtn: false,
          delBtn: false,
          menuSpan: 6,
          column: [],
        },
        quickNum: 0,
        lineData: [],

        fromShow: false,
        searchAfter: true,
        modelOpenType: false,
        threeModuleShow: false,
        modelFalse: false,
        deepModelShow: false,

        nameValue: "",
        modelData: {
          id: "",
          type: "",
        },
        panjuDataList: [],
        deviceName: "",
        modelValue: 0,
        modelOptions: [{
            value: 0,
            label: '数据点'
          },
          {
            value: 1,
            label: '日均'
          },
          {
            value: 2,
            label: '趋势图'
          },
          {
            value: 3,
            label: '节点位移'
          },
          {
            value: 4,
            label: '地层运移轨迹'
          }
        ],
        curvelChartOption: {},
        cumulateChart: {},
        relativeChart: {},
        threeDimChart: {},

        trajectoryData: {},
        trandChartForm: {},
      };
    },

    computed: {},
    mounted() {
      searchSersorType("sensor_type").then((prame) => {
        var sersorTypeAll = prame.data.data;
        for (var i = 0; i < sersorTypeAll.length; i++) {
          if (this.devListSwitch.sensorType === sersorTypeAll[i].value) {
            this.nameValue = this.devListSwitch.deviceName + " (" + sersorTypeAll[i].label + "—" + (this
              .devListSwitch.sensorCode || this.devListSwitch.sensorNo) + ")";
            break;
          }
        }
      })
    },
    watch: {
      "devListSwitch": {
        immediate: true,
        handler(b, a) {
          this.handleRefresh()
          if (b.noData) {
            this.modelData = {
              deviceId: b.deviceId,
              type: "qxzdbmwy_001",
            };
            this.deepModelShow = true;
            this.fromShow = false;
            this.searchAfter = false;
          } else {
            if (b.nodeclick) {
              this.modelData = {
                deviceId: b.deviceId,
                type: "qxzdbmwy_001",
                lunxun: false,
              };
            } else {
              // this.chartForm.datetimerange = [
              //   this.$parent.GetDateStr(-7, "hours"),
              //   this.$parent.GetDateStr(0, "hours"),
              // ];
              if(!this.isDevMangement){
                  this.chartForm.datetimerange = [
                  this.$parent.GetDateStr(-7, "hours"),
                  this.$parent.GetDateStr(0, "hours"),
                ];
              }
              this.modelData = {
                deviceId: b.deviceId,
                type: "qxzdbmwy_001",
                lunxun: false,
              };
            }

            if (b.sensorType == "l1_sw") { // 雨量计 && 深部位移
              this.modelFalse = false;
              this.deepModelShow = true;
              this.threeModuleShow = false;

            } else if (b.sensorType == "l3_yl") {
              this.modelFalse = true;
              this.deepModelShow = false;
              this.threeModuleShow = false;
              this.chartForm.time = 0;
            } else if (b.sensorType == "l4_nw" || b.sensorType == "l5_ll" || b.sensorType == "l3_ls" || b.sensorType ==
              "l3_qw" || b.sensorType == "l5_zd") { //泥位 & 流量 & 流速 & 气温 & 微感
              this.modelFalse = true;
              this.deepModelShow = false;
              this.threeModuleShow = false
            } else { // 地面位移 & 倾斜仪 & 加速度 & 裂缝 & 地表位移 & 振动 & 地下水 & 地表水 & 表面位移(XYZ)
              this.modelFalse = true;
              this.deepModelShow = false;
              this.threeModuleShow = false
            }

            if (b.sensorType == "l1_sw") { // 雨量计 && 深部位移
              this.getquxianList("cumulate");
              this.getquxianList("relative");
              this.getquxianList("threeDim");
            } else { // 地面位移 & 倾斜仪 & 加速度 & 裂缝 & 地表位移 & 振动
              this.getquxianList();
            }
          }
        }
      },
      "formColumn": {
        immediate: true,
        handler(b, a) {
          if (b) {
            this.chartOption.column = b
          }
          this.fromShow = true
        }
      },
      "modelValue": {
        handler(x, y) {
          if (x == 1) {
            this.chartOption.column.forEach(cols => {
              if (cols.type == "daterange") {
                cols.display = true
              }
              if (cols.type == "datetimerange") {
                cols.display = false
              }
            })
          } else {
            this.chartOption.column.forEach(cols => {
              if (cols.type == "daterange") {
                cols.display = false
              }
              if (cols.type == "datetimerange") {
                cols.display = true
              }
            })
          }
        }
      }

    },
    methods: {
      handleRefresh() {
        if(!this.isDevMangement){
            this.chartForm.datetimerange = [
            this.$parent.GetDateStr(-7, "hours"),
            this.$parent.GetDateStr(0, "hours"),
          ];
          this.searchFormQuxian(7);
        }else{
          this.searchFormQuxian();
        }
        
      },
      // 监测曲线搜索
      searchFormQuxian() {
        if (this.devListSwitch.sensorType == "l1_sw") {
          this.getquxianList("cumulate", this.modelValue);
          this.getquxianList("relative", this.modelValue);
          this.getquxianList("threeDim", this.modelValue); //监测曲线接口调用
          if (this.modelValue !== 0 && this.modelValue !== 1) {
            this.deepChartChange(this.modelValue)
          }
        } else {
          this.getquxianList()
        }
        this.searchAfter = true;
      },
      /**
       * 快速查询
       */
      handleQuick(num) {
        this.searchAfter = true;
        this.quickNum = num;
        this.chartForm.datetimerange = [
          this.$parent.GetDateStr(-num, "hours"),
          this.$parent.GetDateStr(0, "hours"),
        ];
        if (this.devListSwitch.sensorType == "l1_sw") {
          this.getquxianList("cumulate", this.modelValue);
          this.getquxianList("relative", this.modelValue);
          this.getquxianList("threeDim", this.modelValue);
        } else {
          this.getquxianList()
        }
      },
      /**
       * 获取监测曲线数据
       */
      getquxianList(type, val) {
        if (this.chartForm.datetimerange && this.chartForm.datetimerange.length < 1) {
          this.$message({
            type: "warning",
            message: "请选择时间范围进行搜索！"
          });
          this.searchAfter = false;
          return false;
        } else {
          if (this.devListSwitch.sensorType == "l1_sw") {
            // postYujing({
            //   sensorNo: this.devListSwitch.sensorCode,
            // }).then((resdddd) => {
            //   this.panjuDataList = resdddd.data.data;
            // });
            this.getDeepChartsData(type, val)
          } else if (this.devListSwitch.sensorType == "l3_yl") {
            // getYUliang({
            //   sensorCode: this.devListSwitch.sensorCode,
            // }).then((red) => {
            //   this.panjuDataList = red.data.data.records;
            // });
            this.getOtherChartsData()
          } else {
            // postYujing({
            //   sensorNo: this.devListSwitch.sensorCode,
            // }).then((resdddd) => {
            //   this.panjuDataList = resdddd.data.data;
            // });
            this.getOtherChartsData()
          }
        }
      },

      /**
       * 其他曲线数据请求
       * @constructor
       * @param {}
       */
      getOtherChartsData() {
        let otherQuery;
        otherQuery = {
          rainfallQueryIntervalHour: this.chartForm.time,
          beginTime: this.chartForm.datetimerange[0],
          endTime: this.chartForm.datetimerange[1],
          sensorNo: this.devListSwitch.sensorCode || this.devListSwitch.sensorNo,
          type: this.devListSwitch.sensorType,
          rainfallEchartType: this.chartForm.rainfallEchartType,
        }
        quxianDataReturn(otherQuery).then(res => {
          this.dealChartsData(res.data.data);
        })
      },
      /**
       * 深部位移曲线数据请求
       * @constructor
       * @param {type} 数据类型
       * @param {val} 数据模块对应的key
       */
      getDeepChartsData(type, val) {
        let cumutiveQuery, //累计&相对
            threeDimQuery; //三维
        cumutiveQuery = {
          rainfallQueryIntervalHour: this.chartForm.time,
          beginTime: this.chartForm.datetimerange[0],
          endTime: this.chartForm.datetimerange[1],
          beginDate: this.chartForm.daterange[0],
          endDate: this.chartForm.daterange[1],
          sensorNo: this.devListSwitch.sensorCode || this.devListSwitch.sensorNo,
          type: this.devListSwitch.sensorType,
          rainfallEchartType: this.chartForm.rainfallEchartType,
        }
        threeDimQuery = {
          rainfallQueryIntervalHour: this.chartForm.time,
          beginTime: this.modelValue == 1 ? this.chartForm.daterange[0] : this.chartForm.datetimerange[0],
          endTime: this.modelValue == 1 ? this.chartForm.daterange[1] : this.chartForm.datetimerange[1],
          sensorNo: (this.devListSwitch.sensorCode || this.devListSwitch.sensorNo),
          type: this.imgExampleType ? this.devListSwitch.sensorType : "l1_sw",
          // type: this.imgExampleType ? this.devListSwitch.sensorType : "l5_zb",
          // deviceId:this.devListSwitch.deviceId,
          // sanwSensorNo:this.devListSwitch.sensorCode||this.devListSwitch.sensorNo
        }
        if (type) {
          if (!val || this.modelValue !== 1) {
            if (type == 'cumulate') {
              getCumulateData(cumutiveQuery).then(res => {
                this.dealChartsData(res.data.data, 'cumulate');
              })
            } else if (type == 'relative') {
              getRelativeData(cumutiveQuery).then(res => {
                this.dealChartsData(res.data.data, 'relative');
              })
            } else {
              quxianDataReturn(threeDimQuery).then(res => {
                this.dealChartsData(res.data.data, 'threeDim');
              })
            }
          } else {
            if (type == 'cumulate') {
              getCumulateDataDay(cumutiveQuery).then(res => {
                this.dealChartsData(res.data.data, 'cumulate');
              })
            } else if (type == 'relative') {
              getRelativeDataDay(cumutiveQuery).then(res => {
                this.dealChartsData(res.data.data, 'relative');
              })
            } else {
              quxianDataReturnDay(threeDimQuery).then(res=>{
                this.dealChartsData(res.data.data, 'threeDim');
              })
            }
          }
        }
      },

      dealChartsData(resData, type) {
        if (this.devListSwitch.label == undefined) {
          if (this.devListSwitch.$sensorType == undefined) {
            this.deviceName = this.nameValue;
          } else {
            this.deviceName =
              this.devListSwitch.deviceName +
              "(" +
              this.devListSwitch.$sensorType +
              "—" +
              (this.devListSwitch.sensorCode || this.devListSwitch.sensorNo) +
              ")";
          }
        } else {
          this.deviceName = this.devListSwitch.label;
        }
        if (this.devListSwitch.sensorType !== "l1_sw" && resData.data) {
          this.showChart(resData, this.deviceName, resData.data[0].unit, "") //初始化图表
        } else {
          if (type == "cumulate") {
            this.cumulateChart = resData
          } else if (type == "threeDim") {
            this.threeDimChart = resData
          } else if (type == "relative") {
            this.relativeChart = resData
          } else {
            this.lineData = resData.data;
          }
        }
        this.searchAfter = false;
      },


      // 绘制图表
      showChart(data, name, danwei, nodeList) {
        var kkkk = 0;
        if (this.devListSwitch.sensorType !== "l1_sw") {
          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].data.length > 0) {
              kkkk++;
            }
          }
        }
        if (kkkk === 0) {
          this.searchAfter = false;
          this.curvelChartOption = {};
        } else {
          this.searchAfter = false;
          if (this.devListSwitch.sensorType == "l3_yl") { //雨量
            this.curvelChartOption = {};
            this.chartForm.time == 0 || this.chartForm.rainfallEchartType == 0 ? data : data.data[0].alias = "",
              this.curvelChartOption = echartsTypeYL(
                data,
                name,
                danwei,
                this.chartForm.time,
                this.deviceList.disasterCode
              );
          } else if (this.devListSwitch.sensorType == "l1_lf") { //裂缝
            this.curvelChartOption = echartsTypeLF(
              data,
              name,
              danwei,
              this.devListSwitch.sensorType,
              this.panjuDataList,
              this.deviceList.disasterCode
            );
          } else {
            this.curvelChartOption = echartsType(
              data,
              name,
              danwei,
              this.devListSwitch.sensorType,
              this.deviceList.disasterCode
            );
          }
        }
      },

      deepChartChange(val) {
        if (val == 1) {
          this.modelValue = val;
          this.chartForm.daterange = [
            this.$parent.GetDateStr(-7, "day"),
            this.$parent.GetDateStr(0, "day"),
          ];
          this.getquxianList("cumulate", val);
          this.getquxianList("relative", val);
          this.getquxianList("threeDim", val);
        } else if (val == 2) {
          this.modelValue = val;
          this.chartOption.column.forEach(cols => {
            if (cols.type == "daterange") {
              cols.display = false
            }
            if (cols.type == "datetimerange") {
              cols.display = true
            }
          })
          this.trandChartForm = {
            rainfallQueryIntervalHour: this.chartForm.time,
            beginTime: this.chartForm.datetimerange[0],
            endTime: this.chartForm.datetimerange[1],
            sensorNo: this.devListSwitch.sensorCode || this.devListSwitch.sensorNo,
            type: this.devListSwitch.sensorType,
            rainfallEchartType: this.chartForm.rainfallEchartType,
          }
        } else if (val == 3) {
          this.modelValue = val;
          this.trandChartForm = {
            rainfallQueryIntervalHour: this.chartForm.time,
            beginTime: this.chartForm.datetimerange[0],
            endTime: this.chartForm.datetimerange[1],
            sensorNo: this.devListSwitch.sensorCode || this.devListSwitch.sensorNo,
            type: this.devListSwitch.sensorType,
            rainfallEchartType: this.chartForm.rainfallEchartType,
          }
        } else if (val == 4) {
          this.modelValue = val;
          this.trajectoryData = {
            rainfallQueryIntervalHour: this.chartForm.time,
            beginTime: this.chartForm.datetimerange[0],
            endTime: this.chartForm.datetimerange[1],
            sensorNo: this.devListSwitch.sensorCode || this.devListSwitch.sensorNo,
            type: this.devListSwitch.sensorType,
            rainfallEchartType: this.chartForm.rainfallEchartType,
          }
        } else {
          this.modelValue = val;
          this.chartForm.datetimerange = [
            this.$parent.GetDateStr(-7, "hours"),
            this.$parent.GetDateStr(0, "hours"),
          ];
          this.getquxianList("cumulate");
          this.getquxianList("relative");
          this.getquxianList("threeDim");
        }
      },

      /**
       * 三维数据请求类型去切换
       */
      initSensorCode(code) {
        if (code) {
          return code.split("_")[0] + "_l5_zb";
        }
      },
    }
  }

</script>
<style lang='scss' scoped>
  .bc_monitor-chart {
    .quick-query {
      color: gray;
      padding-left: 10px;
      padding-right: 10px;

      span {
        margin: 0 5px;
        cursor: pointer;
      }
    }

    .quick-active {
      color: #409eff;
    }

    ::v-deep.el-form-item {
      margin-bottom: 0px !important;
    }

    .rander {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 3px;
      margin-left: 3px;
    }

    .lanse {
      background: blue;
    }

    .huangse {
      background: yellow;
    }

    .chengse {
      background: orange;
    }

    .hongse {
      background: red;
    }

    .bc_dev_chart {
      width: 100%;
      height: 400px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .dev_chat {
        width: 70%;
        height: 100%;
        position: relative;

        .dev_chat_model {
          position: absolute;
          left: -330px;
          top: 0;
          width: 330px;
          height: 400px;
          background: white;
          border: 1px solid #6f6f6f;
          box-shadow: 0px 0px 10px 2px;
          border-radius: 5px;
        }
      }

      .dev_chat-full {
        width: 100% !important;
      }

      .dev_model {
        width: 30%;
        height: 100%;
      }
    }

    .bc_deep_model {
      width: 100%;

      .bc_deep_title {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .bc_deep_chart {
        width: 100%;
        height: 65vh;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
    }

    .open_type {
      display: flex;
      align-items: center;
    }



    .img_example {
      width: 100px;
      height: 100px;
      position: absolute;
      right: 0;
      top: 40%;

      ul {
        margin: 0;
        padding: 0;

        li {
          list-style-type: none;
          display: flex;
          align-items: center;

          .img_example_spot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
          }
        }
      }
    }
  }

  ::v-deep.dev_title {
    color: #606266 !important;
  }

</style>
