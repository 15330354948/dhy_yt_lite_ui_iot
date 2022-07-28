<template>
  <div class="doRangeMap">
    <el-row class="map_div">
      <el-col :span="9">
        <div class="curd_btn">
          <!-- <el-button
            v-if="permissions.generator_disasterrange_add"
            class="filter-item"
            @click="handleCreate"
            type="primary"
            icon="el-icon-document-add"
            >新增
          </el-button> -->
          <!-- v-if="permissions.generator_disasterrange_del && btnBoxShow" -->
          <el-button
            v-if="btnBoxShow"
            class="filter-item"
            @click="handleDel"
            type="danger"
            icon="el-icon-delete"
            >批量删除
          </el-button>
        </div>

        <div>
          <el-table
            :data="tableData"
            @selection-change="handleSelectionChange"
            tooltip-effect="dark"
            labelWidth="100"
            class="table_data"
            :border="tableBorder"
            ref="multipleTable"
            style="width: 100%"
          >
            <el-table-column type="selection" width="30"> </el-table-column>
            <el-table-column type="index" width="50" label="序号">
            </el-table-column>
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="type" label="类型" width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 0"> 隐患范围 </span>
                <span v-if="scope.row.type == 1"> 主滑方向 </span>
                <span v-if="scope.row.type == 2"> 影响范围 </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80" v-if="btnBoxShow">
              <template slot-scope="scope">
                <!-- <i class="el-icon-edit iconT" @click="editFun(scope.row)"></i> -->
                <!-- v-if="permissions.generator_disasterrange_del" -->
                <i
                  class="el-icon-delete iconT"
                  @click="deleteFun(scope.row)"
                ></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="mapShow">
          <!-- 地图 -->
          <div class="MapRange">
            <map-com ref="       "></map-com>
          </div>
          <!-- 绘制工具 -->
          <div class="toolBox" v-if="btnBoxShow">
            <div class="box-line"></div>
            <div
              class="box-btn"
              :class="currentBtn == 1 ? 'btn-active' : ''"
              @click="drawHandler(1)"
            >
              <img :src="require('@/assets/img/plane/bianjie.png')" alt="" />
              <div>隐患范围</div>
            </div>
            <div
              class="box-btn"
              :class="currentBtn == 2 ? 'btn-active' : ''"
              @click="drawHandler(2)"
            >
              <img :src="require('@/assets/img/plane/fangxiang.png')" alt="" />
              <div>主滑方向</div>
            </div>
            <div
              class="box-btn"
              :class="currentBtn == 3 ? 'btn-active' : ''"
              @click="drawHandler(3)"
            >
              <img :src="require('@/assets/img/plane/quyu.png')" alt="" />
              <div>影响范围</div>
            </div>
            <div
              class="box-btn"
              :class="currentBtn == 5 ? 'btn-active' : ''"
              @click="drawHandler(5)"
              v-show="drawing"
            >
              <img :src="require('@/assets/img/plane/quxiao.png')" alt="" />
              <div>结束绘制</div>
            </div>
          </div>
          <!-- 属性参数 -->
          <div class="attr-box" ref="attrbox" v-if="attrboxShow">
            <div class="attr-header" @mouseup="mouseup" @mousedown="mousedown">
              属性
              <i class="attr-close el-icon-close" @click="closeAttrBox"></i>
            </div>
            <div class="attr-contant">
              <div class="attr-row">
                <span>名称</span>
                <el-input v-model="attrData.name" placeholder="请输入名称"></el-input>
              </div>
              <div class="attr-row" v-if="currentBtn!==2">
                <span>线型</span>
                <div class="attr-row-rbox">
                  <el-radio v-model="attrData.lineType" :label="0">实线</el-radio>
                  <el-radio v-model="attrData.lineType" :label="1">虚线</el-radio>
                </div>
              </div>
              <div class="attr-row">
                <span style="padding-right: 10px">颜色</span>
                <colorPicker v-model="attrData.color"></colorPicker>
              </div>
              <div class="attr-row">
                <span style="padding-right: 10px">线宽</span>
                <input class="line-width" type="number" v-model.number="attrData.lineWidth"/>
              </div>
            </div>
            <div class="attr-footer">
              <el-button type="primary" size="mini" @click="submitAttr">提交</el-button>
              <el-button type="success" size="mini" @click="redraw">重绘</el-button>
            </div>
          </div>
          <!-- 提示框 -->
          <transition name="slide-fade">
            <div class="tip" v-if="tipShow" v-show="drawing">
              <div class="close" @click="closeTip">x</div>
              <p>单击鼠标左键确定位置</p>
              <p>单击鼠标右键取消绘制</p>
            </div>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deepClone, colorHex } from "@/util/util";
