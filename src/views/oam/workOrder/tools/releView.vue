<template>
  <div>
    <div>
      <div class="bTitle">基础信息</div>
      <el-row style="line-height: 40px">
        <el-col :span="12">
          <label class="el-form-item__label">工单标题:</label>
          {{ tabOption.title || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">期望完成时间:</label>
          {{ tabOption.expectCompleteTime || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">关联监测点:</label>
          {{ tabOption.monitorName || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">设备编号:</label>
          {{ tabOption.deviceCode || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">负责人员:</label>
          {{ tabOption.chargePersonName || "" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">参与人员:</label>
          {{ tabOption.joinPersonName }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">紧急程度:</label>
          {{ tabOption.urgencyDegree == 0 ? "一般" : tabOption.urgencyDegree == 1 ? "紧急" : "非常紧急" }}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">提醒方式:</label>
          {{ tabOption.msgMode == 1 ? "短信通知" : tabOption.msgMode == 2 ? "APP" : ""}}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">是否逾期:</label>
          {{ tabOption.isOverdue == 0 ? "正常" : tabOption.isOverdue == 1 ? "逾期" : ""}}
        </el-col>
        <el-col :span="12">
          <label class="el-form-item__label">逾期天数:</label>
          {{ tabOption.overdueDay ? tabOption.overdueDay : 0 }}天
        </el-col>
        <el-col :span="24">
          <label class="el-form-item__label">工单描述:</label>
          {{ tabOption.remark || "" }}
        </el-col>
        <el-col :span="24">
          <label class="el-form-item__label">附件:</label>
          <!-- {{ tabOption.files }} -->
          <el-upload class="upload-demo" ref="upload" :file-list="tabOption.fileInfoList" action=""
            :on-preview="handlePreviewInfo" disabled>
          </el-upload>
        </el-col>
      </el-row>
    </div>

    <div v-if="obj.jiedan && tabOption.faultState == 0 && tabOption.isCharge == 0 && permissions['release_point_jiedan']" style="padding-left:40%">
      <el-button type="primary" size="big" @click="jiedan">接 单</el-button>
    </div>

    <div v-show="obj.chuzhi && tabOption.isCharge==0 && permissions['release_point_chuzhi']">
      <div class="bTitle">处置情况</div>
      <el-form ref="poseForm" :model="poseForm" label-width="80px" :rules="poseRules">
        <el-form-item label="处置状态" prop="state">
          <el-radio-group v-model="poseForm.state">
            <el-radio :label="2">进行中</el-radio>
            <el-radio :label="3">已完成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="故障类别" prop="faultReason">
          <el-select v-model="poseForm.faultReason" placeholder="请选择故障类别">
            <el-option v-for="(item,index) in faultData" :key="index" :label="item.label" :value="item.dictValue ">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="remake">
          <el-input type="textarea" v-model="poseForm.remake" rows="3" maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <el-upload class="upload-demo" ref="upload" v-model="poseForm.files" :headers="headers" :action="baseUrlLoad"
            :on-remove="handleRemove1" :file-list="fileList1" :on-success="handleAvatarSuccess1">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button v-show="addFile" style="margin-left: 10px" size="small" type="success" @click="submitUpload">
              上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">
              支持格式：单个文件不能超过20MB
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormPose('poseForm')" size="big">提 交</el-button>
          <el-button @click="resetFormPose('poseForm')" size="big">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="padding: 0 0 20px 0">
      <div class="bTitle">工单进度</div>
      <div class="block">
        <el-timeline>
          <el-timeline-item v-for="(item, index) in tabOption.records" :key="index"
            :timestamp="item.createTime + ' ' + item.operationName" placement="top" size="large">
            <div v-show="item.state == 6" class="borsharw">
              <div class="chTitle">撤销并通过</div>
              <div>描述：{{ item.remake }}</div>
            </div>
            <div v-show="item.state == 5" class="borsharw">
              <div class="chTitle">核查通过</div>
              原因：{{ item.remake }}
              <div v-show="item.faultReaso || item.faultReason == 0">故障原因：{{ getFaultReason(item.faultReason) }}</div>
              <el-upload v-show="item.recordFiles" class="upload-demo" ref="upload" :file-list="item.files" action=""
                :on-preview="handlePreviewInfo" disabled>
              </el-upload>
            </div>
            <div v-show="item.state == 4" class="borsharw">
              <div class="chTitle">核查不通过</div>
              原因：{{ item.remake }}
              <div v-show="item.faultReason || item.faultReason == 0">故障原因：{{ getFaultReason(item.faultReason) }}</div>
              <el-upload v-show="item.recordFiles" class="upload-demo" ref="upload" :file-list="item.files" action=""
                :on-preview="handlePreviewInfo" disabled>
              </el-upload>
            </div>
            <div v-show="item.state == 3" class="borsharw">
              <div class="chTitle">已完成</div>
              <div v-show="item.faultReason || item.faultReason == 0">故障原因：{{ getFaultReason(item.faultReason) }}</div>
              <div>描述：{{ item.remake }}</div>
              <el-upload v-show="item.recordFiles" class="upload-demo" ref="upload" :file-list="item.files" action=""
                :on-preview="handlePreviewInfo" disabled>
              </el-upload>
            </div>
            <div v-show="item.state == 2" class="borsharw">
              <div class="chTitle">进行中</div>
              <div v-show="item.faultReason || item.faultReason == 0">故障原因：{{ getFaultReason(item.faultReason) }}</div>
              <div>描述：{{ item.remake }}</div>
              <el-upload v-show="item.recordFiles" class="upload-demo" ref="upload" :file-list="item.files" action=""
                :on-preview="handlePreviewInfo" disabled>
              </el-upload>
            </div>
            <div v-show="item.state == 1" class="borsharw">
              <div class="chTitle">已接单</div>
            </div>
            <div v-show="item.state == 0" class="borsharw">
              <div class="chTitle">发布工单</div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <!-- <div v-if="obj.chexiao" style="padding-left:40%">
      <el-button type="primary" size="big" @click="chexiao">撤销</el-button>
    </div> -->

    <div v-if="obj.shenhe && permissions['release_point_shenhe']">
      <div class="bTitle">审核</div>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="核查状态" prop="state">
          <el-radio-group v-model="form.state">
            <el-radio :label="5">核查通过</el-radio>
            <el-radio :label="4">核查不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="原因" prop="remake">
          <el-input type="textarea" v-model="form.remake" rows="3" maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <el-upload class="upload-demo" ref="upload" v-model="form.files" :headers="headers" :action="baseUrlLoad"
            :on-success="handleAvatarSuccess2" :on-remove="handleRemove2" :file-list="fileList2">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button v-show="addFile" style="margin-left: 10px" size="small" type="success" @click="submitUpload">
              上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">
              支持格式：单个文件不能超过20MB
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" size="big">提 交</el-button>
          <el-button @click="resetForm('form')" size="big">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {
    getFaults,
    accept,
    handle,
    infoOrder,
    getFiles,
    revoke
  } from "@/api/workOrder/release.js";
  import {
    baseUrl
  } from "@/config/env";
  import {
    mapGetters
  } from "vuex";
  import store from "@/store";
  export default {
    props: ["tabOption", "obj"],
    computed: {
      ...mapGetters(["permissions", "access_token", "projectId"]),
      headers: function () {
        return {
          Authorization: "Bearer " + store.getters.access_token,
        };
      },
    },
    data() {
      return {
        baseUrlLoad: baseUrl + "/file/upload",
        fileInfoList: [],
        fileList1: [],
        fileList2: [],
        addFile: false,
        rules: {
          state: [{
            required: true,
            message: "请选择审核状态",
            trigger: "change"
          }, ],
          remake: [{
            required: true,
            message: "请填写原因",
            trigger: "blur"
          }],
        },
        poseRules: {
          state: [{
            required: true,
            message: "请选择处置状态",
            trigger: "change"
          }, ],
          faultReason: [{
            required: true,
            message: "请选择处置类别",
            trigger: "change"
          }, ],
          remake: [{
            required: true,
            message: "请填写原因",
            trigger: "blur"
          }],
        },
        form: {
          state: 5,
          remake: "",
          files: []
        },
        poseForm: {
          state: "",
          faultReason: "",
          remake: '',
          files: []
        },
        activities: [],
        faultData: []
      };
    },
    mounted() {
      this.getfaultData();
    },
    watch: {
      tabOption: {
        handler(val) {
          if (val) {
            val.records.forEach(item => {
              if (item.recordFiles.length > 0) {
                // if (item.recordFiles instanceof Array) {
                getFiles({
                  fileIdList: item.recordFiles.join(',')
                }).then(res => {
                  res.data.data.forEach(item => {
                    item.name = item.originalName;
                    item.url = item.netUrl;
                  })
                  this.$set(item, "files", res.data.data)
                })
                // }
              }
            })
          }
        },
        immediate: true
      }
    },
    methods: {
      jiedan() {
        accept(this.tabOption.id).then(res => {
          if (res.data.code == 0) {
            // this.obj.chuzhi = true;
            this.obj.jiedan = false;
            // this.$parent.$parent.handleView(this.tabOption);
            this.$parent.$parent.isDetail = false;
            this.$parent.$parent.getList();;
            this.$message.success("接单成功");
          }
        })
      },
      // chexiao() {
      //   revoke(this.tabOption.id).then(res => {
      //     if (res.data.code == 0) {
      //       this.$message.success("撤销成功");
      //       this.$parent.$parent.isDetail = false;
      //       this.$parent.$parent.getList();
      //     }
      //   })
      // },
      getfaultData() {
        getFaults().then(res => {
          this.faultData = res.data.data;
        })
      },
      getFaultReason(data) {
        let t;
        this.faultData.forEach(item => {
          // console.log(item);
          if (item.dictValue == data) {
            t = item.label;
          }
        })
        return t
      },
      submitForm(form) {
        console.log(this.obj);
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.form.files instanceof Array) {
              this.form.files = this.form.files.join(',')
            }
            handle(Object.assign({
              workOrderId: this.tabOption.id,
              revokeStatus: this.obj.revokeStatus ? 1 : null
            }, this.form)).then(res => {
              if (res.data.code == 0) {
                this.$message.success("操作成功");
                this.$parent.$parent.isDetail = false;
                this.$parent.$parent.getList();
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(form) {
        this.$refs['form'].resetFields();
      },
      submitFormPose(form) {
        this.$refs['poseForm'].validate((valid) => {
          if (valid) {
            if (this.poseForm.files instanceof Array) {
              this.poseForm.files = this.poseForm.files.join(',')
            }
            handle(Object.assign({
              workOrderId: this.tabOption.id
            }, this.poseForm)).then(res => {
              if (res.data.code == 0) {
                this.$message.success("处置成功");
                this.$parent.$parent.isDetail = false;
                this.$parent.$parent.getList();
              }
            })
          } else {
            return false;
          }
        });
      },
      resetFormPose(form) {
        this.$refs['poseForm'].resetFields();
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove1(file, fileList) {
        this.poseForm.files.map((item, i) => {
          if (item == file.response.data.infos[0].id) {
            this.poseForm.files.splice(i, 1)
          }
        })
      },
      handleRemove2(file, fileList) {
        this.form.files.map((item, i) => {
          if (item == file.response.data.infos[0].id) {
            this.form.files.splice(i, 1)
          }
        })
      },
      handleAvatarSuccess1(res, file) {
        this.poseForm.files.push(res.data.infos[0].id);
      },
      handleAvatarSuccess2(res, file) {
        this.form.files.push(res.data.infos[0].id);

      },
      handlePreviewInfo(file) {
        if (!file.url) {
          this.$message.error('下载失败')
          return
        }
        // 判断文件类型
        if (file.fileType === 'doc' || file.fileType === 'docx' || file.fileType === 'xlsx' || file.fileType ===
          'xls' || file.fileType ===
          'ppt' || file.fileType ===
          'pptx') {
          // 在当前浏览器直接下载
          document.location.href = file.url
        } else {
          // 图片在浏览器打开 新的页面展示
          window.open(file.url, 'hello')
        }
      }
    },
  };

</script>
<style scoped>
  .bTitle {
    font-weight: bold;
    margin-left: -7%;
    margin-top: -10px;
    font-size: 16px;
  }

  .borsharw {
    padding: 5px 20px;
    margin: 0 20px;
    box-shadow: 0 0 3px rgb(212, 210, 210);
  }

  .chTitle {
    padding: 10px;
    font-weight: bold;
  }

  .block {
    height: 180px;
    overflow-y: scroll;
  }

  .el-card__body {
    padding: 0 !important;
  }

</style>
