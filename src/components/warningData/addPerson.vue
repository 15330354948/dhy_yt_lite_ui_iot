<template>
  <div class="add-person">
    <div class="person-box">
      <el-tag
        v-for="(item, index) in personNames"
        :key="item.id"
        closable
        @close="delPerson(index, item)"
        >{{ item.name }}</el-tag
      >
    </div>
    <div class="select-button">
      <el-button type="primary" size="medium" @click="closeDialog(1)"
        >确认</el-button
      >
      <el-button size="medium" @click="closeDialog(0)">取消</el-button>
    </div>
    <avue-crud
      ref="personCruds"
      :option="personOption"
      :data="data"
      :page.sync="page"
      :search.sync="searchForm"
      @search-change="searchChange"
      @search-reset="searchReset"
      @size-change="sizeChange"
      @current-change="currentChange"
      @selection-change="selectionChange"
    >
    </avue-crud>
  </div>
</template>

<script>
// v-model="searchForm"  @refresh-change="handleRefreshChange"
import { personOption } from "./personOption";
import { mapGetters } from "vuex";
import {
  getPerson,
} from "@/api/warningMag/monitorList";
import {  fetchList as getPersonData } from '@/api/warningMag/personManage'
export default {
  name: "AddPerson",
  props: ["dialogMessage", "disasterData", "dataRend","warnLevel"],
   computed: {
    ...mapGetters(["permissions","projectId"]),
  },
  data() {
    return {
      personNames: [],
      addPersons: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: -1, // 每页显示多少条
      },
      personOption: personOption,
      data: [],
      tableLoading: false,
      searchForm: {},
      defaultData:[],
    };
  },
  watch: {
    dialogMessage(val) {
      if (val) {
        this.searchForm = {};
        this.$refs.personCruds.searchReset();
        // this.getSelectPersonList(this.searchForm);
      }
    },
    dataRend: {
      immediate: true,
      handler: function (val) {
        if(val&&val.length > 0){
           this.defaultData=val
           setTimeout(() => {
             let personIdArr=[]
             this.defaultData.forEach(e=>{
               personIdArr.push(this.data.find(item=>item.id ==e.personId))
             })
             this.toggleSelection(personIdArr)
           }, 300);
        }
        // setTimeout(() => {
        //   this.data=val
        //   var arr = [];
        //   if (val.length > 0 && this.data.length > 0) {
        //     this.data.forEach((item) => {
        //       val.forEach((it) => {
        //         if (item.id == it.personId && item.type == it.type) {
        //           arr.push(item);
        //         }
        //       });
        //     });
        //     this.$refs.personCruds.toggleSelection(arr);
        //   }
        // }, 300);
      
      },
    },
    data: {
      immediate: true,
      handler: function (val) {},
    },
  },
  created(){
    this.getPersonList()
  },
  mounted(){
   this.defaultData=this.dataRend
  },
  methods: {
    delPerson(index, item) {
      this.$refs.personCruds.toggleRowSelection(item, false);
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    getSelectPersonList(res) {
      let form = Object.assign(
        { projectId:this.projectId,warnLevel:this.warnLevel},
        {...res}
      );
     getPerson(form).then(v=>{
          this.data=v.data.data
        })
    },
    selectionChange(list) {
      this.personNames = [];
      this.addPersons = [];
      list.forEach((e) => {
        this.personNames.push(e);
        this.addPersons.push(
          Object.assign({
            name: e.name,
            phone: e.phone,
            personId: e.id,
            type: e.type,
          })
        );
      });
    },
    searchChange(form, done) {
      // this.searchForm = form;
      // this.page.currentPage = 1;
      // this.getSelectPersonList(form);
      this.getPersonList()
      done();
    },
    handleRefreshChange() {
      // this.getSelectPersonList();
    },
    closeDialog(n) {
      if (n == 1) {
        //确定时提交新增接口
        this.$emit("closeDialog", n, this.addPersons);
        this.$refs.personCruds.selectClear();
      } else {
        this.$emit("closeDialog", n);
        this.$refs.personCruds.selectClear();
      }
    },
    selectClear() {
      this.$refs.personCruds.selectClear();
    },
    searchReset() {
      //搜索清空
      this.getPersonList()
    },
    getPersonList(){
        let formQuery = Object.assign({current:this.page.currentPage,size:this.page.pageSize,
            "projectId":this.projectId,
            },this.searchForm);
      getPersonData(formQuery).then(res=>{
          this.data = res.data.data.records;
      })
    },
     toggleSelection(val){
        this.$refs.personCruds.toggleSelection(val);
      }
  },
};
</script>
<style lang="scss" scoped>
.person-box {
  height: 100px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  .el-tag {
    font-size: 15px;
    margin: 4px;
  }
}
.select-button {
  float: right;
  margin: 20px 0;
}
.avue-crud {
  margin-top: 80px;
}
</style>