"use strict";

define(["../Core/ApproximateTerrainHeights", "../Core/Cartesian3", "../Core/Check", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/CorridorGeometry", "../Core/CorridorOutlineGeometry", "../Core/defined", "../Core/DeveloperError", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/GeometryInstance", "../Core/GeometryOffsetAttribute", "../Core/Iso8601", "../Core/OffsetGeometryInstanceAttribute", "../Core/Rectangle", "../Core/ShowGeometryInstanceAttribute", "../Scene/GroundPrimitive", "../Scene/HeightReference", "../Scene/MaterialAppearance", "../Scene/PerInstanceColorAppearance", "./ColorMaterialProperty", "./DynamicGeometryUpdater", "./GeometryUpdater", "./GroundGeometryUpdater", "./Property"], function (d, r, n, s, a, l, u, h, p, c, y, e, f, g, t, m, i, C, _, O, V, o, M, U, w) {
  "use strict";

  var v = new s(),
      A = r.ZERO,
      I = new r(),
      b = new t();

  function D(e) {
    this.id = e, this.vertexFormat = void 0, this.positions = void 0, this.width = void 0, this.cornerType = void 0, this.height = void 0, this.extrudedHeight = void 0, this.granularity = void 0, this.offsetAttribute = void 0;
  }

  function E(e, t) {
    U.call(this, {
      entity: e,
      scene: t,
      geometryOptions: new D(e),
      geometryPropertyName: "corridor",
      observedPropertyNames: ["availability", "corridor"]
    }), this._onEntityPropertyChanged(e, "corridor", e.corridor, void 0);
  }

  function G(e, t, i) {
    o.call(this, e, t, i);
  }

  return h(Object.create) && ((E.prototype = Object.create(U.prototype)).constructor = E), E.prototype.createFillGeometryInstance = function (e) {
    if (n.defined("time", e), !this._fillEnabled) throw new p("This instance does not represent a filled geometry.");
    var t,
        i = this._entity,
        r = i.isAvailable(e),
        o = {
      show: new m(r && i.isShowing && this._showProperty.getValue(e) && this._fillProperty.getValue(e)),
      distanceDisplayCondition: c.fromDistanceDisplayCondition(this._distanceDisplayConditionProperty.getValue(e)),
      offset: void 0,
      color: void 0
    };
    return this._materialProperty instanceof V && (h(this._materialProperty.color) && (this._materialProperty.color.isConstant || r) && (t = this._materialProperty.color.getValue(e, v)), h(t) || (t = s.WHITE), o.color = a.fromColor(t)), h(this._options.offsetAttribute) && (o.offset = g.fromCartesian3(w.getValueOrDefault(this._terrainOffsetProperty, e, A, I))), new y({
      id: i,
      geometry: new l(this._options),
      attributes: o
    });
  }, E.prototype.createOutlineGeometryInstance = function (e) {
    if (n.defined("time", e), !this._outlineEnabled) throw new p("This instance does not represent an outlined geometry.");
    var t = this._entity,
        i = t.isAvailable(e),
        r = w.getValueOrDefault(this._outlineColorProperty, e, s.BLACK, v),
        o = {
      show: new m(i && t.isShowing && this._showProperty.getValue(e) && this._showOutlineProperty.getValue(e)),
      color: a.fromColor(r),
      distanceDisplayCondition: c.fromDistanceDisplayCondition(this._distanceDisplayConditionProperty.getValue(e)),
      offset: void 0
    };
    return h(this._options.offsetAttribute) && (o.offset = g.fromCartesian3(w.getValueOrDefault(this._terrainOffsetProperty, e, A, I))), new y({
      id: t,
      geometry: new u(this._options),
      attributes: o
    });
  }, E.prototype._computeCenter = function (e, t) {
    var i = w.getValueOrUndefined(this._entity.corridor.positions, e);
    if (h(i) && 0 !== i.length) return r.clone(i[Math.floor(i.length / 2)], t);
  }, E.prototype._isHidden = function (e, t) {
    return !h(t.positions) || !h(t.width) || M.prototype._isHidden.call(this, e, t);
  }, E.prototype._isDynamic = function (e, t) {
    return !t.positions.isConstant || !w.isConstant(t.height) || !w.isConstant(t.extrudedHeight) || !w.isConstant(t.granularity) || !w.isConstant(t.width) || !w.isConstant(t.outlineWidth) || !w.isConstant(t.cornerType) || !w.isConstant(t.zIndex) || this._onTerrain && !w.isConstant(this._materialProperty);
  }, E.prototype._setStaticOptions = function (e, t) {
    var i = w.getValueOrUndefined(t.height, f.MINIMUM_VALUE),
        r = w.getValueOrDefault(t.heightReference, f.MINIMUM_VALUE, C.NONE),
        o = w.getValueOrUndefined(t.extrudedHeight, f.MINIMUM_VALUE),
        n = w.getValueOrDefault(t.extrudedHeightReference, f.MINIMUM_VALUE, C.NONE);
    h(o) && !h(i) && (i = 0);
    var s = this._options;
    s.vertexFormat = this._materialProperty instanceof V ? O.VERTEX_FORMAT : _.MaterialSupport.TEXTURED.vertexFormat, s.positions = t.positions.getValue(f.MINIMUM_VALUE, s.positions), s.width = t.width.getValue(f.MINIMUM_VALUE), s.granularity = w.getValueOrUndefined(t.granularity, f.MINIMUM_VALUE), s.cornerType = w.getValueOrUndefined(t.cornerType, f.MINIMUM_VALUE), s.offsetAttribute = U.computeGeometryOffsetAttribute(i, r, o, n), s.height = U.getGeometryHeight(i, r), (o = U.getGeometryExtrudedHeight(o, n)) === U.CLAMP_TO_GROUND && (o = d.getMinimumMaximumHeights(l.computeRectangle(s, b)).minimumTerrainHeight), s.extrudedHeight = o;
  }, E.DynamicGeometryUpdater = G, h(Object.create) && ((G.prototype = Object.create(o.prototype)).constructor = G), G.prototype._isHidden = function (e, t, i) {
    var r = this._options;
    return !h(r.positions) || !h(r.width) || o.prototype._isHidden.call(this, e, t, i);
  }, G.prototype._setOptions = function (e, t, i) {
    var r = this._options,
        o = w.getValueOrUndefined(t.height, i),
        n = w.getValueOrDefault(t.heightReference, i, C.NONE),
        s = w.getValueOrUndefined(t.extrudedHeight, i),
        a = w.getValueOrDefault(t.extrudedHeightReference, i, C.NONE);
    h(s) && !h(o) && (o = 0), r.positions = w.getValueOrUndefined(t.positions, i), r.width = w.getValueOrUndefined(t.width, i), r.granularity = w.getValueOrUndefined(t.granularity, i), r.cornerType = w.getValueOrUndefined(t.cornerType, i), r.offsetAttribute = U.computeGeometryOffsetAttribute(o, n, s, a), r.height = U.getGeometryHeight(o, n), (s = U.getGeometryExtrudedHeight(s, a)) === U.CLAMP_TO_GROUND && (s = d.getMinimumMaximumHeights(l.computeRectangle(r, b)).minimumTerrainHeight), r.extrudedHeight = s;
  }, E;
});