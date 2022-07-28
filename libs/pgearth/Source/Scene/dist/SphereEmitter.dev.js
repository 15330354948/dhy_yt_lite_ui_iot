"use strict";

define(["../Core/Cartesian3", "../Core/Check", "../Core/defaultValue", "../Core/defineProperties", "../Core/Math"], function (s, t, i, e, u) {
  "use strict";

  function n(e) {
    e = i(e, 1), t.typeOf.number.greaterThan("radius", e, 0), this._radius = i(e, 1);
  }

  return e(n.prototype, {
    radius: {
      get: function get() {
        return this._radius;
      },
      set: function set(e) {
        t.typeOf.number.greaterThan("value", e, 0), this._radius = e;
      }
    }
  }), n.prototype.emit = function (e) {
    var t = u.randomBetween(0, u.TWO_PI),
        i = u.randomBetween(0, u.PI),
        n = u.randomBetween(0, this._radius),
        r = n * Math.cos(t) * Math.sin(i),
        o = n * Math.sin(t) * Math.sin(i),
        a = n * Math.cos(i);
    e.position = s.fromElements(r, o, a, e.position), e.velocity = s.normalize(e.position, e.velocity);
  }, n;
});