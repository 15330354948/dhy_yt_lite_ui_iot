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
    <div class="device_details_list_sensor_search">
      <div>
        <label for="">设备编号：</label>
        <el-input
          v-model="searchValue.code"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div>
        <label for="">设备类型：</label>
        <el-select v-model="searchValue.type" clearable placeholder="请选择">
          <el-option
            v-for="item in options.device_type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <!-- <div>
        <label for="">厂商名称：</label>
        <el-select v-model="searchValue.factoryName" placeholder="请选择">
          <el-option
            v-for="item in options.factory_option"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div> -->
      <div>
        <label for="">在线状态：</label>
        <el-select v-model="searchValue.status" placeholder="请选择">
          <el-option
            v-for="item in options.device_status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="search_button">
        <el-button type="primary" @click="searchFun">搜索</el-button>
        <el-button @click="reset">清空</el-button>
      </div>
    </div>
    <div class="device_details_list_sensor_table">
      <el-scrollbar>
        <el-table :data="tableData" style="width: 100%" stripe height="100%">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="code" label="设备编号"> </el-table-column>
          <el-table-column prop="type" label="设备类型">
            <template slot-scope="scope">
              <span>{{ convert(scope.row.type, "device_type") }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="factoryName" label="厂商名称">
          </el-table-column> -->
          <el-table-column prop="location" label="安装位置"> </el-table-column>
          <el-table-column prop="status" label="在线状态">
            <template slot-scope="scope">
              <span>{{ convert(scope.row.status, "device_status") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px">
            <template slot-scope="scope">
              <span
                class="device_details_list_sensor_table_operation"
                @click="openChart(scope.row)"
              >
                查看
              </span>
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
        :page-sizes="[10, 20, 30, 40, 50, 100]"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  deviceList,
  getRealTimeDeviceWarnInfoByDisasterId,
} from "@/api/monitorManage/device";
import { fetchList } from "@/api/monitorManage/manufacturer";
// import { getPageList } from "@/api/hideDanger/obj";

export default {
  computed: mapGetters(["dictionaries", "analysisDetails","projectId"]),
  data() {
    return {
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
  components: {},
  created() {
    for (const key in this.options) {
      this.options[key] = this.dictionaries.data[key];
    }
    this.dangerId = this.analysisDetails.data.data.id;
    fetchList({
      current: 1,
      size: 100000,
    }).then((e) => {
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
    }, 1000);
  },
  methods: {
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
        projectId:this.projectId
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
      }).then((res) => {
        getRealTimeDeviceWarnInfoByDisasterId({
          disasterId: this.dangerId,
          projectId:this.projectId
        }).then((resWarn) => {
          let resWarnData = resWarn.data.data;
          if (resWarnData.length > 0) {
            let data = res.data.data.records.filter((e) => {
              return e.code == resWarnData[0].deviceCode;
            });
            data[0].warnType = resWarnData[0].warnLevel;
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
      // this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
      //   status: true,
      //   name: "deviceCurve",
      //   style: {
      //     width: "80%",
      //     height: "800",
      //     title: "设备曲线",
      //   },
      //   data: list,
      //   baifenbi:true,
      // });
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
      } else if (list.type == 'bjq_001') {
        this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
          status: true,
          name: "deviceCurve",
          style: {
            width: "50vh",
            height: "20vh",
            left: "calc(50% - 80vh)",
            title: "智能报警器",
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
      } else if (list.type == 'bjq_001') {
        this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
          status: true,
          name: "deviceCurve",
          style: {
            width: "50vh",
            height: "20vh",
            left: "calc(50% - 80vh)",
            title: "智能报警器",
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
};
</script>

<style lang="scss">
.device_details_list_sensor {
  @import "@/const/crud/dataAnalysis/configuration.scss";
  overflow: hidden;
  &_search {
    overflow: hidden;
    padding: 0 40px 0 10px;
    > div {
      float: left;
      width: 21.8%;
      padding: 5px 0 5px 0;
      > label {
        display: inline-block;
        width: 120px;
        text-align: right;
        height: 32px;
        line-height: 32px;
      }
      > div {
        width: calc(100% - 120px);
        height: 32px;
        line-height: 32px;
        .el-input__inner {
          line-height: 32px;
          height: 32px;
        }
        input {
          background: none;
          color: #fff;
        }
      }
    }
    .search_button {
      padding: 8px 0 0 17px;
      width: 12.2%;
      > button {
        padding: 7px 10%;
        float: left;
      }
    }
  }
  &_table {
    padding: 5px 20px;
    .operationSpan {
      color: #0096ff;
      font-size: 14px;
      cursor: pointer;
    }
    &_operation {
      display: inline-block;
      color: #0096ff;
      font-size: 14px;
      cursor: pointer;
    }
    .el-scrollbar {
      height: 220px;
    }
    .el-table__body-wrapper {
      height: calc(100% - 36px) !important;
    }
  }
  .block {
    margin-top: 0;
  }
  .el-scrollbar {
    height: 220px;
    // .el-table__body-wrapper {
    //   height: 100% !important;
    // }
  }
}
</style>
