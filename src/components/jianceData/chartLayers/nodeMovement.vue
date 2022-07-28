<template>
   <div class="bc_shift-mian">
      <el-row>
         <el-col :span="4">
            <div class="bc_shift-tree">
               <el-button type="default" @click="searchReset">清空</el-button>
               <el-tree
                  :data="shiftTreeData"
                  show-checkbox
                  default-expand-all
                  node-key="value"
                  ref="nodesTree"
                  @check-change="getCheckedNodes">
               </el-tree>
            </div>
         </el-col>
         <el-col :span="20">
            <div class="bc_shift-right">
               <div class="">
                  <el-radio-group v-model="nodeType" @change="changeNodeType">
                     <el-radio-button label="z">合位移</el-radio-button>
                     <el-radio-button label="x">X轴位移</el-radio-button>
                     <el-radio-button label="y">Y轴位移</el-radio-button>
                  </el-radio-group>
                  <!-- <el-button type="default">导出图</el-button> -->
               </div>
               <div class="bc_shift-chart">
                  <div v-if="chartShow" class="echarts" id="trandChart" style="height: 550px"></div>
                  <div v-else class="echarts">
                     <div style="text-align:center;"><img src="@/assets/img/nodataBig.png"/></div>
                  </div>
               </div>
            </div>
         </el-col>
      </el-row>
   </div>
</template>

<script>
import { nodeMovementChart } from "@/const/crud/monitorManage/echartsType";

import { getNodeMovementChart } from "@/api/monitorManage/quxian";


export default {
   props: ["trandChartForm"],
   data () {
      return {
         movementQuery: {
            rainfallQueryIntervalHour: "",
            beginTime: "",
            endTime: "",
            sensorNo: "",
            type: "",
            rainfallEchartType: "",
         },
         nodeType: 'z',
         shiftTreeData: [
            { value: 1, label: '一级 1' },
            { value: 2, label: '一级 2' },
            { value: 3, label: '一级 3' }
         ],
         chart: {},
         chartShow: false,
         chartOption: {},

         movementAll: [],
         chartSeries: []
      };
   },

   computed: {},
   watch: {
     "trandChartForm":{
         handler(x , y){
            if(x && x.sensorNo && x.type && x.beginTime && x.endTime){
               this.movementQuery.sensorNo = x.sensorNo;
               this.movementQuery.type = x. type
               this.movementQuery.beginTime = x. beginTime
               this.movementQuery.endTime = x. endTime
            }
            this.getMovementData()
         },
         immediate: true,
      }
   },
   methods: {
      getMovementData() {
         this.shiftTreeData = []
         if(this.movementQuery){
            getNodeMovementChart(this.movementQuery).then(res=>{
               if(res.data && res.data.data){
                  let chartData = res.data.data
                  let sortNodeList = []
                  if(chartData.nodeList.length>0){
                     sortNodeList = chartData.nodeList.sort(function(a, b){return b - a})
                  }
                  sortNodeList.forEach((item,index)=>{
                     this.shiftTreeData.push({value: item, label: `${-(index+1)}米`})
                  })
                  this.movementAll = chartData
               }
            })
         }
      },

      getCheckedNodes(nodes) {
         this.chartSeries = []
         if(nodes){
            let checkedNodes = this.$refs.nodesTree.getCheckedNodes()
            if(checkedNodes.length > 0){
               for(let i = 0; i < checkedNodes.length; i++) {
                  if(this.movementAll[checkedNodes[i].value]){
                     this.chartSeries.push({
                        alias: checkedNodes[i].label,
                        data: this.movementAll[checkedNodes[i].value],
                        description: null,
                        name: null,
                        unit: this.movementAll.unit,
                     })
                  }
               }
               this.chartOption = nodeMovementChart({ data: this.chartSeries },'', 'mm(毫米)', 'l1_gp', this.nodeType)
            } else {
               this.chartSeries.push({
                  alias: "",
                  data: [],
                  description: null,
                  name: null,
                  unit: this.movementAll.unit,
               })
               this.chartOption = nodeMovementChart({ data: this.chartSeries },'', 'mm(毫米)', 'l1_gp', this.nodeType)
            }
            this.drawNodeChart()
         }
      },

      searchReset(){
         this.$refs.nodesTree.setCheckedKeys([])
         this.getCheckedNodes()
      },

      drawNodeChart() {
         this.isShowChart(this.chartOption)
         this.$nextTick(()=>{
            this.chart = this.$echarts.init( document.getElementById("trandChart") );
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

      changeNodeType(type) {
         this.nodeType = type
         this.getCheckedNodes(type)
      }
   }
}
</script>
<style lang='scss' scoped>
.bc_shift-mian{
   position: relative;
   height: 80%;
   width: 100%;
   padding: 10px;
   .el-row{
      height: 100%;
      .el-col{
         height: 100%;
      }
   }
   .bc_shift-tree{
      display: flex;
      -ms-flex-pack: justify;
      justify-content: flex-start;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      overflow-y: scroll;
      overflow-x: hidden;
      height: 100%;

      ::v-deep.el-tree{
         width: 100%;
         height: 100%;
         margin-top: 10px;
         border: 1px solid #eee;
      }
   }

   .bc_shift-right{
      margin-left: 20px;
      height: 100%;

      ::v-deep.el-radio-group{
         margin-right: 30px;
      }

      .bc_shift-chart{
         height: 100%;
         width: 100%;
         .echarts{
            height: 100%;
            width: 100%;
            > div{
               height: 100%;
               width: 100%;
               display: flex;
               justify-content: center;
               align-items: center;
            }
         }
      }
   }
}
</style>
