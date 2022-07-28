<template>
<div class="login_main_box">
  <div class="login-container">
    <div class="login-weaper animated ">
      <div class="login-left">
        <!-- <img class="img" src="@/assets/img/logo.png" alt=""> -->
        <p class="title">{{website.infoTitle}}</p>
        <!-- <p>©2019 v2.7.1</p> -->
      </div>
      <div class="login-border">
        <div class="login-main">
          <userLogin v-if="activeName==='user'"></userLogin>
        </div>
      </div>
    </div>
  </div>
</div>

</template>
<script>
  import '@/styles/login_code_verifition.scss'
  import userLogin from "./userlogin";
  import {mapGetters} from "vuex";

  export default {
    name: "login",
    components: {
      userLogin
    },
    data() {
      return {
        activeName: "user"
      };
    },
    watch: {},
    created() {
      document.title = this.platformName
    },
    mounted() {
    },
    computed: {
      ...mapGetters(["website"])
    },
    props: [],
    methods: {}
  };
</script>
