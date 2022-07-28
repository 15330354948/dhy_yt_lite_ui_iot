<template>
   <div class="bc_chart-main">
    <div class="bc_chart-switch">
      时间点：
      <el-select v-model="checkTimer" placeholder="请选择" @change="timerEvent">
        <el-option
          v-for="item in checkTimerData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <!-- <el-button type="primary" @click="uploadChart" icon="el-icon-download">导出</el-button> -->
    </div>
    <div class="bc_chart-big">
      <chart-com :options="chartOption" :ref="chartType +'Chart'"></chart-com>
    </div>
   </div>
</template>

<script>
import chartCom from "@/components/chartcom/index.vue";

import {
  echartsTypeSW,
  echartsTypeSW2D,
  echartsTypeSW2DNew,
} from "@/const/crud/monitorManage/echartsType";

export default {
  name: "dataChart",
  props:["chartData", "chartType", "deviceList"],
  components:{
    chartCom
  },
  data () {
    return {
      getChartData: {},
      singData: {},
      chartOption: {},
      checkTimer: "",
      checkTimerData: [],
    };
  },

  computed: {},
  watch: {
    "chartData":{
      immediate: true,
      handler(b, a) {
        if(b && b.data) {
          this.checkTimer = ""
          this.checkTimerData = []
          b.data.forEach(item=>{
            this.checkTimerData.push({
              label: item[0].time,
              value: item[0].time
            })
          })
          this.getChartData = b
          this.dealChart(b)
        }
      }
    }
  },
  methods: {
    timerEvent(time) {
      this.checkTimer = time
      // this.$parent.getquxianList(this.chartType)
      this.dealChart( this.getChartData)
    },

    dealChart(bData) {
      if(bData.data.length > 0 && this.checkTimer == ""){
        this.checkTimer = bData.data[0][0].time
      }
      this.singData['data'] = bData.data.filter(exc=>{
        return exc[0].time == this.checkTimer
      })

      if (bData.data.length < 1) {
        this.showChart(bData, "", ""); //初始化默认图表
      } else {
        this.showChart(this.singData, null, bData.data[0].unit,"")//初始化图表
      }
    },

    showChart(data, name, danwei, nodeList) {
      var kkkk = 0;
      if (data.data.length) {
        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i][0].xValueList.length > 0) {
            kkkk++;
          }
        }
      }
      if (kkkk === 0) {
        this.chartOption = {};
      } else {
        if(this.chartType == "threeDim"){
          this.chartOption = echartsTypeSW(
            data,
            "三维构型图",
            danwei,
            this.deviceList.disasterCode
          );
        }else if(this.chartType == "cumulate") {
          this.chartOption = echartsTypeSW2DNew(
            data,
            "累计位移数据图",
            danwei,
            this.deviceList.disasterCode,
          );
        }else{
          this.chartOption = echartsTypeSW2DNew(
            data,
            "相对位移数据图",
            danwei,
            this.deviceList.disasterCode
          );
        }
      }
    },
    /**
     * 导出echart图
     */
    uploadChart() {

    }
  }
}
</script>
<style lang='scss' scoped>
.bc_chart-main{
  display: flex;
  justify-content: space-evenly;
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