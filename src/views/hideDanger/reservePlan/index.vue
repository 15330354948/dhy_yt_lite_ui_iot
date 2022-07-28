<template>
  <div class="reserve-plan field_data">
    <div class="field_data__tree">
      <p class="field_data__title">预案</p>
      <!-- v-if="permissions.disaster_prevention_plan_edit" -->
      <div class="button-right" v-if="permissions.JCD_detail_reservePlan_edit&&isEditTpl">
        <el-button v-if="!isSave" icon="el-icon-edit" @click="editForm">编辑</el-button>
        <el-button v-else icon="el-icon-check" @click="saveForm" type="primary">保存</el-button>
      </div>
      <el-form action="" :model="formData" v-loading="isLoading">
        <div class="table-content" v-if="!isLoading">
          <el-row class="">
            <el-col :span="4">
              <el-row class="row-height text-center">名称</el-row>
              <!-- <el-row class="row-height text-center">威胁人口(人)</el-row> -->
              <el-row class="row-height text-center">野外编号</el-row>
              <el-row class="row-height text-center">统一编号</el-row>
            </el-col>
            <el-col :span="6">
              <el-row class="row-height text-center">
                <el-input :disabled="!isSave" v-model="formData.name"></el-input>
              </el-row>
              <el-row class="row-height text-center">
                <el-input :disabled="!isSave" v-model="formData.outdoorCode"></el-input>
              </el-row>
              <el-row class="row-height text-center">
                <el-input :disabled="!isSave" v-model="formData.unifiedCode"></el-input>
              </el-row>
            </el-col>
            <el-col :span="1" class="row-height-3 text-center">地理<br />位置</el-col>
            <el-col :span="13">
              <el-row>
                <el-col :span="5" class="row-height text-center">
                  <el-input :disabled="!isSave" v-model="formData.countyName"></el-input>
                </el-col>
                <el-col :span="3" class="row-height text-center">区/县</el-col>
                <el-col :span="6" class="row-height text-center">
                  <el-input :disabled="!isSave" v-model="formData.streetName"></el-input>
                </el-col>
                <el-col :span="2" class="row-height text-center">街道</el-col>
                <el-col :span="6" class="row-height text-center">
                  <el-input :disabled="!isSave" v-model="formData.communityName"></el-input>
                </el-col>
                <el-col :span="2" class="row-height text-center">社区</el-col>
              </el-row>
              <el-row>
                <el-col :span="4" class="row-height text-center">坐标</el-col>
                <el-col :span="2" class="row-height text-center">X</el-col>
                <el-col :span="8" class="row-height text-center">
                  <el-input :disabled="!isSave" onkeyup="value=value.replace(/[^\d]/g,'')" size="max"
                    v-model="formData.x"></el-input>
                </el-col>
                <el-col :span="2" class="row-height text-center">Y</el-col>
                <el-col :span="8" class="row-height text-center">
                  <el-input :disabled="!isSave"  onkeyup="value=value.replace(/[^\d]/g,'')" size="max"
                    v-model="formData.y"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="3" class="row-height text-center">经度</el-col>
                <el-col :span="9" class="row-height text-center">
                  <el-input :disabled="!isSave"  onkeyup="value=value.replace(/[^\d]/g,'')" size="max"
                    v-model="formData.longitude"></el-input>
                </el-col>
                <el-col :span="3" class="row-height text-center">纬度</el-col>
                <el-col :span="9" class="row-height text-center">
                  <el-input :disabled="!isSave" onkeyup="value=value.replace(/[^\d]/g,'')" size="max"
                    v-model="formData.latitude"></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="">
            <el-col :span="4">
              <el-row class="row-height text-center">监测点类型</el-row>
            </el-col>
            <el-col :span="6">
              <el-row class="row-height text-center">
                <el-input :disabled="!isSave" v-model="formData.monitorType"></el-input>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row class="row-height text-center">
                规模及规模等级
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row class="row-height text-center">
                <el-input :disabled="!isSave" v-model="formData.scaleAndScaleGrade"></el-input>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="">
            <el-col :span="4">
              <el-row class="row-height text-center">威胁人口(人)</el-row>
            </el-col>
            <el-col :span="2">
              <el-row class="row-height text-center">
                <el-input :disabled="!isSave" onkeyup="value=value.replace(/[^\d]/g,'')" size="max"
                  v-model="formData.threatenPeopleNumber"></el-input>
              </el-row>
            </el-col>
            <el-col :span="2">
              <el-row class="row-height text-center">威胁财产(万元)</el-row>
            </el-col>
            <el-col :span="3">
              <el-row class="row-height text-center">
                <el-input :disabled="!isSave" onkeyup="value=value.replace(/[^\d]/g,'')" size="max"
                  v-model="formData.threatenProperty"></el-input>
              </el-row>
            </el-col>
            <el-col :span="2">
              <el-row class="row-height text-center">威胁等级</el-row>
            </el-col>
            <el-col :span="3">
              <el-row class="row-height text-center">
                <el-input :disabled="!isSave" v-model="formData.disasterLevel"></el-input>
              </el-row>
            </el-col>
            <el-col :span="4">
              <el-row class="row-height text-center">曾经发生灾害时间</el-row>
              <!-- historyDisasterTime -->
            </el-col>
            <el-col :span="4">
              <el-row class="row-height text-center">
                <el-date-picker prefix-icon='clear-icon' value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
                  placeholder="" v-model="formData.historyDisasterTime" :disabled="!isSave"></el-date-picker>
              </el-row>
            </el-col>
            <!-- <el-col :span="2">
              <el-row class="row-height text-center">
                <el-input :disabled="!isSave" v-model="formData.year"></el-input>
              </el-row>
            </el-col>
            <el-col :span="1">
              <el-row class="row-height text-center">年</el-row>
            </el-col>
            <el-col :span="1">
              <el-row class="row-height text-center">
                <el-input :disabled="!isSave" v-model="formData.month"></el-input>
              </el-row>
            </el-col>
            <el-col :span="1">
              <el-row class="row-height text-center">月</el-row>
            </el-col>
            <el-col :span="2">
              <el-row class="row-height text-center">
                <el-input :disabled="!isSave" v-model="formData.day"></el-input>
              </el-row>
            </el-col>
            <el-col :span="1">
              <el-row class="row-height text-center">日</el-row>
            </el-col> -->
          </el-row>
          <el-row class="">
            <el-col :span="4">
              <el-row class="text-center row-height-3">地质环境条件</el-row>
              <el-row class="text-center row-height-3">变形特征及活<br />动历史</el-row>
              <el-row class="text-center row-height-2">稳定性分析</el-row>
              <el-row class="text-center row-height">引发因素</el-row>
              <el-row class="text-center row-height">潜在危害</el-row>
              <el-row class="text-center row-height">临灾状态预测</el-row>
              <el-row class="text-center row-height">监测责任人</el-row>
              <el-row class="text-center row-height">报警方法</el-row>
              <el-row class="text-center row-height">预定避灾地点</el-row>
              <el-row class="text-center row-height-2">防治建议</el-row>
            </el-col>
            <el-col :span="20">
              <el-row class="text-center row-height-3">
                <el-input :disabled="!isSave" v-model="formData.geologyEnvironment" :rows="5" type="textarea"
                  placeholder=""></el-input>
              </el-row>
              <el-row class="text-center row-height-3">
                <el-input :disabled="!isSave" v-model="formData.deformationFeature" :rows="5" type="textarea"
                  placeholder=""></el-input>
              </el-row>
              <el-row class="text-center row-height-2">
                <el-input :disabled="!isSave" v-model="formData.stabilityAnalysis" type="textarea" :rows="3"
                  placeholder="">
                </el-input>
              </el-row>
              <el-row class="text-center row-height">
                <el-input :disabled="!isSave" v-model="formData.triggerFactors" type="textarea" :rows="1"
                  placeholder="">
                </el-input>
              </el-row>
              <el-row class="text-center row-height">
                <el-input :disabled="!isSave" v-model="formData.potentialHazard" type="textarea" :rows="1"
                  placeholder="">
                </el-input>
              </el-row>
              <el-row>
                <el-col :span="5" class="text-center row-height">
                  <el-input :disabled="!isSave" v-model="formData.impendingDisasterStatePrediction" placeholder="">
                  </el-input>
                </el-col>
                <el-col :span="2" class="text-center row-height">监测方法</el-col>
                <el-col :span="5" class="text-center row-height">
                  <el-input :disabled="!isSave" v-model="formData.monitoringMethod" placeholder=""></el-input>
                </el-col>
                <el-col :span="2" class="text-center row-height">监测周期</el-col>
                <el-col :span="10" class="text-center row-height">
                  <el-input :disabled="!isSave" v-model="formData.monitoringPeriod" placeholder=""></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5" class="text-center row-height">
                  <el-input :disabled="!isSave" v-model="formData.monitoringResponsiblePerson" placeholder="">
                  </el-input>
                </el-col>
                <el-col :span="2" class="text-center row-height">电话</el-col>
                <el-col :span="5" class="text-center row-height">
                  <el-input :disabled="!isSave" v-model="formData.monitoringResponsiblePersonPhone" placeholder=""
                    oninput="value=value.replace(/[^0-9.]/g,'')" maxlength="11"></el-input>
                </el-col>
                <el-col :span="2" class="text-center row-height">群测群防人员</el-col>
                <el-col :span="4" class="text-center row-height">
                  <el-input :disabled="!isSave" v-model="formData.qcqfPerson" placeholder=""></el-input>
                </el-col>
                <el-col :span="2" class="text-center row-height">电话</el-col>
                <el-col :span="4" class="text-center row-height">
                  <el-input :disabled="!isSave" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')" size="max"
                    v-model="formData.qcqfPersonPhone" placeholder=""></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5" class="text-center row-height">
                  <el-input :disabled="!isSave" v-model="formData.warnMethod" placeholder=""></el-input>
                </el-col>
                <el-col :span="2" class="text-center row-height">报警信号</el-col>
                <el-col :span="5" class="text-center row-height">
                  <el-input :disabled="!isSave" v-model="formData.warnSignal" placeholder=""></el-input>
                </el-col>
                <el-col :span="2" class="text-center row-height">报警人</el-col>
                <el-col :span="4" class="text-center row-height">
                  <el-input :disabled="!isSave" v-model="formData.warnPerson" placeholder=""></el-input>
                </el-col>
                <el-col :span="2" class="text-center row-height">电话</el-col>
                <el-col :span="4" class="text-center row-height">
                  <el-input :disabled="!isSave" v-model="formData.warnPersonPhone" placeholder="" maxlength="11"
                    onkeyup="value=value.replace(/[^\d]/g,'')" size="max"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5" class="text-center row-height">
                  <el-input :disabled="!isSave" v-model="formData.intendedPlace" placeholder=""></el-input>
                </el-col>
                <el-col :span="2" class="text-center row-height">人员撤离路线</el-col>
                <el-col :span="17" class="text-center row-height">
                  <el-input :disabled="!isSave" v-model="formData.evacuationRoute" placeholder=""></el-input>
                </el-col>
              </el-row>
              <el-row class="text-center row-height-2">
                <el-input :disabled="!isSave" v-model="formData.controlSuggestion" type="textarea" :rows="3"
                  placeholder="">
                </el-input>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="border-1 table-bottom">
            <div class="row-height">
              <span>示意图 : </span><br /> (监测点平、剖面图及人员撤离路线图)
            </div>
            <el-row class="row-height-5 flex">
              <div class="img-box">
                <div class="img-item" v-for="(item, index) in imgArray" :key="item.id">
                  <img :class="{
                      'active-img': index == currentImgIndex && toView,
                    }" :src="item.url" alt="" @click="imgClick(index)" />
                  <div class="el-icon-delete delete-img" v-if="isSave" @click="deleteImg(index)"></div>
                </div>
                <el-upload class="avatar-uploader img-item" :action="uploadUrl" :on-success="uploadSuccess"
                  :headers="header" :before-upload="beforeUpload" :show-file-list="false" :disabled="!isSave"
                  v-if="isSave">
                  <!-- <div slot="tip" class="el-upload__tip">只能上传JPG、PNG、JPEG文件，且不超过500kb</div> -->
                  <i class="el-icon-plus avatar-uploader-icon"></i></el-upload>
              </div>
            </el-row>
          </el-row>
          <el-row>
            <el-col :span="3" class="row-height text-right">调查负责人:</el-col>
            <el-col :span="5" class="row-height text-right">
              <el-input :disabled="!isSave" v-model="formData.surveyResponsiblePerson" placeholder=""></el-input>
            </el-col>
            <el-col :span="3" class="row-height text-right">填表人:</el-col>
            <el-col :span="5" class="row-height text-right">
              <el-input :disabled="!isSave" v-model="formData.fillTablePerson" placeholder=""></el-input>
            </el-col>
            <el-col :span="3" class="row-height text-right">审核人:</el-col>
            <el-col :span="5" class="row-height text-right">
              <el-input :disabled="!isSave" v-model="formData.auditPerson" placeholder=""></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" class="row-height text-right">填表日期:</el-col>
            <el-col :span="5" class="row-height text-right block">
              <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder=""
                v-model="formData.createTime" :disabled="!isSave"></el-date-picker>
            </el-col>
            <el-col :span="3" class="row-height text-right">调查单位:</el-col>
            <el-col :span="13" class="row-height text-right">
              <el-input :disabled="!isSave" v-model="formData.surveyUnit" placeholder=""></el-input>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from "vuex";
  import store from "@/store";
  import {
    baseUrl
  } from "@/config/env";
  import {
    editPageList,
    qcqfPersonData
  } from "@/api/hideDanger/obj";
  import {
    reservePlanData,
    reservePlanUpdate,
    dictionary,
    imgFile,
  } from "@/api/reservePlan";
  export default {
    data() {
      return {
        isSave: false,
        formData: {},
        readOnlyList: {},
        disasterType: [], //监测点类型
        levelType: [], //规模等级,
        level: null,
        uploadUrl: baseUrl + "/file/upload",
        imgArray: [],
        currentImgIndex: null,
        toView: false,
        isLoading: false,
        isMap: null,
        qcqfName: null,
        qcqfPhone: null,
        isEditTpl: true,
      };
    },
    // "openTab", "mapOpenTab"
    props: ["dialogFormVisible", "disasterBase"],
    watch: {
      dialogFormVisible(val) {
        this.isSave = false;
        this.clearForm();
      },
      disasterBase(val) {
        this.disasterBase = val
        this.getFormData();
      },
    },
    computed: {
      ...mapGetters(["permissions", "access_token"]),
      header() {
        return {
          Authorization: "Bearer " + store.getters.access_token
        };
      },
    },
    created() {
      this.getType("disaster_type");
      this.getTypes();
      // setTimeout((v) => {
      this.getFormData();
      // }, 200);
    },
    methods: {
      beforeUpload(file) {
        let testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
        const type =
          testmsg === "jpg" || testmsg === "png" || testmsg === "jpge" ?
          true :
          false;
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!type) {
          this.$message.error("上传图片只能是 JPG、PNG、JPEG格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 20MB!");
        }
        return type && isLt2M;
      },
      deleteImg(n) {
        this.$confirm("确认删除该图片？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.imgArray.splice(n, 1);
        });
      },
      uploadSuccess(res, file) {
        this.imgArray.push(
          Object.assign({}, {
            url: res.data.infos[0].url,
            id: res.data.infos[0].id
          })
        );
      },
      async getType(type) {
        const typeData = await new Promise((resolve, reject) => {
          dictionary(type).then((res) => {
            resolve(res.data.data);
          });
        });
        return typeData;
      },
      saveForm() {
        this.formData.diagram = this.imgArray
          .map((item) => {
            return item.id;
          })
          .join(",");
        this.formData.monitorId = this.disasterBase.id
        // this.formData.id = this.disasterBase.id
        //   ? this.$store.getters.analysisDetails.data.data.id
        //   : JSON.parse(window.sessionStorage.getItem("disasterData")).id;
        // console.log('保存',this.formData)
        reservePlanUpdate(this.formData)
          .then((res) => {
            this.isSave = false;
            this.$message.success("操作成功!");
            this.getFormData()
          })
          .catch((err) => {
            this.$message.error(err);
          });
      },
      editForm() {
        this.isSave = true;
      },
      getTypes() {
        this.getType("disaster_type").then((type) => {
          this.disasterType = type;
        });
        this.getType("level_type").then((type) => {
          this.levelType = type;
        });
      },
      getFormData() {
        this.imgArray = [];
        //   ? this.$store.getters.analysisDetails.data.data
        //   : JSON.parse(window.sessionStorage.getItem("disasterData"));
        //   ? this.$store.getters.analysisDetails.data.data;
        this.level = this.readOnlyList.level ? this.readOnlyList.level : null;
        let that = this;
        let id = that.disasterBase.id;
        reservePlanData({
          monitorId: id || that.formData.monitorId
        }).then((res) => {
          // that.readOnlyList = res.data.data ? res.data.data : {};
          if (res.data.data.records.length > 0) {
            that.formData = res.data.data.records ? res.data.data.records[0] : {};
            let ids =
              that.formData && that.formData.diagram ? that.formData.diagram : null;
            ids ? that.getImgFile(ids) : (that.isLoading = false);
          }

        });
      },
      getImgFile(ids) {
        imgFile(ids)
          .then((res) => {
            this.imgArray = [];
            if (res.data.data) {
              res.data.data.forEach((item) => {
                this.imgArray.push(
                  Object.assign({}, {
                    url: item.netUrl,
                    id: item.id
                  })
                );
                this.isLoading = false;
              });
            }
          })
          .catch((err) => {
            this.imgArray = [];
            this.$message.error("图片加载失败！");
            this.isLoading = false;
          });
      },
      imgClick(n) {
        this.currentImgIndex = n;
        this.toView = !this.toView;
      },
      clearForm() {
        this.readOnlyList = {};
        this.formData = {};
      },
    },
  };

