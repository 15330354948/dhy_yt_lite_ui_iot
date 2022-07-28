<template>
  <div class="bc_abn-order-main">
    <div class="bc_spike-title">
      <p class="bc_abn-tits">{{abnData.navTitle}}
        <el-switch v-model="isMonitorOpen"></el-switch>
      </p>
      <p class="bc_abn-tips">提示：{{abnData.toolPromptList[toolType]}}</p>
    </div>
    <div class="bc_abn-order">
      <el-table :data="orderTableData" border style="width: 100%">
        <el-table-column prop="dimension" align="center" label="维度" width="120"></el-table-column>
        <el-table-column align="center" label="异常设置描述">
          <template slot-scope="scope">
            <div class="bc_abn-table-row">
              大于
              <el-input type="number" placeholder="最大值" v-model="scope.row.maxMonitorData"></el-input><span>数据为异常，小于</span>
              <el-input type="number" placeholder="最小值" v-model="scope.row.minMonitorData"></el-input><span>数据为异常</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bc_abn-save">
      <el-button type="primary" size="large" @click="saveSpikeCard">保存</el-button>
    </div>
  </div>
</template>

<script>
import { saveDataRange, getDataRange, getSensorDimension } from "@/api/abnormal/range.js"

export default {
  props: ['abnData', 'sensorIds', 'sensorType'],
  data () {
    return {
      toolType: "",
      isMonitorOpen: true,
      orderTableData: [],
    };
  },

  computed: {},
  mounted() {
    if(this.sensorType == 'l3_yl'){
      this.toolType = this.sensorType
    }else{
      this.toolType = 'other'
    }
    this.getDimension()
    setTimeout(()=>{
      this.getRangeCardList()
    },500)
  },
  methods: {
    /**
     * 获取传感器纬度信息
     */
    getDimension() {
      if(this.sensorType){
        getSensorDimension({sensorType: this.sensorType})
          .then(res=>{
            let dimls = res.data.data
            dimls && this.initTableData(dimls)
          })
      }
    },
    /**
     * 获取异常描述卡
     */
    getRangeCardList() {
      if(this.sensorIds.length == 1) {
        getDataRange(this.sensorIds[0])
          .then(res=>{
            let resDatas = res.data.data
            if(resDatas){
              resDatas.forEach(b=>{
                this.isMonitorOpen = b.switchStatus
                this.orderTableData.forEach(lss=>{
                  if(lss.dimensionType == b.dimensionType){
                    lss.minMonitorData = b.minMonitorData;
                    lss.maxMonitorData = b.maxMonitorData;
                  }
                })
              })
            }
          })
      }
    },

    initTableData(dimension) {
      this.orderTableData = []
      if(dimension){
        dimension.forEach(d=>{
          this.orderTableData.push({
            dimension:  this.upperCaseLabel(d.label),
            dimensionType: d.dimensionType,
            minMonitorData: null,
            maxMonitorData: null
          })
        })
      }else{
        return;
      }
    },
    /**
     * 保存突刺设置卡
     */
    saveSpikeCard() {

      let dataRangeConfigList = [],
          sensorIdList = [];
      sensorIdList = this.sensorIds
      this.orderTableData.forEach(item=>{
        if(item.minMonitorData && item.maxMonitorData){
          dataRangeConfigList.push({
            dimensionType: item.dimensionType,
            minMonitorData: item.minMonitorData,
            maxMonitorData: item.maxMonitorData,
            switchStatus: this.isMonitorOpen,
          })
        }
      })
      if(dataRangeConfigList.length){
        saveDataRange({ dataRangeConfigList, sensorIdList})
          .then(res=>{
            if(res.data && this.isMonitorOpen){
              this.$message.success("保存设置成功,异常判断开启")
              this.getRangeCardList()
            }else{
              this.$message.success("保存设置成功,异常判断关闭")
              this.getRangeCardList()
            }
            this.$emit('statusFun',{
              key: this.abnData.modName,
              useStatus: this.isMonitorOpen
            })
          })
          .catch(err=>{
            if(err.data && err.data.msg){
              this.$message.warning(err.data.msg)
            }
          })
      }else{
        this.$message.warning('请设置异常判断数据范围')
      }
    },

    upperCaseLabel(label) {
      if(label.length > 1){
        return label
      }else{
        return label.toUpperCase() + '轴'
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.bc_abn-order-main{
  .bc_abn-order-delete{
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 20px;
    color: #409EFF;
    cursor: pointer;
  }
  .bc_abn-describe{
    display: flex;
    align-items: center;

    ::v-deep.el-input{
      width: 75px;
      margin: 0 3px;
    }
  }
  .bc_abn-table-row{
    display: flex;
    align-items: center;
    justify-content: center;

    ::v-deep.el-input{
      width: 90px;
      margin: 0 3px;
    }

    ::v-deep.el-input__inner{
      text-align: center;
      padding: 0;
    }
  }
}
</style>
