<!--
 * @Author: 张峻霖
 * @Date: 2021-03-11 18:40:44
 * @LastEditTime: 2021-04-26 09:50:27
 * @LastEditors: Please set LastEditors
 * @Description: 公共弹窗主页
 * @FilePath: \LH-UI\src\views\wel\analysisModule\PublicWindow\index.vue
-->
<template>
  <!-- <div class="publicWindow"> -->
  <div class="publicWindow" v-if="isPublicWindow">
    <div :style="{
        height: styleData.height,
        width: styleData.width,
        color: '#fff',
        margin: styleData.margin,
      }">
      <div class="publicWindow_title">
        <span>{{ title }}</span>
        <span @click="close" style="cursor: pointer">
          <i class="el-icon-circle-close"></i>
        </span>
      </div>
      <div>
        <component v-if="presentModule.data" :is="presentModule.module" />
      </div>
      <!-- <div class="publicWindow_title">{{ publicWindowData.name }}</div> -->
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import {
    configuration
  } from "./configuration";
  let moduleAll = {};
  configuration.forEach((e, i) => {
    moduleAll[e.moduleName] = {
      data: e,
      module: e.templateUrl ? require(`./${e.templateUrl}.vue`).default : "",
    };
  });
  export default {
    components: {
      ...moduleAll,
    },
    computed: mapGetters(["publicWindowData"]),
    data() {
      return {
        isPublicWindow: false,
        presentModule: {
          data: "",
        },
        styleData: {
          width: "600",
          height: "400",
        },
        title: "",
      };
    },
    mounted() {},
    methods: {
      close() {
        this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
          status: false,
          reset: true
        });
        this.$store.commit("SET_OCCUR_WARN", {
          status: false,
        });
      },
    },
    watch: {
      publicWindowData: {
        handler(val) {
          this.isPublicWindow = val.status;
          if (!val.status) return;

          if (val.style.marginTop) {
            this.styleData = {
              width: val.style.width,
              height: val.style.height,
              margin: "9vh auto 0",
            };
          } else {
            this.styleData = {
              width: val.style.width,
              height: val.style.height,
              margin: "13vh auto 50px",
            };
          }


          this.title = val.style.title;
          if (!val.data) return; //data必传
          for (var i in moduleAll) {
            if (val.name == i) {
              this.presentModule = moduleAll[i];
            }
          }
        },
        deep: true,
      },
    },
  };

</script>

<style scoped lang="scss">
  .publicWindow {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 2000;
    background-image: radial-gradient(rgba(0, 0, 0, 0.8),
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0));

    >div {
      border-radius: 6px;
      background: rgba(0, 0, 0, 0.5);

      .publicWindow_title {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        background: rgba(0, 0, 0, 0.3);
        background-attachment: fixed;

        span {
          display: inline-block;
        }

        span:last-child {
          float: right;
        }
      }

      >div:last-child {
        height: calc(100% - 40px);
      }
    }
  }

</style>
