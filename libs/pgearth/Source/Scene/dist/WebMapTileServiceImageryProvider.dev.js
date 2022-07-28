"use strict";

define(["../Core/combine", "../Core/Credit", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/freezeObject", "../Core/isArray", "../Core/Rectangle", "../Core/Resource", "../Core/WebMercatorTilingScheme", "../ThirdParty/when", "./ImageryProvider", "./TimeDynamicImagery"], function (d, u, c, g, e, h, _, t, y, f, p, v, w, x, T) {
  "use strict";

  var b = t({
    service: "WMTS",
    version: "1.0.0",
    request: "GetTile"
  });

  function i(e) {
    if (e = c(e, c.EMPTY_OBJECT), !g(e.url)) throw new h("options.url is required.");
    if (!g(e.layer)) throw new h("options.layer is required.");
    if (!g(e.style)) throw new h("options.style is required.");
    if (!g(e.tileMatrixSetID)) throw new h("options.tileMatrixSetID is required.");
    if (g(e.times) && !g(e.clock)) throw new h("options.times was specified, so options.clock is required.");
    var t,
        i = p.createIfNeeded(e.url),
        r = e.style,
        s = e.tileMatrixSetID;
    0 <= i.url.indexOf("{") ? (t = {
      style: r,
      Style: r,
      TileMatrixSet: s
    }, i.setTemplateValues(t), this._useKvp = !1) : (i.setQueryParameters(b), this._useKvp = !0), this._resource = i, this._layer = e.layer, this._style = r, this._tileMatrixSetID = s, this._tileMatrixLabels = e.tileMatrixLabels, this._format = c(e.format, "image/jpeg"), this._tileDiscardPolicy = e.tileDiscardPolicy, this._tilingScheme = g(e.tilingScheme) ? e.tilingScheme : new v({
      ellipsoid: e.ellipsoid
    }), this._tileWidth = c(e.tileWidth, 256), this._tileHeight = c(e.tileHeight, 256), this._minimumLevel = c(e.minimumLevel, 0), this._maximumLevel = e.maximumLevel, this._rectangle = c(e.rectangle, this._tilingScheme.rectangle), this._dimensions = e.dimensions;
    var n = this;
    this._reload = void 0, g(e.times) && (this._timeDynamicImagery = new T({
      clock: e.clock,
      times: e.times,
      requestImageFunction: function requestImageFunction(e, t, i, r, s) {
        return I(n, e, t, i, r, s);
      },
      reloadFunction: function reloadFunction() {
        g(n._reload) && n._reload();
      }
    })), this._readyPromise = w.resolve(!0);

    var o = this._tilingScheme.positionToTileXY(f.southwest(this._rectangle), this._minimumLevel),
        a = this._tilingScheme.positionToTileXY(f.northeast(this._rectangle), this._minimumLevel),
        l = (Math.abs(a.x - o.x) + 1) * (Math.abs(a.y - o.y) + 1);

    if (4 < l) throw new h("The imagery provider's rectangle and minimumLevel indicate that there are " + l + " tiles at the minimum level. Imagery providers with more than four tiles at the minimum level are not supported.");
    this._errorEvent = new _();
    var m = e.credit;
    this._credit = "string" == typeof m ? new u(m) : m, this._subdomains = e.subdomains, y(this._subdomains) ? this._subdomains = this._subdomains.slice() : g(this._subdomains) && 0 < this._subdomains.length ? this._subdomains = this._subdomains.split("") : this._subdomains = ["a", "b", "c"];
  }

  function I(e, t, i, r, s, n) {
    var o,
        a,
        l,
        m = e._tileMatrixLabels,
        u = g(m) ? m[r] : r.toString(),
        c = e._subdomains,
        h = e._dimensions,
        _ = g(n) ? n.data : void 0;

    return e._useKvp ? ((o = {}).tilematrix = u, o.layer = e._layer, o.style = e._style, o.tilerow = i, o.tilecol = t, o.tilematrixset = e._tileMatrixSetID, o.format = e._format, g(h) && (o = d(o, h)), g(_) && (o = d(o, _)), l = e._resource.getDerivedResource({
      queryParameters: o,
      request: s
    })) : (a = {
      TileMatrix: u,
      TileRow: i.toString(),
      TileCol: t.toString(),
      s: c[(t + i + r) % c.length]
    }, (l = e._resource.getDerivedResource({
      request: s
    })).setTemplateValues(a), g(h) && l.setTemplateValues(h), g(_) && l.setTemplateValues(_)), x.loadImage(e, l);
  }

  return e(i.prototype, {
    url: {
      get: function get() {
        return this._resource.url;
      }
    },
    proxy: {
      get: function get() {
        return this._resource.proxy;
      }
    },
    tileWidth: {
      get: function get() {
        return this._tileWidth;
      }
    },
    tileHeight: {
      get: function get() {
        return this._tileHeight;
      }
    },
    maximumLevel: {
      get: function get() {
        return this._maximumLevel;
      }
    },
    minimumLevel: {
      get: function get() {
        return this._minimumLevel;
      }
    },
    tilingScheme: {
      get: function get() {
        return this._tilingScheme;
      }
    },
    rectangle: {
      get: function get() {
        return this._rectangle;
      }
    },
    tileDiscardPolicy: {
      get: function get() {
        return this._tileDiscardPolicy;
      }
    },
    errorEvent: {
      get: function get() {
        return this._errorEvent;
      }
    },
    format: {
      get: function get() {
        return this._format;
      }
    },
    ready: {
      value: !0
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise;
      }
    },
    credit: {
      get: function get() {
        return this._credit;
      }
    },
    hasAlphaChannel: {
      get: function get() {
        return !0;
      }
    },
    clock: {
      get: function get() {
        return this._timeDynamicImagery.clock;
      },
      set: function set(e) {
        this._timeDynamicImagery.clock = e;
      }
    },
    times: {
      get: function get() {
        return this._timeDynamicImagery.times;
      },
      set: function set(e) {
        this._timeDynamicImagery.times = e;
      }
    },
    dimensions: {
      get: function get() {
        return this._dimensions;
      },
      set: function set(e) {
        this._dimensions !== e && (this._dimensions = e, g(this._reload) && this._reload());
      }
    }
  }), i.prototype.getTileCredits = function (e, t, i) {}, i.prototype.requestImage = function (e, t, i, r) {
    var s,
        n,
        o = this._timeDynamicImagery;
    return g(o) && (n = o.currentInterval, s = o.getFromCache(e, t, i, r)), g(s) || (s = I(this, e, t, i, r, n)), g(s) && g(o) && o.checkApproachingInterval(e, t, i, r), s;
  }, i.prototype.pickFeatures = function (e, t, i, r, s) {}, i;
});