<template>
  <div class="chuanganqi">
      <jianceData :dev-listone="devData"></jianceData>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import jianceData from "@/components/jianceData/index";

export default {
    name:'sensorInformation',
    components: { jianceData },
    data(){
        return{
            devData:{}
        }
    },
    computed: mapGetters(["publicWindowData"]),
    created(){
        this.devData = this.publicWindowData.data;
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
.chuanganqi{
    padding-top:50px;
    background:white;
    padding-left:30px;
    padding-right:30px;
}
</style>