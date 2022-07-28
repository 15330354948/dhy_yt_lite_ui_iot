<template>
  <div class="main">
    <chart-com :options="option" ref="topChartRef" id="top"></chart-com>
  </div>
</template>
<script>
  export default {
    name: "sensorEcharts",
    props: ['charData'],
    data() {
      return {
        dataArr: [{
            name: "未处置",
            perc: 37.5,
            value: 300,
          },
          {
            name: "处置中",
            perc: 31.25,
            value: 250,
          },
          {
            name: "已完成",
            perc: 31.25,
            value: 250,
          },
        ],
        option: {},
        platformData: null,
      };
    },
    watch: {
      charData: {
        handler(val) {
          if (val) {
            this.$nextTick(() => {
              this.getOption(val);
            });
          }else{
            this.option = null
          }
        },
        immediate: true
      }
    },
    created() {
      this.platformData = this.$route.query.platformData
    },
    mounted() {

    },
    methods: {
      getOption(data) {
        let total = 0;
        data.forEach((e, k) => {
          total += e.total;
          e.name = e.type;
          e.value = e.total;
          e.perc = e.ratio;
          // e.itemStyle = {
          //   color: colors[k],
          // };
        });
        let optionTpl = {
          legend: {
            top: "20%",
            right: "10%",
            bottom: "20%",
            left: '68%',
            orient: "vertical",
            type: "scroll",
            icon: "circle",
            itemGap: 20,
            selectedMode: false,
            itemWidth: 8,
            itemHeight: 8,
            data: data,
            textStyle: {
              fontSize: 14,
              fontWeight: 400,
              color: "#333",
            },
            formatter: (name) => {
              let one = data.filter(item => {
                if (item.name == name) {
                  return item.value
                }
              })
              return name + '          ' + one[0].value;
            }
          },

          tooltip: {
            trigger: "item",
            formatter: (params) => {
              return `${params.marker}${params.name}：${params.value}<br>${params.marker}占比：${params.percent}${params.percent?"%":""}`
              // return `${params.marker}${params.name}：${params.value}<br>${params.marker}占比：${params.data.perc}${params.data.perc?"%":""}`
            },
          },

          series: [{
            type: "pie",
            radius: ["40%", "65%"],
            center: ["32%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "center",
              formatter: ["{a|" + total + "}", "{b|总数}"].join("\n"),
              rich: {
                a: {
                  fontWeight: 700,
                  fontSize: 25,
                  padding: [5, 0],
                },
                b: {
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#999",
                },
              },
            },

            labelLine: {
              show: false,
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
