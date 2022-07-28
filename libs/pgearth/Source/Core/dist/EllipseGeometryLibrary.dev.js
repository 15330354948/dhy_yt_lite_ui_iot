"use strict";

define(["./Cartesian3", "./Math", "./Matrix3", "./Quaternion"], function (W, S, h, m) {
  "use strict";

  var r = {},
      f = new W(),
      _ = new W(),
      O = new m(),
      d = new h();

  function B(r, a, e, t, i, n, o, l, y, s) {
    var c = r + a;
    W.multiplyByScalar(t, Math.cos(c), f), W.multiplyByScalar(e, Math.sin(c), _), W.add(f, _, f);
    var u = Math.cos(r);
    u *= u;
    var x = Math.sin(r);
    x *= x;
    var z = n / Math.sqrt(o * u + i * x) / l;
    return m.fromAxisAngle(f, z, O), h.fromQuaternion(O, d), h.multiplyByVector(d, y, s), W.normalize(s, s), W.multiplyByScalar(s, l, s), s;
  }

  var H = new W(),
      N = new W(),
      Q = new W(),
      v = new W();

  r.raisePositionsToHeight = function (r, a, e) {
    for (var t = a.ellipsoid, i = a.height, n = a.extrudedHeight, o = e ? r.length / 3 * 2 : r.length / 3, l = new Float64Array(3 * o), y = r.length, s = e ? y : 0, c = 0; c < y; c += 3) {
      var u = c + 1,
          x = c + 2,
          z = W.fromArray(r, c, H);
      t.scaleToGeodeticSurface(z, z);
      var h = W.clone(z, N),
          m = t.geodeticSurfaceNormal(z, v),
          f = W.multiplyByScalar(m, i, Q);
      W.add(z, f, z), e && (W.multiplyByScalar(m, n, f), W.add(h, f, h), l[c + s] = h.x, l[u + s] = h.y, l[x + s] = h.z), l[c] = z.x, l[u] = z.y, l[x] = z.z;
    }

    return l;
  };

  var b = new W(),
      j = new W(),
      q = new W();
  return r.computeEllipsePositions = function (r, a, e) {
    var t = r.semiMinorAxis,
        i = r.semiMajorAxis,
        n = r.rotation,
        o = r.center,
        l = 8 * r.granularity,
        y = t * t,
        s = i * i,
        c = i * t,
        u = W.magnitude(o),
        x = W.normalize(o, b),
        z = W.cross(W.UNIT_Z, o, j),
        z = W.normalize(z, z),
        h = W.cross(x, z, q),
        m = 1 + Math.ceil(S.PI_OVER_TWO / l),
        f = S.PI_OVER_TWO / (m - 1),
        _ = S.PI_OVER_TWO - m * f;

    _ < 0 && (m -= Math.ceil(Math.abs(_) / f));
    var O,
        d,
        v,
        w,
        M,
        P = a ? new Array(3 * (m * (m + 2) * 2)) : void 0,
        p = 0,
        I = H,
        T = N,
        g = 4 * m * 3,
        E = g - 1,
        V = 0,
        A = e ? new Array(g) : void 0,
        I = B(_ = S.PI_OVER_TWO, n, h, z, y, c, s, u, x, I);

    for (a && (P[p++] = I.x, P[p++] = I.y, P[p++] = I.z), e && (A[E--] = I.z, A[E--] = I.y, A[E--] = I.x), _ = S.PI_OVER_TWO - f, O = 1; O < m + 1; ++O) {
      if (I = B(_, n, h, z, y, c, s, u, x, I), T = B(Math.PI - _, n, h, z, y, c, s, u, x, T), a) {
        for (P[p++] = I.x, P[p++] = I.y, P[p++] = I.z, v = 2 * O + 2, d = 1; d < v - 1; ++d) {
          w = d / (v - 1), M = W.lerp(I, T, w, Q), P[p++] = M.x, P[p++] = M.y, P[p++] = M.z;
        }

        P[p++] = T.x, P[p++] = T.y, P[p++] = T.z;
      }

      e && (A[E--] = I.z, A[E--] = I.y, A[E--] = I.x, A[V++] = T.x, A[V++] = T.y, A[V++] = T.z), _ = S.PI_OVER_TWO - (O + 1) * f;
    }

    for (O = m; 1 < O; --O) {
      if (I = B(-(_ = S.PI_OVER_TWO - (O - 1) * f), n, h, z, y, c, s, u, x, I), T = B(_ + Math.PI, n, h, z, y, c, s, u, x, T), a) {
        for (P[p++] = I.x, P[p++] = I.y, P[p++] = I.z, v = 2 * (O - 1) + 2, d = 1; d < v - 1; ++d) {
          w = d / (v - 1), M = W.lerp(I, T, w, Q), P[p++] = M.x, P[p++] = M.y, P[p++] = M.z;
        }

        P[p++] = T.x, P[p++] = T.y, P[p++] = T.z;
      }

      e && (A[E--] = I.z, A[E--] = I.y, A[E--] = I.x, A[V++] = T.x, A[V++] = T.y, A[V++] = T.z);
    }

    I = B(-(_ = S.PI_OVER_TWO), n, h, z, y, c, s, u, x, I);
    var R = {};
    return a && (P[p++] = I.x, P[p++] = I.y, P[p++] = I.z, R.positions = P, R.numPts = m), e && (A[E--] = I.z, A[E--] = I.y, A[E--] = I.x, R.outerPositions = A), R;
  }, r;
});