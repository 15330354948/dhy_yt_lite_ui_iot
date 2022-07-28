<template>
  <div class="video">
      <el-row>
          <el-col :span="4" style="height:100%;">
              <avue-tree
                  :loading="loading"
                  :option="treeOption1"
                  :data="treeData"
                  @node-click="nodeClick"
                  v-model="treeForm"
                  height="80%"
              ></avue-tree>
          </el-col>
          <el-col class="video_content" :span="20">
              <videoPlayBox :dev-data="devDataAll"></videoPlayBox>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import { disasterGetVideos } from "@/api/monitorManage/quxian";
import videoPlayBox from "@/components/videoPlayBox";

export default {
  components:{ videoPlayBox },
  props:["devdata"],
  data(){
      return{
          treeForm:{},
          treeOption1:{
              defaultExpandAll: true,
              menu: false,
              filter: false,
          },
          loading:false,
          treeData:[
              
          ],
          devDataAll:{
              
          },
          tree_data:0,
          new_number:0,
      }
  },
  watch:{
      tree_data() {
          this.$nextTick(() => {
              // console.log(document.querySelectorAll('.is-expanded'))
              // console.log(this.new_number-1)
              if(this.new_number-1 == -1){
                  document.querySelectorAll('.is-expanded')[1].click();
              }else{
                  document.querySelectorAll('.is-expanded')[this.new_number-1].click();
              }
          })
      }
  },
  created(){
    this.getData();
  },
  mounted(){

  },
  methods:{
      getData(){
          disasterGetVideos({
            disasterId:this.devdata.disasterId
          }).then(v=>{
              this.treeData=v.data.data;
              if(this.treeData.length > 0){
                var new_number = 0;
                for(var i=0;i<this.treeData.length;i++){
                  new_number++;
                  if(this.treeData[i].children.length>0){
                      new_number++;
                      this.tree_data = 1;
                      break;
                  }
                }
              }
          })
      },
      nodeClick(data){
          this.devDataAll = {
              row:{
                  id:data.value,
              }
          }
      },
  }
}
</script>
<style lang="scss" scoped>
    .video{
        padding:20px;
        height:70vh;
        background:white;
    }
    ::v-deep.el-row{
        height:100%;
    }
    .video_content{
        height:100%;
        background: #595959;
    }
    .monitor-content{
        width:100%;
        padding-top:10px;
        height:100%;
        border:none;
    }
    ::v-deep.avue-tree{
        height:100%;
    }
    ::v-deep.avue-tree .el-tree{
        max-height: 98%;
    }
</style>