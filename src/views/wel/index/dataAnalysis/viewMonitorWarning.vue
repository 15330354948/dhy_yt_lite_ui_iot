<!-- 安全态势分析 -->
<template>
  <div class="weather">
    <div class="bc_monitor-switch-btn">
      <!-- <i class="iconfont icon-tongji" :title="modStatus?'统计设备':'统计监测点'" @click="changeModeStatus"></i> -->
      <!-- <i class="iconfont icon-liebiao" title="预警列表" @click="viewMonitorPop"></i> -->
    </div>
    <div class="weather_timeSelect">
      <span @click="yujinSelect(1)" :class="{ active: active == 1 }">实时预警</span>
      <span @click="yujinSelect(2)" :class="{ active: active == 2 }">历史预警</span>
    </div>
    <div class="fenxiang_show" v-if="chartsTypeShow">
      <div class="type">
        <chart-com
          :options="hongData"
          ref="curvelChartRef1"
          class="echartsBox"
        ></chart-com>
        <div class="yujing" @click="routerPath(4)">红色预警</div>
      </div>
      <div class="type">
        <chart-com
          :options="chengData"
          ref="curvelChartRef2"
          class="echartsBox"
        ></chart-com>
        <div class="yujing" @click="routerPath(3)">橙色预警</div>
      </div>
      <div class="type">
        <chart-com
          :options="huangData"
          ref="curvelChartRef3"
          class="echartsBox"
        ></chart-com>
        <div class="yujing" @click="routerPath(2)">黄色预警</div>
      </div>
      <div class="type">
        <chart-com
          :options="lanData"
          ref="curvelChartRef4"
          class="echartsBox"
        ></chart-com>
        <div class="yujing" @click="routerPath(1)">蓝色预警</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import chartCom from "@/components/chartcom/index.vue";
import {
  yujingTongji,
  yujingTongjiNew,
  yujingTongjiOld,
} from "@/api/monitorManage/quxian";
import { getYujin } from "@/api/warningMag/monitorList";
import store from "@/store";
import { deepClone } from "@/util/util.js";

