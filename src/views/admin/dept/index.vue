<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" icon="el-icon-plus" @click="insertTopNode()"
            >新增顶级节点</el-button
          >
          <el-button type="warning" icon="el-icon-sort" @click="resetSort()"
            >重置排序</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-finished"
            @click="saveSort()"
            v-if="nodeSortChange"
          >
            保存变更
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="margin: 10px 0px 0px 0px">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="24"
          style="
            border: 1px solid #dcdfe6;
            margin-top: -2px;
            height: 600px;
            overflow-y: auto;
          "
        >
          <el-tree
            ref="tree"
            class="filter-tree"
            node-key="id"
            :data="treeData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :default-expand-all="false"
            :expand-on-click-node="false"
            :highlight-current="true"
            :empty-text="'暂无数据'"
            :lazy="true"
            :load="loadNode"
            :draggable="true"
            :allow-drop="allowDrop"
            @node-drag-start="dragStart"
            @node-drop="nodeDrop"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <i
                  title="查看详情"
                  class="tree-btn view el-icon-view"
                  @click="viewNode(node, data)"
                >
                </i>
                <i
                  v-if="deptManager_btn_add"
                  title="新增子节点"
                  class="tree-btn append el-icon-circle-plus-outline"
                  @click="appendChildrenNode(node, data)"
                >
                </i>
                <i
                  v-if="deptManager_btn_edit"
                  title="编辑节点"
                  class="tree-btn edit el-icon-edit-outline"
                  @click="editNode(node, data)"
                >
                </i>
                <i
                  v-if="deptManager_btn_del"
                  title="删除节点"
                  class="tree-btn delete el-icon-delete"
                  @click="deleteNode(node, data)"
                >
                </i>
              </span>
            </span>
          </el-tree>
        </el-col>
      </el-row>
      <el-alert
        title="拖动调整节点顺序，点击保存变更更新节点位置信息！"
        type="success"
        :closable="false"
      >
      </el-alert>
      <el-alert
        title="当部门层级较多，重置排序将会销耗大量时间，请慎用！"
        type="warning"
        :closable="false"
      >
      </el-alert>
      <el-dialog
        class="hide_dialog"
        :visible.sync="drawer"
        append-to-body
        width="45%"
      >
        <div slot="title" class="dialog-title">
          <span class="title-text" style="color:#fff;">新增子节点</span>
        </div>
        <el-card class="box-card">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :rules="rules"
            :model="form"
            ref="form"
          >
            <el-form-item label="上级Id" prop="parentId">
              <el-input
                :disabled="true"
                :readonly="true"
                v-model="form.parentId"
                placeholder="上级Id"
              ></el-input>
            </el-form-item>
            <el-form-item label="父级节点" prop="parentId">
              <el-input
                v-model="form.parentName"
                :disabled="formDisabled || 'view' == formStatus"
                :readonly="true"
                placeholder="请输入父级节点"
              ></el-input>
            </el-form-item>
            <el-form-item label="部门编号" prop="code">
              <el-input
                v-model="form.code"
                :disabled="formDisabled || 'view' == formStatus"
                :readonly="!formAdd"
                placeholder="部门编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="部门名称" prop="name">
              <el-input
                v-model="form.name"
                :disabled="'view' == formStatus"
                placeholder="请输入名称"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="排序" prop="orderNum">
              <el-input
                type="number"
                :disabled="'view' == formStatus"
                v-model="form.sort"
                placeholder="请输入排序"
              ></el-input>
            </el-form-item>
            <el-form-item v-if="formStatus == 'update'">
              <el-button type="primary" @click="update">更新 </el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
            <el-form-item v-if="formStatus == 'create'">
              <el-button type="primary" @click="create">新增 </el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-dialog>
      <!-- <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
        
      </el-drawer> -->
    </basic-container>
  </div>
</template>

<script>
import {
  addObj,
  delObj,
  lazyFetchTree,
  getObj,
  putObj,
  resetSort,
  saveSort,
} from "@/api/admin/dept";
import { mapGetters } from "vuex";

