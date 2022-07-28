"use strict";

define(["./defaultValue", "./defined", "./DeveloperError"], function (M, q, B) {
  "use strict";

  var e = {
    calculateACMR: function calculateACMR(e) {
      var r = (e = M(e, M.EMPTY_OBJECT)).indices,
          i = e.maximumIndex,
          n = M(e.cacheSize, 24);
      if (!q(r)) throw new B("indices is required.");
      var t = r.length;
      if (t < 3 || t % 3 != 0) throw new B("indices length must be a multiple of three.");
      if (i <= 0) throw new B("maximumIndex must be greater than zero.");
      if (n < 3) throw new B("cacheSize must be greater than two.");
      if (!q(i)) for (var a = i = 0, u = r[a]; a < t;) {
        i < u && (i = u), u = r[++a];
      }

      for (var m = [], s = 0; s < i + 1; s++) {
        m[s] = 0;
      }

      for (var f = n + 1, l = 0; l < t; ++l) {
        f - m[r[l]] > n && (m[r[l]] = f, ++f);
      }

      return (f - n + 1) / (t / 3);
    }
  };
  return e.tipsify = function (e) {
    var r = (e = M(e, M.EMPTY_OBJECT)).indices,
        i = e.maximumIndex,
        n = M(e.cacheSize, 24);

    function t(e, r, i, n, t, a, u) {
      for (var m, s = -1, f = -1, l = 0; l < i.length;) {
        var o = i[l];
        n[o].numLiveTriangles && (m = 0, t - n[o].timeStamp + 2 * n[o].numLiveTriangles <= r && (m = t - n[o].timeStamp), (f < m || -1 === f) && (f = m, s = o)), ++l;
      }

      return -1 === s ? function (e, r, i) {
        for (; 1 <= r.length;) {
          var n = r[r.length - 1];
          if (r.splice(r.length - 1, 1), 0 < e[n].numLiveTriangles) return n;
        }

        for (; p < i;) {
          if (0 < e[p].numLiveTriangles) return ++p - 1;
          ++p;
        }

        return -1;
      }(n, a, u) : s;
    }

    if (!q(r)) throw new B("indices is required.");
    var a = r.length;
    if (a < 3 || a % 3 != 0) throw new B("indices length must be a multiple of three.");
    if (i <= 0) throw new B("maximumIndex must be greater than zero.");
    if (n < 3) throw new B("cacheSize must be greater than two.");
    var u = 0,
        m = 0,
        s = r[m],
        f = a;
    if (q(i)) u = i + 1;else {
      for (; m < f;) {
        u < s && (u = s), s = r[++m];
      }

      if (-1 === u) return 0;
      ++u;
    }

    for (var l = [], o = 0; o < u; o++) {
      l[o] = {
        numLiveTriangles: 0,
        timeStamp: 0,
        vertexTriangles: []
      };
    }

    for (var v = m = 0; m < f;) {
      l[r[m]].vertexTriangles.push(v), ++l[r[m]].numLiveTriangles, l[r[m + 1]].vertexTriangles.push(v), ++l[r[m + 1]].numLiveTriangles, l[r[m + 2]].vertexTriangles.push(v), ++l[r[m + 2]].numLiveTriangles, ++v, m += 3;
    }

    var h,
        g,
        c,
        T,
        w = 0,
        d = n + 1,
        p = 1,
        x = [],
        L = [],
        S = 0,
        b = [],
        z = a / 3,
        E = [];

    for (o = 0; o < z; o++) {
      E[o] = !1;
    }

    for (; -1 !== w;) {
      x = [], T = (g = l[w]).vertexTriangles.length;

      for (var I = 0; I < T; ++I) {
        if (!E[v = g.vertexTriangles[I]]) {
          E[v] = !0, m = v + v + v;

          for (var C = 0; C < 3; ++C) {
            c = r[m], x.push(c), L.push(c), b[S] = c, ++S, --(h = l[c]).numLiveTriangles, d - h.timeStamp > n && (h.timeStamp = d, ++d), ++m;
          }
        }
      }

      w = t(0, n, x, l, d, L, u);
    }

    return b;
  }, e;
});