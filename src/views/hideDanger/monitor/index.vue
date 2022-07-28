

<template>
  <!-- 监测点列表 -->
  <div class="hide_mod">
    <basic-container>
      <avue-crud
        :option="option"
        ref="cruds"
        v-model="form"
        :page.sync="page"
        @on-load="getList"
        @size-change="sizeChange"
        @current-change="currentChange"
        :table-loading="listLoading"
        @search-change="handleFilter"
        @refresh-change="handleRefreshChange"
        @row-update="update"
        @row-save="create"
        @row-style="rowStyle"
        :before-open="handleOpenBefore"
        @selection-change="selectionChange"
        :row-key="getRowKeys"
        :data="list">
        <template slot="menuLeft">
          <el-button
            v-if="permissions.disaster_monitoring_point_add"
            class="filter-item"
            @click="handleCreate"
            type="primary"
            icon="el-icon-document-add"
            >新增
          </el-button>
        </template>
        <!-- <template slot="menuLeft">
          <el-button
            class="filter-item"
            @click="handleEdit"
            type="warning"
            icon="el-icon-document-add"
            >更新监测点
          </el-button>
        </template> -->
        <template slot="menuLeft">
          <el-button
          v-if="permissions.disaster_monitoring_point_del"
            class="filter-item"
            @click="handleDel"
            type="danger"
            icon="el-icon-delete"
            >批量删除
          </el-button>
        </template>
        <!-- <template slot="menuLeft">
          <el-button
            class="filter-item"
            @click="handleDaochu"
            type="primary"
            icon="el-icon-download"
            >导出
          </el-button>
        </template> -->
        <template slot="lockFlag" slot-scope="scope">
          <el-tag>{{ scope.label }}</el-tag>
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button
          v-if="permissions.disaster_monitoring_point_edit"
            size="small"
            type="text"
            icon="el-icon-info"
            @click.stop="handleInfo(scope.row, scope.index)"
            >编辑
          </el-button>
          <el-button
            size="small"
            type="text"
            icon="icon-zhongzhimima"
            @click="handleView(scope.row, scope.index)"
            >查看
          </el-button>
        </template>
        <template slot="runningStatusForm">
          <el-select v-if="runningStatus.length" v-model="form.runningStatus" @change="selectChange" placeholder="请选择状态" :disabled="rowView">
            <el-option v-for="item in runningStatus" :value="!!(item.value*1)" :key="item.value*1" :label="item.label"></el-option>
          </el-select>
        </template>
        <!-- <template slot="updateType">
          123
        </template> -->
        <template slot="warningPicForm">
           <div class="upload flex"  >
             <div :class="{'enlarge':isEnlargeWarning}" class=" margin-r-10">
                <img :class="{'enlarge-img':isEnlargeWarning}" @click="imgClick(1)" v-if="warningPicUrl" :src="warningPicUrl" class="avatar">
                <div class="el-icon-delete delete-img" v-if="!rowView&&warningPicUrl&&!isEnlargeWarning" @click="deleteImg(1)"></div>
             </div>
             <el-upload
              v-if="!rowView"
              class="avatar-uploader"
              :disabled="rowView"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleWarningSuccess"
              :headers="header"
              :before-upload="beforeAvatarUpload">
              <!-- <el-button size="small" type="primary">点击上传</el-button> -->
              <div slot="tip" class="el-upload__tip">只能上传JPG、PNG、JPEG文件，且不超过500kb</div>
              <i class="el-icon-plus avatar-uploader-icon"></i>
           </el-upload>
           </div>
        </template>
        <template slot="boundaryPicForm">
         <div class="upload flex">
           <div :class="{'enlarge':isEnlargeBoundary}" class="margin-r-10">
                <img :class="{'enlarge-img':isEnlargeBoundary}" @click="imgClick(2)" v-if="boundaryPicUrl" :src="boundaryPicUrl" class="avatar">
                <div class="el-icon-delete delete-img" v-if="!rowView&&boundaryPicUrl&&!isEnlargeBoundary" @click="deleteImg(2)"></div>
             </div>
           <!-- <div class="upload-background" :class="{'enlarge':isEnlargeBoundary}">
            <img  @click="imgClick(2)" v-if="boundaryPicUrl" :src="boundaryPicUrl" class="avatar upload-img">
            <div>
              <div @click="imgClick(2)" v-if="isEnlargeBoundary" class="el-icon-circle-close close-img"></div>
              <iframe v-if="isEnlargeBoundary" :src="boundaryPicUrl" frameborder="0" class="enlarge" scrolling="no">
              </iframe>
            </div>
           </div> -->
          <el-upload
              v-if="!rowView"
              :disabled="rowView"
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="header"
              :on-success="handleboundarySuccess"
              :before-upload="beforeAvatarUpload">
              <div slot="tip" class="el-upload__tip">只能上传JPG、PNG、JPEG文件，且不超过500kb</div>
              <!-- <img v-if="boundaryPicUrl" :src="boundaryPicUrl" class="avatar"> -->
              <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
         </div>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {monitor_base_info,monitor_base_info_add,monitor_base_info_update,monitor_base_info_delete} from '@/api/monitor'
