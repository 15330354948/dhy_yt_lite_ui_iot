<template>
  <div class="main">
    <div class="titleCon" :style="{'border-left': ('5px solid '+objData.colordata)}">
      <div class="tbox">
        <div class="thbox">
          <div>{{objData.titleSum}}</div>
          <div :style="{color: objData.colordata}">{{objData.titlesun}}{{dataInfo.sumpercentage}}%</div>
        </div>
        <div class="tdabox">
          <div>{{dataInfo.sum}}</div>
          <span v-if="dataInfo.percentage<0" style="color: #f60">{{dataInfo.percentage}}%↓</span>
          <span v-else style="color: #87F7C7">{{dataInfo.percentage}}%↑</span>
        </div>
      </div>
      <chart-com :options="option" ref="topChartRef" id="top"></chart-com>
    </div>
  </div>
</template>
<script>
  import * as echarts from 'echarts';
  export default {
    name: "topEcharts",
    props: ["objData", "dataInfo"],
    data() {
      return {
        series1: {},
        series2: {},
        option: {},
      }
    },
    watch: {
      dataInfo: {
        handler(val) {
          this.$nextTick(() => {
            this.getShow(this.objData, this.dataInfo);
          })
        },
        deep: true
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.getShow(this.objData, this.dataInfo);
      })
    },
    methods: {
      getShow(data, obj) {
        this.series1 = {
          data: obj.dataSeries,
          type: "line",
          symbol: "none",
          lineStyle: {
            color: data.colordata,
          },
          smooth: true,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: data.colordata // 0% 处的颜色
              }, {
                offset: 1,
                color: '#fff' // 100% 处的颜色
              }]),
            },
          }
        }

        this.series2 = {
          data: obj.dataSeries,
          type: "line",
          symbol: "none",
          lineStyle: {
            color: data.colordata,
          }
        }

        this.option = {
          xAxis: {
            type: "category",
            show: false,
          },
          yAxis: {
            type: "value",
            show: false,
          },
          tooltip: {
            trigger: "axis",
            confine: true,
            textStyle: {
              fontSize: 14,
              color: "#000",
            },
            formatter: function (params) {
              return (

                params[0].value
                .toLocaleString()
                .toString()
                .replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, "$1,")
              );
            },
          },
          grid: {
            left: 10,
            containLabel: true,
            bottom: 30,
            top: 10,
            right: 30
          },
          series: [
            data.type == 1 ? this.series2 : this.series1
          ],
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
  .main {
    width: 96%;
    height: 100%;
    margin: 5px 10px;

    .titleCon {
      border-radius: 20px;
      width: 100%;
      height: 94%;
      padding: 10px;
      box-shadow: 0 0 2px 2px #f1f1f1;
      border-radius: 0 5px 5px 0px;
      margin-right: 10px;

      .tbox {
        padding: 10px 0;

        .thbox {
          display: flex;
          justify-content: space-between;
          color: #999;
        }
      }

      .tdabox {
        display: flex;
        padding: 10px 0;

        div {
          font-size: 24px;
          color: gray;
        }

        span {
          margin-left: 10px;
          margin-top: 10px;
        }
      }
    }

    #top {
      width: 100%;
      height: 90%;
      margin-top: -20px;
    }
  }

</style>
