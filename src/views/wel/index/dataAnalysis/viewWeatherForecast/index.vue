<!--
 * @Author: 张峻霖
 * @Date: 2021-03-15 17:28:56
 * @LastEditTime: 2021-09-18 18:49:00
 * @LastEditors: 张峻霖
 * @Description: 天气图表主页
 * @FilePath: \LH-UI\src\views\wel\index\dataAnalysis\weather\index.vue
-->
<template>
  <div class="weather">
    <div class="weather_timeSelect">
      <!-- <span @click="timeSelect('todayYL')" :class="{ active: active == 'todayYL' }">今日降雨量</span> -->
      <span @click="timeSelect('todayTianqi')" :class="{ active: active == 'todayTianqi' }">今日天气</span>
      <!-- <span @click="timeSelect('todayQixiang')" :class="{ active: active == 'todayQixiang' }">今日气象预警</span> -->
      <span @click="timeSelect('weekYubao')" :class="{ active: active == 'weekYubao' }">未来七天预报</span>
    </div>
    <!-- <todayRainfall v-if="active == 'todayYL'" :childData="weatherData"></todayRainfall> -->
    <weatherOne v-if="active == 'todayTianqi'" :childData="weatherData"></weatherOne>
    <!-- <weatherTwo v-show="active == 'todayQixiang'" :childData="weatherData"> </weatherTwo> -->
    <weatherThree v-if="active == 'weekYubao'" :childData="weatherData"> </weatherThree>
  </div>
</template>

<script>
import weatherOne from "./weatherOne";
import weatherTwo from "./weatherTwo";
import todayRainfall from "./todayRainfall";
import weatherThree from "./weatherThree";
import { mapGetters } from "vuex";
import { getWeather } from "@/api/dataAnalysis/dataAnalysis";

export default {
  data() {
    return {
      active: "",
      weatherData: {},
    };
  },
  computed: mapGetters(["projectId"]),
  components: { 
    weatherOne, 
    weatherTwo,
    weatherThree,
    todayRainfall
  },
  
  mounted() {},
  methods: {
    timeSelect(val) {
      this.active = val;
    },
  },
  watch: {
    "projectId":{
      immediate: true,
      handler(newId, oldId){
        if(newId){
          getWeather({projectId:newId}).then((res) => {
            this.weatherData = res.data.data;
            this.active = "todayTianqi";
          });
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.weather {
  height: 100%;
  position: relative;
  &_timeSelect {
    display: flex;
    justify-content: center;

    span {
      display: inline-block;
      font-size: 14px;
      padding: 5px 15px;
      background: rgba(2, 101, 174, 0.4);
      margin: 0 3px;
      cursor: pointer;
    }
  }
  .active {
    color: #1ee7f2;
  }
}
.weather_timeSelect{
  white-space: nowrap!important;
}
</style>
