<!--
 * @Author: 张峻霖
 * @Date: 2021-03-11 18:51:48
 * @LastEditTime: 2021-03-17 11:14:22
 * @LastEditors: Please set LastEditors
 * @Description: 设备曲线
 * @FilePath: \LH-UI\src\views\wel\analysisModule\PublicWindow\deviceChart.vue
-->
<template>
  <div :class="quxianVideoChange?'deviceChart':'deviceVideo'">
    <dialogQuxian :dev-data="devData" v-if="quxianVideoChange"></dialogQuxian>
    <videoPlayBox :dev-data="devData" v-else></videoPlayBox>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import dialogQuxian from "@/components/jianceData/dialogQuxian";
import videoPlayBox from "@/components/videoPlayBox/index.vue";
export default {
  name:'deviceCurve',
  components: { dialogQuxian,videoPlayBox },
  data() {
    return {
      devList:{},
      devData:{},
      quxianVideoChange:false,
    };
  },
  computed: mapGetters(["publicWindowData"]),
  created(){
    this.devList.row = this.publicWindowData.data;
    if(this.devList.row.type == 6 || this.devList.row.type == '6'){
      this.quxianVideoChange = false;
      setTimeout(() => {
        this.devData = {
          row: this.publicWindowData.data
        }
      }, 0);
    }else{
      this.devData.row = this.publicWindowData.data;
      this.quxianVideoChange = true;
    }
  },
  mounted() {
    
  },
  watch: {
  },
};
</script>

<style scoped lang="scss">
.deviceChart {
  padding:50px 30px 30px 30px;
  height: 100%;
  background:white;
}
.deviceVideo{
  padding:0px;
  height: 100%;
  background:white;
}
</style>
