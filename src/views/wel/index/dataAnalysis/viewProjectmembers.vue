<!-- 实时预警 -->
<template>
    <div class="fenxiang_show" v-if="chartsTypeShow">
        <!-- <div class="zuoji_phone">值班电话：{{dutyList.length>0?dutyList[0].phone:"---"}}</div> -->
        <ul>
            <li v-for="(item,index) in keyList" :key="index" class="">
                <div class="name">{{item.name}}</div>
                <div class="phone">{{item.phone}}</div>
                <div class="work">{{item.work}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import { dayDutyListNew } from "@/api/monitorManage/quxian"

export default {
    name: "pagingWarning",
    data() {
        return {
            chartsTypeShow:false,
            keyList:[],
            dutyList: [],
            listData:{},
        };
    },
    computed: {
        ...mapGetters(["projectId"]),
    },
    mounted() {
        setTimeout(() => {
            this.chartsTypeShow = true;
        }, 400);
    },
    methods: {
        getData(projectId){
            dayDutyListNew({
                projectId: projectId,
                size: -1
            }).then(res => {
                let resData =  res.data.data;
                if(resData && resData.length>0){
                    // this.keyList = resData.filter(item=>{ return item.parentId !== "0" })
                    // this.dutyList = resData.filter(item=>{ return item.parentId == "0" })
                    this.keyList = resData
                }else{
                    this.keyList = []
                    // this.dutyList = []
                }
            })
        }
    },
    watch:{
        "projectId":{
            deep: true,
            immediate:true,
            handler(x, y){
                if(x){
                    this.getData(x);
                }
            }
        }
    }
};
</script>

<style scoped lang="scss">
.data_analysis_bottom_tem {
    .container_chart {
        width: 100% !important;
        height: 100% !important;
        .echarts {
            width: 100%;
            height: 100%;
            div{
              height: 100%;
              width: 100%;
            }
        }
    }
}

.fenxiang_show{
    width:100%;
    height:100%;
    padding-left:10px;
    padding-right:10px;
    padding-top:5px;
    position: relative;

    .zuoji_phone{
        position: absolute;
        right:0px;
        top:-30px;
        font-size:15px;
    }

    ul{
        width: 100%;
        height:100%;
        overflow-y: auto;
        margin:0!important;
        padding:0!important;
        li{
            overflow: hidden;
            text-align: center;
            list-style: none;
            width:100%;
            height: 50px;
            background:rgba(12, 20, 25, 0.3);
            display: flex;
            justify-content: space-between;
            align-items: center;
            div{
                height: 100%;
                line-height: 50px;
            }
            .name{
                width:30%;
                background:rgba(12, 20, 25, 0.5) !important;
            }
            .phone{ width:40% }
            .work{ width:30% }
        }
    }
}
.container_chart{
    height:100%;
}

.infor:hover{
    color:rgb(64, 124, 255);
    cursor: pointer;
}

</style>
