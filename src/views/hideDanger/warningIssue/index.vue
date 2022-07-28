<template>
  <div class="warning-issue field_data">
    <div class="field_data__tree">
      <p class="field_data__title">预警发布设置</p>
      <div class="tab-header"></div>
      <el-tabs tab-position="top" @tab-click="tabClick" v-model="activeName">
        <el-tab-pane
          :name="item.remarks"
          v-for="item in warnLevel"
          :key="item.value"
          :label="item.remarks"
        >
          <basic-container class="tab-content">
            <avue-crud
              :option="personOption"
              v-model="personForm"
              :data="personList"
              ref="cruds"
              @on-load="getDictionary"
              :table-loading="listLoading"
              @size-change="sizeChange"
              @current-change="currentChange"
              @row-del="delPerson"
              :permission="permission"
            >
              <template slot="menuLeft">
                <el-button
                  class="filter-item"
                  v-if="permissions.generator_disasterwarnpersonnel_add"
                  @click="handleAdd"
                  type="primary"
                  icon="el-icon-document-add"
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
        :personsType="personsType"
        :addDialog="dialogVisible"
        :warnType="personForm.warnType"
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
import { dictionary } from "@/api/hideDanger/obj";
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
      personList: [{ name: "张三", phone: "123456789", type: "管理员" }],
      personForm: {
        disasterId: null,
        warnType: null,
      },
      listLoading: true,
      permission1: {},
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
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
    // openTab(n){
    //     if( n == 7){
    //         this.getDictionary();
    //     }
    // },
    openTab: {
      deep: true,
      immediate: true,
      handler(val, old) {
        if (val == 6) {
          this.getDictionary();
        }
      },
    },
  },
  created() {},
  methods: {
    handleAdd() {
      // this.$refs.cruds.rowAdd();
      this.dialogVisible = true;
    },
    getPersonList(page, params) {
      this.listLoading = true; //数据请求完后改为false
      this.personForm.disasterId = JSON.parse(
        window.sessionStorage.getItem("disasterData")
      ).id;
      warnPersonnel(this.personForm).then((res) => {
        this.personList = res.data.data;
        if (this.personList) {
          this.personList.forEach((item) => {
            item.typeName = item.type
              ? this.personsType.filter((type) => {
                  return type.value * 1 == item.type;
                })[0].label
              : "";
          });
        }
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
      this.personForm.warnType =
        this.warnLevel.filter((type) => {
          return type.remarks == tab.label;
        })[0].value * 1;
      this.activeName = tab.label;
      this.getPersonList();
    },
    getDictionary() {
      dictionary("warn_level").then((res) => {
        this.warnLevel = res.data.data.filter((item) => {
          return item.value * 1 < 5;
        });
        this.activeName = this.warnLevel[0].remarks;
        this.personForm.warnType =
          this.warnLevel.filter((type) => {
            return type.remarks == this.activeName;
          })[0].value * 1;
      });
      dictionary("qcqf_person_type").then((res) => {
        this.personsType = res.data.data;
      });
      this.getPersonList();
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
  },
};
</script>

<style lang="scss" scoped>
</style>