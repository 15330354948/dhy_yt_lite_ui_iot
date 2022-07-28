<template>
  <div>
    <div class="title">当前报表共导出<span>{{deviceData.length}}</span>个监测设备</div>
    <div class="timeChoise">
      <span>请选择需要导出时间节点：</span>
      <div class="time">
        <el-date-picker
          v-model="timeValue"
          type="datetimerange"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>
    <div class="btn_right">
      <el-button type="success" @click="uploadBtn" size="medium">导出</el-button>
    </div>

    <div class="yincang"
      v-if="loading"
      v-loading="loading"
      :element-loading-text="textLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
    </div>
  </div>
</template>

<script>
import { upLoadDeviceDataNew } from "@/api/monitorManage/quxian";
import { mapGetters } from "vuex";
export default {
  name:"uploadManyNew",
  props:["deviceData"],
  data(){
      return{
        loading:false,
        timeValue:"",
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        textLoading:"建立链接中0%...",
        timerOFF:{},
        times:0,
      }
  },
  watch:{

  },
  created(){
    console.log(this.deviceData)
    clearTimeout(this.timerOFF)
  },
  mounted(){

  },
  computed: {
    ...mapGetters(["permissions", "projectId"]),
  },
  methods:{
    lunxun(){
      this.loading = true;
      this.timerOFF = setTimeout(() => {
        this.textLoading = "建立链接中" + this.times++ + "%...";
        // console.log(this.times)
        if(this.times >= 100){
          clearTimeout(this.timerOFF)
        }else{
          this.lunxun();
        }
      },100);
    },
    uploadBtn(){
      var that = this;
      if(this.timeValue !== ""){
        var list = {
          beginTime:this.timeValue[0],
          endTime:this.timeValue[1],
          ids:this.deviceData,
          sign:0,
          projectId:this.projectId
        }

        this.times = 0;
        this.lunxun();
        upLoadDeviceDataNew(list).then(response=> {
          const blob = new Blob([response.data], {
            type: `application/zip`
          });
          let objectUrl = URL.createObjectURL(blob);
          let link = document.createElement("a");
          let fname = `多选监测数据报表.zip`;
          // let fname = `导出文件.zip`;
          link.href = objectUrl;
          link.setAttribute("download", fname);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          this.$message({
            type: "success",
            message: "链接成功!"
          });
          setTimeout(() => {
            this.times = 100;
            this.loading = false;
            this.$emit("closeUploadNew");
          }, 0);
        }).catch(res=>{
          that.loading = false;
          that.times = 0;
          clearTimeout(that.timerOFF)
          that.$message({
            type:"warning",
            message:"链接失败！"
          })
        })
      }else{
        this.$message({
          type:"warning",
          message:"请选择时间节点"
        })
      }
    },
  },
  destroyed(){
    clearTimeout(this.timerOFF);
  }
}
</script>

<style lang="scss" scoped>
.title{
  font-size:18px;

  span{
    color:rgb(0, 132, 255);
  }
}
.timeChoise{
  padding-top:20px;
  padding-bottom:20px;
  display: flex;
  align-items: center;
}
.time{
  width:60%;
  margin-left:20px;
}
.btn_right{
  width:100%;
  display: flex;
  justify-content: flex-end;
}
.yincang{
  position: fixed;
  top:0;
  right:0;
  left:0;
  bottom:0;
  width:100%;
  height:100%;
}

</style>
<style>
.alert_text{
  color:rgb(64, 93, 255);
}
</style>