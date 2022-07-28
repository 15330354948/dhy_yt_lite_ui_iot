"use strict";

!function (t, e) {
  "undefined" != typeof module && module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.h337 = e();
}(void 0, function () {
  var l,
      h = {
    defaultRadius: 40,
    defaultRenderer: "canvas2d",
    defaultGradient: {
      .25: "rgb(0,0,255)",
      .55: "rgb(0,255,0)",
      .85: "yellow",
      1: "rgb(255,0,0)"
    },
    defaultMaxOpacity: 1,
    defaultMinOpacity: 0,
    defaultBlur: .85,
    defaultXField: "x",
    defaultYField: "y",
    defaultValueField: "value",
    plugins: {}
  },
      o = (l = h.defaultRadius, t.prototype = {
    _organiseData: function _organiseData(t, e) {
      var a = t[this._xField],
          i = t[this._yField],
          r = this._radi,
          n = this._data,
          s = this._max,
          h = this._min,
          o = t[this._valueField] || 1,
          d = t.radius || this._cfgRadius || l;
      return n[a] || (n[a] = [], r[a] = []), n[a][i] ? n[a][i] += o : (n[a][i] = o, r[a][i] = d), n[a][i] > s ? (e ? this.setDataMax(n[a][i]) : this._max = n[a][i], !1) : {
        x: a,
        y: i,
        value: o,
        radius: d,
        min: h,
        max: s
      };
    },
    _unOrganizeData: function _unOrganizeData() {
      var t = [],
          e = this._data,
          a = this._radi;

      for (var i in e) {
        for (var r in e[i]) {
          t.push({
            x: i,
            y: r,
            radius: a[i][r],
            value: e[i][r]
          });
        }
      }

      return {
        min: this._min,
        max: this._max,
        data: t
      };
    },
    _onExtremaChange: function _onExtremaChange() {
      this._coordinator.emit("extremachange", {
        min: this._min,
        max: this._max
      });
    },
    addData: function addData() {
      if (0 < arguments[0].length) for (var t = arguments[0], e = t.length; e--;) {
        this.addData.call(this, t[e]);
      } else {
        var a = this._organiseData(arguments[0], !0);

        a && this._coordinator.emit("renderpartial", {
          min: this._min,
          max: this._max,
          data: [a]
        });
      }
      return this;
    },
    setData: function setData(t) {
      var e = t.data,
          a = e.length;
      this._data = [], this._radi = [];

      for (var i = 0; i < a; i++) {
        this._organiseData(e[i], !1);
      }

      return this._max = t.max, this._min = t.min || 0, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this;
    },
    removeData: function removeData() {},
    setDataMax: function setDataMax(t) {
      return this._max = t, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this;
    },
    setDataMin: function setDataMin(t) {
      return this._min = t, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this;
    },
    setCoordinator: function setCoordinator(t) {
      this._coordinator = t;
    },
    _getInternalData: function _getInternalData() {
      return {
        max: this._max,
        min: this._min,
        data: this._data,
        radi: this._radi
      };
    },
    getData: function getData() {
      return this._unOrganizeData();
    }
  }, t);

  function t(t) {
    this._coordinator = {}, this._data = [], this._radi = [], this._min = 0, this._max = 1, this._xField = t.xField || t.defaultXField, this._yField = t.yField || t.defaultYField, this._valueField = t.valueField || t.defaultValueField, t.radius && (this._cfgRadius = t.radius);
  }

  var e = (a.prototype = {
    renderPartial: function renderPartial(t) {
      this._drawAlpha(t), this._colorize();
    },
    renderAll: function renderAll(t) {
      this._clear(), this._drawAlpha(function (t) {
        for (var e = [], a = t.min, i = t.max, r = t.radi, t = t.data, n = Object.keys(t), s = n.length; s--;) {
          for (var h = n[s], o = Object.keys(t[h]), d = o.length; d--;) {
            var l = o[d],
                u = t[h][l],
                _ = r[h][l];
            e.push({
              x: h,
              y: l,
              value: u,
              radius: _
            });
          }
        }

        return {
          min: a,
          max: i,
          data: e
        };
      }(t)), this._colorize();
    },
    _updateGradient: function _updateGradient(t) {
      this._palette = n(t);
    },
    updateConfig: function updateConfig(t) {
      t.gradient && this._updateGradient(t), this._setStyles(t);
    },
    setDimensions: function setDimensions(t, e) {
      this._width = t, this._height = e, this.canvas.width = this.shadowCanvas.width = t, this.canvas.height = this.shadowCanvas.height = e;
    },
    _clear: function _clear() {
      this.shadowCtx.clearRect(0, 0, this._width, this._height), this.ctx.clearRect(0, 0, this._width, this._height);
    },
    _setStyles: function _setStyles(t) {
      this._blur = 0 == t.blur ? 0 : t.blur || t.defaultBlur, t.backgroundColor && (this.canvas.style.backgroundColor = t.backgroundColor), this._opacity = 255 * (t.opacity || 0), this._maxOpacity = 255 * (t.maxOpacity || t.defaultMaxOpacity), this._minOpacity = 255 * (t.minOpacity || t.defaultMinOpacity), this._useGradientOpacity = !!t.useGradientOpacity;
    },
    _drawAlpha: function _drawAlpha(t) {
      for (var e, a, i, r, n, s, h, o = this._min = t.min, d = this._max = t.max, l = (t = t.data || []).length, u = 1 - this._blur; l--;) {
        var _,
            c = t[l],
            f = c.x,
            g = c.y,
            m = c.radius,
            p = Math.min(c.value, d),
            x = f - m,
            v = g - m,
            y = this.shadowCtx;

        this._templates[m] ? _ = this._templates[m] : this._templates[m] = (e = m, a = u, h = n = r = i = void 0, r = document.createElement("canvas"), n = r.getContext("2d"), h = s = e, r.width = r.height = 2 * e, 1 == a ? (n.beginPath(), n.arc(s, h, e, 0, 2 * Math.PI, !1), n.fillStyle = "rgba(0,0,0,1)", n.fill()) : ((i = n.createRadialGradient(s, h, e * a, s, h, e)).addColorStop(0, "rgba(0,0,0,1)"), i.addColorStop(1, "rgba(0,0,0,0)"), n.fillStyle = i, n.fillRect(0, 0, 2 * e, 2 * e)), _ = r), y.globalAlpha = (p - o) / (d - o), y.drawImage(_, x, v), x < this._renderBoundaries[0] && (this._renderBoundaries[0] = x), v < this._renderBoundaries[1] && (this._renderBoundaries[1] = v), x + 2 * m > this._renderBoundaries[2] && (this._renderBoundaries[2] = x + 2 * m), v + 2 * m > this._renderBoundaries[3] && (this._renderBoundaries[3] = v + 2 * m);
      }
    },
    _colorize: function _colorize() {
      var t = this._renderBoundaries[0],
          e = this._renderBoundaries[1],
          a = this._renderBoundaries[2] - t,
          i = this._renderBoundaries[3] - e,
          r = this._width,
          n = this._height,
          s = this._opacity,
          h = this._maxOpacity,
          o = this._minOpacity,
          d = this._useGradientOpacity;
      t < 0 && (t = 0), e < 0 && (e = 0), r < t + a && (a = r - t), n < e + i && (i = n - e);

      for (var l = this.shadowCtx.getImageData(t, e, a, i), u = l.data, _ = u.length, c = this._palette, f = 3; f < _; f += 4) {
        var g,
            m = u[f],
            p = 4 * m;
        p && (g = 0 < s ? s : m < h ? m < o ? o : m : h, u[f - 3] = c[p], u[f - 2] = c[1 + p], u[f - 1] = c[2 + p], u[f] = d ? c[3 + p] : g);
      }

      l.data = u, this.ctx.putImageData(l, t, e), this._renderBoundaries = [1e3, 1e3, 0, 0];
    },
    getValueAt: function getValueAt(t) {
      var e = this.shadowCtx.getImageData(t.x, t.y, 1, 1).data[3],
          a = this._max,
          i = this._min;
      return Math.abs(a - i) * (e / 255) >> 0;
    },
    getDataURL: function getDataURL() {
      return this.canvas.toDataURL();
    }
  }, a);

  function n(t) {
    var e = t.gradient || t.defaultGradient,
        a = document.createElement("canvas"),
        i = a.getContext("2d");
    a.width = 256, a.height = 1;
    var r = i.createLinearGradient(0, 0, 256, 1);

    for (var n in e) {
      r.addColorStop(n, e[n]);
    }

    return i.fillStyle = r, i.fillRect(0, 0, 256, 1), i.getImageData(0, 0, 256, 1).data;
  }

  function a(t) {
    var e = t.container,
        a = this.shadowCanvas = document.createElement("canvas"),
        i = this.canvas = t.canvas || document.createElement("canvas"),
        r = (this._renderBoundaries = [1e4, 1e4, 0, 0], getComputedStyle(t.container) || {});
    i.className = "heatmap-canvas", this._width = i.width = a.width = +r.width.replace(/px/, ""), this._height = i.height = a.height = +r.height.replace(/px/, ""), this.shadowCtx = a.getContext("2d"), this.ctx = i.getContext("2d"), i.style.cssText = a.style.cssText = "position:absolute;left:0;top:0;", e.style.position = "relative", e.appendChild(i), this._palette = n(t), this._templates = {}, this._setStyles(t);
  }

  var i,
      d,
      u = (i = !1, "canvas2d" === h.defaultRenderer && (i = e), i),
      _ = function _() {
    for (var t = {}, e = arguments.length, a = 0; a < e; a++) {
      var i = arguments[a];

      for (var r in i) {
        t[r] = i[r];
      }
    }

    return t;
  },
      r = (s.prototype = {
    on: function on(t, e, a) {
      var i = this.cStore;
      i[t] || (i[t] = []), i[t].push(function (t) {
        return e.call(a, t);
      });
    },
    emit: function emit(t, e) {
      var a = this.cStore;
      if (a[t]) for (var i = a[t].length, r = 0; r < i; r++) {
        (0, a[t][r])(e);
      }
    }
  }, d = s, c.prototype = {
    addData: function addData() {
      return this._store.addData.apply(this._store, arguments), this;
    },
    removeData: function removeData() {
      return this._store.removeData && this._store.removeData.apply(this._store, arguments), this;
    },
    setData: function setData() {
      return this._store.setData.apply(this._store, arguments), this;
    },
    setDataMax: function setDataMax() {
      return this._store.setDataMax.apply(this._store, arguments), this;
    },
    setDataMin: function setDataMin() {
      return this._store.setDataMin.apply(this._store, arguments), this;
    },
    configure: function configure(t) {
      return this._config = _(this._config, t), this._renderer.updateConfig(this._config), this._coordinator.emit("renderall", this._store._getInternalData()), this;
    },
    repaint: function repaint() {
      return this._coordinator.emit("renderall", this._store._getInternalData()), this;
    },
    getData: function getData() {
      return this._store.getData();
    },
    getDataURL: function getDataURL() {
      return this._renderer.getDataURL();
    },
    getValueAt: function getValueAt(t) {
      return this._store.getValueAt ? this._store.getValueAt(t) : this._renderer.getValueAt ? this._renderer.getValueAt(t) : null;
    }
  }, c);

  function s() {
    this.cStore = {};
  }

  function c() {
    var e,
        t,
        a,
        i,
        r = this._config = _(h, arguments[0] || {});

    if (this._coordinator = new d(), r.plugin) {
      var n = r.plugin;
      if (!h.plugins[n]) throw new Error("Plugin '" + n + "' not found. Maybe it was not registered.");
      var s = h.plugins[n];
      this._renderer = new s.renderer(r), this._store = new s.store(r);
    } else this._renderer = new u(r), this._store = new o(r);

    t = (e = this)._renderer, a = e._coordinator, i = e._store, a.on("renderpartial", t.renderPartial, t), a.on("renderall", t.renderAll, t), a.on("extremachange", function (t) {
      e._config.onExtremaChange && e._config.onExtremaChange({
        min: t.min,
        max: t.max,
        gradient: e._config.gradient || e._config.defaultGradient
      });
    }), i.setCoordinator(a);
  }

  return {
    create: function create(t) {
      return new r(t);
    },
    register: function register(t, e) {
      h.plugins[t] = e;
    }
  };
});