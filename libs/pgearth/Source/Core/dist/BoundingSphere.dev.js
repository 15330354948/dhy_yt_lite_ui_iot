"use strict";

define(["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./Ellipsoid", "./GeographicProjection", "./Intersect", "./Interval", "./Math", "./Matrix3", "./Matrix4", "./Rectangle"], function (D, e, T, Z, I, c, r, o, u, n, i, t, l) {
  "use strict";

  function N(e, r) {
    this.center = D.clone(Z(e, D.ZERO)), this.radius = Z(r, 0);
  }

  var k = new D(),
      V = new D(),
      W = new D(),
      G = new D(),
      A = new D(),
      H = new D(),
      U = new D(),
      L = new D(),
      _ = new D(),
      F = new D(),
      J = new D(),
      K = new D(),
      a = 4 / 3 * n.PI;

  N.fromPoints = function (e, r) {
    if (I(r) || (r = new N()), !I(e) || 0 === e.length) return r.center = D.clone(D.ZERO, r.center), r.radius = 0, r;

    for (var n = D.clone(e[0], U), t = D.clone(n, k), a = D.clone(n, V), c = D.clone(n, W), o = D.clone(n, G), u = D.clone(n, A), i = D.clone(n, H), d = e.length, s = 1; s < d; s++) {
      D.clone(e[s], n);
      var l = n.x,
          f = n.y,
          y = n.z;
      l < t.x && D.clone(n, t), l > o.x && D.clone(n, o), f < a.y && D.clone(n, a), f > u.y && D.clone(n, u), y < c.z && D.clone(n, c), y > i.z && D.clone(n, i);
    }

    var p = D.magnitudeSquared(D.subtract(o, t, L)),
        m = D.magnitudeSquared(D.subtract(u, a, L)),
        v = D.magnitudeSquared(D.subtract(i, c, L)),
        x = t,
        g = o,
        h = p;
    h < m && (h = m, x = a, g = u), h < v && (h = v, x = c, g = i);
    var z = _;
    z.x = .5 * (x.x + g.x), z.y = .5 * (x.y + g.y), z.z = .5 * (x.z + g.z);
    var w = D.magnitudeSquared(D.subtract(g, z, L)),
        b = Math.sqrt(w),
        O = F;
    O.x = t.x, O.y = a.y, O.z = c.z;
    var S = J;
    S.x = o.x, S.y = u.y, S.z = i.z;
    var q = D.midpoint(O, S, K),
        j = 0;

    for (s = 0; s < d; s++) {
      D.clone(e[s], n);
      var E = D.magnitude(D.subtract(n, q, L));
      j < E && (j = E);
      var R,
          P,
          B = D.magnitudeSquared(D.subtract(n, z, L));
      w < B && (w = (b = .5 * (b + (R = Math.sqrt(B)))) * b, P = R - b, z.x = (b * z.x + P * n.x) / R, z.y = (b * z.y + P * n.y) / R, z.z = (b * z.z + P * n.z) / R);
    }

    return b < j ? (D.clone(z, r.center), r.radius = b) : (D.clone(q, r.center), r.radius = j), r;
  };

  var f = new r(),
      y = new D(),
      p = new D(),
      m = new e(),
      v = new e();
  N.fromRectangle2D = function (e, r, n) {
    return N.fromRectangleWithHeights2D(e, r, 0, 0, n);
  }, N.fromRectangleWithHeights2D = function (e, r, n, t, a) {
    if (I(a) || (a = new N()), !I(e)) return a.center = D.clone(D.ZERO, a.center), a.radius = 0, a;
    r = Z(r, f), l.southwest(e, m), m.height = n, l.northeast(e, v), v.height = t;
    var c = r.project(m, y),
        o = r.project(v, p),
        u = o.x - c.x,
        i = o.y - c.y,
        d = o.z - c.z;
    a.radius = .5 * Math.sqrt(u * u + i * i + d * d);
    var s = a.center;
    return s.x = c.x + .5 * u, s.y = c.y + .5 * i, s.z = c.z + .5 * d, a;
  };
  var d = [];
  N.fromRectangle3D = function (e, r, n, t) {
    if (r = Z(r, c.WGS84), n = Z(n, 0), I(t) || (t = new N()), !I(e)) return t.center = D.clone(D.ZERO, t.center), t.radius = 0, t;
    var a = l.subsample(e, r, n, d);
    return N.fromPoints(a, t);
  }, N.fromVertices = function (e, r, n, t) {
    if (I(t) || (t = new N()), !I(e) || 0 === e.length) return t.center = D.clone(D.ZERO, t.center), t.radius = 0, t;
    r = Z(r, D.ZERO), n = Z(n, 3), T.typeOf.number.greaterThanOrEquals("stride", n, 3);
    var a = U;
    a.x = e[0] + r.x, a.y = e[1] + r.y, a.z = e[2] + r.z;

    for (var c = D.clone(a, k), o = D.clone(a, V), u = D.clone(a, W), i = D.clone(a, G), d = D.clone(a, A), s = D.clone(a, H), l = e.length, f = 0; f < l; f += n) {
      var y = e[f] + r.x,
          p = e[f + 1] + r.y,
          m = e[f + 2] + r.z;
      a.x = y, a.y = p, a.z = m, y < c.x && D.clone(a, c), y > i.x && D.clone(a, i), p < o.y && D.clone(a, o), p > d.y && D.clone(a, d), m < u.z && D.clone(a, u), m > s.z && D.clone(a, s);
    }

    var v = D.magnitudeSquared(D.subtract(i, c, L)),
        x = D.magnitudeSquared(D.subtract(d, o, L)),
        g = D.magnitudeSquared(D.subtract(s, u, L)),
        h = c,
        z = i,
        w = v;
    w < x && (w = x, h = o, z = d), w < g && (w = g, h = u, z = s);
    var b = _;
    b.x = .5 * (h.x + z.x), b.y = .5 * (h.y + z.y), b.z = .5 * (h.z + z.z);
    var O = D.magnitudeSquared(D.subtract(z, b, L)),
        S = Math.sqrt(O),
        q = F;
    q.x = c.x, q.y = o.y, q.z = u.z;
    var j = J;
    j.x = i.x, j.y = d.y, j.z = s.z;
    var E = D.midpoint(q, j, K),
        R = 0;

    for (f = 0; f < l; f += n) {
      a.x = e[f] + r.x, a.y = e[f + 1] + r.y, a.z = e[f + 2] + r.z;
      var P = D.magnitude(D.subtract(a, E, L));
      R < P && (R = P);
      var B,
          M,
          C = D.magnitudeSquared(D.subtract(a, b, L));
      O < C && (O = (S = .5 * (S + (B = Math.sqrt(C)))) * S, M = B - S, b.x = (S * b.x + M * a.x) / B, b.y = (S * b.y + M * a.y) / B, b.z = (S * b.z + M * a.z) / B);
    }

    return S < R ? (D.clone(b, t.center), t.radius = S) : (D.clone(E, t.center), t.radius = R), t;
  }, N.fromEncodedCartesianVertices = function (e, r, n) {
    if (I(n) || (n = new N()), !I(e) || !I(r) || e.length !== r.length || 0 === e.length) return n.center = D.clone(D.ZERO, n.center), n.radius = 0, n;
    var t = U;
    t.x = e[0] + r[0], t.y = e[1] + r[1], t.z = e[2] + r[2];

    for (var a = D.clone(t, k), c = D.clone(t, V), o = D.clone(t, W), u = D.clone(t, G), i = D.clone(t, A), d = D.clone(t, H), s = e.length, l = 0; l < s; l += 3) {
      var f = e[l] + r[l],
          y = e[l + 1] + r[l + 1],
          p = e[l + 2] + r[l + 2];
      t.x = f, t.y = y, t.z = p, f < a.x && D.clone(t, a), f > u.x && D.clone(t, u), y < c.y && D.clone(t, c), y > i.y && D.clone(t, i), p < o.z && D.clone(t, o), p > d.z && D.clone(t, d);
    }

    var m = D.magnitudeSquared(D.subtract(u, a, L)),
        v = D.magnitudeSquared(D.subtract(i, c, L)),
        x = D.magnitudeSquared(D.subtract(d, o, L)),
        g = a,
        h = u,
        z = m;
    z < v && (z = v, g = c, h = i), z < x && (z = x, g = o, h = d);
    var w = _;
    w.x = .5 * (g.x + h.x), w.y = .5 * (g.y + h.y), w.z = .5 * (g.z + h.z);
    var b = D.magnitudeSquared(D.subtract(h, w, L)),
        O = Math.sqrt(b),
        S = F;
    S.x = a.x, S.y = c.y, S.z = o.z;
    var q = J;
    q.x = u.x, q.y = i.y, q.z = d.z;
    var j = D.midpoint(S, q, K),
        E = 0;

    for (l = 0; l < s; l += 3) {
      t.x = e[l] + r[l], t.y = e[l + 1] + r[l + 1], t.z = e[l + 2] + r[l + 2];
      var R = D.magnitude(D.subtract(t, j, L));
      E < R && (E = R);
      var P,
          B,
          M = D.magnitudeSquared(D.subtract(t, w, L));
      b < M && (b = (O = .5 * (O + (P = Math.sqrt(M)))) * O, B = P - O, w.x = (O * w.x + B * t.x) / P, w.y = (O * w.y + B * t.y) / P, w.z = (O * w.z + B * t.z) / P);
    }

    return O < E ? (D.clone(w, n.center), n.radius = O) : (D.clone(j, n.center), n.radius = E), n;
  }, N.fromCornerPoints = function (e, r, n) {
    T.typeOf.object("corner", e), T.typeOf.object("oppositeCorner", r), I(n) || (n = new N());
    var t = D.midpoint(e, r, n.center);
    return n.radius = D.distance(t, r), n;
  }, N.fromEllipsoid = function (e, r) {
    return T.typeOf.object("ellipsoid", e), I(r) || (r = new N()), D.clone(D.ZERO, r.center), r.radius = e.maximumRadius, r;
  };
  var s = new D();

  N.fromBoundingSpheres = function (e, r) {
    if (I(r) || (r = new N()), !I(e) || 0 === e.length) return r.center = D.clone(D.ZERO, r.center), r.radius = 0, r;
    var n = e.length;
    if (1 === n) return N.clone(e[0], r);
    if (2 === n) return N.union(e[0], e[1], r);

    for (var t = [], a = 0; a < n; a++) {
      t.push(e[a].center);
    }

    var c = (r = N.fromPoints(t, r)).center,
        o = r.radius;

    for (a = 0; a < n; a++) {
      var u = e[a],
          o = Math.max(o, D.distance(c, u.center, s) + u.radius);
    }

    return r.radius = o, r;
  };

  var x = new D(),
      g = new D(),
      h = new D();
  N.fromOrientedBoundingBox = function (e, r) {
    T.defined("orientedBoundingBox", e), I(r) || (r = new N());
    var n = e.halfAxes,
        t = i.getColumn(n, 0, x),
        a = i.getColumn(n, 1, g),
        c = i.getColumn(n, 2, h);
    return D.add(t, a, t), D.add(t, c, t), r.center = D.clone(e.center, r.center), r.radius = D.magnitude(t), r;
  }, N.clone = function (e, r) {
    if (I(e)) return I(r) ? (r.center = D.clone(e.center, r.center), r.radius = e.radius, r) : new N(e.center, e.radius);
  }, N.packedLength = 4, N.pack = function (e, r, n) {
    T.typeOf.object("value", e), T.defined("array", r), n = Z(n, 0);
    var t = e.center;
    return r[n++] = t.x, r[n++] = t.y, r[n++] = t.z, r[n] = e.radius, r;
  }, N.unpack = function (e, r, n) {
    T.defined("array", e), r = Z(r, 0), I(n) || (n = new N());
    var t = n.center;
    return t.x = e[r++], t.y = e[r++], t.z = e[r++], n.radius = e[r], n;
  };
  var z = new D(),
      w = new D();

  N.union = function (e, r, n) {
    T.typeOf.object("left", e), T.typeOf.object("right", r), I(n) || (n = new N());
    var t = e.center,
        a = e.radius,
        c = r.center,
        o = r.radius,
        u = D.subtract(c, t, z),
        i = D.magnitude(u);
    if (i + o <= a) return e.clone(n), n;
    if (i + a <= o) return r.clone(n), n;
    var d = .5 * (a + i + o),
        s = D.multiplyByScalar(u, (d - a) / i, w);
    return D.add(s, t, s), D.clone(s, n.center), n.radius = d, n;
  };

  var b = new D();
  N.expand = function (e, r, n) {
    T.typeOf.object("sphere", e), T.typeOf.object("point", r), n = N.clone(e, n);
    var t = D.magnitude(D.subtract(r, n.center, b));
    return t > n.radius && (n.radius = t), n;
  }, N.intersectPlane = function (e, r) {
    T.typeOf.object("sphere", e), T.typeOf.object("plane", r);
    var n = e.center,
        t = e.radius,
        a = r.normal,
        c = D.dot(a, n) + r.distance;
    return c < -t ? o.OUTSIDE : c < t ? o.INTERSECTING : o.INSIDE;
  }, N.transform = function (e, r, n) {
    return T.typeOf.object("sphere", e), T.typeOf.object("transform", r), I(n) || (n = new N()), n.center = t.multiplyByPoint(r, e.center, n.center), n.radius = t.getMaximumScale(r) * e.radius, n;
  };
  var O = new D();
  N.distanceSquaredTo = function (e, r) {
    T.typeOf.object("sphere", e), T.typeOf.object("cartesian", r);
    var n = D.subtract(e.center, r, O);
    return D.magnitudeSquared(n) - e.radius * e.radius;
  }, N.transformWithoutScale = function (e, r, n) {
    return T.typeOf.object("sphere", e), T.typeOf.object("transform", r), I(n) || (n = new N()), n.center = t.multiplyByPoint(r, e.center, n.center), n.radius = e.radius, n;
  };
  var S = new D();

  N.computePlaneDistances = function (e, r, n, t) {
    T.typeOf.object("sphere", e), T.typeOf.object("position", r), T.typeOf.object("direction", n), I(t) || (t = new u());
    var a = D.subtract(e.center, r, S),
        c = D.dot(n, a);
    return t.start = c - e.radius, t.stop = c + e.radius, t;
  };

  for (var q = new D(), j = new D(), E = new D(), R = new D(), P = new D(), B = new e(), M = new Array(8), C = 0; C < 8; ++C) {
    M[C] = new D();
  }

  var Q = new r();
  return N.projectTo2D = function (e, r, n) {
    T.typeOf.object("sphere", e);
    var t = (r = Z(r, Q)).ellipsoid,
        a = e.center,
        c = e.radius,
        o = t.geodeticSurfaceNormal(a, q),
        u = D.cross(D.UNIT_Z, o, j);
    D.normalize(u, u);
    var i = D.cross(o, u, E);
    D.normalize(i, i), D.multiplyByScalar(o, c, o), D.multiplyByScalar(i, c, i), D.multiplyByScalar(u, c, u);
    var d = D.negate(i, P),
        s = D.negate(u, R),
        l = M,
        f = l[0];
    D.add(o, i, f), D.add(f, u, f), f = l[1], D.add(o, i, f), D.add(f, s, f), f = l[2], D.add(o, d, f), D.add(f, s, f), f = l[3], D.add(o, d, f), D.add(f, u, f), D.negate(o, o), f = l[4], D.add(o, i, f), D.add(f, u, f), f = l[5], D.add(o, i, f), D.add(f, s, f), f = l[6], D.add(o, d, f), D.add(f, s, f), f = l[7], D.add(o, d, f), D.add(f, u, f);

    for (var y = l.length, p = 0; p < y; ++p) {
      var m = l[p];
      D.add(a, m, m);
      var v = t.cartesianToCartographic(m, B);
      r.project(v, m);
    }

    var x = (a = (n = N.fromPoints(l, n)).center).x,
        g = a.y,
        h = a.z;
    return a.x = h, a.y = x, a.z = g, n;
  }, N.isOccluded = function (e, r) {
    return T.typeOf.object("sphere", e), T.typeOf.object("occluder", r), !r.isBoundingSphereVisible(e);
  }, N.equals = function (e, r) {
    return e === r || I(e) && I(r) && D.equals(e.center, r.center) && e.radius === r.radius;
  }, N.prototype.intersectPlane = function (e) {
    return N.intersectPlane(this, e);
  }, N.prototype.distanceSquaredTo = function (e) {
    return N.distanceSquaredTo(this, e);
  }, N.prototype.computePlaneDistances = function (e, r, n) {
    return N.computePlaneDistances(this, e, r, n);
  }, N.prototype.isOccluded = function (e) {
    return N.isOccluded(this, e);
  }, N.prototype.equals = function (e) {
    return N.equals(this, e);
  }, N.prototype.clone = function (e) {
    return N.clone(this, e);
  }, N.prototype.volume = function () {
    var e = this.radius;
    return a * e * e * e;
  }, N.prototype.empty = function () {
    return this.radius <= 0;
  }, N;
});