<template>
  <div class="main">
    <chart-com :options="option" ref="topChartRef" id="top"></chart-com>
  </div>
</template>

<script>
  export default {
    name: "underlineEcharts",
    props: ['chartData'],
    components: {},
    data() {
      return {
        chartText: "离线设备",
        option: {},
      };
    },
    computed: {},
    created() {},
    mounted() {

    },
    watch: {
      chartData: {
        handler(val) {
          if (val) {
            this.getLine(val);
          }
        },
        immediate: true
      }
    },
    methods: {
      getLine(data) {
        if (data && data.length > 0) {
          let xData = [],
            yData = [];
          data.forEach((e) => {
            if(e.day==8){
              e.day = e.day + '天及以上'
            }else{
              e.day = e.day + '天'
            }
            
            xData.push(e.day);
            yData.push(e.total);
          });
          let optionTpl = {
            grid: {
              left: "10%",
              top: "10%",
              right: "10%",
              bottom: "20%",
            },
            tooltip: {
              show: true,
              confine: true,
              formatter: (params) => {
                let htmlTpl =
                  `${params.name}<br>${params.marker}${params.seriesName}<span style="padding-left:10px;">${params.value}</span>`;
                return htmlTpl;
              },
            },
            legend: {
              data: [this.chartText],
              icon: "rect",

              bottom: 10,
              itemHeight: 4,
              itemStyle: {
                color: "#0099FF",
              },
              textStyle: {
                color: "#808080",
              },
            },
            xAxis: {
              type: "category",
              axisTick: {
                alignWithLabel: true,
              },
              data: xData,
            },
            yAxis: {
              type: "value",
              minInterval:1,
            },
            series: [{
              data: yData,
              type: "line",
              // smooth: true,
              name: this.chartText,
              symbol: "circle",
              symbolSize: 10,

              itemStyle: {
                color: "#0099FF",
                borderColor: "#fff",
                borderWidth: 2,
                shadowColor: "rgba(0,153,255, 0.5)",
              },
              lineStyle: {
                color: "#0099FF",
              },
              emphasis: {
                itemStyle: {
                  shadowColor: "rgba(0,153,255, 0.5)",
                  shadowBlur: 15,
                },
              },
            }, ],
          };
          this.option = optionTpl;
        }
      },
    },
  };

</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
  }

  #top {
    width: 100%;
    height: 100%;
  }

</style>
