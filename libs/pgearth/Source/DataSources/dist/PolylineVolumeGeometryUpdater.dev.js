"use strict";

define(["../Core/Check", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/defined", "../Core/DeveloperError", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/GeometryInstance", "../Core/Iso8601", "../Core/PolylineVolumeGeometry", "../Core/PolylineVolumeOutlineGeometry", "../Core/ShowGeometryInstanceAttribute", "../Scene/MaterialAppearance", "../Scene/PerInstanceColorAppearance", "./ColorMaterialProperty", "./DynamicGeometryUpdater", "./GeometryUpdater", "./Property"], function (l, p, y, c, u, d, h, s, m, r, C, a, _, f, n, o, g) {
  "use strict";

  var P = new p();

  function i(e) {
    this.id = e, this.vertexFormat = void 0, this.polylinePositions = void 0, this.shapePositions = void 0, this.cornerType = void 0, this.granularity = void 0;
  }

  function e(e, t) {
    o.call(this, {
      entity: e,
      scene: t,
      geometryOptions: new i(e),
      geometryPropertyName: "polylineVolume",
      observedPropertyNames: ["availability", "polylineVolume"]
    }), this._onEntityPropertyChanged(e, "polylineVolume", e.polylineVolume, void 0);
  }

  function t(e, t, o) {
    n.call(this, e, t, o);
  }

  return c(Object.create) && ((e.prototype = Object.create(o.prototype)).constructor = e), e.prototype.createFillGeometryInstance = function (e) {
    if (l.defined("time", e), !this._fillEnabled) throw new u("This instance does not represent a filled geometry.");

    var t,
        o = this._entity,
        i = o.isAvailable(e),
        n = new C(i && o.isShowing && this._showProperty.getValue(e) && this._fillProperty.getValue(e)),
        r = this._distanceDisplayConditionProperty.getValue(e),
        s = d.fromDistanceDisplayCondition(r),
        a = this._materialProperty instanceof f ? (c(this._materialProperty.color) && (this._materialProperty.color.isConstant || i) && (t = this._materialProperty.color.getValue(e, P)), c(t) || (t = p.WHITE), {
      show: n,
      distanceDisplayCondition: s,
      color: y.fromColor(t)
    }) : {
      show: n,
      distanceDisplayCondition: s
    };

    return new h({
      id: o,
      geometry: new m(this._options),
      attributes: a
    });
  }, e.prototype.createOutlineGeometryInstance = function (e) {
    if (l.defined("time", e), !this._outlineEnabled) throw new u("This instance does not represent an outlined geometry.");

    var t = this._entity,
        o = t.isAvailable(e),
        i = g.getValueOrDefault(this._outlineColorProperty, e, p.BLACK, P),
        n = this._distanceDisplayConditionProperty.getValue(e);

    return new h({
      id: t,
      geometry: new r(this._options),
      attributes: {
        show: new C(o && t.isShowing && this._showProperty.getValue(e) && this._showOutlineProperty.getValue(e)),
        color: y.fromColor(i),
        distanceDisplayCondition: d.fromDistanceDisplayCondition(n)
      }
    });
  }, e.prototype._isHidden = function (e, t) {
    return !c(t.positions) || !c(t.shape) || o.prototype._isHidden.call(this, e, t);
  }, e.prototype._isDynamic = function (e, t) {
    return !(t.positions.isConstant && t.shape.isConstant && g.isConstant(t.granularity) && g.isConstant(t.outlineWidth) && g.isConstant(t.cornerType));
  }, e.prototype._setStaticOptions = function (e, t) {
    var o = t.granularity,
        i = t.cornerType,
        n = this._options,
        r = this._materialProperty instanceof f;
    n.vertexFormat = r ? _.VERTEX_FORMAT : a.MaterialSupport.TEXTURED.vertexFormat, n.polylinePositions = t.positions.getValue(s.MINIMUM_VALUE, n.polylinePositions), n.shapePositions = t.shape.getValue(s.MINIMUM_VALUE, n.shape), n.granularity = c(o) ? o.getValue(s.MINIMUM_VALUE) : void 0, n.cornerType = c(i) ? i.getValue(s.MINIMUM_VALUE) : void 0;
  }, e.DynamicGeometryUpdater = t, c(Object.create) && ((t.prototype = Object.create(n.prototype)).constructor = t), t.prototype._isHidden = function (e, t, o) {
    var i = this._options;
    return !c(i.polylinePositions) || !c(i.shapePositions) || n.prototype._isHidden.call(this, e, t, o);
  }, t.prototype._setOptions = function (e, t, o) {
    var i = this._options;
    i.polylinePositions = g.getValueOrUndefined(t.positions, o, i.polylinePositions), i.shapePositions = g.getValueOrUndefined(t.shape, o), i.granularity = g.getValueOrUndefined(t.granularity, o), i.cornerType = g.getValueOrUndefined(t.cornerType, o);
  }, e;
});