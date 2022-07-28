<template>
  <div>
    <basic-container>
      <avue-crud ref="crud" :page.sync="page" :data="tableData" :option="tableOption" v-model="tableObj"
        @selection-change="selectionChange" @search-change="searchChange" @search-reset="searchReset"
        @size-change="sizeChange" @current-change="currentChange" @row-update="handleUpdate" @row-save="handleSave"
        @refresh-change="refreshChange">
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
        <template slot="monitorIdForm" slot-scope>
          <el-select v-model="tableObj.monitorId" filterable placeholder="请选择监测点名称">
            <el-option v-for="(item,index) in monitorData" :key="index" :label="item.name" :value="item.id ">
            </el-option>
          </el-select>
        </template>
        <template slot="deviceIdForm" slot-scope>
          <el-select v-model="tableObj.deviceId" filterable placeholder="请选择设备编号">
            <el-option v-for="(item,index) in deviceData" :key="index" :label="item.code" :value="item.id ">
            </el-option>
          </el-select>
        </template>
        <template slot="chargePersonIdForm" slot-scope>
          <treeselect v-model="tableObj.chargePersonId" :value="null" :disable-branch-nodes="true"
            :options="menuOptions" :normalizer="normalizer" @select="treeChange" placeholder="选择负责人员" />
        </template>
        <template slot="joinPersonIdForm" slot-scope>
          <treeselect v-model="tableObj.joinPersonId" :multiple="true" :disable-branch-nodes="true"
            :options="menuOptions" :normalizer="normalizer" @select="treeChange2" @deselect="deselect"
            placeholder="选择参与人员" />
        </template>
        <template slot="filesForm" slot-scope>
          <el-upload class="upload-demo" ref="upload" v-model="tableObj.files" :headers="headers" :action="baseUrlLoad"
            :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"
            :on-success="handleAvatarSuccess">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">
              支持格式：单个文件不能超过20MB
            </div>
          </el-upload>
        </template>
        <template slot="menuLeft">
          <el-button type="primary" @click="rowAdd" icon="el-icon-plus" v-if="permissions['release_point_add']">新增
          </el-button>
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-view" class="none-border"
            @click.stop="handleEdit(scope.row, scope.index)"
            v-if="permissions['release_point_edit'] && scope.row.faultState == 0">编辑</el-button>
          <el-button type="text" size="small" icon="el-icon-view" class="none-border"
            @click.stop="handleView(scope.row, scope.index)">查看</el-button>
          <el-button type="text" @click.stop="rowDel(scope.row)" icon="el-icon-delete" size="small"
            v-if="permissions['release_point_del'] && scope.row.faultState == 0">删除</el-button>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog :visible.sync="isDetail" width="1000px" @close="detailClick" title="任务详情" class="avue-dialog"
      append-to-body>
      <ReleView :tabOption="infoObj" :obj="obj" style="padding:10px 10%"></ReleView>
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
  } from "@/const/crud/oam/workOrder/release";
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
    name: "release",
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
          shenhe: false,
        },
        infoObj: {},
        isDetail: false,
        addFile: false,
        baseUrlLoad: baseUrl + "/file/upload",
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
        monitorData: [],
        deviceData: [],
        // 菜单树选项
        menuOptions: [],
        chargePersonId: "",
        joinPersonId: [],
      };
    },
    mounted() {
      this.getList(this.page);
      this.getMonitor();
      this.getTreeselect();
      this.getDevice();
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
              this.getMonitor();
              this.getDevice();
              this.getTreeselect();
            }
          }
        }
      },
      "tableObj.joinPersonId": {
        handler(val) {
          if (val) {
            if (val.length < 1) {
              this.joinPersonId = []
            }
          }

        },
        immediate: true
      },
      "tableObj.monitorId": {
        handler(val) {
          if (val && val != null) {
            this.monitorData.forEach(item => {
              if (item.id == val) {
                this.tableObj.monitorName = item.name
              }
            })
            this.getDevice();
          }
        },
        immediate: true
      },
      "tableObj.deviceId": {
        handler(val) {
          if (val) {
            this.deviceData.forEach(item => {
              if (item.id == val) {
                this.tableObj.deviceType = item.type
              }
            })
          }
        },
        immediate: true
      }
    },
    methods: {
      rowDel(form, index, done) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delOrder(form.id).then(res => {
            // done(form)
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        }).catch(() => {});
      },
      // 获取监测点
      getMonitor() {
        disasterNameDataType({
          projectId: this.projectId,
        }).then(res => {
          this.monitorData = res.data.data;
        })
      },
      // 获取设备信息
      getDevice() {
        getDeviceInfo({
          projectId: this.projectId,
          monitorId: this.tableObj.monitorId,
        }).then(res => {
          this.deviceData = res.data.data
        })
      },
      /** 查询菜单下拉树结构 */
      getTreeselect() {
        getPerson({
          projectId: this.projectId,
          isBind: true
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
        if (this.joinPersonId instanceof Array == false) {
          this.joinPersonId = this.joinPersonId.split(",");
          this.joinPersonId.push(node.realId);
        } else {
          this.joinPersonId.push(node.realId);
        }
      },
      deselect(node) {
        if (this.joinPersonId instanceof Array == false) {
          this.joinPersonId = this.joinPersonId.split(",");
          this.joinPersonId.map((val, i) => {
            if (val == node.realId) {
              this.joinPersonId.splice(i, 1)
            }
          })
        } else {
          this.joinPersonId.map((val, i) => {
            if (val == node.realId) {
              this.joinPersonId.splice(i, 1)
            }
          })

        }
      },
      findItemById(id, list, num) {
        if (num == 1) {
          id = id.split(',')
          let arr = [];
          for (let i = 0; i < id.length; i++) {
            if (list.length > 0) {
              list.forEach(item => {
                item.children.forEach(items => {
                  items.children.forEach(itemss => {
                    if (itemss.realId == id[i]) {
                      arr.push(itemss)
                    }
                  })
                })
              })
            }
          }
          return arr;
        } else {
          let res = null;
          if (list.length > 0) {
            list.forEach(item => {
              item.children.forEach(items => {
                items.children.forEach(itemss => {
                  if (itemss.realId == id) {
                    res = itemss;
                  }
                })
              })
            })
          }
          if (res) {
            return res
          } else {
            return null
          }
        }
      },
      // 新增
      rowAdd() {
        this.$nextTick(() => {
          this.tableObj.chargePersonId = null
        })
        this.$refs.crud.rowAdd();
      },
      handleEdit(row, index) {
        var obj;
        getInfo(row.id).then(res => {
          obj = res.data.data;
          // row = res.data.data;
          this.chargePersonId = obj.chargePersonId;
          this.joinPersonId = obj.joinPersonId;
          let chargePersonId = this.findItemById(obj.chargePersonId, this.menuOptions, 0);
          let joinPersonId = this.findItemById(obj.joinPersonId, this.menuOptions, 1);
          obj.chargePersonId = chargePersonId ? chargePersonId.id : row.chargePersonName;
          obj.joinPersonId = joinPersonId.map(item => {
            return item.id
          })
          obj.monitorId = obj.monitorId += "";
          obj.deviceId = obj.deviceId += "";
          if (res.data.data.fileList.length > 0) {
            getFiles({
              fileIdList: res.data.data.fileList.join(',')
            }).then(v => {
              v.data.data.forEach(item => {
                item.name = item.originalName;
                item.url = item.netUrl;
              })
              obj.fileInfoList = v.data.data;
              this.fileList = v.data.data7
            })
          }
          this.$refs.crud.rowEdit(obj, index);
        })

      },
      detailClick() {
        this.isDetail = false
      },
      handleView(row, index) {
        // this.obj.jiedan = true;
        infoOrder(row.id).then(res => {
          row = res.data.data;
          if (res.data.data.files.length > 0) {
            getFiles({
              fileIdList: res.data.data.files.join(',')
            }).then(v => {
              v.data.data.forEach(item => {
                item.name = item.originalName;
                item.url = item.netUrl;
              })
              row.fileInfoList = v.data.data;
              this.infoObj = row;
            })
          } else {
            this.infoObj = row;
          }
          this.isDetail = true;
        })
      },
      handleSave(row, done) {
        row.chargePersonId = this.chargePersonId;
        row.joinPersonId = this.joinPersonId.join(',');
        row.files = row.files.join(',');
        addOrder(Object.assign(row, {
          source: 0,
          projectId: this.projectId
        })).then(res => {
          this.$message.success("新增成功");
          this.getList();
        })
        done();
      },
      handleUpdate(row, index, done, loading) {
        if (this.joinPersonId instanceof Array) {
          row.joinPersonId = this.joinPersonId.join(',');
        } else {
          row.joinPersonId = this.joinPersonId;
        }
        row.chargePersonId = this.chargePersonId;
        editOrder(Object.assign(row, {
          projectId: this.projectId
        })).then(res => {
          this.$message.success("修改成功");
          this.getList();
        })
        done();
      },
      refreshChange() {},
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
      searchReset(form, page) {
        this.page.currentPage = 1;
        this.page.pageSize = 20;
        this.getList(this.page);
      },
      getList(page, params) {
        this.tableLoading = true;
        getPage(
          Object.assign({
              current: this.page.currentPage,
              size: this.page.pageSize,
              projectId: this.projectId,
              personType: 0,
              source: 0
            },
            params
          )
        ).then((response) => {
          response.data.data.records.forEach(item => {
            item.faultState += "";
            item.isOverdue += "";
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
        this.tableObj.files.map((item, i) => {
          if (item == file.response.data.infos[0].id) {
            this.tableObj.files.splice(i, 1)
          }
        })
      },
      handleAvatarSuccess(res, file) {
        this.tableObj.files.push(res.data.infos[0].id);
      },
      handlePreview(file) {
        // console.log(file);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    },
  };

</script>

<style lang="scss" scoped>

</style>
