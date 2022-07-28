<!-- 监测点分析 -->
<template>
  <div class="chart_div">
    <!-- <div class="bc_detial_info" @click="openSubprojectListPop">
      <img :src="require(`@/assets/img/icon/icon1.png`)" alt="" />
    </div> -->
    <div class="chart_div" v-if="chartsTypeShow">
      <chart-com :options="option"></chart-com>
    </div>
    <div class="chart_div" v-if="!chartsTypeShow" v-loading="!chartsTypeShow"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import chartCom from "@/components/chartcom/index.vue";
import { getSubprojectStatus } from '@/api/monitorManage/visua';

export default {
    name:'device',
    components:{ chartCom },
    computed: {
        ...mapGetters(["projectId", "userInfo"]),
    },
    data(){
        return{
            chartsTypeShow:false,
            option: {},
            colorList : ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"]
        }
    },
    watch: {
        "projectId":{
            immediate: true,
            handler(x,y){
                if(x) this.getData(x)
            }
        }
    },
    methods:{
      openSubprojectListPop() {
        this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
          status: true,
          name: "abnormalDevice",
          style: {
              marginTop:'0px',
              width: "50vw",
              left:'calc(50% - 60vh)',
              height: "60vh",
              title: "异常设备列表",
          },
          data: this.projectId
        });
      },
      getData(proId){
        getSubprojectStatus({projectId: proId}).then(res => {
          let chartData = res.data.data
          this.option = this.initSubprojectOption(chartData)
          this.chartsTypeShow = true;
        })
      },
      initSubprojectOption(data){
        let projectTotals = 0,
            completNum = 0,
            conductNum = 0,
            noStartNum = 0;
        if(data.length){
          data.forEach(project=>{
            projectTotals+=project.total;
            switch(project.type){
              case "未开始":
                noStartNum = project.total;
                break;
              case "进行中":
                conductNum = project.total;
                break;
              default:
                completNum = project.total;
                break;
            }
          })
        }
        return {
          color: [
            "#00ffff",
            "#00cfff",
            "#2fb6ee",
            "#ffe000",
            "#ffa800",
            "#ff5b00",
            "#ff3000",
          ],
          title: [{
            text: projectTotals,
            top: "36%",
            textAlign: "center",
            left: "49%",
            textStyle: {
              color: "#f05748",
              fontSize: 22
            },
          },{
            text: "总项目数",
            top: "50%",
            textAlign: "center",
            left: "49%",
            textStyle: {
              color: "#fff",
              fontSize: 12
            },
          }],
          toolbox: {
            show: true,
          },
          series: [{
            name: "",
            type: "pie",
            clockWise: false,
            radius: ['35%', '60%'],
            hoverAnimation: false,
            z: 2,
            labelLine: {
              length: 20,
              length2: 40,
              show: true,
              lineStyle: {
                width: 2,
                cap: "round"
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "outside",
                  color: "#ddd",
                  fontSize: 14,
                  formatter: function (params) {
                    var percent = 0;
                    var total = 0;
                    percent = ((params.value ) * 100).toFixed(0);
                    if (params.name !== "") {
                      return `${params.name}：\t${params.value}个\n`;
                    } else {
                      return "";
                    }
                  },
                },
              },
            },
            data: [{
              value: completNum,
              name: "已完成",
              itemStyle: { color: "#2fb6ee" },
              labelLine: { color: "#2fb6ee" },
            },{
              value: 0.1,
              itemStyle: {
                normal: {
                  label: { show: false },
                  labelLine: { show: false },
                  color: "rgba(0, 0, 0, 0)",
                  borderColor: "rgba(0, 0, 0, 0)",
                  borderWidth: 0,
                },
              },
            },{
              value: conductNum,
              name: "进行中",
              itemStyle: { color: "#dce63e" },
              labelLine: { color: "#dce63e" },
            },{
              value: 0.1,
              itemStyle: {
                normal: {
                  label: { show: false },
                  labelLine: { show: false },
                  color: "rgba(0, 0, 0, 0)",
                  borderColor: "rgba(0, 0, 0, 0)",
                  borderWidth: 0,
                },
              },
            },{
              value: noStartNum,
              name: "未开始",
              itemStyle: { color: "#e68d3e" },
              labelLine: { color: "#e68d3e" },
            },{
              value: 0.1,
              itemStyle: {
                normal: {
                  label: { show: false },
                  labelLine: { show: false },
                  color: "rgba(0, 0, 0, 0)",
                  borderColor: "rgba(0,0,0,0)",
                  borderWidth: 0,
                },
              },
            }],
          },{
            type: "pie",
            data: [25, 25, 25, 25],
            startAngle: 45,
            z: 1,
            label: {
              position: "inside",
            },
            radius: ['0%', '95%'],
            itemStyle: {
              color: "#2fb6ee4d",
            },
            silent: true,
            clockwise: true,
            animation: false,
          },{
            type: "pie",
            data: [25, 25, 25, 25],
            startAngle: 45,
            z: 1,
            label: { position: "inside" },
            radius: ['70%', '71%'],
            itemStyle: {
              color: "#2fb6ee",
              borderWidth: 10,
              borderColor: '#2fb6ee4d'
            },
            silent: true,
            clockwise: true,
            animation: false,
          },{
            type: "pie",
            clockWise: false,
            radius: ['93%', '95%'],
            itemStyle: {
              normal: {
                label: { show: false },
                labelLine: { show: false },
              },
            },
            hoverAnimation: false,
            startAngle: 90,
            label: {
              borderRadius: "10",
            },
            data: [{
              value: 80,
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#ffffff00" },
                    { offset: 1, color: "#2fb6ee" },
                  ]),
                },
              },
            },{
              value: 20,
              tooltip: { show: false },
              itemStyle: {
                normal: {
                  color: "#ffffff00",
                  label: { show: false },
                  labelLine: { show: false },
                },
                emphasis: { color: "#ffffff00" },
              },
            }],
          }],
        }
      }
    }
}
</script>

<style lang="scss" scoped>
.chart_div{
    width:100%;
    height:100%;

    .bc_detial_info{
      position: absolute;
      right: 20px;
      top: 15px;
      cursor: pointer;
    }
}
::v-deep.el-loading-mask{
    background-color: rgba(255,255,255,.0);
}
.container_chart{
    height:100%;
}
</style>


