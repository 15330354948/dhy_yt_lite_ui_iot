"use strict";

define(["./BoundingSphere", "./Cartesian2", "./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./EllipsoidTangentPlane", "./Intersect", "./Interval", "./Math", "./Matrix3", "./Plane", "./Rectangle"], function (a, e, E, t, r, O, L, v, C, N, d, m, q, I, P, R) {
  "use strict";

  function S(e, t) {
    this.center = E.clone(O(e, E.ZERO)), this.halfAxes = I.clone(O(t, I.ZERO));
  }

  S.packedLength = E.packedLength + I.packedLength, S.pack = function (e, t, n) {
    return r.typeOf.object("value", e), r.defined("array", t), n = O(n, 0), E.pack(e.center, t, n), I.pack(e.halfAxes, t, n + E.packedLength), t;
  }, S.unpack = function (e, t, n) {
    return r.defined("array", e), t = O(t, 0), L(n) || (n = new S()), E.unpack(e, t, n.center), I.unpack(e, t + E.packedLength, n.halfAxes), n;
  };
  var z = new E(),
      T = new E(),
      U = new E(),
      k = new E(),
      B = new E(),
      D = new E(),
      V = new I(),
      W = {
    unitary: new I(),
    diagonal: new I()
  };

  S.fromPoints = function (e, t) {
    if (L(t) || (t = new S()), !L(e) || 0 === e.length) return t.halfAxes = I.ZERO, t.center = E.ZERO, t;

    for (var n = e.length, a = E.clone(e[0], z), r = 1; r < n; r++) {
      E.add(a, e[r], a);
    }

    var i = 1 / n;
    E.multiplyByScalar(a, i, a);
    var o,
        u = 0,
        c = 0,
        l = 0,
        d = 0,
        s = 0,
        h = 0;

    for (r = 0; r < n; r++) {
      u += (o = E.subtract(e[r], a, T)).x * o.x, c += o.x * o.y, l += o.x * o.z, d += o.y * o.y, s += o.y * o.z, h += o.z * o.z;
    }

    u *= i, c *= i, l *= i, d *= i, s *= i, h *= i;
    var w = V;
    w[0] = u, w[1] = c, w[2] = l, w[3] = c, w[4] = d, w[5] = s, w[6] = l, w[7] = s, w[8] = h;
    var m = I.computeEigenDecomposition(w, W),
        f = I.clone(m.unitary, t.halfAxes),
        g = I.getColumn(f, 0, k),
        x = I.getColumn(f, 1, B),
        p = I.getColumn(f, 2, D),
        y = -Number.MAX_VALUE,
        M = -Number.MAX_VALUE,
        b = -Number.MAX_VALUE,
        A = Number.MAX_VALUE,
        O = Number.MAX_VALUE,
        v = Number.MAX_VALUE;

    for (r = 0; r < n; r++) {
      o = e[r], y = Math.max(E.dot(g, o), y), M = Math.max(E.dot(x, o), M), b = Math.max(E.dot(p, o), b), A = Math.min(E.dot(g, o), A), O = Math.min(E.dot(x, o), O), v = Math.min(E.dot(p, o), v);
    }

    g = E.multiplyByScalar(g, .5 * (A + y), g), x = E.multiplyByScalar(x, .5 * (O + M), x), p = E.multiplyByScalar(p, .5 * (v + b), p);
    var C = E.add(g, x, t.center);
    E.add(C, p, C);
    var N = U;
    return N.x = y - A, N.y = M - O, N.z = b - v, E.multiplyByScalar(N, .5, N), I.multiplyByScale(t.halfAxes, N, t.halfAxes), t;
  };

  var _ = new E(),
      X = new E();

  var Z = new t(),
      G = new E(),
      Y = [new t(), new t(), new t(), new t(), new t(), new t(), new t(), new t()],
      j = [new E(), new E(), new E(), new E(), new E(), new E(), new E(), new E()],
      F = [new e(), new e(), new e(), new e(), new e(), new e(), new e(), new e()];
  S.fromRectangle = function (e, t, n, a, r) {
    if (!L(e)) throw new v("rectangle is required");
    if (e.width < 0 || e.width > q.TWO_PI) throw new v("Rectangle width must be between 0 and 2*pi");
    if (e.height < 0 || e.height > q.PI) throw new v("Rectangle height must be between 0 and pi");
    if (L(a) && !q.equalsEpsilon(a.radii.x, a.radii.y, q.EPSILON15)) throw new v("Ellipsoid must be an ellipsoid of revolution (radii.x == radii.y)");
    t = O(t, 0), n = O(n, 0), a = O(a, C.WGS84);
    var i = R.center(e, Z),
        o = a.cartographicToCartesian(i, G),
        u = new N(o, a),
        c = u.plane,
        l = Y[0],
        d = Y[1],
        s = Y[2],
        h = Y[3],
        w = Y[4],
        m = Y[5],
        f = Y[6],
        g = Y[7],
        x = i.longitude,
        p = e.south < 0 && 0 < e.north ? 0 : i.latitude;
    f.latitude = m.latitude = w.latitude = e.south, g.latitude = h.latitude = p, l.latitude = d.latitude = s.latitude = e.north, f.longitude = g.longitude = l.longitude = e.west, m.longitude = d.longitude = x, w.longitude = h.longitude = s.longitude = e.east, s.height = d.height = l.height = g.height = f.height = m.height = w.height = h.height = n, a.cartographicArrayToCartesianArray(Y, j), u.projectPointsToNearestOnPlane(j, F);
    var y = Math.min(F[6].x, F[7].x, F[0].x),
        M = Math.max(F[2].x, F[3].x, F[4].x),
        b = Math.min(F[4].y, F[5].y, F[6].y),
        A = Math.max(F[0].y, F[1].y, F[2].y);
    return s.height = l.height = w.height = f.height = t, a.cartographicArrayToCartesianArray(Y, j), function (e, t, n, a, r, i, o, u) {
      if (!(L(t) && L(n) && L(a) && L(r) && L(i) && L(o))) throw new v("all extents (minimum/maximum X/Y/Z) are required.");
      L(u) || (u = new S());
      var c = u.halfAxes;
      I.setColumn(c, 0, e.xAxis, c), I.setColumn(c, 1, e.yAxis, c), I.setColumn(c, 2, e.zAxis, c), (s = _).x = (t + n) / 2, s.y = (a + r) / 2, s.z = (i + o) / 2;
      var l = X;
      l.x = (n - t) / 2, l.y = (r - a) / 2, l.z = (o - i) / 2;
      var d = u.center,
          s = I.multiplyByVector(c, s, s);
      return E.add(e.origin, s, d), I.multiplyByScale(c, l, c), u;
    }(u, y, M, b, A, Math.min(P.getPointDistance(c, j[0]), P.getPointDistance(c, j[2]), P.getPointDistance(c, j[4]), P.getPointDistance(c, j[6])), n, r);
  }, S.clone = function (e, t) {
    if (L(e)) return L(t) ? (E.clone(e.center, t.center), I.clone(e.halfAxes, t.halfAxes), t) : new S(e.center, e.halfAxes);
  }, S.intersectPlane = function (e, t) {
    if (!L(e)) throw new v("box is required.");
    if (!L(t)) throw new v("plane is required.");
    var n = e.center,
        a = t.normal,
        r = e.halfAxes,
        i = a.x,
        o = a.y,
        u = a.z,
        c = Math.abs(i * r[I.COLUMN0ROW0] + o * r[I.COLUMN0ROW1] + u * r[I.COLUMN0ROW2]) + Math.abs(i * r[I.COLUMN1ROW0] + o * r[I.COLUMN1ROW1] + u * r[I.COLUMN1ROW2]) + Math.abs(i * r[I.COLUMN2ROW0] + o * r[I.COLUMN2ROW1] + u * r[I.COLUMN2ROW2]),
        l = E.dot(a, n) + t.distance;
    return l <= -c ? d.OUTSIDE : c <= l ? d.INSIDE : d.INTERSECTING;
  };
  var f = new E(),
      g = new E(),
      x = new E(),
      w = new E();

  S.distanceSquaredTo = function (e, t) {
    if (!L(e)) throw new v("box is required.");
    if (!L(t)) throw new v("cartesian is required.");
    var n = E.subtract(t, e.center, _),
        a = e.halfAxes,
        r = I.getColumn(a, 0, f),
        i = I.getColumn(a, 1, g),
        o = I.getColumn(a, 2, x),
        u = E.magnitude(r),
        c = E.magnitude(i),
        l = E.magnitude(o);
    E.normalize(r, r), E.normalize(i, i), E.normalize(o, o);
    var d = w;
    d.x = E.dot(n, r), d.y = E.dot(n, i), d.z = E.dot(n, o);
    var s,
        h = 0;
    return d.x < -u ? h += (s = d.x + u) * s : d.x > u && (h += (s = d.x - u) * s), d.y < -c ? h += (s = d.y + c) * s : d.y > c && (h += (s = d.y - c) * s), d.z < -l ? h += (s = d.z + l) * s : d.z > l && (h += (s = d.z - l) * s), h;
  };

  var p = new E(),
      y = new E();

  S.computePlaneDistances = function (e, t, n, a) {
    if (!L(e)) throw new v("box is required.");
    if (!L(t)) throw new v("position is required.");
    if (!L(n)) throw new v("direction is required.");
    L(a) || (a = new m());
    var r = Number.POSITIVE_INFINITY,
        i = Number.NEGATIVE_INFINITY,
        o = e.center,
        u = e.halfAxes,
        c = I.getColumn(u, 0, f),
        l = I.getColumn(u, 1, g),
        d = I.getColumn(u, 2, x),
        s = E.add(c, l, p);
    E.add(s, d, s), E.add(s, o, s);
    var h = E.subtract(s, t, y),
        w = E.dot(n, h),
        r = Math.min(w, r),
        i = Math.max(w, i);
    return E.add(o, c, s), E.add(s, l, s), E.subtract(s, d, s), E.subtract(s, t, h), w = E.dot(n, h), r = Math.min(w, r), i = Math.max(w, i), E.add(o, c, s), E.subtract(s, l, s), E.add(s, d, s), E.subtract(s, t, h), w = E.dot(n, h), r = Math.min(w, r), i = Math.max(w, i), E.add(o, c, s), E.subtract(s, l, s), E.subtract(s, d, s), E.subtract(s, t, h), w = E.dot(n, h), r = Math.min(w, r), i = Math.max(w, i), E.subtract(o, c, s), E.add(s, l, s), E.add(s, d, s), E.subtract(s, t, h), w = E.dot(n, h), r = Math.min(w, r), i = Math.max(w, i), E.subtract(o, c, s), E.add(s, l, s), E.subtract(s, d, s), E.subtract(s, t, h), w = E.dot(n, h), r = Math.min(w, r), i = Math.max(w, i), E.subtract(o, c, s), E.subtract(s, l, s), E.add(s, d, s), E.subtract(s, t, h), w = E.dot(n, h), r = Math.min(w, r), i = Math.max(w, i), E.subtract(o, c, s), E.subtract(s, l, s), E.subtract(s, d, s), E.subtract(s, t, h), w = E.dot(n, h), r = Math.min(w, r), i = Math.max(w, i), a.start = r, a.stop = i, a;
  };

  var i = new a();
  return S.isOccluded = function (e, t) {
    if (!L(e)) throw new v("box is required.");
    if (!L(t)) throw new v("occluder is required.");
    var n = a.fromOrientedBoundingBox(e, i);
    return !t.isBoundingSphereVisible(n);
  }, S.prototype.intersectPlane = function (e) {
    return S.intersectPlane(this, e);
  }, S.prototype.distanceSquaredTo = function (e) {
    return S.distanceSquaredTo(this, e);
  }, S.prototype.computePlaneDistances = function (e, t, n) {
    return S.computePlaneDistances(this, e, t, n);
  }, S.prototype.isOccluded = function (e) {
    return S.isOccluded(this, e);
  }, S.equals = function (e, t) {
    return e === t || L(e) && L(t) && E.equals(e.center, t.center) && I.equals(e.halfAxes, t.halfAxes);
  }, S.prototype.clone = function (e) {
    return S.clone(this, e);
  }, S.prototype.equals = function (e) {
    return S.equals(this, e);
  }, S;
});