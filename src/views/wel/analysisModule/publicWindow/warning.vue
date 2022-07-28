<!--
 * @Author: 张峻霖
 * @Date: 2021-03-30 09:32:08
 * @LastEditTime: 2021-06-08 11:09:14
 * @LastEditors: Please set LastEditors
 * @Description: 告警详情
 * @FilePath: \LH-UI\src\views\wel\analysisModule\publicWindow\warn.vue
-->
<template>
  <div class="warning">
    <table class="detail_table">
      <tr>
        <td>
          <div>
            <span></span>
            街道：
          </div>
          <div>{{ data.streetName }}</div>
          <br />
          <div></div>
        </td>
        <td>
          <div><span></span>社区：</div>
          <div>{{ data.communityName }}</div>
        </td>
        <td>
          <div><span></span>地址：</div>
          <div style="white-space: nowrap">{{ data.location }}</div>
        </td>
      </tr>
      <tr>
        <td>
          <div><span></span>监测点统一编号：</div>
          <div>{{ data.disasterNo || data.pikk }}</div>
        </td>
        <td>
          <div><span></span>监测点名称：</div>
          <div style="white-space: nowrap">{{ data.disasterName }}</div>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <div><span></span>预警时间：</div>
          <div>{{ data.createTime }}</div>
        </td>
        <td>
          <div><span></span>预警等级：</div>
          <div>{{ data.warnLevel2 || data.warnLevel }}</div>
        </td>
        <!-- <td>
          <div><span></span>预警类型：</div>
          <div>{{ data.warnType }}</div>
        </td> -->
      </tr>
      <tr>
        <td colspan="3">
          <div><span></span>预警内容：</div>
          <div>{{ content }}</div>
        </td>
      </tr>
      <tr>
        <td>
          <div><span></span>群测群防人员：</div>
          <div>{{ personlData[1].name }}</div>
        </td>
        <td>
          <div><span></span>电话：</div>
          <div>{{ personlData[1].phone }}</div>
        </td>
      </tr>
      <tr>
        <td>
          <div><span></span>预防联系人：</div>
          <div>{{ personlData[2].name }}</div>
        </td>
        <td>
          <div><span></span>电话：</div>
          <div>{{ personlData[2].phone }}</div>
        </td>
      </tr>
      <tr>
        <td>
          <div><span></span>街道分管领导：</div>
          <div>{{ personlData[3].name }}</div>
        </td>
        <td>
          <div><span></span>电话：</div>
          <div>{{ personlData[3].phone }}</div>
        </td>
      </tr>
      <tr>
        <td>
          <div><span></span>操作：</div>
          <div>
            <el-button type="primary" @click="deteils"
              >查看监测点详情</el-button
            >
          </div>
        </td>
        <td colspan="2">
          <div><span></span>查看视频设备：</div>
          <div>
            <el-button
              type="primary"
              v-for="item in videoList"
              :key="item.id"
              @click="videoClick(item)"
              >{{ item.name }}</el-button
            >
          </div>
        </td>
      </tr>
    </table>
    <!-- <table class="detail_table">
      <tr>
        <td>街道：</td>
        <td>{{ data.streetName }}</td>
        <td>社区：</td>
        <td>{{ data.communityName }}</td>
        <td>地址：</td>
        <td>{{ data.location }}</td>
      </tr>
      <tr>
        <td>监测点统一编号：</td>
        <td>{{ data.disasterNo }}</td>
        <td>监测点名称：</td>
        <td>{{ data.disasterName }}</td>
      </tr>

      <tr>
        <td>预警时间：</td>
        <td>{{ data.createTime }}</td>
        <td>预警等级：</td>
        <td>{{ data.warnLevel }}</td>
        <td>预警类型：</td>
        <td>{{ data.warnType }}</td>
      </tr>
      <tr>
        <td>预警内容：</td>
        <td>{{ data.threshold }}</td>
      </tr>
      <tr>
        <td>处置状态：</td>
        <td>{{ data.threshold }}</td>
        <td>预防联系人：</td>
        <td>{{ data.person }}</td>
        <td>电话：</td>
        <td>{{ data.phone }}</td>
      </tr>
    </table> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getWarnInfoForWebSocket,
  disaster_macro_observe_record,
} from "@/api/dataAnalysis/warn";
import { getPageList } from "@/api/hideDanger/obj";
import { deviceList } from "@/api/monitorManage/device";
export default {
  components: {},
  computed: mapGetters(["publicWindowData", "dictionaries", "projectId"]),
  data() {
    return {
      data: {},
      hideDanger: {},
      videoList: [],
      personlData: {
        1: {},
        2: {},
        3: {},
      },
      content: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData(id) {
      let data = this.publicWindowData.data.warnId;
      if (data.type == 1) {
        await getWarnInfoForWebSocket({
          warnId: data.id,
        }).then((res) => {
          this.data = res.data.data;
          let data = res.data.data;
          let typeName = "";
          this.dictionaries.data.sensor_type.forEach((e) => {
            if (data.sensorType == e.value) {
              typeName = e.label;
            }
          });
          let oneTwoText = "";
          if (data.warnType == "单控告警") {
            oneTwoText = `设备阈值：${data.threshold || "--"},实际值：${
              data.measuredData || "--"
            }`;
          }else{
            oneTwoText = data.warnInfo
          }
          this.content = `${data.disasterName || "--"} 于 ${
            data.createTime || "--"
          }因${data.warnType || "--"}达到阈值，发生 ${
            data.warnLevel || "--"
          },告警设备名称：${data.deviceName || "--"}，设备编号：${
            data.deviceNo || "--"
          }，传感器类型：${typeName}，告警维度：${
            data.dimensionality || "--"
          },${oneTwoText}`;
        });
      } else {
        await disaster_macro_observe_record(data.id).then((res) => {
          this.data = res.data.data;
          let data = res.data.data;
          this.content = `${data.createTime}，${data.disasterName}预警等级为${data.warnLevel2}，宏观现象为${data.macroInfo}。`;
        });
      }
      getPageList({
        current: 1,
        size: 10,
        total: 1,
        pikk: this.data.disasterNo || this.data.pikk,
        projectId: this.projectId
      }).then((e) => {
        this.hideDanger = e.data.data.records[0];
        deviceList({
          current: 1,
          size: 10,
          type: 6,
          disasterId: this.hideDanger.id,
          projectId: this.projectId
        }).then((e) => {
          this.videoList = e.data.data.records;
        });
        // getByComprehensivePerson(this.hideDanger.id).then((res) => {
        //   res.data.data.qcqfPersonList.forEach((e) => {
        //     e.typeName =
        //       e.type == 1
        //         ? "群测群防人员"
        //         : e.type == 2
        //         ? "预防联系人"
        //         : "街道分管领导";
        //     this.personlData[e.type] = e;
        //   });
        // });
      });
    },
    deteils() {
      this.$parent.close();
      this.$store.commit("IS_ANALYSIS_DETAILS", {
        status: true,
        moduleName: "danger",
        data: {
          data: this.hideDanger,
        },
      });
      this.$store.commit("IS_DATA_ANALYSIS", {
        status: true,
      });
      this.mapFunc.kuosan(this.hideDanger);
    },
    videoClick(val) {
      this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
        status: true,
        name: "deviceCurve",
        style: {
          width: "160vh",
          height: "80vh",
          left: "calc(50% - 80vh)",
          title: "监控视频",
        },
        data: val,
      });
    },
  },
  watch: {
    publicWindowData: {
      handler(val) {},
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.warning {
  // background: rgba(0, 54, 99, 0.8);
  padding: 20px 0px 40px 40px;
  .detail_table {
    width: 100%;

    tr td {
      font-size: 16px;
      line-height: 40px;
      padding: 8px 0;
      width: 33%;
      > div {
        display: inline-block;
        float: left;
        > span {
          float: left;
          display: inline-block;
          line-height: 20px;
          width: calc(100% - 176px);
          text-align: left;
        }

        > span:first-child {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: #0096ff;
          margin: 14px 5px 0 0;
        }
      }
      > div:last-child {
        display: block;
        max-width: calc(100% - 111px);
      }
    }

    // tr td:nth-child(1) {
    //   width: 16.66%;
    //   text-align: right;
    // }

    // tr td:nth-child(2),
    // tr td:nth-child(4) {
    //   width: 16.66%;
    // }

    // tr td:nth-child(3) {
    //   width: 12.66%;
    //   text-align: right;
    // }

    // tr td:nth-child(4) {
    //   // width: 25.66%;
    // }
    // tr td:nth-child(5) {
    //   width: 10.66%;
    //   text-align: right;
    // }
    // tr td:nth-child(6) {
    //   width: 16.66%;
    // }
    // .show_pic_blank {
    //   text-decoration: underline;
    //   color: #59cef1;
    //   cursor: pointer;
    // }
  }

  .circle {
    width: 10px;
    display: block;
    height: 10px;
    border-radius: 5px;
  }

  .location {
    text-align: right;
    margin: 20px 22px 15px 0;
  }

  .ApprovalConent {
    z-index: 10;
    padding: 30px 30px;
    width: 100%;
    height: 100%;

    > div {
      width: 100%;
      overflow: hidden;
      margin-bottom: 35px;

      > div {
        float: left;
      }
    }

    .el-radio {
      color: #fff;
      margin-right: 25px;
    }

    .location {
      margin: 100px 0 0 0;
    }

    .el-radio__input {
      cursor: pointer;
      vertical-align: middle;
      margin-bottom: 2px;
    }
  }
  .ApprovalConent {
    z-index: 10;
    padding: 30px 30px;
    width: 100%;
    height: 100%;

    > div {
      width: 100%;
      overflow: hidden;
      margin-bottom: 35px;

      > div {
        float: left;
      }
    }

    .el-radio {
      color: #fff;
      margin-right: 25px;
    }

    .location {
      margin: 100px 0 0 0;
    }

    .el-radio__input {
      cursor: pointer;
      vertical-align: middle;
      margin-bottom: 2px;
    }
  }
}
</style>
