<!--
 * @Author: 张峻霖
 * @Date: 2021-02-25 11:17:09
 * @LastEditTime: 2021-04-17 20:45:21
 * @LastEditors: Please set LastEditors
 * @Description: 传感器列表
 * @FilePath: \LH-UI\src\views\wel\analysisModule\details\detailsList\deviceList.vue
-->
<template>
  <div class="details_list_sensor">
    <div class="details_list_sensor_search">
      <div>
        <label for="">传感器编号：</label>
        <el-input
          v-model="searchValue.sensorCode"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div>
        <label for="">传感器类型：</label>
        <el-select v-model="searchValue.sensorType" placeholder="请选择">
          <el-option
            v-for="item in options.sensor_type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <label for="">安装位置：</label>
        <el-input
          v-model="searchValue.installLocation"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="search_button">
        <el-button type="primary" @click="searchFun">搜索</el-button>
        <el-button @click="reset">清空</el-button>
      </div>
    </div>
    <div class="details_list_sensor_table">
      <el-scrollbar>
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column prop="sensorCode" label="传感器编号">
          </el-table-column>
          <el-table-column prop="sensorType" label="传感器类型">
            <template slot-scope="scope">
              <span>{{ convert(scope.row.sensorType, "sensor_type") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="deviceCode" label="设备编号">
          </el-table-column>
          <el-table-column prop="deviceName" label="设备名称">
          </el-table-column>
          <el-table-column prop="disasterCode" label="监测点编号">
          </el-table-column>
          <el-table-column prop="disasterName" label="监测点名称">
          </el-table-column>
          <el-table-column prop="installLocation" label="安装位置">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <i class="details_list_sensor_table_operation" @click="notFun"
                ><img src="@/assets/img/icon/file.png" alt=""
              /></i> -->
              <!-- <i
                class="details_list_sensor_table_operation"
                @click="openChart(scope.row)"
              >
                <img src="@/assets/img/icon/chart.png" alt="" />
              </i> -->
              <span class="colorBus" @click="openChart(scope.row)">详情</span>
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
import { fetchList } from "@/api/monitorManage/sensor";
import { getStore } from "@/util/store";
export default {
  computed: mapGetters(["dictionaries", "analysisDetails",'projectId']),
  data() {
    return {
      options: {
        sensor_type: {},
      },
      searchValue: {
        sensorCode: "",
        sensorType: "",
        installLocation: "",
      },
      pages: {
        current: 1,
        size: 10,
        total: 0,
      },
      tableData: [],
      deviceName: null,
    };
  },
  components: {},
  created() {
    for (const key in this.options) {
      this.options[key] = this.dictionaries.data[key];
    }
    this.deviceName = this.analysisDetails.data.data.name;
    this.getData();
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      this.pages.size = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pages.current = val;
      this.getData();
    },
    locationFun(value) {
      this.mapFunc.kuosan(value);
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
        deviceName: this.deviceName,
        projectId:this.projectId
      };
      fetchList(search).then((res) => {
        let data = res.data.data;
        this.pages.total = data.total;
        this.tableData = data.records;
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
      // if(this.analysisDetails.data.data.type == 6){
      //   this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
      //     status: true,
      //     name: "deviceCurve",
      //     style: {
      //       width: "1300",
      //       height: "665",
      //       title: "监控视频",
      //     },
      //     data: this.analysisDetails.data.data,
      //   });
      // }else{
        this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
          status: true,
          name: "sensorInformation",
          style: {
            width: "1200px",
            height: "",
            left:'calc(50% - 600px)',
            title: "传感器详情",
          },
          data: val,
          // baifenbi:true,
        });
      // }
      // this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
      //   status: true,
      //   name: "deviceCurve",
      //   style: {
      //     width: "1600",
      //     height: "800",
      //     title: "设备曲线",
      //   },
      //   data: this.analysisDetails.data.data,
      // });
    },
  },
  watch: {
    analysisDetails: {
      handler(val) {
        this.deviceName = val.data.data.name;
        this.reset();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.details_list_sensor {
  @import "@/const/crud/dataAnalysis/configuration.scss";
  overflow: hidden;
  &_search {
    overflow: hidden;
    padding: 0 40px 0 10px;
    > div {
      float: left;
      width: 25%;
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
      padding: 8px 0 0 38px;
      > button {
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
      img {
        padding: 10px 10px 0 0;
        cursor: pointer;
      }
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
  }
}
.colorBus{
    color: #0096ff;
    font-size: 14px;
    cursor: pointer;
}
</style>
