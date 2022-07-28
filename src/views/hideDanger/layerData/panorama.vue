<template>
  <!-- 监测点图层全景图 -->
  <div class="bc_cloud-tab">
    <div class="bc_label">
      <label slot="label">
        <div class="bc_cloud-label">
          <el-button type="primary" size="mini" v-if="permissions.JCD_layer_panorama_edit" @click.native="layersSubmit">
            {{ moduleConfig.data.moduleSave ? "保存" : "编辑" }}</el-button
          >
        </div>
      </label>
    </div>
    <el-table :data="dangerAreaList" border>
      <el-table-column prop="sort" width="70" align="center">
        <template slot="header" slot-scope="scope">
          <span v-if="!moduleConfig.data.moduleSave">序号</span>
          <el-button
            v-else
            type="primary"
            icon="el-icon-plus"
            circle
            @click="handleAdd(scope.$index, scope.row)"
          ></el-button>
        </template>

        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="名称" prop="name" align="center" width="150">
        <template slot-scope="scope">
          <el-input
            :disabled="!moduleConfig.data.moduleSave"
            v-model="scope.row.name"
            placeholder="请输入内容"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="数据类型" prop="type" align="center" width="120">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.type"
            :disabled="!moduleConfig.data.moduleSave">
            <el-option
              v-for="item in layerTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="文件" prop="fileName" align="center">
        <template slot-scope="scope" v-if="scope.row.type == 0">
          <el-upload
            class="upload-file flex"
            :action="uploadUrl"
            :before-remove="beforeRemove"
            :on-remove="handleQJTRemove"
            :on-success="handleboundarySuccess"
            :on-preview="previewPanorama"
            :before-upload="beforeAvatarUpload"
            :headers="header"
            :on-progress="uploadVideoProcess"
            accept=".zip"
            :file-list="scope.row.fileList"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <el-button
              icon="el-icon-upload2"
              type="primary"
              @click="handleUplad(scope.$index)"
              :disabled="!moduleConfig.data.moduleSave">上传文件</el-button>
            <!-- <el-progress
              v-if="uploading"
              type="circle"
              :percentage="UploadPercent"
            ></el-progress> -->
          </el-upload>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            v-if="permissions.JCD_layer_panorama_preview"
            @click.stop="previewPanorama(scope.$index, scope.row)"
            >预览</el-button>
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
      class="hide_dialog panorama_dialog"
      :visible.sync="isPanorama"
      v-if="isPanorama"
      @closed="handleClose"
      append-to-body
      width="65%"
      height="75%"
      :fullscreen="dialogfull"
    >
      <div slot="title" class="dialog-title">
        <span class="title-text">全景图预览</span>
        <i class="el-icon-full-screen" @click="isfullscreen"></i>
      </div>
      <iframe class="panorama" :src="urlPanorama" frameborder="0"></iframe>
    </el-dialog>
  </div>
</template>

<script>
import { baseUrl } from "@/config/env";
import store from "@/store";
import { mapGetters } from "vuex";
import {
  addPanorama,
  getPanoramaList,
  deletePanorama,
  getPanorama,
} from "@/api/hideDanger/panorama";

