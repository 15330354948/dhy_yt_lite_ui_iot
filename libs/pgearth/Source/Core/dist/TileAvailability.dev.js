"use strict";

define(["./binarySearch", "./Cartographic", "./defined", "./defineProperties", "./DeveloperError", "./Rectangle"], function (_, e, i, t, n, h) {
  "use strict";

  function s(e, t) {
    this._tilingScheme = e, this._maximumLevel = t, this._rootNodes = [];
  }

  var g = new h();
  s.prototype.addAvailableTileRange = function (e, t, n, s, i) {
    var h = this._tilingScheme,
        r = this._rootNodes;
    if (0 === e) for (var o = n; o <= i; ++o) {
      for (var a = t; a <= s; ++a) {
        !function (e, t, n, s) {
          for (var i = s.length, h = 0; h < i; ++h) {
            var r = s[h];
            if (r.x === t && r.y === n && r.level === e) return 1;
          }
        }(e, a, o, r) && r.push(new m(h, void 0, 0, a, o));
      }
    }
    h.tileXYToRectangle(t, n, e, g);
    var l = g.west,
        u = g.north;
    h.tileXYToRectangle(s, i, e, g);

    for (var v = g.east, w = new p(e, l, g.south, v, u), c = 0; c < r.length; ++c) {
      var f = r[c];
      x(f.extent, w) && function (e, t, n) {
        for (; t.level < e;) {
          if (M(t.nw.extent, n)) t = t.nw;else if (M(t.ne.extent, n)) t = t.ne;else if (M(t.sw.extent, n)) t = t.sw;else {
            if (!M(t.se.extent, n)) break;
            t = t.se;
          }
        }

        {
          var s;
          0 === t.rectangles.length || t.rectangles[t.rectangles.length - 1].level <= n.level ? t.rectangles.push(n) : ((s = _(t.rectangles, n.level, d)) <= 0 && (s = ~s), t.rectangles.splice(s, 0, n));
        }
      }(this._maximumLevel, f, w);
    }
  }, s.prototype.computeMaximumLevelAtPosition = function (e) {
    for (var t, n = 0; n < this._rootNodes.length; ++n) {
      var s = this._rootNodes[n];

      if (c(s.extent, e)) {
        t = s;
        break;
      }
    }

    return i(t) ? function e(t, n, s) {
      var i = 0;
      var h = !1;

      for (; !h;) {
        var r = n._nw && c(n._nw.extent, s),
            o = n._ne && c(n._ne.extent, s),
            a = n._sw && c(n._sw.extent, s),
            l = n._se && c(n._se.extent, s);

        if (1 < r + o + a + l) {
          r && (i = Math.max(i, e(n, n._nw, s))), o && (i = Math.max(i, e(n, n._ne, s))), a && (i = Math.max(i, e(n, n._sw, s))), l && (i = Math.max(i, e(n, n._se, s)));
          break;
        }

        r ? n = n._nw : o ? n = n._ne : a ? n = n._sw : l ? n = n._se : h = !0;
      }

      for (; n !== t;) {
        for (var u = n.rectangles, v = u.length - 1; 0 <= v && u[v].level > i; --v) {
          var w = u[v];
          c(w, s) && (i = w.level);
        }

        n = n.parent;
      }

      return i;
    }(void 0, t, e) : -1;
  };
  var r = [],
      o = [],
      a = new h(),
      l = new h();

  s.prototype.computeBestAvailableLevelOverRectangle = function (e) {
    var t = r;
    t.length = 0, e.east < e.west ? (t.push(h.fromRadians(-Math.PI, e.south, e.east, e.north, a)), t.push(h.fromRadians(e.west, e.south, Math.PI, e.north, l))) : t.push(e);

    for (var n = o, s = n.length = 0; s < this._rootNodes.length; ++s) {
      !function e(t, n, s) {
        if (!n) return;
        var i;
        var h = !1;

        for (i = 0; i < s.length; ++i) {
          h = h || x(n.extent, s[i]);
        }

        if (!h) return;
        var r = n.rectangles;

        for (i = 0; i < r.length; ++i) {
          var o = r[i];
          t[o.level] || (t[o.level] = s), t[o.level] = v(t[o.level], o);
        }

        e(t, n._nw, s);
        e(t, n._ne, s);
        e(t, n._sw, s);
        e(t, n._se, s);
      }(n, this._rootNodes[s], t);
    }

    for (s = n.length - 1; 0 <= s; --s) {
      if (i(n[s]) && 0 === n[s].length) return s;
    }

    return 0;
  };

  var u = new e();

  function m(e, t, n, s, i) {
    this.tilingScheme = e, this.parent = t, this.level = n, this.x = s, this.y = i, this.extent = e.tileXYToRectangle(s, i, n), this.rectangles = [], this._sw = void 0, this._se = void 0, this._nw = void 0, this._ne = void 0;
  }

  function p(e, t, n, s, i) {
    this.level = e, this.west = t, this.south = n, this.east = s, this.north = i;
  }

  function x(e, t) {
    var n = Math.max(e.west, t.west),
        s = Math.max(e.south, t.south),
        i = Math.min(e.east, t.east);
    return s < Math.min(e.north, t.north) && n < i;
  }

  function d(e, t) {
    return e.level - t;
  }

  function M(e, t) {
    return t.west >= e.west && t.east <= e.east && t.south >= e.south && t.north <= e.north;
  }

  function c(e, t) {
    return t.longitude >= e.west && t.longitude <= e.east && t.latitude >= e.south && t.latitude <= e.north;
  }

  function v(e, t) {
    for (var n = [], s = 0; s < e.length; ++s) {
      var i = e[s];
      x(i, t) ? (i.west < t.west && n.push(new h(i.west, i.south, t.west, i.north)), i.east > t.east && n.push(new h(t.east, i.south, i.east, i.north)), i.south < t.south && n.push(new h(Math.max(t.west, i.west), i.south, Math.min(t.east, i.east), t.south)), i.north > t.north && n.push(new h(Math.max(t.west, i.west), t.north, Math.min(t.east, i.east), i.north))) : n.push(i);
    }

    return n;
  }

  return s.prototype.isTileAvailable = function (e, t, n) {
    var s = this._tilingScheme.tileXYToRectangle(t, n, e, g);

    return h.center(s, u), this.computeMaximumLevelAtPosition(u) >= e;
  }, s.prototype.computeChildMaskForTile = function (e, t, n) {
    var s = e + 1;
    if (s >= this._maximumLevel) return 0;
    var i = 0;
    return i |= this.isTileAvailable(s, 2 * t, 2 * n + 1) ? 1 : 0, i |= this.isTileAvailable(s, 2 * t + 1, 2 * n + 1) ? 2 : 0, i |= this.isTileAvailable(s, 2 * t, 2 * n) ? 4 : 0, i |= this.isTileAvailable(s, 2 * t + 1, 2 * n) ? 8 : 0;
  }, t(m.prototype, {
    nw: {
      get: function get() {
        return this._nw || (this._nw = new m(this.tilingScheme, this, this.level + 1, 2 * this.x, 2 * this.y)), this._nw;
      }
    },
    ne: {
      get: function get() {
        return this._ne || (this._ne = new m(this.tilingScheme, this, this.level + 1, 2 * this.x + 1, 2 * this.y)), this._ne;
      }
    },
    sw: {
      get: function get() {
        return this._sw || (this._sw = new m(this.tilingScheme, this, this.level + 1, 2 * this.x, 2 * this.y + 1)), this._sw;
      }
    },
    se: {
      get: function get() {
        return this._se || (this._se = new m(this.tilingScheme, this, this.level + 1, 2 * this.x + 1, 2 * this.y + 1)), this._se;
      }
    }
  }), s;
});