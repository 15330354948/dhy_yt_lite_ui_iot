"use strict";

define(["./Check", "./defaultValue", "./defined", "./DeveloperError", "./Math"], function (o, f, u, a, r) {
  "use strict";

  function t() {
    this.times = void 0, this.points = void 0, a.throwInstantiationError();
  }

  return t.prototype.evaluate = a.throwInstantiationError, t.prototype.findTimeInterval = function (t, e) {
    var r,
        i = this.times,
        n = i.length;
    if (!u(t)) throw new a("time is required.");
    if (t < i[0] || t > i[n - 1]) throw new a("time is out of range.");

    if (t >= i[e = f(e, 0)]) {
      if (e + 1 < n && t < i[e + 1]) return e;
      if (e + 2 < n && t < i[e + 2]) return e + 1;
    } else if (0 <= e - 1 && t >= i[e - 1]) return e - 1;

    if (t > i[e]) for (r = e; r < n - 1 && !(t >= i[r] && t < i[r + 1]); ++r) {
      ;
    } else for (r = e - 1; 0 <= r && !(t >= i[r] && t < i[r + 1]); --r) {
      ;
    }
    return r === n - 1 && (r = n - 2), r;
  }, t.prototype.wrapTime = function (t) {
    o.typeOf.number("time", t);
    var e = this.times,
        r = e[e.length - 1],
        i = e[0],
        n = r - i;
    return t < i && (t += (Math.floor((i - t) / n) + 1) * n), r < t && (t -= (Math.floor((t - r) / n) + 1) * n), t;
  }, t.prototype.clampTime = function (t) {
    o.typeOf.number("time", t);
    var e = this.times;
    return r.clamp(t, e[0], e[e.length - 1]);
  }, t;
});