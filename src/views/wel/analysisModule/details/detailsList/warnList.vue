<!--
 * @Author: 张峻霖
 * @Date: 2021-02-25 11:17:09
 * @LastEditTime: 2021-06-03 15:47:59
 * @LastEditors: Please set LastEditors
 * @Description: 传感器列表
 * @FilePath: \LH-UI\src\views\wel\analysisModule\details\detailsList\deviceList.vue
-->
<template>
  <div class="device_details_list_sensor">
    <div class="fenxiang_show">
      <div class="chart-type">
        <chart-com
          :options="hongData"
          ref="curvelChartRef1"
          class="echarts-box"
        ></chart-com>
        <div class="yujing">红色告警</div>
      </div>
      <div class="chart-type">
        <chart-com
          :options="chengData"
          ref="curvelChartRef2"
          class="echarts-box"
        ></chart-com>
        <div class="yujing">橙色告警</div>
      </div>
      <div class="chart-type">
        <chart-com
          :options="huangData"
          ref="curvelChartRef3"
          class="echarts-box"
        ></chart-com>
        <div class="yujing">黄色告警</div>
      </div>
      <div class="chart-type">
        <chart-com
          :options="lanData"
          ref="curvelChartRef4"
          class="echarts-box"
        ></chart-com>
        <div class="yujing">蓝色告警</div>
      </div>
    </div>
    <div class="device_details_list_sensor_search">
      <el-form class="bc_details-search-form" ref="devForm" :model="searchValue">
        <el-form-item label="告警等级" label-width="70px">
          <el-select v-model="searchValue.type" clearable placeholder="请选择设备类型">
            <el-option
              v-for="item in options.device_type"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchFun">搜索</el-button>
          <el-button @click="reset">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="device_details_list_sensor_table">
      <el-scrollbar>
        <el-table :data="tableData" stripe height="100%">
          <el-table-column prop="code" label="最新告警时间" align="center" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="type" label="告警等级" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ convert(scope.row.type, "device_type") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="处置状态" align="center">
            <template slot-scope="scope">
              <span>{{ convert(scope.row.status, "device_status") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <span class="device_details_list_sensor_table_operation" @click="openChart(scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
    <div class="block">
      <el-pagination
        small
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pages.current"
        :page-size="pages.size"
        layout="prev, pager, next,sizes,total"
        :total="pages.total"
        :page-sizes="[10, 20, 30, 40, 50, 100]">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deviceList, getRealTimeDeviceWarnInfoByDisasterId } from "@/api/monitorManage/device";
import { fetchList } from "@/api/monitorManage/manufacturer";
import { yujingTongjiNew } from "@/api/monitorManage/quxian";
import { getYujin } from "@/api/warningMag/monitorList";

export default {
  computed: mapGetters(["dictionaries", "analysisDetails", "projectId"]),
  data() {
    return {
      hongData: {}, //图表
      chengData: {},
      huangData: {},
      lanData: {},
      options: {
        device_type: {},
        sensor_type: {},
        factory_option: {},
        device_status: {},
      },
      searchValue: {
        sensorCode: "",
        sensorType: "",
        installLocation: "",
        status: "",
        factoryId: "",
        type: "",
      },
      pages: {
        current: 1,
        size: 10,
        total: 0,
      },
      tableData: [],
      dangerId: null,
    };
  },
  watch: {
    analysisDetails: {
      handler(val) {
        this.dangerId = val.data.data.id;
        setTimeout(() => {
          this.reset();
          this.getPoint();
        }, 1000);
      },
      deep: true,
    },
  },
  created() {
    for (const key in this.options) {
      this.options[key] = this.dictionaries.data[key];
    }
    this.dangerId = this.analysisDetails.data.data.id;
    fetchList({ current: 1, size: 100000 }).then((e) => {
      e.data.data.records.forEach((e) => {
        e.value = e.id;
        e.label = e.name;
      });
      this.options.factory_option = e.data.data.records;
    });
    this.getData();
  },
  mounted() {
    setTimeout(() => {
      this.reset();
      this.getPoint();
      this.getChartData();
    }, 1000);
  },
  methods: {
    getChartData() {
      yujingTongjiNew({ projectId: this.projectId }).then((res) => {
        getYujin({ projectId: this.projectId }).then((red) => {
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
          position: "right",
          formatter: (params) => {
            var proseList = params.seriesName;
            proseList =
              "<div style='width:150px; white-space:normal'>" +
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
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
            },
          },
          extraCssText: "max-width:300px;",
          position: "right",
          formatter: (params) => {
            var proseList = params.seriesName;
            proseList =
              "<div style='width:150px; white-space:normal'>" +
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
              "<div style='width:150px; white-space:normal'>" +
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
              "<div style='width:150px; white-space:normal'>" +
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

    handleSizeChange(val) {
      this.pages.size = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pages.current = val;
      this.getData();
    },
    detailsFun() {},
    searchFun() {
      this.getData();
    },
    reset() {
      this.searchValue = {
        sensorCode: "",
        sensorType: "",
        installLocation: "",
      };
      this.pages = {
        current: 1,
        size: 10,
        total: 0,
      };
      this.getData();
    },
    getData() {
      let search = {
        ...this.pages,
        ...this.searchValue,
        disasterId: this.dangerId,
        projectId: this.projectId
      };
      deviceList(search).then((res) => {
        let data = res.data.data;
        this.pages.total = data.total;
        this.tableData = data.records;
      });
    },
    getPoint() {
      deviceList({
        current: 1,
        size: 100000,
        disasterId: this.dangerId,
        projectId:this.projectId
      }).then(async (res) => {
        await getRealTimeDeviceWarnInfoByDisasterId({
          disasterId: this.dangerId,
          projectId:this.projectId
        }).then((resWarn) => {
          let resWarnData = resWarn.data.data.records;
          if (resWarnData.length > 0) {
            let data = resWarnData.filter((e) => {
              return res.data.data.records[0].code == e.code;
            });
            // data[0].warnType = resWarnData[0].warnLevel;
            data[0].warnType = 4;
            this.mapFunc.deviceKuosan(data);
          }
        });
        this.mapFunc.removeLayer("secondLayer");
        let pointParticulars = {
          title: "设备图例",
          iconName: "device", //传入载点图标归类模块
          data: res.data.data.records, //传入多点载点数据
          action: this.backFun,
          isRemoveLayer: false,
          pointLevel: 2,
          layerName: "secondLayer",
          typeOption: this.options.device_type,
        };
        this.$store.commit("SET_LEGENDDATA", pointParticulars);
        // this.mapFunc.MapPoints(pointParticulars); //调用地图 多点载点函数
        setTimeout(() => {
          this.mapFunc.modelPoints(pointParticulars);
        }, 3000);
      });
    },
    backFun(data) {
      var list = data.data;
      if (list.type == 6) {
        this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
          status: true,
          name: "deviceCurve",
          style: {
            width: "160vh",
            height: "80vh",
            left: "calc(50% - 80vh)",
            title: "监控视频",
          },
          data: list,
        });
      } else {
        this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
          status: true,
          name: "deviceCurve",
          style: {
            width: "80vw",
            height: "800px",
            left: "calc(50% - 40vw)",
            title: "设备曲线",
          },
          data: list,
          baifenbi: true,
        });
      }
      return;
      window.viewer.scene.postProcessStages.remove(this.mapFunc.lastStage2);
      this.$store.commit("IS_ANALYSIS_DETAILS", {
        status: true,
        moduleName: "device",
        data: data,
        isBack: true,
      });
    },
    convert(val, typeName) {
      let options = this.options[typeName];
      for (var i = 0; i < options.length; i++) {
        if (options[i].value == val) {
          return options[i].label;
        }
      }
    },
    notFun() {
      this.$message.error("功能开发中！");
    },
    openChart(val) {
      this.mapFunc.kuosan2(val);
      var list = val;
      if (list.type == 6) {
        this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
          status: true,
          name: "deviceCurve",
          style: {
            width: "160vh",
            height: "80vh",
            left: "calc(50% - 80vh)",
            title: "监控视频",
          },
          data: list,
        });
      } else {
        if(list.type=="6"||list.type=="bjq_001"||list.type=="cjz_001"||list.type=="gnssjzz_001"){
          this.$message.warning("该设备没有监测数据")
        }else{
        this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
          status: true,
          name: "deviceCurve",
          style: {
            width: "80vw",
            height: "",
            left: "calc(50% - 40vw)",
            title: "设备曲线",
          },
          data: list,
          baifenbi: true,
        });
      }
      }
    },
    location(val) {},
  }
};
</script>

<style lang="scss" scoped>
.device_details_list_sensor {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;

  .fenxiang_show {
    width: 100%;
    height: calc(15vh - 20px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .chart-type {
      width: 25%;
      height: 100%;
      .echarts-box {
        width: 100%;
        height: 78%;
      }
    }
  }

  .device_details_list_sensor_search {
    width: 100%;
    padding: 0;
    .bc_details-search-form{
      width: 100%;
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-content: center;
      overflow: hidden;
      ::v-deep .el-form-item{
        width: 50%;
        .el-form-item__label{
          color: #fff;
        }
        .el-input__inner{
          color: #fff;
          background: transparent;
        }
      }
    }
  }
  .block {
    margin: 0 auto;
  }
  .device_details_list_sensor_table {
    width: 100%;
    height: auto;
    max-height: calc(55vh - 20px);
    padding: 0;
    ::v-deep .el-table{
      thead tr{
        background: #053e5acc;
      }
      th{
        color: #fff;
        font-size: 14px;
        border-bottom: none;
      }
      .el-table__body-wrapper {
        height: 100% !important;
      }
    }
    .el-scrollbar {
      height: 50vh;
    }
    &_operation {
      display: inline-block;
      color: #0096ff;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
