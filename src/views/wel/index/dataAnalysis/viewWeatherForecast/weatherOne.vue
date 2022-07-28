<!--
 * @Author: 张峻霖
 * @Date: 2021-03-15 18:05:09
 * @LastEditTime: 2021-03-27 17:32:46
 * @LastEditors: Please set LastEditors
 * @Description: 本周天气预报
 * @FilePath: \LH-UI\src\views\wel\index\dataAnalysis\weather\weather_day.vue
-->
<template>
  <div class="weather_day">
    <!-- <div class="weather_day_chart">
      <chart-com :options="option"></chart-com>
    </div>
    <div class="weather_day_font">
      <div v-for="item in dataArry" :key="item.time">
        <div>{{ item.time }}</div>
        <div>{{ item.week }}</div>
        <div> -->
          <!-- <img
            :src="require('@/assets/img/weather/' + item.condition + '.png')"
            :alt="item.condition"
          /> -->
          <!-- {{ item.condition }}
        </div>
        <div>{{ item.direction }}</div>
        <div>{{ item.windLevelDay }}级风</div>
      </div>
    </div> -->


    <div class="img">
      <img :src="require(`@/assets/img/weather/${childData?childData.forecastVO.type:'失败'}.png`)" alt="">
      <div>{{childData?childData.forecastVO.type:"--"}}</div>
    </div>
    <div class="wendu_number">
      <div>{{childData?childData.forecastVO.wendu:'--'}}<span class="sheshidu">℃</span></div>
    </div>
    <div class="img_text">
      <div class="img_text_box">
        <div class="img_text_box_one">
          <div class="fengli"></div>
          <span>{{childData?childData.forecastVO.fx:'--'}}&nbsp;&nbsp;{{childData?childData.forecastVO.fl:'--'}}</span>
        </div>
        <div class="img_text_box_one">
          <div class="shidu"></div>
          <span>相对湿度&nbsp;&nbsp;{{childData?childData.forecastVO.shidu:'--'}}</span>
        </div>
      </div>
      <div class="img_text_box">
        <div class="img_text_box_one">
          <div class="richu"></div>
          <span>日出&nbsp;&nbsp;{{childData?childData.forecastVO.sunrise:'--'}}</span>
        </div>
        <div class="img_text_box_one">
          <div class="riluo"></div>
          <span>日落&nbsp;&nbsp;{{childData?childData.forecastVO.sunset:'--'}}</span>
        </div>
      </div>
      <div class="img_text_box">
        <div class="img_text_box_one">
          <div class="API"></div>
          <span>AQI&nbsp;&nbsp;{{childData?childData.forecastVO.aqi:'--'}}{{childData?childData.forecastVO.quality:'--'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  name:'weatherOne',
  props: ["childData"],
  data() {
    return {

    };
  },
  mounted() {
  },
  created(){
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
.weather_day {
  width:100%;
  height: calc(100% - 29px);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .img_text{
    width:60%;
    height:100%;
    padding: 5% 0 2% 20px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    .img_text_box{
      display: flex;
      align-items: center;
      .img_text_box_one{
        width:50%;
        display: flex;
        align-items: center;

        span{
          display: block;
          width: calc(100% - 24px);
          white-space:nowrap;
        }
      }
    }
    .API{
      width:24px;
      height:24px;
      display: inline-block;
      background-image: url("~@/assets/img/iconall.png");
      background-position: -4px -314px;
    }
    .fengli{
      width:24px;
      height:24px;
      display: inline-block;
      background-image: url("~@/assets/img/iconall.png");
      background-position: -36px -291px;
    }

    .shidu{
      width:24px;
      height:24px;
      background-image: url("~@/assets/img/iconall.png");
      background-position: -2px -289px;
    }
    .richu{
      width:24px;
      height:24px;
      background-image: url("~@/assets/img/iconall.png");
      background-position: -37px -269px;
    }
    .riluo{
      width:24px;
      height:24px;
      background-image: url("~@/assets/img/iconall.png");
      background-position: -2px -269px;
    }

  }
  .wendu_number{
    width:14%;
    height:100%;
    display: flex;
    margin-left: -8%;
    justify-content: center;
    align-items: center;
    div{
      font-size: 30px;
      font-weight: bold;
    }
    .sheshidu{
      font-size: 20px;
    }
  }
  .img{
    width:30%;
    height:100%;
    overflow:hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    img{
      width:35%;
      display: block;
    }
    div{
      text-align: center;
      font-size: 15px;
      font-weight: bold;
    }
  }

  
}
</style>
