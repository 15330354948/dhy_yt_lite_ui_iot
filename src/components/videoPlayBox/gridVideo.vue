<template>
  <div class="content-main" ref="contentDiv" :style="{height:devVideo?'80vh':'100%'}">
    <div v-for="(item,index) in videoList" :key="index" class="bc_video-box">
      <audio-mod :audioData="item" :fullStatus="fullscreen" @putDelArray="getDelectList"></audio-mod>
    </div>
  </div>
</template>

<script>
import audioMod from "./audioMod.vue"
import { getStore, setStore } from '@/util/store'

export default {
  name: "videoBox",
  props: ["devData","devVideo"],
  components: {audioMod},
  data(){
    return {
      teleport: true,
      fullscreen: false,
      videoList: [],
      videoListAll: [],
      videoDataList: {},
      videoIdList: [],
      delectList:[],
      videoPause: []
    }
  },
  created(){
    let self = this;
    this.$nextTick(function () {
      window.onresize = function() {
        if (!self.checkFull()) {
          self.fullScreenESC();
        }
      }
    });
    
  },
  methods:{
    getDatas(data){
      if(getStore('videoPlay') && JSON.parse(getStore('videoPlay')).length>0){
        this.videoList = JSON.parse(getStore('videoPlay'))
        return
      }else{
        this.videoList = []
      }
      this.videoIdList = []
      data.forEach(ele => {
        let len = ele.children.length;
        for(let i = 0;i<len;i++){
          this.videoList.push({ ...ele.children[i] })
          this.videoListAll.push({ ...ele.children[i] })
          setStore({ name: 'videoAll', content: JSON.stringify(this.videoListAll) , type: 'session' })
          if(this.videoList.length > 9){
            this.videoList.length = 9
          }
          setStore({ name: 'videoPlay', content: JSON.stringify(this.videoList) , type: 'session' })
        }
      })
      this.delectList = this.videoListAll.slice(9,-1)
      setStore({ name: 'videoOther', content: JSON.stringify(this.delectList) , type: 'session' })
    },
    getScreenFull() {
      let contentDiv = this.$refs.contentDiv
      this.fullscreen = !this.fullscreen
      if (contentDiv.requestFullscreen) {
        contentDiv.requestFullscreen();
      } else if (contentDiv.webkitRequestFullScreen) {
        contentDiv.webkitRequestFullScreen();
      } else if (contentDiv.mozRequestFullScreen) {
        contentDiv.mozRequestFullScreen();
      } else if (contentDiv.msRequestFullscreen) {
        // IE11
        contentDiv.msRequestFullscreen();
      }
    },
    checkFull(){
      let isFull = document.mozFullScreen || document.fullScreen || document.webkitRequestFullScreen || document.webkitIsFullScreen || document.mozRequestFullScreen || document.msFullscreenEnabled
      if(isFull === undefined){
        isFull = false
      }
      return isFull
    },
    fullScreenESC() {
      this.fullscreen = false
    },
    getDelectList(newArr, oldArr, type=false) {
      if(!type){
        this.delectList.push(newArr)
      }else if(type == 'add'){
        this.delectList = this.delectList.filter(item=>{
          return item.value != newArr.value
        })
      }else{
        this.delectList.push(oldArr)
        this.delectList = this.delectList.filter(item=>{
          return item.value != newArr.value
        })
      }
      console.log(this.delectList,'this.delectList')
      this.delectList = Array.from(new Set(this.delectList))
      setStore({ name: 'videoOther', content: JSON.stringify(this.delectList) , type: 'session' })
    }
  },
  watch:{
    "devData":{
      handler(valNew,valOld){
        if(this.devData.row.id){
          this.getData(this.devData.row.id);
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-main{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  .bc_video-box{
    position: relative;
    width: 33.3%;
    height: 33.3%;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
}
</style>