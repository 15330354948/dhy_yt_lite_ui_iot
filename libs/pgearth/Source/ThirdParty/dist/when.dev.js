"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (n) {
  "use strict";

  n(function () {
    var r, e, h;

    function m(n, t, r, e) {
      return a(n).then(t, r, e);
    }

    function a(n) {
      var t,
          r,
          e = n instanceof l ? n : u(n) ? (t = j(), n.then(function (n) {
        t.resolve(n);
      }, function (n) {
        t.reject(n);
      }, function (n) {
        t.progress(n);
      }), t.promise) : (r = n, new l(function (n) {
        try {
          return a(n ? n(r) : r);
        } catch (n) {
          return p(n);
        }
      }));
      return e;
    }

    function l(n) {
      this.then = n;
    }

    function p(r) {
      return new l(function (n, t) {
        try {
          return t ? a(t(r)) : p(r);
        } catch (n) {
          return p(n);
        }
      });
    }

    function j() {
      var n = new l(u),
          i = [],
          c = [],
          e = function e(t, r, _e) {
        var u = j(),
            o = "function" == typeof _e ? function (n) {
          try {
            u.progress(_e(n));
          } catch (n) {
            u.progress(n);
          }
        } : function (n) {
          u.progress(n);
        };
        return i.push(function (n) {
          n.then(t, r).then(u.resolve, u.reject, o);
        }), c.push(o), u.promise;
      },
          t = function t(n) {
        return v(c, n), n;
      },
          _r = function r(n) {
        return n = a(n), e = n.then, _r = a, t = d, v(i, n), c = i = h, n;
      };

      return {
        then: u,
        resolve: o,
        reject: f,
        progress: s,
        promise: n,
        resolver: {
          resolve: o,
          reject: f,
          progress: s
        }
      };

      function u(n, t, r) {
        return e(n, t, r);
      }

      function o(n) {
        return _r(n);
      }

      function f(n) {
        return _r(p(n));
      }

      function s(n) {
        return t(n);
      }
    }

    function u(n) {
      return n && "function" == typeof n.then;
    }

    function o(n, p, v, g, y) {
      return f(2, arguments), m(n, function (n) {
        var _t,
            _r2,
            e,
            u,
            o = n.length >>> 0,
            i = Math.max(0, Math.min(p, o)),
            c = [],
            f = o - i + 1,
            s = [],
            h = j();

        if (i) for (e = h.progress, _r2 = function r(n) {
          s.push(n), --f || (_t = _r2 = d, h.reject(s));
        }, _t = function t(n) {
          c.push(n), --i || (_t = _r2 = d, h.resolve(c));
        }, u = 0; u < o; ++u) {
          u in n && m(n[u], l, a, e);
        } else h.resolve(c);
        return h.then(v, g, y);

        function a(n) {
          _r2(n);
        }

        function l(n) {
          _t(n);
        }
      });
    }

    function i(n, t, r, e) {
      return f(1, arguments), c(n, s).then(t, r, e);
    }

    function c(n, c) {
      return m(n, function (n) {
        var t,
            r,
            e,
            u = t = n.length >>> 0,
            o = [],
            i = j();
        if (u) for (r = function r(n, t) {
          m(n, c).then(function (n) {
            o[t] = n, --u || i.resolve(o);
          }, i.reject);
        }, e = 0; e < t; e++) {
          e in n ? r(n[e], e) : --u;
        } else i.resolve(o);
        return i.promise;
      });
    }

    function v(n, t) {
      for (var r, e = 0; r = n[e++];) {
        r(t);
      }
    }

    function f(n, t) {
      for (var r, e = t.length; n < e;) {
        if (null != (r = t[--e]) && "function" != typeof r) throw new Error("arg " + e + " must be a function");
      }
    }

    function d() {}

    function s(n) {
      return n;
    }

    return m.defer = j, m.resolve = a, m.reject = function (n) {
      return m(n, p);
    }, m.join = function () {
      return c(arguments, s);
    }, m.all = i, m.map = c, m.reduce = function (n, o) {
      var t = e.call(arguments, 1);
      return m(n, function (n) {
        var u = n.length;
        return t[0] = function (n, r, e) {
          return m(n, function (t) {
            return m(r, function (n) {
              return o(t, n, e, u);
            });
          });
        }, r.apply(n, t);
      });
    }, m.any = function (n, t, r, e) {
      return o(n, 1, function (n) {
        return t ? t(n[0]) : n[0];
      }, r, e);
    }, m.some = o, m.chain = function (n, t, r) {
      var e = 2 < arguments.length;
      return m(n, function (n) {
        return n = e ? r : n, t.resolve(n), n;
      }, function (n) {
        return t.reject(n), p(n);
      }, t.progress);
    }, m.isPromise = u, l.prototype = {
      always: function always(n, t) {
        return this.then(n, n, t);
      },
      otherwise: function otherwise(n) {
        return this.then(h, n);
      },
      "yield": function _yield(n) {
        return this.then(function () {
          return n;
        });
      },
      spread: function spread(t) {
        return this.then(function (n) {
          return i(n, function (n) {
            return t.apply(h, n);
          });
        });
      }
    }, e = [].slice, r = [].reduce || function (n) {
      var t,
          r = 0,
          e = Object(this),
          u = e.length >>> 0,
          o = arguments;
      if (o.length <= 1) for (;;) {
        if (r in e) {
          t = e[r++];
          break;
        }

        if (++r >= u) throw new TypeError();
      } else t = o[1];

      for (; r < u; ++r) {
        r in e && (t = n(t, e[r], r, e));
      }

      return t;
    }, m;
  });
}("function" == typeof define && define.amd ? define : function (n) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = n() : this.when = n();
});