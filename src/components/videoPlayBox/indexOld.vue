<!--
author：谭谋
vue集成萤石云监控视频组件，调用只需要传入摄像头id去获取摄像头所有信息，获取appkey和appSecret获取token值，去操作摄像头所有信息。
引用：
1、ezuikit-js（npm install ezuikit-js）,引用萤石云监控插件EZUIKit，
2、用自定义按钮结合萤石云平台接口控制摄像头操作。
**********************************************
此方法是目前对接萤石云实时效果延迟最低的方案。
-->
<template>
    <div class="content" id="contentDiv" :style="{height:devVideo?'80vh':'100%'}">
        <div style="width:100%;height:50px;" class="name">
            <span>{{videoDataList.disasterName}}</span>
        </div>
        <div class="col-lg-8" style="float: left; width: 75%;height:calc(100% - 70px);">
            <div id="divPlugin" class="plugin" style="height:100%;">
                <div id="video-container" v-if="datanum" style="width:95%;height:100%"></div>
            </div>
        </div>
        <div class="col-lg-4 controlDiv" style="float: left; width: 25%;">
            <div class="boxShdow" v-if="videoOperable"></div>
            <!-- 0-上，1-下，2-左，3-右，4-左上，5-左下，6-右上，7-右下，8-放大，9-缩小，10-近焦距，11-远焦距 -->
            <h3 style="font-size: 18px;">云台控制</h3>
            <div class="control">
                <table cellpadding="0" cellspacing="3" border="0" style="margin: 0 auto;">
                    <tr>
                        <td>
                            <span type="button" class="btn btn-white" value="左上" @click="startPtz(4)">
                                <img :src="require('@/assets/video/arrow.png')" style="width:38px;height:38px;">
                            </span>
                        </td>
                        <td>
                            <span type="button" style="width: 100%" class="btn btn-white" value="上" @click="startPtz(0)">
                                <img :src="require('@/assets/video/arrow.png')" style="width:38px;height:38px;transform: rotate(45deg);">
                            </span>
                        </td>
                        <td>
                            <span type="button" class="btn btn-white" value="右上" @click="startPtz(6)">
                                <img :src="require('@/assets/video/arrow.png')" style="width:38px;height:38px;transform: rotate(90deg);">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span type="button" style="width: 100%" class="btn btn-white" value="左" @click="startPtz(2)">
                                <img :src="require('@/assets/video/arrow.png')" style="width:38px;height:38px;transform: rotate(-45deg)">
                            </span>
                        </td>
                            <td>
                        <!-- <span type="button" class="btn btn-white" value="自动" id="autoTurn" >
                                        <img :src="./img/rotate.png" style="width:38px;height:38px;">
                                    </span> -->
                        </td>
                        <td>
                            <span type="button" style="width: 100%" class="btn btn-white" value="右" @click="startPtz(3)">
                                <img :src="require('@/assets/video/arrow.png')" style="width:38px;height:38px;transform: rotate(135deg)">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span type="button" class="btn btn-white" value="左下" @click="startPtz(5)">
                                <img :src="require('@/assets/video/arrow.png')" style="width:38px;height:38px;transform: rotate(-90deg)">
                            </span>
                        </td>
                        <td>
                            <span type="button" style="width: 100%" class="btn btn-white" value="下" @click="startPtz(1)">
                                <img :src="require('@/assets/video/arrow.png')" style="width:38px;height:38px;transform: rotate(-135deg)">
                            </span>
                        </td>
                        <td>
                            <span type="button" class="btn btn-white" value="右下" @click="startPtz(7)">
                                <img :src="require('@/assets/video/arrow.png')" style="width:38px;height:38px;transform: rotate(-180deg)">
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
            <div style="width: 85%; margin: 0 auto;" class="control_text">
                <table cellpadding="0" cellspacing="3" border="0" style="margin: 0 auto;">
                    <tr>
                        <td class="tt" style='width:70px;height:40px;'><input type="button" class="btn-blue" value="放大+"
                                @click="startPtz(8)"></td>
                        <td style='width:70px;height:40px;'><input type="button" class="btn-blue" value="缩小-"
                                @click="startPtz(9)"></td>
                    </tr>
                    <tr>
                        <td class="tt" style='width:70px;height:40px;'><input type="button" class="btn-blue" value="变焦+"
                                @click="startPtz(10)"></td>
                        <td style='width:70px;height:40px;'><input type="button" class="btn-blue" value="变焦-"
                                @click="startPtz(11)"></td>
                    </tr>
                </table>
            </div>
            <div class="colseText" v-if="videoOperable">
                <span>*该摄像头没有以上功能</span>
            </div>
        </div>
        <br><br>
    </div>
