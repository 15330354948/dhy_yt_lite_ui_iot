
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
import { getDisasterGroupList } from '@/api/monitorManage/quxian';

export default {
    name:'device',
    components:{ chartCom },
    computed: {
        ...mapGetters(["projectId", "userInfo"]),
    },
    data(){
        return{
            chartsTypeShow:false,
            option:{},
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
    methods:{
        getData(proId){
            getDisasterGroupList({projectId: proId}).then(res => {
                this.option = this.componQuxianList(res.data.data)
                this.chartsTypeShow = true;
            })
        },
        componQuxianList(data){
            var xAxisData = [];//x轴
            var count = [];
            for(var i=0;i<data.length;i++){
                xAxisData.push(data[i].street_name);
                count.push(data[i].count)
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
                        var nameAll = ["监测点数量"];
                        for(var i=0;i<params.length;i++){
                            data = data + '<br/>' + "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + this.colorList[0] + "'></span>" + nameAll[i] + ' : ' + Number(params[i].value)
                        }
                        return data
                    }
                },
                grid: {
                    x: 40,
                    y: 40,
                    x2: 20,
                    y2: 30,
                },
                legend: {
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
                    axisLabel: {
                        interval: 0,

                    },
                    data: xAxisData,
                }],
                yAxis: [{
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
