"use strict";

define(["../Core/Cartesian3", "../Core/Cartographic", "../Core/Check", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/Event", "../Core/Iso8601", "../Core/Math", "../Scene/HeightReference", "../Scene/SceneMode", "./Property"], function (h, s, a, l, e, t, _, c, p, u, d, g) {
  "use strict";

  var f = new h(),
      C = new s();

  function i(e, t, i, n) {
    a.defined("scene", e), a.defined("positionProperty", t), this._scene = e, this._heightReference = i, this._extrudedHeightReference = n, this._positionProperty = t, this._position = new h(), this._cartographicPosition = new s(), this._normal = new h(), this._definitionChanged = new _(), this._terrainHeight = 0, this._removeCallbackFunc = void 0, this._removeEventListener = void 0, this._removeModeListener = void 0;
    var r = this;

    if (l(e.globe) && (this._removeEventListener = e.terrainProviderChanged.addEventListener(function () {
      r._updateClamping();
    }), this._removeModeListener = e.morphComplete.addEventListener(function () {
      r._updateClamping();
    })), t.isConstant) {
      var o = t.getValue(c.MINIMUM_VALUE, f);
      if (!l(o) || h.equals(o, h.ZERO) || !l(e.globe)) return;
      this._position = h.clone(o, this._position), this._updateClamping(), this._normal = e.globe.ellipsoid.geodeticSurfaceNormal(o, this._normal);
    }
  }

  return e(i.prototype, {
    isConstant: {
      get: function get() {
        return !1;
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    }
  }), i.prototype._updateClamping = function () {
    l(this._removeCallbackFunc) && this._removeCallbackFunc();
    var i,
        e,
        n,
        t,
        r,
        o = this._scene,
        s = o.globe,
        a = this._position;
    l(s) && !h.equals(a, h.ZERO) ? (i = s.ellipsoid, e = s._surface, n = this, t = i.cartesianToCartographic(a, this._cartographicPosition), r = s.getHeight(t), l(r) ? this._terrainHeight = r : this._terrainHeight = 0, this._removeCallbackFunc = e.updateHeight(t, function (e) {
      var t;
      o.mode === d.SCENE3D ? (t = i.cartesianToCartographic(e, C), n._terrainHeight = t.height) : n._terrainHeight = e.x, n.definitionChanged.raiseEvent();
    })) : this._terrainHeight = 0;
  }, i.prototype.getValue = function (e, t) {
    var i = g.getValueOrDefault(this._heightReference, e, u.NONE),
        n = g.getValueOrDefault(this._extrudedHeightReference, e, u.NONE);
    if (i === u.NONE && n !== u.RELATIVE_TO_GROUND) return this._position = h.clone(h.ZERO, this._position), h.clone(h.ZERO, t);
    if (this._positionProperty.isConstant) return h.multiplyByScalar(this._normal, this._terrainHeight, t);

    var r = this._scene,
        o = this._positionProperty.getValue(e, f);

    if (!l(o) || h.equals(o, h.ZERO) || !l(r.globe)) return h.clone(h.ZERO, t);
    if (h.equalsEpsilon(this._position, o, p.EPSILON10)) return h.multiplyByScalar(this._normal, this._terrainHeight, t);
    this._position = h.clone(o, this._position), this._updateClamping();
    var s = r.globe.ellipsoid.geodeticSurfaceNormal(o, this._normal);
    return h.multiplyByScalar(s, this._terrainHeight, t);
  }, i.prototype.isDestroyed = function () {
    return !1;
  }, i.prototype.destroy = function () {
    return l(this._removeEventListener) && this._removeEventListener(), l(this._removeModeListener) && this._removeModeListener(), l(this._removeCallbackFunc) && this._removeCallbackFunc(), t(this);
  }, i;
});