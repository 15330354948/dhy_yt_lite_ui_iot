<template>
  <div class="main">
    <div class="time_box">
      <el-date-picker v-model="timeArr" type="daterange" align="right" unlink-panels :picker-options="pickerOptions"
        @change="handleTimeRange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <div class="chart_box" v-show="echartShow">
      <div id="top1"></div>
    </div>
    <div class="nodata" v-show="!echartShow">
      <div style="text-align: center">
        <img src="@/assets/img/nodataBig.png" />
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getMsg
  } from "@/api/platformStatistics";
  import {
    mapGetters
  } from "vuex";
  export default {
    name: "deliveryEcharts",
    computed: {
      ...mapGetters(["permissions", "projectId"]), //获取权限
    },
    data() {
      return {
        timeArr: [],
        // pickerOptions: {
        //   //时间范围限制
        //   disabledDate(date) {
        //     //当天和之前的时间可选
        //     return date.getTime() >=(Date.now()-24 * 60 * 60 * 1000 * 1) ;
        //   },
        // },
        echartShow: true,
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
        datas: [],
        timer: null
      };
    },
    created() {
      let defaultTime = [
        this.dateFormate(Date.now() - 24 * 60 * 60 * 1000 * 7),
        this.dateFormate(Date.now() - 24 * 60 * 60 * 1000 * 1),
      ]
      this.timeArr = defaultTime
      this.platformId = this.$route.query.platformData.id;
    },
    mounted() {
      this.getCharData();
    },
    watch: {
      projectId: {
        handler(val) {
          if (val && val != 0) {
            this.platformId = val;
            this.getCharData();
            clearInterval(this.timer)
            this.getChart(this.KSMC, this.datas);
          }
        }
      },
      charData: {
        handler(val) {
          if (val) {
            clearInterval(this.timer)
            this.getChart(this.KSMC, this.datas);
          }
        }
      }
    },
    methods: {
      getCharData() {
        if(this.platformId){
          getMsg({
            projectId: this.platformId,
            beginDate: this.timeArr[0],
            endDate: this.timeArr[1]
          }).then(res => {
            if (res.data.data) {
              this.echartShow = true;
              this.charData = res.data.data;
              this.KSMC = [];
              this.charData.date.forEach(item => {
                var index = item.lastIndexOf(" ");
                this.KSMC.push(item.substring(0, index))
  
              })
              this.datas = this.charData.data;
            } else {
              this.echartShow = false;
              this.charData = [];
              this.KSMC = [];
              this.datas = [];
            }
          })
        }
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
        // let  H = date.getHours() + ":";
        // let  m = date.getMinutes() + ":";
        // let  s = date.getSeconds();
        // return Y + M + D +' '+ H + m + s;
        return Y + M + D;

        // console.log(Y + M + D + H + m + s);
      },
      handleTimeRange() {
        this.getCharData();
      },
      getChart(KSMC, data) {
        // var KSMC = ["2022-04-19", "2022-04-20", "2022-04-21", "2022-04-22", "2022-04-23", "2022-04-24", "2022-04-25"];
        var names = ["告警短信", "设备异常短信", "运维短信", "自定义短信"];
        var myChart = this.$echarts.init(document.getElementById("top1"));
        let option = {
          color: ["#24D2D3", "#73A0FA", "#52C1F5", "#FF7A8C"],
          tooltip: {
            show: true,
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {
            data: names,
            top: 10,
            right: 15,
            icon: "circle",
            itemWidth: 10,
            itemHeight: 6,
            textStyle: {
              color: "#333",
              fontSize: 12,
            },
          },
          dataZoom: [{
            xAxisIndex: 0, //这里是从X轴的0刻度开始
            show: false, //是否显示滑动条，不影响使用
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: 3, // 一次性展示4个。
          }, ],
          xAxis: {
            type: "category",
            data: KSMC,
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#ccc",
              },
            },
            axisLabel: {
              color: "#333",
            },
          },
          yAxis: {
            type: "value",
            axisLabel: {
              color: "#333",
            },

            name: "单位(个)",
            nameLocation: "end",
            nameTextStyle: {
              color: "#333",
            },
            minInterval: 1,
          },
          series: [{
              name: "告警短信",
              data: data[0],
              type: "bar",
              itemStyle: {
                borderRadius: 10,
              },
              barWidth: 10,
            },
            {
              name: "设备异常短信",
              data: data[1],
              type: "bar",
              itemStyle: {
                borderRadius: 10,
              },
              barWidth: 10,
            },
            {
              name: "运维短信",
              data: data[2],
              type: "bar",
              itemStyle: {
                borderRadius: 10,
              },
              barWidth: 10,
            },
            {
              name: "自定义短信",
              data: data[3],
              type: "bar",
              itemStyle: {
                borderRadius: 10,
              },
              barWidth: 10,
            },
          ],
        };
        this.timer = setInterval(function () {
          // 每次向后滚动一个，最后一个从头开始。        
          if (option.dataZoom[0].endValue == KSMC.length) {
            option.dataZoom[0].endValue = 3;
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
<style lang="scss" scoped>
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

  #top1 {
    width: 100%;
    height: 100%;
  }

</style>
