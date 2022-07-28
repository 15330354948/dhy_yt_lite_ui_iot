"use strict";

define(["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (s, f, c, y, t, o) {
  "use strict";

  function l(t, e, n) {
    this.x = f(t, 0), this.y = f(e, 0), this.z = f(n, 0);
  }

  l.fromSpherical = function (t, e) {
    s.typeOf.object("spherical", t), c(e) || (e = new l());
    var n = t.clock,
        r = t.cone,
        a = f(t.magnitude, 1),
        o = a * Math.sin(r);
    return e.x = o * Math.cos(n), e.y = o * Math.sin(n), e.z = a * Math.cos(r), e;
  }, l.fromElements = function (t, e, n, r) {
    return c(r) ? (r.x = t, r.y = e, r.z = n, r) : new l(t, e, n);
  }, l.fromCartesian4 = l.clone = function (t, e) {
    if (c(t)) return c(e) ? (e.x = t.x, e.y = t.y, e.z = t.z, e) : new l(t.x, t.y, t.z);
  }, l.packedLength = 3, l.pack = function (t, e, n) {
    return s.typeOf.object("value", t), s.defined("array", e), n = f(n, 0), e[n++] = t.x, e[n++] = t.y, e[n] = t.z, e;
  }, l.unpack = function (t, e, n) {
    return s.defined("array", t), e = f(e, 0), c(n) || (n = new l()), n.x = t[e++], n.y = t[e++], n.z = t[e], n;
  }, l.packArray = function (t, e) {
    s.defined("array", t);
    var n = t.length;
    c(e) ? e.length = 3 * n : e = new Array(3 * n);

    for (var r = 0; r < n; ++r) {
      l.pack(t[r], e, 3 * r);
    }

    return e;
  }, l.unpackArray = function (t, e) {
    if (s.defined("array", t), s.typeOf.number.greaterThanOrEquals("array.length", t.length, 3), t.length % 3 != 0) throw new y("array length must be a multiple of 3.");
    var n = t.length;
    c(e) ? e.length = n / 3 : e = new Array(n / 3);

    for (var r = 0; r < n; r += 3) {
      var a = r / 3;
      e[a] = l.unpack(t, r, e[a]);
    }

    return e;
  }, l.fromArray = l.unpack, l.maximumComponent = function (t) {
    return s.typeOf.object("cartesian", t), Math.max(t.x, t.y, t.z);
  }, l.minimumComponent = function (t) {
    return s.typeOf.object("cartesian", t), Math.min(t.x, t.y, t.z);
  }, l.minimumByComponent = function (t, e, n) {
    return s.typeOf.object("first", t), s.typeOf.object("second", e), s.typeOf.object("result", n), n.x = Math.min(t.x, e.x), n.y = Math.min(t.y, e.y), n.z = Math.min(t.z, e.z), n;
  }, l.maximumByComponent = function (t, e, n) {
    return s.typeOf.object("first", t), s.typeOf.object("second", e), s.typeOf.object("result", n), n.x = Math.max(t.x, e.x), n.y = Math.max(t.y, e.y), n.z = Math.max(t.z, e.z), n;
  }, l.magnitudeSquared = function (t) {
    return s.typeOf.object("cartesian", t), t.x * t.x + t.y * t.y + t.z * t.z;
  }, l.magnitude = function (t) {
    return Math.sqrt(l.magnitudeSquared(t));
  };
  var n = new l();
  l.distance = function (t, e) {
    return s.typeOf.object("left", t), s.typeOf.object("right", e), l.subtract(t, e, n), l.magnitude(n);
  }, l.distanceSquared = function (t, e) {
    return s.typeOf.object("left", t), s.typeOf.object("right", e), l.subtract(t, e, n), l.magnitudeSquared(n);
  }, l.normalize = function (t, e) {
    s.typeOf.object("cartesian", t), s.typeOf.object("result", e);
    var n = l.magnitude(t);
    if (e.x = t.x / n, e.y = t.y / n, e.z = t.z / n, isNaN(e.x) || isNaN(e.y) || isNaN(e.z)) throw new y("normalized result is not a number");
    return e;
  }, l.dot = function (t, e) {
    return s.typeOf.object("left", t), s.typeOf.object("right", e), t.x * e.x + t.y * e.y + t.z * e.z;
  }, l.multiplyComponents = function (t, e, n) {
    return s.typeOf.object("left", t), s.typeOf.object("right", e), s.typeOf.object("result", n), n.x = t.x * e.x, n.y = t.y * e.y, n.z = t.z * e.z, n;
  }, l.divideComponents = function (t, e, n) {
    return s.typeOf.object("left", t), s.typeOf.object("right", e), s.typeOf.object("result", n), n.x = t.x / e.x, n.y = t.y / e.y, n.z = t.z / e.z, n;
  }, l.add = function (t, e, n) {
    return s.typeOf.object("left", t), s.typeOf.object("right", e), s.typeOf.object("result", n), n.x = t.x + e.x, n.y = t.y + e.y, n.z = t.z + e.z, n;
  }, l.subtract = function (t, e, n) {
    return s.typeOf.object("left", t), s.typeOf.object("right", e), s.typeOf.object("result", n), n.x = t.x - e.x, n.y = t.y - e.y, n.z = t.z - e.z, n;
  }, l.multiplyByScalar = function (t, e, n) {
    return s.typeOf.object("cartesian", t), s.typeOf.number("scalar", e), s.typeOf.object("result", n), n.x = t.x * e, n.y = t.y * e, n.z = t.z * e, n;
  }, l.divideByScalar = function (t, e, n) {
    return s.typeOf.object("cartesian", t), s.typeOf.number("scalar", e), s.typeOf.object("result", n), n.x = t.x / e, n.y = t.y / e, n.z = t.z / e, n;
  }, l.negate = function (t, e) {
    return s.typeOf.object("cartesian", t), s.typeOf.object("result", e), e.x = -t.x, e.y = -t.y, e.z = -t.z, e;
  }, l.abs = function (t, e) {
    return s.typeOf.object("cartesian", t), s.typeOf.object("result", e), e.x = Math.abs(t.x), e.y = Math.abs(t.y), e.z = Math.abs(t.z), e;
  };
  var a = new l();

  l.lerp = function (t, e, n, r) {
    return s.typeOf.object("start", t), s.typeOf.object("end", e), s.typeOf.number("t", n), s.typeOf.object("result", r), l.multiplyByScalar(e, n, a), r = l.multiplyByScalar(t, 1 - n, r), l.add(a, r, r);
  };

  var i = new l(),
      u = new l();

  l.angleBetween = function (t, e) {
    s.typeOf.object("left", t), s.typeOf.object("right", e), l.normalize(t, i), l.normalize(e, u);
    var n = l.dot(i, u),
        r = l.magnitude(l.cross(i, u, i));
    return Math.atan2(r, n);
  };

  var r = new l();
  l.mostOrthogonalAxis = function (t, e) {
    s.typeOf.object("cartesian", t), s.typeOf.object("result", e);
    var n = l.normalize(t, r);
    return l.abs(n, n), e = n.x <= n.y ? n.x <= n.z ? l.clone(l.UNIT_X, e) : l.clone(l.UNIT_Z, e) : n.y <= n.z ? l.clone(l.UNIT_Y, e) : l.clone(l.UNIT_Z, e);
  }, l.projectVector = function (t, e, n) {
    s.defined("a", t), s.defined("b", e), s.defined("result", n);
    var r = l.dot(t, e) / l.dot(e, e);
    return l.multiplyByScalar(e, r, n);
  }, l.equals = function (t, e) {
    return t === e || c(t) && c(e) && t.x === e.x && t.y === e.y && t.z === e.z;
  }, l.equalsArray = function (t, e, n) {
    return t.x === e[n] && t.y === e[n + 1] && t.z === e[n + 2];
  }, l.equalsEpsilon = function (t, e, n, r) {
    return t === e || c(t) && c(e) && o.equalsEpsilon(t.x, e.x, n, r) && o.equalsEpsilon(t.y, e.y, n, r) && o.equalsEpsilon(t.z, e.z, n, r);
  }, l.cross = function (t, e, n) {
    s.typeOf.object("left", t), s.typeOf.object("right", e), s.typeOf.object("result", n);
    var r = t.x,
        a = t.y,
        o = t.z,
        i = e.x,
        u = e.y,
        f = e.z,
        c = a * f - o * u,
        y = o * i - r * f,
        l = r * u - a * i;
    return n.x = c, n.y = y, n.z = l, n;
  }, l.midpoint = function (t, e, n) {
    return s.typeOf.object("left", t), s.typeOf.object("right", e), s.typeOf.object("result", n), n.x = .5 * (t.x + e.x), n.y = .5 * (t.y + e.y), n.z = .5 * (t.z + e.z), n;
  }, l.fromDegrees = function (t, e, n, r, a) {
    return s.typeOf.number("longitude", t), s.typeOf.number("latitude", e), t = o.toRadians(t), e = o.toRadians(e), l.fromRadians(t, e, n, r, a);
  };
  var p = new l(),
      d = new l(),
      m = new l(40680631590769, 40680631590769, 40408299984661.445);
  return l.fromRadians = function (t, e, n, r, a) {
    s.typeOf.number("longitude", t), s.typeOf.number("latitude", e), n = f(n, 0);
    var o = c(r) ? r.radiiSquared : m,
        i = Math.cos(e);
    p.x = i * Math.cos(t), p.y = i * Math.sin(t), p.z = Math.sin(e), p = l.normalize(p, p), l.multiplyComponents(o, p, d);
    var u = Math.sqrt(l.dot(p, d));
    return d = l.divideByScalar(d, u, d), p = l.multiplyByScalar(p, n, p), c(a) || (a = new l()), l.add(d, p, a);
  }, l.fromDegreesArray = function (t, e, n) {
    if (s.defined("coordinates", t), t.length < 2 || t.length % 2 != 0) throw new y("the number of coordinates must be a multiple of 2 and at least 2");
    var r = t.length;
    c(n) ? n.length = r / 2 : n = new Array(r / 2);

    for (var a = 0; a < r; a += 2) {
      var o = t[a],
          i = t[a + 1],
          u = a / 2;
      n[u] = l.fromDegrees(o, i, 0, e, n[u]);
    }

    return n;
  }, l.fromRadiansArray = function (t, e, n) {
    if (s.defined("coordinates", t), t.length < 2 || t.length % 2 != 0) throw new y("the number of coordinates must be a multiple of 2 and at least 2");
    var r = t.length;
    c(n) ? n.length = r / 2 : n = new Array(r / 2);

    for (var a = 0; a < r; a += 2) {
      var o = t[a],
          i = t[a + 1],
          u = a / 2;
      n[u] = l.fromRadians(o, i, 0, e, n[u]);
    }

    return n;
  }, l.fromDegreesArrayHeights = function (t, e, n) {
    if (s.defined("coordinates", t), t.length < 3 || t.length % 3 != 0) throw new y("the number of coordinates must be a multiple of 3 and at least 3");
    var r = t.length;
    c(n) ? n.length = r / 3 : n = new Array(r / 3);

    for (var a = 0; a < r; a += 3) {
      var o = t[a],
          i = t[a + 1],
          u = t[a + 2],
          f = a / 3;
      n[f] = l.fromDegrees(o, i, u, e, n[f]);
    }

    return n;
  }, l.fromRadiansArrayHeights = function (t, e, n) {
    if (s.defined("coordinates", t), t.length < 3 || t.length % 3 != 0) throw new y("the number of coordinates must be a multiple of 3 and at least 3");
    var r = t.length;
    c(n) ? n.length = r / 3 : n = new Array(r / 3);

    for (var a = 0; a < r; a += 3) {
      var o = t[a],
          i = t[a + 1],
          u = t[a + 2],
          f = a / 3;
      n[f] = l.fromRadians(o, i, u, e, n[f]);
    }

    return n;
  }, l.ZERO = t(new l(0, 0, 0)), l.UNIT_X = t(new l(1, 0, 0)), l.UNIT_Y = t(new l(0, 1, 0)), l.UNIT_Z = t(new l(0, 0, 1)), l.prototype.clone = function (t) {
    return l.clone(this, t);
  }, l.prototype.equals = function (t) {
    return l.equals(this, t);
  }, l.prototype.equalsEpsilon = function (t, e, n) {
    return l.equalsEpsilon(this, t, e, n);
  }, l.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ", " + this.z + ")";
  }, l;
});