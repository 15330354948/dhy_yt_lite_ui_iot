<template>
  <div class="main">
    <div class="video_box">
      <div class="null">
        <iframe
          ref="iframeYSY"
          :src="
            baseUrl11 +
            'realmonitor/yingshiyun.html?deviceId=' +
            devData.row.id
          "
          class="monitor-content"
          id="ysy"
          style="height:calc(100%)"
          :data-url="serveUrl"
        >
        </iframe>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import {baseUrl} from "@/config/env"
export default {
  name: "seeInfo",
  props: ["devData"],
  computed: {
    ...mapGetters(["permissions"]),
  },
  watch: {},
  data() {
    return {
      iframeWin: {},
      baseUrl11: process.env.BASE_URL,
      serveUrl: baseUrl, //IP地址:vue.config.js文件中的baseUrl值
      videoShow: false,
      model_style: {
        width: "1200px",
        height: "calc(100% - 140px)",
        top: "80px",
        left: "50%",
        marginLeft: "-600px",
      },
    };
  },
  created() {
    setTimeout(() => {
      this.sendMessage();
    }, 1000);
  },
  mounted() {
    this.iframeWin = this.$refs.iframeYSY.contentWindow;
  },
  methods: {
    sendMessage() {
      this.iframeWin.postMessage(
        {
          cmd: "getFormJson",
          params: this.devData,
        },
        "*"
      );
    },
  },
};
</script>
<style lang="stylus" scoped>
$back_color = #238bf1;
$font_color = #3a3a3a;
$font_big = 18px;
$font-small = 14px;

>>>::-webkit-scrollbar {
  width: 3px !important;
  height: 10% !important;
}

.el-icon-close {
  cursor: pointer;
}

.addpanju_btn {
  background: $back_color;
  color: white;
}

.model_tanc {
  position: fixed;
  background: white;
  z-index: 2000;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

.main {
  height: 660px;
  display: flex;
  justify-content: center;
  background: rgba(0 0 0 0.75);
}

.video_box {
  width: 92%;
  border: 1px solid #000;
  padding: 20px 20px;
  margin: 20px 20px;
}

.video-player {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100px;
  border: 1px solid transparent;
  overflow: hidden;
  background: #fff;
  position: relative;

  >>>.video-js {
    height: 100%;
  }
}

.null {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.monitor-content {
  width: 100%;
  padding-top: 10px;
  height: 100%;
  border: none;
}
</style>