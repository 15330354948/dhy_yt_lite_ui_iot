<!--
 * @Author: 张峻霖
 * @Date: 2021-07-08 16:32:31
 * @LastEditTime: 2021-07-09 17:28:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\views\monitorManage\deviceList\replaceEquipment.vue
-->
<template>
  <!-- 更换设备 -->
  <div class="replaceEquipment">
    <avue-form ref="form" v-model="data" :option="option" @submit="submit">
    </avue-form>
  </div>
</template>
<script>
  import {
    replaceEquipment
  } from "@/api/monitorManage/device";
  export default {
    name: "uploadAllBox",
    data() {
      return {
        oldData: {},
        data: {
          oldDeviceNo: "",
          newDeviceNo: "",
          deviceName: ""
        },
        option: {
          submitText: "确定",
          emptyBtn: false,
          column: [{
              label: "原设备编号",
              prop: "oldDeviceNo",
              span: 24,
              disabled: true,
            },
            {
              label: "新设备编号",
              prop: "newDeviceNo",
              span: 24,
            },
          ],
        },
      };
    },
    watch: {},
    created() {},
    mounted() {
      this.oldData = this.$parent.$parent.selectionData[0];
      this.data.oldDeviceNo = this.oldData.code;
      this.data.deviceName = this.oldData.name;
    },
    methods: {
      submit(form, done) {
        if (this.data.newDeviceNo.length == 0) {
          this.$message.warning("设备编号为空")
          done()
          return
        }
        this.$confirm("是否修改当前设备的编号？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            return replaceEquipment(this.data);
          })
          .then((data) => {
            this.$message.success("修改成功");
            this.$parent.$parent.refreshChange();
            this.$parent.$parent.$refs.crud.selectClear();
            setTimeout((e) => {
              this.$parent.$parent.getList();
              this.$parent.$parent.isReplaceEquipment = false;
            }, 500);
          });
        done();
      },
    },
  };

</script>

<style lang="scss" scoped>
  .replaceEquipment {
    padding-top: 20px;
    display: flex;
    align-items: center;

    ::v-deep.el-input.is-disabled .el-input__inner {
      color: #000;
      background-color: #fff;
      border: 0;
      font-size: 14px;
    }
  }

</style>
