<!--
 * @Author: 张峻霖
 * @Date: 2021-02-25 11:17:09
 * @LastEditTime: 2021-06-10 15:10:04
 * @LastEditors: Please set LastEditors
 * @Description: 灾害点列表
 * @FilePath: \LH-UI\src\views\wel\analysisModule\listFile\diasterList.vue
-->
<template>
  <div class="device_list">
    <div class="device_list_search">
      <div>
        <label for="">设备编号：</label>
        <el-input
          v-model="searchValue.code"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div>
        <label for="">设备名称：</label>
        <el-input
          v-model="searchValue.name"
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
      <div>
        <label for="">传感器类型：</label>
        <el-select
          v-model="searchValue.sensorType"
          clearable
          placeholder="请选择"
        >
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
        <label for="">厂商名称：</label>
        <el-select
          v-model="searchValue.factoryName"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in options.factory_option"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <label for="">监测点编号：</label>
        <el-input
          v-model="searchValue.disasterCode"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div>
        <label for="">监测点名称：</label>
        <el-input
          v-model="searchValue.disasterName"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div>
        <label for="">安装位置：</label>
        <el-input
          v-model="searchValue.location"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div>
        <label for="">在线状态：</label>
        <el-select v-model="searchValue.status" clearable placeholder="请选择">
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
    <div class="device_list_table">
      <el-scrollbar>
        <el-table :data="tableData" style="width: 100%" stripe height="100%">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="streetName" label="街道"> </el-table-column>
          <el-table-column prop="communityName" label="社区"> </el-table-column>
          <el-table-column prop="code" label="设备编号"> </el-table-column>
          <el-table-column prop="name" label="设备名称"> </el-table-column>
          <el-table-column prop="type" label="设备类型">
            <template slot-scope="scope">
              <span>{{ convert(scope.row.type, "device_type") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sensorId" label="传感器类型">
            <template slot-scope="scope">
              <span>{{
                sensorTypeConvert(scope.row.sensorType, "sensor_type")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="factoryName" label="厂商名称">
          </el-table-column>
          <el-table-column prop="disasterCode" label="监测点编号">
          </el-table-column>
          <el-table-column prop="disasterName" label="监测点名称">
          </el-table-column>
          <el-table-column prop="location" label="安装位置"> </el-table-column>
          <el-table-column prop="status" label="在线状态">
            <template slot-scope="scope">
              <span>{{ convert(scope.row.status, "device_status") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span @click="locationFun(scope.row)" class="operationSpan">
                定位</span
              >
              <span @click="detailsFun(scope.row)" class="operationSpan">
                详情</span
              >
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
import { deviceList } from "@/api/monitorManage/device";
import { fetchList } from "@/api/monitorManage/manufacturer";
export default {
  computed: mapGetters(["dictionaries", "projectId"]),
  data() {
    return {
      options: {
        device_type: {},
        sensor_type: {},
        factory_option: {},
        device_status: {},
        sensorName: {},
      },
      searchValue: {
        code: "",
        name: "",
        type: "",
        code: "",
        location: "",
        status: "",
        factoryId: "",
        sensorType: "",
      },
      pages: {
        current: 1,
        size: 10,
        total: 0,
      },
      tableData: [],
    };
  },
  components: {},
  watch: {
    "projectId": {
      immediate: true,
      handler(val, oldVal){
        if(val){
          this.getData()
        }
      }
    }
  },
  created() {
    for (const key in this.options) {
      this.options[key] = this.dictionaries.data[key];
    }
    this.options.sensorName = {};
    this.options.sensor_type.forEach((e) => {
      this.options.sensorName[e.value] = e.label;
    });
  },
  mounted() {
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
    this.getPoint();
    window.viewer.scene.postProcessStages.remove(this.mapFunc.lastStage2)
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
    locationFun(value) {
      this.mapFunc.goView({
        longitude: value.longitude,
        latitude: value.latitude,
        height: 400,
        preMinus: 0.001,
      });
      this.mapFunc.kuosan2(value);
    },
    detailsFun(val) {
      this.$store.commit("IS_ANALYSIS_DETAILS", {
        status: true,
        moduleName: "device",
        data: {
          data: val,
        },
      });
      this.mapFunc.goView({
        longitude: value.longitude,
        latitude: value.latitude,
        height: 400,
        preMinus: 0.001,
      });
      this.mapFunc.kuosan2(value);
    },
    searchFun() {
      this.pages.current = 1;
      this.getData();
    },
    reset() {
      this.searchValue = {
        code: "",
        name: "",
        type: "",
        sensorId: "",
        disasterCode: "",
        disasterName: "",
        factoryId: "",
        location: "",
        status: "",
      };
      this.pages = {
        current: 1,
        size: 10,
        total: 0,
      };
      this.getData();
    },
    getData() {
      let search = { ...this.pages, ...this.searchValue, projectId: this.projectId};
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
        projectId: this.projectId
      }).then((res) => {
        let pointParticulars = {
          title: "设备图例",
          iconName: "device", //传入载点图标归类模块
          data: res.data.data.records, //传入多点载点数据
          action: this.backFun,
        };
        this.$store.commit("SET_LEGENDDATA", pointParticulars);
        this.mapFunc.MapPoints(pointParticulars); //调用地图 多点载点函数
      });
    },
    backFun(data) {
      this.$store.commit("IS_ANALYSIS_DETAILS", {
        status: true,
        moduleName: "device",
        data: data,
      });
      this.$store.commit("IS_DATA_ANALYSIS", {
        status: true,
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
    sensorTypeConvert(val, typeName) {
      if (!val) {
        return;
      }
      let name = "";
      let nameArry = val.split(",");
      nameArry.forEach((e, i) => {
        i != 0 && (name += ",");
        name += this.options.sensorName[e];
      });
      return name;
    },
  }
};
</script>

<style lang="scss">
.device_list {
  @import "@/const/crud/dataAnalysis/configuration.scss";
  overflow: hidden;
  &_search {
    overflow: hidden;
    padding: 0 40px 0 10px;
    > div {
      float: left;
      width: 20%;
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
    .el-scrollbar {
      height: 180px;
    }
    .el-table__body-wrapper {
      height: calc(100% - 36px) !important;
    }
  }
  .block {
    margin-top: 0;
  }
}
</style>
