"use strict";

define(["./Cartographic", "./defined", "./EllipsoidTangentPlane", "./Math", "./PolygonPipeline", "./PolylinePipeline", "./WindingOrder"], function (m, y, w, O, C, E, b) {
  "use strict";

  var e = {};
  var F = new m(),
      H = new m();

  function L(e, t, i, r) {
    var n = t.length;

    if (!(n < 2)) {
      var o = y(r),
          a = y(i),
          h = !0,
          s = new Array(n),
          g = new Array(n),
          l = new Array(n),
          p = t[0];
      s[0] = p;
      var v = e.cartesianToCartographic(p, F);
      a && (v.height = i[0]), h = h && v.height <= 0, g[0] = v.height, l[0] = o ? r[0] : 0;

      for (var d, u, c = 1, f = 1; f < n; ++f) {
        var P = t[f],
            A = e.cartesianToCartographic(P, H);
        a && (A.height = i[f]), h = h && A.height <= 0, d = v, u = A, O.equalsEpsilon(d.latitude, u.latitude, O.EPSILON14) && O.equalsEpsilon(d.longitude, u.longitude, O.EPSILON14) ? v.height < A.height && (g[c - 1] = A.height) : (s[c] = P, g[c] = A.height, l[c] = o ? r[f] : 0, m.clone(A, v), ++c);
      }

      if (!(h || c < 2)) return s.length = c, g.length = c, l.length = c, {
        positions: s,
        topHeights: g,
        bottomHeights: l
      };
    }
  }

  var I = new Array(2),
      S = new Array(2),
      T = {
    positions: void 0,
    height: void 0,
    granularity: void 0,
    ellipsoid: void 0
  };
  return e.computePositions = function (e, t, i, r, n, o) {
    var a,
        h = L(e, t, i, r);

    if (y(h)) {
      t = h.positions, i = h.topHeights, r = h.bottomHeights, 3 <= t.length && (a = w.fromPoints(t, e).projectPointsOntoPlane(t), C.computeWindingOrder2D(a) === b.CLOCKWISE && (t.reverse(), i.reverse(), r.reverse()));
      var s,
          g,
          l = t.length,
          p = l - 2,
          v = O.chordLength(n, e.maximumRadius),
          d = T;

      if (d.minDistance = v, d.ellipsoid = e, o) {
        for (var u = 0, c = 0; c < l - 1; c++) {
          u += E.numberOfPoints(t[c], t[c + 1], v) + 1;
        }

        s = new Float64Array(3 * u), g = new Float64Array(3 * u);
        var f = I,
            P = S;
        d.positions = f, d.height = P;
        var A = 0;

        for (c = 0; c < l - 1; c++) {
          f[0] = t[c], f[1] = t[c + 1], P[0] = i[c], P[1] = i[c + 1];
          var m = E.generateArc(d);
          s.set(m, A), P[0] = r[c], P[1] = r[c + 1], g.set(E.generateArc(d), A), A += m.length;
        }
      } else d.positions = t, d.height = i, s = new Float64Array(E.generateArc(d)), d.height = r, g = new Float64Array(E.generateArc(d));

      return {
        bottomPositions: g,
        topPositions: s,
        numCorners: p
      };
    }
  }, e;
});