export default {
  name: "layerTable",
  props: ["moduleConfig", "disasterId"],

  components: {},
  computed: {
    ...mapGetters(["permissions"]),
    header() {
      return { Authorization: "Bearer " + store.getters.access_token };
    }, //用户授权
  },

  data() {
    return {
      urlPanorama: null,
      fileListCLLX: [],
      fileListQJT: [],
      panorama: "",

      dialogfull: false, //对话框完整
      isPreview: false,
      isPanorama: false,
      disasterData: {}, //监测点数据
      uploadUrl: baseUrl + "/file/panoramaZipUpload",
      // uploadUrl: baseUrl + "/disaster_anorama",
      PanoramaData: {
        //上传文件数据
        netUrl: "",
        id: "",
      },
      uploading: false,
      UploadPercent: 0, //上传百分比
      // urlQJT: "",

      dialogTableVisible: false,
      moduleSave: false,
      dangerAreaList: [],
      currentIndex: 0,
      disasterAnoramas: [
        {
          fileId: "",
          fileName: "",
          name: "",
          sort: 0,
          type: 0,
        },
      ],
      layerTypeOptions: [{ value: 0, label: "压缩包" }],
      layersTabData: [],
      dataRow: {},
    };
  },
  watch: {
    disasterId: {
      immediate: true,
      handler(x, y) {
        if (x && this.moduleConfig.data.moduleTitle == "全景图") {
          this.getList();
        }
      },
    }
  },

  methods: {
    getList() {
      if (this.disasterId) {
        getPanoramaList({ disasterId: this.disasterId }).then((res) => {
          //表格的数据展示 //向状态机存储从线上加载的数据  关闭又重新加载
          if(res.data.data){
            this.dangerAreaList = res.data.data.records;
            let fileList = []
            this.dangerAreaList.forEach(area=>{
              fileList.push({
                name: area.fileName,
                url: area.fileUrl,
                id: area.fileId,
              });
              area["fileList"] = fileList
            })
          }
        });
      }
    },
    show(id, index) {
      this.dialogTableVisible = true;
    },
    handleUplad(index) {
      this.currentIndex = index;
    },
    handleDelete(index, row) {
      //删除行
      this.$confirm("是否确认删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const ids = [row.id];
        deletePanorama(ids).then((res) => {
          this.dangerAreaList.splice(index, 1);
          return false;
        });
      });
    },
    handleAdd() {
      //增加行
      // const ids=[row.id]
      let rowl = {
        disasterId: this.disasterId,
        disasterAnoramas: [
          {
            fileId: "",
            fileName: "",
            name: "",
            sort: 1,
            type: 1,
            fileList: [],
          },
        ],
      };
      this.dangerAreaList.push(rowl);
    },

    layersSubmit() {
      //编辑保存

      if (!this.moduleConfig.data.moduleSave) {
        this.moduleConfig.data.moduleSave = true;
      } else {
        let layerDisasterData = {
          disasterId: this.disasterId,
          disasterAnoramas: this.dangerAreaList,
        };
        addPanorama(layerDisasterData)
          .then((res) => {
            this.$message.success("操作成功!");
            this.moduleConfig.data.moduleSave = false;
            return;
          })
          .catch((err) => {
            this.$message.error("操作失败");
            this.moduleConfig.data.moduleSave = false;
          });
      }
    },
    previewPanorama(file, fileList) {
      if(fileList.fileUrl.indexOf('.html') !== -1){
        this.isPanorama = true;
        this.urlPanorama = fileList.fileUrl ? fileList.fileUrl : this.fileListQJT[0].url;
      }else{
        this.isPanorama = false;
        this.$message.warning('全景图解析不正确')
      }
    },
    loadViewer(data) {
      const viewer = new Viewer({
        panorama: data,
      });
    },

    handleClose() {},
    isfullscreen() {
      //全屏
      this.dialogfull = !this.dialogfull;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleExceed() {
      this.$message.warning(
        "已存在该类型文件，请先删除已存在的文件再进行上传!"
      );
    },
    handleQJTRemove(file, fileList) {
      this.fileListQJT = [];
    },
    handleboundarySuccess(res, file) {
      this.UploadPercent = 100;
      this.fileListQJT = [];
      setTimeout(() => {
        this.uploading = false;
      }, 500);
      this.PanoramaData.netUrl = res.data.infos[0].url;
      this.panorama = res.data.infos[0].id;
      this.fileListQJT.push(
        Object.assign(
          {},
          {
            name: res.data.infos[0].name,
            url: res.data.infos[0].previewUrl,
            id: res.data.infos[0].id,
          }
        )
      );

      this.dangerAreaList[this.currentIndex].fileId = this.fileListQJT[0].id;
      this.dangerAreaList[this.currentIndex].fileName = this.fileListQJT[0].name;
      this.dangerAreaList[this.currentIndex].fileUrl = this.fileListQJT[0].url;
      // this.boundaryPicUrl = res.data.infos[0].url;
    },
    uploadVideoProcess(event, file, fileList) {
      //上传过程
      this.uploading = true;
      this.UploadPercent = file.percentage.toFixed(0) * 1;
    },
    beforeAvatarUpload(file) {
      //文件上传前
      let testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const type = testmsg === "zip" ? true : false;
      if (!type) {
        this.$message.error("上传图片只能是zip格式!");
      }
      return type;
    },

    beforeAvatarUpload1(file) {
      //文件上传前
      let testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const type = testmsg === "zip" ? true : false;
      if (!type) {
        this.$message.error("上传图片只能是zip格式!");
      }
      return type;
    },
  },
};
</script>

