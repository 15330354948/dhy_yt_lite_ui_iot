<template>
  <div class="avoid-table">
    <el-card>
      <div class="header-title" slot="header">地质灾害防险避灾明白卡</div>
      <div class="button-right">
        <el-button
          icon="el-icon-check"
          v-if="!isView"
          @click="saveForm"
          type="primary"
          >保存</el-button
        >
        <!-- <el-button icon="el-icon-download">导出</el-button> -->
      </div>
      <div class="table-content">
        <div class="top-input">
          <el-row>
            <el-col :span="18">
              <el-row>
                <el-col :span="5" class="flex table-top-input">
                  <el-input
                    class="input-item flex-2"
                    :disabled="isView"
                    placeholder=""
                    v-model="tableDatas.monitorHedgeCard.countyName"
                  ></el-input>
                  <span class="flex-1">区(新区)</span>
                </el-col>
                <el-col :span="5" class="flex table-top-input">
                  <el-input
                    class="input-item flex-2"
                    :disabled="isView"
                    placeholder=""
                    v-model="tableDatas.monitorHedgeCard.streetName"
                  ></el-input>
                  <span class="flex-1">街道</span>
                </el-col>
                <el-col :span="5" class="flex table-top-input">
                  <el-input
                    class="input-item flex-2"
                    :disabled="isView"
                    placeholder=""
                    v-model="tableDatas.monitorHedgeCard.communityName"
                  ></el-input>
                  <span class="flex-1">社区</span>
                </el-col>
                <el-col :span="9" class="flex table-top-input">
                  <el-input
                    class="input-item flex-2"
                    :disabled="isView"
                    placeholder=""
                    v-model="tableDatas.monitorHedgeCard.disasterName"
                  ></el-input>
                  <span class="flex-1">地质灾害监测点</span>
                </el-col>
              </el-row>
            </el-col>
             <el-col :span="2" class="flex table-top-input text-right"> <span>&nbsp;</span> </el-col>
            <el-col :span="4" class="flex table-top-input text-right" style="margin-left:10px">
              <span class=" rescol"> <span class="red">*</span>编号</span>
              <el-input
                class="flex-1  text-right"
                :disabled="isView"
                style="border-bottom:2px solid #666"
                v-model="tableDatas.monitorHedgeCard.code"
              ></el-input>
            </el-col>
          </el-row>
        </div>
        <el-row class="table border-top border-left border-right">
          <el-col class="table-left" :span="14">
            <el-row class="">
              <el-col :span="4" class="row-height text-center">户主姓名</el-col>
              <el-col :span="4" class="row-height text-center"
                ><el-input
                  :disabled="isView"
                  v-model="tableDatas.monitorHedgeCard.householderName"
                ></el-input
              ></el-col>
              <el-col :span="4" class="row-height text-center">家庭人数</el-col>
              <el-col :span="4" class="row-height text-center"
                ><el-input
                  :disabled="isView"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                  v-model="tableDatas.monitorHedgeCard.familyNumber"
                ></el-input
              ></el-col>
              <el-col :span="4" class="row-height text-center">房屋类别</el-col>
              <el-col :span="4" class="row-height text-center"
                ><el-input
                  :disabled="isView"
                  v-model="tableDatas.monitorHedgeCard.houseType"
                ></el-input
              ></el-col>
            </el-row>
            <el-row>
              <el-col :span="4" class="row-height-2 text-center"
                >家庭地址</el-col
              >
              <el-col :span="20" class="row-height-2 text-center"
                ><el-input
                  :disabled="isView"
                  v-model="tableDatas.monitorHedgeCard.homeAddress"
                ></el-input
              ></el-col>
            </el-row>
            <el-row>
              <el-col :span="4" class="row-height-6 text-center"
                >家庭成员情况</el-col
              >
              <el-col :span="10">
                <el-row>
                  <el-col :span="8">
                    <el-row class="row-height text-center">姓名</el-row>
                    <el-row
                      class="row-height text-center"
                      v-for="(item, index) in 5"
                      :key="index"
                      ><el-input
                        :disabled="isView"
                        v-model="tableDatas.monitorFamilyMemberList[index].name"
                      ></el-input
                    ></el-row>
                  </el-col>
                  <el-col :span="8">
                    <el-row class="row-height text-center">性别</el-row>
                    <el-row
                      class="row-height text-center"
                      v-for="(item, index) in 5"
                      :key="index"
                    >
                      <el-input
                        :disabled="isView"
                        v-model="
                          tableDatas.monitorFamilyMemberList[index].gender
                        "
                      ></el-input
                    ></el-row>
                  </el-col>
                  <el-col :span="8">
                    <el-row class="row-height text-center">年龄</el-row>
                    <el-row
                      class="row-height text-center"
                      v-for="(item, index) in 5"
                      :key="index"
                      ><el-input
                        onkeyup="value=value.replace(/[^\d]/g,'')"
                        minlength="1"
                        maxlength="3"
                        :disabled="isView"
                        v-model="tableDatas.monitorFamilyMemberList[index].age"
                      ></el-input
                    ></el-row>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="10">
                <el-row>
                  <el-col :span="8">
                    <el-row class="row-height text-center">姓名</el-row>
                    <el-row
                      class="row-height text-center"
                      v-for="(item, index) in 5"
                      :key="index"
                      ><el-input
                        :disabled="isView"
                        v-model="
                          tableDatas.monitorFamilyMemberList[index + 5].name
                        "
                      ></el-input
                    ></el-row>
                  </el-col>
                  <el-col :span="8">
                    <el-row class="row-height text-center">性别</el-row>
                    <el-row
                      class="row-height text-center"
                      v-for="(item, index) in 5"
                      :key="index"
                    >
                      <el-input
                        :disabled="isView"
                        v-model="
                          tableDatas.monitorFamilyMemberList[index + 5].gender
                        "
                      ></el-input
                    ></el-row>
                  </el-col>
                  <el-col :span="8">
                    <el-row class="row-height text-center">年龄</el-row>
                    <el-row
                      class="row-height text-center"
                      v-for="(item, index) in 5"
                      :key="index"
                      ><el-input
                        onkeyup="value=value.replace(/[^\d]/g,'')"
                        minlength="1"
                        maxlength="3"
                        :disabled="isView"
                        v-model="
                          tableDatas.monitorFamilyMemberList[index + 5].age
                        "
                      ></el-input
                    ></el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" class="text-center row-height-6"
                >监测与预警</el-col
              >
              <el-col :span="20">
                <el-row>
                  <el-col :span="6" class="text-center row-height-2"
                    >监测人</el-col
                  >
                  <el-col :span="6" class="text-center row-height-2"
                    ><el-input
                      :disabled="isView"
                      v-model="tableDatas.monitorHedgeCard.monitoringPerson"
                    ></el-input
                  ></el-col>
                  <el-col :span="6" class="text-center row-height-2"
                    >联系电话</el-col
                  >
                  <el-col :span="6" class="text-center row-height-2"
                    ><el-input
                      :disabled="isView"
                      v-model="tableDatas.monitorHedgeCard.monitoringPersonPhone"
                      oninput="value=value.replace(/[^0-9.]/g,'')"
                      maxlength="11"
                      placeholder=""
                    ></el-input
                  ></el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="text-center row-height-2"
                    >预警信号</el-col
                  >
                  <el-col :span="18" class="text-center row-height-2"
                    ><el-input
                      :disabled="isView"
                      v-model="tableDatas.monitorHedgeCard.warnSignal"
                    ></el-input
                  ></el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="text-center row-height-2"
                    >预警信号发布人</el-col>
                  <el-col :span="6" class="text-center row-height-2"
                    ><el-input
                      :disabled="isView"
                      v-model="tableDatas.monitorHedgeCard.warnSignalReleasePerson"
                    ></el-input></el-col>
                  <el-col :span="6" class="text-center row-height-2"
                    >联系电话</el-col>
                  <el-col :span="6" class="text-center row-height-2"
                    ><el-input
                      :disabled="isView"
                      v-model="tableDatas.monitorHedgeCard.warnSignalReleasePersonPhone"
                      oninput="value=value.replace(/[^0-9.]/g,'')"
                      maxlength="11"
                      placeholder=""
                    ></el-input
                  ></el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <!-- 灾害(隐患)类型/灾害规模无字段 -->
          <el-col class="table-right" :span="10">
            <el-row
              ><el-col :span="24" class="row-height text-center"
                >灾害(隐患)基本情况</el-col
              ></el-row
            >
            <el-row>
              <el-col :span="6" class="row-height-2 text-center"
                >灾害(隐患)类型</el-col
              >
              <el-col :span="6" class="row-height-2 text-center">
                  <el-input :disabled="isView" v-model="tableDatas.monitorHedgeCard.disasterType"></el-input>
              </el-col>
              <el-col :span="6" class="row-height-2 text-center"
                >灾害规模<br />(隐患等级)</el-col
              >
              <el-col :span="6" class="row-height-2 text-center"
                >
                  <el-input
                    :disabled="isView"
                    v-model="tableDatas.monitorHedgeCard.disasterScale"
                  ></el-input></el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="row-height-2 text-center"
                >地质灾害隐患与<br />本住户位置关系</el-col
              >
              <el-col :span="18" class="row-height-2 text-center"
                ><el-input
                  :disabled="isView"
                  v-model="tableDatas.monitorHedgeCard.locationRelation"
                  type="textarea"
                ></el-input
              ></el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="row-height-2 text-center"
                >灾害诱发因素</el-col
              >
              <el-col :span="18" class="row-height-2 text-center"
                ><el-input
                  :disabled="isView"
                  v-model="tableDatas.monitorHedgeCard.triggerFactors"
                  placeholder=""
                  type="textarea"
                ></el-input
              ></el-col>
            </el-row>
            <el-row>
              <el-col :span="6" class="row-height-2 text-center"
                >本住户注意事项</el-col
              >
              <el-col :span="18" class="row-height-2 text-center"
                ><el-input
                  :disabled="isView"
                  v-model="tableDatas.monitorHedgeCard.householdNotes"
                  type="textarea"
                ></el-input
              ></el-col>
            </el-row>
            <el-row>
              <el-col :span="2" class="row-height-6 text-center"
                ><div  style="width:18px">隔离与安置</div></el-col
              >
              <el-col :span="4">
                <el-row class="row-height-2 text-center">撤离路线</el-row>
                <el-row class="row-height-2 text-center">安置单位地点</el-row>
                <el-row class="row-height-2 text-center">救护单位</el-row>
              </el-col>
              <el-col :span="18">
                <el-row class="row-height-2 text-center"
                  ><el-input
                    :disabled="isView"
                    v-model="tableDatas.monitorHedgeCard.evacuationRoute"
                  ></el-input
                ></el-row>
                <el-row>
                  <el-col :span="8" class="row-height-2 text-center"
                    ><el-input
                      :disabled="isView"
                      v-model="tableDatas.monitorHedgeCard.resettlementUnitLocation"
                      placeholder=""
                    ></el-input
                  ></el-col>
                  <el-col :span="8">
                    <el-row class="row-height text-center">负责人</el-row>
                    <el-row class="row-height text-center">联系电话</el-row>
                  </el-col>
                  <el-col :span="8">
                    <el-row class="row-height text-center"
                      ><el-input
                        :disabled="isView"
                        v-model="tableDatas.monitorHedgeCard.resettlementUnitResponsiblePerson"
                        placeholder=""
                      ></el-input
                    ></el-row>
                    <el-row class="row-height text-center"
                      ><el-input
                        :disabled="isView"
                        v-model="tableDatas.monitorHedgeCard.resettlementUnitResponsiblePersonPhone"
                        placeholder=""
                        oninput="value=value.replace(/[^0-9.]/g,'')"
                        maxlength="11"
                      ></el-input
                    ></el-row>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" class="row-height-2 text-center"
                    ><el-input
                      :disabled="isView"
                      v-model="tableDatas.monitorHedgeCard.ambulanceUnit"
                      placeholder=""
                    ></el-input
                  ></el-col>
                  <el-col :span="8">
                    <el-row class="row-height text-center">负责人</el-row>
                    <el-row class="row-height text-center">联系电话</el-row>
                  </el-col>
                  <el-col :span="8">
                    <el-row class="row-height text-center"
                      ><el-input
                        :disabled="isView"
                        v-model="tableDatas.monitorHedgeCard.ambulanceUnitResponsiblePerson"
                        placeholder=""
                      ></el-input
                    ></el-row>
                    <el-row class="row-height text-center"
                      ><el-input
                        :disabled="isView"
                        v-model="tableDatas.monitorHedgeCard.ambulanceUnitResponsiblePersonPhone"
                        placeholder=""
                        oninput="value=value.replace(/[^0-9.]/g,'')"
                        maxlength="11"
                      ></el-input
                    ></el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="table-bottom border-2" style="margin-top:-1px">
          <el-col :span="4" class="text-center1 row-height-2" style="border-right:2px solid #666"
            >本卡发布单位</el-col
          >
          <el-col :span="2" class="text-right row-height-2">负责人:</el-col>
          <el-col :span="2" class="row-height-2 text-right">
            <el-input
              :disabled="isView"
              v-model="tableDatas.monitorHedgeCard.releaseUnitResponsiblePerson"
            ></el-input>
          </el-col>
          <el-col :span="2" class="text-right row-height-2">联系电话:</el-col>
          <el-col :span="3" class="row-height-2 text-right">
            <el-input
              :disabled="isView"
              v-model="tableDatas.monitorHedgeCard.releaseUnitResponsiblePersonPhone"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              maxlength="11"
              placeholder=""
            ></el-input>
          </el-col>
          <el-col :span="2">
            <el-row class="row-height text-right">户主签名:</el-row>
            <el-row class="row-height text-right">日期:</el-row>
          </el-col>
          <el-col :span="4">
            <el-row class="row-height text-right"
              ><el-input
                :disabled="isView"
                v-model="tableDatas.monitorHedgeCard.signature"
              ></el-input
            ></el-row>
            <el-row class="row-height text-right block l20" style="display:flex">
                <!-- value-format="yyyy-MM-dd HH:mm:ss" -->
            <el-date-picker
                    prefix-icon='clear-icon'
                    :disabled="isView"
                    v-model="tableDatas.monitorHedgeCard.signatureTime"
                    type="date"
                    placeholder="">
                  </el-date-picker>
            </el-row>
          </el-col>
          <el-col :span="2">
            <el-row class="row-height text-right">联系电话:</el-row>
          </el-col>
          <el-col :span="3">
            <el-row class="row-height text-right"
              ><el-input
              :disabled="isView"
              v-model="tableDatas.monitorHedgeCard.householderPhone"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              maxlength="11"
              placeholder=""
            ></el-input></el-row>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  avoidadd,
  avoidedit,
  dictionary,
} from "@/api/avoidDisaster";
import { mapGetters } from "vuex";
import { loginPagePath } from '../../../config/env';
export default {
  name: "avoidTable",
  props: ["dialogShow", "isView", "tableDatas", "isEdit", "isMap"],
  data() {
    return {
      gender: [],
      titles: ["姓名", "性别", "年龄", "姓名", "性别", "年龄"],
      readonlyList: {},
      readonlyData: {},
      levelType: [], //规模等级
      disasterType: [], //灾害类型
    };
  },
  created() {},
  mounted() {
  },
  computed: {
    ...mapGetters(["permissions", "projectId"]),
  },
  watch: {
    dialogShow(val) {
        this.readOnlyList = JSON.parse(
              window.sessionStorage.getItem("disasterData")
            );
      if (val) {
      } else {
        this.clearData();
      }
    },
  },
  methods: {
    saveForm() {
        let id=JSON.parse(window.sessionStorage.getItem("disasterData"))
      this.tableDatas.monitorFamilyMemberList.forEach((e) => {
        e.projectId = this.projectId;
      });
      this.tableDatas.monitorHedgeCard.projectId = this.projectId;
      if(this.tableDatas.monitorHedgeCard.code){
          if (!this.isEdit) {
          this.tableDatas.monitorHedgeCard.monitorId=id.id
        avoidadd(this.tableDatas).then((res) => {
              this.$message.success("操作成功!");
              // this.clearData();
              this.$emit("closeDialogShow", false);
            })
      } else {
        avoidedit(this.tableDatas).then((res) => {
              this.$message.success("操作成功!");
              // this.clearData();
              this.$emit("closeDialogShow", false);
              return;
            })
      }
      }else{
          this.$message.warning("请填写编号!");
      }
      
    },
    clearData() {
      this.tableDatas.monitorHedgeCard = {};
      this.tableDatas.monitorFamilyMemberList.forEach((item) => {
        item.name = null;
        item.age = null;
        item.gender = null;
      });
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
::v-deep .is-disabled{
  .el-input__inner,.el-textarea__inner{
  color: #000 !important;
  }
} 
.l20{
    padding-left: 20px;
}
::v-deep .el-card__header {
.avoid-table ::v-deep .el-card__header {
  border: none !important;
    }
}
.header-title {
  display: flex;
  justify-content: center;
  color: #333;
  font-size: 20px;
}
.button-right {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
.top-input {
  padding: 10px;
}
.input-item {
  border-bottom: 2px solid #666;
  text-align: center;
}
.flex-1 {
  flex: 1;
}
.flex-2 {
  flex: 2;
}
.flex {
  display: flex;
}

.el-col {
  margin: 0 !important;
}
.text-center {
  display: flex;
  align-items: center;
  //   border: 1px solid #666;
  border-top: 1px solid #666;
  border-left: 1px solid #666;
  border-right: 1px solid #666;
  border-bottom: 1px solid #666;
  justify-content: center;
  // padding: 5px;
}
.text-center1{
    display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
}
.text-right {
  display: flex;
  align-items: center;
  // border: 1px solid #666;
  justify-content: flex-end;
}
.el-textarea {
  height: 100% !important;
  ::v-deep textarea {
    border: none !important;
    height: 100%;
    font-size: 12px !important;
  }
}
.el-input {
  height: 100%;
  ::v-deep .el-input__inner {
    border: none;
    height: 100% !important;
    font-size: 12px !important;
  }
}
.row-height {
  height: 40px;
  padding: 3px;
}
.row-height-6 {
  height: 240px;
  padding: 3px;
}
.row-height-2 {
  height: 80px;
  padding: 3px;
}
.row-height-3 {
  height: 120px;
  padding: 3px;
}
.avoid-table {
  padding: 50px 100px;
}
</style>

<style>
.border-top {
  border-top: 1px solid #666 !important;
}
.border-left {
  border-left: 1px solid #666 !important;
}
.border-right {
  border-right: 1px solid #666 !important;
}
.border-bottom {
  border-bottom: 1px solid #666 !important;
}
.border-1 {
  border: 1px solid #666;
}
.border-2 {
  border: 2px solid #666;
}
</style>
