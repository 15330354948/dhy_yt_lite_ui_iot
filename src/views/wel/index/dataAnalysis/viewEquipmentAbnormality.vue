<!-- 监测点分析 -->
<template>
  <div class="chart_mian">
    <i class="data_tabel el-icon-s-data" @click="openTabel"></i>
    <div class="chart_div" v-if="chartsTypeShow">
      <div class="chart-left-box">
        <chart-com :options="option"></chart-com>
      </div>
      <div class="chart-right-list">
        <div class="chart-right-item" v-for="(type,i) in situaTypeList" :key="type.id">
          <span class="chart-item-spot" :style="{background:colorList[i]}"></span>
          <div class="chart-item-text">
            <span>{{type.label}}</span>
            <p>
              <span>{{type.value}}台</span>
              <span>{{((type.value/projectTotals) * 100).toFixed(1)}}%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="chart_div" v-if="!chartsTypeShow" v-loading="!chartsTypeShow"></div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import chartCom from "@/components/chartcom/index.vue";
  import {
    getAbnormalStatus
  } from '@/api/monitorManage/visua';

  export default {
    name: 'device',
    components: {
      chartCom
    },
    computed: {
      ...mapGetters(["projectId", "userInfo"]),
    },
    data(){
      return{
        projectTotals: 0,
        actualTotals: 0,
        situaTypeList:[],
        colorList : ["#2391ff", "#5ad8a6", "#6dc8ec", "#ffdf25", "#f45d41", "#b06af7"],
        chartsTypeShow:false,
        option: {},
      }
    },
    watch: {
      "projectId": {
        immediate: true,
        handler(x, y) {
          if (x) this.getData(x)
        }
      }
    },
    methods: {
      openTabel() {
        this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
            status: true,
            name: "abnormalDevice",
            style: {
              marginTop:'0px',
              width: "174vh",
              left:'calc(50% - 87vh)',
              height: "87vh",
              title: "设备异常情况",
            },
            data: this.projectId,//必传，不需要传就默认传任意值
          });
      },
      getData(proId) {
        getAbnormalStatus({
          projectId: proId
        }).then(res => {
          let chartData = res.data.data;
          this.option = this.initPorjectSituationOption(chartData)
          this.chartsTypeShow = true;
        })
      },
      initPorjectSituationOption(data) {
        this.projectTotals = 0;
        this.situaTypeList = []
        let unusualTotal = 0,
            usuData = [];
        if(data.length) {
          this.actualTotals = data[0].total || 0
          data.forEach(unusual=>{
            this.projectTotals += unusual.typeCount
            this.situaTypeList.push({
              value: unusual.typeCount,
              label: unusual.type,
            })
            unusualTotal += unusual.typeCount
            usuData.push({
              value: unusual.typeCount,
              name: unusual.type,
            })
          })
          if(this.projectTotals === 0) {
            this.projectTotals++
          }
        } else {
          this.chartsTypeShow = false
        }
        return {
          tooltip: {
            trigger: "item",
            formatter: "{b}: <br/>{c} ({d}%)",
          },
          title: [{
            text: "总数量",
            left: "center",
            top: "40%",
            textStyle: {
              color: "#fff",
              fontSize: 16,
              align: "center",
            },
          },{
            text: this.actualTotals,
            left: "center",
            top: "50%",
            textStyle: {
              color: "#fff",
              fontSize: 22,
              align: "center",
            },
          }],
          series: [{
            type: "gauge",
            radius: "80%",
            startAngle: 359.9,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 30,
            z: 8,
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 8,
              lineStyle: {
                width: 2,
                color: "#6dc8ec4d",
              },
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            detail: {
              show: false,
            },
          }, {
            type: "pie",
            data: [100],
            startAngle: 45,
            z: 1,
            label: {
              position: "inside",
            },
            radius: ['0%', '45%'],
            itemStyle: {
              color: "#6dc8ec4d",
            },
            silent: true,
            clockwise: true,
            animation: false,
          }, {
            type: "pie",
            radius: ['65%', '85%'],
            color: ["#2391ff", "#5ad8a6", "#6dc8ec", "#ffdf25", "#f45d41", "#b06af7"],
            label: {
              show: false,
            },
            data: usuData,
          }]
        }
      }
    }

  }

</script>

<style lang="scss" scoped>
  .chart_mian {
    width: 100%;
    height: 100%;
    position: relative;

    .data_tabel {
      font-size: 24px;
      position: absolute;
      right: 0;
      top: -40px;
      cursor: pointer;
    }

    .chart_div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .chart-left-box {
        width: 50%;
        height: 100%;
      }

      .chart-right-list {
        width: 50%;
        height: 100%;

        .chart-right-item {
          border-bottom: 1px solid #ccc;
          height: 16.7%;
          line-height: 16.7%;
          display: flex;
          align-items: center;
          justify-content: flex-start;

          .chart-item-text {
            width: 100%;
            display: flex;
            justify-content: space-around;

            p {
              margin: 0;
              padding: 0;

              span {
                display: inline-block;
                margin: 0 5px;
              }
            }
          }

          .chart-item-spot {
            display: block;
            height: 10px;
            width: 10px;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
      }
    }

    ::v-deep.el-loading-mask {
      background-color: rgba(255, 255, 255, .0);
    }

    .container_chart {
      height: 100%;
    }
  }

</style>