export default {
  name: "viewMonitorWarning",
  computed: mapGetters(["occurWarn", "isDataAnalysis", "projectId"]),
  components: {
    chartCom,
  },
  data() {
    return {
      hongData: {}, //图表
      chengData: {},
      huangData: {},
      lanData: {},
      chartsTypeShow: false,
      active: 1,
      weatherData: {},
      modStatus: true,
    };
  },
  watch: {
    occurWarn: {
      handler(val) {
        if (val.status) {
          this.getData(this.projectId);
        } else {
        }
      },
      deep: true,
    },
    isDataAnalysis: {
      deep: true,
      handler(val) {
        if (val.data) {
          this.getData(this.projectId);
        }
      },
    },
    projectId: {
      immediate: true,
      handler(newId, oldId) {
        if (newId) {
          this.getData(newId);
        }
      },
    },
  },
  methods: {
    yujinSelect(val) {
      this.active = val;
      if (this.projectId) {
        this.getData(this.projectId);
      }
    },
    routerPath(val) {
      this.$store.commit("IS_DATA_ANALYSIS", {
        status: true,
        data: {
          moduleName: "warn",
          listTitle: "告警列表", //模块展示名字
          list_templateUrl: "listFile/warnList", //列表模块文件路径
          chartTitle: "告警分析", //模块展示名字
          chart_templateUrl: "chartFile/deviceChart", //图表模块文件路径
          icon: "warn",
          data: {
            warnLevel: val,
            type: this.active,
          },
        },
      });
    },
    getData(proId) {
      if (this.active == 1) {
        yujingTongjiNew({ projectId: proId }).then((res) => {
          this.chartsTypeShow = true;
          getYujin({ projectId: proId }).then((red) => {
            const liucheng = red.data.data;
            if (red.data.data) {
              this.yujingDataPlay(res.data.data, liucheng);
            } else {
              this.yujingDataPlay(res.data.data, {
                redLevel: "",
                orangeLevel: "",
                yellowLevel: "",
                blueLevel: "",
              });
            }
          });
        });
      } else {
        yujingTongjiOld({ projectId: proId }).then((res) => {
          this.chartsTypeShow = true;
          getYujin({ projectId: proId }).then((red) => {
            const liucheng = red.data.data;
            if (red.data.data) {
              this.yujingDataPlay(res.data.data, liucheng);
            } else {
              this.yujingDataPlay(res.data.data, {
                redLevel: "",
                orangeLevel: "",
                yellowLevel: "",
                blueLevel: "",
              });
            }
          });
        });
      }
    },
    yujingDataPlay(strdata, newLiucheng) {
      var colorList = ["#f05748", "#e28d08", "#fce521", "#2168fa"];
      this.hongData = {
        tooltip: {
          trigger: "item",
          // trigger: "axis",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
            },
          },
          extraCssText: "max-width:300px;",
          position: "left",
          formatter: (params) => {
            var proseList = params.seriesName;
            proseList =
              "<div style='white-space:normal'>" +
              proseList +
              "<br/>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" +
              params.color +
              "'></span>" +
              params.name +
              " : " +
              params.value +
              "<br/>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" +
              params.color +
              "'></span>" +
              "预警流程" +
              " : " +
              newLiucheng.redLevel +
              "<br/>" +
              "</div>";
            return proseList;
          },
        },
        title: {
          y: "center",
          x: "center",
          text: strdata.HongSe,
          textStyle: {
            color: "white",
          },
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: "红色预警",
            type: "pie",
            radius: ["65%", "75%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            itemStyle: {
              normal: {
                color: colorList[0],
              },
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "15",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: strdata.HongSe,
                name: "预警监测点数量",
              },
            ],
          },
        ],
      };

      this.chengData = {
        tooltip: {
          trigger: "item",
          // trigger: "axis",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
            },
          },
          extraCssText: "max-width:300px;",
          position: "left",
          formatter: (params) => {
            var proseList = params.seriesName;
            proseList =
              "<div style='white-space:normal'>" +
              proseList +
              "<br/>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" +
              params.color +
              "'></span>" +
              params.name +
              " : " +
              params.value +
              "<br/>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" +
              params.color +
              "'></span>" +
              "预警流程" +
              " : " +
              newLiucheng.orangeLevel +
              "<br/>" +
              "</div>";
            return proseList;
          },
        },
        title: {
          y: "center",
          x: "center",
          text: strdata.ChengSe,
          textStyle: {
            color: "white",
          },
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: "橙色预警",
            type: "pie",
            radius: ["65%", "75%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "15",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: colorList[1],
              },
            },
            data: [
              {
                value: strdata.ChengSe,
                name: "预警监测点数量",
              },
            ],
          },
        ],
      };

      this.huangData = {
        tooltip: {
          trigger: "item",
          extraCssText: "max-width:300px;",
          position: "left",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
            },
          },
          formatter: (params) => {
            var proseList = params.name;
            proseList =
              "<div style='white-space:normal'>" +
              proseList +
              "<br/>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" +
              params.color +
              "'></span>" +
              params.name +
              " : " +
              params.value +
              "<br/>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" +
              params.color +
              "'></span>" +
              "预警流程" +
              " : " +
              newLiucheng.yellowLevel +
              "<br/>" +
              "</div>";
            return proseList;
          },
        },
        title: {
          y: "center",
          x: "center",
          text: strdata.HuangSe,
          textStyle: {
            color: "white",
          },
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: "黄色预警",
            type: "pie",
            radius: ["65%", "75%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "15",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: colorList[2],
              },
            },
            data: [
              {
                value: strdata.HuangSe,
                name: "预警监测点数量",
              },
            ],
          },
        ],
      };

      this.lanData = {
        tooltip: {
          trigger: "item",
          // trigger: "axis",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
            },
          },
          extraCssText: "max-width:300px;",
          position: "left",
          formatter: (params) => {
            var proseList = params.seriesName;
            proseList =
              "<div style='white-space:normal'>" +
              proseList +
              "<br/>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" +
              params.color +
              "'></span>" +
              params.name +
              " : " +
              params.value +
              "<br/>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" +
              params.color +
              "'></span>" +
              "预警流程" +
              " : " +
              newLiucheng.blueLevel +
              "<br/>" +
              "</div>";
            return proseList;
          },
        },
        title: {
          y: "center",
          x: "center",
          text: strdata.LanSe,
          textStyle: {
            color: "white",
          },
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: "蓝色预警",
            type: "pie",
            radius: ["65%", "75%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "15",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: colorList[3],
              },
            },
            data: [
              {
                value: strdata.LanSe,
                name: "预警监测点数量",
              },
            ],
          },
        ],
      };
    },
    changeModeStatus() {
      this.modStatus = !this.modStatus;
      this.$store.commit("SET_MONITOR_MODSTATUS", this.modStatus);
    },
    viewMonitorPop() {

    }
  },
};
</script>

<style lang="scss" scoped>
.weather {
  height: 100%;
  position: relative;

  .bc_monitor-switch-btn {
    position: absolute;
    right: 0;
    top: -28px;
    width: 80px;
    font-size: 22px;
    display: flex;
    justify-content: space-evenly;
    cursor: pointer;
  }

  &_timeSelect {
    display: flex;
    justify-content: center;

    span {
      display: inline-block;
      font-size: 14px;
      padding: 5px 15px;
      background: rgba(2, 101, 174, 0.4);
      margin: 0 3px;
      cursor: pointer;
    }
  }

  .active {
    color: #1ee7f2;
  }
}

.weather_timeSelect {
  white-space: nowrap !important;
}

.data_analysis_bottom_tem {
  .container_chart {
    width: 100% !important;
    height: 100% !important;

    .echarts {
      width: 100%;
      height: 100%;

      div canvas{
        height: 100%;
        width: 100%
      }
    }
  }
}

.fenxiang_show {
  width: 100%;
  height: calc(100% - 20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container_chart {
  height: 100%;
}

.type {
  width: 25%;
  height: 100%;
}

.yujing {
  width: 100%;
  height: 22%;
  text-align: center;
  cursor: pointer;
}

.echartsBox {
  height: 78%;
}
</style>
