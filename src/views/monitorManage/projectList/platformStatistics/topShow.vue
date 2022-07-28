<template>
  <div class="main">
    <div class="titleCon" :style="{'border-left': ('5px solid '+objData.colordata)}">
      <div class="tbox">
        <div class="thbox">
          <div style="font-size:20px">{{getNum(dataInfo)}}</div>
          <div>{{objData.tag}}</div>
        </div>
        <div class="tdabox">
          <div class="dort" :style="{background: objData.colordata}"></div><div class="text" >{{objData.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "topEcharts",
  props:["objData","dataInfo"],
  data() {
    return {
      platformData:null,
    }
  },
  created(){
    this.platformData=this.$route.query.platformData
  },
  mounted(){
  },
  methods:{
      getNum(num){
          return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      }
  }
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  margin: 5px 10px;
  .titleCon {
    border-radius: 20px;
    width: 100%;
    height: 94%;
    padding: 10px;
    box-shadow: 0 0 2px 2px #f1f1f1;
    border-radius: 0 5px 5px 0px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 10px;
    .tbox {
      padding: 10px 0;
      padding-left: 12px;
      .thbox {
        display: flex;
        color: #666;
      }
    }
    .tdabox {
      display: flex;
      padding: 10px 0;
      align-items: center;
      .dort {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 10px;
      }
      .text{
        margin-left: 10px;
        margin-top: 10px;
        color: #999;
      }
    }
  }
}
</style>