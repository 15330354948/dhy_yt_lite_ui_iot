<template>
    <div class="top">
        <div class="dengerList no_data" v-if="tianqiData==1">
            <span>暂无数据</span>
        </div>
        <div class="dengerList" v-else>
            <div class="txtName"><span>发布时间：</span>{{tianqiData==1?"":tianqiData.issuetime}}</div>
            <div class="txtName"><span>预警等级：</span>{{tianqiData==1?"":tianqiData.signaltype}}{{tianqiData==1?"":tianqiData.signallevel}}{{tianqiData==1?"":"预警"}}</div>
            <div class="txtName"><span>预警区域：</span>{{tianqiData==1?"":tianqiData.stationname}}</div>
            <div class="txtName"><span>预警内容：</span></div>
            <div class="">{{tianqiData==1?"":tianqiData.issuecontent}}</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name:'dengerAll',
    computed: mapGetters(["publicWindowData"]),
    data(){
        return{
            tianqiData:1,
        }
    },
    created(){
        this.tianqiData = this.publicWindowData.data;
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
.dengerList{
    width: 100%;
    height: 100%;
    padding: 15px;
    overflow-y: auto;
}
.top{
    width: 100%;
    height:100%;
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