export default {
  name: "doRangeMap",
  props: ["scopeDatas", "drawTools"],
  data() {
    return {
      hideDangerData: {},
      tableData: [],
      tableBorder: true,
      currentBtn: 0,
      btnBoxShow: false, //绘制工具显隐
      tipShow: true, //提示框显隐
      attrboxShow: false, //属性参数显隐
      arrowAttrboxShow: false, //属性参数显隐
      drawing: false,
      editData: "",
      attrData: {
        name: "",
        type: 1,
        lineType: 0,
        color: "#ffff00",
        lineWidth: 20,
      },
      choiseData: [], //列表选中数据
      path: [],
      points: [],
      pathArry: [],
      directionPaths: [],
    };
  },
  created() {
    this.hideDangerData = JSON.parse(
      window.sessionStorage.getItem("disasterData")
    );
  },
  watch:{
    "drawTools": {
      immediate: true,
      handler(val,oVal){
        this.btnBoxShow = val
      }
    },
    "scopeDatas":{
      immediate: true,
      handler(newX, oldY){
        if(newX.disasterScopeDatas && newX.disasterScopeDatas.length>0){
          this.tableData = newX.disasterScopeDatas
        }
      }
    },
    "attrData": {
      handler(val) {
        if (!this.attrboxShow) return;
        if (val.lineType == 0) {
          this.mapFunc.deletePointLineLayer({ line: true });
          let path = deepClone(this.points);
          path.push(this.points[0]);
          this.mapFunc.darwRangeLine(path, val);
        } else if (val.lineType == 1) {
          this.mapFunc.deletePointLineLayer({ line: true });
          let path = deepClone(this.points);
          path.push(this.points[0]);
          this.mapFunc.darwRangeLine(path, val);
        } else {
          this.mapFunc.deletePointLineLayer({ arrow: true });
          this.mapFunc.ArrowsPoint(
            this.directionPaths,
            val
          );
        }
      },
      deep: true,
    }
  },
  computed: {
    ...mapGetters(["permissions"]),
  },
  mounted() {
    setTimeout(() => {
      this.handleCreate();
      this.mapFunc.goView({
        longitude: this.hideDangerData.longitude,
        latitude: this.hideDangerData.latitude,
        height: 1000,
        preMinus: 0.001,
      });
      this.mapFunc.deletePointLineLayer({ arrow: true });
      this.drawLine()
    }, 500);
  },
  methods: {
    drawLine() {
      this.tableData.forEach(tabs=>{
        tabs.disasterRangeLatLonDTOList = tabs.longitudeLatitudeAltitude && JSON.parse(tabs.longitudeLatitudeAltitude)
        if (tabs.lineType == 2) {
          this.directionPaths = tabs.disasterRangeLatLonDTOList;
        }
      })
      this.tableData.forEach((e) => {
        if (e.lineType == 0) {
          e.disasterRangeLatLonDTOList.push(e.disasterRangeLatLonDTOList[0]);
          this.mapFunc.darwRangeLine(e.disasterRangeLatLonDTOList, e);
        } else if (e.lineType == 1) {
          e.disasterRangeLatLonDTOList.push(e.disasterRangeLatLonDTOList[0]);
          this.mapFunc.darwRangeLine(e.disasterRangeLatLonDTOList, e);
        } else {
          this.mapFunc.ArrowsPoint( e.disasterRangeLatLonDTOList, e);
        }
      });
    },
    /**
     * @description: 删除列表某条数据
     * @param {*} row 当前列数据
     */
    deleteFun(row) {
      this.$confirm("确定该数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData = this.tableData.filter(item=>{
            return item.name !== row.name
          })
          this.mapFunc.removeRangeLine(row.name)
          this.$emit("getDrawLayerData", {
            layData: this.tableData,
            rowCallback: this.scopeDatas
          });
          this.drawLine();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    /** @description: 多选删除事件*/
    handleDel() {
      this.$confirm("确定选中数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.choiseData.forEach((e) => {
            this.mapFunc.removeRangeLine(e.name)
            this.tableData = this.tableData.filter(item=>{
              return item.name !== e.name
            })
          });
          this.$emit("getDrawLayerData", {
            layData: this.tableData,
            rowCallback: this.scopeDatas
          });
          this.drawLine();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    /**
     * @description: 列表编辑事件
     * @param {*} row 当前列数据
     */
    editFun(row) {
      this.CompositeEvent();
      this.editData = row;
      this.path = [];
      this.points = [];
      if (row.lineType == 0) {
        row.disasterRangeLatLonDTOList.forEach((e) => {
          this.path.push(e.longitude, e.latitude);
        });
      } else {
        this.directionPaths = row.disasterRangeLatLonDTOList;
      }

      this.attrData = {
        color: row.color,
        name: row.name,
        lineWidth: row.lineWidth,
        linetype: row.lineType,
      };
      this.attrboxShow = true;
    },

    /** @description: 列表新增事件*/
    handleCreate() {
      this.CompositeEvent();
    },

    /** @description: 表格勾选事件*/
    handleSelectionChange(data) {
      this.choiseData = data;
    },

    /**提交函数*/
    submitAttr() {
      if (this.attrData.name && this.attrData.lineWidth) {
        //检查线宽度和名字是否已经输入
        let disasterRangeLatLonDTOList = [];
        if ( this.currentBtn == 1 || this.currentBtn == 3) {
          this.points.forEach((e, i) => {
            disasterRangeLatLonDTOList.push({
              sort: i,
              longitude: e.longitude,
              latitude: e.latitude,
              altitude: e.height,
            });
          });

        } else {
          this.directionPaths.forEach((e, i) => {
            disasterRangeLatLonDTOList.push({
              sort: i,
              longitude: e.longitude,
              latitude: e.latitude,
              altitude: e.height,
            });
          });
        }

        let data = this.attrData;
        data.disasterId = this.hideDangerData.id;
        data.disasterRangeLatLonDTOList = disasterRangeLatLonDTOList;
        this.tableData.push(data)
        this.attrboxShow = false;
        this.$message({
          type: "success",
          message: "新增成功",
        });
        this.$emit("getDrawLayerData", {
          layData: this.tableData,
          rowCallback: this.scopeDatas
        });
        this.CompositeEvent();
        this.drawLine();
      } else {
        this.$message("请输入名称和边线宽度");
        return;
      }
    },

    /** @description: 重绘*/
    redraw() {
      if (this.editData) {
        this.attrboxShow = false; //关闭弹窗
        this.btnBoxShow = true; //打开右侧菜单
        this.drawing = true;
        this.points = [];
        this.directionPaths = [];
        if (this.editData.lineType == 0) {
          this.mapFunc.monomerFun(this.drawPoint, this.drawconfirem);
        } else {
          this.mapFunc.monomerFun(this.directionPoint, this.drawconfirem);
        }
        return;
      }
      if (this.currentBtn == 1) {
        this.drawconfirem();
        this.drawing = true;
      } else if (this.currentBtn == 2) {
        this.mapFunc.deletePointLineLayer({
          arrow: true,
        });
        this.attrboxShow = false;
        this.drawing = true;
        this.directionPaths = [];
        this.drawHandler(2);
      }
    },

    /**@description: 关闭弹窗*/
    closeAttrBox() {
      this.btnBoxShow = true;
      if (this.editData) {
        //判断是否是编辑
        this.mapFunc.deletePointLineLayer({
          point: true,
          line: true,
          MapEvent: true,
          arrow: true,
        });
        this.btnBoxShow = false;
        this.drawLine();
      } else {
        if (this.currentBtn == 1) {
          this.mapFunc.monomerFun(this.drawPoint, this.drawconfirem);
          this.drawing = true;
        } else if (this.currentBtn == 2) {
          this.directionPaths = [];
          this.currentBtn = false;
          this.drawing = false;
          this.mapFunc.deletePointLineLayer({
            MapEvent: true,
            arrow: true,
          });
          this.drawLine();
        }
      }
      this.attrboxShow = false;
    },

    // @description: 关闭绘制工具
    closeTip() {
      this.tipShow = false;
    },

    // 绘制开始
    drawHandler(val) {
      if (val == 5) {
        //结束绘制
        if (this.points.length < 3) {
          this.$message("绘制点数过少");
          return;
        }
        this.attrboxShow = true;
        this.drawing = false;
        this.$set(this.attrData, "path", this.path);
        this.mapFunc.deletePointLineLayer({ MapEvent: true });
      } else {
        this.currentBtn = val;
        this.drawing = true;
      }

      this.mapFunc.deletePointLineLayer({
        line: true,
        point: true,
        arrow: true,
      });
      window.viewer.scene.requestRenderMode = false;
      if (val == 1) {
        this.$message("鼠标移动选择范围，单击确认范围");
        this.points = [];
        this.attrData = {
          name: "", // 名称
          type: 0, // 图形 线、箭头
          lineType: 0, //范围 虚线、实线
          color: "#ff0000", //描边颜色
          lineWidth: 10, //描边线条大小
        };
        this.mapFunc.monomerFun(this.drawPoint, this.drawconfirem);
      } else if (val == 2) {
        this.attrData = {
          name: "", // 名称
          type: 1, // 图形 线、箭头
          lineType: 2, //范围 虚线、实线
          color: "#ff0000", //描边颜色
          lineWidth: 10, //描边线条大小
        };
        this.mapFunc.monomerFun(this.directionPoint, this.drawconfirem);
      } else if (val == 3) {
        this.points = [];
        this.attrData = {
          name: "", // 名称
          type: 2, // 图形 线、箭头
          lineType: 0, //范围 虚线、实线
          color: "#ff0000", //描边颜色
          lineWidth: 10, //描边线条大小
        };
        this.mapFunc.monomerFun(this.drawPoint, this.drawconfirem);
      }
    },
    /**
     * @description: 地图单击返回事件
     * @param {*} value 地图返回数据
     */
    drawPoint(value) {
      this.points.push(value.mapPoint);
      this.mapFunc.monomerRemove(1, false); //移除

      let n = this.points.length;
      if (n == 1) {
        this.mapFunc.deletePointLineLayer({ line: true });
        this.mapFunc.skimSpot({
          longitude: value.mapPoint.longitude,
          latitude: value.mapPoint.latitude,
        });
        this.$message("请点击第 二 个点");
      } else if (n == 2) {
        this.mapFunc.darwRangeLine( deepClone(this.points), this.attrData );
      } else {
        let closePath = deepClone(this.points);
        closePath.push(this.points[0]);
        this.mapFunc.deletePointLineLayer({ line: true });
        this.mapFunc.darwRangeLine( closePath, this.attrData );
      }
    },
    directionPoint(value) {
      this.directionPaths.push(value.mapPoint);
      if (this.directionPaths.length == 1) {
        this.mapFunc.deletePointLineLayer({ arrow: true });
        this.mapFunc.skimSpot({
          longitude: value.mapPoint.longitude,
          latitude: value.mapPoint.latitude,
        });
        this.$message("请点击第 二 个点");
      } else {
        this.drawing = false;
        this.mapFunc.deletePointLineLayer({ MapEvent: true, point: true });

        this.attrboxShow = true;
        this.mapFunc.ArrowsPoint(
          this.directionPaths,
          this.attrData
        );
      }
    },
    drawDottedLine(value) {},
    /** @description: 地图右击返回事件*/
    drawconfirem() {
      this.CompositeEvent();
      setTimeout(() => {
        this.drawLine();
      }, 1000);
    },
    /**
     * @description: 综合取消事件
     */
    CompositeEvent() {
      this.directionPaths = [];
      this.points = [];
      this.attrboxShow = false; //关闭弹窗
      this.currentBtn = false; //取消右侧勾选
      this.drawing = false;
      //移除地图点、线、左右键点击事件
      this.mapFunc.deletePointLineLayer({
        point: true,
        line: true,
        MapEvent: true,
        arrow: true,
      });
    },
    /**往下三个函数均为弹窗相关函数 */
    /**函数一 */
    mouseup(e) {
      document.removeEventListener("mousemove", this.mousemove);
      document.onselectstart = function () {
        return true;
      };
    },
    /**函数二 */
    mousedown(e) {
      this.startX = e.pageX;
      this.startY = e.pageY;
      this.xX = this.$refs.attrbox.offsetLeft;
      this.yY = this.$refs.attrbox.offsetTop;
      document.onselectstart = function () {
        return false;
      };
      document.addEventListener("mousemove", this.mousemove);
    },
    /**函数三 */
    mousemove(e) {
      var str = {
        moveX: e.pageX - this.startX,
        moveY: e.pageY - this.startY,
      };
      this.$refs.attrbox.style.left = this.xX + str.moveX + "px";
      this.$refs.attrbox.style.top = this.yY + str.moveY + "px";
    },
    directionClick() {},
  },
};
</script>