export default {
  name: "dept",
  data() {
    return {
      filterText: "",
      list: null,
      total: null,
      formAdd: false,
      formDisabled: false,
      formStatus: "",
      listQuery: {
        name: undefined,
      },
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: (data, node) => {
          if (data.hasChildren != undefined) {
            return !data.hasChildren;
          } else {
            return data.children && data.children.length == 0;
          }
        },
      },
      rules: {
        parentId: [
          { required: true, message: "请输入父级节点", trigger: "blur" },
        ],
        code: [
          {
            required: true,
            message: "请输入部门编号",
            trigger: "blur",
          },
          {
            message: "长度在 1 到 50 个大写字母小写字母或下划线",
            pattern: /^[A-Za-z0-9_]{1,50}$/,
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入部门名称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
      labelPosition: "right",
      selectedNode: {},
      treeData: [],
      drawer: false,
      form: {
        parentId: undefined,
        parentName: undefined,
        name: undefined,
        orderNum: undefined,
        parentId: undefined,
        code: undefined,
      },
      deptManager_btn_add: false,
      deptManager_btn_edit: false,
      deptManager_btn_del: false,

      dragNodePreviousSibling: {},
      dragNodeSiblingWeight: {},
      weightChangeNodes: {},
    };
  },
  created() {
    this.deptManager_btn_add = this.permissions["sys_dept_add"];
    this.deptManager_btn_edit = this.permissions["sys_dept_edit"];
    this.deptManager_btn_del = this.permissions["sys_dept_del"];
  },
  computed: {
    ...mapGetters(["elements", "permissions"]),
    nodeSortChange() {
      return Object.keys(this.weightChangeNodes).length > 0;
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    loadNode(node, resolve) {
      let parentId = 0;
      if (node.data && node.data.id) {
        parentId = node.data.id;
      }
      lazyFetchTree(parentId).then((response) => {
        resolve(response.data.data);
      });
    },
    filterNode(value, data) {
      if (!value || !data.name) return true;
      return data.name.indexOf(value) !== -1;
    },
    update() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        let loading = this.$loading();
        putObj(this.form)
          .then(() => {
            this.selectedNode.data.name = this.form.name;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000,
            });
            this.onCancel();
            loading.close();
          })
          .catch((e) => {
            this.onCancel();
            loading.close();
          });
      });
    },
    create() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        let loading = this.$loading();
        addObj(this.form)
          .then((response) => {
            let data = response.data.data;
            let newNodeData = {
              id: data.deptId,
              name: this.form.name,
              parentId: data.parentId,
              children: [],
              hasChildren: false,
              details: data,
            };
            if (data.parentId != 0) {
              this.$refs.tree.append(newNodeData, data.parentId);
              let parentNode = this.$refs.tree.getNode(data.parentId);
              parentNode.isLeafByUser = false;
              parentNode.loaded = true;
              if (!parentNode.expanded) {
                parentNode.expanded = true;
              }
            } else {
              this.$refs.tree.append(newNodeData, this.selectedNode);
            }
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000,
            });
            this.onCancel();
            loading.close();
          })
          .catch(() => {
            this.onCancel();
            loading.close();
          });
      });
    },
    onCancel() {
      this.drawer = false;
      this.formStatus = "";
    },
    getParentNode(node) {
      if (node.parent) {
        return node.parent;
      } else {
        return this.$refs.tree.getNode(node);
      }
    },
    allowDrop(draggingNode, dropNode, type) {
      if (
        draggingNode.data.parentId == dropNode.data.parentId &&
        type != "inner"
      ) {
        return true;
      } else {
        return false;
      }
    },
    dragStart(node, event) {
      this.dragNodePreviousSibling = Object.assign({}, node.previousSibling);
      let siblingNodes = this.getParentNode(node).childNodes;
      console.log(siblingNodes);
      for (let i = 0, len = siblingNodes.length; i < len; i++) {
        let id = siblingNodes[i].data.id;
        if (!this.dragNodeSiblingWeight[id]) {
          this.$set(this.dragNodeSiblingWeight, id, i + 1);
        }
      }
    },
    nodeDrop(node, targetNode, type, event) {
      let siblingNodes = this.getParentNode(targetNode).childNodes;
      let indexOf = (node) => {
        for (let i = 0, len = siblingNodes.length; i < len; i++) {
          if (siblingNodes[i].data.id == node.data.id) {
            return i;
          }
        }
        return -1;
      };
      if (type == "before") {
        //往前
        let start = indexOf(node);
        let end = node.nextSibling
          ? indexOf(node.nextSibling) + 1
          : siblingNodes.length;
        for (let i = start, len = end; i < len; i++) {
          let n = siblingNodes[i];
          let id = n.data.id;
          let sort = indexOf(n) + 1;
          if (this.dragNodeSiblingWeight[id] != sort) {
            this.$set(this.weightChangeNodes, id, sort);
          } else {
            this.$delete(this.weightChangeNodes, id);
          }
        }
      } else if (type == "after") {
        //往后
        let start = this.dragNodePreviousSibling
          ? indexOf(this.dragNodePreviousSibling)
          : 0;
        let end = indexOf(node) + 1;
        for (let i = start, len = end; i < len; i++) {
          let n = siblingNodes[i];
          let id = n.data.id;
          let sort = indexOf(n) + 1;
          if (this.dragNodeSiblingWeight[id] != sort) {
            this.$set(this.weightChangeNodes, id, sort);
          } else {
            this.$delete(this.weightChangeNodes, id);
          }
        }
      }
    },
    resetSort() {
      this.$confirm(
        "此操作在部门层级较多时，会消耗大量时间，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        let loading = this.$loading();
        resetSort(0)
          .then(() => {
            this.$notify({
              title: "成功",
              message: "重置成功",
              type: "success",
              duration: 2000,
            });
            loading.close();
          })
          .catch((e) => {
            this.onCancel();
            loading.close();
          });
      });
    },
    saveSort() {
      let loading = this.$loading();
      saveSort(this.weightChangeNodes)
        .then(() => {
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success",
            duration: 2000,
          });
          loading.close();
        })
        .catch((e) => {
          this.onCancel();
          loading.close();
        });
    },
    viewNode(node, data) {
      this.drawer = true;
      this.formStatus = "view";
      let details = data.details;
      if (details.parentId == 0) {
        details.parentName = "顶级";
      } else {
        let parentNode = this.$refs.tree.getNode(details.parentId);
        details.parentName = parentNode.data.name;
      }
      this.form = details;
      this.currentId = details.id;
    },
    editNode(node, data) {
      this.drawer = true;
      this.formAdd = false;
      this.formDisabled = true;
      this.formStatus = "update";
      this.selectedNode = node;
      let details = data.details;
      if (details.parentId == 0) {
        details.parentName = "顶级";
      } else {
        let parentNode = this.$refs.tree.getNode(details.parentId);
        details.parentName = parentNode.data.name;
      }
      this.form = details;
    },
    insertTopNode() {
      this.drawer = true;
      this.form = {
        parentName: "顶级",
        parentId: 0,
      };
      this.formAdd = true;
      this.formDisabled = false;
      this.formStatus = "create";
      this.selectedNode = undefined;
    },
    appendChildrenNode(node, data) {
      this.drawer = true;
      this.formAdd = true;
      this.formDisabled = false;
      this.formStatus = "create";
      this.selectedNode = node;

      this.form.parentId = node.data.id;
      this.form.parentName = node.data.name;
      this.form.code = "";
      this.form.name = "";
      this.form.sort = 1;
    },
    deleteNode(node, data) {
      this.$confirm(
        "此操作将永久删除部门:" + data.name + ", 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        let loading = this.$loading();
        delObj(data.id)
          .then(() => {
            this.$refs.tree.remove(data.id);
            this.onCancel();
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });
            loading.close();
          })
          .catch(() => {
            loading.close();
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
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
</style>
