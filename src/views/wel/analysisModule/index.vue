<!--
 * @Author: your name
 * @Date: 2021-02-22 16:31:53
 * @LastEditTime: 2021-04-26 09:15:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\views\wel\analysisModule\index.vue
-->
<template>
  <div
    class="analysis_module"
    :class="{ isDataAnalysis: isDataAnalysis.status }"
  >
    <analysisList ref="analysisList"></analysisList>
    <operation-map />
    <detailsModule />
    <publicWindow />
    <alarmPopups />
    <!-- <legendModule></legendModule> -->
    <!-- <menuTree></menuTree> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import analysisList from "./analysis_list";
import legendModule from "./moduleGather/legendModule";
import alarmPopups from "./moduleGather/alarmPopups";
import operationMap from "./moduleGather/operationMap";
import detailsModule from "./details/index";
import publicWindow from "./publicWindow/index";
// import menuTree from "./moduleGather/menu_tree";
// import layerManagement from "./moduleGather/layerManagement";

export default {
  name: "analysisModule",
  components: {
    analysisList,
    legendModule,
    operationMap,
    detailsModule,
    publicWindow,
    alarmPopups,
  },
  computed: mapGetters(["isDataAnalysis"]),
  data() {
    return {};
  },
  mounted() {},
  watch: {
    isDataAnalysis: {
      handler(value) {},
      deep: true,
    },
  },
};
</script>

<style  lang="stylus" >
.analysis_module {
  top: 0;
  z-index: -1;

  .el-collapse {
    border: none;

    .el-collapse-item {
      color: #fff;
    }

    .el-collapse-item__header {
      background: rgba(0, 0, 0, 0.3);
      color: #fff !important;
      height: 48px;
      border: none;
      font-size: 18px;
      padding: 0 0 0 12px;
    }

    .el-collapse-item__wrap {
      background: none;
      color: #fff;
      border: none;

      .el-collapse-item__content {
        padding-bottom: 0;

        >div {
          font-size: 16px;
          text-align: center;
          color: #fff;
        }
      }
    }
  }

  .isDataAnalysis {
    z-index: 9;
  }
}
</style>
