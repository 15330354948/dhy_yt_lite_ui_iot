<template>
  <div class="bc_abn-order-main">
    <div class="bc_spike-title">
      <p class="bc_abn-tits">{{abnData.navTitle}}
        <el-switch v-model="isMonitorOpen"></el-switch>
      </p>
      <p class="bc_abn-tips">提示：{{abnData.toolPromptList[toolType]}}</p>
    </div>
    <div class="bc_abn-order">
      <el-button icon="el-icon-plus" type="primary" @click="addSpikeOrder">新增</el-button>
      <div class="bc_abn-scroll">
        <el-scrollbar style="height:100%;">
          <div class="bc_abn-order-card" v-for="(order,i) in orderList" :key="i">
            <div class="bc_abn-order-delete" @click="deleteSpikeOrder(i)"><i class="el-icon-delete"></i></div>
            <p><span class="bc_abn-card-label">异常设置描述:</span></p>
            <p class="bc_abn-describe">连续
              <el-input type="number" placeholder="请输入持续时间" min="0" v-model="order.duration"></el-input>
              <el-select v-model="order.timeUnit" placeholder="请选择时间类型">
                <el-option
                  v-for="item in timeSlotOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              内出现
              <el-input type="number" placeholder="请输入次数" min="2" v-model="order.spikeNum"></el-input>
              次突刺视为异常,
              突刺大小为<el-input type="number" placeholder="请输入次数" min="2" v-model="order.spike"></el-input>
            </p>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="bc_abn-save">
      <el-button type="primary" size="large" @click="saveSpikeCard">保存</el-button>
    </div>
  </div>
</template>

<script>
import { saveDataSpike, getDataSpike } from "@/api/abnormal/spike.js"

export default {
  props: ['abnData', 'sensorIds', "sensorType"],
  data () {
    return {
      toolType: "",
      isMonitorOpen: true,
      orderList: [],
      timeSlotOption:[
        {label: '小时', value: "h"},
        {label: '天', value: "d"},
      ],
    };
  },

  computed: {},
  mounted() {
    this.getSpikeCardList()
    if(this.sensorType == 'l3_yl'){
      this.toolType = this.sensorType
    }else{
      this.toolType = 'other'
    }
  },
  methods: {
    /**
     * 获取异常描述卡
     */
    getSpikeCardList() {
      this.orderList = [];
      if(this.sensorIds.length == 1){
        getDataSpike(this.sensorIds[0])
          .then(only=>{
            let oData = only.data.data;
            if(oData){
              this.orderList = oData
            }
          })
      }else{
        this.isMonitorOpen = true
      }
    },
    /**
     * 新增突刺设置卡
     */
    addSpikeOrder() {
      console.log(this.orderList)
      this.orderList.unshift({
        duration: null,
        timeUnit: "h",
        spikeNum: null,
        spike: null
      })
    },
    /**
     * 删除突刺设置卡
     * deleteSpikeOrder
     */
    deleteSpikeOrder(index) {
      this.orderList.splice(index,1)
    },
    /**
     * 保存突刺设置卡
     */
    saveSpikeCard() {
      let dataSpikeConfigList = [],
          sensorIdList = [];
      this.orderList.forEach(o=>{
        if(o.duration>0 && o.spikeNum>1){
          dataSpikeConfigList.push({
            duration: o.duration,
            timeUnit: o.timeUnit,
            spikeNum: o.spikeNum,
            spike: o.spike,
            switchStatus: this.isMonitorOpen
          })
        }else{
          this.$message.warning("连续时间必须大于等于1小时，出现次数需大于等于2次")
        }
      })
      sensorIdList = this.sensorIds
      if(dataSpikeConfigList.length){
        saveDataSpike({ dataSpikeConfigList, sensorIdList })
          .then(res=>{
            this.$emit('statusFun',{
              key: this.abnData.modName,
              useStatus: this.isMonitorOpen
            })
            if(res.data && this.isMonitorOpen){
              this.$message.success("保存设置成功,异常判断开启")
              this.getSpikeCardList()
            }else{
              this.$message.success("保存设置成功,异常判断关闭")
              this.getSpikeCardList()
            }
          })
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
  }
}
</style>
