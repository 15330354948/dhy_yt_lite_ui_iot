<template>
  <div>
    <basic-container>
      <avue-crud ref="crud" :page.sync="page" :data="tableData" :option="tableOption" v-model="tableObj"
        @size-change="sizeChange" @current-change="currentChange" @selection-change="selectionChange"
        @search-change="searchChange" @search-reset="searchReset">
        <!-- <template slot="updatafileForm" slot-scope>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              v-show="addFile"
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload"
              >上传到服务器</el-button
            >
            <div slot="tip" class="el-upload__tip">
              支持格式：单个文件不能超过20MB
            </div>
          </el-upload>
        </template> -->
        <template slot="isOverdue" slot-scope="{row}">
          <span v-if="row.isOverdue == 0">
            正常
          </span>
          <span v-else style="color: red">
            已逾期({{row.overdueDay}}天)
          </span>
        </template>
        <template slot="faultState" slot-scope="{row}">
          {{row.faultState==0 ? '未接单' : row.faultState==1 ? '已接单' 
          : row.faultState==2 ? '进行中' : row.faultState==3 ? '审核中' 
          :row.faultState==4 ? '核查不通过': row.faultState==5 ? '已完成' : ""}}
        </template>
        <template slot="chargePersonIdForm" slot-scope>
          <treeselect v-model="tableObj.chargePersonId" :disable-branch-nodes="true" :options="menuOptions"
            :normalizer="normalizer" @select="treeChange" placeholder="选择负责人员" />
        </template>
        <template slot="joinPersonIdForm" slot-scope>
          <treeselect v-model="tableObj.joinPersonId" :multiple="true" :disable-branch-nodes="true"
            :options="menuOptions" :normalizer="normalizer" @select="treeChange2" placeholder="选择参与人员" />
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-view" class="none-border"
            @click.stop="handleView(scope.row, scope.index)">查看</el-button>

        </template>
      </avue-crud>
    </basic-container>
    <el-dialog :visible.sync="isDetail" v-if="isDetail" width="1000px" @close="detailClick" title="任务详情"
      class="avue-dialog" append-to-body>
      <ReleView :tabOption="infoObj" :obj="obj" style="padding: 10px 10%"></ReleView>
    </el-dialog>
  </div>
