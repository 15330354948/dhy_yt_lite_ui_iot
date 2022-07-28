<template>
  <el-form
    class="login-form"
    status-icon
    :rules="loginRules"
    ref="loginForm"
    :model="loginForm"
    label-width="0"
  >
    <el-form-item prop="username">
      <el-input
        @keyup.enter.native="handleLogin"
        v-model="loginForm.username"
        auto-complete="off"
        placeholder="请输入用户名"
      >
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        @keyup.enter.native="handleLogin"
        :type="passwordType"
        v-model="loginForm.password"
        auto-complete="off"
        placeholder="请输入密码"
      >
        <i
          class="el-icon-view el-input__icon"
          slot="suffix"
          @click="showPassword"
        ></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row>
        <el-col :span="24">
          <Verify
            @success="login"
            :captchaType="'blockPuzzle'"
            :imgSize="{ width: '400px', height: '200px' }"
            ref="verify"
          ></Verify>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click.native.prevent="handleLogin"
        class="login-submit"
        >登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import Verify from '@/components/verifition/Verify'
import { Loading } from 'element-ui';

export default {
  name: "userlogin",
  components: {
    Verify
  },
  data() {

    return {
      verifyCodeRefreshDate: new Date(),//验证码刷新时间
      verifyCodeTimeout: 2 * 60,//验证码有效时长，单位秒
      loginForm: {
        username: "",
        password: "",
        redomStr: "",
        code: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请正确输入用户名,用户名格式：字母、数字、下划线', pattern: /^[A-Za-z0-9_]{3,50}$/, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ],
      },
      passwordType: "password"
    };
  },
  computed: {
    ...mapGetters(["tagWel"])
  },
  props: [],
  methods: {
    showPassword() {
      this.passwordType == ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (new Date().getTime() - this.verifyCodeRefreshDate.getTime() - 10 >= this.verifyCodeTimeout * 1000) {
            this.verifyCodeRefreshDate = new Date();
            this.$refs.verify.refresh();
          }
          this.$refs.verify.show();
        }
      });
    },
    login(params) {
      let loadingInstance = Loading.service({
        text: '登录中...'
      });
      this.loginForm.code = params.captchaVerification;
      this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {
        this.$router.push({ path: this.tagWel.value });
        loadingInstance.close();
      }).catch(() => {
        this.$refs.verify.refresh();
        loadingInstance.close();
      })
    },
  }
};
</script>

