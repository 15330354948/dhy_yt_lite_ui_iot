"use strict";

define(["./Cartesian3", "./defined", "./DeveloperError"], function (s, u, y) {
  "use strict";

  var e = {
    solve: function solve(e, r, t, n) {
      if (!(u(e) && e instanceof Array)) throw new y("The array lower is required.");
      if (!(u(r) && r instanceof Array)) throw new y("The array diagonal is required.");
      if (!(u(t) && t instanceof Array)) throw new y("The array upper is required.");
      if (!(u(n) && n instanceof Array)) throw new y("The array right is required.");
      if (r.length !== n.length) throw new y("diagonal and right must have the same lengths.");
      if (e.length !== t.length) throw new y("lower and upper must have the same lengths.");
      if (e.length !== r.length - 1) throw new y("lower and upper must be one less than the length of diagonal.");

      for (var a, l = new Array(t.length), h = new Array(n.length), i = new Array(n.length), o = 0; o < h.length; o++) {
        h[o] = new s(), i[o] = new s();
      }

      for (l[0] = t[0] / r[0], h[0] = s.multiplyByScalar(n[0], 1 / r[0], h[0]), o = 1; o < l.length; ++o) {
        a = 1 / (r[o] - l[o - 1] * e[o - 1]), l[o] = t[o] * a, h[o] = s.subtract(n[o], s.multiplyByScalar(h[o - 1], e[o - 1], h[o]), h[o]), h[o] = s.multiplyByScalar(h[o], a, h[o]);
      }

      for (a = 1 / (r[o] - l[o - 1] * e[o - 1]), h[o] = s.subtract(n[o], s.multiplyByScalar(h[o - 1], e[o - 1], h[o]), h[o]), h[o] = s.multiplyByScalar(h[o], a, h[o]), i[i.length - 1] = h[h.length - 1], o = i.length - 2; 0 <= o; --o) {
        i[o] = s.subtract(h[o], s.multiplyByScalar(i[o + 1], l[o], i[o]), i[o]);
      }

      return i;
    }
  };
  return e;
});