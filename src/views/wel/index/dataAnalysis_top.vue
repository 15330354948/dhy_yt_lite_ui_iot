<!--
 * @Author: 张峻霖
 * @Date: 2021-03-15 18:52:48
 * @LastEditTime: 2021-04-21 11:02:18
 * @LastEditors: Please set LastEditors
 * @Description: 数据分析头部
 * @FilePath: \LH-UI\src\views\wel\index\dataAnalysis_top.vue
-->
<template>
  <div class="data_analysis_top" :class="{ isHomePage_top: !isHomePage }" v-if="topShow">
    <div
      class="num_module"
      :data="item"
      v-for="item in numdata"
      :key="item.name"
    >
      <div>{{ item.name }}/{{ item.unit }}</div>
      <div>{{ item.num }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getMonitorTotal,
  getDeviceTotal,
  gettodayMonitor,
} from "@/api/hideDanger/obj";
export default {
  computed: mapGetters([
    "isDataAnalysis",
    "analysisDetails",
    "projectId",
    "monitorModStatus",
    "viewConfig"
  ]),
  data() {
    return {
      topShow: true,
      isHomePage: true,
      isanalysisDetails: false,
      numdata: [
        {
          name: "监测点数量",
          unit: "个",
          num: 0,
        },
        {
          name: "设备数量",
          unit: "个",
          num: 0,
        },
        {
          name: "今日预警监测点",
          unit: "条",
          num: 0,
        },
      ],
    };
  },
  watch: {
    isDataAnalysis: {
      handler(val) {
        this.isHomePage = !val.status;
      },
      deep: true,
    },
    analysisDetails: {
      handler(val) {
        if (val.status) {
          this.isHomePage = false;
          this.isanalysisDetails = val.status;
        }
      },
      deep: true,
    },
    projectId: {
      immediate: true,
      handler(val, oVal) {
        window.sessionStorage.setItem("projectId", val);
        getMonitorTotal({ projectId: this.projectId }).then((res) => {
          this.numdata[0].num = res.data.data;
        });
        getDeviceTotal({ projectId: this.projectId }).then((res) => {
          this.numdata[1].num = res.data.data;
        });
        if(this.monitorModStatus){
          gettodayMonitor({ projectId: this.projectId }).then((res) => {
            this.numdata[2].num = res.data.data;
          });
        }else{
          gettodayMonitor({ projectId: this.projectId }).then((res) => {
            this.numdata[2].num = res.data.data;
          });
        }
      }
    },
    monitorModStatus:{
      immediate: true,
      handler(val, oVal) {
        if(val){
          this.numdata[2].name = "今日预警监测点";
          gettodayMonitor({ projectId: this.projectId }).then((res) => {
            this.numdata[2].num = res.data.data;
          });
        }else{
          this.numdata[2].name = "今日预警设备";
          gettodayMonitor({ projectId: this.projectId }).then((res) => {
            this.numdata[2].num = res.data.data;
          });
        }
      }
    },
    viewConfig:{
      deep: true,
      handler(newConfig, oldConfig) {
        if(newConfig.panelCount && newConfig.panelCount == 1 || newConfig.panelCount == 3){
          this.topShow = false;
        }else{
          this.topShow = true;
        }
      }
    }
  },
  methods: {
    homePage() {
      this.isHomePage = false;
      this.$store.commit("IS_DATA_ANALYSIS", {
        status: true,
        data: {
          moduleName: "danger",
          moduleTitle: "天气预报", //模块展示名字
          templateUrl: "dataAnalysis/weather/index", //模块文件路径
          icon: "icon2.png",
        },
      });
    },
  },

};
</script>

<style scoped lang="scss">
.data_analysis_top {
  position: absolute;
  top: 75px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 24px 0 24px;
  margin: 7px 0 14px 0;
  transition: top 0.8s;
  pointer-events: none;
  .num_module {
    pointer-events: auto;
    width: 21.36%;
    height: 50px;
    // background-image: url("~@/assets/img/bg/data_analysis-top_bg.png");
    // background-size: 100% 100%;
    background: rgba(1, 19, 7, 0.5);
    border-radius: 25px;
    color: #fff;
    padding: 0 34px 0 34px;

    > div {
      line-height: 50px;
    }
    > div:first-child {
      float: left;
    }
    > div:last-child {
      float: right;
      font-size: 30px;
      font-family: "Alibaba-PuHuiTi-Bold";
      font-weight: bold;
      color: #579FF8;
    }
  }
  .homeClick {
    position: absolute;
    width: calc(100% - 40px);
    text-align: center;
    padding-top: 10px;
    cursor: pointer;
    img {
      height: 40px;
    }
  }
}
.data_analysis_top.isHomePage_top {
  top: -80px;
}
</style>
