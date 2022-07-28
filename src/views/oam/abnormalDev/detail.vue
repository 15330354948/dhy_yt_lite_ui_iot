<template>
  <div class="box">
    <div class="dev_info">
      <div class="title">设备信息</div>
      <avue-form class="info_form" :option="formOption" v-model="devInfoObj">
        <template slot="location">
          <div>
            <span>{{ devInfoObj.location? devInfoObj.location : "" }}</span>
            <el-button
              type="text"
              icon="el-icon-location-information"
              v-if="(devInfoObj.longitude&&devInfoObj.latitude)?true:false"
              @click="getLocation(devInfoObj)"
            ></el-button>
          </div>
        </template>
      </avue-form>
    </div>
    <div class="tabs_box">
      <div class="title">异常信息</div>
      <div class="content_box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="设备异常记录" name="first">
            <devRecords :row.sync="toChild" @torefreshBychild="torefreshByParent"  ref='tabfirst'></devRecords>
          </el-tab-pane>
          <el-tab-pane label="处置记录" name="second">
            <disposalRecords :row.sync="toChild" ref='tabsecond'></disposalRecords>
          </el-tab-pane>
          <el-tab-pane label="运维记录" name="third">
            <oamRecords :row.sync="toChild" ref='tabthird'></oamRecords>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog
      title="定位"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="lonLatOpen"
      v-if="lonLatOpen"
      width="1000px"
    >
      <lon-lat :LatAndLon="LatAndLon"></lon-lat>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import LonLat from "@/components/Location";
//detailDevBasicInfo
import { detailDevBasicInfo } from "@/const/crud/oam/abnormalDev";
import devRecords from "./detailComponent/devRecords.vue";
import disposalRecords from "./detailComponent/disposalRecords.vue";
import oamRecords from "./detailComponent/oamRecords.vue";
import {
  deepClone,
} from '@/util/util'
export default {
  name: "",
  props: ["rowData"],
  components: {
    devRecords,
    disposalRecords,
    oamRecords,
    LonLat,
  },
  data() {
    return {
      formOption: detailDevBasicInfo,
      devInfoObj: {},
      toChild:{},
      activeName: "first",
      lonLatOpen: false,
      LatAndLon:{
        longitude:null,
        latitude:null,
      },
    };
  },
  computed: {
    ...mapGetters(["permissions", "projectId"]), //获取权限
  },
  created() {
    this.$bus.$off("getPoints");
    this.$bus.$on("getPoints", (points) => {
      if (points) {
        this.lonLatOpen = false;
      }
    });
  },
  mounted() {
    this.devInfoObj=deepClone(this.rowData)
    this.toChild=deepClone(this.rowData)
  },
  watch: {
    rowData: {
      handler(n, o) {
        this.devInfoObj=deepClone(n)
        this.toChild=deepClone(n)
      },
    },
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    getLocation(data) {
      if (this.devInfoObj.longitude && this.devInfoObj.latitude) {
        this.LatAndLon.longitude = this.devInfoObj.longitude
        this.LatAndLon.latitude = this.devInfoObj.latitude
      }
      // this.LatAndLon = {
      //   longitude: 112,
      //   latitude: 36,
      // };
      this.LatAndLon.isShow = true;
      this.lonLatOpen = true;
    },
    torefreshByParent(val){
      //o 代表运营维护记录 ， d代表处置记录
      if(val=='o'){
          this.$refs.tabthird.getList()
      }else if(val=='d'){
        this.$refs.tabsecond.getRecords()
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;

  .dev_info {
    height: 160px;
    margin: 15px 20px;
    border: 1px solid #ccc;
    overflow: hidden;

    .info_form {
      height: 125px;
    }
  }
  .tabs_box {
    margin: 0 20px;
    border: 1px solid #ccc;
    .content_box {
      // height: 550px;
      padding: 10px 20px;
      overflow: hidden;
      .el-tabs {
        height: 100%;
        .el-tabs__content {
          height: 400px;
          background-color: #ccc;
        }
      }
    }
  }
}
.title {
  height: 35px;
  line-height: 35px;
  padding-left: 20px;
  color: #333;
  font-weight: 700;
}
</style>