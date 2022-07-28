<template>
  <div class="avue-contail" :class="{ 'avue--collapse': isCollapse }">
    <!-- 下面一行是意见反馈，如需使用，请打开注释 -->
    <!--  <screenshot></screenshot> -->
    <div class="avue-header" :class="{ isDataAnalysis: isDataAnalysis }">
      <!-- 顶部导航栏 -->
      <top ref="top" />
    </div>

    <div class="avue-layout" :class="{ isDataAnalysis: isDataAnalysis }">
      <div class="avue-left">
        <!-- 左侧导航栏 -->
        <sidebar />
      </div>
      <div
        class="avue-main"
        :class="{
          'avue-main--fullscreen': !isMenu,
          isDataAnalysis: isDataAnalysis,
        }"
      >
        <!-- 顶部标签卡 -->
        <tags />
        <transition name="fade-scale">
          <search class="avue-view" v-show="isSearch"></search>
        </transition>
        <!-- 主体视图层 -->
        <div
          style="
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            background: #fff;
          "
          id="avue-view"
          v-show="!isSearch"
        >
          <keep-alive>
            <router-view class="avue-view" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view class="avue-view" v-if="!$route.meta.keepAlive" />
        </div>
      </div>
    </div>
    <!-- <el-footer class="avue-footer">
      <img src="/svg/logo.svg"
           alt=""
           class="logo">
      <p class="copyright">© 2018 Avue designed by smallwei</p>
    </el-footer> -->
    <div class="avue-shade" @click="showCollapse"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import tags from "./tags";
import screenshot from "./screenshot";
import search from "./search";
import top from "./top/";
import sidebar from "./sidebar/";
import admin from "@/util/admin";
import { validatenull } from "@/util/validate";
import { calcDate } from "@/util/date.js";
import { getStore } from "@/util/store.js";
import { getDictionaries } from "@/api/admin/menu";
import store from "@/store";

export default {
  components: {
    top,
    tags,
    search,
    sidebar,
    screenshot,
  },
  name: "index",
  provide() {
    return {
      index: this,
    };
  },

  data() {
    return {
      //搜索控制
      isSearch: false,
      //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: "",
      isDataAnalysis: true,
    };
  },
  created() {
    //实时检测刷新token
    this.refreshToken();
    this.getDictionaries();
  },
  mounted() {
    this.init();
    document.title = "数据看板——IoT智能监测预警云平台";
  },
  computed: mapGetters(["isMenu", "isLock", "isCollapse", "website", "menu","viewsTopTranstion","getMenuYujing"]),
  props: [],
  watch:{
    viewsTopTranstion(str){
      this.isDataAnalysis = str.type;
    },
    getMenuYujing(str){
      // this.openMenu(str)
    }
  },
  methods: {
    showCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    // 屏幕检测
    init() {
      this.$store.commit("SET_SCREEN", admin.getScreen());
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit("SET_SCREEN", admin.getScreen());
        }, 0);
      };
    },
    //打开菜单
    openMenu(item = {}) {
      if (!item.id) {
        return;
      }
      store.commit("TOP_MENUS_TYPE",{
          type: false,
          number: Math.random().toString(36).slice(-6)
      });
      if (item.label == "数据看板" || item.label == "首页") {
        store.commit("TOP_MENUS_TYPE",{
            type: true,
            number: Math.random().toString(36).slice(-6)
        });
      }
      if (item.label == "数据看板" || item.label == "首页" && window.viewer) {
        this.$store.commit("IS_DATA_ANALYSIS", {
          status: false,
        });
        window.viewer.scene.postProcessStages.remove(this.mapFunc.lastStage);
        window.viewer.scene.postProcessStages.remove(this.mapFunc.lastStage2);
        this.mapFunc.removeLayer("secondLayer");
        this.$store.commit("IS_ANALYSIS_DETAILS", {
          status: false,
        });
      }
      this.$store.dispatch("GetMenu", item.id).then((data) => {
        if (data.length !== 0) {
          this.$router.$avueRouter.formatRoutes(data, true);
        }
        //当点击顶部菜单做的事件
        if (!this.validatenull(item)) {
          let itemActive = {},
            childItemActive = 0;
          //vue-router路由
          if (item.path) {
            // console.log('item',item,this.menu)
            itemActive=item
            let arr=[]
            function getDefaultVal(data) {//当前点击的item有子菜单时默认取第一个菜单下最里面的菜单
              if(data.children&&data.children.length>0){
                 getDefaultVal(data.children[0]) 
              }else{
                arr.push(data)
              }
              return ((arr&&arr.length>0)?arr[0]:null)
            }
            // console.log('子菜单是否有值时，有值时是：',getDefaultVal(item))
            //当前item存在子菜单时就选中子菜单，反之就是选中当前item
            getDefaultVal(item)?itemActive=getDefaultVal(item):itemActive=item
            // if(item.children&&item.children.length>0){//第一级children是否存在
            //     let citem=item.children[0]
            //     if(citem.children&&citem.children.length>0){//第二级children是否存在
            //         itemActive=citem.children[0]
            //     }else{
            //       itemActive=citem
            //     }
            // }else{
            //   itemActive=item
            // }

          } else {
            if (this.menu[childItemActive].length == 0) {
              itemActive = this.menu[childItemActive];
            } else {
              itemActive = this.menu[childItemActive].children[childItemActive];
            }
          }
          // console.log('itemActive',itemActive)
          this.$store.commit("SET_MENUID", item);
          this.$router.push({
            path: this.$router.$avueRouter.getPath(
              {
                name: itemActive.label,
                src: itemActive.path,
              },
              itemActive.meta
            ),
          });
        }
      });
    },
    // 10分钟检测一次token
    refreshToken() {
      this.refreshTime = setInterval(() => {
        const token =
          getStore({
            name: "token",
            debug: true,
          }) || {};
        const date = calcDate(token.datetime, new Date().getTime());
        if (validatenull(date)) return;
        if (date.seconds >= this.website.tokenTime && !this.refreshLock) {
          this.refreshLock = true;
          this.$store
            .dispatch("RefeshToken")
            .then(() => {
              this.refreshLock = false;
            })
            .catch(() => {
              this.refreshLock = false;
            });
        }
      }, 1000);
    },
    getDictionaries() {
      getDictionaries().then((res) => {
        this.$store.commit("SET_DICTIONARIES", {
          data: res.data.data,
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.avue-contail {
  position: relative;
}
.avue-header {
  z-index: 1200;
  padding: 0;
  display: flex;
  background: linear-gradient(to right, #142845,#0f4497);
  -moz-user-select:none;
  -webkit-user-select:none;
  user-select:none;
  // background: radial-gradient(circle, #0f4497, #142845);
  .logo_div {
    width: 430px;
    height: 64px;
    line-height: 64px;
    overflow: hidden;
    color: #fff;
    font-size: 25px;
    > .el-row {
      width: 100%;
      height: 100%;
      > .el-col {
        height: 100%;
        margin: 0;
      }
    }
    img {
      display: inline-block;
      width: 60px;
      position: relative;
      top: 2px;
      float: right;
      margin-right: 15px;
    }
  }
  .avue-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
.avue-header.isDataAnalysis {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
}
.avue-layout.isDataAnalysis {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
}
.avue-left {
  top: 72px;
  .avue-sidebar {
    padding-top: 2px;

    background: #182442;
    border-top: 1px solid #d2d8dd;
  }
}
.avue-main.isDataAnalysis {
  height: 100%;
}
</style>
