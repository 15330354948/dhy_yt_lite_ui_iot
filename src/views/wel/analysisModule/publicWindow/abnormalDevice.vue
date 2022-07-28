<template>
  <div class="danger_list">
    <div class="danger_list_search">
      <!-- <div>
        <label for="">行政区划</label>
        <el-select v-model="abnormalForm.xzqh" placeholder="请选择">
        </el-select>
      </div> -->
      <div>
        <label for="">监测点名称</label>
        <el-input v-model="abnormalForm.monitorName" placeholder="监测点名称"></el-input>
      </div>
      <div>
        <label for="">点位名称</label>
        <el-input v-model="abnormalForm.deviceName" placeholder="点位名称"></el-input>
      </div>
      <div>
        <label for="">设备编号</label>
        <el-input v-model="abnormalForm.deviceCode" placeholder="设备编号"></el-input>
      </div>
      <div class="search_button">
        <el-button type="primary" @click="abnormalSubmit">搜索</el-button>
        <el-button @click="abnormalReset">清空</el-button>
      </div>
    </div>
    <!-- <el-form :inline="true" :model="abnormalForm" class="demo-form-inline">
        <el-row>
          <el-col :span="8">
            <el-form-item label="行政区划">
              <el-input v-model="abnormalForm.xzqh" placeholder="行政区划"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="监测点名称">
              <el-input v-model="abnormalForm.monitorName" placeholder="监测点名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="点位名称">
              <el-input v-model="abnormalForm.pointName" placeholder="点位名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="设备编号">
              <el-input v-model="abnormalForm.deviceNo" placeholder="设备编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="abnormalSubmit">搜索</el-button>
              <el-button type="success" @click="abnormalReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form> -->
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <!-- <el-table-column prop="monitorName" label="行政区划" width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.provinceName }}{{ scope.row.cityName
          }}{{ scope.row.countyName }}{{ scope.row.streetName
          }}{{ scope.row.communityName }}
          </template>
        </el-table-column> -->
        <el-table-column prop="monitorName" label="监测点名称" width="180" align="center"></el-table-column>
        <el-table-column prop="deviceName" label="点位名称" width="180" align="center"></el-table-column>
        <el-table-column prop="deviceCode" label="设备编号" align="center"></el-table-column>
        <el-table-column prop="deviceType" label="设备类型" align="center">
          <template slot-scope="scope">
            {{convert(scope.row.deviceType, "device_type")}}
          </template>
        </el-table-column>
        <el-table-column prop="abnormalType" label="异常类型" align="center">
          <template slot-scope="scope">
            {{convertAbnormal(scope.row.abnormalType)}}
          </template>
        </el-table-column>
        <el-table-column prop="disposalStatus" label="当前处置状态" align="center">
          <template slot-scope="scope">
            {{scope.row.disposalStatus == "y" ? "已处置" : scope.row.disposalStatus == "c" ? "处置中" : "未处置"}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span class="device_details_list_sensor_table_operation" @click="openChart(scope.row)">查看</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination small @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="page.current" :page-size="page.size" layout="prev, pager, next,sizes,total"
          :total="page.total" :page-sizes="[10, 20, 30, 40, 50, 100]">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    abnormalViewList,
    getDic
  } from "@/api/abnormal/abnormalDev"
  import {
    mapGetters
  } from "vuex";

  export default {
    data() {
      return {
        abnormalForm: {
          // xzqh: "",
          monitorName: "",
          deviceName: "",
          deviceCode: ""
        },
        tableData: [],
        page: {
          current: 1,
          size: 10,
          total: 0,
        },
        options: {
          device_type: {},
          sensor_type: {},
          factory_option: {},
          device_status: {},
        },
      };
    },
    created() {
      for (const key in this.options) {
        this.options[key] = this.dictionaries.data[key];
      }

    },
    computed: mapGetters(["dictionaries", "analysisDetails", "projectId"]),
    mounted() {
      this.getAbnormalList();
      this.getDicData();
    },
    methods: {
      getDicData() {
        getDic('abnormal_type').then(res => {
          this.abnormalData = res.data.data
        })
      },
      convert(val, typeName) {
        let options = this.options[typeName];
        for (var i = 0; i < options.length; i++) {
          if (options[i].value == val) {
            return options[i].label;
          }
        }
      },
      convertAbnormal(val) {
        for (var i = 0; i < this.abnormalData.length; i++) {
          if (this.abnormalData[i].value == val) {
            return this.abnormalData[i].label;
          }
        }
      },
      getAbnormalList() {
        abnormalViewList(Object.assign(this.page, this.abnormalForm, {
          projectId: this.projectId
        })).then(res => {
          this.tableData = res.data.data.records;
          this.page.total = res.data.data.total;
        })
      },
      openChart(val) {
        // this.mapFunc.kuosan2(val);
        this.$set(val, "type", val.deviceType)
        this.$set(val, "name", val.deviceName)
        var list = val;
        // if (val.longitude && val.latitude) {
        //   this.mapFunc.goView({
        //     longitude: val.longitude,
        //     latitude: val.latitude,
        //     height: 200,
        //   })
        // } else {
        //   this.$message.error('该设备暂无经纬度，或经纬度不正确')
        // }
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
      //  异常列表搜索
      abnormalSubmit() {
        this.page.current = 1
        this.getAbnormalList()
      },
      handleSizeChange(val) {
        this.page.size = val;
        this.getAbnormalList();
      },
      handleCurrentChange(val) {
        this.page.current = val;
        this.getAbnormalList();
      },
      //重置异常数据列表
      abnormalReset() {
        this.abnormalForm = {
          // xzqh: "",
          monitorName: "",
          deviceName: "",
          deviceCode: ""
        }
        this.page.current = 1
        this.getAbnormalList()
      }
    }
  }

</script>
<style lang='scss' scoped>
  .danger_list {
    padding: 20px;
    height: 100%;
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

    .el-table {
      padding: 10px 20px;

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
