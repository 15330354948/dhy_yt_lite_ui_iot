<template>
  <div class="isInstruct">
    <el-form
      ref="instructions"
      label-width="120px"
      class="inst-form"
      :rules="rules"
      :model="isInstructionsForm"
      size="mini"
    >
      <el-radio-group v-if="flag1" v-model="Type"  v-show="this.devdata[0].type != 'bjq_001'">
        <el-radio label="1" @change="handleChangeRate"
          >设置阀值相关参数</el-radio
        >
        <div style="margin-top: 20px">
          <el-radio-group v-model="Type2" :disabled="!isInstructionsForm.radio">
            <el-radio label="3" @change="handleChangeRate2">采样频率</el-radio>
            <el-row style="padding-top: 20px">
              <!-- <el-form-item :span="24" style="margin-left: -90px">
                倾角预警:
              </el-form-item> -->
              <!-- </el-col> -->
              <el-col :span="24">
                <el-form-item
                  :span="24"
                  class="is-required"
                  label="正常"
                  prop="samplingCycle"
                  ><el-input
                    v-model="isInstructionsForm.samplingCycle"
                    :disabled="!isInstructionsForm.report"
                    ><span slot="append">s/次</span></el-input
                  >
                </el-form-item>
              </el-col>
              <!-- <el-col :span="5">
                <el-form-item
                  :span="24"
                  class="is-required"
                  label="蓝色预警"
                  prop="angleThresholdLevel4"
                  ><el-input
                    v-model="isInstructionsForm.angleThresholdLevel4"
                    :disabled="!isInstructionsForm.report"
                    ><span slot="append">s/次</span></el-input
                  >
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  :span="24"
                  class="is-required"
                  label="黄色预警"
                  prop="angleThresholdLevel3"
                >
                  <el-col
                    ><el-input
                      v-model="isInstructionsForm.angleThresholdLevel3"
                      :disabled="!isInstructionsForm.report"
                      ><span slot="append">s/次</span></el-input
                    >
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  :span="24"
                  class="is-required"
                  label="橙色预警"
                  prop="angleThresholdLevel2"
                >
                  <el-col>
                    <el-input
                      v-model="isInstructionsForm.angleThresholdLevel2"
                      :disabled="!isInstructionsForm.report"
                      ><span slot="append">s/次</span></el-input
                    >
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  class="is-required"
                  label="红色预警"
                  prop="angleThresholdLevel1"
                >
                  <el-col :span="24"
                    ><el-input
                      v-model="isInstructionsForm.angleThresholdLevel1"
                      :disabled="!isInstructionsForm.report"
                      ><span slot="append">s/次</span></el-input
                    ></el-col
                  >
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-radio-group>
        </div>

        <div>
          <el-radio-group v-model="Type2" :disabled="!isInstructionsForm.radio">
            <el-radio label="4" @change="handleChangeRate3">上报频率</el-radio>
            <el-row>
              <!-- <el-form-item :span="24" style="margin-left: -90px">
              拉线预警:
            </el-form-item> -->
              <el-col :span="6">
                <el-form-item
                  :span="24"
                  class="is-required"
                  label="正常"
                  prop="statusCycle"
                  ><el-input
                    v-model="isInstructionsForm.statusCycle"
                    :disabled="!isInstructionsForm.report0"
                    ><span slot="append">s/次</span></el-input
                  >
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  :span="24"
                  class="is-required"
                  label="蓝色预警"
                  prop="statusCycleLevel4"
                  ><el-input
                    v-model="isInstructionsForm.statusCycleLevel4"
                    :disabled="!isInstructionsForm.report0"
                    ><span slot="append">s/次</span></el-input
                  >
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  :span="24"
                  class="is-required"
                  label="黄色预警"
                  prop="statusCycleLevel3"
                >
                  <el-col
                    ><el-input
                      v-model="isInstructionsForm.statusCycleLevel3"
                      :disabled="!isInstructionsForm.report0"
                      ><span slot="append">s/次</span></el-input
                    >
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  :span="24"
                  class="is-required"
                  label="橙色预警"
                  prop="statusCycleLevel2"
                >
                  <el-col>
                    <el-input
                      v-model="isInstructionsForm.statusCycleLevel2"
                      :disabled="!isInstructionsForm.report0"
                      ><span slot="append">s/次</span></el-input
                    >
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  class="is-required"
                  label="红色预警"
                  prop="statusCycleLevel1"
                >
                  <el-col :span="24"
                    ><el-input
                      v-model="isInstructionsForm.statusCycleLevel1"
                      :disabled="!isInstructionsForm.report0"
                      ><span slot="append">s/次</span></el-input
                    ></el-col
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-radio-group>
        </div>
      </el-radio-group>

      <el-radio-group v-model="Type" v-show="this.devdata[0].type == 'bjq_001'" style="width:100%">
        <el-radio label="2" @change="handleChangeRate1"
          >下发预警喇叭播报内容</el-radio
        >
        <div>
          <el-col style="padding-top: 20px" :span="12">
            <el-form-item label="播报次数:" prop="playTimes">
              <el-input
                size="mini"
                v-model="isInstructionsForm.playTimes"
                :disabled="!isInstructionsForm.report1"
                clearable
                placeholder="请输入播报次数"
                >><span slot="append">(次)</span></el-input
              >
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="播报内容:" prop="playContent">
              <el-input
                size="mini"
                type="textarea"
                :rows="4"
                v-model="isInstructionsForm.playContent"
                :disabled="!isInstructionsForm.report1"
                placeholder="请输入播报内容"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </div>
      </el-radio-group>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="display: flex; justify-content: flex-end"
    >
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </div>
</template>
<script>
import {
  isinstworn,
  isinst,
  statusCycleApi,
  isinstYl,
  statusCycleApiYl,
} from "@/api/monitorManage/device";
export default {
  name: "isInstruct",
  props: ["devdata", "flag"],
  watch: {
    devdata: {
      immediate: true,
      handler: function (newval) {
        this.devdata.code = newval[0].code;
        // console.log(this.devdata.code);
        this.reset();
      },
    },
    flag: {
      immediate: true,
      handler: function (newval) {
        if (newval) {
          this.flag1 = false;
        }
      },
    },
  },
  data() {
    return {
      flag1: true,
      Type: 0,
      Type2: 0,
      isInstructionsForm: {
        expire: 0,
        sn: undefined,
        playTimes: undefined,
        playContent: undefined,
        // restart: false,
        rate: false,
        report: false,
        report0: false,
        report1: false,
        radio: false,
        samplingCycle: undefined,
        // angleThresholdLevel1: undefined,
        // angleThresholdLevel2: undefined,
        // angleThresholdLevel3: undefined,
        // angleThresholdLevel4: undefined,
        statusCycle: undefined,
        statusCycleLevel1: undefined,
        statusCycleLevel2: undefined,
        statusCycleLevel3: undefined,
        statusCycleLevel4: undefined,
      },
      rules: {
        samplingCycle: [
          {
            message: "不能为空",
            trigger: "blur",
            required: true,
          },
        ],
        // angleThresholdLevel1: [
        //   {
        //     message: "不能为空",
        //     trigger: "blur",
        //     required: true,
        //   },
        // ],
        // angleThresholdLevel2: [
        //   {
        //     message: "不能为空",
        //     trigger: "blur",
        //     required: true,
        //   },
        // ],
        // angleThresholdLevel3: [
        //   {
        //     message: "不能为空",
        //     trigger: "blur",
        //     required: true,
        //   },
        // ],
        // angleThresholdLevel4: [
        //   {
        //     message: "不能为空",
        //     trigger: "blur",
        //     required: true,
        //   },
        // ],
        statusCycle: [
          {
            message: "不能为空",
            trigger: "blur",
            required: true,
          },
        ],
        statusCycleLevel1: [
          {
            message: "不能为空",
            trigger: "blur",
            required: true,
          },
        ],
        statusCycleLevel2: [
          {
            message: "不能为空",
            trigger: "blur",
            required: true,
          },
        ],
        statusCycleLevel3: [
          {
            message: "不能为空",
            trigger: "blur",
            required: true,
          },
        ],
        statusCycleLevel4: [
          {
            message: "不能为空",
            trigger: "blur",
            required: true,
          },
        ],
        playContent: [
          {
            message: "播报内容不能为空",
            trigger: "blur",
            required: true,
          },
        ],
        playTimes: [
          {
            message: "不能为空",
            trigger: "blur",
            required: true,
          },
        ],
      },
    };
  },

  created() {
    this.reset();
  },

  methods: {
    setData() {
      this.isInstructionsForm.sn = this.devdata.code;
      if (this.isInstructionsForm.rate == 3) {
        if (this.devdata[0].type == "yjl_001") {
          isinstYl(this.isInstructionsForm).then((v) => {
            if (v.data.code == 0) {
              this.$message.success(v.data.msg);
              this.$emit("handleCancel", "false");
            } else {
              this.$message.warning(v.data.msg);
            }
          });
        } else {
          isinst(this.isInstructionsForm).then((v) => {
            if (v.data.code == 0) {
              this.$message.success(v.data.msg);
              this.$emit("handleCancel", "false");
            } else {
              this.$message.warning(v.data.msg);
            }
          });
        }
      } else if (this.isInstructionsForm.rate == 4) {
        if (this.devdata[0].type == "yjl_001") {
          statusCycleApiYl(this.isInstructionsForm).then((v) => {
            if (v.data.code == 0) {
              this.$message.success(v.data.msg);
              this.$emit("handleCancel", "false");
            } else {
              this.$message.warning(v.data.msg);
            }
          });
        } else {
          statusCycleApi(this.isInstructionsForm).then((v) => {
            if (v.data.code == 0) {
              this.$message.success(v.data.msg);
              this.$emit("handleCancel", "false");
            } else {
              this.$message.warning(v.data.msg);
            }
          });
        }
      } else if (this.isInstructionsForm.rate == 2) {
        isinstworn(this.isInstructionsForm).then((v) => {
          if (v.data.code == 0) {
            this.$message.success(v.data.msg);
            this.$emit("handleCancel", "false");
          } else {
            this.$message.warning(v.data.msg);
          }
        });
      }
    },
    handleChangeRate(e) {
      this.isInstructionsForm.rate = e;
      this.isInstructionsForm.radio = true;
      this.isInstructionsForm.playTimes = undefined;
      this.isInstructionsForm.playContent = undefined;
      // this.isInstructionsForm.report = true;
      this.isInstructionsForm.report1 = false;
    },

    handleChangeRate1(e) {
      this.isInstructionsForm.rate = e;
      this.Type2 = 0;
      this.isInstructionsForm.radio = false;
      this.isInstructionsForm.report = false;
      this.isInstructionsForm.report0 = false;
      this.isInstructionsForm.report1 = true;
      this.isInstructionsForm.samplingCycle = undefined;
      this.isInstructionsForm.statusCycle = undefined;
      this.isInstructionsForm.statusCycleLevel1 = undefined;
      this.isInstructionsForm.statusCycleLevel2 = undefined;
      this.isInstructionsForm.statusCycleLevel3 = undefined;
      this.isInstructionsForm.statusCycleLevel4 = undefined;

      // this.isInstructionsForm.angleThresholdLevel1 = undefined;
      // this.isInstructionsForm.angleThresholdLevel2 = undefined;
      // this.isInstructionsForm.angleThresholdLevel3 = undefined;
      // this.isInstructionsForm.angleThresholdLevel4 = undefined;
    },
    handleChangeRate2(e) {
      this.isInstructionsForm.rate = e;
      this.isInstructionsForm.report = true;
      this.isInstructionsForm.report0 = false;
      this.isInstructionsForm.statusCycle = undefined;
      this.isInstructionsForm.statusCycleLevel1 = undefined;
      this.isInstructionsForm.statusCycleLevel2 = undefined;
      this.isInstructionsForm.statusCycleLevel3 = undefined;
      this.isInstructionsForm.statusCycleLevel4 = undefined;
    },
    handleChangeRate3(e) {
      this.isInstructionsForm.rate = e;
      this.isInstructionsForm.report0 = true;
      this.isInstructionsForm.report = false;
      this.isInstructionsForm.samplingCycle = undefined;
      this.isInstructionsForm.angleThresholdLevel1 = undefined;
      this.isInstructionsForm.angleThresholdLevel2 = undefined;
      this.isInstructionsForm.angleThresholdLevel3 = undefined;
      this.isInstructionsForm.angleThresholdLevel4 = undefined;
    },
    handleCancel(data) {
      // console.log(data,123456);
      this.reset();
      this.$emit("handleCancel", "false");
      this.$refs.instructions.clearValidate();
    },
    submitForm(formName) {
      if (this.$refs.instructions.$options.propsData.model.rate) {
        switch (this.$refs.instructions.$options.propsData.model.rate) {
          case "3":
            this.isInstructionsForm.playTimes = "";
            this.isInstructionsForm.playContent = "";
            this.setData();
            break;
          case "4":
            this.isInstructionsForm.samplingCycle = "";
            this.isInstructionsForm.angleThresholdLevel1 = "";
            this.isInstructionsForm.angleThresholdLevel2 = "";
            this.isInstructionsForm.angleThresholdLevel3 = "";
            this.isInstructionsForm.angleThresholdLevel4 = "";
            this.setData();
            break;
          case "2":
            if (
              this.isInstructionsForm.playTimes &&
              this.isInstructionsForm.playTimes
            ) {
              this.isInstructionsForm.samplingCycle = "";
              this.isInstructionsForm.angleThresholdLevel1 = "";
              this.isInstructionsForm.angleThresholdLevel2 = "";
              this.isInstructionsForm.angleThresholdLevel3 = "";
              this.isInstructionsForm.angleThresholdLevel4 = "";
              this.isInstructionsForm.statusCycle = "";

              this.isInstructionsForm.statusCycleLevel1 = "";
              this.isInstructionsForm.statusCycleLevel2 = "";
              this.isInstructionsForm.statusCycleLevel3 = "";
              this.isInstructionsForm.statusCycleLevel4 = "";
              this.setData();
            } else {
              this.$message.warning("请填写完整下发预警喇叭播报内容");
            }
            break;
          default:
            // this.requireobj.commandArgs = {};
            this.setData();
        }
      } else {
        this.$message.warning("请选择下发指令类型");
      }
    },
    reset() {
      this.isInstructionsForm.sn = "";
      this.isInstructionsForm.playTimes = undefined;
      this.isInstructionsForm.playContent = undefined;
      this.Type = 0;
      this.Type2 = 0;
      // this.isInstructionsForm.restart = false;

      this.isInstructionsForm.samplingCycle = undefined;
      this.isInstructionsForm.statusCycle = undefined;
      this.isInstructionsForm.radio = false;;
      this.isInstructionsForm.rate = false;
      this.isInstructionsForm.report = false;
      this.isInstructionsForm.report0 = false;
      this.isInstructionsForm.report1 = false;
      this.isInstructionsForm.angleThresholdLevel1 = undefined;
      this.isInstructionsForm.angleThresholdLevel2 = undefined;
      this.isInstructionsForm.angleThresholdLevel3 = undefined;
      this.isInstructionsForm.angleThresholdLevel4 = undefined;

      this.isInstructionsForm.statusCycleLevel1 = undefined;
      this.isInstructionsForm.statusCycleLevel2 = undefined;
      this.isInstructionsForm.statusCycleLevel3 = undefined;
      this.isInstructionsForm.statusCycleLevel4 = undefined;
    },
  },
};
</script>

<style lang="stylus" scoped></style>