<style lang="scss" scoped>

.doRangeMap {
  height: 100%;
  > div {
    height: 100%;
    > div:nth-child(2) {
      height: 100%;
    }
  }
}
.mapShow {
  width: 100%;
  height: 100%;

  .MapRange {
    width: 100%;
    height: 100%;
    min-height: 450px;
    position: relative;

    // background: gray;
  }
  .toolBox {
    position: absolute;
    top: 20px;
    right: 10px;
    width: 65px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 3px;
  }
}
.map_div {
  display: flex;
  justify-content: space-between;
  .map_container {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .el-col-9 {
    width: 39%;
    margin-right: 1%;
  }
  .el-col-14 {
    width: 60%;
  }
}
.map_div.el-row::before {
  display: block;
}
.curd_btn {
  margin-bottom: 20px;
}
.table_data {
  ::v-deep.cell {
    text-align: center;
  }
}

.iconT {
  font-size: 15px;
  cursor: pointer;
  color: #409eff;
}
.box-line {
  height: 1px;
  margin: 0 5px;
  background-color: #ffffff66;
}
.box-btn {
  margin: 2px auto;
  padding: 4px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;

  img {
    width: 25px;
    height: 25px;
  }
}
.btn-active,
.box-btn:hover {
  background: #238bf180;
}
.tip {
  line-height: 6px;
  font-size: 10px;
  border-radius: 4px;
  padding: 0 8px;
  padding-right: 18px;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  left: calc(50% - 86px);
  box-shadow: 0px 0px 2px 1px #ffffff66;
  z-index: 10;
  top: 5px;

  .close {
    text-align: center;
    width: 12px;
    height: 12px;
    position: absolute;
    border-radius: 10px;
    line-height: 8px;
    background: #999;
    cursor: pointer;
    color: #000;
    right: 2px;
    top: calc(50% - 5px);
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.3, 0.6, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.attr-box {
  position: fixed;
  top: 20vh;
  left: 40vw;
  width: 200px;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0px 2px 5px 3px #00000020;
  z-index: 1000;

  .attr-header {
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    color: #238bff;
    background: #00000010;
    cursor: move;

    .attr-close {
      display: inline-block;
      float: right;
      margin-top: 5px;
      padding: 2px;
      cursor: pointer;
      color: #555;
    }
  }

  .attr-contant {
    .attr-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 10px;
      font-size: 14px;

      ::v-deep.el-input {
        height: 20px !important;
        width: calc(100% - 50px);

        .el-input__inner {
          height: 25px;
          padding: 0 6px;
          line-height: 22px;
          border: none !important;
          border-radius: 2px;
          background-color: #00000010;
        }
      }

      .el-radio:nth-child(1) {
        margin-right: 20px;
      }

      .el-button {
        width: 100%;
        border-radius: 2px !important;
        padding: 5px 15px;
      }

      .line-width {
        width: calc(100% - 50px);
      }

      ::v-deep.m-colorPicker{
        width: calc(100% - 50px);
      }
      ::v-deep.m-colorPicker .open {
        position: fixed;
      }
      ::v-deep.m-colorPicker .colorBtn {
        border: 1px solid #000;
        width: 100%;
      }
    }

    .attr-title {
      padding: 0 10px;
      margin: 6px 0;
      height: 40px;
      line-height: 40px;
      border-top: 1px solid #00000015;
      border-bottom: 1px solid #00000012;
      background-color: #00000010;
    }
  }

  .attr-footer {
    height: 35px;
    margin-top: 7px;
    padding: 10px 10px 37px 10px;
    border-top: 1px solid #00000015;
    text-align: center;
    .el-button {
      width: 47%;
      border-radius: 2px !important;
    }
  }
}
</style>
