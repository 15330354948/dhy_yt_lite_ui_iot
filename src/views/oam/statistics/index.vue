<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="w_margin">
        <div class="overview_box card_box">
          <div class="card_title">
            <span class="title_content">总览</span>

            <el-select v-model="subProjectId" placeholder="全部项目" clearable class="to_right" @change="projectChange">
              <el-option v-for="item in projects" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="card_content overview_content">
            <div>
              <TopEcharts :objData="objOption.objData1" :dataInfo="obj.dataInfo1"></TopEcharts>
            </div>
            <div>
              <TopEcharts :objData="objOption.objData2" :dataInfo="obj.dataInfo2"></TopEcharts>
            </div>
            <div>
              <TopEcharts :objData="objOption.objData3" :dataInfo="obj.dataInfo3"></TopEcharts>
            </div>
            <div>
              <TopEcharts :objData="objOption.objData4" :dataInfo="obj.dataInfo4"></TopEcharts>
            </div>
            <div>
              <TopEcharts :objData="objOption.objData5" :dataInfo="obj.dataInfo5"></TopEcharts>
            </div>
          </div>
        </div>
        <el-row :gutter="10" class="row_one">
          <el-col :span="12">
            <div class="left card_box">
              <div class="card_title">
                <span class="title_content">设备异常类别统计</span>
                <span class="table_info">
                  <img src="@/assets/img/tableBtn.png">
                </span>
              </div>
              <div class="card_content">
                <DevEcharts :chartData="deviceAbnormalData"></DevEcharts>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="right card_box">
              <div class="card_title">
                <span class="title_content">厂商设备异常排名</span>
                <span class="table_info">
                  <img src="@/assets/img/tableBtn.png">
                </span>
              </div>
              <div class="card_content">
                <FirmEcharts :chartData="manuData"></FirmEcharts>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="row_two">
          <el-col :span="12">
            <div class="left card_box">
              <div class="card_title">
                <span class="title_content">离线时长统计</span>
                <span class="table_info">
                  <img src="@/assets/img/tableBtn.png">
                </span>
              </div>
              <div class="card_content">
                <UnderlineEcharts :chartData="UnderlineData"></UnderlineEcharts>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="right card_box">
              <div class="card_title">
                <span class="title_content">历史设备故障排名</span>
              </div>
              <div class="card_content">
                <HistoryEcharts v-if="historyShow" :chartData="historyDevData"></HistoryEcharts>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="row_three">
          <el-col :span="12">
            <div class="left card_box">
              <div class="card_title">
                <span class="title_content">异常设备处置状态统计</span>
              </div>
              <div class="card_content">
                <AbnormalEcharts :chartData="devceManageData"></AbnormalEcharts>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="right card_box">
              <div class="card_title">
                <span class="title_content">运维工单状态统计</span>
              </div>
              <div class="card_content">
                <WorkOrderEcharts :chartData="workOrderData"></WorkOrderEcharts>
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
  import TopEcharts from "./echartsList/topEcharts"
  import DevEcharts from "./echartsList/devEcharts"
  import FirmEcharts from "./echartsList/firmEcharts"
  import UnderlineEcharts from "./echartsList/underlineEcharts"
  import HistoryEcharts from "./echartsList/historyEcharts"
  import AbnormalEcharts from "./echartsList/abnormalEcharts"
  import WorkOrderEcharts from "./echartsList/workOrderEcharts"
  import {
    getRise,
    getOnline,
    getWork,
    getDiffer,
    deviceAbnormal,
    historyDevType,
    getDic,
    factoryDevice,
    deviceStatus,
    projectList,
    abnormalList
  } from "@/api/statisticsOam/statisticsOam.js";
  export default {
    components: {
      TopEcharts,
      DevEcharts,
      FirmEcharts,
      UnderlineEcharts,
      HistoryEcharts,
      AbnormalEcharts,
      WorkOrderEcharts
    },
    name: "",
    data() {
      return {
        obj: {
          dataInfo1: {
            percentage: 15.9, //上升下滑百分比
            sum: 2000, //总数
            sumpercentage: 100, //总百分比
            // state: false, // 正负箭头
            dataSeries: [],
          },
          dataInfo2: {
            percentage: 0,
            sum: 0,
            sumpercentage: 0,

            dataSeries: [],
          },
          dataInfo3: {
            percentage: 0,
            sum: 0,
            sumpercentage: 0,
            dataSeries: [],
          },
          dataInfo4: {
            percentage: 0,
            sum: 0,
            // state: true,
            sumpercentage: 0,
            dataSeries: [],
          },
          dataInfo5: {
            percentage: 0,
            sum: 0,
            sumpercentage: 0,
            dataSeries: [],
          },
        },
        objOption: {
          objData1: {
            titleSum: '设备总数(台)',
            titlesun: '占比',
            colordata: '#f60',
            type: 1,
          },
          objData2: {
            titleSum: '在线设备(台)',
            titlesun: '在线率',
            colordata: '#50B5F7',
            type: 2,
          },
          objData3: {
            titleSum: '离线设备(台)',
            titlesun: '离线率',
            colordata: '#B8ABF1',
            type: 2,
          },
          objData4: {
            titleSum: '异常设备(台)',
            titlesun: '异常率',
            colordata: '#F7B9C2',
            type: 2,
          },
          objData5: {
            titleSum: '未完成工单(台)',
            titlesun: '未完成率',
            colordata: '#A9E9A9',
            type: 1,
          },
        },
        UnderlineData: [],
        workOrderData: [],
        deviceAbnormalData: [],
        devceManageData: [],
        manuData: [],
        projects: [{
            label: "项目一",
            value: "1",
          },
          {
            label: "项目二",
            value: "2",
          },
        ],
        abnormalData: [],
        historyDevData: [],
        subProjectId: '',
        historyShow: false
      };
    },
    created() {},
    mounted() {
      this.getDicData();
      this.getProList();
      this.initChartData();
    },
    computed: {
      ...mapGetters(["permissions", "projectId"]), //获取权限
    },
    watch: {
      projectId: {
        handler(val) {
          if (val && val != 0) {
            this.getDicData();
            this.getProList();
            this.initChartData();
          }
        },
      }
    },
    methods: {
      getProList() {
        projectList({
          projectId: this.projectId,
          size: -1
        }).then(res => {
          this.projects = res.data.data.records;
          // this.subProjectId = res.data.data.records[0].id;
        })
      },
      getDicData() {
        getDic('abnormal_type').then(res => {
          this.abnormalData = res.data.data
        })
      },
      projectChange(e) {
        this.subProjectId = e;
        this.initChartData();
      },
      async initChartData() {
        this.historyShow = false;
        // 总览
        const res = await getRise({
          projectId: this.projectId,
          subprojectId: this.subProjectId
        })
        let data = res.data.data;
        this.obj.dataInfo1.sum = data.total;
        this.obj.dataInfo1.percentage = data.riseRatio
        this.obj.dataInfo1.sumpercentage = data.ratio
        this.obj.dataInfo1.dataSeries = data.weekTotal.map(item => {
          return item.total
        });
        const res2 = await getOnline({
          projectId: this.projectId,
          subprojectId: this.subProjectId
        });
        let data2 = res2.data.data;
        this.obj.dataInfo2.sum = data2.onlineTotal;
        this.obj.dataInfo2.percentage = data2.weekOnRate;
        this.obj.dataInfo2.sumpercentage = data2.onlineRate;
        this.obj.dataInfo2.dataSeries = data2.weekOnTotal.map(item => {
          return item.total
        });
        this.obj.dataInfo3.sum = data2.offlineTotal;
        this.obj.dataInfo3.percentage = data2.weekOffRate;
        this.obj.dataInfo3.sumpercentage = data2.offlineRate;
        this.obj.dataInfo3.dataSeries = data2.weekOffTotal.map(item => {
          return item.total
        });
        const res3 = await getWork({
          projectId: this.projectId,
          subprojectId: this.subProjectId
        });
        let data3 = res3.data.data;
        this.workOrderData = data3.workOrderStatuses||[];
        this.obj.dataInfo5.sum = data3.total;
        this.obj.dataInfo5.percentage = data3.riseRatio;
        this.obj.dataInfo5.sumpercentage = data3.ratio;
        this.obj.dataInfo5.dataSeries = data3.weekTotal.map(item => {
          return item.total
        });
        const res9 = await abnormalList({
          projectId: this.projectId,
          subprojectId: this.subProjectId
        })
        let data9 = res9.data.data;
        this.obj.dataInfo4.sum = data9.total;
        this.obj.dataInfo4.percentage = data9.riseRatio;
        this.obj.dataInfo4.sumpercentage = data9.ratio;
        if (data9.weekCensusList.length < 1) {
          this.obj.dataInfo4.dataSeries = [0, 0, 0, 0, 0, 0, 0]
        } else {
          this.obj.dataInfo4.dataSeries = data9.weekCensusList.map(item => {
            return item.total
          });
        }



        // 离线时长
        const res4 = await getDiffer({
          projectId: this.projectId,
          subprojectId: this.subProjectId
        })
        this.UnderlineData = res4.data.data;

        // 历史设备故障排名
        const res8 = await historyDevType({
          projectId: this.projectId,
          subprojectId: this.subProjectId
        })
        let total = 0;
        for (var i = 0; i < res8.data.data.length; i++) {
          total += res8.data.data[i].total;
        }
        res8.data.data.forEach((item, index) => {
          this.$set(item, "sort", index + 1);
          this.$set(item, "perc", Number((item.total / total * 100).toFixed(2)));
        })
        this.historyShow = true;
        this.historyDevData = res8.data.data;

        // 设备异常
        const res5 = await deviceAbnormal({
          projectId: this.projectId,
          subprojectId: this.subProjectId
        })
        this.deviceAbnormalData = res5.data.data;
        this.deviceAbnormalData.forEach(item => {
          this.$set(item, 'value', item.typeCount);
          this.abnormalData.forEach(it => {
            if (it.dictValue == item.type) {
              this.$set(item, 'name', it.label);
            }
          })
        })

        // 厂商设备异常
        const res6 = await factoryDevice({
          projectId: this.projectId,
          subprojectId: this.subProjectId
        })
        this.manuData = res6.data.data;

        // 设备处置
        const res7 = await deviceStatus({
          projectId: this.projectId,
          subprojectId: this.subProjectId
        })
        this.devceManageData = res7.data.data;
      },

    },
  };

</script>
<style lang="scss" scoped>
  .w_margin {
    margin: 10px 15px;
  }

  .overview_box {
    height: 300px;
    margin-bottom: 10px;

    .overview_content {
      width: 100%;
      display: flex;

      >div {
        width: 20%;
      }
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

      .table_info {
        float: right;
        margin-right: 10px;

        img {
          position: relative;
          top: 5px;
          cursor: pointer;
        }
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
