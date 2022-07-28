<template>
  <div class="hide_data" ref="hide_data">
    <div class="hide_data__tree">
      <div class="inputSearch">
        <el-input placeholder="输入关键字进行过滤" prefix-icon="el-icon-search" v-model="input2">
        </el-input>
      </div>
      <div class="hide_data__btn flex">
        <el-upload class="upload-demo" multiple :action="uploadUrl" :headers="header" :show-file-list="false"
          :on-success="uploadSuccess" :before-upload="beforeUpload" :on-exceed="handleExceed" :disabled="isUpload">
          <el-tooltip content="只能上传mp4、JPG、PNG、JPEG、docx、doc、jpeg、xlsx、xls、pdf文件，且不超过100MB" placement="bottom">
            <el-button size="small" type="primary" :disabled="isUpload"
              v-if="permissions.JCD_detail_monitoringFolder_upload&&isEditTpl">点击上传</el-button>
          </el-tooltip>
          <!-- <div slot="tip" class="el-upload__tip">只能上传mp4、JPG、PNG、JPEG、docx、doc、jpge、xlsx、xls、pdf文件，且不超过2MB</div> -->
        </el-upload>
        <el-button type="primary" size="small" @click="addFileBtn"
          v-if="permissions.JCD_detail_monitoringFolder_dir&&isEditTpl">新增主目录</el-button>
        <!-- <el-button
          type="info"
          size="small"
          :disabled="!seletedIds"
          @click="downloadFile"
          >下载</el-button> -->
        <!-- <el-button
          type="danger"
          size="small"
          :disabled="!seletedIds"
          @click="delFile"
          >删除</el-button> -->
      </div>
      <el-tree class="tree__content" :data="fileData" default-expand-all node-key="value" ref="tree" highlight-current
        :props="defaultProps" :filter-node-method="filterNode" @node-click="nodeClick" @check-change="nodeSelect">
        <span class="custom-tree-node" slot-scope="{ node, data }" @mouseenter="enter(node)" @mouseleave="leave()">
          <span :title="node.label">{{ node.label }}</span>
          <span v-show="rowId == node.id">
            <i v-if="data.type !== 1" title="新增目录" @click="addFileBtn(2, data)"
              class="tree-btn append el-icon-folder-add">
            </i>
            <i v-if="data.type !== 1" title="编辑目录" @click="editFileBtn(3, data)"
              class="tree-btn edit el-icon-edit-outline">
            </i>
            <i :title="data.type !== 1 ? '删除目录' : '删除文件'" @click="deleteUnit(data)"
              class="tree-btn delete el-icon-delete">
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
      <!-- <iframe v-else :src="fileSrc" id="myFrame" class="preFile" onload="this.height=show.document.body.scrollHeight*20" frameborder="0" name="ifd" width="100%" scrolling="no"></iframe> -->
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
    mapGetters
  } from "vuex";
  import {
    getTree,
    addFires,
    editFires,
    deleteFires,
    pullFileUrl,
  } from "@/api/hideData";
  import {
    baseUrl
  } from "@/config/env";
  import store from "../../../store";

  export default {
    name: "hidedanger",
    props: ["mapOpenTab", "openTab", "dialogFormVisible", "fullScreen", "hideId"],
    data() {
      return {
        input2: '',
        isFtaff: false,
        showEditFileNameButton: false,
        rowId: "",
        treeId: "",
        videoFile: false,
        fileType: 0,
        fileObj: {},
        fileSrc: "",
        isUpload: true,
        tabLoading: false,
        uploadForm: {
          type: null,
        },
        uploadUrl: baseUrl + "/file/upload",
        isMap: null,
        checkSelected: [],
        seletedIds: null, //勾选项id
        selectedFileId: null, //勾选项的文件id
        selectedFile: [], //勾选的文件信息
        form: {},
        // loading: true,
        ftaffTitle: "",
        ftaffType: "",
        ftaffForm: {},
        rules: {
          name: [{
            required: true,
            message: "请输入目录名称",
            trigger: "blur"
          }],
        },
        fileData: [
          // {
          //   label: "设计资料",
          //   children: [],
          // },
          // {
          //   label: "实施资料",
          //   children: [],
          // },
          // {
          //   label: "成果资料",
          //   children: [{
          //     label: "其他",
          //     value: "13",
          //     children: [],
          //   }],
          // },
          // {
          //   label: "验收资料",
          //   children: [],
          // },
        ],
        defaultProps: {
          children: "children",
          label: "label",
        },
        option: {
          title: "我是标题",
          filterText: "搜索关键字自定义",
          defaultExpandAll: true,
          addBtn: false,
          selection: true,
          formOption: {
            labelWidth: 100,
            column: [{
              label: "自定义项",
              prop: "test",
            }, ],
          },
          props: {
            labelText: "标题",
            label: "label",
            value: "value",
            children: "children",
          },
        },
        isEditTpl: true,
      };
    },
    computed: {
      ...mapGetters(["permissions", "projectId"]),
      header() {
        return {
          Authorization: "Bearer " + store.getters.access_token
        };
      },
    },
    watch: {
      input2(val) {
        this.$refs.tree.filter(val);
      },
      dialogFormVisible(val) {
        if (val) {} else {}
      },
      openTab(val, old) {
        this.clearForm();
        if (val == 9) {
          this.isMap = false;
          this.getFileType();
          this.clearAllNodes();
        }
      },
      mapOpenTab(val) {
        this.clearForm();
        if (val == 9) {
          this.isMap = true;
          this.getFileType();
          this.clearAllNodes();
        }
      },
      fullScreen(val) {
        if (val) {}
      },
      hideId: {
        immediate: true,
        handler(val, old) {
          val = val ? val : JSON.parse(window.sessionStorage.getItem("disasterData")).id;
          if (val) {
            this.getTreeFn(val);
          }
        },
      },
    },
    mounted() {},
    created() {},
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
      enter(node) {
        this.showEditFileNameButton = true;
        this.rowId = node.id;
      },
      leave() {
        this.showEditFileNameButton = false;
        this.rowId = "";
      },
      getTreeFn(hideId) {
        hideId = hideId ?
          hideId :
          JSON.parse(window.sessionStorage.getItem("disasterData")).id;
        getTree({
          disasterId: hideId,
          projectId: this.projectId
        }).then((res) => {
          this.fileData = res.data.data;
          if (this.fileData.length > 0) {
            var new_number = 0;
            for (var i = 0; i < this.fileData.length; i++) {
              new_number++;
              if (this.fileData[i].children.length > 0) {
                for (var j = 0; j < this.fileData[i].children.length; j++) {
                  if (this.new_number != 0) {
                    break;
                  } else {
                    new_number++;
                    if (this.fileData[i].children[j].children.length > 0) {
                      for (
                        var k = 0; k < this.fileData[i].children[j].children.length; k++
                      ) {
                        new_number++;
                        if (
                          this.fileData[i].children[j].children[k].children ==
                          null
                        ) {
                          this.new_number = new_number;
                          break;
                        }
                      }
                    }
                  }
                }
                this.tree_data = 1;
              }
            }
          }
        });
      },
      handleClose(done) {
        done();
      },
      addFileBtn(type, data) {
        this.hideId = this.hideId ?
          this.hideId :
          JSON.parse(window.sessionStorage.getItem("disasterData")).id;
        this.isFtaff = true;
        this.ftaffType = type;
        this.ftaffTitle = type == 3 ? "修改" : "新增";
        if (data && type == 2) {
          this.ftaffForm = {
            disasterId: this.hideId,
            parentId: data.value,
            name: "",
            id: "",
            type: 0,
            projectId: this.projectId
          };
        } else {
          this.ftaffForm = {
            disasterId: this.hideId,
            parentId: 0,
            name: "",
            id: "",
            type: 0,
            projectId: this.projectId
          };
        }
      },
      editFileBtn(type, data) {
        this.isFtaff = true;
        this.ftaffType = type;
        this.ftaffTitle = type == 3 ? "修改" : "新增";
        if (type == 3) {
          this.ftaffForm = {
            disasterId: this.hideId,
            parentId: data.parentId,
            name: data.label,
            id: data.value,
            type: data.type,
            projectId: this.projectId
          };
        }
      },
      deleteUnit(row) {
        this.$confirm("确认要删除该文件吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          deleteFires(row.value).then((res) => {
            this.getTreeFn(this.hideId);
            this.getTreeFn(this.seletedIds)
            this.fileType = null;
            this.fileSrc = "";
            this.$message({
              message: "删除成功",
              type: "success",
            });
          });
        });
      },
      addFileFix() {
        this.$refs["ftaffForm"].validate((valid) => {
          if (valid) {
            if (this.ftaffType == "3") {
              editFires(this.ftaffForm).then((res) => {
                if (res.data.code === 0) {
                  this.getTreeFn(this.hideId);
                  this.$message({
                    message: "修改目录成功",
                    type: "success",
                  });
                }
              });
            } else {
              addFires(this.ftaffForm).then((res) => {
                if (res.data.code === 0) {
                  this.getTreeFn(this.hideId);
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
      clearAllNodes() {
        this.$refs.tree.setCheckedKeys([]);
        for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
          this.$refs.tree.store._getAllNodes()[i].expanded = true;
        }
      },
      reinitIframe() {
        var iframe = document.getElementById("myFrame");
        try {
          // var bHeight = iframe.contentWindow.document.body.scrollHeight;
          // var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
          // var height = Math.min(bHeight, dHeight);

          var iDoc = iframe.contentDocument || iframe.contentWindow.document;
          var height =
            iDoc.documentElement.clientHeight || iDoc.body.clientHeight;

          iframe.height = height + 50;
        } catch (ex) {}
      },
      clearForm() {
        this.fileType = null;
        this.videoFile = false;
        this.isUpload = true;
        this.fileSrc = "";
        this.tabLoading = false;
      },
      getFileType() {
        this.isloading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(255, 255, 255, 0.7)",
          target: this.$refs.hide_data,
        });
        this.isloading.close();

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
      uploadSuccess(res, file) {
        this.uploadForm.disasterId = this.readOnlyList = this.isMap ?
          this.$store.getters.analysisDetails.data.data.id :
          JSON.parse(window.sessionStorage.getItem("disasterData")).id;
        this.uploadForm.name = res.data.infos[0].name;
        this.uploadForm.fileId = res.data.infos[0].id;
        this.uploadForm.parentId = this.nodeTreeId;
        this.uploadForm.type = 1;
        this.uploadForm.projectId = this.projectId
        addFires(this.uploadForm).then((res) => {
          this.$message.success("上传成功！");
          this.getTreeFn(this.hideId);
        });
      },
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
        );
      },
      save(parent, data, done, loading) {
        this.$message.success("新增回调");
        this.form.id = new Date().getTime();
        this.form.value = new Date().getTime();
        this.form.children = [];
        done();
      },
      nodeClick(data) {
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
              nameType === "xls" ||
              nameType === "pdf"
            ) {
              this.fileType = 3;
            } else {
              this.fileType = null;
            }

            if (data.fileId) {
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
      delFile() {
        if (this.seletedIds) {
          this.$confirm("是否删除选定资料?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            delFiles(this.seletedIds)
              .then((res) => {
                this.$refs.tree.setCheckedKeys([]);
                this.fileSrc = "";
                this.$notify.success("删除成功");
                this.fileType = null;
              })
              .catch((err) => {
                this.$notify.error("删除失败");
              });
          });
        } else {
          this.$confirm("请选择要删除的数据!", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          });
        }
      },
      downloadFile() {
        this.checkSelected.forEach((item) => {
          let name = item.label.split(".")[0];
          let type = item.label.split(".")[1];
          const url = item.data.sysFileVO.netUrl;
          // var urls = window.URL.createObjectURL(url);
          //     var a = document.createElement('a');
          //     a.href = urls;
          //     a.download = name;
          //     a.click();
          var x = new XMLHttpRequest();
          x.open("GET", url, true);
          x.responseType = "blob";

          x.onload = function (e) {
            if (x.status == 200 && x.readyState == 4) {
              var urls = window.URL.createObjectURL(x.response);
              var a = document.createElement("a");
              a.href = urls;
              a.download = name;
              a.click();
            } else {
              this.$message.error("资源不存在!");
            }
          };
          x.send();
        });
      },
    },
  };

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
