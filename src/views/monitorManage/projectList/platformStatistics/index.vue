<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="w_margin">
        <div class="overview_box card_box">
          <div class="topBox">
            <TopShow :objData="obj.objData1" :dataInfo="obj.dataInfo1"></TopShow>
            <TopShow :objData="obj.objData2" :dataInfo="obj.dataInfo2"></TopShow>
            <TopShow :objData="obj.objData3" :dataInfo="obj.dataInfo3"></TopShow>
            <TopShow :objData="obj.objData4" :dataInfo="obj.dataInfo4"></TopShow>
            <TopShow :objData="obj.objData5" :dataInfo="obj.dataInfo5"></TopShow>
            <TopShow :objData="obj.objData6" :dataInfo="obj.dataInfo6"></TopShow>
          </div>
        </div>
        <el-row :gutter="10" class="row_one">
          <el-col :span="12">
            <div class="left card_box">
              <div class="card_title">
                <span class="title_content">监测数据统计</span>
              </div>
              <div class="card_content">
                <MonitorEcharts></MonitorEcharts>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="right card_box">
              <div class="card_title">
                <span class="title_content">短信下发统计</span>
              </div>
              <div class="card_content">
                <DeliveryEcharts></DeliveryEcharts>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="row_two">
          <el-col :span="12">
            <div class="left card_box">
              <div class="card_title">
                <span class="title_content">设备类别统计</span>
              </div>
              <div class="card_content">
                <DeviceEcharts :charData="deviceTypeData"></DeviceEcharts>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="right card_box">
              <div class="card_title">
                <span class="title_content">传感器类型统计</span>
              </div>
              <div class="card_content">
                <SensorEcharts :charData="sensorTypeData"></SensorEcharts>
              </div>
            </div>
          </el-col>
        </el-row>

      </div>
    </basic-container>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import MonitorEcharts from './monitorSum'
  import DeliveryEcharts from "./deliveryEcharts"
  import DeviceEcharts from "./deviceEcharts"
  import SensorEcharts from "./sensorEcharts"
  import TopShow from "./topShow"
  import {
    getTotal,
    deviceType,
    sensorType
  } from "@/api/platformStatistics"

  export default {
    components: {
      MonitorEcharts,
      DeliveryEcharts,
      DeviceEcharts,
      SensorEcharts,
      TopShow
    },
    name: "",
    data() {
      return {
        obj: {
          objData1: {
            name: '数据总数',
            tag: '条',
            colordata: '#FB6260'
          },
          objData2: {
            name: '设备总数',
            tag: '台',
            colordata: '#8167F5'
          },
          objData3: {
            name: '传感器总数',
            tag: '台',
            colordata: '#51D351'
          },
          objData4: {
            name: '监测点总数',
            tag: '个',
            colordata: '#FF7A8C'
          },
          objData5: {
            name: '项目总数',
            tag: '个',
            colordata: '#FF7A8C'
          },
          objData6: {
            name: '短信下发总数',
            tag: '条',
            colordata: '#0099FF'
          },
          dataInfo1: '0',
          dataInfo2: '0',
          dataInfo3: '0',
          dataInfo4: '0',
          dataInfo5: '0',
          dataInfo6: '0'
        },
        deviceTypeData: [],
        sensorTypeData: [],
        parentId: null,
      }
    },
    created() {
      this.parentId = this.$route.query.platformData.id;
    },
    mounted() {
      this.getAllChartData();
    },
    computed: {
      ...mapGetters(["permissions", "projectId"]), //获取权限
    },
    watch: {
      projectId: {
        handler(val) {
          this.parentId = val;
          if (val && val != 0) {
            this.getAllChartData();
          }
        }
      }
    },
    methods: {
      async getAllChartData() {
        //  顶部统计
        if (this.parentId) {
          const request = await getTotal(this.parentId);
          this.obj.dataInfo1 = request.data.data[0];
          this.obj.dataInfo2 = request.data.data[1];
          this.obj.dataInfo3 = request.data.data[2];
          this.obj.dataInfo4 = request.data.data[3];
          this.obj.dataInfo5 = request.data.data[4];
          this.obj.dataInfo6 = request.data.data[5];
        // 设备类型
        const request2 = await deviceType(this.parentId);
        this.deviceTypeData = request2.data.data;

        // 传感器类型
        const request3 = await sensorType(this.parentId);
        this.sensorTypeData = request3.data.data;
        }


      },
    },
  };

</script>
<style lang="scss" scoped>
  .w_margin {
    margin: 10px 15px;
  }

  .overview_box {
    // height: 200px;
    margin-bottom: 10px;

    .topBox {
      display: flex;
    }
  }

  .to_right {
    float: right;
    // display: inline-block;
    width: 300px;
    margin-right: 10px;
  }

  .card_box {
    .card_title {
      height: 50px;
      line-height: 50px;
      background-color: #f9f9f9;
      border: 1px solid #e9e9e9;
      overflow: hidden;
      white-space: nowrap;
      padding: 0 10px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;

      .title_content {
        font-size: 16px;
        font-weight: 700;
        color: #333;
        margin-left: 10px;
      }
    }

    .card_content {
      padding: 5px 10px;
      height: calc(100% - 52px);
      border: 1px solid #e9e9e9;
      border-top: unset;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }

  .row_two,
  .row_three,
  .row_one {
    margin-bottom: 10px;

    .left,
    .right {
      height: 500px;
    }
  }

</style>
