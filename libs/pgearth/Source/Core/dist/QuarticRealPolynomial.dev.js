"use strict";

define(["./CubicRealPolynomial", "./DeveloperError", "./Math", "./QuadraticRealPolynomial"], function (L, b, N, O) {
  "use strict";

  var e = {};

  function f(e, r, t, n) {
    var a = e * e,
        u = r - 3 * a / 8,
        i = t - r * e / 2 + a * e / 8,
        o = n - t * e / 4 + r * a / 16 - 3 * a * a / 256,
        s = L.computeRealRoots(1, 2 * u, u * u - 4 * o, -i * i);

    if (0 < s.length) {
      var c = -e / 4,
          f = s[s.length - 1];

      if (Math.abs(f) < N.EPSILON14) {
        var h = O.computeRealRoots(1, u, o);

        if (2 === h.length) {
          var m,
              b = h[0],
              l = h[1];

          if (0 <= b && 0 <= l) {
            var p = Math.sqrt(b),
                w = Math.sqrt(l);
            return [c - w, c - p, c + p, c + w];
          }

          if (0 <= b && l < 0) return [c - (m = Math.sqrt(b)), c + m];
          if (b < 0 && 0 <= l) return [c - (m = Math.sqrt(l)), c + m];
        }

        return [];
      }

      if (0 < f) {
        var R = Math.sqrt(f),
            q = (u + f - i / R) / 2,
            d = (u + f + i / R) / 2,
            g = O.computeRealRoots(1, R, q),
            v = O.computeRealRoots(1, -R, d);
        return 0 !== g.length ? (g[0] += c, g[1] += c, 0 !== v.length ? (v[0] += c, v[1] += c, g[1] <= v[0] ? [g[0], g[1], v[0], v[1]] : v[1] <= g[0] ? [v[0], v[1], g[0], g[1]] : g[0] >= v[0] && g[1] <= v[1] ? [v[0], g[0], g[1], v[1]] : v[0] >= g[0] && v[1] <= g[1] ? [g[0], v[0], v[1], g[1]] : g[0] > v[0] && g[0] < v[1] ? [v[0], g[0], v[1], g[1]] : [g[0], v[0], g[1], v[1]]) : g) : 0 !== v.length ? (v[0] += c, v[1] += c, v) : [];
      }
    }

    return [];
  }

  function h(e, r, t, n) {
    var a = e * e,
        u = -2 * r,
        i = t * e + r * r - 4 * n,
        o = a * n - t * r * e + t * t,
        s = L.computeRealRoots(1, u, i, o);

    if (0 < s.length) {
      var c,
          f,
          h,
          m,
          b,
          l,
          p,
          w,
          R = s[0],
          q = r - R,
          d = q * q,
          g = e / 2,
          v = q / 2,
          y = d - 4 * n,
          M = d + 4 * Math.abs(n),
          P = a - 4 * R,
          E = a + 4 * Math.abs(R);
      h = R < 0 || y * E < P * M ? (f = (c = Math.sqrt(P)) / 2, 0 === c ? 0 : (e * v - t) / c) : (f = 0 === (m = Math.sqrt(y)) ? 0 : (e * v - t) / m, m / 2), 0 == g && 0 === f ? l = b = 0 : N.sign(g) === N.sign(f) ? l = R / (b = g + f) : b = R / (l = g - f), 0 == v && 0 === h ? w = p = 0 : N.sign(v) === N.sign(h) ? w = n / (p = v + h) : p = n / (w = v - h);
      var D = O.computeRealRoots(1, b, p),
          I = O.computeRealRoots(1, l, w);
      if (0 !== D.length) return 0 !== I.length ? D[1] <= I[0] ? [D[0], D[1], I[0], I[1]] : I[1] <= D[0] ? [I[0], I[1], D[0], D[1]] : D[0] >= I[0] && D[1] <= I[1] ? [I[0], D[0], D[1], I[1]] : I[0] >= D[0] && I[1] <= D[1] ? [D[0], I[0], I[1], D[1]] : D[0] > I[0] && D[0] < I[1] ? [I[0], D[0], I[1], D[1]] : [D[0], I[0], D[1], I[1]] : D;
      if (0 !== I.length) return I;
    }

    return [];
  }

  return e.computeDiscriminant = function (e, r, t, n, a) {
    if ("number" != typeof e) throw new b("a is a required number.");
    if ("number" != typeof r) throw new b("b is a required number.");
    if ("number" != typeof t) throw new b("c is a required number.");
    if ("number" != typeof n) throw new b("d is a required number.");
    if ("number" != typeof a) throw new b("e is a required number.");
    var u = e * e,
        i = r * r,
        o = i * r,
        s = t * t,
        c = s * t,
        f = n * n,
        h = f * n,
        m = a * a;
    return i * s * f - 4 * o * h - 4 * e * c * f + 18 * e * r * t * h - 27 * u * f * f + 256 * (u * e) * (m * a) + a * (18 * o * t * n - 4 * i * c + 16 * e * s * s - 80 * e * r * s * n - 6 * e * i * f + 144 * u * t * f) + m * (144 * e * i * t - 27 * i * i - 128 * u * s - 192 * u * r * n);
  }, e.computeRealRoots = function (e, r, t, n, a) {
    if ("number" != typeof e) throw new b("a is a required number.");
    if ("number" != typeof r) throw new b("b is a required number.");
    if ("number" != typeof t) throw new b("c is a required number.");
    if ("number" != typeof n) throw new b("d is a required number.");
    if ("number" != typeof a) throw new b("e is a required number.");
    if (Math.abs(e) < N.EPSILON15) return L.computeRealRoots(r, t, n, a);
    var u = r / e,
        i = t / e,
        o = n / e,
        s = a / e,
        c = u < 0 ? 1 : 0;

    switch (c += i < 0 ? c + 1 : c, c += o < 0 ? c + 1 : c, c += s < 0 ? c + 1 : c) {
      case 0:
        return f(u, i, o, s);

      case 1:
      case 2:
        return h(u, i, o, s);

      case 3:
      case 4:
        return f(u, i, o, s);

      case 5:
        return h(u, i, o, s);

      case 6:
      case 7:
        return f(u, i, o, s);

      case 8:
        return h(u, i, o, s);

      case 9:
      case 10:
        return f(u, i, o, s);

      case 11:
        return h(u, i, o, s);

      case 12:
      case 13:
      case 14:
      case 15:
        return f(u, i, o, s);

      default:
        return;
    }
  }, e;
});