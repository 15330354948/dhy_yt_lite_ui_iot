<template>
  <div>
    <div class="title">
      当前报表共导出<span>{{Array.isArray(deviceData) ? deviceData.length : deviceData}}</span>个监测设备
    </div>
    <div class="timeChoise">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="日期范围:" prop="dateTime">
          <el-col :span="11">
            <el-date-picker v-model="form.dateTime" type="date" align="right" value-format="yyyy-MM-dd" unlink-panels
              range-separator="至" placeholder="选择日期" :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="时间范围:" prop="timeValue">
          <el-col :span="11">
            <el-time-picker is-range v-model="form.timeValue" value-format="HH:mm:ss" range-separator="至"
              start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
            </el-time-picker>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn_right">
      <el-button type="success" @click="uploadBtn('form')" size="medium">导出</el-button>
    </div>

    <div class="yincang" v-if="loading" v-loading="loading" :element-loading-text="textLoading"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div>
  </div>
</template>

<script>
  import {
    shibao
  } from "@/api/monitorManage/quxian";

  export default {
    name: "uploadManyNew",
    props: ["deviceData"],
    data() {
      return {
        loading: false,
        form: {},
        pickerOptions: {
          shortcuts: [{
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              },
            },
          ],
        },
        textLoading: "建立链接中0%...",
        timerOFF: {},
        times: 0,
        rules: {
          dateTime: [{
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          timeValue: [{
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }]
        }
      };
    },
    watch: {},
    created() {
      console.log(this.deviceData);
      clearTimeout(this.timerOFF);
    },
    mounted() {},
    methods: {
      lunxun() {
        this.loading = true;
        this.timerOFF = setTimeout(() => {
          this.textLoading = "建立链接中" + this.times++ + "%...";
          // console.log(this.times)
          if (this.times >= 100) {
            clearTimeout(this.timerOFF);
          } else {
            this.lunxun();
          }
        }, 100);
      },
      uploadBtn(form) {
        var that = this;
        this.$refs[form].validate((valid) => {
          if (valid) {
            var list = {}
            if (Array.isArray(this.deviceData)) {
              list = {
                beginTime: this.form.timeValue[0],
                endTime: this.form.timeValue[1],
                dateTime: this.form.dateTime,
                ids: this.deviceData,
                sign: 0,
              };
            } else {
              list = {
                beginTime: this.form.timeValue[0],
                endTime: this.form.timeValue[1],
                dateTime: this.form.dateTime,
                sign: 0,
              };
            }

            this.times = 0;
            this.lunxun();
            console.log(list);
            shibao(list)
              .then((response) => {
                const blob = new Blob([response.data], {});
                let objectUrl = URL.createObjectURL(blob);
                let link = document.createElement("a");
                let fname = `导出文件.xlsx`;
                link.href = objectUrl;
                link.setAttribute("download", fname);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                this.$message({
                  type: "success",
                  message: "链接成功!",
                });
                setTimeout(() => {
                  this.times = 100;
                  this.loading = false;
                  this.$emit("closeUploadNew");
                }, 0);
              })
              .catch((res) => {
                that.loading = false;
                that.times = 0;
                clearTimeout(that.timerOFF);
                that.$message({
                  type: "warning",
                  message: "链接失败！",
                });
              });
          }
        })
        // if (this.timeValue !== "") {
        //   var list = {
        //     beginTime: this.timeValue[0],
        //     endTime: this.timeValue[1],
        //     ids: this.deviceData,
        //     sign: 0,
        //   };

        //   this.times = 0;
        //   this.lunxun();
        //   console.log(list);
        //   shibao(list)
        //     .then((response) => {
        //       const blob = new Blob([response.data], {});
        //       let objectUrl = URL.createObjectURL(blob);
        //       let link = document.createElement("a");
        //       let fname = `导出文件.xlsx`;
        //       link.href = objectUrl;
        //       link.setAttribute("download", fname);
        //       document.body.appendChild(link);
        //       link.click();
        //       link.parentNode.removeChild(link);
        //       this.$message({
        //         type: "success",
        //         message: "链接成功!",
        //       });
        //       setTimeout(() => {
        //         this.times = 100;
        //         this.loading = false;
        //         this.$emit("closeUploadNew");
        //       }, 0);
        //     })
        //     .catch((res) => {
        //       that.loading = false;
        //       that.times = 0;
        //       clearTimeout(that.timerOFF);
        //       that.$message({
        //         type: "warning",
        //         message: "链接失败！",
        //       });
        //     });
        // } else {
        //   this.$message({
        //     type: "warning",
        //     message: "请选择时间节点",
        //   });
        // }
      },
    },
    destroyed() {
      clearTimeout(this.timerOFF);
    },
  };

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
  }

  .time {
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
