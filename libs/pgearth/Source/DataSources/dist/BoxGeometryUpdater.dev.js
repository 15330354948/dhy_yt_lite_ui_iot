"use strict";

define(["../Core/BoxGeometry", "../Core/BoxOutlineGeometry", "../Core/Cartesian3", "../Core/Check", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/GeometryInstance", "../Core/GeometryOffsetAttribute", "../Core/Iso8601", "../Core/OffsetGeometryInstanceAttribute", "../Core/ShowGeometryInstanceAttribute", "../Scene/HeightReference", "../Scene/MaterialAppearance", "../Scene/PerInstanceColorAppearance", "./heightReferenceOnEntityPropertyChanged", "./ColorMaterialProperty", "./DynamicGeometryUpdater", "./GeometryUpdater", "./Property"], function (a, s, e, p, l, c, f, t, d, y, h, n, r, u, m, _, C, g, o, O, b, i, P) {
  "use strict";

  var v = e.ZERO,
      D = new e(),
      w = new e(),
      A = new l();

  function V(e) {
    this.id = e, this.vertexFormat = void 0, this.dimensions = void 0, this.offsetAttribute = void 0;
  }

  function E(e, t) {
    i.call(this, {
      entity: e,
      scene: t,
      geometryOptions: new V(e),
      geometryPropertyName: "box",
      observedPropertyNames: ["availability", "position", "orientation", "box"]
    }), this._onEntityPropertyChanged(e, "box", e.box, void 0);
  }

  function M(e, t, o) {
    b.call(this, e, t, o);
  }

  return f(Object.create) && ((E.prototype = Object.create(i.prototype)).constructor = E), t(E.prototype, {
    terrainOffsetProperty: {
      get: function get() {
        return this._terrainOffsetProperty;
      }
    }
  }), E.prototype.createFillGeometryInstance = function (e) {
    if (p.defined("time", e), !this._fillEnabled) throw new d("This instance does not represent a filled geometry.");

    var t,
        o = this._entity,
        i = o.isAvailable(e),
        r = new m(i && o.isShowing && this._showProperty.getValue(e) && this._fillProperty.getValue(e)),
        n = this._distanceDisplayConditionProperty.getValue(e),
        s = {
      show: r,
      distanceDisplayCondition: y.fromDistanceDisplayCondition(n),
      color: void 0,
      offset: void 0
    };

    return this._materialProperty instanceof O && (f(this._materialProperty.color) && (this._materialProperty.color.isConstant || i) && (t = this._materialProperty.color.getValue(e, A)), f(t) || (t = l.WHITE), s.color = c.fromColor(t)), f(this._options.offsetAttribute) && (s.offset = u.fromCartesian3(P.getValueOrDefault(this._terrainOffsetProperty, e, v, D))), new h({
      id: o,
      geometry: a.fromDimensions(this._options),
      modelMatrix: o.computeModelMatrixForHeightReference(e, o.box.heightReference, .5 * this._options.dimensions.z, this._scene.mapProjection.ellipsoid),
      attributes: s
    });
  }, E.prototype.createOutlineGeometryInstance = function (e) {
    if (p.defined("time", e), !this._outlineEnabled) throw new d("This instance does not represent an outlined geometry.");

    var t = this._entity,
        o = t.isAvailable(e),
        i = P.getValueOrDefault(this._outlineColorProperty, e, l.BLACK, A),
        r = this._distanceDisplayConditionProperty.getValue(e),
        n = {
      show: new m(o && t.isShowing && this._showProperty.getValue(e) && this._showOutlineProperty.getValue(e)),
      color: c.fromColor(i),
      distanceDisplayCondition: y.fromDistanceDisplayCondition(r),
      offset: void 0
    };

    return f(this._options.offsetAttribute) && (n.offset = u.fromCartesian3(P.getValueOrDefault(this._terrainOffsetProperty, e, v, D))), new h({
      id: t,
      geometry: s.fromDimensions(this._options),
      modelMatrix: t.computeModelMatrixForHeightReference(e, t.box.heightReference, .5 * this._options.dimensions.z, this._scene.mapProjection.ellipsoid),
      attributes: n
    });
  }, E.prototype._computeCenter = function (e, t) {
    return P.getValueOrUndefined(this._entity.position, e, t);
  }, E.prototype._isHidden = function (e, t) {
    return !f(t.dimensions) || !f(e.position) || i.prototype._isHidden.call(this, e, t);
  }, E.prototype._isDynamic = function (e, t) {
    return !(e.position.isConstant && P.isConstant(e.orientation) && t.dimensions.isConstant && P.isConstant(t.outlineWidth));
  }, E.prototype._setStaticOptions = function (e, t) {
    var o = P.getValueOrDefault(t.heightReference, r.MINIMUM_VALUE, _.NONE),
        i = this._options;
    i.vertexFormat = this._materialProperty instanceof O ? g.VERTEX_FORMAT : C.MaterialSupport.TEXTURED.vertexFormat, i.dimensions = t.dimensions.getValue(r.MINIMUM_VALUE, i.dimensions), i.offsetAttribute = o !== _.NONE ? n.ALL : void 0;
  }, E.prototype._onEntityPropertyChanged = o, E.DynamicGeometryUpdater = M, f(Object.create) && ((M.prototype = Object.create(b.prototype)).constructor = M), M.prototype._isHidden = function (e, t, o) {
    var i = P.getValueOrUndefined(e.position, o, w),
        r = this._options.dimensions;
    return !f(i) || !f(r) || b.prototype._isHidden.call(this, e, t, o);
  }, M.prototype._setOptions = function (e, t, o) {
    var i = P.getValueOrDefault(t.heightReference, o, _.NONE),
        r = this._options;
    r.dimensions = P.getValueOrUndefined(t.dimensions, o, r.dimensions), r.offsetAttribute = i !== _.NONE ? n.ALL : void 0;
  }, E;
});