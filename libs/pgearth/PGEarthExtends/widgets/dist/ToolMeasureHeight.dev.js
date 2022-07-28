"use strict";

define(["../../Source/Core/BoundingSphere", "../../Source/Core/Cartesian2", "../../Source/Core/Cartesian3", "../../Source/Core/Cartographic", "../../Source/Core/Color", "../../Source/Core/ComponentDatatype", "../../Source/Core/defineProperties", "../../Source/Core/Geometry", "../../Source/Core/GeometryInstance", "../../Source/Core/Math", "../../Source/Core/PrimitiveType", "../../Source/Scene/Appearance", "../../Source/Scene/BlendingState", "../../Source/Scene/HorizontalOrigin", "../../Source/Scene/LabelStyle", "../../Source/Core/ScreenSpaceEventHandler", "../../Source/Core/ScreenSpaceEventType", "../../Source/Scene/Primitive", "../../Source/Scene/VerticalOrigin", "../../Source/DataSources/CallbackProperty", "../../Source/DataSources/PolylineGlowMaterialProperty", "../../Source/DataSources/PolylineOutlineMaterialProperty"], function (e, t, i, o, s, n, r, a, l, h, c, u, d, p, g, D, S, y, f, v, w, E) {
  "use strict";

  function m(e) {
    var t = e.viewer;
    this.viewer = t, this.scene = t.scene, this._enable = !1, this.enable = !0, this.startDraw = !1, this.startPoint = new i(0, 0, 0), this.endPoint = new i(0, 0, 0), this.eMeasureStatus = !1;
    var n = this;
    m.prototype.getStartPoint3D = function () {
      return n.startPoint;
    }, m.prototype.getEndPoint3D = function () {
      return n.endPoint;
    }, m.prototype.getMidPoint3D = function () {
      if (3 == n.eMeasureStatus || 2 == n.eMeasureStatus) {
        var e = o.fromCartesian(n.startPoint),
            t = o.fromCartesian(n.endPoint);

        if (void 0 != e && void 0 != t) {
          if (t.height > e.height) {
            var s = h.toDegrees(e.longitude),
                r = h.toDegrees(e.latitude);
            return i.fromDegrees(s, r, t.height);
          }

          s = h.toDegrees(t.longitude), r = h.toDegrees(t.latitude);
          return i.fromDegrees(s, r, e.height);
        }
      }
    }, m.prototype.getPoint3D = function () {
      var e = [];

      if (3 == n.eMeasureStatus || 2 == n.eMeasureStatus) {
        var t = o.fromCartesian(n.startPoint),
            s = o.fromCartesian(n.endPoint);
        if (void 0 != t && void 0 != s) if (s.height > t.height) {
          var r = h.toDegrees(t.longitude),
              a = h.toDegrees(t.latitude);
          e.push(n.startPoint, i.fromDegrees(r, a, s.height), n.endPoint, n.startPoint);
        } else {
          r = h.toDegrees(s.longitude), a = h.toDegrees(s.latitude);
          e.push(n.startPoint, i.fromDegrees(r, a, t.height), n.endPoint, n.startPoint);
        }
      }

      return e;
    }, this.startEllipsoid = t.entities.add({
      name: "",
      position: new v(this.getStartPoint3D, !1),
      point: {
        pixelSize: 5,
        color: s.RED,
        disableDepthTestDistance: 1e4
      }
    }), this.endEllipsoid = t.entities.add({
      name: "",
      position: new v(this.getEndPoint3D, !1),
      point: {
        pixelSize: 5,
        color: s.RED,
        disableDepthTestDistance: 1e4
      }
    }), this.midEllipsoid = t.entities.add({
      name: "",
      position: new v(this.getMidPoint3D, !1),
      point: {
        pixelSize: 5,
        color: s.RED,
        disableDepthTestDistance: 1e4
      }
    }), this.triangleLine = t.entities.add({
      name: "",
      polyline: {
        positions: new v(this.getPoint3D, !1),
        followSurface: !1,
        width: 3,
        material: new w({
          glowPower: .5,
          color: s.YELLOW
        }),
        depthFailMaterial: new E({
          color: s.RED,
          outlineWidth: 2,
          outlineColor: s.BLACK
        })
      }
    }), this.entity00 = t.entities.add({
      label: {
        show: !0,
        showBackground: !0,
        font: "30px Helvetica",
        fillColor: s.WHITE,
        outlineColor: s.BACK,
        outlineWidth: 5,
        style: g.FILL_AND_OUTLINE,
        horizontalOrigin: p.CENTER,
        verticalOrigin: f.BASELINE,
        disableDepthTestDistance: 1e4,
        scale: .5
      }
    }), this.entity0 = t.entities.add({
      label: {
        show: !0,
        showBackground: !0,
        font: "30px Helvetica",
        fillColor: s.WHITE,
        outlineColor: s.BACK,
        outlineWidth: 5,
        style: g.FILL_AND_OUTLINE,
        horizontalOrigin: p.CENTER,
        verticalOrigin: f.BASELINE,
        disableDepthTestDistance: 1e4,
        scale: .5
      }
    }), this.entity1 = t.entities.add({
      label: {
        show: !0,
        showBackground: !0,
        font: "30px Helvetica",
        fillColor: s.WHITE,
        outlineColor: s.BACK,
        outlineWidth: 5,
        style: g.FILL_AND_OUTLINE,
        horizontalOrigin: p.CENTER,
        verticalOrigin: f.BASELINE,
        disableDepthTestDistance: 1e4,
        scale: .5
      }
    }), this.entity2 = t.entities.add({
      label: {
        show: !0,
        showBackground: !0,
        font: "30px Helvetica",
        fillColor: s.WHITE,
        outlineColor: s.BACK,
        outlineWidth: 5,
        style: g.FILL_AND_OUTLINE,
        horizontalOrigin: p.CENTER,
        verticalOrigin: f.BASELINE,
        disableDepthTestDistance: 1e4,
        scale: .5
      }
    }), this.entity3 = t.entities.add({
      label: {
        show: !0,
        showBackground: !0,
        font: "30px Helvetica",
        fillColor: s.WHITE,
        outlineColor: s.BACK,
        outlineWidth: 5,
        style: g.FILL_AND_OUTLINE,
        horizontalOrigin: p.CENTER,
        verticalOrigin: f.BASELINE,
        disableDepthTestDistance: 1e4,
        scale: .5
      }
    });
    var r = this.handler = new D(this.scene.canvas),
        a = void 0;
    r.setInputAction(function (e) {
      a = e.position;
    }, S.LEFT_DOWN), r.setInputAction(function (e) {
      var t = Math.abs(a.x - e.position.x),
          i = Math.abs(a.y - e.position.y);
      t > 3 || i > 3 ? a = void 0 : n.addPoint3D(e);
    }, S.LEFT_UP), r.setInputAction(function (e) {
      n && n.enable && n.addPointTemp(e);
    }, S.MOUSE_MOVE);
  }

  return r(m.prototype, {
    enable: {
      get: function get() {
        return this._enable;
      },
      set: function set(e) {
        this._enable !== e && (this._enable = e);
      }
    }
  }), m.prototype.addPoint3D = function (e) {
    if (console.log(e), this._enable && 3 != this.eMeasureStatus) {
      if (0 == this.eMeasureStatus) {
        this.eMeasureStatus = 1;
        var t = null;
        if (this.scene.pick(e.position)) t = this.scene.pickPosition(e.position);else {
          var i = this.scene.camera.getPickRay(e.position);
          t = this.scene.globe.pick(i, viewer.scene);
        }
        if (void 0 == t) return;
        this.startPoint = t;
      }

      2 == this.eMeasureStatus && (this.eMeasureStatus = 3), 3 == this.eMeasureStatus && (this.computeDistance(), this._enable = !1);
    }
  }, m.prototype.addPointTemp = function (e) {
    if (this._enable && (1 == this.eMeasureStatus && (this.endEllipsoid.show = !0, this.startEllipsoid.show = !0, this.midEllipsoid.show = !0, this.entity1.show = !0, this.entity2.show = !0, this.entity3.show = !0, this.triangleLine.show = !0, this.eMeasureStatus = 2), 2 == this.eMeasureStatus)) {
      var t = null;
      if (this.scene.pick(e.endPosition)) t = this.scene.pickPosition(e.endPosition);else {
        var i = this.scene.camera.getPickRay(e.endPosition);
        t = this.scene.globe.pick(i, viewer.scene);
      }
      if (void 0 == t) return;
      void 0 != t && (this.endPoint = t), this.eMeasureStatus = 2, this.computeDistance();
    }
  }, m.prototype.computeDistance = function () {
    var e = o.fromCartesian(this.endPoint),
        t = h.toDegrees(e.longitude),
        s = h.toDegrees(e.latitude),
        n = e.height,
        r = o.fromCartesian(this.startPoint),
        a = h.toDegrees(r.longitude),
        l = h.toDegrees(r.latitude),
        c = r.height,
        u = i.distance(this.startPoint, i.fromDegrees(a, l, n)),
        d = i.distance(this.endPoint, i.fromDegrees(a, l, n)),
        p = i.distance(this.startPoint, this.endPoint),
        g = 180 * Math.asin(d / p) / Math.PI;
    n > c ? (this.entity00.position = i.fromDegrees(t, s, n), this.entity0.position = i.fromDegrees(a, l, c), this.entity1.position = i.fromDegrees(a, l, (c + n) / 2), this.entity2.position = i.fromDegrees((a + t) / 2, (l + s) / 2, n)) : (this.entity1.position = i.fromDegrees(t, s, (c + n) / 2), this.entity2.position = i.fromDegrees((a + t) / 2, (l + s) / 2, c)), this.entity00.label.show = !0, this.entity00.label.text = (90 - g).toFixed(2) + " °", this.entity0.label.show = !0, this.entity0.label.text = g.toFixed(2) + " °", this.entity1.label.show = !0, this.entity1.label.text = u.toFixed(2) + " m", this.entity2.label.show = !0, this.entity2.label.text = d.toFixed(2) + " m", this.entity3.position = i.fromDegrees((a + t) / 2, (l + s) / 2, (n + c) / 2), this.entity3.label.show = !0, this.entity3.label.text = p.toFixed(2) + " m";
  }, m.prototype.destroy = function () {
    this._enable = !1, this.endEllipsoid.show = !1, this.startEllipsoid.show = !1, this.midEllipsoid.show = !1, this.entity1.show = !1, this.entity2.show = !1, this.entity3.show = !1, this.triangleLine.show = !1, this.eMeasureStatus = 0, this.viewer.entities.remove(this.endEllipsoid), this.viewer.entities.remove(this.startEllipsoid), this.viewer.entities.remove(this.midEllipsoid), this.viewer.entities.remove(this.entity00), this.viewer.entities.remove(this.entity0), this.viewer.entities.remove(this.entity1), this.viewer.entities.remove(this.entity2), this.viewer.entities.remove(this.entity3), this.viewer.entities.remove(this.triangleLine);
  }, m;
});