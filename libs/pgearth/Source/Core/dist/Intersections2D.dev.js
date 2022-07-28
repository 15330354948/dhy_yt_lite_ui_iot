"use strict";

define(["./Cartesian2", "./Cartesian3", "./Check", "./defined", "./DeveloperError"], function (d, b, y, v, O) {
  "use strict";

  var u = {
    clipTriangleAtAxisAlignedThreshold: function clipTriangleAtAxisAlignedThreshold(u, e, s, h, r, p) {
      if (!v(u)) throw new O("threshold is required.");
      if (!v(e)) throw new O("keepAbove is required.");
      if (!v(s)) throw new O("u0 is required.");
      if (!v(h)) throw new O("u1 is required.");
      if (!v(r)) throw new O("u2 is required.");
      var i, n, t;
      v(p) ? p.length = 0 : p = [], t = e ? (i = s < u, n = h < u, r < u) : (i = u < s, n = u < h, u < r);
      var f,
          o,
          w,
          d,
          y,
          a,
          q = i + n + t;
      return 1 === q ? i ? (f = (u - s) / (h - s), o = (u - s) / (r - s), p.push(1), p.push(2), 1 !== o && (p.push(-1), p.push(0), p.push(2), p.push(o)), 1 !== f && (p.push(-1), p.push(0), p.push(1), p.push(f))) : n ? (w = (u - h) / (r - h), d = (u - h) / (s - h), p.push(2), p.push(0), 1 !== d && (p.push(-1), p.push(1), p.push(0), p.push(d)), 1 !== w && (p.push(-1), p.push(1), p.push(2), p.push(w))) : t && (y = (u - r) / (s - r), a = (u - r) / (h - r), p.push(0), p.push(1), 1 !== a && (p.push(-1), p.push(2), p.push(1), p.push(a)), 1 !== y && (p.push(-1), p.push(2), p.push(0), p.push(y))) : 2 === q ? i || s === u ? n || h === u ? t || r === u || (o = (u - s) / (r - s), w = (u - h) / (r - h), p.push(2), p.push(-1), p.push(0), p.push(2), p.push(o), p.push(-1), p.push(1), p.push(2), p.push(w)) : (a = (u - r) / (h - r), f = (u - s) / (h - s), p.push(1), p.push(-1), p.push(2), p.push(1), p.push(a), p.push(-1), p.push(0), p.push(1), p.push(f)) : (d = (u - h) / (s - h), y = (u - r) / (s - r), p.push(0), p.push(-1), p.push(1), p.push(0), p.push(d), p.push(-1), p.push(2), p.push(0), p.push(y)) : 3 !== q && (p.push(0), p.push(1), p.push(2)), p;
    },
    computeBarycentricCoordinates: function computeBarycentricCoordinates(u, e, s, h, r, p, i, n, t) {
      if (!v(u)) throw new O("x is required.");
      if (!v(e)) throw new O("y is required.");
      if (!v(s)) throw new O("x1 is required.");
      if (!v(h)) throw new O("y1 is required.");
      if (!v(r)) throw new O("x2 is required.");
      if (!v(p)) throw new O("y2 is required.");
      if (!v(i)) throw new O("x3 is required.");
      if (!v(n)) throw new O("y3 is required.");
      var f = s - i,
          o = i - r,
          w = p - n,
          d = h - n,
          y = 1 / (w * f + o * d),
          a = e - n,
          q = u - i,
          c = (w * q + o * a) * y,
          m = (-d * q + f * a) * y,
          x = 1 - c - m;
      return v(t) ? (t.x = c, t.y = m, t.z = x, t) : new b(c, m, x);
    },
    computeLineSegmentLineSegmentIntersection: function computeLineSegmentLineSegmentIntersection(u, e, s, h, r, p, i, n, t) {
      y.typeOf.number("x00", u), y.typeOf.number("y00", e), y.typeOf.number("x01", s), y.typeOf.number("y01", h), y.typeOf.number("x10", r), y.typeOf.number("y10", p), y.typeOf.number("x11", i), y.typeOf.number("y11", n);
      var f = (n - p) * (s - u) - (i - r) * (h - e);

      if (0 != f) {
        var o = ((i - r) * (e - p) - (n - p) * (u - r)) / f,
            w = ((s - u) * (e - p) - (h - e) * (u - r)) / f;
        return 0 <= o && o <= 1 && 0 <= w && w <= 1 ? (v(t) || (t = new d()), t.x = u + o * (s - u), t.y = e + o * (h - e), t) : void 0;
      }
    }
  };
  return u;
});