"use strict";

define(["./Cartesian2", "./Cartesian3", "./Cartesian4", "./Cartographic", "./CornerType", "./EllipsoidTangentPlane", "./Math", "./Matrix3", "./Matrix4", "./PolylinePipeline", "./Quaternion", "./Transforms"], function (x, j, e, r, F, P, L, S, T, Q, g, z) {
  "use strict";

  var U = [new j(), new j()],
      _ = new j(),
      q = new j(),
      Y = new j(),
      Z = new j(),
      k = new j(),
      H = new j(),
      J = new j(),
      K = new j(),
      W = new j(),
      X = new j(),
      p = new j(),
      $ = {},
      ee = new r();

  function re(e, r, n, a) {
    var t = e[0],
        o = e[1],
        i = j.angleBetween(t, o),
        l = Math.ceil(i / a),
        c = new Array(l);

    if (r === n) {
      for (s = 0; s < l; s++) {
        c[s] = r;
      }

      return c.push(n), c;
    }

    for (var u = (n - r) / l, s = 1; s < l; s++) {
      var y = r + s * u;
      c[s] = y;
    }

    return c[0] = r, c.push(n), c;
  }

  var A = new j(),
      E = new j();
  var b = new j(-1, 0, 0),
      D = new T(),
      M = new T(),
      N = new S(),
      O = S.IDENTITY.clone(),
      C = new j(),
      G = new e(),
      V = new j();

  function ne(e, r, n, a, t, o, i, l) {
    var c = C,
        u = G;
    D = z.eastNorthUpToFixedFrame(e, t, D), c = T.multiplyByPointAsVector(D, b, c), c = j.normalize(c, c);
    var s,
        y,
        d,
        m,
        w,
        f,
        g,
        p = (s = c, y = r, m = new P(d = e, t), w = m.projectPointOntoPlane(j.add(d, s, A), A), f = m.projectPointOntoPlane(j.add(d, y, E), E), g = x.angleBetween(w, f), 0 <= f.x * w.y - f.y * w.x ? -g : g);
    N = S.fromRotationZ(p, N), V.z = o, D = T.multiplyTransformation(D, T.fromRotationTranslation(N, V, M), D);
    var h = O;
    h[0] = i;

    for (var v = 0; v < l; v++) {
      for (var B = 0; B < n.length; B += 3) {
        u = j.fromArray(n, B, u), u = S.multiplyByVector(h, u, u), u = T.multiplyByPoint(D, u, u), a.push(u.x, u.y, u.z);
      }
    }

    return a;
  }

  var c = new j();

  function ae(e, r, n, a, t, o, i) {
    for (var l = 0; l < e.length; l += 3) {
      a = ne(j.fromArray(e, l, c), r, n, a, t, o[l / 3], i, 1);
    }

    return a;
  }

  function te(e, r) {
    for (var n = e.length, a = new Array(3 * n), t = 0, o = r.x + r.width / 2, i = r.y + r.height / 2, l = 0; l < n; l++) {
      a[t++] = e[l].x - o, a[t++] = 0, a[t++] = e[l].y - i;
    }

    return a;
  }

  var h = new g(),
      v = new j(),
      B = new S();

  function oe(e, r, n, a, t, o, i, l, c, u) {
    var s,
        y = j.angleBetween(j.subtract(r, e, X), j.subtract(n, e, p)),
        d = a === F.BEVELED ? 0 : Math.ceil(y / L.toRadians(5)),
        m = t ? S.fromQuaternion(g.fromAxisAngle(j.negate(e, X), y / (d + 1), h), B) : S.fromQuaternion(g.fromAxisAngle(e, y / (d + 1), h), B);
    if (r = j.clone(r, v), 0 < d) for (var w = u ? 2 : 1, f = 0; f < d; f++) {
      r = S.multiplyByVector(m, r, r), s = j.subtract(r, e, X), s = j.normalize(s, s), t || (s = j.negate(s, s)), i = ne(o.scaleToGeodeticSurface(r, p), s, l, i, o, c, 1, w);
    } else s = j.subtract(r, e, X), s = j.normalize(s, s), t || (s = j.negate(s, s)), i = ne(o.scaleToGeodeticSurface(r, p), s, l, i, o, c, 1, 1), n = j.clone(n, v), s = j.subtract(n, e, X), s = j.normalize(s, s), t || (s = j.negate(s, s)), i = ne(o.scaleToGeodeticSurface(n, p), s, l, i, o, c, 1, 1);
    return i;
  }

  $.removeDuplicatesFromShape = function (e) {
    for (var r = e.length, n = [], a = r - 1, t = 0; t < r; a = t++) {
      var o = e[a],
          i = e[t];
      x.equals(o, i) || n.push(i);
    }

    return n;
  }, $.angleIsGreaterThanPi = function (e, r, n, a) {
    var t = new P(n, a),
        o = t.projectPointOntoPlane(j.add(n, e, A), A),
        i = t.projectPointOntoPlane(j.add(n, r, E), E);
    return 0 <= i.x * o.y - i.y * o.x;
  };
  var ie = new j(),
      le = new j();
  return $.computePositions = function (e, r, n, a, t) {
    var o = a._ellipsoid,
        i = function (e, r) {
      for (var n = new Array(e.length), a = 0; a < e.length; a++) {
        var t = e[a];
        ee = r.cartesianToCartographic(t, ee), n[a] = ee.height, e[a] = r.scaleToGeodeticSurface(t, t);
      }

      return n;
    }(e, o),
        l = a._granularity,
        c = a._cornerType,
        u = (t ? function (e, r) {
      var n = e.length,
          a = new Array(6 * n),
          t = 0,
          o = r.x + r.width / 2,
          i = r.y + r.height / 2,
          l = e[0];
      a[t++] = l.x - o, a[t++] = 0, a[t++] = l.y - i;

      for (var c = 1; c < n; c++) {
        var u = (l = e[c]).x - o,
            s = l.y - i;
        a[t++] = u, a[t++] = 0, a[t++] = s, a[t++] = u, a[t++] = 0, a[t++] = s;
      }

      return l = e[0], a[t++] = l.x - o, a[t++] = 0, a[t++] = l.y - i, a;
    } : te)(r, n),
        s = t ? te(r, n) : void 0,
        y = n.height / 2,
        d = n.width / 2,
        m = e.length,
        w = [],
        f = t ? [] : void 0,
        g = _,
        p = q,
        h = Y,
        v = Z,
        B = k,
        x = H,
        P = J,
        S = K,
        T = W,
        z = e[0],
        A = e[1],
        v = o.geodeticSurfaceNormal(z, v);

    g = j.subtract(A, z, g), g = j.normalize(g, g), S = j.cross(v, g, S), S = j.normalize(S, S);
    var E,
        b = i[0],
        D = i[1];
    t && (f = ne(z, S, s, f, o, b + y, 1, 1)), T = j.clone(z, T), z = A, p = j.negate(g, p);

    for (var M = 1; M < m - 1; M++) {
      var N = t ? 2 : 1,
          A = e[M + 1],
          g = j.subtract(A, z, g);
      g = j.normalize(g, g), h = j.add(g, p, h), h = j.normalize(h, h), v = o.geodeticSurfaceNormal(z, v);
      var O = j.multiplyByScalar(v, j.dot(g, v), ie);
      j.subtract(g, O, O), j.normalize(O, O);
      var C,
          G,
          V = j.multiplyByScalar(v, j.dot(p, v), le);
      j.subtract(p, V, V), j.normalize(V, V), !L.equalsEpsilon(Math.abs(j.dot(O, V)), 1, L.EPSILON7) ? (h = j.cross(h, v, h), h = j.cross(v, h, h), h = j.normalize(h, h), C = 1 / Math.max(.25, j.magnitude(j.cross(h, p, X))), (G = $.angleIsGreaterThanPi(g, p, z, o)) ? (B = j.add(z, j.multiplyByScalar(h, C * d, h), B), x = j.add(B, j.multiplyByScalar(S, d, x), x), U[0] = j.clone(T, U[0]), U[1] = j.clone(x, U[1]), E = re(U, b + y, D + y, l), w = ae(Q.generateArc({
        positions: U,
        granularity: l,
        ellipsoid: o
      }), S, u, w, o, E, 1), S = j.cross(v, g, S), S = j.normalize(S, S), P = j.add(B, j.multiplyByScalar(S, d, P), P), c === F.ROUNDED || c === F.BEVELED ? oe(B, x, P, c, G, o, w, u, D + y, t) : w = ne(z, h = j.negate(h, h), u, w, o, D + y, C, N)) : (B = j.add(z, j.multiplyByScalar(h, C * d, h), B), x = j.add(B, j.multiplyByScalar(S, -d, x), x), U[0] = j.clone(T, U[0]), U[1] = j.clone(x, U[1]), E = re(U, b + y, D + y, l), w = ae(Q.generateArc({
        positions: U,
        granularity: l,
        ellipsoid: o
      }), S, u, w, o, E, 1), S = j.cross(v, g, S), S = j.normalize(S, S), P = j.add(B, j.multiplyByScalar(S, -d, P), P), c === F.ROUNDED || c === F.BEVELED ? oe(B, x, P, c, G, o, w, u, D + y, t) : w = ne(z, h, u, w, o, D + y, C, N)), T = j.clone(P, T), p = j.negate(g, p)) : (w = ne(T, S, u, w, o, b + y, 1, 1), T = z), b = D, D = i[M + 1], z = A;
    }

    U[0] = j.clone(T, U[0]), U[1] = j.clone(z, U[1]), E = re(U, b + y, D + y, l), w = ae(Q.generateArc({
      positions: U,
      granularity: l,
      ellipsoid: o
    }), S, u, w, o, E, 1), t && (f = ne(z, S, s, f, o, D + y, 1, 1)), m = w.length;
    var I = t ? m + f.length : m,
        R = new Float64Array(I);
    return R.set(w), t && R.set(f, m), R;
  }, $;
});