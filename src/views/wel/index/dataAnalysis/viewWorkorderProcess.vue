
<!-- 监测点分析 -->
<template>
  <div class="chart_div">
      <div class="chart_div" v-if="chartsTypeShow">
        <chart-com :options="option"></chart-com>
      </div>
      <div class="chart_div" v-if="!chartsTypeShow" v-loading="!chartsTypeShow"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import chartCom from "@/components/chartcom/index.vue";
import { getWorkOrderStatus } from '@/api/monitorManage/visua';

export default {
    name:'device',
    components:{ chartCom },
    computed: {
        ...mapGetters(["projectId", "userInfo"]),
    },
    data(){
        return{
            chartsTypeShow:false,
            option: {},
            colorList : ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"]
        }
    },
    watch: {
        "projectId":{
            immediate: true,
            handler(x,y){
                if(x) this.getData(x)
            }
        }
    },
    methods:{
        getData(proId){
            getWorkOrderStatus({projectId: proId}).then(res => {
              let chartData = res.data.data;
              this.option = this.initWorkOrderOption(chartData)
              this.chartsTypeShow = true;
            })
        },
        initWorkOrderOption(data){
          let totalNum = [],
              percent = [];
          if(data && data.length){
            data.forEach(order=>{
              totalNum[order.type] = order.total;
              percent[order.type] = {
                value: order.rate,
                label: { show: order.rate==100?false:true }
              }
            })
          }else{
            this.chartsTypeShow = false;
          }
          return {
              grid: {
              x: 50,
              y: 10,
              x2: 60,
              y2: 0
            },
            xAxis: {
              show: false,
            },
            yAxis: [
              {
                show: true,
                data: [ "总工单", "待处理", "进行中", "待核查", "已完成" ],
                inverse: true,
                axisLine: { show: false },
                splitLine: { show: false },
                axisTick: { show: false },
                axisLabel: { color: "#fff" },
              },
              {
                show: true,
                inverse: true,
                data: totalNum,
                axisLabel: {
                  textStyle: {
                    fontSize: 20,
                    color: "#66BAF8",
                  },
                  formatter: "{value}{strip|条}",
                  rich: {
                    strip: {
                      fontSize: 12,
                    }
                  }
                },
                axisLine: { show: false },
                splitLine: { show: false },
                axisTick: { show: false },
              },
            ],
            series: [
              {
                name: "条",
                type: "bar",
                yAxisIndex: 0,
                data: percent,
                barWidth: 10,
                itemStyle: {
                  normal: {
                    barBorderRadius: 20,
                    borderColor: "#000",
                    borderWidth: 1,
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      { offset: 0, color: "#88FAC8" },
                      { offset: 0.4, color: "#66BAF8" },
                      { offset: 1, color: "#66BAF8" },
                    ]),
                  },
                },
                label: {
                  normal: {
                    show: true,
                    position: "right",
                    verticalAlign: "middle",
                    formatter: "{c}%",
                    color: "#fff",
                    fontSize: 14,
                  },
                }
              },
              {
                name: "框",
                type: "bar",
                yAxisIndex: 1,
                barGap: "-100%",
                data: [100, 100, 100, 100, 100],
                barWidth: 13,
                itemStyle: {
                  normal: {
                    color: "none",
                    borderColor: "#2fb6ee",
                    borderWidth: 1,
                    barBorderRadius: 15,
                  },
                },
              },
            ],
          }
        }
    }

}
</script>

<style lang="scss" scoped>
.chart_div{
    width:100%;
    height:100%;
}
::v-deep.el-loading-mask{
    background-color: rgba(255,255,255,.0);
}
.container_chart{
    height:100%;
}
</style>
