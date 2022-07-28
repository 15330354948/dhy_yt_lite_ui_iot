<template>
  <div class="app-container calendar-list-container">
    <!-- :permission="permissionList" @on-load="getList" -->
    <basic-container>
      <avue-crud
        :data="tableData"
        :option="tableOption"
        v-model="obj"
        :page.sync="page"
        :table-loading="tableLoading"
        @search-change="searchChange"
        @search-reset="searchReset"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-save="add"
        @row-del="handleDel"
        @selection-change="selectionChange"
        ref="crudRef"
        :permission="permissionList" 
      >
        <template slot="subprojectIdSearch">
          <el-select v-model="subprojectId" placeholder="请选择">
            <el-option
              v-for="item in subprojectIdArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
        <template slot="deviceCodeForm">
          <el-select
            v-model="obj.deviceCode"
            placeholder="请选择"
            filterable
            @change="deviceCodeChange"
          >
            <el-option
              v-for="item in devNoArr"
              :key="item.deviceId"
              :label="item.deviceNo"
              :value="item.deviceId"
            >
            </el-option>
          </el-select>
        </template>
        <!-- <template slot="subprojectNameForm" >
           <el-select v-model="obj.subprojectName" disabled placeholder="请选择" >
            <el-option
              v-for="item in subprojectNameArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
      </template> -->
        <template slot="menuLeft">
          <el-button type="primary" @click="multiDisposalBtnHandle"
           v-if="permissions.abnormalDevOuter_batchDisposal"
            >批量处置</el-button
          >
          <el-button type="primary" @click="multiDelBtnHandle"
          v-if="permissions.abnormalDevOuter_del_multi"
            >批量删除</el-button
          >
        </template>
        <template slot-scope="{ row, index }" slot="menu">
          <el-button type="text" @click="detailBtn(row, index)"  v-if="permissions.abnormalDevOuter_detail" >详情</el-button>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog
      title="详情"
      :visible.sync="detailVisible"
      width="90%"
      top="3vh"
      custom-class="set_dialog"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="cancelShowDetailInfo"
    >
      <detailInfo ref="detailInfoRef" :rowData.sync="detailItem" @bush="bush"></detailInfo>
    </el-dialog>
    <el-dialog
      :title="titleTpl"
      :visible.sync="dialogVisible"
      width="70%"
      custom-class="set_dialog"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="cancelDisposal"
    >
      <div>
        <avue-form
          ref="batchDisposalForm"
          v-model="disposalObj"
          :option="formOption"
          @submit="batchDisposal"
        >
        </avue-form>
      </div>
      <span slot="footer" class="dialog-footer">
        
        <el-button type="primary" @click="batchDisposal">确 定</el-button>
        <el-button @click="cancelDisposal">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { tableOption, formOption } from "@/const/crud/oam/abnormalDev";
import detailInfo from "./detail.vue";
import { fetchList, getDevNo, addObj,batchDelObj,multiDisposalHanlde,getdisposalStatusBydevId } from "@/api/abnormal/abnormalDev";
import { fetchList as getsubproject } from "@/api/monitorManage/projectInfo";

