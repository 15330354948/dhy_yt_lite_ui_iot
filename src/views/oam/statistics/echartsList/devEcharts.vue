<template>
  <div class="main">
    <chart-com :options="option" ref="topChartRef" id="top"></chart-com>
  </div>
</template>
<script>
  import color from '../../../../mixins/color';
  export default {
    name: "devEcharts",
    props: ['chartData'],
    data() {
      return {
        option: {},
        colors: ["#2391ff", "#5ad8a6", "#6dc8ec", "#ffdf25", "#f45d41", "#b06af7"]
      };
    },
    mounted() {

    },
    watch: {
      chartData: {
        handler(val) {
          if (val.length > 0) {
            this.getchart(this.chartData, this.colors)
          } else {
            this.option = null;
          }
        }
      }
    },
    methods: {
      getchart(data, colors) {
        // data.forEach(item=>{
        //   if(item.type == 'out_range'){

        //   }
        // })
        let optionTpl = {
          color: colors,
          legend: {
            top: "20%",
            right: "10%",
            bottom: "20%",
            orient: "vertical",
            type: "scroll",
            icon: "circle",
            itemGap: 20,
          },

          tooltip: {
            show: true,
          },
          polar: {
            center: ["40%", "50%"],
          },
          angleAxis: {
            axisLine: {
              lineStyle: {
                color: "#ccc",
              },
            },
            axisTick: {
              lineStyle: {
                color: "#ccc",
              },
            },
            axisLabel: {
              show: false,
            },
            min: 0,
            max: 360,
            interval: 45,
            startAngle: 22.5,
          },
          radiusAxis: {
            min: 0,
            max: 100,
            axisLabel: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#ccc",
              },
            },
            axisTick: {
              lineStyle: {
                color: "#ccc",
              },
            },
          },

          series: [{
            type: "pie",
            radius: [0, 150],
            center: ["40%", "50%"],
            roseType: "area",
            label: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: params => {
                  switch (params.name) {
                    case '数据突刺':
                      return colors[0];
                      break;
                    case '数据长期不变':
                      return colors[1];
                      break;
                    case '超出数据范围':
                      return colors[2];
                      break;
                    case '数据频繁波动':
                      return colors[3];
                      break;
                    case '设备离线':
                      return colors[4];
                      break;
                    case '数据重复':
                      return colors[5];
                      break;
                  }
                }
              }
            },
            data: data,
          }, ],
        };
        this.option = optionTpl;
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
