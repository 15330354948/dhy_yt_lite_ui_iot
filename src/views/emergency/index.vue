
<template>
  <div class="user">
    <basic-container>
      <avue-crud
        :option="option"
        ref="crud"
        v-model="form"
        :page.sync="page"
        @on-load="getList"
        @size-change="sizeChange"
        @current-change="currentChange"
        @search-change="searchChange"
        @search-reset="handlereset"
        @refresh-change="handleRefreshChange"
        @row-save="handleSave"
        :table-loading="listLoading"
        :data="list"
      >
        <template slot="search">
          <el-form label-position="right" label-width="130px">
            <el-form-item label="任务接收人">
              <el-select v-model="SelectFormlist1.recipient" @change="personChange" :span="6">
                <el-option
                  v-for="item in SelectOption"
                  :label="item.name"
                  :key="item.id"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-circle-close"
            @click="toView(scope.row)"
          >详情</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-circle-close"
            @click="rowdel1(scope.row)"
          >删除</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-circle-close"
            @click="rowend(scope.row)"
          >终止</el-button>
        </template>
        <template slot="recipientForm">
          <el-select
            v-model="SelectFormlist.disasterName1"
            placeholder="请选择接收人"
            @change="selectChange($event)"
            clearable
            :disabled="selectView"
          >
            <el-option
              v-for="(item, index) in SelectOption"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
            <div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="selectpPage.total"
                :page-size="selectpPage.pageSize"
                :current-page="selectpPage.currentPage"
                @current-change="handleCurrentChange"
              ></el-pagination>
            </div>
          </el-select>
        </template>
        <template slot="disasterIdForm">
          <el-select
            v-model="SelectForm.disasterId"
            placeholder="请选择监测点编号"
            @change="selectChange($event)"
            clearable
            :disabled="selectView"
          >
            <el-option
              v-for="(item, index) in SelectOption1"
              :key="index"
              :label="item.pikk"
              :value="item.id"
            ></el-option>
            <div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="selectpPage.total"
                :page-size="selectpPage.pageSize"
                :current-page="selectpPage.currentPage"
                @current-change="handleCurrentChange"
              ></el-pagination>
            </div>
          </el-select>
        </template>
        <template slot="disasterNameForm">
          <el-input v-model="SelectForm.disasterName" placeholder="请输入监测点名称" :disabled="true"></el-input>
        </template>
        <!-- <template slot="siteImageForm">
           <div class="upload flex"  >
             <div class="img-item" v-for="(item,index) in imgArray" :key="item.id">
                                  <img  :src="item.url" alt="" @click="imgClick(index)">
                              </div>
             <el-upload
              class="avatar-uploader"
              :disabled="rowView"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleWarningSuccess"
              :headers="header"
              :before-upload="beforeAvatarUpload">
              <div slot="tip" class="el-upload__tip">只能上传JPG、PNG、JPEG文件，且不超过500kb</div>
              <i class="el-icon-plus avatar-uploader-icon"></i>
           </el-upload>
           </div>
        </template>-->
        <!-- <template slot="recipientName">
          <span v-if="SelectOption">{{SelectOption.filter(type => type.id == SelectFormlist.recipient)[0]}}</span>
        </template>-->
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {
  fetchList,
  addObj,
  getPageList,
  getObj,
  delObj,
  getPageListadd
} from "@/api/emergency/emergency";
import { disInfo } from "@/api/monitorManage/device";
import { tableOption } from "@/const/crud/emergency/emergency1";
import { mapGetters } from "vuex";
import store from "@/store";
import { baseUrl } from "@/config/env";
import { imgFile } from "@/api/reservePlan";
export default {
  name: "table_user",
  data() {
    return {
      // imgArray:[],
      // uploadUrl:baseUrl + 'file/upload',
      // rowView:false,
      warningPicUrl: "",
      isEnlargeWarning: false,
      searchForm: {},
      option: tableOption,
      checkedKeys: [],
      cascaderCurrentValue: [],
      SelectOption: [],
      SelectOption1: [],
      selectView: false,
      SelectFormlist: {
        disasterName: "",
        disasterId: ""
      },
      SelectFormlist1: {
        recipient: ""
      },
      SelectForm: {
        disasterId: "",
        disasterName1: ""
      },
      SelectForm2: {},
      selectpPage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false //是否倒序
      },
      list: [],
      listLoading: true,
      role: [],
      fixedRole: [],
      form: {},
      rolesOptions: [],
      colorChange: false
    };
  },
  computed: {
    ...mapGetters(["permissions,access_token"]),
    header() {
      return { Authorization: "Bearer " + store.getters.access_token };
    }
  },
  watch: {},
  created() {
    this.getSelectList();
  },
  methods: {
    personChange(data) {
    },
    // getImgUrl(ids){
    //   console.log("ids",ids);
    //         imgFile(ids).then(res => {
    //             this.imgArray = [];
    //             res.data.data.forEach(item => {
    //                 this.imgArray.push(Object.assign({},{url:item.netUrl,id:item.id}));
    //                 this.isLoading = false;
    //             })
    //         })
    // },
    async toView(row, index) {
      await disInfo({ id: row.disasterId }).then(v => {
        this.SelectForm.disasterName = v.data.data.records[0].name;
        row.disasterCode = v.data.data.records[0].pikk;
      });
      console.log(row);
      row.siteImage = [];
      if (row.fileVOList != null) {
        row.fileVOList.forEach(item => {
          row.siteImage.push(item.netUrl);
        });
      }
      this.$refs.crud.rowView(row, index);
    },
    handleCurrentChange() {},
    //分页查询
    getList(page, params) {
      this.listLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize
          },
          params
        )
      ).then(response => {
        if (response.data.data) {
          this.list = response.data.data.records;
          this.list.forEach(item => {
          item.recipientName = this.SelectOption.filter(type => {
            return type.id == item.recipient;
          }).length
            ? this.SelectOption.filter(type => {
                return type.id == item.recipient;
              })[0].name
            : "";
        });
        this.page.total = response.data.data.total;
        this.listLoading = false;
        }else{
          this.list = [];
          this.page.total = 0
        }


        // console.log(this.list, 66666);
      });
    },

    getSelectList() {
      getPageList({
        current: this.selectpPage.currentPage,
        size: this.selectpPage.pageSize
      }).then(res => {
        this.SelectOption = res.data.data.records;
        this.selectpPage.total = res.data.data.total;
        console.log(res);
      });
      getPageListadd({
        current: this.selectpPage.currentPage,
        size: this.selectpPage.pageSize
      }).then(res => {
        this.SelectOption1 = res.data.data.records;
        this.selectpPage.total = res.data.data.total;
        console.log(res);
      });
    },

    selectChange(e) {
      let obj = {};
      obj = this.SelectOption.find(item => {
        //这里的userList就是上面遍历的数据源
        // return item.  === e; //筛选出匹配数据
        if (item.id === e) {
          this.SelectFormlist.disasterName = item.name;
          this.SelectFormlist.disasterId = item.id;
        }
      });
      obj = this.SelectOption1.find(item => {
        //这里的userList就是上面遍历的数据源
        // return item.  === e; //筛选出匹配数据
        if (item.id === e) {
          this.SelectForm.disasterName = item.name;
          this.SelectForm.disasterId = item.id;
        }
      });
    },

    //新增
    handleSave: function(row, done) {
      row.disasterName = this.SelectForm.disasterName;
      this.SelectForm.disasterId;
      addObj(
        Object.assign(row, {
          recipient: this.SelectForm.disasterId,
          disasterId: this.SelectForm.disasterId
        })
      ).then(data => {
        this.$message.success("添加成功");
        // this.refreshChange();
        this.getList(this.page);
      });
      // console.log(row);

      done();
    },
    // 刪除
    rowdel1: function(row, index) {
      this.$confirm("是否确认删除ID为" + row.id, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return getObj(row.id);
        })
        .then(data => {
          this.$message.success("删除成功");
          this.getList(this.page);
        });
    },
    // 終止任務
    rowend(data) {
      this.$confirm("是否确定终止该任务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delObj({
            id: data.id,
            status: "4"
          });
        })
        .then(data => {
          this.$message.success("终止成功");
          this.getList(this.page);
        });
      console.log(data, 6666);
    },
    getNodeData(data) {
      this.setRoleOptions();
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    //搜索
    searchChange(form, done) {
      this.searchForm = form;
      Object.assign(form, this.SelectFormlist1);

      this.page.currentPage = 1;
      this.getList(this.page, form);
      this.listLoading = false;
      // fetchList(form)
      //   .then(res => {
      //     this.tableAppeakData = res.data.data.records;
      //     this.listLoading = false;

      //     console.log(5555);
      //   })
      //   .catch(() => {
      //     this.listLoading = false;
      //   });

      done();
    },
    //清空
    handlereset(form, done) {
      this.getList(this.page, form);
      this.SelectFormlist1 = {};
    },
    handleRefreshChange() {
      this.getList(this.page);
    }
    // imgClick(n){

    //       this.isEnlargeWarning = !this.isEnlargeWarning;
    // },
    // beforeAvatarUpload(file) {
    // let testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
    //   const type = testmsg === 'jpg' || testmsg === 'png' || testmsg === 'jpge' ? true :false;
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!type) {
    //     this.$message.error('上传图片只能是 JPG、PNG、JPEG格式!');
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传图片大小不能超过 2MB!');
    //   }
    //   return type && isLt2M;
    // },
    // imgClick(n){
    //   // if(n == 2){
    //   //   this.isEnlargeBoundary = !this.isEnlargeBoundary;
    //   // }else{
    //   //   this.isEnlargeWarning = !this.isEnlargeWarning;
    //   // }
    // },
    //   handleWarningSuccess(res, file) {//上传成功
    //   this.warningPicUrl = res.data.infos[0].url;
    // },
  }
};
</script>

<style lang="scss" scoped>
.user {
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
</style>


