"use strict";

define(["../ThirdParty/earcut-2.1.1", "./Cartesian2", "./Cartesian3", "./Cartographic", "./Check", "./ComponentDatatype", "./defaultValue", "./defined", "./Ellipsoid", "./EllipsoidRhumbLine", "./Geometry", "./GeometryAttribute", "./Math", "./PrimitiveType", "./WindingOrder"], function (n, i, G, e, P, q, I, N, s, U, W, _, F, j, t) {
  "use strict";

  var h = new G(),
      p = new G(),
      a = {
    computeArea2D: function computeArea2D(e) {
      P.defined("positions", e), P.typeOf.number.greaterThanOrEquals("positions.length", e.length, 3);

      for (var t = e.length, a = 0, n = t - 1, i = 0; i < t; n = i++) {
        var r = e[n],
            o = e[i];
        a += r.x * o.y - o.x * r.y;
      }

      return .5 * a;
    },
    computeWindingOrder2D: function computeWindingOrder2D(e) {
      return 0 < a.computeArea2D(e) ? t.COUNTER_CLOCKWISE : t.CLOCKWISE;
    },
    triangulate: function triangulate(e, t) {
      P.defined("positions", e);
      var a = i.packArray(e);
      return n(a, t, 2);
    }
  },
      k = new G(),
      K = new G(),
      H = new G(),
      C = new G(),
      z = new G(),
      L = new G(),
      V = new G();

  a.computeSubdivision = function (e, t, a, n) {
    n = I(n, F.RADIANS_PER_DEGREE), P.typeOf.object("ellipsoid", e), P.defined("positions", t), P.defined("indices", a), P.typeOf.number.greaterThanOrEquals("indices.length", a.length, 3), P.typeOf.number.equals("indices.length % 3", "0", a.length % 3, 0), P.typeOf.number.greaterThan("granularity", n, 0);

    for (var i = a.slice(0), r = t.length, o = new Array(3 * r), u = 0, s = 0; s < r; s++) {
      var h = t[s];
      o[u++] = h.x, o[u++] = h.y, o[u++] = h.z;
    }

    for (var p = [], l = {}, d = e.maximumRadius, m = F.chordLength(n, d), c = m * m; 0 < i.length;) {
      var g,
          y,
          f = i.pop(),
          v = i.pop(),
          E = i.pop(),
          w = G.fromArray(o, 3 * E, k),
          b = G.fromArray(o, 3 * v, K),
          x = G.fromArray(o, 3 * f, H),
          A = G.multiplyByScalar(G.normalize(w, C), d, C),
          S = G.multiplyByScalar(G.normalize(b, z), d, z),
          O = G.multiplyByScalar(G.normalize(x, L), d, L),
          T = G.magnitudeSquared(G.subtract(A, S, V)),
          R = G.magnitudeSquared(G.subtract(S, O, V)),
          D = G.magnitudeSquared(G.subtract(O, A, V)),
          M = Math.max(T, R, D);
      c < M ? T === M ? (s = l[g = Math.min(E, v) + " " + Math.max(E, v)], N(s) || (y = G.add(w, b, V), G.multiplyByScalar(y, .5, y), o.push(y.x, y.y, y.z), s = o.length / 3 - 1, l[g] = s), i.push(E, s, f), i.push(s, v, f)) : R === M ? (s = l[g = Math.min(v, f) + " " + Math.max(v, f)], N(s) || (y = G.add(b, x, V), G.multiplyByScalar(y, .5, y), o.push(y.x, y.y, y.z), s = o.length / 3 - 1, l[g] = s), i.push(v, s, E), i.push(s, f, E)) : D === M && (s = l[g = Math.min(f, E) + " " + Math.max(f, E)], N(s) || (y = G.add(x, w, V), G.multiplyByScalar(y, .5, y), o.push(y.x, y.y, y.z), s = o.length / 3 - 1, l[g] = s), i.push(f, s, v), i.push(s, E, v)) : (p.push(E), p.push(v), p.push(f));
    }

    return new W({
      attributes: {
        position: new _({
          componentDatatype: q.DOUBLE,
          componentsPerAttribute: 3,
          values: o
        })
      },
      indices: p,
      primitiveType: j.TRIANGLES
    });
  };

  var J = new e(),
      Q = new e(),
      X = new e(),
      Y = new e();
  return a.computeRhumbLineSubdivision = function (e, t, a, n) {
    n = I(n, F.RADIANS_PER_DEGREE), P.typeOf.object("ellipsoid", e), P.defined("positions", t), P.defined("indices", a), P.typeOf.number.greaterThanOrEquals("indices.length", a.length, 3), P.typeOf.number.equals("indices.length % 3", "0", a.length % 3, 0), P.typeOf.number.greaterThan("granularity", n, 0);

    for (var i = a.slice(0), r = t.length, o = new Array(3 * r), u = 0, s = 0; s < r; s++) {
      var h = t[s];
      o[u++] = h.x, o[u++] = h.y, o[u++] = h.z;
    }

    for (var p = [], l = {}, d = e.maximumRadius, m = F.chordLength(n, d), c = new U(void 0, void 0, e), g = new U(void 0, void 0, e), y = new U(void 0, void 0, e); 0 < i.length;) {
      var f = i.pop(),
          v = i.pop(),
          E = i.pop(),
          w = G.fromArray(o, 3 * E, k),
          b = G.fromArray(o, 3 * v, K),
          x = G.fromArray(o, 3 * f, H),
          A = e.cartesianToCartographic(w, J),
          S = e.cartesianToCartographic(b, Q),
          O = e.cartesianToCartographic(x, X);
      c.setEndPoints(A, S);
      var T = c.surfaceDistance;
      g.setEndPoints(S, O);
      var R = g.surfaceDistance;
      y.setEndPoints(O, A);
      var D,
          M,
          C,
          z,
          L = y.surfaceDistance,
          B = Math.max(T, R, L);
      m < B ? T === B ? (s = l[D = Math.min(E, v) + " " + Math.max(E, v)], N(s) || (M = c.interpolateUsingFraction(.5, Y), C = .5 * (A.height + S.height), z = G.fromRadians(M.longitude, M.latitude, C, e, V), o.push(z.x, z.y, z.z), s = o.length / 3 - 1, l[D] = s), i.push(E, s, f), i.push(s, v, f)) : R === B ? (s = l[D = Math.min(v, f) + " " + Math.max(v, f)], N(s) || (M = g.interpolateUsingFraction(.5, Y), C = .5 * (S.height + O.height), z = G.fromRadians(M.longitude, M.latitude, C, e, V), o.push(z.x, z.y, z.z), s = o.length / 3 - 1, l[D] = s), i.push(v, s, E), i.push(s, f, E)) : L === B && (s = l[D = Math.min(f, E) + " " + Math.max(f, E)], N(s) || (M = y.interpolateUsingFraction(.5, Y), C = .5 * (O.height + A.height), z = G.fromRadians(M.longitude, M.latitude, C, e, V), o.push(z.x, z.y, z.z), s = o.length / 3 - 1, l[D] = s), i.push(f, s, v), i.push(s, E, v)) : (p.push(E), p.push(v), p.push(f));
    }

    return new W({
      attributes: {
        position: new _({
          componentDatatype: q.DOUBLE,
          componentsPerAttribute: 3,
          values: o
        })
      },
      indices: p,
      primitiveType: j.TRIANGLES
    });
  }, a.scaleToGeodeticHeight = function (e, t, a, n) {
    a = I(a, s.WGS84);
    var i = h,
        r = p;
    if (t = I(t, 0), n = I(n, !0), N(e)) for (var o = e.length, u = 0; u < o; u += 3) {
      G.fromArray(e, u, r), n && (r = a.scaleToGeodeticSurface(r, r)), 0 !== t && (i = a.geodeticSurfaceNormal(r, i), G.multiplyByScalar(i, t, i), G.add(r, i, r)), e[u] = r.x, e[u + 1] = r.y, e[u + 2] = r.z;
    }
    return e;
  }, a;
});