</template>
<script>
import EZUIKit from "ezuikit-js";

import {
    getVideoData,
    getAccessToken,
    moveVideoStart,
    moveVideoEnd
} from "@/api/monitorManage/video";

export default {
  name: "videoPlayBox",
  props: ["devData","devVideo"],
  data() {
    return {
      player:{},
      videoDataList:{},
      datanum: false,
      ysData:{
          accessToken:'',
      },
      videoOperable:false,
    };
  },
  watch:{
    "devData":{
        handler(valNew,valOld){
            this.datanum = false;
            if(this.devData.row.id == undefined || this.devData.row.id == null){

            }else{
                this.getData(this.devData.row.id);
            }
        }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    refreshVideo(){
        this.player =  new EZUIKit.EZUIKitPlayer({
            autoplay: true,
            id: "video-container",
            accessToken:this.ysData.accessToken,
            url: this.videoDataList.videoMonitorAddress,
            template: "standard", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
            // 视频上方头部控件
            //header: ["capturePicture", "save", "zoom"], // 如果templete参数不为simple,该字段将被覆盖
            //plugin: ['talk'],                       // 加载插件，talk-对讲
            // 视频下方底部控件
            // footer: ["talk", "broadcast", "hd", "fullScreen"], // 如果template参数不为simple,该字段将被覆盖
            // audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
            // openSoundCallBack: data => console.log("开启声音回调", data),
            // closeSoundCallBack: data => console.log("关闭声音回调", data),
            // startSaveCallBack: data => console.log("开始录像回调", data),
            // stopSaveCallBack: data => console.log("录像回调", data),
            // capturePictureCallBack: data => console.log("截图成功回调", data),
            // fullScreenCallBack: data => console.log("全屏回调", data),
            // getOSDTimeCallBack: data => console.log("获取OSDTime回调", data),
        });
    },
    getToken(){
        this.datanum = true;
        getAccessToken({
            appKey:this.videoDataList.videoAppkey,
            appSecret:this.videoDataList.videoAppsecret,
        }).then(res => {
            this.ysData.accessToken = res.data.data.accessToken;
        }).then(res => {
            this.refreshVideo();
        })
    },
    getData(val){
        // console.log(1122222)
        getVideoData(val).then(res => {
            this.videoOperable = !res.data.data.videoOperable;
            console.log(res.data.data.videoOperable)
            this.videoDataList = res.data.data;
            this.getToken();
        })
    },
    startPtz(val){
        moveVideoStart({
            accessToken:this.ysData.accessToken,
            deviceSerial:this.videoDataList.videoSerial,
            channelNo:this.videoDataList.videoPassage,
            direction:val,
            speed:2
        }).then(res => {
            this.stopPtz();
            // console.log(res);
        })
    },
    stopPtz(val){
        moveVideoEnd({
            accessToken:this.ysData.accessToken,
            deviceSerial:this.videoDataList.videoSerial,
            channelNo:this.videoDataList.videoPassage,
        }).then(res => {
            // console.log(res);
        })
    }
  },
  destroyed(){

  }
};
</script>
<style lang="stylus" scoped>
.control {
  width: 90%;
  height: 39%;
  margin: 10px auto;
}

.control img,
.control_text table tr td input {
  cursor: pointer;
}

.control_text table tr td {
  margin: 0 10px 10px 0;
}

.control_text table tr td input {
  width: inherit;
  height: inherit;
  margin: 10px;
}

.btn-blue {
  width: 66px;
  height: 33px;
  font-size: 16px;
  padding: 0;
  border: 1px solid #3d80fa;
  outline: 1px solid #007de7;
  outline-offset: 1px;
  background-color: #3d80fa;
}

.plugin {
  width: 98%;
    display:flex;
    justify-content:center;
    align-items :center;
}

.plugin>span {
  position: relative;
  top: 31px;
  left: 10px;
  z-index: 123;
}

.plugin video {
  width: inherit;
  height: inherit;
}
.content{
    background:rgba(0,0,0,.75);
    color:white;
}
>>>body{
    overflow :hidden;
}
.name{
    display :flex;
    align-items :center;
    margin-left:30px;
}
.controlDiv{
    position :relative;
}
.boxShdow{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width:100%;
    height:100%;
    background:#fff0;
    z-index :2000;
}
.boxShdow:hover{
    cursor:not-allowed;
}
.colseText{
    width:100%;
    color:white;
    display :flex;
    justify-content :center;

    span{
        color:#ff3b3b;
    }
}
</style>
