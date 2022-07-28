<template>
 <!-- 监测点图层 -->
  <div class="layerTitel">
    <el-scrollbar style="height: 100%">
      <el-collapse class="bc_layer-break" :value="collapseOpen">
        <el-collapse-item v-for="(item,index) in layersModularList" :key="index" :name="item.data.moduleName">
          <template slot="title">
            <div class="bc_break-title">
              <span>{{item.data.moduleTitle}}</span>
            </div>
          </template>
          <div class="bc_break-table">
            <component 
              v-if="item.data.moduleShow" 
              :is="item.module" 
              :moduleConfig="item"
              :disasterMsg="rowData"
              :disasterId="disasterId"></component>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </div>
</template>

<script>
import { configuration } from "./layersConfigrationCopy" 
import {deepClone} from '@/util/util'
import {mapGetters} from "vuex"
let modularAll = {};
configuration.forEach((mod) => {
  modularAll[mod.moduleName] = {
    data: mod,
    module: mod.templateUrl ? require(`./${mod.templateUrl}.vue`).default : "",
  };
});

export default {
  props:["layerVisible", "rowData"],
  components:{
    ...modularAll,
  },
  data(){
    return{
      disasterId: "",
      layersModularList: {},
      dialogTableVisible:false,   //控制弹出框显示隐藏
    }
  },
  mounted() {
    // this.layersModularList = modularAll
    this.layersModularList =deepClone(modularAll) 
  },
  computed:{
    ...mapGetters(["permissions"]),
    collapseOpen(){
      return configuration.map((item)=>{
        return item.moduleName
      })
    }
  },
  watch:{
    "layerVisible":{
      immediate: true,
      handler(newX, oldY){
        if(!newX){
          this.disasterId = undefined
          this.layersModularList =deepClone(modularAll) 
        }else{
          this.disasterId = this.rowData.id
        }
      }
    },
    "rowData":{
      immediate:true,
      handler(newX, oldY){
        if(newX){
          this.disasterId = newX.id
        }
      }
    }
  },
  methods:{
   }
}
</script>

<style lang="scss" scoped>
  .layerTitel{
    height: 500px;
    padding: 10px;
    .bc_layer-break{
      ::v-deep .el-collapse-item {
        position: relative;
        .bc_label{
          position: absolute;
          top: 6px;
          left: 80px;
          z-index: 1001;
          .bc_cloud-label{
            position: relative;
            display: flex;
            justify-content: flex-start;
            z-index: 1000;
            margin: 2px;
            .el-button{
              height: min-content;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }

  .layerone{
    margin-top: 10px;
  }
</style>