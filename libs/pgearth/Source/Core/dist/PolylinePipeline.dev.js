"use strict";

define(["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./EllipsoidGeodesic", "./EllipsoidRhumbLine", "./IntersectionTests", "./isArray", "./Math", "./Matrix4", "./Plane"], function (T, y, P, C, A, S, r, E, m, R, D, w, b) {
  "use strict";

  var G = {
    numberOfPoints: function numberOfPoints(r, e, a) {
      var n = T.distance(r, e);
      return Math.ceil(n / a);
    },
    numberOfPointsRhumbLine: function numberOfPointsRhumbLine(r, e, a) {
      var n = Math.pow(r.longitude - e.longitude, 2) + Math.pow(r.latitude - e.latitude, 2);
      return Math.ceil(Math.sqrt(n / (a * a)));
    }
  },
      o = new y();

  G.extractHeights = function (r, e) {
    for (var a = r.length, n = new Array(a), t = 0; t < a; t++) {
      var i = r[t];
      n[t] = e.cartesianToCartographic(i, o).height;
    }

    return n;
  };

  var N = new w(),
      I = new T(),
      k = new T(),
      _ = new b(T.UNIT_X, 0),
      M = new T(),
      O = new b(T.UNIT_X, 0),
      B = new T(),
      L = new T(),
      U = [];

  function x(r, e, a) {
    var n = U;

    if (n.length = r, e === a) {
      for (i = 0; i < r; i++) {
        n[i] = e;
      }

      return n;
    }

    for (var t = (a - e) / r, i = 0; i < r; i++) {
      var o = e + i * t;
      n[i] = o;
    }

    return n;
  }

  var q = new y(),
      z = new y(),
      V = new T(),
      X = new T(),
      W = new T(),
      Y = new r(),
      H = new E();
  G.wrapLongitude = function (r, e) {
    var a = [],
        n = [];

    if (C(r) && 0 < r.length) {
      e = P(e, w.IDENTITY);
      var t = w.inverseTransformation(e, N),
          i = w.multiplyByPoint(t, T.ZERO, I),
          o = T.normalize(w.multiplyByPointAsVector(t, T.UNIT_Y, k), k),
          c = b.fromPointNormal(i, o, _),
          s = T.normalize(w.multiplyByPointAsVector(t, T.UNIT_X, M), M),
          u = b.fromPointNormal(i, s, O),
          l = 1;
      a.push(T.clone(r[0]));

      for (var h = a[0], g = r.length, f = 1; f < g; ++f) {
        var p,
            v,
            d = r[f];
        (b.getPointDistance(u, h) < 0 || b.getPointDistance(u, d) < 0) && (p = m.lineSegmentPlane(h, d, c, B), C(p) && (v = T.multiplyByScalar(o, 5e-9, L), b.getPointDistance(c, h) < 0 && T.negate(v, v), a.push(T.add(p, v, new T())), n.push(l + 1), T.negate(v, v), a.push(T.add(p, v, new T())), l = 1)), a.push(T.clone(r[f])), l++, h = d;
      }

      n.push(l);
    }

    return {
      positions: a,
      lengths: n
    };
  }, G.generateArc = function (r) {
    C(r) || (r = {});
    var e = r.positions;
    if (!C(e)) throw new A("options.positions is required.");
    var a = e.length,
        n = P(r.ellipsoid, S.WGS84),
        t = P(r.height, 0),
        i = R(t);
    if (a < 1) return [];

    if (1 === a) {
      var o,
          c = n.scaleToGeodeticSurface(e[0], X);
      return 0 !== (t = i ? t[0] : t) && (o = n.geodeticSurfaceNormal(c, V), T.multiplyByScalar(o, t, o), T.add(c, o, c)), [c.x, c.y, c.z];
    }

    var s,
        u = r.minDistance;
    C(u) || (s = P(r.granularity, D.RADIANS_PER_DEGREE), u = D.chordLength(s, n.maximumRadius));

    for (var l = 0, h = 0; h < a - 1; h++) {
      l += G.numberOfPoints(e[h], e[h + 1], u);
    }

    var g = 3 * (l + 1),
        f = new Array(g),
        p = 0;

    for (h = 0; h < a - 1; h++) {
      p = function (r, e, a, n, t, i, o, c) {
        var s = n.scaleToGeodeticSurface(r, X),
            u = n.scaleToGeodeticSurface(e, W),
            l = G.numberOfPoints(r, e, a),
            h = n.cartesianToCartographic(s, q),
            g = n.cartesianToCartographic(u, z),
            f = x(l, t, i);
        Y.setEndPoints(h, g);
        var p = Y.surfaceDistance / l,
            v = c;
        h.height = t;
        var d = n.cartographicToCartesian(h, V);
        T.pack(d, o, v), v += 3;

        for (var m = 1; m < l; m++) {
          var w = Y.interpolateUsingSurfaceDistance(m * p, z);
          w.height = f[m], d = n.cartographicToCartesian(w, V), T.pack(d, o, v), v += 3;
        }

        return v;
      }(e[h], e[h + 1], u, n, i ? t[h] : t, i ? t[h + 1] : t, f, p);
    }

    U.length = 0;
    var v = e[a - 1],
        d = n.cartesianToCartographic(v, q);
    d.height = i ? t[a - 1] : t;
    var m = n.cartographicToCartesian(d, V);
    return T.pack(m, f, g - 3), f;
  };
  var Z = new y(),
      j = new y();
  return G.generateRhumbArc = function (r) {
    C(r) || (r = {});
    var e = r.positions;
    if (!C(e)) throw new A("options.positions is required.");
    var a = e.length,
        n = P(r.ellipsoid, S.WGS84),
        t = P(r.height, 0),
        i = R(t);
    if (a < 1) return [];

    if (1 === a) {
      var o,
          c = n.scaleToGeodeticSurface(e[0], X);
      return 0 !== (t = i ? t[0] : t) && (o = n.geodeticSurfaceNormal(c, V), T.multiplyByScalar(o, t, o), T.add(c, o, c)), [c.x, c.y, c.z];
    }

    for (var s, u = P(r.granularity, D.RADIANS_PER_DEGREE), l = 0, h = n.cartesianToCartographic(e[0], Z), g = 0; g < a - 1; g++) {
      s = n.cartesianToCartographic(e[g + 1], j), l += G.numberOfPointsRhumbLine(h, s, u), h = y.clone(s, Z);
    }

    var f = 3 * (l + 1),
        p = new Array(f),
        v = 0;

    for (g = 0; g < a - 1; g++) {
      v = function (r, e, a, n, t, i, o, c) {
        var s = n.scaleToGeodeticSurface(r, X),
            u = n.scaleToGeodeticSurface(e, W),
            l = n.cartesianToCartographic(s, q),
            h = n.cartesianToCartographic(u, z),
            g = G.numberOfPointsRhumbLine(l, h, a),
            f = x(g, t, i);
        H.ellipsoid.equals(n) || (H = new E(void 0, void 0, n)), H.setEndPoints(l, h);
        var p = H.surfaceDistance / g,
            v = c;
        l.height = t;
        var d = n.cartographicToCartesian(l, V);
        T.pack(d, o, v), v += 3;

        for (var m = 1; m < g; m++) {
          var w = H.interpolateUsingSurfaceDistance(m * p, z);
          w.height = f[m], d = n.cartographicToCartesian(w, V), T.pack(d, o, v), v += 3;
        }

        return v;
      }(e[g], e[g + 1], u, n, i ? t[g] : t, i ? t[g + 1] : t, p, v);
    }

    U.length = 0;
    var d = e[a - 1],
        m = n.cartesianToCartographic(d, q);
    m.height = i ? t[a - 1] : t;
    var w = n.cartographicToCartesian(m, V);
    return T.pack(w, p, f - 3), p;
  }, G.generateCartesianArc = function (r) {
    for (var e = G.generateArc(r), a = e.length / 3, n = new Array(a), t = 0; t < a; t++) {
      n[t] = T.unpack(e, 3 * t);
    }

    return n;
  }, G.generateCartesianRhumbArc = function (r) {
    for (var e = G.generateRhumbArc(r), a = e.length / 3, n = new Array(a), t = 0; t < a; t++) {
      n[t] = T.unpack(e, 3 * t);
    }

    return n;
  }, G;
});