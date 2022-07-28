"use strict";

define(["./DeveloperError", "./Math"], function (s, b) {
  "use strict";

  var r = {};

  function m(r, e, t) {
    var n = r + e;
    return b.sign(r) !== b.sign(e) && Math.abs(n / Math.max(Math.abs(r), Math.abs(e))) < t ? 0 : n;
  }

  return r.computeDiscriminant = function (r, e, t) {
    if ("number" != typeof r) throw new s("a is a required number.");
    if ("number" != typeof e) throw new s("b is a required number.");
    if ("number" != typeof t) throw new s("c is a required number.");
    return e * e - 4 * r * t;
  }, r.computeRealRoots = function (r, e, t) {
    if ("number" != typeof r) throw new s("a is a required number.");
    if ("number" != typeof e) throw new s("b is a required number.");
    if ("number" != typeof t) throw new s("c is a required number.");
    var n;
    if (0 === r) return 0 === e ? [] : [-t / e];

    if (0 === e) {
      if (0 === t) return [0, 0];
      var i = Math.abs(t),
          u = Math.abs(r);
      if (i < u && i / u < b.EPSILON14) return [0, 0];
      if (u < i && u / i < b.EPSILON14) return [];
      if ((n = -t / r) < 0) return [];
      var a = Math.sqrt(n);
      return [-a, a];
    }

    if (0 === t) return (n = -e / r) < 0 ? [n, 0] : [0, n];
    var f = m(e * e, -(4 * r * t), b.EPSILON14);
    if (f < 0) return [];
    var o = -.5 * m(e, b.sign(e) * Math.sqrt(f), b.EPSILON14);
    return 0 < e ? [o / r, t / o] : [t / o, o / r];
  }, r;
});