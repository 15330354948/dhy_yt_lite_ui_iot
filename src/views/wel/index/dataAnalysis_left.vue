<!--
 * @Author: 张峻霖
 * @Date: 2021-03-15 18:33:19
 * @LastEditTime: 2021-04-19 20:28:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\views\wel\index\dataAnalysis_left.vue
-->
<template>
  <div
    class="data_analysis_bottom_left"
    :class="{
      isHomePage_left: !isHomePage,
      data_analysis_left_full: viewLeftFull
    }">
    <div
      class="data_analysis_bottom_left_tem"
      v-for="item in moduleList.left"
      :key="item.data.name">
      <div class="borable leftup"></div>
      <div class="borable leftunder"></div>
      <div class="borable rightup"></div>
      <div class="borable rightunder"></div>
      <div class="data_analysis_bottom_left_tem_title"  @click="detailsSkip(item.data)" :style="{cursor:item.data.hasDetails?'pointer':'auto'}">
        <!-- icon图片 -->
        <span>
          <img :src="require(`@/assets/img/icon/${item.data.icon}`)" alt="" />
        </span>
        <!-- title展示 -->
        <span>{{ item.data.moduleTitle }}</span>
        <span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div class="data_analysis_bottom_left_tem_body">
        <component v-if="item.data.templateUrl" :is="item.module" />
      </div>
    </div>
  </div>
</template>

<script>
import { configuration } from "./data_analysis_configuration";
import { mapGetters } from "vuex";

let moduleAll = {};
for (var i in configuration) {
  configuration[i].forEach((e) => {
    moduleAll[i] || (moduleAll[i] = []);
    moduleAll[i].push({
      data: e,
      module: e.templateUrl ? require(`./${e.templateUrl}.vue`).default : "",
    });
  });
}
export default {
  computed: mapGetters(["isDataAnalysis", "analysisDetails", "viewConfig"]),
  data() {
    return {
      configuration: configuration,
      moduleList: [],
      isHomePage: true,
      viewLeftFull: false,
      isanalysisDetails: false,
    };
  },
  components: {},
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
    "viewConfig": {
      handler(newConfig, oldConfig){
        if(newConfig.panelCount == 1 || newConfig.panelCount == 3){
          this.viewLeftFull = true
        }else{
          this.viewLeftFull = false
        }
        if(newConfig.panelCount){
          let viewConfigAll = {
            left: newConfig.left
          }
          let moduleLeft = {}
          for (var key in viewConfigAll) {
            viewConfigAll[key].forEach((m) => {
              moduleLeft[key] || (moduleLeft[key] = []);
              moduleLeft[key].push({
                data: m,
                module: m.templateUrl ? require(`./${m.templateUrl}.vue`).default : "",
              });
            });
          }
          this.moduleList = moduleLeft;
        }else{
          this.moduleList = moduleAll;
        }
      },
      deep: true
    }
  },
  methods: {
    detailsSkip(value) {
      if (!value.hasDetails) {
        return;
      }
      this.isHomePage = false;
      this.$store.commit("IS_DATA_ANALYSIS", {
        status: true,
        data: value,
      });

      // setTimeout((e) => {
      //   this.isHomePage = true;
      // }, 1000);
    },
  }
};
</script>

<style scoped lang="stylus">
$bodyPaddingWidth = 20px;
$titleImgSize = 30px;
$animationTime = 0.8s;

.data_analysis_left_full{
  height: calc(100% - 90px) !important;
  top: 90px !important;
}

.data_analysis_bottom_left {
  position: absolute;
  width: 26.88%;
  height: calc(100% - 145px);
  top: 145px;
  max-width: 568px;
  left: 24px;
  transition: left $animationTime, right $animationTime;
  color: #fff;
  z-index: 10;

  &_tem {
    // background-image: url('~@/assets/img/bg/data_analysis-top_bg8.png');
    // background-size: 100% 100%;
    background: rgba(20, 20, 20, 0.5);
    border: 2px solid rgba(150, 150, 150, 0.6);
    border-radius: 10px;
    width: 100%;
    height: calc(33.33% - 14px);
    margin-bottom: 14px;
    padding: $bodyPaddingWidth 20px;
    position: relative;

    .borable {
      position: absolute;
      width: 30px;
      height: 30px;
    }

    .leftup {
      left: -2px;
      top: -2px;
      border-left: 2px solid #a0a0a0;
      border-top: 2px solid #a0a0a0;
      border-top-left-radius: 10px;
    }

    .leftunder {
      left: -2px;
      bottom: -2px;
      border-left: 2px solid #a0a0a0;
      border-bottom: 2px solid #a0a0a0;
      border-bottom-left-radius: 10px;
    }

    .rightup {
      right: -2px;
      top: -2px;
      border-right: 2px solid #a0a0a0;
      border-top: 2px solid #a0a0a0;
      border-top-right-radius: 10px;
    }

    .rightunder {
      right: -2px;
      bottom: -2px;
      border-right: 2px solid #a0a0a0;
      border-bottom: 2px solid #a0a0a0;
      border-bottom-right-radius: 10px;
    }

    &_title {
      position: relative;
      overflow: hidden;

      > span {
        float: left;
        line-height: $titleImgSize;
        font-size: 18px;

        > img {
          display: block;
          width: $titleImgSize;
          height: $titleImgSize;
        }
      }

      > span:nth-child(2) {
        margin: 0 4px 0 4px;
        cursor: pointer;
        color: #fdd302;
      }

      > span:last-child {
        position: absolute;
        bottom: 8px;

        span {
          float: left;
        }

        > span:first-child {
          height: 5px;
          width: 20px;
          background: #fdd302;
        }

        > span:last-child {
          width: 270px;
          height: 1px;
          margin-top: 4px;
          background-image: linear-gradient(
            to right,
            rgba(253,211,2, 1),
            rgba(0, 150, 255, 0)
          );
        }
      }
    }

    &_body {
      height: calc(100% - 30px);
    }
  }
}

.data_analysis_bottom_left.isHomePage_left {
  left: -26.88%;
}
</style>
