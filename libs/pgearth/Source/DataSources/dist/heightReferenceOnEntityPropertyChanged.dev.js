"use strict";

define(["../Core/defaultValue", "../Core/defined", "./CallbackProperty", "./GeometryUpdater", "./TerrainOffsetProperty"], function (e, f, a, y, h) {
  "use strict";

  return function (e, t, r, i) {
    var n, s, o;
    y.prototype._onEntityPropertyChanged.call(this, e, t, r, i), -1 !== this._observedPropertyNames.indexOf(t) && (n = this._entity[this._geometryPropertyName], f(n) && (f(this._terrainOffsetProperty) && (this._terrainOffsetProperty.destroy(), this._terrainOffsetProperty = void 0), s = n.heightReference, f(s) && (o = new a(this._computeCenter.bind(this), !this._dynamic), this._terrainOffsetProperty = new h(this._scene, o, s))));
  };
});