<template>
  <div class="bc_chart-move" v-if="trandShow">
    <div class="bc_trand-main">
      <div v-if="chartShow" class="echarts" id="trandChart"></div>
      <div v-else class="echarts">
        <div style="text-align:center;"><img src="@/assets/img/nodataBig.png"/></div>
      </div>
    </div>
    <div class="bc_trand-switch">
      <div class="bc_trand-auma">
        <el-switch
          v-model="autoManualType"
          active-text="自动"
          inactive-text="手动"
          @change="checkAuto">
        </el-switch>
        <div>
          显示条数：
          <el-input
            placeholder="默认展示条数"
            :disabled="autoManualType"
            v-model="defalutStrip">
          </el-input>
        </div>
      </div>
      <div class="bc_trand-form">
        <avue-form
          ref="trandform"
          v-model="shiftObj"
          :option="shiftOption"
          @submit="submitClick">
          <template slot="menuForm">
            <el-button @click="selectAll">全选</el-button>
            <el-button @click="searchReset">清空选择</el-button>
            <!-- <el-button @click="uploadChart">导出图</el-button> -->
          </template>
        </avue-form>
      </div>
      <div class="bc_trand-tree">
        <el-tree
          :data="shiftTreeData"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="trandTree"
          highlight-current
           :default-checked-keys="defaultCheck"
          :props="defaultProps"
          @check-change="getCheckedNodes">
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
import { trendChartOption } from "@/const/crud/monitorManage/echartsType";

import { getTrendChartHour, getTrendChartDay } from "@/api/monitorManage/quxian";

