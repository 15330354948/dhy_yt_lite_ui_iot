"use strict";

define(["./defined", "./Cartesian2", "./Cartesian3", "./Check", "./IntersectionTests", "./Math", "./Matrix3", "./OrientedBoundingBox"], function (n, d, C, h, e, t, P, v) {
  "use strict";

  var i = {},
      s = new C(),
      w = new C(),
      x = new C(),
      A = new C(),
      p = new v();

  function u(n, e, t, i, r) {
    var o = C.subtract(n, e, s),
        u = C.dot(t, o),
        a = C.dot(i, o);
    return d.fromElements(u, a, r);
  }

  return i.validOutline = function (n) {
    h.defined("positions", n);
    var e = v.fromPoints(n, p).halfAxes,
        t = P.getColumn(e, 0, w),
        i = P.getColumn(e, 1, x),
        r = P.getColumn(e, 2, A),
        o = C.magnitude(t),
        u = C.magnitude(i),
        a = C.magnitude(r);
    return !(0 === o && (0 === u || 0 === a) || 0 === u && 0 === a);
  }, i.computeProjectTo2DArguments = function (n, e, t, i) {
    h.defined("positions", n), h.defined("centerResult", e), h.defined("planeAxis1Result", t), h.defined("planeAxis2Result", i);
    var r,
        o,
        u = v.fromPoints(n, p),
        a = u.halfAxes,
        d = P.getColumn(a, 0, w),
        s = P.getColumn(a, 1, x),
        c = P.getColumn(a, 2, A),
        f = C.magnitude(d),
        l = C.magnitude(s),
        m = C.magnitude(c),
        g = Math.min(f, l, m);
    return (0 !== f || 0 !== l && 0 !== m) && (0 !== l || 0 !== m) && (g !== l && g !== m || (r = d), g === f ? r = s : g === m && (o = s), g !== f && g !== l || (o = c), C.normalize(r, t), C.normalize(o, i), C.clone(u.center, e), !0);
  }, i.createProjectPointsTo2DFunction = function (i, r, o) {
    return function (n) {
      for (var e = new Array(n.length), t = 0; t < n.length; t++) {
        e[t] = u(n[t], i, r, o);
      }

      return e;
    };
  }, i.createProjectPointTo2DFunction = function (t, i, r) {
    return function (n, e) {
      return u(n, t, i, r, e);
    };
  }, i;
});