"use strict";

define(["../Core/Cartesian3", "../Core/Check", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/CylinderGeometry", "../Core/CylinderOutlineGeometry", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/DistanceDisplayConditionGeometryInstanceAttribute", "../Core/GeometryInstance", "../Core/GeometryOffsetAttribute", "../Core/Iso8601", "../Core/OffsetGeometryInstanceAttribute", "../Core/ShowGeometryInstanceAttribute", "../Scene/HeightReference", "../Scene/MaterialAppearance", "../Scene/PerInstanceColorAppearance", "./heightReferenceOnEntityPropertyChanged", "./ColorMaterialProperty", "./DynamicGeometryUpdater", "./GeometryUpdater", "./Property"], function (e, a, l, p, d, s, c, t, u, f, h, n, r, y, m, g, C, _, i, O, V, o, b) {
  "use strict";

  var M = e.ZERO,
      R = new e(),
      v = new e(),
      P = new l();

  function U(e) {
    this.id = e, this.vertexFormat = void 0, this.length = void 0, this.topRadius = void 0, this.bottomRadius = void 0, this.slices = void 0, this.numberOfVerticalLines = void 0, this.offsetAttribute = void 0;
  }

  function A(e, t) {
    o.call(this, {
      entity: e,
      scene: t,
      geometryOptions: new U(e),
      geometryPropertyName: "cylinder",
      observedPropertyNames: ["availability", "position", "orientation", "cylinder"]
    }), this._onEntityPropertyChanged(e, "cylinder", e.cylinder, void 0);
  }

  function w(e, t, i) {
    V.call(this, e, t, i);
  }

  return c(Object.create) && ((A.prototype = Object.create(o.prototype)).constructor = A), t(A.prototype, {
    terrainOffsetProperty: {
      get: function get() {
        return this._terrainOffsetProperty;
      }
    }
  }), A.prototype.createFillGeometryInstance = function (e) {
    if (a.defined("time", e), !this._fillEnabled) throw new u("This instance does not represent a filled geometry.");

    var t,
        i = this._entity,
        o = i.isAvailable(e),
        r = new m(o && i.isShowing && this._showProperty.getValue(e) && this._fillProperty.getValue(e)),
        n = this._distanceDisplayConditionProperty.getValue(e),
        s = {
      show: r,
      distanceDisplayCondition: f.fromDistanceDisplayCondition(n),
      color: void 0,
      offset: void 0
    };

    return this._materialProperty instanceof O && (c(this._materialProperty.color) && (this._materialProperty.color.isConstant || o) && (t = this._materialProperty.color.getValue(e, P)), c(t) || (t = l.WHITE), s.color = p.fromColor(t)), c(this._options.offsetAttribute) && (s.offset = y.fromCartesian3(b.getValueOrDefault(this._terrainOffsetProperty, e, M, R))), new h({
      id: i,
      geometry: new d(this._options),
      modelMatrix: i.computeModelMatrixForHeightReference(e, i.cylinder.heightReference, .5 * this._options.length, this._scene.mapProjection.ellipsoid),
      attributes: s
    });
  }, A.prototype.createOutlineGeometryInstance = function (e) {
    if (a.defined("time", e), !this._outlineEnabled) throw new u("This instance does not represent an outlined geometry.");

    var t = this._entity,
        i = t.isAvailable(e),
        o = b.getValueOrDefault(this._outlineColorProperty, e, l.BLACK, P),
        r = this._distanceDisplayConditionProperty.getValue(e),
        n = {
      show: new m(i && t.isShowing && this._showProperty.getValue(e) && this._showOutlineProperty.getValue(e)),
      color: p.fromColor(o),
      distanceDisplayCondition: f.fromDistanceDisplayCondition(r),
      offset: void 0
    };

    return c(this._options.offsetAttribute) && (n.offset = y.fromCartesian3(b.getValueOrDefault(this._terrainOffsetProperty, e, M, R))), new h({
      id: t,
      geometry: new s(this._options),
      modelMatrix: t.computeModelMatrixForHeightReference(e, t.cylinder.heightReference, .5 * this._options.length, this._scene.mapProjection.ellipsoid),
      attributes: n
    });
  }, A.prototype._computeCenter = function (e, t) {
    return b.getValueOrUndefined(this._entity.position, e, t);
  }, A.prototype._isHidden = function (e, t) {
    return !c(e.position) || !c(t.length) || !c(t.topRadius) || !c(t.bottomRadius) || o.prototype._isHidden.call(this, e, t);
  }, A.prototype._isDynamic = function (e, t) {
    return !(e.position.isConstant && b.isConstant(e.orientation) && t.length.isConstant && t.topRadius.isConstant && t.bottomRadius.isConstant && b.isConstant(t.slices) && b.isConstant(t.outlineWidth) && b.isConstant(t.numberOfVerticalLines));
  }, A.prototype._setStaticOptions = function (e, t) {
    var i = b.getValueOrDefault(t.heightReference, r.MINIMUM_VALUE, g.NONE),
        o = this._options;
    o.vertexFormat = this._materialProperty instanceof O ? _.VERTEX_FORMAT : C.MaterialSupport.TEXTURED.vertexFormat, o.length = t.length.getValue(r.MINIMUM_VALUE), o.topRadius = t.topRadius.getValue(r.MINIMUM_VALUE), o.bottomRadius = t.bottomRadius.getValue(r.MINIMUM_VALUE), o.slices = b.getValueOrUndefined(t.slices, r.MINIMUM_VALUE), o.numberOfVerticalLines = b.getValueOrUndefined(t.numberOfVerticalLines, r.MINIMUM_VALUE), o.offsetAttribute = i !== g.NONE ? n.ALL : void 0;
  }, A.prototype._onEntityPropertyChanged = i, A.DynamicGeometryUpdater = w, c(Object.create) && ((w.prototype = Object.create(V.prototype)).constructor = w), w.prototype._isHidden = function (e, t, i) {
    var o = this._options,
        r = b.getValueOrUndefined(e.position, i, v);
    return !c(r) || !c(o.length) || !c(o.topRadius) || !c(o.bottomRadius) || V.prototype._isHidden.call(this, e, t, i);
  }, w.prototype._setOptions = function (e, t, i) {
    var o = b.getValueOrDefault(t.heightReference, i, g.NONE),
        r = this._options;
    r.length = b.getValueOrUndefined(t.length, i), r.topRadius = b.getValueOrUndefined(t.topRadius, i), r.bottomRadius = b.getValueOrUndefined(t.bottomRadius, i), r.slices = b.getValueOrUndefined(t.slices, i), r.numberOfVerticalLines = b.getValueOrUndefined(t.numberOfVerticalLines, i), r.offsetAttribute = o !== g.NONE ? n.ALL : void 0;
  }, A;
});