"use strict";

define(["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./DeveloperError", "./Interval", "./Math", "./Matrix3", "./QuadraticRealPolynomial", "./QuarticRealPolynomial", "./Ray"], function (T, e, g, E, C, p, U, W, B, V, r) {
  "use strict";

  var f = {
    rayPlane: function rayPlane(e, r, i) {
      if (!E(e)) throw new C("ray is required.");
      if (!E(r)) throw new C("plane is required.");
      E(i) || (i = new T());
      var n = e.origin,
          t = e.direction,
          a = r.normal,
          o = T.dot(a, t);

      if (!(Math.abs(o) < U.EPSILON15)) {
        var s = (-r.distance - T.dot(a, n)) / o;
        if (!(s < 0)) return i = T.multiplyByScalar(t, s, i), T.add(n, i, i);
      }
    }
  },
      v = new T(),
      y = new T(),
      S = new T(),
      q = new T(),
      O = new T();
  f.rayTriangleParametric = function (e, r, i, n, t) {
    if (!E(e)) throw new C("ray is required.");
    if (!E(r)) throw new C("p0 is required.");
    if (!E(i)) throw new C("p1 is required.");
    if (!E(n)) throw new C("p2 is required.");
    t = g(t, !1);
    var a,
        o,
        s,
        u = e.origin,
        l = e.direction,
        d = T.subtract(i, r, v),
        w = T.subtract(n, r, y),
        f = T.cross(l, w, S),
        c = T.dot(d, f);

    if (t) {
      if (c < U.EPSILON6) return;
      if (p = T.subtract(u, r, q), (h = T.dot(p, f)) < 0 || c < h) return;
      if (a = T.cross(p, d, O), (o = T.dot(l, a)) < 0 || c < h + o) return;
      s = T.dot(w, a) / c;
    } else {
      if (Math.abs(c) < U.EPSILON6) return;
      var h,
          m = 1 / c,
          p = T.subtract(u, r, q);
      if ((h = T.dot(p, f) * m) < 0 || 1 < h) return;
      if (a = T.cross(p, d, O), (o = T.dot(l, a) * m) < 0 || 1 < h + o) return;
      s = T.dot(w, a) * m;
    }

    return s;
  }, f.rayTriangle = function (e, r, i, n, t, a) {
    var o = f.rayTriangleParametric(e, r, i, n, t);
    if (E(o) && !(o < 0)) return E(a) || (a = new T()), T.multiplyByScalar(e.direction, o, a), T.add(e.origin, a, a);
  };
  var l = new r();

  f.lineSegmentTriangle = function (e, r, i, n, t, a, o) {
    if (!E(e)) throw new C("v0 is required.");
    if (!E(r)) throw new C("v1 is required.");
    if (!E(i)) throw new C("p0 is required.");
    if (!E(n)) throw new C("p1 is required.");
    if (!E(t)) throw new C("p2 is required.");
    var s = l;
    T.clone(e, s.origin), T.subtract(r, e, s.direction), T.normalize(s.direction, s.direction);
    var u = f.rayTriangleParametric(s, i, n, t, a);
    if (!(!E(u) || u < 0 || u > T.distance(e, r))) return E(o) || (o = new T()), T.multiplyByScalar(s.direction, u, o), T.add(s.origin, o, o);
  };

  var d = {
    root0: 0,
    root1: 0
  };

  function s(e, r, i) {
    E(i) || (i = new p());

    var n = e.origin,
        t = e.direction,
        a = r.center,
        o = r.radius * r.radius,
        s = T.subtract(n, a, S),
        u = function (e, r, i, n) {
      var t = r * r - 4 * e * i;

      if (!(t < 0)) {
        if (0 < t) {
          var a = 1 / (2 * e),
              o = Math.sqrt(t),
              s = (-r + o) * a,
              u = (-r - o) * a;
          return s < u ? (n.root0 = s, n.root1 = u) : (n.root0 = u, n.root1 = s), n;
        }

        var l = -r / (2 * e);
        if (0 != l) return n.root0 = n.root1 = l, n;
      }
    }(T.dot(t, t), 2 * T.dot(t, s), T.magnitudeSquared(s) - o, d);

    if (E(u)) return i.start = u.root0, i.stop = u.root1, i;
  }

  f.raySphere = function (e, r, i) {
    if (!E(e)) throw new C("ray is required.");
    if (!E(r)) throw new C("sphere is required.");
    if (i = s(e, r, i), E(i) && !(i.stop < 0)) return i.start = Math.max(i.start, 0), i;
  };

  var u = new r();

  f.lineSegmentSphere = function (e, r, i, n) {
    if (!E(e)) throw new C("p0 is required.");
    if (!E(r)) throw new C("p1 is required.");
    if (!E(i)) throw new C("sphere is required.");
    var t = u;
    T.clone(e, t.origin);
    var a = T.subtract(r, e, t.direction),
        o = T.magnitude(a);
    if (T.normalize(a, a), n = s(t, i, n), !(!E(n) || n.stop < 0 || n.start > o)) return n.start = Math.max(n.start, 0), n.stop = Math.min(n.stop, o), n;
  };

  var M = new T(),
      P = new T();

  function A(e, r, i) {
    var n = e + r;
    return U.sign(e) !== U.sign(r) && Math.abs(n / Math.max(Math.abs(e), Math.abs(r))) < i ? 0 : n;
  }

  f.rayEllipsoid = function (e, r) {
    if (!E(e)) throw new C("ray is required.");
    if (!E(r)) throw new C("ellipsoid is required.");
    var i,
        n,
        t = r.oneOverRadii,
        a = T.multiplyComponents(t, e.origin, M),
        o = T.multiplyComponents(t, e.direction, P),
        s = T.magnitudeSquared(a),
        u = T.dot(a, o);

    if (1 < s) {
      if (0 <= u) return;
      var l,
          d,
          w = u * u,
          f = s - 1;
      if (w < (d = (l = T.magnitudeSquared(o)) * f)) return;

      if (d < w) {
        i = u * u - d;
        var c = (n = -u + Math.sqrt(i)) / l,
            h = f / n;
        return c < h ? new p(c, h) : {
          start: h,
          stop: c
        };
      }

      var m = Math.sqrt(f / l);
      return new p(m, m);
    }

    return s < 1 ? (f = s - 1, i = u * u - (d = (l = T.magnitudeSquared(o)) * f), n = -u + Math.sqrt(i), new p(0, n / l)) : u < 0 ? (l = T.magnitudeSquared(o), new p(0, -u / l)) : void 0;
  };

  var I = new T(),
      x = new T(),
      z = new T(),
      Q = new T(),
      Z = new T(),
      D = new W(),
      F = new W(),
      G = new W(),
      Y = new W(),
      _ = new W(),
      j = new W(),
      k = new W(),
      H = new T(),
      J = new T(),
      K = new e();

  f.grazingAltitudeLocation = function (e, r) {
    if (!E(e)) throw new C("ray is required.");
    if (!E(r)) throw new C("ellipsoid is required.");
    var i = e.origin,
        n = e.direction;

    if (!T.equals(i, T.ZERO)) {
      var t = r.geodeticSurfaceNormal(i, I);
      if (0 <= T.dot(n, t)) return i;
    }

    var a = E(this.rayEllipsoid(e, r)),
        o = r.transformPositionToScaledSpace(n, I),
        s = T.normalize(o, o),
        u = T.mostOrthogonalAxis(o, Q),
        l = T.normalize(T.cross(u, s, x), x),
        d = T.normalize(T.cross(s, l, z), z),
        w = D;
    w[0] = s.x, w[1] = s.y, w[2] = s.z, w[3] = l.x, w[4] = l.y, w[5] = l.z, w[6] = d.x, w[7] = d.y, w[8] = d.z;
    var f = W.transpose(w, F),
        c = W.fromScale(r.radii, G),
        h = W.fromScale(r.oneOverRadii, Y),
        m = _;
    m[0] = 0, m[1] = -n.z, m[2] = n.y, m[3] = n.z, m[4] = 0, m[5] = -n.x, m[6] = -n.y, m[7] = n.x, m[8] = 0;

    var p,
        g = W.multiply(W.multiply(f, h, j), m, j),
        v = W.multiply(W.multiply(g, c, k), w, k),
        y = W.multiplyByVector(g, i, Z),
        S = function (e, r, i, n, t) {
      var a,
          o = n * n,
          s = t * t,
          u = (e[W.COLUMN1ROW1] - e[W.COLUMN2ROW2]) * s,
          l = t * (n * A(e[W.COLUMN1ROW0], e[W.COLUMN0ROW1], U.EPSILON15) + r.y),
          d = e[W.COLUMN0ROW0] * o + e[W.COLUMN2ROW2] * s + n * r.x + i,
          w = s * A(e[W.COLUMN2ROW1], e[W.COLUMN1ROW2], U.EPSILON15),
          f = t * (n * A(e[W.COLUMN2ROW0], e[W.COLUMN0ROW2]) + r.z),
          c = [];

      if (0 == f && 0 == w) {
        if (0 === (a = B.computeRealRoots(u, l, d)).length) return c;
        var h,
            m,
            p = a[0],
            g = Math.sqrt(Math.max(1 - p * p, 0));
        return c.push(new T(n, t * p, t * -g)), c.push(new T(n, t * p, t * g)), 2 === a.length && (h = a[1], m = Math.sqrt(Math.max(1 - h * h, 0)), c.push(new T(n, t * h, t * -m)), c.push(new T(n, t * h, t * m))), c;
      }

      var v = f * f,
          y = w * w,
          S = f * w,
          q = u * u + y,
          O = 2 * (l * u + S),
          M = 2 * d * u + l * l - y + v,
          P = 2 * (d * l - S),
          N = d * d - v;
      if (0 == q && 0 == O && 0 == M && 0 == P) return c;
      var L = (a = V.computeRealRoots(q, O, M, P, N)).length;
      if (0 === L) return c;

      for (var R = 0; R < L; ++R) {
        var b = a[R],
            E = b * b,
            C = Math.max(1 - E, 0),
            I = Math.sqrt(C),
            x = U.sign(u) === U.sign(d) ? A(u * E + d, l * b, U.EPSILON12) : U.sign(d) === U.sign(l * b) ? A(u * E, l * b + d, U.EPSILON12) : A(u * E + l * b, d, U.EPSILON12),
            z = x * A(w * b, f, U.EPSILON15);
        z < 0 ? c.push(new T(n, t * b, t * I)) : 0 < z ? c.push(new T(n, t * b, t * -I)) : 0 !== I ? (c.push(new T(n, t * b, t * -I)), c.push(new T(n, t * b, t * I)), ++R) : c.push(new T(n, t * b, t * I));
      }

      return c;
    }(v, T.negate(y, I), 0, 0, 1),
        q = S.length;

    if (0 < q) {
      for (var O = T.clone(T.ZERO, J), M = Number.NEGATIVE_INFINITY, P = 0; P < q; ++P) {
        p = W.multiplyByVector(c, W.multiplyByVector(w, S[P], H), H);
        var N = T.normalize(T.subtract(p, i, Q), Q),
            L = T.dot(N, n);
        M < L && (M = L, O = T.clone(p, O));
      }

      var R = r.cartesianToCartographic(O, K),
          M = U.clamp(M, 0, 1),
          b = T.magnitude(T.subtract(O, i, Q)) * Math.sqrt(1 - M * M);
      return b = a ? -b : b, R.height = b, r.cartographicToCartesian(R, new T());
    }
  };

  var w = new T();
  return f.lineSegmentPlane = function (e, r, i, n) {
    if (!E(e)) throw new C("endPoint0 is required.");
    if (!E(r)) throw new C("endPoint1 is required.");
    if (!E(i)) throw new C("plane is required.");
    E(n) || (n = new T());
    var t = T.subtract(r, e, w),
        a = i.normal,
        o = T.dot(a, t);

    if (!(Math.abs(o) < U.EPSILON6)) {
      var s = T.dot(a, e),
          u = -(i.distance + s) / o;
      if (!(u < 0 || 1 < u)) return T.multiplyByScalar(t, u, n), T.add(e, n, n), n;
    }
  }, f.trianglePlaneIntersection = function (e, r, i, n) {
    if (!(E(e) && E(r) && E(i) && E(n))) throw new C("p0, p1, p2, and plane are required.");
    var t,
        a,
        o = n.normal,
        s = n.distance,
        u = T.dot(o, e) + s < 0,
        l = T.dot(o, r) + s < 0,
        d = T.dot(o, i) + s < 0,
        w = 0;

    if (w += u ? 1 : 0, w += l ? 1 : 0, 1 != (w += d ? 1 : 0) && 2 != w || (t = new T(), a = new T()), 1 == w) {
      if (u) return f.lineSegmentPlane(e, r, n, t), f.lineSegmentPlane(e, i, n, a), {
        positions: [e, r, i, t, a],
        indices: [0, 3, 4, 1, 2, 4, 1, 4, 3]
      };
      if (l) return f.lineSegmentPlane(r, i, n, t), f.lineSegmentPlane(r, e, n, a), {
        positions: [e, r, i, t, a],
        indices: [1, 3, 4, 2, 0, 4, 2, 4, 3]
      };
      if (d) return f.lineSegmentPlane(i, e, n, t), f.lineSegmentPlane(i, r, n, a), {
        positions: [e, r, i, t, a],
        indices: [2, 3, 4, 0, 1, 4, 0, 4, 3]
      };
    } else if (2 == w) {
      if (!u) return f.lineSegmentPlane(r, e, n, t), f.lineSegmentPlane(i, e, n, a), {
        positions: [e, r, i, t, a],
        indices: [1, 2, 4, 1, 4, 3, 0, 3, 4]
      };
      if (!l) return f.lineSegmentPlane(i, r, n, t), f.lineSegmentPlane(e, r, n, a), {
        positions: [e, r, i, t, a],
        indices: [2, 0, 4, 2, 4, 3, 1, 3, 4]
      };
      if (!d) return f.lineSegmentPlane(e, i, n, t), f.lineSegmentPlane(r, i, n, a), {
        positions: [e, r, i, t, a],
        indices: [0, 1, 4, 0, 4, 3, 2, 3, 4]
      };
    }
  }, f;
});