</template>
<script>
  import {
    getPage,
    addOrder,
    getPerson,
    disasterNameDataType,
    getDeviceInfo,
    getInfo,
    delOrder,
    editOrder,
    infoOrder,
    getFiles
  } from "@/api/workOrder/release.js";
  import {
    tableOption
  } from "@/const/crud/oam/workOrder/joined";
  import ReleView from "./tools/releView";
  import {
    baseUrl
  } from "@/config/env";
  import store from "@/store";
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import {
    mapGetters
  } from "vuex";
  export default {
    name: "joined",
    components: {
      ReleView,
      Treeselect
    },
    computed: {
      ...mapGetters(["permissions", "access_token", "projectId"]),
      headers: function () {
        return {
          Authorization: "Bearer " + store.getters.access_token,
        };
      },
    },
    data() {
      return {
        selectedArr: [],
        obj: {
          jiedan: false,
          chuzhi: false,
          shenhe: false
        },
        infoObj: {},
        isDetail: false,
        addFile: false,
        fileList: [],
        tableOption: tableOption,
        tableObj: {},
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条,
          pageSizes: [10, 20, 50, 100, 200],
        },
        // 菜单树选项
        menuOptions: [],
        chargePersonId: "",
        joinPersonId: [],
      };
    },
    watch: {
      projectId: {
        immediate: true,
        handler(val) {
          if (val !== 0 && val) {
            if (this.$refs.crud) {
              this.$refs.crud.toggleSelection();
              this.$refs.crud.selectClear();
              this.$refs.crud.searchReset();
              this.getList(this.page);
            }
          }
        }
      },
    },
    mounted() {
      this.getList(this.page);
      this.getTreeselect();
    },
    methods: {
      searchChange(form, done) {
        this.page.currentPage = 1;
        if (form.expectCompleteTime) {
          this.$set(form, 'expectCompleteBeginTime', form.expectCompleteTime[0]);
          this.$set(form, 'expectCompleteEndTime', form.expectCompleteTime[1]);
          delete form.expectCompleteTime;
        }
        if (form.createTime) {
          this.$set(form, 'createBeginTime', form.createTime[0]);
          this.$set(form, 'createEndTime', form.createTime[1]);
          delete form.createTime;
        }
        this.getList(this.page, form);
        done();
      },

      selectionChange(list) {
        //选中的数据
        this.selectedArr = list;
      },
      detailClick() {
        this.isDetail = false;
      },
      handleView(row, index) {
        infoOrder(row.id).then(res => {
          row = res.data.data;
          if (res.data.data.files.length > 0) {
            getFiles({
              fileIdList: res.data.data.files.join(',')
            }).then(res => {
              res.data.data.forEach(item => {
                item.name = item.originalName;
                item.url = item.netUrl;
              })
              row.fileInfoList = res.data.data;
              this.infoObj = row;
            })
          } else {
            this.infoObj = row;
          }
          if (row.faultState == 0) {
            this.obj.jiedan = true;
            this.obj.chuzhi = false;
          } else if (row.faultState == 1 || row.faultState == 2 || row.faultState == 4) {
            this.obj.jiedan = false;
            this.obj.chuzhi = true;
          } else if (row.faultState == 3) {
            this.obj.jiedan = false;
            this.obj.chuzhi = false;
          } else if (row.faultState == 4) {
            this.obj.jiedan = false;
          }
          this.isDetail = true
          // this.obj.shenhe = true;

        })
      },
      /** 查询菜单下拉树结构 */
      getTreeselect() {
        getPerson({
          projectId: this.projectId,
          // isBind: true
        }).then(response => {
          this.menuOptions = response.data.data;
        });
      },
      /** 转换菜单数据结构 */
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.id,
          label: node.name,
          children: node.children ? node.children : delete node.children
        };
      },
      treeChange(node, ins) {
        this.chargePersonId = node.realId;
      },
      treeChange2(node, ins) {
        this.joinPersonId.push(node.realId);
      },
      searchReset(form, page) {
        this.page.currentPage = 1;
        this.page.pageSize = 20;
        this.getList(this.page);
      },

      findItemById(id, list, num) {
        if (num == 1) {
          id = id.split(',')
          let arr = [];
          for (let i = 0; i < id.length; i++) {
            let res = list[0].children[0].children.find(item => item.realId == id[i])
            arr.push(res)
          }
          return arr;
        } else {
          let res = list[0].children[0].children.find(item => item.realId == id)
          if (res) {
            return res
          } else {
            for (let i = 0; i < list.length; i++) {
              if (list[i].children instanceof Array && list[i].children.length > 0) {
                res = findItemById(id, list[i].children)
                if (res) {
                  return res
                }
              }
            }
            return null
          }
        }
      },
      getList(page, params) {
        this.tableLoading = true;
        getPage(
          Object.assign({
              current: this.page.currentPage,
              size: this.page.pageSize,
              projectId: this.projectId,
              personType: 1
            },
            params
          )
        ).then((response) => {
          response.data.data.records.forEach(item => {
            item.faultState += "";
            item.isOverdue += "";
            // this.findItemById(item.chargePersonId, this.menuOptions, 0)
            // item.chargePersonId = this.findItemById(item.chargePersonId, this.menuOptions, 0).name;
          })
          this.tableData = response.data.data.records;
          this.page.total = response.data.data.total;
          this.tableLoading = false;
        });
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
        this.getList(this.page);
      },
      currentChange(current) {
        this.page.currentPage = current;
        this.getList(this.page);
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    },
  };

</script>
