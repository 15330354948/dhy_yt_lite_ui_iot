<template>
   <div class="bc_abnormal-main">
     <div class="bc_abnormal-dev-from">
      <el-form :inline="true" :model="offlineForm" class="demo-form-inline">
        <el-row>
          <el-col :span="8">
            <el-form-item label="行政区划">
              <el-input v-model="offlineForm.xzqh" placeholder="行政区划"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="监测点名称">
              <el-input v-model="offlineForm.monitorName" placeholder="监测点名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="点位名称">
              <el-input v-model="offlineForm.pointName" placeholder="点位名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="设备编号">
              <el-input v-model="offlineForm.deviceNo" placeholder="设备编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="abnormalSubmit">搜索</el-button>
              <el-button type="success" @click="abnormalReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column prop="monitorName" label="监测点名称" width="180" align="center"></el-table-column>
        <el-table-column prop="spotName" label="点位名称" width="180" align="center"></el-table-column>
        <el-table-column prop="deviceNo" label="设备编号" align="center"></el-table-column>
        <el-table-column prop="deviceType" label="设备类型" align="center"></el-table-column>
        <el-table-column prop="abnormalType" label="异常类型" align="center"></el-table-column>
        <el-table-column prop="dealStatus" label="当前处置状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <div>查看</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
   </div>
</template>

<script>
export default {
  data () {
    return {
      offlineForm:{
        xzqh: "",
        monitorName: "",
        pointName: "",
        deviceNo: ""
      },
      tableData: []
    };
  },

  computed: {},

  methods: {
    getAbnormalList() {

    },

    //  异常列表搜索
    abnormalSubmit() {

    },

    //重置异常数据列表
    abnormalReset() {
      this.offlineForm = {
        xzqh: "",
        monitorName: "",
        pointName: "",
        deviceNo: ""
      }
    }
   }
}
</script>
<style lang='scss' scoped>
.bc_abnormal-main{
  padding: 20px;
  height: 100%;
  overflow: hidden;

  ::v-deep.el-form-item__label{
    color: #fff;
  }

  ::v-deep.el-input__inner{
    background: transparent;
    color: #fff;
    border: 1px solid #fff;
  }

  ::v-deep.el-table{
    background: transparent;
  }

  ::v-deep.el-table::before{
    display: none;
  }

  ::v-deep.el-table__header thead tr {
    background: #eeeeee8d;
    color: #fff;
  }
  ::v-deep.el-table__header thead tr th {
    background: transparent;

  }
}
</style>

