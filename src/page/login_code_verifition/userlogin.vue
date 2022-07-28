<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginForm"
           :model="loginForm"
           label-width="0">
    <el-form-item prop="username">
      <el-input 
                @keyup.enter.native="handleLogin"
                v-model="loginForm.username"
                auto-complete="off"
                placeholder="请输入用户名">
        <i slot="prefix"
           class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input 
                @keyup.enter.native="handleLogin"
                :type="passwordType"
                v-model="loginForm.password"
                auto-complete="off"
                placeholder="请输入密码">
        <i class="el-icon-view el-input__icon"
           slot="suffix"
           @click="showPassword"></i>
        <i slot="prefix"
           class="icon-mima"></i>
      </el-input>
    </el-form-item>


    <el-form-item prop="code">
      <el-row :span="24">
        <el-col :span="16">
          <el-input 
                    @keyup.enter.native="handleLogin"
                    :maxlength="code.len"
                    v-model="loginForm.code"
                    auto-complete="off"
                    placeholder="请输入验证码">
            <i slot="prefix"
               class="icon-yanzhengma"></i>
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <span class="login-code-img"
                  @click="refreshCode"
                  v-if="code.type == 'text'">{{ code.value }}</span>
            <img :src="code.src"
                 class="login-code-img"
                 @click="refreshCode"
                 v-else/>
          </div>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item prop="captchaVerification">
      <el-row style="margin-top: 10px">
        <el-col :span="24">
          <Verify
            @success="handleLogin"
            :mode="'fixed'"
            :explain="'向右滑动验证登录'"
            :captchaType="'blockPuzzle'"
            :imgSize="{width:'340px',height:'200px'}"
            ref="verify"
          ></Verify>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
import {mapGetters} from "vuex";
import Verify from '@/components/verifition/Verify'
import {randomLenNum} from "@/util/util";
import { Loading } from 'element-ui';

export default {
  name: "userlogin",
  components: {
    Verify
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        redomStr: "",
        code: '',
      },
      code: {
        src: "/code",
        value: "",
        len:5,
        type: "image"
      },
      checked: false,
      loginRules: {
        username: [
          {required: true, message: '请正确输入用户名,用户名格式：字母、数字、下划线', pattern: /^[A-Za-z0-9_]{3,50}$/, trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 6, message: "密码长度最少为6位", trigger: "blur"}
        ],
        code: [
          {required: true, message: "请输入验证码", trigger: "blur"}
        ]
      },
      passwordType: "password"
    };
  },
  created() {
    this.refreshCode();
  },
  computed: {
    ...mapGetters(["tagWel"])
  },
  props: [],
  methods: {
    refreshCode() {
      this.loginForm.code = ''
      this.loginForm.randomStr = randomLenNum(this.code.len, true)
      this.code.type === 'text'
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${this.codeUrl}?randomStr=${this.loginForm.randomStr}`)
    },
    showPassword() {
      this.passwordType == ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleLogin(params) {
      this.loginForm.captchaVerification = params.captchaVerification;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let loadingInstance = Loading.service({
            text:'登录中...'
          });
          this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {
            this.$router.push({path: this.tagWel.value});
            loadingInstance.close();
          }).catch(() => {
            this.refreshCode();
            this.$refs.verify.refresh();
            loadingInstance.close();
          })
        }
      });
    },
  }
};
</script>

<style>
</style>
