
<template>
    <div class="user">
        <basic-container>
            <avue-crud
                :option="option"
                ref="crud"
                v-model="form"
                :page="page"
                :upload-preview="uploadPreview"
                :upload-before="uploadBefore"
                :upload-error="uploadError"
                :upload-exceed="uploadExceed"
                @on-load="getList"
                @size-change="sizeChange"
                @current-change="currentChange"
                @search-change="handleFilter"
                @search-reset="handlereset"
                @refresh-change="handleRefreshChange"
                @row-save="handleSave"
                @row-update="handleUpdate"
                :table-loading="listLoading"
                :data="list"
                @selection-change="selectionChange"
            >
                <!-- <template slot-scope="{ row }" slot="inputForm">
                    <el-tag>{{ row }}</el-tag>
                </template> -->
                <template slot="headUrlForm">
                    <el-upload
                        :disabled="rowView"
                        v-model="form.headUrl"
                        class="avatar-uploader"
                        :action="baseUrlLoad"
                        list-type="picture-list"
                        :headers="headers"
                        :limit="1"
                        :on-remove="handleRemove"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        v-loading="loading"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">
                            只能上传JPG、PNG、JPEG文件
                        </div>
                    </el-upload>
                </template>
                <template slot="menuLeft">
                    <el-button
                        class="filter-item"
                        @click="handleCreate"
                        type="primary"
                        icon="el-icon-plus"
                        v-if="permissions.generator_qcqfperson_add"
                        >新增
                    </el-button>
                    <!-- <el-button
                        class="filter-item"
                        @click="handleExcel"
                        type="primary"
                        icon="el-icon-download"
                        >导出
                    </el-button>
                    <el-button
                        class="filter-item"
                        @click="handleImport"
                        type="primary"
                        icon="el-icon-upload"
                        >导入</el-button
                    > -->
                    <el-button
                        class="filter-item"
                        @click="handleDel"
                        type="danger"
                        icon="el-icon-delete"
                        v-if="permissions.generator_qcqfperson_del"
                        >批量删除</el-button
                    >
                </template>
                <template slot="menu" slot-scope="scope">
                    <el-button
                        size="small"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleEdit"
                        v-if="permissions.generator_qcqfperson_edit"
                        >编辑
                    </el-button>
                    <el-button
                        @click="handleView(scope.row, scope.index)"
                        icon="el-icon-view"
                        class="none-border"
                        size="small"
                        type="text"
                        >查看</el-button
                    >
                    <!-- <el-button
                        @click="handleAddUser(scope.row, scope.index)"
                        class="none-border"
                        size="small"
                        type="text"
                        >添加用户</el-button
                    > -->
                </template>
            </avue-crud>
            <el-dialog
                title="添加用户"
                :visible.sync="dialogVisible"
                @closed="handleClose"
                append-to-body
                width="40%"
            >
                <avue-form
                    ref="userForm"
                    v-model="userForm"
                    :option="userOption"
                    @submit="addUserSave"
                    @reset-change="resetChange"
                >
                    <template slot="deptId">
                        <div>
                            <el-cascader
                                ref="deptCascader"
                                placeholder="请选择职务"
                                v-model="cascaderCurrentValue"
                                :props="deptCascaderProps"
                                @change="setDeptId"
                            ></el-cascader>
                        </div>
                    </template>
                </avue-form>
            </el-dialog>
        </basic-container>
    </div>
</template>

