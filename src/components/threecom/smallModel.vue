<template>
  <div class="modelBox">
    <div class="time_class">{{ time }}</div>
    <div
      id="container"
      ref="modelshaDO"
      style="width: 98%; height: 90%; margin: 0 auto"
    ></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { contextpath } from "@/config/env";

import { qinjiaoData,qinjiaoTimeData } from "@/api/monitorManage/quxian";
import { mapGetters } from "vuex";

export default {
  name: "ThreeTest",
  props: ["modelData"],
  data() {
    return {
      publicPath: contextpath,
      modelPath: "",
      dataValue: {
        positionX: 0,
        positionY: 35,
        positionZ: 35,

        rotationX: 5,
        rotationY: -5,
        rotationZ: 45,

        scaleX: 5,
        scaleY: 5,
        scaleZ: 5,
      },
      modelList: [],

      scene: "",
      camera: "",
      renderer: "",
      gltf: "",
      time: "",
    };
  },
  created() {},
  computed: mapGetters(["modelTimeChange"]),
  watch: {
    modelData: {
      handler(newName, oldName) {
        if (newName != oldName) {
          this.getTimeBegin();
        }
      },
      immediate: true,
    },
    modelTimeChange: {
      //曲线点击时间节点
      handler(valNew, valOld) {
        this.time = valNew;
        this.getQJdataTime();
      },
    },
  },
  methods: {
    getQJdataTime(){
        qinjiaoTimeData({
            deviceId: this.modelData.deviceId,
            dateTime:this.time
        }).then(res=>{
            this.modelList = [];
            this.modelList.push(res.data.data);
        }).then(red => {
            this.gettype();
        }).then(rex => {
            this.refreshModel();
        })
    },
    getTimeBegin() {
      qinjiaoData({
        deviceId: this.modelData.deviceId,
      })
        .then((res) => {
          this.modelList = res.data.data.data;
          this.time = this.modelList[0].time;
        })
        .then((red) => {
          this.gettype();
        })
        .then((rex) => {
          this.init();
        });
    },
    gettype() {
      if (this.modelList.length < 1) {
        this.modelPath = "/shebei.gltf";

        var rx = this.degreesToRadians(0);
        var ry = this.degreesToRadians(0);
        var rz = this.degreesToRadians(0);

        if (rz < 0) {
          if (Math.abs(rx) > Math.abs(ry)) {
            rx = Math.PI - rx;
          } else {
            ry = Math.PI - ry;
          }
        }

        this.dataValue = {
          positionX: 0,
          positionY: 35,
          positionZ: 35,

          rotationX: rx,
          rotationY: 0,
          rotationZ: ry,

          scaleX: 3,
          scaleY: 3,
          scaleZ: 3,
        };
        return false;
      }
      if (
        this.modelData.type == "gnssjzz_001" ||
        this.modelData.type == "gnss_001"
      ) {
        //gnss基准站、gnss
      } else if (this.modelData.type == "cjy_001") {
        //沉降仪
      } else if (this.modelData.type == "dbwylxs_0001") {
        //地表位移(拉线式)
      } else if (this.modelData.type == "qxzdbmwy_001") {
        //地面倾斜监测仪
        this.modelPath = "/shebei.gltf";
        // console.log(this.modelList)
        var rx = this.degreesToRadians(this.modelList[0].ynow); //带入y
        var ry = this.degreesToRadians(this.modelList[0].xnow); //带入x
        var rz = this.degreesToRadians(this.modelList[0].znow); //带入z

        if (rz < 0) {
          if (Math.abs(rx) > Math.abs(ry)) {
            rx = Math.PI - rx;
          } else {
            ry = Math.PI - ry;
          }
        }

        this.dataValue = {
          positionX: 0,
          positionY: 35,
          positionZ: 35,

          rotationX: rx,
          rotationY: 0,
          rotationZ: ry,

          scaleX: 3,
          scaleY: 3,
          scaleZ: 3,
        };
      } else if (this.modelData.type == "hslj_001") {
        //含水率计
      } else if (this.modelData.type == "jyl_001") {
        //降雨量监测仪
      } else if (this.modelData.type == "pxqcbxznbjy_001") {
        //坡斜浅层变形智能报警仪
      } else if (
        this.modelData.type == "qlf_001" ||
        this.modelData.type == "dlf_001"
      ) {
        //墙裂缝监测仪、地裂缝监测仪
      } else if (
        this.modelData.type == "hsl_001" ||
        this.modelData.type == "nw_001"
      ) {
        //水位计、泥位计
      } else if (this.modelData.type == "sbwy001") {
        //阵列式深部位移
      } else if (this.modelData.type == "bjq_001") {
        //智能报警器
      }
    },
    degreesToRadians(degrees) {
      return (degrees * Math.PI) / 180;
    },
    init() {
      var that = this;
      this.scene = new THREE.Scene();
      var lightLine = new THREE.DirectionalLight(0xffffff, 3); // 从正上方（不是位置）照射过来的平行光
      // var light = new THREE.AmbientLight(0xffffff,2) // 环境光会均匀的照亮场景中的所有物体，环境光不能用来投射阴影，因为它没有方向。
      var pointLight = new THREE.PointLight(0xffffff, 5); // 点光源，从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光。
      this.scene.add(lightLine);
      pointLight.position.set(10, 10, 10);
      this.scene.add(pointLight);

      var widthW = document.getElementById("container").offsetWidth;
      var widthH = document.getElementById("container").offsetHeight;
      this.camera = new THREE.PerspectiveCamera(
        45,
        widthW / widthH,
        0.1,
        10000
      );

      this.camera.position.set(
        that.dataValue.positionX,
        that.dataValue.positionY,
        that.dataValue.positionZ
      );
      this.camera.up.x = 0; //相机以哪个方向为上方
      this.camera.up.y = 1;
      this.camera.up.z = 0;
      this.camera.lookAt(0, 5, 0);

      this.renderer = new THREE.WebGLRenderer({
        antialias: true, //抗锯齿
        alpha: true, //背景透明，
      });
      this.renderer.setSize(widthW, widthH); //渲染的面积
      const axesHelper = new THREE.AxesHelper(20);
      this.scene.add(axesHelper); //坐标线
      this.scene.add(new THREE.GridHelper(30, 30)); //网格线
      document
        .getElementById("container")
        .appendChild(this.renderer.domElement); //渲染的位置  #container 内部
      this.renderer.render(this.scene, this.camera); //渲染

      const loader = new GLTFLoader();
      if (this.publicPath && this.publicPath.endsWith("/")) {
        if (this.publicPath === "/") {
          this.publicPath = "";
        } else {
          this.publicPath = this.publicPath.substr(
            0,
            this.publicPath.length - 1
          );
        }
      }
      loader.load(this.publicPath + this.modelPath, (gltf) => {
        //  模型三维旋转角度
        that.gltf = gltf;
        that.gltf.scene.rotation.x = that.dataValue.rotationX;
        that.gltf.scene.rotation.y = that.dataValue.rotationY;
        that.gltf.scene.rotation.z = that.dataValue.rotationZ;

        that.gltf.scene.scale.set(
          that.dataValue.scaleX,
          that.dataValue.scaleY,
          that.dataValue.scaleZ
        ); //模型缩放
        that.gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            child.material.emissive = child.material.color;
            child.material.emissiveMap = child.material.map;
          }
        });
        that.scene.add(that.gltf.scene);
        that.renderer && that.renderer.render(that.scene, that.camera); //渲染
      });
    },
    refreshModel() {
      var that = this;
      if (that.gltf != "") {
        that.gltf.scene.rotation.x = that.dataValue.rotationX;
        that.gltf.scene.rotation.y = that.dataValue.rotationY;
        that.gltf.scene.rotation.z = that.dataValue.rotationZ;
        that.scene.add(this.gltf.scene);
        that.renderer && that.renderer.render(that.scene, that.camera); //渲染
      }
    },
  },
  mounted() {},
  destroyed() {
    if (this.renderer !== "") {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer.domElement = null;
      this.renderer = null;
    }
  },
};
</script>
<style scoped>
.modelBox {
  width: 100%;
  height: 100%;
}
.time_class {
  text-align: center;
  font-size: 15px;
  line-height: 30px;
  color:black;
}
#container {
  font-size: 1.375rem;
  overflow: hidden;
}
</style>
