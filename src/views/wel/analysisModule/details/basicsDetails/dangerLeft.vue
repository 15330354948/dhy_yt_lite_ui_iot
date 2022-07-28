<!--
 * @Author: 张峻霖
 * @Date: 2021-03-04 14:53:28
 * @LastEditTime: 2021-03-11 17:26:50
 * @LastEditors: Please set LastEditors
 * @Description: 监测点详情左侧
 * @FilePath: \LH-UI\src\views\wel\analysisModule\details\danger\dangerLeft.vue
-->
<template>
  <div
    class="danger_left"
    :class="{ notUnfold: !activeName, isanalysisDetails: isanalysisDetails }"
  >
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <span> 监测点详情 </span>
          <span class="back" @click="back">返回</span>
        </template>
        <div class="details_body">
          <div class="pageSwitching">
            <div :class="{ isactive: isactive == 1 }" @click="change(1)">
              监测点详情
            </div>
            <div :class="{ isactive: isactive == 2 }" @click="change(2)">
              监测点资料
            </div>
            <div :class="{ isactive: isactive == 3 }" @click="change(3)">
              两卡一案
            </div>
          </div>
          <div class="page_message">
            <div>
              <el-scrollbar>
                <div
                  v-for="item in details"
                  :key="item.name"
                  class="specific_item"
                >
                  <span></span>
                  <span class="labelname">{{ item.name }}：</span>
                  <span>{{ data[item.fieldName] }}</span>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { searchPageList } from "@/api/hideDanger/obj";
export default {
  computed: mapGetters(["analysisDetails"]),
  data() {
    return {
      activeName: ["1"],
      isactive: 1,
      details: [
        {
          name: "全市唯一编号",
          fieldName: "pikk",
        },
        {
          name: "区编号",
          fieldName: "pikk",
        },
        {
          name: "行政区",
          fieldName: "pikk",
        },
        {
          name: "街道",
          fieldName: "streetName",
        },
        {
          name: "社区",
          fieldName: "communityName",
        },
        {
          name: "位置",
          fieldName: "location",
        },
        {
          name: "经度",
          fieldName: "longitude",
        },
        {
          name: "纬度",
          fieldName: "latitude",
        },
        // {
        //   name: "威胁人数",
        //   fieldName: "hazardPersonNum",
        // },
        // {
        //   name: "潜在经济损失",
        //   fieldName: "pikk",
        // },
        // {
        //   name: "预测稳定性",
        //   fieldName: "steady",
        // },
        // {
        //   name: "隐患等级",
        //   fieldName: "level",
        // },
        // {
        //   name: "危害性",
        //   fieldName: "extentHarm",
        // },
        // {
        //   name: "监测预防责任单位",
        //   fieldName: "jcyfzrdw",
        // },
        // {
        //   name: "监测预防责任单位人",
        //   fieldName: "jcyfzrdwPerson",
        // },
        // {
        //   name: "监测预防单位联系人电话",
        //   fieldName: "jcyfzrdwPhone",
        // },
      ],
      isanalysisDetails: false,
      data: {},
    };
  },
  components: {},
  mounted() {},
  methods: {
    change(val) {
      this.isactive = val;
    },
    back(e) {
      e.stopPropagation();
      window.viewer.scene.postProcessStages.remove(this.mapFunc.lastStage);
      this.$store.commit("IS_ANALYSIS_DETAILS", {
        status: false,
      });
    },
    detailsFun(id) {
      searchPageList(id).then((e) => {
        this.data = e.data.data;
      });
    },
  },
  watch: {
    activeName: {
      handler(val) {},
      deep: true,
    },
    analysisDetails: {
      handler(val) {
        if (val.status) {
          this.isanalysisDetails = true;
          this.activeName = ["1"];
          this.detailsFun(val.data.data.id);
        } else {
          this.isanalysisDetails = false;
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="stylus">
$width = 25%;
$height = 87.11%;
$header_height = 44px;
$padding_basic = 24;
$padding_left = ($padding_basic / 1920 * 100) %;
$padding_top = 24px;
// $padding_top = ($padding_basic / 1080 * 100) %;
$transition_time = 0.6s;
$border = 2px;

.danger_left {
  position: absolute;
  width: $width;
  height: 100%;
  max-height: calc(100% - 48px);
  left: 'calc(0% - %s)' % $width;
  top: $padding_top;
  border-radius: 6px 6px 0px 0px;
  background: rgba(0, 54, 99, 0.8);
  transition: height $transition_time, left $transition_time;

  .el-collapse-item__wrap {
    position: absolute;
    height: calc(100% - 48px);
    width: 100%;
  }

  .details_body {
    position: absolute;
    padding: 20px;
    height: 100%;
    width: 100%;

    .pageSwitching {
      display: flex;
      justify-content: center;

      > div {
        display: inline-block;
        width: 33.33%;
        border: 1px solid #1EE7F2;
        height: $header_height;
        line-height: $header_height;
        cursor: pointer;
      }

      > div:first-child {
        border-bottom-left-radius: $border;
        border-top-left-radius: $border;
      }

      > div:last-child {
        border-bottom-right-radius: $border;
        border-top-right-radius: $border;
      }

      .isactive {
        background: rgba(30, 231, 242, 0.4);
      }
    }

    .page_message {
      height: 'calc(100% - %s)' % $header_height;
      padding: 24px 0 0 0;

      > div {
        height: 100%;
        background: rgba(2, 19, 58, 0.4);
        padding: 0 0 0 20px;

        .el-scrollbar {
          overflow-x: hidden;
          height: 100%;
          position: relative;
          width: 100%;
        }

        .specific_item:first-child {
          margin-top: 20px;
        }

        .specific_item {
          width: 100%;
          overflow: hidden;

          >span {
            float: left;
          }

          >span:first-child {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #0096FF;
            margin: 8px 10px 0 0;
          }

          .labelname {
            width: 135px;
            line-height: 21px;
            text-align: justify;
            margin-right: 10px;
          }

          .labelname::after {
            content: '';
            display: inline-block;
            width: 100%;
          }
        }
      }
    }
  }

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

.danger_left.notUnfold {
  height: 48px;
}

.danger_left.isanalysisDetails {
  left: 24px;
}
</style>
