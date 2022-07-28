"use strict";

define(["../../Source/DataSources/Entity", "../../Source/Core/ScreenSpaceEventHandler", "../../Source/DataSources/GeoJsonDataSource", "../../Source/Core/ScreenSpaceEventType", "../../Source/Core/Cartographic", "../../Source/Core/Math", "../../Source/Core/Color", "../../Source/Core/Cartesian3", "../../Source/Core/createGuid"], function (i, t, e, o, n, r, l, s, a) {
  function h(o) {
    this.viewer = o.viewer, this.scene = this.viewer.scene, this.points = this.viewer.entities.add(new i()), this.polylines = this.viewer.entities.add(new i()), this.handler = new t(this.viewer.scene.canvas), this.isStartDraw = !1, this.isPolygon_fill = !1, this.PolygonPointArray_fill = [], this.poinsTemp = [], this.isFlat = !1;
    var n = this;
    viewer.dataSources.add(new e("tempDataSource")).then(function (i) {
      n.tempDataSource = i;
    });
  }

  h.prototype.start = function () {
    var i = this;
    this.handler.setInputAction(function (t) {
      i.fnLeftClickEvent(t);
    }, o.LEFT_CLICK), this.handler.setInputAction(function (t) {
      i.fnRightClickEvent(t);
    }, o.RIGHT_CLICK);
  }, h.prototype.fnLeftClickEvent = function (i) {
    var t = i.position;

    if (!(t.x - i.position.x > 3 || t.x - i.position.x < -3 || t.y - i.position.y > 3 || t.y - i.position.y < -3) && (e = this.viewer.camera.pickEllipsoid(i.position, this.scene.globe.ellipsoid))) {
      var e = this.scene.pickPosition(t),
          o = n.fromCartesian(e),
          a = r.toDegrees(o.longitude),
          h = r.toDegrees(o.latitude);
      return currentClickHei = o.height, this.isStartDraw ? (this.isPolygon_fill && tempDataSource.entities.add({
        name: "line on the surface",
        parent: polylines,
        clampToGround: !0,
        attachPolygon: !0,
        polyline: {
          positions: s.fromDegreesArrayHeights([this.PolygonPointArray_fill[this.PolygonPointArray_fill.length - 3], this.PolygonPointArray_fill[this.PolygonPointArray_fill.length - 2], this.PolygonPointArray_fill[this.PolygonPointArray_fill.length - 1], a, h, currentClickHei]),
          width: 2,
          material: l.BLUE,
          clampToGround: !0,
          attachPolygon: !0,
          disableDepthTestDistance: 1e9
        }
      }), currentClickHei = CommobPolygonHeight) : this.isPolygon_fill && (this.tempDataSource.entities.add({
        position: e,
        clampToGround: !0,
        attachPolygon: !0,
        point: {
          parent: this.points,
          pixelSize: 3,
          color: l.YELLOW,
          disableDepthTestDistance: 1e9
        }
      }), this.PolygonPointArray_fill = null, this.isStartDraw = !0, this.CommobPolygonHeight = parseInt(currentClickHei)), this.PolygonPointArray_fill.push(a, h, currentClickHei), void this.poinsTemp.push(e);
    }
  }, h.prototype.fnRightClickEvent = function (i) {
    if (this.isPolygon_fill) {
      var t = this.viewer.camera.pickEllipsoid(i.position, this.scene.globe.ellipsoid);

      if (t && this.isStartDraw) {
        var e = n.fromCartesian(t),
            o = r.toDegrees(e.longitude).toFixed(2),
            h = r.toDegrees(e.latitude).toFixed(2),
            c = scene.pickPosition(movement.position),
            y = (e = n.fromCartesian(c), r.toDegrees(e.longitude)),
            g = r.toDegrees(e.latitude);
        e.height;
        o = y, h = g;
        var p = CommobPolygonHeight;
        null != this.PolygonPointArray_fill && this.PolygonPointArray_fill.push(o, h, p);
        var u = a();

        if (this.PolygonPointArray_fill.length >= 9) {
          if (this.isFlat) {
            targetDataSource.entities.add({
              name: "未命名面",
              polygon: {
                hierarchy: s.fromDegreesArrayHeights(this.PolygonPointArray_fill),
                material: new l(.5, 1, 1, .7),
                fill: !0,
                outline: !0,
                outlineColor: l.YELLOW,
                perPositionHeight: !0
              }
            });
            this.poinsTemp.push(c), this.isFlat = !1, this.tempDataSource.entities.removeAll();
          }

          oFlatPosArray[u] = this.PolygonPointArray_fill, this.PolygonPointArray_fill = null, this.isPolygon_fill = !1, isStartDraw = !1, $("#CreatPolygon").removeAttr("disabled").removeClass("disabled"), $(".analysisBox").show().attr("data-id", u), $("#FlatHeight").val(CommobPolygonHeight);
        } else alert("绘制范围最少3个点");
      } else this.PolygonPointArray_fill = null, this.isPolygon_fill = !1, tempDataSource.entities.removeAll(), targetDataSource.entities.removeAll(), $("#CreatPolygon").removeAttr("disabled").removeClass("disabled"), this.isFlat = !1;
    }
  };
});