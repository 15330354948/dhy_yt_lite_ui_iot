"use strict";

define(["./Cartesian2", "./Check", "./defaultValue", "./defined", "./defineProperties", "./freezeObject"], function (n, f, u, a, e, t) {
  "use strict";

  function o(e, t, n, r) {
    this[0] = u(e, 0), this[1] = u(n, 0), this[2] = u(t, 0), this[3] = u(r, 0);
  }

  o.packedLength = 4, o.pack = function (e, t, n) {
    return f.typeOf.object("value", e), f.defined("array", t), n = u(n, 0), t[n++] = e[0], t[n++] = e[1], t[n++] = e[2], t[n++] = e[3], t;
  }, o.unpack = function (e, t, n) {
    return f.defined("array", e), t = u(t, 0), a(n) || (n = new o()), n[0] = e[t++], n[1] = e[t++], n[2] = e[t++], n[3] = e[t++], n;
  }, o.clone = function (e, t) {
    if (a(e)) return a(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t) : new o(e[0], e[2], e[1], e[3]);
  }, o.fromArray = function (e, t, n) {
    return f.defined("array", e), t = u(t, 0), a(n) || (n = new o()), n[0] = e[t], n[1] = e[t + 1], n[2] = e[t + 2], n[3] = e[t + 3], n;
  }, o.fromColumnMajorArray = function (e, t) {
    return f.defined("values", e), o.clone(e, t);
  }, o.fromRowMajorArray = function (e, t) {
    return f.defined("values", e), a(t) ? (t[0] = e[0], t[1] = e[2], t[2] = e[1], t[3] = e[3], t) : new o(e[0], e[1], e[2], e[3]);
  }, o.fromScale = function (e, t) {
    return f.typeOf.object("scale", e), a(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = e.y, t) : new o(e.x, 0, 0, e.y);
  }, o.fromUniformScale = function (e, t) {
    return f.typeOf.number("scale", e), a(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = e, t) : new o(e, 0, 0, e);
  }, o.fromRotation = function (e, t) {
    f.typeOf.number("angle", e);
    var n = Math.cos(e),
        r = Math.sin(e);
    return a(t) ? (t[0] = n, t[1] = r, t[2] = -r, t[3] = n, t) : new o(n, -r, r, n);
  }, o.toArray = function (e, t) {
    return f.typeOf.object("matrix", e), a(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t) : [e[0], e[1], e[2], e[3]];
  }, o.getElementIndex = function (e, t) {
    return f.typeOf.number.greaterThanOrEquals("row", t, 0), f.typeOf.number.lessThanOrEquals("row", t, 1), f.typeOf.number.greaterThanOrEquals("column", e, 0), f.typeOf.number.lessThanOrEquals("column", e, 1), 2 * e + t;
  }, o.getColumn = function (e, t, n) {
    f.typeOf.object("matrix", e), f.typeOf.number.greaterThanOrEquals("index", t, 0), f.typeOf.number.lessThanOrEquals("index", t, 1), f.typeOf.object("result", n);
    var r = 2 * t,
        u = e[r],
        a = e[1 + r];
    return n.x = u, n.y = a, n;
  }, o.setColumn = function (e, t, n, r) {
    f.typeOf.object("matrix", e), f.typeOf.number.greaterThanOrEquals("index", t, 0), f.typeOf.number.lessThanOrEquals("index", t, 1), f.typeOf.object("cartesian", n), f.typeOf.object("result", r);
    var u = 2 * t;
    return (r = o.clone(e, r))[u] = n.x, r[1 + u] = n.y, r;
  }, o.getRow = function (e, t, n) {
    f.typeOf.object("matrix", e), f.typeOf.number.greaterThanOrEquals("index", t, 0), f.typeOf.number.lessThanOrEquals("index", t, 1), f.typeOf.object("result", n);
    var r = e[t],
        u = e[t + 2];
    return n.x = r, n.y = u, n;
  }, o.setRow = function (e, t, n, r) {
    return f.typeOf.object("matrix", e), f.typeOf.number.greaterThanOrEquals("index", t, 0), f.typeOf.number.lessThanOrEquals("index", t, 1), f.typeOf.object("cartesian", n), f.typeOf.object("result", r), (r = o.clone(e, r))[t] = n.x, r[t + 2] = n.y, r;
  };
  var r = new n();

  o.getScale = function (e, t) {
    return f.typeOf.object("matrix", e), f.typeOf.object("result", t), t.x = n.magnitude(n.fromElements(e[0], e[1], r)), t.y = n.magnitude(n.fromElements(e[2], e[3], r)), t;
  };

  var c = new n();
  return o.getMaximumScale = function (e) {
    return o.getScale(e, c), n.maximumComponent(c);
  }, o.multiply = function (e, t, n) {
    f.typeOf.object("left", e), f.typeOf.object("right", t), f.typeOf.object("result", n);
    var r = e[0] * t[0] + e[2] * t[1],
        u = e[0] * t[2] + e[2] * t[3],
        a = e[1] * t[0] + e[3] * t[1],
        o = e[1] * t[2] + e[3] * t[3];
    return n[0] = r, n[1] = a, n[2] = u, n[3] = o, n;
  }, o.add = function (e, t, n) {
    return f.typeOf.object("left", e), f.typeOf.object("right", t), f.typeOf.object("result", n), n[0] = e[0] + t[0], n[1] = e[1] + t[1], n[2] = e[2] + t[2], n[3] = e[3] + t[3], n;
  }, o.subtract = function (e, t, n) {
    return f.typeOf.object("left", e), f.typeOf.object("right", t), f.typeOf.object("result", n), n[0] = e[0] - t[0], n[1] = e[1] - t[1], n[2] = e[2] - t[2], n[3] = e[3] - t[3], n;
  }, o.multiplyByVector = function (e, t, n) {
    f.typeOf.object("matrix", e), f.typeOf.object("cartesian", t), f.typeOf.object("result", n);
    var r = e[0] * t.x + e[2] * t.y,
        u = e[1] * t.x + e[3] * t.y;
    return n.x = r, n.y = u, n;
  }, o.multiplyByScalar = function (e, t, n) {
    return f.typeOf.object("matrix", e), f.typeOf.number("scalar", t), f.typeOf.object("result", n), n[0] = e[0] * t, n[1] = e[1] * t, n[2] = e[2] * t, n[3] = e[3] * t, n;
  }, o.multiplyByScale = function (e, t, n) {
    return f.typeOf.object("matrix", e), f.typeOf.object("scale", t), f.typeOf.object("result", n), n[0] = e[0] * t.x, n[1] = e[1] * t.x, n[2] = e[2] * t.y, n[3] = e[3] * t.y, n;
  }, o.negate = function (e, t) {
    return f.typeOf.object("matrix", e), f.typeOf.object("result", t), t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t;
  }, o.transpose = function (e, t) {
    f.typeOf.object("matrix", e), f.typeOf.object("result", t);
    var n = e[0],
        r = e[2],
        u = e[1],
        a = e[3];
    return t[0] = n, t[1] = r, t[2] = u, t[3] = a, t;
  }, o.abs = function (e, t) {
    return f.typeOf.object("matrix", e), f.typeOf.object("result", t), t[0] = Math.abs(e[0]), t[1] = Math.abs(e[1]), t[2] = Math.abs(e[2]), t[3] = Math.abs(e[3]), t;
  }, o.equals = function (e, t) {
    return e === t || a(e) && a(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
  }, o.equalsArray = function (e, t, n) {
    return e[0] === t[n] && e[1] === t[n + 1] && e[2] === t[n + 2] && e[3] === t[n + 3];
  }, o.equalsEpsilon = function (e, t, n) {
    return f.typeOf.number("epsilon", n), e === t || a(e) && a(t) && Math.abs(e[0] - t[0]) <= n && Math.abs(e[1] - t[1]) <= n && Math.abs(e[2] - t[2]) <= n && Math.abs(e[3] - t[3]) <= n;
  }, o.IDENTITY = t(new o(1, 0, 0, 1)), o.ZERO = t(new o(0, 0, 0, 0)), o.COLUMN0ROW0 = 0, o.COLUMN0ROW1 = 1, o.COLUMN1ROW0 = 2, o.COLUMN1ROW1 = 3, e(o.prototype, {
    length: {
      get: function get() {
        return o.packedLength;
      }
    }
  }), o.prototype.clone = function (e) {
    return o.clone(this, e);
  }, o.prototype.equals = function (e) {
    return o.equals(this, e);
  }, o.prototype.equalsEpsilon = function (e, t) {
    return o.equalsEpsilon(this, e, t);
  }, o.prototype.toString = function () {
    return "(" + this[0] + ", " + this[2] + ")\n(" + this[1] + ", " + this[3] + ")";
  }, o;
});