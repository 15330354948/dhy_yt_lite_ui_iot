<!--
 * @Author: 张峻霖
 * @Date: 2021-03-15 18:05:09
 * @LastEditTime: 2021-03-27 17:32:46
 * @LastEditors: Please set LastEditors
 * @Description: 本周天气预报
 * @FilePath: \LH-UI\src\views\wel\index\dataAnalysis\weather\weather_day.vue
-->
<template>
  <div class="weather_day">
    <div class="weather_day_chart">
      <chart-com v-if="fileType" :options="options" ref="curvelChartRefdjsdjasdlsjdklas"></chart-com>
    </div>
    <div class="weather_day_font">
      <div v-for="item in dataArry" :key="item.time">
        <div>{{ item.time }}</div>
        <div>{{ item.week }}</div>
        <div>
          {{ item.condition }}
        </div>
        <div>{{ item.direction }}</div>
        <div>{{ item.windLevelDay }}风</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'weatherOne',
  props: ["childData"],
  data() {
    return {
      options: {},
      dataArry: [],
      maximum: [],
      minimum: [],
      fileType:false,
    };
  },
  created(){
    setTimeout(() => {
      this.initData();
    }, 200);
  },
  watch:{
    childData: {
      handler(x, y) {
        
      },
    },
  },
  methods: {
    initData() {
      let maximum = [];
      let minimum = [];
      let data = this.childData.forecastFutureList;
      for (var i = 0; i < 7; i++) {
        maximum.push(data[i].high);
        minimum.push(data[i].low);
        this.dataArry.push({
          time:data[i].ymd.split("-")[1] + "-" + data[i].ymd.split("-")[2],
          week: data[i].week,
          direction: data[i].fx,
          condition: data[i].type,
          windLevelDay: data[i].fl,
        });
      }
      this.maximum = maximum;
      this.minimum = minimum;
      this.options = {
        grid: {
          top: "25%",
          left: "-2%",
          right: "4%",
          bottom: "0%",
          containLabel: true,
        },
        color: ["#3CFFFD"],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周六"],
            show: false,
          },
        ],
        yAxis: [
          {
            show: false,
            type: "value",
          },
        ],
        series: [
          {
            type: "line",
            stack: "总量",
            smooth: 0.6,
            lineStyle: {
              width: 3,
              shadowBlur: 10,
              shadowOffsetY: 8,
              color: "#3CFFFD",
            },
            label: {
              show: true,
              position: "top",
              color: "#fff",
              formatter: function (val) {
                return val.data + "°";
              },
            },
            emphasis: {
              focus: "series",
            },
            areaStyle: {
              opacity: 1,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(60,255,253,.4)",
                },
                {
                  offset: 1,
                  color: "rgba(60,255,253,0)",
                },
              ]),
            },
            data: this.minimum.map(function(value){
              return Number(value.split(" ")[1].split("℃")[0]);
            }),
          },
          {
            type: "line",
            stack: "总量",
            smooth: 0.6,
            lineStyle: {
              width: 3,
              shadowColor: "rgba(0,0,0,1)",
              shadowBlur: 10,
              shadowOffsetY: 8,
              color: "#5267FF",
            },
            label: {
              show: true,
              position: "top",
              color: "#fff",
              formatter: function (val) {
                return val.data + "°";
              },
            },
            emphasis: {
              focus: "series",
            },
            areaStyle: {
              opacity: 1,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(82,103,255,.4)",
                },
                {
                  offset: 1,
                  color: "rgba(82,103,255,0)",
                },
              ]),
            },
            data: this.maximum.map(function(value){
              return Number(value.split(" ")[1].split("℃")[0]);
            }),
          },
        ],
      };
      setTimeout(() => {
        this.fileType = true;
      }, 0);
    },
  },
};
</script>

<style scoped lang="scss">
.weather_day {
  width:100%;
  height: calc(100% - 29px);
  &_chart {
    width:100%;
    height: calc(100% - 50px);
    div {
      height: 100%;
      width: 100%;
      canvas {
        height: 100%;
      }
    }
  }
  &_font {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    > div {
      text-align: center;
      font-size: 12px;
      > div {
        img {
          height: 31px;
        }
      }
      > div:nth-child(3) {
        overflow: hidden;
        // height: 31px;
        margin-top: 5px;
        overflow: hidden;
      }
    }
  }
}
</style>

<style lang="scss">
  // .weather_day_chart{
  //   .container_chart{
  //     .echarts{
  //       div{
  //         width:100%!important;
  //         height:100%!important;
  //         canvas{
  //           width:100%!important;
  //           height:100%!important;
  //         }
  //       }
  //     }
  //   }
  // }
</style>
