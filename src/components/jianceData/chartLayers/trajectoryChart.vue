<template>
  <div class="bc_traject-chart">
    <div class="bc_chart-switch">
      <div>
        节点选择：
        <el-select v-model="checkNode" placeholder="请选择" @change="nodeChangeEvent">
          <el-option
            v-for="item in nodeSelData"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!-- <el-button type="primary" @click="uploadChart" icon="el-icon-download">导出</el-button> -->
    </div>
    <div class="bc_container-chart">
      <div v-show="chartShow == true" class="echarts" id="trajectChart"></div>
      <div v-show="chartShow == false" class="echarts">
        <div style="text-align:center;"><img src="@/assets/img/nodataBig.png"/></div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { trajectChart } from "@/const/crud/monitorManage/echartsType";

import { getTrajectoryChart } from "@/api/monitorManage/quxian";

export default {
  props: ["trajectData"],
  data () {
    return {
      checkNode: "1",
      nodeSelData: [],
      trajectQuery: {},
      trajectDataAll: {},
      trajectSeries: [],
      chartOption: {},
      chartShow: true,
    };
  },
  watch: {
    "trajectData":{
      handler(b, a) {
        if(b) {
          if(b && b.sensorNo && b.type && b.beginTime && b.endTime){
              this.trajectQuery.sensorNo = b.sensorNo;
              this.trajectQuery.type = b. type
              this.trajectQuery.beginTime = b. beginTime
              this.trajectQuery.endTime = b. endTime
          }
          this.getChartOption()
        }
      },
      immediate: true
    },
    'checkNode':{
      handler(before, after){
        if(before){
          this.nodeChangeEvent(before)
        }
      },
      immediate: true
    }
  },
  methods: {
    nodeChangeEvent(val) {
      this.trajectSeries = []
      for(let key in this.trajectDataAll){
        if(key == val){
          this.trajectDataAll[key].forEach(item=>{
            this.trajectSeries.push({
              value: [item.cumulativeDisplacement, item.angle, item.time],
              itemStyle: { color: '#5470c5' },
              emphasis: { 
                itemStyle: { 
                  borderColor: '#fff', 
                  borderWidth: 2 
                }
              }
            })
          })
        }
      }
      this.chartOption = trajectChart(this.trajectSeries)
      this.drawTrajectChart()
    },

    getChartOption() {
      this.checkNode = null;
      this.nodeSelData = [];
      if(this.trajectQuery){
        getTrajectoryChart(this.trajectQuery).then(res=>{
          if(res.data && res.data.data){
            let chartData = res.data.data
            let sortNodeList = chartData.nodeList.sort(function(a, b){return b - a})
            sortNodeList.forEach((item,index)=>{
              this.nodeSelData.push({value: item, label: `${-(index+1)}米`})
              this.trajectDataAll[item] = chartData[item]
            })
            this.checkNode = chartData.nodeList.length
          }
        })
      }
    },
    drawTrajectChart() {
      this.chart = this.$echarts.init(document.getElementById("trajectChart"));
      this.isShowChart(this.chartOption)
      this.chart.setOption(this.chartOption || {}, true);
    },
    uploadChart() {

    },
    isShowChart(data) {
      if (data && JSON.stringify(data) != "{}") {
        this.chartShow = true;
      } else {
        this.chartShow = false;
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.bc_traject-chart{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  border-right: 1px solid #eee;
  padding: 5px;

  .bc_chart-switch{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 30px;
  }

  .bc_container-chart {
    width: 100%;
    height: 100%;
    .echarts {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      >div{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .bc_chart-big{
    width: 100%;
    height: calc(100% - 30px);
  }

  .echarts {
    div {
      width: 100% !important;
      height: 100% !important;
    }
    canvas{
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>