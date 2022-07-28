<template>
  <div class="container">
    <el-timeline>
      <el-timeline-item  v-for="(item,ikey) in timelineData"  :key="ikey" :timestamp="(item.disposalTime||'')+(item.disposalUserName||'')"   placement="top">
        <div class="content">
            <div>处置状态：{{ getZh(item.disposalStatus, disposalStatusType)}}</div>
            <div>处置结果：{{ getZh(item.disposalResults, disposalResultsType)}}</div>
        </div>
      </el-timeline-item>
      
    </el-timeline>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
 getDisposalRecord,
} from "@/api/abnormal/abnormalDev";
export default {
  name: "",
  props: ['row'],
  components: {},
  data() {
    return {
      timelineData:[],
        // timelineData:[{
        //     time:"2019/4/11 20:46",
        //     person:"王小虎",
        //     state:'已处置',
        //     result:"正常预警",
        // },{
        //     time:"2019/4/7 20:46",
        //     person:"王小虎",
        //     state:'处置中',
        //     result:"持续观察",
        // },{
        //     time:"2019/4/6 20:46",
        //     person:"王小虎",
        //     state:'处置中',
        //     result:"持续观察",
        // }],
        currentId:null,
         disposalStatusType:[{
            label:'未处置',
            value:'n',
        },{
            label:'处置中',
            value:'c',
        },{
            label:'已处置',
            value:'y',
        }],
         disposalResultsType:[{
            label:'正常预警',
            value:'zcyj',
        },{
            label:'持续观察',
            value:'cxgc',
        },{
            label:'设备异常',
            value:'sbyc',
        },{
            label:'外界干扰',
            value:'wjgr',
        }],

    };
  },
  computed: {
    ...mapGetters(["permissions", "projectId"]), //获取权限
  },
  created() {},
  mounted() {
    this.currentId=this.row.id
  },
  watch: {
     "row.id": {
      handler(n, o) {
        this.currentId = n;
        this.getRecords()
      },
    },
  },
  methods: {
    getRecords(){
      getDisposalRecord(this.currentId).then(res=>{
          this.timelineData=res.data.data
      })
    },
     getZh(value, typeArr) {
      //转义成中文
      let nameTpl = "";
      if (value) {
        typeArr.forEach((item) => {
          if (item.value == value) {
            nameTpl += item.label;
          } else {
            nameTpl += "";
          }
        });
      } else {
        nameTpl += "";
      }
      return nameTpl;
    },
  },
};
</script>

<style lang="scss" scoped>
.container{
    height: 390px;
    overflow-x: hidden;
    overflow-y: auto;
}
.content{
    width: 400px;
    box-shadow: 0px 2px 12px rgb(0 0 0 / 10%);
    overflow: hidden;
    >div{
        padding: 10px;
    }
}
</style>
