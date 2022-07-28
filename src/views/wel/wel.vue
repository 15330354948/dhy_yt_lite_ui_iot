<template>
  <div class="BFB_width_height">
    <div class="box_container BFB_width_height">
      <el-container class="BFB_width_height">
        <!-- 左边 地图-->
        <el-main style="width: calc(70vw - 25px)">
          <map-com ref="welMap"></map-com>
          <dataAnalysisLeft :viewConfig="configuration"></dataAnalysisLeft>
          <dataAnalysisRight v-if="viewRightShow" :viewConfig="configuration"></dataAnalysisRight>
          <dataAnalysisTop :viewConfig="configuration"></dataAnalysisTop>
          <analysisModule></analysisModule>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import analysisModule from "./analysisModule/index";
import dataAnalysisLeft from "./index/dataAnalysis_left";
import dataAnalysisRight from "./index/dataAnalysis_right";
import dataAnalysisTop from "./index/dataAnalysis_top";
import io from "socket.io-client";
import { websoketIoIp } from "@/config/env";
import { getViewConfigList } from "@/api/monitorManage/platform"

export default {
  name: "wel",
  components: {
    analysisModule,
    dataAnalysisTop,
    dataAnalysisLeft,
    dataAnalysisRight,
  },
  data() {
    return {
      viewRightShow: true,
      configuration: null,
    };
  },
  computed: {
    ...mapGetters(["website","projectId"]),
  },
  created() {
    this.$store.commit("IS_ANALYSIS_DETAILS", {
      status: false,
    });
    return
    setTimeout(() => {
      this.mapFunc.goView({
        longitude: 114.23329783641542,
        latitude: 22.601283363820542,
        height: 20000,
        pitch: -88,
        preMinus: 0,
      });
    }, 1000);
    let userInfo = JSON.parse(sessionStorage.getItem("luohu-userInfo"));
    let soketInterval = setInterval(() => {
      clearInterval(soketInterval);
      let socketIp = websoketIoIp + "?clientId=" + userInfo.content;
      var socket = io(socketIp);

      socket.on("connect", function () {});
      socket.on("disconnect", function () {});
      socket.on("broadcast", function (data) {});
      socket.on("broadcastCommand", (data) => {
        let warnData = {
          warnId: data.data,
        };
        this.$store.commit("SET_OCCUR_WARN", {
          status: true,
          data: warnData,
        });
        this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
          status: true,
          name: "warn",
          style: {
            width: "1000px",
            height: "",
            left: "calc(50% - 500px)",
            title: "预警详情",
          },
          data: warnData,
        });
      });
    }, 1000);
  },
  created() {
    this.getConfigList()
  },
  methods: {
    getConfigList() {
      if(this.projectId){
        getViewConfigList({projectId: this.projectId})
          .then(ls=>{
            let lsData = ls.data.data
            this.configuration = lsData
            if(lsData.panelCount == 1 || lsData.panelCount == 2){
              this.viewRightShow = false
            }else{
              this.viewRightShow = true
            }
          })
      }
    }
  },
};
</script>

