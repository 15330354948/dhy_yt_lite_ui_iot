<template>
  <div class="isDatadel">
    <div class="bg_time">请选择时间：</div>
    <el-date-picker v-model="timeArr" type="datetimerange" align="right" unlink-panels :picker-options="pickerOptions"
      value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>
    <div class="footer_btn">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="save">确认</el-button>
    </div>
  </div>
</template>

<script>
  import {
    delMonitorData
  } from "@/api/monitorManage/sensor"
  export default {
    props: ['devData'],
    data() {
      return {
        timeArr: null,
        pickerOptions: {
          shortcuts: [{
            text: '最近三天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近五天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 5);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }],
          onPick: ({
            maxDate,
            minDate
          }) => {
            this.pickerMinDate = minDate.getTime()
            if (maxDate) {
              this.pickerMinDate = ''
            }
          },
          disabledDate: (time) => {
            if (this.pickerMinDate !== '') {
              const day7 = (7 - 1) * 24 * 3600 * 1000
              let maxTime = this.pickerMinDate + day7
              if (maxTime > new Date()) {
                maxTime = new Date()
              }
              return time.getTime() > maxTime
            }
            // return time.getTime() > Date.now()
            return time.getTime() >= (Date.now() - 24 * 60 * 60 * 1000 * 1)
          }
        },
      }
    },
    mounted() {},
    methods: {
      handleCancel() {
        this.$emit('isDataDelClose', true)
      },
      save() {
        console.log(this.devData);
        if (this.timeArr) {
          delMonitorData({
            beginTime: this.timeArr[0],
            endTime: this.timeArr[1],
            sensorNo: this.devData.sensorCode,
            type: this.devData.sensorType,
          }).then(res => {
            if (res.data.code == 0) {
              this.$message.success("删除成功");
            }
          })
          this.$emit('isDataDelClose', true)

        } else {
          this.$message.warning("请选择时间");
        }

      },
    }
  }

</script>

<style lang="scss" scoped>
  .bg_time {
    margin-bottom: 10px;
  }

  .footer_btn {
    display: flex;
    justify-content: flex-end;
    padding-top: 30px;
  }

</style>
