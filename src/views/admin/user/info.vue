<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <el-tabs v-model="activeName" @tab-click="switchTab">
        <el-tab-pane label="信息管理" name="userManager">
          <el-form
            :model="form1"
            :rules="rules1"
            ref="refForm1"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                ref="upload"
                :headers="uploadHeaders"
                :accept="'image/png,image/jpeg'"
                :action="baseUrlLaod"
                :auto-upload="false"
                :show-file-list="false"
                :data="uploadData"
                :name="uploadInputName"
                :on-change="handleAvatarChange"
                :on-success="handleAvatarSuccess"
                :on-error="handleError"
              >
                <img
                  v-if="
                    imageUrl || (form1.avatarFile && form1.avatarFile.netUrl)
                  "
                  :src="imageUrl || form1.avatarFile.netUrl"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg格式文件，且不超过2MB
              </div>
            </el-form-item>

            <el-form-item label="用户名" prop="username">
              <el-input
                type="text"
                v-model="form1.username"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="realname">
              <el-input type="text" v-model="form1.realname"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model="form1.phone"
                placeholder="验证码登录使用"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('refForm1')"
                >提交
              </el-button>
              <el-button @click="resetForm('refForm1')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="密码管理" name="passwordManager" disabled>
          <user-password></user-password>
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>


<script>
import { putBaseObj, getObj } from "@/api/admin/user";
import { mapState } from 'vuex'
import store from "@/store";
import userPassword from './user-password'
import {baseUrl} from '@/config/env'

export default {
  components:{
    userPassword
  },
  data() {
    return {
      baseUrlLaod:baseUrl + 'file/upload',
      activeName: "userManager",
      avatarUrl: '',
      show: false,
      form1: {},
      uploadInputName: "file",
      imageUrl: "",
      uploadSuccess: null,
      rules1: {
        phone: [{
          message: "手机号格式不正确",
          pattern: /^1[3456789]\d{9}$/,
        }],
      },
    }
  },
  created() {
    this.getUserInfo();
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    uploadHeaders() {
      let token = store.getters.access_token;
      if (token) {
        return {
          Authorization: "Bearer " + token,
        };
      }
      return {};
    },
    uploadData() {
      return {
        fileInputName: this.uploadInputName,
        customName: "头像文件" + new Date().getTime(),
        businessCode: "sys_user:avatar",
      }
    },
  },
  methods: {
    switchTab(tab, event) {
      this.resetForm('refForm1')
      if (this.activeName == "userManager") {
        this.getUserInfo();
      }
    },
    getUserInfo() {
      getObj(this.userInfo.userId).then(res => {
        this.form1 = res.data.data;
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.uploadSuccess = () => {
            putBaseObj(Object.assign(this.form1, this.form2)).then(response => {
              if (response.data.data) {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  duration: 2000
                })
                // 修改密码之后强制重新登录
                if (this.activeName === 'passwordManager') {
                  this.$store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                  })
                }
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
          if (this.$refs.upload.uploadFiles.length > 0) {
            this.$refs.upload.submit();
          } else {
            this.uploadSuccess();
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleError(err, file, fileList) {
      //文件上传失败时的钩子
      this.$message.warning(file.name + "上传失败");
    },
    handleAvatarChange(file, fileList) {
      if (this.checkAvatarFile(file.raw)) {
        if (fileList.length > 1) {
          this.$refs.upload.handleRemove(fileList[0]);
        }
        this.imageUrl = URL.createObjectURL(file.raw);
      } else {
        this.$refs.upload.handleRemove(file);
      }
    },
    handleAvatarSuccess(res, file) {
      if (typeof this.uploadSuccess === "function") {
        this.form1.avatar = res.data.ids[0];
        this.uploadSuccess();
      }
    },
    checkAvatarFile(file) {
      const isJPG = /^image\/jpeg$/.test(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片必须是JPG格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px !important;
  color: #8c939d !important;
  width: 178px !important;
  height: 178px !important;
  line-height: 178px !important;
  text-align: center !important;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
