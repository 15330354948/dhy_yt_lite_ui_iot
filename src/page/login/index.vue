<template>
  <div class="login-container">
    <div class="login-weaper  animated ">
      <div class="login-left">
       <img class="img"
             src="@/assets/img/logo_min.png"
             alt="">
        <p class="title">{{website.infoTitle}}</p>
        <p>©2020 v2.10.0</p>
      </div>
      <div class="login-border">
        <div class="login-main">
          <userLogin v-if="activeName==='user'"></userLogin>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '@/styles/login.scss'
  import userLogin from "./userlogin";
  import {mapGetters} from "vuex";
  import {getStore, setStore} from "@/util/store";
  import {dateFormat} from "@/util/date";
  import {validatenull} from "@/util/validate";

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
<style>

