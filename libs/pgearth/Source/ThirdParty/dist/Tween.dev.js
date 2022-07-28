"use strict";

define(function () {
  void 0 === Date.now && (Date.now = function () {
    return new Date().valueOf();
  });
  var r,
      i,
      a = a || (r = [], {
    REVISION: "13",
    getAll: function getAll() {
      return r;
    },
    removeAll: function removeAll() {
      r = [];
    },
    add: function add(n) {
      r.push(n);
    },
    remove: function remove(n) {
      var t = r.indexOf(n);
      -1 !== t && r.splice(t, 1);
    },
    update: function update(n) {
      if (0 === r.length) return !1;
      var t = 0;

      for (n = void 0 !== n ? n : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(); t < r.length;) {
        r[t].update(n) ? t++ : r.splice(t, 1);
      }

      return !0;
    }
  });
  return a.Tween = function (n) {
    var c = n,
        s = {},
        h = {},
        l = {},
        p = 1e3,
        I = 0,
        w = !1,
        r = !1,
        M = 0,
        d = null,
        v = a.Easing.Linear.None,
        O = a.Interpolation.Linear,
        g = [],
        m = null,
        y = !1,
        P = null,
        B = null,
        t = null;

    for (var i in n) {
      s[i] = parseFloat(n[i], 10);
    }

    this.to = function (n, t) {
      return void 0 !== t && (p = t), h = n, this;
    }, this.start = function (n) {
      for (var t in a.add(this), y = !(r = !0), d = void 0 !== n ? n : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(), d += M, h) {
        if (h[t] instanceof Array) {
          if (0 === h[t].length) continue;
          h[t] = [c[t]].concat(h[t]);
        }

        s[t] = c[t], s[t] instanceof Array == !1 && (s[t] *= 1), l[t] = s[t] || 0;
      }

      return this;
    }, this.stop = function () {
      return r && (a.remove(this), r = !1, null !== t && t.call(c), this.stopChainedTweens()), this;
    }, this.stopChainedTweens = function () {
      for (var n = 0, t = g.length; n < t; n++) {
        g[n].stop();
      }
    }, this.delay = function (n) {
      return M = n, this;
    }, this.repeat = function (n) {
      return I = n, this;
    }, this.yoyo = function (n) {
      return w = n, this;
    }, this.easing = function (n) {
      return v = n, this;
    }, this.interpolation = function (n) {
      return O = n, this;
    }, this.chain = function () {
      return g = arguments, this;
    }, this.onStart = function (n) {
      return m = n, this;
    }, this.onUpdate = function (n) {
      return P = n, this;
    }, this.onComplete = function (n) {
      return B = n, this;
    }, this.onStop = function (n) {
      return t = n, this;
    }, this.update = function (n) {
      var t;
      if (n < d) return !0;
      !1 === y && (null !== m && m.call(c), y = !0);
      var r,
          i = (n - d) / p,
          u = v(i = 1 < i ? 1 : i);

      for (t in h) {
        var o = s[t] || 0,
            e = h[t];
        e instanceof Array ? c[t] = O(e, u) : ("string" == typeof e && (e = o + parseFloat(e, 10)), "number" == typeof e && (c[t] = o + (e - o) * u));
      }

      if (null !== P && P.call(c, u), 1 != i) return !0;

      if (0 < I) {
        for (t in isFinite(I) && I--, l) {
          "string" == typeof h[t] && (l[t] = l[t] + parseFloat(h[t], 10)), w && (r = l[t], l[t] = h[t], h[t] = r), s[t] = l[t];
        }

        return w && 0, d = n + M, !0;
      }

      null !== B && B.call(c);

      for (var a = 0, f = g.length; a < f; a++) {
        g[a].start(n);
      }

      return !1;
    };
  }, a.Easing = {
    Linear: {
      None: function None(n) {
        return n;
      }
    },
    Quadratic: {
      In: function In(n) {
        return n * n;
      },
      Out: function Out(n) {
        return n * (2 - n);
      },
      InOut: function InOut(n) {
        return (n *= 2) < 1 ? .5 * n * n : -.5 * (--n * (n - 2) - 1);
      }
    },
    Cubic: {
      In: function In(n) {
        return n * n * n;
      },
      Out: function Out(n) {
        return --n * n * n + 1;
      },
      InOut: function InOut(n) {
        return (n *= 2) < 1 ? .5 * n * n * n : .5 * ((n -= 2) * n * n + 2);
      }
    },
    Quartic: {
      In: function In(n) {
        return n * n * n * n;
      },
      Out: function Out(n) {
        return 1 - --n * n * n * n;
      },
      InOut: function InOut(n) {
        return (n *= 2) < 1 ? .5 * n * n * n * n : -.5 * ((n -= 2) * n * n * n - 2);
      }
    },
    Quintic: {
      In: function In(n) {
        return n * n * n * n * n;
      },
      Out: function Out(n) {
        return --n * n * n * n * n + 1;
      },
      InOut: function InOut(n) {
        return (n *= 2) < 1 ? .5 * n * n * n * n * n : .5 * ((n -= 2) * n * n * n * n + 2);
      }
    },
    Sinusoidal: {
      In: function In(n) {
        return 1 - Math.cos(n * Math.PI / 2);
      },
      Out: function Out(n) {
        return Math.sin(n * Math.PI / 2);
      },
      InOut: function InOut(n) {
        return .5 * (1 - Math.cos(Math.PI * n));
      }
    },
    Exponential: {
      In: function In(n) {
        return 0 === n ? 0 : Math.pow(1024, n - 1);
      },
      Out: function Out(n) {
        return 1 === n ? 1 : 1 - Math.pow(2, -10 * n);
      },
      InOut: function InOut(n) {
        return 0 === n ? 0 : 1 === n ? 1 : (n *= 2) < 1 ? .5 * Math.pow(1024, n - 1) : .5 * (2 - Math.pow(2, -10 * (n - 1)));
      }
    },
    Circular: {
      In: function In(n) {
        return 1 - Math.sqrt(1 - n * n);
      },
      Out: function Out(n) {
        return Math.sqrt(1 - --n * n);
      },
      InOut: function InOut(n) {
        return (n *= 2) < 1 ? -.5 * (Math.sqrt(1 - n * n) - 1) : .5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
      }
    },
    Elastic: {
      In: function In(n) {
        var t,
            r = .1;
        return 0 === n ? 0 : 1 === n ? 1 : (t = !r || r < 1 ? (r = 1, .1) : .4 * Math.asin(1 / r) / (2 * Math.PI), -(r * Math.pow(2, 10 * --n) * Math.sin((n - t) * (2 * Math.PI) / .4)));
      },
      Out: function Out(n) {
        var t,
            r = .1;
        return 0 === n ? 0 : 1 === n ? 1 : (t = !r || r < 1 ? (r = 1, .1) : .4 * Math.asin(1 / r) / (2 * Math.PI), r * Math.pow(2, -10 * n) * Math.sin((n - t) * (2 * Math.PI) / .4) + 1);
      },
      InOut: function InOut(n) {
        var t,
            r = .1;
        return 0 === n ? 0 : 1 === n ? 1 : (t = !r || r < 1 ? (r = 1, .1) : .4 * Math.asin(1 / r) / (2 * Math.PI), (n *= 2) < 1 ? r * Math.pow(2, 10 * --n) * Math.sin((n - t) * (2 * Math.PI) / .4) * -.5 : r * Math.pow(2, -10 * --n) * Math.sin((n - t) * (2 * Math.PI) / .4) * .5 + 1);
      }
    },
    Back: {
      In: function In(n) {
        return n * n * (2.70158 * n - 1.70158);
      },
      Out: function Out(n) {
        return --n * n * (2.70158 * n + 1.70158) + 1;
      },
      InOut: function InOut(n) {
        var t = 2.5949095;
        return (n *= 2) < 1 ? n * n * ((1 + t) * n - t) * .5 : .5 * ((n -= 2) * n * ((1 + t) * n + t) + 2);
      }
    },
    Bounce: {
      In: function In(n) {
        return 1 - a.Easing.Bounce.Out(1 - n);
      },
      Out: function Out(n) {
        return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375;
      },
      InOut: function InOut(n) {
        return n < .5 ? .5 * a.Easing.Bounce.In(2 * n) : .5 * a.Easing.Bounce.Out(2 * n - 1) + .5;
      }
    }
  }, a.Interpolation = {
    Linear: function Linear(n, t) {
      var r = n.length - 1,
          i = r * t,
          u = Math.floor(i),
          o = a.Interpolation.Utils.Linear;
      return t < 0 ? o(n[0], n[1], i) : 1 < t ? o(n[r], n[r - 1], r - i) : o(n[u], n[r < u + 1 ? r : u + 1], i - u);
    },
    Bezier: function Bezier(n, t) {
      for (var r = 0, i = n.length - 1, u = Math.pow, o = a.Interpolation.Utils.Bernstein, e = 0; e <= i; e++) {
        r += u(1 - t, i - e) * u(t, e) * n[e] * o(i, e);
      }

      return r;
    },
    CatmullRom: function CatmullRom(n, t) {
      var r = n.length - 1,
          i = r * t,
          u = Math.floor(i),
          o = a.Interpolation.Utils.CatmullRom;
      return n[0] === n[r] ? (t < 0 && (u = Math.floor(i = r * (1 + t))), o(n[(u - 1 + r) % r], n[u], n[(u + 1) % r], n[(u + 2) % r], i - u)) : t < 0 ? n[0] - (o(n[0], n[0], n[1], n[1], -i) - n[0]) : 1 < t ? n[r] - (o(n[r], n[r], n[r - 1], n[r - 1], i - r) - n[r]) : o(n[u ? u - 1 : 0], n[u], n[r < u + 1 ? r : u + 1], n[r < u + 2 ? r : u + 2], i - u);
    },
    Utils: {
      Linear: function Linear(n, t, r) {
        return (t - n) * r + n;
      },
      Bernstein: function Bernstein(n, t) {
        var r = a.Interpolation.Utils.Factorial;
        return r(n) / r(t) / r(n - t);
      },
      Factorial: (i = [1], function (n) {
        var t,
            r = 1;
        if (i[n]) return i[n];

        for (t = n; 1 < t; t--) {
          r *= t;
        }

        return i[n] = r;
      }),
      CatmullRom: function CatmullRom(n, t, r, i, u) {
        var o = .5 * (r - n),
            e = .5 * (i - t),
            a = u * u;
        return (2 * t - 2 * r + o + e) * (u * a) + (-3 * t + 3 * r - 2 * o - e) * a + o * u + t;
      }
    }
  }, a;
});