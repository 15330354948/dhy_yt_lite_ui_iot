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
            <p class="bc_abn-describe">
              <span class="bc_abn-card-label">适用日期范围:</span>
              <el-select v-model="order.suitDateRange" placeholder="请选择日期范围" @change="dateRangeChange(order)">
                <el-option
                  v-for="item in daySlotOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.enumCode">
                </el-option>
              </el-select>
              <el-date-picker
                v-model="order.dateRange"
                v-if="order.suitDateRange == 'fix_date'"
                type="daterange"
                align="right"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd hh:mm:ss">
              </el-date-picker>
            </p>
            <p><span class="bc_abn-card-label">异常设置描述:</span></p>
            <p class="bc_abn-describe">连续
              <el-input type="number" placeholder="请输入持续时间" min="2" v-model="order.duration"></el-input>
              <el-select v-model="order.timeUnit" placeholder="请选择时间类型">
                <el-option
                  v-for="item in timeSlotOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              内监测数据无任何变化视为异常
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
import { dictionary } from "@/api/hideDanger/obj";
import { getDataUnChange, saveDataUnChange } from "@/api/abnormal/unchange.js"

export default {
  props: ['abnData', 'sensorIds', 'sensorType'],
  data () {
    return {
      toolType: "",
      isMonitorOpen: true,
      orderList: [{
        duration: 0,
        timeUnit: 'h',
        suitDateRange: "whole_year",
        dateRange: [],
      }],
      daySlotOption:[],
      timeSlotOption:[
        {label: '小时', value: 'h'},
        {label: '天', value: 'd'},
      ],
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
    };
  },

  computed: {},
  mounted() {
    dictionary("date_range").then( res => {
      this.daySlotOption = res.data.data;
    });
    if(this.sensorType == 'l3_yl'){
      this.toolType = this.sensorType
    }else{
      this.toolType = 'other'
    }
    this.getUCardList()
  },
  methods: {
    // 格式化时间
    getAllYearDate() {
      let wholeYearList = []
      const timer = new Date()
      const year = timer.getFullYear()
      const mouth = timer.getMonth() + 1 > 10 ? timer.getMonth() + 1 : '0' + (timer.getMonth() + 1)
      const date = timer.getDate() > 10 ? timer.getDate() : '0' + timer.getDate()
      wholeYearList[0] = `${year}-01-01 12:00:00`
      wholeYearList[1] = `${year}-${mouth}-${date} 12:00:00`
      return wholeYearList
    },

    dateRangeChange(tabData) {
      if(tabData.suitDateRange == 'whole_year') {
        console.log(this.getAllYearDate())
        tabData.dateRange = this.getAllYearDate()
      }else{
        tabData.dateRange = []
      }
    },
    /**
     * 获取异常描述卡
     */
    getUCardList() {
      this.orderList = [];
      if(this.sensorIds.length == 1){
        getDataUnChange(this.sensorIds[0])
          .then(only=>{
            let dateList = [];
            let oData = only.data.data;
            oData.forEach(o=>{
              dateList[0] = o.startSuitDateRange;
              dateList[1] = o.endSuitDateRange;
              this.isMonitorOpen = o.switchStatus;
              this.orderList.unshift({
                duration: o.duration,
                timeUnit: o.timeUnit,
                suitDateRange: o.suitDateRange,
                dateRange: dateList
              })
            })
          })
      }
    },
    /**
     * 新增突刺设置卡
     */
    addSpikeOrder() {
      this.orderList.unshift({
        duration: 0,
        timeUnit: 'h',
        suitDateRange: "whole_year",
        dateRange: this.getAllYearDate()
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
      let abnormalDataLongTermInvariantConfigList = [],
          sensorIdList = [];
      sensorIdList = this.sensorIds
      this.orderList.forEach(item=>{
        if(item.duration > 1){
          abnormalDataLongTermInvariantConfigList.push({
            duration: Number(item.duration),
            timeUnit: item.timeUnit,
            suitDateRange: item.suitDateRange,
            switchStatus: this.isMonitorOpen,
            startSuitDateRange: item.dateRange[0],
            endSuitDateRange: item.dateRange[1]
          })
        }
      })
      if(abnormalDataLongTermInvariantConfigList.length){
        saveDataUnChange({abnormalDataLongTermInvariantConfigList, sensorIdList})
          .then(res=>{
            this.$emit('statusFun',{
              key: this.abnData.modName,
              useStatus: this.isMonitorOpen
            })
            if(res.data.data && this.isMonitorOpen){
              this.$message.success("保存设置成功,异常判断开启")
              this.getUCardList()
            }else{
              this.$message.success("保存设置成功,异常判断关闭")
              this.getUCardList()
            }
          })
      }else{
        this.$message.warning("连续时间需大于等于2小时")
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
      width: 100px;
      margin: 0 3px;
    }
    ::v-deep.el-date-editor{
      width: 50% !important;
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
