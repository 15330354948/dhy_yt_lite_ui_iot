
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
import chartCom from "@/components/chartcom/index.vue";

// import { getPageList } from "@/api/hideDanger/scope";

export default {
    name:'monitor',
    props: ["disasterId"],
    components:{ chartCom },

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
    mounted(){
      setTimeout(() => {
          this.getData();
      }, 200);
    },
    methods:{
      getToday(){
        var datetime = new Date();
        var year=datetime.getFullYear();
        var month=datetime.getMonth()+1;
        if(month<=9){
            month="0"+month;
        }
        var date=datetime.getDate();
        if(date<=9){
            date="0"+date;
        }
        return year+"-"+month+"-"+date;
      },
      // getData(){
      //   if(this.disasterId){
      //     getPageList({
      //       disasterId: this.disasterId,
      //     })
      //     .then(res => {
      //       this.option = this.componQuxianList(res.data.data)
      //       this.chartsTypeShow = true;
      //     })
      //     .catch(red => {
      //       this.$message({
      //         type:"error",
      //         message:"请求错误"
      //       })
      //     })
      //   }
      // },
      componQuxianList(data){
        let todayNum = 0
        let today = this.getToday()
        var XAxis = [];
        var RateData = [];

        data.forEach(item=>{
          if(today == item.createTime.split(' ')[0]){
            todayNum ++
          }
        })

        RateData = [`${todayNum}`, `${data.length}`];
        XAxis = ['今日新增裂缝', '总计'];

        return {
              tooltip: {
                  trigger: "axis",
                  axisPointer: {
                      type: "shadow",
                      textStyle: {
                          color: "#000"
                      }
                  },
                  formatter: params => {
                      var proseList = params[0].name;

                      for(var i=0;i<params.length;i++){
                          proseList = proseList + '<br/>' + "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + this.colorList[2] + "'></span>" + "裂缝条数" + ' : ' + Number(RateData[params[0].dataIndex]) + "条" + '<br/>'
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
                          name:'裂缝条数',
                      },
                  ],
                  textStyle: {
                      color: '#000',
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
                          color: '#000'
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
                          var num = 6; //每行显示字数
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
                  name:'条数',
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
                          color: '#000'
                      }
                  },
                  min:0,
                  max:20,
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
                      name: "裂缝条数",
                      type: "bar",
                      stack: "裂缝条数",
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
