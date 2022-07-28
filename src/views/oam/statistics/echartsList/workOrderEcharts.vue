<template>
  <div class="main">
    <chart-com :options="option" ref="topChartRef" id="top"></chart-com>
  </div>
</template>
<script>
  import * as echarts from 'echarts';
  export default {
    name: "workOrderEcharts",
    props: ['chartData'],
    data() {
      return {
        option: {},
      };
    },
    watch: {
      chartData: {
        handler(val) {
          if (val.length>0) {
            this.getShow(val);
          }else{
            this.option = null;
          }
        },
        immediate: true
      }
    },
    mounted() {},
    methods: {
      getShow(chartData) {
        var data = [];
        chartData.forEach(item => {
          data.push(item.total)
        });
        data = data.reverse();
        var barWidth = 15;
        var maxNum = 0;
        for (var i = 0; i < data.length; i++) {
          if (data[i] > maxNum) {
            maxNum = data[i];
          }
        }
        this.option = {
          grid: {
            top: "8%",
            left: "10%",
            right: "15%",
            bottom: "2%",
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            confine: true,
            textStyle: {
              fontSize: 14,
              color: "#000",
            },
            formatter: function (params) {
              return (
                "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background:linear-gradient(90deg, #388CFF 0% ,#6CFEFF 100%)'></span>" +
                params[0].name +
                " : " +
                params[0].value
                .toLocaleString()
                .toString()
                .replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, "$1,") +
                " 次"
              );
            },
          },
          xAxis: {
            show: false,
          },
          yAxis: {
            data: ["已完成   ", "待核查   ", "进行中   ", "待接单   ", "总工单   "],
            splitLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: "#000",
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: false,
          },
          series: [{
              type: "bar",
              barWidth: barWidth,
              zlevel: 2,
              data: data.map(function (item) {
                return {
                  value: item,
                  maxNum: maxNum,
                };
              }),
              label: {
                show: true,
                position: "inside",
                distance: 100,
                align: "left",
                formatter: function (params) {
                  var percent =
                    Number(
                      (params.data.value / params.data.maxNum) * 100
                    ).toFixed(2) + "%";
                  return percent;
                },
                color: "#000",
                fontSize: 12,
              },
              itemStyle: {
                borderRadius: 10,
                color: new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                    offset: 0,
                    color: "rgb(136, 250, 200)"
                  },
                  {
                    offset: 1,
                    color: "rgb(102, 186, 248)"
                  },
                ]),
              },
            },
            {
              type: "bar",
              barWidth: barWidth,
              barGap: "-100%",
              data: data.map(function (item) {
                return {
                  realValue: item,
                  value: maxNum,
                };
              }),
              label: {
                show: true,
                position: "right",
                distance: 80,
                align: "right",
                formatter: function (params) {
                  return params.data.realValue + " 次";
                },
                color: "#66bbf9",
                fontSize: 16,
              },
              itemStyle: {
                borderRadius: 10,
                color: "rgba(204,235,255, 0.5)",
              },
            },
          ],
        };
      },
    },
  };

</script>
<style scoped>
  .main {
    width: 100%;
    height: 100%;
  }

  #top {
    width: 100%;
    height: 100%;
  }

</style>
