"use strict";

define(["./ComponentDatatype", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError"], function (e, t, r, n, i) {
  "use strict";

  function a(e, n) {
    if (e = t(e, 0), (n = t(n, Number.MAX_VALUE)) <= e) throw new i("far distance must be greater than near distance.");
    this.value = new Float32Array([e, n]);
  }

  return n(a.prototype, {
    componentDatatype: {
      get: function get() {
        return e.FLOAT;
      }
    },
    componentsPerAttribute: {
      get: function get() {
        return 2;
      }
    },
    normalize: {
      get: function get() {
        return !1;
      }
    }
  }), a.fromDistanceDisplayCondition = function (e) {
    if (!r(e)) throw new i("distanceDisplayCondition is required.");
    if (e.far <= e.near) throw new i("distanceDisplayCondition.far distance must be greater than distanceDisplayCondition.near distance.");
    return new a(e.near, e.far);
  }, a.toValue = function (e, n) {
    if (!r(e)) throw new i("distanceDisplayCondition is required.");
    return r(n) ? (n[0] = e.near, n[1] = e.far, n) : new Float32Array([e.near, e.far]);
  }, a;
});