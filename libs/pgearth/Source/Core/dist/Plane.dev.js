"use strict";

define(["./Cartesian3", "./Check", "./defined", "./DeveloperError", "./freezeObject", "./Math", "./Matrix4"], function (a, i, l, r, e, c, o) {
  "use strict";

  function m(e, n) {
    if (i.typeOf.object("normal", e), !c.equalsEpsilon(a.magnitude(e), 1, c.EPSILON6)) throw new r("normal must be normalized.");
    i.typeOf.number("distance", n), this.normal = a.clone(e), this.distance = n;
  }

  m.fromPointNormal = function (e, n, t) {
    if (i.typeOf.object("point", e), i.typeOf.object("normal", n), !c.equalsEpsilon(a.magnitude(n), 1, c.EPSILON6)) throw new r("normal must be normalized.");
    var o = -a.dot(n, e);
    return l(t) ? (a.clone(n, t.normal), t.distance = o, t) : new m(n, o);
  };

  var f = new a();
  m.fromCartesian4 = function (e, n) {
    i.typeOf.object("coefficients", e);
    var t = a.fromCartesian4(e, f),
        o = e.w;
    if (!c.equalsEpsilon(a.magnitude(t), 1, c.EPSILON6)) throw new r("normal must be normalized.");
    return l(n) ? (a.clone(t, n.normal), n.distance = o, n) : new m(t, o);
  }, m.getPointDistance = function (e, n) {
    return i.typeOf.object("plane", e), i.typeOf.object("point", n), a.dot(e.normal, n) + e.distance;
  };
  var s = new a();

  m.projectPointOntoPlane = function (e, n, t) {
    i.typeOf.object("plane", e), i.typeOf.object("point", n), l(t) || (t = new a());
    var o = m.getPointDistance(e, n),
        r = a.multiplyByScalar(e.normal, o, s);
    return a.subtract(n, r, t);
  };

  var u = new a();
  return m.transform = function (e, n, t) {
    return i.typeOf.object("plane", e), i.typeOf.object("transform", n), o.multiplyByPointAsVector(n, e.normal, f), a.normalize(f, f), a.multiplyByScalar(e.normal, -e.distance, u), o.multiplyByPoint(n, u, u), m.fromPointNormal(u, f, t);
  }, m.clone = function (e, n) {
    return i.typeOf.object("plane", e), l(n) ? (a.clone(e.normal, n.normal), n.distance = e.distance, n) : new m(e.normal, e.distance);
  }, m.equals = function (e, n) {
    return i.typeOf.object("left", e), i.typeOf.object("right", n), e.distance === n.distance && a.equals(e.normal, n.normal);
  }, m.ORIGIN_XY_PLANE = e(new m(a.UNIT_Z, 0)), m.ORIGIN_YZ_PLANE = e(new m(a.UNIT_X, 0)), m.ORIGIN_ZX_PLANE = e(new m(a.UNIT_Y, 0)), m;
});