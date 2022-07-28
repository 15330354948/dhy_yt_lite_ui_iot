"use strict";

define(["./DeveloperError", "./QuadraticRealPolynomial"], function (i, h) {
  "use strict";

  var r = {};

  function s(r, e, t, a) {
    var n = r,
        u = e / 3,
        o = t / 3,
        i = a,
        h = n * o,
        s = u * i,
        f = u * u,
        m = o * o,
        b = n * o - f,
        w = n * i - u * o,
        p = u * i - m,
        M = 4 * b * p - w * w;

    if (M < 0) {
      var c,
          q,
          d,
          v = h * m <= f * s ? -2 * u * (q = b) + (c = n) * w : -(c = i) * w + 2 * o * (q = p),
          l = -(v < 0 ? -1 : 1) * Math.abs(c) * Math.sqrt(-M),
          y = (d = l - v) / 2,
          R = y < 0 ? -Math.pow(-y, 1 / 3) : Math.pow(y, 1 / 3),
          g = d === l ? -R : -q / R,
          D = q <= 0 ? R + g : -v / (R * R + g * g + q);
      return h * m <= f * s ? [(D - u) / n] : [-i / (D + o)];
    }

    var E = b,
        L = -2 * u * b + n * w,
        P = p,
        Q = -i * w + 2 * o * p,
        j = Math.sqrt(M),
        k = Math.sqrt(3) / 2,
        x = Math.abs(Math.atan2(n * j, -L) / 3);
    D = 2 * Math.sqrt(-E);
    var z = Math.cos(x);
    d = D * z;
    var A = D * (-z / 2 - k * Math.sin(x)),
        B = 2 * u < d + A ? d - u : A - u,
        C = n,
        F = B / C,
        x = Math.abs(Math.atan2(i * j, -Q) / 3),
        G = -i,
        H = (d = (D = 2 * Math.sqrt(-P)) * (z = Math.cos(x))) + (A = D * (-z / 2 - k * Math.sin(x))) < 2 * o ? d + o : A + o,
        I = G / H,
        J = -B * H - C * G,
        K = (o * J - u * (B * G)) / (-u * J + o * (C * H));
    return F <= K ? F <= I ? K <= I ? [F, K, I] : [F, I, K] : [I, F, K] : F <= I ? [K, F, I] : K <= I ? [K, I, F] : [I, K, F];
  }

  return r.computeDiscriminant = function (r, e, t, a) {
    if ("number" != typeof r) throw new i("a is a required number.");
    if ("number" != typeof e) throw new i("b is a required number.");
    if ("number" != typeof t) throw new i("c is a required number.");
    if ("number" != typeof a) throw new i("d is a required number.");
    var n = e * e,
        u = t * t;
    return 18 * r * e * t * a + n * u - 27 * (r * r) * (a * a) - 4 * (r * u * t + n * e * a);
  }, r.computeRealRoots = function (r, e, t, a) {
    if ("number" != typeof r) throw new i("a is a required number.");
    if ("number" != typeof e) throw new i("b is a required number.");
    if ("number" != typeof t) throw new i("c is a required number.");
    if ("number" != typeof a) throw new i("d is a required number.");
    var n, u;
    if (0 === r) return h.computeRealRoots(e, t, a);
    if (0 !== e) return 0 === t ? 0 === a ? (u = -e / r) < 0 ? [u, 0, 0] : [0, 0, u] : s(r, e, 0, a) : 0 === a ? 0 === (n = h.computeRealRoots(r, e, t)).length ? [0] : n[1] <= 0 ? [n[0], n[1], 0] : 0 <= n[0] ? [0, n[0], n[1]] : [n[0], 0, n[1]] : s(r, e, t, a);
    if (0 !== t) return 0 === a ? 0 === (n = h.computeRealRoots(r, 0, t)).Length ? [0] : [n[0], 0, n[1]] : s(r, 0, t, a);
    if (0 === a) return [0, 0, 0];
    var o = (u = -a / r) < 0 ? -Math.pow(-u, 1 / 3) : Math.pow(u, 1 / 3);
    return [o, o, o];
  }, r;
});