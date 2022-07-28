
<!-- 监测点分析 -->
<template>
  <div class="chart_div">
    <!-- <div class="bc_detial_info" @click="openDevOfflineListPop">
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
import { getDeviceDifferStatus } from '@/api/monitorManage/visua';

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
            colorList : [
                "rgb(61,192,216)",
                "rgb(44,160,180)",
                "rgb(24,122,139)",
            ]
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
      openDevOfflineListPop() {
        this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
          status: true,
          name: "offlineDevice",
          style: {
              marginTop:'0px',
              width: "50vw",
              left:'calc(50% - 60vh)',
              height: "60vh",
              title: "设备离线列表",
          },
          data: this.projectId
        });
      },
      getData(proId){
          getDeviceDifferStatus({projectId: proId}).then(res => {
            let chartData = res.data.data;
            this.option = this.initDifferOption(res.data.data)
            this.chartsTypeShow = true;
          })
      },
      initDifferOption(data){
        let dataArr = [];
        if(data.length){
          data.forEach(item=>{
            dataArr[Number(item.day)-1] = item.total;
          })
        }
        return {
            tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              textStyle: {
                color: "#fff"
              }
            },
            formatter: params => {
              var name = params[0].name;
              let data = "";
              for(var i=0;i<params.length;i++){
                data = `
                  离线时长:${name}<br/>
                  ${Number(params[i].value)}台`
              }
              return data
            }
          },
          legend: {
            data: ["离线设备"],
            right:10,
            top:0,
            itemGap: 16,
            itemWidth: 18,
            itemHeight: 10,
            textStyle: {
              color: '#fff',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12,
            }
          },
          grid: {
            x: 40,
            y: 30,
            x2: 20,
            y2: 30,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            data: ["1天", "2天", "3天", "4天", "5天", "6天", "7天", "8天及以上"],
            axisLine: {
              lineStyle: {
                width: 1,
                type: "dashed",
                opacity: 0.5,
                color: "#7FD6FF",
              }
            },
            axisTick: {show: false},
            axisLabel: {
              show: true,
              interval: 0,
              color: "#fff",
            }
          },
          yAxis: {
            type: "value",
            offset: 10,
            name: "设备/台",
            nameTextStyle: {
              color: '#fff',
            },
            axisTick: { show: true, inside: true, lineStyle: {
              opacity: 0.5,
              color: "#7FD6FF",
            }},
            minorTick: { show: true, length:4,lineStyle: {
              opacity: 0.5,
              color: "#7FD6FF",
            }},
            axisLine: { //  改变y轴颜色
              show: true,
              lineStyle: {
                width: 2,
                opacity: 0.5,
                color: "#7FD6FF",
              },
            },
            axisLabel: {
              show: true,
              color: "#fff",
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#7FD6FF",
                width: 1,
                type: "dashed",
                opacity:0.5
              },
            },
          },
          series: [
            {
              name: "离线设备",
              type: "line",
              stack: "总量",
              data: dataArr,
              itemStyle: {
                color: "#2fb6ee"
              },
            }
          ],
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
