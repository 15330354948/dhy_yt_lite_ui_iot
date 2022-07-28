<template>
  <!-- 监测点图层监测点范围 -->
  <div class="bc_cloud-tab">
    <div class="bc_label">
      <label slot="label">
        <div class="bc_cloud-label">
          <el-button type="primary" size="mini" v-if="permissions.JCD_layer_range_edit"   @click.native="layersSubmit">
            {{ moduleConfig.data.moduleSave ? "保存" : "编辑" }}</el-button
          >
        </div>
      </label>
    </div>
    <el-table :data="dangerAreaList" border>
      <el-table-column prop="sort" width="70" align="center">
          <template slot="header" slot-scope="scope">
          <span v-if="!moduleConfig.data.moduleSave">序号</span>
          <!-- 增加一行 -->
          <el-button
            v-else
            type="primary"
            icon="el-icon-plus"
            circle
            @click="handleAdd"
          ></el-button>
        </template>

        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="名称" prop="name" align="center" width="150">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.name"
            :disabled="!moduleConfig.data.moduleSave"
            placeholder="请输入内容"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column label="数据类型" prop="type" align="center" width="150">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.type"
            :disabled="!moduleConfig.data.moduleSave"
          >
            <el-option
              v-for="item in layerTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="链接" prop="link" align="center">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.type == 1"
            :disabled="!moduleConfig.data.moduleSave"
            v-model="scope.row.link"
            placeholder="请输入内容"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button
            v-if="moduleConfig.data.moduleSave && scope.row.type == 2"
            size="mini"
            type="text"
            @click="openLayerPop(scope.$index, scope.row)"
            >绘制</el-button
          >
          <el-button
            size="mini"
            type="text"
            v-if="permissions.JCD_layer_range_preview"
            @click="showLayerPop(scope.$index, scope.row)"
            >预览</el-button
          >
          <!-- moduleConfig.data.moduleSave -->
          <el-button
            size="mini"
            type="text"
            v-if="moduleConfig.data.moduleSave"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      class="hide_dialog"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      @closed="dialogFormVisible = false"
      append-to-body
      width="65%"
      :fullscreen="dialogfull">
      <div slot="title" class="dialog-title">
        <span class="title-text">隐患点影响范围</span>
        <i class="el-icon-full-screen" @click="isfullscreen"></i>
      </div>
      <doRangeMap @getDrawLayerData="getDrawLayerData" :scopeDatas="scopeDatas" :drawTools="drawTools"></doRangeMap>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import {
  addHiddenDanger,
  getHiddenDangerList,
  deleteHiddenDanger,
} from "@/api/hideDanger/hideDangerList";
import doRangeMap from "./layersModule/doRangeMap.vue";
import { deepClone } from '../../../util/util';
import url from 'socket.io-client/lib/url';

export default {
  name: "hiddenDanger",
  props: ["moduleConfig", "disasterId"],
  components: { doRangeMap },
  data() {
    return {
      dialogFormVisible: false,
      dialogfull: false,
      scopeDatas: {},
      drawTools: "",
      isPreview: false,
      layerTypeOptions: [
        { value: 1, label: "图层加载" },
        { value: 2, label: "手动绘制" },
      ],
      layersTabData: [],
      dangerAreaList: [],
    };
  },
  watch: {
    "disasterId": {
      handler(x, y) {
        if (x && this.moduleConfig.data.moduleTitle == "监测范围") {
          this.getList();
        }
      },
      immediate: true
    },
  },
  computed:{
    ...mapGetters(["permissions"]),
  },
  methods: {
    getList() {
      if (this.disasterId) {
        getHiddenDangerList({ disasterId: this.disasterId }).then((res) => {
          let resDatas = res.data.data
          if (resDatas) {
            this.dangerAreaList = resDatas.records;
          }
        });
      }
    },
    isfullscreen() {
      this.dialogfull = !this.dialogfull;
    },

    handleDelete(index, row) {
      //删除行
      this.$confirm("是否确认删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const ids = [row.id];
        deleteHiddenDanger(ids).then((res) => {
          this.dangerAreaList.splice(index, 1);
          return false;
        });
      });
    },
    handleAdd() {
      //增加行
      let newRow = {
        disasterScopeDatas: [],
        link: "",
        name: "监测范围",
        sort: 1,
        type: 1,
      };
      this.dangerAreaList.push(newRow);
    },

    /**
     * @constructor
     * @params {data} 绘制对象列表数据
     */
    getDrawLayerData(data) {
      let { layData, rowCallback } = data
      let queryLayerData = layData
      if(queryLayerData.length>0){
        queryLayerData.forEach(item=>{
          item['longitudeLatitudeAltitude'] = JSON.stringify(item.disasterRangeLatLonDTOList)
        })
      }

      this.dangerAreaList.forEach(areaItem=>{
        if(areaItem.id == rowCallback.id){
          areaItem.disasterScopeDatas = queryLayerData
        }
      })
    },

    layersSubmit() {
      //编辑保存
      if(this.dangerAreaList && this.dangerAreaList.length){
        var urlRegExp = /^http:\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})(\:[a-zA-Z0-9][-a-zA-Z0-9]{0,62})\/service\/gis\/3DModel\/\?serviceName(\=[a-zA-Z0-9][-a-zA-Z0-9]{0,62})\w[a-zA-Z0-9][-a-zA-Z0-9]{0,62}\w[a-zA-Z0-9][-a-zA-Z0-9]{0,62}/;
        this.dangerAreaList.filter(item=> item.type==1 ).forEach(row=>{
          var trueUrl = urlRegExp.test(row.link)
          if(row.link == "" || !trueUrl){
            this.$message.error("请输入正确链接");
            this.moduleConfig.data.moduleSave = false;
            return
          }
        })
        if (this.moduleConfig.data.moduleSave) {
          let layerDisasterData = {
            disasterId: this.disasterId,
            disasterScopes: this.dangerAreaList,
          };
          addHiddenDanger(layerDisasterData)
            .then((res) => {
              this.$message.success("保存成功!");
              this.moduleConfig.data.moduleSave = false;
              return;
            })
            .catch((err) => {
              this.$message.error("操作失败");
              this.moduleConfig.data.moduleSave = true;
            });
        }else{
          this.moduleConfig.data.moduleSave = true;
        }
      }else{
        this.moduleConfig.data.moduleSave = !this.moduleConfig.data.moduleSave;
      }
    },
    openLayerPop(index, row) {
      this.dialogFormVisible = true;
      this.scopeDatas = row
      this.drawTools = true
    },
    showLayerPop(index, row) {
      this.dialogFormVisible = true;
      this.scopeDatas = row;
      this.drawTools = false
    }
  },
};
</script>

<style lang="scss" scoped>
.bc_cloud-tab {
  display: flex;
  justify-content: space-between;
  .el-button {
    height: min-content;
    margin-left: 10px;
  }
  .el-table {
    margin: 0 auto;
    ::v-deep th > .cell {
      text-align: center;
    }
    ::v-deep .cell {
      text-align: center;
    }
    ::v-deep .el-input__inner {
      text-align: center;
    }
  }
  ::v-deep .el-input.is-disabled .el-input__inner {
    cursor: default;
    background: transparent;
    border: none;
    color: #000;
  }
}
</style>
