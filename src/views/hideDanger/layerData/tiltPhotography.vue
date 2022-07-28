<template>
  <!-- 倾斜射影 -->
  <div class="bc_cloud-tab">
    <div class="bc_label">
      <label slot="label">
        <div class="bc_cloud-label">
          <el-button type="primary" v-if="permissions.JCD_layer_tiltPhotography_edit" size="mini" @click.native="layersSubmit">
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
            :disabled="!moduleConfig.data.moduleSave">
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

      <el-table-column label="高度" prop="height" align="center" width="120">
        <template slot-scope="scope">
          <el-input
            type="number"
            :disabled="!moduleConfig.data.moduleSave"
            v-model="scope.row.height"
            placeholder="请输入内容"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="permissions.JCD_layer_tiltPhotography_preview"
            type="text"
            @click="preview(scope.row)">预览</el-button>
          <el-button
            size="mini"
            type="text"
            v-if="moduleConfig.data.moduleSave"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      class="hide_dialog"
      :visible.sync="isPreview"
      v-if="isPreview"
      @closed="handleClose"
      append-to-body
      width="60%"
      :fullscreen="dialogfull">
      <div slot="title" class="dialog-title">
        <span class="title-text">倾斜摄影图层</span>
        <i class="el-icon-full-screen " @click="isfullscreen"></i>
      </div>
      <map-com ref="welMap"></map-com>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import {
  addTiltPhotography,
  getTiltPhotographyList,
  deleteTiltPhotography,
} from "@/api/hideDanger/tiltPhotography";
export default {
  name: "layerTable",
  props: ["moduleConfig", "disasterId", "disasterMsg"],
  components: {},
  data() {
    return {
      dialogTableVisible: false,
      moduleSave: false,
      dangerAreaList: [],
      disasterObliquePhotographies: [
        {
          disasterId: 0,
          link: "",
          name: "",
          sort: 0,
          type: 1,
          height: 0
        },
      ],
      isPreview: false,
      dialogfull: false,
      layerTypeOptions: [{ value: 1, label: "图层加载" }],
      layersTabData: [],
      dataRow: {}
    };
  },
  watch: {
    disasterId: {
      immediate: true,
      handler(x, y) {
        if (x && this.moduleConfig.data.moduleTitle == "倾斜摄影") {
          this.getList();
        }
      },
    },
  },
  computed:{
    ...mapGetters(["permissions"]),
  },
  methods: {
    getList() {
      if (this.disasterId) {
        getTiltPhotographyList({ disasterId: this.disasterId }).then((res) => {
          //表格的数据展示 //向状态机存储从线上加载的数据  关闭又重新加载
          if (res.data.data) {
            this.dangerAreaList = res.data.data.records;
          }
        });
      }
    },

    handleDelete(index, row) {
      //删除行
      this.$confirm("是否确认删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const ids = [row.id];
        deleteTiltPhotography(ids).then((res) => {
          this.dangerAreaList.splice(index, 1);
          return false;
        });
      });
    },
    handleAdd() {
      let newRow = {
        link: "",
        name: "倾斜摄影",
        sort: 1,
        type: 1,
        height: 0
      };
      this.dangerAreaList.push(newRow);
    },

    layersSubmit() {
      //编辑保存
      if (!this.moduleConfig.data.moduleSave) {
        this.moduleConfig.data.moduleSave = true;
      } else {
        const arr = this.dangerAreaList.filter((a) => a.link);
        if (this.dangerAreaList.link != "" && arr.length > 0) {
          let layerDisasterData = {
            disasterId: this.disasterId,
            disasterObliquePhotographies:this.dangerAreaList
          };
          addTiltPhotography(layerDisasterData)
            .then((res) => {
              this.$message.success("操作成功!");
              this.moduleConfig.data.moduleSave = false;
              return;
            })
            .catch((err) => {
              this.$message.error("操作失败");
              this.moduleConfig.data.moduleSave = false;
            });
        } else if(this.dangerAreaList.length == 0) {
          this.moduleConfig.data.moduleSave = false;
        }else{
          this.$message.error("请输入链接");
          this.moduleConfig.data.moduleSave = true;
        }
      }
    },
    preview(rowData) {
      this.isPreview = true
      if(rowData.link && rowData.height !== null){
        setTimeout(()=>{
          this.mapFunc.addQXSY(
            rowData.link,
            rowData.id,
            rowData.height
          );
          // this.mapFunc.goView({
          //   longitude: this.disasterMsg.longitude,
          //   latitude: this.disasterMsg.latitude,
          //   height: 1200,
          // });
        },2000)
      }
    },

    isfullscreen() {
      this.dialogfull = !this.dialogfull;
    },

    handleClose() {},
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
