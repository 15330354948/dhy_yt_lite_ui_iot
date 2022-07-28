<template>
  <div class="bc_abnormal-main">
    <div class="bc_abn-left">
      <div class="bc_abn-flex-title">异常判断类型</div>
      <div class="bc_abn-left-tab" >
        <div
          v-for="item in abnormalList"
          :key="item.modName"
          class="bc_abc-left-tabs"
          :class="{
            'bc_tab-active':isActive == item.modName,
            'bc_tab-show':!item.modelShow
          }"
          @click="abnormalClick(item.modName)">
          <p>
            <i class="iconfont icon-_xiugaidingdan"></i>
            <span>{{item.navTitle}}</span>
          </p>
          <span>{{item.useStatus?'使用':'停用'}}</span>
        </div>
      </div>
    </div>
    <div class="bc_abn-right">
      <div class="bc_abn-flex-title">设置</div>
      <div class="bc_abn-right-set">
        <component
          v-if="isActive"
          @statusFun="getUseStatus"
          :is="abnormalModule.module"
          :abnData="abnormalData"
          :sensorType="sensorType"
          :sensorIds="sensorIdList"/>
      </div>
    </div>
  </div>
</template>

<script>
import { configuration } from "./configuration";
let abnormalAll = {};
configuration.forEach((e, i) => {
  abnormalAll[e.modName] = {
    id: i,
    data: e,
    title: e.navTitle,
    module: e.templateUrl
      ? require(`./${e.templateUrl}.vue`).default
      : ""
  };
});

export default {
  props: ["devListone"],
  components: {
    ...abnormalAll
  },
  data () {
    return {
      isActive: "spike",
      abnormalList: configuration,
      abnormalModule: {},
      abnormalData: {},
      sensorType: "",
      sensorIdList: []
    };
  },
  computed: {},
  mounted(){
    this.devListone.forEach(dev=>{
      this.sensorType = dev.sensorType
      this.sensorIdList.push(dev.sensorId)
    })
    this.abnormalList.forEach(config=>{
      if(config.modName == "spike" && this.sensorType == "l3_yl"){
        config.modelShow = false;
        this.isActive = 'range';
      }else{
        config.modelShow = true;
      }
    })
    this.abnormalModule = abnormalAll[this.isActive];
    this.abnormalData = abnormalAll[this.isActive].data
  },
  methods: {
    getUseStatus(data){
      this.abnormalList.forEach(configs=>{
        if(configs.modName == data.key){
          configs.useStatus = data.useStatus
        }
      })
    },
    /**
     * tabs点击事件
     * abnormalClick
     */
    abnormalClick(tab) {
      this.isActive = tab;
      this.abnormalModule = abnormalAll[this.isActive];
      this.abnormalData = abnormalAll[this.isActive].data
    },
  }
}
</script>
<style lang='scss' scoped>
.bc_abnormal-main {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  height: auto;
  .bc_abn-left{
    width: 11vw;
    margin-right: 6px;

    ::v-deep.el-tabs__header{
      width: 100%;
    }
  }
  .bc_abn-right{
    width: calc(100% - 11vw);
  }

  .bc_abn-left, .bc_abn-right{
    border: 1px solid #f5f5f5;

    .bc_abn-flex-title{
      width: 100%;
      height: 35px;
      text-align: center;
      line-height: 35px;
      font-size: 16px;
      background: #f5f5f5;
    }
    .bc_abn-left-tab{
      margin: 10px;
      .bc_abc-left-tabs{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 45px;
        width: 100%;
        cursor: pointer;
        i{
          margin-right: 5px;
        }
      }
      .bc_tab-active{
        color: #409EFF
      }
      .bc_tab-show{
        display: none;
        opacity: 0;
        visibility: hidden;
      }
    }
    .bc_abn-right-set{
      padding: 20px;
    }
  }
}
</style>

<style lang="scss">
.bc_abnormal-main{
  .bc_abn-order-main{
    position: relative;
    padding: 10px;
    p{
      margin: 4px 0;
    }
    .bc_abn-tips{
      padding: 5px 0;
      margin: 0;
      color: #F59A23;
      text-indent: 20px;
    }
    .bc_abn-tits{
      padding: 5px 0;
      margin: 0;
      font-size: 16px;
      font-weight: bold;
      color: #000;
    }

    .bc_abn-order{
      height: auto;
      margin: 10px 0;
      .bc_abn-scroll{
        min-height: 10vh;
        max-height: 40vh;
        margin: 10px 0;
        border-top: 1px solid #eee;
        overflow-x: hidden;
      }
      .bc_abn-order-card{
        position: relative;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #eee;
        border-radius: 4px;
        height: auto;
        .bc_abn-card-label{
          font-weight: bold;
        }
      }
    }
    .bc_abn-save{
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
