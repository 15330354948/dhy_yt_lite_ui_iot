"use strict";

define(["./Cartesian3", "./Check", "./defaultValue", "./defined", "./Intersect"], function (y, a, t, p, r) {
  "use strict";

  function E(n, e, m) {
    this.minimum = y.clone(t(n, y.ZERO)), this.maximum = y.clone(t(e, y.ZERO)), m = p(m) ? y.clone(m) : y.midpoint(this.minimum, this.maximum, new y()), this.center = m;
  }

  E.fromPoints = function (n, e) {
    if (p(e) || (e = new E()), !p(n) || 0 === n.length) return e.minimum = y.clone(y.ZERO, e.minimum), e.maximum = y.clone(y.ZERO, e.maximum), e.center = y.clone(y.ZERO, e.center), e;

    for (var m = n[0].x, t = n[0].y, i = n[0].z, u = n[0].x, a = n[0].y, r = n[0].z, c = n.length, o = 1; o < c; o++) {
      var l = n[o],
          s = l.x,
          x = l.y,
          h = l.z,
          m = Math.min(s, m),
          u = Math.max(s, u),
          t = Math.min(x, t),
          a = Math.max(x, a),
          i = Math.min(h, i),
          r = Math.max(h, r);
    }

    var f = e.minimum;
    f.x = m, f.y = t, f.z = i;
    var d = e.maximum;
    return d.x = u, d.y = a, d.z = r, e.center = y.midpoint(f, d, e.center), e;
  }, E.clone = function (n, e) {
    if (p(n)) return p(e) ? (e.minimum = y.clone(n.minimum, e.minimum), e.maximum = y.clone(n.maximum, e.maximum), e.center = y.clone(n.center, e.center), e) : new E(n.minimum, n.maximum, n.center);
  }, E.equals = function (n, e) {
    return n === e || p(n) && p(e) && y.equals(n.center, e.center) && y.equals(n.minimum, e.minimum) && y.equals(n.maximum, e.maximum);
  };
  var c = new y();
  return E.intersectPlane = function (n, e) {
    a.defined("box", n), a.defined("plane", e), c = y.subtract(n.maximum, n.minimum, c);
    var m = y.multiplyByScalar(c, .5, c),
        t = e.normal,
        i = m.x * Math.abs(t.x) + m.y * Math.abs(t.y) + m.z * Math.abs(t.z),
        u = y.dot(n.center, t) + e.distance;
    return 0 < u - i ? r.INSIDE : u + i < 0 ? r.OUTSIDE : r.INTERSECTING;
  }, E.prototype.clone = function (n) {
    return E.clone(this, n);
  }, E.prototype.intersectPlane = function (n) {
    return E.intersectPlane(this, n);
  }, E.prototype.equals = function (n) {
    return E.equals(this, n);
  }, E;
});