export default {
  name: "trendChart",
  props: ["trandChartForm"],
  data () {
    return {
      trandShow: false,
      trandQuery:{
        beginTime: "",
        endTime: "",
        beginDate: "",
        endDate: "",
        sensorNo: "",
        type: "",
      },
      chart: "",
      chartShow: false,
      chartOption: {},

      autoManualType: true,
      defalutStrip: 10,
      shiftObj: {
        shiftType: 'z',
        shiftTimer: "hours",
      },
      shiftOption:{
        submitText: "搜索",
        emptyBtn: false,
        delBtn: false,
        column: [{
          label: "位移类型",
          prop: "shiftType",
          type: "select",
          disabled: false,
          dicData:[
            { label:'合位移', value:"z" },
            { label:'X方向位移', value:'x' },
            { label:'Y方向位移', value:'y' }
          ],
          span:24
        },{
          label: "时间类型",
          prop: "shiftTimer",
          type: "select",
          disabled: false,
          dicData:[
            { label:'小时', value:"hours" },
            { label:'日均', value:"days" }
          ],
          span:24
        }]
      },
      shiftTreeData: [],
      defaultCheck: [],
      defaultProps: {
        value: 'value',
        label: 'label'
      }
    };
  },
  computed: {},
  watch:{
    "trandChartForm":{
      handler(x , y){
        if(x && x.sensorNo && x.type){
          this.trandQuery.sensorNo = x.sensorNo;
          this.trandQuery.type = x.type
        }
        if(x.beginTime && x.endTime){
          this.trandQuery.beginTime = x.beginTime
          this.trandQuery.endTime = x.endTime
          this.shiftObj= { shiftType: 'z', shiftTimer: "hours" }
        }
        this.getTrandData()
      },
      immediate: true,
    },
    "defaultCheck":{
      handler(x, y){
        if(x.length > 0){
          this.$refs.trandTree.setChecked(x[0], true, false);
        }
      },
      immediate: true
    }
  },
  mounted() {

  },
  methods: {
    async submitClick(val,done) {
      if(val){
        this.getTrandData()
        done()
      }
    },
    getTrandData() {
      this.shiftTreeData = [];
      this.defaultCheck = [];
      this.trandShow = false;
      if(this.trandQuery){
        if(this.shiftObj.shiftTimer == 'hours'){
          getTrendChartHour(this.trandQuery).then(res=>{
            if(res.data && res.data.data){
              let chartData = res.data.data
              chartData.timeList.forEach(item=>{
                this.shiftTreeData.push({id: item, label: item})
                this.trendAll = res.data.data.data
              })
            }
          })
          this.$nextTick(()=>{
            this.$refs.trandTree.setCheckedNodes(this.shiftTreeData);
          })
          this.trandShow = true;
        }else{
          this.trandQuery.beginDate = this.trandQuery.beginTime.split(' ')[0]
          this.trandQuery.endDate = this.trandQuery.endTime.split(' ')[0]
          getTrendChartDay(this.trandQuery).then(res=>{
            if(res.data && res.data.data){
              let chartData = res.data.data
              chartData.timeList.forEach(item=>{
                this.shiftTreeData.push({id: item, label: item})
                this.trendAll = res.data.data.data
              })
            }
          })
          this.trandShow = true;
        }
        this.getCheckedNodes()
      }
    },

    getCheckedNodes(nodes) {
      this.trendSeries = []
      if(nodes){
        let checkedNodes = this.$refs.trandTree.getCheckedNodes()
        if(checkedNodes.length > 0){
          for(let i = 0; i < checkedNodes.length; i++) {
            this.trendAll.forEach(item=>{
              if(item[0].time.indexOf(checkedNodes[i].id)!==-1){
                this.trendSeries.push(item)
              }
            })
          }
          this.chartOption = trendChartOption({data:this.trendSeries},`深部位移-${this.shiftObj.shiftType == 'z'?'合位移':this.shiftObj.shiftType == 'y'?'Y方向位移':'X方向位移'}数据图`, null, this.shiftObj.shiftType)
        }else{
          this.chartOption = trendChartOption({data:[]},'深部位移', null, this.shiftObj.shiftType)
        }
        this.drawChart()
      }
    },
    searchReset(){
      this.$refs.trandTree.setCheckedKeys([])
      this.getCheckedNodes()
    },
    checkAuto() {
      if(this.autoManualType){
        this.shiftOption.column.forEach(item=>{
          item.disabled = false
        })
      }else{
        this.shiftOption.column.forEach(item=>{
          item.disabled = true
        })
      }
    },
    drawChart() {
      this.isShowChart(this.chartOption)
      this.$nextTick(()=>{
        this.chart = this.$echarts.init(document.getElementById("trandChart"));
        this.chart.setOption(this.chartOption || {}, true);
      })
    },
    isShowChart(data) {
      if (data && JSON.stringify(data) != "{}") {
        this.chartShow = true;
      } else {
        this.chartShow = false;
      }
    },
    // 选择所有
    selectAll() {
      this.$refs.trandTree.setCheckedNodes(this.shiftTreeData);
      this.getCheckedNodes()
    },
    /**
     * 导出Echart图
     */
    uploadChart() {
      // let picInfo=this.chart.getDataURL({
      //   type: 'png',
      //   pixelRatio: 1,
      //   backgroundColor: '#fff'
      // });

      // console.log(picInfo, 'picInfo');

      // const elink = document.createElement('a');
      // elink.download = `深部位移-${this.shiftObj.shiftType == 'z'?'合位移':this.shiftObj.shiftType == 'y'?'Y方向位移':'X方向位移'}数据图'`;
      // elink.style.display = 'none';
      // elink.href = picInfo;
      // document.body.appendChild(elink);
      // elink.click();
      // URL.revokeObjectURL(elink.href);
      // document.body.removeChild(elink)
    }
  }
}
</script>
<style lang='scss' scoped>
.bc_chart-move{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;

  .bc_trand-main{
    width: 60%;
    height: 100%;

    .echarts{
      height: 100%;
      width: 100%;
      div{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .bc_trand-switch{
    width: 40%;
    height: 100%;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-pack: justify;
    justify-content: flex-start;
    -webkit-box-align: flex-start;
    -ms-flex-align: flex-start;
    align-items: flex-start;

    .bc_trand-auma{
      display: flex;
      justify-content: space-around;
      width: 100%;
      ::v-deep.el-switch .el-switch__label {
        display: block;
        width: 50px !important;
      }
      ::v-deep.el-switch .el-switch__label.is-active {
        display: none;
      }
      ::v-deep.el-switch__label--left{
        left: 10px;
        z-index: 1;
      }
      ::v-deep.el-switch__label--right{
        right: -10px;
      }
      ::v-deep.el-switch__core{
        width: 60px !important;
      }
      ::v-deep.el-input{
        width: 20%;
      }
    }

    .bc_trand-tree{
      height: 70%;
      width: 100%;
      border: 1px solid #eee;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }
}
</style>
