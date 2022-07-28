<!--
 * @Author: your name
 * @Date: 2021-03-17 17:19:39
 * @LastEditTime: 2021-03-27 09:23:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\views\wel\analysisModule\moduleGather\layerManagement.vue
-->
<template>
  <div
    class="layerManagement"
    :class="{
      isanalysisDetails: isanalysisDetails,
      isHomePage: isHomePage,
    }"
    v-if="isDanger"
  >
    <div @click="close">
      <img src="@/assets/img/icon/叠加.png" alt="" />
    </div>
    <div
      class="layerManagement_switch"
      :class="{
        isShow: isShow,
      }"
    >
      <el-switch v-model="yhfw" active-text="监测范围" inactive-text="">
      </el-switch>
      <el-switch v-model="qxsy" active-text="倾斜摄影" inactive-text="">
      </el-switch>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getByDisId } from "@/api/dataAnalysis/dataAnalysis";
// import { getPageList } from "@/api/hideDanger/scope";

export default {
  components: {},
  computed: mapGetters(["analysisDetails", "isDataAnalysis"]),
  data() {
    return {
      qxsy: false,
      yhfw: false,
      isShow: false,
      isanalysisDetails: false,
      isHomePage: true,
      isDanger: true,
      layerData: {},
      lineData: {},
    };
  },
  mounted() {},
  methods: {
    close() {
      this.isShow = !this.isShow;
    },
    async getData() {
      await getByDisId({
        disasterId: this.analysisDetails.data.data.id,
      }).then((res) => {
        this.layerData = res.data.data;
      });
      // await getPageList({
      //   disasterId: this.analysisDetails.data.data.id,
      // }).then((res) => {
      //   this.lineData = res.data.data;
      //   this.drawLine();
      // });
    },
    drawLine() {
      this.lineData.forEach((e) => {
        let path = [];
        if (e.linetype == 0) {
          e.disasterRangeLatLonVOList.forEach((e2) => {
            path.push(e2.longitude, e2.latitude);
          });
          path.push(path[0], path[1]);
          this.mapFunc.skimLine(path, e.color, e.thickness);
        } else {
          this.mapFunc.ArrowsPoint(
            e.disasterRangeLatLonVOList,
            e.color,
            e.thickness
          );
        }
      });
    },
  },
  watch: {
    qxsy: {
      handler(val) {
        if (val) {
          this.mapFunc.addQXSY(this.layerData.obliquePhotography);
        } else {
          this.mapFunc.removeLayer("QXSYLayer");
        }
      },
      deep: true,
    },
    yhfw: {
      handler(val) {
        if (val) {
          this.drawLine();
        } else {
          this.mapFunc.deletePointLineLayer({
            line: true,
            arrow: true,
          });
        }
      },
      deep: true,
    },
    analysisDetails: {
      async handler(val) {
        this.isDanger = true;
        if (val.status) {
          this.isanalysisDetails = true;
          await this.getData();
          if (val.moduleName == "danger") {
            this.qxsy = false;
            this.yhfw = false;
            setTimeout((e) => {
              this.qxsy = true;
              this.yhfw = false;
            }, 200);
          } else {
            this.isDanger = false;
          }
        } else {
          this.isanalysisDetails = false;
          this.isShow = false;
        }
      },
      deep: true,
    },
    isDataAnalysis: {
      handler(val) {
        this.isHomePage = !val.status;
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.layerManagement {
  position: absolute;
  height: 48px;
  left: 10px;
  top: 15px;
  margin: 15px 10px 10px 10px;
  height: 48px;
  transition: left 0.8s;
  color: #fff;
  > div {
    float: left;
  }
  > div:first-child {
    background: #003663;
    width: 40px;
    height: 40px;
    margin: 0 auto;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    img {
      height: 24px;
    }
  }
  .layerManagement_switch {
    width: 0px;
    height: 40px;
    line-height: 38px;
    border-radius: 4px;
    margin-left: 15px;
    background: #003663;
    padding: 0;
    overflow: hidden;
    transition: width 0.8s, padding 0.8s;
    overflow-y: hidden;
    white-space: nowrap;

    > div {
      margin-left: 15px;
    }
    ::v-deep.el-switch {
      color: #fff;
      .el-switch__core {
        width: 28px !important;
        height: 14px;
        &::after {
          margin-left: 0px;
          width: 11px;
          height: 11px;
          background: #003a6a;
        }
      }
      > .el-switch__label {
        color: #fff;
        span {
          font-size: 14px;
          color: #fff;
        }
      }
    }
    ::v-deep.el-switch.is-checked {
      .el-switch__core::after {
        left: 53%;
      }
    }
  }
}
.layerManagement_switch.isShow {
  width: 235px;
  padding: 0 15px 0 0;
}
.layerManagement.isanalysisDetails {
  left: calc(22% + 33px);
}
.layerManagement.isHomePage {
  left: -350px;
}
</style>
