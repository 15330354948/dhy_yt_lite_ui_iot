<template>
  <div class="main">
    <div id="top2" v-show="echartShow"></div>
    <div class="nodata" v-show="!echartShow">
      <div style="text-align: center">
        <img src="@/assets/img/nodataBig.png" />
      </div>
    </div>
  </div>
</template>
<script>
  import * as echarts from "echarts";
  export default {
    name: "workOrderEcharts",
    props: ['charData'],
    data() {
      return {
        option: {},
        platformData: null,
        timer: null,
        echartShow: true
      };
    },
    created() {
      this.platformData = this.$route.query.platformData
    },
    watch: {
      charData: {
        handler(val) {
          if (val) {
            this.echartShow = true;
            clearInterval(this.timer)
            this.getShow(val);
          } else {
            this.echartShow = false;
          }
        },
        immediate: true
      }
    },
    mounted() {
      // this.$nextTick(()=>{

      // })
    },
    methods: {
      getShow(charData) {
        var data = [];
        var xdata = [];
        charData.forEach(item => {
          data.push(item.total)
          xdata.push(item.type)
        })
        var myChart = this.$echarts.init(document.getElementById("top2"));
        var barWidth = 16;
        var maxNum = 0;
        for (var i = 0; i < data.length; i++) {
          if (data[i] > maxNum) {
            maxNum = data[i];
          }
        }
        var option = {
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
                "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background:linear-gradient(90deg, rgba(56, 229, 165, 1) 0% ,rgba(0, 204, 204, 1) 100%)'></span>" +
                params[0].name +
                " : " +
                params[0].value
                .toLocaleString()
                .toString()
                .replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, "$1,") +
                " 台"
              );
            },
          },
          dataZoom: [{
            yAxisIndex: 0, //这里是从X轴的0刻度开始
            show: false, //是否显示滑动条，不影响使用
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: 5, // 一次性展示6个。
          }, ],
          xAxis: {
            show: false,
          },
          yAxis: {
            data: xdata,
            splitLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: "#000"
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
                align: "center",
                formatter: function (params) {
                  var percent =
                    Number(
                      (params.data.value / params.data.maxNum) * 100
                    ).toFixed(0) + "%";
                  return percent;
                },
                color: "#fff",
                fontSize: 12,
              },
              itemStyle: {
                borderRadius: 8,
                borderColor: "#EFFBF6",
                borderWidth: 1,
                color: new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                    offset: 0,
                    color: "rgba(56, 229, 165, 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 204, 204, 1)"
                  },
                ]),
              },
            },
            {
              type: "bar",
              barWidth: 20,
              barGap: "-111%",
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
                  return params.data.realValue + " 台";
                },
                color: "#000",
                fontSize: 16,
              },
              itemStyle: {
                // color:"none",
                borderColor: "#38E5A5",
                borderWidth: 1,
                borderRadius: 8, //圆角
                color: "#EFFBF6",
              },
            },
          ],
        };
        this.timer = setInterval(function () {
          // 每次向后滚动一个，最后一个从头开始。        
          if (option.dataZoom[0].endValue == data.length) {
            option.dataZoom[0].endValue = 5;
            option.dataZoom[0].startValue = 0;
          } else {
            option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
            option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
          }
          myChart.setOption(option);
        }, 2000);
        myChart.setOption(option);
      },
    },
  };

</script>
<style scoped lang="scss">
  .main {
    width: 100%;
    height: 100%;

    .nodata {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  #top2 {
    width: 100%;
    height: 100%;
  }

</style>
