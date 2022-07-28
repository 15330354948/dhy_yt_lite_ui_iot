<template>
  <!-- 主页面 -->
  <div class="hide_mod">
    <basic-container>
      <avue-crud :option="option" ref="crud" v-model="form" :page.sync="page"
        @size-change="sizeChange" @current-change="currentChange" :table-loading="listLoading"
        @search-change="handleFilter" @refresh-change="handleRefreshChange" @row-save="create" @row-style="rowStyle"
        :before-open="handleOpenBefore" @selection-change="selectionChange" @search-reset="searchReset"
        :row-key="getRowKeys" :data="list">
        <template slot="menuLeft">
          <el-button v-if="permissions.disaster_monitoring_point_add" class="filter-item" @click="handleCreate" type="primary"
            icon="el-icon-document-add">新增
          </el-button>
        </template>
        <template slot="cascaderForm">
          <el-cascader :props="props" v-model="form.cascader" size="mini" @change="locationsChange" ref="cascaderDev"
            clearable placeholder="请选择行政区划" @visible-change="visibleChange"></el-cascader>
        </template>
        <template slot="longitudeForm">
          <el-input v-model="form.longitude" placeholder="请输入经度" clearable size="small">
            <el-button style="padding-right: 10px" slot="suffix" type="text" @click="getLocation">定位
            </el-button>
          </el-input>
        </template>
        <template slot-scope="" slot="typeSearch">
          <avue-select v-model="typeSearch" :props="proptype" :dic='typeData' placeholder="请选择监测点类型" clearable
            size="mini"></avue-select>
        </template>
        <template slot="warnHornBroadcast" slot-scope="scope">
          <el-switch v-model="scope.row.warnHornBroadcast" :active-value="1" :inactive-value="0"
          :disabled="!permissions.disaster_monitoring_point_warnHornBroadcast"
            @change="rowState(scope.row)"></el-switch>
        </template>
        <template slot="xzqh" slot-scope="scope">
          {{ scope.row.provinceName }}{{ scope.row.cityName
          }}{{ scope.row.countyName }}{{ scope.row.streetName
          }}{{ scope.row.communityName }}
        </template>
        <!-- <template slot="menuLeft">
          <el-button
            class="filter-item"
            @click="handleEdit"
            type="warning"
            icon="el-icon-document-add"
            >更新监测点
          </el-button>
        </template> -->
        <template slot="menuLeft">
          <el-button v-if="permissions.disaster_monitoring_point_del_multi" class="filter-item" @click="handleDel" type="danger"
            icon="el-icon-delete">批量删除
          </el-button>
        </template>
        <!-- <template slot="menuLeft">
          <el-button
            class="filter-item"
            @click="handleDaochu"
            type="primary"
            icon="el-icon-download"
            >导出
          </el-button>
        </template>
        <template slot="menuLeft">
          <el-button class="filter-item" type="primary" icon="el-icon-download"
            >导入
          </el-button>
        </template> -->
        <template slot="menuLeft">
          <!--
          <el-button
            v-if="permissions.disaster_update_altitude"
            class="filter-item"
            @click="setHeight"
            type="primary"
            icon="el-icon-download"
            >设置高度
          </el-button> -->
        </template>
        <template slot="lockFlag" slot-scope="scope">
          <el-tag>{{ scope.label }}</el-tag>
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button size="small" v-if="permissions.disaster_monitoring_point_detail" type="text" icon="el-icon-info" @click="handleInfo(scope.row, scope.index)">详情
          </el-button>
          <el-button size="small" v-if="permissions.disaster_monitoring_point_layer" type="text" icon="el-icon-files" @click="handleLayer(scope.row, scope.index)">图层
          </el-button>
          <el-button v-if="permissions.disaster_monitoring_point_del" @click="handleDel1(scope.row)" size="small" type="text" icon="el-icon-delete">删除
          </el-button>
          <!-- <el-button
            size="small"
            type="text"
            icon="icon-zhongzhimima"
            @click="mapLocation(scope.row, scope.index)"
            >定位
          </el-button> -->
        </template>
        <template slot="rockTypeForm">
          <el-select clearable v-model="form.rockType" placeholder="请选择岩石特征">
            <el-option v-for="item in rockType" :key="item.value * 1" :label="item.label" :value="item.value * 1">
            </el-option>
          </el-select>
        </template>
        <template slot="steadyForm">
          <el-select clearable v-model="form.steady" placeholder="请选择稳定性">
            <el-option v-for="item in steadyType" :key="item.value * 1" :label="item.label" :value="item.value * 1">
            </el-option>
          </el-select>
        </template>
        <template slot="extentHarmForm">
          <el-select clearable v-model="form.extentHarm" placeholder="请选择危害程度">
            <el-option v-for="item in extentharmType" :key="item.value * 1" :label="item.label" :value="item.value * 1">
            </el-option>
          </el-select>
        </template>
        <template slot="riskForm">
          <el-select clearable v-model="form.risk" placeholder="请选择危险性">
            <el-option v-for="item in riskType" :key="item.value * 1" :label="item.label" :value="item.value * 1">
            </el-option>
          </el-select>
        </template>
        <template slot="levelForm">
          <el-select clearable v-model="form.level" placeholder="请选择隐患等级">
            <el-option v-for="item in levelType" :key="item.value * 1" :label="item.label" :value="item.value * 1">
            </el-option>
          </el-select>
        </template>
        <template slot="addTypeForm">
          <el-select clearable v-model="form.addType" placeholder="请选择新增类型">
            <el-option v-for="item in addType" :key="item.value * 1" :label="item.label" :value="item.value * 1">
            </el-option>
          </el-select>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog class="hide_dialog" v-if="dialogFormVisible" :visible.sync="dialogFormVisible" @closed="handleClose"
      append-to-body width="85%" :fullscreen="dialogfull" :close-on-click-modal="false">
      <div slot="title" class="dialog-title">
        <span class="title-text">{{ disasterName }}</span>
        <i class="el-icon-full-screen" @click="isfullscreen"></i>
      </div>
      <el-tabs :tab-position="tabPosition" ref="tabsRef"  @tab-click="tabClick" v-model="activeName">
        <el-tab-pane name="field" label="监测点信息">
          <field :dialogFormVisible="dialogFormVisible" :disasterBase.sync="disasterBase" v-if="tabIndex == 0"
           ref="field" :openTab="tabIndex"></field>
        </el-tab-pane>
        <el-tab-pane name="prevent" label="防灾明白卡">
          <prevent ref="prevent" v-if="tabIndex == 1" :dialogFormVisible="dialogFormVisible" :openTab="tabIndex">
          </prevent>
        </el-tab-pane>
        <el-tab-pane name="aversion" label="避险明白卡">
          <aversion  ref="aversion"  :openTab="tabIndex" v-if="tabIndex == 2" :dialogFormVisibleparent="dialogFormVisible"></aversion>
        </el-tab-pane>
        <el-tab-pane name="reserveplan" label="预案">
          <reserve-plan ref="reserveplan" v-if="tabIndex == 3" :openTab="tabIndex"
            :dialogFormVisible="dialogFormVisible" :disasterBase.sync="disasterBase"></reserve-plan>
        </el-tab-pane>
        <el-tab-pane name="hidddata" label="监测点资料">
          <hidd-data  ref="hidddata"  v-if="tabIndex == 4" :hideId="hideId" :openTab="tabIndex" :dialogFormVisible="dialogFormVisible"
            :fullScreen="dialogfull"></hidd-data>
        </el-tab-pane>
        <!-- <el-tab-pane label="预警发布设置">
          <warning-issue
            :openTab="7"
            :dialogFormVisible="dialogFormVisible"
          ></warning-issue>
        </el-tab-pane>
        <el-tab-pane label="预警短信">
          <short-msg
            :openTab="8"
            :dialogFormVisible="dialogFormVisible"
          ></short-msg>
        </el-tab-pane> -->
        <!-- <el-tab-pane label="综合预警模型">
          <warning-model :openTab="10" :dialogFormVisible="dialogFormVisible"></warning-model>
        </el-tab-pane> -->
      </el-tabs>
    </el-dialog>
    <el-dialog title="定位" :visible.sync="lonLatOpen" v-if="lonLatOpen" width="1000px" append-to-body>
      <lon-lat :LatAndLon="LatAndLon"></lon-lat>
    </el-dialog>

    <el-dialog class="hide_dialog" :visible.sync="layerVisible" @closed="handleClose" append-to-body width="50%"
      :fullscreen="dialogfull" :close-on-click-modal="false">
      <div slot="title" class="dialog-title">
        <span class="title-text">图层数据</span>
        <i class="el-icon-full-screen" @click="isfullscreen"></i>
      </div>
      <layer-data ref="layerData" :layerVisible="layerVisible" :rowData.sync="rowData"></layer-data>
    </el-dialog>
  </div>
