"use strict";

define(["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (a, o, u, r, t, c) {
  "use strict";

  function y(t, e, n, r) {
    this.x = o(t, 0), this.y = o(e, 0), this.z = o(n, 0), this.w = o(r, 0);
  }

  y.fromElements = function (t, e, n, r, o) {
    return u(o) ? (o.x = t, o.y = e, o.z = n, o.w = r, o) : new y(t, e, n, r);
  }, y.fromColor = function (t, e) {
    return a.typeOf.object("color", t), u(e) ? (e.x = t.red, e.y = t.green, e.z = t.blue, e.w = t.alpha, e) : new y(t.red, t.green, t.blue, t.alpha);
  }, y.clone = function (t, e) {
    if (u(t)) return u(e) ? (e.x = t.x, e.y = t.y, e.z = t.z, e.w = t.w, e) : new y(t.x, t.y, t.z, t.w);
  }, y.packedLength = 4, y.pack = function (t, e, n) {
    return a.typeOf.object("value", t), a.defined("array", e), n = o(n, 0), e[n++] = t.x, e[n++] = t.y, e[n++] = t.z, e[n] = t.w, e;
  }, y.unpack = function (t, e, n) {
    return a.defined("array", t), e = o(e, 0), u(n) || (n = new y()), n.x = t[e++], n.y = t[e++], n.z = t[e++], n.w = t[e], n;
  }, y.packArray = function (t, e) {
    a.defined("array", t);
    var n = t.length;
    u(e) ? e.length = 4 * n : e = new Array(4 * n);

    for (var r = 0; r < n; ++r) {
      y.pack(t[r], e, 4 * r);
    }

    return e;
  }, y.unpackArray = function (t, e) {
    a.defined("array", t);
    var n = t.length;
    u(e) ? e.length = n / 4 : e = new Array(n / 4);

    for (var r = 0; r < n; r += 4) {
      var o = r / 4;
      e[o] = y.unpack(t, r, e[o]);
    }

    return e;
  }, y.fromArray = y.unpack, y.maximumComponent = function (t) {
    return a.typeOf.object("cartesian", t), Math.max(t.x, t.y, t.z, t.w);
  }, y.minimumComponent = function (t) {
    return a.typeOf.object("cartesian", t), Math.min(t.x, t.y, t.z, t.w);
  }, y.minimumByComponent = function (t, e, n) {
    return a.typeOf.object("first", t), a.typeOf.object("second", e), a.typeOf.object("result", n), n.x = Math.min(t.x, e.x), n.y = Math.min(t.y, e.y), n.z = Math.min(t.z, e.z), n.w = Math.min(t.w, e.w), n;
  }, y.maximumByComponent = function (t, e, n) {
    return a.typeOf.object("first", t), a.typeOf.object("second", e), a.typeOf.object("result", n), n.x = Math.max(t.x, e.x), n.y = Math.max(t.y, e.y), n.z = Math.max(t.z, e.z), n.w = Math.max(t.w, e.w), n;
  }, y.magnitudeSquared = function (t) {
    return a.typeOf.object("cartesian", t), t.x * t.x + t.y * t.y + t.z * t.z + t.w * t.w;
  }, y.magnitude = function (t) {
    return Math.sqrt(y.magnitudeSquared(t));
  };
  var n = new y();
  y.distance = function (t, e) {
    return a.typeOf.object("left", t), a.typeOf.object("right", e), y.subtract(t, e, n), y.magnitude(n);
  }, y.distanceSquared = function (t, e) {
    return a.typeOf.object("left", t), a.typeOf.object("right", e), y.subtract(t, e, n), y.magnitudeSquared(n);
  }, y.normalize = function (t, e) {
    a.typeOf.object("cartesian", t), a.typeOf.object("result", e);
    var n = y.magnitude(t);
    if (e.x = t.x / n, e.y = t.y / n, e.z = t.z / n, e.w = t.w / n, isNaN(e.x) || isNaN(e.y) || isNaN(e.z) || isNaN(e.w)) throw new r("normalized result is not a number");
    return e;
  }, y.dot = function (t, e) {
    return a.typeOf.object("left", t), a.typeOf.object("right", e), t.x * e.x + t.y * e.y + t.z * e.z + t.w * e.w;
  }, y.multiplyComponents = function (t, e, n) {
    return a.typeOf.object("left", t), a.typeOf.object("right", e), a.typeOf.object("result", n), n.x = t.x * e.x, n.y = t.y * e.y, n.z = t.z * e.z, n.w = t.w * e.w, n;
  }, y.divideComponents = function (t, e, n) {
    return a.typeOf.object("left", t), a.typeOf.object("right", e), a.typeOf.object("result", n), n.x = t.x / e.x, n.y = t.y / e.y, n.z = t.z / e.z, n.w = t.w / e.w, n;
  }, y.add = function (t, e, n) {
    return a.typeOf.object("left", t), a.typeOf.object("right", e), a.typeOf.object("result", n), n.x = t.x + e.x, n.y = t.y + e.y, n.z = t.z + e.z, n.w = t.w + e.w, n;
  }, y.subtract = function (t, e, n) {
    return a.typeOf.object("left", t), a.typeOf.object("right", e), a.typeOf.object("result", n), n.x = t.x - e.x, n.y = t.y - e.y, n.z = t.z - e.z, n.w = t.w - e.w, n;
  }, y.multiplyByScalar = function (t, e, n) {
    return a.typeOf.object("cartesian", t), a.typeOf.number("scalar", e), a.typeOf.object("result", n), n.x = t.x * e, n.y = t.y * e, n.z = t.z * e, n.w = t.w * e, n;
  }, y.divideByScalar = function (t, e, n) {
    return a.typeOf.object("cartesian", t), a.typeOf.number("scalar", e), a.typeOf.object("result", n), n.x = t.x / e, n.y = t.y / e, n.z = t.z / e, n.w = t.w / e, n;
  }, y.negate = function (t, e) {
    return a.typeOf.object("cartesian", t), a.typeOf.object("result", e), e.x = -t.x, e.y = -t.y, e.z = -t.z, e.w = -t.w, e;
  }, y.abs = function (t, e) {
    return a.typeOf.object("cartesian", t), a.typeOf.object("result", e), e.x = Math.abs(t.x), e.y = Math.abs(t.y), e.z = Math.abs(t.z), e.w = Math.abs(t.w), e;
  };
  var i = new y();

  y.lerp = function (t, e, n, r) {
    return a.typeOf.object("start", t), a.typeOf.object("end", e), a.typeOf.number("t", n), a.typeOf.object("result", r), y.multiplyByScalar(e, n, i), r = y.multiplyByScalar(t, 1 - n, r), y.add(i, r, r);
  };

  var f = new y();
  y.mostOrthogonalAxis = function (t, e) {
    a.typeOf.object("cartesian", t), a.typeOf.object("result", e);
    var n = y.normalize(t, f);
    return y.abs(n, n), e = n.x <= n.y ? n.x <= n.z ? n.x <= n.w ? y.clone(y.UNIT_X, e) : y.clone(y.UNIT_W, e) : n.z <= n.w ? y.clone(y.UNIT_Z, e) : y.clone(y.UNIT_W, e) : n.y <= n.z ? n.y <= n.w ? y.clone(y.UNIT_Y, e) : y.clone(y.UNIT_W, e) : n.z <= n.w ? y.clone(y.UNIT_Z, e) : y.clone(y.UNIT_W, e);
  }, y.equals = function (t, e) {
    return t === e || u(t) && u(e) && t.x === e.x && t.y === e.y && t.z === e.z && t.w === e.w;
  }, y.equalsArray = function (t, e, n) {
    return t.x === e[n] && t.y === e[n + 1] && t.z === e[n + 2] && t.w === e[n + 3];
  }, y.equalsEpsilon = function (t, e, n, r) {
    return t === e || u(t) && u(e) && c.equalsEpsilon(t.x, e.x, n, r) && c.equalsEpsilon(t.y, e.y, n, r) && c.equalsEpsilon(t.z, e.z, n, r) && c.equalsEpsilon(t.w, e.w, n, r);
  }, y.ZERO = t(new y(0, 0, 0, 0)), y.UNIT_X = t(new y(1, 0, 0, 0)), y.UNIT_Y = t(new y(0, 1, 0, 0)), y.UNIT_Z = t(new y(0, 0, 1, 0)), y.UNIT_W = t(new y(0, 0, 0, 1)), y.prototype.clone = function (t) {
    return y.clone(this, t);
  }, y.prototype.equals = function (t) {
    return y.equals(this, t);
  }, y.prototype.equalsEpsilon = function (t, e, n) {
    return y.equalsEpsilon(this, t, e, n);
  }, y.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
  };
  var l = new Float32Array(1),
      p = 256;
  return y.packFloat = function (t, e) {
    if (a.typeOf.number("value", t), u(e) || (e = new y()), l[0] = t, 0 === (t = l[0])) return y.clone(y.ZERO, e);
    var n,
        r = t < 0 ? 1 : 0;
    isFinite(t) ? (t = Math.abs(t), n = Math.floor(c.logBase(t, 10)) + 1, t /= Math.pow(10, n)) : (t = .1, n = 38);
    var o = t * p;
    return e.x = Math.floor(o), o = (o - e.x) * p, e.y = Math.floor(o), o = (o - e.y) * p, e.z = Math.floor(o), e.w = 2 * (n + 38) + r, e;
  }, y.unpackFloat = function (t) {
    a.typeOf.object("packedFloat", t);
    var e = t.w / 2,
        n = Math.floor(e),
        r = -(r = 2 * (r = 2 * (e - n)) - 1);
    if (38 <= (n -= 38)) return r < 0 ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    var o = r * t.x * .00390625;
    return o += r * t.y * (1 / 65536), (o += r * t.z * (1 / 16777216)) * Math.pow(10, n);
  }, y;
});