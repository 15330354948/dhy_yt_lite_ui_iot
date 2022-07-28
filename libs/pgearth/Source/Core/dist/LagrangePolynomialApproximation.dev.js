"use strict";

define(["./defined"], function (c) {
  "use strict";

  var r = {
    type: "Lagrange",
    getRequiredDataPoints: function getRequiredDataPoints(r) {
      return Math.max(r + 1, 2);
    },
    interpolateOrderZero: function interpolateOrderZero(r, e, n, t, a) {
      c(a) || (a = new Array(t));

      for (var o = e.length, f = 0; f < t; f++) {
        a[f] = 0;
      }

      for (f = 0; f < o; f++) {
        for (var i, u = 1, d = 0; d < o; d++) {
          d !== f && (i = e[f] - e[d], u *= (r - e[d]) / i);
        }

        for (d = 0; d < t; d++) {
          a[d] += u * n[f * t + d];
        }
      }

      return a;
    }
  };
  return r;
});