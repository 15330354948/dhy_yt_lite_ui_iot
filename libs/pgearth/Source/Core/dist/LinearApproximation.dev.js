"use strict";

define(["./defined", "./DeveloperError"], function (f, h) {
  "use strict";

  var e = {
    type: "Linear",
    getRequiredDataPoints: function getRequiredDataPoints(e) {
      return 2;
    },
    interpolateOrderZero: function interpolateOrderZero(e, r, t, n, a) {
      if (2 !== r.length) throw new h("The xTable provided to the linear interpolator must have exactly two elements.");
      if (n <= 0) throw new h("There must be at least 1 dependent variable for each independent variable.");
      var i, o, l;
      f(a) || (a = new Array(n));
      var d = r[0],
          u = r[1];
      if (d === u) throw new h("Divide by zero error: xTable[0] and xTable[1] are equal");

      for (i = 0; i < n; i++) {
        o = t[i], l = t[i + n], a[i] = ((l - o) * e + u * o - d * l) / (u - d);
      }

      return a;
    }
  };
  return e;
});