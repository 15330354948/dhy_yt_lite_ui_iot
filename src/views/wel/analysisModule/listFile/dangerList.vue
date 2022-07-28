<!--
 * @Author: 张峻霖
 * @Date: 2021-02-25 11:17:09
 * @LastEditTime: 2021-06-10 15:10:12
 * @LastEditors: Please set LastEditors
 * @Description: 灾害点列表
 * @FilePath: \LH-UI\src\views\wel\analysisModule\listFile\diasterList.vue
-->
<template>
  <div class="danger_list">
    <div class="danger_list_search">
      <div>
        <label for="">省：</label>
        <el-select v-model="searchValue.provinceCode" @change="provinceClick" placeholder="请选择">
          <el-option
            v-for="item in streetOption"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <label for="">市/区：</label>
        <el-select
          v-model="searchValue.cityCode"
          clearable
          placeholder="请选择"
          @change="search"
        >
          <el-option
            v-for="item in communityOption"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <label for="">县/镇：</label>
        <el-select
          v-model="searchValue.countyCode"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in countyOption"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <label for="">全市统一编号：</label>
        <el-input
          v-model="searchValue.monitorCode"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div>
        <label for="">监测点名称：</label>
        <el-input
          v-model="searchValue.monitorName"
          placeholder="请输入内容"
        ></el-input>
      </div>

      <div class="search_button">
        <el-button type="primary" @click="searchFun">搜索</el-button>
        <el-button @click="reset">清空</el-button>
      </div>
    </div>
    <div class="danger_list_table">
      <el-scrollbar>
        <el-table :data="tableData" style="width: 100%" stripe height="100%">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="monitorCode" label="监测点编号"></el-table-column>
          <el-table-column prop="monitorName" label="监测点名称"></el-table-column>
          <el-table-column prop="provinceName" label="省"> </el-table-column>
          <el-table-column prop="cityName" label="市/区"> </el-table-column>
          <el-table-column prop="countyName" label="县/镇"> </el-table-column>
          <el-table-column prop="location" label="详细位置" width="350"> </el-table-column>
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
import { getPageList } from "@/api/hideDanger/obj";
import { fetchList } from "@/api/monitorManage/manufacturer";
import { area } from "@/api/admin/publice";
import { getPage } from "@/api/warningMag/monitorList";
import { frontDeskAlarmList } from "@/api/warningMag/monitorList";
export default {
  computed: mapGetters(["analysisDetails", "dictionaries","occurWarn", "projectId"]),
  data() {
    return {
      options: {
        disaster_type: {},
      },
      searchValue: {
        pikk: "",
        name: "",
        provinceCode: "",
        cityCode: "",
        countyCode:'',
        steady: "",
      },
      pages: {
        current: 1,
        size: 10,
        total: 0,
      },
      tableData: [],
      streetOption: [],
      communityOption: [],
      countyOption:[],
    };
  },
  components: {},
  watch: {
    "analysisDetails":{
      handler(x,y){
        if(!x.status){
          this.getPoint()
        }
      },
      deep: true
    },
    "searchValue.provinceCode": {
      handler(val) {
        if (!val) {
          this.communityOption = [];
          return;
        }
        this.areaFun(val).then((res) => {
          this.communityOption = res;
        });
      },
      deep: true,
    },
     occurWarn: {
      handler(val) {
        if (val.status) {
          this.getPoint();
        }
      },
      deep: true,
    },
    "projectId": {
      immediate: true,
      handler(x, y) {
        if(x){
          if(x!=0){
            this.getData();
            this.getPoint();
            window.viewer.scene.postProcessStages.remove(this.mapFunc.lastStage2)
          }
        }
      }
    }
  },
  mounted() {
    this.$bus.$on('refreshLonlat', (val) => {
      if(val.status){
        setTimeout( ()=>{ this.getPoint() }, 1000)
      }
    });
    for (const key in this.options) {
      this.options[key] = this.dictionaries.data[key];
    }
    this.areaFun(0).then((res) => {
      this.streetOption = res;
    });
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
  },
  methods: {
    search(val){
       if (!val) {
          this.countyOption = [];
          return;
        }
        this.areaFun(val).then((res) => {
          this.countyOption = res;
        });
    },
    provinceClick(){},
    //加载区域下拉框数据
    async areaFun(id = 0) {
      let option = [];
      await area(id).then((e) => {
        option = e.data.data;
      });
      return option;
    },
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
        moduleName: "danger",
        data: {
          data: val,
        },
      });
      this.$store.commit("SET_LEGEND_STATUS", true);
      this.$store.commit("IS_DATA_ANALYSIS", {
        status: true,
      });
      this.mapFunc.goView({
        longitude: val.longitude,
        latitude: val.latitude,
        height: 400,
        preMinus: 0.001,
      });
      this.mapFunc.kuosan2(val);
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
      let search = { ...this.pages, ...this.searchValue, projectId: this.projectId };
      getPageList(search).then((res) => {
        let data = res.data.data;
        this.pages.total = data.total;
        this.tableData = data.records;
      });
    },
    getPoint() {
      getPageList({
        current: 1,
        size: 100000,
        projectId: this.projectId
      }).then((res) => {
        this.mapFunc.removeLayer("oneLevelLayer");
        this.mapFunc.removeLayer("oneTitleLayer");
        getPage({
          current: 1,
          size: -1,
          disposeStatus: 1,
          projectId: this.projectId
        }).then((warnRes) => {
          let pointParticulars = {
            title: "监测点图例",
            iconName: "danger", //传入载点图标归类模块
            data: res.data.data.records, //传入多点载点数据
            action: this.backFun,
            warnData: warnRes.data.data.records,
          };
          this.mapFunc.MapPoints(pointParticulars); //调用地图 多点载点函数
        });
      });
    },
    backFun(data) {
      this.mapFunc.removeLayer("twoLevelLayer");
      this.$store.commit("IS_ANALYSIS_DETAILS", {
        status: true,
        moduleName: "danger",
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
  }
};
</script>

<style lang="scss">
.danger_list {
  @import "@/const/crud/dataAnalysis/configuration.scss";
  overflow: hidden;
  &_search {
    overflow: hidden;
    padding: 0 40px 0 10px;
    > div {
      float: left;
      width: 16.66%;
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
      height: 220px;
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
