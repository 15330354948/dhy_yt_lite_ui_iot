<!--
 * @Author: 张峻霖
 * @Date: 2021-02-26 09:33:21
 * @LastEditTime: 2021-04-13 16:12:45
 * @LastEditors: Please set LastEditors
 * @Description: 图例模块
 * @FilePath: \LH-UI\src\views\wel\analysisModule\lenged.vue
-->
<template>
  <div class="legend_module">
    <div
      class="legend_body"
      :class="{
        showLegend: showLegend,
        notUnfold: !activeName,
        isanalysisDetails: isanalysisDetails || !isHomePage,
      }"
    >
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item :title="legendData.title" name="1">
          <div class="legend_body_body">
            <el-scrollbar style="overflow-x: hidden">
              <div
                class="legend_body_body_div"
                v-for="item in ledend"
                :key="item.name"
              >
                <div>
                  <span>
                    <!-- <img :src="'@/assets/img/mapicon/采集测站.png'" alt=""> -->
                    <img
                      :src="
                        require('@/assets/img/mapIcon/' + item.name + '.png')
                      "
                    />
                  </span>
                  <span>{{ item.name }}</span>
                </div>
                <div>{{ item.num }}个</div>
              </div>
            </el-scrollbar>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div
      class="legend_icon_module"
      :class="{
        isanalysisDetails: isanalysisDetails,
      }"
    >
      <div @click="legendClick()">
        <i class="legend_icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapIconsType } from "@/components/mapcom/iconNameAll";
export default {
  name: "legend_module",
  computed: mapGetters(["analysisDetails", "legendData", "isDataAnalysis"]),
  data() {
    return {
      activeName: ["1"],
      showLegend: true,
      isanalysisDetails: false,
      ledend: {},
      isHomePage: false,
    };
  },
  components: {},
  mounted() {},
  methods: {
    /**@description: 图例点击事件*/
    legendClick() {
      this.showLegend = !this.showLegend;
      this.$store.commit("SET_LEGEND_STATUS", this.showLegend);
      this.activeName = ["1"];
      // this.$parent.$refs.analysisList.showLegend = this.showLegend;
    },
  },
  watch: {
    activeName: {
      handler(val) {
        // this.showLegend = false;
        // setTimeout((e) => {
        //   this.activeName = ["1"];
        // }, 2000);
      },
      deep: true,
    },
    analysisDetails: {
      handler(val) {
        return;
        if (val.status) {
          this.isanalysisDetails = true;
        } else {
          this.isanalysisDetails = false;
        }
      },
      deep: true,
    },
    legendData: {
      handler(val) {
        let legendIconAll = mapIconsType[val.iconName];
        let ledend = {};
        val.data.forEach((e) => {
          if (e.type) {
            if (ledend[e.type]) {
              ledend[e.type].num = ledend[e.type].num + 1;
            } else {
              ledend[e.type] = {
                name: legendIconAll[e.type],
                num: 1,
              };
            }
          }
        });
        this.ledend = Object.values(ledend);
      },
      deep: true,
    },
    isDataAnalysis: {
      handler(val) {
        this.isHomePage = val.status;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.legend_module {
  border-radius: 6px 6px 0px 0px;
  overflow: hidden;

  > div {
    position: absolute;
    bottom: 24px;
    margin-right: 5px;
    border-radius: 6px;
  }
  .legend_body.notUnfold {
    height: 48px;
  }
  .legend_body {
    width: 0;
    height: calc(39% - 75px);
    right: 4%;
    border-radius: 6px;
    background: rgba(0, 54, 99, 0.8);
    transition: width 0.6s, height 0.6s, bottom 0.6s;
    overflow: hidden;
    .legend_body_body {
      .el-scrollbar {
        height: calc(98% - 40px);
        overflow-x: hidden;
        position: absolute;
        width: 100%;
        .legend_body_body_div {
          overflow: hidden;
          padding: 0px 10px;
          > div {
            float: left;
            width: 70%;
            font-size: 14px;

            text-align: left;
            > span {
              img {
                height: 23px;
                width: 23px;
              }
            }
            > span:first-child {
              overflow: hidden;
              display: inline-block;
              vertical-align: middle;
              padding: 4px 3px 0 0;
            }
          }
          > div:last-child {
            width: 30%;
            height: 40px;
            line-height: 40px;
            float: right;
            text-align: right;
          }
        }
      }
    }
  }
  .showLegend {
    width: 10%;
  }
  .legend_icon_module {
    display: flex;
    flex-direction: column-reverse;
    width: 2.5%;
    height: 380px;
    right: 1.16%;
    transition: width 0.6s, height 0.6s, bottom 0.6s;
    > div {
      width: 48px;
      height: 48px;
      padding: 28.5%;
      border-radius: 6px;
      background: rgba(0, 54, 99, 0.8);
      cursor: pointer;
      .legend_icon {
        width: 100%;
        height: 100%;
        display: inline-block;
        border-radius: 6px;
        background-image: url("~@/assets/img/icon/legend.png");
        background-size: 100%;
      }
    }
  }
  .el-collapse {
    .el-collapse-item__header {
      overflow: hidden;
      padding-left: 26px;
      align-items: baseline;
    }
  }
  .isanalysisDetails {
    bottom: -39%;
  }
}
</style>
