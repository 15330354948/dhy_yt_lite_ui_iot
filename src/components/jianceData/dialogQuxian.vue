<template>
  <div class="quxian">
    <!-- <el-button type="primary" class="el-icon-place dingweibtn" @click="location" v-if="locBtnDisplay">
      定位
    </el-button> -->
    <el-row>
      <el-col :span="4">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable>
        </el-input>
        <el-tree class="filter-tree" :data="treeData" :props="defaultProps" :highlight-current="true" default-expand-all
          :filter-node-method="filterNode" ref="tree" @node-click="nodeClick" expand-on-click-node node-key="id"
          v-loading="loading">
          <span class="el-tree-node__label" slot-scope="{ node, data }">
            <el-tooltip placement="right-start" :open-delay="300">
              <div slot="content">{{ (node || {}).label }}</div>
              <span>
                <i :class="data.status == 0 || data.status == 1 ? 'el-icon-s-platform' : ''"
                  :style="data.status == 0 ? 'color:#70D340' : 'color:#ccc'"></i>
                <span
                  :style="data.status == 0 ? 'color:#606266' : data.status == 1 ? 'color:#ccc' : ''">{{data.useStatus == 0 ? "": data.useStatus == 1 ? "[损坏]" : data.useStatus == 2 ? "[注销]" : ""}}
                  {{ (node || {}).label }}</span>
                <span v-if="data.total">
                  <span>(</span>
                  <span style="color:#70D340">{{data.num}}</span>
                  <span>/{{data.total}})</span>
                </span>
              </span>
            </el-tooltip>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="20">
        <jianceData :dev-listone="devListone" ref="rightTabBox" :dev-type="devData.row.type" v-if="showOff"></jianceData>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    treeOption
  } from "@/const/crud/monitorManage/deviceList";
  import {
    mapGetters
  } from 'vuex'
  import {
    searchSersorType,
    searchSensorListAll,
    searchDevTree
  } from "@/api/monitorManage/quxian";

  import jianceData from "./index";
  export default {
    name: "dialogQuxian",
    props: ["devData", "devDw"],
    components: {
      jianceData
    },
    computed: {
      ...mapGetters(['permissions', "projectId"]),
    },
    data() {
      return {
        locBtnDisplay: true, // 地图定位按钮展示
        analysisMode: false, // 分析模式切换
        devNumSearchForm: { // 设备编号搜索表单
          deviceNo: "",
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        loading: false,
        treeOptionAttr: treeOption,
        treeData: [{
          value: 0,
          label: '一体化监测仪',
          children: [{
            value: 1,
            label: 'YT01',
            id: "10000000006387",
            warnLevel: 1,
            isOnline: true
          }, {
            value: 1,
            label: 'YT02',
            id: "10000000006388",
            warnLevel: 2,
            isOnline: true
          }, {
            value: 1,
            label: 'YT03',
            id: "10000000006389",
            warnLevel: 3,
            isOnline: true
          }, {
            value: 1,
            label: 'YT04',
            id: "10000000006390",
            warnLevel: 4,
            isOnline: true
          }]
        }],
        filterText: "",
        currentNodeKey: "",
        devListone: {
          sensorCode: "",
          deviceId: "",
        },
        showOff: false,
        clickNumber: "",

        new_number: 0,
        tree_data: 0,
        clickBtn: 0,
      };
    },
    created() {
      if (this.devDw == "false" || this.devDw == false) {
        this.locBtnDisplay = false
      } else {
        this.locBtnDisplay = true;
      };
      this.getDataBegin();
    },
    mounted() {},
    watch: {
      projectId: {
        immediate: true,
        handler(val, oVal) {
          window.sessionStorage.setItem('projectId', val)
          this.getDataBegin();
        },
        deep: true,
      },
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      treeData: {
        immediate: true,
        handler(val, oval) {
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.currentNodeKey)
          })
        },
        deep: true,
      },
      tree_data() {
        this.$nextTick(() => {
          this.loading = false;
          this.showOff = true;
          if (this.new_number - 1 == -1) {
            // document.querySelectorAll('.is-expanded')[1].click();
          } else {
            document.querySelectorAll('.is-expanded')[this.new_number].click();
          }
        })
      },
    },
    methods: {
      filterNode(value, data, node) {
        if (!value) {
          node.expanded = false;
          return true;
        }
        return this.checkBelongToChooseNode(value, data, node);
      },
      checkBelongToChooseNode(value, data, node) {
        if (data.label.indexOf(value) !== -1) {
          return true;
        }
        const level = node.level;
        if (level === 1) {
          return false;
        }
        let parentData = node.parent;
        let index = 0;
        while (index < level - 1) {
          if (parentData.data.label.indexOf(value) != -1) {
            return true;
          }
          parentData = parentData.parent;
          index++;
        }
        return false;
      },
      async getDataBegin() {
        this.loading = true;
        const require = await searchSensorListAll({
          // deviceCode: this.devData.row.code,
          // deviceId: this.devData.row.id,
          // deviceName: this.devData.row.name,
          projectId: this.projectId,
          disasterId: this.devData.row.disasterId
        })
        var sersorList = require.data.data;
        console.log(this.devData.row);

        if (sersorList.length > 0) {
          const require2 = await searchSersorType("device_type")
          var devTypeAll = require2.data.data;
          for (var k = 0; k < sersorList.length; k++) {
            for (var i = 0; i < devTypeAll.length; i++) {
              if (devTypeAll[i].value == sersorList[k].value) {
                sersorList[k].label = devTypeAll[i].label
              }
            }
          }
          const require3 = await searchSersorType("sensor_type")
          var sersorTypeAll = require3.data.data; //传感器类型字典表
          var id = 0;
          for (var k = 0; k < sersorList.length; k++) {
            sersorList[k].total = sersorList[k].children.length;
            id++;
            sersorList[k].id = id;
            let num = 0;
            for (var i = 0; i < sersorList[k].children.length; i++) {
              id++;
              sersorList[k].children[i].id = id;
              if (sersorList[k].children[i].status == 0) {
                num++;
              }
              sersorList[k].num = num;
              for (var j = 0; j < sersorList[k].children[i].children.length; j++) {
                id++;
                sersorList[k].children[i].children[j].id = id;
                var abs = "";
                for (var kk = 0; kk < sersorTypeAll.length; kk++) {
                  if (
                    sersorList[k].children[i].children[j].sensorType == sersorTypeAll[kk].value
                  ) {
                    abs = sersorTypeAll[kk].label;
                  }
                }
                sersorList[k].children[i].children[j].label = abs;
                sersorList[k].children[i].children[j].nameLabel = abs + "—" +
                  sersorList[k]
                  .children[i].children[j].value;
              }
              sersorList[k].children[i].label = sersorList[k].children[i].label + '(' + sersorList[k]
                .children[i].value + ')'
            }
          }
          this.treeData = sersorList;
          this.loading = false
          var new_number = 0;
          for (var i = 0; i < this.treeData.length; i++) {
            new_number++;
            for (var j = 0; j < this.treeData[i].children.length; j++) {
              new_number++;
              if (this.treeData[i].children[j].children.length > 0) {
                if (this.treeData[i].children[j].label.split('(')[0] == this.devData.row.name) {
                  this.new_number = new_number;
                  this.currentNodeKey = this.treeData[i].children[j].id + 1
                  this.$refs.tree && this.$refs.tree.setCurrentKey('4')
                  this.tree_data = 1;
                  break;
                } else {
                  for (var a = 0; a < this.treeData[i].children[j].children.length; a++) {
                    new_number++;
                    this.tree_data = 1;
                  }
                }
              }
            }
          }
        } else {
          this.loading = false;
          this.treeData = sersorList;
          this.devListone = {
            noData: true,
            deviceId: this.devData.row.id,
          };
          this.showOff = true;
        }
      },

      /**
       * 设备编号点位名称搜索
       * @constructor
       * @param {}
       */
      devNumSearch() {
        searchDevTree(this.devNumSearchForm).then(res => {
          if (res.data.data) {
            this.treeData = res.data.data
          }
        })
      },
      // 监测数据树形结构点击
      nodeClick(data) {
        // console.log(data.sensorType);
        if (data.sensorType == undefined) {} else {
          if (data.children == undefined || data.children.length < 1 || data.children == null) {
            if (this.clickNumber === data.value) {
            } else {
              if (this.clickBtn == 0) {
                this.devListone = {
                  label: data.nameLabel,
                  sensorType: data.sensorType,
                  sensorCode: data.value,
                  deviceId: data.deviceId,
                };
              } else {
                this.devListone = {
                  label: data.nameLabel,
                  sensorType: data.sensorType,
                  sensorCode: data.value,
                  nodeclick: true,
                  deviceId: data.deviceId,
                  refreshBtn: false,
                };
              }
              this.clickNumber = data.value;
            }
          }
        }
        this.clickBtn++;
      },

      location() {
        this.$parent.$parent.close();
        this.mapFunc.kuosan2(this.devData.row);
        this.mapFunc.goView({
          longitude: this.devData.row.longitude,
          latitude: this.devData.row.latitude,
          height: 150,
          preMinus: 0.00001,
          pitch: -90,
        });
      }
    },
  };

</script>

<style lang="scss" scoped>
  .quxian {
    position: relative;

    .dingweibtn {
      position: absolute;
      top: 20px;
      right: 0px;
      z-index: 1000;
    }

    ::v-deep.el-form--inline .el-form-item {
      margin-right: 5px !important;
    }


  }

  ::v-deep.el-tree {
    height: 500px !important;
    overflow: scroll;
  }

</style>
