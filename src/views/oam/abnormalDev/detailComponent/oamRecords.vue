<template>
  <div class="container">
    <avue-crud
      :data="tableData"
       
      :table-loading="tableLoading"
      :option="option"
      :page.sync="page"
      @search-change="searchChange"
      @search-reset="searchReset"
      @refresh-change="refreshChange"
      @size-change="sizeChange"
      @current-change="currentChange"
      ref="crud"
    >
    
      <template slot-scope="{ row, index }" slot="menu">
        <el-button type="text" v-if="permissions.abnormalDevOuter_detail_oamDetail"  @click.stop="handleView(row,index)">详情</el-button>
      </template>
    </avue-crud>
    <el-dialog :visible.sync="isDetail" v-if="isDetail" width="1000px" @close="detailClick" title="任务详情"
      class="avue-dialog" append-to-body>
      <ReleView :tabOption="infoObj" :obj="obj" style="padding: 10px 10%"></ReleView>
    </el-dialog>
  </div>
</template>

<script>
// 详情弹框内容，对接口时调用全部工单里面的详情弹框
import { mapGetters } from "vuex";
  import {
    getPage,
    getPerson,
    disasterNameDataType,
    getDeviceInfo,
    getInfo,
    infoOrder,
    getFiles
  } from "@/api/workOrder/release.js";
import { oamTableOption } from "@/const/crud/oam/abnormalDev";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { deepClone } from '@/util/util';
import ReleView from "@/views/oam/workOrder/tools/releView";
export default {
  name: "",
  props: ["row"],
  components: {
    Treeselect,
    ReleView
  },
  data() {
    return {
       currentId:null,
      option: oamTableOption,
      tableLoading: false,
      
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      menuOptions: [],
      chargePersonId: null,
      infoObj: {},
      obj: {
          jiedan: false,
          chuzhi: false,
          shenhe: false
        },
        isDetail: false,
    };
  },
  computed: {
    ...mapGetters(["permissions", "projectId"]), //获取权限
  },
  created() {
    this.getTreeselect()
  },
  mounted() {
    this.currentId=this.row.id
  },
  watch: {
    "row.id": {
      handler(n, o) {
        this.currentId = n;
        this.getList()
      },
    },
  },
  methods: {
    getList() {
      this.tableLoading = true;
      getPage(
        Object.assign(
          {
            current: this.page.currentPage,
            size: this.page.pageSize,
            source: 1,
            deviceId: this.row.deviceId,
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
      let objectTpl=deepClone(form)
        if (form.expectCompleteTime&&form.expectCompleteTime.length==2) {
          objectTpl.expectCompleteBeginTime=form.expectCompleteTime[0]
          objectTpl.expectCompleteEndTime=form.expectCompleteTime[1]
       
        }
        
        if (form.createTime&&form.createTime.length==2) {
          objectTpl.createBeginTime=form.createTime[0]
          objectTpl.createEndTime=form.createTime[1]
     
        }
        delete objectTpl.createTime;
        delete objectTpl.expectCompleteTime;
      this.searchParams = objectTpl;

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
      getTreeselect() {
        getPerson({
          projectId: this.projectId,
          // isBind: true
        }).then(response => {
          this.menuOptions = response.data.data;
        });
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
        })
        this.isDetail = true;
      },
       detailClick() {
        this.isDetail = false;
      },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 390px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
