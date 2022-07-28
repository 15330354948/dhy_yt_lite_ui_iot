<template>
  <div class="BFB_width_height" style="height: 100%">
    <div class="box_container BFB_width_height">
      <el-container class="BFB_width_height">
        <!-- 左边 地图-->
        <div class="el-main" style="width: calc(100% -24vw - 15px)">
          <!-- <el-main > -->
          <div class="map_div">
            <map-com ref="projectDetailMap"></map-com>
          </div>
          <div class="isBottomShow" :class="{ bottom_open: bottomShow }">
            <el-button
              @click="bottomShow = !bottomShow"
              :icon="bottomShow ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
            ></el-button>
          </div>
          <div class="table_box" v-show="bottomShow == true">
            <div class="table_search">
              <div>服务/告警日志</div>
              <div>
                实时告警:
                <el-radio-group
                  v-model="alarmLevel"
                  size="small"
                  @change="changeRadio"
                >
                  <el-radio border size="mini" label="">全部</el-radio>
                  <el-radio border size="mini" label="1">一级</el-radio>
                  <el-radio border size="mini" label="2">二级</el-radio>
                  <el-radio border size="mini" label="3">三级</el-radio>
                  <el-radio border size="mini" label="4">四级</el-radio>
                  <!-- <el-radio-button label="">全部</el-radio-button>
                  <el-radio-button label="1">一级</el-radio-button>
                  <el-radio-button label="2">二级</el-radio-button>
                  <el-radio-button label="3">三级</el-radio-button>
                  <el-radio-button label="4">四级</el-radio-button> -->
                </el-radio-group>
              </div>
              <div>
                <span>告警类型:</span>
                <el-select
                  v-model="alarmType"
                  @change="changeSelect"
                  clearable
                  placeholder="请选择"
                  class="alarm_type_select">
                  <el-option
                    v-for="item in alarmOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="table_content">
              <avue-crud
                :data="tableData"
                ref="crudShow"
                :option="tableOption"
                :table-loading="loading"
              ></avue-crud>
            </div>
          </div>
          <!-- </el-main> -->
        </div>
        <!-- 右边 -->
        <div class="el-aside" style="width: 24vw; margin: 0 5px 0 10px">
          <!-- <el-aside > -->
          <div>
            <h3>项目基本信息</h3>
            <div class="projectBasicInfo">
              <div>
                <span class="ainfo_icon ainfo_admin"></span>
                <!-- <i class="el-icon-s-custom"></i> -->
                <div class="ainfo">项目创建者</div>
                <div>：ADMIN</div>
              </div>
              <div>
                <span class="ainfo_icon ainfo_time"></span>
                <div class="ainfo">项目创建时间</div>
                <div>：{{ info.createTime }}</div>
              </div>
              <!-- <div>
                <i class="el-icon-s-custom"></i>
                <div class="ainfo">数据更新时间</div>
                <div>：2020-08-03 16:40:28</div>
              </div> -->
            </div>
          </div>
          <div>
            <h3>设备信息</h3>
            <div class="device_info">
              <div class="row_div one_row">
                <div>
                  <div>
                    <span class="first">{{ info.deviceTotal }}</span
                    ><span class="unit">台</span><span>设备总数</span>
                  </div>
                  <div>
                    <span>已安装</span>
                    <span>：{{ info.alreadyInstalled }}</span>
                  </div>
                  <div>
                    <span>未安装</span><span>：{{ info.notInstalled }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span class="first">{{ info.deviceOnline }}</span
                    ><span class="unit">台</span><span>设备在线</span>
                  </div>
                  <div>
                    <span>离线</span><span>：{{ info.deviceOffline }}</span>
                  </div>
                  <div>
                    <span>低电量</span><span>：{{ info.lowBattery }}</span>
                  </div>
                </div>
              </div>
              <div class="row_div two_row">
                <div>
                  <span>{{ info.projectHealth }}</span>
                  <span>健康值</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3>地质灾害预警项目</h3>
            <div class="project_alarm_info">
              <div v-for="(item, index) in listOfDevices" :key="index">
                <div class="li_child">
                  <div>
                    <span class="project_icon"></span>
                    <!-- <i class="el-icon-s-custom"></i> -->
                  </div>
                  <div>
                    <div>
                      <span>型号:</span>
                      <span>{{ item.type }}</span>
                    </div>
                    <div>
                      <span>数量:</span>
                      <span>{{ item.count }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- </el-aside> -->
        </div>
      </el-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getBasicInfo, getDeviceAna } from "@/api/projectManage/detailInfo";
import { tableOption } from "@/const/crud/projectManage/detailInfo";
import { fetchList as getAreaPage } from "@/api/areas/area";
import {
  fetchDeviceAlarmList,
  getTypeData,
  mappolymerization,
  mappoints,
} from "@/api/wel";
export default {
  props: ["parentData"],
  data() {
    return {
      // parentData:{},
      info: {
        alreadyInstalled: 332,
        createTime: "",
        deviceOffline: 0,
        deviceOnline: 0,
        deviceTotal: 0,
        lowBattery: 0,
        notInstalled: 0,
        projectHealth: null,
      },
      barChartOption: {},
      loading: true,
      newsList: [], //告警列表数据
      pages: 1,
      deviceAlarmTotal: 1,
      currentPage: 0,
      alarmLevel: "",
      alarmLevelData: [],
      listOfDevices: [],
      radio: null,
      alarmOptions: [],
      alarmType: null,
      bottomShow: true,
      tableOption: tableOption,
      tableData: [],
      projectId: this.parentData.id,
      rangeData: {
        data_1: [], //省份聚合数据
        data_2: [], //市聚合数据
        data_3: [], //区县聚合数据
        data_4: [], //村级具体栽点数据
      },
    };
  },
  watch: {
    parentData: {
      handler(x, y) {
        this.rangeData = {
          data_1: [], //省份聚合数据
          data_2: [], //市聚合数据
          data_3: [], //区县聚合数据
          data_4: [], //村级具体栽点数据
        };
        this.$refs.projectDetailMap.mapFunc.removeLayers();
        this.projectId = x.id;
        this.getBasic(x.id);
        this.getDeviceTypeList(x.id);
        this.tableData = [];
        this.currentPage = 0;
        this.getTableDataByPort();
      },
    },
    // alarmLevel: {
    //   handler(x) {
    //     this.getTableDataByPort();
    //   },
    // },
    // alarmType: {
    //   handler(x) {
    //     this.getTableDataByPort();
    //   },
    // },
  },
  computed: {
    ...mapGetters(["website"]),
  },
  created() {
    // 获取告警类型数据
    getTypeData("warn_type").then((res) => {
      this.alarmOptions = res.data.data;
    });
  },
  mounted() {
    // console.log(250,this)
    // this.parentData=this.$route.query.parentData

    this.getBasic(this.parentData.id);
    this.getDeviceTypeList(this.parentData.id);
    this.getTableDataByPort();
    window.addEventListener("scroll", this.handleScroll, true);
     this.getPolygonByPort(1)
    document
      .querySelector("#navigationDiv .navigation-controls div:first-child")
      .addEventListener("click", (e) => {
        this.$refs.projectDetailMap.mapFunc.handlePlus(this);
      });
    document
      .querySelector("#navigationDiv .navigation-controls div:nth-child(2)")
      .addEventListener("click", (e) => {
        this.$refs.projectDetailMap.mapFunc.removeLayers();
      });
    document
      .querySelector("#navigationDiv .navigation-controls div:nth-child(3)")
      .addEventListener("click", (e) => {
        this.$refs.projectDetailMap.mapFunc.handleMinus(this);
      });
  },
  methods: {
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
    getBasic(id) {
      getBasicInfo(id).then((res) => {
        let rec = res.data.data;
        this.info = rec;
      });
    },
    getDeviceTypeList(id) {
      getDeviceAna(id).then((res) => {
        let rec = res.data.data;
        this.listOfDevices = rec;
      });
    },
    changeRadio(val) {
      this.currentPage = 0;
      this.tableData = [];
      this.getTableDataByPort();
    },
    changeSelect(val) {
      this.currentPage = 0;
      this.tableData = [];
      this.alarmType = val;
      this.getTableDataByPort();
    },
    getTableDataByPort() {
      this.loading = true;
      this.currentPage += 1;
      console.log(this.currentPage);
      //获取底部表格数据
      fetchDeviceAlarmList({
        projectId: this.parentData.id,
        current: this.currentPage,
        alarmLevel: this.alarmLevel,
        alarmType: this.alarmType,
        size: 10,
      }).then((res) => {
        let recData = res.data.data;
        this.pages = recData.pages;
        recData.records.forEach((item) => {
          //  console.log(277,item)
          this.tableData.push(item);
        });
        this.loading = false;
      });
    },
    handleScroll(event) {
      if (
        event.target.className === "el-table__body-wrapper is-scrolling-none"
      ) {
        //窗口滚动
        let sh = event.target.scrollHeight; // 滚动条高度
        let st = event.target.scrollTop; // 滚动条距离顶部的距离
        let ch = event.target.clientHeight; // 滚动条外容器的高度
        // let ch = this.$refs["myScrollbar"].clientHeight; // 滚动条外容器的高度
        if (st + ch >= sh) {
          //到底了
          if (this.currentPage < this.pages) {
            //判断页数是否需要继续加载数据
            this.getTableDataByPort();
          } else {
            this.loading = false;
          }
        }
      }
    },
    getPlaceLonLatByPort(data, callback) {
      let mapData = new Array();
      let areaCodes = new Array();
      //组装聚合数据
      data.forEach((item, i) => {
        if (item.code) {
          areaCodes.push(item.code);
        }
      });
      getAreaPage({
        code_in: areaCodes.join(),
        current: 1,
        size: 100000,
      }).then((res) => {
        let areas = res.data.data.records;
        if (areas && areas.length > 0) {
          data.forEach((item) => {
            if (item.code) {
              let targetAreas = areas.filter((a) => a.code == item.code);
              if (targetAreas && targetAreas.length > 0) {
                let targetArea = targetAreas[0];
                if (targetArea.longitude && targetArea.latitude) {
                  item.longitude = targetArea.longitude;
                  item.latitude = targetArea.latitude;
                  item.count = item.deviceCount;
                  mapData.push(item);
                }
              }
            }
          });
          callback(mapData);
        }
      });
    },
    getPolygonByPort(level) {
      let cacheData = this.rangeData["data_" + level];
      if (cacheData && cacheData.length > 0) {
        this.$refs.projectDetailMap.mapFunc.removeLayers();
        if (level < 4) {
          this.$refs.projectDetailMap.mapFunc.aggregation(cacheData);
        } else {
          this.$refs.projectDetailMap.mapFunc.addPointList(cacheData, {
            nameLayer: "pointsLayer",
            action: false,
          });
        }
      } else {
        if (level < 4) {
          mappolymerization({ projectId: this.parentData.id, level }).then(
            (res) => {
              let resData = res.data.data;
              if (resData && resData.length > 0) {
                this.getPlaceLonLatByPort(resData, (d) => {
                  this.rangeData["data_" + level] = d;
                  this.$refs.projectDetailMap.mapFunc.aggregation(d);
                });
              }
            }
          );
        } else {
          mappoints({ projectId: this.parentData.id }).then((res) => {
            let mapData = new Array();
            let md = res.data.data;
            md.forEach((d) => {
              if (d.reportLongitude && d.reportLatitude) {
                d.longitude = d.reportLongitude;
                d.latitude = d.reportLatitude;
                mapData.push(d);
              }
            });
            this.rangeData["data_" + level] = md;
            this.$refs.projectDetailMap.mapFunc.addPointList(mapData, {
              nameLayer: "pointsLayer",
              action: false,
            });
          });
        }
      }
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
.BFB_width_height {
  width: 100%;
  height: 100%;
}
.box_container {
  .el-container {
    position: relative;
  }
  .el-main,
  .el-aside {
    // height: 100%;
    height: 70vh;

    background-color: #fff;
  }
  .el-aside {
    > div {
      width: 100%;
      h3 {
        margin: 5px 2px 5px 3px;
        padding-left: 5px;
        border-left: 5px solid #444;
        color: #444;
      }
      .projectBasicInfo {
        width: 100%;
        height: 8vh;
        margin: 15px 0px 30px;
        > div {
          width: calc(100% - 10px);
          height: 4vh;
          margin: 5px 5px;
          background: #ffffff;
          box-shadow: 0px 0px 10px 0px rgba(55, 125, 255, 0.36);
          border-radius: 2px;
          display: flex;

          .ainfo_icon {
            position: relative;
            top: calc(50% - 12.5px);
            display: inline-block;
            width: 25px;
            height: 25px;
            margin: 0 10px;
          }
          .ainfo_admin {
            background: url("/img/icon/admin.png") 10% 10% / 100% no-repeat;
          }
          .ainfo_time {
            background: url("/img/icon/time.png") 10% 10% / 100% no-repeat;
          }
          // .el-icon-s-custom {
          //   font-size: 1.4vw;
          //   line-height: 4vh;
          //   margin: 0 10px;
          // }
          > div {
            height: 100%;
            line-height: 4vh;
            word-break: keep-all; /* 不换行 */
            white-space: nowrap; /* 不换行 */
            overflow: hidden;
            text-overflow: ellipsis;
          }
          > div.ainfo {
            font-size: 0.7vw;
            width: 6vw;
            text-align: justify;
            text-align-last: justify;
          }
          > div:last-child {
            width: 10vw;
          }
        }
      }
      .device_info {
        width: 100%;
        color: #fff;
        .row_div {
          width: 100%;
          margin: 8px 0;
        }
        .one_row {
          display: flex;
          justify-content: space-between;
          > div {
            width: 11.8vw;
            height: 10vh;
            border-radius: 5px;
            > div {
              margin-top: 5px;
              word-break: keep-all; /* 不换行 */
              white-space: nowrap; /* 不换行 */
              overflow: hidden;
              text-overflow: ellipsis;
              > span {
                font-size: 0.7vw;
              }
              span.first {
                font-size: 1.5vw;
              }
              span.unit {
                padding-left: 1px;
                font-size: 0.16vw;
              }
              > span:nth-child(3) {
                font-size: 0.7vw;
                padding-left: 1vw;
              }
              > span:first-child {
                padding-left: 1vw;
              }
            }
            > div:not(:first-child) {
              > span:first-child {
                display: inline-block;
                width: 65px;
                letter-spacing: 1.5px;
                text-align: justify;
                text-align-last: justify;
              }
            }
          }
          > div:first-child {
            background: linear-gradient(0deg, #ff9f37, #feb464);
          }
          > div:last-child {
            background: linear-gradient(0deg, #8e4bfc, #af80fc);
          }
        }
        .two_row {
          width: 100%;
          > div {
            width: 100%;
            height: 6vh;
            background: linear-gradient(0deg, #22cc66, #57fe9a);
            border-radius: 5px;
            > span {
              line-height: 6vh;
            }
            > span:first-child {
              font-size: 1.5vw;
              padding-left: 1vw;
            }
            > span:last-child {
              float: right;
              padding-right: 1vw;
            }
          }
        }
      }
      .project_alarm_info {
        width: calc(100% - 4px);
        height: 25vh;
        margin: 15px auto 5px;
        padding: 10px 10px;
        box-shadow: 0px 0px 10px 0px rgba(55, 125, 255, 0.36);
        border-radius: 2px;
        overflow-y: auto;
        overflow-x: hidden;
        > div {
          font-size: 0.7vw;
          margin-bottom: 5px;
          .li_child {
            display: flex;
            border: 1px dashed #377dff;
            border-radius: 5px;
            color: #868686;
            > div {
              display: inline-block;
              height: 4vh;
            }
            > div:first-child {
              width: 60px;
              height: 100%;
              // line-height: 4vh;
              text-align: center;

              .project_icon {
                display: inline-block;
                width: calc(100% - 10px);
                height: 3vh;
                margin: 0.5vh 5px;
                background-image: url("../../assets/img/icon/device1.png");
                background-position: 10% 10%; /*这个是按从左往右，从上往下的百分比位置进行调整*/
                background-size: 100% 100%; /*按比例缩放*/
                background-repeat: no-repeat; /*还有repeat-x,y等*/
                // font-size: 2vw;
              }
            }
            > div:last-child {
              width: calc(100% - 70px);
              > div {
                width: 100%;
                height: 2vh;
                line-height: 2vh;
              }
            }
          }
        }
      }
    }
  }
  .el-main {
    position: relative;
    .map_container {
      width: 100%;
      height: 100%;
      z-index: 1;
      ::v-deep.pgEarth-widget {
        height: 100%;
      }
    }
    .table_box {
      display: inline-block;
      position: absolute;
      bottom: 2px;
      // bottom: 5px;
      width: calc(100% - 8px);
      // height: 25vh;
      height: 38vh;
      z-index: 2;
      margin: 0 4px;
      background-color: #fff;
      .table_search {
        width: 100%;
        height: 50px;

        > div {
          display: inline-block;
          height: 100%;
          line-height: 50px;
          font-size: 0.5vw;
        }
        > div:first-child {
          width: calc(100% - 510px);
          padding-left: 5px;
          font-weight: bold;
          font-size: 18px;
          // font-size: 1.1vw;
          color: #377dff;
        }
        > div:nth-child(2) {
          text-align: center;
          width: 340px;
          ::v-deep.el-radio-group {
            // .el-radio-button__inner {
            //   background-color: #377dff;
            //   color: #fff;
            //   box-shadow: none;
            //   border-color: #fff;
            // }
            // .el-radio-button__orig-radio:checked + .el-radio-button__inner,
            // .el-radio-button__inner:hover {
            //   background-color: #377dff;
            //   color: #fff;
            // }
            .el-radio {
              padding: 5px 8px 0 5px;
              height: 26px;
              margin: 0;
              background-color: #377dff;
              color: #fff;
              .el-radio__label {
                padding-left: 5px;
              }
              .el-radio__input.is-checked + .el-radio__label {
                color: #fff;
              }
              .el-radio__input.is-checked .el-radio__inner {
                border-color: #fff;
                background: #377dff;
              }
            }
          }
        }
        > div:last-child {
          width: 170px;
          .el-select {
            width: 100px;
            margin-left: 3px;
          }
          ::v-deep.alarm_type_select {
            .el-input__inner {
              background-color: #377dff;
              color: #fff;
            }
            .el-input__inner::placeholder {
              color: #fff;
            }
            .el-input {
              .el-select__caret {
                color: #fff;
              }
            }
          }
        }
      }
      .table_content {
        width: 100%;
        height: calc(100% - 60px);
        padding: 0 10px;
        ::v-deep.avue-crud {
          height: 100%;
          // overflow-y: auto;
          // overflow-x: hidden;
          .avue-crud__pagination,
          .avue-crud__menu {
            display: none;
          }
          .el-table {
            height: 100% !important;
            // overflow-y: auto;
          }
          /* --- 改变滚动条样式 --- */
          .el-table__body-wrapper::-webkit-scrollbar {
            width: 6px;
          }

          /* --- 滚动条里面的滚动块 --- */
          .el-table__body-wrapper::-webkit-scrollbar-thumb {
            // height:30px;
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px #377dff;
            background: #377dff;
          }

          /* --- 滚动条里面轨道 --- */
          .el-table__body-wrapper::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            background: transparent;
          }
        }
      }
    }
    > .map_div {
      height: 100%;
      z-index: 1;
      ::v-deep.mapIdBox {
        .coord-bar {
          display: none;
        }
      }
    }
    .isBottomShow {
      position: absolute;
      bottom: 2px;
      left: calc(50% - 250px);
      width: 500px;
      text-align: center;
      z-index: 1;
      .el-button {
        width: 100px;
        border: none;
        color: #000;
        background-color: #fff;
        border-radius: 0;
        clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
      }
      .el-button:active,
      .el-button:hover {
        background-color: #fff;
        color: #000;
      }
    }
    .bottom_open {
      bottom: calc(38vh + 3px);
    }
  }
}
</style>
