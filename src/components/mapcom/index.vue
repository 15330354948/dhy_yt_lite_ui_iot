<!--
 * @Author: your name
 * @Date: 2021-01-28 16:01:53
 * @LastEditTime: 2021-04-25 16:50:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\components\mapcom\index.vue
-->
<template>
  <div class="map_container">
    <!-- style="width: 100%; height: 620px" -->
    <div class="mapIdBox" :id="mapIdName">
      <div class="coord-bar">
        <span>
          经度:
          <em v-text="coord.lon"></em>
        </span>
        <span>
          纬度:
          <em v-text="coord.lat"></em>
        </span>
        <span>
          高度:
          <em v-text="coord.height"></em>
        </span>
      </div>

      <div id="model_pop">
        <el-dialog
          class="model_pop"
          append-to-body
          :close-on-click-modal="false"
          title="基础信息"
          :visible.sync="dialogVisible"
          width="50%">
          <el-form ref="tableDataForm" :model="tableData" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="工程名称">
                  <el-input disabled v-model="tableData.gcmc"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="钻孔编号">
                  <el-input disabled v-model="tableData.zkbh"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="坐标X">
                  <el-input disabled v-model="tableData.wd"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="坐标Y">
                  <el-input disabled v-model="tableData.jd"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="孔口高程">
                  <el-input disabled v-model="tableData.H"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="孔口深度">
                  <el-input disabled v-model="tableData.G"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="钻孔类型">
                  <el-input disabled v-model="tableData.zktype"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="开工时间">
                  <el-input disabled v-model="tableData.start"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="竣工时间">
                  <el-input disabled v-model="tableData.finish"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import pgearthsBaseMap from "./pgearthsBaseMap";
import { mapGetters } from "vuex";
export default {
  name: "mapcomponent",
  data() {
    return {
      coord: {
        lon: "0.0000°",
        lat: "0.0000°",
        height: "0.0000m",
      },
      activeMap: 1,
      dialogVisible: false,
      tableData: {}
    };
  },
  computed: {
    mapIdName() {
      return "mapId" + Math.random().toString(36).slice(-6);
    },
    ...mapGetters(["isDataAnalysis","userInfo"]),
  },
  created() {},
  mounted() {
    let rootProto = this.$root.constructor.prototype;
    rootProto.mapFunc = pgearthsBaseMap.initBaseMap(this.mapIdName, this);
    if(this.userInfo && JSON.stringify(this.userInfo)!={} && this.userInfo.longitude && this.userInfo.latitude){
      pgearthsBaseMap.goView({
        longitude: this.userInfo.longitude,
        latitude: this.userInfo.latitude,
        height: 8000
      });
    }
    this.$on("show-info-box", data => {
      let model_pop = document.getElementById("model_pop");
      this.dialogVisible = true;
      data.map(ele=>{
        this.tableData[ele.date] = ele.name
      })
      setTimeout(() => {
        let scroll_body = model_pop.querySelector(
          ".el-table__body-wrapper.is-scrolling-none"
        );
        scroll_body.scrollTop = 0;
      }, 500);
    });
  },
  methods: {},
  watch: {
  },
};
</script>
<style scoped lang="scss">
.map_container {
  color: #fff;
  > div {
    width: 100%;
    height: 100%;
  }
  .mapIdBox {
    position: relative;
    .coord-bar {
      position: absolute;
      width: 40rem;
      height: 0;
      bottom: 0;
      left: calc(50% - 20rem);
      z-index: 1;
      color: #fff;
      font-size: 12px;
      line-height: 25px;
      border-bottom: 25px solid rgba(1, 10, 22, 0.65);
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
      pointer-events: none;
      text-align: center;
      > span {
        margin: 0 10px;
      }
    }

    .tab_map {
      position: absolute;
      bottom: 30px;
      left: 10px;
      height: 100px;
      z-index: 1;
      img {
        width: 120px;
        height: 100%;
        margin: 2px 5px;
        border: 1px solid #fff;
        border-radius: 5px;
        cursor: pointer;
      }
      img.is_active {
        border: 1px solid #377dff;
      }
    }
  }
  ::v-deep #navigationDiv {
    display: none;
  }
}
</style>

<style lang="scss" scoped>
::v-deep.el-dialog{
  background: #00000080;
  .el-dialog__header{
    background: #0000004d;
    .dialog__title{
      color: #fff;
    }
  }
  .el-dialog__body{
    .el-form-item__label{
      color: #fff;
    }
    .el-input__inner{
      background: transparent;
      border: none;
      color: #fff;
    }
  }
}
</style>
