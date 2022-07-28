<!--
 * @Author: 张峻霖
 * @Date: 2021-03-11 09:09:53
 * @LastEditTime: 2021-09-30 16:09:40
 * @LastEditors: 张峻霖
 * @Description: 载点详情底部列表
 * @FilePath: \LH-UI\src\views\wel\analysisModule\details\lengend\index.vue
-->
<template>
  <div class="details_body">
    <div
      class="lengend-map"
      :class="{'home-lengend': isHomePage}"
      :style="{ right: !isFullPage ? isHomePage ? `${rightWidth}px` : '0' : '0' }">
      <!--  -->
      <div class="layer" v-if="analysisDetails.status || isHomePage ">
        <el-button type="primary" @click="changeLengend('layer')">
          <i class="iconfont icon-tuli"></i>图例
        </el-button>
      </div>

      <div
        class="detailsLendend"
        :class="{
          'is-lengend': isanalysisDetails,
          'is-full-lengend': isHomePage,
          'is-home-langend': isHomeDetails
        }">
        <div class="lengend-title">图例</div>
        <div class="lengend-body">
          <div v-if="isHomePage">
            <!-- <div v-for="item in warnImgAll" :key="item.id">
              <p class="lengend-lable">
                <img :src="require(`@/assets/img/mapIcon/${item.value}.png`)" alt="" />
                <span>{{ item.label }}</span>
              </p>
            </div> -->
            <div v-for="item in monitorIcon" :key="item.id">
              <p class="lengend-lable">
                <img :src="require(`@/assets/img/mapIcon/${item.value}.png`)" alt="" />
                <span>{{ item.label }}</span>
              </p>
            </div>
          </div>
          <div v-else>
            <div v-for="item in imgAll" :key="item.id">
              <p class="lengend-lable">
                <img :src="require(`@/assets/img/mapIcon/${item.value}.png`)" alt="" />
                <span>{{ item.label }}</span>
                <!-- <i class="iconfont" :class="item.visualStatus?'icon-kejian':'icon-yanjing_yincang'" @click="changeMonitorShow(item)"></i> -->
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { newDeviceType } from "@/api/monitorManage/device";
import { getsearchType } from "@/api/hideDanger/obj";

export default {
  name: "lengendModule",
  data() {
    return {
      activeName: ["1"],
      isanalysisDetails: false,
      isHomeDetails: false,
      isHomePage: true,
      isFullPage: false,
      lengendIconStatus: false,
      imgAll: [],
      rightWidth: 0,
      warnImgAll: [{
        id: 1,
        label: "蓝色告警",
        value: "blue-warn",
      },{
        id: 2,
        label: "黄色告警",
        value: "yellow-warn",
      },{
        id: 3,
        label: "橙色告警",
        value: "orange-warn",
      },{
        id: 4,
        label: "红色告警",
        value: "red-warn",
      }],
      monitorIcon: []
    };
  },
  computed: mapGetters(["isDataAnalysis", "analysisDetails", "projectId", "viewConfig"]),
  watch: {
    isDataAnalysis: {
      handler(oVal, nVal) {
        this.isHomePage = !oVal.status;
        this.isHomeDetails = false
        if (this.isHomePage) {
          let rightVal = document.getElementsByClassName(
            "data_analysis_bottom_right"
          )[0].offsetWidth;
          this.rightWidth = rightVal + 30;
        }
      }
    },
    'analysisDetails': {
      handler(val) {
        this.isanalysisDetails = val.status;
        this.activeName = ["1"];
      },
      deep: true,
    },
    'projectId': {
      handler(oVal, nVal) {
        if( oVal ){
          this.isHomeDetails = false
          this.getDevType()
        }
      }
    },
    viewConfig: {
      handler(nc, oc) {
        if(nc.panelCount && nc.panelCount == 1 || nc.panelCount == 2){
          this.isFullPage = true
        }else{
          this.isFullPage = false
        }
      },
      deep: true
    }
  },
  mounted() {
    setTimeout(() => {
      let rightVal = document.getElementsByClassName(
        "data_analysis_bottom_right"
      )[0].offsetWidth;
      this.rightWidth = rightVal + 30;
    }, 1000);

    this.getDevType()
  },
  methods: {
    getDevType(){
      newDeviceType({
        projectId: this.projectId
      }).then(v => {
        this.imgAll = v.data.data;
        this.imgAll.forEach(icons=>{
          icons.visualStatus = true
        })
      })
      getsearchType({projectId:this.projectId}).then(v => {
        this.monitorIcon = v.data.data
      })
    },
    changeMonitorShow(data) {
      this.$nextTick(() => {
        this.imgAll.forEach(icons=>{
          if(icons.id == data.id){
            icons.visualStatus = !icons.visualStatus
          }
        })
      });
    },
    changeLengend(){
      if(!this.isHomePage){
        this.isHomeDetails = !this.isHomeDetails
      }else{
        this.isHomeDetails = false
        this.isanalysisDetails = !this.isanalysisDetails
      }
    },
    getMapIcon(name) {
      require([`@/assets/img/mapIcon/${name}.png`], (res) => {
      }, (_) => {
        resovle(require("@/assets/img/mapIcon/default.png"));
        console.warn(`提示: 未发现${name}.png图片`);
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.home-lengend {
  right: 28.5%;
}
.lengend-map{
  position: absolute;
  width: auto;
  height: auto;
  right: 28.5%;
  bottom: 25px;
  margin: 15px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: top 0.8s, right 0.8s;
  user-select: none;

  .layer{
    position: relative;
    z-index: 1001;
    .el-button {
      height: 56px;
      width: 48px;
      padding: 0 5px;
      border-radius: 5px;
      background-color: #57a0f8c7;
      ::v-deep span {
        display: flex;
        justify-content: center;
        align-content: space-around;
        flex-wrap: wrap;
        height: 100%;
        width: 100%;
        .iconfont {
          font-size: 24px !important;
        }
      }
    }
  }
}
.detailsLendend {
  color: #fff;
  position: absolute;
  width: 12vw;
  height: auto;
  max-height: 300px;
  right: -145px;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  overflow: hidden;
  visibility: hidden;
  opacity: 0;
  transition: bottom 0.6s, right 0.6s, opacity 0.6s;

  .lengend-title {
    height: 50px;
    line-height: 50px;
    width: 100%;
    border-radius: 6px 6px 0px 0px;
    font-size: 18px;
    text-indent: 25px;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
  .lengend-body {
    height: auto;
    max-height: 300px;
    padding: 10px;
    overflow-x: auto;
    .lengend-lable{
      width: 100%;
      margin: 5px 0;
      display: flex;
      justify-content: left;
      img{
        border: 0;
        display: inline-block;
        width: 24px;
        height: 24px;
        padding: 2px;
        margin: 0 5px;
        background: #fff;
        border-radius: 6px;
      }
      span{
        text-align: left;
        display: inline-block;
        width: calc( 100% - 50px);
      }
      i {
        display: inline-block;
        width: 20px;
        cursor: pointer;
      }
    }
  }
}
.detailsLendend.is-lengend {
  right: 60px !important;
  visibility: visible;
  opacity: 1;
}

.detailsLendend.is-home-langend {
  right: 60px;
  visibility: visible;
  opacity: 1;
}

.detailsLendend.is-full-lengend{
  right: -145px;
}


</style>
