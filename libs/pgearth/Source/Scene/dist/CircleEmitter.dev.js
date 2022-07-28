"use strict";

define(["../Core/Cartesian3", "../Core/Check", "../Core/defaultValue", "../Core/defineProperties", "../Core/Math"], function (o, t, r, e, a) {
  "use strict";

  function i(e) {
    e = r(e, 1), t.typeOf.number.greaterThan("radius", e, 0), this._radius = r(e, 1);
  }

  return e(i.prototype, {
    radius: {
      get: function get() {
        return this._radius;
      },
      set: function set(e) {
        t.typeOf.number.greaterThan("value", e, 0), this._radius = e;
      }
    }
  }), i.prototype.emit = function (e) {
    var t = a.randomBetween(0, a.TWO_PI),
        r = a.randomBetween(0, this._radius),
        i = r * Math.cos(t),
        n = r * Math.sin(t);
    e.position = o.fromElements(i, n, 0, e.position), e.velocity = o.clone(o.UNIT_Z, e.velocity);
  }, i;
});