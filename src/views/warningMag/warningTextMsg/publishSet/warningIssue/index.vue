<template>
  <div class="warning-issue field_data">
    <div class="field_data__tree">
      <p class="field_data__title">预警发布设置</p>
      <div class="tab-header" style="margin:20px;" v-show="!this.projectId?true:false">
        <el-row :gutter="10">
          <el-col :span="1"><span>项目：</span></el-col>
          <el-col :span="6">
              <el-select v-model="projectId" clearable placeholder="所属项目"  @change="projectChange" class="project_select"  >
                <el-option
                  v-for="item in projectOptions"
                  :key="item.id"
                  :label="item.projectName"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-col>
        </el-row>
        
      
      </div>
      <el-tabs tab-position="top" @tab-click="tabClick" v-model="activeName">
        <el-tab-pane
          :name="item.remarks"
          v-for="item in warnLevel"
          :key="item.value"
          :label="item.label"
        >
          <basic-container class="tab-content">
            <!--:permission="permission"  @on-load="getDictionary" -->
            <avue-crud
              :option="personOption"
              v-model="personForm"
              :data="personList"
              ref="cruds"
              @refresh-change="refreshChange"
              :table-loading="listLoading"
              @size-change="sizeChange"
              @current-change="currentChange"
              @row-del="delPerson"
              :page.sync="page"
              :permission="permission"
            >
            <!--  " -->
              <template slot="menuLeft">
                <el-button
                  class="filter-item"
                 v-if="permissions.generator_disasterwarnpersonnel_add"
                  @click="handleAdd"
                  type="primary"
                  icon="el-icon-document-add"
                  :disabled="!isAdd"
                  >添加短信接收人</el-button
                >
              </template>
            </avue-crud>
          </basic-container>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="选择接收人"
      :visible.sync="dialogVisible"
      width="65%"
      :before-close="beforeClose"
      @close="dialogClose"
      append-to-body
    >
      <add-person
        :personsType.sync="personsType"
        :addDialog="dialogVisible"
        :warnLevel.sync="personForm.warnLevel"
        :dataParent.sync="personForm"
        class="person-dialog"
        ref="addPerson"
        @closeDialog="dialogClose"
      ></add-person>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { personOption } from "./personOption";
import AddPerson from "./AddPerson";
import { warnPersonnel, warnPersonnelDel } from "@/api/warningIssue";
import { dictionary } from "@/api/public";
import {
  projectInfo,
} from "@/api/monitorManage/device";
export default {
  props: ["openTab", "dialogFormVisible"],
  components: { AddPerson },
  data() {
    return {
      activeName: "",
      dialogVisible: false,
      personOption: personOption,
      warnLevel: [],
      personsType: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false, //是否倒序
      },
      personList: [],
      // personList: [{ name: "张三", phone: "123456789", type: "管理员" }],
      personForm: {
        // disasterId: null,
        warnLevel: null,
        projectId:null,
      },
      listLoading: true,
      permission1: {},
      projectOptions:[],
      isAdd:false,
    };
  },
  computed: {
    ...mapGetters(["permissions","projectId","userInfo"]),
    permission() {
      return{
        delBtn: this.permissions.generator_disasterwarnpersonnel_del?true:false,
      };
    },
  },
  watch: {
    dialogFormVisible(val) {
      if (val) {
        // this.getDictionary();
      }
    },
    openTab: {
      deep: true,
      immediate: true,
      handler(val, old) {
        if (val == 1) {
          this.getDictionary(val);
        }
      },
    },
    projectId: {
      immediate: true,
       handler(val, oVal) {
         window.sessionStorage.setItem('projectId', val)
        if(this.warnLevel&&this.warnLevel.length>0){
          this.personForm.warnLevel=this.warnLevel[0].value
          this.activeName = this.warnLevel[0].label;
          this.personForm.projectId=val
          this.getPersonList();
        }
         
      },
      deep: true,
    },
  },
  created() {
    if(!this.projectId||this.projectId==0){
        this.isAdd=false
         this.personForm.projectId=this.projectId
    }else{
       this.personForm.projectId=this.projectId
       this.isAdd=true
    }
   
      projectInfo().then(res=>{
        let dataRec=res.data.data;
        if(dataRec&&dataRec.length>0){
          this.projectOptions=dataRec
        }
          
    })
  },
  methods: {
    handleAdd() {
      // this.$refs.cruds.rowAdd();
      this.dialogVisible = true;
    },
    getPersonList(page, params) {
      // this.listLoading = true; //数据请求完后改为false
      // this.personForm.disasterId = JSON.parse(
      //   window.sessionStorage.getItem("disasterData")
      // ).id;


      warnPersonnel(Object.assign({current:this.page.currentPage,size:this.page.pageSize},this.personForm)).then((res) => {
        this.personList = res.data.data.records;
         this.page.total = res.data.data.total;
        // if (this.personList&&this.personList.length>0) {
        //   this.personList.forEach((item) => {
        //     item.typeName = item.type
        //       ? this.personsType.filter((type) => {
        //           return type.value * 1 == item.type;
        //         })[0].label
        //       : "";
        //   });
        // }
        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      });
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    beforeClose(done) {
      this.$confirm("确认关闭?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          this.dialogClose();
          done();
        })
        .catch((cancel) => {
          this.dialogVisible = true;
        });
    },
    dialogClose(n) {
      this.dialogVisible = false;
      this.$refs.addPerson.addForm = {};
      this.$refs.addPerson.selectClear();
      if (n == 1) {
        this.getPersonList();
      }
    },
    tabClick(tab, event) {
      this.personForm.warnLevel =
        this.warnLevel.filter((type) => {
          return type.label == tab.label;
        })[0].value * 1;
      this.activeName = tab.label;
      this.getPersonList();
    },
    getDictionary(wl) {
      dictionary("warn_level").then((res) => {
         this.warnLevel = res.data.data.warn_level
           // this.warnLevel = res.data.data.warn_level.filter((item) => {
        //   return item.value * 1 < 5;
        // });
        this.activeName = this.warnLevel[0].label;
        if(wl){
           this.personForm.warnLevel= this.warnLevel[0].value
        }else{
          this.personForm.warnLevel =
          this.warnLevel.filter((type) => {
            return type.label == this.activeName;
          })[0].value * 1;
        }

      });

      // dictionary("qcqf_person_type").then((res) => {
      //   this.personsType = res.data.data;
      // });
     setTimeout(() => {
        this.getPersonList();
     }, 200);
    },
    delPerson(row, index) {
      this.$confirm("确认删除该短信接收人?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        warnPersonnelDel(row.id).then((person) => {
          this.$message.success("删除成功!");
          this.page.currentPage = 1;
          this.getPersonList();
        });
      });
    },
     refreshChange() {
      this.getPersonList();
    },
    projectChange(val){
      this.personForm.projectId=val;
      if(!val){
        this.isAdd=false
      }else{
        this.isAdd=true
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.project_select{
  width:100%;

}
</style>
