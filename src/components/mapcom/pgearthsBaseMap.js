/*
 * @Author: 张峻霖
 * @Date: 2021-01-28 16:01:53
 * @LastEditTime: 2021-09-28 18:05:42
 * @LastEditors: 张峻霖
 * @Description: 地图服务模块
 * @FilePath: \LH-UI\src\components\mapcom\pgearthsBaseMap.js
 */
import 'pgearth/Build/Widgets/widgets.css'
import {
  FilterNullValue,
  deepClone,
  DeterminePosition
} from '@/util/util'

// baseMap ScreenSpaceEventHandler 事件
import ScreenSpaceEventHandler from 'pgearth/Source/Core/ScreenSpaceEventHandler'
import ScreenSpaceEventType from 'pgearth/Source/Core/ScreenSpaceEventType'
import mapColor from 'pgearth/Source/Core/Color'
import Cartographic from 'pgearth/Source/Core/Cartographic'
import CMath from 'pgearth/Source/Core/Math'
// initBaseMap
import SceneView from 'pgearth/PGEarthExtends/views/SceneView'
import EventDrive from 'pgearth/PGEarthExtends/others/EventDrive'
import ClusterLayer from "pgearth/PGEarthExtends/layers/ClusterLayer"
 // point
import Graphic from 'pgearth/PGEarthExtends/Graphic'
import GraphicsLayer from 'pgearth/PGEarthExtends/layers/GraphicsLayer'
import Color from 'pgearth/PGEarthExtends/_Color'
import UnderGround from "pgearth/Source/extends/widgets/UnderGround"
import knockout from "pgearth/Source/ThirdParty/knockout"
import SimpleMarkerSymbol from "pgearth/PGEarthExtends/symbols/SimpleMarkerSymbol"
import PolygonGeometry from 'pgearth/Source/Core/PolygonGeometry'
import GeometryInstance from 'pgearth/Source/Core/GeometryInstance'
import Primitive from 'pgearth/Source/Scene/Primitive'
import Transforms from 'pgearth/Source/Core/Transforms'
import PolygonHierarchy from 'pgearth/Source/Core/PolygonHierarchy'
import PerInstanceColorAppearance from 'pgearth/Source/Scene/PerInstanceColorAppearance'
import ColorGeometryInstanceAttribute from 'pgearth/Source/Core/ColorGeometryInstanceAttribute'
import HeadingPitchRoll from 'pgearth/Source/Core/HeadingPitchRoll'
import PropertyBag from "pgearth/Source/DataSources/PropertyBag.js";
import QueryTask from "pgearth/Source/extends/tasks/QueryTask"
import Query from "pgearth/Source/extends/tasks/Query"
import GeoJsonDataSource from "pgearth/Source/DataSources/GeoJsonDataSource"
import SpatialRelation from "pgearth/Source/extends/tasks/support/SpatialRelation"
import PGEarth3DTileset from 'pgearth/Source/Scene/PGEarth3DTileset'
import PGEarth3DTileStyle from 'pgearth/Source/Scene/PGEarth3DTileStyle'
import PGElevationLayer from 'pgearth/Source/extends/layers/ElevationLayer'
import TerrainLayer from 'pgearth/PGEarthExtends/layers/TerrainLayer'
// import when from 'pgearth/ThirdParty/when'
// import Color from 'pgearthExtends/_Color'
// import TextSymbol from 'pgearthExtends/symbols/TextSymbol'
// import PopupTemplate from 'pgearthExtends/widgets/PopupTemplate/PopupTemplate'
import PGEarthTerrainProvider from 'pgearth/Source/Core/PGEarthTerrainProvider'
import SinglePicker from 'pgearth/PGEarthExtends/widgets/SinglePicker'
import PrimitiveSymbol from 'pgearth/PGEarthExtends/symbols/PrimitiveSymbol'
import GeoUtils from 'pgearth/PGEarthExtends/core/GeoUtils'
import TextSymbol from 'pgearth/PGEarthExtends/symbols/TextSymbol'
import HeightReference from 'pgearth/Source/Scene/HeightReference'
import VerticalOrigin from 'pgearth/Source/Scene/VerticalOrigin'
import HorizontalOrigin from 'pgearth/Source/Scene/HorizontalOrigin'
import NearFarScalar from 'pgearth/Source/Core/NearFarScalar'
import WMSLayer from 'pgearth/PGEarthExtends/layers/WMSLayer'
import ToolArea from "pgearth/PGEarthExtends/widgets/ToolArea";
import ToolDistance from "pgearth/PGEarthExtends/widgets/ToolDistance";
import ToolMeasureHeight from "pgearth/PGEarthExtends/widgets/ToolMeasureHeight";
import MapUtils from 'pgearth/Source/extends/widgets/support/MapUtils'
import CircleScanPostStage from 'pgearth/Source/extends/symbols/CircleScanPostStage'
import TMSLayer from "pgearth/PGEarthExtends/layers/TMSLayer";
import LodMeshLayer from 'pgearth/PGEarthExtends/layers/LodMeshLayer'
import Cartesian3 from 'pgearth/Source/Core/Cartesian3'
import JulianDate from 'pgearth/Source/Core/JulianDate'
import SceneLayer from 'pgearth/PGEarthExtends/layers/SceneLayer'
import WMTSLayer from 'pgearth/PGEarthExtends/layers/WMTSLayer'
import clone from 'pgearth/Source/Core/clone'
import Matrix4 from 'pgearth/Source/Core/Matrix4'
import {
  mapIconsType
} from './iconNameAll'
import {
  mapIP,
  moduleIp
} from "@/config/env";
import {
  isEmail
} from '../../util/validate'
var modelFileName = {
  "ni_shi_liu": "service/gis/3DModel/?serviceName=mx_yhd_nsl1", //泥石流
  "beng_ta": "service/gis/3DModel/?serviceName=mx_yhd_bt2", //崩塌
  "di_lie_feng": "service/gis/3DModel/?serviceName=mx_yhd_dlf3", //地裂缝
  "di_mian_chen_jiang": "", //地面沉降
  "di_mian_ta_xian": "service/gis/3DModel/?serviceName=mx_yhd_dmtx5", //地面塌陷
  "bian_po": "service/gis/3DModel/?serviceName=mx_yhd_bp6", // 边坡
  "hua_po": "service/gis/3DModel/?serviceName=mx_yhd_hp7", // 滑坡
  6: "service/gis/3DModel/?serviceName=shebei4_obj",
  "sbwy001": "service/gis/3DModel/?serviceName=shebei1_obj",
  "yjl_001": "service/gis/3DModel/?serviceName=shebei3_obj",
  "qxzdbmwy_001": "service/gis/3DModel/?serviceName=shebei2_obj",
  "qxzdbmwy_002": "service/gis/3DModel/?serviceName=shebei2_obj",
  "bjq_001": "service/gis/3DModel/?serviceName=shebei5_obj",
  "bjq_002": "service/gis/3DModel/?serviceName=shebei5_obj",
  "lfj_001": "service/gis/3DModel/?serviceName=liefengji_obj",
  "cjz_001": "service/gis/3DModel/?serviceName=shebei6",
  "psxgnss_003": "service/gis/3DModel/?serviceName=yantian_gnss",
  "gnssjzz_001": "service/gis/3DModel/?serviceName=yantian_gnss",
}
export default {
  lineLayerData: [], //线集合
  lfLineLayerData: [],
  profileLineLayerData: [], //工具栏线集合
  titleLayerData: [], //文字集合
  arrowLayerData: [], //箭头集合
  modelData: {
    dangerModel: {},
    dangerLabel: {},
    deviceModel: {}
  }, //模型集合
  drillBox: [],
  Layers: {}, //图层集合
  polygon: {}, //模型集合
  qxsyLayer: {}, //倾斜摄影集合
  sectionLine: [], // 剖切连线集合
  rockPlanePosition: {},
  rockPlanePrimitives: {},
  deviceArryKuosan: [],
  iconMoveStatus: true,
  initBaseMap(id, vue) {
    this.vue = vue
    window.viewer = new SceneView({
      container: id,
      baseMap: new WMTSLayer({
        //天地图影像
        url: "http://139.9.196.254:12023/basemap/gis/getTdtMap/1e9715329524051bbff71008d0e7c4ee/2/tile/{TileMatrix}/{TileRow}/{TileCol}",
        title: 'tdt',
        tileMatrixSet: 'tdt1',
        id: 'myLayer',
        maximumLevel: 16
      }),
      scene3DOnly: false,
    })
    this.map = window.viewer.map;

    window.viewer.scene.globe.depthTestAgainstTerrain = true //开启坐标深度拾取
    window.viewer.clockViewModel.currentTime = JulianDate.fromDate(new Date(2021, 10, 18, 9)); // 调整光照时间

    new ScreenSpaceEventHandler(window.viewer.canvas)
      .setInputAction(click => {
        const pick = window.viewer.scene.pick(click.position)
        if (pick && pick.id && pick.id.popupTemplate && this.iconMoveStatus) {
          pick.id.popupTemplate.actions && pick.id.popupTemplate.actions()
        } else {
          window.viewer.popupTemplate.closePop()
        }
      }, ScreenSpaceEventType.LEFT_DOWN)

    new EventDrive({
      viewer: window.viewer,
      eventType: 'MOUSE_MOVE',
      callBack: a => {
        const {
          longitude,
          latitude,
          height
        } = a.mapPoint
        this.vue.coord.lon = `${FilterNullValue(longitude, 4) || '--'}°`
        this.vue.coord.lat = `${FilterNullValue(latitude, 4) || '--'}°`
        this.vue.coord.height = `${FilterNullValue(height, 4) > 0 ? FilterNullValue(height, 4) : false || '--'}m`
      }
    })

    this.mianEventClick || (this.mianEventClick = new EventDrive({
      viewer: window.viewer,
      eventType: 'left_click',
      callBack: a => {
        let pickedObject = viewer.scene.pick(a.screenPoint);
        let attrOption = {}
        // 绘制对象属性获取
        if(pickedObject && pickedObject.primitive && pickedObject.primitive.attribute){
          attrOption = pickedObject.primitive.attribute
          this.drawView.$emit("attribute-box", attrOption);
        }else if(pickedObject && pickedObject.id && pickedObject.id.popupTemplate  && this.iconMoveStatus){
          pickedObject.id.popupTemplate.actions && (attrOption = pickedObject.id.popupTemplate.actions())
          this.drawView && this.drawView.$emit("attribute-box", attrOption);
        }

        if (pickedObject && pickedObject.id) {
          let pickedFeature = pickedObject.id;
          if (!pickedFeature._properties) {
            return
          }
          let pNdata = [],
            propertiesObjs = pickedFeature._properties,

            propertiesObjNames = propertiesObjs.propertyNames,
            len = propertiesObjNames.length;
          for (let ii = 0; ii < len; ii++) {
            pNdata.push({
              date: propertiesObjNames[ii],
              name: propertiesObjs[propertiesObjNames[ii]]._value
            });
          }
          this.vue.$emit("show-info-box", pNdata);
        }
      }
    }))
    document.getElementById("distanceLegendDiv").remove();
    window.viewer.clock.shouldAnimate = true
    return this
  },
  // 自定义放大
  goEnlarge() {
    let camera = window.viewer.camera
    let destination = camera.position.clone()
    var cartographic = Cartographic.fromCartesian(destination)
    window.viewer.camera.flyTo({
      destination: Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height / 1.5),
      duration: 1
    });
  },
  // 自定义缩小
  goNarrow() {
    let camera = window.viewer.camera
    let destination = camera.position.clone()
    var cartographic = Cartographic.fromCartesian(destination)
    window.viewer.camera.flyTo({
      destination: Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height * 1.5),
      duration: 1
    });
  },

  /**
   * 添加高程
   */
  addViewAltitude(url, name) {
    if(url.indexOf('dem') !== -1 || url.indexOf('dsm') !== -1){
      let elevationLayer = new TerrainLayer({
        url: url,
        id: 'dem' + name
      })
      this.map.ground.layer.add(elevationLayer);
    }else{
      window.viewer.terrainProvider = new PGEarthTerrainProvider({
        url: url
      });
    }
  },

  addlayer(ip, name) {
    this[name] = new TMSLayer({
      url: mapIP + ip,
      fileExtension: 'png',
      id: name
    });
    this.map.add(this[name]);
  },

  removeB3DMlayer(key) {
    if(this.qxsyLayer[key]){
      window.viewer.scene.primitives.remove(this.qxsyLayer[key])
    }
  },

  addQXSY(url, id, height = 0) {
    let lodMeshLayer,tilesetStyle;
    height ? height = height * 1 : height = 0

    if ( url.indexOf("_mx") != -1 || url.indexOf("_qxsy") != -1) {
      lodMeshLayer = new SceneLayer({
        id: 'QXSYLayer' + id,
        url: url,
      });
      this.map.add(lodMeshLayer);

      setTimeout(_=>{
        lodMeshLayer.readyPromise
          .then(function() {
            window.viewer.zoomTo(lodMeshLayer)
          })
          .otherwise(function(err){
            console.log(err);
          });
      },1000)
      setTimeout(e => {
        let boundingSphere = lodMeshLayer.boundingSphere;
        let cartographic = Cartographic.fromCartesian(boundingSphere.center);
        let surface = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        let offset = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height);
        let translation = Cartesian3.subtract(offset, surface, new Cartesian3());
        lodMeshLayer.modelMatrix = Matrix4.fromTranslation(translation);
      }, 2000)
    } else if(url.indexOf("_b3dm") != -1 ) {
      lodMeshLayer = new PGEarth3DTileset({
        id: 'QXSYLayer' + id,
        url: url,
        maximumScreenSpaceErrot: 2
      });
      tilesetStyle = new PGEarth3DTileStyle()
      tilesetStyle.pointSize = 3.0;
      lodMeshLayer.style = tilesetStyle
      this.qxsyLayer[id] = lodMeshLayer
      window.viewer.scene.primitives.add(lodMeshLayer)
      setTimeout(_=>{
        window.viewer.zoomTo(lodMeshLayer)
        lodMeshLayer.readyPromise
          .then(function(tileset) {
            let cartographic = Cartographic.fromCartesian(tileset.boundingSphere.center);
            let surface = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
            let offset = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height);
            let translation = Cartesian3.subtract(offset, surface, new Cartesian3());
            let nNation = Matrix4.fromTranslation(translation);
            let ngd = []
            Object.keys(nNation).forEach(key=>{
              ngd.push(nNation[key])
            })
            lodMeshLayer.modelMatrix = ngd
          })
          .otherwise(function(err){
            console.log(err);
          });
      },1000)
    }else{
      lodMeshLayer = new LodMeshLayer({
        id: 'QXSYLayer' + id,
        url: url
      });
      this.map.add(lodMeshLayer);
      lodMeshLayer.readyPromise
        .then(function(pagelod) {
          window.viewer.zoomTo(lodMeshLayer)
          window.viewer.goTo({
            center:[pagelod.origin.x, pagelod.origin.y, pagelod.origin.z + 1500]
          })
      })
    }
  },

  addWMSLayer({ name, url }) {
    this.Layers[name] = new WMSLayer({
      id: name,
      url: url,
    })
    this.map.add(this.Layers[name])
  },

  addTMSLayer(url, name) {
    let luohulayer = new TMSLayer({
      id: 'TMSLayer' + name,
      url: mapIP + url,
      fileExtension: 'jpg',
    });
    this.map.add(luohulayer);
  },

  removeLayer(id) {
    if (id === undefined) id = 'pointsLayer'
    const layerId = this.map.findLayerById(id)
    layerId && this.map.remove(layerId)
    this.Layers[id] && delete this.Layers[id]
    const drillLine = window.viewer.entities.getById(id)
    if(drillLine){
      window.viewer.entities.remove(drillLine);
    }
  },

  addluwang() {
    this.map.findLayerById("luwang") ? this.map.findLayerById("luwang").show = true : this.addlayer("service/gis/3DModel/?serviceName=luohu_luwang", "luwang")
  },

  hideluwang() {
    this.map.findLayerById("luwang").show = false
  },

  toDem(s){
    let d = viewer.scene.globe.ellipsoid.cartesianToCartographic(s),t = {latitude:0,longitude:0}
    for(let y in t){
      d[y] = CMath.toDegrees(d[y])
    }
    return d
  },

  // 图层移动操作
  geetModel(data, attr, direc, location, pushHeight){
    let labId = ""
    if(data && data.id){
      if(data.id.id.indexOf('module') !== -1){
        labId = data.id.id.replace("module","module-");
      }else{
        labId = data.id.id.replace("device","module-");
      }

      let mode = this.modelData[attr.modelName][data.id.id];
      let label = this.modelData.dangerLabel[labId];

      let enLocation = null;
      switch(direc){
        case 'endwise':
          enLocation = this.toDem(mode.position._value);
          break;
        default:
          enLocation = location;
          break;
      }
      window.viewer.scene.requestRenderMode = false
      let { longitude, latitude } = enLocation;
      let height = 0;
      let postSpot = null;
      let postLabel = null;

      height = Math.round(pushHeight)
      postSpot = new Cartesian3.fromDegrees(longitude, latitude, height)
      postLabel = new Cartesian3.fromDegrees(longitude, latitude, height+15)


      mode.position = postSpot;
      label.position = postLabel
    }
  },

  takeModule(backFun, cancelFun, operation){
    let pickedObject = null;
    this.iconMoveStatus = false;
    window.viewer.scene.globe.depthTestAgainstTerrain = true;
    this.leftModuleClick && this.leftModuleClick.destroy()
    this.leftModuleClick = null;
    this.moduleMouseMove && this.moduleMouseMove.destroy()
    this.moduleMouseMove = null;
    this.rightModuleClick && this.rightModuleClick.destroy()
    this.rightModuleClick = null;
    this.leftModuleClick || (this.leftModuleClick = new EventDrive({
      viewer: window.viewer,
      eventType: 'left_click',
      callBack: a => {
        pickedObject = viewer.scene.pick(a.screenPoint);
        let attr = null;
        if(pickedObject && pickedObject.id && pickedObject.id.popupTemplate){
          attr = JSON.parse(pickedObject.id.popupTemplate.content)
          if(operation == "cross"){
            this.goView({
              longitude: a.mapPoint.longitude,
              latitude: a.mapPoint.latitude,
              height: 400 // camera.positionCartographic.height  // 解决定位不拉近
            })
            this.moduleMouseMove || (this.moduleMouseMove = new EventDrive({
              viewer: window.viewer,
              eventType: 'MOUSE_MOVE',
              callBack: (e) => {
                backFun({
                  type: operation,
                  attr: attr,
                  pickObj: pickedObject,
                  truePoints: e.mapPoint
                })
              }
            }))
          }else{
            backFun({
              type: operation,
              pickObj: pickedObject,
              attr: attr
            })
          }
        }
      }
    }))

    this.rightModuleClick || (this.rightModuleClick = new EventDrive({
      viewer: window.viewer,
      eventType: 'right_click',
      callBack: (e) => {
        this.iconMoveStatus = true;
        pickedObject = viewer.scene.pick(e.screenPoint);
        this.kuosan2(e.mapPoint)
        this.leftModuleClick && this.leftModuleClick.destroy()
        this.leftModuleClick = null;
        this.moduleMouseMove && this.moduleMouseMove.destroy()
        this.moduleMouseMove = null;
        cancelFun(e.mapPoint, pickedObject)
        this.rightModuleClick && this.rightModuleClick.destroy()
        this.rightModuleClick = null;
      }
    }))
  },

  monomerFun(callBack, confirem, view) {
    this.drawView = view
    window.viewer.scene.globe.depthTestAgainstTerrain = true;
    if (this.leftMonomerEventDrive) {
      this.leftMonomerEventDrive.destroy();
      this.leftMonomerEventDrive = null;
      this.rightMonomerEventDrive.destroy();
      this.rightMonomerEventDrive = null;
    }
    this.leftMonomerEventDrive || (this.leftMonomerEventDrive = new EventDrive({
      viewer: window.viewer,
      eventType: 'left_click',
      callBack: a => {
        callBack(a)
      }
    }))

    this.rightMonomerEventDrive || (this.rightMonomerEventDrive = new EventDrive({
      viewer: window.viewer,
      eventType: 'right_click',
      callBack: (e) => {
        this.leftMonomerEventDrive && this.leftMonomerEventDrive.destroy()
        this.leftMonomerEventDrive = null;
        confirem()
      }
    }))
  },
  /**
   * @description: 移除点线面等图层函数
   * @param {*} data 所需移除的图层
   */
  deletePointLineLayer(data) {
    let {
      point,
      line,
      MapEvent,
      arrow,
      lf
    } = data
    point && this.map.remove(this.graSpot); //移除点
    line && ( //移除线集合
      this.lineLayerData.forEach(e => {
        this.map.remove(e)
      }), this.removeLayer("dottedLineLayer")
    )
    lf && ( //移除线集合
      this.lfLineLayerData.forEach(e => {
        this.map.remove(e)
      })
    )
    arrow && this.map.remove(this.arrowLayer), this.arrowLayer = null;
    MapEvent && (
      this.leftMonomerEventDrive && (this.leftMonomerEventDrive.destroy(), this.leftMonomerEventDrive = null), //移除地图左击事件
      this.rightMonomerEventDrive && (this.rightMonomerEventDrive.destroy(), this.rightMonomerEventDrive = null) //移除地图左击事件
    )
  },

  // 隐藏地层
  hideStratum(id) {
    window.viewer.scene.primitives._primitives && window.viewer.scene.primitives._primitives.forEach(ele => {
      if (ele.geometryInstances && ele.geometryInstances.length > 0) {
        if (id === ele.geometryInstances[0].id.split('^v^')[2]) {
          ele.show = !ele.show
        }
      }
    })
  },

  // 地层透明
  stratumAlpha(val) {
    let colors = ['#FFFFFF1a', '#FFEBCE1a', '#FFDDAD1a', '#FF89991a', '#FFED8B1a', '#FFD7011a', '#54FF9F1a', '#46E6871a', '#6B5ACD1a', '#8370FE1a', '#7B67ED1a', '#483D8B1a', '#999C9A1a', '#3536281a']
    let primitiveList = window.viewer.scene.primitives._primitives
    primitiveList.forEach(ele => {
      if (ele.geometryInstances && ele.geometryInstances.length > 0) {
        let len = ele.geometryInstances.length
        let color = ""
        for (let i = 0; i < len; i++) {
          color = colors[ele.geometryInstances[i].id.split('^v^')[2]]
          ele.geometryInstances[i].attributes.color = ColorGeometryInstanceAttribute.fromColor(
            mapColor.fromCssColorString('rgba(5, 206, 79, 0.1)')
          )
        }
      }
    })
  },

  SurfaceAlpha(s) { //地表透明
    if (s == 1) {
      window.ug && window.ug.disable();
    } else {
      this.viewModel = {
        height: s,
        showTrans: knockout.observable(true)
      };
      knockout.track(this.viewModel);
      window.viewer.scene.globe.baseColor = new mapColor(0, 0, 0, 0);
      window.viewer.scene.requestRenderMode = false;
      window.ug = new UnderGround(viewer, {
        //地表透明
        depth: 1000,
        alpha: this.viewModel.height
      });
      window.ug.activate(); // 使用地下透明功能
      knockout
        .getObservable(this.viewModel, "height")
        .subscribe(function (newValue) {
          this.digHeight = newValue;
          window.ug._updateImageryLayersAlpha(this.digHeight);
        });
    }
  },

  // 清除地下转孔
  deleteUnderground(id, iszuankong) {
    if (!iszuankong) {
      // 移除管网
      let drillId = window.viewer.entities.getById('drillbox' + id)
      window.viewer.entities.remove(drillId);
      return false
    }
  },

  drawUnderground(data, color) {
    let _this = this
    let scene = window.viewer.scene;
    window.viewer.goTo({
      center: [114.235652, 22.602523, 1000],
      heading: 0,
      pitch: -90,
      roll: 0
    })
    data.map((item) => {
      _this.drillBox = window.viewer.entities.add({
        name: 'dxzk',
        id: 'drillbox' + item.FID,
        position: Cartesian3.fromDegrees(item.wd / 1, item.jd / 1),
        ellipse: {
          semiMinorAxis: 0.8,
          semiMajorAxis: 0.8,
          height: item.H / 1,
          extrudedHeight: (item.H / 1 + item.G / 1) / 1,
          material: mapColor.fromCssColorString(color[item.type])
        },
        properties: new PropertyBag(item)
      });
    })
  },

  getAlpha(color) {
    let colorLast2 = color.substring(7, 9) // 获取颜色的后两位透明度
    let alpha = colorLast2 ? parseInt(colorLast2, 16) : 255
    alpha = (alpha / 255).toFixed(2)
    return alpha * 1
  },

  deleteLineAndHeightByTin(index, type, uuid) {
    window.viewer.scene.primitives.remove(this.rockPlanePrimitives[uuid + type + index])
  },

  // 绘制地层模型
  getLineAndHeightByTin(index, type, tinFeatures, combination, color, uuid, height, noFly, isVU, modType) {
    let arr = [];
    let position = undefined;
    let instances = [],
      indicesArr = [];
    let normalsNum = [],
      allpoints = [];
    let minX, minY, maxX, maxY, times = 1e9;
    let newArr = combination.filter((item) => {
      return item.length > 0
    });
    let hasAlpha = false;
    if (modType !== 'dc') {
      window.viewer.goTo({
        center: [114.235652, 22.602523, 1000],
        heading: 0,
        pitch: -90,
        roll: 0
      })
    }
    for (let m = 0; m < newArr.length; m++) {
      if (newArr[m].length === 0) {
        continue
      }
      let [point1x, point1y, point1z] = tinFeatures[newArr[m][0] * 1]
      let [point2x, point2y, point2z] = tinFeatures[newArr[m][1] * 1]
      let [point3x, point3y, point3z] = tinFeatures[newArr[m][2] * 1]
      // 顶部
      let points = [
        point1x, point1y, point1z + (height || 0),
        point2x, point2y, point2z + (height || 0),
        point3x, point3y, point3z + (height || 0)
      ]
      let a = [point1x, point1y, point1z];
      // var b = tinFeatures[combination[m][1]*1-1];
      // var c = tinFeatures[combination[m][2]*1-1];
      // var xx = toBigger ? toBigger * 1 : 1;
      // var hh = root.getModelJianHeight(xx)
      // var points = [[a[0],a[1],(a[2]-hh)*xx],[b[0],b[1],(b[2]-hh)*xx],[c[0],c[1],(c[2]-hh)*xx]] // 所有点的高度减10
      position = Cartesian3.fromDegrees(a[0], a[1], a[2] + 1000)
      let instance
      if (!isVU) {
        let alpha = this.getAlpha(color)
        if (alpha !== 1) {
          hasAlpha = true
        }
        let geometry = new PolygonGeometry({
          polygonHierarchy: new PolygonHierarchy(Cartesian3.fromDegreesArrayHeights(points)),
          vertexFormat: PerInstanceColorAppearance.VERTEX_FORMAT,
          perPositionHeight: true
        });
        instance = new GeometryInstance({
          geometry: geometry,
          attributes: {
            color: ColorGeometryInstanceAttribute.fromColor(mapColor.fromCssColorString(color.substring(0, 7)).withAlpha(alpha))
          },
          id: `岩层-^v^${uuid}^v^${index}`,
        })
      } else {
        allpoints = allpoints.concat(points.flat())
        let [{
          x: a,
          y: b,
          z: c
        }, {
          x: d,
          y: e,
          z: f
        }, {
          x: g,
          y: h,
          z: i
        }] = Cartesian3.fromDegreesArrayHeights(points.flat())
        instances = instances.concat([a, b, c, d, e, f, g, h, i])
        // 2 定义法向量数组
        normalsNum = normalsNum.concat(type === 'plane' ? [0, 0, 1, 0, 0, 1, 0, 0, 1] : [0, 1, 0, 0, 1, 0, 0, 1, 0])
        // 3 定义纹理数组
        if (type === 'plane') {
          minX = minX === undefined ?
            Math.min(points[0] * times, points[3] * times, points[6] * times) :
            Math.min(minX, points[0] * times, points[3] * times, points[6] * times)
          maxX = maxX === undefined ?
            Math.max(points[0] * times, points[3] * times, points[6] * times) :
            Math.max(maxX, points[0] * times, points[3] * times, points[6] * times)
          minY = minY === undefined ?
            Math.min(points[1] * times, points[4] * times, points[7] * times) :
            Math.min(minY, points[1] * times, points[4] * times, points[7] * times)
          maxY = maxY === undefined ?
            Math.max(points[1] * times, points[4] * times, points[7] * times) :
            Math.max(maxY, points[1] * times, points[4] * times, points[7] * times)
        } else {

          minX = minX === undefined ? Math.min(a * times, d * times, g * times) : Math.min(minX, a * times, d * times, g * times)
          maxX = maxX === undefined ? Math.max(a * times, d * times, g * times) : Math.max(maxX, a * times, d * times, g * times)
          minY = minY === undefined ? Math.min(c * times, f * times, i * times) : Math.min(minY, c * times, f * times, i * times)
          maxY = maxY === undefined ? Math.max(c * times, f * times, i * times) : Math.max(maxY, c * times, f * times, i * times)
        }
        // 定义数组索引
        indicesArr = indicesArr.concat([0 + 3 * m, 1 + 3 * m, 2 + 3 * m])
      }
      arr.push(instance);
      window.mian++
    }
    if (position) {
      if (!isVU) {
        this.polygon = new Primitive({
          geometryInstances: arr,
          releaseGeometryInstances: false,
          appearance: new PerInstanceColorAppearance({
            translucent: hasAlpha
          }),
          name: 'yancengMoxing',
        });
        this.polygon.name = 'yancengMoxing'
      }

      !noFly && window.viewer.camera.flyTo({
        destination: position
      })
      this.rockPlanePosition[uuid] = position;
      if (isVU) {
        if (!color) {
          color = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAA' +
            'AACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AcYECsHepceLgAAAB1pVFh0Q29tbWVudAAAAAAAQ3J' +
            'lYXRlZCB3aXRoIEdJTVBkLmUHAAACZUlEQVR42u3dsQ3EMBADQZ377/lcgzLTnIn/mS2kwIBmd8+Nmbn6' +
            'vX37X95/DhQTAAIAAYAAQAAgABAACAAEAAIAAYAAQAAgAEg2t3/wfbn9P+07AXAFAgGAAEAAIAAQAAgAB' +
            'AACAAGAAEAAIAAQAIQa35fbb953AuAKBAIAAYAAQAAgABAACAAEAAIAAYAAQAAgAAjlfQD71ftOAFyBQA' +
            'AgABAACAAEAAIAAYAAQAAgABAACAAEAKG8D2C/et8JgCsQCAAEAAIAAYAAQAAgABAACAAEAAIAAYAAIJT' +
            '3AexX7zsBcAUCAYAAQAAgABAACAAEAAIAAYAAQAAgABAAhPI+gP3qfScArkAgABAACAAEAAIAAYAAQAAg' +
            'ABAACAAEAAKAUN4HsF+97wTAFQgEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAQyvsA9qv3nQC4AoEAQAAgA' +
            'BAACAAEAAIAAYAAQAAgABAACABCeR/AfvW+EwBXIBAACAAEAAIAAYAAQAAgABAACAAEAAIAAUAo7wPYr9' +
            '53AuAKBAIAAYAAQAAgABAACAAEAAIAAYAAQAAgAAjlfQD71ftOAFyBQAAgABAACAAEAAIAAYAAQAAgABA' +
            'ACAAEAKG8D2C/et8JgCsQCAAEAAIAAYAAQAAgABAACAAEAAIAAYAAIJT3AexX7zsBcAUCAYAAQAAgABAA' +
            'CAAEAAIAAYAAQAAgABAAhPI+gP3qfScArkAgABAACAAEAAIAAYAAQAAgABAACAAEAAKAUN4HsF+97wTAF' +
            'QgEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAQ6gVhtoHoN8zGTwAAAABJRU5ErkJggg=='
        }
        let stsNum = []
        let scale = Math.max(maxX - minX, maxY - minY)

        for (let i = 0, len = allpoints.length; i < len; i += 9) {
          if (type === 'plane') {
            stsNum.push((allpoints[i + 0] * times - minX) / scale)
            stsNum.push((allpoints[i + 1] * times - minY) / scale)
            stsNum.push((allpoints[i + 3] * times - minX) / scale)
            stsNum.push((allpoints[i + 4] * times - minY) / scale)
            stsNum.push((allpoints[i + 6] * times - minX) / scale)
            stsNum.push((allpoints[i + 7] * times - minY) / scale)
          } else {
            stsNum.push((instances[i + 0] * times - minX) / scale)
            stsNum.push((instances[i + 2] * times - minY) / scale)
            stsNum.push((instances[i + 3] * times - minX) / scale)
            stsNum.push((instances[i + 5] * times - minY) / scale)
            stsNum.push((instances[i + 6] * times - minX) / scale)
            stsNum.push((instances[i + 8] * times - minY) / scale)
          }
        }

        let positions = new Float64Array(instances),
          normals = new Float32Array(normalsNum),
          sts = new Float32Array(stsNum),
          indices = new Uint16Array(indicesArr);

        let oklinps = 5 // parseInt(scale / 1e7 / 6) + 1
        Resource.createIfNeeded(color).fetchImage().then(image => {

          let canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')

          canvas.width = image.width * oklinps
          canvas.height = image.height * oklinps

          let ptrn = ctx.createPattern(image, 'repeat')
          ctx.fillStyle = ptrn;
          ctx.fillRect(0, 0, image.width * oklinps, image.height * oklinps);

          let oneImage = new Image()
          oneImage.src = canvas.toDataURL('image/png')

          oneImage.onload = () => {

            var texture;
            var context = window.viewer.scene.context;
            if (defined(image.internalFormat)) {
              texture = new Texture({
                context: context,
                pixelFormat: image.internalFormat,
                width: image.width / 2,
                height: image.height / 2,
                source: {
                  arrayBufferView: image.bufferView
                }
              });
            } else {
              texture = new Texture({
                context: context,
                source: oneImage
              });
            }

            this.polygon = new Primitive({
              geometryInstances: new GeometryInstance({
                geometry: new Geometry({
                  attributes: {
                    position: new GeometryAttribute({
                      componentDatatype: ComponentDatatype.DOUBLE,
                      componentsPerAttribute: 3,
                      values: positions
                    }),
                    normal: new GeometryAttribute({
                      componentDatatype: ComponentDatatype.FLOAT,
                      componentsPerAttribute: 3,
                      values: normals
                    }),
                    st: new GeometryAttribute({
                      componentDatatype: ComponentDatatype.FLOAT,
                      componentsPerAttribute: 2,
                      values: sts
                    })
                  },
                  indices: indices,
                  primitiveType: PrimitiveType.TRIANGLES,
                  boundingSphere: BoundingSphere.fromVertices(positions)
                }),
                id: `岩层-^v^${uuid}^v^${index}`,
              }),
              appearance: new VtxfAppearance({
                closed: false,
                translucent: false,
                uniforms: {
                  myImage: texture
                }
              }),
              asynchronous: false,
              name: 'yancengMoxing',
            })
            this.polygon.name = 'yancengMoxing'
            this.rockPlanePrimitives[uuid + type + index] = this.polygon
            window.viewer.scene.primitives.add(this.polygon)
            window.viewer.scene.requestRenderMode = false
          }

        })
      } else {
        this.rockPlanePrimitives[uuid + type + index] = this.polygon
        window.viewer.scene.primitives.add(this.polygon)
        window.viewer.scene.requestRenderMode = false
      }

    }
  },

  drawFaultModel(load) {
    this.map.findLayerById("yantiandc") && this.map.remove(this.map.findLayerById("yantiandc"))
    if (load) {
      let faultModel = new SceneLayer({
        url: 'http://139.9.196.254:12022/service/gis/3DModel/?serviceName=yantian_dc_1',
        id: "yantiandc"
      })
      this.map.add(faultModel);
    }
  },

  drawFault() {
    var position = Cartesian3.fromDegrees(114.32124769924069, 22.60849072894969, 50);
    var heading = CMath.toRadians(90);
    var pitch = 0;
    var roll = 0;
    var hpr = new HeadingPitchRoll(heading, pitch, roll);
    var orientation = Transforms.headingPitchRollQuaternion(position, hpr);
    var entity2 = window.viewer.entities.add({
      position: position,
      orientation: orientation,
      model: {
        scale: 0.005,
        // heightReference: HeightReference.CLAMP_TO_GROUND, // 让模型在地形上紧贴
        heightReference: HeightReference.RELATIVE_TO_GROUND,
        uri: '/dc.gltf',
        runAnimations: true,
        minimumPixelSize: 40, //当层级缩小时可以看到的大小
        maximumScale: 60, //限制minimumPixelSize的上限
      },
    });
  },

  monomerRemove(path, attr) {
    this.graSpot && this.map.remove(this.graSpot); //移出点
    this.graLine && this.map.remove(this.graLine); //移出线
    this.deletePointLineLayer({
      line: true
    }) //移出面
  },

  async drawSpot(points, attr, view) { //绘制点
    this.drawView = view
    this.map.findLayerById(`spot_${attr.name}`)
    && this.map.remove(this.map.findLayerById(`spot_${attr.name}`));
    this.map.findLayerById(`spot-${attr.name}`)
    && this.map.remove(this.map.findLayerById(`spot-${attr.name}`));
    let { longitude, latitude } = points

    this.graSpot = new PrimitiveSymbol({
      id: `spot_${attr.name}`,
      type: 'circle',
      center: [longitude, latitude],
      radius: 1,
      color: attr.color,
      class: 'both',
    });
    this.graSpot.attribute = attr
    this.map.add(this.graSpot);

    this.onLabelDraw({
      title: attr.name,
      data: points,
      labelColor: attr.labelColor,
      fontSize: attr.fontSize + 'px',
      fontBold: attr.fontBold,
      labelDisplay: attr.labelDisplay,
      layerName: `spot-${attr.name}`
    })
    // this.graSpot = new GraphicsLayer({
    //   id: `spot_${attr.name}`,
    //   viewer: window.viewer
    // });
    // let geometry = {
    //   type: "point",
    //   longitude: longitude,
    //   latitude: latitude,
    //   height: 1
    // }
    // let pointGraphic = new Graphic({
    //   geometry: geometry,
    //   symbol: {
    //     type: 'picture-marker',
    //     url: await this.getMapIcon('sign'),
    //     width: 30,
    //     height: 30,
    //     heightReference: HeightReference.RELATIVE_TO_GROUND,
    //     verticalOrigin: VerticalOrigin.BOTTOM,
    //     horizontalOrigin : HorizontalOrigin.CENTER, // 添加鼠标点击属性后解决栽点下陷问题
    //     scaleByDistance: new NearFarScalar(800, 1, 1600, 1)
    //   },
    //   popupTemplate: {
    //     actions: ()=>{
    //       return attr;
    //     }
    //   },
    // });
    // this.mapPoint.add(pointGraphic);
    // this.map.add(this.graSpot);
  },

  /**
   * @description: 绘制线
   * @param {*} path 经纬度
   * @param {*} color 线颜色
   */
  drawLine(points, attr, view) {
    this.drawView = view
    let labelPoint = {}
    this.map.findLayerById(`spot_${attr.name}`)
    && this.map.remove(this.map.findLayerById(`spot_${attr.name}`));
    let drillLine = window.viewer.entities.getById(`line_${attr.name}`)
    if(drillLine){
      window.viewer.entities.remove(drillLine);
    }
    this.map.findLayerById(`line_${attr.name}`)
    && this.map.remove(this.map.findLayerById(`line_${attr.name}`));
    switch (attr.lineType) {
      case "1":
        labelPoint = {
          longitude: points.slice(-2)[0],
          latitude: points.slice(-1)[0],
        }
        window.viewer.entities.add({//贴地线
          id: `line_${attr.name}`,
          polyline: {
            positions: Cartesian3.fromDegreesArray(points),
            width: attr.thickness+3,
            material: mapColor.fromCssColorString(attr.color),//颜色
            clampToGround: true,
          },
          popupTemplate: {
            actions: ()=>{
              return attr;
            }
          }
        });
        // this.graLine = new PrimitiveSymbol({
        //   id: `line_${attr.name}`,
        //   type: 'line',
        //   ranges: points,
        //   color: attr.color,
        //   width: attr.thickness,
        //   class: 'both',
        // });
        // this.graLine.attribute = attr
        // this.lineLayerData.push(this.graLine)
        // this.map.add(this.graLine);
        break;
      case "3":
        labelPoint = {
          longitude: points[points.length-1][0],
          latitude: points[points.length-1][1],
        }

        this.lineGraphic = new GraphicsLayer({ id: `line_${attr.name}`})
        let doublelineGeo = {
          type: "polyline",
          paths: points
        }
        let doublelineSymbol = {
          type: 'simple-line',
          width: Number(attr.thickness)+5,
          style: {
            type: 'line-outline',
            color: {r: 0, g: 0, b: 0, a: 0},
            outlineWidth: Number(attr.thickness) + 3,
            outlineColor: attr.color
          }
        }
        let doubleline = new Graphic({
          geometry: doublelineGeo,
          symbol: doublelineSymbol,
          popupTemplate: {
            actions: ()=>{
              return attr;
            }
          }
        })
        this.lineGraphic.add(doubleline);
        doubleline._polyline.clampToGround = true;
        this.map.add(this.lineGraphic);
        break;
      case "2":
        labelPoint = {
          longitude: points[points.length-1][0],
          latitude: points[points.length-1][1],
        }

        this.lineGraphic = new GraphicsLayer({ id: `line_${attr.name}`})
        let lineGeo = { type: "polyline",  paths: points }
        let lineSymbol = {
          type: 'simple-line',
          width: Number(attr.thickness),
          style: {
            type: 'line-dash',
            color: attr.color,
            dashLength: 20 // 间距
          }
        }
        let dottedline = new Graphic({
          geometry: lineGeo,
          symbol: lineSymbol,
          popupTemplate: {
            actions: ()=>{
              return attr;
            }
          }
        })
        this.lineGraphic.add(dottedline);
        dottedline._polyline.clampToGround = true;
        this.map.add(this.lineGraphic);
        break;
      case "5":
        labelPoint = {
          longitude: points[points.length-1][0],
          latitude: points[points.length-1][1],
        }
        this.lineGraphic = new GraphicsLayer({ id: `line_${attr.name}`})
        let arrowLineGeo = { type: "polyline",  paths: points }
        let arrowLineSymbol = {
          type: 'simple-line',
          width: Number(attr.thickness + 15),
          followSurface: false,
          style: {
            type: 'line-arrow',
            color: attr.color
          }
        }
        let arrowLine = new Graphic({
          geometry: arrowLineGeo,
          symbol: arrowLineSymbol,
          popupTemplate: {
            actions: ()=>{
              return attr;
            }
          }
        })
        this.lineGraphic.add(arrowLine);
        arrowLine._polyline.clampToGround = true;
        this.map.add(this.lineGraphic);
        break;
      default:
        labelPoint = {
          longitude: points.slice(-2)[0],
          latitude: points.slice(-1)[0],
        }
        this.graLine = new PrimitiveSymbol({
          id: `line_${attr.name}`,
          type: 'line',
          ranges: points,
          color: attr.color,
          width: attr.thickness || 1,
          class: 'both',
        });
        this.graLine.attribute = attr
        this.lineLayerData.push(this.graLine)
        this.map.add(this.graLine);
        break;
    }

    this.map.findLayerById(`line-${attr.name}`)
    && this.map.remove(this.map.findLayerById(`line-${attr.name}`));
    this.onLabelDraw({
      title: attr.name,
      data: labelPoint,
      labelColor: attr.labelColor,
      fontSize: attr.fontSize + 'px',
      fontBold: attr.fontBold,
      labelDisplay: attr.labelDisplay,
      layerName: `line-${attr.name}`
    })
  },

  /**
   * 绘制面
   * @param { 经纬度对象 } points
   * @param { 面属性 } attr
   */

  drawArea(points, attr, view) {
    this.drawView = view
    let labelPoint = {
      longitude: points[points.length-1][0],
      latitude: points[points.length-1][1],
    }
    this.map.findLayerById(`line_${attr.name}`)
    && this.map.remove(this.map.findLayerById(`line_${attr.name}`));
    this.map.findLayerById(`area_${attr.name}`)
    && this.map.remove(this.map.findLayerById(`area_${attr.name}`));
    this.map.findLayerById(`area-${attr.name}`)
    && this.map.remove(this.map.findLayerById(`area-${attr.name}`));
    this.areaGraphic = new GraphicsLayer({ id: `area_${attr.name}`})
    let areaPolygonGeo = {
      type: 'polygon',
      rings: points,
    }
    let areaPolygonSymbol = {
      type: 'simple-fill',
      color: attr.color,
      outline: true,
      outlineColor: attr.borderColor,
    }
    let areaPolygon = new Graphic({
      geometry: areaPolygonGeo,
      symbol: areaPolygonSymbol,
      popupTemplate: {
        actions: ()=>{
          return attr
        }
      },
    })
    this.areaGraphic.add(areaPolygon);
    this.map.add(this.areaGraphic);

    this.onLabelDraw({
      title: attr.name,
      data: labelPoint,
      labelColor: attr.labelColor,
      fontSize: attr.fontSize + 'px',
      fontBold: attr.fontBold,
      labelDisplay: attr.labelDisplay,
      layerName: `area-${attr.name}`
    })
  },

  removeDrawLayer(id,type) {
    switch(type){
      case 'spot':
        this.removeLayer(`spot_${id}`)
        this.removeLayer(`spot_`)
        this.removeLayer(`spot-${id}`)
        break;
      case 'line':
        this.removeLayer(`line_${id}`)
        this.removeLayer(`line_`)
        this.removeLayer(`line-${id}`)
        break;
      default:
        this.removeLayer(`area_${id}`)
        this.removeLayer(`area_`)
        this.removeLayer(`area-${id}`)
        break;
    }
  },

  skimSpot(points, attr) { //绘制点
    this.map.findLayerById(`spot_${attr.name}`)
    && this.map.remove(this.map.findLayerById(`spot_${attr.name}`));
    this.map.findLayerById(`spot-${attr.name}`)
    && this.map.remove(this.map.findLayerById(`spot-${attr.name}`));
    // this.graSpot && this.map.remove(this.graSpot);
    let { longitude, latitude } = points
    this.graSpot = new PrimitiveSymbol({
      id: `spot_${attr.name}`,
      type: 'circle',
      center: [longitude, latitude],
      radius: 1,
      color: attr.color,
      class: 'both'
    });
    this.map.add(this.graSpot);
  },
  linkClick(val, action) {
    this.singlepicker && this.singlepicker.destroy()
    this.singlepicker = new SinglePicker({
      viewer: window.viewer,
      clickPick: {
        success: function (feature) {
          if (feature.primitive.id.indexOf("isLf") != -1)
            action(feature)
        }
      },
    });
  },
  loadShpLF(url, id) {
    this.map.findLayerById(id) && this.map.remove(this.map.findLayerById(id))
    this.Layers[id] = new WMSLayer({
      id: id,
      url: url
    })
    this.map.add(this.Layers[id])
  },

  removeRangeLine(id){
    this.removeLayer(`lineLayer-${id}`)
    this.removeLayer(`dottedLayer-${id}`)
    this.removeLayer(`arrowLayer-${id}`)
    this.removeLayer(`fitArrowLayer-${id}`)
    this.removeLayer(`fitArrowLayer-`)
  },

  darwRangeLine(path, attr) {
    let realPath = [];
    let emptyPath = [];
    if(attr.lineType === 0 ){
      path.forEach((e) => {
        realPath.push(e.longitude, e.latitude);
      });
      this.map.findLayerById(`lineLayer-${attr.name}`)
      && this.map.remove(this.map.findLayerById(`lineLayer-${attr.name}`))
      let newLine = new PrimitiveSymbol({
        id: `lineLayer-${attr.name}`,
        type: 'line',
        ranges: realPath,
        color: attr.color,
        width: attr.lineWidth,
        class: 'both',
      });
      this.lineLayerData.push(newLine)
      this.map.add(newLine);
    }else{
      path.forEach((e) => {
        emptyPath.push([e.longitude, e.latitude]);
      });
      this.map.findLayerById(`dottedLayer-${attr.name}`)
      && this.map.remove(this.map.findLayerById(`dottedLayer-${attr.name}`))
      this.dottedLineLayer = new GraphicsLayer({ id: `dottedLayer-${attr.name}` })
      let lineGeo = {
        type: "polyline", //autocasts as new Polyline
        paths: emptyPath
      }
      let lineSymbol = {
        type: 'simple-line', //autocasts as new SimpleLineSymbol()
        width: attr.lineWidth,
        followSurface: false, //默认为true
        style: {
          type: "line-dash",
          color: attr.color,
          dashLength: 30
        }
      }
      let lineGraphic = new Graphic({
        geometry: lineGeo,
        symbol: lineSymbol
      })
      this.dottedLineLayer.add(lineGraphic);
      lineGraphic._polyline.clampToGround = true;
      this.map.add(this.dottedLineLayer);
    }
  },
  /**
   * @description: 绘制线
   * @param {*} path 经纬度
   * @param {*} color 线颜色
   */
   skimLine(path, attr) {
    this.map.findLayerById('lineLayer') && this.map.remove(this.map.findLayerById('lineLayer'))
    let newLine = new PrimitiveSymbol({
      id: 'lineLayer',
      type: 'line',
      ranges: path,
      color: attr.color,
      width: attr.width,
      class: 'both',
    });
    this.lineLayerData.push(newLine)
    this.map.add(newLine);
  },
  dottedLine(path, attr) {
    this.map.findLayerById("dottedLineLayer")
    && this.map.remove(this.map.findLayerById("dottedLineLayer"))
    this.dottedLineLayer = new GraphicsLayer({ id: "dottedLineLayer" })
    let lineGeo = {
      type: "polyline", //autocasts as new Polyline
      paths: path
    }
    let lineSymbol = {
      type: 'simple-line', //autocasts as new SimpleLineSymbol()
      width: attr.width,
      followSurface: false, //默认为true
      style: {
        type: "line-dash",
        color: attr.color,
        dashLength: 30
      }
    }
    let lineGraphic = new Graphic({
      geometry: lineGeo,
      symbol: lineSymbol
    })
    this.dottedLineLayer.add(lineGraphic);
    lineGraphic._polyline.clampToGround = true;
    this.map.add(this.dottedLineLayer);
  },
  // 贴合地图的箭头
  fitMapArrow(path, attr) {
    this.map.findLayerById(`fitArrowLayer-${attr.name}`) || (this.fitMapArrowLayer = new GraphicsLayer({
      id: `fitArrowLayer-${attr.name}`
    }), window.viewer.map.add(this.fitMapArrowLayer));
    path.forEach((e, i) => {
      if (i != 0) {
        let lineGeo = {
          type: "polyline", //autocasts as new Polyline
          paths: [
            [path[i - 1].longitude, path[i - 1].latitude],
            [path[i].longitude, path[i].latitude],
          ]
        }
        let lineSymbol = {
          type: 'simple-line', //autocasts as new SimpleLineSymbol()
          width: attr.lineWidth,
          followSurface: false, //默认为true
          style: {
            type: "line-arrow",
            color: attr.color,
            dashLength: 30,
            gapColor: { //间隔颜色
              r: 46,
              g: 51,
              b: 254,
              a: 0
            },
          }
        }
        let lineGraphic = new Graphic({
          geometry: lineGeo,
          symbol: lineSymbol
        })
        this.fitMapArrowLayer.add(lineGraphic);
        lineGraphic._polyline.clampToGround = true;
      }
    })
  },

  //绘制箭头
  ArrowsPoint(value, attr) {
    this.map.findLayerById(`arrowLayer-${attr.name}`)
    && this.map.remove(this.map.findLayerById(`arrowLayer-${attr.name}`))
    this.arrowLayer = new GraphicsLayer({
      id: `arrowLayer-${attr.name}`
    })
    let _path = []
    value.forEach(e => {
      _path.push([e.longitude, e.latitude, (e.height || e.altitude || 0) + 10])
    })
    let _lineGeo4 = {
      type: "polyline",
      paths: _path
    }
    let _lineSymbol4 = {
      type: 'simple-line',
      width: attr.lineWidth,
      followSurface: false,
      style: {
        type: 'line-arrow',
        color: attr.color
      }
    }
    let _lineGraphic4 = new Graphic({
      geometry: _lineGeo4,
      symbol: _lineSymbol4
    })
    _lineGraphic4._polyline.clampToGround = true;
    this.arrowLayer.add(_lineGraphic4);
    this.map.add(this.arrowLayer);
  },
  addOutside(options, color = "rgba(255,255,255,.3)", name) { //绘制面
    this.gra3 && this.map.remove(this.gra3)
    this.gra3 = new PrimitiveSymbol({
      ranges: options,
      color: color,
      class: "both"
    });
    this.gra3.name = name
    this.map.add(this.gra3);
  },

  getDistance(lon1, lat1, lon2, lat2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lon1 * Math.PI / 180.0 - lon2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s;
  },
  profile(data, callBack) { //剖面图
    this.graSpot && this.map.remove(this.graSpot);
    let _path = [data[0].longitude, data[0].latitude, data[1].longitude, data[1].latitude, ]
    this.profileSkimLine(_path, 4)
    this.mapClick && this.mapClick.destroy(), this.mapClick = null
    let _point = new MapUtils(window.viewer).getDengLngLat(data[0], data[1], 60);
    let _data = []
    let _height = []
    _point.forEach((e, i) => {
      _height.push(e[2])
      _data.push([(this.getDistance(_point[0][0], _point[0][1], e[0], e[1]) * 1000).toFixed(2), e[2]])
    })
    let _maxN = Math.max.apply(null, _height).toFixed() * 1;
    let _minN = Math.min.apply(null, _height).toFixed() * 1;
    callBack(_data, _maxN, _minN);
  },
  profileSkimLine(path, color = "#FF0000", width = 2) {
    let newLine = new PrimitiveSymbol({
      id: "1111111111111111111111",
      type: 'line',
      ranges: path,
      color: color,
      width: width,
      class: 'both'
    });
    this.profileLineLayerData.push(newLine)
    this.map.add(newLine);
  },
  coverageCLICK(value, data, notCoverage = false, isproile) {
    let _textSymbol, _textGraphic;
    // window.viewer.scene.globe.depthTestAgainstTerrain = true;
    this.singlepicker = new SinglePicker({
      viewer: window.viewer,
      enterPick: {
        enter: (feature) => {
          if (!feature.primitive.name) {
            return
          }
          let _longNum = 0,
            _latNum = 0,
            _height = 0;
          feature.primitive.pathArry.forEach(e => {
            _longNum += e.longitude;
            _latNum += e.latitude;
            e.height > _height && (_height = e.height)
          })
          let _longitude = (_longNum / (feature.primitive.pathArry.length))
          let _latitude = (_latNum / (feature.primitive.pathArry.length))
          this.titleFun(feature.primitive.faceName, _longitude, _latitude, _height)
        },
        out: () => {
          this.titleLayer && this.map.remove(this.titleLayer)
          this.titleLayer = null;
        }
      }
    });
    this.mapClick || (this.mapClick = new EventDrive({
      viewer: window.viewer,
      eventType: 'left_click',
      callBack: a => {
        if (notCoverage) {
          value(a)
          if (isproile) {} else {
            this.mapClick && this.mapClick.destroy(), this.mapClick = null
          }
        } else {
          value(viewer.scene.pick(a.screenPoint), data)
        }
      }
    }))
  },
  addLocationPoint(value) {
    let nameLayer = 'pointLayer'
    const geometry = {
      type: 'point',
      longitude: value.longitude,
      latitude: value.latitude,
      height: 2
    }
    const symbol = deepClone(this.simpleSymbol)
    const graphicsConfig = { // 标识点
      id: 'foucsGraphics',
      geometry,
      symbol
    }

    // this.removeGraphics('textGraphics')
    // this.removeGraphics(graphicsConfig.id)
    let symbolGraphics = new Graphic(graphicsConfig)
    this.Layers[nameLayer] && this.Layers[nameLayer].add(symbolGraphics)
    this.goView({
      longitude: value.longitude,
      latitude: value.latitude,
      height: 4000 // camera.positionCartographic.height  // 解决定位不拉近
    })
  },

  getLonLat(callback) {
    viewer.scene.globe.depthTestAgainstTerrain = true
    // this.mouseMove({type:'point'});
    this.rightRemove();
    this.lonlat = new EventDrive({
      viewer: viewer,
      eventType: 'left_click', // mouse_move,right_click
      callBack: (e) => {
        this.skimSpot(e.mapPoint)
        const {
          longitude,
          latitude,
          height
        } = e.mapPoint
        callback({
          longitude,
          latitude,
          height
        })
        this.goView({
          longitude: longitude,
          latitude: latitude,
          height: 4000 // camera.positionCartographic.height  // 解决定位不拉近
        })
        this.lonlat && this.lonlat.destroy()
        this.lonlat = null
      }
    })
  },

  rightRemove() {
    this.rightClick = new EventDrive({
      viewer: viewer,
      eventType: 'right_click',
      callBack: a => {
        this.remove()
      }
    })
  },

  stratumSection() {
    this.sectionLine = []
    let startClick = new EventDrive({
      viewer: window.viewer,
      eventType: 'left_click',
      callBack: a => {
        this.sectionLine.push([a.mapPoint.longitude, a.mapPoint.latitude, a.mapPoint.height])
        this.stratumSectionEvent([this.sectionLine[this.sectionLine.length - 2], this.sectionLine[this.sectionLine.length - 1]].flat())
      }
    })
  },

  stratumSectionEvent(s) {
    console.log(s)
  },
  areaUsed(index, menuList, qhs) {
    if (index === 0) {
      this.used = new ToolArea({ //面积
        viewer: window.viewer,
        actis: qhs
      })
      menuList.mapClickVal = true;
      menuList.toolVal = 1;
    } else if (index === 1) {
      this.distance = new ToolDistance({ //距离
        viewer: window.viewer,
        actis: qhs
      })
      menuList.mapClickVal = true;
      menuList.toolVal = 2;
    } else if (index === 2) {
      this.MeasureHeight = new ToolMeasureHeight({ //高度
        viewer: window.viewer,
        actis: qhs
      })
      menuList.mapClickVal = true;
      menuList.toolVal = 3;
    } else if (index === 3) {
      this.MeasureHeight = new ToolMeasureHeight({ //坡度
        viewer: window.viewer,
        actis: qhs
      })
      menuList.mapClickVal = true;
      menuList.toolVal = 4;
    }
  },
  toolsRemove() {
    this.MeasureHeight && (this.MeasureHeight.destroy(), this.MeasureHeight = false);
    this.singlepicker && (this.singlepicker.destroy(), this.singlepicker = false);
    this.distance && (this.distance.destroy(), this.distance = false);
    this.used && (this.used.destroy(), this.used = false)
    // this.graSpot && this.map.remove(this.graSpot);
    this.profileLineLayerData.forEach(e => {
      this.map.remove(e)
    })
  },

  removeUsed() {
    this.deletePointLineLayer({
      line: true
    })
    this.graLine && this.map.remove(this.graLine);
    this.graSpot && this.map.remove(this.graSpot);
    this.gra3 && this.map.remove(this.gra3)
    this.mapClick && this.mapClick.destroy(), this.mapClick = null;
    this.leftMonomerEventDrive && (this.leftMonomerEventDrive.destroy(), this.leftMonomerEventDrive = null)
    this.rightMonomerEventDrive && (this.rightMonomerEventDrive.destroy(), this.rightMonomerEventDrive = null)
  },

  /**
   * @description: 多个点 载点函数
   * @param {*} data 载点数据列表
   */
  MapPoints(data) {
    let {
      isRemoveLayer = true
    } = data
    if (isRemoveLayer) {
      this.map.remove(this.mapPoint)
    }
    this.removeLayer("oneLevelLayer");
    this.removeLayer("oneTitleLayer");
    let warnData = {}
    data.warnData && data.warnData.forEach(e => {
      warnData[e.disasterNo] = e
    })
    data.data.forEach(e => {
      (e.longitude || e.latitude) || (console.log(`提示：ID--${e.id} 的载点数据未发现坐标,字段为 longitude 或 latitude `))
      e.type || (console.log(`提示：ID--${e.id} 的载点数据未发现类型,字段为：type`))
      if (e.longitude && e.latitude && e.type) {
        let modelTypeName = "type";
        warnData[e.pikk] && (modelTypeName = "warnType", e.warnType = "warn_" + warnData[e.pikk].amendLevel)
        this.addModel({
          data: e,
          actions: data.action,
          layerName: "oneLevelLayer",
          modelName: e.disasterId ? "deviceModel" : "dangerModel",
          modelTypeName: modelTypeName
        });
        this.titleFun({
          title: e.monitorName,
          data: e,
          layerName: "oneTitleLayer",
          minShow: 0,
          maxShow: 80000
        })
      }
    })
  },
  /**
   * @description: 单点 载点函数
   * @param {*} data 载点数据
   * @param {*} iconName 载点图标名称
   * @param {*} action 返回函数
   * @param {*} isRemoveLayer 是否移除当前图层
   * @param {*} pointLevel 载点的等级
   */
  async addMapPoint(data, iconName = "default", action, isRemoveLayer = true, pointLevel = 1, layerName = "oneLevelLayer") {
    if (!this.map.findLayerById(layerName)) {
      this.mapPoint = new GraphicsLayer({
        id: layerName,
        viewer: window.viewer
      });
      this.map.add(this.mapPoint);
    }
    let {
      longitude = 0,
      latitude = 0,
      altitude = 0,
    } = data
    let geometry = {
      type: "point",
      longitude: longitude,
      latitude: latitude,
      height: altitude + 3
    }
    let mapPointGraphic = new Graphic({
      id: `device${data.id}`,
      geometry: geometry,
      symbol: {
        url: await this.getMapIcon(iconName),
        ...this.pictureSymbol(pointLevel)
      },
      popupTemplate: {
        actions: this.addFocusPoint2.bind(this, {
          data: data,
          action: action
        }, "", true),
        data: data,
        id: data.id,
        content: JSON.stringify({
          lon: data.longitude,
          lat: data.latitude,
          height: data.altitude || 10,
          modelName: 'deviceModel'
        })
      },
    });
    this.modelData.deviceModel[`device${data.id}`] = mapPointGraphic;
    this.mapPoint.add(mapPointGraphic);

  },
  modelPoints(data) {
    let {
      isRemoveLayer = true
    } = data
    if (isRemoveLayer) {
      this.map.remove(this.mapPoint)
    }
    this.removeLayer("twoLevelLayer");
    this.removeLayer("twoTitleLayer");
    let option = data.typeOption;
    let optionObj = {};
    option.forEach(e => {
      optionObj[e.value] = e
    })
    data.data.forEach(e => {
      (e.longitude || e.latitude) || (console.log(`提示：ID--${e.id} 的载点数据未发现坐标,字段为 longitude 或 latitude `))
      e.type || (console.log(`提示：ID--${e.id} 的载点数据未发现类型,字段为：type`))
      if (e.longitude && e.latitude && e.type) {
        this.addMapPoint(e, e.type, data.action, data.isRemoveLayer, data.pointLevel, 'twoLevelLayer');
        (data.pointLevel == 2) && this.titleFun({
          title: `${e.name}(${optionObj[e.type].label})`,
          data: e,
          layerName: 'twoTitleLayer',
        })
      }
    })
  },
  /**
   * @description: 设备模型载点
   */
  addModel(val) {
    let { data, actions, layerName = "modelLayer", modelName, modelTypeName = "type" } = val;
    let scale = 0.5, minimumPixelSize = 30;
    if (modelName == "deviceModel") {
      scale = 1, minimumPixelSize = 30;
    }
    if (!this.map.findLayerById(layerName)) {
      this.modelPoint = new GraphicsLayer({
        id: layerName,
        viewer: window.viewer
      });
      this.map.add(this.modelPoint);
    }

    let point = {
      type: 'point',
      longitude: data.longitude,
      latitude: data.latitude,
      height: data.altitude ? data.altitude : 0
    }
    let modelGraphic, modelSymbol;
    if (this.modelData[modelName][data[modelTypeName]]) {
      modelSymbol = clone(this.modelData[modelName][data[modelTypeName]].model);
      modelSymbol.type = 'web-style'
      modelSymbol.heading = 90;
      modelSymbol.pitch = 0;
      modelSymbol.roll = 0;
      modelSymbol.heightReference = HeightReference.RELATIVE_TO_GROUND
      modelSymbol.verticalOrigin = VerticalOrigin.BOTTOM
    } else {
      if (modelFileName[data[modelTypeName]] && modelFileName[data[modelTypeName]].indexOf("shebei5") != -1) {
        scale = 0.05
      }
      modelSymbol = {
        type: 'web-style',
        url: moduleIp + modelFileName[data[modelTypeName]],
        scale: scale,
        heading: 90,
        pitch: 0,
        roll: 0,
        heightReference: HeightReference.RELATIVE_TO_GROUND,
        verticalOrigin: VerticalOrigin.BOTTOM,
        minimumPixelSize: minimumPixelSize, //当层级缩小时可以看到的大小
        maximumScale: 8000, //限制minimumPixelSize的上限
      }
    }

    modelGraphic = new Graphic({
      id: `module${data.id}`,
      symbol: modelSymbol,
      geometry: point,
      popupTemplate: {
        actions: this.addFocusPoint2.bind(this, {
          data: data,
          action: actions
        }, "", true),
        id: data.id,
        content: JSON.stringify({
          lon: data.longitude,
          lat: data.latitude,
          height: data.altitude || 10,
          modelName: modelName
        })
      }
    })

    this.modelData[modelName][`module${data.id}`] = modelGraphic;
    this.modelPoint.add(modelGraphic);
  },

  pictureSymbol(level) {
    let lowest = 20000;
    let highest = 40000;
    if (level == 2) {
      lowest = 800;
      highest = 1600;
    }
    return {
      type: 'picture-marker',
      width: 35,
      height: 35,
      heightReference: HeightReference.RELATIVE_TO_GROUND,
      verticalOrigin: VerticalOrigin.BOTTOM, // 添加鼠标点击属性后解决栽点下陷问题
      scaleByDistance: new NearFarScalar(lowest, 1, highest, 0.5)
    }
  },

  /**
   * 添加点云图层、
   * @constructor
   * @param {url} 点云图层地址
   * @param {id} 点云id
   */
   addCloudSenceLayer(id, url) {
    let coludLayer = new SceneLayer({
      url: url,
      id: "pointCloud" + id
    });
    coludLayer.style = new PGEarth3DTileStyle({
      pointSize : 2
    })

    setTimeout(()=>{
      this.map.add(coludLayer);
    }, 4000)

    coludLayer.readyPromise.then(function() {
      window.viewer.zoomTo(coludLayer)
    }).otherwise(function(err){
      console.log(err);
    });

    setTimeout(e => {
      let boundingSphere = coludLayer.boundingSphere;
      let cartographic = Cartographic.fromCartesian(boundingSphere.center);
      let surface = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
      let offset = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0);
      let translation = Cartesian3.subtract(offset, surface, new Cartesian3());
      coludLayer.modelMatrix = Matrix4.fromTranslation(translation);
    }, 1000)
  },
  /**
   * 移除点云图层、
   * @constructor
   * @param {url} 点云图层地址
   * @param {id} 点云id
   */
  removeCloudSenceLayer(id){
    this.map.findLayerById("pointCloud" + id) && this.map.remove(this.map.findLayerById("pointCloud" + id))
  },

  addFocusPoint2(value, options, isPoint, isParticulars) {
    if (!isParticulars) {
      if (!value.data.disasterId) {
        this.goView({
          longitude: value.data.longitude,
          latitude: value.data.latitude,
          height: 400,
          preMinus: 0
        })
      }
      this.kuosan2(value.data)
      value.action(value);
    }
  },

  onLabelDraw(val) {
    let {
      title,
      data,
      labelColor,
      fontSize,
      fontBold,
      labelDisplay,
      layerName = "titleLayer"
    } = val;
    if (!this.map.findLayerById(layerName)) {
      this.titleLayer = new GraphicsLayer({
        id: layerName,
        viewer: window.viewer
      })
    }

    let textPoint = {
      type: "point", //autocasts as new Point()
      longitude: data.longitude,
      latitude: data.latitude,
      height: 5
    }
    let textSymbol = new TextSymbol({ //type:"text",通过定义type属性无需 new TextSymbol
      color: labelColor,
      text: title || "",
      xoffset: 0,
      yoffset: -25,
      style: "FILL_AND_OUTLINE", //默认无边线
      font: {
        size: fontSize
      },
      scaleByDistance: new NearFarScalar(500, 1, 1000, 0.6)
    })

    let textGraphic = new Graphic({
      geometry: textPoint,
      symbol: textSymbol
    })
    this.titleLayer.add(textGraphic)
    if(labelDisplay == "1"){
      this.map.add(this.titleLayer)
    }else{
      this.map.remove(this.titleLayer)
    }
  },

  cityTitleFun(val){
    let { data, layerName = "cityNameLayer", minShow = 1000, maxShow = 40000 } = val;
    if (!this.map.findLayerById(layerName)) {
      this.titleLayer = new GraphicsLayer({
        id: layerName,
        viewer: window.viewer
      })
      this.map.add(this.titleLayer)
    }

    let textPoint = {
      type: "point",
      longitude: data.cityLongitude,
      latitude: data.cityLatitude,
      height: 100
    }
    let textSymbol = new TextSymbol({
      color: "#ffffff",
      text: data.cityName || "",
      xoffset: 0,
      yoffset: 0,
      style: "FILL_AND_OUTLINE",
      font: {
        size: '20px'
      },
      heightReference: HeightReference.RELATIVE_TO_GROUND,
      verticalOrigin: VerticalOrigin.BOTTOM, // 添加鼠标点击属性后解决栽点下陷问题
      scaleByDistance: new NearFarScalar(minShow, 0.8, maxShow, 1)
    })
    let textGraphic = new Graphic({
      id: `city-${data.id}`,
      geometry: textPoint,
      symbol: textSymbol,
    })
    this.titleLayer.add(textGraphic)
  },

  titleFun(val) {
    let {
      title,
      data,
      layerName = "titleLayer",
      minShow = 1000,
      maxShow = 4000
    } = val;
    if (!this.map.findLayerById(layerName)) {
      this.titleLayer = new GraphicsLayer({
        id: layerName,
        viewer: window.viewer
      })
      this.map.add(this.titleLayer)
    }


    let textPoint = {
      type: "point", //autocasts as new Point()
      longitude: data.longitude,
      latitude: data.latitude,
      height: data.altitude? data.altitude + 15 : 15
    }
    let textSymbol = new TextSymbol({ //type:"text",通过定义type属性无需 new TextSymbol
      color: "#ffff00",
      text: title || "",
      xoffset: 0,
      yoffset: -30,
      style: "FILL_AND_OUTLINE", //默认无边线
      font: {
        size: '16px'
      },
      // showBackground: false,
      heightReference: HeightReference.RELATIVE_TO_GROUND,
      verticalOrigin: VerticalOrigin.BOTTOM, // 添加鼠标点击属性后解决栽点下陷问题
      scaleByDistance: new NearFarScalar(minShow, 1, maxShow, 0.6)
    })
    let textGraphic = new Graphic({
      id: `module-${data.id}`,
      geometry: textPoint,
      symbol: textSymbol,
      popupTemplate: {
        id: data.id,
        content: JSON.stringify({
          lon: data.longitude,
          lat: data.latitude,
          height: data.altitude || 10
        })
      },
    })
    this.modelData.dangerLabel[`module-${data.id}`] = textGraphic;
    this.titleLayer.add(textGraphic)
  },

  kuosan2(value, color = mapColor.CYAN) {
    window.viewer.scene.requestRenderMode = false
    window.viewer.scene.postProcessStages.remove(this.lastStage2)
    this.lastStage2 = CircleScanPostStage(
      window.viewer,
      new Cartographic(CMath.toRadians(value.longitude), CMath.toRadians(value.latitude), 1),
      3, color, 2000);
  },
  /**
   * @description: 监测点相关设备告警 底部显示对应的告警颜色圈
   * @param {*} data 设备数组
   */
  deviceKuosan(data) {
    let warnColor = {
      1: {
        alpha: 1,
        blue: 0,
        green: 0,
        red: 1,
      },
      2: {
        alpha: 1,
        blue: 0,
        green: 0.63,
        red: 1,
      },
      3: {
        alpha: 1,
        blue: 0,
        green: 1,
        red: 1,
      },
      4: {
        alpha: 1,
        blue: 1,
        green: 0.7,
        red: 0,
      },
    };
    data.forEach(e => {
      this.deviceArryKuosan.push(
        CircleScanPostStage(
          window.viewer,
          new Cartographic(
            CMath.toRadians(e.longitude),
            CMath.toRadians(e.latitude),
            1),
          1.5,
          warnColor[e.warnType],
          2000
        )
      );
    })
  },

  /**
   * @description: 关联函数deviceKuosan()  移除设备告警
   */
  removeDeviceKuosan() {
    this.deviceArryKuosan.forEach(e => {
      window.viewer.scene.postProcessStages.remove(e)
    })
  },

  goView({
    longitude,
    latitude,
    height = 400000,
    pitch = -88,
    preMinus = 0,
    level
  } = {}) {
    let elevationHeight = GeoUtils.getHeight(window.viewer, longitude, latitude);
    window.viewer.goTo({
      center: [longitude, latitude, elevationHeight > 0 ? elevationHeight + height : height],
      heading: 0,
      pitch: -90,
      roll: 0
    })
  },
  /**
   * @description: 获取图片
   * @param {*} name 图片名称
   */
  getMapIcon(name) {
    return new Promise((resovle) => {
      require([`@/assets/img/mapIcon/${name}.png`], res => {
        resovle(res)
      }, _ => {
        resovle(require('@/assets/img/mapIcon/default.png'))
        console.warn(`提示: 未发现${name}.png图片`)
      })
    })
  },
  adjustHeight(id, status = true) {
    this.map.findLayerById("oneLevelLayer") && this.map.findLayerById("oneLevelLayer").items.forEach(e => {
      if (id == e.popupTemplate.id) {
        let lonlat = JSON.parse(e.popupTemplate.content)
        e.position._value = Cartesian3.fromDegrees(lonlat.lon, lonlat.lat, status ? lonlat.height : 1)
      }
    })
  },
  deviceAdjustHeight(status = true) {
    this.map.findLayerById("secondLayer") && this.map.findLayerById("secondLayer").items.forEach(e => {
      let lonlat = JSON.parse(e.popupTemplate.content)
      e.position._value = Cartesian3.fromDegrees(lonlat.lon, lonlat.lat, status ? lonlat.height : 1)
    })
    this.map.findLayerById("titleLayer") && this.map.findLayerById("titleLayer").items.forEach(e => {
      let lonlat = JSON.parse(e.popupTemplate.content)
      e.position._value = Cartesian3.fromDegrees(lonlat.lon, lonlat.lat, status ? lonlat.height + 3 : 3)
    })
  }
}
