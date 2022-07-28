
<!-- 专业监测分析 -->
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
import { deviceAccount } from '@/api/monitorManage/quxian';

export default {
    name:'monitor',
    components:{ chartCom },
    computed: {
        ...mapGetters(["projectId", "userInfo"]),
    },
    data(){
        return{
            chartsTypeShow:false,
            option:{},
            colorList : [
                "rgb(47,182,238)",
                "rgb(32,163,274)",
                "rgb(17,146,255)"
            ]
        }
    },
    mounted(){},
    watch: {
        "projectId":{
            immediate: true,
            handler(x,y){
                this.getData(x)
            }
        }
    },
    methods:{
        getData(proId){
            deviceAccount({projectId: proId}).then(res => {
                this.option = this.componQuxianList(res.data.data)  
                this.chartsTypeShow = true;
            })
            .catch(red => {
                this.$message({
                    type:"error",
                    message:"请求错误"
                })
            })
        },
        componQuxianList(data){
            var XAxis = [];
            var RateData = [];
            var zaixianData = [];
            var lixianData = [];
            for(var i=0;i<data.deviceTypeCount.length;i++){
                XAxis.push(data.deviceTypeCount[i].type)
                zaixianData.push(data.deviceTypeCount[i].onLine)
                lixianData.push(data.deviceTypeCount[i].offLine)
                RateData.push(data.deviceTypeCount[i].onRate);
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
                        var proseList = params[0].name;

                        for(var i=0;i<params.length;i++){
                            proseList = proseList + '<br/>' + "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + this.colorList[2] + "'></span>" + "在线率" + ' : ' + Number(RateData[params[0].dataIndex]) + "%" + '<br/>' + "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + this.colorList[2] + "'></span>" + "在线数" + ' : ' + zaixianData[params[0].dataIndex] + '<br/>' + "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:red'></span>" + "离线数" + ' : ' + lixianData[params[0].dataIndex]
                        }
                        return proseList
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
                    data:[
                        {
                            name:'在线率',
                        },
                    ],
                    textStyle: {
                        color: '#fff',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑',
                        fontSize: 12,
                    },
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
                    data: XAxis,
                }],
                yAxis: [{
                    name:'百分比',
                    nameTextStyle: {
                        fontSize: 12,
                        padding:[0, 25, 0, 0]
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
                    min:0,
                    max:100,
                    axisLabel:{
                        show:true,
                        interval:'auto',
                        formatter:"{value}"
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
                        name: "在线率",
                        type: "bar",
                        stack: "在线率",
                        barMaxWidth: 25,
                        barGap: "10%",
                        label:
                            {
                                show:true,
                                position:'top',
                                textStyle: {
                                    fontWeight:'bolder',
                                    fontSize : '13',
                                    fontFamily : '微软雅黑',
                                    color:'white'
                                },
                                formatter: prame => {
                                    return RateData[prame.dataIndex] + "%"
                                }
                            }
                        ,
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
                        data: RateData,
                    },
                ]
            }
        },
    }

}
</script>

<style lang="scss" scoped>
.chart_div{
    width:100%;
    height:100%;
}
.container_chart{
    height:100%;
}
::v-deep.el-loading-mask{
    background-color: rgba(255,255,255,.0);
}
</style>