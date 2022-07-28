<template>
   <div class="bc_monitor-table">
     <avue-form
        ref="tableForm"
        v-if="fromType"
        v-model="tableForm"
        :option="tableOption">
        <template slot="menuForm">
          <el-button type="primary" @click="searchFormTable">搜索</el-button>
          <!-- <el-button @click="handleEmpty">清 空</el-button> -->
          <el-button @click="handleRefresh">刷 新</el-button>
        </template>
      </avue-form>
      <div class="quick-query">
        快速查询：
        <span @click="handleQuick(1)" :class="quickNum == 1 ? 'quick-active' : ''">1日</span>
        <span @click="handleQuick(3)" :class="quickNum == 3 ? 'quick-active' : ''">3日</span>
        <span @click="handleQuick(7)" :class="quickNum == 7 ? 'quick-active' : ''">7日</span>
        <span @click="handleQuick(15)" :class="quickNum == 15 ? 'quick-active' : ''">15日</span>
        <span @click="handleQuick(30)" :class="quickNum == 30 ? 'quick-active' : ''">30日</span>
      </div>
      <avue-crud
        ref="jianceCrud"
        :page="monitorPage"
        :data="monitorData"
        :option="monitorOption"
        @current-change="yemaChange"
        @size-change="numberChange"
        :table-loading="requestStatus">
      </avue-crud>
   </div>
</template>

<script>
import {
  quxianDataList,
  getTableDataListNew,
  getTableDataListNewDay,
  SWNodeSearch,
} from "@/api/monitorManage/quxian";

