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
      <el-form
        class="bc_details-search-form"
        ref="devForm"
        :model="searchValue">
        <el-form-item label="点位名称" label-width="70px">
          <el-input
            v-model="searchValue.name"
            placeholder="请输入点位名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备编号" label-width="70px">
          <el-input
            v-model="searchValue.code"
            placeholder="请输入设备编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备类型" label-width="70px">
          <el-select
            v-model="searchValue.type"
            clearable
            placeholder="请选择设备类型">
            <el-option
              v-for="item in typeDevData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="在线状态" label-width="70px">
          <el-select v-model="searchValue.status" placeholder="请选择在线状态">
            <el-option
              v-for="item in options.device_status"
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
          <el-table-column
            prop="name"
            label="点位名称"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="code"
            label="设备编号"
            align="center"
            width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="type"
            label="设备类型"
            align="center"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ convert(scope.row.type, "device_type") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="在线状态" align="center">
            <template slot-scope="scope">
              <span>{{ convert(scope.row.status, "device_status") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <span
                class="device_details_list_sensor_table_operation"
                @click="openChart(scope.row)"
                >查看</span>
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
import { newDeviceType } from "@/api/monitorManage/device";
import { fetchList } from "@/api/monitorManage/manufacturer";
// import { getPageList } from "@/api/hideDanger/obj";

export default {
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
      typeDevData: [],
      dangerId: null,
    };
  },
  computed: mapGetters(["dictionaries", "analysisDetails", "projectId"]),
  watch: {
    analysisDetails: {
      handler(val) {
        this.dangerId = val.data.data.id;
        setTimeout(() => {
          this.reset();
        }, 1000);
      },
      deep: true,
    }
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
  },
  mounted() {
    setTimeout(() => {
      this.getData();
      this.reset();
      this.getPoint()
      this.getDevType()
    }, 1000);
  },
  methods: {
    getDevType(){
      newDeviceType({
        projectId: this.projectId
      }).then(v => {
        this.typeDevData = v.data.data;
      })
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
        projectId: this.projectId,
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
        projectId: this.projectId,
      }).then(async (res) => {
        await getRealTimeDeviceWarnInfoByDisasterId({
          disasterId: this.dangerId,
          projectId: this.projectId,
        }).then((resWarn) => {
          let resWarnData = resWarn.data.data.records;
          if (resWarnData.length > 0) {
            let data = resWarnData.filter((e) => {
              return res.data.data.records[0].code == e.code;
            });
            // data[0].warnType = resWarnData[0].warnLevel;
            data[0].warnType = 4;
            // this.mapFunc.deviceKuosan(data);
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
      console.log(val.longitude && val.latitude)
      if(val.longitude && val.latitude){
        this.mapFunc.goView({
          longitude: val.longitude,
          latitude: val.latitude,
          height: 200,
        })
      }else{
        this.$message.error('该设备暂无经纬度，或经纬度不正确')
      }
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
        if (
          list.type == "6" ||
          list.type == "bjq_001" ||
          list.type == "cjz_001" ||
          list.type == "gnssjzz_001"
        ) {
          this.$message.warning("该设备没有监测数据");
        } else {
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
  },
};
</script>

<style lang="scss" scoped>
.device_details_list_sensor {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  .device_details_list_sensor_search {
    width: 100%;
    padding: 0;
    .bc_details-search-form {
      width: 100%;
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-content: center;
      overflow: hidden;
      ::v-deep .el-form-item {
        width: 50%;
        .el-form-item__label {
          color: #fff;
        }
        .el-input__inner {
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
    ::v-deep .el-table {
      thead tr {
        background: #053e5acc;
      }
      th {
        color: #fff;
        font-size: 14px;
        border-bottom: none;
      }
      .el-table__body-wrapper {
        height: 100% !important;
      }
    }
    .el-scrollbar {
      height: 100%;
    }
    ::v-deep.el-scrollbar__wrap {
      margin-bottom: 0px !important;
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