</template>

<script>
  import {
    tableOption
  } from "@/const/crud/hideDanger/dangerForm";
  import {
    mapGetters
  } from "vuex";
  import aversion from "./aversion/index";
  import shortMsg from "./shortMsg/index";
  import hiddData from "./hiddData/index";
  import layerData from "./layerData/index";
  import field from "./field/index";
  import prevent from "./prevent/index";
  import reservePlan from "./reservePlan/index";
  import WarningIssue from "./warningIssue/index";
  import WarningModel from "./warningModel/index";

  import {
    getBackPageList, //分页
    addPageList, //新增
    delMore,
    getsearchType, //搜索type
    qcqfPerson,
    qcqfPersonData,
    dictionary,
    updateAltitude,
    areaData,
    getArea,
    editState
  } from "@/api/hideDanger/obj";
  import LonLat from "@/components/Location";

  export default {
    name: "hidedanger",
    components: {
      aversion,
      shortMsg,
      hiddData,
      layerData,
      field,
      prevent,
      reservePlan,
      WarningIssue,
      WarningModel,
      LonLat,
    },
    data() {
      let that = this;
      return {
        proptype: {
          label: '',
          value: '',
        },
        typeData: [],
        typeSearch: null,
        rowData: {},
        hideId: "",
        disasterName: "",
        addType: [], //类型
        levelType: [], //隐患等级
        pbType: [], //坡边类别
        extentharmType: [], //危害程度
        riskType: [], //危险性
        steadyType: [], //稳定性
        rockType: [], //岩石特性
        streetCodes: [],
        communityCodes: [],
        qcqfPersonDatas: [],
        jcyfzrdwPersonDatas: [], //预防联系人
        zdjcdwPersonDatas: [], //街道分管领导
        qcqfPhone: null,
        qcqfId: null,
        tabIndex: 0,
        selecteData: [],
        dialogfull: false,
        layerVisible: false,
        searchForm: {},
        customSearchForm: {},
        option: tableOption,
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条,
          isAsc: false, //是否倒序
        },
        list: [],
        listLoading: false,
        role: [],
        fixedRole: [],
        form: {
          warnHornBroadcast: 0
        },
        colorChange: false,
        dialogFormVisible: false,
        tabPosition: "left",
        activeName: "field",
        activeArr:[],
        searchObj: {
          "orders[0].asc": false,
          "orders[0].column": "create_time",
        },
        dataRow: null,
        disasterBase: null,
        LatAndLon: {
          longitude: "",
          latitude: "",
        },
        lonLatOpen: false,
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
              var nodes = data.data.map((item) => {
                return {
                  value: item.code,
                  label: item.name,
                  leaf: false,
                };
              });
              resolve(nodes);
            } else if (level == 1) {
              const {
                data
              } = await getArea(node.data.value); //获取市接口
              var nodes = data.data.map((item) => {
                return {
                  value: item.code,
                  label: item.name,
                  leaf: false,
                };
              });
              resolve(nodes);
            } else if (level == 2) {
              const {
                data
              } = await getArea(node.data.value); //获取区/县接口
              var nodes = data.data.map((item) => {
                return {
                  value: item.code,
                  label: item.name,
                  leaf: false,
                };
              });
              resolve(nodes);
            } else if (level == 3) {
              const {
                data
              } = await getArea(node.data.value); //获取区/县接口
              var nodes = data.data.map((item) => {
                return {
                  value: item.code,
                  label: item.name,
                  leaf: false,
                };
              });
              resolve(nodes);
            } else if (level == 4) {
              const {
                data
              } = await getArea(node.data.value); //获取区/县接口
              var nodes = data.data.map((item) => {
                return {
                  value: item.code,
                  label: item.name,
                  leaf: true,
                };
              });
              resolve(nodes);
            } else if (level == 5) {
              // that.$refs.cascaderDev.dropDownVisible = false;
              document.querySelectorAll('.el-icon-loading').forEach(e => {
                e.style.display = 'none'
              })
            }
          },
        }
      };
    },
    computed: {
      ...mapGetters(["permissions", "projectId"]),
    },
    watch: {
      role() {
        this.form.role = this.role;
      },
      dialogFormVisible(val) {
        this.getList(this.page);
        // this.tabIndex = 0;
        if (val) {
          // this.activeName = "field";
          if(this.activeArr&&this.activeArr.length>0){
              this.activeName=this.activeArr[0];
               switch (this.activeName) {
                case "field":
                  this.tabIndex=0
                  this.$refs["field"].isEditTpl=true
                  break;
                case "prevent":
                  this.tabIndex=1
                  this.$refs["prevent"].isEditTpl=true
                  break;
                case "aversion":
                  this.tabIndex=2
                  this.$refs["aversion"].isEditTpl=true
                  break;
                case "reserveplan":
                  this.tabIndex=3
                  this.$refs["reserveplan"].isEditTpl=true
                  break;
                case "hidddata":
                  this.tabIndex=4
                  this.$refs["hidddata"].isEditTpl=true
                  break;
                default:
                  break;
              }
            }
        }
      },
      projectId: {
        immediate: true,
        handler(val, oVal) {
          if(val!=0&&val){
            window.sessionStorage.setItem("projectId", val);
            this.getList();
            if (val != 0&&val) {
              this.typeSearch=''
              getsearchType({projectId:val}).then(v => {
                this.typeData = v.data.data
              })
            }
            this.$refs.crud.selectClear();
            this.$refs.crud.searchReset();
          }
        },
        deep: true,
      },
    },
    mounted() {
      setInterval(function () {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            if (this.previousElementSibling) this.previousElementSibling.click()
          }
        })
      }, 200)
    },
    created() {
      this.$bus.$off("getPoints");
      this.$bus.$on("getPoints", (points) => {
        if (points) {
          let longitude = Number(points.longitude);
          let latitude = Number(points.latitude);
          this.$nextTick(() => {
            this.form.longitude = longitude.toFixed(6);
            this.form.latitude = latitude.toFixed(6);
            this.form.location = points.province + points.city + points.district + points.street + points
              .streetNumber
          });
          this.lonLatOpen = false;
        }
      });
    },
    methods: {
      visibleChange() {
        document.querySelectorAll('.el-icon-loading').forEach(e => {
          e.style.display = 'none'
        })
      },
      locationsChange(e) {
        this.$refs.cascaderDev.toggleDropDownVisible();
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
          this.ajax({
            method: 'get',
            url: 'http://api.tianditu.gov.cn/administrative',
            data: query,
            success: function (res) {
              if (res.msg == 'ok') {
                _this.form.longitude = res.data[0].lnt
                _this.form.latitude = res.data[0].lat
              } else {
                _this.form.longitude = '116.3'
                _this.form.latitude = '39.9'
              }
            },
            async: true,
            //异常处理
            error: function (e) {
              throw e;
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
      // 定位
      async getLocation() {
        if (this.form.longitude && this.form.latitude) {
          this.LatAndLon.longitude = this.form.longitude
          this.LatAndLon.latitude = this.form.latitude
        }
        this.lonLatOpen = true;
      },
      rowState(row) {
        editState({
          monitorId: row.id,
          warnHornBroadcast: row.warnHornBroadcast
        })
      },
      tabClick(tab, event) {
        this.tabIndex = tab.index;
         switch (tab.name) {
                case "field":
                  this.tabIndex=0
                  this.$refs["field"].isEditTpl=true
                  break;
                case "prevent":
                  this.tabIndex=1
                  this.$refs["prevent"].isEditTpl=true
                  break;
                case "aversion":
                  this.tabIndex=2
                  this.$refs["aversion"].isEditTpl=true
                  break;
                case "reserveplan":
                  this.tabIndex=3
                  this.$refs["reserveplan"].isEditTpl=true
                  break;
                case "hidddata":
                  this.tabIndex=4
                  this.$refs["hidddata"].isEditTpl=true
                  break;
                default:
                  break;
              }
      },
      selectionChange(list) {
        let now = [];
        list.forEach((e) => {
          now.push(e);
        });
        this.selecteData = now;
      },
      getRowKeys: function (key) {},
      getList(page, params) {
        this.listLoading = true;
        if (this.projectId != 0) {
          getBackPageList(
            Object.assign({
                "orders[0].asc": false,
                "orders[0].cloumn": "create_time",
                current: this.page.currentPage,
                size: this.page.pageSize,
                projectId: this.projectId,
              },
              params,
              this.searchForm
              // this.searchObj
            )
          ).then((response) => {
            this.listLoading = false;
            this.list = response.data.data.records;
            this.page.total = response.data.data.total;
          });
        }
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
      },
      currentChange(current) {
        this.page.currentPage = current;
      },
      handleFilter(form, done) {
        if (form.cascader) {
          form.cascader[4] ? form.communityCode = form.cascader[4] : form.communityCode = "";
          form.cascader[3] ? form.streetCode = form.cascader[3] : form.streetCode = "";
          form.cascader[2] ? form.countyCode = form.cascader[2] : form.countyCode = "";
          form.cascader[1] ? form.cityCode = form.cascader[1] : form.cityCode = "";
          form.cascader[0] ? form.provinceCode = form.cascader[0] : form.provinceCode = "";
          delete form.cascader
        }
        form.type = this.typeSearch
        this.searchForm = Object.assign(form, this.customSearchForm);
        this.page.currentPage = 1;
        this.getList(this.page, this.searchForm);
        done();
      },
      handleRefreshChange() {
        this.getList(this.page);
      },
      handleCreate(row) {
        //新增
        this.form.warnHornBroadcast = 0
        this.$refs.crud.rowAdd();
      },
      handleEdit() {
        //更新监测点
      },
      handleDel() {
        //删除
        if (this.selecteData && this.selecteData.length > 0) {
          this.$confirm("确定删除选中监测点？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            var listAll = [];
            this.selecteData.forEach((item, index) => {
              listAll.push(item.id);
            });
            var listNumber = listAll.join(",");
            delMore({
              ids: listNumber,
            }).then((res) => {
              this.$message.success("删除成功");
              this.getList(this.page);
              this.$refs.crud.selectClear();
            });
            this.page.total = response.data.data.total;
          });
        } else {
          this.$message.warning("请选择要删除的监测点");
        }
      },
      handleDel1(row) {
        //删除
        this.$confirm(
          "确定要删除监测点编号为" + row.monitorCode + "吗？",
          "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          delMore({
            ids: row.id,
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message.success("删除成功");
              this.getList(this.page);
              this.$refs.crud.selectClear();
            }
          });
        });
      },
      handleDaochu() {
        //导出
        this.$refs.crud.rowExcel();
      },
      handleOpenBefore(show, type) {
        window.boxType = type;
        if (["edit", "views"].includes(type)) {
          this.colorChange = true;
          this.role = [];
          this.fixedRole = [];
          for (var i = 0, j = 0, k = 0; i < this.form.roleList.length; i++) {
            this.role[j++] = this.form.roleList[i].roleId;
            if (!this.form.roleList[i].isCanCancel) {
              this.fixedRole[k++] = this.form.roleList[i].roleId;
            }
          }

          let deptIdColumn = this.findObject(this.option.column, "deptId");
          let deptNameNoCanSelectColumn = this.findObject(
            this.option.column,
            "deptNameNoCanSelect"
          );
          if (this.form.deptCanSelect == null) {
            deptIdColumn.editDisplay = true;
            deptNameNoCanSelectColumn.editDisplay = false;
          } else {
            if (this.form.deptCanSelect) {
              deptIdColumn.editDisplay = true;
              deptNameNoCanSelectColumn.editDisplay = false;
            } else {
              deptIdColumn.editDisplay = false;
              deptNameNoCanSelectColumn.editDisplay = true;
            }
          }
        } else if (type === "add") {
          this.colorChange = false;
          this.role = [];
          this.fixedRole = [];
        }
        show();
      },
      handleInfo(row, index) {
        this.hideId = row.id;
        this.disasterName = row.name ? row.name : "监测点详情";

        row.cascader = [
          row.provinceCode,
          row.cityCode,
          row.countyCode,
          row.streetCode,
          row.communityCode,
        ]
        row.cascader = row.cascader.filter(function (s) {
          return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
        });
        this.disasterBase = row;

        window.sessionStorage.setItem("disasterData", JSON.stringify(row));
        // window.sessionStorage.removeItem("disasterData");
        setTimeout((v) => {
          // window.sessionStorage.setItem("disasterData", JSON.stringify(row));
          this.dialogFormVisible = true;
          this.tabIndex =null
          this.activeArr=[]
         //tab标签的权限控制
        this.$nextTick(() => {
//首先把所有的都隐藏
            this.$refs.tabsRef.$children[0].$refs.tabs[0].style.display = 'none';
            this.$refs.tabsRef.$children[0].$refs.tabs[1].style.display = 'none';
            this.$refs.tabsRef.$children[0].$refs.tabs[2].style.display = 'none';
            this.$refs.tabsRef.$children[0].$refs.tabs[3].style.display = 'none';
            this.$refs.tabsRef.$children[0].$refs.tabs[4].style.display = 'none';


            if(this.permissions.JCD_detail_baseInfo_view){
                this.$refs.tabsRef.$children[0].$refs.tabs[0].style.display = 'block';
                // this.activeName="field";
                this.activeArr.push("field")
            }
            if(this.permissions.JCD_detail_preventCard_view){
                this.$refs.tabsRef.$children[0].$refs.tabs[1].style.display = 'block';
                // this.activeName="prevent";
                this.activeArr.push("prevent")
            }
            
            if(this.permissions.JCD_detail_hedgeWhiteCard_view){
                this.$refs.tabsRef.$children[0].$refs.tabs[2].style.display = 'block';
                // this.activeName="aversion";
                this.activeArr.push("aversion")
            }
            if(this.permissions.JCD_detail_reservePlan_view){
                this.$refs.tabsRef.$children[0].$refs.tabs[3].style.display = 'block';
                // this.activeName="reserveplan";
                this.activeArr.push("reserveplan")
            }
            

            if(this.permissions.JCD_detail_monitoringFolder_view){
                this.$refs.tabsRef.$children[0].$refs.tabs[4].style.display = 'block';
                // this.activeName="hidddata";
                this.activeArr.push("hidddata")
            }
            if(this.activeArr&&this.activeArr.length>0){
              this.activeName=this.activeArr[0];
               switch (this.activeName) {
                case "field":
                  this.tabIndex=0
                  this.$refs["field"].isEditTpl=true
                  break;
                case "prevent":
                  this.tabIndex=1
                  this.$refs["prevent"].isEditTpl=true
                  break;
                case "aversion":
                  this.tabIndex=2
                  this.$refs["aversion"].isEditTpl=true
                  break;
                case "reserveplan":
                  this.tabIndex=3
                  this.$refs["reserveplan"].isEditTpl=true
                  break;
                case "hidddata":
                  this.tabIndex=4
                  this.$refs.hidddata.isEditTpl=true
                  break;
                default:
                  break;
              }
            }
            
        });
        }, 300);
      },
      handleLayer(row, index) {
        this.rowData = row;
        window.sessionStorage.setItem("disasterData", JSON.stringify(row));
        this.layerVisible = true;
      },
      create(row, done, loading) {
        //新增
        var r = this.form.cascader.filter(function (s) {
          return s && s.trim();
        });
        this.form.cascader = r
        if (this.$refs.cascaderDev.inputValue) {
          let cascader = this.$refs.cascaderDev.inputValue.split('/');
          this.form.cascader[4] ? this.form.communityCode = this.form.cascader[4] : this.form.communityCode = "";
          this.form.cascader[3] ? this.form.streetCode = this.form.cascader[3] : this.form.streetCode = "";
          this.form.cascader[2] ? this.form.countyCode = this.form.cascader[2] : this.form.countyCode = "";
          this.form.cascader[1] ? this.form.cityCode = this.form.cascader[1] : this.form.cityCode = "";
          this.form.cascader[0] ? this.form.provinceCode = this.form.cascader[0] : this.form.provinceCode = "";
          cascader[4] ? this.form.communityName = cascader[4] : this.form.communityName = "";
          cascader[3] ? this.form.streetName = cascader[3] : this.form.streetName = "";
          cascader[2] ? this.form.countyName = cascader[2] : this.form.countyName = "";
          cascader[1] ? this.form.cityName = cascader[1] : this.form.cityName = "";
          cascader[0] ? this.form.provinceName = cascader[0] : this.form.provinceName = "";
        }
        row.projectId = this.projectId;


        if (this.form.runningStatus != "cancellation") {
          this.form.cancellationTime = "";
          this.form.cancellationRemark = "";
        }

        addPageList(Object.assign(row, this.form))
          .then(() => {
            this.getList(this.page);
            done();
            this.$notify.success("创建成功");
          })
          .catch(() => {
            loading();
          });
      },
      mapLocation(row, index) {},
      rowStyle({
        row,
        column,
        rowIndex
      }) {
        if (rowIndex % 2 == 0) {
          return {
            background: "#eee",
            color: "#fff",
          };
        }
      },
      handleClose() {
        this.layerVisible = false;
        this.dialogFormVisible = false;
      },
      isfullscreen() {
        this.dialogfull = !this.dialogfull;
      },
      searchReset(n, m) {
        //搜索清空
        this.typeSearch = ''
        this.communityCodes = [];
        this.customSearchForm = {};
        this.searchForm = {};
        this.getList();
      },
      // setHeight() {
      //   if (this.selecteData.length == 0) {
      //     this.$message.warning("请选择数据");
      //   } else {
      //     this.$prompt("请输入高度", "提示", {
      //       confirmButtonText: "确定",
      //       cancelButtonText: "取消",
      //       inputPattern: /^\d+(\.\d+)?$/,
      //       inputErrorMessage: "请输入数字",
      //       inputValue: this.selecteData[0].altitude,
      //       closeOnClickModal: false,
      //     }).then(({
      //       value
      //     }) => {
      //       let ids = [];
      //       this.selecteData.forEach((e) => {
      //         ids.push(e.id);
      //         e.altitude = value * 1;
      //       });
      //       updateAltitude({
      //         disasterIds: ids,
      //         altitude: value * 1,
      //       }).then((e) => {
      //         this.$message("设置成功");
      //       });
      //     });
      //   }
      // },
    },
  };

