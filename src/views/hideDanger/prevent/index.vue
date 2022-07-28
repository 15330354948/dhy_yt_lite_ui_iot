<template>
  <div class="field_data">
    <div class="field_data__tree">
      <p class="field_data__title">防灾明白卡</p>
      <div class="button-right" v-if="permissions.JCD_detail_preventCard_edit&&isEditTpl">
        <el-button v-if="isSave == false" icon="el-icon-edit" @click="editForm"
          >编辑</el-button
        >
        <el-button
          v-if="isSave != false"
          icon="el-icon-check"
          @click="saveForm"
          type="primary"
          >保存</el-button
        >
        <!-- <el-button icon="el-icon-download" @click="getOutword">导出</el-button> -->
      </div>
      <div class="dev_infor">
        <div class="top-input">
          <el-row>
            <el-col :span="18">
              <el-row>
                <el-col :span="12" class="flex table-top-input">
                  <el-input
                    class="input-item flex-2 in"
                    placeholder=""
                    style="border: none"
                    :disabled="!isSave"
                    v-model="msgData.townName"
                  ></el-input>
                  <span class="flex-1">乡(镇、街道办事处)</span>
                </el-col>
                <el-col :span="5" class="flex table-top-input">
                  <el-input
                    class="input-item flex-2 in"
                    placeholder=""
                    :disabled="!isSave"
                    style="border: none"
                    v-model="msgData.village"
                  ></el-input>
                  <span class="flex-1">村</span>
                </el-col>
                <el-col :span="5" class="flex table-top-input">
                  <el-input
                    class="input-item flex-2 in"
                    placeholder=""
                    style="border: none"
                    :disabled="!isSave"
                    v-model="msgData.team"
                  ></el-input>
                  <span class="flex-1">组</span>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6" class="flex table-top-input">
             <span class=" rescol"> <span class="red">*</span>编号</span>
              <el-input
                class="flex-2 in"
                :disabled="!isSave"
                style="border: none"
                v-model="msgData.code"
              ></el-input>
            </el-col>
          </el-row>
        </div>
        <div class="basic_all">
          <div class="basic_infor">
            <table class="basic_table" border="1px" width="100%">
              <tr align="center">
                <td rowspan="3" colspan="1" class="basic_title">
                  灾害基本情况
                </td>
                <td colspan="2" class="basic_title">灾害位置</td>
                <th colspan="10">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.disasterLocation"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td colspan="2" class="basic_title">灾害类型</td>
                <th colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.disasterType"
                  ></el-input>
                </th>
                <td colspan="2" class="basic_title">灾害规模</td>
                <th colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.disasterScale"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td colspan="2" class="basic_title">诱发因素</td>
                <th colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.triggerFactors"
                  ></el-input>
                </th>
                <td colspan="2" class="basic_title">威胁对象</td>
                <th colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.threatObject"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td rowspan="3" colspan="1" class="basic_title">监测预报</td>
                <td colspan="2" class="basic_title">监测负责人</td>
                <th colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.monitoringResponsiblePerson"
                  ></el-input>
                </th>
                <td colspan="2" class="basic_title">联系电话</td>
                <th colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    size="max"
                    maxlength="11"
                    :disabled="!isSave"
                    v-model="msgData.monitoringResponsiblePersonPhone"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td colspan="2" class="basic_title">监测的主要迹象</td>
                <th colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.monitoringMainSigns"
                  ></el-input>
                </th>
                <td colspan="2" class="basic_title">监测的主要手段和方法</td>
                <th colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.monitoringMainMethod"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td colspan="2" class="basic_title">临灾预报的判断</td>
                <th colspan="10">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.impendingDisasterStatePredictionJudge"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td rowspan="9" class="basic_title">应急避险撤离</td>
                <td colspan="2" class="basic_title">预定避灾地点</td>
                <th colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.intendedPlace"
                  ></el-input>
                </th>
                <td colspan="2" class="basic_title">预定报警信号</td>
                <th colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.warnSignal"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td colspan="2" class="basic_title">预定疏散路线</td>
                <th colspan="10">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.evacuationRoute"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td colspan="2" class="basic_title">疏散命令发布人</td>
                <th colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.evacuationOrderPublisher"
                  ></el-input>
                </th>
                <td colspan="2" class="basic_title">值班电话</td>
                <th colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    maxlength="11"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.evacuationOrderPublisherDutyPhone"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td rowspan="2" colspan="2" class="basic_title">抢险、排险</td>
                <td class="basic_title">单位</td>
                <th colspan="3">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.rescueUnit"
                  ></el-input>
                </th>
                <td rowspan="2" colspan="2" class="basic_title">值班电话</td>
                <th rowspan="2" colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    maxlength="11"
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.rescueDutyPhone"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td class="basic_title">负责人</td>
                <th colspan="3">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.rescueResponsiblePerson"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td rowspan="2" colspan="2" class="basic_title">治安保卫</td>
                <td class="basic_title">单位</td>
                <th colspan="3">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.securityUnit"
                  ></el-input>
                </th>
                <td rowspan="2" colspan="2" class="basic_title">值班电话</td>
                <th rowspan="2" colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    maxlength="11"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    :disabled="!isSave"
                    v-model="msgData.securityDutyPhone"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td class="basic_title">负责人</td>
                <th colspan="3">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.securityResponsiblePerson"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td rowspan="2" colspan="2" class="basic_title">医疗救护</td>
                <td class="basic_title">单位</td>
                <th colspan="3">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.medicalAidUnit"
                  ></el-input>
                </th>
                <td rowspan="2" colspan="2" class="basic_title">值班电话</td>
                <th rowspan="2" colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    maxlength="11"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.medicalAidDutyPhone"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td class="basic_title">负责人</td>
                <th colspan="3">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.medicalAidResponsiblePerson"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td rowspan="3" colspan="2" class="basic_title">
                  本卡发放单位(盖章)
                </td>
                <td colspan="2" class="basic_title">负责人</td>
                <th colspan="3">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.cardReleaseUnitResponsiblePerson"
                  ></el-input>
                </th>
                <td colspan="2" class="basic_title">持卡单位或个人</td>
                <th colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.cardHolder"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td colspan="2" class="basic_title">联系电话</td>
                <th colspan="3">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    maxlength="11"
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.cardReleaseUnitPhone"
                  ></el-input>
                </th>
                <td colspan="2" class="basic_title">联系电话</td>
                <th colspan="4">
                  <el-input
                    class="tableinput"
                    placeholder=""
                    maxlength="11"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                    size="max"
                    :disabled="!isSave"
                    v-model="msgData.cardHolderPhone"
                  ></el-input>
                </th>
              </tr>
              <tr align="center">
                <td colspan="2" class="basic_title">日期</td>
                <th colspan="3">
                  <el-date-picker
                    class="tableinput"
                    size="max"
                    prefix-icon="clear-icon"
                    :disabled="!isSave"
                    v-model="msgData.cardReleaseUnitDate"
                    type="date"
                    placeholder=""
                  >
                  </el-date-picker>
                </th>
                <td colspan="2" class="basic_title">日期</td>
                <th colspan="4">
                  <el-date-picker
                    class="tableinput"
                    size="max"
                    :disabled="!isSave"
                    prefix-icon="clear-icon"
                    v-model="msgData.cardHolderDate"
                    type="date"
                    placeholder=""
                  >
                  </el-date-picker>
                </th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../../../store";
