<template>
  <div class="jiance_div" v-if="dataShow">
    <!-- 头部标题 -->
    <div class="title_name">{{ `${devList.disasterCode || ""} ${devList.disasterName || ""}` }}</div>
    <!-- nav-bar -->
    <avue-tabs ref="tabsValue" :option="monitorOption" @change="handleMonitorTab"></avue-tabs>

    <div v-show="monitorType.prop === 'tab1'" class="curve-form" v-loading="loadShow">
      <monitor-chart :devListSwitch="devListone" :formColumn="formColumn" :isDevMangement="isOk" :deviceList="devList" ref="monitorChartRef"></monitor-chart>
    </div>

    <div v-show="monitorType.prop === 'tab2'" class="curve-form">
      <monitor-table :devListSwitch="devListone" :formColumn="formColumn" :isDevMangement="isOk" :deviceList="devList" ref="monitorTableRef"></monitor-table>
    </div>

    <div v-show="monitorType.prop === 'tab3'" class="curve-form">
      <devinformation :dev-data="devData" :refresh-type="refreshType"  ref="devInfoRef"></devinformation>
    </div>
  </div>
</template>

<script>
  import store from "@/store";
  // components
  import devinformation from "./devinformation";
  import monitorTable from "./monitorTable.vue";
  import monitorChart from "./monitorChart.vue";

  // api
  import {
    deviceInformation,
    searchSersorType,
  } from "@/api/monitorManage/quxian";

  export default {
    name: "monitorData",
    components: {
      devinformation,
      monitorTable,
      monitorChart
    },
    props: ["devListone", "devType"],
    data() {
      return {
        devId: "",
        devData: {},
        devList: {},
        loadShow: true,
        monitorType: {},
        dataShow: true,
        monitorOption: {
          column: [{
              label: "监测曲线",
              prop: "tab1"
            },
            {
              label: "监测数据",
              prop: "tab2"
            },
            {
              label: "设备信息",
              prop: "tab3"
            }
          ],
        },
        isOk:false,
        refreshType: false
      }
    },
    watch: {
      "devListone": {
        handler(newVal, oldVal) {
          console.log(newVal);
          if (newVal.deviceId == "") {
            this.dataShow = false;
          } else {
            this.dataShow = true;
          }
          this.loadShow = true;
          if (newVal.deviceId) {
            this.devId = newVal.deviceId
            // this.getInformation();
          }
          if (newVal.deviceId != undefined) {
            this.devData = {
              deviceId: newVal.deviceId,
            };
          }
          if (newVal.sensorType == "l3_yl") {
            this.formColumn = [{
              label: "",
              prop: "time",
              type: "select",
              arrow: true,
              dicData: [{
                  label: "实时",
                  value: 0
                },
                {
                  label: "1小时",
                  value: 1
                },
                {
                  label: "3小时",
                  value: 3
                },
                {
                  label: "6小时",
                  value: 6
                },
                {
                  label: "12小时",
                  value: 12
                },
              ],
              span: 4
            }, {
              label: "",
              prop: "datetimerange",
              type: "datetimerange",
              startPlaceholder: "开始时间",
              endPlaceholder: "结束时间",
              span: 10,
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
            }, {
              label: "",
              prop: "rainfallEchartType",
              type: "select",
              arrow: true,
              placeholder: "滑动雨量",
              dicData: [{
                  label: "滑动雨量",
                  value: 0
                },
                {
                  label: "累计雨量",
                  value: 1
                },
              ],
              span: 4,
            }];
          } else {
            this.formColumn = [{
              label: "",
              prop: "time",
              type: "select",
              dicData: [{
                  label: "实时",
                  value: 0
                },
                {
                  label: "3小时",
                  value: 3,
                  disabled: true
                },
                {
                  label: "6小时",
                  value: 6,
                  disabled: true
                },
                {
                  label: "12小时",
                  value: 12,
                  disabled: true
                },
              ],
              span: 4,
              mock: {
                type: "dic"
              },
            }, {
              label: "",
              prop: "datetimerange",
              type: "datetimerange",
              startPlaceholder: "开始时间",
              endPlaceholder: "结束时间",
              span: 10,
              display: true,
              format: "yyyy-MM-dd HH:mm:ss", //前端展示格式
              valueFormat: "yyyy-MM-dd HH:mm:ss", //设置后端接收的日期格式
            }, {
              label: "",
              prop: "daterange",
              type: "daterange",
              startPlaceholder: "开始时间",
              endPlaceholder: "结束时间",
              span: 10,
              display: false,
              format: "yyyy-MM-dd", //前端展示格式
              valueFormat: "yyyy-MM-dd", //设置后端接收的日期格式
            }];
          }
          this.loadShow = false
        },

        immediate: true
      }
    },
    created() {
      this.monitorType = this.monitorOption.column[0];
    },
    mounted() {
      this.getSersorLabel();
    },
    methods: {
      /**
       * 获取设备信息
       */
      getInformation() {
        if (this.devId) {
          deviceInformation(this.devId).then((res) => {
            this.devList = res.data.data;
          });
        }
      },
      /**
       * 获取传感器类型
       */
      getSersorLabel() {
        searchSersorType("sensor_type").then((prame) => {
          var sersorTypeAll = prame.data.data;
          for (var i = 0; i < sersorTypeAll.length; i++) {
            if (this.devListone.sensorType === sersorTypeAll[i].value) {
              this.nameValue =
                this.devListone.deviceName +
                "(" +
                sersorTypeAll[i].label +
                "—" +
                this.devListone.sensorCode +
                ")";
              break;
            }
          }
        });
      },
      //  监测数据切换
      handleMonitorTab(column) {
        this.monitorType = column;
        if (column.prop == "tab3") {
          this.refreshType = true;
        }
      },

      /**
       * 初始化查询时间
       */
      GetDateStr(AddDayCount, val) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
        var h = dd.getHours() < 10 ? "0" + dd.getHours() : dd.getHours(); //获取当前实时时间，不足10补0
        var mm = dd.getMinutes() < 10 ? "0" + dd.getMinutes() : dd.getMinutes(); //获取当前实时时间，不足10补0
        var s = dd.getSeconds() < 10 ? "0" + dd.getSeconds() : dd.getSeconds(); //获取当前实时时间，不足10补0
        if (val == "hours") {
          return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
        } else if (val == "day") {
          return y + "-" + m + "-" + d;
        }
      },
      changChildTime(data){
          if(data&&data.length==2){
            
            setTimeout(() => {
                this.$refs.monitorChartRef.chartForm.datetimerange=data
                this.$refs.monitorTableRef.tableForm.datetimerange=data
                this.$refs.monitorTableRef.getMonitorData()
            }, 200);
           
          }
      }
    }
  };

