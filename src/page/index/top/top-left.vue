<!--
 * @Author: your name
 * @Date: 2021-02-22 16:07:34
 * @LastEditTime: 2021-04-13 17:32:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\page\index\top\top-left.vue
-->
<template>
  <div class="top_left">
    <!-- <div>
      <span
        >{{ time.year }}.{{ time.month }}.{{ time.day }} 星期{{ week }}</span
      >
      <span style="margin-left:5px;">{{ weather }}</span>
    </div> -->
    <!-- <div>{{ time.sfm }}</div> -->
    <div class="time_div">
      {{ time.sfm }}
    </div>
    <div class="date_div">
      <div style="font-size:12px;">星期{{ week }}</div>
        <div style="font-size:12px;">{{ time.year }}.{{ time.month }}.{{ time.day }}</div>
    </div>
     <!-- <el-row :gutter="20" class="new_time">
      <el-col :span="14">
        {{ time.sfm }}
      </el-col>
      <el-col  :span="10" >
        <div class="new_fontSize">星期{{ week }}</div>
        <div class="new_fontSize">{{ time.year }}.{{ time.month }}.{{ time.day }}</div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
// import { getWeather } from "@/api/dataAnalysis/dataAnalysis";
import { mapGetters } from "vuex";
import { dateFormat } from "@/util/date";
export default {
  // computed: mapGetters(["userInfo"]),
  components: {},
  data() {
    return {
      time: {
        year: "0000",
        month: "00",
        day: "00",
        sfm: "00:00:00",
      },
      week: "",
      weather: "",
    };
  },
  mounted() {
    this.week = "日一二三四五六".charAt(new Date().getDay());
     setInterval(() => {
      let date = dateFormat(new Date());
      let dateSplit = date.split(" ");
      let ymd = dateSplit[0].split("-");
      this.time = {
        year: ymd[0],
        month: ymd[1],
        day: ymd[2],
        sfm: dateSplit[1],
      };
    }, 1000);
    return
    // getWeather({
    //   lon: 114.1317358353889,
    //   lat: 22.54784904077358,
    //   projectId: this.userInfo.projectId,
    // }).then((res) => {
    //   this.weather = res.data.data.condition.condition;
    // });
   
  },
  methods: {},
  watch: {},
};
</script>

<style  lang="scss" scoped>
.top_left {
  width:100%;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  top: 20px;
 
  .time_div{
    font-size: 24px;
    font-family: 'LCDMB';
    line-height: 33px;
    text-align: center;
    color:#fff ;
  }
  .date_div{
    display: inline-block;
    color: #fff;
    position: relative; 
    right: 10px;
  }
}
</style>