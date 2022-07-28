<!--
 * @Author: 张峻霖
 * @Date: 2021-03-29 08:51:24
 * @LastEditTime: 2021-05-28 17:25:19
 * @LastEditors: Please set LastEditors
 * @Description: 预警列表
 * @FilePath: \LH-UI\src\views\wel\analysisModule\listFile\warning.vue
-->
<template>
  <div class="warn_list">
    <div class="warn_list_search">
      <div>
        <label for="">预警编号：</label>
        <el-input v-model="searchValue.disasterBatchNo" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <label for="">街道：</label>
        <el-select v-model="searchValue.streetCode" clearable placeholder="请选择">
          <el-option v-for="item in streetOption" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </div>
      <div>
        <label for="">社区：</label>
        <el-select v-model="searchValue.communityCode" clearable placeholder="请选择">
          <el-option v-for="item in communityOption" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </div>
      <div>
        <label for="">监测点编号：</label>
        <el-input v-model="searchValue.disasterNo" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <label for="">监测点名称：</label>
        <el-input v-model="searchValue.disasterName" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <label for="">位置：</label>
        <el-input v-model="searchValue.location" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <label for="">处置状态：</label>
        <el-select v-model="searchValue.disposeStatus" clearable placeholder="请选择">
          <el-option label="处置中" value="1"> </el-option>
          <el-option label="已处置" value="2"> </el-option>
        </el-select>
      </div> -->
      <div v-if="isDataAnalysis.data.moduleName=='warn'">
        <label for="">当前告警等级：</label>
        <el-select v-model="searchValue.amendLevel" clearable placeholder="请选择">
          <el-option v-for="(item, index) in yujingList" :key="index" :label="item.name" :value="item.number">
          </el-option>
        </el-select>
      </div>
      <div v-else>
        <label for="">首次告警等级：</label>
        <el-select v-model="searchValue.firstLevel" clearable placeholder="请选择">
          <el-option v-for="(item, index) in yujingList" :key="index" :label="item.name" :value="item.number">
          </el-option>
        </el-select>
      </div>

      <!-- <div>
        <label for="">预警等级：</label>
        <el-select
          v-model="searchValue.warnLevel"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in options.warn_level"
            :key="item.value"
            :label="item.description"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div> -->
      <!-- <div>
        <label for="">预警状态：</label>
        <el-select
          v-model="searchValue.disposeStatus"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in options.warn_status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div> -->
      <div class="search_button">
        <el-button type="primary" @click="searchFun">搜索</el-button>
        <el-button @click="reset">清空</el-button>
      </div>
    </div>
    <div class="warn_list_table">
      <el-scrollbar>
        <el-table :data="tableData" style="width: 100%" stripe height="100%">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="disasterBatchNo" label="预警编号" width="200"></el-table-column>
          <el-table-column prop="streetName" label="街道"> </el-table-column>
          <el-table-column prop="communityName" label="社区"> </el-table-column>
          <el-table-column prop="disasterNo" label="监测点编号"></el-table-column>
          <el-table-column prop="disasterName" label="监测点名称"></el-table-column>
          <el-table-column prop="location" label="监测点位置">
          </el-table-column>
          <el-table-column prop="firstLevel" label="首次告警等级">
            <template slot-scope="scope">
              <span>{{scope.row.firstLevel == 4 ? '红色告警' :
                        scope.row.firstLevel == 3 ? '橙色告警' :
                        scope.row.firstLevel == 2 ? '黄色告警' :
                        scope.row.firstLevel == 1 ? '蓝色告警' :
                        scope.row.firstLevel == 0 ? '正常' :
                        scope.row.firstLevel}}</span>
            </template>
          </el-table-column>
          <div v-if="isDataAnalysis.data.moduleName=='warn'">
            <el-table-column prop="amendLevel" label="当前告警等级">
              <template slot-scope="scope">
                <span>{{scope.row.amendLevel == 4 ? '红色告警' :
                        scope.row.amendLevel == 3 ? '橙色告警' :
                        scope.row.amendLevel == 2 ? '黄色告警' :
                        scope.row.amendLevel == 1 ? '蓝色告警' :
                        scope.row.amendLevel == 0 ? '正常' :
                        scope.row.amendLevel}}</span>
              </template>
            </el-table-column>
          </div>
          <div v-else>
            <el-table-column prop="highestLevel" label="最高告警等级">
              <template slot-scope="scope">
                <span>{{scope.row.highestLevel == 4 ? '红色告警' :
                        scope.row.highestLevel == 3 ? '橙色告警' :
                        scope.row.highestLevel == 2 ? '黄色告警' :
                        scope.row.highestLevel == 1 ? '蓝色告警' :
                        scope.row.highestLevel == 0 ? '正常' :
                        scope.row.highestLevel}}</span>
              </template>
            </el-table-column>
          </div>
          <el-table-column prop="time" label="最新告警时间"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span @click="detailsFun(scope.row)" class="operationSpan">
                详情</span>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
    <div class="block">
      <el-pagination small @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="pages.current" :page-size="pages.size" layout="prev, pager, next,sizes,total"
        :total="pages.total" :page-sizes="[10, 20, 30, 40, 50, 100]">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import { warnVisuaList } from "@/api/dataAnalysis/warn";
  import { area } from "@/api/admin/publice";
  import {
    getPage,
    getHistoryPage
  } from "@/api/warningMag/monitorList";

  export default {
    computed: mapGetters(["dictionaries", "isDataAnalysis","publicWindowData", "projectId"]),
    data() {
      return {
        options: {
          warn_level: {},
          warn_status: {},
        },
        disposeStatus: "",
        searchValue: {
          streetCode: "",
          communityCode: "",
          disasterName: "",
          disasterNo: "",
          location: "",
          warnLevel: "",
          disasterBatchNo: "",
          amendLevel: "",
          disposeStatus: "",
          firstWarn: ""
        },
        pages: {
          current: 1,
          size: 10,
          total: 0,
        },
        tableData: [],
        streetOption: [],
        communityOption: [],
        yujingList: [{
          name: "红色预警",
          number: 4,
        },
        {
          name: "橙色预警",
          number: 3,
        },
        {
          name: "黄色预警",
          number: 2,
        },
        {
          name: "蓝色预警",
          number: 1,
        },
        {
          name: "正常",
          number: 0,
        },
        ],
      };
    },
    watch: {
      "searchValue.streetCode": {
        handler(val) {
          if (!val) {
            this.communityOption = [];
            return;
          }
          // this.areaFun(val).then((res) => {
          //   this.communityOption = res;
          // });
          area(val).then((e) => {
            this.communityOption = e.data.data;
          });
        },
        deep: true,
      },
      publicWindowData:{
        handler(val){
          if(val.reset){
            this.getData();
          }
        }
      },
      "isDataAnalysis": {
        handler(val,oVal) {
          if (!val.status) return;
          this.searchValue.firstWarn = "";
          this.searchValue.highestLevel = "";
          this.searchValue.amendLevel = "";
          if(val.data.data && val.data.data.type){
            let dataAnalysis = val.data.data;
            this.disposeStatus = dataAnalysis.type + "";
            this.searchValue.disposeStatus = dataAnalysis.type + "";
            if (dataAnalysis.type != 2) {
              this.searchValue.amendLevel = dataAnalysis.warnLevel + "";
            } else {
              this.searchValue.highestLevel = dataAnalysis.warnLevel + "";
            }
          }else{
            this.disposeStatus = '1'
            this.searchValue.disposeStatus = '1'
          }
          this.getData();
        },
        immediate: true,
      },
      "projectId":{
        immediate: true,
        handler(val, oVal) {
          this.getData();
        }
      }
    },
    mounted() {
      for (const key in this.options) {
        this.options[key] = this.dictionaries.data[key];
      }
      this.areaFun(440308).then((res) => {
        this.streetOption = res;
      });
    },
    methods: {
      //加载区域下拉框数据
      async areaFun(id) {
        let option = [];
        await area(440308).then((e) => {
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
      detailsFun(val) {
        this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
          status: true,
          name: "warnList",
          style: {
            width: "90%",
            height: "",
            left: "calc(50% - 45%)",
            title: "预警详情",
          },
          data: val,
        });
      },
      searchFun() {
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
          amendLevel: "",
          firstWarn: "",
          disasterBatchNo: "",
          disposeStatus: "1",
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
          projectId: this.projectId
        };
        if (this.disposeStatus == '1') {
          getPage(search).then((res) => {
            let data = res.data.data;
            this.pages.total = data.total;
            this.tableData = data.records;
          });
        } 
        if (this.disposeStatus == '2') {
          getHistoryPage(search).then((res) => {
            let data = res.data.data;
            this.pages.total = data.total;
            this.tableData = data.records;
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
    }    
  };

</script>

<style lang="scss">
  .warn_list {
    @import "@/const/crud/dataAnalysis/configuration.scss";
    overflow: hidden;

    &_search {
      overflow: hidden;
      padding: 0 40px 0 10px;

      >div {
        float: left;
        width: 16.66%;
        padding: 5px 0 5px 0;

        >label {
          display: inline-block;
          width: 120px;
          text-align: right;
          height: 32px;
          line-height: 32px;
        }

        >div {
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

        >button {
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
