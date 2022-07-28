<template>
  <div class="main">
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="chart_box">
          <chart-com :options="option" ref="topChartRef" id="top"></chart-com>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="list_box">
          <div v-for="(item, i) in chartData" :key="i">
            <span>{{ item.name }}</span>
            <span class="right">{{
              item.value ? ((item.value/total) * 100).toFixed(2)  + "%" : item.value
            }}</span>
            <el-progress :percentage="(item.rate?Math.round(item.rate):0)" :color="colorArr[i]" :show-text="false">
            </el-progress>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: "abnormalEcharts",
    props: ['chartData'],
    data() {
      return {
        colorArr: ["#FB788A", "#52C1F5", "#FFC542"],
        dataArr: [],
        total: 0,
        option: {},
      };
    },
    mounted() {

    },
    watch: {
      chartData: {
        handler(val) {
          if (val.length > 0) {
            this.total = 0;
            val.forEach(item => {
              // this.$set(item, 'name', item.typeStatus == 'y' ? "已处置" : item.typeStatus == 'c' ? "处置中" : "未处置");
              this.$set(item, 'name', item.typeStatus);
              this.$set(item, 'value', item.typeCount);
              this.total += item.value;
            })
            // val.forEach(item => {
            //   console.log(0.58 * 100);
            //   console.log(Number((item.value / this.total).toFixed(2)) * 100);
            // })
            this.getOption(val, this.colorArr);
          } else {
            this.option = null;
          }
        },
        immediate: true
      }
    },
    methods: {
      getOption(data, colors) {
        let total = 0;
        data.forEach((e, k) => {
          total += e.value;
          e.itemStyle = {
            color: colors[k],
          };
        });
        let optionTpl = {
          colors: colors,
          tooltip: {
            trigger: "item",
          },
          series: [{
            type: "pie",
            radius: ["40%", "65%"],
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
        this.option = optionTpl
      },
      getperc(one){
        //((item.typeCount/total).toFixed(1) * 100)
        if(this.total){
           let o=((one.typeCount/this.total).toFixed(1) * 100)
           return o
        }else{
          return 0
        }
      },
    },
  };

</script>
<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;

    >.el-row {
      width: 100%;
      height: 100%;

      >.el-col {
        height: 100%;
        position: relative;

        .chart_box {
          position: absolute;
          width: 100%;
          height: 90%;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }

        .list_box {
          position: absolute;
          width: 90%;
          height: 45%;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;

          >div {
            margin: 15px 0;

            span {
              font-size: 14px;
            }

            .right {
              float: right;
              margin-right: 5px;
            }

            >.el-progress {
              margin-top: 10px;
            }
          }

          ::v-deep.el-progress-bar__outer {
            height: 15px !important;
          }
        }
      }
    }
  }

  #top {
    width: 100%;
    height: 100%;
  }

</style>
