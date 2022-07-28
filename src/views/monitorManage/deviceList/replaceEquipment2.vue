<template>
  <div class="replaceEquipment2">
    <el-form ref="form" :model="form" label-width="80px">
      <div class="hide_data__btn flex">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
          :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed"
          :file-list="fileList" :on-success="uploadSuccess">
          <el-tooltip content="只能上传xlsx、xls文件，且不超过100MB" placement="bottom">
            <el-button size="small" type="primary">
              点击上传</el-button>
          </el-tooltip>
        </el-upload>
        <el-button @click="analysis" type="success" :disabled="isDisabled">解析文件</el-button>
        <el-button @click="mubanClick">模板下载</el-button>
      </div>
      <el-form-item style="margin-top: 50px; float: right">
        <el-button @click="close">取消</el-button>
        <el-button @click="onSubmit" type="primary">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    deviceCodeTemplate,
    changeMultipleDeviceInfoNo
  } from "@/api/monitorManage/device";
  export default {

    data() {
      return {
        form: {},
        fileList: [],
        fileData: {},
        isDisabled: true
      }
    },
    methods: {
      handleRemove(file, fileList) {
        this.isDisabled = true;
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`最多选择1个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      uploadSuccess(res, file) {
        this.fileData = file.raw
        console.log(this.fileData);
        this.isDisabled = false;
      },
      mubanClick() {
        deviceCodeTemplate().then(response => {
          let disposition = response.headers['content-disposition'].split(";")[1].split("=")[1];
          let fileName = decodeURIComponent(disposition);
          const blob = new Blob([response.data], {});
          let objectUrl = URL.createObjectURL(blob);
          let link = document.createElement("a");
          let fname = fileName;
          link.href = objectUrl;
          link.setAttribute("download", fname);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        })
      },
      analysis() {
        var formData = new FormData()
        formData.append('file', this.fileData)
        changeMultipleDeviceInfoNo(formData).then(res => {
          let disposition = res.headers['content-disposition'].split(";")[1].split("=")[1];
          let fileName = decodeURIComponent(disposition);
          const blob = new Blob([res.data], {});
          let objectUrl = URL.createObjectURL(blob);
          let link = document.createElement("a");
          let fname = fileName;
          link.href = objectUrl;
          link.setAttribute("download", fname);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        })
      },
      close() {
        this.$parent.$parent.getList();
        this.$parent.$parent.isReplaceEquipment = false;
      },
      onSubmit() {
        this.$parent.$parent.getList();
        this.$parent.$parent.isReplaceEquipment = false;

      },
    }
  }

</script>

<style lang="scss" scoped>
  .el-form {
    padding: 10px 0;
  }

  .flex {
    display: flex;
  }

  .upload-demo {
    margin-right: 10px !important;

  }

  .el-button {
    height: 32px !important;
  }

</style>
