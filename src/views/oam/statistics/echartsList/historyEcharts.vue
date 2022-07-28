<template>
  <div class="main">
    <el-row class="rowbox">
      <el-col :span="3">
        <div class="grid-content bg-purple">排名</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">事故原因</div>
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
          <el-row v-for="item in tableDataCopy" :key="item.sort">
            <el-col :span="3">{{ item.sort }}</el-col>
            <el-col :span="4">{{ item.type }}</el-col>
            <el-col :span="14">
              <div class="mouseens" @mouseenter.self="enter(item)" @mouseleave.self="leave">
                <el-progress class="progress" color="#87F7C7" :percentage="item.perc" :show-text="false" :stroke-width="8">
                </el-progress>
              </div>
            </el-col>
            <el-col :span="3">{{ item.total }}</el-col>
          </el-row>
        </div>
        <div class="nodata" v-if="this.tableData.length == 0">
          <div style="text-align: center">
            <img src="@/assets/img/nodataBig.png" />
          </div>
        </div>
        <div id="dialog" v-show="isShow" :style="positionStyle">
          {{newsText}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    deepClone
  } from '@/util/util'
  export default {
    name: "",
    props: ["chartData"],
    components: {},
    data() {
      return {
        isShow: false,
        newsText: '123',
        positionStyle: {
          top: '100px',
          right: '100px'
        },
        x: 0,
        y: 0,
        tableData: [
          // {
          //   sort: 1,
          //   type: "设备损坏",
          //   perc: 80,
          //   total: 90,
          // },
          // {
          //   sort: 2,
          //   type: "死机",
          //   perc: 75,
          //   total: 85,
          // },
          // {
          //   sort: 3,
          //   type: "无卡",
          //   perc: 70,
          //   total: 80,
          // },
          // {
          //   sort: 4,
          //   type: "电量低",
          //   perc: 65,
          //   total: 75,
          // },
          // {
          //   sort: 5,
          //   type: "欠资费",
          //   perc: 60,
          //   total: 70,
          // },
          // {
          //   sort: 6,
          //   type: "信号弱",
          //   perc: 55,
          //   total: 65,
          // },
          // {
          //   sort: 7,
          //   type: "传感器异常",
          //   perc: 50,
          //   total: 60,
          // },
          // {
          //   sort: 8,
          //   type: "未开机",
          //   perc: 45,
          //   total: 55,
          // },
          // {
          //   sort: 9,
          //   type: "设备进水",
          //   perc: 40,
          //   total: 50,
          // },
          // {
          //   sort: 10,
          //   type: "蓝牙无法连接",
          //   perc: 35,
          //   total: 45,
          // },
          // {
          //   sort: 11,
          //   type: "网络测试失败",
          //   perc: 30,
          //   total: 40,
          // },
          // {
          //   sort: 12,
          //   type: "其他",
          //   perc: 25,
          //   total: 35,
          // },
        ],

        // tableData: [],
        tableDataCopy: [],
        animateUp: false,
        timer: null,
        num: 0,
        index: 0
      };
    },
    computed: {},
    created() {},
    mounted() {

      // setTimeout(() => {
      //   this.scrollAnimate();
      // }, 1500);
    },
    watch: {
      chartData: {
        handler(val) {
          if (val.length > 0) {
            this.tableData = deepClone(val);
            this.tableDataCopy = deepClone(this.tableData)
            this.timer = setInterval(this.scrollAnimate, 1000)
          }
        },
        immediate: true
      }
    },

    // destroyed() {
    //   clearInterval(this.timer);
    // },
    methods: {
      scrollAnimate() {
        // 超出范围在后再进行滚动
        if (this.tableDataCopy.length >= 8) {
          this.animateUp = true;
          this.num += 50
          this.index++
          setTimeout(() => {
            // this.tableDataCopy.shift();
            this.animateUp = false;
          }, 500);

          if (this.index == this.tableDataCopy.length - 3) {
            // clearInterval(this.timer);
            this.num = 0
            this.index = 0
            this.tableDataCopy = deepClone(this.tableData)
            // this.animateUp = false;

            // this.scrollAnimate();
          }


        }
      },
      enter(data) {
        this.isShow = true;
        var x = document.getElementById("dialog");
        x.innerHTML =
          `<div><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#0099FF;"></span>${data.type}  ${data.total}</div>`
      },
      leave() {
        this.isShow = false;
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

<style lang="scss" scoped>
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

      .table_title {
        height: 40px;
        width: 100%;
        line-height: 40px;
        // display: flex;
        background-color: #F4FAFF;
      }

      .itemTableBox {
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;

        #dialog {
          padding: 10px 20px;
          border-radius: 5px;
          position: absolute;
          background: #fff;
          z-index: 999;
          border: 1px solid #409EFF;
          box-shadow: 1px 3px 4px #ccc;
        }

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

        .progress {
          cursor: pointer;

        }

        .progress :hover {
          transform: scale(1.005);
          transition: all 0.1s ease-in;
          -webkit-transition: all 0.1s ease-in;
        }
      }
    }
  }

</style>
