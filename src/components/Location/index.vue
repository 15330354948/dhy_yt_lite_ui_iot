<template>
  <el-container>
    <div id="location-map" class="location-map">
      <div class="lonlat-obtain">
        <el-form label-width="100px" size="mini" v-if="!LatAndLon.isShow == true">
          <!-- <el-form-item label="获取定位">
            <el-button type="primary" @click="fixedPos">重新定位</el-button>
          </el-form-item> -->
          <el-form-item label="当前经度">
            <el-input v-model="lonlatData.longitude" placeholder="请输入经度" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="当前纬度">
            <el-input v-model="lonlatData.latitude" placeholder="请输入纬度" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="f-a-c">
              <el-input v-model="keyWords" placeholder="请输入地区" @keyup.enter.native="setPlace"
                style="width: 230px;margin-right: 6px;"></el-input>
              <el-button type="primary" @click="setPlace" :disabled="!keyWords">查询</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="map_box">
        <div id="map">
        </div>
        <div class="tip" v-if="!LatAndLon.isShow == true">
          拖动图标获取经纬度
        </div>
      </div>
      <div slot="footer" class="dialog-footer"  v-if="!LatAndLon.isShow == true">
        <el-button size="mini" type="primary" @click="btnSubmit()">确 认</el-button>
      </div>
    </div>

  </el-container>
</template>

<script>
  export default {
    name: "location",
    props: ["LatAndLon"],
    data() {
      return {
        data: "visualmap",
        lonlatData: {
          longitude: "",
          latitude: "",
        },
        addressComponents: {},
        map: null,
        local: null,
        mk: null,
        longitude: '',
        latitude: '',
        keyWords: ''
      };
    },
    watch: {
      "lonlatData": {
        deep: true,
        handler(val) {
          let myGeo = new BMap.Geocoder();
          var _this = this;
          myGeo.getLocation(
            new BMap.Point(val.longitude || this.LatAndLon.longitude, val.latitude || this.LatAndLon.latitude),
            function (result) {
              _this.addressComponents = result.addressComponents
            }
          );
        },
      }
    },
    created() {

    },
    mounted() {
      this.lonlatData.longitude = Number(this.LatAndLon.longitude).toFixed(6)
      this.lonlatData.latitude = Number(this.LatAndLon.latitude).toFixed(6)
      this.initMap()
    },

    methods: {
      // 初始化地图
      initMap() {
        this.$nextTick(() => {
          this.map = new BMap.Map("map");
          let point = new BMap.Point(this.LatAndLon.longitude || this.lonlatData.longitude, this.LatAndLon
            .latitude || this.lonlatData.latitude);
          // this.handleMarker(this, point)
          this.map.centerAndZoom(point, 12);
          this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
          this.map.addControl(new BMap.NavigationControl());
          this.fixedPos();
        });
      },

      // 地图定位
      fixedPos() {
        const _this = this;
        const geolocation = new BMap.Geolocation();
        this.confirmLoading = true;
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            if(_this.LatAndLon.longitude != "" || _this.LatAndLon.latitude != ""){
              r.point.lat = _this.LatAndLon.latitude;
              r.point.lng = _this.LatAndLon.longitude;
            }
            _this.handleMarker(_this, r.point);
            console.log(r.point);
            
            let myGeo = new BMap.Geocoder();
            myGeo.getLocation(
              new BMap.Point(_this.LatAndLon.longitude || r.point.lng, _this.LatAndLon.latitude || r.point.lat),
              function (result) {
                _this.confirmLoading = false;
                if (result) {
                  _this.lonlatData.latitude = result.point.lat;
                  _this.lonlatData.longitude = result.point.lng;
                }
              }
            );

          } else {
            _this.$message.error("failed" + this.getStatus());
          }
        });
      },
      // 搜索地址
      setPlace() {
        this.local = new BMap.LocalSearch(this.map, {
          onSearchComplete: this.searchPlace
        })
        this.local.search(this.keyWords)
      },
      searchPlace() {
        if (this.local.getResults() != undefined) {
          this.map.clearOverlays() //清除地图上所有覆盖物
          if (this.local.getResults().getPoi(0)) {
            let point = this.local.getResults().getPoi(0).point //获取第一个智能搜索的结果
            this.map.centerAndZoom(point, 18)
            this.handleMarker(this, point)
            console.log('经度：' + point.lng + '--' + '纬度' + point.lat)
            this.lonlatData.latitude = point.lat
            this.lonlatData.longitude = point.lng
          } else {
            this.$message.error('未匹配到地点!')
          }
        } else {
          this.$message.error('未找到搜索结果!')
        }
      },
      // 确定
      btnSubmit() {
        let key = {
          latitude: this.lonlatData.latitude,
          longitude: this.lonlatData.longitude
        }
        console.log(key);
        console.log(this.addressComponents);
        this.$bus.$emit("getPoints", Object.assign(this.addressComponents, key));
      },
      // 设置标注
      handleMarker(obj, point) {
        
        let that = this;
        obj.mk = new BMap.Marker(point);
        obj.map.addOverlay(obj.mk);
        obj.mk.enableDragging(); // 可拖拽
        obj.mk.addEventListener("dragend", function (e) {
          // 监听标注的拖拽，获取拖拽后的经纬度
          that.lonlatData.latitude = e.point.lat;
          that.lonlatData.longitude = e.point.lng;
        });
        obj.map.panTo(point);
      }
    },
  };

</script>

<style scoped lang="scss">
  .el-container {
    // height: 52vh;
    width: 100%;

    .location-map {
      position: relative;
      width: 100%;
      height: 100%;

      .lonlat-obtain {
        height: 52px;
        padding: 5px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        // background: #121314cc;
        z-index: 1990;
      }
    }
  }

  .dialog-footer {
    padding: 10px 0 !important;
  }

  .el-form {
    display: flex !important;
  }

  .map_box {
    width: 100%;
    height: 400px;
    position: relative;
  }

  #map {
    width: 100%;
    height: 400px;
  }

  .tip {
    background-color: rgba(0, 0, 0, .5);
    border-radius: 10px;
    padding: 4px 8px;
    position: absolute;
    margin: auto;
    color: #fff;
    top: 10px;
    right: 10px;
    font-size: 14px;
    z-index: 999;
  }
  ::v-deep.dialog-footer{
    float: right !important;
  }

</style>
