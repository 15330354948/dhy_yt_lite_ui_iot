<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div class="project_logo">
        <img v-if="userInfo1.projectLogoUrl" :src="userInfo1.projectLogoUrl"  />
        <img v-else src="@/assets/img/sysLogo.png"  />
      </div>
      <div :class="userInfo1.projectName.length>=14?'project_name1':'project_name'">
        {{userInfo1.projectName}}
      </div>
    </div>
    <div class="top-bar__title">
      <div class="top-bar__item--show" v-if="showMenu">
        <top-menu ref="topMenu"></top-menu>
      </div>
    </div>
    <div class="top-bar__projectName_area">
        <div class="bc_check-project" v-if="projectOpts.length>0">
        <el-select v-model="proValue" placeholder="切换项目数据" @change="getCheckPorject">
          <el-option
            v-for="item in projectOpts"
            :key="item.projectId"
            :label="item.projectName"
            :value="item.projectId">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="top-bar__right">
      <topLeft />
      <el-tooltip
        v-if="showColor"
        effect="dark"
        :content="$t('navbar.color')"
        placement="bottom"
      >
        <div class="top-bar__item">
          <top-color></top-color>
        </div>
      </el-tooltip>
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="top-bar__img" :src="userInfo.userAvatar" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>
            <router-link to="/">{{ $t("navbar.dashboard") }}</router-link>
          </el-dropdown-item> -->
          <el-dropdown-item>
            <router-link to="/info/index">{{
              $t("navbar.userinfo")
            }}</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="editPass">{{
            $t("navbar.editPass")
          }}</el-dropdown-item>
          <!-- <el-dropdown-item>
            <a :href="`${url}用户手册.docx`" style="color: #0096ff"
              >用户手册下载</a
            >
          </el-dropdown-item> -->
          <el-dropdown-item @click.native="logout" divided>{{
            $t("navbar.logOut")
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog
        title="修改密码"
        :visible.sync="dialogMessage"
        width="40%"
        @close="dialogClose"
        append-to-body
        :close-on-click-modal="false"
      >
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
        <!-- prop 验证必须与 v-model绑定字段一致，否者验证不通过 -->
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input
              type="password"
              v-model="ruleForm.oldPassword"
              autocomplete="off"
              auto-complete="off"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              type="password"
              v-model="ruleForm.newPassword"
              show-password
              autocomplete="off"
              auto-complete="off"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleFormRef')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleFormRef')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { resetRouter } from "@/router/router";
import { mapGetters, mapState } from "vuex";
import { fullscreenToggel, listenfullscreen } from "@/util/util";

import topMenu from "./top-menu";
import topLeft from "./top-left";

import { getFiles as getFiles } from "@/api/admin/file/file";
import { editPass } from "@/api/admin/file/file";
import { getProjectInfo } from "@/api/monitorManage/projectList";
import { getViewConfigList } from "@/api/monitorManage/platform"

// import { dictionary } from "@/api/hideDanger/obj";
import {projectIcon} from "@/api/login"
export default {
  components: { topMenu, topLeft },
  name: "top",
  data() {
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.checkPass !== "") {
    //       this.$refs.ruleFormRef.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    const passwordPattern=/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、])[a-zA-Z\d`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]{8,20}$/;
    return {
      userInfo1:{},
      proValue: "",
      projectOpts: [],
      proLevelList: [],
      rules: {
        // password: [{ validator: validatePass, trigger: "blur" }],
        newPassword: [{
          required: true,
          min: 8,
          max: 20,
          // trigger: "blur" ,
          message: '密码长度8-20,大写字母+小写字母+数字+特殊字符',
          pattern: passwordPattern,
        }],
        oldPassword: [{
          required: true,
          min: 8,
          max: 20,
          // trigger: "blur" ,
          message: '密码长度8-20,大写字母+小写字母+数字+特殊字符',
          pattern: passwordPattern,
        }],
      },
      userAvatar: "",
      url: process.env.BASE_URL,
      dialogMessage: false,
      ruleForm: {
        newPassword:"",
        oldPassword:"",
      },
    };
  },
  watch:{
    projectId:{
      handler(val,oval){
        if(val!=0&&val){
          projectIcon(val).then(v=>{
            this.userInfo1=v.data.data
          })
        }
      },
      immediate:true,
      deep:true
    }
  },
  filters: {},
  computed: {
    ...mapState({
      showDebug: (state) => state.common.showDebug,
      showTheme: (state) => state.common.showTheme,
      showLock: (state) => state.common.showLock,
      showFullScren: (state) => state.common.showFullScren,
      showCollapse: (state) => state.common.showCollapse,
      showSearch: (state) => state.common.showSearch,
      showMenu: (state) => state.common.showMenu,
      showColor: (state) => state.common.showColor,
      showLangure: (state) => state.common.showLangure,
      showNotice: (state) => state.common.showNotice,
    }),
    ...mapGetters([
      "userInfo",
      "isFullScren",
      "tagWel",
      "tagList",
      "isCollapse",
      "tag",
      "logsLen",
      "logsFlag",
      "projectId"
    ]),
  },
  created() {
    if (this.userInfo && this.userInfo.avatar) {
      getFiles(this.userInfo.avatar).then((res) => {
        let data = res.data.data;
        if (data && data.length > 0) {
          this.userAvatar = data[0].netUrl;
        }
      });
    }
  },
  mounted() {
    if(this.userInfo.projectInfoList.length>0) {
      this.projectOpts = this.userInfo.projectInfoList
      // this.proValue = this.userInfo.projectInfoList[0].projectId
      //判断是否是初始登录projectId为null还是页面刷新有projectId值
      if(window.sessionStorage.getItem('projectId')=="null"||!window.sessionStorage.getItem('projectId')){
        this.proValue = this.userInfo.projectInfoList[0].projectId

        this.$store.commit('SET_PROJECT_ID', this.proValue)
      }else{
        this.proValue = parseFloat(window.sessionStorage.getItem('projectId'))
      }


      // this.$store.commit('SET_PROJECT_ID', this.proValue)
      this.$bus.$on('defaultViewLode',val=>{
        if(val){
          setTimeout(()=>{
            this.getCheckPorject(this.proValue)
          }, 1000)
        }
      })
      setTimeout(()=>{
        this.getCheckPorject(this.proValue)
      }, 1000)
    }
    listenfullscreen(this.setScreen);
  },

  methods: {
    getCheckPorject(val) {
      this.proValue = val
      if(val){
        getViewConfigList({projectId: val})
          .then(ls=>{
            let lsData = ls.data.data
            this.$store.commit('SET_VIEW_CONFIG', lsData)
          })
      }
      getProjectInfo(val).then((res)=>{
        let projectData = res.data.data
        if(projectData.latitude && projectData.longitude){
          this.mapFunc.goView({
            longitude: projectData.longitude/1,
            latitude: projectData.latitude/1,
            height: projectData.altitude ? projectData.altitude : 40000
          })

          this.$store.commit("IS_ANALYSIS_DETAILS", {
            status: false,
          });
        }else{
          this.$message.warning("暂无项目点位信息")
          this.$store.commit("IS_ANALYSIS_DETAILS", {
            status: false,
          });
        }
      })
      window.sessionStorage.setItem('projectId',this.proValue)
      this.$store.commit('SET_PROJECT_ID', this.proValue)
    },
    handleScreen() {
      fullscreenToggel();
    },
    setCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    setScreen() {
      this.$store.commit("SET_FULLSCREN");
    },
    editPass() {
      this.dialogMessage = true;
    },
    dialogClose() {
      this.ruleForm={
        newPassword:"",
        oldPassword:"",
      }
      this.$refs.ruleFormRef.resetFields();
      this.dialogMessage = false;
    },
    submitForm(formName) {
      let userInfo = JSON.parse(
        window.sessionStorage.getItem("luohu-userInfo")
      );
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  Object.assign(this.ruleForm, { userId: userInfo.content })
          editPass({
            oldPassword: this.ruleForm.oldPassword,
            newPassword: this.ruleForm.newPassword,
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message.success("修改成功");
              this.dialogMessage = false;
                this.$store.dispatch('LogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
                window.sessionStorage.clear();
                window.localStorage.clear();
              })
              // window.sessionStorage.clear();
              // window.localStorage.clear();
              // window.location.reload();
            }else{
              this.$message.danger("修改失败");
            }

          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.ruleForm={
        newPassword:"",
        oldPassword:"",
      }
      this.$refs[formName].resetFields();
    },
    logout() {
      this.$confirm(this.$t("logoutTip"), this.$t("tip"), {
        confirmButtonText: this.$t("submitText"),
        cancelButtonText: this.$t("cancelText"),
        type: "warning",
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          resetRouter();
          window.sessionStorage.setItem('projectId',"null")//退出登录清空projectId
          this.$router.push({ path: "/login" });
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.avue-top{
  justify-content:left !important;
  >div{
    display: inline-block;
  }
  .top-bar__right {
    width: 12%;
    .el-dropdown {
      right: 0;
      top: 22px;
      position: absolute;
    }
  }
  .top-bar__projectName_area{
    width: 12%;
    margin: 5px;
    display: flex;
    justify-content: center;
    .bc_check-project{
      position: relative;
      top:10px;
      ::v-deep.el-input__inner{
        color: #fff;
        border: 1px solid rgba(204, 204, 204, 0.5);
        border-radius: 15px;
        background: transparent;
    }

    ::v-deep.el-input__inner:focus,
      ::v-deep.el-input__inner:active{
        border-color: rgba(204, 204, 204, 0.5);
      }
    }
  }
  .top-bar__left {
    width: 26%;
    height: 100%;
    margin: 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    justify-content: space-evenly;
    .project_logo{
      width: auto;
      height: 100%;
      padding: 5px 10px;
      >img{
        margin: auto;
        width: auto;
        height: 100%;
      }
    }
    .project_name{
      font-size: 26px;
      font-family: "Alibaba-PuHuiTi-Medium";
      color: #fff;
      // max-height: 72px;
    }
    .project_name1{
    font-size: 20px;
    font-family: "Alibaba-PuHuiTi-Medium";
    color: #fff;
    max-width: 90%;
    white-space: wrap;
    white-space: pre-line;
    word-break: break-all;
    word-wrap: break-word;
    margin-top: -28px;
    margin-left: 25px;
    }
  }
  .top-bar__title{
    width: 50%;
  }
}

</style>
