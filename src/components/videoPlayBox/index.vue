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
    <div class="col-lg-8" style="float: left; width: 80%;height:calc(100% - 70px);">
        <div id="divPlugin" class="plugin" style="height:100%;">
          <div id="video-container" v-if="datanum" style="width:100%;height:100%"></div>
          <div id="cmsv-flash" v-if="bdVideoShow" style="width:100%;height:100%"></div>
        </div>
    </div>
    <div class="col-lg-4 controlDiv" style="float: left; width: 20%;">
      <div class="boxShdow" v-if="videoOperable"></div>
      <!-- 0-上，1-下，2-左，3-右，4-左上，5-左下，6-右上，7-右下，8-放大，9-缩小，10-近焦距，11-远焦距 -->
      <h3 class="bc_video-header">云台控制</h3>
      <div style="width: 85%; margin: 0 auto;" class="control_text">
        <table cellpadding="0" cellspacing="3" border="0" style="margin: 0 auto;">
          <tr>
            <td><input type="button" class="bc_cloud-btn" value="放大+"
                    @click="startPtz(8)"></td>
            <td><input type="button" class="bc_cloud-btn" value="缩小-"
                    @click="startPtz(9)"></td>
          </tr>
          <tr>
            <td><input type="button" class="bc_cloud-btn" value="变焦+"
                    @click="startPtz(10)"></td>
            <td><input type="button" class="bc_cloud-btn" value="变焦-"
                    @click="startPtz(11)"></td>
          </tr>
        </table>
      </div>
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
                <!-- <span type="button" class="btn btn-white" value="重置" id="autoTurn" @click="startPtz(2)">
                  <img :src="require('@/assets/video/rotate.png')" style="width:38px;height:38px;">
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

      <div class="colseText" v-if="videoOperable">
        <span>*该摄像头没有以上功能</span>
      </div>
      <h3 class="bc_video-header">
        <span>预置点</span>
        <div>
          <i class="el-icon-circle-plus-outline bc_video-icon" @click="openPresetPop"></i>
          <i class="el-icon-setting bc_video-icon" @click="editPresetPoint"></i>
        </div>
      </h3>
      <div class="bc_preset-tree">
        <el-scrollbar style="height: 100%">
          <el-tree
            ref="presetTree"
            :data="presetList"
            :props="presentProps"
            show-checkbox
            default-expand-all
            node-key="value"
            @check-change="getCheckedPreset"
            @node-click="callClickPreset"
          ></el-tree>
        </el-scrollbar>
      </div>
    </div>

    <el-dialog
      :visible.sync="presentPopShow"
      v-if="presentPopShow"
      width="400px"
      top="40%"
      :title="updatePop?'修改预置点':'新增预置点'"
      class="avue-dialog"
      @close="handleEmpty"
      append-to-body
      :close-on-click-modal="false">
       <el-form :model="presentForm">
        <el-form-item label="预置点名称" label-width="80">
          <el-input v-model="presentForm.presetPointName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="!updatePop" @click="presentPopShow = false">取 消</el-button>
        <el-button v-if="updatePop" type="danger" @click="delPresetPoint">删 除</el-button>
        <el-button type="primary" @click="addPresetPoint">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import EZUIKit from "ezuikit-js";
import { mapGetters } from "vuex";
import {
    getVideoData,
    getAccessToken,
    addVideoPreset,
    callVideoPreset,
    deleteVideoPreset,
    moveVideoStart,
    moveVideoEnd,
    getPresetList,
    addPreset,
    editPreset,
    deletePreset,
    getAccessJsession,
    getJsessionControl,
    wakeupLowPowerDevice,
    getMetaDataWakeupList
} from "@/api/monitorManage/video";

