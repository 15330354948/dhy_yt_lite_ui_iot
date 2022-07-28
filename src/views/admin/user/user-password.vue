<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="resetPasswordForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="原密码" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        auto-complete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="newpassword1">
      <el-input
        type="password"
        v-model="form.newpassword1"
        auto-complete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="newpassword2">
      <el-input
        type="password"
        v-model="form.newpassword2"
        auto-complete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">提交 </el-button>
      <el-button @click="resetForm()">重置</el-button>
      <el-button @click="alert(1)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { putBaseObj, getObj } from "@/api/admin/user";

export default {
  name: "user-password",
  data() {
    const passwordPattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、])[a-zA-Z\d`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]{8,20}$/;
    let validatePass = (rule, value, callback) => {
      if (this.form.password !== '') {
        if (value !== this.form.newpassword1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
    return {
      form: {
        password: "",
        newpassword1: "",
        newpassword2: "",
      },
      rules: {
        password: [{
          required: true,
          min: 8,
          max: 20,
          message: '密码长度8-20,大写字母+小写字母+数字+特殊字符',
          pattern: passwordPattern,
        }],
        newpassword1: [{
          required: true,
          min: 8,
          max: 20,
          message: '密码长度8-20,大写字母+小写字母+数字+特殊字符',
          pattern: passwordPattern,
        }],
        newpassword2: [{
          required: true,
          min: 8,
          max: 20,
          message: '密码长度8-20,大写字母+小写字母+数字+特殊字符',
          pattern: passwordPattern,
        },
        {
          validator: validatePass,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.resetPasswordForm.resetFields()
    },
    submitForm() {
      this.$refs.resetPasswordForm.validate(valid => {
        if (valid) {
          this.uploadSuccess = () => {
            putBaseObj(Object.assign(this.form)).then(response => {
              if (response.data.data) {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  duration: 2000
                })
                // 修改密码之后强制重新登录
                this.$store.dispatch('LogOut').then(() => {
                  location.reload() // 为了重新实例化vue-router对象 避免bug
                })
              } else {
                this.$notify({
                  title: '失败',
                  message: response.data.msg,
                  type: 'error',
                  duration: 2000
                })
              }
            }).catch(() => {
              this.$notify({
                title: '失败',
                message: '修改失败',
                type: 'error',
                duration: 2000
              })
            });
          }
        } else {
          console.log("valid:" + valid)
          return false
        }
      })
    },
  }
};
</script>

<style>
</style>