<script>
import {
    fetchList,
    addObj,
    putObj,
    delObj,
    getFile,
    addUser,
    getUser,
} from "@/api/prevention/preventMag";
import { lazyFetchTree } from "@/api/admin/dept";
import { tableOption, userOption } from "@/const/crud/prevention/inspectMan";
import { mapGetters } from "vuex";
import store from "@/store";
import { baseUrl } from "@/config/env";
import { Loading } from "element-ui";
export default {
    name: "table_user",
    data() {
        return {
            baseUrlLoad: baseUrl + "file/upload",
            searchForm: {},
            option: tableOption,
            userOption: userOption,
            checkedKeys: [],
            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 20, // 每页显示多少条,
                isAsc: false, //是否倒序
            },
            userForm: {},
            list: [],
            listLoading: true,
            loading: false,
            form: {
                headUrl: "",
            },
            colorChange: false,
            imageUrl: null,
            rowView: false,
            dialogVisible: false,
            gridPersonnelId: "",
            cascaderCurrentValue: [],
            deptCascaderProps: {
                label: "name",
                value: "id",
                multiple: false,
                checkStrictly: true,
                filterable: true,
                emitPath: false,
                lazy: true,
                lazyLoad(node, resolve) {
                    let parentId = 0;
                    if (node.data && node.data.id) {
                        parentId = node.data.id;
                    }
                    lazyFetchTree(parentId, true).then((response) => {
                        let nodes = new Array();
                        let datas = response.data.data;
                        datas.forEach((el) => {
                            el.leaf = !el.hasChildren;
                            nodes.push(el);
                        });
                        resolve(nodes);
                    });
                },
            },
            // option1: {
            //   index: true,
            //   indexLabel: "序号",
            //   page: false,
            //   align: "center",
            //   menuAlign: "center",
            //   column: [
            //     {
            //       label: "姓名",
            //       prop: "name",
            //     },
            //     {
            //       label: "性别",
            //       prop: "sex",
            //     },
            //   ],
            // },
        };
    },
    computed: {
        ...mapGetters(["permissions"]),
        headers: function () {
            return { Authorization: "Bearer " + store.getters.access_token };
        },
    },
    watch: {},
    created() {},
    methods: {
        getList(page, params) {
            this.listLoading = true;
            fetchList(
                Object.assign(
                    {
                        current: page.currentPage,
                        size: page.pageSize,
                        "orders[0].column": "create_time",
                        "orders[0].asc": false,
                    },
                    {
                        type: 2,
                    },
                    params,
                    this.searchForm
                )
            ).then((response) => {
                response.data.data.records.forEach((item) => {
                    item.streetCode *= 1;
                    item.communityCode *= 1;
                });
                this.list = response.data.data.records;
                this.page.total = response.data.data.total;
                this.listLoading = false;
            });
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
        // 新增提交
        handleSave: function (row, done) {
            row.streetName = row.$streetCode;
            row.communityName = row.$communityCode;
            addObj(Object.assign(this.form, row, { type: 2 })).then((data) => {
                this.$message.success("添加成功");
                this.handleRefreshChange();
                this.imageUrl = null;
                done();
            });
        },
        // 编辑提交
        handleUpdate: function (row, index, done) {
            row.streetName = row.$streetCode;
            row.communityName = row.$communityCode;
            putObj(Object.assign(this.form, row, { type: 2 })).then((data) => {
                this.$message.success("修改成功");
                this.handleRefreshChange();
                this.imageUrl = null;
                done();
            });
        },
        //新增用户
        handleAddUser(row) {
            this.gridPersonnelId = row.id;
            // this.dialogVisible = true;
            getUser({
                userId: row.accountId ? row.accountId : "0",
            }).then((res) => {
                if (res.data) {
                    setTimeout(() => {
                        this.cascaderCurrentValue = res.data.data.deptId;
                    }, 300);
                    if (res.data.data.password) {
                        this.userOption.column[1].display = false;
                    }
                    this.userForm = res.data.data;
                } else {
                    this.userOption.column[1].display = true;
                }
                this.dialogVisible = true;
            });
        },
        addUserSave(form, done) {
            addUser({
                gridPersonnelType: 2,
                gridPersonnelId: this.gridPersonnelId
                    ? this.gridPersonnelId
                    : "0",
                userDTO: form,
            }).then((res) => {
                if (res.data.code == "0") {
                    this.$notify.success(res.data.data);
                }
                this.dialogVisible = false;
                done();
                this.getList(this.page);
            });
        },
        handleClose() {
            this.$refs.userForm.resetForm();
            this.cascaderCurrentValue = [];
            this.dialogVisible = false;
        },
        setDeptId(value) {
            this.userForm.deptId = value;
        },
        resetChange() {
            this.cascaderCurrentValue = [];
        },

        // 导出
        handleExcel() {},

        // 新增
        handleCreate() {
            this.form.headUrl = "";
            this.imageUrl = null;
            this.rowView = false;
            this.$refs.crud.rowAdd();
        },

        // 编辑
        handleEdit(row, index) {
            if (row.headUrl) {
                getFile(row.headUrl).then((res) => {
                    this.imageUrl = res.data.data[0].netUrl;
                });
            } else {
                this.imageUrl = "";
            }
            this.rowView = false;
            this.$refs.crud.rowEdit(row, index);
        },

        // 查看
        handleView(row, index) {
            if (row.headUrl) {
                getFile(row.headUrl).then((res) => {
                    this.imageUrl = res.data.data[0].netUrl;
                });
            } else {
                this.imageUrl = "";
            }
            this.rowView = true;
            this.$refs.crud.rowView(row, index);
        },
        handleDel() {
            let idList = this.getSelectionDataId();
            if (idList.length == 0) {
                this.$message.warning("请选择需要删除的数据");
                return;
            }
            this.$confirm("是否确认删除当前选中的数据？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(function () {
                    return delObj({ idList: idList.join() });
                })
                .then((data) => {
                    this.$message.success("删除成功");
                    this.$refs.crud.selectClear();
                    this.getList(this.page);
                });
        },
        handleRemove() {
            this.imageUrl = "";
            this.form.headUrl = "";
        },

        // 导出
        handleExport() {},
        // 导入
        handleImport() {},

        handleAvatarSuccess(res, file) {
            getFile(res.data.infos[0].id).then((res) => {
                this.imageUrl = res.data.data[0].netUrl;
            });
            this.form.headUrl = res.data.infos[0].id;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG) {
                this.$message.error("上传头像图片只能是 JPG 或者PNG 格式!");
            }
            return isJPG || isPNG;
        },
        sizeChange(pageSize) {
            this.page.pageSize = pageSize;
        },
        currentChange(current) {
            this.page.currentPage = current;
        },
        handleFilter(form, done) {
            this.searchForm = form;
            this.page.currentPage = 1;
            this.getList(this.page, form);
            done();
        },
        handlereset(form) {
            this.searchForm = form;
            this.page.currentPage = 1;
            this.getList(this.page, form);
        },
        handleRefreshChange() {
            this.getList(this.page);
        },
        uploadBefore(file, done, loading, column) {
            let name = file.name.split(".");
            let extension = name[name.length - 1];
            if (
                ["jpeg", "png", "jpg"].findIndex(
                    (item) => item == extension
                ) === -1
            ) {
                this.$message.warning("只能上传拓展名为：png、jpg、jpeg的文件");
                //   return false
                done();
            }
            this.$message.success("上传前的方法");
        },
        uploadError(error, column) {
            this.$message.success("上传失败");
        },
        uploadPreview(file, column, done) {
            done(); //默认执行打开方法
        },
        uploadExceed(limit, files, fileList, column) {
            console.log(limit, files, fileList, column);
        },
    },
};
</script>

<style lang="scss" scoped>
.user {
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
.avatar-uploader ::v-deep.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
::v-deep.avatar-uploader ::v-deep.el-upload:hover {
    border-color: #409eff;
}
::v-deep.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
::v-deep.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>