export default {
  name: "",
  components: {
    detailInfo,
  },
  data() {
    return {
      tableOption: tableOption,
      formOption: formOption,
      obj: {
        deviceCode: null,
        // deviceName:null,
        // deviceType:null,
        // deviceStatus:null,
        // monitorName:null,
        // subprojectName:null,
        // factoryName:null,
        // abnormalType:null,
        // abnormalTime:null,
        // abnormalDescription:null,
        // timeRange:null,
        // abnormalDeviceRecordFileList:null,
        // subprojectId:null,
      },

      subprojectId: null,

      disposalObj: {},
      tableLoading: false,
      tableData: [],
      devNoArr: [],
      subprojectIdArr: [],
      subprojectNameArr: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
      },
      selectedArr: [],
      dialogVisible: false,
      detailVisible: false,
      titleTpl: "",
      detailItem: null,
      isAdd:true,
    };
  },
  created() {
    getDevNo({
      projectId: this.projectId,
    }).then((res) => {
      this.devNoArr = res.data.data || [];
    });
    getsubproject({
      size: -1,
      current: 1,
      projectId: this.projectId,
    }).then((res) => {
      this.subprojectIdArr = res.data.data.records || [];
      this.subprojectNameArr = res.data.data.records || [];
    });
  },
  mounted() {
    // this.getList()
  },
  computed: {
    ...mapGetters(["permissions", "projectId"]), //获取权限
     permissionList() {
        return {
          delBtn: this.vaildData(this.permissions.abnormalDevOuter_del, false),
          addBtn: this.vaildData(this.permissions.abnormalDevOuter_add, false),
        };
      },
  },
  watch: {
    projectId: {
      immediate: true,
      handler(val, oVal) {
        if (val != 0 && val) {
          this.getList();
          if (this.$refs.crudRef) {
            this.$refs.crudRef.selectClear();
            this.$refs.crudRef.searchReset();
            this.subprojectId = null;
          }
          getDevNo({
            projectId: this.projectId,
          }).then((res) => {
            this.devNoArr = res.data.data || [];
          });
          getsubproject({
            size: -1,
            current: 1,
            projectId: this.projectId,
          }).then((res) => {
            this.subprojectIdArr = res.data.data.records || [];
            this.subprojectNameArr = res.data.data.records || [];
          });
        }
      },
      deep: true,
    },
    // "obj.deviceCode":{
    //   handler:(n,o)=>{

    //   }
    // },
  },
  methods: {
    bush(){
       this.getList()
    },
    getList() {
      this.tableLoading = true;
      fetchList(
        Object.assign(
          {
            current: this.page.currentPage,
            size: this.page.pageSize,
            projectId: this.projectId,
          },
          this.searchParams
        )
      ).then((res) => {
        this.tableData = res.data.data.records;
        this.page.total = res.data.data.total;
        this.tableLoading = false;
      });
    },
    searchChange(form, done) {
      this.page.currentPage = 1;
      this.searchParams = form;
      this.searchParams.subprojectId = this.subprojectId;
      if (
        this.searchParams.abnormalTime &&
        this.searchParams.abnormalTime.length == 2
      ) {
        this.searchParams.abnormalTime_begin =
          this.searchParams.abnormalTime[0];
        this.searchParams.abnormalTime_end = this.searchParams.abnormalTime[1];
        delete this.searchParams.abnormalTime;
      }
      this.getList();
      //搜索
      done();
    },
    /**
     * 清空按钮
     */
    searchReset() {
      this.page.currentPage = 1;
      this.page.pageSize = 10;
      this.searchParams = {};
      this.subprojectId = null;
      this.getList();
    },
    sizeChange(pageSize) {
      //分页条数变化时
      this.page.pageSize = pageSize;
      this.getList();
    },
    currentChange(current) {
      //当前页码变化时
      this.page.currentPage = current;
      this.getList();
    },
    refreshChange() {
      this.getList();
    },
    getSJC(str) {
      str = new Date(Date.parse(str.replace(/-/g, "/")));
      str = str.getTime();
      return str;
    },
    add(row,done, loading) {
      let fileIds=[]
      let item=row
      if(item.abnormalDeviceRecordFileList&&item.abnormalDeviceRecordFileList.length>0){
        item.abnormalDeviceRecordFileList.forEach(item => {
            fileIds.push(item.label)
        });
        
      }
    
      let objPost={
        "abnormalDescription": item.abnormalDescription,
        "abnormalTime": item.abnormalTime,
        "abnormalType": item.abnormalType,
        "deviceId": item.deviceCode,
        "fileIdList": fileIds,
        "projectId":this.projectId,
        "subprojectId":item.subprojectId,
        // "subprojectId":item.subprojectName,
      }
      if(item.timeRange&&item.timeRange.length==2){
          objPost.monitorDataRangeEndTime=item.timeRange[1]
        objPost.monitorDataRangeStartTime=item.timeRange[0]
      }
      // let endTime=this.getSJC(objPost.deviceRecordDetail.monitorDataRangeStartTime)
      // let startTime=this.getSJC(objPost.deviceRecordDetail.monitorDataRangeEndTime)
      // if((endTime - startTime) >= 604800000){
      //   this.$message.error('所选时间范围超过7天')
      //   return false
      // }
      
      //新增
      if(this.isAdd){
          addObj(objPost).then((res) => {
          loading();
          done()
          this.page.current = 1;
          this.page.currentPage = 1;
          this.getList();
        });
      }else{
        this.$message.warning('该设备编号处于异常，无需再次添加')
        loading()
      }
      
    },
    handleDel(row, index) {
      //删除
      this.$confirm("是否确认删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      })
        .then(() => {
          batchDelObj(row.id).then((res) => {
            this.page.current = 1;
            this.page.currentPage = 1;
            this.getList();
          });

          //  this.$message.success('删除成功')
        })
        .catch(function () {});
    },
    selectionChange(list) {
      //选中的数据
      this.selectedArr = list;
    },
   
    multiDelBtnHandle() {
      if (this.selectedArr && this.selectedArr.length > 0) {
        this.$confirm("是否确认批量删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnClickModal: false,
          type: "warning",
        })
          .then(() => {

            let objTpl=[]
            this.selectedArr.forEach(e=>{
              objTpl.push(e.id)
            })
            let stringTpl=objTpl.join(",");
               batchDelObj(stringTpl).then((res) => {
            this.page.current = 1;
            this.page.currentPage = 1;
            this.getList();
          });

          })
          .catch(function () {});
      } else {
        this.$message.error("请选择要操作的数据！");
      }
    },
    multiDisposalBtnHandle() {
      if (this.selectedArr && this.selectedArr.length > 0) {
        
        let count=0
        this.selectedArr.forEach(e => {
          if(e.disposalStatus=='y'){
            count+=1
          }
        });
        if(count>0){
          this.$message.error("已处置状态数据被选中，请重新选择！");
        }else{
          this.titleTpl = "处置（" + this.selectedArr.length + "个设备）";
        this.dialogVisible = true;
        }
      } else {
        this.$message.error("请选择要操作的数据！");
      }
    },
 
     batchDisposal() {
      let ids=[];
      this.selectedArr.forEach(e => {
        ids.push(e.id)
      });
      let objPost={
        abnormalDeviceRecordIdList:ids,
        disposalStatus:this.disposalObj.disposalStatus,
        disposalResults:this.disposalObj.disposalResults,
        remark:this.disposalObj.remark
      }
      // 
      multiDisposalHanlde(objPost).then(res=>{
        // done()
        this.$refs.batchDisposalForm.resetForm();
        this.dialogVisible = false;
         this.page.current = 1;
            this.page.currentPage = 1;
            this.getList();
      })
      
      
    },
    cancelDisposal() {
      this.$refs.batchDisposalForm.resetForm();
      this.dialogVisible = false;
      this.titleTpl = "";
    },
    detailBtn(row, index) {
      this.detailItem = row;
      this.detailVisible = true;
    },
    cancelShowDetailInfo() {
      this.$refs.detailInfoRef.activeName = "first";
      this.detailVisible = false;
      this.getList()
    },
    deviceCodeChange(val) {
      if (val) {
        let objTplARR = this.devNoArr.filter((row) => row.deviceId == val);
        if (objTplARR && objTplARR.length > 0) {
          let objTpl = objTplARR[0];
          getdisposalStatusBydevId(objTpl.deviceId).then(res=>{
            if(res.data.data){
                  let ds=res.data.data.disposalStatus
                if(ds&&(ds=='c'||ds=='n')){
                  this.$message.warning('该设备编号处于异常，无需再次添加')
                  this.isAdd=false
                  return false
                  // setTimeout(() => {
                  //   this.obj.deviceCode=null
                  // }, 400);
                }else{
                  this.isAdd=true
                }
            }else{
                this.isAdd=true
            }
          
          })
          this.obj.deviceName = objTpl.deviceName;
          this.obj.deviceType = objTpl.deviceType;
          this.obj.deviceStatus = objTpl.deviceStatus;
          this.obj.monitorName = objTpl.monitorName;
          // this.obj.subprojectName = objTpl.projectName;
          this.obj.subprojectName = objTpl.projectName;
          this.obj.subprojectId = objTpl.subprojectId;
          this.obj.factoryName = objTpl.factoryName;
          this.obj.deviceLocation = objTpl.deviceLocation;
          
        }
      }
    },
    // get(){},
  },
};
</script>
<style lang="scss" >
 .abnormal_dev_table{
   .avue--detail .el-form-item--mini.el-form-item{
     background-color: #fff;
   }
 }
 



</style>