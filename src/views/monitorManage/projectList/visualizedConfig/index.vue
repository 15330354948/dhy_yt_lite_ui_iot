<template>
  <div class="bc_visualized-main">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="可视化配置" name="visual">
        <census-panel-config></census-panel-config>
      </el-tab-pane>
      <el-tab-pane label="数据参数配置" name="params">
        数据参数配置
      </el-tab-pane>
      <el-tab-pane label="APP轮播图配置" name="rotate">
        <app-banners :activeName="activeName"></app-banners>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import censusPanelConfig from "./censusPanelConfig.vue"
  import appBanners from "./appBanners.vue"
  import {
    mapGetters
  } from "vuex"


  export default {
    components: {
      censusPanelConfig,
      appBanners
    },
    computed: mapGetters(["projectId","permissions"]),
    data() {
      return {
        activeName: "visual"
      };
    },
    watch: {

    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
  }

</script>

<style lang='scss'>
  .bc_visualized-main {
    position: relative;
    padding: 1rem;
    width: 100%;
    height: 100%;

    .el-tabs__content {
      height: 80vh;

      .el-tab-pane {
        height: 80vh;
      }
    }

    .bc_visualized-center {
      display: flex;
      justify-content: space-between;
      align-content: center;
      width: 100%;
      height: 100%;

      .bc_visualized-component {
        width: 19vw;
      }

      .bc_visualized-view {
        width: calc(100% - 20vw);
      }

      .bc_visualized-component,
      .bc_visualized-view {
        height: 100%;
        border: 1px solid #eee;

        .bc_component-title {
          height: 3rem;
          line-height: 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f2f2f2;
          color: #000;
          margin: 0;
          padding: 0 1rem;

          .bc_title-l {
            margin: 0;
          }

          ::v-deep.el-button {
            width: 7rem;
            height: 2.5rem;
          }
        }

        .bc_component-preview {
          height: calc(100% - 3rem);
          padding: 10px;

          .chosen {
            border: 1px solid #007fff;
          }

          .bc_component-box {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 1rem;
            border: solid #eee;

            img {
              display: block;
              width: 100%;
              height: 100%;
            }

            .bc_com-box-lable {
              height: 2rem;
              line-height: 2rem;
              text-align: center;
              margin: 0;
              padding: 0;
            }
          }
        }

        .bc_component-bgbox {
          position: relative;
          height: calc(100% - 3rem);
          width: 100%;
          background: url("~@/assets/img/ordinary/modulebg.png") no-repeat;

          .bc_component-top {
            position: absolute;
            top: 5rem;
            width: 100%;
            height: 2.2rem;
            display: flex;
            justify-content: space-around;

            .bc_num-module {
              pointer-events: auto;
              width: 24.36%;
              height: 100%;
              background: rgba(123, 123, 123, 0.5);
              border-radius: 25px;
              color: #fff;
              display: flex;
              padding: 0 34px 0 34px;
              align-items: center;
              justify-content: space-between;
            }
          }

          .bc_component-selection {
            height: 100%;
            padding: 10px;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;

            .bc_select-box {
              height: auto;
              width: auto;
              max-height: 75%;
              display: flex;
              margin-bottom: 5%;
              overflow: hidden;

              .bc_component-box {
                width: 17vw;
                height: 10.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                margin-bottom: 0.7rem;
                border: solid #eee;

                img {
                  display: block;
                  width: 100%;
                  height: 100%;
                }

                .bc_none-box {
                  width: 100%;
                  height: 100%;
                  border: 1px solid #007fff;
                }
              }
            }
          }
        }
      }
    }
  }

</style>
