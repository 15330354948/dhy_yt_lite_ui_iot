"use strict";

define(["../Core/ApproximateTerrainHeights", "../Core/Cartesian3", "../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/GeometryOffsetAttribute", "../Core/Iso8601", "../Core/oneTimeWarning", "../Scene/GroundPrimitive", "../Scene/HeightReference", "./CallbackProperty", "./ConstantProperty", "./GeometryUpdater", "./Property", "./TerrainOffsetProperty"], function (e, t, r, d, h, i, o, n, s, p, f, y, a, c, u, _, O) {
  "use strict";

  var g = new c(0);

  function P(e) {
    u.call(this, e), this._zIndex = 0, this._terrainOffsetProperty = void 0;
  }

  return h(Object.create) && ((P.prototype = Object.create(u.prototype)).constructor = P), i(P.prototype, {
    zIndex: {
      get: function get() {
        return this._zIndex;
      }
    },
    terrainOffsetProperty: {
      get: function get() {
        return this._terrainOffsetProperty;
      }
    }
  }), P.prototype._isOnTerrain = function (e, t) {
    return this._fillEnabled && !h(t.height) && !h(t.extrudedHeight) && f.isSupported(this._scene);
  }, P.prototype._getIsClosed = function (e) {
    var t = e.height,
        r = e.extrudedHeight;
    return 0 === t || h(r) && r !== t;
  }, P.prototype._computeCenter = o.throwInstantiationError, P.prototype._onEntityPropertyChanged = function (e, t, r, i) {
    var o, n, s, f;
    u.prototype._onEntityPropertyChanged.call(this, e, t, r, i), -1 !== this._observedPropertyNames.indexOf(t) && (o = this._entity[this._geometryPropertyName], h(o) && (h(o.zIndex) && (h(o.height) || h(o.extrudedHeight)) && p(p.geometryZIndex), this._zIndex = d(o.zIndex, g), h(this._terrainOffsetProperty) && (this._terrainOffsetProperty.destroy(), this._terrainOffsetProperty = void 0), n = o.heightReference, s = o.extrudedHeightReference, (h(n) || h(s)) && (f = new a(this._computeCenter.bind(this), !this._dynamic), this._terrainOffsetProperty = new O(this._scene, f, n, s))));
  }, P.prototype.destroy = function () {
    h(this._terrainOffsetProperty) && (this._terrainOffsetProperty.destroy(), this._terrainOffsetProperty = void 0), u.prototype.destroy.call(this);
  }, P.getGeometryHeight = function (e, t) {
    if (r.defined("heightReference", t), h(e)) return t !== y.CLAMP_TO_GROUND ? e : 0;
    t !== y.NONE && p(p.geometryHeightReference);
  }, P.getGeometryExtrudedHeight = function (e, t) {
    if (r.defined("extrudedHeightReference", t), h(e)) return t !== y.CLAMP_TO_GROUND ? e : P.CLAMP_TO_GROUND;
    t !== y.NONE && p(p.geometryExtrudedHeightReference);
  }, P.CLAMP_TO_GROUND = "clamp", P.computeGeometryOffsetAttribute = function (e, t, r, i) {
    h(e) && h(t) || (t = y.NONE), h(r) && h(i) || (i = y.NONE);
    var o = 0;
    return t !== y.NONE && o++, i === y.RELATIVE_TO_GROUND && o++, 2 === o ? n.ALL : 1 === o ? n.TOP : void 0;
  }, P;
});