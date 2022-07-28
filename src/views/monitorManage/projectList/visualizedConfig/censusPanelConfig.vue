<template>
  <div class="bc_visualized-center">
    <div class="bc_visualized-component">
      <p class="bc_component-title">组件区</p>
      <div class="bc_component-preview">
        <el-scrollbar style="height: 100%">
          <draggable
            v-model="componentList"
            chosenClass="chosen"
            forceFallback="true"
            :group="{ name: 'component', pull: 'clone', put: false }"
            animation="1000" @start="onStart" @end="onEnd"
            @change="onLeftChange">
            <transition-group>
              <div class="bc_component-box" v-for="compon in componentList" :key="compon.id">
                <img :src="require(`@/assets/img/ordinary/${compon.exampleImg}`)" alt="">
                <p class="bc_com-box-lable">{{compon.moduleTitle}}</p>
              </div>
            </transition-group>
          </draggable>
        </el-scrollbar>
      </div>
    </div>
    <div class="bc_visualized-view">
      <div class="bc_component-title">
        <p class="bc_title-l">
          <span style="display:inline-block;margin-right: 10px">界面区</span>
          <el-select v-model="viewLayout" placeholder="请选择布局样式" @change="layoutChange">
            <el-option
              v-for="item in viewLayoutOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </p>
        <el-button type="primary" size="mini" @click="applicationConfig">应用</el-button>
      </div>
      <div class="bc_component-bgbox">
        <div class="bc_component-top" v-if="viewTopModShow">
          <div class="bc_num-module" v-for="item in viewTopMod" :key="item.id">
            <div>{{ item.name }}/{{ item.unit }}</div>
            <div>{{ item.num }}</div>
          </div>
        </div>
        <div class="bc_component-selection">
          <div class="bc_component-select-left bc_select-box">
            <draggable v-model="selectComponentLeft"  chosenClass="chosen" forceFallback="true" animation="800" group="component" @change="onLeftChange">
              <transition-group>
                <div class="bc_component-box" v-for="element in selectComponentLeft" :key="element.id">
                  <img
                    v-if="element.moduleVisible && element.exampleImg"
                    :src="require(`@/assets/img/ordinary/${element.exampleImg}`)" alt="">
                  <div v-else class="bc_none-box"></div>
                </div>
              </transition-group>
            </draggable>
          </div>
          <div class="bc_component-select-right bc_select-box" v-if="viewLayout == '3' || viewLayout == '4'">
            <draggable v-model="selectComponentRight"  chosenClass="chosen" forceFallback="true" animation="800" group="component" @change="onRightChange">
              <transition-group>
                <div class="bc_component-box" v-for="element in selectComponentRight" :key="element.id">
                  <img
                    v-if="element.moduleVisible && element.exampleImg"
                    :src="require(`@/assets/img/ordinary/${element.exampleImg}`)" alt="">
                  <div v-else class="bc_none-box"></div>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import { mapGetters } from "vuex"
import { getStore, setStore } from '@/util/store'
import { panelComponentList } from "./panelComponents"

import { getViewConfigList, setViewConfigArr } from "@/api/monitorManage/platform"

export default {
  name: "censusPanelConfig",
  components: {
    draggable
  },
  computed: mapGetters(["projectId"]),
  data () {
    return {
      drag: true,
      platformObj: {},
      viewLayout: 1,
      viewTopModShow: false,
      viewTopMod: [
        { name: "监测点数量", unit: "个", num: 0 },
        { name: "设备数量", unit: "个", num: 0 },
        { name: "今日预警监测点", unit: "条", num: 0 }
      ],
      viewLayoutOption: [
        {label: "三面板布局", value: 1},
        {label: "四面板布局", value: 2},
        {label: "六面板布局", value: 3},
        {label: "七面板布局", value: 4},
      ],
      selectComponentLeft: [],
      selectComponentRight: [],
      componentList: panelComponentList
    };
  },
  watch: {
    "viewLayout":{
      handler(x, y) {
        if(x == 2 || x == 4){
          this.viewTopModShow = true;
        }else{
          this.viewTopModShow = false;
        }
      },
      deep: true
    }
  },
  mounted() {
    this.platformObj = this.$route.query.platformData
    this.getConfigArray()
  },
  methods: {
    getConfigArray() {
      if(this.platformObj && this.platformObj.id){
        getViewConfigList({projectId: this.platformObj.id})
          .then(ls=>{
            let lsData = ls.data.data
            this.viewLayout = lsData.panelCount || 1;
            if(lsData.left.length > 0){
              lsData.left.forEach((item,i)=>{
                this.selectComponentLeft.push({ ...item, id: i })
              })
            }else{
              for(let i = 0; i < 3; i++){
                this.selectComponentLeft.push({ id: i })
              }
            }
            if(lsData.right.length > 0){
              lsData.right.forEach((item,i)=>{
                this.selectComponentRight.push({ ...item, id: i })
              })
            }else{
              for(let i = 0; i < 3; i++){
                this.selectComponentRight.push({ id: i })
              }
            }
            this.selectComponentLeft.length = 3;
            this.selectComponentRight.length = 3;
          })
      }
    },

    applicationConfig() {
      let addStatus = true,
          panelInfoQuery;
      if(this.viewLayout == 1 || this.viewLayout == 2 && this.selectComponentLeft.length){
        this.selectComponentLeft.forEach(item=>{
          if(!item.templateUrl){
            addStatus = false
          }
        })
        if(addStatus){
          panelInfoQuery = {
            leftList: this.selectComponentLeft,
            panels: this.viewLayout,
            projectId: this.platformObj.id
          }
          setViewConfigArr(panelInfoQuery)
            .then(res=>{
              let resData = res.data.code
              if(resData == 0){
                this.$message.success('应用成功')
                this.getConfigArray()
              }
            })
        } else {
          this.$message.warning("请配置所有面板")
        }
      }else{
        this.selectComponentRight.forEach(item=>{
          if(!item.templateUrl){
            addStatus = false
          }
        })
        if(addStatus){
          panelInfoQuery = {
            leftList: this.selectComponentLeft,
            rightList: this.selectComponentRight,
            panels: this.viewLayout,
            projectId: this.platformObj.id
          }
          setViewConfigArr(panelInfoQuery)
            .then(res=>{
              let resData = res.data.code
              if(resData == 0){
                this.$message.success('应用成功')
                this.getConfigArray()
              }
            })
        }else{
          this.$message.warning("请配置所有面板")
        }
      }
    },
    onAllChange(e) {
      console.log(e)
    },
    onLeftChange(e) {
      if(e.added){
        this.selectComponentLeft.map((item,index)=>{
          if(index == e.added.newIndex){
            item = {...e.added.element}
            item.id = index
          }else{
            item.id = index
          }
        })
        this.selectComponentLeft.length = 3
      }
    },
    onRightChange(e) {
      if(e.added){
        this.selectComponentRight.forEach((item,index)=>{
          if(index == e.added.newIndex){
            this.selectComponentRight[index] = {...e.added.element}
          }else{
            this.selectComponentRight[index] = item
          }
        })
        this.selectComponentRight.length = 3
      }
    },
    onStart(a){
      // console.log(a,121)
    },
    //拖拽结束事件
    onEnd(b) {
      // console.log(b,121)
    },
    // 页面布局改变
    layoutChange(e) {
      this.selectComponentRight = []
      if(e == '3' || e == '4'){
        for(let i = 0; i < 3; i++){
          this.selectComponentRight.push({ id: i, exampleImg: "abnormal.png" })
        }
      }
    },
  }
}
</script>
<style lang='' scoped>

</style>
