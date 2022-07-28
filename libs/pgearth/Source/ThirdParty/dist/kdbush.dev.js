"use strict";

define([], function () {
  "use strict";

  function s(t, r, o, n, h) {
    r = r || i, o = o || u, h = h || Array, this.nodeSize = n || 64, this.points = t, this.ids = new h(t.length), this.coords = new h(2 * t.length);

    for (var s = 0; s < t.length; s++) {
      this.ids[s] = s, this.coords[2 * s] = r(t[s]), this.coords[2 * s + 1] = o(t[s]);
    }

    !function t(r, o, n, h, s, i) {
      if (s - h <= n) return;
      var u = Math.floor((h + s) / 2);
      l(r, o, u, h, s, i % 2);
      t(r, o, n, h, u - 1, i + 1);
      t(r, o, n, u + 1, s, i + 1);
    }(this.ids, this.coords, this.nodeSize, 0, this.ids.length - 1, 0);
  }

  function i(t) {
    return t[0];
  }

  function u(t) {
    return t[1];
  }

  function l(t, r, o, n, h, s) {
    for (; n < h;) {
      var i, u, e, f, p;
      600 < h - n && (i = h - n + 1, u = o - n + 1, e = Math.log(i), f = .5 * Math.exp(2 * e / 3), p = .5 * Math.sqrt(e * f * (i - f) / i) * (u - i / 2 < 0 ? -1 : 1), l(t, r, o, Math.max(n, Math.floor(o - u * f / i + p)), Math.min(h, Math.floor(o + (i - u) * f / i + p)), s));
      var a = r[2 * o + s],
          c = n,
          d = h;

      for (v(t, r, n, o), r[2 * h + s] > a && v(t, r, n, h); c < d;) {
        for (v(t, r, c, d), c++, d--; r[2 * c + s] < a;) {
          c++;
        }

        for (; r[2 * d + s] > a;) {
          d--;
        }
      }

      r[2 * n + s] === a ? v(t, r, n, d) : v(t, r, ++d, h), d <= o && (n = d + 1), o <= d && (h = d - 1);
    }
  }

  function v(t, r, o, n) {
    h(t, o, n), h(r, 2 * o, 2 * n), h(r, 2 * o + 1, 2 * n + 1);
  }

  function h(t, r, o) {
    var n = t[r];
    t[r] = t[o], t[o] = n;
  }

  function M(t, r, o, n) {
    var h = t - o,
        s = r - n;
    return h * h + s * s;
  }

  return s.prototype = {
    range: function range(t, r, o, n) {
      return function (t, r, o, n, h, s, i) {
        var u,
            e,
            f = [0, t.length - 1, 0],
            p = [];

        for (; f.length;) {
          var a = f.pop(),
              c = f.pop(),
              d = f.pop();
          if (c - d <= i) for (var l = d; l <= c; l++) {
            u = r[2 * l], e = r[2 * l + 1], o <= u && u <= h && n <= e && e <= s && p.push(t[l]);
          } else {
            var v = Math.floor((d + c) / 2);
            u = r[2 * v], e = r[2 * v + 1], o <= u && u <= h && n <= e && e <= s && p.push(t[v]);
            var g = (a + 1) % 2;
            (0 === a ? o <= u : n <= e) && (f.push(d), f.push(v - 1), f.push(g)), (0 === a ? u <= h : e <= s) && (f.push(v + 1), f.push(c), f.push(g));
          }
        }

        return p;
      }(this.ids, this.coords, t, r, o, n, this.nodeSize);
    },
    within: function within(t, r, o) {
      return function (t, r, o, n, h, s) {
        var i = [0, t.length - 1, 0],
            u = [],
            e = h * h;

        for (; i.length;) {
          var f = i.pop(),
              p = i.pop(),
              a = i.pop();
          if (p - a <= s) for (var c = a; c <= p; c++) {
            M(r[2 * c], r[2 * c + 1], o, n) <= e && u.push(t[c]);
          } else {
            var d = Math.floor((a + p) / 2),
                l = r[2 * d],
                v = r[2 * d + 1];
            M(l, v, o, n) <= e && u.push(t[d]);
            var g = (f + 1) % 2;
            (0 === f ? o - h <= l : n - h <= v) && (i.push(a), i.push(d - 1), i.push(g)), (0 === f ? l <= o + h : v <= n + h) && (i.push(d + 1), i.push(p), i.push(g));
          }
        }

        return u;
      }(this.ids, this.coords, t, r, o, this.nodeSize);
    }
  }, function (t, r, o, n, h) {
    return new s(t, r, o, n, h);
  };
});