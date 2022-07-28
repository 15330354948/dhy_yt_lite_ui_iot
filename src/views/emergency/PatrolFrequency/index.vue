<template>
  <div class="log">
    <!-- 数据异常设置弹窗 -->

    <div>
      <el-col :span="14">
        <avue-form v-model="errorForm" ref="errorForm" :option="errorDataOption" @submit="submit">
          <template slot="xGreater">
            <div>
              <el-col :span="16">
                <el-input v-model="data_x.greater" placeholder></el-input>
              </el-col>
              <el-col :span="8" class="form-item-label">天/次</el-col>
            </div>
          </template>

          <template slot="yGreater">
            <div>
              <el-col :span="10">
                <avue-form v-model="form"></avue-form>
              </el-col>
            </div>
          </template>

          <template slot="zGreater">
            <div>
              <el-col :span="16">
                <el-input v-model="data_z.greater" placeholder></el-input>
              </el-col>
              <el-col :span="8" class="form-item-label">天/次</el-col>
            </div>
          </template>
          <template slot="Sttiem">
            <div>
              <el-col :span="10">
                <avue-form v-model="form"></avue-form>
              </el-col>
            </div>
          </template>
          <template slot="fGreater">
            <div>
              <el-col :span="16">
                <el-input v-model="data_y.greater" placeholder></el-input>
              </el-col>
              <el-col :span="8" class="form-item-label">天/次</el-col>
            </div>
          </template>
          <template slot="timeFrame">
            <div>
              <el-col :span="16">
                <avue-form v-model="form"></avue-form>
              </el-col>
            </div>
          </template>
         <template slot="dGreater">
            <div>
              <el-col :span="16">
                <el-input v-model="data_d.greater" placeholder></el-input>
              </el-col>
              <el-col :span="8" class="form-item-label">天/次</el-col>
            </div>
          </template>
        </avue-form>
      </el-col>
    </div>
    <!-- <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false"
                        >确 定</el-button
                    >
                </span>
    </template>-->
  </div>
</template>

<script>
import {fetchList}from "@/api/PatrolFrequency/Patrolfrequency";
import { errorDataOption } from "@/const/crud/emergency/PatrolFrequency/Patrolfrequency";
export default {
  // components: { chartCom, jianceData },
  name: "log",
  data() {
    return {
      errorDataOption: errorDataOption,
      errorForm: {},
      data_x: {},
      data_y: {},
      data_z: {},
      data_d:{},
      form:{}
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    submit(){}
    //  handleEmpty2() {
    //         // this.data_x = {};
    //         // this.data_y = {};
    //         // this.data_z = {};
    //         // if (this.$refs.errorForm !== undefined) {
    //         //     this.$refs.errorForm.resetForm();
    //         // }
    //     },
    // handlError(row) {
    //   // this.sensorId = row.row.sensorId;
    // }
  }
};
</script>

<style lang="scss" scoped>
.el-textarea {
  border: 1px solid #f0f0f0;
}
.el-form-item__label {
  width: 130px;
}
.form-item-label {
  font-size: 14px;
  color: #606266;
}
.quick-query {
  span {
    margin: 0 5px;
  }
}
.quick-active {
  color: #409eff;
}
</style>
