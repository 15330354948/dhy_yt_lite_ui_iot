<!--
 * @Author: your name
 * @Date: 2021-01-28 16:01:53
 * @LastEditTime: 2021-03-15 16:10:58
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\components\chartcom\index.vue
-->
<template>
  <div class="container_chart">
    <div v-show="chartShow == true" class="echarts" :id="echartIdName"></div>
    <div v-show="chartShow == false" class="echarts">
      <div style="text-align:center;"><img src="@/assets/img/nodataBig.png"/></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts"
import 'echarts-liquidfill'
// 父级页面需要判断option的数据是否为空
import {mapGetters} from "vuex"
import store from "@/store";

export default {
  name: "chart-component",
  props: ["options"],
  data() {
    return {
      chart: null,
      chartShow: true,
    };
  },
  created() {},
  mounted() {

    //延迟渲染
    this.$nextTick(_=>{
      this.drawCharts();
      window.addEventListener("resize", this.handleWindowResize);
    })
  },
  computed: {
    echartIdName() {
      return "echarts" + Math.random().toString(36).slice(-6);
    },
    ...mapGetters(['cavasRefresh'])
  },
  watch: {
    options(x, y) {
      this.updateData(x||{})
    },
    cavasRefresh(str){
      // if(str == "tab1"){
      //   this.handleWindowResize();
      // }
    }
  },
  methods: {
    drawCharts() {
      this.chart = this.$echarts.init(
        document.getElementById(this.echartIdName)
      );
      this.isShowChart(this.options)
      this.chart.setOption(this.options || {}, true);
      this.bindListen(this.chart)
    },
    bindListen(myChart){
      let that = this;
      myChart.on("click",function(params){
        store.commit("ThreeModelTime", params.name);
      })
    },
    handleWindowResize() {
      if (!this.chart) return;
      this.chart.resize();
    },
    updateData(data) {
      this.isShowChart(data)
      this.chart.setOption(data || {}, true);
    },
    isShowChart(data) {
      if (data && JSON.stringify(data) != "{}") {
        this.chartShow = true;
      } else {
        this.chartShow = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container_chart {
  width: 100%;
  height: 100%;
  .echarts {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