import { tableOption } from './monitorOption';
import { mapGetters } from "vuex";
import {baseUrl} from '@/config/env'
import store from '../../../store';
import { dictionary } from "@/api/hideDanger/obj";

export default {
  name: "hidedanger",
  props:['dialogFormVisible',"openTab"],
  data() {
    return {
      isEnlargeBoundary:false,
      isEnlargeWarning:false,
      runningStatus:[],//运行状态
      rowView:false,
      uploadUrl:baseUrl + '/file/upload',
      warningPicUrl:'',
      boundaryPicUrl:'',
      searchForm: {},
      option: tableOption,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false//是否倒序
      },
      list: [],
      listLoading: true,
      role: [],
      form: {},
      selecteData:{},
      searchObj:{
        "orders[0].asc":false,
        "orders[0].column":"create_time"
      }
    };
  },
  computed: {
    ...mapGetters(["permissions","access_token"]),
    header(){
      return { Authorization :"Bearer " + store.getters.access_token}
    }
  },
  // computed: {
  //   ...mapGetters(["permissions,access_token"]),
  //   header(){
  //     return { Authorization :"Bearer " + store.getters.access_token}
  //   }
  // },
  watch: {
    role() {
      this.form.role = this.role
    },
    dialogFormVisible(val){
      // this.getList(this.page);
      this.clearSearchForm();
    },
    openTab:{
      deep:true,
      // immediate:true,
      handler(val,old){
        if(val == 1){
          this.clearSearchForm();
          this.getList(this.page);

        }
      }
    }
  },
  created() {
    // this.sys_user_add = this.permissions["sys_user_add"];
    // this.sys_user_edit = this.permissions["sys_user_edit"];
    // this.sys_user_del = this.permissions["sys_user_del"];
    // this.sys_user_reset_password = this.permissions["sys_user_reset_password"];
    // this.header.Authorization = "Bearer " + window.sessionStorage.getItem("token");
    this.getList(this.page);
  },
  methods: {
    selectChange(m){
    },
    clearSearchForm(){
     this.$refs.cruds.searchReset();
    },
    getDictionary(){
      dictionary("disaster_monitor_running_status").then( res => {
        this.runningStatus = res.data.data;
      });
      
    },
    getRowKeys:function(key){
    },
    selectionChange(list) {
      let now = [];
      list.forEach(e => {
        now.push(e);
      });
      this.selecteData = now;
    },
    getList(page, params) {
      this.listLoading = true;
      monitor_base_info(Object.assign({
        current: page.currentPage,
        size: page.pageSize,
        disasterId:JSON.parse(window.sessionStorage.getItem('disasterData')).id
      }, params, this.searchForm,this.searchObj)).then(response => {
        this.list = response.data.data.records;
        this.page.total = response.data.data.total;
        this.listLoading = false;
      });
    },
   
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange(current) {
      this.page.currentPage = current
    },
    handleFilter(form, done) {
      this.searchForm = form;
      this.page.currentPage = 1;
      this.page.total = 0;
      this.getList(this.page, this.searchForm);
      done()
    },
    handleRefreshChange() {
      this.getList(this.page)
    },
    handleCreate() {
      this.boundaryPicUrl = null;
      this.warningPicUrl = null;
      this.rowView = false;
      this.form.runningStatus = null;
      this.getDictionary();
      this.$refs.cruds.rowAdd();

    },
    handleEdit(){//更新监测点
    this.page.currentPage = 1;
    this.getList(this.page);
    },
    handleDel(){//删除
      let idsAll = [];
      this.selecteData.forEach(item => {
        idsAll.push(item.id);
      })
      let ids = idsAll.join(",");
      if(ids){
        this.$confirm("是否确认删除选中文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消", type: "warning"
      }
      ).then(() => {
        monitor_base_info_delete(ids).then(
        res => {
          this.getList(this.page);
          this.$notify.success('删除成功')
        }
      ).catch(err => {
          this.$notify.error('删除失败')
      })
      });
      }else{
        this.$confirm("请选择要删除的数据！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消", type: "warning"
      }
      )
      }
      
    },
    handleDaochu(){//导出
      this.$refs.cruds.rowExcel();
    },
    handleOpenBefore(show, type) {
      window.boxType = type;
      show();
    },
    handleInfo(row,index) {
      // this.dialogFormVisible = true;
      
      this.form.runningStatus = null;
      this.rowView = false;
      this.boundaryPicUrl = row.boundaryPic;
      this.warningPicUrl = row.warningPic;
      this.getDictionary();
      this.$refs.cruds.rowEdit(row,index);
    },
    update(row,index,done,loading){
      this.form.boundaryPic = this.boundaryPicUrl;
      this.form.warningPic = this.warningPicUrl;
      monitor_base_info_update(this.form).then(() => {
        this.boundaryPicUrl = null;
        this.warningPicUrl = null;
        this.getList(this.page);
        done();
        this.$notify.success('修改成功');
      }).catch(() => {
        loading();
      });
    },
    create(row, done, loading) {
      this.form.disasterId = JSON.parse(window.sessionStorage.getItem('disasterData')).id
      this.form.boundaryPic = this.boundaryPicUrl;
      this.form.warningPic = this.warningPicUrl;
      this.form.province = 440308;
      // this.form.provinceName = '盐田';
      // row.streetName = row.$streetCode;
      // row.communityName = row.$communityCode;
      monitor_base_info_add(this.form).then(() => {
        this.getList(this.page);
        done();
        this.$notify.success('创建成功');
        this.getList();
      }).catch(() => {
        loading();
      });
    },
    handleWarningSuccess(res, file) {//上传成功
        this.warningPicUrl = res.data.infos[0].url;
    },
    handleboundarySuccess(res, file) {//上传成功
        this.boundaryPicUrl = res.data.infos[0].url;
    },
    handleView(row, index) {
      this.form.runningStatus = null;
      this.rowView = true;
      this.boundaryPicUrl = row.boundaryPic;
      this.warningPicUrl = row.warningPic;
      this.getDictionary();
      this.$refs.cruds.rowView(row,index);
    },
    rowStyle({row, column, rowIndex}) {
      if(rowIndex%2 == 0){
        return {
          background: "#eee",
          color: "#fff"
        }
      }
    },
    beforeAvatarUpload(file) {
      let testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
        const type = testmsg === 'jpg' || testmsg === 'png' || testmsg === 'jpge' ? true :false;
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!type) {
          this.$message.error('上传图片只能是 JPG、PNG、JPEG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 20MB!');
        }
        return type && isLt2M;
      },
      imgClick(n){
        if(n == 2){
          this.isEnlargeBoundary = !this.isEnlargeBoundary;
        }else{
          this.isEnlargeWarning = !this.isEnlargeWarning;
        }
      },
      deleteImg(n){
        this.$confirm("确认删除该图片？","提示",{
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                 type: "warning"
            }).then(()=> {
            n == 1 ? this.warningPicUrl = '' : this.boundaryPicUrl = '';
            })
      }
  }
};

