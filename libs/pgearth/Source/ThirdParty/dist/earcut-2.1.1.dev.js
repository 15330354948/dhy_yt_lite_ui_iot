"use strict";

define([], function () {
  "use strict";

  function n(n, e, t) {
    t = t || 2;
    var r,
        x,
        i,
        u,
        f,
        v,
        o,
        y = e && e.length,
        p = y ? e[0] * t : n.length,
        l = s(n, 0, p, t, !0),
        a = [];
    if (!l) return a;

    if (y && (l = function (n, e, t, r) {
      var x,
          i,
          u,
          f,
          v,
          o = [];

      for (x = 0, i = e.length; x < i; x++) {
        u = e[x] * r, f = x < i - 1 ? e[x + 1] * r : n.length, (v = s(n, u, f, r, !1)) === v.next && (v.steiner = !0), o.push(function (n) {
          var e = n,
              t = n;

          for (; e.x < t.x && (t = e), e = e.next, e !== n;) {
            ;
          }

          return t;
        }(v));
      }

      for (o.sort(g), x = 0; x < o.length; x++) {
        !function (n, e) {
          {
            var t;
            (e = function (n, e) {
              var t,
                  r = e,
                  x = n.x,
                  i = n.y,
                  u = -1 / 0;

              do {
                if (i <= r.y && i >= r.next.y) {
                  var f = r.x + (i - r.y) * (r.next.x - r.x) / (r.next.y - r.y);

                  if (f <= x && u < f) {
                    if ((u = f) === x) {
                      if (i === r.y) return r;
                      if (i === r.next.y) return r.next;
                    }

                    t = r.x < r.next.x ? r : r.next;
                  }
                }

                r = r.next;
              } while (r !== e);

              if (!t) return null;
              if (x === u) return t.prev;
              var v,
                  o = t,
                  y = t.x,
                  p = t.y,
                  l = 1 / 0;
              r = t.next;

              for (; r !== o;) {
                x >= r.x && r.x >= y && d(i < p ? x : u, i, y, p, i < p ? u : x, i, r.x, r.y) && ((v = Math.abs(i - r.y) / (x - r.x)) < l || v === l && r.x > t.x) && z(r, n) && (t = r, l = v), r = r.next;
              }

              return t;
            }(n, e)) && c(t = b(e, n), t.next);
          }
        }(o[x], t), t = c(t, t.next);
      }

      return t;
    }(n, e, l, t)), n.length > 80 * t) {
      r = i = n[0], x = u = n[1];

      for (var h = t; h < p; h += t) {
        (f = n[h]) < r && (r = f), (v = n[h + 1]) < x && (x = v), i < f && (i = f), u < v && (u = v);
      }

      o = Math.max(i - r, u - x);
    }

    return Z(l, a, t, r, x, o), a;
  }

  function s(n, e, t, r, x) {
    var i, u;
    if (x === 0 < M(n, e, t, r)) for (i = e; i < t; i += r) {
      u = f(i, n[i], n[i + 1], u);
    } else for (i = t - r; e <= i; i -= r) {
      u = f(i, n[i], n[i + 1], u);
    }
    return u && y(u, u.next) && (l(u), u = u.next), u;
  }

  function c(n, e) {
    if (!n) return n;
    e = e || n;
    var t,
        r = n;

    do {
      if (t = !1, r.steiner || !y(r, r.next) && 0 !== w(r.prev, r, r.next)) r = r.next;else {
        if (l(r), (r = e = r.prev) === r.next) return null;
        t = !0;
      }
    } while (t || r !== e);

    return e;
  }

  function Z(n, e, t, r, x, i, u) {
    if (n) {
      !u && i && function (n, e, t, r) {
        var x = n;

        for (; null === x.z && (x.z = h(x.x, x.y, e, t, r)), x.prevZ = x.prev, x.nextZ = x.next, x = x.next, x !== n;) {
          ;
        }

        x.prevZ.nextZ = null, x.prevZ = null, function (n) {
          var e,
              t,
              r,
              x,
              i,
              u,
              f,
              v,
              o = 1;

          do {
            for (t = n, i = n = null, u = 0; t;) {
              for (u++, r = t, e = f = 0; e < o && (f++, r = r.nextZ); e++) {
                ;
              }

              for (v = o; 0 < f || 0 < v && r;) {
                0 !== f && (0 === v || !r || t.z <= r.z) ? (t = (x = t).nextZ, f--) : (r = (x = r).nextZ, v--), i ? i.nextZ = x : n = x, x.prevZ = i, i = x;
              }

              t = r;
            }

            i.nextZ = null, o *= 2;
          } while (1 < u);
        }(x);
      }(n, r, x, i);

      for (var f, v, o = n; n.prev !== n.next;) {
        if (f = n.prev, v = n.next, i ? function (n, e, t, r) {
          var x = n.prev,
              i = n,
              u = n.next;
          if (0 <= w(x, i, u)) return !1;
          var f = x.x < i.x ? x.x < u.x ? x.x : u.x : i.x < u.x ? i.x : u.x,
              v = x.y < i.y ? x.y < u.y ? x.y : u.y : i.y < u.y ? i.y : u.y,
              o = x.x > i.x ? x.x > u.x ? x.x : u.x : i.x > u.x ? i.x : u.x,
              y = x.y > i.y ? x.y > u.y ? x.y : u.y : i.y > u.y ? i.y : u.y,
              p = h(f, v, e, t, r),
              l = h(o, y, e, t, r),
              a = n.nextZ;

          for (; a && a.z <= l;) {
            if (a !== n.prev && a !== n.next && d(x.x, x.y, i.x, i.y, u.x, u.y, a.x, a.y) && 0 <= w(a.prev, a, a.next)) return !1;
            a = a.nextZ;
          }

          a = n.prevZ;

          for (; a && a.z >= p;) {
            if (a !== n.prev && a !== n.next && d(x.x, x.y, i.x, i.y, u.x, u.y, a.x, a.y) && 0 <= w(a.prev, a, a.next)) return !1;
            a = a.prevZ;
          }

          return !0;
        }(n, r, x, i) : function (n) {
          var e = n.prev,
              t = n,
              r = n.next;
          if (0 <= w(e, t, r)) return !1;
          var x = n.next.next;

          for (; x !== n.prev;) {
            if (d(e.x, e.y, t.x, t.y, r.x, r.y, x.x, x.y) && 0 <= w(x.prev, x, x.next)) return !1;
            x = x.next;
          }

          return !0;
        }(n)) e.push(f.i / t), e.push(n.i / t), e.push(v.i / t), l(n), n = v.next, o = v.next;else if ((n = v) === o) {
          u ? 1 === u ? Z(n = function (n, e, t) {
            var r = n;

            do {
              var x = r.prev,
                  i = r.next.next;
              !y(x, i) && p(x, r, r.next, i) && z(x, i) && z(i, x) && (e.push(x.i / t), e.push(r.i / t), e.push(i.i / t), l(r), l(r.next), r = n = i), r = r.next;
            } while (r !== n);

            return r;
          }(n, e, t), e, t, r, x, i, 2) : 2 === u && function (n, e, t, r, x, i) {
            var u = n;

            do {
              for (var f = u.next.next; f !== u.prev;) {
                if (u.i !== f.i && function (n, e) {
                  return n.next.i !== e.i && n.prev.i !== e.i && !function (n, e) {
                    var t = n;

                    do {
                      if (t.i !== n.i && t.next.i !== n.i && t.i !== e.i && t.next.i !== e.i && p(t, t.next, n, e)) return !0;
                      t = t.next;
                    } while (t !== n);

                    return !1;
                  }(n, e) && z(n, e) && z(e, n) && function (n, e) {
                    var t = n,
                        r = !1,
                        x = (n.x + e.x) / 2,
                        i = (n.y + e.y) / 2;

                    for (; t.y > i != t.next.y > i && x < (t.next.x - t.x) * (i - t.y) / (t.next.y - t.y) + t.x && (r = !r), t = t.next, t !== n;) {
                      ;
                    }

                    return r;
                  }(n, e);
                }(u, f)) {
                  var v = b(u, f);
                  return u = c(u, u.next), v = c(v, v.next), Z(u, e, t, r, x, i), Z(v, e, t, r, x, i);
                }

                f = f.next;
              }

              u = u.next;
            } while (u !== n);
          }(n, e, t, r, x, i) : Z(c(n), e, t, r, x, i, 1);
          break;
        }
      }
    }
  }

  function g(n, e) {
    return n.x - e.x;
  }

  function h(n, e, t, r, x) {
    return (n = 1431655765 & ((n = 858993459 & ((n = 252645135 & ((n = 16711935 & ((n = 32767 * (n - t) / x) | n << 8)) | n << 4)) | n << 2)) | n << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - r) / x) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1;
  }

  function d(n, e, t, r, x, i, u, f) {
    return 0 <= (x - u) * (e - f) - (n - u) * (i - f) && 0 <= (n - u) * (r - f) - (t - u) * (e - f) && 0 <= (t - u) * (i - f) - (x - u) * (r - f);
  }

  function w(n, e, t) {
    return (e.y - n.y) * (t.x - e.x) - (e.x - n.x) * (t.y - e.y);
  }

  function y(n, e) {
    return n.x === e.x && n.y === e.y;
  }

  function p(n, e, t, r) {
    return y(n, e) && y(t, r) || y(n, r) && y(t, e) || 0 < w(n, e, t) != 0 < w(n, e, r) && 0 < w(t, r, n) != 0 < w(t, r, e);
  }

  function z(n, e) {
    return w(n.prev, n, n.next) < 0 ? 0 <= w(n, e, n.next) && 0 <= w(n, n.prev, e) : w(n, e, n.prev) < 0 || w(n, n.next, e) < 0;
  }

  function b(n, e) {
    var t = new u(n.i, n.x, n.y),
        r = new u(e.i, e.x, e.y),
        x = n.next,
        i = e.prev;
    return (n.next = e).prev = n, (t.next = x).prev = t, (r.next = t).prev = r, (i.next = r).prev = i, r;
  }

  function f(n, e, t, r) {
    var x = new u(n, e, t);
    return r ? (x.next = r.next, (x.prev = r).next.prev = x, r.next = x) : (x.prev = x).next = x, x;
  }

  function l(n) {
    n.next.prev = n.prev, n.prev.next = n.next, n.prevZ && (n.prevZ.nextZ = n.nextZ), n.nextZ && (n.nextZ.prevZ = n.prevZ);
  }

  function u(n, e, t) {
    this.i = n, this.x = e, this.y = t, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1;
  }

  function M(n, e, t, r) {
    for (var x = 0, i = e, u = t - r; i < t; i += r) {
      x += (n[u] - n[i]) * (n[i + 1] + n[u + 1]), u = i;
    }

    return x;
  }

  return n.deviation = function (n, e, t, r) {
    var x = e && e.length,
        i = x ? e[0] * t : n.length,
        u = Math.abs(M(n, 0, i, t));
    if (x) for (var f = 0, v = e.length; f < v; f++) {
      var o = e[f] * t,
          y = f < v - 1 ? e[f + 1] * t : n.length;
      u -= Math.abs(M(n, o, y, t));
    }

    for (var p = 0, f = 0; f < r.length; f += 3) {
      var l = r[f] * t,
          a = r[f + 1] * t,
          h = r[f + 2] * t;
      p += Math.abs((n[l] - n[h]) * (n[1 + a] - n[1 + l]) - (n[l] - n[a]) * (n[1 + h] - n[1 + l]));
    }

    return 0 === u && 0 === p ? 0 : Math.abs((p - u) / u);
  }, n.flatten = function (n) {
    for (var e = n[0][0].length, t = {
      vertices: [],
      holes: [],
      dimensions: e
    }, r = 0, x = 0; x < n.length; x++) {
      for (var i = 0; i < n[x].length; i++) {
        for (var u = 0; u < e; u++) {
          t.vertices.push(n[x][i][u]);
        }
      }

      0 < x && (r += n[x - 1].length, t.holes.push(r));
    }

    return t;
  }, n;
});