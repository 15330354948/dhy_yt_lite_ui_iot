<!--
 * @Author: 张峻霖
 * @Date: 2021-03-04 14:53:28
 * @LastEditTime: 2021-10-09 18:12:04
 * @LastEditors: 张峻霖
 * @Description: 监测点详情左侧
 * @FilePath: \LH-UI\src\views\wel\analysisModule\details\basicsDetails\danger.vue
-->
<template>
  <div class="danger_details">
    <div class="pageSwitching">
      <div :class="{ isactive: isactive == 1 }" @click="change(1)">基础信息</div>
      <div :class="{ isactive: isactive == 2 }" @click="change(2)">设备列表</div>
      <!-- <div :class="{ isactive: isactive == 3 }" @click="change(3)">预警统计</div> -->
    </div>
    <div class="danger_details_body" v-if="isactive == 1">
      <div class="danger_details_basics">
        <div class="page_message">
          <div>
            <el-scrollbar>
              <div v-if="isbasicData" style=" height: 100%; background: rgba(0, 0, 0, 0.2); padding: 20px;">
                <div v-for="item in details" :key="item.name" class="specific_item">
                  <span></span>
                  <span class="labelname">{{ item.name }}：</span>
                  <span>{{
                    item.isConvert
                      ? convert(data[item.fieldName], item.isConvertTypeName)
                      : item.isXzqh
                        ? dealConvert(data)
                        : data[item.fieldName]
                  }}</span>
                </div>
              </div>
              <div v-if="!isbasicData" style="height: 100%" class="personnel">
                <div v-for="item in personlData" :key="item.id">
                  <div>
                    <span></span>
                    <span>姓名：</span>
                    <span>{{ item.name }}</span>
                  </div>
                  <div>
                    <span></span>
                    <span>职位：</span>
                    <span>{{
                      item.type == 1
                        ? "群测群防人员"
                        : item.type == 2
                        ? "预防联系人"
                        : "街道分管领导"
                    }}</span>
                  </div>
                  <div>
                    <span></span>
                    <span>电话：</span>
                    <span>{{ item.phone }}</span>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <div class="danger_details_other_modules">
        <div>
          <el-button type="primary" v-if="permissions.disaster_monitoring_point_detail" @click="handerMaterial">监测点资料</el-button>
          <el-button type="primary" v-if="permissions.disaster_monitoring_point_detail" @click="pieceCards">两卡一案</el-button>
        </div>
      </div>
    </div>

    <div class="danger_details_body" v-if="isactive == 2">
      <danger-list ref="dangerlist"></danger-list>
    </div>

    <div class="danger_details_body" v-if="isactive == 3">
      <warn-list></warn-list>
    </div>

    <el-dialog
      class="hide_dialog"
      :visible.sync="dialogFormVisible"
      @closed="handleClose"
      append-to-body
      width="85%"
      :fullscreen="dialogfull">
      <div slot="title" class="dialog-title">
        <span class="title-text">监测点详情</span>
        <i class="el-icon-full-screen" @click="isfullscreen"></i>
      </div>
      <el-tabs ref="tabsRef" :tab-position="tabPosition" @tab-click="tabClick" v-model="activeName">
        <el-tab-pane name="prevent" label="防灾明白卡">
          <prevent
            ref="prevent"
            :dialogFormVisible="dialogFormVisible"
            :mapOpenTab="tabIndex"
          ></prevent>
        </el-tab-pane>
        <el-tab-pane name="aversion" label="避险明白卡">
          <aversion
            :mapOpenTab="tabIndex"
            ref="aversion"
            :dialogFormVisibleparent="dialogFormVisible"
          ></aversion>
        </el-tab-pane>
        <el-tab-pane name="reserveplan" label="预案">
          <reserve-plan
            ref="reserveplan"
            :mapOpenTab="tabIndex"
            :dialogFormVisible="dialogFormVisible"
            :disasterBase.sync="disasterBase"
          ></reserve-plan>
        </el-tab-pane>
        <el-tab-pane name="field" label="监测点信息">
          <field
            :dialogFormVisible="dialogFormVisible"
            :disasterBase.sync="disasterBase"
            ref="field"
          ></field>
        </el-tab-pane>
        <el-tab-pane name="hidddata" label="监测点资料">
          <hidd-data
            :mapOpenTab="tabIndex"
            :dialogFormVisibleparent="dialogFormVisible"
            ref="hidddata"
          ></hidd-data>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  searchPageList,
  getByDisasterId,
} from "@/api/hideDanger/obj";
import { deviceList, monitorRunState } from "@/api/monitorManage/device";
import prevent from "@/views/hideDanger/prevent/index";
import aversion from "@/views/hideDanger/aversion/index";
import reservePlan from "@/views/hideDanger/reservePlan/index";
import hiddData from "@/views/hideDanger/hiddData/index";
import field from "@/views/hideDanger/field/index";
import dangerList from "@/views/wel/analysisModule/details/detailsList/dangerList.vue"
import warnList from "@/views/wel/analysisModule/details/detailsList/warnList.vue"
import { frontDeskAlarmList } from "@/api/warningMag/monitorList";
export default {
  computed: mapGetters(["analysisDetails", "dictionaries", "projectId","permissions"]),
  components: { prevent, aversion, reservePlan, hiddData, field, dangerList, warnList },
  data() {
    return {
      options: {
        device_type: {},
        monitor_type: {},
        steady_type: {},
        risk_type: {},
        level_type: {},
        running_state: {},
      },
      isactive: 1,
      details: [
        {
          name: "监测点编号",
          fieldName: "monitorCode",
        },
        {
          name: "监测点名称",
          fieldName: "monitorName",

        },
        {
          name: "监测点类型",
          fieldName: "type",
          isConvert: true,
          isConvertTypeName: "monitor_type",
        },
        {
          name: "行政区划",
          fieldName: "communityName",
          isXzqh: true
        },
        {
          name: "地理位置",
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
        {
          name: "运行状态",
          fieldName: "runningStatus",
          isConvert: true,
          isConvertTypeName: "running_state",
        },
        {
          name: "当前预警情况",
          fieldName: "threatObject",
        },
        // {
        //   name: "潜在经济损失(万元)",
        //   fieldName: "disasterName",
        // },
        // {
        //   name: "预测稳定性",
        //   fieldName: "steady",
        //   isConvert: true,
        //   isConvertTypeName: "steady_type",
        // },
        // {
        //   name: "隐患等级",
        //   fieldName: "level",
        //   isConvert: true,
        //   isConvertTypeName: "level_type",
        // },
        // {
        //   name: "危害性",
        //   fieldName: "extentHarm",
        //   isConvert: true,
        //   isConvertTypeName: "risk_type",
        // },
      ],
      isanalysisDetails: false,
      data: {},
      operationData: {},
      runState: [],
      dialogFormVisible: false,
      tabIndex: 0,
      tabPosition: "left",
      activeName: "prevent",
      activeArr:[],
      dialogfull: false,
      personlData: [],
      isbasicData: true,
      warnColor: {
        1: {
          alpha: 1,
          blue: 0,
          green:  0,
          red: 1,
        },
        2: {
          alpha: 1,
          blue: 0,
          green: 0.63,
          red: 1,
        },
        3: {
          alpha: 1,
          blue: 0,
          green: 1,
          red: 1,
        },
        4: {
          alpha: 1,
          blue: 1,
          green:  0.7,
          red: 0,
        },
      },
      disasterBase:null,
    };
  },

  created() {
    for (const key in this.options) {
      this.options[key] = this.dictionaries.data[key];
    }
  },
  mounted() {
    this.loadData(this.analysisDetails);
    this.getPoint()
    this.$bus.$on('refreshDeviceLonlat', (val) => {
      if(val.status){
        setTimeout(()=>{ this.getPoint() },1000)
      }
    });
  },
  methods: {
    change(val) {
      this.isactive = val;
      val == 1 ? (this.isbasicData = true) : (this.isbasicData = false);
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
    dealConvert(d) {
      return `${d.provinceName || ''}${d.cityName || ''}${d.countyName || ''}${d.streetName || ''}${d.communityName || ''}`
    },
    loadData(val) {
      if (val.status) {
        window.sessionStorage.removeItem("disasterData");
        window.sessionStorage.setItem(
          "disasterData",
          JSON.stringify(val.data.data)
        );
        this.isanalysisDetails = true;
        this.data = val.data.data;
        // frontDeskAlarmList({
        //   current: 1,
        //   size: 10,
        //   total: 0,
        //   disasterNo: this.data.pikk,
        // }).then((res) => {
        //   let data = res.data.data.records[0];
        //   if (data) {
        //     this.mapFunc.kuosan2(this.data,this.warnColor[data.amendLevel]);
        //   }
        // });
        // searchPageList(this.data.id).then((res) => {
        //   this.operationData = res.data.data || [];
        // });
        // this.mapFunc.layerHide(false);
      } else {
        this.isanalysisDetails = false;
      }
    },
    handerMaterial() {
      this.dialogFormVisible = true;
      // this.activeName = "hidddata";
              this.$nextTick(() => {
                this.activeArr=[]
//首先把所有的都隐藏
            this.$refs.tabsRef.$children[0].$refs.tabs[0].style.display = 'none';
            this.$refs.tabsRef.$children[0].$refs.tabs[1].style.display = 'none';
            this.$refs.tabsRef.$children[0].$refs.tabs[2].style.display = 'none';
            this.$refs.tabsRef.$children[0].$refs.tabs[3].style.display = 'none';
            this.$refs.tabsRef.$children[0].$refs.tabs[4].style.display = 'none';



            if(this.permissions.JCD_detail_preventCard_view){
                this.$refs.tabsRef.$children[0].$refs.tabs[0].style.display = 'block';
                // this.activeName="prevent";
                this.activeArr.push("prevent")
            }

            if(this.permissions.JCD_detail_hedgeWhiteCard_view){
                this.$refs.tabsRef.$children[0].$refs.tabs[1].style.display = 'block';
                // this.activeName="aversion";
                this.activeArr.push("aversion")
            }
            if(this.permissions.JCD_detail_reservePlan_view){
                this.$refs.tabsRef.$children[0].$refs.tabs[2].style.display = 'block';
                // this.activeName="reserveplan";
                this.activeArr.push("reserveplan")
            }
             if(this.permissions.JCD_detail_baseInfo_view){
                this.$refs.tabsRef.$children[0].$refs.tabs[3].style.display = 'block';
                // this.activeName="field";
                this.activeArr.push("field")
            }

            if(this.permissions.JCD_detail_monitoringFolder_view){
                this.$refs.tabsRef.$children[0].$refs.tabs[4].style.display = 'block';
                // this.activeName="hidddata";
                this.activeArr.push("hidddata")
            }
            if(this.activeArr&&this.activeArr.length>0){
              this.activeName=this.activeArr[0];
              switch (this.activeName) {
                case "field":
                  this.tabIndex=3
                  this.$refs["field"].isEditTpl=false
                  break;
                case "prevent":
                  this.tabIndex=0
                  this.$refs["prevent"].isEditTpl=false
                  break;
                case "aversion":
                  this.tabIndex=1
                  this.$refs["aversion"].isEditTpl=false
                  break;
                case "reserveplan":
                  this.tabIndex=2
                  this.$refs["reserveplan"].isEditTpl=false
                  break;
                case "hidddata":
                  this.tabIndex=4
                  this.$refs["hidddata"].isEditTpl=false
                  break;
                default:
                  break;
              }
            }
        });

    },
    pieceCards() {
      this.dialogFormVisible = true;
          this.$nextTick(() => {
            this.activeArr=[]
            //两卡一案
//首先把所有的都隐藏
            this.$refs.tabsRef.$children[0].$refs.tabs[0].style.display = 'none';
            this.$refs.tabsRef.$children[0].$refs.tabs[1].style.display = 'none';
            this.$refs.tabsRef.$children[0].$refs.tabs[2].style.display = 'none';
            this.$refs.tabsRef.$children[0].$refs.tabs[3].style.display = 'none';
            this.$refs.tabsRef.$children[0].$refs.tabs[4].style.display = 'none';



            if(this.permissions.JCD_detail_preventCard_view){
                this.$refs.tabsRef.$children[0].$refs.tabs[0].style.display = 'block';
                // this.activeName="prevent";
                this.activeArr.push("prevent")

            }

            if(this.permissions.JCD_detail_hedgeWhiteCard_view){
                this.$refs.tabsRef.$children[0].$refs.tabs[1].style.display = 'block';
                // this.activeName="aversion";
                this.activeArr.push("aversion")
            }
            if(this.permissions.JCD_detail_reservePlan_view){
                this.$refs.tabsRef.$children[0].$refs.tabs[2].style.display = 'block';
                // this.activeName="reserveplan";
                this.activeArr.push("reserveplan")
            }
             if(this.permissions.JCD_detail_baseInfo_view){
                this.$refs.tabsRef.$children[0].$refs.tabs[3].style.display = 'block';
                // this.activeName="field";
                this.activeArr.push("field")
            }

            if(this.permissions.JCD_detail_monitoringFolder_view){
                this.$refs.tabsRef.$children[0].$refs.tabs[4].style.display = 'block';
                // this.activeName="hidddata";
                this.activeArr.push("hidddata")
            }
            if(this.activeArr&&this.activeArr.length>0){
              this.activeName=this.activeArr[0];
              switch (this.activeName) {
                case "field":
                  this.tabIndex=3
                  this.$refs["field"].isEditTpl=false
                  break;
                case "prevent":
                  this.tabIndex=0
                  this.$refs["prevent"].isEditTpl=false
                  break;
                case "aversion":
                  this.tabIndex=1
                  this.$refs["aversion"].isEditTpl=false
                  break;
                case "reserveplan":
                  this.tabIndex=2
                  this.$refs["reserveplan"].isEditTpl=false
                  break;
                case "hidddata":
                  this.tabIndex=4
                  this.$refs["hidddata"].isEditTpl=false
                  break;
                default:
                  break;
              }
            }
        });

    },
    tabClick(tab, event) {
      this.tabIndex = tab.index;
      // if(tab.name=="field"){
      //   this.disasterBase=this.analysisDetails.data.data
      // }
      this.disasterBase=this.analysisDetails.data.data
      switch (tab.name) {
                case "field":
                  this.tabIndex=3
                  this.$refs["field"].isEditTpl=false
                  break;
                case "prevent":
                  this.tabIndex=0
                  this.$refs["prevent"].isEditTpl=false
                  break;
                case "aversion":
                  this.tabIndex=1
                  this.$refs["aversion"].isEditTpl=false
                  break;
                case "reserveplan":
                  this.tabIndex=2
                  this.$refs["reserveplan"].isEditTpl=false
                  break;
                case "hidddata":
                  this.tabIndex=4
                  this.$refs["hidddata"].isEditTpl=false
                  break;
                default:
                  break;
              }
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
    isfullscreen() {
      this.dialogfull = !this.dialogfull;
    },

    getPoint() {
      let dangerId = this.analysisDetails.data.data.id;
      deviceList({
        current: 1,
        size: 100000,
        disasterId: dangerId,
        projectId: this.projectId,
      }).then(async (res) => {
        this.mapFunc.removeLayer("twoLevelLayer");
        let pointParticulars = {
          title: "设备图例",
          iconName: "device", //传入载点图标归类模块
          data: res.data.data.records, //传入多点载点数据
          action: this.backFun,
          isRemoveLayer: false,
          pointLevel: 2,
          layerName: "twoLevelLayer",
          typeOption: this.options.device_type,
        };
        this.$store.commit("SET_LEGENDDATA", pointParticulars);
        // this.mapFunc.MapPoints(pointParticulars); //调用地图 多点载点函数
        setTimeout(() => {
          this.mapFunc.modelPoints(pointParticulars);
        }, 3000);
      });
    },
    backFun(data) {
      var list = data.data;
      if (list.type == 6) {
        this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
          status: true,
          name: "deviceCurve",
          style: {
            width: "160vh",
            height: "80vh",
            left: "calc(50% - 80vh)",
            title: "监控视频",
          },
          data: list,
        });
      } else {
        this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
          status: true,
          name: "deviceCurve",
          style: {
            width: "80vw",
            height: "800px",
            left: "calc(50% - 40vw)",
            title: "设备曲线",
          },
          data: list,
          baifenbi: true,
        });
      }
      return;
    },
  },
  watch: {
    analysisDetails: {
      handler(val) {
        this.loadData(val);
        this.isbasicData = true;
      },
      deep: true,
    },
    dialogFormVisible(val) {
      if (val) {
        // this.tabIndex = 0;
        if (val) {
          // this.activeName = "prevent";
          if(this.activeArr&&this.activeArr.length>0){
              this.activeName=this.activeArr[0];
              switch (this.activeName) {
                case "field":
                  this.tabIndex=3
                  this.$refs["field"].isEditTpl=false
                  break;
                case "prevent":
                  this.tabIndex=0
                  this.$refs["prevent"].isEditTpl=false
                  break;
                case "aversion":
                  this.tabIndex=1
                  this.$refs["aversion"].isEditTpl=false
                  break;
                case "reserveplan":
                  this.tabIndex=2
                  this.$refs["reserveplan"].isEditTpl=false
                  break;
                case "hidddata":
                  this.tabIndex=4
                  this.$refs["hidddata"].isEditTpl=false
                  break;
                default:
                  break;
              }
            }
        }
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
$width = 25%;
$height = 87.11%;
$header_height = 44px;
$padding_basic = 24;
$padding_left = ($padding_basic / 1920 * 100) %;
$padding_top = 24px;
// $padding_top = ($padding_basic / 1080 * 100) %;
$transition_time = 0.6s;
$border = 2px;

.danger_details {
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

  .danger_details_body {
    position: absolute;
    height: calc(100% - 132px);
    width: calc(100% - 40px);

    .el-collapse {
      .el-collapse-item__header {
        background: none;
      }

      .el-collapse-item__wrap {
        background: rgba(0, 0, 0, 0.2);
        padding: 10px 20px;
        overflow: hidden;
      }
    }

    .danger_details_basics {
      overflow: hidden;
      height: calc(100% - 45px);

      >div {
        padding: 20px;
        margin-top: 10px;
        height: 100%;

        >div {
          height: 100%;
        }
      }
    }

    .danger_details_other_modules {
      >div {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        height: 54px;

        .el-button {
          width: 45%;
          font-size: 18px;
          background: none;
          border 1px solid #fff;
        }
      }
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
      padding-top: 5px;

      >span {
        float: left;
        display: inline-block;
        line-height: 20px;
        width: calc(100% - 176px);
        text-align: left;
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
        line-height: 20px;
        text-align: justify;
        margin-right: 10px;
      }

      .labelname::after {
        content: '';
        display: inline-block;
        width: 100%;
      }
    }

    .personnel {
      >div {
        background: rgba(0, 0, 0, 0.3);

        >div {
          text-align: left;
          padding: 10px 20px;

          >span {
          }

          >span:first-child {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #0096FF;
            margin: 4px 10px 0 0;
          }

          >span:nth-child(2) {
            display: inline-block;
            width: 60px;
          }
        }
      }

      >div:nth-child(2) {
        margin: 10px 0;
      }
    }

    >div:nth-child(2) {
      margin: 0;
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

::v-deep.title-text {
  color: #fff;
}

::v-deep.el-icon-full-screen {
  color: #fff;
  margin-left: 10px;
}

::v-deep.text-center {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border: 1px solid #666;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;

  .row-height-9 {
    height: 360px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: 1px solid #666;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
}
</style>
