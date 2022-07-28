<!--
 * @Author: 张峻霖
 * @Date: 2021-03-04 14:53:28
 * @LastEditTime: 2021-03-12 09:39:08
 * @LastEditors: Please set LastEditors
 * @Description: 监测点详情左侧
 * @FilePath: \LH-UI\src\views\wel\analysisModule\details\danger\dangerLeft.vue
-->
<template>
  <div class="device_details">
    <div class="pageSwitching">
      <!-- <div :class="{ isactive: isactive == 1 }" @click="change(1)">
        基础信息
      </div>
      <div :class="{ isactive: isactive == 2 }" @click="change(2)">
        日常运维
      </div>
      <div :class="{ isactive: isactive == 3 }" @click="change(3)">
        异常运维
      </div> -->
    </div>
    <div class="device_details_body">
      <!-- <div>
        <el-scrollbar>
          <div v-for="item in details" :key="item.name" class="specific_item">
            <span></span>
            <span class="labelname">{{ item.name }}：</span>
            <span>{{ data[item.fieldName] }}</span>
          </div>
        </el-scrollbar>
      </div> -->
      <el-collapse v-model="activeName">
        <el-collapse-item name="1">
          <template slot="title">
            <span> 基础信息 </span>
          </template>
          <div class="device_details_basics">
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
                    <span>{{
                      item.isConvert
                        ? convert(data[item.fieldName], item.isConvertTypeName)
                        : data[item.fieldName]
                    }}</span>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-collapse v-model="activeName">
        <el-collapse-item name="2">
          <template slot="title">
            <span> 运行信息 </span>
          </template>
          <div class="device_details_basics">
            <div class="page_message">
              <div
                v-for="item in operation"
                :key="item.name"
                class="specific_item"
              >
                <span></span>
                <span class="labelname">{{ item.name }}：</span>
                <span>{{
                  item.isConvert
                    ? convert(
                        operationData[item.fieldName],
                        item.isConvertTypeName
                      )
                    : operationData[item.fieldName]
                }}</span>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { searchPageList } from "@/api/hideDanger/obj";
import { runInfo } from "@/api/monitorManage/device";
export default {
  computed: mapGetters(["analysisDetails", "dictionaries"]),
  data() {
    return {
      options: {
        device_type: {},
        device_status: {},
      },
      activeName: ["1", "2"],
      isactive: 1,
      details: [
        {
          name: "设备编号",
          fieldName: "code",
        },
        {
          name: "设备名称",
          fieldName: "name",
        },
        {
          name: "设备类型",
          fieldName: "type",
          isConvert: true,
          isConvertTypeName: "device_type",
        },
        {
          name: "厂商名称",
          fieldName: "factoryName",
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
          name: "监测点编号",
          fieldName: "disasterCode",
        },
        {
          name: "监测点名称",
          fieldName: "disasterName",
        },
      ],
      operation: [
        {
          name: "当前状态",
          fieldName: "status",
          isConvert: true,
          isConvertTypeName: "device_status",
        },
        {
          name: "当前版本号",
          fieldName: "devVersion",
        },
        {
          name: "采样周期",
          fieldName: "samplingPeriod",
        },
        {
          name: "心跳上报周期",
          fieldName: "heartbeatEscalationCycle",
        },
        {
          name: "模块上报周期",
          fieldName: "moduleEscalationCycle",
        },
        {
          name: "位置上报周期",
          fieldName: "positionEscalationCycle",
        },
        {
          name: "当前电压",
          fieldName: "voltage",
        },
        {
          name: "当前电量",
          fieldName: "electric",
        },
        {
          name: "当前信号",
          fieldName: "signalStrength",
        },
      ],
      isanalysisDetails: false,
      data: {},
      operationData: {},
    };
  },
  components: {},
  created() {
    for (const key in this.options) {
      this.options[key] = this.dictionaries.data[key];
    }
  },
  mounted() {
    this.loadData(this.analysisDetails);
  },
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
    convert(val, typeName) {
      if (!val) return;
      let options = this.options[typeName];
      for (var i = 0; i < options.length; i++) {
        if (options[i].value == val) {
          return options[i].label;
        }
      }
    },
    loadData(val) {
      if (val.status) {
        this.isanalysisDetails = true;
        this.activeName = ["1", "2"];
        this.data = val.data.data;
        runInfo(this.data.id).then((res) => {
          this.operationData = res.data.data || [];
        });
      } else {
        this.isanalysisDetails = false;
      }
    },
  },
  watch: {
    activeName: {
      handler(val) {},
      deep: true,
    },
    analysisDetails: {
      handler(val) {
        this.loadData(val);
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

.device_details {
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
      background: #1ee7f24d;
    }
  }

  .device_details_body {
    .el-collapse {
      .el-collapse-item__header {
        background: none;
      }

      .el-collapse-item__wrap {
        background: rgba(0,0,0,0.2);
        padding: 10px 20px;
        overflow: hidden;
      }
    }

    .device_details_basics {
      overflow: hidden;
    }

    .el-scrollbar {
      overflow-x: hidden;
      height: 100%;
      position: relative;
      width: 100%;
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
        margin: 4px 10px 0 0;
      }

      .labelname {
        width: 135px;
        line-height: 17px;
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
</style>
