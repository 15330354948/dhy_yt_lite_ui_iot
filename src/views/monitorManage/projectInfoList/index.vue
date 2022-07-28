<template>
  <div class="projectInfoList">
    <basic-container>
      <!-- 搜索表单 -->
      <avue-form ref="searchForm" v-model="searchForm" :option="searchOption" @submit="searchChange"
        @reset-change="searchReset">
        <template slot="cascader" slot-scope>
          <el-cascader :props="props" v-model="searchForm.cascader" size="mini" ref="cascaderDev" clearable
            placeholder="请选择行政区划" @visible-change="visibleChange"></el-cascader>
        </template>
      </avue-form>

      <!-- 表格 -->
      <avue-crud ref="crud" :page.sync="page" :data="tableData" :table-loading="tableLoading" :option="tableOption"
        v-model="tableObj" :before-open="beforeClose" @size-change="sizeChange" @current-change="currentChange"
        @row-save="handleSave" @refresh-change="refreshChange" @selection-change="selectionChange">
        <template slot="cascaderForm">
          <el-cascader :props="props" v-model="tableObj.cascader" size="mini" @change="locationsChange"
            ref="cascaderDev" clearable placeholder="请选择行政区划" @visible-change="visibleChange"></el-cascader>
        </template>
        <template slot="longitudeForm">
          <el-input v-model="tableObj.longitude" placeholder="请输入经度" clearable size="small">
            <el-button style="padding-right: 10px" slot="suffix" type="text" @click="getLocation">定位
            </el-button>
          </el-input>
        </template>
        <template slot="xzqh" slot-scope="scope">
          {{ scope.row.provinceName }}{{ scope.row.cityName
          }}{{ scope.row.countyName }}{{ scope.row.streetName
          }}{{ scope.row.communityName }}
        </template>
        <template slot="menuLeft">
          <el-button type="primary" @click="rowAdd" icon="el-icon-plus" v-if="permissions['sub_project_point_add']">新增
          </el-button>
          <el-button type="danger" @click="handleDelete" icon="el-icon-delete"
            v-if="permissions['sub_project_point_batch_del']">批量删除</el-button>
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button @click.stop="handleDetail(scope.row)" icon="el-icon-view" size="small" type="text"
            v-if="permissions['sub_project_point_detail']">详情</el-button>
          <el-button type="text" @click.stop="rowDelete(scope.row)" icon="el-icon-delete" size="small"
            v-if="permissions['sub_project_point_del']">删除</el-button>
        </template>
      </avue-crud>
      <el-dialog title="定位" :visible.sync="lonLatOpen" v-if="lonLatOpen" width="1000px" append-to-body>
        <lon-lat :LatAndLon="LatAndLon"></lon-lat>
      </el-dialog>
      <el-dialog class="hide_dialog" v-if="dialogFormVisible" :visible.sync="dialogFormVisible" @closed="handleClose"
        append-to-body width="85%" :fullscreen="dialogfull" :close-on-click-modal="false">
        <div slot="title" class="dialog-title">
          <span class="title-text">项目详情({{projectName}})</span>
          <i class="el-icon-full-screen" @click="isfullscreen"></i>
        </div>
        <project-info :infoData="infoData" :fullScreen="dialogfull"></project-info>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
  import {
    searchOption,
    tableOption
  } from "@/const/crud/monitorManage/projectInfoList";
  import {
    getArea,
  } from "@/api/hideDanger/obj";
  import {
    fetchList,
    addObj,
    delObj,
    getProjectInfo
  } from "@/api/monitorManage/projectInfo"
  import LonLat from "@/components/Location";
  import projectInfo from "./projectInfo";
  import {
    mapGetters
  } from "vuex";
  export default {
    components: {
      LonLat,
      projectInfo
    },
    data() {
      return {
        props: {
          lazy: true,
          checkStrictly: true,
          expandTrigger: 'hover',
          async lazyLoad(node, resolve) {
            const {
              level
            } = node;
            if (level == 0) {
              const {
                data
              } = await getArea(0); //获取省接口
              var nodes = data.data.map(item => {
                return {
                  value: item.code,
                  label: item.name,
                  longitude: item.longitude,
                  latitude: item.latitude,
                  leaf: false
                };
              });
              resolve(nodes);
            } else if (level == 1) {
              const {
                data
              } = await getArea(node.data.value); //获取市接口
              var nodes = data.data.map(item => {
                return {
                  value: item.code,
                  label: item.name,
                  longitude: item.longitude,
                  latitude: item.latitude,
                  leaf: false
                };
              });
              resolve(nodes);
            } else if (level == 2) {
              const {
                data
              } = await getArea(node.data.value); //获取区/县接口
              var nodes = data.data.map(item => {
                return {
                  value: item.code,
                  label: item.name,
                  leaf: false
                };
              });
              resolve(nodes);
            } else if (level == 3) {
              const {
                data
              } = await getArea(node.data.value); //获取区/县接口
              var nodes = data.data.map(item => {
                return {
                  value: item.code,
                  label: item.name,
                  leaf: false
                };
              });
              resolve(nodes);
            } else if (level == 4) {
              const {
                data
              } = await getArea(node.data.value); //获取区/县接口
              var nodes = data.data.map(item => {
                return {
                  value: item.code,
                  label: item.name,
                  leaf: true
                };
              });
              resolve(nodes);
            } else if (level == 5) {
              document.querySelectorAll('.el-icon-loading').forEach(e => {
                e.style.display = 'none'
              })
            }
          }
        },
        searchForm: {},
        searchOption: searchOption,
        projectDicData: [], // 项目字典
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          // projectId: "",
          pageSize: 10, // 每页显示多少条,
          pageSizes: [10, 20, 50, 100, 200],
        },
        tableData: [], //表格数据
        tableLoading: false,
        tableOption: tableOption,
        tableObj: {},
        selectionData: [],
        lonLatOpen: false, //定位弹框
        LatAndLon: {
          longitude: "",
          latitude: "",
        },
        dialogfull: false, //是否全屏
        dialogFormVisible: false, //详情弹窗
        projectName: "",
        infoData: null
      }
    },
    created() {
      this.$bus.$off("getPoints");
      this.$bus.$on("getPoints", (points) => {
        if (points) {
          let longitude = Number(points.longitude);
          let latitude = Number(points.latitude);
          this.$nextTick(() => {
            this.tableObj.longitude = longitude.toFixed(6);
            this.tableObj.latitude = latitude.toFixed(6);
            this.tableObj.address = points.province + points.city + points.district + points.street + points
              .streetNumber;
          });
          this.lonLatOpen = false;
        }
      });
    },
    watch: {
      projectId: {
        immediate: true,
        handler(val) {
          if (val !== 0 && val) {
            if (this.$refs.searchForm) {
              this.$refs.searchForm.resetForm();
              this.$refs.crud.toggleSelection();
              this.getList(this.page);
            }

          }
        }
      },
      dialogFormVisible: {
        immediate: true,
        handler(val) {
          if (!val) {
            this.getList(this.page);
          }
        }
      }
    },
    computed: {
      ...mapGetters(["permissions", "projectId"]),
    },
    mounted() {
      this.getList(this.page);
    },
    methods: {
      // 搜索
      searchChange(form, done) {
        if (form.cascader) {
          form.cascader[4] ? form.communityCode = form.cascader[4] : form.communityCode = "";
          form.cascader[3] ? form.streetCode = form.cascader[3] : form.streetCode = "";
          form.cascader[2] ? form.countyCode = form.cascader[2] : form.countyCode = "";
          form.cascader[1] ? form.cityCode = form.cascader[1] : form.cityCode = "";
          form.cascader[0] ? form.provinceCode = form.cascader[0] : form.provinceCode = "";
          delete form.cascader
        }
        this.getList(this.page, form);
        done();
      },

      visibleChange() {
        document.querySelectorAll('.el-icon-loading').forEach(e => {
          e.style.display = 'none'
        })
      },
      // 行政区划change
      locationsChange(e) {
        setTimeout(() => {
          let label = this.$refs.cascaderDev.inputValue;
          let city = (label.split('/')[0] + label.split('/')[1]).replace(/\s*/g, "")
          let postStr = {
            searchWord: city,
            searchType: 1
          }
          let query = {
            postStr: JSON.stringify(postStr),
            tk: '8a743b3f6afa6a0d96747f0bf9a152ff'
          }
          var _this = this;
          _this.ajax({
            method: 'get',
            url: 'http://api.tianditu.gov.cn/administrative',
            data: query,
            success: function (res) {
              if (res.msg == 'ok') {
                _this.tableObj.longitude = res.data[0].lnt
                _this.tableObj.latitude = res.data[0].lat
              } else {
                _this.tableObj.longitude = '116.3'
                _this.tableObj.latitude = '39.9'
              }
            },
            async: true,
            //异常处理
            error: function (e) {
              console.log(e);
            }
          })
        }, 0);
      },
      createXHR() {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        return xhr;
      },
      ajax(obj) {
        var xhr = this.createXHR();
        obj.data = params(obj.data);
        if (obj.method === "get") {
          obj.url += obj.url.indexOf("?") == -1 ? "?" + obj.data : "&" + obj.data;
        }
        if (obj.async === false) {
          callback();
        }
        if (obj.async === true) {
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              callback();
            }
          }
        }
        xhr.open(obj.method, obj.url, obj.async);
        if (obj.method === "post") {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send(obj.data);
        } else {
          xhr.send(null);
        }

        function callback() {
          if (xhr.status == 200) {
            obj.success(JSON.parse(xhr.responseText));
          } else {
            obj.error("请求错误");
          }
        }
        //键值对转换字符串
        function params(data) {
          var arr = [];
          for (var i in data) {
            arr.push(i + "=" + data[i]);
          }
          return arr.join("&");
        }
      },

      // 清空
      searchReset(form, page) {
        this.searchForm = {}
        this.page.currentPage = 1;
        this.page.pageSize = 20;
        this.getList(this.page, this.searchForm);
      },
      // 新增
      rowAdd() {
        this.$refs.crud.rowAdd();
      },
      // 批量删除
      handleDelete() {
        let idList = this.getSelectionDataId();
        if (idList.length == 0) {
          this.$message.warning("请选择需要删除的数据");
          return idList;
        }
        this.$confirm("是否确认删除当前选中的数据？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(function () {
            return delObj({
              ids: idList.join()
            });
          })
          .then((data) => {
            this.$message.success("删除成功");
            this.refreshChange();
            this.$refs.crud.selectClear();
          });
      },
      // 关闭弹窗
      beforeClose(done, type) {
        if (type && type == "add") {
          setTimeout(() => {
            let self = this; //防止取不到this
            for (let key in self.tableObj) {
              self.tableObj[key] = undefined;
            }
            done();
          }, 500);
        } else if (type == "edit") {
          done();
        }
      },
      // 定位
      async getLocation() {
        if (this.tableObj.longitude && this.tableObj.latitude) {
          this.LatAndLon.longitude = this.tableObj.longitude
          this.LatAndLon.latitude = this.tableObj.latitude
        }
        this.lonLatOpen = true;
      },
      // 分页查询
      getList(page, params) {
        this.tableLoading = true;
        fetchList(Object.assign({
            projectId: this.projectId,
            current: page.currentPage,
            size: page.pageSize,
            ...this.tableObj,
          }, params,
          this.searchForm)).then(res => {
          this.tableData = res.data.data.records;
          this.page.total = res.data.data.total;
          this.tableLoading = false;
          this.tableData.forEach(item => {
            item.type /= 1
          });
        })
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
        this.getList(this.page, this.tableObj);
      },
      currentChange(current) {
        this.page.currentPage = current;
        this.getList(this.page, this.tableObj);
      },

      // 全屏
      isfullscreen() {
        this.dialogfull = !this.dialogfull;
      },

      // 新增保存
      async handleSave(row, done, loading) {
        var r = this.tableObj.cascader.filter(function (s) {
          return s && s.trim();
        });
        this.tableObj.cascader = r
        if (this.$refs.cascaderDev.inputValue) {
          let cascader = this.$refs.cascaderDev.inputValue.split('/');
          this.tableObj.cascader[4] ? this.tableObj.communityCode = this.tableObj.cascader[4] : this.tableObj
            .communityCode = "";
          this.tableObj.cascader[3] ? this.tableObj.streetCode = this.tableObj.cascader[3] : this.tableObj
            .streetCode = "";
          this.tableObj.cascader[2] ? this.tableObj.county = this.tableObj.cascader[2] : this.tableObj
            .county = "";
          this.tableObj.cascader[1] ? this.tableObj.city = this.tableObj.cascader[1] : this.tableObj.city =
            "";
          this.tableObj.cascader[0] ? this.tableObj.province = this.tableObj.cascader[0] : this.tableObj
            .province = "";
          cascader[4] ? this.tableObj.communityName = cascader[4] : this.tableObj.communityName = "";
          cascader[3] ? this.tableObj.streetName = cascader[3] : this.tableObj.streetName = "";
          cascader[2] ? this.tableObj.countyName = cascader[2] : this.tableObj.countyName = "";
          cascader[1] ? this.tableObj.cityName = cascader[1] : this.tableObj.cityName = "";
          cascader[0] ? this.tableObj.provinceName = cascader[0] : this.tableObj.provinceName = "";
        }
        this.$set(row, 'beginTime', row.cycle[0]);
        this.$set(row, 'endTime', row.cycle[1]);
        delete row.cycle;
        delete this.tableObj.cycle;
        delete row.createTime;
        delete this.tableObj.createTime;
        addObj(Object.assign(row, this.tableObj, {
          projectId: this.projectId
        })).then(res => {
          this.$message.success("新增成功");
          this.tableObj = {};
          this.getList(this.page);
          done();
        }).catch(() => {
          loading();
        });

      },
      refreshChange() {
        this.getList(this.page, this.tableObj);
      },
      selectionChange(selection) {
        this.selectionData = selection;
      },
      getSelectionDataId() {
        let idList = new Array();
        if (this.selectionData.length > 0) {
          this.selectionData.forEach((d) => idList.push(d.id));
        }
        return idList;
      },
      // 详情
      async handleDetail(row) {
        const request = await getProjectInfo(row.id);
        let objTpl = request.data.data
        objTpl.cascader = [
          objTpl.province,
          objTpl.city,
          objTpl.county,
          objTpl.streetCode,
          objTpl.communityCode,
        ]
        objTpl.type /= 1;
        objTpl.cascader = objTpl.cascader.filter(function (s) {
          return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
        });
        if (objTpl.beginTime && objTpl.endTime) {
          objTpl.cycle = [objTpl.beginTime, objTpl.endTime]
        }
        this.form = objTpl;
        this.infoData = objTpl;
        this.projectName = row.name ? row.name : "监测点详情";
        this.dialogFormVisible = true;
      },
      handleClose() {
        this.dialogFormVisible = false;
      },
      // 删除
      rowDelete(row) {
        this.$confirm("是否确认删除当前选中的数据？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(function () {
            return delObj({
              ids: row.id
            });
          })
          .then((data) => {
            this.$message.success("删除成功");
            this.refreshChange();
            this.$refs.crud.selectClear();
          });
      },
    }
  }

</script>

<style lang="scss" scoped>

</style>