<style lang="scss" scoped>
.layer_data {
  &__url {
    margin-bottom: 5px;
    .el-input {
      width: 90%;
    }
    .obliquePhotography {
      width: 70%;
    }
    .obliquePhotographyHeight {
      width: 15%;
    }
    span {
      vertical-align: top;
      margin-left: 10px;
      color: #051587;
      cursor: pointer;
    }
  }

  &__view {
    position: relative;
    display: inline-block;
    width: calc(100% - 87px);
    height: 40vh;
    max-height: 40vh;
    // background: #ccc;
  }
}

.el-cascader.color_dark {
  :deep .el-input__inner::-webkit-input-placeholder {
    color: #606266;
  }
  :deep .el-input__inner::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #606266;
  }
  :deep .el-input__inner:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #606266;
  }
  :deep .el-input__inner:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #606266;
  }
}
.layer_data__view {
  width: 90%;
  height: 150px;
  max-height: none;
  .map_container {
    width: 100%;
    height: 100%;
  }
}
:deep.el-icon-edit {
  margin-right: 20px;
}

.dialog-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-icon-full-screen {
    margin-right: 40px;
    cursor: pointer;
  }
}
:deep.el-dialog__header {
  border-bottom: 1px solid lightgray;
  padding: 20px;
}
:deep.el-dialog__body {
  padding: 20px 10px;
}
.saveDiv {
  text-align: center;
  button {
    padding: 15px 50px;
  }
}
.panorama {
  width: 100%;
  height: 100%;
}
.panorama_dialog {
  // height: calc(100% - 62px);
  :deep.el-dialog {
    height: calc(100% - 30vh);
    .el-dialog__body {
      height: calc(100% - 62px);
    }
  }
}

.panorama_form {
  display: flex;
  align-items: center;
  :deep.el-form-item__content {
    margin-left: 0px !important;
    display: flex;
    // align-items: center;
    .avatar-uploader-icon {
      width: 140px;
      height: 140px;
      line-height: 140px;
    }
    .avatar {
      width: 140px;
      height: 140px;
    }
  }
}
.el-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  :deep.el-progress-circle {
    height: 100% !important;
    width: 100% !important;
    background-image: radial-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.5)
    );
    > svg {
      height: 100%;
      width: 100%;
    }
  }
  :deep.el-progress__text {
    font-size: 26px !important;
  }
}
.avatar-uploader {
  :deep ul {
    float: left;
    li:first-child {
      margin-top: 2px;
    }
    .el-icon-close-tip {
      display: none !important;
    }
  }
}
.evacuate_dialog,
.influence_dialog {
  :deep.el-dialog__body {
    height: 70vh;
    overflow: scroll;
  }
}
.fissure_dialog,
.influence_dialog {
  :deep.el-dialog__body {
    height: 85vh;
    overflow: scroll;
  }
}

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

  ::v-deep.el-upload-list__item:first-child{
    margin-top: 0;
  }
}
</style>

<style lang="scss">
.avue-tree .el-tree {
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 55vh;
}
</style>
