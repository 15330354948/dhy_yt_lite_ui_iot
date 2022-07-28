"use strict";

define(["./Cartesian3", "./Check", "./defaultValue", "./defined", "./freezeObject", "./Math", "./scaleToGeodeticSurface"], function (f, u, a, g, t, c, p) {
  "use strict";

  function m(t, e, n) {
    this.longitude = a(t, 0), this.latitude = a(e, 0), this.height = a(n, 0);
  }

  m.fromRadians = function (t, e, n, i) {
    return u.typeOf.number("longitude", t), u.typeOf.number("latitude", e), n = a(n, 0), g(i) ? (i.longitude = t, i.latitude = e, i.height = n, i) : new m(t, e, n);
  }, m.fromDegrees = function (t, e, n, i) {
    return u.typeOf.number("longitude", t), u.typeOf.number("latitude", e), t = c.toRadians(t), e = c.toRadians(e), m.fromRadians(t, e, n, i);
  };
  var y = new f(),
      b = new f(),
      O = new f(),
      w = new f(1 / 6378137, 1 / 6378137, 1 / 6356752.314245179),
      q = new f(1 / 40680631590769, 1 / 40680631590769, 1 / 40408299984661.445),
      R = c.EPSILON1;
  return m.fromCartesian = function (t, e, n) {
    var i = g(e) ? e.oneOverRadii : w,
        u = g(e) ? e.oneOverRadiiSquared : q,
        a = g(e) ? e._centerToleranceSquared : R,
        o = p(t, i, u, a, b);

    if (g(o)) {
      var r = f.multiplyComponents(o, u, y),
          r = f.normalize(r, r),
          l = f.subtract(t, o, O),
          d = Math.atan2(r.y, r.x),
          h = Math.asin(r.z),
          s = c.sign(f.dot(l, t)) * f.magnitude(l);
      return g(n) ? (n.longitude = d, n.latitude = h, n.height = s, n) : new m(d, h, s);
    }
  }, m.toCartesian = function (t, e, n) {
    return u.defined("cartographic", t), f.fromRadians(t.longitude, t.latitude, t.height, e, n);
  }, m.clone = function (t, e) {
    if (g(t)) return g(e) ? (e.longitude = t.longitude, e.latitude = t.latitude, e.height = t.height, e) : new m(t.longitude, t.latitude, t.height);
  }, m.equals = function (t, e) {
    return t === e || g(t) && g(e) && t.longitude === e.longitude && t.latitude === e.latitude && t.height === e.height;
  }, m.equalsEpsilon = function (t, e, n) {
    return u.typeOf.number("epsilon", n), t === e || g(t) && g(e) && Math.abs(t.longitude - e.longitude) <= n && Math.abs(t.latitude - e.latitude) <= n && Math.abs(t.height - e.height) <= n;
  }, m.ZERO = t(new m(0, 0, 0)), m.prototype.clone = function (t) {
    return m.clone(this, t);
  }, m.prototype.equals = function (t) {
    return m.equals(this, t);
  }, m.prototype.equalsEpsilon = function (t, e) {
    return m.equalsEpsilon(this, t, e);
  }, m.prototype.toString = function () {
    return "(" + this.longitude + ", " + this.latitude + ", " + this.height + ")";
  }, m;
});