<!--
 * @Author: 张峻霖
 * @Date: 2021-03-04 14:40:18
 * @LastEditTime: 2021-09-20 23:58:05
 * @LastEditors: 张峻霖
 * @Description: 监测点详情主页
 * @FilePath: \LH-UI\src\views\wel\analysisModule\details\basicsDetails\index.vue
-->
<template>
  <div class="details_body">
    <div
      class="details_body_left"
      :class="{ notUnfold: !activeName, isanalysisDetails: isanalysisDetails }"
    >
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1">
          <template slot="title" v-if="presentModule.data">
            <span> {{ presentModule.data.details.details_left_title }} </span>
            <span class="back" @click="back">返回</span>
          </template>

          <component
            v-if="presentModule.data"
            :is="presentModule.list_module"
          />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import device from "./device";
import { configuration } from "@/const/crud/dataAnalysis/configuration";

let moduleAll = {};
configuration.forEach((e, i) => {
  moduleAll[e.moduleName] = {
    data: e,
    list_module: e.details.details_templateUrl
      ? require(`./${e.details.details_templateUrl}.vue`).default
      : "",
  };
});
export default {
  computed: mapGetters(["analysisDetails"]),
  components: {
    device,
  },
  data() {
    return {
      activeName: ["1"],
      isactive: 1,
      isanalysisDetails: false,
      presentModule: {
        data: "",
      },
      oldData: {},
    };
  },
  mounted() {},
  methods: {
    back(e) {
      e.stopPropagation();
      if (this.oldData) {
        this.$store.commit("IS_ANALYSIS_DETAILS", this.oldData);
        this.mapFunc.kuosan({
          longitude: this.oldData.data.data.longitude,
          latitude: this.oldData.data.data.latitude,
        });
      } else {
        this.mapFunc.removeLayer("fitMapArrowLayer");
        this.mapFunc.removeLayer("secondLayer");
        window.viewer.scene.postProcessStages.remove(this.mapFunc.lastStage);
        window.viewer.scene.postProcessStages.remove(this.mapFunc.lastStage2);
        this.mapFunc.adjustHeight(this.analysisDetails.data.data.id, false);
        this.mapFunc.removeLayer(
          "QXSYLayer" + this.analysisDetails.data.data.id
        );
        this.$store.commit("IS_ANALYSIS_DETAILS", {
          status: false,
        });
        this.mapFunc.removeLayer("titleLayer");
        this.mapFunc.deletePointLineLayer({
          line: true,
          arrow: true,
          lf: true,
        });
        this.mapFunc.removeLayer('twoLevelLayer')
        this.mapFunc.removeLayer('twoTitleLayer')
        this.mapFunc.removeLayer("zsyx");
        // this.mapFunc.layerHide(true);
      }
    },
  },
  watch: {
    activeName: {
      handler(val) {
      },
      immediate:true,
      deep: true,
    },
    analysisDetails: {
      handler(val, oldVal) {
        if (oldVal.status){
          this.mapFunc.removeLayer("QXSYLayer" + oldVal.data.data.id);
        }
        this.mapFunc.removeLayer("titleLayer");
        this.mapFunc.removeLayer("fitMapArrowLayer");
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
        if (val.isBack) {
          this.oldData = oldVal;
        } else {
          this.oldData = null;
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$width: 24%;
$height: 87.11%;
$header_height: 44px;
$padding_basic: 24;
$padding_left: calc($padding_basic / 1920 * 100);
$padding_top: 24px;
$transition_time: 0.6s;
$border: 2px;

.details_body_left {
  position: absolute;
  width: $width;
  height: 100%;
  max-height: calc(100% - 123px);
  left: calc(0% - $width);
  bottom: $padding_top;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.5);
  transition: height $transition_time, left $transition_time;
  overflow: hidden;

  .el-collapse-item {
    .el-collapse-item__header {
      height: $header_height;

      span {
        font-size: 16px;
      }

      span.back {
        display: inline-block;
        position: absolute;
        right: 40px;
        color: #0096ff;
        font-size: 14px;
        text-decoration: underline;
      }
    }
  }
}

.details_body_left.notUnfold {
  height: 48px;
}

.details_body_left.isanalysisDetails {
  left: 24px;
}
</style>

