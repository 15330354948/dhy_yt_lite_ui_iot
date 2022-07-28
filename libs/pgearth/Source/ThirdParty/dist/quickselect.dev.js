"use strict";

define([], function () {
  "use strict";

  function m(t, n, r) {
    var o = t[n];
    t[n] = t[r], t[r] = o;
  }

  function a(t, n) {
    return t < n ? -1 : n < t ? 1 : 0;
  }

  return function (t, n, r, o, f) {
    !function t(n, r, o, f, a) {
      for (; o < f;) {
        var h, i, u, e, M, c, l;
        600 < f - o && (h = f - o + 1, i = r - o + 1, u = Math.log(h), e = .5 * Math.exp(2 * u / 3), M = .5 * Math.sqrt(u * e * (h - e) / h) * (i - h / 2 < 0 ? -1 : 1), c = Math.max(o, Math.floor(r - i * e / h + M)), l = Math.min(f, Math.floor(r + (h - i) * e / h + M)), t(n, r, c, l, a));
        var s = n[r],
            v = o,
            g = f;

        for (m(n, o, r), 0 < a(n[f], s) && m(n, o, f); v < g;) {
          for (m(n, v, g), v++, g--; a(n[v], s) < 0;) {
            v++;
          }

          for (; 0 < a(n[g], s);) {
            g--;
          }
        }

        0 === a(n[o], s) ? m(n, o, g) : m(n, ++g, f), g <= r && (o = g + 1), r <= g && (f = g - 1);
      }
    }(t, n, r || 0, o || t.length - 1, f || a);
  };
});