<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div class="set_border">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="数据异常通知设置" name="first">
            <abnormalNotice :activeName='activeName'></abnormalNotice>
          </el-tab-pane>
          <el-tab-pane label="设备离线通知" name="second">
            <offlineNotice :activeName='activeName'></offlineNotice>
          </el-tab-pane>
        </el-tabs>
      </div>
    </basic-container>
  </div>
</template>

<script>
import offlineNotice from "./offlineNotice.vue";
import abnormalNotice from "./abnormalNotice.vue";
export default {
  name: "",
  props: [],
  components: {
    offlineNotice,
    abnormalNotice,
  },
  data() {
    return {
      activeName: "first",
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {
    // activeName:{
    //   handler(val){
    //     console.log(val);
    //   },
    //   immediate:true
    // }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  .basic-container {
    height: 100%;
    ::v-deep.el-card{
      height: 100%;
      .el-card__body {
        height: 100%;
        .set_border {
          height: 95%;
          border: 1px solid #e9e9e9;
          padding: 0 5px;
          .el-tabs{
              height: 100%;
              .el-tabs__content{
                  height: calc(100% - 55px);
                  >div{
                      height: 100%;
                  }
              }
          }
        }
      }
    }
  }
}
</style>