</script>
<style lang="scss" scoped>
  .top-input {
    padding: 10px;
  }

  .input-item {
    border-bottom: 2px solid #666;
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

  .text-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  ::v-deep .el-textarea.is-disabled .el-textarea__inner {
    color: #000 !important;
  }

  ::v-deep .el-input.is-disabled .el-input__inner {
    color: #000 !important;
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

  .el-input {
    height: 100%;

    :deep .el-input__inner {
      border: none;
      height: 100% !important;
      font-size: 12px !important;
    }
  }

  .row-height {
    height: 40px;
    padding: 3px;
  }

  .row-height-5 {
    height: 200px;
    padding: 3px;
  }

  .row-height-4 {
    height: 160px;
    padding: 3px;
  }

  .row-height-3 {
    height: 120px;
    padding: 3px;
  }

  .row-height-2 {
    height: 80px;
    padding: 3px;
  }

  .el-cascader.color_dark {
    :deep .el-input__inner::-webkit-input-placeholder {
      color: #606266;
    }

    :deep .el-input__inner::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #606266;
    }

    :deep .el-input__inner:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #606266;
    }

    :deep .el-input__inner:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #606266;
    }
  }

  th {
    width: 22%;
    font-weight: normal;
    word-wrap: break-word;
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

  // .field_data__tree{
  //   overflow-y: auto;
  //   width: 100%;
  //   padding: 40px 80px;
  // }

</style>

<style lang="scss">
  .img-box {
    height: 100%;
    width: 100%;
  }

  // .img-item:nth-last-child(4){margin-right: 0;}
  .img-item {
    width: 22%;
    height: 178px;
    line-height: 178px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    float: left;
    margin-right: 3%;
    margin-bottom: 5px;

    img {
      height: 178px;
      width: 178px;
    }

    .active-img {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      z-index: 900;
      padding: 25px;
    }

    .delete-img {
      height: 20px;
      width: 178px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #999;
    }

    .delete-img:hover {
      color: salmon;
    }
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
      overflow-y: auto;
      width: 100%;
      padding: 40px 80px;
      padding-top: 3px;

      .button-right {
        display: flex;
        justify-content: flex-end;
        padding: 10px;
      }
    }
  }

  .avue-tree .el-tree {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 55vh;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100% !important;
  }

</style>
