<template>
  <div>
    <div class="title">
      当前报表共导出<span>{{Array.isArray(deviceData) ? deviceData.length : deviceData}}</span>个监测设备
    </div>
    <div class="timeChoise">
      <span>请选择需要导出时间节点：</span>
      <div class="time">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-date-picker v-model="dayValue" :clearable="false" type="date" value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-col>
          <el-col :span="10">
            <el-time-picker v-model="timerAccuracy" default-value="2019/12/22 12:00:00" value-format="HH:mm:ss"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }" placeholder="时间点"></el-time-picker>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="btn_right">
      <el-button type="success" @click="uploadBtn" size="medium">导出</el-button>
    </div>

    <div class="yincang" v-if="loading" v-loading="loading" :element-loading-text="textLoading"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div>
  </div>
</template>

<script>
  import {
    getListOfDaily
  } from "@/api/monitorManage/quxian";

  export default {
    name: "uploadManyDay",
    props: ["deviceData"],
    data() {
      return {
        loading: false,
        dayValue: "",
        timerAccuracy: "12:00:00",
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
      };
    },
    watch: {},
    created() {
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
      uploadBtn() {
        var that = this;
        if (this.dayValue !== "") {
          var list = {}
          if (Array.isArray(this.deviceData)) {
            list = {
              nowDay: this.dayValue,
              nowTime: this.timerAccuracy,
              ids: this.deviceData,
              sign: 0,
            };
          } else {
            list = {
              nowDay: this.dayValue,
              nowTime: this.timerAccuracy,
              sign: 0,
            };
          }
          this.times = 0;
          this.lunxun();
          getListOfDaily(list)
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
        } else {
          this.$message({
            type: "warning",
            message: "请选择时间节点",
          });
        }
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
    display: flex;
    align-items: center;
  }

  .time {
    width: 60%;
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
