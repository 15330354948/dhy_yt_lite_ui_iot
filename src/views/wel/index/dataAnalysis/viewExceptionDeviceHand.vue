
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
import { getDeviceDisposalStatus } from '@/api/monitorManage/visua';

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
            colorList : [
                "rgb(61,192,216)",
                "rgb(44,160,180)",
                "rgb(24,122,139)",
            ]
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
    mounted() {
      // this.getData(this.projectId)
    },
    methods:{
      getData(proId){
        getDeviceDisposalStatus({projectId: proId})
          .then(res => {
            let chartData = res.data.data
            this.option = this.initChartOption(chartData)
            this.chartsTypeShow = true;
          })
          .catch(err=>{
            this.chartsTypeShow = false;
          })
      },
      initChartOption(data){
        let disposed = { number: 0, value: 0 },
            noDisposed = { number: 0, value: 0 },
            underDisposed = { number: 0, value: 0 };
        if(data.length) {
          data.forEach(num=>{
            switch(num.typeStatus){
              case '已处置': // 已完成
                disposed.number = num.typeCount
                disposed.value = num.rate/100
                break;
              case '处置中': // 处置中
                underDisposed.number = num.typeCount
                underDisposed.value = num.rate/100
                break;
              default: // 未处置
                noDisposed.number = num.typeCount
                noDisposed.value = num.rate/100
                break;
            }

          })
        }
        return {
            title: [{
            text: "未处置",
            left: "15%",
            bottom: "5%",
            textAlign: "center",
            textStyle: {
              color: "#FE5555",
              fontSize: 16,
            },
          },{
            text: "处置中",
            left: "49%",
            bottom: "5%",
            textAlign: "center",
            textStyle: {
              color: "#FFBF11",
              fontSize: 16,
            },
          },{
            text: "已完成",
            left: "82%",
            bottom: "5%",
            textAlign: "center",
            textStyle: {
              color: "#49d088",
              fontSize: 16,
            },
          }],
          series: [
            {
              type: "liquidFill",
              data: [noDisposed],
              radius: "60%",
              color: ["#ff3e577e", "#F07581", "#FB5E61"],
              center: ["17%", "45%"],
              outline: {
                borderDistance: 5,
                itemStyle: {
                  borderWidth: 6,
                  borderColor: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {offset: 0, color: "#ff3e57"},
                    {offset: 1, color: "#ff8849"}
                  ]),
                },
              },
              label: {
                normal: {
                  color: "#FE5555",
                  insideColor: "#fff",
                  fontSize: 14,
                  formatter: params => {
                    let number = params.data.number;
                    let value = params.data.value;
                    let reData = `{number|${number}}台\n${(value*100).toFixed(1)}%`
                    return reData
                  },
                  rich:{
                    number:{
                      fontSize:28
                    }
                  }
                },
              },
              backgroundStyle: {
                color: "fff",
                opacity: 0,
              },
            },
            {
              type: "liquidFill",
              data: [underDisposed],
              radius: "60%",
              color: ["#FFBF107e", "#F4B30E", "#EACE36"],
              center: ["50%", "45%"],
              outline: {
                borderDistance: 5,
                itemStyle: {
                  borderWidth: 6,
                  borderColor: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {offset: 0, color: "#FFBF10"},
                    {offset: 1, color: "#FFFF80"}
                  ]),
                },
              },
              label: {
                normal: {
                  color: "#FFBF11",
                  insideColor: "#FFF",
                  fontSize: 14,
                  formatter: params => {
                    let number = params.data.number;
                    let value = params.data.value;
                    let reData = `{number|${number}}台\n${(value*100).toFixed(1)}%`
                    return reData
                  },
                  rich:{
                    number:{
                      fontSize:28
                    }
                  }
                },
              },
              backgroundStyle: {
                color: "fff",
                opacity: 0,
              },
            },
            {
              type: "liquidFill",
              data: [disposed],
              radius: "60%",
              color: ["#41ec8f7e", "#38b470", "#2aaf66"],
              center: ["83%", "45%"],
              outline: {
                borderDistance: 5,
                itemStyle: {
                  borderWidth: 6,
                  borderColor: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {offset: 0, color: "#41ec8f"},
                    {offset: 1, color: "#3af5c4"}
                  ]),
                },
              },
              label: {
                normal: {
                  color: "#41ec8f",
                  insideColor: "#FFF",
                  fontSize: 14,
                  formatter: params => {
                    let number = params.data.number;
                    let value = params.data.value;
                    let reData = `{number|${number}}台\n${(value*100).toFixed(1)}%`
                    return reData
                  },
                  rich:{
                    number:{
                      fontSize:28
                    }
                  }
                },
              },
              backgroundStyle: {
                color: "fff",
                opacity: 0,
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
