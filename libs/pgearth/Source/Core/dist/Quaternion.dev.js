"use strict";

define(["./Cartesian3", "./Check", "./defaultValue", "./defined", "./FeatureDetection", "./freezeObject", "./Math", "./Matrix3"], function (l, b, a, w, t, e, y, x) {
  "use strict";

  function j(t, e, n, r) {
    this.x = a(t, 0), this.y = a(e, 0), this.z = a(n, 0), this.w = a(r, 0);
  }

  var p = new l();

  j.fromAxisAngle = function (t, e, n) {
    b.typeOf.object("axis", t), b.typeOf.number("angle", e);
    var r = e / 2,
        a = Math.sin(r),
        o = (p = l.normalize(t, p)).x * a,
        u = p.y * a,
        y = p.z * a,
        c = Math.cos(r);
    return w(n) ? (n.x = o, n.y = u, n.z = y, n.w = c, n) : new j(o, u, y, c);
  };

  var m = [1, 2, 0],
      d = new Array(3);

  j.fromRotationMatrix = function (t, e) {
    var n, r, a;
    b.typeOf.object("matrix", t);
    var o,
        u,
        y,
        c,
        l,
        p = t[x.COLUMN0ROW0],
        i = t[x.COLUMN1ROW1],
        f = t[x.COLUMN2ROW2],
        s = p + i + f,
        O = 0 < s ? (a = .5 * (c = Math.sqrt(s + 1)), c = .5 / c, n = (t[x.COLUMN1ROW2] - t[x.COLUMN2ROW1]) * c, r = (t[x.COLUMN2ROW0] - t[x.COLUMN0ROW2]) * c, (t[x.COLUMN0ROW1] - t[x.COLUMN1ROW0]) * c) : (y = m[u = m[o = p < f && i < f ? 2 : p < i ? 1 : 0]], c = Math.sqrt(t[x.getElementIndex(o, o)] - t[x.getElementIndex(u, u)] - t[x.getElementIndex(y, y)] + 1), (l = d)[o] = .5 * c, c = .5 / c, a = (t[x.getElementIndex(y, u)] - t[x.getElementIndex(u, y)]) * c, l[u] = (t[x.getElementIndex(u, o)] + t[x.getElementIndex(o, u)]) * c, l[y] = (t[x.getElementIndex(y, o)] + t[x.getElementIndex(o, y)]) * c, n = -l[0], r = -l[1], -l[2]);
    return w(e) ? (e.x = n, e.y = r, e.z = O, e.w = a, e) : new j(n, r, O, a);
  };

  var n = new j(),
      r = new j(),
      o = new j(),
      u = new j();

  j.fromHeadingPitchRoll = function (t, e) {
    return b.typeOf.object("headingPitchRoll", t), u = j.fromAxisAngle(l.UNIT_X, t.roll, n), o = j.fromAxisAngle(l.UNIT_Y, -t.pitch, e), e = j.multiply(o, u, o), r = j.fromAxisAngle(l.UNIT_Z, -t.heading, n), j.multiply(r, e, e);
  };

  var c = new l(),
      i = new l(),
      f = new j(),
      s = new j(),
      O = new j();
  j.packedLength = 4, j.pack = function (t, e, n) {
    return b.typeOf.object("value", t), b.defined("array", e), n = a(n, 0), e[n++] = t.x, e[n++] = t.y, e[n++] = t.z, e[n] = t.w, e;
  }, j.unpack = function (t, e, n) {
    return b.defined("array", t), e = a(e, 0), w(n) || (n = new j()), n.x = t[e], n.y = t[e + 1], n.z = t[e + 2], n.w = t[e + 3], n;
  }, j.packedInterpolationLength = 3, j.convertPackedArrayForInterpolation = function (t, e, n, r) {
    j.unpack(t, 4 * n, O), j.conjugate(O, O);

    for (var a = 0, o = n - e + 1; a < o; a++) {
      var u = 3 * a;
      j.unpack(t, 4 * (e + a), f), j.multiply(f, O, f), f.w < 0 && j.negate(f, f), j.computeAxis(f, c);
      var y = j.computeAngle(f);
      r[u] = c.x * y, r[1 + u] = c.y * y, r[2 + u] = c.z * y;
    }
  }, j.unpackInterpolationResult = function (t, e, n, r, a) {
    w(a) || (a = new j()), l.fromArray(t, 0, i);
    var o = l.magnitude(i);
    return j.unpack(e, 4 * r, s), 0 === o ? j.clone(j.IDENTITY, f) : j.fromAxisAngle(i, o, f), j.multiply(f, s, a);
  }, j.clone = function (t, e) {
    if (w(t)) return w(e) ? (e.x = t.x, e.y = t.y, e.z = t.z, e.w = t.w, e) : new j(t.x, t.y, t.z, t.w);
  }, j.conjugate = function (t, e) {
    return b.typeOf.object("quaternion", t), b.typeOf.object("result", e), e.x = -t.x, e.y = -t.y, e.z = -t.z, e.w = t.w, e;
  }, j.magnitudeSquared = function (t) {
    return b.typeOf.object("quaternion", t), t.x * t.x + t.y * t.y + t.z * t.z + t.w * t.w;
  }, j.magnitude = function (t) {
    return Math.sqrt(j.magnitudeSquared(t));
  }, j.normalize = function (t, e) {
    b.typeOf.object("result", e);
    var n = 1 / j.magnitude(t),
        r = t.x * n,
        a = t.y * n,
        o = t.z * n,
        u = t.w * n;
    return e.x = r, e.y = a, e.z = o, e.w = u, e;
  }, j.inverse = function (t, e) {
    b.typeOf.object("result", e);
    var n = j.magnitudeSquared(t);
    return e = j.conjugate(t, e), j.multiplyByScalar(e, 1 / n, e);
  }, j.add = function (t, e, n) {
    return b.typeOf.object("left", t), b.typeOf.object("right", e), b.typeOf.object("result", n), n.x = t.x + e.x, n.y = t.y + e.y, n.z = t.z + e.z, n.w = t.w + e.w, n;
  }, j.subtract = function (t, e, n) {
    return b.typeOf.object("left", t), b.typeOf.object("right", e), b.typeOf.object("result", n), n.x = t.x - e.x, n.y = t.y - e.y, n.z = t.z - e.z, n.w = t.w - e.w, n;
  }, j.negate = function (t, e) {
    return b.typeOf.object("quaternion", t), b.typeOf.object("result", e), e.x = -t.x, e.y = -t.y, e.z = -t.z, e.w = -t.w, e;
  }, j.dot = function (t, e) {
    return b.typeOf.object("left", t), b.typeOf.object("right", e), t.x * e.x + t.y * e.y + t.z * e.z + t.w * e.w;
  }, j.multiply = function (t, e, n) {
    b.typeOf.object("left", t), b.typeOf.object("right", e), b.typeOf.object("result", n);
    var r = t.x,
        a = t.y,
        o = t.z,
        u = t.w,
        y = e.x,
        c = e.y,
        l = e.z,
        p = e.w,
        i = u * y + r * p + a * l - o * c,
        f = u * c - r * l + a * p + o * y,
        s = u * l + r * c - a * y + o * p,
        O = u * p - r * y - a * c - o * l;
    return n.x = i, n.y = f, n.z = s, n.w = O, n;
  }, j.multiplyByScalar = function (t, e, n) {
    return b.typeOf.object("quaternion", t), b.typeOf.number("scalar", e), b.typeOf.object("result", n), n.x = t.x * e, n.y = t.y * e, n.z = t.z * e, n.w = t.w * e, n;
  }, j.divideByScalar = function (t, e, n) {
    return b.typeOf.object("quaternion", t), b.typeOf.number("scalar", e), b.typeOf.object("result", n), n.x = t.x / e, n.y = t.y / e, n.z = t.z / e, n.w = t.w / e, n;
  }, j.computeAxis = function (t, e) {
    b.typeOf.object("quaternion", t), b.typeOf.object("result", e);
    var n = t.w;
    if (Math.abs(n - 1) < y.EPSILON6) return e.x = e.y = e.z = 0, e;
    var r = 1 / Math.sqrt(1 - n * n);
    return e.x = t.x * r, e.y = t.y * r, e.z = t.z * r, e;
  }, j.computeAngle = function (t) {
    return b.typeOf.object("quaternion", t), Math.abs(t.w - 1) < y.EPSILON6 ? 0 : 2 * Math.acos(t.w);
  };
  var g = new j();

  j.lerp = function (t, e, n, r) {
    return b.typeOf.object("start", t), b.typeOf.object("end", e), b.typeOf.number("t", n), b.typeOf.object("result", r), g = j.multiplyByScalar(e, n, g), r = j.multiplyByScalar(t, 1 - n, r), j.add(g, r, r);
  };

  var z = new j(),
      h = new j(),
      v = new j();
  j.slerp = function (t, e, n, r) {
    b.typeOf.object("start", t), b.typeOf.object("end", e), b.typeOf.number("t", n), b.typeOf.object("result", r);
    var a = j.dot(t, e),
        o = e;
    if (a < 0 && (a = -a, o = z = j.negate(e, z)), 1 - a < y.EPSILON6) return j.lerp(t, o, n, r);
    var u = Math.acos(a);
    return h = j.multiplyByScalar(t, Math.sin((1 - n) * u), h), v = j.multiplyByScalar(o, Math.sin(n * u), v), r = j.add(h, v, r), j.multiplyByScalar(r, 1 / Math.sin(u), r);
  }, j.log = function (t, e) {
    b.typeOf.object("quaternion", t), b.typeOf.object("result", e);
    var n = y.acosClamped(t.w),
        r = 0;
    return 0 !== n && (r = n / Math.sin(n)), l.multiplyByScalar(t, r, e);
  }, j.exp = function (t, e) {
    b.typeOf.object("cartesian", t), b.typeOf.object("result", e);
    var n = l.magnitude(t),
        r = 0;
    return 0 !== n && (r = Math.sin(n) / n), e.x = t.x * r, e.y = t.y * r, e.z = t.z * r, e.w = Math.cos(n), e;
  };
  var M = new l(),
      q = new l(),
      A = new j(),
      S = new j();
  j.computeInnerQuadrangle = function (t, e, n, r) {
    b.typeOf.object("q0", t), b.typeOf.object("q1", e), b.typeOf.object("q2", n), b.typeOf.object("result", r);
    var a = j.conjugate(e, A);
    j.multiply(a, n, S);
    var o = j.log(S, M);
    j.multiply(a, t, S);
    var u = j.log(S, q);
    return l.add(o, u, o), l.multiplyByScalar(o, .25, o), l.negate(o, o), j.exp(o, A), j.multiply(e, A, r);
  }, j.squad = function (t, e, n, r, a, o) {
    b.typeOf.object("q0", t), b.typeOf.object("q1", e), b.typeOf.object("s0", n), b.typeOf.object("s1", r), b.typeOf.number("t", a), b.typeOf.object("result", o);
    var u = j.slerp(t, e, a, A),
        y = j.slerp(n, r, a, S);
    return j.slerp(u, y, 2 * a * (1 - a), o);
  };

  for (var I = new j(), E = 1.9011074535173003, N = t.supportsTypedArrays() ? new Float32Array(8) : [], L = t.supportsTypedArrays() ? new Float32Array(8) : [], R = t.supportsTypedArrays() ? new Float32Array(8) : [], B = t.supportsTypedArrays() ? new Float32Array(8) : [], C = 0; C < 7; ++C) {
    var U = C + 1,
        T = 2 * U + 1;
    N[C] = 1 / (U * T), L[C] = U / T;
  }

  return N[7] = E / 136, L[7] = 8 * E / 17, j.fastSlerp = function (t, e, n, r) {
    b.typeOf.object("start", t), b.typeOf.object("end", e), b.typeOf.number("t", n), b.typeOf.object("result", r);
    var a,
        o = j.dot(t, e);
    0 <= o ? a = 1 : (a = -1, o = -o);

    for (var u = o - 1, y = 1 - n, c = n * n, l = y * y, p = 7; 0 <= p; --p) {
      R[p] = (N[p] * c - L[p]) * u, B[p] = (N[p] * l - L[p]) * u;
    }

    var i = a * n * (1 + R[0] * (1 + R[1] * (1 + R[2] * (1 + R[3] * (1 + R[4] * (1 + R[5] * (1 + R[6] * (1 + R[7])))))))),
        f = y * (1 + B[0] * (1 + B[1] * (1 + B[2] * (1 + B[3] * (1 + B[4] * (1 + B[5] * (1 + B[6] * (1 + B[7])))))))),
        s = j.multiplyByScalar(t, f, I);
    return j.multiplyByScalar(e, i, r), j.add(s, r, r);
  }, j.fastSquad = function (t, e, n, r, a, o) {
    b.typeOf.object("q0", t), b.typeOf.object("q1", e), b.typeOf.object("s0", n), b.typeOf.object("s1", r), b.typeOf.number("t", a), b.typeOf.object("result", o);
    var u = j.fastSlerp(t, e, a, A),
        y = j.fastSlerp(n, r, a, S);
    return j.fastSlerp(u, y, 2 * a * (1 - a), o);
  }, j.equals = function (t, e) {
    return t === e || w(t) && w(e) && t.x === e.x && t.y === e.y && t.z === e.z && t.w === e.w;
  }, j.equalsEpsilon = function (t, e, n) {
    return b.typeOf.number("epsilon", n), t === e || w(t) && w(e) && Math.abs(t.x - e.x) <= n && Math.abs(t.y - e.y) <= n && Math.abs(t.z - e.z) <= n && Math.abs(t.w - e.w) <= n;
  }, j.ZERO = e(new j(0, 0, 0, 0)), j.IDENTITY = e(new j(0, 0, 0, 1)), j.prototype.clone = function (t) {
    return j.clone(this, t);
  }, j.prototype.equals = function (t) {
    return j.equals(this, t);
  }, j.prototype.equalsEpsilon = function (t, e) {
    return j.equalsEpsilon(this, t, e);
  }, j.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
  }, j;
});