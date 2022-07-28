"use strict";

define(["./Cartesian3", "./CornerType", "./defined", "./Math", "./Matrix3", "./PolylinePipeline", "./PolylineVolumeGeometryLibrary", "./Quaternion"], function (C, G, i, I, d, q, j, m) {
  "use strict";

  var e = {},
      k = new C(),
      p = new C(),
      g = new C(),
      h = new C(),
      F = [new C(), new C()],
      H = new C(),
      J = new C(),
      K = new C(),
      W = new C(),
      X = new C(),
      Y = new C(),
      Z = new C(),
      $ = new C(),
      _ = new C(),
      ee = new C(),
      f = new m(),
      w = new d();

  function re(e, r, a, n, t) {
    var l,
        o = C.angleBetween(C.subtract(r, e, k), C.subtract(a, e, p)),
        i = n === G.BEVELED ? 1 : Math.ceil(o / I.toRadians(5)) + 1,
        s = 3 * i,
        u = new Array(s);
    u[s - 3] = a.x, u[s - 2] = a.y, u[s - 1] = a.z, l = t ? d.fromQuaternion(m.fromAxisAngle(C.negate(e, k), o / i, f), w) : d.fromQuaternion(m.fromAxisAngle(e, o / i, f), w);
    var y = 0;
    r = C.clone(r, k);

    for (var c = 0; c < i; c++) {
      r = d.multiplyByVector(l, r, r), u[y++] = r.x, u[y++] = r.y, u[y++] = r.z;
    }

    return u;
  }

  function ae(e, r, a, n) {
    var t = k;
    return [(t = (n || (r = C.negate(r, r)), C.add(e, r, t))).x, t.y, t.z, a.x, a.y, a.z];
  }

  function ne(e, r, a, n) {
    for (var t = new Array(e.length), l = new Array(e.length), o = C.multiplyByScalar(r, a, k), i = C.negate(o, p), s = 0, u = e.length - 1, y = 0; y < e.length; y += 3) {
      var c = C.fromArray(e, y, g),
          d = C.add(c, i, h);
      t[s++] = d.x, t[s++] = d.y, t[s++] = d.z;
      var m = C.add(c, o, h);
      l[u--] = m.z, l[u--] = m.y, l[u--] = m.x;
    }

    return n.push(t, l), n;
  }

  e.addAttribute = function (e, r, a, n) {
    var t = r.x,
        l = r.y,
        o = r.z;
    i(a) && (e[a] = t, e[a + 1] = l, e[a + 2] = o), i(n) && (e[n] = o, e[n - 1] = l, e[n - 2] = t);
  };

  var te = new C(),
      le = new C();
  return e.computePositions = function (e) {
    var r = e.granularity,
        a = e.positions,
        n = e.ellipsoid,
        t = e.width / 2,
        l = e.cornerType,
        o = e.saveAttributes,
        i = H,
        s = J,
        u = K,
        y = W,
        c = X,
        d = Y,
        m = Z,
        p = $,
        g = _,
        h = ee,
        f = [],
        w = o ? [] : void 0,
        z = o ? [] : void 0,
        x = a[0],
        v = a[1],
        s = C.normalize(C.subtract(v, x, s), s),
        i = n.geodeticSurfaceNormal(x, i),
        y = C.normalize(C.cross(i, s, y), y);
    o && (w.push(y.x, y.y, y.z), z.push(i.x, i.y, i.z)), m = C.clone(x, m), x = v, u = C.negate(s, u);

    for (var A, B, E, S, D, P, b, N, O, R = [], L = a.length, M = 1; M < L - 1; M++) {
      i = n.geodeticSurfaceNormal(x, i), v = a[M + 1], s = C.normalize(C.subtract(v, x, s), s), c = C.normalize(C.add(s, u, c), c);
      var U = C.multiplyByScalar(i, C.dot(s, i), te);
      C.subtract(s, U, U), C.normalize(U, U);
      var V,
          Q,
          T = C.multiplyByScalar(i, C.dot(u, i), le);
      C.subtract(u, T, T), C.normalize(T, T), I.equalsEpsilon(Math.abs(C.dot(U, T)), 1, I.EPSILON7) || (c = C.cross(c, i, c), c = C.cross(i, c, c), c = C.normalize(c, c), V = t / Math.max(.25, C.magnitude(C.cross(c, u, k))), Q = j.angleIsGreaterThanPi(s, u, x, n), c = C.multiplyByScalar(c, V, c), Q ? (p = C.add(x, c, p), h = C.add(p, C.multiplyByScalar(y, t, h), h), g = C.add(p, C.multiplyByScalar(y, 2 * t, g), g), F[0] = C.clone(m, F[0]), F[1] = C.clone(h, F[1]), f = ne(q.generateArc({
        positions: F,
        granularity: r,
        ellipsoid: n
      }), y, t, f), o && (w.push(y.x, y.y, y.z), z.push(i.x, i.y, i.z)), d = C.clone(g, d), y = C.normalize(C.cross(i, s, y), y), g = C.add(p, C.multiplyByScalar(y, 2 * t, g), g), m = C.add(p, C.multiplyByScalar(y, t, m), m), l === G.ROUNDED || l === G.BEVELED ? R.push({
        leftPositions: re(p, d, g, l, Q)
      }) : R.push({
        leftPositions: ae(x, C.negate(c, c), g, Q)
      })) : (g = C.add(x, c, g), h = C.add(g, C.negate(C.multiplyByScalar(y, t, h), h), h), p = C.add(g, C.negate(C.multiplyByScalar(y, 2 * t, p), p), p), F[0] = C.clone(m, F[0]), F[1] = C.clone(h, F[1]), f = ne(q.generateArc({
        positions: F,
        granularity: r,
        ellipsoid: n
      }), y, t, f), o && (w.push(y.x, y.y, y.z), z.push(i.x, i.y, i.z)), d = C.clone(p, d), y = C.normalize(C.cross(i, s, y), y), p = C.add(g, C.negate(C.multiplyByScalar(y, 2 * t, p), p), p), m = C.add(g, C.negate(C.multiplyByScalar(y, t, m), m), m), l === G.ROUNDED || l === G.BEVELED ? R.push({
        rightPositions: re(g, d, p, l, Q)
      }) : R.push({
        rightPositions: ae(x, c, p, Q)
      })), u = C.negate(s, u)), x = v;
    }

    return i = n.geodeticSurfaceNormal(x, i), F[0] = C.clone(m, F[0]), F[1] = C.clone(x, F[1]), f = ne(q.generateArc({
      positions: F,
      granularity: r,
      ellipsoid: n
    }), y, t, f), o && (w.push(y.x, y.y, y.z), z.push(i.x, i.y, i.z)), l === G.ROUNDED && (E = H, S = J, D = K, P = (B = f)[1], S = C.fromArray(B[1], P.length - 3, S), D = C.fromArray(B[0], 0, D), b = re(E = C.midpoint(S, D, E), S, D, G.ROUNDED, !1), N = B.length - 1, O = B[N - 1], P = B[N], S = C.fromArray(O, O.length - 3, S), D = C.fromArray(P, 0, D), A = [b, re(E = C.midpoint(S, D, E), S, D, G.ROUNDED, !1)]), {
      positions: f,
      corners: R,
      lefts: w,
      normals: z,
      endPositions: A
    };
  }, e;
});