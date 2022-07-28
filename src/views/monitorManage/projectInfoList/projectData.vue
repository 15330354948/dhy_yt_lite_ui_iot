<template>
  <div class="hide_data" ref="hide_data">
    <div class="hide_data__tree">
      <div class="inputSearch">
        <el-input placeholder="输入关键字进行过滤" prefix-icon="el-icon-search" v-model="filterValue">
        </el-input>
      </div>
      <div class="hide_data__btn flex">
        <el-upload class="upload-demo" multiple :action="uploadUrl" :headers="header" :show-file-list="false"
          :on-success="uploadSuccess" :before-upload="beforeUpload" :on-exceed="handleExceed" :disabled="isUpload">
          <el-tooltip content="只能上传mp4、JPG、PNG、JPEG、docx、doc、jpeg、xlsx、xls、pdf文件，且不超过100MB" placement="bottom">
            <el-button size="small" type="primary" :disabled="isUpload" v-if="permissions['sub_project_data_upload']">
              点击上传</el-button>
          </el-tooltip>
        </el-upload>
        <el-button type="primary" size="small" @click="addFileBtn" v-if="permissions['sub_project_data_add']">新增主目录
        </el-button>
      </div>
      <el-tree class="tree__content" :data="fileData" default-expand-all node-key="value" ref="tree" highlight-current
        :props="defaultProps" :filter-node-method="filterNode" @node-click="nodeClick" @check-change="nodeSelect">
        <span class="custom-tree-node" slot-scope="{ node, data }" @mouseenter="enter(node)" @mouseleave="leave()">
          <span :title="node.label">{{ node.label }}</span>
          <span v-show="rowId == node.id">
            <i v-if="data.type !== 1 && permissions['sub_project_data_add']" title="新增目录" @click="addFileBtn(2, data)"
              class="tree-btn append el-icon-folder-add">
            </i>
            <i v-if="data.type !== 1 && permissions['sub_project_data_add']" title="编辑目录" @click="editFileBtn(3, data)"
              class="tree-btn edit el-icon-edit-outline">
            </i>
            <i :title="data.type !== 1 ? '删除目录' : '删除文件'" @click="deleteUnit(data)"
              v-if="permissions['sub_project_data_del']" class="tree-btn delete el-icon-delete">
            </i>
          </span>
        </span>
      </el-tree>
    </div>
    <div :class="{
        hide_data__preview: fileType != 1,
        hide_data__vediopreview: fileType == 1,
        fullScreen: fullScreen,
      }" id="previewFile">
      <div v-if="tabLoading" class="tab-loading">加载中···</div>
      <video v-if="fileType == 1 && !tabLoading" :src="fileSrc" autoplay controls class="preVideoFile"></video>
      <img v-if="fileType == 2 && !tabLoading" :src="fileSrc" alt="" class="preVideoFile" />
      <iframe v-if="fileType == 3 && !tabLoading" :src="fileSrc" frameborder="0" class="preFile"></iframe>
      <iframe v-if="fileType == 4 && !tabLoading" :src="fileSrc" frameborder="0" class="preFile"></iframe>
      <!-- <iframe v-if="fileType == 4 && !tabLoading" :src="'/pdf/web/viewer.html?file=' +fileSrc" frameborder="0"
        class="preFile"></iframe> -->
    </div>

    <el-dialog append-to-body :title="ftaffTitle" :visible.sync="isFtaff" width="30%" :before-close="handleClose">
      <el-form ref="ftaffForm" :model="ftaffForm" label-width="80px" :rules="rules">
        <el-form-item prop="name" label="目录名称" label-width="180">
          <el-input v-model="ftaffForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isFtaff = false">取 消</el-button>
        <el-button type="primary" @click="addFileFix">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    baseUrl
  } from "@/config/env";
  import {
    mapGetters
  } from "vuex";
  import store from "@/store";
  import {
    getTreeList,
    addFires,
    editFires,
    deleteFires,
    pullFileUrl
  } from "@/api/monitorManage/projectInfo";
  import pdf from 'vue-pdf'
  export default {
    props: ["fullScreen", "infoData", "tabIndex"],
    components: {
      pdf
    },
    computed: {
      ...mapGetters(["permissions"]),
      header() {
        return {
          Authorization: "Bearer " + store.getters.access_token
        };
      },
    },
    watch: {
      filterValue(val) {
        this.$refs.tree.filter(val);
      },
      fullScreen(val) {
        if (val) {}
      },
      tabIndex: {
        immediate: true,
        handler(val) {
          console.log(val);
          if (val == 1)
            this.getTreeData();
        }
      }
    },
    mounted() {

    },
    data() {
      return {
        filterValue: "",
        uploadUrl: baseUrl + "/file/upload",
        isUpload: true,
        tabLoading: false,
        isFtaff: false,
        showEditFileNameButton: false,
        rowId: "",
        treeId: "",
        videoFile: false,
        fileType: 0,
        fileObj: {},
        fileSrc: "",
        isMap: null,
        checkSelected: [],
        seletedIds: null, //勾选项id
        selectedFileId: null, //勾选项的文件id
        selectedFile: [], //勾选的文件信息
        form: {},
        ftaffTitle: "",
        ftaffType: "",
        ftaffForm: {},
        uploadForm: {
          type: null,
        },
        isDel: false,
        rules: {
          name: [{
            required: true,
            message: "请输入目录名称",
            trigger: "blur"
          }],
        },
        fileData: [],
        defaultProps: {
          children: "children",
          label: "label",
        },
      }
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
      getTreeData() {
        getTreeList({
          subprojectId: this.infoData.id
        }).then(res => {
          this.fileData = res.data.data
        })
      },
      nodeClick(data) {
        console.log(data);
        this.isUpload = data.parentId && !data.fileId ? false : true;
        this.uploadForm.type = data.type ? data.value : null;
        this.nodeTreeId = data.value;
        if (data.fileId) {
          pullFileUrl(data.fileId).then((res) => {
            this.fileObj = res.data.data;
            this.tabLoading = true;
            let nameType = this.fileObj ? this.fileObj.fileType : null;
            if (nameType === "mov" || nameType === "rmvb" || nameType === "mp4") {
              this.fileType = 1;
            } else if (
              nameType === "jpge" ||
              nameType === "png" ||
              nameType === "jpg" ||
              nameType === "jpg"
            ) {
              this.fileType = 2;
            } else if (
              nameType === "zip" ||
              nameType === "docx" ||
              nameType === "doc" ||
              nameType === "xlsx" ||
              nameType === "xls"
            ) {
              this.fileType = 3;
            } else if (nameType === "pdf") {
              this.fileType = 4;
            } else {
              this.fileType = null;
            }

            if (data.fileId && this.isDel == false) {
              this.fileSrc = this.fileObj.netUrl;
              // this.fileType == 3
              // ? "http://147.105.88.139:16509/luohu_file/" +
              //   encodeURIComponent(this.fileObj.relativePath): 
            } else {
              this.fileSrc = null;
            }
            this.tabLoading = false;
          });
        }
      },
      nodeSelect(data) {
        let checkSelected = this.$refs.tree.getCheckedNodes(true);
        let selectedId = [];
        this.selectedFile = [];
        let selectedFileId = [];
        this.checkSelected = checkSelected.filter((item) => {
          return !item.type;
        });
        this.checkSelected.forEach((item) => {
          selectedId.push(item.id);
          selectedFileId.push(item.value);
        });
        this.seletedIds = selectedId.join(",");
        this.selectedFileId = selectedFileId.join(",");
      },
      enter(node) {
        this.showEditFileNameButton = true;
        this.rowId = node.id;
      },
      leave() {
        this.showEditFileNameButton = false;
        this.rowId = "";
      },
      // 新增目录
      addFileBtn(type, data) {
        this.isFtaff = true;
        this.ftaffType = type;
        this.ftaffTitle = type == 3 ? "修改" : "新增";
        if (data && type == 2) {
          this.ftaffForm = {
            //   disasterId: this.hideId,
            parentId: data.value,
            name: "",
            id: "",
            type: 0,
            subprojectId: this.infoData.id
          };
        } else {
          this.ftaffForm = {
            parentId: 0,
            name: "",
            id: "",
            type: 0,
            subprojectId: this.infoData.id
          };
        }
      },
      addFileFix() {
        this.$refs["ftaffForm"].validate((valid) => {
          if (valid) {
            if (this.ftaffType == "3") {
              editFires(this.ftaffForm).then((res) => {
                if (res.data.code === 0) {
                  this.getTreeData();
                  this.$message({
                    message: "修改目录成功",
                    type: "success",
                  });
                }
              });
            } else {
              addFires(this.ftaffForm).then((res) => {
                if (res.data.code === 0) {
                  this.getTreeData();
                  this.$message({
                    message: "新增目录成功",
                    type: "success",
                  });
                }
              });
            }
          } else {
            return false;
          }
        });
        this.isFtaff = false;
      },
      //   编辑目录
      editFileBtn(type, data) {
        this.isFtaff = true;
        this.ftaffType = type;
        this.ftaffTitle = type == 3 ? "修改" : "新增";
        if (type == 3) {
          this.ftaffForm = {
            // disasterId: this.hideId,
            parentId: data.parentId,
            name: data.label,
            id: data.value,
            type: data.type,
            subprojectId: this.infoData.id
          };
        }
      },
      //   删除目录
      deleteUnit(row) {
        this.isDel = true;
        this.$confirm("确认要删除该文件吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          deleteFires(row.value).then((res) => {
            this.getTreeData();
            this.getTreeData()
            this.fileType = null;
            this.fileSrc = "";
            this.$message({
              message: "删除成功",
              type: "success",
            });
            // this.isDel = false;
          })
        });
        setTimeout(() => {
          this.isDel = false;
        }, 500);
      },
      handleClose(done) {
        this.ftaffForm = {}
        done();
      },
      clearForm() {
        this.fileType = null;
        this.videoFile = false;
        this.isUpload = true;
        this.fileSrc = "";
        this.tabLoading = false;
      },
      uploadSuccess(res, file) {
        this.uploadForm.subprojectId = this.infoData.id;
        this.uploadForm.name = res.data.infos[0].name;
        this.uploadForm.fileId = res.data.infos[0].id;
        this.uploadForm.parentId = this.nodeTreeId;
        this.uploadForm.type = 1;
        addFires(this.uploadForm).then((res) => {
          this.$message.success("上传成功！");
          this.getTreeData();
        });
      },
      beforeUpload(file) {
        let testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
        const type =
          testmsg === "zip" ||
          testmsg === "mov" ||
          testmsg === "rmvb" ||
          testmsg === "mp4" ||
          testmsg === "jpg" ||
          testmsg === "png" ||
          testmsg === "jpeg" ||
          testmsg === "docx" ||
          testmsg === "doc" ||
          testmsg === "pdf" ||
          testmsg === "xls" ||
          testmsg === "xlsx" ?
          true :
          false;
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!type) {
          this.$message.error(
            "上传只能是 zip、mp4、mov、rmvb、jpg、png、docx、doc、jpeg、xlsx、xls、pdf格式!"
          );
        }
        if (!isLt2M) {
          this.$message.error("上传文件大小不能超过 100MB!");
        }
        return type && isLt2M;
      },
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
        );
      },
    }
  }

