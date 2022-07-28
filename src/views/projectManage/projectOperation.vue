<template>
  <div>
    <!--  this.platformName -->
    <!-- <basic-container> -->
    <div style="min-width: 900px">
      <!-- <div style="width: 100%; height: 100%"> -->
      <div class="bgColor_white basic_box">
        <el-row>
          <!-- <el-col :span="2">
            <div class="align_center tab_project">
              <el-dropdown trigger="click" @command="handleCommand">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="切换项目"
                  placement="right"
                >
                  <el-button type="primary" icon="icon-switch"></el-button>
                </el-tooltip>

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    :command="item"
                    v-for="(item, keya) in listUl"
                    :key="keya"
                    >{{ item.projectName }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col> -->
          <!-- :span="7" -->
          <el-col :span="9">
            <div class="align_center name_c">项目名称</div>
            <el-tooltip
              class="item"
              effect="dark"
              :content="projectName"
              placement="bottom"
            >
              <div class="align_center font_size_plus text_bold value_c">
                {{ projectName || "--" }}
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="6">
            <div class="align_center name_c">应用ID</div>
            <el-tooltip
              class="item"
              effect="dark"
              :content="infoForm.appId"
              placement="bottom"
            >
              <div class="align_center text_bold value_c">
                {{ infoForm.appId || "--" }}
              </div>
            </el-tooltip>
          </el-col>
          <el-col :span="5">
            <div class="align_center name_c">应用密钥</div>
            <div class="align_center text_bold value_c">
              {{ infoForm.appSecret || "--" }}
            </div>
          </el-col>
          <el-col :span="4">
            <div class="align_center name_c">创建时间</div>
            <el-tooltip
              class="item"
              effect="dark"
              :content="infoForm.createTime"
              placement="bottom"
            >
              <div class="align_center text_bold value_c">
                {{ infoForm.createTime || "--" }}
              </div>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>

      <div class="list_box">
        <el-card class="box-card" @click.native="tabCard(1)">
          <el-container>
            <el-aside width="240px">
              <div
                class="font_size_30"
                :class="{ 'active-color': activeCard == 1 }"
              >
                <span
                  ><i class="icon-shebei" style="font-size: 45px !important"></i
                ></span>
              </div>
              <div>设备接入总数</div>
              <div>{{ infoForm.deviceTotal || 0 }}</div>
            </el-aside>
            <el-main>
              <div>
                <span>在线</span><span>{{ infoForm.deviceOnline || 0 }}</span>
              </div>
              <hr class="mini_hr" />
              <div>
                <span>离线</span><span>{{ infoForm.deviceOffline || 0 }}</span>
              </div>
            </el-main>
          </el-container>
        </el-card>
        <el-card class="box-card" @click.native="tabCard(2)">
          <el-container>
            <el-aside width="240px">
              <div
                class="font_size_30"
                :class="{ 'active-color': activeCard == 2 }"
              >
                <span
                  ><i
                    class="icon-datapoint"
                    style="font-size: 45px !important"
                  ></i
                ></span>
              </div>
              <div>数据点总数</div>
              <div>{{ infoForm.dataPointsTotal || 0 }}</div></el-aside
            >
            <el-main>
              <div>
                <span>今日新增</span
                ><span>{{ infoForm.dataPointsToday || 0 }}</span>
              </div>
            </el-main>
          </el-container></el-card
        >
        <el-card class="box-card" @click.native="tabCard(3)">
          <el-container>
            <el-aside width="240px">
              <div
                class="font_size_30"
                :class="{ 'active-color': activeCard == 3 }"
              >
                <span
                  ><i
                    class="icon-transmit"
                    style="font-size: 32px !important"
                  ></i
                ></span>
              </div>
              <div>项目转发数据总数</div>
              <div>{{ infoForm.dataTransferTotal || 0 }}</div></el-aside
            >
            <el-main>
              <div>
                <span>今日转发成功</span><span></span
                >{{ infoForm.dataTransferSucc || 0 }}
              </div>
              <hr class="mini_hr" />
              <div>
                <span>今日转发失败</span><span></span
                >{{ infoForm.dataTransferFailed || 0 }}
              </div>
            </el-main>
          </el-container>
        </el-card>
      </div>
      <div class="bgColor_white echart_box">
        <div>
          <div>{{ activeTitle }}统计</div>
          <div class="search_div">
            <el-date-picker
              type="daterange"
              v-model="searchFrom.time"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :clearable="false"
              @change="handleTimeRange"
            >
            </el-date-picker>
            <!-- <el-button
              :type="isActive == 1 ? 'primary' : ''"
              @click="handleDailyIncBtn"
              >每日新增</el-button
            >
            <el-button
              :type="isActive == 2 ? 'primary' : ''"
              v-show="activeCard !== 1"
              @click="handleTotalBtn"
              >累积总量</el-button
            > -->
          </div>
          <!-- <div class="chart_div">
            <div class="chart_box" id="welEchart"></div>
          </div> -->
          <div class="chart_div">
            <chart-com :options="welChartOption" ref="welChartRef"></chart-com>
          </div>
        </div>
      </div>
    </div>
    <!-- </basic-container> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import echarts from "echarts";
// import { getProjectList, getObj, getChartObj } from "@/api/wel";
import {
  getProjectList,
  getObj,
  getChartObj,
} from "@/api/projectManage/projectOperation";

export default {
  name: "wel",
  props: ["parentData"],
  data() {
    return {
      listUl: [],
      projectName: null,
      projectId: null,
      activeCard: 1,
      activeTitle: "设备接入",
      infoForm: {
        appId: null,
        appSecret: null,
        createTime: null,
        dataPointsToday: null,
        dataPointsTotal: null,
        dataTransferFailed: null,
        dataTransferSucc: null,
        dataTransferTotal: null,
        deviceOffline: null,
        deviceOnline: null,
        deviceTotal: null,
      },
      searchFrom: {
        time: [],
      },
      pickerOptions: {
        //时间范围限制
        disabledDate(time) {
          var times = Date.now() - 24 * 60 * 60 * 1000;
          return time.getTime() > times;
        },
      },
      isActive: 1,
      allChartData: {},
      welChartOption: {},
    };
  },
  computed: {
    ...mapGetters(["website"]),
  },
  created() {},
  mounted() {
    //默认搜索时间 （展示一周）
    this.searchFrom.time = [
      this.dateFormate(Date.now() - 24 * 60 * 60 * 1000 * 7),
      this.dateFormate(Date.now() - 24 * 60 * 60 * 1000),
    ];

    let initData = this.parentData;
    this.projectId = initData.id;
    this.getInfoById(initData.id, initData.projectName);
    this.getChartDataByport();

    // getProjectList().then((res) => {
    //   //获取项目切换的下拉内容数据
    //   if (res.data.data && res.data.data.length > 0) {
    //     this.listUl = res.data.data;
    //     let initData = this.listUl[0];
    //     this.projectId = initData.id;
    //     this.getInfoById(initData.id, initData.projectName);
    //     this.getChartDataByport();
    //   }
    // });
  },
  watch: {
    parentData: {
      handler(x, y) {
        if (x) {
          this.searchFrom.time = [
            this.dateFormate(Date.now() - 24 * 60 * 60 * 1000 * 7),
            this.dateFormate(Date.now() - 24 * 60 * 60 * 1000),
          ];
          let initData = x;
          this.projectId = initData.id;
          this.getInfoById(initData.id, initData.projectName);
          this.getChartDataByport();
        }
      },
    },
  },
  methods: {
    dateFormate(val) {
      //时间格式转换
      // 比如需要这样的格式 yyyy-MM-dd
      var date = new Date(val);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      //let  h = date.getHours() + ":";
      //let  m = date.getMinutes() + ":";
      //let  s = date.getSeconds();
      return Y + M + D;
      // console.log(Y + M + D + h + m + s);
    },
    objSort(params) {
      var obj = params;

      var arr = Object.keys(obj).sort();
      var result = {};
      arr.map((m) => {
        result[m] = obj[m];
      });
      return result;
    },
    // handleCommand(command) {
    //   //下拉菜单选择（切换项目）
    //   this.getInfoById(command.id, command.projectName);
    //   this.projectId = command.id;
    //   this.getChartDataByport();
    // },
    getInfoById(id, name) {
      //根据项目id获取展示的文字信息
      getObj(id).then((res) => {
        let dataRec = res.data.data;
        this.infoForm = dataRec;
        this.projectName = name;
      });
    },
    getChartDataByport() {
      //根据接口获取曲线的所有数据
      getChartObj(
        this.searchFrom.time[0],
        this.searchFrom.time[1],
        this.projectId
      ).then((res) => {
        if (res.data.data && JSON.stringify(res.data.data) != "{}") {
          this.allChartData = this.objSort(res.data.data); //排序，赋值
        } else {
          this.allChartData = {};
        }
        this.pingData(this.allChartData, this.activeCard);
      });
    },
    tabCard(val) {
      //曲线展示的切换事件
      this.activeCard = val;
      this.isActive = 1;
      if (val == 1) {
        this.activeTitle = "设备接入";
      } else if (val == 2) {
        this.activeTitle = "数据点";
      } else if (val == 3) {
        this.activeTitle = "项目转发数据";
      }
      this.pingData(this.allChartData, this.activeCard);
    },
    handleTimeRange(val) {
      //时间范围变化时
      if (val && val.length == 2) {
        if (new Date(val[0]).getTime() == new Date(val[1]).getTime()) {
          this.$message.error("请重新选择时间范围！");
          return false;
        } else {
          this.searchFrom.time = val;
          this.getChartDataByport();
        }
      }
    },
    handleDailyIncBtn() {
      this.isActive = 1;
      //每日新增按钮事件
    },
    handleTotalBtn() {
      this.isActive = 2;
      //累积总量按钮事件
    },
    pingData(params, type) {
      //params  接口而得的所有数据
      //type 展示曲线的类型（1、设备、2数据点、3项目转发）
      //组装曲线所需的数据
      let xAxis = [],
        objChart = {};
      let data1 = [],
        data2 = [],
        data3 = [];
      if (params && JSON.stringify(params) != "{}") {
        for (let key in params) {
          xAxis.push(key);
          if (type == 1) {
            data1.push(params[key].deviceAddNumber);
          } else if (type == 2) {
            data1.push(params[key].dataPonitNumber);
            data2.push(params[key].dataPonitTotalNumber);
          } else if (type == 3) {
            data1.push(params[key].dataTransferFailed);
            data2.push(params[key].dataTransferSucc);
            data3.push(params[key].dataTransferTotal);
          }
        }
        objChart.xAxis = xAxis;
        let arrTpl = [];
        if (type == 1) {
          arrTpl.push({ name: "设备每日新增", data: data1 });
        } else if (type == 2) {
          arrTpl.push(
            { name: "数据点新增", data: data1 },
            { name: "数据点总量", data: data2 }
          );
        } else if (type == 3) {
          arrTpl.push(
            { name: "转发失败", data: data1 },
            { name: "转发成功", data: data2 },
            { name: "累积转发", data: data3 }
          );
        }
        function getPinSeries(data) {
          let arrNew = [];
          let colorArr = ["#66b1ff", "#DA70D6", "#FF8C00"];
          let colorArrRgb = ["102,177,255", "218,112,214", "255,140,0"];
          if (data && data.length > 0) {
            data.forEach((element, index) => {
              arrNew.push({
                name: element.name,
                data: element.data,
                type: "line",
                smooth: true,
                symbol: "circle",
                yAxisIndex: 0,
                symbolSize: 12,
                itemStyle: {
                  color: colorArr[index],
                  borderColor: "#fff",
                  borderWidth: 3,
                },
                lineStyle: {
                  color: colorArr[index],
                  width: 5,
                },
                areaStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(" + colorArrRgb[index] + ",0.3)", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgba(" + colorArrRgb[index] + ",0.1)", // 100% 处的颜色
                      },
                    ],
                  },
                  shadowColor: "rgba(" + colorArrRgb[index] + ", 0.9)",
                  shadowBlur: 20,
                },
              });
            });
          }
          return arrNew;
        }
        objChart.series = getPinSeries(arrTpl);
      }
      this.showChart(objChart);
    },
    showChart(dataRec) {
      this.$refs.welChartRef.isShowChart(dataRec);
      if (dataRec && JSON.stringify(dataRec) != "{}") {
        // 绘制图表
        this.welChartOption = {
          legend: {
            show: true,
          },
          tooltip: {
            show: true,
            trigger: "axis",
          },
          xAxis: {
            type: "category",
            data: dataRec.xAxis || [],
          },
          yAxis: {
            type: "value",
          },
          series: dataRec.series || [],
        };
      } else {
         this.welChartOption={}
      }
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
.align_center {
  text-align: center;
}
.text_bold {
  font-weight: bold;
}
.font_size_plus {
  font-size: 1.3rem;
}
.bgColor_white {
  background-color: #fff;
}
.font_size_30 {
  font-size: 40px;
}
.active-color {
  color: #409eff;
}

.basic_box {
  .el-row {
    margin: 0;
    .el-col:not(:last-child) {
      border-right: 1px dashed #ccc;
    }
    .el-col {
      margin: 0;

      div.name_c {
        margin: 15px 0 0;
      }
      div.value_c {
        height: 40px;
        line-height: 40px;
        white-space: nowrap; /*设置不换行*/
        overflow: hidden; /*设置隐藏*/
        text-overflow: ellipsis; /*设置隐藏部分为省略号*/
        margin-bottom: 10px;
      }

      .tab_project {
        height: 86px;
        .el-dropdown {
          top: 20px;
          .el-button {
            font-size: 1.5rem;
          }
        }
      }
    }
  }
}

.list_box {
  display: flex;
  justify-content: center;
  .box-card {
    width: 480px;
    // margin: 15px 20px 15px 0;
    margin: 12px;
    text-align: center;
    cursor: pointer;
    ::v-deep.el-card__body {
      padding: 20px 0;
    }
    .el-container {
      height: 140px;
    }
    .el-aside {
      border-right: 1px dashed #ccc;
      div:nth-child(2) {
        margin: 10px 0;
      }
      div:nth-child(3) {
        font-weight: bold;
      }
    }
    .el-main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 10px;
      div {
        span {
          display: block;
          margin-top: 10px;
        }
      }
      .mini_hr {
        width: 50%;
        height: 1px;
        border: none;
        border-top: 1px dashed #ccc;
      }
    }
  }
}
.echart_box {
  position: relative;
  > div {
    padding: 10px 30px 20px 30px;
    .search_div {
      margin: 20px 0;
      .el-button {
        margin-left: 10px;
      }
    }
    .chart_div {
      width: 100%;
      height: 400px;
      .container_chart {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
