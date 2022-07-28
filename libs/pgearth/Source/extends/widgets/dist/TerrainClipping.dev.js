"use strict";

define(["../../Core/defined", "../../Core/DeveloperError", "../../Core/Cartesian3", "../../Core/Plane", "../../Scene/ClippingPlane"], function (n, i, c, w, f) {
  function e(e) {
    if (!n(e.points)) throw new i("points is required.");
    this.points = e.points || [];
  }

  return e.prototype.getClippingPlanes = function () {
    for (var e = this.points, n = this.points.length, i = [], r = 0; r < n; ++r) {
      var t = (r + 1) % n,
          o = c.add(e[r], e[t], new c()),
          o = c.multiplyByScalar(o, .5, o),
          s = c.normalize(o, new c()),
          a = c.subtract(e[t], o, new c()),
          a = c.normalize(a, a),
          p = c.cross(a, s, new c()),
          p = c.normalize(p, p),
          l = new w(p, 0),
          u = w.getPointDistance(l, o);
      i.push(new f(p, u));
    }

    return i;
  }, e;
});