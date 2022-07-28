"use strict";

define(["../../DataSources/PolylineGlowMaterialProperty", "../../Core/Color", "../../Core/defined", "../../Scene/GroundPrimitive", "../../Scene/PolylineMaterialAppearance", "../../Scene/Material", "../../Core/GeometryInstance", "../../Core/CorridorGeometry", "../../DataSources/CallbackProperty", "../../Core/ScreenSpaceEventHandler", "../../Core/ScreenSpaceEventType", "./support/PickGlobe", "../../Core/Cartesian3", "../../Core/Cartographic", "../../Core/Ellipsoid", "../../Scene/PerInstanceColorAppearance", "../../Core/VertexFormat", "../../Core/ColorGeometryInstanceAttribute"], function (i, r, s, a, e, t, l, p, c, h, d, w, m, v, o, n, y, f) {
  function u(e, t) {
    this.viewer = e, this.scene = this.viewer.scene, this.leftpoints = [], this.poinsTemp = [], this.isDrawLine = !1, this.callBack = t, this.heights = [];
    var o = this;
    this.polylineTemp = this.viewer.entities.add({
      name: "tempLine",
      polyline: {
        positions: new c(function () {
          return o.poinsTemp;
        }, !1),
        width: 5,
        material: new i({
          glowPower: .2,
          color: r.RED
        })
      }
    });
    var n = 0;
    this.pickGlobe = new w(e), this.handler = new h(this.scene.canvas), this.handler.setInputAction(function (e) {
      var i = o.pickGlobe.pickGlobe(e.position);
      s(i) && (0 === n ? (o.isDrawLine = !0, o.leftpoints[0] = i, o.leftpoints[1] = i, o.poinsTemp[0] = i, n++) : (o.leftpoints[1] = i, o.polyline = o.viewer.scene.primitives.add(new a({
        geometryInstances: new l({
          geometry: new p({
            vertexFormat: y.POSITION_ONLY,
            positions: o.leftpoints,
            width: 5
          }),
          attributes: {
            color: new f(0, 1, 1, .5)
          },
          id: "sectionAnalysis"
        })
      })), o.addSectionAnalysis(o.leftpoints[0], o.leftpoints[1], t), o.leftpoints = new Array(2), n = 0, o.isDrawLine = !1, o.viewer.entities.remove(o.polylineTemp)));
    }, d.LEFT_CLICK), this.handler.setInputAction(function (e) {
      var i = o.pickGlobe.pickGlobe(e.endPosition);
      s(i) && o.isDrawLine && s(o.poinsTemp[0]) && (o.poinsTemp[1] = i);
    }, d.MOUSE_MOVE);
  }

  return u.prototype.addSectionAnalysis = function (o, n, r) {
    this.scene.clampToHeightSupported || console.log("This browser does not support clampToHeightMostDetailed.");

    for (var s = this, e = m.distance(o, n), a = Math.floor(1e4 <= e ? e / 100 : e <= 100 ? e / 2 : e / 10), i = new Array(a), t = 0; t < a; ++t) {
      var l = t / (a - 1);
      i[t] = m.lerp(o, n, l, new m());
    }

    s.viewer.scene.clampToHeightMostDetailed(i).then(function (e) {
      for (var i = 0; i < a; ++i) {
        var t = v.fromCartesian(e[i], s.scene.globe.ellipsoid).height;
        s.heights.push(t);
      }

      r && r(s.heights, o, n);
    });
  }, u.prototype.clear = function () {
    this.leftpoints = [], this.poinsTemp = [], this.isDrawLine = !1, this.viewer.scene.groundPrimitives.remove(this.polyline), this.handler.isDestroyed() || this.handler.destroy();
  }, u;
});