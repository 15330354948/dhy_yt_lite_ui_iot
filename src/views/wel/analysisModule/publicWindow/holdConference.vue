<!--
 * @Author: 张峻霖
 * @Date: 2021-03-11 18:51:48
 * @LastEditTime: 2021-05-18 11:27:56
 * @LastEditors: Please set LastEditors
 * @Description: 应急会商
-->
<template>
  <div class="holdConference">
    <iframe :src="`${video}video/index.html#/call?username=${userInfo.username}&phone=${userInfo.phone}&realname=${userInfo.realname}`"></iframe>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      video:process.env.BASE_URL,
    };
  },
  computed: mapGetters(["userInfo", "publicWindowData"]),
  created() {},
  mounted() {
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.holdConference {
  width: 100%;
  height: 100%;
  // background: rgba(20,20,20,0.5);
  iframe{
    width: 100%;
    height: 100%;
    border: none;
  }
}

</style>
