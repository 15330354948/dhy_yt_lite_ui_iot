"use strict";

define(["../Core/ApproximateTerrainHeights", "../Core/Cartesian3", "../Core/Check", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/defined", "../Core/DeveloperError", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/EllipseGeometry", "../Core/EllipseOutlineGeometry", "../Core/GeometryInstance", "../Core/GeometryOffsetAttribute", "../Core/Iso8601", "../Core/OffsetGeometryInstanceAttribute", "../Core/Rectangle", "../Core/ShowGeometryInstanceAttribute", "../Scene/GroundPrimitive", "../Scene/HeightReference", "../Scene/MaterialAppearance", "../Scene/PerInstanceColorAppearance", "./ColorMaterialProperty", "./DynamicGeometryUpdater", "./GeometryUpdater", "./GroundGeometryUpdater", "./Property"], function (l, e, s, a, u, d, p, h, c, f, m, t, g, y, i, M, r, O, _, C, V, o, n, A, U) {
  "use strict";

  var x = new a(),
      I = e.ZERO,
      v = new e(),
      b = new i();

  function E(e) {
    this.id = e, this.vertexFormat = void 0, this.center = void 0, this.semiMajorAxis = void 0, this.semiMinorAxis = void 0, this.rotation = void 0, this.height = void 0, this.extrudedHeight = void 0, this.granularity = void 0, this.stRotation = void 0, this.numberOfVerticalLines = void 0, this.offsetAttribute = void 0;
  }

  function D(e, t) {
    A.call(this, {
      entity: e,
      scene: t,
      geometryOptions: new E(e),
      geometryPropertyName: "ellipse",
      observedPropertyNames: ["availability", "position", "ellipse"]
    }), this._onEntityPropertyChanged(e, "ellipse", e.ellipse, void 0);
  }

  function G(e, t, i) {
    o.call(this, e, t, i);
  }

  return d(Object.create) && ((D.prototype = Object.create(A.prototype)).constructor = D), D.prototype.createFillGeometryInstance = function (e) {
    if (s.defined("time", e), !this._fillEnabled) throw new p("This instance does not represent a filled geometry.");
    var t,
        i = this._entity,
        r = i.isAvailable(e),
        o = {
      show: new M(r && i.isShowing && this._showProperty.getValue(e) && this._fillProperty.getValue(e)),
      distanceDisplayCondition: h.fromDistanceDisplayCondition(this._distanceDisplayConditionProperty.getValue(e)),
      offset: void 0,
      color: void 0
    };
    return this._materialProperty instanceof V && (d(this._materialProperty.color) && (this._materialProperty.color.isConstant || r) && (t = this._materialProperty.color.getValue(e, x)), d(t) || (t = a.WHITE), o.color = u.fromColor(t)), d(this._options.offsetAttribute) && (o.offset = y.fromCartesian3(U.getValueOrDefault(this._terrainOffsetProperty, e, I, v))), new m({
      id: i,
      geometry: new c(this._options),
      attributes: o
    });
  }, D.prototype.createOutlineGeometryInstance = function (e) {
    if (s.defined("time", e), !this._outlineEnabled) throw new p("This instance does not represent an outlined geometry.");

    var t = this._entity,
        i = t.isAvailable(e),
        r = U.getValueOrDefault(this._outlineColorProperty, e, a.BLACK, x),
        o = this._distanceDisplayConditionProperty.getValue(e),
        n = {
      show: new M(i && t.isShowing && this._showProperty.getValue(e) && this._showOutlineProperty.getValue(e)),
      color: u.fromColor(r),
      distanceDisplayCondition: h.fromDistanceDisplayCondition(o),
      offset: void 0
    };

    return d(this._options.offsetAttribute) && (n.offset = y.fromCartesian3(U.getValueOrDefault(this._terrainOffsetProperty, e, I, v))), new m({
      id: t,
      geometry: new f(this._options),
      attributes: n
    });
  }, D.prototype._computeCenter = function (e, t) {
    return U.getValueOrUndefined(this._entity.position, e, t);
  }, D.prototype._isHidden = function (e, t) {
    var i = e.position;
    return !d(i) || !d(t.semiMajorAxis) || !d(t.semiMinorAxis) || n.prototype._isHidden.call(this, e, t);
  }, D.prototype._isDynamic = function (e, t) {
    return !e.position.isConstant || !t.semiMajorAxis.isConstant || !t.semiMinorAxis.isConstant || !U.isConstant(t.rotation) || !U.isConstant(t.height) || !U.isConstant(t.extrudedHeight) || !U.isConstant(t.granularity) || !U.isConstant(t.stRotation) || !U.isConstant(t.outlineWidth) || !U.isConstant(t.numberOfVerticalLines) || !U.isConstant(t.zIndex) || this._onTerrain && !U.isConstant(this._materialProperty);
  }, D.prototype._setStaticOptions = function (e, t) {
    var i = U.getValueOrUndefined(t.height, g.MINIMUM_VALUE),
        r = U.getValueOrDefault(t.heightReference, g.MINIMUM_VALUE, O.NONE),
        o = U.getValueOrUndefined(t.extrudedHeight, g.MINIMUM_VALUE),
        n = U.getValueOrDefault(t.extrudedHeightReference, g.MINIMUM_VALUE, O.NONE);
    d(o) && !d(i) && (i = 0);
    var s = this._options;
    s.vertexFormat = this._materialProperty instanceof V ? C.VERTEX_FORMAT : _.MaterialSupport.TEXTURED.vertexFormat, s.center = e.position.getValue(g.MINIMUM_VALUE, s.center), s.semiMajorAxis = t.semiMajorAxis.getValue(g.MINIMUM_VALUE, s.semiMajorAxis), s.semiMinorAxis = t.semiMinorAxis.getValue(g.MINIMUM_VALUE, s.semiMinorAxis), s.rotation = U.getValueOrUndefined(t.rotation, g.MINIMUM_VALUE), s.granularity = U.getValueOrUndefined(t.granularity, g.MINIMUM_VALUE), s.stRotation = U.getValueOrUndefined(t.stRotation, g.MINIMUM_VALUE), s.numberOfVerticalLines = U.getValueOrUndefined(t.numberOfVerticalLines, g.MINIMUM_VALUE), s.offsetAttribute = A.computeGeometryOffsetAttribute(i, r, o, n), s.height = A.getGeometryHeight(i, r), (o = A.getGeometryExtrudedHeight(o, n)) === A.CLAMP_TO_GROUND && (o = l.getMinimumMaximumHeights(c.computeRectangle(s, b)).minimumTerrainHeight), s.extrudedHeight = o;
  }, D.DynamicGeometryUpdater = G, d(Object.create) && ((G.prototype = Object.create(o.prototype)).constructor = G), G.prototype._isHidden = function (e, t, i) {
    var r = this._options;
    return !d(r.center) || !d(r.semiMajorAxis) || !d(r.semiMinorAxis) || o.prototype._isHidden.call(this, e, t, i);
  }, G.prototype._setOptions = function (e, t, i) {
    var r = this._options,
        o = U.getValueOrUndefined(t.height, i),
        n = U.getValueOrDefault(t.heightReference, i, O.NONE),
        s = U.getValueOrUndefined(t.extrudedHeight, i),
        a = U.getValueOrDefault(t.extrudedHeightReference, i, O.NONE);
    d(s) && !d(o) && (o = 0), r.center = U.getValueOrUndefined(e.position, i, r.center), r.semiMajorAxis = U.getValueOrUndefined(t.semiMajorAxis, i), r.semiMinorAxis = U.getValueOrUndefined(t.semiMinorAxis, i), r.rotation = U.getValueOrUndefined(t.rotation, i), r.granularity = U.getValueOrUndefined(t.granularity, i), r.stRotation = U.getValueOrUndefined(t.stRotation, i), r.numberOfVerticalLines = U.getValueOrUndefined(t.numberOfVerticalLines, i), r.offsetAttribute = A.computeGeometryOffsetAttribute(o, n, s, a), r.height = A.getGeometryHeight(o, n), (s = A.getGeometryExtrudedHeight(s, a)) === A.CLAMP_TO_GROUND && (s = l.getMinimumMaximumHeights(c.computeRectangle(r, b)).minimumTerrainHeight), r.extrudedHeight = s;
  }, D;
});