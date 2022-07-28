"use strict";

define(["./defaultValue", "./defined", "./DeveloperError", "./Math"], function (o, x, a, D) {
  "use strict";

  var b = D.factorial;

  function O(r, e, o, a, t, f) {
    var n,
        h,
        i,
        u = 0;

    if (0 < a) {
      for (h = 0; h < t; h++) {
        for (n = !1, i = 0; i < f.length && !n; i++) {
          h === f[i] && (n = !0);
        }

        n || (f.push(h), u += O(r, e, o, a - 1, t, f), f.splice(f.length - 1, 1));
      }

      return u;
    }

    for (u = 1, h = 0; h < t; h++) {
      for (n = !1, i = 0; i < f.length && !n; i++) {
        h === f[i] && (n = !0);
      }

      n || (u *= r - o[e[h]]);
    }

    return u;
  }

  var r = {
    type: "Hermite",
    getRequiredDataPoints: function getRequiredDataPoints(r, e) {
      if (e = o(e, 0), !x(r)) throw new a("degree is required.");
      if (r < 0) throw new a("degree must be 0 or greater.");
      if (e < 0) throw new a("inputOrder must be 0 or greater.");
      return Math.max(Math.floor((r + 1) / (e + 1)), 2);
    },
    interpolateOrderZero: function interpolateOrderZero(r, e, o, a, t) {
      var f, n;
      x(t) || (t = new Array(a));

      for (var h = e.length, i = new Array(a), u = 0; u < a; u++) {
        t[u] = 0;
        var v = new Array(h);

        for (i[u] = v, c = 0; c < h; c++) {
          v[c] = [];
        }
      }

      var l = h,
          g = new Array(l);

      for (u = 0; u < l; u++) {
        g[u] = u;
      }

      var w = h - 1;

      for (m = 0; m < a; m++) {
        for (c = 0; c < l; c++) {
          n = g[c] * a + m, i[m][0].push(o[n]);
        }

        for (u = 1; u < l; u++) {
          for (var s = !1, c = 0; c < l - u; c++) {
            var d,
                p = e[g[c]],
                M = e[g[c + u]];
            M - p <= 0 ? (d = o[n = g[c] * a + a * u + m], i[m][u].push(d / b(u))) : (d = i[m][u - 1][c + 1] - i[m][u - 1][c], i[m][u].push(d / (M - p))), s = s || 0 !== d;
          }

          s || (w = u - 1);
        }
      }

      for (f = 0; f <= 0; f++) {
        for (u = f; u <= w; u++) {
          for (var y = O(r, g, e, f, u, []), m = 0; m < a; m++) {
            var A = i[m][u][0];
            t[m + f * a] += A * y;
          }
        }
      }

      return t;
    }
  },
      E = [];
  return r.interpolate = function (r, e, o, a, t, f, n) {
    var h = a * (f + 1);
    x(n) || (n = new Array(h));

    for (var i = 0; i < h; i++) {
      n[i] = 0;
    }

    for (var u = e.length, v = new Array(u * (t + 1)), l = 0; l < u; l++) {
      for (var g = 0; g < t + 1; g++) {
        v[l * (t + 1) + g] = l;
      }
    }

    for (var w = v.length, s = E, c = function (r, e, o, a, t, f) {
      for (var n, h, i, u, v = -1, l = e.length, g = l * (l + 1) / 2, w = 0; w < t; w++) {
        var s = Math.floor(w * g);

        for (n = 0; n < l; n++) {
          h = e[n] * t * (f + 1) + w, r[s + n] = a[h];
        }

        for (var c = 1; c < l; c++) {
          var d = 0,
              p = Math.floor(c * (1 - c) / 2) + l * c,
              M = !1;

          for (n = 0; n < l - c; n++) {
            var y,
                m = o[e[n]],
                A = o[e[n + c]];
            u = A - m <= 0 ? (h = e[n] * t * (f + 1) + t * c + w, (i = a[h]) / D.factorial(c)) : (y = Math.floor((c - 1) * (2 - c) / 2) + l * (c - 1), (i = r[s + y + n + 1] - r[s + y + n]) / (A - m)), r[s + p + d] = u, d++, M = M || 0 !== i;
          }

          M && (v = Math.max(v, c));
        }
      }

      return v;
    }(s, v, e, o, a, t), d = [], p = w * (w + 1) / 2, M = Math.min(c, f), y = 0; y <= M; y++) {
      for (l = y; l <= c; l++) {
        d.length = 0;

        for (var m = O(r, v, e, y, l, d), A = Math.floor(l * (1 - l) / 2) + w * l, b = 0; b < a; b++) {
          var q = s[Math.floor(b * p) + A];
          n[b + y * a] += q * m;
        }
      }
    }

    return n;
  }, r;
});