export default {
  name: "monitorTable",
  props: ["devListSwitch",'isDevMangement'],
  
  data () {
    return {
      fromType: false,
      tableForm: {
        time: 0,
        dataType: 0,
        datetimerange: 0,
        rainfallEchartType:0,
      },
      tableOption: {
        labelWidth: 0,
        submitBtn: false,
        emptyBtn: false,
        delBtn: false,
        menuSpan: 6,
        column: [],
      },

      quickNum: 0,
      monitorPage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      monitorData: [],
      monitorOption: {
        index: true,
        indexLabel: "序号",
        addBtn: false,
        page: false,
        align: "center",
        menuAlign: "center",
        menu: false,
        menuBtn: false,
        cancelBtn:false,
        refreshBtn: false,
        filterBtn: false,
        columnBtn:false,
        column: [],
      },
      requestStatus: true
    };
  },
  watch:{
    "devListSwitch": {
      handler(b, a) {
        if(b){          
          if (b.sensorType == "l3_yl") {
            this.tableOption.column = [
              {
                label: "",
                prop: "time",
                type: "select",
                arrow:true,
                dicData: [
                  { label: "实时", value: 0 },
                  { label: "1小时", value: 1 },
                  { label: "3小时", value: 3 },
                  { label: "6小时", value: 6 },
                  { label: "12小时", value: 12 },
                ],
                span: 4
              },
              {
                label: "",
                prop: "datetimerange",
                type: "datetimerange",
                startPlaceholder: "开始时间",
                endPlaceholder: "结束时间",
                span: 10,
                format: "yyyy-MM-dd HH:mm:ss", //前端展示格式
                valueFormat: "yyyy-MM-dd HH:mm:ss", //设置后端接收的日期格式
              },
              {
                label: "",
                prop: "rainfallEchartType",
                type: "select",
                arrow:true,
                placeholder: "滑动雨量",
                dicData: [
                  { label: "滑动雨量", value: 0 },
                  { label: "累计雨量", value: 1 },
                ],
                span: 4
              },
            ];
          } else if(b.sensorType == "l1_sw"){
            this.tableOption.column = [{
              label: "",
              prop: "dataType",
              type: "select",
              dicData: [
                { label: "累计位移", value: 0 },
                { label: "相对位移", value: 1 },
                { label: "日均累计位移", value: 2 },
                { label: "日均相对位移", value: 3 },
                { label: "运移轨迹", value: 4 }
              ],
              span: 4,
              mock: {
                type: "dic",
              },
            },{
              label: "",
              prop: "time",
              type: "select",
              dicData: [
                { label: "实时", value: 0 },
                { label: "3小时", value: 3, disabled: true },
                { label: "6小时", value: 6, disabled: true },
                { label: "12小时", value: 12, disabled: true },
              ],
              span: 4,
              mock: {
                type: "dic",
              },
            },{
              label: "",
              prop: "datetimerange",
              type: "datetimerange",
              startPlaceholder: "开始时间",
              endPlaceholder: "结束时间",
              span: 10,
              format: "yyyy-MM-dd HH:mm:ss", //前端展示格式
              valueFormat: "yyyy-MM-dd HH:mm:ss", //设置后端接收的日期格式
            }];
          }else{
            this.tableOption.column = [{
              label: "",
              prop: "time",
              type: "select",
              dicData: [
                { label: "实时", value: 0 },
                { label: "3小时", value: 3, disabled: true },
                { label: "6小时", value: 6, disabled: true },
                { label: "12小时", value: 12, disabled: true },
              ],
              span: 4,
              mock: {
                type: "dic",
              },
            },{
              label: "",
              prop: "datetimerange",
              type: "datetimerange",
              startPlaceholder: "开始时间",
              endPlaceholder: "结束时间",
              span: 10,
              format: "yyyy-MM-dd HH:mm:ss", //前端展示格式
              valueFormat: "yyyy-MM-dd HH:mm:ss", //设置后端接收的日期格式
            }];
          }
        }
        
        this.fromType = true;
        if (b.noData) {
          this.monitorOption.column = [
            { label: "时间", prop: "time", labelWidth: 180}
          ];
        } else {
          
          if (b.nodeclick) {
            this.monitorPage.currentPage = 1;
            this.monitorPage.total = 0;
            if(!this.isDevMangement){
                 this.tableForm.datetimerange = [
                this.$parent.GetDateStr(-7, "hours"),
                this.$parent.GetDateStr(0, "hours"),
              ];
            }
          }else{
            if(!this.isDevMangement){
                 this.tableForm.datetimerange = [
                this.$parent.GetDateStr(-7, "hours"),
                this.$parent.GetDateStr(0, "hours"),
              ];
            }
           
          }
          if (b.sensorType == "l1_wy") {
            //表面位移
            this.monitorOption.column = [
              { label: "时间", prop: "time"},
              { label: "x偏移(mm)", prop: "x" },
              { label: "y偏移(mm)", prop: "y" },
            ];
          } else if (b.sensorType == "l1_qj") {
            //倾斜
            this.monitorOption.column = [
              { label: "时间", prop: "time" },
              { label: "x偏移(°度)", prop: "x" },
              { label: "y偏移(°度)", prop: "y" },
              { label: "z偏移(°度)", prop: "z" },
            ];
          }else if (b.sensorType == "l5_wy") {
            //表面位移(XYZ)
            this.monitorOption.column = [
              { label: "时间", prop: "time" },
              { label: "x(mm)", prop: "x" },
              { label: "y(mm)", prop: "y" },
              { label: "z(mm)", prop: "z" },
            ];
          }else if (b.sensorType == "l1_js") {
            //加速度
            this.monitorOption.column = [
              { label: "时间", prop: "time" },
              { label: "g_x(mg加速度)", prop: "g_x" },
              { label: "g_y(mg加速度)", prop: "g_y" },
              { label: "g_z(mg加速度)", prop: "g_z" },
            ];
          } else if (b.sensorType == "l1_lf") {
            //裂缝
            this.monitorOption.column = [
              { label: "时间", prop: "time" },
              { label: "裂缝值(mm)", prop: "value" },
            ];
          } else if (b.sensorType == "l4_nw") {
            //泥位计
            this.monitorOption.column = [
              { label: "时间", prop: "time" },
              { label: "泥位计(m)", prop: "value" },
            ];
          } else if (b.sensorType == "l5_ll") {
            // 流量计
            this.monitorOption.column = [
              { label: "时间", prop: "time" },
              { label: "瞬时流量(m³/h)", prop: "value" },
              { label: "累计流量（m³ ）", prop: "value_total" },
            ];
          } else if (b.sensorType == "l3_ls") {
            // 流速
            this.monitorOption.column = [
              { label: "时间", prop: "time" },
              { label: "流速", prop: "value" },
            ];
          } else if (b.sensorType == "l3_qw") {
            // 气温
            this.monitorOption.column = [
              { label: "时间", prop: "time" },
              { label: "气温", prop: "value" },
            ];
          } else if (b.sensorType == "l1_gp") {
            //地表位移
            this.monitorOption.column = [
              { label: "时间", prop: "time" },
              { label: "x偏移(mm)", prop: "gps_total_x" },
              { label: "y偏移(mm)", prop: "gps_total_y" },
              { label: "z偏移(mm)", prop: "gps_total_z" },
            ];
          } else if (b.sensorType == "l3_yl") {
            //雨量
            this.monitorOption.column = [
              { label: "雨量值(mm)", prop: "value" },
              { label: "当日雨量累计值(mm)", prop: "total_value" },
              { label: "1小时滑动雨量(mm)", prop: "b1_value" },
              { label: "3小时滑动雨量(mm)", prop: "b3_value" },
              { label: "6小时滑动雨量(mm)", prop: "b6_value" },
              { label: "12小时滑动雨量(mm)", prop: "b12_value" },
              { label: "时间", prop: "time" },
            ];
            this.tableForm.time = 0;
          } else if (b.sensorType == "l1_zd") {
            //振动
            this.monitorOption.column = [
              { label: "时间", prop: "time" },
              { label: "plX", prop: "plX" },
              { label: "plY", prop: "plY" },
              { label: "plZ", prop: "plZ" },
              { label: "value", prop: "value" },
              { label: "sjX", prop: "sjX" },
              { label: "sjY", prop: "sjY" },
              { label: "sjZ", prop: "sjZ" },
              { label: "sjValue", prop: "sjValue" }
            ];
          }  else if (b.sensorType == "l5_zd") {
            //微感
            this.monitorOption.column = [
              { label: "时间", prop: "time" },
              { label: "x最大速度mm/s", prop: "v_x_max" },
              { label: "x最小速度mm/s", prop: "v_x_min" },
              { label: "y最大速度mm/s", prop: "v_y_max" },
              { label: "y最小速度mm/s", prop: "v_y_min" },
              { label: "z最大速度mm/s", prop: "v_z_max" },
              { label: "z最小速度mm/s", prop: "v_z_min" },
              { label: "x振幅mm", prop: "x_amplitude" },
              { label: "x频率Hz", prop: "x_frequency" },
              { label: "y振幅mm", prop: "y_amplitude" },
              { label: "y频率Hz", prop: "y_frequency" },
              { label: "z振幅mm", prop: "z_amplitude" },
              { label: "z频率Hz", prop: "z_frequency" },
              { label: "采集频率Hz", prop: "sampler" }
            ];
          } else if (b.sensorType == "l1_sw") {
            //深部位移
            this.initTable(b)
          } else {
            this.monitorOption.column = [
              { label: "时间", prop: "time" },
              { label: "value", prop: "value" },
            ];
          }
          this.getMonitorData()
        }
      },
      immediate: true
    },
    "formColumn":{
      immediate: true,
      handler(b, a){
        if(b){
          this.tableOption.column = b
        }
        this.fromType = true
      }
    }
  },
  computed: {},

  methods: {
    initTable(data) {
      var listData = [{ label: "时间", prop: "time", width: 150, fixed:true }];
        SWNodeSearch({ sensorNo: data.sensorCode||data.sensorNo }).then((res) => {
          var number = [];
          if(res){
            for (var i = res.data.data; i > 0; i--) {
              number.push(i);
            }
            for (var i = 0; i < res.data.data; i++) {
              if(this.tableForm.dataType == 0 || this.tableForm.dataType == 2){
                listData.push({
                  label: -i - 1 + "M(mm)",
                  children: [
                    { label: "X轴位移", prop: "disps_x" + number[i], width: 90 },
                    { label: "Y轴位移", prop: "disps_y" + number[i], width: 90 },
                    { label: "合位移", prop: "disps_z" + number[i], width: 90 }
                  ],
                });
                this.monitorOption.column = listData;
              }else if(this.tableForm.dataType == 1 || this.tableForm.dataType == 3){
                listData.push({
                  label: -i - 1 + "M(mm)",
                  children: [
                    { label: "X轴相对位移", prop: "disps_x" + number[i], width: 90},
                    { label: "Y轴相对位移", prop: "disps_y" + number[i], width: 90},
                    { label: "相对合位移", prop: "disps_z" + number[i], width: 90 },
                  ],
                });
                this.monitorOption.column = listData;
              }else{
                listData.push({
                  label: -i - 1 + "M(mm)",
                  children: [
                    { label: "合位移(mm)", prop: "disps_x" + number[i], width: 90 },
                    { label: "位移角度(°)", prop: "disps_y" + number[i], width: 90 },
                    // { label: "相对主滑方向转角(°)", prop: "disps_z" + number[i+1], width: 130 }
                  ],
                });
                this.monitorOption.column = listData;
              }
            }
          }
        });
    },
    // 监测曲线搜索
    searchFormTable() {
      this.searchType = true;
      this.initTable(this.devListSwitch)
      this.getMonitorData(); //监测曲线接口调用
    },
    getMonitorData() {
      this.requestStatus = true;
      if (this.devListSwitch.sensorType == "l1_sw") {
        if (this.tableForm.dataType == 0 || this.tableForm.dataType == 1 || this.tableForm.dataType == 4) {
          getTableDataListNew({
            beginTime: this.tableForm.datetimerange[0],
            endTime: this.tableForm.datetimerange[1],
            sensorNo:this.devListSwitch.sensorCode||this.devListSwitch.sensorNo,
            type: this.devListSwitch.sensorType,
            current: this.monitorPage.currentPage,
            size: this.monitorPage.pageSize,
          }).then((res) => {
            if(res){
              var str = res.data.data.data[0].records;
              var arrList = [];
              for (var i = 0; i < str.length; i++) {
                var nodeList = {};
                if(this.tableForm.dataType == 0){
                  str[i].dataList.forEach((e, index) => {
                    var namex = "disps_x" + e.node;
                    var namey = "disps_y" + e.node;
                    var namez = "disps_z" + e.node;
                    nodeList[namex] = e.dispsX;
                    nodeList[namey] = e.dispsY;
                    nodeList[namez] = e.cumulativeDisplacement;
                  });
                }else if(this.tableForm.dataType == 1){
                  str[i].dataList.forEach((e, index) => {
                    var namex = "disps_x" + e.node;
                    var namey = "disps_y" + e.node;
                    var namez = "disps_z" + e.node;
                    nodeList[namex] = e.xrelativeDisplacement;
                    nodeList[namey] = e.yrelativeDisplacement;
                    nodeList[namez] = e.relativeDisplacement;
                  });
                }else{
                  str[i].dataList.forEach((e, index) => {
                    var namex = "disps_x" + e.node;
                    var namey = "disps_y" + e.node;
                    var namez = "disps_z" + e.node;
                    nodeList[namex] = e.cumulativeDisplacement;
                    nodeList[namey] = e.angle;
                    nodeList[namez] = e.cumulativeDisplacement;
                  });
                }
                arrList.push({
                  time: str[i].time,
                  ...nodeList,
                });
              }
              this.monitorData = arrList;
              if (res.data.data.data[0].records && str.length < 1) {
                this.monitorOption.page = false;
                this.monitorPage.total = 0;
              } else {
                this.monitorOption.page = true;
                this.monitorPage.total = res.data.data.data[0].total;
              }
              this.requestStatus = false;
            }
          }).catch((red) => {
            this.requestStatus = false;
            this.$message({
              type: "warning",
              message: "暂无数据",
            });
          });
        } else {
          getTableDataListNewDay({
            beginTime: this.tableForm.datetimerange[0],
            endTime: this.tableForm.datetimerange[1],
            sensorNo: this.devListSwitch.sensorCode||this.devListSwitch.sensorNo,
            type: this.devListSwitch.sensorType,
            current: this.monitorPage.currentPage,
            size: this.monitorPage.pageSize,
          })
            .then((res) => {
              var str = res.data.data.data[0].records;
              var arrList = [];
              for (var i = 0; i < str.length; i++) {
                var nodeList = {};
                if(this.tableForm.dataType == 2){
                  str[i].dataList.forEach((e, index) => {
                    var namex = "disps_x" + e.node;
                    var namey = "disps_y" + e.node;
                    var namez = "disps_z" + e.node;
                    nodeList[namex] = e.dispsX;
                    nodeList[namey] = e.dispsY;
                    nodeList[namez] = e.cumulativeDisplacement;
                  });
                }else{
                  str[i].dataList.forEach((e, index) => {
                    var namex = "disps_x" + e.node;
                    var namey = "disps_y" + e.node;
                    var namez = "disps_z" + e.node;
                    nodeList[namex] = e.xrelativeDisplacement;
                    nodeList[namey] = e.yrelativeDisplacement;
                    nodeList[namez] = e.relativeDisplacement;
                  });
                }
                arrList.push({
                  time: str[i].time,
                  ...nodeList,
                });
              }
              this.monitorData = arrList;

              if (res.data.data.data[0].records && str.length < 1) {
                this.monitorOption.page = false;
                this.monitorPage.total = 0;
              } else {
                this.monitorOption.page = true;
                this.monitorPage.total = res.data.data.data[0].total;
              }

              this.requestStatus = false;
            })
            .catch((red) => {
              this.$message({
                type: "warning",
                message: "暂无数据",
              });
            });
        }
      } else {
        quxianDataList({
          beginTime: this.tableForm.datetimerange[0],
          endTime: this.tableForm.datetimerange[1],
          sensorNo: this.devListSwitch.sensorCode||this.devListSwitch.sensorNo,
          type: this.devListSwitch.sensorType,
          current: this.monitorPage.currentPage,
          size: this.monitorPage.pageSize,
        })
          .then((res) => {
            this.monitorData = res.data.data.records;
            this.monitorPage.total = res.data.data.total;

            if (res.data.data.records.length < 1) {
              this.monitorOption.page = false;
            } else {
              this.monitorOption.page = true;
            }

            this.requestStatus = false;
          })
          .catch((red) => {
            this.$message({
              type: "warning",
              message: "暂无数据",
            });
          });
      }
    },
    // 快速查询
    handleQuick(i) {
      this.searchType = true;
      this.quickNum = i;
      this.tableForm.datetimerange = [
        this.$parent.GetDateStr(-i, "hours"),
        this.$parent.GetDateStr(0, "hours"),
      ];
    },

    handleRefresh() {
      //刷新假数据
      this.monitorPage.currentPage = 1;
      this.monitorPage.pageSize = 10;
      if(!this.isDevMangement){
           this.tableForm.datetimerange = [
          this.$parent.GetDateStr(-7, "hours"),
          this.$parent.GetDateStr(0, "hours"),
        ];
      }
      this.getMonitorData();
    },
    yemaChange(data) {
      this.monitorPage.currentPage = data;
      this.getMonitorData();
    },
    numberChange(data) {
      this.monitorPage.currentPage = 1;
      this.monitorPage.pageSize = data;
      this.getMonitorData();
    },
  }
}
</script>
<style lang='scss' scoped>
.bc_monitor-table {
  .quick-query {
    color: #cccccc;
    padding-left: 10px;
    padding-right: 10px;
    span {
      margin: 0 5px;
      cursor: pointer;
    }
  }
  .quick-active {
    color: #409eff;
  }
}
  
</style>