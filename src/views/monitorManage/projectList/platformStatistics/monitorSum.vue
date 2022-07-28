<template>
  <div class="main">
    <div class="time_box">
      <el-date-picker v-model="timeArr" type="daterange" align="right" unlink-panels :picker-options="pickerOptions"
        @change="handleTimeRange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <div class="chart_box" v-show="echartShow == true">
      <div id="top"></div>
    </div>

    <div class="nodata" v-show="echartShow== false">
      <div style="text-align: center">
        <img src="@/assets/img/nodataBig.png" />
      </div>
    </div>
  </div>
</template>
<script>
  import * as echarts from "echarts";
  import {
    historyData
  } from "@/api/platformStatistics";
  import {
    mapGetters
  } from "vuex";
  export default {
    name: "monitorEcharts",
    computed: {
      ...mapGetters(["permissions", "projectId"]), //获取权限
    },
    data() {
      return {
        timeArr: [],
        timer: null,
        pickerMinDate: "",
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近半个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }],
          onPick: ({
            maxDate,
            minDate
          }) => {
            this.pickerMinDate = minDate.getTime()
            if (maxDate) {
              this.pickerMinDate = ''
            }
          },
          disabledDate: (time) => {
            if (this.pickerMinDate !== '') {
              const day30 = (30 - 1) * 24 * 3600 * 1000
              let maxTime = this.pickerMinDate + day30
              if (maxTime > new Date()) {
                maxTime = new Date()
              }
              return time.getTime() > maxTime
            }
            // return time.getTime() > Date.now()
            return time.getTime() >= (Date.now() - 24 * 60 * 60 * 1000 * 1)
          }
        },
        platformId: null,
        charData: [],
        KSMC: [],
        dataY: [],
        echartShow: true
      };
    },
    created() {
      let defaultTime = [
        this.dateFormate(Date.now() - 24 * 60 * 60 * 1000 * 7),
        this.dateFormate(Date.now() - 24 * 60 * 60 * 1000 * 1),
      ];
      this.timeArr = defaultTime;
      this.platformId = this.$route.query.platformData.id;
    },
    mounted() {
      this.getCharData();

    },
    watch: {
      projectId: {
        handler(val) {
          this.platformId = val;
          if (val && val != 0) {
            clearInterval(this.timer)
            this.getCharData();
            this.$nextTick(() => {
              this.getZXT(this.KSMC, this.dataY);
            })
          }
        }
      },
      charData: {
        handler(val) {
          clearInterval(this.timer)
          if (val && val != 0) {
            this.$nextTick(() => {
              this.getZXT(this.KSMC, this.dataY);
            })
          }
        },
      }
    },
    methods: {
      getCharData() {
        if(this.platformId){
          this.charData = [];
          this.KSMC = [];
          this.dataY = [];
          historyData({
            projectId: this.platformId,
            beginDate: this.timeArr[0],
            endDate: this.timeArr[1]
          }).then(res => {
            if (res.data.data) {
              this.echartShow = true;
              this.charData = res.data.data
              this.charData.forEach(item => {
                this.KSMC.push(item.date);
                this.dataY.push(item.total)
              })
            } else {
              this.echartShow = false;
              this.charData = [];
              this.KSMC = [];
              this.dataY = [];
            }
          })
        }
      },
      handleTimeRange(e) {
        this.getCharData();
      },
      dateFormate(val) {
        //时间格式转换
        // 比如需要这样的格式 yyyy-MM-dd
        // 比如需要这样的格式 yyyy-MM-dd HH:mm:ss
        var date = new Date(val);
        let Y = date.getFullYear() + "-";
        let M =
          (date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1) + "-";
        let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let H = date.getHours() + ":";
        let m = date.getMinutes() + ":";
        let s = date.getSeconds();
        return Y + M + D;
        // return Y + M + D + " " + H + m + s;
      },
      getZXT(KSMC, dataY) {
        var myChart = this.$echarts.init(document.getElementById("top"));
        var option = {
          grid: {
            left: "0",
            right: "0",
            bottom: "3%",
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
            confine: true,
            textStyle: {
              fontSize: 14,
              color: "#666",
            },
            formatter: function (params) {
              return (
                params[0].name + '<br/>' +
                "数量：" +
                params[0].value
                .toLocaleString()
                .toString()
                .replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, "$1,")
              );
            },
          },
          xAxis: {
            type: "category",
            data: KSMC,
            axisLine: {
              show: false,
            },
            axisTick: false,
            axisLabel: {
              interval: 0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
              rotate: 20 //调整数值改变倾斜的幅度（范围-90到90）
            }
          },
          dataZoom: [{
            xAxisIndex: 0, //这里是从X轴的0刻度开始
            show: false, //是否显示滑动条，不影响使用
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: 7, // 一次性展示14个。
          }, ],
          yAxis: [{
            type: "value",
            inverse: false, //是否是反向坐标轴
            splitLine: {
              show: false, //y网格线
            },
            // axisLine: {
            // 		show:true,
            // 		lineStyle: {
            // 			color:'#666'  //Y轴颜色
            // 		}
            // 	}
          }, ],
          series: [{
            data: dataY,
            type: "line",
            symbol: "none",
            lineStyle: {
              color: "#4ADA92",
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#DDF8EA", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#fff", // 100% 处的颜色
                  },
                ]),
              },
            },
          }, ],
        };
        this.timer = setInterval(function () {
          // 每次向后滚动一个，最后一个从头开始。
          if (option.dataZoom[0].endValue == KSMC.length) {
            option.dataZoom[0].endValue = 7;
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

    .time_box {
      height: 50px;
      padding: 5px 10px;

      .el-date-editor.el-input__inner {
        width: 60% !important;
      }
    }

    .chart_box {
      height: calc(100% - 50px);
    }

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

  #top {
    width: 100%;
    height: 90%;
  }

</style>