import { preventionList, preventionedit } from "@/api/prevention/preventMag";
export default {
  name: "prevent",
  props: ["dialogFormVisible", "openTab", "mapOpenTab"],
  computed: {
    ...mapGetters(["permissions"]),
    header() {
      return { Authorization: "Bearer " + store.getters.access_token };
    },
  },
  data() {
    return {
      readOnlyList: {},
      isSave: false,
      msgData: {
        cardHolder: "",
        cardHolderDate: "",
        cardHolderPhone: "",
        cardReleaseUnitDate: "",
        cardReleaseUnitPhone: "",
        cardReleaseUnitResponsiblePerson: "",
        code: "",
        createTime: "",
        delFlag: false,
        disasterLocation: "",
        disasterScale: "",
        disasterType: "",
        evacuationOrderPublisher: "",
        evacuationOrderPublisherDutyPhone: "",
        evacuationRoute: "",
        id: null,
        impendingDisasterStatePredictionJudge: "",
        intendedPlace: "",
        medicalAidDutyPhone: "",
        medicalAidResponsiblePerson: "",
        medicalAidUnit: "",
        monitorId: null,
        monitoringMainMethod: "",
        monitoringMainSigns: "",
        monitoringResponsiblePerson: "",
        monitoringResponsiblePersonPhone: "",
        rescueDutyPhone: "",
        rescueResponsiblePerson: "",
        rescueUnit: "",
        securityDutyPhone: "",
        securityResponsiblePerson: "",
        securityUnit: "",
        team: "",
        threatObject: "",
        townCode: null,
        townName: "",
        triggerFactors: "",
        updateTime: "",
        village: "",
        warnSignal: "",
        searchCount: true,
      },
      isEditTpl: true,
    };
  },
  mounted() {},
  watch: {
    openTab: {
      // deep: true,
      immediate: true,
      handler(val, old) {
        if (val == 1) {
          this.readOnlyList = JSON.parse(
            window.sessionStorage.getItem("disasterData")
          );
          this.clearForm();
          this.getList1();
        }
      },
    },
    dialogFormVisible: {
      deep: true,
      immediate: true,
      handler(val, old) {
        // this.clearForm();
        // if (val == 1) {
        //     this.clearForm();
        //       this.readOnlyList = JSON.parse(
        //         window.sessionStorage.getItem("disasterData")
        //       );
        //       this.getList1();
        //   }
      },
    },

    mapOpenTab: {
      deep: true,
      immediate: true,
      handler(val, old) {
        if (val == 0) {
          this.readOnlyList = JSON.parse(
            window.sessionStorage.getItem("disasterData")
          );
          this.clearForm();
          this.getList1();
        }
      },
    },
  },
  methods: {
    async getList1() {
      await preventionList({ monitorId: this.readOnlyList.id }).then((res) => {
        if (res.data.code == 0&&res.data.data.records[0]) {
          this.msgData = res.data.data.records[0];
        }
      });
    },
    editForm() {
      this.isSave = true;
    },
    saveForm() {
      this.msgData.monitorId = this.readOnlyList.id;
      if(this.msgData.code){
        preventionedit(this.msgData).then((res) => {
        if (res.data.code == 0) {
          this.isSave = false;
          this.$message.success("操作成功!");
        }
        setTimeout((v) => {
          this.getList1();
        }, 100);
      });
      }else{
         this.$message.warning("请填写好编号!");
      }

    },
    clearForm() {
      this.isSave = false;
      this.isMap = null;
      this.msgData = {};
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.rescol{
  position: relative;
  .red{
    color: red;
    position: relative;
    top: -2px;
    left: -10px;
  }
}
::v-deep .is-disabled {
  .el-input__inner {
    color: #000 !important;
  }
}
$height: calc(100% - 49px);
$back_color: #fff;
$back_hover: #fff;
$font_color: #fff;
.flex-1 {
  flex: 1;
}
.flex-2 {
  flex: 2;
}
.flex {
  display: flex;
}
.input-item {
  border: none;
  border-bottom: 1px solid #000;
  text-align: center;
}
.in {
  border: none !important;
  border-radius: 0 !important;
  padding-top: 20px;
  border-bottom: 1px solid #000 !important;
}
::v-deep .el-input__inner {
  border: none !important;
  size: max;
}
.table-top-input {
  span {
    padding-top: 25px;
  }
}
.tableinput {
  border-radius: 0 !important;
}
.text-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.field_data {
  display: flex;
  height: 100%;
  &__btn {
    margin-bottom: 5px;
  }
  &__title {
    margin: 0;
    height: 30px;
    line-height: 30px;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
  }
  &__tree {
    padding-top: 3px;
    .button-right {
      display: flex;
      justify-content: flex-end;
      padding: 10px;
    }
  }
}
.dev_infor {
  padding: 0 10px;
  // height: 100%;
  overflow-y: auto;

  .dev_title {
    margin: 0 0 15px 0 !important;
    padding: 0px 0 0 0;
  }

  .basic_table {
    border-color: #000;
    border: 1px solid #000;
    color: #333333;
    font-size: 14px;
  }

  .basic_th_bottom {
    width: 55%;
  }

  th {
    width: 22%;
    font-weight: normal;
    word-wrap: break-word;
  }

  ::v-deep .basic_title {
    background: #fff !important;
  }
  .basic_titleshu {
    width: 25px;
    writing-mode: horizontal-tb;
  }

  tr {
    width: 100%;
  }

  td {
    width: 11%;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .basic_all {
    width: 100%;
    background: $back_color;

    .basic_infor {
      background: white;
      color: #000;
    }
  }

  .chuanganqi_title {
    margin: 15px 0 15px 0 !important;
  }

  .panju_div_content {
    height: 310px;
    padding-bottom: 20px;

    .biaodan {
      height: 100%;
    }

    .el-table__header-wrapper {
      .el-table__header {
        .has-gutter {
          th {
            // background: #e4e4e4;
            border: none;
            color: $font_color;
            text-overflow: ellipsis;
            white-space: normal;
            word-break: break-all;
            line-height: 23px;
            font-weight: bold;
          }
        }
      }
    }

    ::v-deep.el-table__body-wrapper {
      max-height: calc(100% - 45px);
      overflow-y: auto;
    }

    ::v-deep.cell {
      text-align: center;
    }
  }
}
</style>
