<!--
 * @Author: 张峻霖
 * @Date: 2021-03-11 09:09:53
 * @LastEditTime: 2021-09-30 15:14:45
 * @LastEditors: 张峻霖
 * @Description: 载点详情底部列表
 * @FilePath: \LH-UI\src\views\wel\analysisModule\details\detailsList\index.vue
-->
<template>
  <div
    class="detailsList"
    :class="{
      isanalysisDetails: isanalysisDetails,
      showLegend: showLegend,
    }"
  >
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item
        name="1"
        :title="presentModule.data.details.details_list_title"
        v-if="presentModule.data"
      >
        <component v-if="presentModule.data" :is="presentModule.list_module" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import deviceList from "./deviceList";
import { configuration } from "@/const/crud/dataAnalysis/configuration";
let moduleAll = {};
configuration.forEach((e, i) => {
  moduleAll[e.moduleName] = {
    data: e,
    list_module: e.details.details_list
      ? require(`./${e.details.details_list}.vue`).default
      : "",
  };
});
export default {
  components: { deviceList, ...moduleAll },
  computed: mapGetters(["analysisDetails", "legendStatus"]),
  data() {
    return {
      activeName: ["1"],
      presentModule: {
        data: "",
      },
      isanalysisDetails: false,
      showLegend: true,
    };
  },
  mounted() {},
  watch: {
    analysisDetails: {
      handler(val) {
        this.presentModule = {
          data: "",
        };
        this.isanalysisDetails = val.status;
        if (!val.data) return;
        this.activeName = ["1"];
        for (var i in moduleAll) {
          if (val.moduleName == i) {
            this.presentModule = moduleAll[i];
          }
        }
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

<style lang="scss" scoped>
.detailsList {
  position: absolute;
  width: calc(58% - 10px);
  bottom: -39%;
  // bottom: 24px;
  left: calc(22% + 48px);
  border-radius: 6px 6px 0px 0px;
  overflow: hidden;
  // background: rgba(0, 54, 99, 0.8);
  // background: rgba(0,0,0,0.5);
  background: rgba(0, 0, 0, 0.5);
  //   height: 39%;
  transition: bottom 0.6s, width 0.6s;
}
.detailsList.isanalysisDetails {
  bottom: 24px;
}
.detailsList.showLegend {
  // width: 60%;
  width: calc(64% - 10px);
}
</style>
