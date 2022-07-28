<!--
 * @Author: your name
 * @Date: 2021-04-26 09:08:52
 * @LastEditTime: 2021-04-26 09:54:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\views\wel\analysisModule\moduleGather\alarmPopups.vue
-->
<template>
  <div class="alarmPopups" v-show="isWarn">
    <div class="warnDiv">
      <img src="@/assets/img/warn.png" alt />
    </div>
    <audio
      class="success"
      ref="audio"
      :src="`${video}audio/ALARM.WAV`"
      loop="loop"
    ></audio>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  computed: mapGetters(["occurWarn"]),
  data() {
    return {
      video: process.env.BASE_URL,
      isWarn: false,
    };
  },
  mounted() {
  },
  methods: {},
  watch: {
    occurWarn: {
      handler(val) {
        if (val.status) {
          this.$refs.audio.play();
          this.isWarn = true;
        } else {
          this.$refs.audio.pause();
          this.isWarn = false;
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.alarmPopups {
  position: absolute;
  bottom: 0;
  right: 20px;
  z-index: 1000;
  pointer-events: none;
}
.warnDiv {
  border-radius: 30px;

  img {
    width: 60px;
    height: 55px;
    border-radius: 30px;
    margin-bottom: 15px;
    animation: mymove 0.5s infinite;
    -webkit-animation: mymove 1 infinite; /* Safari and Chrome */
  }
  @keyframes mymove {
    0% {
      opacity: 0.8;
      box-shadow: 0 1px 2px rgba(255, 0, 0, 0.1);
    }

    100% {
      opacity: 1;
      box-shadow: 0 -15px 40px #e10000;
    }
  }
}
</style>
