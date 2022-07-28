<template>
  <div class="hide_mod">
    <basic-container>
      <div class="header">
        <el-row style="line-height: 30px" class="row_dialog">
          <el-col :span="24"
            ><span style="font-size: 18px; font-weight: 600">监测点信息</span>
          </el-col>
          <el-col :span="6"
            ><label class="el-form-item__label">监测点编号:</label
            ><span class="value_span">{{ dangerForm.monitorCode || "" }}</span></el-col
          >
          <el-col :span="6"
            ><label class="el-form-item__label">监测点名称:</label
            ><span class="value_span">{{ dangerForm.monitorName || "" }}</span></el-col
          >
          
          <el-col :span="6"
            ><label class="el-form-item__label">经度:</label
            ><span class="value_span">{{
              dangerForm.longitude || ""
            }}</span></el-col
          >
          <el-col :span="6"
            ><label class="el-form-item__label">纬度:</label
            ><span class="value_span">{{
              dangerForm.latitude || ""
            }}</span></el-col
          >
          <el-col :span="6"
            ><label class="el-form-item__label">地址:</label
            ><span class="value_span">{{
              dangerForm.location || ""
            }}</span></el-col
          >
        </el-row>
      </div>

      <div class="content">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="设备预警记录" name="first">
            <avue-crud
              class="crud-record"
              :option="recordOption"
              ref="crudRecord"
              v-model="recordForm"
              :page.sync="recordPage"
              @on-load="getList"
              @size-change="sizeChange"
              @current-change="currentChange"
              @search-change="handleFilter"
              @search-reset="handlereset"
              @refresh-change="handleRefreshChange"
              :table-loading="recordLoading"
              :data="recordData"
              @selection-change="selectionChange"
              :cell-style="cellStyle"
            >
              <template slot="menu" slot-scope="scope">
                <el-button
                  @click="handleMonitor(scope)"
                  size="small"
                  type="text"
                  >监测数据</el-button
                >
              </template>
            </avue-crud>
          </el-tab-pane>

          <el-tab-pane label="预警确认记录" name="second">
            <el-row
              style="line-height: 30px"
              class="row_dialog"
              v-if="list.length > 0"
            >
              <el-col :span="24">
                <el-button
                  type="primary"
                  size="medium"
                  @click="editGrade"
                  :disabled="isManualConfirm"
                   v-if="show" 
                  >确认预警等级</el-button
                >
              </el-col>
              <!-- :disabled="list[0].amendLevel == 5" -->
              <el-col :span="24">
                <div class="block">
                  <el-timeline>
                    <el-timeline-item
                      v-for="(item, index) in list"
                      :key="index"
                    >
                      <el-card>
                        <el-col :span="4">{{ item.amendTime }}</el-col>
                        <el-col :span="12"
                          >{{
                            item.amendLevel == "4"
                              ? "红色预警"
                              : item.amendLevel == "3"
                              ? "橙色预警"
                              : item.amendLevel == "2"
                              ? "黄色预警"
                              : item.amendLevel == "1"
                              ? "蓝色预警"
                              : "正常"
                          }}({{
                            item.warnDataSource == "0"
                              ? "自动下发"
                              : item.warnDataSource == "1"
                              ? "手动下发"
                              : ""
                          }})
                        </el-col>
                        <el-col :span="24">短信接收人: </el-col>
                        <el-col :span="24"
                          >&emsp;&emsp;{{
                            item.receiverNamePhone ? item.receiverNamePhone : "无"
                          }}</el-col
                        >
                        <el-col :span="24">告警调整内容: </el-col>
                        <el-col :span="24"
                          >&emsp;&emsp;{{
                            item.informContent ? item.informContent : "无"
                          }}</el-col
                        >
                        <el-col :span="24">调整原因: </el-col>
                        <el-col :span="24"
                          >&emsp;&emsp;{{
                            item.remark ? item.remark : "无"
                          }}</el-col
                        >
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-col>
            </el-row>
            <div
              v-else
              class="text"
              style="
                font-size: 16px;
                color: darkgray;
                text-align: center;
                padding: 15px 0;
              "
            >
              暂无预警可调整
            </div>

            <!-- 监测数据弹窗 -->
            <el-dialog
              :visible.sync="isMonitor"
              v-if="isMonitor"
              width="1200px"
              title="监测数据"
              class="avue-dialog"
              @close="handleEmpty"
              append-to-body
              :close-on-click-modal="false"
            >
              <jianceData :dev-listone="devData"></jianceData>
            </el-dialog>

            <el-dialog
              title="预警等级调整"
              :visible.sync="gradeDialog"
              @close="gradeDialogClose"
              width="60%"
              append-to-body
              :close-on-click-modal="false"
            >
              <el-form ref="personForm" :model="personForm" label-width="80px">
                <el-form-item label="告警等级" prop="radio">
                  <el-radio-group
                    v-model="personForm.radio"
                    @change="radioChange"
                  >
                    <el-radio :label="4">
                      <span class="group_box group_red"></span>
                    </el-radio>
                    <el-radio :label="3">
                      <span class="group_box group_orange"></span>
                    </el-radio>
                    <el-radio :label="2">
                      <span class="group_box group_yellow"></span>
                    </el-radio>
                    <el-radio :label="1">
                      <span class="group_box group_blue"></span>
                    </el-radio>
                    <el-radio :label="0">
                      <span>无预警</span>
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="调整原因" prop="input">
                  <el-input
                    placeholder="请输入调整原因"
                    v-model="personForm.remark"
                    maxlength="200"
                    type="textarea"
                    clearable
                    show-word-limit
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="短信接收人" prop="input">
                  <el-input
                    placeholder="请选择短信接收人"
                    v-model="personForm.input"
                    @click.native="messageBtn"
                    readonly
                    clearable
                  >
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="personSubmit('personForm')"
                    >提交</el-button
                  >
                  <el-button @click="personRresetChange('personForm')"
                    >清空</el-button
                  >
                </el-form-item>
              </el-form>

              <el-dialog
                title="选择接收人"
                :visible.sync="dialogMessage"
                width="65%"
                :before-close="beforeClose"
                @close="dialogClose"
                append-to-body
                :close-on-click-modal="false"
              >
                <add-person
                  ref="addPersons"
                  :personList="personList"
                  :dialogMessage="dialogMessage"
                  :warnLevel="personForm.radio"
                  :dataRend.sync="dataRend"
                  @closeDialog="closeDialog"
                  class="person-dialog"
                ></add-person>
              </el-dialog>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { recordOption, macroOption } from "@/const/crud/warningMag/monitor";
