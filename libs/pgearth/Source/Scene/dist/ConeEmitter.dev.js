"use strict";

define(["../Core/Cartesian3", "../Core/Check", "../Core/defaultValue", "../Core/defineProperties", "../Core/Math"], function (r, t, n, e, l) {
  "use strict";

  var o = l.toRadians(30);

  function i(e) {
    this._angle = n(e, o);
  }

  return e(i.prototype, {
    angle: {
      get: function get() {
        return this._angle;
      },
      set: function set(e) {
        t.typeOf.number("value", e), this._angle = e;
      }
    }
  }), i.prototype.emit = function (e) {
    var t = Math.tan(this._angle),
        n = l.randomBetween(0, l.TWO_PI),
        o = l.randomBetween(0, t),
        i = o * Math.cos(n),
        a = o * Math.sin(n);
    e.velocity = r.fromElements(i, a, 1, e.velocity), r.normalize(e.velocity, e.velocity), e.position = r.clone(r.ZERO, e.position);
  }, i;
});