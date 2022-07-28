<template>
  <div>
    <div class="title">
      当前报表共导出<span>{{Array.isArray(deviceData) ? deviceData.length : deviceData}}</span>台监测设备，请选择下方的导出方式:
    </div>
    <div class="timeChoise">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="最大累计变化量获取方式:">
          <el-radio-group v-model="form.resource" @change="radioChange">
            <el-radio label="1">单日最大值变化值</el-radio>
            <el-radio label="2">固定时间变化值</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="日期范围:" prop="dataValue">
          <el-col :span="11">
            <el-date-picker v-model="form.dataValue" type="daterange" align="right" value-format="yyyy-MM-dd"
              unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="时间范围:" v-if="timeShow" prop="fixedTime">
          <el-col :span="11">
            <el-time-select v-model="form.fixedTime" :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }" placeholder="选择时间">
            </el-time-select>
          </el-col>
        </el-form-item>
        <!-- <el-form-item class="btn_right">
          <el-button type="success" @click="uploadBtn('form')" size="medium">导出</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="btn_right">
      <el-button type="success" @click="uploadBtn('form')" size="medium">导出</el-button>
    </div>

    <div class="yincang" v-if="loading" v-loading="loading" :element-loading-text="textLoading"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    </div>
  </div>
</template>

<script>
  import {
    upLoadDeviceData,
    upLoadDeviceDataNew1,
    upLoadDeviceDataNew2,
    upLoadDeviceDataNew3
  } from "@/api/monitorManage/quxian";
  import {
    mapGetters
  } from "vuex";
  export default {
    name: "uploadManyBox",
    props: ["deviceData"],
    data() {
      return {
        loading: false,
        timeShow: false,
        form: {
          resource: "1"
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        textLoading: "建立链接中0%...",
        timerOFF: {},
        times: 0,
        rules: {
          dataValue: [{
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          fixedTime: [{
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }]
        }
      }
    },
    watch: {},
    created() {
      clearTimeout(this.timerOFF)
    },
    mounted() {

    },
    computed: {
      ...mapGetters(["permissions", "projectId"]),
    },
    methods: {
      lunxun() {
        this.loading = true;
        this.timerOFF = setTimeout(() => {
          this.textLoading = "建立链接中" + this.times++ + "%...";
          // console.log(this.times) 
          if (this.times >= 100) {
            clearTimeout(this.timerOFF)
          } else {
            this.lunxun();
          }
        }, 100);
      },
      radioChange(e) {
        if (e == 2) {
          this.timeShow = true;
        } else {
          this.form.fixedTime = null
          this.timeShow = false;
        }
      },
      getfff(data) {
        upLoadDeviceDataNew2(data).then(response => {
            const blob = new Blob([response.data], {
              type: `application/zip`
            });
            let objectUrl = URL.createObjectURL(blob);
            let link = document.createElement("a");
            let fname = `监测数据报表.zip`;
            link.href = objectUrl;
            link.setAttribute("download", fname);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            this.$message({
              type: "success",
              message: "链接成功!"
            });
            setTimeout(() => {
              this.times = 100;
              this.loading = false;
              this.$emit("closeUploadMany");
            }, 0);
          })

      },
      uploadBtn(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            var list = {}
            if (Array.isArray(this.deviceData)) {
              list = {
                beginTime: this.form.dataValue[0],
                endTime: this.form.dataValue[1],
                fixedTime: this.form.fixedTime ? this.form.fixedTime : null,
                ids: this.deviceData,
                sign: 0,
                projectId: this.projectId
              }
            } else {
              list = {
                beginTime: this.form.dataValue[0],
                endTime: this.form.dataValue[1],
                fixedTime: this.form.fixedTime ? this.form.fixedTime : null,
                sign: 0,
                projectId: this.projectId
              }
            }
            this.times = 0;
            upLoadDeviceDataNew1(list).then(res => {
              if (res) {
                this.lunxun();
                this.getfff(list);
              } else {
                this.loading = false;
                this.$emit("closeUploadMany");
              }
            })
          }
        })
        // if (this.timeValue !== "") {
        //   var list = {
        //     beginTime: this.timeValue[0],
        //     endTime: this.timeValue[1],
        //     ids: this.deviceData,
        //     sign: 0,
        //     projectId: this.projectId
        //   }

        //   this.times = 0;
        //   this.lunxun();
        // upLoadDeviceData(list).then(response => {
        //   const blob = new Blob([response.data], {
        //     type: `application/zip`
        //   });
        //   let objectUrl = URL.createObjectURL(blob);
        //   let link = document.createElement("a");
        //   let fname = `多选监测数据统计报表.zip`;
        //   // let fname = `导出文件.zip`;
        //   link.href = objectUrl;
        //   link.setAttribute("download", fname);
        //   document.body.appendChild(link);
        //   link.click();
        //   link.parentNode.removeChild(link);
        //   this.$message({
        //     type: "success",
        //     message: "链接成功!"
        //   });
        //   setTimeout(() => {
        //     this.times = 100;
        //     this.loading = false;
        //     this.$emit("closeUpload");
        //   }, 0);
        // }).catch(res => {
        //   that.loading = false;
        //   that.times = 0;
        //   clearTimeout(that.timerOFF)
        //   that.$message({
        //     type: "warning",
        //     message: "链接失败！"
        //   })
        // })
        // } else {
        //   this.$message({
        //     type: "warning",
        //     message: "请选择时间节点"
        //   })
        // }
      },
    },
    destroyed() {
      clearTimeout(this.timerOFF);
    }
  }

</script>

<style lang="scss" scoped>
  .title {
    font-size: 18px;

    span {
      color: rgb(0, 132, 255);
    }
  }

  .timeChoise {
    padding-top: 20px;
    padding-bottom: 20px;
    // display: flex;
    // align-items: center;
  }

  .time {
    // width: 80%;
    margin-left: 20px;
  }

  .btn_right {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .yincang {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

</style>
<style>
  .alert_text {
    color: rgb(64, 93, 255);
  }

</style>
