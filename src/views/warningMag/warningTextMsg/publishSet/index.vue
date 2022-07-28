<template>
        <div class="set-container">
            <warning-issue
            :openTab="tabIndex"
            :dialogFormVisible.sync="dialogFormVisible"
          ></warning-issue>
        </div>
</template>
<script>
import WarningIssue from "./warningIssue/index.vue";
export default {
    components:{WarningIssue,},
    data(){
       return{
           tabIndex: 1,
           dialogFormVisible: true,
       }
    },
    watch:{
    },
   methods:{}
}
</script>
<style lang="scss" scoped>
.set-container{background-color: #fff;height: 100%;}
.set-content{
    display: flex;
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    // position: absolute;
    // transform: translate(-50%,-50%);
    // margin: 50px;
}
.left-tree{width: 340px;border-right: 2px solid #ddd;}
.avue-tree {
    ::v-deep .avue-tree__filter{opacity: 1;}
   ::v-deep .el-input-group__append{display: none;}
}
</style>
<style lang="scss">
.pd-20{padding: 20px;}
</style>