import { mapGetters } from "vuex";
import {
  getDenger,
  getGrade,
  getTruerink,
  addGaojin,
  getMacroPage,
  getPerson,
  getDeviceId,
} from "@/api/warningMag/monitorList";
import { warnPersonnel } from "@/api/warningIssue";
import jianceData from "@/components/jianceData/index";
import addPerson from "./addPerson";
export default {
  name: "warningData",
  props: ["disasterData",'show'],
  components: { addPerson, jianceData },
  data() {
    return {
      dataRend:[],
      activeName: "first",
      personForm: {
        radio: "", //预警等级
        remark: "",
        input: "",
      },
      readonly: true,
      list: [],
      recordData: [], //未处置数据
      macroData: [],
      recordLoading: false,
      macroLoading: false,
      recordOption: recordOption,
      macroOption: macroOption,
      recordPage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
      },
      macroPage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
      },
      searchForm: {},
      trueForm: {},
      recordForm: {},
      dangerForm: {},
      macroForm: {},
      selectionData: [], //多选
      selectionData2: [],
      gradeDialog: false,
      dialogMessage: false,

      isMonitor: false,
      personList: [], //人员列表

      devData: {},
      isManualConfirm:false,
    };
  },
  created() {},
  mounted() {},
  watch: {
    disasterData: {
      immediate: true,
      handler: function (newval) {
        if (newval) {
          getDenger(newval.disasterId).then((res) => {
            this.dangerForm = res.data.data;
          });
          this.getGradeList();
          this.searchForm = {};
          this.recordData = [];
          this.macroData = [];
          this.activeName = "first";
          this.handlereset();
          this.handlereset2();
        }
      },
      deep:true
    },

  },
  computed: {
    ...mapGetters(["permissions","projectId"]),
  },
  methods: {
    getMacroList(page, params) {
      this.macroLoading = true;
      if (params) {
        if (params.createTime) {
          this.$set(params, "createTime_begin", params.createTime[0]);
          this.$set(params, "createTime_end", params.createTime[1]);
          delete params.createTime;
        }
      }
      // getMacroPage(
      //   Object.assign(
      //     {
      //       current: this.macroPage.currentPage,
      //       size: this.macroPage.pageSize,
      //     },
      //     {
      //       disposeStatus: "0",
      //     },
      //     {
      //       disasterBatchNo: this.disasterData.disasterBatchNo,
      //     },
      //     params,
      //     this.searchForm
      //   )
      // ).then((res) => {
      //   if (res.data.data) {
      //     this.macroData = res.data.data.records;
      //     this.macroPage.total = res.data.data.total;
      //   } else {
      //     this.macroData = [];
      //     this.macroPage.total = 0;
      //   }

      //   this.macroLoading = false;
      // });
    },
    getList(page, params) {
      this.recordLoading = true;
      if (params) {
        if (params.createTime) {
          this.$set(params, "startTime", params.createTime[0]);
          this.$set(params, "endTime", params.createTime[1]);
          delete params.createTime;
        }
      }
      this.getGradeList();
      if (this.disasterData) {
        getGrade(
          Object.assign(
            {
              current: this.recordPage.currentPage,
              size: this.recordPage.pageSize,
            },
            {
              disasterBatchNo: this.disasterData.disasterBatchNo,
            },
            params,
            this.searchForm
          )
        ).then((res) => {
          this.recordData = res.data.data.records;
          this.recordPage.total = res.data.data.total;
          this.recordLoading = false;
        });
      }
    },

    // 监测数据类型
    handleMonitor(data) {
      this.devData = data.row;
      getDeviceId({
        deviceCode:data.row.deviceNo,
        projectId:this.projectId
      }).then(res=>{
        if(res.data.data){
          this.devData.deviceId=res.data.data
          this.isMonitor = true;
        }
      })
    },

    // 监测曲线清空
    handleEmpty() {},
    // 短信接收人
    messageBtn() {
    //  this.dialogMessage = true;
    
      if(this.personForm.radio||this.personForm.radio===0){
        if(this.personForm.radio){
            warnPersonnel({current:1,size:-1,projectId:this.projectId,warnLevel:this.personForm.radio}).then(v=>{
            let rc=v.data.data
            if(rc.records&&rc.records.length>0){
              this.dataRend=rc.records
            }
          })
        }else if(this.personForm.radio===0){
          this.dataRend=[]
        }
        this.dialogMessage = true;
      }else{
        this.$message.error('请先选择告警等级！')
        this.dialogMessage = false;
        
      }
    },

    closeDialog(n, addPersons) {
      if (n) {
        this.dialogMessage = false;
      } else {
        this.$refs.addPersons.selectClear();
        // this.personForm.input = "";
        this.dialogMessage = false;
      }
      if (addPersons) {
        this.personList = addPersons;
        var str = "";
        for (var i = 0; i < addPersons.length; i++) {
          str += addPersons[i].name + ",";
        }
        if (str.length > 0) {
          str = str.substr(0, str.length - 1);
        }
        this.personForm.input = str;
      }
    },

    sizeChange(pageSize) {
      this.recordPage.pageSize = pageSize;
    },
    currentChange(current) {
      this.recordPage.currentPage = current;
    },
    handleFilter(form, done) {
      this.searchForm = form;
      this.recordPage.currentPage = 1;
      this.getList(this.recordPage, form);
      done();
    },
    handlereset(form) {
      this.searchForm = {};
      this.recordPage.currentPage = 1;
      this.getList(this.recordPage, form);
    },
    handleRefreshChange() {
      this.getList(this.recordPage);
    },

    personRresetChange() {
      this.personForm = {};
      this.personList = [];
    },

    beforeClose() {
      this.dialogMessage = false;
      this.closeDialog();
    },

    dialogClose() {
      this.dialogMessage = false;
    },

    gradeDialogClose() {
      this.personForm = {};
      this.personList = [];
      if (this.$refs.addPersons) {
        this.$refs.addPersons.selectClear();
      }

      this.closeDialog();
    },

    // 多选
    selectionChange(selection) {
      this.selectionData = selection;
    },
    selectionChange2(selection) {
      this.selectionData2 = selection;
    },
    getSelectionDataId() {
      let idList = new Array();
      if (this.selectionData.length > 0) {
        this.selectionData.forEach((d) => idList.push(d.warnId));
      }
      return idList;
    },

    getSelectionDataId2() {
      let idList = new Array();
      if (this.selectionData2.length > 0) {
        this.selectionData2.forEach((d) => idList.push(d.id));
      }
      return idList;
    },

    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 6) {
        if (row.warnLevel == "4") {
          return {
            color: "#f51717",
          };
        } else if (row.warnLevel == "3") {
          return {
            color: "#f36a09",
          };
        } else if (row.warnLevel == "2") {
          return {
            color: "#f5cd08",
          };
        } else if (row.warnLevel == "1") {
          return {
            color: "#0bb0e2",
          };
        } else if (row.warnLevel == "0") {
          return {
            color: "#13da35",
          };
        }
      }
    },

    editGrade() {
      this.gradeDialog = true;
    },

    radioChange(val) {
      //  if(val==0||val){
      //   getPerson({projectId:this.projectId,warnLevel:this.personForm.radio}).then(v=>{
      //     this.dataRend=v.data.data
      //   })
      // }
      // else{
      //   this.$message.warning("请先选择告警等级");
      // }
      this.personForm.radio=val
      if(val||val===0){}else{
        this.$message.warning("请先选择告警等级");
      }
    },

    getGradeList() {
      getTruerink(
        Object.assign(
          {
            size: -1,
          },
          {
            disasterBatchNo: this.disasterData.disasterBatchNo,
          }
        )
      ).then((res) => {
        this.list = res.data.data.records;
        if(this.list&&this.list.length>0){
          if(this.list[0].disposeStatus==2){
               this.isManualConfirm=true
              }else{
                this.isManualConfirm=false
              }
        }
      });
    },

    handleClick(tab, event) {
      this.searchForm = {};
      if (tab.index == "0") {
        this.getList();
      } else if (tab.index == "1") {
        this.getGradeList();
      } else if (tab.index == "2") {
        this.getMacroList();
      }
    },
    handleClick3(tab, event) {
      this.searchForm = {};
      if (tab.index == "0") {
        this.getMacroList();
      } else if (tab.index == "1") {
        this.getMacroList();
      }
    },

    personSubmit() {
      let form = {};
      form.amendLevel = this.personForm.radio;
      form.remark = this.personForm.remark;
      form.phoneNumbers=[];
      form.receiverNamePhone='';
      if(this.personList){
        let arr=[];
        this.personList.map(v=>{
          form.phoneNumbers.push(v.phone)
          arr.push(v.name+v.phone)
        })
        form.receiverNamePhone=arr.join(',');
        // arr.map((v) => {
        //   if (v) {
        //     form.receiverNamePhone=v+',';
        //   }
        // });
        //  = arr;
      }
      if (form.amendLevel.length==0) {
        this.$message.warning("请选择告警等级");
      } else {
        addGaojin(
          Object.assign(
            form,
            { disasterId: this.disasterData.disasterId },
            { disasterName: this.disasterData.disasterName },
            { disasterBatchNo: this.disasterData.disasterBatchNo },
            { projectId:this.projectId}
          )
        ).then((res) => {
          if (res.data.code == "0") {
            this.$message.success("处置成功");
            this.gradeDialog = false;
            this.personForm = {};
          } else {
            return;
          }
          this.getGradeList();
        });
      }
    },

    // 宏观
    sizeChange2(pageSize) {
      this.macroPage.pageSize = pageSize;
    },
    currentChange2(current) {
      this.macroPage.currentPage = current;
    },
    handleFilter2(form, done) {
      this.searchForm = form;
      this.macroPage.currentPage = 1;
      this.getMacroList(this.macroPage, form);
      done();
    },
    handlereset2(form) {
      this.searchForm = {};
      this.macroPage.currentPage = 1;
      this.getMacroList(this.macroPage, form);
    },
    handleRefreshChange2() {
      this.getMacroList(this.macroPage);
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
}
.content {
  margin-top: 30px;
  width: 100%;
  // padding: 20px;
  // border: 1px solid #ccc;
}
.value_span {
  display: block;
  text-align: right;
  // vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.block {
  padding: 30px;
}
.group_box {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 1;
  border-radius: 50%;
}
.group_red {
  background: #f51717;
}
.group_orange {
  background: #f36a09;
}
.group_yellow {
  background: #f5cd08;
}
.group_blue {
  background: #0bb0e2;
}
.group_green {
  background: #13da35;
}
</style>