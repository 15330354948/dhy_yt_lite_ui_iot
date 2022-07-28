"use strict";

define(["../Core/ApproximateTerrainHeights", "../Core/Cartesian3", "../Core/Cartographic", "../Core/Check", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/defined", "../Core/DeveloperError", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/Ellipsoid", "../Core/GeometryInstance", "../Core/GeometryOffsetAttribute", "../Core/Iso8601", "../Core/OffsetGeometryInstanceAttribute", "../Core/Rectangle", "../Core/RectangleGeometry", "../Core/RectangleOutlineGeometry", "../Core/ShowGeometryInstanceAttribute", "../Scene/GroundPrimitive", "../Scene/HeightReference", "../Scene/MaterialAppearance", "../Scene/PerInstanceColorAppearance", "./ColorMaterialProperty", "./DynamicGeometryUpdater", "./GeometryUpdater", "./GroundGeometryUpdater", "./Property"], function (l, e, o, a, s, d, u, c, h, n, g, t, p, f, y, m, C, _, r, O, V, U, M, i, v, A, I) {
  "use strict";

  var E = new s(),
      G = e.ZERO,
      b = new e(),
      w = new y(),
      D = new y(),
      P = new o();

  function H(e) {
    this.id = e, this.vertexFormat = void 0, this.rectangle = void 0, this.height = void 0, this.extrudedHeight = void 0, this.granularity = void 0, this.stRotation = void 0, this.rotation = void 0, this.offsetAttribute = void 0;
  }

  function R(e, t) {
    A.call(this, {
      entity: e,
      scene: t,
      geometryOptions: new H(e),
      geometryPropertyName: "rectangle",
      observedPropertyNames: ["availability", "rectangle"]
    }), this._onEntityPropertyChanged(e, "rectangle", e.rectangle, void 0);
  }

  function N(e, t, r) {
    i.call(this, e, t, r);
  }

  return u(Object.create) && ((R.prototype = Object.create(A.prototype)).constructor = R), R.prototype.createFillGeometryInstance = function (e) {
    if (a.defined("time", e), !this._fillEnabled) throw new c("This instance does not represent a filled geometry.");
    var t,
        r = this._entity,
        i = r.isAvailable(e),
        o = {
      show: new _(i && r.isShowing && this._showProperty.getValue(e) && this._fillProperty.getValue(e)),
      distanceDisplayCondition: h.fromDistanceDisplayCondition(this._distanceDisplayConditionProperty.getValue(e)),
      offset: void 0,
      color: void 0
    };
    return this._materialProperty instanceof M && (u(this._materialProperty.color) && (this._materialProperty.color.isConstant || i) && (t = this._materialProperty.color.getValue(e, E)), u(t) || (t = s.WHITE), o.color = d.fromColor(t)), u(this._options.offsetAttribute) && (o.offset = f.fromCartesian3(I.getValueOrDefault(this._terrainOffsetProperty, e, G, b))), new g({
      id: r,
      geometry: new m(this._options),
      attributes: o
    });
  }, R.prototype.createOutlineGeometryInstance = function (e) {
    if (a.defined("time", e), !this._outlineEnabled) throw new c("This instance does not represent an outlined geometry.");

    var t = this._entity,
        r = t.isAvailable(e),
        i = I.getValueOrDefault(this._outlineColorProperty, e, s.BLACK, E),
        o = this._distanceDisplayConditionProperty.getValue(e),
        n = {
      show: new _(r && t.isShowing && this._showProperty.getValue(e) && this._showOutlineProperty.getValue(e)),
      color: d.fromColor(i),
      distanceDisplayCondition: h.fromDistanceDisplayCondition(o),
      offset: void 0
    };

    return u(this._options.offsetAttribute) && (n.offset = f.fromCartesian3(I.getValueOrDefault(this._terrainOffsetProperty, e, G, b))), new g({
      id: t,
      geometry: new C(this._options),
      attributes: n
    });
  }, R.prototype._computeCenter = function (e, t) {
    var r = I.getValueOrUndefined(this._entity.rectangle.coordinates, e, D);

    if (u(r)) {
      var i = y.center(r, P);
      return o.toCartesian(i, n.WGS84, t);
    }
  }, R.prototype._isHidden = function (e, t) {
    return !u(t.coordinates) || v.prototype._isHidden.call(this, e, t);
  }, R.prototype._isDynamic = function (e, t) {
    return !t.coordinates.isConstant || !I.isConstant(t.height) || !I.isConstant(t.extrudedHeight) || !I.isConstant(t.granularity) || !I.isConstant(t.stRotation) || !I.isConstant(t.rotation) || !I.isConstant(t.outlineWidth) || !I.isConstant(t.zIndex) || this._onTerrain && !I.isConstant(this._materialProperty);
  }, R.prototype._setStaticOptions = function (e, t) {
    var r = this._materialProperty instanceof M,
        i = I.getValueOrUndefined(t.height, p.MINIMUM_VALUE),
        o = I.getValueOrDefault(t.heightReference, p.MINIMUM_VALUE, O.NONE),
        n = I.getValueOrUndefined(t.extrudedHeight, p.MINIMUM_VALUE),
        a = I.getValueOrDefault(t.extrudedHeightReference, p.MINIMUM_VALUE, O.NONE);
    u(n) && !u(i) && (i = 0);
    var s = this._options;
    s.vertexFormat = r ? U.VERTEX_FORMAT : V.MaterialSupport.TEXTURED.vertexFormat, s.rectangle = t.coordinates.getValue(p.MINIMUM_VALUE, s.rectangle), s.granularity = I.getValueOrUndefined(t.granularity, p.MINIMUM_VALUE), s.stRotation = I.getValueOrUndefined(t.stRotation, p.MINIMUM_VALUE), s.rotation = I.getValueOrUndefined(t.rotation, p.MINIMUM_VALUE), s.offsetAttribute = A.computeGeometryOffsetAttribute(i, o, n, a), s.height = A.getGeometryHeight(i, o), (n = A.getGeometryExtrudedHeight(n, a)) === A.CLAMP_TO_GROUND && (n = l.getMinimumMaximumHeights(m.computeRectangle(s, w)).minimumTerrainHeight), s.extrudedHeight = n;
  }, R.DynamicGeometryUpdater = N, u(Object.create) && ((N.prototype = Object.create(i.prototype)).constructor = N), N.prototype._isHidden = function (e, t, r) {
    return !u(this._options.rectangle) || i.prototype._isHidden.call(this, e, t, r);
  }, N.prototype._setOptions = function (e, t, r) {
    var i = this._options,
        o = I.getValueOrUndefined(t.height, r),
        n = I.getValueOrDefault(t.heightReference, r, O.NONE),
        a = I.getValueOrUndefined(t.extrudedHeight, r),
        s = I.getValueOrDefault(t.extrudedHeightReference, r, O.NONE);
    u(a) && !u(o) && (o = 0), i.rectangle = I.getValueOrUndefined(t.coordinates, r, i.rectangle), i.granularity = I.getValueOrUndefined(t.granularity, r), i.stRotation = I.getValueOrUndefined(t.stRotation, r), i.rotation = I.getValueOrUndefined(t.rotation, r), i.offsetAttribute = A.computeGeometryOffsetAttribute(o, n, a, s), i.height = A.getGeometryHeight(o, n), (a = A.getGeometryExtrudedHeight(a, s)) === A.CLAMP_TO_GROUND && (a = l.getMinimumMaximumHeights(m.computeRectangle(i, w)).minimumTerrainHeight), i.extrudedHeight = a;
  }, R;
});