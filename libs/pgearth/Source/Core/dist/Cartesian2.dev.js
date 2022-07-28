"use strict";

define(["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (a, r, u, o, t, c) {
  "use strict";

  function y(t, e) {
    this.x = r(t, 0), this.y = r(e, 0);
  }

  y.fromElements = function (t, e, n) {
    return u(n) ? (n.x = t, n.y = e, n) : new y(t, e);
  }, y.fromCartesian3 = y.clone = function (t, e) {
    if (u(t)) return u(e) ? (e.x = t.x, e.y = t.y, e) : new y(t.x, t.y);
  }, y.fromCartesian4 = y.clone, y.packedLength = 2, y.pack = function (t, e, n) {
    return a.typeOf.object("value", t), a.defined("array", e), n = r(n, 0), e[n++] = t.x, e[n] = t.y, e;
  }, y.unpack = function (t, e, n) {
    return a.defined("array", t), e = r(e, 0), u(n) || (n = new y()), n.x = t[e++], n.y = t[e], n;
  }, y.packArray = function (t, e) {
    a.defined("array", t);
    var n = t.length;
    u(e) ? e.length = 2 * n : e = new Array(2 * n);

    for (var r = 0; r < n; ++r) {
      y.pack(t[r], e, 2 * r);
    }

    return e;
  }, y.unpackArray = function (t, e) {
    a.defined("array", t);
    var n = t.length;
    u(e) ? e.length = n / 2 : e = new Array(n / 2);

    for (var r = 0; r < n; r += 2) {
      var o = r / 2;
      e[o] = y.unpack(t, r, e[o]);
    }

    return e;
  }, y.fromArray = y.unpack, y.maximumComponent = function (t) {
    return a.typeOf.object("cartesian", t), Math.max(t.x, t.y);
  }, y.minimumComponent = function (t) {
    return a.typeOf.object("cartesian", t), Math.min(t.x, t.y);
  }, y.minimumByComponent = function (t, e, n) {
    return a.typeOf.object("first", t), a.typeOf.object("second", e), a.typeOf.object("result", n), n.x = Math.min(t.x, e.x), n.y = Math.min(t.y, e.y), n;
  }, y.maximumByComponent = function (t, e, n) {
    return a.typeOf.object("first", t), a.typeOf.object("second", e), a.typeOf.object("result", n), n.x = Math.max(t.x, e.x), n.y = Math.max(t.y, e.y), n;
  }, y.magnitudeSquared = function (t) {
    return a.typeOf.object("cartesian", t), t.x * t.x + t.y * t.y;
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
    if (e.x = t.x / n, e.y = t.y / n, isNaN(e.x) || isNaN(e.y)) throw new o("normalized result is not a number");
    return e;
  }, y.dot = function (t, e) {
    return a.typeOf.object("left", t), a.typeOf.object("right", e), t.x * e.x + t.y * e.y;
  }, y.multiplyComponents = function (t, e, n) {
    return a.typeOf.object("left", t), a.typeOf.object("right", e), a.typeOf.object("result", n), n.x = t.x * e.x, n.y = t.y * e.y, n;
  }, y.divideComponents = function (t, e, n) {
    return a.typeOf.object("left", t), a.typeOf.object("right", e), a.typeOf.object("result", n), n.x = t.x / e.x, n.y = t.y / e.y, n;
  }, y.add = function (t, e, n) {
    return a.typeOf.object("left", t), a.typeOf.object("right", e), a.typeOf.object("result", n), n.x = t.x + e.x, n.y = t.y + e.y, n;
  }, y.subtract = function (t, e, n) {
    return a.typeOf.object("left", t), a.typeOf.object("right", e), a.typeOf.object("result", n), n.x = t.x - e.x, n.y = t.y - e.y, n;
  }, y.multiplyByScalar = function (t, e, n) {
    return a.typeOf.object("cartesian", t), a.typeOf.number("scalar", e), a.typeOf.object("result", n), n.x = t.x * e, n.y = t.y * e, n;
  }, y.divideByScalar = function (t, e, n) {
    return a.typeOf.object("cartesian", t), a.typeOf.number("scalar", e), a.typeOf.object("result", n), n.x = t.x / e, n.y = t.y / e, n;
  }, y.negate = function (t, e) {
    return a.typeOf.object("cartesian", t), a.typeOf.object("result", e), e.x = -t.x, e.y = -t.y, e;
  }, y.abs = function (t, e) {
    return a.typeOf.object("cartesian", t), a.typeOf.object("result", e), e.x = Math.abs(t.x), e.y = Math.abs(t.y), e;
  };
  var i = new y();

  y.lerp = function (t, e, n, r) {
    return a.typeOf.object("start", t), a.typeOf.object("end", e), a.typeOf.number("t", n), a.typeOf.object("result", r), y.multiplyByScalar(e, n, i), r = y.multiplyByScalar(t, 1 - n, r), y.add(i, r, r);
  };

  var f = new y(),
      p = new y();

  y.angleBetween = function (t, e) {
    return a.typeOf.object("left", t), a.typeOf.object("right", e), y.normalize(t, f), y.normalize(e, p), c.acosClamped(y.dot(f, p));
  };

  var l = new y();
  return y.mostOrthogonalAxis = function (t, e) {
    a.typeOf.object("cartesian", t), a.typeOf.object("result", e);
    var n = y.normalize(t, l);
    return y.abs(n, n), e = n.x <= n.y ? y.clone(y.UNIT_X, e) : y.clone(y.UNIT_Y, e);
  }, y.equals = function (t, e) {
    return t === e || u(t) && u(e) && t.x === e.x && t.y === e.y;
  }, y.equalsArray = function (t, e, n) {
    return t.x === e[n] && t.y === e[n + 1];
  }, y.equalsEpsilon = function (t, e, n, r) {
    return t === e || u(t) && u(e) && c.equalsEpsilon(t.x, e.x, n, r) && c.equalsEpsilon(t.y, e.y, n, r);
  }, y.ZERO = t(new y(0, 0)), y.UNIT_X = t(new y(1, 0)), y.UNIT_Y = t(new y(0, 1)), y.prototype.clone = function (t) {
    return y.clone(this, t);
  }, y.prototype.equals = function (t) {
    return y.equals(this, t);
  }, y.prototype.equalsEpsilon = function (t, e, n) {
    return y.equalsEpsilon(this, t, e, n);
  }, y.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ")";
  }, y;
});