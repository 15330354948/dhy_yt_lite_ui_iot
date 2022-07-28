<template>
    <div class="danger" v-cloak>
        <div class="btnmore" @click="dengerAll">查看全部</div>
        <div class="dengerList no_data" v-if="tianqiData==null">
            <span>暂无数据</span>
        </div>
        <div class="dengerList" v-else>
            <div class="txtName"><span>发布时间：</span>{{tianqiData==null?"":tianqiData.issuetime}}</div>
            <div class="txtName"><span>预警等级：</span>{{tianqiData==null?"":tianqiData.signaltype}}{{tianqiData==null?"":tianqiData.signallevel}}{{tianqiData==null?"":"预警"}}</div>
            <div class="txtName"><span>预警区域：</span>{{tianqiData==null?"":tianqiData.stationname}}</div>
            <div class="txtName"><span>预警内容：</span></div>
            <div class="">{{tianqiData==null?"":tianqiData.issuecontent}}</div>
        </div>
    </div>
</template>

<script>
import { tianqi } from "@/api/monitorManage/quxian"

export default {
    name:'weatherTwo',
    data(){
        return{
            tianqiData:null,
        }
    },
    created(){
        tianqi().then(res => {
            if(res.data == null){

            }else{
                this.tianqiData = res.data.data;
            }
        })
    },
    methods:{
        dengerAll(){
            this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
                status: true,
                name: "dengerAll",
                style: {
                    width: "800px",
                    height: "600px",
                    left:'calc(50% - 400px)',
                    title: "气象预警详情",
                },
                data:1,
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.danger{
    width:100%;
    height: calc(100% - 29px);
    position: relative;

    .btnmore{
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 14px;
        cursor: pointer;
        background: #047acd;
        padding: 3px;
        border-radius: 5px;
    }
}
.dengerList{
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 16px;
    background: #00000047;
    overflow-y:auto;
}
.txtName{
    padding-top:5px;
    span{
        font-weight: bold;
        font-size:17px;
    }
}
.no_data{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>