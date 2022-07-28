"use strict";

define(["../../Source/Core/ColorGeometryInstanceAttribute", "../../Source/Core/Color", "../../Source/Scene/PerInstanceColorAppearance", "../../Source/Scene/ClassificationType", "../../Source/Core/ScreenSpaceEventHandler", "../../Source/Core/GeometryInstance", "../../Source/Core/ScreenSpaceEventType", "../../Source/Core/Cartesian3", "../../Source/Core/PolygonHierarchy", "../../Source/Scene/GroundPrimitive", "../../Source/Core/PolygonGeometry", "../../Source/Core/VertexFormat", "../../Source/Core/CircleGeometry", "../../Source/Core/CorridorGeometry", "../../Source/Core/Math", "../../Source/Core/Cartographic", "../../Source/Core/defined"], function (e, t, i, o, r, n, s, c, a, h, l, u, m, d, p, g, y) {
  return {
    startModel: function startModel(e, t) {
      this.camera = e.camera, this.scene = e.scene, this.ellipsoid = this.scene.globe.ellipsoid, this.geoId = Date.now(), this.handler = null, this.keyPoints = [], this.primiGeo = null, this.EventDriv("left_click", this.positionPick), this.HeightLightHandler && this.HeightLightHandler.removeInputAction(s.LEFT_CLICK), this.removeHeightLightEvent();
    },
    endGeometry: function endGeometry() {
      var e = this.handler;
      e && e.destroy(), this.handler = null;
    },
    setColorAndAlpha: function setColorAndAlpha(i) {
      var o = this.primiGeo;
      o && (o.getGeometryInstanceAttributes(this.geoId).color = e.toValue(t.fromCssColorString(i.color).withAlpha(i.alpha)));
    },
    setGeoAttr: function setGeoAttr(e, t, i) {
      if (console.log(!this.primiGeo), this.primiGeo) {
        var o = this.handler;
        o && o.destroy() && (this.handler = null), e && this.primiGeo && (this.primiGeo.getGeometryInstanceAttributes(this.geoId).geoAttr = e);
        var r = this.primiGeo.getGeometryInstanceAttributes(this.geoId).color;
        r[3] = 1, this.primiGeo.getGeometryInstanceAttributes(this.geoId).color = r, this.addHeightLightEvent(), e.keyPoints = this.keyPoints, t(e, this.primiGeo);
      } else i();
    },
    cancleModel: function cancleModel() {
      this.handler.removeInputAction(s.LEFT_CLICK), this.primiGeo.destroy(), this.keyPoints = [];
    },
    EventDriv: function EventDriv(e, t) {
      var i = this;
      (this.handler = new r(this.scene.canvas)).setInputAction(function (e) {
        t.call(i, e);
      }, s[e.toUpperCase()]);
    },
    positionPick: function positionPick(e) {
      if (this.scene.pickPositionSupported) {
        var t = this.scene.pickPosition(e.position);

        if (y(t)) {
          var i = g.fromCartesian(t),
              o = p.toDegrees(i.longitude),
              r = p.toDegrees(i.latitude);
          this.keyPoints.push(o, r), this.pointsCountChange();
        }
      }
    },
    pointsCountChange: function pointsCountChange() {
      switch (this.keyPoints.length) {
        case 2:
          this.primiGeo = this.scene.primitives.add(new h({
            geometryInstances: new n({
              geometry: new m({
                center: c.fromDegrees(this.keyPoints[0], this.keyPoints[1]),
                radius: 1
              }),
              attributes: {
                color: e.fromColor(new t(1, 0, 0, .8))
              },
              id: this.geoId
            }),
            appearance: new i({
              translucent: !1,
              closed: !0
            }),
            classificationType: o.PGEARTH_3D_TILE
          }));
          break;

        case 4:
          this.primiGeo.destroy(), this.primiGeo = this.scene.primitives.add(new h({
            geometryInstances: new n({
              geometry: new d({
                vertexFormat: u.POSITION_ONLY,
                positions: c.fromDegreesArray(this.keyPoints),
                width: 1
              }),
              attributes: {
                color: e.fromColor(new t(1, 0, 0, .8))
              },
              id: this.geoId
            }),
            appearance: new i({
              translucent: !1,
              closed: !0
            }),
            classificationType: o.PGEARTH_3D_TILE
          }));
          break;

        default:
          this.primiGeo.destroy(), this.primiGeo = this.scene.primitives.add(new h({
            geometryInstances: new n({
              geometry: new l({
                polygonHierarchy: new a(c.fromDegreesArray(this.keyPoints))
              }),
              attributes: {
                color: e.fromColor(new t(1, 0, 0, .8))
              },
              id: this.geoId
            }),
            appearance: new i({
              translucent: !1,
              closed: !0
            }),
            classificationType: o.PGEARTH_3D_TILE
          }));
      }
    },
    showGeometry: function showGeometry(e, t) {
      this.camera = e.camera, this.scene = e.scene, this.ellipsoid = this.scene.globe.ellipsoid, this.geoId = Date.now(), this.handler = null, this.keyPoints = [], this.primiGeo = null;
      var i = this.HeightLightHandler = new r(e.scene.canvas);
      this.addHeightLightEvent(), i.setInputAction(function (i) {
        var o = e.scene.pick(i.position);

        if (o) {
          if (o.id) var r = o.primitive.getGeometryInstanceAttributes(o.id).geoAttr;else r = o;
          t(r);
        }
      }, s.LEFT_CLICK);
    },
    addHeightLightEvent: function addHeightLightEvent() {
      var e = this;
      e.HeightLightHandler && e.HeightLightHandler.setInputAction(function (t) {
        e.enterHeightLight.call(e, t);
      }, s.MOUSE_MOVE);
    },
    removeHeightLightEvent: function removeHeightLightEvent() {
      this.HeightLightHandler && this.HeightLightHandler.removeInputAction(s.MOUSE_MOVE);
    },
    enterHeightLight: function enterHeightLight(e) {
      var t = this.scene.pick(e.endPosition);

      if (t && t.id) {
        if (this.actionGeometry == t) return;

        if (this.pickedFeature) {
          var i = this.pickedFeature.primitive.getGeometryInstanceAttributes(this.pickedFeature.id).color;
          i[3] = 1, this.pickedFeature.primitive.getGeometryInstanceAttributes(this.pickedFeature.id).color = i;
        }

        if (this.actionGeometry = t, !t.primitive.getGeometryInstanceAttributes) return;
        var _e = t.primitive.getGeometryInstanceAttributes(t.id).geoAttr,
            _o = t.primitive.getGeometryInstanceAttributes(t.id).color;
        _e && _e.alpha && (_o[3] = 225 * _e.alpha) || (_o[3] = 180), t.primitive.getGeometryInstanceAttributes(t.id).color = _o;
      } else {
        if (!this.actionGeometry || !this.actionGeometry.primitive.getGeometryInstanceAttributes) return;
        var _e2 = this.actionGeometry.primitive.getGeometryInstanceAttributes(this.actionGeometry.id).color;
        _e2[3] = 1, this.actionGeometry.primitive.getGeometryInstanceAttributes(this.actionGeometry.id).color = _e2, this.actionGeometry = null;
      }
    }
  };
});