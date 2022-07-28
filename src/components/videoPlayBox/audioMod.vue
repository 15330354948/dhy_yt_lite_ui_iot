<template>
  <div class="bc_audio-main">
    <div v-if="audioId && audioTitle" class="bc_audio-box">
      <div class="bc_audio-view">
        <div id="divPlugin" class="plugin" style="height:100%;">
            <div :id="'video-container' + audioId" style="width:100%;height:100%"></div>
        </div>
      </div>
      <div class="bc_audio-title"><span>{{audioTitle}}</span></div>
      <div class="bc_audio-btn" v-if="!screenfull">
        <el-button icon="el-icon-edit-outline" type="primary" @click="editVideo" title="修改视频"></el-button>
        <el-button icon="el-icon-delete" type="primary" @click="deleteVideo" title="删除视频"></el-button>
      </div>
    </div>

    <div class="bc_audio-add" @click="addVideo" v-else></div>

    <el-dialog
      append-to-body
      title="视频列表"
      :visible.sync="changeVideo"
      width="30%"
      :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="选择视频">
          <el-select v-model="ruleForm.audioValue" placeholder="请选择">
            <el-option
              v-for="item in audioDataOther"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeVideo = false">取 消</el-button>
        <el-button type="primary" @click="getChangeVideo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EZUIKit from "ezuikit-js";
import { getVideoData, getAccessToken, moveVideoStart, moveVideoEnd } from "@/api/monitorManage/video";
import { getStore } from '@/util/store'

export default {
  name:"audioMod",
  props: ['audioData', "fullStatus"],
  data(){
    return {
      butType: "",
      player: "",
      screenfull: "",
      audioId: "",
      audioTitle: "",
      videoDataObj: {},
      vData:{
          accessToken:'',
      },
      ruleForm:{
        audioValue: ""
      },
      changeVideo: false,
      audioDatas: [],
      audioDataNow: {},
      audioDataAll: [],
      audioDataOther: [],
      rules: {
        audioValue: [
          { required: true, message: '请选择视频', trigger: 'blur' }
        ],
      }
    }
  },
  mounted(){
    this.audioDataNow = this.audioData
    this.audioId = this.audioData.value
    this.audioTitle = this.audioData.label
    if(this.audioId){
      this.getVideoUrl(this.audioId)
    }
    this.audioDataAll = JSON.parse(getStore({ name: 'videoAll' }))
    this.audioDataOther = JSON.parse(getStore({ name: 'videoOther' }))
  },
  methods:{
    getToken(){
      getAccessToken({
        appKey:this.videoDataObj.videoAppkey,
        appSecret:this.videoDataObj.videoAppsecret,
      }).then(res => {
        if(res.data.data && res.data.data.accessToken){
          this.vData.accessToken = res.data.data.accessToken;
        }
      }).then(res => {
        if(this.vData.accessToken){
          setTimeout(()=>{
              this.refreshVideoSing(this.audioId)
          },1000)
        }
      })
    },

    changeToSDVideo(url) {
      let SDurl = ""
      if(typeof url === 'string'){
        SDurl = url.replace(/\.hd/, "")
      }
      return SDurl
    },

    getVideoUrl(val) {
      getVideoData(val).then(res => {
        this.videoDataObj = res.data.data;
        this.getToken();
      })
    },

    refreshVideoSing(id){
      if(this.player == undefined || this.player == ""){
        this.player =  new EZUIKit.EZUIKitPlayer({
          autoplay: false,
          id: "video-container" + id,
          accessToken: this.vData.accessToken,
          url: this.changeToSDVideo(this.videoDataObj.videoMonitorAddress),
          template: "standard", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
        });
      }else{
        this.player = undefined
      }
    },
    getChangeVideo() {
      this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.player = undefined

            this.changeVideo = false;
            this.getVideoUrl(this.ruleForm.audioValue);
          } else {
            return false;
          }
        });
    },

    addVideo() {
      this.butType = 'add'
      this.audioDataOther = JSON.parse(getStore({ name: 'videoOther' }))
      this.changeVideo = !this.changeVideo
    },

    editVideo() {
      this.butType = 'edit'
      this.audioDataOther = JSON.parse(getStore({ name: 'videoOther' }))
      this.changeVideo = !this.changeVideo
    },
    deleteVideo() {
      this.$confirm('确认删除当前视频？').then(_ => {
        this.audioTitle = ""
        this.audioId = ""
        this.player = undefined
        this.$emit('putDelArray', this.audioDataNow )
        this.audioDataOther = JSON.parse(getStore({ name: 'videoOther' }))
        done();
      }).catch(_ => {

      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        done();
      }).catch(_ => {

      });
    }
  },
  watch:{
    'fullStatus':{
      handler(n,o){
        this.screenfull = n
      },
      immediate: true
    },
    "ruleForm.audioValue":{
      handler(newVal,oldVal){
        let newAudio = ""
        let oldAudio = ""
        if(newVal){
          if(oldVal == ""){
            newAudio = this.audioDataOther.filter(res=>{
              return res.value == newVal
            })[0]
          }else{
            newAudio = this.audioDataAll.filter(res=>{
              return res.value == newVal
            })[0]
            oldAudio = this.audioDataAll.filter(res=>{
              return res.value == oldVal
            })[0]
          }
          this.audioTitle = newAudio.label
          this.audioId = newAudio.value
          this.$emit('putDelArray', newAudio, oldAudio, this.butType)
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
.bc_audio-view{
  .plugin{
    width: 100%;
    height: 100%;
    div{
      width: 100%;
      height: 100%;
      iframe{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.bc_audio-main{
  position: relative;
  width: 100%;
  height: 100%;
  .bc_audio-box{
    width: 100%;
    height: 100%;
    .bc_audio-view{
      width: 100%;
      height: calc(100% - 30px);

    }
    .bc_audio-title{
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    .bc_audio-btn{
      position: absolute;
      right: 5px;
      bottom: 0;
      height: 30px;
      overflow: hidden;
    }
  }

  .bc_audio-add{
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../../assets/img/icon/add.png') no-repeat center;
    background-size: 50px 50px;
    cursor: pointer;
  }
}
</style>