</script>

<style lang="scss" scoped>
  .el-cascader-panel .el-radio {
    width: 132px;
    height: 34px;
    line-height: 34px;
    padding: 0 10px;
    z-index: 10;
    position: absolute;
  }

  .el-cascader-panel .el-radio__input {
    visibility: hidden;
  }

  .el-cascader-panel .el-cascader-node__postfix {
    top: 10px;
  }

  .hide_mod {
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


  .el-cascader.color_dark {
    ::v-deep .el-input__inner::-webkit-input-placeholder {
      color: #606266;
    }

    .el-cascader.color_dark {
      ::v-deep .el-input__inner::-webkit-input-placeholder {
        color: #606266;
      }

      ::v-deep .el-input__inner::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #606266;
      }

      ::v-deep .el-input__inner:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #606266;
      }

      ::v-deep .el-input__inner:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #606266;
      }
    }
  }

</style>

<style lang="scss">
  .hide_dialog {
    .el-dialog__header {
      padding: 10px;
      background: rgba(0, 58, 106, 1);
      color: #fff;
    }

    .el-dialog__headerbtn {
      top: 10px;
    }

    .el-dialog__body {
      padding: 24px !important;
    }

    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }

    .dialog-title {
      color: #fff;
      text-align: left;
      font-size: 16px;
      font-weight: 700;
      overflow: hidden;
    }

    .dialog-title i {
      position: absolute;
      right: 45px;
      top: 12px;
      color: #fff;
      text-align: right;
      font-size: 16px;
      cursor: pointer;
    }
  }

</style>
