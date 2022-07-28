<!--
 * @Author: 张峻霖
 * @Date: 2021-03-04 15:15:46
 * @LastEditTime: 2021-03-11 14:39:21
 * @LastEditors: Please set LastEditors
 * @Description: 详情主页
 * @FilePath: \LH-UI\src\views\wel\analysisModule\details\index.vue
-->
<template>
  <div class="detailsIndex">
    <basics-details></basics-details>
    <!-- <detailsList /> -->
    <basic-lengend></basic-lengend>
    <!-- <component v-show="isActive == 'list'" :is="presentModule.chart_module" /> -->
  </div>
</template>

<script>
import basicsDetails from "./basicsDetails/index";
import basicLengend from "./basicLengend/index";

export default {
  components: { basicsDetails, basicLengend },
};
</script>

<style scoped lang="scss">
</style>
