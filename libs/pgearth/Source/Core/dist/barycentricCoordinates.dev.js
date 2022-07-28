"use strict";

define(["./Cartesian2", "./Cartesian3", "./Check", "./defined", "./Math"], function (I, N, p, b, q) {
  "use strict";

  var L = new N(),
      O = new N(),
      P = new N();
  return function (e, t, n, r, i) {
    var o, s, u, d, a, l, c, f;

    if (p.defined("point", e), p.defined("p0", t), p.defined("p1", n), p.defined("p2", r), b(i) || (i = new N()), b(t.z)) {
      if (N.equalsEpsilon(e, t, q.EPSILON14)) return N.clone(N.UNIT_X, i);
      if (N.equalsEpsilon(e, n, q.EPSILON14)) return N.clone(N.UNIT_Y, i);
      if (N.equalsEpsilon(e, r, q.EPSILON14)) return N.clone(N.UNIT_Z, i);
      o = N.subtract(n, t, L), s = N.subtract(r, t, O), u = N.subtract(e, t, P), d = N.dot(o, o), a = N.dot(o, s), l = N.dot(o, u), c = N.dot(s, s), f = N.dot(s, u);
    } else {
      if (I.equalsEpsilon(e, t, q.EPSILON14)) return N.clone(N.UNIT_X, i);
      if (I.equalsEpsilon(e, n, q.EPSILON14)) return N.clone(N.UNIT_Y, i);
      if (I.equalsEpsilon(e, r, q.EPSILON14)) return N.clone(N.UNIT_Z, i);
      o = I.subtract(n, t, L), s = I.subtract(r, t, O), u = I.subtract(e, t, P), d = I.dot(o, o), a = I.dot(o, s), l = I.dot(o, u), c = I.dot(s, s), f = I.dot(s, u);
    }

    var E = 1 / (d * c - a * a);
    return i.y = (c * l - a * f) * E, i.z = (d * f - a * l) * E, i.x = 1 - i.y - i.z, i;
  };
});