</script>

<style lang="scss" scoped>
  ::v-deep.avue-form__group {
    align-items: center;
  }

  ::v-deep.avue-form__menu {
    width: auto !important;
  }

  .jiance_div {
    width: 100%;
    height: 100%;
    position: relative;

    .title_name {
      text-align: center;
      z-index: 1000;
      font-size: 20px;
      font-weight: bold;
      color: #505050;
    }
  }

  .curve-form {
    height: auto;

    .avue-form__group {
      ::v-deep.avue-form__menu--center {
        width: 20% !important;
      }
    }

    ::v-deep.avue-form__group {
      ::v-deep.avue-form__menu {
        text-align: left;
        padding: 0 !important;
        width: auto !important;
      }
    }
  }

  ::v-deep.el-switch__label {
    top: 0;
    position: absolute;
    display: none;
    color: #fff;
  }

  .demo ::v-deep.el-switch__label--right {
    z-index: 1;
    right: 8px;
  }

  .demo ::v-deep.el-switch__label--left {
    z-index: 1;
    left: 6px;
  }

  .demo ::v-deep.el-switch__label.is-active {
    display: block;
  }

  .demo ::v-deep.el-switch__core,
  .demo ::v-deep.el-switch__label {
    width: 150px !important;
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

  .positionServer {
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    color: gray;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .yuzhi_name {
    display: inline-block;
    color: rgb(34, 130, 255);
    cursor: pointer;
  }

  .showEL {
    position: relative;
    padding-left: 10px;
    padding-right: 10px;
  }

  ::v-deep.el-table__fixed-body-wrapper {
    top: 36px;
    height: 360px;
    overflow-y: auto;
  }

  ::v-deep.el-table__body-wrapper {
    overflow-y: auto;
    height: 360px;
  }

  ::v-deep.el-form-item {
    margin-bottom: 0px !important;
  }

  .font-14 {
    font-size: 14px;
    width: 70px;
    display: inline-block;
  }

  .font-14-yl {
    font-size: 14px;
    width: 200px;
    display: inline-block;
  }

  .title_name {
    position: absolute;
    top: -16px;
    right: 50%;
    margin-right: -14%;
    z-index: 1000;
    font-size: 20px;
    font-weight: bold;
    color: #505050;
  }

  .dev_map {
    // padding-top: 15px;
    // padding-bottom:15px;
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dev_map1 {
    // padding-top: 15px;
    // padding-bottom:15px;
    width: 100%;
    height: 600px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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

  .dev_map_big {
    width: 100%;
    height: 100%;
  }

  .echarts {
    >div {
      width: 100% !important;
    }
  }

  ::v-deep.el-range__close-icon {
    display: none;
  }

  ::v-deep.el-input__suffix {
    display: none;
  }

</style>
