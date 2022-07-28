"use strict";

define(["./defined", "./DeveloperError"], function (i, a) {
  "use strict";

  var s = [],
      w = [];

  function f(r, e, n, t, o) {
    var i;
    o <= t || (f(r, e, n, t, i = Math.floor(.5 * (t + o))), f(r, e, n, i + 1, o), function (r, e, n, t, o, i) {
      for (var a, f = o - t + 1, h = i - o, l = s, u = w, c = 0; c < f; ++c) {
        l[c] = r[t + c];
      }

      for (a = 0; a < h; ++a) {
        u[a] = r[o + a + 1];
      }

      a = c = 0;

      for (var v = t; v <= i; ++v) {
        var d = l[c],
            g = u[a];
        c < f && (h <= a || e(d, g, n) <= 0) ? (r[v] = d, ++c) : a < h && (r[v] = g, ++a);
      }
    }(r, e, n, t, i, o));
  }

  return function (r, e, n) {
    if (!i(r)) throw new a("array is required.");
    if (!i(e)) throw new a("comparator is required.");
    var t = r.length,
        o = Math.ceil(.5 * t);
    s.length = o, w.length = o, f(r, e, n, 0, t - 1), s.length = 0, w.length = 0;
  };
});