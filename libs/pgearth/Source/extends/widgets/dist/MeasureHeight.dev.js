"use strict";

define(["../../Core/Cartesian3", "../../Core/Cartographic", "../../Core/Color", "../../Core/defineProperties", "../../Core/Math", "../../Scene/BlendOption", "../../Scene/HorizontalOrigin", "../../Scene/LabelCollection", "../../Scene/LabelStyle", "../../Scene/PointPrimitiveCollection", "../../Scene/VerticalOrigin", "../../DataSources/CallbackProperty", "../../DataSources/PolylineGlowMaterialProperty", "../../DataSources/PolylineOutlineMaterialProperty", "./support/MeasureStatus", "./support/MeasureUnit", "./support/PickGlobe", "../../Core/ScreenSpaceEventHandler", "../../Core/ScreenSpaceEventType"], function (d, p, e, t, E, i, s, o, r, a, l, h, u, c, D, _, g, f, w) {
  "use strict";

  function n(t) {
    this.viewer = t, this.scene = t.scene, this._enable = !1, this.startDraw = !1, this._vertical = 0, this._horizon = 0, this._slantDistance = 0, this._measureUnit = _.METER, this.startPoint = new d(0, 0, 0), this.endPoint = new d(0, 0, 0), this.eMeasureStatus = D.M_NONE, this._pointCollection = new a({
      blendOption: i.TRANSLUCENT
    }), this._labelCollection = new o({
      blendOption: i.TRANSLUCENT,
      depthMask: !1
    }), this.startEllipsoid = this._pointCollection.add({
      name: "",
      position: this.startPoint,
      pixelSize: 5,
      color: e.RED,
      disableDepthTestDistance: 1e4
    }), this.endEllipsoid = this._pointCollection.add({
      name: "",
      position: this.endPoint,
      pixelSize: 5,
      color: e.RED,
      disableDepthTestDistance: 1e4
    }), this.midEllipsoid = this._pointCollection.add({
      name: "",
      position: d.ZERO,
      pixelSize: 5,
      color: e.RED,
      disableDepthTestDistance: 1e4
    }), this.entity1 = this._labelCollection.add({
      show: !0,
      showBackground: !0,
      font: "36px KaiTi",
      fillColor: e.WHITE,
      outlineColor: e.BACK,
      outlineWidth: 5,
      style: r.FILL_AND_OUTLINE,
      horizontalOrigin: s.CENTER,
      verticalOrigin: l.BASELINE,
      disableDepthTestDistance: 1e4,
      scale: .5
    }), this.entity2 = this._labelCollection.add({
      show: !0,
      showBackground: !0,
      font: "36px KaiTi",
      fillColor: e.WHITE,
      outlineColor: e.BACK,
      outlineWidth: 5,
      style: r.FILL_AND_OUTLINE,
      horizontalOrigin: s.CENTER,
      verticalOrigin: l.BASELINE,
      disableDepthTestDistance: 1e4,
      scale: .5
    }), this.entity3 = this._labelCollection.add({
      show: !0,
      showBackground: !0,
      font: "36px KaiTi",
      fillColor: e.WHITE,
      outlineColor: e.BACK,
      outlineWidth: 5,
      style: r.FILL_AND_OUTLINE,
      horizontalOrigin: s.CENTER,
      verticalOrigin: l.BASELINE,
      disableDepthTestDistance: 1e4,
      scale: .5
    });
    var n = this;
    this.triangleLine = t.entities.add({
      name: "",
      polyline: {
        positions: new h(function () {
          var t,
              e,
              i,
              s,
              o = [];
          return n.eMeasureStatus != D.M_END && n.eMeasureStatus != D.M_MEASUREING || (t = p.fromCartesian(n.startPoint), e = p.fromCartesian(n.endPoint), null != t && null != e && (e.height > t.height ? (i = E.toDegrees(t.longitude), s = E.toDegrees(t.latitude), o.push(n.startPoint, d.fromDegrees(i, s, e.height), n.endPoint, n.startPoint)) : (i = E.toDegrees(e.longitude), s = E.toDegrees(e.latitude), o.push(n.startPoint, d.fromDegrees(i, s, t.height), n.endPoint, n.startPoint)))), o;
        }, !1),
        followSurface: !1,
        width: 3,
        material: new u({
          glowPower: .5,
          color: e.YELLOW
        }),
        depthFailMaterial: new c({
          color: e.RED,
          outlineWidth: 2,
          outlineColor: e.BLACK
        })
      }
    }), this.scene.primitives.add(this), this.pickGlobe = new g(this.viewer), this.clickDraw = new f(this.scene.canvas), this.clickDraw.setInputAction(function (t) {
      n._enable = !0, n.addPoint3D(t);
    }, w.LEFT_CLICK), this.moveDraw = new f(this.scene.canvas), this.moveDraw.setInputAction(function (t) {
      n.addPointTemp(t);
    }, w.MOUSE_MOVE);
  }

  function C(t) {
    var e = p.fromCartesian(t.endPoint),
        i = E.toDegrees(e.longitude),
        s = E.toDegrees(e.latitude),
        o = e.height,
        n = p.fromCartesian(t.startPoint),
        r = E.toDegrees(n.longitude),
        a = E.toDegrees(n.latitude),
        l = n.height,
        h = d.distance(t.startPoint, d.fromDegrees(r, a, o)),
        u = d.distance(t.endPoint, d.fromDegrees(r, a, o)),
        c = d.distance(t.startPoint, t.endPoint);
    l < o ? (t.entity1.position = d.fromDegrees(r, a, (l + o) / 2), t.entity2.position = d.fromDegrees((r + i) / 2, (a + s) / 2, o)) : (t.entity1.position = d.fromDegrees(i, s, (l + o) / 2), t.entity2.position = d.fromDegrees((r + i) / 2, (a + s) / 2, l)), t._vertical = h.toFixed(2), t.entity1.show = !0, 2 == t._measureUnit ? t.entity1.text = h.toFixed(2) + "米" : 3 == t._measureUnit && (t.entity1.text = (h / 1e3).toFixed(2) + "千米"), t.entity2.show = !0, t._horizon = u.toFixed(2), 2 == t._measureUnit ? t.entity2.text = u.toFixed(2) + "米" : 3 == t._measureUnit && (t.entity2.text = (u / 1e3).toFixed(2) + "千米"), t.entity3.position = d.fromDegrees((r + i) / 2, (a + s) / 2, (o + l) / 2), t.entity3.show = !0, t._slantDistance = c.toFixed(2), 2 == t._measureUnit ? t.entity3.text = c.toFixed(2) + "米" : 3 == t._measureUnit && (t.entity3.text = (c / 1e3).toFixed(2) + "千米");
  }

  return t(n.prototype, {
    enable: {
      get: function get() {
        return this._enable;
      },
      set: function set(t) {
        this._enable !== t && (this._enable = t);
      }
    },
    vertical: {
      get: function get() {
        return this._vertical;
      }
    },
    horizon: {
      get: function get() {
        return this._horizon;
      }
    },
    slantDistance: {
      get: function get() {
        return this._slantDistance;
      }
    },
    unit: {
      get: function get() {
        return this._measureUnit;
      },
      set: function set(t) {
        switch (t) {
          case 2:
            this._measureUnit = _.METER;
            break;

          case 3:
            this._measureUnit = _.KILOMETER;
            break;

          default:
            this._measureUnit = _.METER;
        }
      }
    }
  }), n.prototype.addPoint3D = function (t) {
    if (this._enable && this.eMeasureStatus != D.M_END) {
      if (this.eMeasureStatus == D.M_NONE) {
        this.eMeasureStatus = D.M_BEGIN;
        var e = this.pickGlobe.pickGlobe(t.position);
        if (null == e) return;
        this.startPoint = this.startEllipsoid.position = e;
      }

      this.eMeasureStatus == D.M_MEASUREING && (this.eMeasureStatus = D.M_END), this.eMeasureStatus == D.M_END && (C(this), this._enable = !1);
    }
  }, n.prototype.addPointTemp = function (t) {
    if (this._enable && (this.eMeasureStatus == D.M_BEGIN && (this.endEllipsoid.show = !0, this.startEllipsoid.show = !0, this.midEllipsoid.show = !0, this.entity1.show = !0, this.entity2.show = !0, this.entity3.show = !0, this.triangleLine.show = !0, this.eMeasureStatus = D.M_MEASUREING), this.eMeasureStatus == D.M_MEASUREING)) {
      var e = this.pickGlobe.pickGlobe(t.endPosition);
      if (null == e) return;
      this.endPoint = this.endEllipsoid.position = e, this.midEllipsoid.position = function (t) {
        if (t.eMeasureStatus == D.M_END || t.eMeasureStatus == D.M_MEASUREING) {
          var e = p.fromCartesian(t.startPoint),
              i = p.fromCartesian(t.endPoint);

          if (null != e && null != i) {
            if (i.height > e.height) {
              var s = E.toDegrees(e.longitude),
                  o = E.toDegrees(e.latitude);
              return d.fromDegrees(s, o, i.height);
            }

            s = E.toDegrees(i.longitude), o = E.toDegrees(i.latitude);
            return d.fromDegrees(s, o, e.height);
          }
        }
      }(this), this.eMeasureStatus = D.M_MEASUREING, C(this);
    }
  }, n.prototype.clear = function () {
    this._enable = !1, this.endEllipsoid.show = !1, this.startEllipsoid.show = !1, this.midEllipsoid.show = !1, this.entity1.show = !1, this.entity2.show = !1, this.entity3.show = !1, this.triangleLine.show = !1, this.eMeasureStatus = D.M_NONE, this.clickDraw && !this.clickDraw.isDestroyed() && this.clickDraw.destroy(), this.moveDraw && !this.moveDraw.isDestroyed() && this.moveDraw.destroy();
  }, n.prototype.update = function (t) {
    this._pointCollection.update(t), this._labelCollection.update(t);
  }, n.prototype._destroy = function () {
    this._pointCollection = this._pointCollection.destroy(), this._labelCollection = this._labelCollection.destroy();
  }, n;
});