<style scoped="scoped" lang="scss">
.BFB_width_height {
  width: 100%;
  height: 100%;
}
.box_container {
  .el-main,
  .el-aside {
    height: 100%;
    background-color: #fff;
  }
  .el-aside {
    > div {
      width: 100%;

      //  .title_div{
      //     margin: 5px 2px 5px 15px;
      //     padding-left: 5px;
      //     border-left: 5px solid #444;
      //     color: #444;
      //   }
      h3 {
        margin: 5px 2px 5px 15px;
        // padding-left: 5px;
        // border-left: 5px solid #444;
        color: #444;
        .shu {
          position: relative;
          top: 1px;
          display: inline-block;
          width: 4px;
          height: 16px;
          background-color: #444;
          margin-right: 5px;
        }
      }
      .deviceszl_box {
        width: 100%;
        height: 14vh;
        padding: 10px 20px;
        > div {
          display: inline-block;
          width: calc(50% - 10px);
          height: 100%;
          text-align: center;
          border-radius: 5px;
          color: #fff;
          > div {
            height: 50%;
          }
          > div:first-child {
            position: relative;
            top: 1.5vh;
            font-size: 2.2vw;
            font-weight: bolder;
          }
          > div:last-child {
            // padding-bottom: 1vh;
            padding-top: 1vh;
            font-size: 1vw;
          }
        }
        > div:first-child {
          background-image: url("~@/assets/img/icon/rect1.png");
          background-position: 10% 10%; /*这个是按从左往右，从上往下的百分比位置进行调整*/
          background-size: 100% 100%; /*按比例缩放*/
          background-repeat: no-repeat; /*还有repeat-x,y等*/

          // background: linear-gradient(0deg, #ff9f37, #feb464);
        }
        > div:last-child {
          float: right;
          background-image: url("~@/assets/img/icon/rect2.png");
          background-position: 10% 10%; /*这个是按从左往右，从上往下的百分比位置进行调整*/
          background-size: 100% 100%; /*按比例缩放*/
          background-repeat: no-repeat; /*还有repeat-x,y等*/
          // background: linear-gradient(0deg, #8e4bfc, #af80fc);
        }
      }
      .box_xzzaz {
        display: flex;
        width: 100%;
        justify-content: space-around;
        flex-wrap: wrap;
        .install_num_box {
          display: flex;
          width: calc(100% - 40px);
          height: 8vh;
          margin: 10px 20px;
          border-radius: 5px;
          background-color: #66b4fd;
          // background-color: #377dff;
          color: #fff;
          > div {
            width: 33.3%;
            margin: 10px 0;
            text-align: center;
            > div {
              height: 50%;
            }
            > div:first-child {
              font-size: 0.85vw;
            }
            > div:last-child {
              > span:first-child {
                font-size: 1.5vw;
              }
              > span:last-child {
                font-size: 0.5vw;
              }
            }
          }
          > div:not(:last-child) {
            border-right: 2px solid #fff;
          }
        }

        .chart_div {
          width: calc(100% - 40px);
          // width:100%;
          height: 18vh;
          // height: 25vh;
          // height: 233px;
          margin: 10px 20px;
          border-radius: 2px;
          box-shadow: 0px 0px 5px 0px rgba(55, 125, 255, 0.36);
          .container_chart {
            width: 100%;
            height: 100%;
          }
        }
      }
      .box_sbgj {
        display: flex;
        width: 100%;
        height: calc(100% - 25px);
        justify-content: space-around;
        flex-wrap: wrap;
        .device_alarm_list {
          width: calc(100% - 42px);
          height: calc(100% - 10px);
          // height: 13.125rem;
          // height:30vh;
          margin: 5px 20px;
          overflow-x: hidden;
          overflow-y: auto;
          background-color: rgba(255, 133, 0, 0.15);
          border-radius: 2px;
          ul {
            margin: 0;
            padding: 0;
            li {
              display: inline-block;
              width: 100%;
              height: 40px;
              line-height: 40px;
              // height: 45px;
              // line-height: 45px;
              list-style-type: none;
              // padding: 0 2px;
              font-size: 14px;
              // font-size: 0.5vw;
              .row_div {
                width: 100%;
                .col_div {
                  display: inline-block;
                  word-break: keep-all; /* 不换行 */
                  white-space: nowrap; /* 不换行 */
                  overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
                  text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
                  color: #555;
                }
                .col_div:first-child {
                  width: 19%;
                  .circle_span {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    // margin: 0 4px 0 15px;
                    margin: 0 4px 0 8px;
                    border-radius: 50%;
                    background-color: #000;
                  }
                  .point_color1 {
                    background-color: #43baff;
                  }
                  .point_color2 {
                    background-color: yellow;
                  }
                  .point_color3 {
                    background-color: orange;
                  }
                  .point_color4 {
                    background-color: #fe1c56;
                  }
                  .text_color1 {
                    color: #43baff;
                  }
                  .text_color2 {
                    color: yellow;
                  }
                  .text_color3 {
                    color: orange;
                  }
                  .text_color4 {
                    color: #fe1c56;
                  }
                }
                .col_div:not(:first-child) {
                  width: 27%;
                  text-align: center;
                  padding: 0 2px;
                }
              }
            }
            // li:first-child {
            //   margin-top: 5px;
            // }
          }
        }
        /* --- 改变滚动条样式 --- */
        .device_alarm_list::-webkit-scrollbar {
          width: 6px;
        }

        /* --- 滚动条里面的滚动块 --- */
        .device_alarm_list::-webkit-scrollbar-thumb {
          // height:30px;
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 5px #377dff;
          background: #377dff;
        }

        /* --- 滚动条里面轨道 --- */
        .device_alarm_list::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          background: transparent;
        }
      }
    }
    > div:nth-child(1) {
      height: 18vh;
    }
    > div:nth-child(2) {
      height: 34vh;
    }
    // >div:nth-child(2){height: 41vh;}
    > div:nth-child(3) {
      height: calc(100% - 55vh);
    }
    // >div:nth-child(3){height: calc(100% - 62vh);}
  }
  .el-main {
    .map_container {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
