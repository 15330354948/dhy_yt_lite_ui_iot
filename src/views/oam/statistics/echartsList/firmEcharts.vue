<template>
  <div class="main">
    <el-row class="rowbox">
      <el-col :span="3">
        <div class="grid-content bg-purple">排名</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">厂商名称</div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple"></div>占比
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple-light">次数</div>
      </el-col>
    </el-row>
    <div class="table_box">
      <div class="itemTableBox">
        <div :class="{ 'animate-up': animateUp }" class="animate" :style="'bottom:' + num + 'px'" @mouseenter="Stop()"
          @mouseleave="Up()">
          <el-row v-for="(item,index) in tableDataCopy" :key="index">
            <el-col :span="3">{{ index+1 }}</el-col>
            <el-col :span="4">{{ item.factoryName }}</el-col>
            <el-col :span="14">
              <div ref="topChartRef" class="top"></div>
            </el-col>
            <el-col :span="3">{{ item.typeCount }}</el-col>
          </el-row>
        </div>
        <div class="nodata" v-if="this.chartData.length == 0">
          <div style="text-align: center">
            <img src="@/assets/img/nodataBig.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    deepClone
  } from '@/util/util'
  import * as echarts from 'echarts';
  export default {
    name: "",
    props: ["chartData"],
    components: {},
    data() {
      return {
        tableDataCopy: [],
        tableData: [],
        animateUp: false,
        timer: null,
        num: 0,
        index: 0,
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
            this.$nextTick(() => {
              this.tableDataCopy = deepClone(val);
              this.tableDataCopy.forEach(item => {
                this.$set(item, 'dataList', [0, 0, 0, 0, 0, 0])
                item.deviceAbnormalRankingGroupList.forEach(it => {
                  if (it.typeName == '数据突刺') {
                    item.dataList[0] = it.typeCount;
                  } else if (it.typeName == '数据长期不变') {
                    item.dataList[1] = it.typeCount;
                  } else if (it.typeName == '数据频繁波动') {
                    item.dataList[2] = it.typeCount;
                  } else if (it.typeName == '超出数据范围') {
                    item.dataList[3] = it.typeCount;
                  } else if (it.typeName == '设备离线') {
                    item.dataList[4] = it.typeCount;
                  } else if (it.typeName == '数据重复') {
                    item.dataList[5] = it.typeCount;
                  }
                })
              })
              if (this.tableDataCopy.length > 0) {
                setTimeout(() => {
                  this.getShow(this.tableDataCopy)
                  this.timer = setInterval(this.scrollAnimate, 2000)

                }, 300);

              }
            })


          }
        },
        immediate: true
      }
    },
    methods: {
      getShow(chartData) {
        var roseCharts = document.getElementsByClassName('top'); // 对应地使用ByClassName
        for (var i = 0; i < this.tableDataCopy.length; i++) { // 通过for循环，在相同class的dom内绘制元素
          var myChart = echarts.init(roseCharts[i]);
          myChart.setOption({
            tooltip: {
              trigger: 'axis',
              // confine: true,
              position: function (point, params, dom, rect, size) {
                return [point[0], '10%'];
              },
              axisPointer: {
                type: 'shadow'
              },
              textStyle: {
                align: 'left'
              }
            },
            grid: {
              left: '0%',
              right: '0%',
              bottom: '0%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              show: false
            },
            yAxis: {
              type: 'category',
              data: ['类型'],
              show: false,
            },
            series: [{
                barWidth: '50',
                name: '数据突刺',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                  color: '#2391ff'
                },
                data: [chartData[i].dataList[0]]
              },
              {
                name: '数据长期不变',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                  color: '#5ad8a6'
                },
                data: [chartData[i].dataList[1]]
              },
              {
                name: '超出数据范围',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                  color: '#6dc8ec'
                },
                data: [chartData[i].dataList[3]]
              },
              {
                name: '数据频繁波动',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                  color: '#ffdf25'
                },
                data: [chartData[i].dataList[2]]
              },
              {
                name: '设备离线',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                  color: '#f45d41'
                },
                data: [chartData[i].dataList[4]]
              },
              {
                name: '数据重复',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                  color: '#b06af7'
                },
                data: [chartData[i].dataList[5]]
              }
            ]
          })
        }

      },
      scrollAnimate() {
        // 超出范围在后再进行滚动
        if (this.tableDataCopy.length >= 5) {
          this.animateUp = true;
          this.num += 50
          this.index++
          setTimeout(() => {
            this.animateUp = false;
          }, 500);

          if (this.index == this.tableDataCopy.length - 3) {
            this.num = 0
            this.index = 0
            this.tableDataCopy = deepClone(this.tableDataCopy)
          }
        }
      },
      // 鼠标移上去停止
      Stop() {
        clearInterval(this.timer);
      },
      // 鼠标离开继续滚动
      Up() {
        this.timer = setInterval(this.scrollAnimate, 1000)
      },
    },
  };

</script>
<style lang='scss' scoped>
  .main {
    width: 100%;
    height: 100%;

    .rowbox {
      text-align: center;
      background: #F4FAFF;
      padding: 10px;
      margin-top: 10px;
    }

    .table_box {
      height: calc(100% - 60px);
      overflow: hidden;

      .el-row {
        margin-top: 20px;
        // -webkit-animation-name: fadeIn;
        // -webkit-animation-duration: 1s;

        .el-col {
          text-align: center;
        }
      }

      .itemTableBox {
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;

        .animate-up {
          transition: all 0.5s;
          // margin-top: -50px;
        }

        .animate {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .nodata {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .top {
      width: 100%;
      height: 50px;
      margin-top: -36px;
    }
  }

</style>
