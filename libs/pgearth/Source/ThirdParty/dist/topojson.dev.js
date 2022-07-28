"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function () {
  var t = {
    version: "1.6.18",
    mesh: function mesh(n) {
      return i(n, r.apply(this, arguments));
    },
    meshArcs: r,
    merge: function merge(n) {
      return i(n, e.apply(this, arguments));
    },
    mergeArcs: e,
    feature: function feature(t, n) {
      return "GeometryCollection" === n.type ? {
        type: "FeatureCollection",
        features: n.geometries.map(function (n) {
          return o(t, n);
        })
      } : o(t, n);
    },
    neighbors: function neighbors(n) {
      var e = {},
          t = n.map(function () {
        return [];
      });

      function r(n, r) {
        n.forEach(function (n) {
          n < 0 && (n = ~n);
          var t = e[n];
          t ? t.push(r) : e[n] = [r];
        });
      }

      function o(n, t) {
        n.forEach(function (n) {
          r(n, t);
        });
      }

      var i = {
        LineString: r,
        MultiLineString: o,
        Polygon: o,
        MultiPolygon: function MultiPolygon(n, t) {
          n.forEach(function (n) {
            o(n, t);
          });
        }
      };

      for (var u in n.forEach(function t(n, r) {
        "GeometryCollection" === n.type ? n.geometries.forEach(function (n) {
          t(n, r);
        }) : n.type in i && i[n.type](n.arcs, r);
      }), e) {
        for (var c = e[u], f = c.length, a = 0; a < f; ++a) {
          for (var s = a + 1; s < f; ++s) {
            var l,
                h = c[a],
                p = c[s];
            (l = t[h])[u = v(l, p)] !== p && l.splice(u, 0, p), (l = t[p])[u = v(l, h)] !== h && l.splice(u, 0, h);
          }
        }
      }

      return t;
    },
    presimplify: function presimplify(n, a) {
      var s = g(n.transform),
          l = function (n) {
        if (!n) return y;
        var o,
            i,
            u = n.scale[0],
            c = n.scale[1],
            f = n.translate[0],
            a = n.translate[1];
        return function (n, t) {
          t || (o = i = 0);
          var r = (n[0] - f) / u | 0,
              e = (n[1] - a) / c | 0;
          n[0] = r - o, n[1] = e - i, o = r, i = e;
        };
      }(n.transform),
          h = function () {
        var n = {},
            u = [],
            c = 0;

        function e(n, t) {
          for (; 0 < t;) {
            var r = (t + 1 >> 1) - 1,
                e = u[r];
            if (0 <= f(n, e)) break;
            u[e._ = t] = e, u[n._ = t = r] = n;
          }
        }

        function o(n, t) {
          for (;;) {
            var r = t + 1 << 1,
                e = r - 1,
                o = t,
                i = u[o];
            if (e < c && f(u[e], i) < 0 && (i = u[o = e]), r < c && f(u[r], i) < 0 && (i = u[o = r]), o === t) break;
            u[i._ = t] = i, u[n._ = t = o] = n;
          }
        }

        return n.push = function (n) {
          return e(u[n._ = c] = n, c++), c;
        }, n.pop = function () {
          if (!(c <= 0)) {
            var n,
                t = u[0];
            return 0 < --c && (n = u[c], o(u[n._ = 0] = n, 0)), t;
          }
        }, n.remove = function (n) {
          var t,
              r = n._;
          if (u[r] === n) return r !== --c && (f(t = u[c], n) < 0 ? e : o)(u[t._ = r] = t, r), r;
        }, n;
      }();

      a = a || u;

      function p(n) {
        h.remove(n), n[1][2] = a(n), h.push(n);
      }

      return n.arcs.forEach(function (n) {
        for (var t, r, e = [], o = 0, i = 0, u = n.length; i < u; ++i) {
          r = n[i], s(n[i] = [r[0], r[1], 1 / 0], i);
        }

        for (i = 1, u = n.length - 1; i < u; ++i) {
          (t = n.slice(i - 1, i + 2))[1][2] = a(t), e.push(t), h.push(t);
        }

        for (i = 0, u = e.length; i < u; ++i) {
          (t = e[i]).previous = e[i - 1], t.next = e[i + 1];
        }

        for (; t = h.pop();) {
          var c = t.previous,
              f = t.next;
          t[1][2] < o ? t[1][2] = o : o = t[1][2], c && (c.next = f, c[2] = t[2], p(c)), f && (f.previous = c, f[0] = t[0], p(f));
        }

        n.forEach(l);
      }), n;
    }
  };

  function h(f, o) {
    var i = {},
        a = {},
        s = {},
        u = [],
        c = -1;

    function n(n, t) {
      for (var r in n) {
        var e = n[r];
        delete t[e.start], delete e.start, delete e.end, e.forEach(function (n) {
          i[n < 0 ? ~n : n] = 1;
        }), u.push(e);
      }
    }

    return o.forEach(function (n, t) {
      var r,
          e = f.arcs[n < 0 ? ~n : n];
      e.length < 3 && !e[1][0] && !e[1][1] && (r = o[++c], o[c] = n, o[t] = r);
    }), o.forEach(function (n) {
      var t,
          r,
          e,
          o,
          i = function (n) {
        var t,
            r = f.arcs[n < 0 ? ~n : n],
            e = r[0];
        f.transform ? (t = [0, 0], r.forEach(function (n) {
          t[0] += n[0], t[1] += n[1];
        })) : t = r[r.length - 1];
        return n < 0 ? [t, e] : [e, t];
      }(n),
          u = i[0],
          c = i[1];

      (t = s[u]) ? (delete s[t.end], t.push(n), t.end = c, (r = a[c]) ? (delete a[r.start], e = r === t ? t : t.concat(r), a[e.start = t.start] = s[e.end = r.end] = e) : a[t.start] = s[t.end] = t) : (t = a[c]) ? (delete a[t.start], t.unshift(n), t.start = u, (r = s[u]) ? (delete s[r.end], o = r === t ? t : r.concat(t), a[o.start = r.start] = s[o.end = t.end] = o) : a[t.start] = s[t.end] = t) : a[(t = [n]).start = u] = s[t.end = c] = t;
    }), n(s, a), n(a, s), o.forEach(function (n) {
      i[n < 0 ? ~n : n] || u.push([n]);
    }), u;
  }

  function r(n, t, r) {
    var e = [];

    if (1 < arguments.length) {
      var _u = function _u(n) {
        var t = n < 0 ? ~n : n;
        (i[t] || (i[t] = [])).push({
          i: n,
          g: o
        });
      };

      var c = function c(n) {
        n.forEach(_u);
      };

      var _f = function _f(n) {
        n.forEach(c);
      };

      var o,
          i = [];
      var a = {
        LineString: c,
        MultiLineString: _f,
        Polygon: _f,
        MultiPolygon: function MultiPolygon(n) {
          n.forEach(_f);
        }
      };
      !function n(t) {
        "GeometryCollection" === t.type ? t.geometries.forEach(n) : t.type in a && a[(o = t).type](t.arcs);
      }(t), i.forEach(arguments.length < 3 ? function (n) {
        e.push(n[0].i);
      } : function (n) {
        r(n[0].g, n[n.length - 1].g) && e.push(n[0].i);
      });
    } else for (var s = 0, l = n.arcs.length; s < l; ++s) {
      e.push(s);
    }

    return {
      type: "MultiLineString",
      arcs: h(n, e)
    };
  }

  function e(u, t) {
    var c = {},
        r = [],
        e = [];

    function o(t) {
      t.forEach(function (n) {
        n.forEach(function (n) {
          (c[n = n < 0 ? ~n : n] || (c[n] = [])).push(t);
        });
      }), r.push(t);
    }

    function f(n) {
      return 0 < function (n) {
        var t,
            r = -1,
            e = n.length,
            o = n[e - 1],
            i = 0;

        for (; ++r < e;) {
          t = o, o = n[r], i += t[0] * o[1] - t[1] * o[0];
        }

        return .5 * i;
      }(i(u, {
        type: "Polygon",
        arcs: [n]
      }).coordinates[0]);
    }

    return t.forEach(function (n) {
      "Polygon" === n.type ? o(n.arcs) : "MultiPolygon" === n.type && n.arcs.forEach(o);
    }), r.forEach(function (n) {
      if (!n._) {
        var t = [],
            r = [n];

        for (n._ = 1, e.push(t); n = r.pop();) {
          t.push(n), n.forEach(function (n) {
            n.forEach(function (n) {
              c[n < 0 ? ~n : n].forEach(function (n) {
                n._ || (n._ = 1, r.push(n));
              });
            });
          });
        }
      }
    }), r.forEach(function (n) {
      delete n._;
    }), {
      type: "MultiPolygon",
      arcs: e.map(function (t) {
        var r = [];
        if (t.forEach(function (n) {
          n.forEach(function (n) {
            n.forEach(function (n) {
              c[n < 0 ? ~n : n].length < 2 && r.push(n);
            });
          });
        }), r = h(u, r), 1 < (n = r.length)) for (var e, o = f(t[0][0]), i = 0; i < n; ++i) {
          if (o === f(r[i])) {
            e = r[0], r[0] = r[i], r[i] = e;
            break;
          }
        }
        return r;
      })
    };
  }

  function o(n, t) {
    var r = {
      type: "Feature",
      id: t.id,
      properties: t.properties || {},
      geometry: i(n, t)
    };
    return null == t.id && delete r.id, r;
  }

  function i(n, t) {
    var u = g(n.transform),
        c = n.arcs;

    function o(n, t) {
      t.length && t.pop();

      for (var r, e = c[n < 0 ? ~n : n], o = 0, i = e.length; o < i; ++o) {
        t.push(r = e[o].slice()), u(r, o);
      }

      n < 0 && function (n, t) {
        var r,
            e = n.length,
            o = e - t;

        for (; o < --e;) {
          r = n[o], n[o++] = n[e], n[e] = r;
        }
      }(t, i);
    }

    function r(n) {
      return n = n.slice(), u(n, 0), n;
    }

    function e(n) {
      for (var t = [], r = 0, e = n.length; r < e; ++r) {
        o(n[r], t);
      }

      return t.length < 2 && t.push(t[0].slice()), t;
    }

    function i(n) {
      for (var t = e(n); t.length < 4;) {
        t.push(t[0].slice());
      }

      return t;
    }

    function f(n) {
      return n.map(i);
    }

    var a = {
      Point: function Point(n) {
        return r(n.coordinates);
      },
      MultiPoint: function MultiPoint(n) {
        return n.coordinates.map(r);
      },
      LineString: function LineString(n) {
        return e(n.arcs);
      },
      MultiLineString: function MultiLineString(n) {
        return n.arcs.map(e);
      },
      Polygon: function Polygon(n) {
        return f(n.arcs);
      },
      MultiPolygon: function MultiPolygon(n) {
        return n.arcs.map(f);
      }
    };
    return function n(t) {
      var r = t.type;
      return "GeometryCollection" === r ? {
        type: r,
        geometries: t.geometries.map(n)
      } : r in a ? {
        type: r,
        coordinates: a[r](t)
      } : null;
    }(t);
  }

  function v(n, t) {
    for (var r = 0, e = n.length; r < e;) {
      var o = r + e >>> 1;
      n[o] < t ? r = 1 + o : e = o;
    }

    return r;
  }

  function u(n) {
    var t = n[0],
        r = n[1],
        e = n[2];
    return Math.abs((t[0] - e[0]) * (r[1] - t[1]) - (t[0] - r[0]) * (e[1] - t[1]));
  }

  function f(n, t) {
    return n[1][2] - t[1][2];
  }

  function g(n) {
    if (!n) return y;
    var r,
        e,
        o = n.scale[0],
        i = n.scale[1],
        u = n.translate[0],
        c = n.translate[1];
    return function (n, t) {
      t || (r = e = 0), n[0] = (r += n[0]) * o + u, n[1] = (e += n[1]) * i + c;
    };
  }

  function y() {}

  "function" == typeof define && define.amd ? define(t) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = t : this.topojson = t;
}();