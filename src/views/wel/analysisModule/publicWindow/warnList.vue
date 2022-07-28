<!-- 可视化预警信息 -->
<template>
  <div>
      <warningData :disasterData="disasterData"></warningData>
  </div>
</template>

<script>

import warningData from "@/components/warningData/warningData";
import { mapGetters } from "vuex";

export default {
    name:'warnList',
    components:{warningData},
    data(){
        return{
            disasterData:{}
        }
    },
    computed: mapGetters(["publicWindowData"]),
    created(){
        this.disasterData = this.publicWindowData.data
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>

</style>