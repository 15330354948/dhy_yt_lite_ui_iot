<template>
  <div class="login_main_box">
    <div class="login-container">
      <div class="login-weaper animated ">
        <!-- <div class="login-left">
        <p class="title">{{website.infoTitle}}</p>
      </div> -->

        <div class="login-border">
          <div class="login-main">
            <p class="title">{{ website.infoTitle }}</p>
            <!-- <div class="logoin_title">
              <div>IoT智能监测预警云平台</div>
            </div> -->
            <userLogin v-if="activeName === 'user'"></userLogin>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/styles/login_verifition.scss";
import userLogin from "./userlogin";
import { mapGetters } from "vuex";

export default {
  name: "login",
  components: {
    userLogin,
  },
  data() {
    return {
      activeName: "user",
    };
  },
  watch: {},
  created() {
    // console.log(mapGetters["website"]);
    document.title = this.platformName;
  },
  mounted() {},
  computed: {
    ...mapGetters(["website"]),
  },
  props: [],
  methods: {},
};
</script>
<style lang="scss" scoped>
.login_main_box {
  display: flex;
  align-items: center;
  justify-content: center;
  .login-container {
    background: url(../../assets/img/66.gif) no-repeat;
    background-position: 0;
    animation: none;
    .login-weaper {
      position: absolute;
      top: 50%;
      margin-top:-210px;
      right: 13%;
      width: 400px;
      // box-shadow: 0px 6px 13px #D1E1FD;
      .login-border {
        width: 100%;
        min-height: 420px;
        border-radius: initial;
        background-color: #0B162A;
        border-radius: 6px;
        align-items: initial;
        box-shadow: 0 0 5px #D1E1FD;
        .login-main {
          width: 82%;
          .title {
            height: 80px;
            line-height: 80px;
            text-align: center;
            color: #fff;
            letter-spacing: 2px;
            font-size: 25px;
            font-family: "Alibaba-PuHuiTi-Medium";
          }
        }
      }
    }
  }
}
</style>

