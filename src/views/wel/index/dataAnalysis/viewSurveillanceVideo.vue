<template>
    <div class="video">
        <div class="videoTxt" @click="addVideo">更多视频</div>
        <div class="img_class" @mouseenter="mouseenter" @mouseleave="mouseleave" v-loading="showTaber">
            <el-carousel class='lunbo' trigger="click" :autoplay="true">
                <el-carousel-item v-for="(item,index) in videoImg" :key="index">
                    <h3 class="small" @click.stop="clickVideo(item.name)">{{ item.name }}</h3>
                    <!-- <el-image
                     v-cloak
                        v-if="imgType"
                        @click="clickVideo(item.name)"
                        style="width: 100%; height: 100%;cursor: pointer;"
                        v-lazy="getImg(item.locationRemark,0)"
                        fit="cover">
                    </el-image>
                    <el-image
                     v-cloak
                        v-else
                        @click="clickVideo(item.name)"
                        style="width: 100%; height: 100%;cursor: pointer;"
                        v-lazy="getImg(item.locationRemark,1)"
                        fit="cover">
                    </el-image> -->
                    <img
                        v-if="imgType"
                        @click="clickVideo(item.name)"
                        style="width: 100%; height: 100%;cursor: pointer;"
                        v-lazy="getImg(item.locationRemark,0)"
                        fit="cover" />

                    <img
                        v-else
                        @click="clickVideo(item.name)"
                        style="width: 100%; height: 100%;cursor: pointer;"
                        v-lazy="getImg(item.locationRemark,1)"
                        fit="cover" />

                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getVideoImg } from "@/api/monitorManage/quxian"
import { baseUrl } from "@/config/env";

export default {
    name:'videos',
    data(){
        return{
            show:false,
            videoImg:[],
            fileUrl:baseUrl,
            showTaber:true,
        }
    },
    computed: mapGetters(["projectId"]),
    created(){
        this.todayTimeJudge();
    },
    watch:{
        "projectId":{
            immediate:true,
            handler(newId, oldId){
                if(newId) {
                    this.getImgData(newId);
                }
            }
        }
    },
    methods:{
        getImgData(proId) {
            getVideoImg({projectId: proId}).then(res => {
                this.videoImg = res.data.data;
            }).then(red=>{
                setTimeout(() => {
                    this.showTaber = false;
                }, 500);
            })
        },
        getImg(data,num){
            // console.log(this.fileUrl + "/" + data);
            // return this.fileUrl + data;
            var img = data;
            if(num == 0 && data != null){
                img = img.split(",")[0]
                return img
            }else if(num == 1 && data != null){
                img = img.split(",")[1]
                return img
            }
        },
        todayTimeJudge(){
            let time = new Date();
            let Hours = time.getHours();
            // let minute = time.getMinutes();
            // let second = time.getSeconds();
            if(Hours > 6 && Hours < 20){//为白天
                this.imgType = true;
            }else{//为晚上
                this.imgType = false;
            }
        },
        mouseleave(value){
            this.show = false;
        },
        mouseenter(value){
            this.show = true;
        },
        addVideo(){
          this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
            status: true,
            name: "videoAll",
            style: {
              marginTop:'0px',
              width: "174vh",
              left:'calc(50% - 87vh)',
              height: "87vh",
              title: "视频查看",
            },
            data: "1",//必传，不需要传就默认传任意值
          });
        },
        clickVideo(name){
          this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
              status: true,
              name: "videoAll",
              style: {
                  marginTop:'0px',
                  width: "174vh",
                  left:'calc(50% - 87vh)',
                  height: "87vh",
                  title: "视频查看",
              },
              data: name,//必传，不需要传就默认传任意值
          });
        },
    }
}
</script>

<style lang="scss" scoped>
.lunbo{
    width:100%;
    height:100%;
    ::v-deep .el-carousel__item{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ::v-deep .el-carousel__item h3 {
        color: #f9e600;
        font-size: 16px;
        opacity: 0.75;
    }
    ::v-deep .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    ::v-deep .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    ::v-deep .el-carousel__button{
        display:none;
    }
    ::v-deep .el-carousel__container{
        height:100%;
    }
}


.img_class{
    position: relative;
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow:hidden;
    border-radius: 5px;
}
.img_class_box{
    width:93%;
    height:85%;
    position: absolute;
    margin:0 auto;
    background:rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
.img_class_play{
    width:40px;
    height:40px;
    z-index: 2000;
    cursor:pointer;
}
.img_class_img{
    width:93%;
    height:85%;
    border: 2px solid #476646;
}
.video{
    width:100%;
    height:100%;
    position: relative;
    border-radius: 5px;
    padding: 2px;
    border: 2px solid #5aaf7381;

    .videoTxt{
        position: absolute;
        right: 0;
        top: -28px;
        font-size: 14px;
        cursor:pointer;
    }
}
.video-js{
    width:100%;
    height:100%;
}
::v-deep.vjs-custom-skin > .video-js{
    width:100%;
    height:100%;
}
::v-deep.video-player{
    width:100%;
    height:100%;
}
::v-deep.video-js .vjs-big-play-button {
	width: 40px !important;
    height: 40px !important;
    line-height: 40px!important;
    margin-left: -20px !important;
    margin-top: -20px !important;
    border-radius: 50% !important;
    border: 0.02666em solid #fff !important;
    left: 50% !important;
    top: 50% !important;
}
::v-deep.video-js:hover .vjs-big-play-button,
::v-deep.vjs-custom-skin>.video-js .vjs-big-play-button:focus,
::v-deep.vjs-custom-skin>.video-js .vjs-big-play-button:active {
	background-color: rgba(0, 0, 0, 0.45) !important;
}

.small{
    position: absolute;
    top:-5px;
    left:20px;
    z-index: 100;
    cursor: pointer;
}

::v-deep.el-carousel__arrow{
    background-color: rgba(0,0,0,0.55);
}
::v-deep.el-carousel__arrow:hover{
    background-color: rgba(0, 0, 0, 0.274);
}
</style>
