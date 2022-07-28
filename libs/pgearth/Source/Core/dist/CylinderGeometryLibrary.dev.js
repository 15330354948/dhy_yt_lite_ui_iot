"use strict";

define(["./Math"], function (A) {
  "use strict";

  var t = {
    computePositions: function computePositions(t, r, n, a, o) {
      for (var e = .5 * t, i = -e, s = a + a, u = new Float64Array(3 * (o ? 2 * s : s)), c = 0, f = 0, h = o ? 3 * s : 0, v = o ? 3 * (s + a) : 3 * a, M = 0; M < a; M++) {
        var P = M / a * A.TWO_PI,
            d = Math.cos(P),
            l = Math.sin(P),
            m = d * n,
            p = l * n,
            w = d * r,
            y = l * r;
        u[f + h] = m, u[f + h + 1] = p, u[f + h + 2] = i, u[f + v] = w, u[f + v + 1] = y, u[f + v + 2] = e, f += 3, o && (u[c++] = m, u[c++] = p, u[c++] = i, u[c++] = w, u[c++] = y, u[c++] = e);
      }

      return u;
    }
  };
  return t;
});