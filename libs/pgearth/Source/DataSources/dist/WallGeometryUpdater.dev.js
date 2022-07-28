"use strict";

define(["../Core/Check", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/defined", "../Core/DeveloperError", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/GeometryInstance", "../Core/Iso8601", "../Core/ShowGeometryInstanceAttribute", "../Core/WallGeometry", "../Core/WallOutlineGeometry", "../Scene/MaterialAppearance", "../Scene/PerInstanceColorAppearance", "./ColorMaterialProperty", "./DynamicGeometryUpdater", "./GeometryUpdater", "./Property"], function (l, m, p, u, y, c, h, a, d, g, r, C, _, f, o, i, s) {
  "use strict";

  var w = new m();

  function n(t) {
    this.id = t, this.vertexFormat = void 0, this.positions = void 0, this.minimumHeights = void 0, this.maximumHeights = void 0, this.granularity = void 0;
  }

  function t(t, e) {
    i.call(this, {
      entity: t,
      scene: e,
      geometryOptions: new n(t),
      geometryPropertyName: "wall",
      observedPropertyNames: ["availability", "wall"]
    }), this._onEntityPropertyChanged(t, "wall", t.wall, void 0);
  }

  function e(t, e, i) {
    o.call(this, t, e, i);
  }

  return u(Object.create) && ((t.prototype = Object.create(i.prototype)).constructor = t), t.prototype.createFillGeometryInstance = function (t) {
    if (l.defined("time", t), !this._fillEnabled) throw new y("This instance does not represent a filled geometry.");

    var e,
        i = this._entity,
        o = i.isAvailable(t),
        n = new d(o && i.isShowing && this._showProperty.getValue(t) && this._fillProperty.getValue(t)),
        r = this._distanceDisplayConditionProperty.getValue(t),
        s = c.fromDistanceDisplayCondition(r),
        a = this._materialProperty instanceof f ? (u(this._materialProperty.color) && (this._materialProperty.color.isConstant || o) && (e = this._materialProperty.color.getValue(t, w)), u(e) || (e = m.WHITE), {
      show: n,
      distanceDisplayCondition: s,
      color: p.fromColor(e)
    }) : {
      show: n,
      distanceDisplayCondition: s
    };

    return new h({
      id: i,
      geometry: new g(this._options),
      attributes: a
    });
  }, t.prototype.createOutlineGeometryInstance = function (t) {
    if (l.defined("time", t), !this._outlineEnabled) throw new y("This instance does not represent an outlined geometry.");

    var e = this._entity,
        i = e.isAvailable(t),
        o = s.getValueOrDefault(this._outlineColorProperty, t, m.BLACK, w),
        n = this._distanceDisplayConditionProperty.getValue(t);

    return new h({
      id: e,
      geometry: new r(this._options),
      attributes: {
        show: new d(i && e.isShowing && this._showProperty.getValue(t) && this._showOutlineProperty.getValue(t)),
        color: p.fromColor(o),
        distanceDisplayCondition: c.fromDistanceDisplayCondition(n)
      }
    });
  }, t.prototype._isHidden = function (t, e) {
    return !u(e.positions) || i.prototype._isHidden.call(this, t, e);
  }, t.prototype._getIsClosed = function (t) {
    return !1;
  }, t.prototype._isDynamic = function (t, e) {
    return !(e.positions.isConstant && s.isConstant(e.minimumHeights) && s.isConstant(e.maximumHeights) && s.isConstant(e.outlineWidth) && s.isConstant(e.granularity));
  }, t.prototype._setStaticOptions = function (t, e) {
    var i = e.minimumHeights,
        o = e.maximumHeights,
        n = e.granularity,
        r = this._materialProperty instanceof f,
        s = this._options;
    s.vertexFormat = r ? _.VERTEX_FORMAT : C.MaterialSupport.TEXTURED.vertexFormat, s.positions = e.positions.getValue(a.MINIMUM_VALUE, s.positions), s.minimumHeights = u(i) ? i.getValue(a.MINIMUM_VALUE, s.minimumHeights) : void 0, s.maximumHeights = u(o) ? o.getValue(a.MINIMUM_VALUE, s.maximumHeights) : void 0, s.granularity = u(n) ? n.getValue(a.MINIMUM_VALUE) : void 0;
  }, t.DynamicGeometryUpdater = e, u(Object.create) && ((e.prototype = Object.create(o.prototype)).constructor = e), e.prototype._isHidden = function (t, e, i) {
    return !u(this._options.positions) || o.prototype._isHidden.call(this, t, e, i);
  }, e.prototype._setOptions = function (t, e, i) {
    var o = this._options;
    o.positions = s.getValueOrUndefined(e.positions, i, o.positions), o.minimumHeights = s.getValueOrUndefined(e.minimumHeights, i, o.minimumHeights), o.maximumHeights = s.getValueOrUndefined(e.maximumHeights, i, o.maximumHeights), o.granularity = s.getValueOrUndefined(e.granularity, i);
  }, t;
});