</script>

<style lang="scss" scoped>
  .inputSearch {
    padding: 10px 0 20px;
  }

  .flex {
    display: flex;
  }

  .hide_data {
    display: flex;
    height: 100%;

    &__btn {
      margin-bottom: 5px;
    }

    &__tree {
      width: 25%;
      max-height: 60vh;
      padding-top: 3px;
    }

    &__preview {
      width: calc(75% - 10px);
      height: auto;
      margin-left: 10px;
      // max-height: 100vh;
      // overflow: hidden;
      // background: #ccc;
      padding: 5px;
      background-size: contain;
      border: 1px solid #ccc;
    }

    &__vediopreview {
      width: calc(75% - 10px);
      height: 650px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      padding: 5px;
      background-size: contain;
      border: 1px solid #ccc;
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

  .upload-demo {
    margin-right: 10px !important;
  }

  .preFile,
  .preVideoFile {
    height: 100% !important;
    width: 100% !important;
  }

  .fullScreen {
    height: 100vh !important;
  }

  .tab-loading {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tree__content {
    height: 56vh;
    overflow: auto;
  }

</style>

<style lang="scss">
  .custom-tree-node span:first-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 9vw;
    display: block;
  }

  .avue-tree .el-tree {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 55vh;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;

    .tree-btn {
      margin: 0px 5px;
    }

    .tree-btn.view {
      color: #409eff;
    }

    .tree-btn.insert {
      color: #409eff;
    }

    .tree-btn.append {
      color: #e6a23c;
    }

    .tree-btn.edit {
      color: #67c23a;
    }

    .tree-btn.delete {
      color: #f56c6c;
    }
  }

  :deep .el-select {
    width: 100%;
  }

</style>