export default {
  name: "videoPlayBox",
  props: ["devData","devVideo"],
  computed: mapGetters(["projectId"]),
  data() {
    return {
      player: undefined,
      swfobject: undefined,
      playerOld: undefined,
      videoDataList:{},
      datanum: false,
      bdVideoShow: false,
      ysData:{
        accessToken:'',
      },
      bdData:{
        jsession:'',
      },
      presentProps: {
        label: 'presetPointName',
        value: 'pointId'
      },
      presentForm:{
        presetPointName: ""
      },
      updatePop: false,
      videoOperable: false,
      videoIdList: [],
      videoPlayList: [],
      videoPlayArray: {},
      presentPopShow: false,
      presetList: [],
      selectPreset: [],
      bdFactoryName: ['北斗视频', '微视']
    };
  },
  watch:{
    "devData":{
        handler(valNew,valOld){
          this.datanum = false;
          this.bdVideoShow = false;
          if(valNew.row.factoryId && this.bdFactoryName.indexOf(valNew.row.factoryName)!==-1){
            this.getbdData(valNew.row.id || valNew.row.deviceId)
          }else{
            this.getData(valNew.row.id || valNew.row.deviceId);
          }
        }
    }
  },
  created() {
    //   console.log(this.devData)
  },
  mounted() {

  },
  methods: {
    supportDeviceWakeup() {
      wakeupLowPowerDevice({
        accessToken:this.ysData.accessToken,
        deviceSerial:this.videoDataList.videoSerial,
      }).then(w=>{
        console.log(w.data.data)
      })
    },

    refreshBDVideo() {
      let serverIp = this.videoDataList.videoPlayAddress.split(":")[0],
          serverPort = this.videoDataList.videoPlayAddress.split(":")[1];
      this.swfobject = new Cmsv6Player({
        domId: "cmsv-flash",
        isVodMode: true,
        lang: "zh"
      });
      this.swfobject.setLanguage('cn.xml');
      this.swfobject.setWindowNum(1);
      this.swfobject.setServerInfo(serverIp, serverPort);
      setTimeout(()=>{
        this.initRefreshBDVideo()
      },500)
    },

    initRefreshBDVideo() {
      this.swfobject.getObjectById("cmsv-flash").stopVideo(0);
      this.swfobject.getObjectById("cmsv-flash").setVideoInfo(0, this.videoDataList.factoryName);
      this.swfobject.getObjectById("cmsv-flash").startVideo(
        0,
        this.bdData.jsession,
        this.videoDataList.videoSerial,
        0,
        this.videoDataList.videoPassage,
        true
      );
    },

    refreshVideo(){
      this.supportDeviceWakeup()
      this.player =  new EZUIKit.EZUIKitPlayer({
        autoplay: true,
        id: "video-container",
        accessToken: this.ysData.accessToken,
        url: this.videoDataList.videoMonitorAddress,
        template: "standard"
      });
    },
    getJsession(){
      this.bdVideoShow = true;
      getAccessJsession({
        account:this.videoDataList.videoAppkey,
        password:this.videoDataList.videoAppsecret,
      }).then(res => {
        if(res.data && res.data.jsession){
          this.bdData.jsession = res.data.jsession;
        }
      }).then(res => {
        if(this.bdData.jsession){
            this.refreshBDVideo();
        }
      })
    },
    getToken(){
      this.datanum = true;
      getAccessToken({
        appKey:this.videoDataList.videoAppkey,
        appSecret:this.videoDataList.videoAppsecret,
      }).then(res => {
        if(res.data.data && res.data.data.accessToken){
          this.ysData.accessToken = res.data.data.accessToken;
        }
      }).then(res => {
        if(this.ysData.accessToken){
          this.refreshVideo();
        }
      })
    },

    getData(val){
      getVideoData(val).then(res => {
        this.videoOperable = !res.data.data.videoOperable;
        this.videoDataList = res.data.data;
        this.getPresetArray()
        this.getToken();
      })
    },
    getbdData(id){
      if(id){
        getVideoData(id).then(res => {
          this.videoOperable = !res.data.data.videoOperable;
          this.videoDataList = res.data.data;
          // this.getPresetArray()
          this.getJsession();
        })
      }
    },

    controlPTZ(val){
      let ptzQuery = {
        jsession:this.bdData.jsession,
        DevIDNO:this.videoDataList.videoSerial,
        Chn: this.videoDataList.videoPassage,
        Command: val,
        Speed: 1,
        Param: 1
      };
      getJsessionControl(ptzQuery)
        .then(res=>{
          if(res.data.result == 0){
            setTimeout(_=>{
              this.stopControlPTZ()
            },1000)
          }
        })
    },

    stopControlPTZ() {
      let ptzQuery = {
        jsession:this.bdData.jsession,
        DevIDNO:this.videoDataList.videoSerial,
        Chn: this.videoDataList.videoPassage,
        Command: 19,
        Speed: 1,
        Param: 1
      };
      getJsessionControl(ptzQuery)
        .then(res=>{
          console.log(res)
        })
    },

    startPtz(val){
      switch(val){
        case 0: this.controlPTZ(2)
          break;
        case 1: this.controlPTZ(3)
          break;
        case 2: this.controlPTZ(0)
          break;
        case 3: this.controlPTZ(1)
          break;
        case 4: this.controlPTZ(4)
          break;
        case 5: this.controlPTZ(6)
          break;
        case 6: this.controlPTZ(5)
          break;
        case 7: this.controlPTZ(7)
          break;
        case 8: this.controlPTZ(12)
          break;
        case 9: this.controlPTZ(13)
          break;
        case 10: this.controlPTZ(8)
          break;
        default: this.controlPTZ(9)
          break;
      }
      if(this.devData.row.factoryId !== 27){
        moveVideoStart({
          accessToken:this.ysData.accessToken,
          deviceSerial:this.videoDataList.videoSerial,
          channelNo:this.videoDataList.videoPassage,
          direction:val,
          speed:1
        }).then(res => {
          if(res){
              this.stopPtz()
          }
          // console.log(res);
        })
      }
    },
    stopPtz(val){
      moveVideoEnd({
        accessToken:this.ysData.accessToken,
        deviceSerial:this.videoDataList.videoSerial,
        channelNo:this.videoDataList.videoPassage,
      }).then(res => {
          // console.log(res);
      })
    },

    // 设置视频预置点
    setVideoPreset() {
      addVideoPreset({
        accessToken:this.ysData.accessToken,
        deviceSerial: this.videoDataList.videoSerial,
        channelNo: this.videoDataList.videoPassage,
      }).then(res => {
        let resData = res.data
        if(resData.code == "200") {
          this.$message.success('新增视频预置点成功')
          let addQuery = {
            presetPointName: this.presentForm.presetPointName,
            deviceId: this.videoDataList.id,
            projectId: this.projectId,
            pointId: resData.data.index
          }
          addPreset(addQuery)
            .then(p=>{
              p.data.data && this.getPresetArray()
            })
        }else if(resData.code == "60008") {
          this.$message.warning('预置点个数达到上限，无法添加')
        }else{
          this.$message.error('云台当前操作失败')
        }
      })
    },

    callClickPreset(node){
      if(node && node.pointId){
        this.useVideoPreset(node.pointId)
      }
    },

    // 调用视频预置点
    useVideoPreset(index) {
      callVideoPreset({
          accessToken:this.ysData.accessToken,
          deviceSerial:this.videoDataList.videoSerial,
          channelNo:this.videoDataList.videoPassage,
          index: index
      }).then(res => {
        let resData = res.data
        if(resData.code == "200") {
          this.$message.success('调用预置点成功')
        }
      })
    },

    removeVideoPreset(index) {
      deleteVideoPreset({
        accessToken:this.ysData.accessToken,
        deviceSerial:this.videoDataList.videoSerial,
        channelNo:this.videoDataList.videoPassage,
        index: index
      }).then(res => {
        // console.log(res);
        return;
      })
    },

    refreshVideoSing(){
      for(var key in this.videoPlayArray){
        let item = this.videoPlayArray[key]
        if(item.videoMsg !== undefined){
          this.player = new EZUIKit.EZUIKitPlayer({
            autoplay: true,
            id: 'video-container', //Object.keys(this.videoPlayArray).length > 1 ? `video-container${item.number}`:
            accessToken: this.ysData.accessToken,
            url: item.videoMsg.videoMonitorAddress, //this.videoDataList.videoMonitorAddress, //playUrl
            template: "standard", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
              // 视频上方头部控件
              //header: ["capturePicture", "save", "zoom"], // 如果templete参数不为simple,该字段将被覆盖
              //plugin: ['talk'],                       // 加载插件，talk-对讲
              // 视频下方底部控件
              // footer: ["talk", "broadcast", "hd", "fullScreen"], // 如果template参数不为simple,该字段将被覆盖
              // audio: 0, // 是否默认开启声音 0 - 关闭 1 - 开启
              // openSoundCallBack: data => console.log("开启声音回调", data),
              // closeSoundCallBack: data => console.log("关闭声音回调", data),
              // startSaveCallBack: data => console.log("开始录像回调", data),
              // stopSaveCallBack: data => console.log("录像回调", data),
              // capturePictureCallBack: data => console.log("截图成功回调", data),
              // fullScreenCallBack: data => console.log("全屏回调", data),
              // getOSDTimeCallBack: data => console.log("获取OSDTime回调", data),
          });
        }
      }
    },

    getDataSing(val){
        if(Object.keys(this.videoPlayArray).length > 0){
            for(let key in this.videoPlayArray){
                if(key !== val){
                    delete this.videoPlayArray[key]
                }
            }
        }
        if(this.videoIdList.indexOf(val) !== -1){
            getVideoData(val).then(res => {
                this.videoOperable = !res.data.data.videoOperable
                this.videoDataList = res.data.data;
                this.getToken('sing');
            })
            return;
        }else{
            this.videoIdList.push(val)
            getVideoData(val).then(res => {
                this.videoOperable = !res.data.data.videoOperable
                this.videoDataList = res.data.data;
                this.videoPlayArray[val] = {
                    number: val,
                    selection: false,
                    videoMsg: res.data.data
                }
                this.getToken('sing');
            })
        }
    },

    getPresetArray() {
      let getQuery = {
        deviceId: this.videoDataList.id,
        projectId: this.projectId
      }
      getPresetList(getQuery)
        .then(arr=>{
          if(!arr.data.code){
            this.presetList = arr.data.data
          }
        })
    },
    /**
     * 新增预置点弹窗
     * @constructor
     */
    openPresetPop() {
      this.presentPopShow = true
      this.updatePop = false
      this.presentForm = {
        presetPointName: ""
      }
    },

    /**
     * 新增预置点
     */
    addPresetPoint() {
      if(this.updatePop){
        let editQuery = {
          presetPointName: this.presentForm.presetPointName,
          deviceId: this.videoDataList.id,
          projectId: this.projectId,
          pointId: this.selectPreset[0].pointId,
          id: this.selectPreset[0].id
        }
        editPreset(editQuery)
          .then(e=>{
            e.data.data && this.getPresetArray()
          })
      }else{
        this.setVideoPreset()
      }
      this.presentPopShow = false
    },

    /**
     * 管理预置点
     * @constructor
     */
    editPresetPoint() {
      console.log(this.selectPreset)
      if(this.selectPreset.length == 1) {
        this.presentPopShow = true
        this.updatePop = true
        this.presentForm = this.selectPreset[0]
      }else{
        this.$message.warning('请选择一个预置点')
      }
    },

    /**
     * 删除预置点
     */
    delPresetPoint() {
      this.$confirm('确认删除当前预置点')
        .then(_=>{
          deletePreset(this.selectPreset[0].id)
            .then(d=>{
              if(d.data.data) {
                this.getPresetArray()
                this.removeVideoPreset(this.selectPreset[0].pointId)
                this.presentPopShow = false
                this.$message.success('删除预置点成功')
              }
            })
        })
        .catch(e=>{

        })
    },

    handleEmpty(done) {
      done();
    },

    /**
     * node改变
     */
    getCheckedPreset(node) {
      this.$refs.presetTree.setCheckedKeys([]);
      this.selectPreset = []
      this.selectPreset.push(node)
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
  margin: 20px auto;
}

.control img,
.control_text table tr td input {
  cursor: pointer;
}

.control_text table tr td {
  margin: 0 10px 10px 0;
}

.control_text table tr td input {
  margin: 5px;
}

.bc_cloud-btn{
  width: 80px;
  height: 40px;
  font-size: 16px;
  color: #fff;
  padding: 0;
  border: none;
  border-radius: 6px;
  background-color: #409EFF;
}

#cmsv-flash{
  height: 100% !important;
  width: 100% !important;
}

.plugin {
    background #000
    height 100%
    width 100%
}

.plugin-single {
    background #000
    height 100%
    width 100%
}

.plugin-video-box{
    width: 100%;
    height: 100%;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: flex-start;
    -webkit-box-align: flex-start;
    -ms-flex-align: flex-start;
    align-items: flex-start;
    -ms-flex-wrap: wrap;
    flex-flow: wrap;
}

.plugin-video-singbox{
    width: 100%;
    height: 100%;
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
.content .bc_video-header{
  font-size: 18px;
  margin: 10px 20px;
  display: flex;
  justify-content: space-between;
}

.content .bc_video-header .bc_video-icon{
  color: #409EFF;
  font-size: 24px;
  margin: 5px;
  cursor: pointer;
}

.content .bc_preset-tree{
  min-height: 30vh;
  max-height: 31vh;
  height: 31vh;
  margin: 10px;
  padding: 10px;
  border: 1px solid #eeeeee8d;

  ::v-deep.el-tree{
    background: transparent;
    color: #fff;
  }

  ::v-deep.el-tree-node.is-current>.el-tree-node__content{
    color: #409eff;
    background-color: transparent;
  }

  ::v-deep.el-tree-node__content:hover{
    background: transparent;
    color: #fff;
  }

  ::v-deep.el-tree-node{
    height: 3vh;
  }
  ::v-deep.el-tree-node__content>.el-tree-node__expand-icon{
    display:none;
  }

  ::v-deep.el-checkbox__inner{
    border: 2px solid #409EFF;
    background: transparent;
  }
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
    position relative
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

<style lang="stylus">
.plugin-video-singbox>iframe{
    width 100%
    height: 100%
}
.plugin-video-box>iframe{
    width 50% !important
    height 50%  !important
}
</style>
