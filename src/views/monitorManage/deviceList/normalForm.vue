<template>
  <div>
    <p class="bc_abn-describe">
      离线异常判断
      <el-input style="width: 200px" type="number" placeholder="请输入持续时间" min="0" v-model="form.duration"></el-input>
      <el-select style="width: 100px" v-model="form.timeUnit" placeholder="时间">
        <el-option label="小时" value="h" />
        <el-option label="分钟" value="m" />
      </el-select>
      <span style="width: 50px; margin-left: 10px">内出现</span>
      <el-input style="width: 200px" type="number" placeholder="请输入次数" min="0" v-model="form.offlineNum"></el-input>
      次及其以上的离线视为设备异常
    </p>
    <div slot="footer" class="dialog-footer" style="display: flex; justify-content: flex-end">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import {
    getOffline,
    addOffline
  } from "@/api/monitorManage/device";
  export default {
    props: ["normalIds"],
    data() {
      return {
        form: {
          duration: "",
          timeUnit: "",
          offlineNum: ""
        }
      }
    },
    watch: {
      normalIds: {
        handler(val) {
          if (val instanceof Array) {
            return;
          } else {
            getOffline(val).then(res => {
              if (res.data.data) {
                this.form = res.data.data;
              }
            })
          }
        },
        immediate: true
      }
    },
    methods: {
      submitForm() {
        if (this.form.duration != "" && this.form.timeUnit != "" && this.form.offlineNum != "") {
          addOffline({
            abnormalDeviceOfflineConfig: this.form,
            deviceIdList: this.normalIds instanceof Array ? this.normalIds : this.normalIds.split(",")
          }).then(res => {
            if (res.data.data) {
              this.$message.success("保存成功")
              this.$parent.$parent.normalShow = false;
            }
          })
        }
      },
      handleCancel() {
        this.$parent.$parent.normalShow = false;
      },
    }
  }

</script>

<style lang="scss" scoped>
  .bc_abn-describe {
    display: flex;
    align-items: center;

    ::v-deep.el-input {
      //   width: 75px;
      margin: 0 3px;
    }
  }

</style>
