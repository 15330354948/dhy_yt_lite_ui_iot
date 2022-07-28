<!--
 * @Author: 张峻霖
 * @Date: 2021-04-19 15:58:22
 * @LastEditTime: 2021-06-03 17:15:18
 * @LastEditors: Please set LastEditors
 * @Description: 撤离路线文件
 * @FilePath: \LH-UI\src\views\hideDanger\mapLayer\eivacuate.vue
-->
<template>
  <div class="eivacuate_map">
    <el-row class="map_div">
      <el-col :span="9">
        <div class="curd_btn" v-if="btnBoxShow">
          <!-- v-if="permissions.disaster_evacuate_route_del" -->
          <el-button
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
            <el-table-column prop="name" label="名称" align="center">
            </el-table-column>
            <el-table-column label="操作" v-if="btnBoxShow">
              <template slot-scope="scope">
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
            <div
              v-if="!drawing"
              class="box-btn"
              :class="currentBtn == 1 ? 'btn-active' : ''"
              @click="drawHandler(true)"
            >
              <img :src="require('@/assets/img/plane/bianjie.png')" alt="" />
              <!--  v-if="permissions.disaster_evacuate_route_add" -->
              <div>新增</div>
            </div>
            <div
              v-if="drawing"
              class="box-btn"
              :class="currentBtn == 5 ? 'btn-active' : ''"
              @click="drawHandler(false)"
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
                <el-input
                  v-model="attrData.name"
                  placeholder="请输入名称"
                ></el-input>
              </div>
              <div class="attr-row">
                <span style="padding-right: 10px">颜色</span>
                <colorPicker v-model="attrData.color"></colorPicker>
              </div>
              <div class="attr-row">
                <span style="padding-right: 10px">线宽</span>
                <input
                  class="line-width"
                  type="number"
                  v-model.number="attrData.lineWidth"
                />
              </div>
            </div>
            <div class="attr-footer">
              <el-button type="primary" size="mini" @click="submitAttr"
                >提交</el-button
              >
              <el-button type="success" size="mini" @click="closeAttrBox"
                >取消</el-button
              >
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
  name: "eivacuateMap",
  props: ["scopeDatas", "drawTools"],
  data() {
    return {
      hideDangerData: {},
      tableData: [],
      tableBorder: true,
      currentBtn: 0,
      tipShow: true, //提示框显隐
      btnBoxShow: false,
      attrboxShow: false, //属性参数显隐
      attrData: {
        color: "#fff",
        linetype: 0,
      },
      choiseData: [], //列表选中数据
      points: [],
      drawing: false,
    };
  },
  watch: {
    "scopeDatas":{
      immediate: true,
      handler(newX, oldY){
        if(newX.disasterEvacuationRouteMapDatas && newX.disasterEvacuationRouteMapDatas.length>0){
          this.tableData = newX.disasterEvacuationRouteMapDatas
        }
      }
    },
    "attrData": {
      handler(val) {
        if (!this.attrboxShow) return; //判断属性框是否已打开
        this.mapFunc.fitMapArrow(
          this.points,
          this.attrData
        );
      },
      deep: true,
    },
    "drawTools": {
      immediate: true,
      handler(val,oVal){
        this.btnBoxShow = val
      }
    },
  },
  computed: {
    ...mapGetters(["permissions"]),
  },
  created() {
    this.hideDangerData = JSON.parse(
      window.sessionStorage.getItem("disasterData")
    );
  },
  mounted() {
    setTimeout(() => {
      this.mapFunc.goView({
        longitude: this.hideDangerData.longitude,
        latitude: this.hideDangerData.latitude,
        height: 1000,
        preMinus: 0.001,
      });
      this.mapFunc.deletePointLineLayer({ arrow: true });
      this.drawLine()
    }, 200);
  },
  methods: {
    drawLine() {
      this.tableData.forEach((e) => {
        e.disasterRangeLatLonDTOList = e.longitudeLatitudeAltitude && JSON.parse(e.longitudeLatitudeAltitude)
        let path = [];
        e.disasterRangeLatLonDTOList.forEach((e2) => {
          path.push([e2.longitude, e2.latitude]);
        });
        this.mapFunc.fitMapArrow( e.disasterRangeLatLonDTOList, e );
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
          this.mapFunc.removeRangeLine(row.name) //移除
          this.$emit("getDrawLayerData", {
            layData: this.tableData,
            rowCallback: this.scopeDatas
          });
          this.drawLine()
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
          this.drawLine()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /** @description: 表格勾选事件*/
    handleSelectionChange(data) {
      this.choiseData = data;
    },
    /**提交函数*/
    submitAttr() {
      let data = deepClone(this.attrData);
      let disasterRangeLatLonDTOList = [];
      this.points.forEach((e, i) => {
        disasterRangeLatLonDTOList.push({
          sort: i,
          longitude: e.longitude,
          latitude: e.latitude,
          altitude: e.height,
        });
      });

      data.disasterId = this.hideDangerData.id;
      data.disasterRangeLatLonDTOList = disasterRangeLatLonDTOList;
      this.tableData.push(data)
      this.$message({
        type: "success",
        message: "新增成功",
      });
      this.attrData = {
        name: "", // 名称
        type: "", // 图形 线、箭头
        linetype: 0, //范围 虚线、实线
        color: "#00FF00", //描边颜色
        lineWidth: 10, //描边线条大小
      };
      this.$emit("getDrawLayerData", {
        layData: this.tableData,
        rowCallback: this.scopeDatas
      });
      this.attrboxShow = false; //移除
      this.drawLine();
    },

    // @description: 关闭绘制工具
    closeTip() {
      this.tipShow = false;
    },
    // 绘制开始
    drawHandler(val) {
      this.drawing = true; //移除
      if (val) {
        this.attrboxShow = false;
        this.points = [];
        this.attrData = {
          name: "", // 名称
          type: "", // 图形 线、箭头
          linetype: 3, //范围 虚线、实线
          color: "#00FF00", //描边颜色
          lineWidth: 15, //描边线条大小
        };
        this.mapFunc.monomerFun(this.drawPoint, this.drawconfirem);
      } else {
        if (this.points.length < 2) {
          this.$message.warning("绘制点数过少");
        } else {
          this.drawing = false;
          this.attrboxShow = true;
          this.$set(this.attrData, "points", this.points);
          this.mapFunc.deletePointLineLayer({ MapEvent: true });
          this.mapFunc.fitMapArrow(
            this.points,
            this.attrData
          );
        }
      }
    },
    /**
     * @description: 地图单击返回事件
     * @param {*} value 地图返回数据
     */
    drawPoint(value) {
      this.points.push(value.mapPoint);
      let n = this.points.length;
      if (n == 1) {
        this.mapFunc.skimSpot({
          longitude: value.mapPoint.longitude,
          latitude: value.mapPoint.latitude,
        });
        this.$message("请点击第 二 个点");
      } else {
        this.mapFunc.fitMapArrow(
          this.points,
          this.attrData
        );
      }
    },

    drawconfirem() {
      this.points = []
      this.mapFunc.deletePointLineLayer({
        point: true,
        line: true,
        MapEvent: true,
        arrow: true,
      });
      this.mapFunc.removeLayer(`fitArrowLayer-${this.attrData.name}`)
      this.drawHandler(true);
    },

    closeAttrBox() {
      this.attrboxShow = false;
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
    directionClick() {

    },
  },
};
</script>

<style lang="scss" scoped>
.eivacuate_map {
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
  position: relative;

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
  :deep.cell {
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

