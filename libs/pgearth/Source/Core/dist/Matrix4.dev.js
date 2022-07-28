"use strict";

define(["./Cartesian3", "./Cartesian4", "./Check", "./defaultValue", "./defined", "./defineProperties", "./freezeObject", "./Math", "./Matrix3", "./RuntimeError"], function (M, J, K, m, T, t, e, _, G, H) {
  "use strict";

  function X(t, e, r, n, a, o, i, u, f, c, s, y, p, O, b, l) {
    this[0] = m(t, 0), this[1] = m(a, 0), this[2] = m(f, 0), this[3] = m(p, 0), this[4] = m(e, 0), this[5] = m(o, 0), this[6] = m(c, 0), this[7] = m(O, 0), this[8] = m(r, 0), this[9] = m(i, 0), this[10] = m(s, 0), this[11] = m(b, 0), this[12] = m(n, 0), this[13] = m(u, 0), this[14] = m(y, 0), this[15] = m(l, 0);
  }

  X.packedLength = 16, X.pack = function (t, e, r) {
    return K.typeOf.object("value", t), K.defined("array", e), r = m(r, 0), e[r++] = t[0], e[r++] = t[1], e[r++] = t[2], e[r++] = t[3], e[r++] = t[4], e[r++] = t[5], e[r++] = t[6], e[r++] = t[7], e[r++] = t[8], e[r++] = t[9], e[r++] = t[10], e[r++] = t[11], e[r++] = t[12], e[r++] = t[13], e[r++] = t[14], e[r] = t[15], e;
  }, X.unpack = function (t, e, r) {
    return K.defined("array", t), e = m(e, 0), T(r) || (r = new X()), r[0] = t[e++], r[1] = t[e++], r[2] = t[e++], r[3] = t[e++], r[4] = t[e++], r[5] = t[e++], r[6] = t[e++], r[7] = t[e++], r[8] = t[e++], r[9] = t[e++], r[10] = t[e++], r[11] = t[e++], r[12] = t[e++], r[13] = t[e++], r[14] = t[e++], r[15] = t[e], r;
  }, X.clone = function (t, e) {
    if (T(t)) return T(e) ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e) : new X(t[0], t[4], t[8], t[12], t[1], t[5], t[9], t[13], t[2], t[6], t[10], t[14], t[3], t[7], t[11], t[15]);
  }, X.fromArray = X.unpack, X.fromColumnMajorArray = function (t, e) {
    return K.defined("values", t), X.clone(t, e);
  }, X.fromRowMajorArray = function (t, e) {
    return K.defined("values", t), T(e) ? (e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15], e) : new X(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
  }, X.fromRotationTranslation = function (t, e, r) {
    return K.typeOf.object("rotation", t), e = m(e, M.ZERO), T(r) ? (r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = 0, r[4] = t[3], r[5] = t[4], r[6] = t[5], r[7] = 0, r[8] = t[6], r[9] = t[7], r[10] = t[8], r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, r) : new X(t[0], t[3], t[6], e.x, t[1], t[4], t[7], e.y, t[2], t[5], t[8], e.z, 0, 0, 0, 1);
  }, X.fromTranslationQuaternionRotationScale = function (t, e, r, n) {
    K.typeOf.object("translation", t), K.typeOf.object("rotation", e), K.typeOf.object("scale", r), T(n) || (n = new X());
    var a = r.x,
        o = r.y,
        i = r.z,
        u = e.x * e.x,
        f = e.x * e.y,
        c = e.x * e.z,
        s = e.x * e.w,
        y = e.y * e.y,
        p = e.y * e.z,
        O = e.y * e.w,
        b = e.z * e.z,
        l = e.z * e.w,
        m = e.w * e.w,
        h = u - y - b + m,
        j = 2 * (f - l),
        x = 2 * (c + O),
        M = 2 * (f + l),
        w = y - u - b + m,
        v = 2 * (p - s),
        d = 2 * (c - O),
        g = 2 * (p + s),
        z = -u - y + b + m;
    return n[0] = h * a, n[1] = M * a, n[2] = d * a, n[3] = 0, n[4] = j * o, n[5] = w * o, n[6] = g * o, n[7] = 0, n[8] = x * i, n[9] = v * i, n[10] = z * i, n[11] = 0, n[12] = t.x, n[13] = t.y, n[14] = t.z, n[15] = 1, n;
  }, X.fromTranslationRotationScale = function (t, e) {
    return K.typeOf.object("translationRotationScale", t), X.fromTranslationQuaternionRotationScale(t.translation, t.rotation, t.scale, e);
  }, X.fromTranslation = function (t, e) {
    return K.typeOf.object("translation", t), X.fromRotationTranslation(G.IDENTITY, t, e);
  }, X.fromScale = function (t, e) {
    return K.typeOf.object("scale", t), T(e) ? (e[0] = t.x, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = t.y, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = t.z, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e) : new X(t.x, 0, 0, 0, 0, t.y, 0, 0, 0, 0, t.z, 0, 0, 0, 0, 1);
  }, X.fromUniformScale = function (t, e) {
    return K.typeOf.number("scale", t), T(e) ? (e[0] = t, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = t, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = t, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e) : new X(t, 0, 0, 0, 0, t, 0, 0, 0, 0, t, 0, 0, 0, 0, 1);
  };
  var w = new M(),
      v = new M(),
      d = new M();
  X.fromCamera = function (t, e) {
    K.typeOf.object("camera", t);
    var r = t.position,
        n = t.direction,
        a = t.up;
    K.typeOf.object("camera.position", r), K.typeOf.object("camera.direction", n), K.typeOf.object("camera.up", a), M.normalize(n, w), M.normalize(M.cross(w, a, v), v), M.normalize(M.cross(v, w, d), d);
    var o = v.x,
        i = v.y,
        u = v.z,
        f = w.x,
        c = w.y,
        s = w.z,
        y = d.x,
        p = d.y,
        O = d.z,
        b = r.x,
        l = r.y,
        m = r.z,
        h = o * -b + i * -l + u * -m,
        j = y * -b + p * -l + O * -m,
        x = f * b + c * l + s * m;
    return T(e) ? (e[0] = o, e[1] = y, e[2] = -f, e[3] = 0, e[4] = i, e[5] = p, e[6] = -c, e[7] = 0, e[8] = u, e[9] = O, e[10] = -s, e[11] = 0, e[12] = h, e[13] = j, e[14] = x, e[15] = 1, e) : new X(o, i, u, h, y, p, O, j, -f, -c, -s, x, 0, 0, 0, 1);
  }, X.computePerspectiveFieldOfView = function (t, e, r, n, a) {
    K.typeOf.number.greaterThan("fovY", t, 0), K.typeOf.number.lessThan("fovY", t, Math.PI), K.typeOf.number.greaterThan("near", r, 0), K.typeOf.number.greaterThan("far", n, 0), K.typeOf.object("result", a);
    var o = 1 / Math.tan(.5 * t),
        i = o / e,
        u = (n + r) / (r - n),
        f = 2 * n * r / (r - n);
    return a[0] = i, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = o, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = u, a[11] = -1, a[12] = 0, a[13] = 0, a[14] = f, a[15] = 0, a;
  }, X.computeOrthographicOffCenter = function (t, e, r, n, a, o, i) {
    K.typeOf.number("left", t), K.typeOf.number("right", e), K.typeOf.number("bottom", r), K.typeOf.number("top", n), K.typeOf.number("near", a), K.typeOf.number("far", o), K.typeOf.object("result", i);
    var u = 1 / (e - t),
        f = 1 / (n - r),
        c = 1 / (o - a),
        s = -(e + t) * u,
        y = -(n + r) * f,
        p = -(o + a) * c;
    return u *= 2, f *= 2, c *= -2, i[0] = u, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = f, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[10] = c, i[11] = 0, i[12] = s, i[13] = y, i[14] = p, i[15] = 1, i;
  }, X.computePerspectiveOffCenter = function (t, e, r, n, a, o, i) {
    K.typeOf.number("left", t), K.typeOf.number("right", e), K.typeOf.number("bottom", r), K.typeOf.number("top", n), K.typeOf.number("near", a), K.typeOf.number("far", o), K.typeOf.object("result", i);
    var u = 2 * a / (e - t),
        f = 2 * a / (n - r),
        c = (e + t) / (e - t),
        s = (n + r) / (n - r),
        y = -(o + a) / (o - a),
        p = -2 * o * a / (o - a);
    return i[0] = u, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = f, i[6] = 0, i[7] = 0, i[8] = c, i[9] = s, i[10] = y, i[11] = -1, i[12] = 0, i[13] = 0, i[14] = p, i[15] = 0, i;
  }, X.computeInfinitePerspectiveOffCenter = function (t, e, r, n, a, o) {
    K.typeOf.number("left", t), K.typeOf.number("right", e), K.typeOf.number("bottom", r), K.typeOf.number("top", n), K.typeOf.number("near", a), K.typeOf.object("result", o);
    var i = 2 * a / (e - t),
        u = 2 * a / (n - r),
        f = (e + t) / (e - t),
        c = (n + r) / (n - r),
        s = -2 * a;
    return o[0] = i, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = u, o[6] = 0, o[7] = 0, o[8] = f, o[9] = c, o[10] = -1, o[11] = -1, o[12] = 0, o[13] = 0, o[14] = s, o[15] = 0, o;
  }, X.computeViewportTransformation = function (t, e, r, n) {
    K.typeOf.object("result", n), t = m(t, m.EMPTY_OBJECT);
    var a = m(t.x, 0),
        o = m(t.y, 0),
        i = m(t.width, 0),
        u = m(t.height, 0);
    e = m(e, 0);
    var f = .5 * i,
        c = .5 * u,
        s = .5 * ((r = m(r, 1)) - e),
        y = c,
        p = s,
        O = a + f,
        b = o + c,
        l = e + s;
    return n[0] = f, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = y, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = p, n[11] = 0, n[12] = O, n[13] = b, n[14] = l, n[15] = 1, n;
  }, X.computeView = function (t, e, r, n, a) {
    return K.typeOf.object("position", t), K.typeOf.object("direction", e), K.typeOf.object("up", r), K.typeOf.object("right", n), K.typeOf.object("result", a), a[0] = n.x, a[1] = r.x, a[2] = -e.x, a[3] = 0, a[4] = n.y, a[5] = r.y, a[6] = -e.y, a[7] = 0, a[8] = n.z, a[9] = r.z, a[10] = -e.z, a[11] = 0, a[12] = -M.dot(n, t), a[13] = -M.dot(r, t), a[14] = M.dot(e, t), a[15] = 1, a;
  }, X.toArray = function (t, e) {
    return K.typeOf.object("matrix", t), T(e) ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e) : [t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]];
  }, X.getElementIndex = function (t, e) {
    return K.typeOf.number.greaterThanOrEquals("row", e, 0), K.typeOf.number.lessThanOrEquals("row", e, 3), K.typeOf.number.greaterThanOrEquals("column", t, 0), K.typeOf.number.lessThanOrEquals("column", t, 3), 4 * t + e;
  }, X.getColumn = function (t, e, r) {
    K.typeOf.object("matrix", t), K.typeOf.number.greaterThanOrEquals("index", e, 0), K.typeOf.number.lessThanOrEquals("index", e, 3), K.typeOf.object("result", r);
    var n = 4 * e,
        a = t[n],
        o = t[1 + n],
        i = t[2 + n],
        u = t[3 + n];
    return r.x = a, r.y = o, r.z = i, r.w = u, r;
  }, X.setColumn = function (t, e, r, n) {
    K.typeOf.object("matrix", t), K.typeOf.number.greaterThanOrEquals("index", e, 0), K.typeOf.number.lessThanOrEquals("index", e, 3), K.typeOf.object("cartesian", r), K.typeOf.object("result", n);
    var a = 4 * e;
    return (n = X.clone(t, n))[a] = r.x, n[1 + a] = r.y, n[2 + a] = r.z, n[3 + a] = r.w, n;
  }, X.setTranslation = function (t, e, r) {
    return K.typeOf.object("matrix", t), K.typeOf.object("translation", e), K.typeOf.object("result", r), r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4], r[5] = t[5], r[6] = t[6], r[7] = t[7], r[8] = t[8], r[9] = t[9], r[10] = t[10], r[11] = t[11], r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = t[15], r;
  };
  var o = new M();
  X.setScale = function (t, e, r) {
    K.typeOf.object("matrix", t), K.typeOf.object("scale", e), K.typeOf.object("result", r);
    var n = X.getScale(t, o),
        a = M.divideComponents(e, n, o);
    return X.multiplyByScale(t, a, r);
  }, X.getRow = function (t, e, r) {
    K.typeOf.object("matrix", t), K.typeOf.number.greaterThanOrEquals("index", e, 0), K.typeOf.number.lessThanOrEquals("index", e, 3), K.typeOf.object("result", r);
    var n = t[e],
        a = t[e + 4],
        o = t[e + 8],
        i = t[e + 12];
    return r.x = n, r.y = a, r.z = o, r.w = i, r;
  }, X.setRow = function (t, e, r, n) {
    return K.typeOf.object("matrix", t), K.typeOf.number.greaterThanOrEquals("index", e, 0), K.typeOf.number.lessThanOrEquals("index", e, 3), K.typeOf.object("cartesian", r), K.typeOf.object("result", n), (n = X.clone(t, n))[e] = r.x, n[e + 4] = r.y, n[e + 8] = r.z, n[e + 12] = r.w, n;
  };
  var r = new M();

  X.getScale = function (t, e) {
    return K.typeOf.object("matrix", t), K.typeOf.object("result", e), e.x = M.magnitude(M.fromElements(t[0], t[1], t[2], r)), e.y = M.magnitude(M.fromElements(t[4], t[5], t[6], r)), e.z = M.magnitude(M.fromElements(t[8], t[9], t[10], r)), e;
  };

  var n = new M();
  X.getMaximumScale = function (t) {
    return X.getScale(t, n), M.maximumComponent(n);
  }, X.multiply = function (t, e, r) {
    K.typeOf.object("left", t), K.typeOf.object("right", e), K.typeOf.object("result", r);

    var n = t[0],
        a = t[1],
        o = t[2],
        i = t[3],
        u = t[4],
        f = t[5],
        c = t[6],
        s = t[7],
        y = t[8],
        p = t[9],
        O = t[10],
        b = t[11],
        l = t[12],
        m = t[13],
        h = t[14],
        j = t[15],
        x = e[0],
        M = e[1],
        w = e[2],
        v = e[3],
        d = e[4],
        g = e[5],
        z = e[6],
        T = e[7],
        R = e[8],
        C = e[9],
        E = e[10],
        q = e[11],
        L = e[12],
        N = e[13],
        S = e[14],
        U = e[15],
        W = n * x + u * M + y * w + l * v,
        B = a * x + f * M + p * w + m * v,
        P = o * x + c * M + O * w + h * v,
        I = i * x + s * M + b * w + j * v,
        k = n * d + u * g + y * z + l * T,
        A = a * d + f * g + p * z + m * T,
        V = o * d + c * g + O * z + h * T,
        Y = i * d + s * g + b * z + j * T,
        D = n * R + u * C + y * E + l * q,
        Q = a * R + f * C + p * E + m * q,
        Z = o * R + c * C + O * E + h * q,
        F = i * R + s * C + b * E + j * q,
        J = n * L + u * N + y * S + l * U,
        _ = a * L + f * N + p * S + m * U,
        G = o * L + c * N + O * S + h * U,
        H = i * L + s * N + b * S + j * U;

    return r[0] = W, r[1] = B, r[2] = P, r[3] = I, r[4] = k, r[5] = A, r[6] = V, r[7] = Y, r[8] = D, r[9] = Q, r[10] = Z, r[11] = F, r[12] = J, r[13] = _, r[14] = G, r[15] = H, r;
  }, X.add = function (t, e, r) {
    return K.typeOf.object("left", t), K.typeOf.object("right", e), K.typeOf.object("result", r), r[0] = t[0] + e[0], r[1] = t[1] + e[1], r[2] = t[2] + e[2], r[3] = t[3] + e[3], r[4] = t[4] + e[4], r[5] = t[5] + e[5], r[6] = t[6] + e[6], r[7] = t[7] + e[7], r[8] = t[8] + e[8], r[9] = t[9] + e[9], r[10] = t[10] + e[10], r[11] = t[11] + e[11], r[12] = t[12] + e[12], r[13] = t[13] + e[13], r[14] = t[14] + e[14], r[15] = t[15] + e[15], r;
  }, X.subtract = function (t, e, r) {
    return K.typeOf.object("left", t), K.typeOf.object("right", e), K.typeOf.object("result", r), r[0] = t[0] - e[0], r[1] = t[1] - e[1], r[2] = t[2] - e[2], r[3] = t[3] - e[3], r[4] = t[4] - e[4], r[5] = t[5] - e[5], r[6] = t[6] - e[6], r[7] = t[7] - e[7], r[8] = t[8] - e[8], r[9] = t[9] - e[9], r[10] = t[10] - e[10], r[11] = t[11] - e[11], r[12] = t[12] - e[12], r[13] = t[13] - e[13], r[14] = t[14] - e[14], r[15] = t[15] - e[15], r;
  }, X.multiplyTransformation = function (t, e, r) {
    K.typeOf.object("left", t), K.typeOf.object("right", e), K.typeOf.object("result", r);
    var n = t[0],
        a = t[1],
        o = t[2],
        i = t[4],
        u = t[5],
        f = t[6],
        c = t[8],
        s = t[9],
        y = t[10],
        p = t[12],
        O = t[13],
        b = t[14],
        l = e[0],
        m = e[1],
        h = e[2],
        j = e[4],
        x = e[5],
        M = e[6],
        w = e[8],
        v = e[9],
        d = e[10],
        g = e[12],
        z = e[13],
        T = e[14],
        R = n * l + i * m + c * h,
        C = a * l + u * m + s * h,
        E = o * l + f * m + y * h,
        q = n * j + i * x + c * M,
        L = a * j + u * x + s * M,
        N = o * j + f * x + y * M,
        S = n * w + i * v + c * d,
        U = a * w + u * v + s * d,
        W = o * w + f * v + y * d,
        B = n * g + i * z + c * T + p,
        P = a * g + u * z + s * T + O,
        I = o * g + f * z + y * T + b;
    return r[0] = R, r[1] = C, r[2] = E, r[3] = 0, r[4] = q, r[5] = L, r[6] = N, r[7] = 0, r[8] = S, r[9] = U, r[10] = W, r[11] = 0, r[12] = B, r[13] = P, r[14] = I, r[15] = 1, r;
  }, X.multiplyByMatrix3 = function (t, e, r) {
    K.typeOf.object("matrix", t), K.typeOf.object("rotation", e), K.typeOf.object("result", r);
    var n = t[0],
        a = t[1],
        o = t[2],
        i = t[4],
        u = t[5],
        f = t[6],
        c = t[8],
        s = t[9],
        y = t[10],
        p = e[0],
        O = e[1],
        b = e[2],
        l = e[3],
        m = e[4],
        h = e[5],
        j = e[6],
        x = e[7],
        M = e[8],
        w = n * p + i * O + c * b,
        v = a * p + u * O + s * b,
        d = o * p + f * O + y * b,
        g = n * l + i * m + c * h,
        z = a * l + u * m + s * h,
        T = o * l + f * m + y * h,
        R = n * j + i * x + c * M,
        C = a * j + u * x + s * M,
        E = o * j + f * x + y * M;
    return r[0] = w, r[1] = v, r[2] = d, r[3] = 0, r[4] = g, r[5] = z, r[6] = T, r[7] = 0, r[8] = R, r[9] = C, r[10] = E, r[11] = 0, r[12] = t[12], r[13] = t[13], r[14] = t[14], r[15] = t[15], r;
  }, X.multiplyByTranslation = function (t, e, r) {
    K.typeOf.object("matrix", t), K.typeOf.object("translation", e), K.typeOf.object("result", r);
    var n = e.x,
        a = e.y,
        o = e.z,
        i = n * t[0] + a * t[4] + o * t[8] + t[12],
        u = n * t[1] + a * t[5] + o * t[9] + t[13],
        f = n * t[2] + a * t[6] + o * t[10] + t[14];
    return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4], r[5] = t[5], r[6] = t[6], r[7] = t[7], r[8] = t[8], r[9] = t[9], r[10] = t[10], r[11] = t[11], r[12] = i, r[13] = u, r[14] = f, r[15] = t[15], r;
  };
  var a = new M();
  X.multiplyByUniformScale = function (t, e, r) {
    return K.typeOf.object("matrix", t), K.typeOf.number("scale", e), K.typeOf.object("result", r), a.x = e, a.y = e, a.z = e, X.multiplyByScale(t, a, r);
  }, X.multiplyByScale = function (t, e, r) {
    K.typeOf.object("matrix", t), K.typeOf.object("scale", e), K.typeOf.object("result", r);
    var n = e.x,
        a = e.y,
        o = e.z;
    return 1 === n && 1 === a && 1 === o ? X.clone(t, r) : (r[0] = n * t[0], r[1] = n * t[1], r[2] = n * t[2], r[3] = 0, r[4] = a * t[4], r[5] = a * t[5], r[6] = a * t[6], r[7] = 0, r[8] = o * t[8], r[9] = o * t[9], r[10] = o * t[10], r[11] = 0, r[12] = t[12], r[13] = t[13], r[14] = t[14], r[15] = 1, r);
  }, X.multiplyByVector = function (t, e, r) {
    K.typeOf.object("matrix", t), K.typeOf.object("cartesian", e), K.typeOf.object("result", r);
    var n = e.x,
        a = e.y,
        o = e.z,
        i = e.w,
        u = t[0] * n + t[4] * a + t[8] * o + t[12] * i,
        f = t[1] * n + t[5] * a + t[9] * o + t[13] * i,
        c = t[2] * n + t[6] * a + t[10] * o + t[14] * i,
        s = t[3] * n + t[7] * a + t[11] * o + t[15] * i;
    return r.x = u, r.y = f, r.z = c, r.w = s, r;
  }, X.multiplyByPointAsVector = function (t, e, r) {
    K.typeOf.object("matrix", t), K.typeOf.object("cartesian", e), K.typeOf.object("result", r);
    var n = e.x,
        a = e.y,
        o = e.z,
        i = t[0] * n + t[4] * a + t[8] * o,
        u = t[1] * n + t[5] * a + t[9] * o,
        f = t[2] * n + t[6] * a + t[10] * o;
    return r.x = i, r.y = u, r.z = f, r;
  }, X.multiplyByPoint = function (t, e, r) {
    K.typeOf.object("matrix", t), K.typeOf.object("cartesian", e), K.typeOf.object("result", r);
    var n = e.x,
        a = e.y,
        o = e.z,
        i = t[0] * n + t[4] * a + t[8] * o + t[12],
        u = t[1] * n + t[5] * a + t[9] * o + t[13],
        f = t[2] * n + t[6] * a + t[10] * o + t[14];
    return r.x = i, r.y = u, r.z = f, r;
  }, X.multiplyByScalar = function (t, e, r) {
    return K.typeOf.object("matrix", t), K.typeOf.number("scalar", e), K.typeOf.object("result", r), r[0] = t[0] * e, r[1] = t[1] * e, r[2] = t[2] * e, r[3] = t[3] * e, r[4] = t[4] * e, r[5] = t[5] * e, r[6] = t[6] * e, r[7] = t[7] * e, r[8] = t[8] * e, r[9] = t[9] * e, r[10] = t[10] * e, r[11] = t[11] * e, r[12] = t[12] * e, r[13] = t[13] * e, r[14] = t[14] * e, r[15] = t[15] * e, r;
  }, X.negate = function (t, e) {
    return K.typeOf.object("matrix", t), K.typeOf.object("result", e), e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = -t[3], e[4] = -t[4], e[5] = -t[5], e[6] = -t[6], e[7] = -t[7], e[8] = -t[8], e[9] = -t[9], e[10] = -t[10], e[11] = -t[11], e[12] = -t[12], e[13] = -t[13], e[14] = -t[14], e[15] = -t[15], e;
  }, X.transpose = function (t, e) {
    K.typeOf.object("matrix", t), K.typeOf.object("result", e);
    var r = t[1],
        n = t[2],
        a = t[3],
        o = t[6],
        i = t[7],
        u = t[11];
    return e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = r, e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = n, e[9] = o, e[10] = t[10], e[11] = t[14], e[12] = a, e[13] = i, e[14] = u, e[15] = t[15], e;
  }, X.abs = function (t, e) {
    return K.typeOf.object("matrix", t), K.typeOf.object("result", e), e[0] = Math.abs(t[0]), e[1] = Math.abs(t[1]), e[2] = Math.abs(t[2]), e[3] = Math.abs(t[3]), e[4] = Math.abs(t[4]), e[5] = Math.abs(t[5]), e[6] = Math.abs(t[6]), e[7] = Math.abs(t[7]), e[8] = Math.abs(t[8]), e[9] = Math.abs(t[9]), e[10] = Math.abs(t[10]), e[11] = Math.abs(t[11]), e[12] = Math.abs(t[12]), e[13] = Math.abs(t[13]), e[14] = Math.abs(t[14]), e[15] = Math.abs(t[15]), e;
  }, X.equals = function (t, e) {
    return t === e || T(t) && T(e) && t[12] === e[12] && t[13] === e[13] && t[14] === e[14] && t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[4] === e[4] && t[5] === e[5] && t[6] === e[6] && t[8] === e[8] && t[9] === e[9] && t[10] === e[10] && t[3] === e[3] && t[7] === e[7] && t[11] === e[11] && t[15] === e[15];
  }, X.equalsEpsilon = function (t, e, r) {
    return K.typeOf.number("epsilon", r), t === e || T(t) && T(e) && Math.abs(t[0] - e[0]) <= r && Math.abs(t[1] - e[1]) <= r && Math.abs(t[2] - e[2]) <= r && Math.abs(t[3] - e[3]) <= r && Math.abs(t[4] - e[4]) <= r && Math.abs(t[5] - e[5]) <= r && Math.abs(t[6] - e[6]) <= r && Math.abs(t[7] - e[7]) <= r && Math.abs(t[8] - e[8]) <= r && Math.abs(t[9] - e[9]) <= r && Math.abs(t[10] - e[10]) <= r && Math.abs(t[11] - e[11]) <= r && Math.abs(t[12] - e[12]) <= r && Math.abs(t[13] - e[13]) <= r && Math.abs(t[14] - e[14]) <= r && Math.abs(t[15] - e[15]) <= r;
  }, X.getTranslation = function (t, e) {
    return K.typeOf.object("matrix", t), K.typeOf.object("result", e), e.x = t[12], e.y = t[13], e.z = t[14], e;
  }, X.getRotation = function (t, e) {
    return K.typeOf.object("matrix", t), K.typeOf.object("result", e), e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[4], e[4] = t[5], e[5] = t[6], e[6] = t[8], e[7] = t[9], e[8] = t[10], e;
  };
  var $ = new G(),
      tt = new G(),
      et = new J(),
      rt = new J(0, 0, 0, 1);
  return X.inverse = function (t, e) {
    K.typeOf.object("matrix", t), K.typeOf.object("result", e);
    var r = t[0],
        n = t[4],
        a = t[8],
        o = t[12],
        i = t[1],
        u = t[5],
        f = t[9],
        c = t[13],
        s = t[2],
        y = t[6],
        p = t[10],
        O = t[14],
        b = t[3],
        l = t[7],
        m = t[11],
        h = t[15],
        j = p * h,
        x = O * m,
        M = y * h,
        w = O * l,
        v = y * m,
        d = p * l,
        g = s * h,
        z = O * b,
        T = s * m,
        R = p * b,
        C = s * l,
        E = y * b,
        q = j * u + w * f + v * c - (x * u + M * f + d * c),
        L = x * i + g * f + R * c - (j * i + z * f + T * c),
        N = M * i + z * u + C * c - (w * i + g * u + E * c),
        S = d * i + T * u + E * f - (v * i + R * u + C * f),
        U = x * n + M * a + d * o - (j * n + w * a + v * o),
        W = j * r + z * a + T * o - (x * r + g * a + R * o),
        B = w * r + g * n + E * o - (M * r + z * n + C * o),
        P = v * r + R * n + C * a - (d * r + T * n + E * a),
        I = (j = a * c) * l + (w = o * u) * m + (v = n * f) * h - ((x = o * f) * l + (M = n * c) * m + (d = a * u) * h),
        k = x * b + (g = r * c) * m + (R = a * i) * h - (j * b + (z = o * i) * m + (T = r * f) * h),
        A = M * b + z * l + (C = r * u) * h - (w * b + g * l + (E = n * i) * h),
        V = d * b + T * l + E * m - (v * b + R * l + C * m),
        Y = M * p + d * O + x * y - (v * O + j * y + w * p),
        D = T * O + j * s + z * p - (g * p + R * O + x * s),
        Q = g * y + E * O + w * s - (C * O + M * s + z * y),
        Z = C * p + v * s + R * y - (T * y + E * p + d * s),
        F = r * q + n * L + a * N + o * S;

    if (Math.abs(F) < _.EPSILON21) {
      if (G.equalsEpsilon(X.getRotation(t, $), tt, _.EPSILON7) && J.equals(X.getRow(t, 3, et), rt)) return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 0, e[11] = 0, e[12] = -t[12], e[13] = -t[13], e[14] = -t[14], e[15] = 1, e;
      throw new H("matrix is not invertible because its determinate is zero.");
    }

    return F = 1 / F, e[0] = q * F, e[1] = L * F, e[2] = N * F, e[3] = S * F, e[4] = U * F, e[5] = W * F, e[6] = B * F, e[7] = P * F, e[8] = I * F, e[9] = k * F, e[10] = A * F, e[11] = V * F, e[12] = Y * F, e[13] = D * F, e[14] = Q * F, e[15] = Z * F, e;
  }, X.inverseTransformation = function (t, e) {
    K.typeOf.object("matrix", t), K.typeOf.object("result", e);
    var r = t[0],
        n = t[1],
        a = t[2],
        o = t[4],
        i = t[5],
        u = t[6],
        f = t[8],
        c = t[9],
        s = t[10],
        y = t[12],
        p = t[13],
        O = t[14],
        b = -r * y - n * p - a * O,
        l = -o * y - i * p - u * O,
        m = -f * y - c * p - s * O;
    return e[0] = r, e[1] = o, e[2] = f, e[3] = 0, e[4] = n, e[5] = i, e[6] = c, e[7] = 0, e[8] = a, e[9] = u, e[10] = s, e[11] = 0, e[12] = b, e[13] = l, e[14] = m, e[15] = 1, e;
  }, X.IDENTITY = e(new X(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)), X.ZERO = e(new X(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)), X.COLUMN0ROW0 = 0, X.COLUMN0ROW1 = 1, X.COLUMN0ROW2 = 2, X.COLUMN0ROW3 = 3, X.COLUMN1ROW0 = 4, X.COLUMN1ROW1 = 5, X.COLUMN1ROW2 = 6, X.COLUMN1ROW3 = 7, X.COLUMN2ROW0 = 8, X.COLUMN2ROW1 = 9, X.COLUMN2ROW2 = 10, X.COLUMN2ROW3 = 11, X.COLUMN3ROW0 = 12, X.COLUMN3ROW1 = 13, X.COLUMN3ROW2 = 14, X.COLUMN3ROW3 = 15, t(X.prototype, {
    length: {
      get: function get() {
        return X.packedLength;
      }
    }
  }), X.prototype.clone = function (t) {
    return X.clone(this, t);
  }, X.prototype.equals = function (t) {
    return X.equals(this, t);
  }, X.equalsArray = function (t, e, r) {
    return t[0] === e[r] && t[1] === e[r + 1] && t[2] === e[r + 2] && t[3] === e[r + 3] && t[4] === e[r + 4] && t[5] === e[r + 5] && t[6] === e[r + 6] && t[7] === e[r + 7] && t[8] === e[r + 8] && t[9] === e[r + 9] && t[10] === e[r + 10] && t[11] === e[r + 11] && t[12] === e[r + 12] && t[13] === e[r + 13] && t[14] === e[r + 14] && t[15] === e[r + 15];
  }, X.prototype.equalsEpsilon = function (t, e) {
    return X.equalsEpsilon(this, t, e);
  }, X.prototype.toString = function () {
    return "(" + this[0] + ", " + this[4] + ", " + this[8] + ", " + this[12] + ")\n(" + this[1] + ", " + this[5] + ", " + this[9] + ", " + this[13] + ")\n(" + this[2] + ", " + this[6] + ", " + this[10] + ", " + this[14] + ")\n(" + this[3] + ", " + this[7] + ", " + this[11] + ", " + this[15] + ")";
  }, X;
});