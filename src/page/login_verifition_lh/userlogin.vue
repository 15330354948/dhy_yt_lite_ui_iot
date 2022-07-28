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
      <span class="title_ps">账号：</span>
      <el-input
        @keyup.enter.native="handleLogin"
        v-model="loginForm.username"
        auto-complete="off"
        placeholder="请输入用户名"
      >
        <!-- <i slot="prefix" class="icon-yonghu"></i> -->
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <span class="title_ps">密码：</span>
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
        <!-- <i slot="prefix" class="icon-mima"></i> -->
      </el-input>
    </el-form-item>
    <!-- <div style="text-align:center">
      <a href="用户手册.docx" style="color: #0096ff;">用户手册下载</a>
    </div> -->
    <!-- <el-form-item prop="code">
      <el-row>
        <el-col :span="24">
          <Verify
            @success="login"
            :captchaType="'blockPuzzle'"
            :imgSize="{width:'400px',height:'200px'}"
            ref="verify"
          ></Verify>
        </el-col>
      </el-row>
    </el-form-item> -->
    <Verify
      @success="login"
      :captchaType="'blockPuzzle'"
      :imgSize="{ width: '400px', height: '200px' }"
      ref="verify"
    ></Verify>
    <el-form-item>
      <el-button @click.native.prevent="handleLogin" class="login-submit"
        >登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import Verify from "@/components/verifition/Verify";
import { Loading } from "element-ui";

export default {
  name: "userlogin",
  components: {
    Verify,
  },
  data() {
    return {
      verifyCodeRefreshDate: new Date(),//验证码刷新时间
      verifyCodeTimeout: 2 * 60,//验证码有效时长，单位秒
      loginForm: {
        username: "",
        password: "",
        redomStr: "",
        code: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请正确输入用户名,用户名格式：字母、数字、下划线",
            pattern: /^[A-Za-z0-9_]{3,50}$/,
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" },
        ],
      },
      passwordType: "password",
    };
  },
  computed: {
    ...mapGetters(["tagWel"]),
  },
  props: [],
  created() {

  },
  methods: {
    showPassword() {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
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
        text: "登录中...",
      });
      this.loginForm.code = params.captchaVerification;
      this.$store
        .dispatch("LoginByUsername", this.loginForm)
        .then((res) => {
          this.$router.push({ path: this.tagWel.value });
          loadingInstance.close();
        })
        .catch(() => {
          this.$refs.verify.refresh();
          loadingInstance.close();
        });
    },
  },
};
</script>

<style scoped lang="scss">
.login-form {
  .icon-yonghu,
  .icon-mima {
    color: #409eff;
  }
  .el-form-item {
    // background-color: #fff;
    margin-top: 45px;
  }
  ::v-deep.el-input--mini{
    background-color: rgba(105, 158, 255, 0.2);

  }
  ::v-deep.el-input__validateIcon{
    color:white;
  }
  ::v-deep.el-icon-view{
    color:white;
  }
  ::v-deep.el-form-item__content {
    height: 45px;
    line-height: 45px;
    display: flex;
    align-items: center;
    .el-input input {
      border: none;
      color: white;
    }
    .el-input input:-webkit-autofill {
      -webkit-text-fill-color: white !important;
      -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
      background-color: transparent;
      background-image: none;
      transition: background-color 50000s ease-in-out 0s;
    }
  }
  ::v-deep.el-form-item--mini .el-form-item__error {
    padding-top: 10px;
  }
  .login-submit {
    background-color: #409eff;
    color: #fff;
    margin: 0;
    
  }
}
.title_ps{
  width:60px;
}
</style>
