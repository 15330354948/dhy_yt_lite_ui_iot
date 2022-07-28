"use strict";

define(["./Cartesian3", "./Cartesian4", "./defaultValue", "./defined", "./DeveloperError", "./Intersect", "./Plane"], function (S, f, n, w, E, l, I) {
  "use strict";

  function d(e) {
    this.planes = n(e, []);
  }

  var c = [new S(), new S(), new S()];
  S.clone(S.UNIT_X, c[0]), S.clone(S.UNIT_Y, c[1]), S.clone(S.UNIT_Z, c[2]);
  var T = new S(),
      p = new S(),
      s = new I(new S(1, 0, 0), 0);
  return d.fromBoundingSphere = function (e, n) {
    if (!w(e)) throw new E("boundingSphere is required.");
    w(n) || (n = new d());
    var r = c.length,
        t = n.planes;
    t.length = 2 * r;

    for (var i = e.center, a = e.radius, o = 0, u = 0; u < r; ++u) {
      var l = c[u],
          I = t[o],
          s = t[o + 1];
      w(I) || (I = t[o] = new f()), w(s) || (s = t[o + 1] = new f()), S.multiplyByScalar(l, -a, T), S.add(i, T, T), I.x = l.x, I.y = l.y, I.z = l.z, I.w = -S.dot(l, T), S.multiplyByScalar(l, a, T), S.add(i, T, T), s.x = -l.x, s.y = -l.y, s.z = -l.z, s.w = -S.dot(S.negate(l, p), T), o += 2;
    }

    return n;
  }, d.prototype.computeVisibility = function (e) {
    if (!w(e)) throw new E("boundingVolume is required.");

    for (var n = this.planes, r = !1, t = 0, i = n.length; t < i; ++t) {
      var a = e.intersectPlane(I.fromCartesian4(n[t], s));
      if (a === l.OUTSIDE) return l.OUTSIDE;
      a === l.INTERSECTING && (r = !0);
    }

    return r ? l.INTERSECTING : l.INSIDE;
  }, d.prototype.computeVisibilityWithPlaneMask = function (e, n) {
    if (!w(e)) throw new E("boundingVolume is required.");
    if (!w(n)) throw new E("parentPlaneMask is required.");
    if (n === d.MASK_OUTSIDE || n === d.MASK_INSIDE) return n;

    for (var r = d.MASK_INSIDE, t = this.planes, i = 0, a = t.length; i < a; ++i) {
      var o = i < 31 ? 1 << i : 0;

      if (!(i < 31 && 0 == (n & o))) {
        var u = e.intersectPlane(I.fromCartesian4(t[i], s));
        if (u === l.OUTSIDE) return d.MASK_OUTSIDE;
        u === l.INTERSECTING && (r |= o);
      }
    }

    return r;
  }, d.MASK_OUTSIDE = 4294967295, d.MASK_INSIDE = 0, d.MASK_INDETERMINATE = 2147483647, d;
});