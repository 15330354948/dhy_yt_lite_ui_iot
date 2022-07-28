<template>
  <div class="info">
    <el-tabs :tab-position="tabPosition" @tab-click="tabClick" v-model="activeName">
      <el-tab-pane name="info" label="项目信息">
        <info-form :infoData="infoData" :tabIndex="tabIndex"></info-form>
      </el-tab-pane>
      <el-tab-pane name="data" label="项目资料">
        <project-data :infoData="infoData" :fullScreen="fullScreen" :tabIndex="tabIndex"></project-data>
      </el-tab-pane>
      <!-- <el-tab-pane name="yujin" label="预警情况">
      </el-tab-pane>
      <el-tab-pane name="yunwei" label="运维情况">
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
  import infoForm from "./infoForm.vue"
  import projectData from "./projectData.vue"
  export default {
    props: ["infoData","fullScreen"],
    components: {
      infoForm,
      projectData
    },
    data() {
      return {
        tabPosition: "left",
        activeName: "info",
        tabIndex: 0,
      }
    },
    methods: {
      tabClick(tab, event) {
        this.tabIndex = tab.index;
      },
    }
  }

</script>

<style>

</style>
