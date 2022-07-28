"use strict";

define(["../../Core/Color", "../../Scene/LabelStyle", "../../Scene/HorizontalOrigin", "../../Scene/VerticalOrigin", "../../Core/ScreenSpaceEventHandler", "../../Core/ScreenSpaceEventType", "../../Scene/PointPrimitiveCollection", "../../Scene/BlendOption", "../../Core/Math", "../../Core/GeometryInstance", "../../Core/GroundPolylineGeometry", "../../Core/EllipseGeometry", "../../Core/Cartesian3", "../../Core/ColorGeometryInstanceAttribute", "../../Scene/GroundPrimitive", "../../Scene/GroundPolylinePrimitive", "../../Scene/PolylineColorAppearance", "../../Core/DistanceDisplayConditionGeometryInstanceAttribute", "./support/PickGlobe", "../../Scene/HeightReference"], function (p, w, d, v, t, i, e, o, m, u, D, b, g, C, L, y, n, s, l, E) {
  function r(e) {
    this.viewer = e, this.scene = this.viewer.scene, this.path = [], this.lines = [], this.label = [], this.pickGlobe = new l(e), this.pixelPoints = [], this.lastPoint = null, this.totalLength = 0, this.tempLine = null, this.tempLabel = null, this.point = this.viewer.entities.add({
      point: {
        color: p.RED,
        pixelSize: 10
      }
    }), this.labelTotle = this.viewer.entities.add({
      label: {
        show: !1,
        showBackground: !0,
        font: "36px Helvetica",
        fillColor: p.WHITE,
        outlineColor: p.BLACK,
        outlineWidth: 1,
        style: w.FILL_AND_OUTLINE,
        horizontalOrigin: d.CENTER,
        verticalOrigin: v.BASELINE,
        disableDepthTestDistance: 1e4,
        scale: .5
      }
    });
    var h = this;
    this.clickDraw = new t(this.scene.canvas), this.clickDraw.setInputAction(function (e) {
      var t = h.pickGlobe.pickGlobe(e.position);
      h.lastPoint = t;
      var i,
          o,
          n,
          s,
          l,
          r = h.scene.globe.ellipsoid.cartesianToCartographic(t),
          a = h.path,
          c = (r && r.longitude && m.toDegrees(r.longitude), r && r.latitude && m.toDegrees(r.latitude), 0);
      (r && r.height ? r.height : null) < -50 || (h.tempLabel && h.viewer.entities.remove(h.tempLabel), a.push(t), i = a.length, o = h.scene.primitives.add(new L(new u({
        geometry: new b({
          center: t,
          semiMinorAxis: 5,
          semiMajorAxis: 5
        }),
        attributes: {
          color: new C.fromColor(p.RED.withAlpha(.8))
        }
      }))), h.pixelPoints.push(o), 1 < i && (n = h.scene.groundPrimitives.add(new y({
        geometryInstances: new u({
          geometry: new D({
            positions: [a[i - 1], a[i - 2]],
            width: 4
          }),
          attributes: {
            color: C.fromColor(p.RED.withAlpha(.7))
          }
        })
      })), h.lines.push(n), c = g.distance(a[i - 1], a[i - 2]), h.totalLength = h.totalLength + +c.toFixed(2), h.labelTotle.position = a[0], h.labelTotle.show = !0, h.labelTotle.label.show = !0, h.labelTotle.label.text = "总长:" + h.totalLength.toFixed(2) + "米", (s = new g(0, 0, 0)).x = (a[i - 1].x + a[i - 2].x) / 2, s.y = (a[i - 1].y + a[i - 2].y) / 2, s.z = (a[i - 1].z + a[i - 2].z) / 2, l = h.viewer.entities.add({
        show: !0,
        position: s,
        label: {
          show: !0,
          text: c.toFixed(2) + "米",
          showBackground: !0,
          font: "36px Helvetica",
          fillColor: p.WHITE,
          outlineColor: p.BLACK,
          outlineWidth: 1,
          style: w.FILL_AND_OUTLINE,
          horizontalOrigin: d.CENTER,
          verticalOrigin: v.BASELINE,
          disableDepthTestDistance: 1e4,
          scale: .5,
          heightReference: E.CLAMP_TO_GROUND,
          eyeOffset: new g(0, 3, 0)
        }
      }), h.label.push(l)), h.viewer.scene.requestRenderMode = !1);
    }, i.LEFT_CLICK), this.moveDraw = new t(this.scene.canvas), this.moveDraw.setInputAction(function (e) {
      var t,
          i,
          o = h.pickGlobe.pickGlobe(e.endPosition);
      o && h.lastPoint && (h.tempLine && h.scene.groundPrimitives.remove(h.tempLine), h.tempLabel && h.viewer.entities.remove(h.tempLabel), h.tempLine = h.scene.groundPrimitives.add(new y({
        geometryInstances: new u({
          geometry: new D({
            positions: [o, h.lastPoint],
            width: 4
          }),
          attributes: {
            color: C.fromColor(p.RED.withAlpha(.7))
          }
        })
      })), t = {
        x: (o.x + h.lastPoint.x) / 2,
        y: (o.y + h.lastPoint.y) / 2,
        z: (o.z + h.lastPoint.z) / 2
      }, i = g.distance(o, h.lastPoint), h.tempLabel = h.viewer.entities.add({
        show: !0,
        position: t,
        label: {
          show: !0,
          text: i.toFixed(2) + "米",
          showBackground: !0,
          font: "36px Helvetica",
          fillColor: p.WHITE,
          outlineColor: p.BLACK,
          outlineWidth: 1,
          style: w.FILL_AND_OUTLINE,
          horizontalOrigin: d.CENTER,
          verticalOrigin: v.BASELINE,
          disableDepthTestDistance: 1e4,
          scale: .5,
          heightReference: E.CLAMP_TO_GROUND,
          eyeOffset: new g(0, 3, 0)
        }
      }), h.labelTotle.label.text = "总长:" + (+h.totalLength + +i.toFixed(2)).toFixed(2) + "米"), h.point && (h.point.position = o);
    }, i.MOUSE_MOVE), this.stopDraw = new t(this.scene.canvas), this.stopDraw.setInputAction(function (e) {
      h.clickDraw && !h.clickDraw.isDestroyed() && h.clickDraw.destroy(), h.moveDraw && !h.moveDraw.isDestroyed() && h.moveDraw.destroy();
    }, i.RIGHT_CLICK);
  }

  return r.prototype.clear = function () {
    var t = this;
    this.viewer.entities.remove(this.labelTotle), this.viewer.entities.remove(this.point), this.scene.groundPrimitives.remove(this.tempLine), this.viewer.entities.remove(this.tempLabel), this.label.forEach(function (e) {
      t.viewer.entities.remove(e);
    }), this.lines.forEach(function (e) {
      t.scene.groundPrimitives.remove(e);
    }), this.clickDraw && !this.clickDraw.isDestroyed() && this.clickDraw.destroy(), this.moveDraw && !this.moveDraw.isDestroyed() && this.moveDraw.destroy(), this.point = null, this.path = [], this.lines = [];
  }, r;
});