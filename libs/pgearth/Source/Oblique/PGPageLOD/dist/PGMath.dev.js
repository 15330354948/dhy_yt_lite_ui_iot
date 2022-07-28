"use strict";

define(["../../Core/BoundingSphere", "../../Core/Cartesian2", "../../Core/Cartesian3", "../../Core/Cartesian4"], function (a, e, v, h) {
  "use strict";

  function t() {}

  return t.expandSphere = function (e, r) {
    if (!r.empty()) {
      if (e.empty()) return void a.clone(r, e);
      var t = new v();
      v.subtract(e.center, r.center, t);
      var n = v.magnitude(t);

      if (!(n + r.radius <= e.radius)) {
        if (n + e.radius <= r.radius) return void a.clone(r, e);
        var i = .5 * (e.radius + n + r.radius),
            u = (i - e.radius) / n,
            c = new v(e.center.x, e.center.y, e.center.z);
        c.x += (r.center.x - e.center.x) * u, c.y += (r.center.y - e.center.y) * u, c.x += (r.center.z - e.center.z) * u, e.center = c, e.radius = i;
      }
    }
  }, t.computeTowVecDist = function (e, r) {
    var t = e.x - r.x,
        n = e.y - r.y,
        i = e.z - r.z;
    return Math.sqrt(t * t + n * n + i * i);
  }, t.computeTowVecDistSquare = function (e, r) {
    var t = e.x - r.x,
        n = e.y - r.y,
        i = e.z - r.z;
    return t * t + n * n + i * i;
  }, t.computeDistFromEye = function (e, r) {
    return e.applyMatrix4(r).length();
  }, t.mulVec3Vec4 = function (e, r) {
    return e.x * r.x + e.y * r.y + e.z * r.z + r.w;
  }, t.computeSpherePixelSize = function (e, r) {
    return Math.abs(e.radius / t.mulVec3Vec4(e.center, r));
  }, t.computePixelSizeVector = function (e, r, t) {
    var n = e.z,
        i = e.w,
        u = r,
        c = t,
        a = u[0] * n * .5,
        o = u[8] * n * .5 + u[11] * n * .5,
        s = new v(c[0] * a + c[2] * o, c[4] * a + c[6] * o, c[8] * a + c[10] * o),
        y = u[5] * i * .5,
        x = u[9] * i * .5 + u[11] * i * .5,
        z = new v(c[1] * y + c[2] * x, c[5] * y + c[6] * x, c[9] * y + c[10] * x),
        d = u[11],
        f = u[15],
        p = new h(c[2] * d, c[6] * d, c[10] * d, c[14] * d + c[15] * f),
        m = s.x * s.x + s.y * s.y + s.z * s.z,
        l = z.x * z.x + z.y * z.y + z.z * z.z,
        w = .7071067811 / Math.sqrt(m + l);
    return h.multiplyByScalar(p, w, p), p;
  }, t;
});