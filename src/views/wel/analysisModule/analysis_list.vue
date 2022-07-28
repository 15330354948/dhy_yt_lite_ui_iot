<!--
 * @Author: 张峻霖
 * @Date: 2021-02-25 10:10:02
 * @LastEditTime: 2021-05-18 10:50:57
 * @LastEditors: Please set LastEditors
 * @Description: 分析列表图标主文件
 * @FilePath: \LH-UI\src\views\wel\analysisModule\analysis_list.vue
-->

<template>
  <div
    class="analysis_list"
    :class="{
      notUnfold: !activeName,
      showLegend: showLegend,
      isanalysisDetails: isanalysisDetails || !isHomePage,
    }"
  >
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <div @click="stopPropagation">
            <!-- <div
              :class="{ isActive: isActive == 'analysis' }"
              @click="analysisOrList('analysis')"
            >
              {{ presentModule.data && presentModule.data.chartTitle }}
            </div> -->
            <div
              :class="{ isActive: isActive == 'list' }"
              @click="analysisOrList('list')"
            >
              {{ presentModule.data && presentModule.data.listTitle }}
            </div>
          </div>
        </template>

        <!-- <component
          v-show="isActive == 'analysis'"
          v-if="presentModule.data"
          :is="presentModule.chart_module"
        /> -->
        <component
          v-show="isActive == 'list'"
          v-if="presentModule.data"
          :is="presentModule.list_module"/>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { configuration } from "./moduleGather/configuration";
let moduleAll = {};
configuration.forEach((e, i) => {
  moduleAll[e.moduleName] = {
    data: e,
    list_module: e.list_templateUrl
      ? require(`./${e.list_templateUrl}.vue`).default
      : "",
    chart_module: e.chart_templateUrl
      ? require(`./${e.chart_templateUrl}.vue`).default
      : "",
  };
});
export default {
  name: "analysis_list",
  components: { ...moduleAll },
  computed: mapGetters(["isDataAnalysis", "analysisDetails", "legendStatus"]),
  data() {
    return {
      activeName: ["1"], //插件  暂无意义
      isActive: "list", //选中的菜单
      presentModule: {},
      showLegend: true, //图例展开时候
      isanalysisDetails: false, //详情展开时候
      isHomePage: false,
    };
  },
  mounted() {
    setTimeout((e) => {
      this.presentModule = moduleAll["danger"];
    }, 4000);
  },
  methods: {
    /**
     * @description: 列表和图表切换
     * @param {*} value 列表or图表
     * @return {*}
     */
    analysisOrList(value) {
      this.isActive = value;
    },
    /**
     * @description: 阻止element el-collapse冒泡
     * @param {*}
     * @return {*}
     */
    stopPropagation(e) {
      e.stopPropagation();
    },
  },
  watch: {
    isDataAnalysis: {
      handler(val) {
        this.isHomePage = val.status;
        if (!val.data) return;
        for (var i in moduleAll) {
          if (val.data.moduleName == i) {
            this.presentModule = moduleAll[i];
          }
        }
      },
      deep: true,
    },
    analysisDetails: {
      handler(val) {
        this.isanalysisDetails = val.status;
      },
      deep: true,
    },
    legendStatus: {
      handler(val) {
        this.showLegend = val;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.analysis_list {
  position: absolute;
  width: 94%;
  bottom: 24px;
  left: 24px;
  border-radius: 6px 6px 0px 0px;
  overflow: hidden;
  // background: rgba(0, 54, 99, 0.8);
  background: rgba(0,0,0,0.5);
      height: 37%;
    max-height: 353px;
  max-height: 353px;
  transition: height 0.6s, width 0.6s, bottom 0.6s;
  .el-collapse {
    position: relative;
    height: 100%;
  }
  .el-collapse-item__header {
    .el-collapse-item__arrow {
      font-size: 26px;
    }
    > div {
      > div {
        float: left;
        padding: 0px 20px;
        height: 32px;
        line-height: 32px;
      }
    }
  }
}
.analysis_list.notUnfold {
  height: 48px;
}
.analysis_list.showLegend {
  // width: 84%;
  width: calc(100% - 48px);
}
.analysis_list.isanalysisDetails {
  bottom: -39%;
}
</style>
