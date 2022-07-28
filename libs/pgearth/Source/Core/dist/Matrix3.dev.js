"use strict";

define(["./Cartesian3", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./Math"], function (n, j, c, g, t, y, e, p) {
  "use strict";

  function E(t, e, n, r, a, o, u, i, f) {
    this[0] = c(t, 0), this[1] = c(r, 0), this[2] = c(u, 0), this[3] = c(e, 0), this[4] = c(a, 0), this[5] = c(i, 0), this[6] = c(n, 0), this[7] = c(o, 0), this[8] = c(f, 0);
  }

  E.packedLength = 9, E.pack = function (t, e, n) {
    return j.typeOf.object("value", t), j.defined("array", e), n = c(n, 0), e[n++] = t[0], e[n++] = t[1], e[n++] = t[2], e[n++] = t[3], e[n++] = t[4], e[n++] = t[5], e[n++] = t[6], e[n++] = t[7], e[n++] = t[8], e;
  }, E.unpack = function (t, e, n) {
    return j.defined("array", t), e = c(e, 0), g(n) || (n = new E()), n[0] = t[e++], n[1] = t[e++], n[2] = t[e++], n[3] = t[e++], n[4] = t[e++], n[5] = t[e++], n[6] = t[e++], n[7] = t[e++], n[8] = t[e++], n;
  }, E.clone = function (t, e) {
    if (g(t)) return g(e) ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e) : new E(t[0], t[3], t[6], t[1], t[4], t[7], t[2], t[5], t[8]);
  }, E.fromArray = function (t, e, n) {
    return j.defined("array", t), e = c(e, 0), g(n) || (n = new E()), n[0] = t[e], n[1] = t[e + 1], n[2] = t[e + 2], n[3] = t[e + 3], n[4] = t[e + 4], n[5] = t[e + 5], n[6] = t[e + 6], n[7] = t[e + 7], n[8] = t[e + 8], n;
  }, E.fromColumnMajorArray = function (t, e) {
    return j.defined("values", t), E.clone(t, e);
  }, E.fromRowMajorArray = function (t, e) {
    return j.defined("values", t), g(e) ? (e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], e) : new E(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]);
  }, E.fromQuaternion = function (t, e) {
    j.typeOf.object("quaternion", t);
    var n = t.x * t.x,
        r = t.x * t.y,
        a = t.x * t.z,
        o = t.x * t.w,
        u = t.y * t.y,
        i = t.y * t.z,
        f = t.y * t.w,
        c = t.z * t.z,
        s = t.z * t.w,
        l = t.w * t.w,
        y = n - u - c + l,
        p = 2 * (r - s),
        O = 2 * (a + f),
        m = 2 * (r + s),
        b = u - n - c + l,
        h = 2 * (i - o),
        x = 2 * (a - f),
        M = 2 * (i + o),
        d = -n - u + c + l;
    return g(e) ? (e[0] = y, e[1] = m, e[2] = x, e[3] = p, e[4] = b, e[5] = M, e[6] = O, e[7] = h, e[8] = d, e) : new E(y, p, O, m, b, h, x, M, d);
  }, E.fromHeadingPitchRoll = function (t, e) {
    j.typeOf.object("headingPitchRoll", t);
    var n = Math.cos(-t.pitch),
        r = Math.cos(-t.heading),
        a = Math.cos(t.roll),
        o = Math.sin(-t.pitch),
        u = Math.sin(-t.heading),
        i = Math.sin(t.roll),
        f = n * r,
        c = -a * u + i * o * r,
        s = i * u + a * o * r,
        l = n * u,
        y = a * r + i * o * u,
        p = -i * r + a * o * u,
        O = -o,
        m = i * n,
        b = a * n;
    return g(e) ? (e[0] = f, e[1] = l, e[2] = O, e[3] = c, e[4] = y, e[5] = m, e[6] = s, e[7] = p, e[8] = b, e) : new E(f, c, s, l, y, p, O, m, b);
  }, E.fromScale = function (t, e) {
    return j.typeOf.object("scale", t), g(e) ? (e[0] = t.x, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = t.y, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = t.z, e) : new E(t.x, 0, 0, 0, t.y, 0, 0, 0, t.z);
  }, E.fromUniformScale = function (t, e) {
    return j.typeOf.number("scale", t), g(e) ? (e[0] = t, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = t, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = t, e) : new E(t, 0, 0, 0, t, 0, 0, 0, t);
  }, E.fromCrossProduct = function (t, e) {
    return j.typeOf.object("vector", t), g(e) ? (e[0] = 0, e[1] = t.z, e[2] = -t.y, e[3] = -t.z, e[4] = 0, e[5] = t.x, e[6] = t.y, e[7] = -t.x, e[8] = 0, e) : new E(0, -t.z, t.y, t.z, 0, -t.x, -t.y, t.x, 0);
  }, E.fromRotationX = function (t, e) {
    j.typeOf.number("angle", t);
    var n = Math.cos(t),
        r = Math.sin(t);
    return g(e) ? (e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = n, e[5] = r, e[6] = 0, e[7] = -r, e[8] = n, e) : new E(1, 0, 0, 0, n, -r, 0, r, n);
  }, E.fromRotationY = function (t, e) {
    j.typeOf.number("angle", t);
    var n = Math.cos(t),
        r = Math.sin(t);
    return g(e) ? (e[0] = n, e[1] = 0, e[2] = -r, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = r, e[7] = 0, e[8] = n, e) : new E(n, 0, r, 0, 1, 0, -r, 0, n);
  }, E.fromRotationZ = function (t, e) {
    j.typeOf.number("angle", t);
    var n = Math.cos(t),
        r = Math.sin(t);
    return g(e) ? (e[0] = n, e[1] = r, e[2] = 0, e[3] = -r, e[4] = n, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e) : new E(n, -r, 0, r, n, 0, 0, 0, 1);
  }, E.toArray = function (t, e) {
    return j.typeOf.object("matrix", t), g(e) ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e) : [t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]];
  }, E.getElementIndex = function (t, e) {
    return j.typeOf.number.greaterThanOrEquals("row", e, 0), j.typeOf.number.lessThanOrEquals("row", e, 2), j.typeOf.number.greaterThanOrEquals("column", t, 0), j.typeOf.number.lessThanOrEquals("column", t, 2), 3 * t + e;
  }, E.getColumn = function (t, e, n) {
    j.typeOf.object("matrix", t), j.typeOf.number.greaterThanOrEquals("index", e, 0), j.typeOf.number.lessThanOrEquals("index", e, 2), j.typeOf.object("result", n);
    var r = 3 * e,
        a = t[r],
        o = t[1 + r],
        u = t[2 + r];
    return n.x = a, n.y = o, n.z = u, n;
  }, E.setColumn = function (t, e, n, r) {
    j.typeOf.object("matrix", t), j.typeOf.number.greaterThanOrEquals("index", e, 0), j.typeOf.number.lessThanOrEquals("index", e, 2), j.typeOf.object("cartesian", n), j.typeOf.object("result", r);
    var a = 3 * e;
    return (r = E.clone(t, r))[a] = n.x, r[1 + a] = n.y, r[2 + a] = n.z, r;
  }, E.getRow = function (t, e, n) {
    j.typeOf.object("matrix", t), j.typeOf.number.greaterThanOrEquals("index", e, 0), j.typeOf.number.lessThanOrEquals("index", e, 2), j.typeOf.object("result", n);
    var r = t[e],
        a = t[e + 3],
        o = t[e + 6];
    return n.x = r, n.y = a, n.z = o, n;
  }, E.setRow = function (t, e, n, r) {
    return j.typeOf.object("matrix", t), j.typeOf.number.greaterThanOrEquals("index", e, 0), j.typeOf.number.lessThanOrEquals("index", e, 2), j.typeOf.object("cartesian", n), j.typeOf.object("result", r), (r = E.clone(t, r))[e] = n.x, r[e + 3] = n.y, r[e + 6] = n.z, r;
  };
  var r = new n();

  E.getScale = function (t, e) {
    return j.typeOf.object("matrix", t), j.typeOf.object("result", e), e.x = n.magnitude(n.fromElements(t[0], t[1], t[2], r)), e.y = n.magnitude(n.fromElements(t[3], t[4], t[5], r)), e.z = n.magnitude(n.fromElements(t[6], t[7], t[8], r)), e;
  };

  var a = new n();
  E.getMaximumScale = function (t) {
    return E.getScale(t, a), n.maximumComponent(a);
  }, E.multiply = function (t, e, n) {
    j.typeOf.object("left", t), j.typeOf.object("right", e), j.typeOf.object("result", n);
    var r = t[0] * e[0] + t[3] * e[1] + t[6] * e[2],
        a = t[1] * e[0] + t[4] * e[1] + t[7] * e[2],
        o = t[2] * e[0] + t[5] * e[1] + t[8] * e[2],
        u = t[0] * e[3] + t[3] * e[4] + t[6] * e[5],
        i = t[1] * e[3] + t[4] * e[4] + t[7] * e[5],
        f = t[2] * e[3] + t[5] * e[4] + t[8] * e[5],
        c = t[0] * e[6] + t[3] * e[7] + t[6] * e[8],
        s = t[1] * e[6] + t[4] * e[7] + t[7] * e[8],
        l = t[2] * e[6] + t[5] * e[7] + t[8] * e[8];
    return n[0] = r, n[1] = a, n[2] = o, n[3] = u, n[4] = i, n[5] = f, n[6] = c, n[7] = s, n[8] = l, n;
  }, E.add = function (t, e, n) {
    return j.typeOf.object("left", t), j.typeOf.object("right", e), j.typeOf.object("result", n), n[0] = t[0] + e[0], n[1] = t[1] + e[1], n[2] = t[2] + e[2], n[3] = t[3] + e[3], n[4] = t[4] + e[4], n[5] = t[5] + e[5], n[6] = t[6] + e[6], n[7] = t[7] + e[7], n[8] = t[8] + e[8], n;
  }, E.subtract = function (t, e, n) {
    return j.typeOf.object("left", t), j.typeOf.object("right", e), j.typeOf.object("result", n), n[0] = t[0] - e[0], n[1] = t[1] - e[1], n[2] = t[2] - e[2], n[3] = t[3] - e[3], n[4] = t[4] - e[4], n[5] = t[5] - e[5], n[6] = t[6] - e[6], n[7] = t[7] - e[7], n[8] = t[8] - e[8], n;
  }, E.multiplyByVector = function (t, e, n) {
    j.typeOf.object("matrix", t), j.typeOf.object("cartesian", e), j.typeOf.object("result", n);
    var r = e.x,
        a = e.y,
        o = e.z,
        u = t[0] * r + t[3] * a + t[6] * o,
        i = t[1] * r + t[4] * a + t[7] * o,
        f = t[2] * r + t[5] * a + t[8] * o;
    return n.x = u, n.y = i, n.z = f, n;
  }, E.multiplyByScalar = function (t, e, n) {
    return j.typeOf.object("matrix", t), j.typeOf.number("scalar", e), j.typeOf.object("result", n), n[0] = t[0] * e, n[1] = t[1] * e, n[2] = t[2] * e, n[3] = t[3] * e, n[4] = t[4] * e, n[5] = t[5] * e, n[6] = t[6] * e, n[7] = t[7] * e, n[8] = t[8] * e, n;
  }, E.multiplyByScale = function (t, e, n) {
    return j.typeOf.object("matrix", t), j.typeOf.object("scale", e), j.typeOf.object("result", n), n[0] = t[0] * e.x, n[1] = t[1] * e.x, n[2] = t[2] * e.x, n[3] = t[3] * e.y, n[4] = t[4] * e.y, n[5] = t[5] * e.y, n[6] = t[6] * e.z, n[7] = t[7] * e.z, n[8] = t[8] * e.z, n;
  }, E.negate = function (t, e) {
    return j.typeOf.object("matrix", t), j.typeOf.object("result", e), e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = -t[3], e[4] = -t[4], e[5] = -t[5], e[6] = -t[6], e[7] = -t[7], e[8] = -t[8], e;
  }, E.transpose = function (t, e) {
    j.typeOf.object("matrix", t), j.typeOf.object("result", e);
    var n = t[0],
        r = t[3],
        a = t[6],
        o = t[1],
        u = t[4],
        i = t[7],
        f = t[2],
        c = t[5],
        s = t[8];
    return e[0] = n, e[1] = r, e[2] = a, e[3] = o, e[4] = u, e[5] = i, e[6] = f, e[7] = c, e[8] = s, e;
  };
  var O = [1, 0, 0],
      m = [2, 2, 1];
  var f = new E(),
      s = new E();
  return E.computeEigenDecomposition = function (t, e) {
    j.typeOf.object("matrix", t);
    var n = p.EPSILON20,
        r = 0,
        a = 0;
    g(e) || (e = {});

    for (var o = e.unitary = E.clone(E.IDENTITY, e.unitary), u = e.diagonal = E.clone(t, e.diagonal), i = n * function (t) {
      for (var e = 0, n = 0; n < 9; ++n) {
        var r = t[n];
        e += r * r;
      }

      return Math.sqrt(e);
    }(u); a < 10 && function (t) {
      for (var e = 0, n = 0; n < 3; ++n) {
        var r = t[E.getElementIndex(m[n], O[n])];
        e += 2 * r * r;
      }

      return Math.sqrt(e);
    }(u) > i;) {
      !function (t, e) {
        for (var n = p.EPSILON15, r = 0, a = 1, o = 0; o < 3; ++o) {
          var u = Math.abs(t[E.getElementIndex(m[o], O[o])]);
          r < u && (a = o, r = u);
        }

        var i,
            f,
            c = 1,
            s = 0,
            l = O[a],
            y = m[a];
        Math.abs(t[E.getElementIndex(y, l)]) > n && (s = (f = (i = (t[E.getElementIndex(y, y)] - t[E.getElementIndex(l, l)]) / 2 / t[E.getElementIndex(y, l)]) < 0 ? -1 / (-i + Math.sqrt(1 + i * i)) : 1 / (i + Math.sqrt(1 + i * i))) * (c = 1 / Math.sqrt(1 + f * f))), (e = E.clone(E.IDENTITY, e))[E.getElementIndex(l, l)] = e[E.getElementIndex(y, y)] = c, e[E.getElementIndex(y, l)] = s, e[E.getElementIndex(l, y)] = -s;
      }(u, f), E.transpose(f, s), E.multiply(u, f, u), E.multiply(s, u, u), E.multiply(o, f, o), 2 < ++r && (++a, r = 0);
    }

    return e;
  }, E.abs = function (t, e) {
    return j.typeOf.object("matrix", t), j.typeOf.object("result", e), e[0] = Math.abs(t[0]), e[1] = Math.abs(t[1]), e[2] = Math.abs(t[2]), e[3] = Math.abs(t[3]), e[4] = Math.abs(t[4]), e[5] = Math.abs(t[5]), e[6] = Math.abs(t[6]), e[7] = Math.abs(t[7]), e[8] = Math.abs(t[8]), e;
  }, E.determinant = function (t) {
    j.typeOf.object("matrix", t);
    var e = t[0],
        n = t[3],
        r = t[6],
        a = t[1],
        o = t[4],
        u = t[7],
        i = t[2],
        f = t[5],
        c = t[8];
    return e * (o * c - f * u) + a * (f * r - n * c) + i * (n * u - o * r);
  }, E.inverse = function (t, e) {
    j.typeOf.object("matrix", t), j.typeOf.object("result", e);
    var n = t[0],
        r = t[1],
        a = t[2],
        o = t[3],
        u = t[4],
        i = t[5],
        f = t[6],
        c = t[7],
        s = t[8],
        l = E.determinant(t);
    if (Math.abs(l) <= p.EPSILON15) throw new y("matrix is not invertible");
    return e[0] = u * s - c * i, e[1] = c * a - r * s, e[2] = r * i - u * a, e[3] = f * i - o * s, e[4] = n * s - f * a, e[5] = o * a - n * i, e[6] = o * c - f * u, e[7] = f * r - n * c, e[8] = n * u - o * r, E.multiplyByScalar(e, 1 / l, e);
  }, E.equals = function (t, e) {
    return t === e || g(t) && g(e) && t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3] && t[4] === e[4] && t[5] === e[5] && t[6] === e[6] && t[7] === e[7] && t[8] === e[8];
  }, E.equalsEpsilon = function (t, e, n) {
    return j.typeOf.number("epsilon", n), t === e || g(t) && g(e) && Math.abs(t[0] - e[0]) <= n && Math.abs(t[1] - e[1]) <= n && Math.abs(t[2] - e[2]) <= n && Math.abs(t[3] - e[3]) <= n && Math.abs(t[4] - e[4]) <= n && Math.abs(t[5] - e[5]) <= n && Math.abs(t[6] - e[6]) <= n && Math.abs(t[7] - e[7]) <= n && Math.abs(t[8] - e[8]) <= n;
  }, E.IDENTITY = e(new E(1, 0, 0, 0, 1, 0, 0, 0, 1)), E.ZERO = e(new E(0, 0, 0, 0, 0, 0, 0, 0, 0)), E.COLUMN0ROW0 = 0, E.COLUMN0ROW1 = 1, E.COLUMN0ROW2 = 2, E.COLUMN1ROW0 = 3, E.COLUMN1ROW1 = 4, E.COLUMN1ROW2 = 5, E.COLUMN2ROW0 = 6, E.COLUMN2ROW1 = 7, E.COLUMN2ROW2 = 8, t(E.prototype, {
    length: {
      get: function get() {
        return E.packedLength;
      }
    }
  }), E.prototype.clone = function (t) {
    return E.clone(this, t);
  }, E.prototype.equals = function (t) {
    return E.equals(this, t);
  }, E.equalsArray = function (t, e, n) {
    return t[0] === e[n] && t[1] === e[n + 1] && t[2] === e[n + 2] && t[3] === e[n + 3] && t[4] === e[n + 4] && t[5] === e[n + 5] && t[6] === e[n + 6] && t[7] === e[n + 7] && t[8] === e[n + 8];
  }, E.prototype.equalsEpsilon = function (t, e) {
    return E.equalsEpsilon(this, t, e);
  }, E.prototype.toString = function () {
    return "(" + this[0] + ", " + this[3] + ", " + this[6] + ")\n(" + this[1] + ", " + this[4] + ", " + this[7] + ")\n(" + this[2] + ", " + this[5] + ", " + this[8] + ")";
  }, E;
});