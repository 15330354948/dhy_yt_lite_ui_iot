<template>
    <div class="chart_div">
        <div class="container_chart" v-if="chartsTypeShow">
            <chart-com :options="option"></chart-com>
        </div>
        <div class="container_chart" v-if="!chartsTypeShow" v-loading="!chartsTypeShow"></div>
    </div>
</template>

<script>
import chartCom from "@/components/chartcom/index.vue";

import { getTodayRainfall } from '@/api/monitorManage/quxian';

export default {
  name:'todayRainfall',
  props: ["childData"],
  components:{ chartCom },
  data() {
    return {
        chartsTypeShow:false,
        option:{},
        colorList : [
            "rgb(47,182,238)",
            "rgb(32,163,274)",
            "rgb(17,146,255)"
        ]
    };
  },
  created(){
    setTimeout(() => {
      this.initData();
    }, 200);
  },
  methods: {
    initData() {
        getTodayRainfall().then(res=>{
            this.option = this.getEchart(res.data.data);
            this.chartsTypeShow = true;
        })
    },
    getEchart(data){
        var xAxisData = [];//x轴
        var count = [];
        for(var i=0;i<data.length;i++){
            xAxisData.push(data[i].disasterName);
            count.push(data[i].sumRain)
        }
        return {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                    textStyle: {
                        color: "#fff"
                    }
                },
                formatter: params => {
                    var data = params[0].name;
                    // var nameAll = ["危险性小","危险性中","危险性大","危险性特大","稳定","基本稳定","欠稳定","不稳定"];
                    var nameAll = ["今日降雨量"];
                    for(var i=0;i<params.length;i++){
                        data = data + '<br/>' + "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + this.colorList[0] + "'></span>" + nameAll[i] + ' : ' + Number(params[i].value) + "mm"
                    }
                    return data
                }
            },
            grid: {
                x: 40,
                y: 25,
                x2: 20,
                y2: 30,
            },
            legend: {
                show:false,
                right:10,
                top:0,
                itemGap: 16,
                itemWidth: 18,
                itemHeight: 10,
                data:[{
                    name:'监测点数量',
                },
                // {
                //     name:'稳定性',
                // }
                ],
                textStyle: {
                    color: '#fff',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            calculable: true,
            xAxis: [{
                type: "category",
                axisLine: {
                    lineStyle: {
                        color: 'white'
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                axisLabel: {//换行
                        interval: 0,
                        show:true,
                        formatter:function(value){
                            var str = "";
                            var num = 4; //每行显示字数
                            var valLength = value.length; //该项x轴字数
                            var rowNum = Math.ceil(valLength / num); // 行数
                            if(rowNum > 1) {
                                for(var i = 0; i < rowNum; i++) {
                                    var temp = "";
                                    var start = i * num;
                                    var end = start + num;

                                    temp = value.substring(start, end) + "\n";
                                    str += temp;
                                }
                                return str;
                            } else {
                                return value;
                            }
                        }
                    },
                data: xAxisData,
            }],
            yAxis: [{
                name:'单位(mm)',
                nameTextStyle: {
                    fontSize: 12,
                    padding:[10, 10, -7, -10]
                },
                type: "value",
                axisTick: {
                    show: false
                },
                axisLine: { //  改变y轴颜色
                    show: true,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#7FD6FF",
                        width: 1,
                        type: "dashed",
                        opacity:0.5
                    },
                },

            }],
            series: [
                {
                    name: "监测点数量",
                    type: "bar",
                    stack: "监测点数量",
                    barMaxWidth: 25,
                    barGap: "10%",
                    itemStyle: {
                        color: new this.$echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: this.colorList[0]},
                                {offset: 0.5, color: this.colorList[1]},
                                {offset: 1, color: this.colorList[2]}
                            ]
                        )
                    },
                    label:{
                        show:true,
                        position:'top',
                        textStyle: {
                            fontWeight:'bolder',
                            fontSize : '13',
                            fontFamily : '微软雅黑',
                            color:'white',
                        },
                        formatter: prame => {
                            return prame.value
                        }
                    },
                    data: count,
                }
            ]
        }
    }
  },
};
</script>

<style lang="scss" scoped>
    .chart_div{
        width:100%;
        height: calc(100% - 29px);
    }
    .container_chart{
        height:100%;
    }
    ::v-deep.el-loading-mask{
        background-color: rgba(255,255,255,.0);
    }
</style>