</script>

<style lang="scss" scoped>
.close-img{
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 40px;
  color: #eee;
  z-index: 999;

}
.enlarge{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba($color: #000000, $alpha: 0.4);
    height: 100vh;
    width: 100vw;
    padding: 20px;
    z-index: 990;
    .enlarge-img{
      width: 100%;
      height: 100%;
    }
  }
.hide_mod {
  height: 100%;

  &__tree {
    padding-top: 3px;
    padding-right: 20px;
  }

  &__main {
    .el-card__body {
      padding-top: 0;
    }
  }
}
.el-cascader.color_dark {
  :deep .el-input__inner::-webkit-input-placeholder {
    color: #606266;
  }
  :deep .el-input__inner::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #606266;
  }
  :deep .el-input__inner:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #606266;
  }
  :deep .el-input__inner:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #606266;
  }
}
.upload{display: flex;}
.delete-img{
    height: 20px;
    width: 178px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #999;
}
.delete-img:hover{color: salmon;}

</style>

<style lang="scss">

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  
  .avatar-uploader :deep .el-upload{
    border: 1px solid #eee;
    border-radius: 5px;
  }

.hide_dialog{
  .el-dialog__header{
    padding: 10px;
    background: rgba(0, 58, 106, 1);
    color: #fff;
  }
  .el-dialog__headerbtn{
    top: 10px;
  }
  .el-dialog__body{
    padding: 10px !important
  }
  .el-tabs--left .el-tabs__item.is-left{
    text-align: center !important;
  }
}
.margin-r-10{margin-right: 10px;}

</style>


