"use strict";

define(["../Core/Cartesian3", "../Core/Check", "../Core/defined", "../Core/defineProperties"], function (t, i, a, n) {
  "use strict";

  function s(n, e) {
    i.typeOf.object("normal", n), i.typeOf.number("distance", e), this._distance = e, this._normal = new c(n, this), this.onChangeCallback = void 0, this.index = -1;
  }

  function c(n, e) {
    this._clippingPlane = e, this._cartesian3 = t.clone(n);
  }

  return n(s.prototype, {
    distance: {
      get: function get() {
        return this._distance;
      },
      set: function set(n) {
        i.typeOf.number("value", n), a(this.onChangeCallback) && n !== this._distance && this.onChangeCallback(this.index), this._distance = n;
      }
    },
    normal: {
      get: function get() {
        return this._normal;
      },
      set: function set(n) {
        i.typeOf.object("value", n), a(this.onChangeCallback) && !t.equals(this._normal._cartesian3, n) && this.onChangeCallback(this.index), t.clone(n, this._normal._cartesian3);
      }
    }
  }), s.fromPlane = function (n, e) {
    return i.typeOf.object("plane", n), a(e) ? (e.normal = n.normal, e.distance = n.distance) : e = new s(n.normal, n.distance), e;
  }, s.clone = function (n, e) {
    return a(e) ? (e.normal = n.normal, e.distance = n.distance, e) : new s(n.normal, n.distance);
  }, n(c.prototype, {
    x: {
      get: function get() {
        return this._cartesian3.x;
      },
      set: function set(n) {
        i.typeOf.number("value", n), a(this._clippingPlane.onChangeCallback) && n !== this._cartesian3.x && this._clippingPlane.onChangeCallback(this._clippingPlane.index), this._cartesian3.x = n;
      }
    },
    y: {
      get: function get() {
        return this._cartesian3.y;
      },
      set: function set(n) {
        i.typeOf.number("value", n), a(this._clippingPlane.onChangeCallback) && n !== this._cartesian3.y && this._clippingPlane.onChangeCallback(this._clippingPlane.index), this._cartesian3.y = n;
      }
    },
    z: {
      get: function get() {
        return this._cartesian3.z;
      },
      set: function set(n) {
        i.typeOf.number("value", n), a(this._clippingPlane.onChangeCallback) && n !== this._cartesian3.z && this._clippingPlane.onChangeCallback(this._clippingPlane.index), this._cartesian3.z = n;
      }
    }
  }), s;
});