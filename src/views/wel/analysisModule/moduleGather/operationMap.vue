<template>
  <div
    class="operation-map"
    :class="{ isDataAnalysis: isHomePage }"
    :style="{
      right: !isFullPage ? isHomePage ? `${rightWidth}px` : '0' : '0',
      top: isShrinkPage ? '130px' : '75px'
    }">
    <div class="fullScreen" v-if="!analysisDetails.status">
      <el-button type="primary" @click="full_screen(false)" v-if="isHomePage">
        <i class="iconfont icon-quanping"></i>全屏
      </el-button>
      <el-button type="primary" @click="full_screen(true)" v-if="!isHomePage && !analysisDetails.status">
        <i class="iconfont icon-quanping"></i>主页
      </el-button>
    </div>
    <!-- <div class="toolbar">
      <el-button type="primary" @click="selectedFun('operation')">运维大屏</el-button>
    </div> -->
    <!-- <div class="layer">
      <el-button type="primary" @click="holdConference()">会商</el-button>
    </div> -->
    <div class="layer">
      <el-button type="primary" @click="selectedFun('map')">
        <i class="iconfont icon-ditu"></i>底图
      </el-button>
    </div>
    <div class="layer" v-if="analysisDetails.status">
      <el-button type="primary" @click="selectedFun('layer')">
        <i class="iconfont icon-tuceng"></i>图层
      </el-button>
    </div>
    <div class="layer">
      <el-button type="primary" @click="selectedFun('toolbar')">
        <i class="iconfont icon-gongju"></i>工具
      </el-button>
    </div>
    <div class="layer" v-if="analysisDetails.status">
      <el-button type="primary" @click="selectedFun('draw')">
        <i class="iconfont icon-huizhi"></i>绘制
      </el-button>
    </div>
    <div class="control">
      <el-button type="primary" @click="getViewEnlarge" title="放大"><i class="iconfont icon-jia"></i></el-button>
      <el-button type="primary" @click="getViewNarrow" title="缩小"><i class="iconfont icon-jian"></i></el-button>
      <el-button type="primary" @click="getViewHome" title="视图定位"><i class="iconfont icon-fangxiang"></i></el-button>
    </div>

    <div class="bc_stratum_tuli" v-if="showSurfaceTc">
      <span>地层图例</span>
      <div class="bc_legend_main">
        <div
          v-for="(item, index) in stratumModelMsg"
          :key="index"
          class="bc_legend_item"
          @click="controlShow(item.level)"
        >
          <i :style="{ background: item.color }"></i
          ><span>{{ item.stratumName }}</span>
        </div>
      </div>
    </div>

    <div class="bc_stratum" v-if="showSurfaceTc">
      <span>地层透明度</span>
      <div class="sm_menu_mm sm_menu_btmd">
        <el-slider
          v-model="stratumValue"
          vertical
          :show-tooltip="false"
          @input="stratumInput"
          height="180px"
        ></el-slider>
        <div class="sm_menu_btmd_value" v-html="stratumValue + '%'"></div>
      </div>
    </div>

    <div class="bc_surface" v-if="showSurface || showSurfaceTc">
      <span>地表透明度</span>
      <div class="sm_menu_mm sm_menu_btmd">
        <el-slider
          v-model="btmdValue"
          vertical
          :show-tooltip="false"
          @input="btmdInput"
          height="180px"
        ></el-slider>
        <div class="sm_menu_btmd_value" v-html="btmdValue + '%'"></div>
      </div>
    </div>

    <!-- 工具盒子 -->
    <div class="toolbarPage" :class="{ open: currentlySelected == 'toolbar' }">
      <div class="bc_btnbox-title">工具</div>
      <div class="bc_toolbar-mainbox" v-for="(item, index) in oprationList" :key="index" >
        <p class="bc_toolbar-label">{{item.label}}</p>
        <div class="bc_toolbar-btns">
          <div
            v-for="(btns,i) in item.buttons" :key="i"
            @click="operationClick(btns.value)"
            class="bc_toolbar-btnbox">
            <div class="bc_toolbar-btnbg" :class="{ active: btns.value == operationIndex }">
              <i class="iconfont" :class="btns.icon"></i>
            </div>
            <span>{{ btns.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 绘制盒子 -->
    <div class="toolbarPage" v-if="analysisDetails.status" :class="{ open: currentlySelected == 'draw' }">
      <div class="bc_btnbox-title">绘制</div>
      <div class="bc_toolbar-mainbox" v-for="(item, index) in mapDrawList" :key="index" >
        <p class="bc_toolbar-label">{{item.label}}</p>
        <div class="bc_toolbar-btns">
          <div
            v-for="(btns,i) in item.buttons" :key="i"
            @click="mapDrawClick(btns.value)"
            class="bc_toolbar-btnbox">
            <div class="bc_toolbar-btnbg" :class="{ active: btns.value == operationIndex }">
              <i class="iconfont" :class="btns.value !== '4'?btns.icon:hideAllStatus?'icon-kejian':btns.icon"></i>
            </div>
            <span>{{ btns.value !== '4'?btns.name:hideAllStatus?'显示全部':btns.name }}</span>
          </div>
        </div>
      </div>
      <div class="bc_draw-list">
        <div class="bc_draw-list-btn">
          <el-button-group>
            <el-button :class="activeList == 'spot'?'bc_draw-list-active':''" type="default" @click="getDrawList('spot')">点</el-button>
            <el-button :class="activeList == 'line'?'bc_draw-list-active':''" type="default" @click="getDrawList('line')">线</el-button>
            <el-button :class="activeList == 'area'?'bc_draw-list-active':''" type="default" @click="getDrawList('area')">面</el-button>
          </el-button-group>
        </div>

        <div class="bc_draw-list-tab">
          <el-scrollbar style="height: 13vh">
            <p v-for="item in mapDrawTable" :key="item.id" @click="drawedControl(item)">
              <span>{{item.name}}</span>
              <i class="iconfont" :class="item.layerShow?'icon-kejian':'icon-yanjing_yincang'"></i>
            </p>
          </el-scrollbar>
        </div>
      </div>
    </div>

    <div class="layerPage" id="layerPage" :class="{ open: currentlySelected == 'layer' }" >
      <div class="bc_btnbox-title">图层</div>
      <div class="bc_switch-mainbox" v-for="(item, index) in layerList" :key="index" >
        <div class="bc_toolbar-switch">
          <el-switch v-model="layerPitchOn[item.valueName]" :disabled="item.disabled" @change="layerSwitchChange(item)"></el-switch>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="MapPage" :class="{ open: currentlySelected == 'map' }">
      <div class="bc_btnbox-title">底图</div>
      <div class="bc_switch-mainbox" v-for="(item, index) in mapList" :key="index" >
        <div class="bc_toolbar-switch">
          <el-switch v-model="mapPitchOn[item.valueName]"></el-switch>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>

    <div v-show="isprofile" class="profile-chart" ref="profileChart"></div>

    <el-dialog
      class="hide_dialog panorama_dialog"
      :visible.sync="panoramaPre"
      v-if="panoramaPre"
      @closed="handleClose"
      append-to-body
      width="80%">
      <div slot="title" class="dialog-title">
        <span class="title-text">全景图预览</span>
      </div>
      <div class="qjt">
        <iframe :src="qujName" scrolling="no" frameborder="0"></iframe>
      </div>
    </el-dialog>

    <el-dialog
      class="hide_dialog picturePreview_dialog"
      :visible.sync="picturePreview"
      v-if="picturePreview"
      append-to-body
      width="60%">
      <div slot="title" class="dialog-title">
        <span class="title-text">{{ pictureTime }}</span>
      </div>
      <div style="text-align: center">
        <img style="width: 100%" :src="pictureUrl" alt="" />
      </div>
    </el-dialog>

    <div class="bc_layer-tree" v-if="layerViewShow && currentlySelected == 'layer'">
      <p>{{layerTreeName}}列表</p>
      <div class="sm_menu_mm sm_menu_btmd">
        <el-tree
          ref="layerTree"
          :props="layerProps"
          :data="resolveList"
          show-checkbox
          @check-change="layerCheckChange">
        </el-tree>
      </div>
    </div>

    <div class="bc_stratum" v-if="changeHeightShow">
      <span>高度调整</span>
      <div class="bc_adjust-height">
        <el-button size="mini" @click="addHeight">
          <i class="iconfont icon-jia"></i>
        </el-button>
        <el-input v-model="relativeHeight" :disabled="true" :max="100" :min="-25"></el-input>
        <el-button size="mini" @click="reduceHeight">
          <i class="iconfont icon-jian"></i>
        </el-button>
      </div>
    </div>

    <!-- 裂缝数据统计 -->
    <!-- <div class="tart-layer" v-if="analysisDetails.status">
      <el-button
        class="el-icon-s-data"
        type="primary"
        size="default"
        @click="tearCensus('tear')"
      ></el-button>
    </div> -->

    <!-- 裂缝弹框 -->
    <!-- <el-dialog
      class="_dialog tearCensusView_dialog"
      :visible.sync="tearCensusView"
      v-if="tearCensusView"
      append-to-body
      width="30%">
      <div slot="title" class="dialog-title">
        <span class="title-text">裂缝统计</span>
      </div>
      <div style="text-align: center; height: 100%">
        <tear-census :disasterId="analysisDetails.data.data.id"></tear-census>
      </div>
    </el-dialog> -->

    <div class="bc_attr-panel" v-if="pointAttrShow && currentlySelected == 'draw'">
      <div class="bc_btnbox-title">点属性
        <i class="el-icon el-icon-close" @click="closeAttrPop('spot')"></i>
      </div>
      <div class="bc_attr-mainbox">
        <el-form ref="spotForm" :rules="spotRules" :model="pointForm" label-width="80px">
          <el-form-item label="点名称" prop="name">
            <el-input v-model="pointForm.name"></el-input>
          </el-form-item>
          <el-form-item label="点颜色">
            <el-color-picker v-model="pointForm.color" show-alpha></el-color-picker>
          </el-form-item>
          <el-form-item label="字体大小">
            <el-input v-model="pointForm.fontSize"></el-input>
          </el-form-item>
          <el-form-item label="字体加粗">
            <el-radio v-model="pointForm.fontBold" :label="true">是</el-radio>
            <el-radio v-model="pointForm.fontBold" :label="false">否</el-radio>
          </el-form-item>
          <el-form-item label="标签颜色">
            <el-color-picker v-model="pointForm.labelColor" show-alpha></el-color-picker>
          </el-form-item>
          <el-form-item label="标签显示">
            <el-radio v-model="pointForm.labelDisplay" :label="true">是</el-radio>
            <el-radio v-model="pointForm.labelDisplay" :label="false">否</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="onDrawDelete(pointForm, 'spot')">删除</el-button>
            <el-button type="primary" @click="onDrawSubmit('spot')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="bc_attr-panel" v-if="lineAttrShow && currentlySelected == 'draw'">
      <div class="bc_btnbox-title">线属性
        <i class="el-icon el-icon-close" @click="closeAttrPop('line')"></i>
      </div>
      <div class="bc_attr-mainbox">
        <el-form ref="lineForm" :rules="lineRules" :model="lineForm" label-width="80px">
          <el-form-item label="线名称" prop="name">
            <el-input v-model="lineForm.name"></el-input>
          </el-form-item>
          <el-form-item label="线样式">
            <el-select v-model="lineForm.lineType" placeholder="请选择">
              <el-option
                v-for="item in lineTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="线宽度">
            <el-input v-model="lineForm.thickness" type="number" min="1" max="20"></el-input>
          </el-form-item>
          <el-form-item label="线颜色">
            <el-color-picker v-model="lineForm.color" show-alpha></el-color-picker>
          </el-form-item>
          <el-form-item label="字体大小">
            <el-input v-model="lineForm.fontSize"></el-input>
          </el-form-item>
          <el-form-item label="字体加粗">
            <el-radio v-model="lineForm.fontBold" :label="true">是</el-radio>
            <el-radio v-model="lineForm.fontBold" :label="false">否</el-radio>
          </el-form-item>
          <el-form-item label="标签颜色">
            <el-color-picker v-model="lineForm.labelColor" show-alpha></el-color-picker>
          </el-form-item>
          <el-form-item label="标签显示">
            <el-radio v-model="lineForm.labelDisplay" :label="true">是</el-radio>
            <el-radio v-model="lineForm.labelDisplay" :label="false">否</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="onDrawDelete(lineForm, 'line')">删除</el-button>
            <el-button type="primary" @click="onDrawSubmit('line')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="bc_attr-panel" v-if="areaAttrShow && currentlySelected == 'draw'">
      <div class="bc_btnbox-title">面属性
        <i class="el-icon el-icon-close" @click="closeAttrPop('area')"></i>
      </div>
      <div class="bc_attr-mainbox">
        <el-form ref="areaForm" :rules="areaRules" :model="areaForm" label-width="80px">
          <el-form-item label="面名称" prop="name">
            <el-input v-model="areaForm.name"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="填充颜色">
                <el-color-picker v-model="areaForm.color" show-alpha></el-color-picker>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="边框颜色">
                <el-color-picker v-model="areaForm.borderColor" show-alpha></el-color-picker>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-form-item label="字体大小">
            <el-input v-model="areaForm.fontSize"></el-input>
          </el-form-item>
          <el-form-item label="字体加粗">
            <el-radio v-model="areaForm.fontBold" :label="true">是</el-radio>
            <el-radio v-model="areaForm.fontBold" :label="false">否</el-radio>
          </el-form-item>
          <el-form-item label="标签颜色">
            <el-color-picker v-model="areaForm.labelColor" show-alpha></el-color-picker>
          </el-form-item>
          <el-form-item label="标签显示">
            <el-radio v-model="areaForm.labelDisplay" :label="true">是</el-radio>
            <el-radio v-model="areaForm.labelDisplay" :label="false">否</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="onDrawDelete(areaForm, 'area')">删除</el-button>
            <el-button type="primary" @click="onDrawSubmit('area')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getProjectInfo } from "@/api/monitorManage/projectList"
import { getHiddenDangerList } from "@/api/hideDanger/hideDangerList";
import { getEvacuationRouteList } from "@/api/hideDanger/evacuationRoute";
import { getImgMapList } from "@/api/hideDanger/imgMap";
import { getTiltAltitudeList } from "@/api/hideDanger/altitude";
import { getOrthoPhotoList } from "@/api/hideDanger/orthoPhoto";
import { getPanoramaList } from "@/api/hideDanger/panorama";
import { getCloudTree } from '@/api/hideDanger/cloud'
import { getTiltPhotographyList } from "@/api/hideDanger/tiltPhotography";
import { dictionary, monitorUpdateLonLatById } from "@/api/hideDanger/obj";
import { updateLongAndLatById } from "@/api/monitorManage/device";
import { getProvinceGisUrl } from "@/api/province/levelGisUrl"

import {
  addMapDraw,
  editMapDraw,
  getMapDrawList,
  deleteMapDraw,
} from "@/api/mapDraw/interface";
// import tearCensus from "./tearCensus";
import drillData from "./drill.json";
import YTModelData from "./YTModel.json";

import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
import { validatAlphabets } from '../../../../util/validate';

export default {
  // components: { tearCensus },
  data() {
    return {
      stratumValue: 100,
      btmdValue: 100, //地表透明度
      relativeHeight: 0,
      pastProvinceCode: null,
      showSurface: false,
      showSurfaceTc: false,
      overOfClick: false,
      changeHeightShow: false,
      layerTreeName: "",
      layerViewShow: false,
      panoramaPre: false,
      layerQuery: "",
      modelObj: null,
      baseUrl: process.env.BASE_URL,
      layerProps: {
        label: 'name',
        children: 'children'
      },
      oprationList: [{
        label: "测量",
        buttons: [
          { name: "坡度", icon: "icon-podu", value:"1"},
          { name: "长度", icon: "icon-changdu", value:"2" },
          { name: "面积", icon: "icon-mian", value:"3" },
          { name: "高度", icon: "icon-gaodu", value:"4"},
          { name: "剖面分析", icon: "icon-poumianfenxi", value:"5" },
          { name: "地层剖切", icon: "icon-dicengpouqie", value:"6" }
        ]
      },{
        label: "移动",
        buttons: [
          { name: "高度调整", icon: "icon-shangxia", value:"7"},
          { name: "位置调整", icon: "icon-zuoyou", value:"8" }
        ]
      }],
      mapDrawList: [{
        label: "绘制",
        buttons: [
          { name: "点", icon: "icon-dian", value:"1"},
          { name: "线", icon: "icon-changdu", value:"2" },
          { name: "面", icon: "icon-mian", value:"3" },
        ]
      }, {
        label: "管理",
        buttons: [
          { name: "隐藏全部", icon: "icon-yanjing_yincang", value:"4"},
          { name: "删除全部", icon: "icon-shanchu", value:"5" }
        ]
      }],
      spotRules:{
        name: [{required: true, message: "绘制点名称不能为空", trigger:"blur"}]
      },
      lineRules:{
        name: [{required: true, message: "绘制线名称不能为空", trigger:"blur"}]
      },
      areaRules:{
        name: [{required: true, message: "绘制面名称不能为空", trigger:"blur"}]
      },
      layerList: [
        { name: "监测范围", valueName: "yhfw", disabled: false},
        { name: "撤离路线", valueName: "cllx", disabled: false},
        { name: "倾斜摄影", valueName: "qxsy", disabled: false},
        { name: "正射影像", valueName: "zsyx", disabled: false},
        { name: "全景图", valueName: "qjt", disabled: false},
        { name: "影像图", valueName: "yxt", disabled: false},
        { name: "点云", valueName: "dy", disabled: false},
        { name: "高程", valueName: "dem", disabled: false},
      ],
      stratumModelMsg: [
        { stratumName: "孤石", level: "1", color: "rgb(165,168,164)" },
        { stratumName: "填石", level: "2", color: "rgb(255,235,206)" },
        { stratumName: "素填土", level: "3", color: "rgb(255,221,173)" },
        { stratumName: "块石", level: "4", color: "rgb(252,137,153)" },
        { stratumName: "粉质粘土", level: "5", color: "rgb(255,237,139)" },
        { stratumName: "砂质粘性土", level: "6", color: "rgb(255,215,1)" },
        { stratumName: "全风化砂岩", level: "7", color: "rgb(84,255,159)" },
        { stratumName: "强风化砂岩", level: "8", color: "rgb(0,163,59)" },
        { stratumName: "全风化花岗岩", level: "9", color: "rgb(107,90,205)" },
        { stratumName: "强风化花岗岩", level: "10", color: "rgb(131,112,254)" },
        { stratumName: "中风化花岗岩", level: "11", color: "rgb(123,103,237)" },
        { stratumName: "微风化花岗岩", level: "12", color: "rgb(123,103,237)" },
        { stratumName: "微风化大理岩", level: "13", color: "rgb(153,156,154)" },
        { stratumName: "断层泥", level: "14", color: "rgb(53,54,40)" },
      ],
      layerPitchOn: {
        yhfw: false,
        cllx: false,
        qxsy: false,
        zsyx: false,
        qjt: false,
        yxt: false,
        dy: false,
        dem: false
      },
      mapList: [
        // {
        //   name: "路网",
        //   valueName: "lw",
        // },
        {
          name: "行政区划",
          valueName: "xzqh",
        },
      ],
      mapPitchOn: {
        lw: false,
        xzqh: false,
      },
      mapDrawTable: [],
      isprofile: false,
      resolveList: [],
      points: [], //点集
      profilePath: [], //剖面路径
      operationIndex: null, //点的第几个操作
      options: {
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        tooltip: {
          trigger: "axis",
          formatter: (v) => {
            return `高度:${v[0].data[1].toFixed(2)}米<br>距离:${
              v[0].data[0]
            }米`;
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "5%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          nameLocation: "center",
          nameGap: 10,
          nameTextStyle: {
            color: "#fff",
          },
          splitLine: {
            show: false,
          },
          z: 10000,
          axisTick: {
            show: false,
          },
          position: "bottom",
          axisLabel: {
            interval: 0,
            color: "#DCDCDC",
          },
          axisLine: {
            lineStyle: {
              color: "#5c5c5c",
              width: 1,
            },
          },
        },
        yAxis: [
          {
            type: "value",
            name: "高度(m)",
            nameTextStyle: {
              color: "#fff",
            },
            axisLabel: {
              interval: 0,
              color: "#DCDCDC",
            },
            axisLine: {
              lineStyle: {
                color: "#5c5c5c",
                width: 1,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: -5,
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            type: "line",
            // smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#003663",
                },
                {
                  offset: 1,
                  color: "#0480e6",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [],
          },
        ],
      },
      isHomePage: true,
      isFullPage: false,
      isShrinkPage: false,
      toolbarStatus: false,
      layerData: {},
      lineData: {},
      dialogfull: false,
      rightWidth: 0,
      layerStatus: true,
      currentlySelected: "",
      qujName: "",
      picturePreview: false,
      pictureUrl: "",
      pictureTime: "",
      wallJson: [],
      planeJson: [],
      // 点线面属性弹框
      pointAttrShow: false,
      lineAttrShow: false,
      areaAttrShow: false,
      spotLoc: {},
      lineLoc: [],
      areaLoc: [],
      beforeData: {},
      pointForm: {
        name: "",
        color: "#FFFF00",
        labelColor: "#FFFF00",
        fontSize: "16",
        fontBold: true,
        labelDisplay: true
      },
      lineForm: {
        name: "",
        lineType: "1",
        thickness: 1,
        color: "#FFFF00",
        fontSize: "16",
        labelColor: "#FFFF00",
        fontBold: true,
        labelDisplay: true
      },
      areaForm: {
        name: "",
        color: "#FFFF00",
        borderColor: "#FFFF00",
        fontSize: '16',
        labelColor: "#FFFF00",
        fontBold: true,
        labelDisplay: true
      },
      lineTypeOption: [],
      proLevelList: [],
      hideAllStatus: true,
      panelStatus: undefined, // 1: 新增状态 2:修改状态
      activeList: "",
      isSpotChangeAttr: false,
      isLineChangeAttr: false,
      isAreaChangeAttr: false,
      tikMove: undefined
      // tearCensusView: false, //裂缝弹框控制
    };
  },
  computed: {
    ...mapGetters(["analysisDetails", "isDataAnalysis", "projectId", "viewConfig"]),
    spotTagNew() {
      return JSON.parse(JSON.stringify(this.pointForm))
    },
    lineTagNew() {
      return JSON.parse(JSON.stringify(this.lineForm))
    },
    areaTagNew() {
      return JSON.parse(JSON.stringify(this.areaForm))
    },
  },

  watch: {
    viewConfig: {
      handler(nc, oc) {
        if(nc.panelCount && nc.panelCount == 1 || nc.panelCount == 2){
          this.isFullPage = true
        }else{
          this.isFullPage = false
        }
        if(nc.panelCount && nc.panelCount == 1 || nc.panelCount == 3){
          this.isShrinkPage = false
        }else{
          this.isShrinkPage = true
        }
      },
      deep: true
    },
    "layerPitchOn.yhfw": {
      handler(val) {
        if (val) {
          this.layerViewShow = val
          this.layerTreeName = "监测范围";
          this.layerQuery = 'yhfw'
          this.layerLoadNode()
        } else {
          this.layerCheckChange()
          this.mapFunc.deletePointLineLayer({ line: true, arrow: true });
        }
      },
      immediate: false,
    },

    "layerPitchOn.cllx": {
      handler(val) {
        if (val) {
          this.layerViewShow = val
          this.layerTreeName = "撤离路线";
          this.layerQuery = 'cllx'
          this.layerLoadNode()
        } else {
          this.layerCheckChange()
        }
      },
      immediate: false,
    },

    "layerPitchOn.qxsy": {
      handler(val) {
        if (val) {
          this.layerViewShow = val
          this.layerTreeName = "倾斜摄影";
          this.layerQuery = 'qxsy'
          this.layerLoadNode()
        }else{
          this.layerCheckChange()
        }
      },
      immediate: false,
    },
    "layerPitchOn.zsyx": {
      handler(val) {
        if (val) {
          this.layerViewShow = val
          this.layerTreeName = "正射影像";
          this.layerQuery = 'zsyx'
          this.layerLoadNode()
        }else{
          this.layerCheckChange()
        }
      },
      immediate: false,
    },
    "layerPitchOn.qjt": {
      handler(val) {
        if (val) {
          this.layerViewShow = val
          this.layerTreeName = "全景图";
          this.layerQuery = 'qjt'
          this.layerLoadNode()
        }else {
          this.isPanorama = false
          this.layerCheckChange()
        }
      },
      immediate: false,
    },

    "layerPitchOn.yxt": {
      handler(val) {
        if (val) {
          this.layerViewShow = val
          this.layerTreeName = "影像图";
          this.layerQuery = 'yxt'
          this.layerLoadNode()
        }else {
          this.layerCheckChange()
        }
      },
      immediate: false,
    },

    "layerPitchOn.lf": {
      handler(val) {
        if (val) {
          this.layerViewShow = val
          this.layerTreeName = "裂缝";
          this.layerQuery = 'lf'
          this.layerLoadNode()
        } else {
          this.layerCheckChange()
        }
      },
      immediate: false,
    },
    "layerPitchOn.dy":{
      handler(val, oVal){
        if(val){
          this.layerViewShow = val
          this.layerTreeName = "点云";
          this.layerQuery = 'dy'
          this.layerLoadNode()
        }else{
          this.layerCheckChange()
        }
      },
      immediate: false,
    },

    "layerPitchOn.dem":{
      handler(val, oVal){
        if(val){
          this.layerViewShow = val
          this.layerTreeName = "高程";
          this.layerQuery = 'dem'
          this.layerLoadNode()
        }else{
          this.layerCheckChange()
        }
      },
      immediate: false,
    },

    "mapPitchOn.lw": {
      handler(val) {
        if (val) {
          this.mapFunc.addluwang();
        } else {
          this.mapFunc.hideluwang("luwang");
        }
      },
      immediate: false,
    },

    "mapPitchOn.xzqh": {
      handler(val) {
        if (val) {
          this.addZoning();
        } else {
          this.hideZoning(this.projectId);
        }
      },
      immediate: true,
    },

    spotTagNew: {
      handler(nVal, oVal) {
        if(nVal !== this.beforeData){
          this.isSpotChangeAttr = true
          return
        };
        if(this.panelStatus == 1){
          this.mapFunc.removeDrawLayer(oVal.name, 'spot')
          this.activeDrawSpot(nVal, this.spotLoc)
        }else if(this.panelStatus == 2){
          this.mapFunc.removeDrawLayer(oVal.name, 'spot')
          this.activeDrawSpot(nVal)
        }else{
          return
        }
      },
      deep: true
    },

    lineTagNew: {
      handler(nVal, oVal) {
        if(nVal !== oVal){
          this.isLineChangeAttr = true
          return
        };
        if(this.panelStatus == 1){
          this.mapFunc.removeDrawLayer(oVal.name, 'line')
          this.activeDrawLine(nVal, this.lineLoc)
        }else if(this.panelStatus == 2){
          this.mapFunc.removeDrawLayer(oVal.name, 'line')
          this.activeDrawLine(nVal)
        }else{
          return
        }
      },
      deep: true
    },

    areaTagNew: {
      handler(nVal, oVal) {
        if(nVal !== oVal){
          this.isAreaChangeAttr = true
          return
        };
        if(this.panelStatus == 1){
          this.mapFunc.removeDrawLayer(oVal.name, 'area')
          this.activeDrawArea(nVal, this.areaLoc)
        }else if(this.panelStatus == 2){
          this.mapFunc.removeDrawLayer(oVal.name, 'area')
          this.activeDrawArea(nVal)
        }else{
          return
        }
      },
      deep: true
    },

    isDataAnalysis: {
      handler(val) {
        this.isHomePage = !val.status;
        if (this.isHomePage) {
          let rightVal = document.getElementsByClassName(
            "data_analysis_bottom_right"
          )[0].offsetWidth;
          this.rightWidth = rightVal + 30;
          document.getElementsByClassName(
            "navigation-controls"
          )[0].style.right = rightVal * 1 + 42 + "px";
          document
            .getElementsByClassName("navigation-controls")[0]
            .classList.add("ishomePage");
          document.getElementsByClassName("compass")[0].style.right =
            rightVal * 1 + 42 + "px";
          document
            .getElementsByClassName("compass")[0]
            .classList.add("ishomePage");
        } else {
          document.getElementsByClassName(
            "navigation-controls"
          )[0].style.right = "10px";
          document
            .getElementsByClassName("navigation-controls")[0]
            .classList.remove("ishomePage");
          document.getElementsByClassName("compass")[0].style.right = "10px";
          document
            .getElementsByClassName("compass")[0]
            .classList.remove("ishomePage");
        }
      },
      deep: true,
    },
    analysisDetails: {
      async handler(val) {
        let monitorId = val.data && val.data.data.id
        if (val.status) {
          this.layerStatus = false;
          this.isHomePage = false;
          this.currentlySelected = ""
          this.isanalysisDetails = val.status;
          if (val.moduleName == "danger") {
            this.layerPitchOn = {
              yhfw: false,
              qxsy: false,
              zsyx: false,
            };
          }
        } else {
          this.layerViewShow = false
          this.pointAttrShow = false
          this.lineAttrShow = false
          this.changeHeightShow = false
          this.areaAttrShow = false
          getMapDrawList({ current: 1, size:1000, monitorId }).then(res=>{
            if(res.data && res.data.data.records){
              let allRecords = res.data.data.records
              allRecords.forEach(item=>{
                item['layerShow'] = true
                this.drawedControl(item)
                this.mapFunc.removeDrawLayer(item.name, item.type)
              })
            }
          })
        }
      },
      deep: true,
    },

    relativeHeight: {
      handler(newH, oldH) {
        if(newH){
          this.tookMain(this.modelObj, true)
        }
      },
      deep: true
    },

    projectId: {
      handler(newId,oldId) {
        if(newId){
          this.hideZoning(oldId)
          setTimeout(()=>{
            this.addZoning();
          }, 1000)
        }
      },
      deep: true
    }
  },

  mounted() {
    setTimeout((e) => {
      this.mapPitchOn.xzqh = true
    }, 3000);
    /**
     * 点击地图绘制对象回调
     */
    this.$on("attribute-box", data => {
      if(data && data.type){
        this.panelStatus = 2;
        this.beforeData = data
        this.isSpotChangeAttr = false
        this.isLineChangeAttr = false
        this.isAreaChangeAttr = false
        switch(data.type){
          case "spot":
            this.pointForm = data
            this.pointAttrShow = true;
            this.lineAttrShow = false;
            this.areaAttrShow = false;
            break;
          case "line":
            this.lineForm = data
            this.pointAttrShow = false;
            this.lineAttrShow = true;
            this.areaAttrShow = false;
            break;
          default:
            this.areaForm = data
            this.pointAttrShow = false;
            this.lineAttrShow = false;
            this.areaAttrShow = true;
            break;
        }
      }
    });

    setTimeout(() => {
      let rightVal = document.getElementsByClassName(
        "data_analysis_bottom_right"
      )[0].offsetWidth;
      this.rightWidth = rightVal + 30;
      document.getElementsByClassName("navigation-controls")[0].style.right =
        rightVal * 1 + 42 + "px";
      document
        .getElementsByClassName("navigation-controls")[0]
        .classList.add("ishomePage");
      document.getElementsByClassName("compass")[0].style.right =
        rightVal * 1 + 42 + "px";
      document.getElementsByClassName("compass")[0].classList.add("ishomePage");
    }, 1000);

    dictionary("monitor_line_type").then( res => {
      this.lineTypeOption = res.data.data;
    });
  },
  methods: {
    full_screen(val) {
      if (!val) {
        // this.mapFunc.goView({
        //   longitude: 114.1377358353889,
        //   latitude: 22.5214904077358,
        //   height: 40000,
        //   pitch: -88,
        //   preMinus: 0,
        // });
      }
      this.$store.commit("IS_DATA_ANALYSIS", {
        status: !val,
        data: true,
      });
      if (val) {
        window.viewer.scene.postProcessStages.remove(this.mapFunc.lastStage);
        window.viewer.scene.postProcessStages.remove(this.mapFunc.lastStage2);
        this.mapFunc.removeLayer("secondLayer");
        this.$store.commit("IS_ANALYSIS_DETAILS", {
          status: false,
        });
        this.mapFunc.removeLayer("QXSYLayer");
        this.mapFunc.removeLayer("twoLevelLayer");
        this.mapFunc.map.remove(this.mapFunc.gra2);
        this.mapFunc.deletePointLineLayer({
          line: true,
        });
      }
    },
    getViewEnlarge() {
      this.mapFunc.goEnlarge()
    },

    getViewHome() {
      if(this.projectId){
        getProjectInfo(this.projectId).then((res)=>{
          let projectData = res.data.data
          if(projectData.latitude && projectData.longitude){
            this.mapFunc.goView({
              longitude: projectData.longitude/1,
              latitude: projectData.latitude/1,
              height: 1200
            })
          }else{
            this.$message.warning("暂无项目点位信息")
          }
        })
      }
    },

    layerSwitchChange(sdata) {
      for(let key in this.layerPitchOn ) {
        if(sdata){
          if(key !== sdata.valueName){
            this.layerPitchOn[key] = false
          }
        }
        if(this.layerPitchOn[key]){
          this.layerViewShow = true
        }else{
          this.layerViewShow = false
        }
      }
    },

    addZoning() {
      getProjectInfo(this.projectId).then((res)=>{
        let projectData = res.data.data
        if(this.pastProvinceCode !== projectData.province){
          this.mapFunc.removeLayer(`xzqh_${this.pastProvinceCode}`)
          this.pastProvinceCode = projectData.province
        }
        if(projectData.province){
          getProvinceGisUrl(projectData.province).then(res=>{
            if(res.data.data){
              this.proLevelList = res.data.data
              let pro = res.data.data[0]
              this.mapFunc.removeLayer(`xzqh_${pro.provinceCode}`)
              this.mapFunc.addWMSLayer({
                name: `xzqh_${pro.provinceCode}`,
                url: pro.provinceGisUrl
              })
            }
          }).then(()=>{
            if(this.proLevelList.length){
              this.mapFunc.removeLayer("cityNameLayer")
              this.proLevelList.forEach(city=>{
                this.mapFunc.cityTitleFun({
                  data: city
                })
              })
            }
          })
        }else{
          this.$message.error("该平台未绑定省级区域")
        }
      })
    },

    hideZoning(pastId) {
      if(pastId){
        getProjectInfo(pastId).then((res)=>{
          let projectData = res.data.data
          this.proLevelList.forEach(pro=>{
            if(pro.provinceCode == projectData.province){
              this.mapFunc.removeLayer(`xzqh_${pro.provinceCode}`)
            }
          })
        })
      }
    },

    layerCheckChange(data, checked, indeterminate) {
      if(checked && data.children && data.children.length){
        data.children.forEach((e) => {
          if(e.disasterScopeId){
            e.disasterRangeLatLonDTOList = e.longitudeLatitudeAltitude && JSON.parse(e.longitudeLatitudeAltitude)
            let path = [];
            if (e.type == 0) {
              e.disasterRangeLatLonDTOList.forEach((e2) => {
                path.push(e2.longitude, e2.latitude);
              });
              path.push(path[0], path[1]);
              this.mapFunc.skimLine(path, e.color, e.lineWidth);
            } else if (e.type == 1) {
              this.mapFunc.ArrowsPoint(
                e.disasterRangeLatLonDTOList,
                e.color,
                e.lineWidth
              );
            } else if (e.type == 2) {
              e.disasterRangeLatLonDTOList.forEach((e2) => {
                path.push([e2.longitude, e2.latitude]);
              });
              path.push(path[0]);
              this.mapFunc.dottedLine(path, e.color, e.lineWidth);
            }
          }else if(e.disasterEvacuationRouteMapId){
            e.disasterRangeLatLonDTOList = e.longitudeLatitudeAltitude && JSON.parse(e.longitudeLatitudeAltitude)
            let path = [];
            e.disasterRangeLatLonDTOList.forEach((e2) => {
              path.push([e2.longitude, e2.latitude]);
            });
            this.mapFunc.fitMapArrow(
              e.disasterRangeLatLonDTOList,
              {
                name: e.id,
                color: e.color,
                lineWidth: e.lineWidth
              }
            );
          }else{
            this.$message("点云加载中...");
            this.mapFunc.addCloudSenceLayer(e.id, e.url);
          }
        });
      }else if(checked && data.demLink){
        data.value && this.mapFunc.addViewAltitude(data.demLink, data.value)
      }else if(checked && data.yxtLink){
        data.value && this.mapFunc.addWMSLayer({
          name: "zsyx"+ data.value,
          url: data.yxtLink,
        });
      }else if(checked && data.qjtUrl){
        this.panoramaPre = !this.panoramaPre;
        this.qujName = data.qjtUrl
      }else if(checked && data.qxsyLink){
        this.$message("倾斜摄影加载中...");
        data.value && this.mapFunc.addQXSY( data.qxsyLink, data.value, data.height );
        this.mapFunc.adjustHeight(this.analysisDetails.data.data.id);
        this.mapFunc.deviceAdjustHeight();
      }else if(checked && data.zsyxLink){
        data.value && this.mapFunc.addWMSLayer({
          name: "zsyx"+ data.value,
          url: data.zsyxLink,
        });
      }else{
        if(data && data.value){
          this.mapFunc.map.findLayerById("QXSYLayer" + data.value)
          && this.mapFunc.removeLayer("QXSYLayer" + data.value);
          this.mapFunc.removeB3DMlayer(data.value);
          this.mapFunc.map.findLayerById("zsyx"+ data.value)
          && this.mapFunc.removeLayer("zsyx"+ data.value);
          data.children && data.children.forEach(item=>{
            this.mapFunc.map.findLayerById("fitMapArrowLayer"+ item.id)
            && this.mapFunc.removeLayer("fitMapArrowLayer"+ item.id);
            this.mapFunc.map.findLayerById("fitArrowLayer-"+ item.id)
            && this.mapFunc.removeLayer("fitArrowLayer-"+ item.id);
            this.mapFunc.removeCloudSenceLayer(item.id);
          })
          this.mapFunc.deletePointLineLayer({
            point: true,
            line: true,
            MapEvent: true,
            arrow: true,
          });
        }
      }
    },

    layerLoadNode() {
      this.resolveList = []
      switch (this.layerQuery) {
        case "yhfw":
          getHiddenDangerList({disasterId:  this.analysisDetails.data.data.id}).then(res=>{
            if(res.data.data) {
              let layerTreeData = res.data.data
              if(layerTreeData.records.length){
                layerTreeData.records.forEach(item=>{
                  if(item.disasterScopeDatas && item.disasterScopeDatas.length > 0){
                    this.resolveList.push({
                      name: item.name,
                      value: item.id,
                      children: item.disasterScopeDatas
                    })
                  }else{
                    this.resolveList.push({
                      name: item.name,
                      value: item.id,
                      yhfwLink: item.link
                    })
                  }
                })
              }
            }
          })
          break;
        case "cllx":
          getEvacuationRouteList({disasterId:  this.analysisDetails.data.data.id}).then(res=>{
            if(res.data.data) {
              let layerTreeData = res.data.data
              if(layerTreeData.records.length){
                layerTreeData.records.forEach(item=>{
                  if(item.disasterEvacuationRouteMapDatas && item.disasterEvacuationRouteMapDatas.length > 0){
                    this.resolveList.push({
                      name: item.name,
                      value: item.id,
                      children: item.disasterEvacuationRouteMapDatas
                    })
                  }else{
                    this.resolveList.push({
                      name: item.name,
                      value: item.id,
                      cllxLink: item.link
                    })
                  }
                })
              }
            }
          })
          break;
        case "qxsy":
          getTiltPhotographyList({disasterId:  this.analysisDetails.data.data.id}).then(res=>{
            let layerTreeData = res.data.data
            if(layerTreeData) {
              if(layerTreeData.records && layerTreeData.records.length){
                layerTreeData.records.forEach(item=>{
                  this.resolveList.push({
                    name: item.name,
                    value: item.id,
                    qxsyLink: item.link,
                    height: item.height
                  })
                })
              }
            }
          })
          break;
        case "zsyx":
          getOrthoPhotoList({disasterId:  this.analysisDetails.data.data.id}).then(res=>{
            if(res.data.data) {
              let layerTreeData = res.data.data
              if(layerTreeData.records.length){
                layerTreeData.records.forEach(item=>{
                  if(item.link!==""){
                    this.resolveList.push({
                      name: item.name,
                      value: item.id,
                      zsyxLink: item.link
                    })
                  }
                })
              }
            }
          })
          break;
        case "qjt":
          getPanoramaList({disasterId:  this.analysisDetails.data.data.id}).then(res=>{
            if(res.data.data) {
              let layerTreeData = res.data.data
              if(layerTreeData.records.length){
                layerTreeData.records.forEach(item=>{
                  if(item.fileId){
                    this.resolveList.push({
                      name: item.fileName,
                      value: item.fileId,
                      qjtUrl: item.fileUrl
                    })
                  }
                })
              }
            }
          })
          break;
        case "yxt":
          getImgMapList({disasterId:  this.analysisDetails.data.data.id}).then(res=>{
            if(res.data.data) {
              let layerTreeData = res.data.data
              if(layerTreeData.records.length){
                layerTreeData.records.forEach(item=>{
                  if(item.link!==""){
                    this.resolveList.push({
                      name: item.name,
                      value: item.id,
                      yxtLink: item.link
                    })
                  }
                })
              }
            }
          })
          break;
        case "dem":
          getTiltAltitudeList({disasterId:  this.analysisDetails.data.data.id}).then(res=>{
            if(res.data.data) {
              let layerTreeData = res.data.data
              if(layerTreeData.records.length){
                layerTreeData.records.forEach(item=>{
                  if(item.link!==""){
                    this.resolveList.push({
                      name: item.name,
                      value: item.id,
                      demLink: item.link
                    })
                  }
                })
              }
            }
          })
          break;
        default:
          getCloudTree({disasterId:  this.analysisDetails.data.data.id}).then(res=>{
            if(res.data.data) {
              let layerTreeData = res.data.data
              if(layerTreeData && layerTreeData.length){
                layerTreeData.forEach(item=>{
                  if(item.children && item.children.length){
                    this.resolveList.push({
                      name: item.name,
                      value: item.id,
                      children: item.children
                    })
                  }
                })
              }
            }
          })
          break;
      }
    },

    getViewNarrow() {
      this.mapFunc.goNarrow()
    },

    getDrawList(type) {
      let monitorId = this.analysisDetails.data.data.id;
      this.mapDrawTable = []
      if(type){
        this.activeList = type
        switch(type) {
          case 'spot':
            getMapDrawList({ current: 1, size:1000, monitorId }).then(res=>{
              if(res.data && res.data.data.records){
                let spotRecords = res.data.data.records
                spotRecords = spotRecords.filter(s=>{
                  return s.type == 'spot'
                })
                spotRecords.forEach(item=>{
                  item['layerShow'] = false
                  this.drawedControl(item)
                })
                this.mapDrawTable = spotRecords
              }
            })
            break;
          case 'line':
            getMapDrawList({ current: 1, size:1000, monitorId }).then(res=>{
              if(res.data && res.data.data.records){
                let lineRecords = res.data.data.records
                lineRecords = lineRecords.filter(s=>{
                  return s.type == 'line'
                })
                lineRecords.forEach(item=>{
                  item['layerShow'] = false
                  this.drawedControl(item)
                })
                this.mapDrawTable = lineRecords
              }
            })
            break;
          default:
            getMapDrawList({ current: 1, size:1000, monitorId }).then(res=>{
              if(res.data && res.data.data.records){
                let areaRecords = res.data.data.records
                areaRecords = areaRecords.filter(s=>{
                  return s.type == 'area'
                })
                areaRecords.forEach(item=>{
                  item['layerShow'] = false
                  this.drawedControl(item)
                })
                this.mapDrawTable = areaRecords
              }
            })
            break;
        }
      }else{
        this.activeList = null;
        this.hideAllStatus = false;
        getMapDrawList({ current: 1, size:1000, monitorId }).then(res=>{
          if(res.data && res.data.data.records){
            let allRecords = res.data.data.records
            allRecords.forEach(item=>{
              !item['layerShow'] && (item['layerShow'] = false)
            })
            this.mapDrawTable = allRecords
            this.mapDrawTable.forEach(tab=>{
              this.drawedControl(tab)
            })
          }
        })
      }
    },

    activeDrawSpot(row, loa){
      let pointLoa;
      if(loa && this.panelStatus == 1){
        pointLoa = loa
      }else{
        row.monitorVisualDrawingLatLonList.forEach(p=>{
          pointLoa = {
            longitude: p.longitude,
            latitude: p.latitude,
          }
        })
      }
      this.mapFunc.drawSpot(pointLoa, row, this);
    },

    activeDrawLine(row, loa){
      let lineLoa = [],
          lineDottedLoa = [];
      if(loa && this.panelStatus == 1){
        loa.forEach((p)=>{
          lineLoa.push(p.longitude);
          lineLoa.push(p.latitude);
          lineDottedLoa.push([p.longitude, p.latitude])
        })
      }else{
        row.monitorVisualDrawingLatLonList.forEach((e) => {
          lineLoa.push(e.longitude);
          lineLoa.push(e.latitude);
          lineDottedLoa.push([e.longitude, e.latitude])
        });
      }
      if(row.lineType && row.lineType == "1"){
        this.mapFunc.drawLine(lineLoa, row, this);
      }else{
        this.mapFunc.drawLine(lineDottedLoa, row, this);
      }
    },

    activeDrawArea(row, loa){
      let areaLoa = [];
      if(loa && this.panelStatus == 1){
        loa.forEach((p)=>{
          areaLoa.push([p.longitude, p.latitude])
        })
      }else{
        row.monitorVisualDrawingLatLonList.forEach((e) => {
          areaLoa.push([e.longitude,e.latitude])
        });
      }
      this.mapFunc.drawArea(areaLoa, row, this);
    },
    /**
     * @param { 行属性 } row
     */
    drawedControl(row) {
      this.panelStatus = undefined;
      this.beforeData = row
      this.$nextTick(()=>{
        this.mapDrawTable.forEach(tab=>{
          if(tab.id == row.id) {
            tab.layerShow = !tab.layerShow
          }
        })
      })

      if(row.layerShow){
        this.mapFunc.removeDrawLayer(row.name, row.type)
        switch(row.type){
          case 'spot':
            this.pointAttrShow = false
            break;
          case 'line':
            this.lineAttrShow = false
            break;
          default:
            this.areaAttrShow = false
        }
      }else{
        switch(row.type){
          case 'spot':
            let pointAtt = {}
            row.monitorVisualDrawingLatLonList.forEach(p=>{
              pointAtt = {
                longitude: p.longitude,
                latitude: p.latitude,
              }
            })
            this.spotLoc = pointAtt
            this.pointAttrShow = false
            this.lineAttrShow = false;
            this.areaAttrShow = false;
            this.mapFunc.drawSpot(pointAtt, row, this);
            break;
          case 'line':
            let lineAtt = []
            let lineDottedAtt = []
            row.monitorVisualDrawingLatLonList.forEach((e) => {
              lineAtt.push(e.longitude);
              lineAtt.push(e.latitude);
              lineDottedAtt.push([e.longitude, e.latitude])
            });
            this.lineLoc = lineAtt || lineDottedAtt
            this.lineAttrShow = false
            this.pointAttrShow = false;
            this.areaAttrShow = false;
            if(row.lineType == "1"){
              this.mapFunc.drawLine(lineAtt, row, this);
            }else{
              this.mapFunc.drawLine(lineDottedAtt, row, this);
            }
            break;
          default:
            let areaDottedAtt = []
            row.monitorVisualDrawingLatLonList.forEach((e) => {
              areaDottedAtt.push([e.longitude,e.latitude])
            });
            this.areaLoc = areaDottedAtt
            this.areaAttrShow = false
            this.pointAttrShow = false;
            this.lineAttrShow = false;
            this.mapFunc.drawArea(areaDottedAtt, row, this);
            break;
        }
      }
    },

    drawComplete(){
      this.panelStatus = 1
      if(this.spotLoc.longitude && this.spotLoc.latitude){
        this.pointAttrShow = true;
        this.lineAttrShow = false;
        this.areaAttrShow = false;
      }else if(this.lineLoc.length>1){
        this.pointAttrShow = false;
        this.lineAttrShow = true;
        this.areaAttrShow = false;
      }else if(this.areaLoc.length>1){
        if(this.areaLoc.length < 3) {
          this.$message.warning('绘制点位过少')
          this.mapFunc.monomerFun(this.mapDrawArea, this.drawComplete, this);
          return;
        }
        this.pointAttrShow = false;
        this.lineAttrShow = false;
        this.areaAttrShow = true;
      }
    },

    /**
     * 绘制点按钮点击
     */
    eveDrawPoint(n){
      this.mapFunc.monomerFun(this.mapDrawPoint, this.drawComplete, this);
      this.points = [];
      this.spotLoc = {}
      this.lineLoc = []
      this.areaLoc = []
      this.pointForm = {
        name: "",
        color: "#FFFF00",
        labelColor: "#FFFF00",
        fontSize: "16",
        fontBold: true,
        labelDisplay: true
      }
      this.lineAttrShow = false;
      this.areaAttrShow = false;
    },

    /**
     * 绘制线按钮点击
     */
    eveDrawLine(value) {
      this.mapFunc.monomerFun(this.mapDrawLine, this.drawComplete, this);
      this.points = [];
      this.spotLoc = {}
      this.lineLoc = []
      this.areaLoc = []
      this.lineForm = {
        name: "",
        lineType: "1",
        thickness: 1,
        color: "#FFFF00",
        fontSize: "16",
        labelColor: "#FFFF00",
        fontBold: true,
        labelDisplay: true
      }
      this.pointAttrShow = false;
      this.areaAttrShow = false;
    },

    /**
     * 绘制面按钮点击
     */
    eveDrawArea(value) {
      this.mapFunc.monomerFun(this.mapDrawArea, this.drawComplete, this);
      this.points = [];
      this.spotLoc = {}
      this.lineLoc = []
      this.areaLoc = []
      this.areaForm = {
        name: "",
        color: "#FFFF00",
        borderColor: "#FFFF00",
        fontSize: '16',
        labelColor: "#FFFF00",
        fontBold: true,
        labelDisplay: true
      }
      this.pointAttrShow = false;
      this.lineAttrShow = false;
    },
    /**
     * 绘制点
     */
    mapDrawPoint(p){
      let pointLoc = {
        longitude: p.mapPoint.longitude,
        latitude: p.mapPoint.latitude,
      }
      this.spotLoc = pointLoc;
      this.mapFunc.drawSpot(pointLoc, this.pointForm);
    },
     /**
     * 绘制线
     */
    mapDrawLine(value){
      this.points.push(value.mapPoint);
      // this.mapFunc.monomerRemove(1, false); //移除
      this.lineLoc = []
      let path = [];
      let dottedpath = [];
      this.points.forEach((e) => {
        path.push(e.longitude);
        path.push(e.latitude);
        this.lineLoc.push({
          longitude: e.longitude,
          latitude: e.latitude,
        });
        dottedpath.push([e.longitude,e.latitude])
      });

      let n = this.points.length;

      if (n == 1) {
        this.mapFunc.drawSpot({
          longitude: value.mapPoint.longitude,
          latitude: value.mapPoint.latitude,
        }, this.lineForm, this);
        this.$message("请点击第 二 个点");
      } else {
        if(this.lineForm.lineType == "1"){
          this.mapFunc.drawLine(path, this.lineForm, this);
        }else{
          this.mapFunc.drawLine(dottedpath, this.lineForm, this);
        }
      }
    },

    mapDrawArea(value){
      this.points.push(value.mapPoint);
      // this.mapFunc.monomerRemove(1, this.areaForm); //移除
      this.areaLoc = []
      let path = [];
      let dottedpath = [];
      this.points.forEach((e) => {
        path.push(e.longitude);
        path.push(e.latitude);
        dottedpath.push([e.longitude,e.latitude])
        this.areaLoc.push({
          longitude: e.longitude,
          latitude: e.latitude,
        });
      });

      let n = this.points.length;
      if (n == 1) {
        this.mapFunc.drawSpot({
          longitude: value.mapPoint.longitude,
          latitude: value.mapPoint.latitude,
        }, this.areaForm, this);
        this.$message("请点击第 二 个点");
      } else if (n == 2) {
        this.mapFunc.drawLine(path, this.areaForm);
        this.$message("请点击第 三 个点");
      } else {
        this.mapFunc.drawArea(dottedpath, this.areaForm, this);
      }
    },

    drawPoint(value) {
      this.points.push(value.mapPoint);
      this.mapFunc.monomerRemove(1, false); //移除
      let path = [];
      this.points.forEach((e) => {
        path.push(e.longitude);
        path.push(e.latitude);
      });

      let n = this.points.length;
      if (n == 1) {
        this.mapFunc.skimSpot({
          longitude: value.mapPoint.longitude,
          latitude: value.mapPoint.latitude,
        });
        this.$message("请点击第 二 个点");
      } else if (n == 2) {
        this.mapFunc.skimLine(path);
        this.$message("请点击第 三 个点");
      } else {
        this.mapFunc.addOutside(path);
      }
    },
    profileCallback(datas) {
      let data = datas.mapPoint;
      this.profilePath.push(data);
      if (this.profilePath.length > 1) {
        this.mapFunc.profile(this.profilePath, this.profileAccomplish);
        this.mapFunc.singlepicker &&
          (this.mapFunc.singlepicker.destroy(),
          (this.mapFunc.singlepicker = false));
      } else {
        this.mapFunc.skimSpot(data, 5);
      }
    },
    profileAccomplish(data, _maxN, _minN) {
      //显示曲线，设置Y轴最大值，最小值
      this.isprofile = true;
      let myChart = this.$echarts.init(this.$refs.profileChart);
      this.options.series[0].data = data;
      myChart.setOption(this.options);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
      this.profilePath = [];
    },

    mapDrawClick(type){
      this.mapFunc.toolsRemove();
      this.pointForm.name = ""
      this.lineForm.name = ""
      this.areaForm.name = ""
      switch (type) {
        case "1":
          this.eveDrawPoint(type);
          this.$message('单击左键开始绘制，右键结束绘制')
          break; //绘制点
        case "2":
          this.eveDrawLine(type);
          this.$message('单击左键开始绘制，右键结束绘制')
          break; //绘制点
        case "3":
          this.eveDrawArea(type);
          this.$message('单击左键开始绘制，右键结束绘制')
          break; //绘制点
        case "4":
          this.layerListHide();
          break; //隐藏所有绘制
        default:
          this.layerListRemove();
          break; //删除全部
      }
    },

    operationClick(n) {
      //点击各操作
      this.mapFunc.toolsRemove();
      this.isprofile = false;
      if (this.operationIndex == n) {
        this.operationIndex = null;
        this.changeHeightShow = false
        window.viewer.scene.globe.depthTestAgainstTerrain = false;
        return;
      }
      window.viewer.scene.globe.depthTestAgainstTerrain = true;

      this.operationIndex = n;
      switch (n) {
        case "0":
          this.boxSelection();
          break; //框选
        case "1":
          this.changeHeightShow = false
          this.mapFunc.areaUsed(3, this, this.slopeMeasure);
          break; //坡度测量
        case "2":
          this.changeHeightShow = false
          this.mapFunc.areaUsed(1, this, this.lengthMeasure);
          break; //长度测量
        case "3":
          this.changeHeightShow = false
          this.mapFunc.areaUsed(0, this, this.areaMeasure);
          break; //面积测量
        case "4":
          this.changeHeightShow = false
          this.mapFunc.areaUsed(2, this, this.highMeasure);
          break; //高度测量
        case "5":
          this.profileAnalysis();
          break; //剖面分析
        case "6":
          this.sectionAnalysis();
          break; //剖面分析
        case "7":
          this.endwiseMove(n);
          break; //纵向移动
        default:
          this.crossrangeMove(n);
          break; //横向移动
      }
    },

    addHeight() {
      this.relativeHeight += 1
    },

    reduceHeight() {
      this.relativeHeight -= 1
    },

    /**
     * 获取选择的模型对象
     */
    tookMain(objMod, changeH) {
      this.modelObj = objMod;
      let tookType = objMod.type;
      let modData = objMod.pickObj;
      let modAttr = objMod.attr;
      let points = objMod.truePoints;
      if(!changeH){
        this.relativeHeight = modAttr.height
      }
      if(points && !this.changeHeightShow){
        this.mapFunc.geetModel(modData, modAttr, tookType, points, this.relativeHeight)
      }else{
        this.mapFunc.geetModel(modData, modAttr, tookType, points, this.relativeHeight)
      }
    },

    cancelMain(p, o) {
      let id = null;
      if (o && o.id) {
        id = o.id.id.replace("module","").replace("device", "");
      }else{
        this.$message.warning('[右键点击模型确定操作]')
      }
      let editPointForm = {}
      if(p.longitude && p.latitude && id) {
        editPointForm = {
          id: Number(id),
          altitude: Number(this.relativeHeight),
          longitude: Number(p.longitude),
          latitude: Number(p.latitude),
        }
      }
      if(o.id.id.indexOf('module') !== -1){
        monitorUpdateLonLatById(editPointForm).then(res=>{
          if(res.data.data){
            this.$message.success('修改经纬度成功')
            this.$bus.$emit('refreshDeviceLonlat', { status: true });
            this.$bus.$emit('refreshLonlat', { status: true });
          }
        })
      }else{
        updateLongAndLatById(editPointForm).then(res=>{
          if(res.data.data){
            this.$message.success('修改经纬度成功')
            this.$bus.$emit('refreshDeviceLonlat', { status: true });
          }
        })
      }
      this.overOfClick = false;
      this.operationIndex = null;
      this.changeHeightShow = false;
    },

    /**
     * 图标纵向移动
     */
    endwiseMove(level) {
      this.overOfClick = true;
      if(this.overOfClick){
        this.mapFunc.takeModule(this.tookMain, this.cancelMain, 'endwise')
        this.relativeHeight = 0;
        this.changeHeightShow = !this.changeHeightShow
        this.$message.warning("请选择灾害点或设备,右键点击确定操作")
      }
    },

    /**
     * 图标横向移动
     */
    crossrangeMove(level) {
      this.overOfClick = true;
      if(this.overOfClick){
        this.mapFunc.takeModule(this.tookMain, this.cancelMain, 'cross')
        this.changeHeightShow = false
        this.$message.warning("请选择灾害点或设备,拖动鼠标移动模型,右键点击确定操作")
      }
    },

    layerListHide(status) {
      if(status!==undefined){
        this.hideAllStatus = status
      }else{
        this.hideAllStatus = !this.hideAllStatus
      }
      let monitorId = this.analysisDetails.data && this.analysisDetails.data.data.id;
      if(!this.hideAllStatus){
        getMapDrawList({ current: 1, size:1000, monitorId }).then(res=>{
          if(res.data && res.data.data.records){
            let allRecords = res.data.data.records
            allRecords.forEach(item=>{
              item['layerShow'] = false
              this.drawedControl(item)
            })
          }
        })
      }else{
        getMapDrawList({ current: 1, size:1000, monitorId }).then(res=>{
          if(res.data && res.data.data.records){
            let allRecords = res.data.data.records
            allRecords.forEach(item=>{
              item['layerShow'] = true
              this.drawedControl(item)
              this.mapFunc.removeDrawLayer(item.name, item.type)
            })
          }
        })
      }
    },

    closeAttrPop(type) {
      let isSaveStatus = false
      if( this.isSpotChangeAttr || this.isLineChangeAttr || this.isAreaChangeAttr ){
        this.isSpotChangeAttr = false
        this.isLineChangeAttr = false
        this.isAreaChangeAttr = false
        isSaveStatus = false
      }else{
        if (this.mapDrawTable.length) {
          this.mapDrawTable.forEach(tab=>{
            if(
              tab == this.pointForm ||
              tab == this.lineForm ||
              tab == this.areaForm
            ){
              this.pointAttrShow = false;
              this.lineAttrShow = false;
              this.areaAttrShow = false;
              isSaveStatus = true
            }
          })
        }else{
          isSaveStatus = false
          this.$confirm('是否保存绘制内容？')
            .then(_=>{
              this.onDrawSubmit(type)
              return;
            })
            .catch(()=>{
              this.deleteNoneSave(type)
              this.getDrawList(type)
            })
        }
      }
      if(!isSaveStatus){
        this.$confirm('是否保存绘制内容？')
          .then(_=>{
            this.onDrawSubmit(type)
            this.isSpotChangeAttr = false
            this.isLineChangeAttr = false
            this.isAreaChangeAttr = false
          })
          .catch(()=>{
            this.getDrawList(type)
            switch(type) {
              case 'spot':
                this.pointAttrShow = false;
                this.mapFunc.removeDrawLayer(this.pointForm.name, type)
                break;
              case 'line':
                this.lineAttrShow = false;
                this.mapFunc.removeDrawLayer(this.lineForm.name, type)
                break;
              default:
                this.areaAttrShow = false;
                this.mapFunc.removeDrawLayer(this.areaForm.name, type)
                break;
            }
          })
      }
    },

    /**
     * 清除未保存图层
     */
    deleteNoneSave(type) {
      switch(type) {
        case 'spot':
          this.pointAttrShow = false;
          this.mapFunc.removeDrawLayer(this.beforeData.name, type)
          this.mapFunc.removeDrawLayer(this.pointForm.name, type)
          break;
        case 'line':
          this.lineAttrShow = false;
          this.mapFunc.removeDrawLayer(this.beforeData.name, type)
          this.mapFunc.removeDrawLayer(this.lineForm.name, type)
          break;
        default:
          this.areaAttrShow = false;
          this.mapFunc.removeDrawLayer(this.beforeData.name, type)
          this.mapFunc.removeDrawLayer(this.areaForm.name, type)
          break;
      }
    },

    /**
     * 删除所有绘制
     */
    layerListRemove() {
      let monitorId = this.analysisDetails.data.data.id;
      this.$confirm('确认删除该监测点所有绘制内容？').then(_=>{
        getMapDrawList({ current: 1, size:1000, monitorId }).then(res=>{
          if(res.data && res.data.data.records){
            let areaRecords = res.data.data.records
            areaRecords.forEach(tab=>{
              this.mapFunc.removeDrawLayer(tab.name, tab.type)
              deleteMapDraw(tab.id).then(res=>{
                if(res.data.data){
                  this.getDrawList('spot')
                }
              })
            })
            this.$message.success('删除成功')
          }
        })

      })
    },
    /**
      *删除绘制
      *@constructor
      *@param {}
      */
    onDrawDelete(attr, type) {
      this.$confirm('确认删除当前绘制？')
        .then( () => {
          this.mapFunc.removeDrawLayer(attr.name, type)
          switch(type) {
            case 'spot':
              this.spotLoc = {};
              this.points = [];
              this.pointForm = {
                name: "",
                color: "#FFFF00",
                labelColor: "#FFFF00",
                fontSize: "16",
                fontBold: true,
                labelDisplay: true
              };
              break;
            case 'line':
              this.lineLoc = [];
              this.points = [];
              this.lineForm = {
                name: "",
                lineType: "1",
                thickness: 1,
                color: "#FFFF00",
                fontSize: "16",
                labelColor: "#FFFF00",
                fontBold: true,
                labelDisplay: true
              };
              break;
            default:
              this.areaLoc = [];
              this.points = [];
              this.areaForm = {
                name: "",
                color: "#FFFF00",
                borderColor: "#FFFF00",
                fontSize: '16',
                labelColor: "#FFFF00",
                fontBold: true,
                labelDisplay: true
              };
              break;
          };
          if(attr.id){
            deleteMapDraw(attr.id).then(res=>{
              if(res.data.data){
                this.$message.success('删除成功')
                this.getDrawList(type)
              }
            })
          }else{
            this.$message.success('删除成功')
          }
          this.pointAttrShow = false;
          this.lineAttrShow = false;
          this.areaAttrShow = false;
        })
    },

    /**
      *保存修改绘制
      *@constructor
     */
    onDrawSubmit(type){
      let queryForm = {}
      let monitorVisualDrawingLatLonList = []
      switch (type){
        case 'spot':
          if(this.spotLoc.longitude && this.spotLoc.latitude){
            monitorVisualDrawingLatLonList.push(this.spotLoc)
            queryForm = {
              ...this.pointForm,
              type: "spot",
              monitorId: this.analysisDetails.data.data.id,
              monitorVisualDrawingLatLonList
            }
          }else{
            this.$message("请绘制点")
          }
          break;
        case 'line':
          if(this.lineLoc.length > 1){
            queryForm = {
              ...this.lineForm,
              type: "line",
              monitorId: this.analysisDetails.data.data.id,
              monitorVisualDrawingLatLonList: this.lineLoc
            }
          }else{
            this.$message("请绘制线")
          }
          break;
        default:
          if(this.areaLoc.length > 1){
            queryForm = {
              ...this.areaForm,
              type: "area",
              monitorId: this.analysisDetails.data.data.id,
              monitorVisualDrawingLatLonList: this.areaLoc
            }
          }else{
            this.$message("请绘制面")
          }
          break;
      }
      getMapDrawList({
        current: 1,
        size: 1000,
        monitorId: this.analysisDetails.data.data.id
      }).then(res=>{
        if(res.data && res.data.data.records){
          let repeatName = []
          let allRecords = res.data.data.records
          allRecords.forEach(tab=>{
            repeatName.push(tab.name)
          })
          this.$refs[`${type}Form`].validate((valid) => {
            if (valid) {
              if(queryForm.id){
                this.mapFunc.removeDrawLayer(this.beforeData.name, type)
                editMapDraw(queryForm).then(res=>{
                  if(res.data.data){
                    this.pointAttrShow = false;
                    this.lineAttrShow = false;
                    this.areaAttrShow = false;
                    this.isSpotChangeAttr
                    || this.isAreaChangeAttr
                    || this.isLineChangeAttr
                    && this.$message.success('修改成功')
                    this.getDrawList(type)
                  }
                })
              }else{
                if(repeatName.indexOf(queryForm.name)==-1){
                  addMapDraw(queryForm).then(res=>{
                    if(res.data.data){
                      this.pointAttrShow = false;
                      this.lineAttrShow = false;
                      this.areaAttrShow = false;
                      this.$message.success('保存成功')
                      this.getDrawList(type)
                    }
                  })
                }else{
                  this.$message.warning('不能使用相同名称')
                }
              }
            }
          });
        }
      })
      // this.mapFunc.removeUsed()
    },

    boxSelection() {
      //点击在3d面
      window.viewer.scene.globe.depthTestAgainstTerrain = true;
      //清除框选
      this.changeHeightShow = false
      this.mapFunc.gra3 && this.mapFunc.map.remove(this.mapFunc.gra3);
      this.mapFunc.monomerFun(this.drawPoint, this.drawconfirem);
      this.$message("鼠标移动选择范围，单击确认范围");
      this.points = [];
    },
    slopeMeasure(data) {},
    lengthMeasure(data) {},
    areaMeasure(data) {
      this.areaTotal = data.label.text._value;
    },
    highMeasure(data) {},
    profileAnalysis() {
      this.changeHeightShow = false
      this.mapFunc.coverageCLICK(this.profileCallback, {}, true, true);
    },
    sectionAnalysis() {
      this.changeHeightShow = false
      this.mapFunc.stratumSection();
    },

    selectedFun(val) {
      val == this.currentlySelected
        ? (this.currentlySelected = "")
        : (this.currentlySelected = val);
      if(this.currentlySelected == "" || val !=="draw"){
        this.layerViewShow = false
        this.hideAllStatus = false
        this.changeHeightShow = false
        this.operationIndex = null
        this.layerListHide(true)
      }else{
        this.hideAllStatus = true
        this.getDrawList()
        this.layerSwitchChange()
      }
    },

    controlShow(id) {
      this.mapFunc.hideStratum(id);
    },

    deleteLineAndHeightByTin() {
      for (let i = 0; i < this.planeJson.length; i++) {
        this.planeJson[i] &&
          this.mapFunc.deleteLineAndHeightByTin(
            this.planeJson[i].level,
            "plane",
            "ng"
          );
      }
      for (let i = 0; i < this.wallJson.length; i++) {
        this.wallJson[i] &&
          this.mapFunc.deleteLineAndHeightByTin(
            Math.abs(this.wallJson[i].level),
            "wall",
            "ng"
          );
      }
    },

    dellColors(colorList, scale) {
      let alphaBuf = "";
      let colorArr = "";
      if (colorList && colorList.length > 0) {
        colorArr = colorList.map((res) => {
          if (scale) {
            alphaBuf = Number((scale.toFixed(2) * 255).toFixed(0)).toString(16);
            return res + alphaBuf;
          }
        });
      }
      return colorArr;
    },

    drawStratumModel(type, opa) {
      let colors = [
        "#FFFFFF",
        "#FFFFFF",
        "#FFEBCE",
        "#FFDDAD",
        "#FF8999",
        "#FFED8B",
        "#FFD701",
        "#54FF9F",
        "#46E687",
        "#6B5ACD",
        "#8370FE",
        "#7B67ED",
        "#483D8B",
        "#999C9A",
        "#353628",
      ];
      let colorsDc = this.dellColors(colors, opa);
      this.wallJson = [];
      this.planeJson = [];
      YTModelData.map((item) => {
        if (item.level < 0) {
          this.wallJson.push(item);
        }
        if (item.level > 0) {
          this.planeJson.push(item);
        }
      });
      if (type && type == "dc") {
        for (let i = 0; i < this.planeJson.length; i++) {
          this.planeJson[i] &&
            this.mapFunc.getLineAndHeightByTin(
              this.planeJson[i].level,
              "plane",
              this.planeJson[i].points,
              this.planeJson[i].conbination,
              colorsDc[this.planeJson[i].level * 1],
              "ng",
              undefined,
              true,
              undefined,
              type
            );
        }
        for (let i = 0; i < this.wallJson.length; i++) {
          this.wallJson[i] &&
            this.mapFunc.getLineAndHeightByTin(
              Math.abs(this.wallJson[i].level),
              "wall",
              this.wallJson[i].points,
              this.wallJson[i].conbination,
              colorsDc[Math.abs(this.wallJson[i].level)],
              "ng",
              undefined,
              true,
              undefined,
              type
            );
        }
      } else {
        for (let i = 0; i < this.planeJson.length; i++) {
          this.planeJson[i] &&
            this.mapFunc.getLineAndHeightByTin(
              this.planeJson[i].level,
              "plane",
              this.planeJson[i].points,
              this.planeJson[i].conbination,
              colors[this.planeJson[i].level * 1],
              "ng",
              undefined,
              true,
              undefined,
              undefined
            );
        }
        for (let i = 0; i < this.wallJson.length; i++) {
          this.wallJson[i] &&
            this.mapFunc.getLineAndHeightByTin(
              Math.abs(this.wallJson[i].level),
              "wall",
              this.wallJson[i].points,
              this.wallJson[i].conbination,
              colors[Math.abs(this.wallJson[i].level)],
              "ng",
              undefined,
              true,
              undefined,
              undefined
            );
        }
      }
    },

    deleteUnderground(iszuankong) {
      drillData.map((val) => {
        this.mapFunc.deleteUnderground(val.FID, iszuankong);
      });
    },

    drawUnderground() {
      let drillColor = {
        A: "rgb(165, 168, 164)",
        B: "rgb(255, 235, 206)",
        C: "rgb(255, 221, 173)",
        D: "rgb(252, 137, 153)",
        E: "rgb(255, 237, 139)",
        F: "rgb(255, 215, 1)",
        G: "rgb(84, 255, 159)",
        H: "rgb(0, 163, 59)",
        I: "rgb(107, 90,	205)",
        J: "rgb(131, 112, 254)",
        K: "rgb(123, 103, 237)",
        L: "rgb(72, 61, 139)",
        M: "rgb(153, 156, 154)",
        N: "rgb(53, 54, 40)",
      };

      this.mapFunc.drawUnderground(drillData, drillColor);
    },
    drawLine() {
      this.lineData.forEach((e) => {
        let path = [];
        if (e.lineType == 0) {
          e.disasterRangeLatLonVOList.forEach((e2) => {
            path.push(e2.longitude, e2.latitude);
          });
          path.push(path[0], path[1]);
          this.mapFunc.skimLine(path, e.color, e.thickness);
        } else if (e.lineType == 1) {
          this.mapFunc.ArrowsPoint(
            e.disasterRangeLatLonVOList,
            e.color,
            e.thickness
          );
        } else if (e.lineType == 2) {
          e.disasterRangeLatLonVOList.forEach((e2) => {
            path.push([e2.longitude, e2.latitude]);
          });
          path.push(path[0]);
          this.mapFunc.dottedLine(path, e.color, e.thickness);
        }
      });
    },
    handleClose() {
      this.$nextTick(() => {
        this.$refs.layerTree.setCheckedKeys([])
      });
    },
    holdConference() {
      this.$store.commit("SET_PUBLIC_WINDOW_DATA", {
        status: true,
        name: "holdConference",
        style: {
          width: "1670px",
          height: "750px",
          left: "calc(50% - 775px)",
          title: "应急会商",
          background: "rgba(10,10,10,0.3)!important",
        },
        data: {},
      });
    },
    action(val) {
      this.pictureUrl = this.lineData[val.primitive.id.split("_")[1]].name;
      this.pictureTime =
        this.lineData[val.primitive.id.split("_")[1]].createTime;

      // this.pictureUrl ="http://221.13.67.194:39001/luohu_file/2021/09/18/23/09ddd045-b185-4018-981f-c9facc937de6.jpg";
      this.picturePreview = true;
    },

    btmdInput() {
      this.$nextTick(() => {
        this.mapFunc.SurfaceAlpha(this.btmdValue / 100);
      });
    },
    stratumInput() {
      this.$nextTick(() => {
        let scale = this.stratumValue / 100;
        this.deleteLineAndHeightByTin();
        this.drawStratumModel("dc", scale);
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.operation-map {
  color: #fff;
  position: absolute;
  right: 0;
  top: 75px;
  margin: 15px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: top 0.8s, right 0.8s;
  user-select: none;
  z-index: 1001;

  .tart-layer {
    position: absolute;
    margin: 250px 0 0 0;
  }

  .layer,
  .fullScreen,
  .control {
    position: relative;
    margin: 7px 0 0 0;
    z-index: 1002;
  }

  .layer,
  .fullScreen {
    .el-button {
      height: 56px;
      width: 48px;
      padding: 0 5px;
      border-radius: 5px;
      background-color: #57a0f8c7;
      ::v-deep span {
        display: flex;
        justify-content: center;
        align-content: space-around;
        flex-wrap: wrap;
        height: 100%;
        width: 100%;
        .iconfont {
          font-size: 24px !important;
        }
      }
    }
  }

  .control {
    height: 120px;
    width: 48px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 5px;
    background-color: #57a0f8c7;
    .el-button {
      margin: 0;
      padding: 0;
      width: 100%;
      border: none;
      background: transparent;
      .iconfont {
        font-size: 24px !important;
      }
    }
  }

  .fullScreen {
    margin: 0;
  }

  .toolbarPage,
  .layerPage,
  .MapPage {
    position: absolute;
    right: -235px;
    height: 0;
    width: auto;
    max-width: 280px;
    border-radius: 6px;
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    opacity: 0;
    overflow: hidden;

    .bc_btnbox-title {
      height: 50px;
      line-height: 50px;
      width: 100%;
      border-radius: 6px 6px 0px 0px;
      font-size: 18px;
      text-indent: 25px;
      background: rgba(0, 0, 0, 0.4);
      cursor: pointer;
    }

    .bc_toolbar-mainbox{
      padding: 5px 20px 0;
      width: 100%;
      .bc_toolbar-label{
        padding: 0;
        margin: 2px;
      }
      .bc_toolbar-label::before{
        content: "";
        display: inline-block;
        width: 9px;
        height: 9px;
        margin: 0 5px;
        background: #5AAF73;
        border-radius: 50%;
      }
      .bc_toolbar-btns {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: center;
        padding: 2px 0 10px 0;
        overflow: hidden;
        border-radius: 3px;

        .bc_toolbar-btnbox{
          height: 60px;
          width: 60px;
          margin: 10px;
          .bc_toolbar-btnbg {
            width: 48px;
            height: 48px;
            line-height: 48px;
            border-radius: 5px;
            overflow: hidden;
            margin: 0 auto;
            text-align: center;
            background: rgba(0, 0, 0, 0.6);
            cursor: pointer;
            .iconfont {
              font-size: 24px;
            }
          }
          .active {
            background: #0480e6;
          }

          > span {
            display: inline-block;
            width: 100%;
            font-size: 14px;
            text-align: center;
            margin-top: 5px;
          }
        }
      }
    }

    .bc_draw-list{
      width: 80%;
      margin: 5px auto 20px;
      background: rgba($color: #000000, $alpha: 0.4);
      .bc_draw-list-btn{
        width: 100%;
        .el-button-group{
          width: 100%;
          display: flex;
          justify-content: space-between;
          .bc_draw-list-active{
            background: #0265aecc !important;
            color: #1EE7F2 !important;
          }
          .el-button{
            width: 33%;
            height: 4vh;
            color: #fff;
            background: #0266ae5e
          }
          .el-button:hover{
            color: #1EE7F2;
          }
          .el-button:first-child, .el-button:last-child{
            border:none
          }
          .el-button:not(:first-child):not(:last-child){
            border-right: 1px solid #000;
            border-left: 1px solid #000;
            border-top: none;
            border-bottom: none;
          }
        }
      }
      .bc_draw-list-tab{
        width: 100%;
        padding: 2px;
        max-height: 13vh;

        p{
          margin: 0;
          padding: 0;
          height: 28px;
          display: flex;
          justify-content: space-around;
          font-size: 12px;
          line-height: 28px;
          background: #5489a218;
          span{
            display:block;
            width: calc(100% - 60px);
            text-indent: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          i{
            cursor: pointer;
            text-align: center;
            width: 60px;
          }
        }
        p:nth-child(even){
          background: #5489a23b;
        }
      }
    }

    .bc_switch-mainbox{
      padding: 10px 3px;
      .bc_toolbar-switch{
        width: 70px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        span{
          margin-top: 5px;
        }
      }
    }
  }

  .toolbarPage.open {
    width: 280px;
    height: auto;
    max-height: 500px;
    right: 60px;
    display: block;
    visibility: visible;
    opacity: 1;
  }

  .layerPage.open {
    width: 180px;
    height: auto;
    max-height: 380px;
    right: 60px;
    display: flex;
    visibility: visible;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: center;
    opacity: 1;
  }

  .MapPage.open {
    width: 80px;
    height: auto;
    right: 60px;
    display: block;
    visibility: visible;
    opacity: 1;
  }

  .bc_attr-panel {
    position: absolute;
    right: 370px;
    height: auto;
    width: 17vw;
    border-radius: 6px;
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    .bc_btnbox-title {
      position: relative;
      height: 50px;
      line-height: 50px;
      width: 100%;
      border-radius: 6px 6px 0px 0px;
      font-size: 18px;
      text-indent: 25px;
      background: rgba(0, 0, 0, 0.4);
      cursor: pointer;

      i{
        position: absolute;
        right: 20px;
        top: 15px;
        padding: 0;
        font-size: 16px;
      }
    }
    .bc_attr-mainbox{
      padding: 15px 15px 0px 15px;
      ::v-deep.el-form-item__label{
        color: #fff
      }
      ::v-deep.el-input__inner{
        background: transparent;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 2px
      }
      ::v-deep.el-col{
        margin-bottom: 0;
      }
      ::v-deep.el-color-picker__trigger{
        padding: 2px;
        border-radius: 2px;
      }
      ::v-deep.el-select{
        width: 100%
      }
      ::v-deep.el-radio__inner{
        width: 16px;
        height: 16px;
        border-radius: 2px;
      }
      ::v-deep.el-radio__inner::after{
        display: none;
      }
      ::v-deep.el-radio__label{
        color: #fff;
      }
    }
  }

  .bc_surface,
  .bc_stratum,
  .bc_stratum_tuli {
    position: absolute;
    right: 250px;
    background: rgba(0, 0, 0, 0.5);
    height: auto;
    width: 80px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: hidden;
    border-radius: 3px;
    span {
      font-size: 13px;
      line-height: 30px;
      padding: 2px;
    }

    .bc_adjust-height{
      padding: 10px;
      ::v-deep.el-button{
        width: 100%;
        border: none;
        border-radius: 0;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
      }

      ::v-deep.el-input__inner{
        font-size: 20px;
        text-align: center;
        padding: 0;
        border: none;
        border-radius: 0px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        cursor: default;
      }
    }
  }
  .bc_stratum {
    right: 350px !important;
  }

  .bc_stratum_tuli {
    width: 16vw !important;
    right: 450px !important;
    overflow: hidden;
    .bc_legend_main {
      width: 100%;
      padding: 5px;
      display: flex;
      justify-content: space-around;
      flex-flow: wrap;
      .bc_legend_item {
        width: calc(50% - 20px);
        margin: 2px 5px;
        display: flex;
        cursor: pointer;
        span {
          display: inline-block;
          height: 30px;
          line-height: 20px;
          width: calc(100% - 30px);
          text-align: left;
          text-indent: 10px;
        }
        i {
          width: 20px;
          height: 20px;
          border: 1px solid #fff;
        }
      }
    }
  }

  .bc_layer-tree{
    position: absolute;
    right: 245px;
    background: rgba(0, 0, 0, 0.3);
    height: auto;
    width: 150px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: hidden;
    border-radius: 3px;
    p{
      width: 100%;
      font-size: 13px;
      line-height: 30px;
      padding: 2px;
      margin: 0;
      background: rgba($color: #000000, $alpha: 0.4);
    }

    .sm_menu_btmd{
      width: 100%;
      padding: 5px 10px;
    }


    .el-tree{
      background: transparent;
      ::v-deep .el-tree-node__content{
        background: transparent;
        >.el-tree-node__expand-icon{
          display: none;
        }
      }
      ::v-deep .el-tree-node__label{
        color: #fff;
      }
      ::v-deep .el-tree-node.is-current>.el-tree-node__content{
        background: transparent;
      }
      ::v-deep .el-tree-node__content:hover{
        background: transparent;
      }
    }
  }
}

.operation-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
}

.box-img {
  transform: scale(0.5);
}

.profile-chart {
  height: 300px;
  width: 300px;
  right: 320px;
  top: 0px;
  position: absolute;
  background: rgba(0, 54, 99, 0.7);
}

.operation-map.isDataAnalysis {
  top: 130px;
  right: 0;
  /* right:calc(25% + 14px) */
}

.qjt {
  width: 100%;
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }
}

.panorama {
  width: 100%;
  height: 100%;
}

.panorama_dialog {
  ::v-deep.el-dialog {
    margin-top: 10vh !important;
    height: calc(100% - 20vh);

    .el-dialog__body {
      height: calc(100% - 62px);
    }
  }
}
.picturePreview_dialog {
  ::v-deep.el-dialog__body {
    height: 70vh;
    overflow: scroll;
  }
}
.tearCensusView_dialog {
  ::v-deep.el-dialog__body {
    top: 10vh;
    height: 30vh;
    overflow: scroll;
  }
}
</style>
