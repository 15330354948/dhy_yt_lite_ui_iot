"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/freezeObject", "../Core/GeographicTilingScheme", "../Core/Resource", "../Core/WebMercatorProjection", "./GetFeatureInfoFormat", "./TimeDynamicImagery", "./UrlTemplateImageryProvider", "../Core/createGuid"], function (n, g, e, a, t, s, u, c, r, l, m, d) {
  "use strict";

  function h(e) {
    if (e = n(e, n.EMPTY_OBJECT), !g(e.url)) throw new a("options.url is required.");
    if (g(e.times) && !g(e.clock)) throw new a("options.times was specified, so options.clock is required.");
    var t = u.createIfNeeded(e.url),
        r = t.clone();
    t.setQueryParameters(h.DefaultParameters, !0), r.setQueryParameters(h.GetFeatureInfoDefaultParameters, !0), g(e.parameters) && t.setQueryParameters(P(e.parameters)), g(e.getFeatureInfoParameters) && r.setQueryParameters(P(e.getFeatureInfoParameters));
    var o = this;
    this._reload = void 0, g(e.times) && (this._timeDynamicImagery = new l({
      clock: e.clock,
      times: e.times,
      requestImageFunction: function requestImageFunction(e, t, r, i, n) {
        return f(o, e, t, r, i, n);
      },
      reloadFunction: function reloadFunction() {
        g(o._reload) && o._reload();
      }
    }));
    var i = {
      bbox: "{westProjected},{southProjected},{eastProjected},{northProjected}"
    };
    i.uuid = d(), 1.3 <= parseFloat(t.queryParameters.version) ? i.crs = n(e.crs, e.tilingScheme && e.tilingScheme.projection instanceof c ? "EPSG:3857" : "CRS:84") : i.srs = n(e.srs, e.tilingScheme && e.tilingScheme.projection instanceof c ? "EPSG:3857" : "EPSG:4326"), t.setQueryParameters(i, !0), r.setQueryParameters(i, !0);
    r.setQueryParameters({
      x: "{i}",
      y: "{j}"
    }, !0), this._resource = t, this._pickFeaturesResource = r, this._layers = e.layers, this._tileProvider = new m({
      url: t,
      pickFeaturesUrl: r,
      tilingScheme: n(e.tilingScheme, new s({
        ellipsoid: e.ellipsoid
      })),
      rectangle: e.rectangle,
      tileWidth: e.tileWidth,
      tileHeight: e.tileHeight,
      minimumLevel: e.minimumLevel,
      maximumLevel: e.maximumLevel,
      subdomains: e.subdomains,
      tileDiscardPolicy: e.tileDiscardPolicy,
      credit: e.credit,
      getFeatureInfoFormats: n(e.getFeatureInfoFormats, h.DefaultGetFeatureInfoFormats),
      enablePickFeatures: e.enablePickFeatures
    });
  }

  function f(e, t, r, i, n, o) {
    var a = g(o) ? o.data : void 0,
        s = e._tileProvider;
    return g(a) && s._resource.setQueryParameters(a), s.requestImage(t, r, i, n);
  }

  function P(e) {
    var t = {};

    for (var r in e) {
      e.hasOwnProperty(r) && (t[r.toLowerCase()] = e[r]);
    }

    return t;
  }

  return e(h.prototype, {
    url: {
      get: function get() {
        return this._resource._url;
      }
    },
    proxy: {
      get: function get() {
        return this._resource.proxy;
      }
    },
    layers: {
      get: function get() {
        return this._layers;
      }
    },
    tileWidth: {
      get: function get() {
        return this._tileProvider.tileWidth;
      }
    },
    tileHeight: {
      get: function get() {
        return this._tileProvider.tileHeight;
      }
    },
    maximumLevel: {
      get: function get() {
        return this._tileProvider.maximumLevel;
      }
    },
    minimumLevel: {
      get: function get() {
        return this._tileProvider.minimumLevel;
      }
    },
    tilingScheme: {
      get: function get() {
        return this._tileProvider.tilingScheme;
      }
    },
    rectangle: {
      get: function get() {
        return this._tileProvider.rectangle;
      }
    },
    tileDiscardPolicy: {
      get: function get() {
        return this._tileProvider.tileDiscardPolicy;
      }
    },
    errorEvent: {
      get: function get() {
        return this._tileProvider.errorEvent;
      }
    },
    ready: {
      get: function get() {
        return this._tileProvider.ready;
      }
    },
    readyPromise: {
      get: function get() {
        return this._tileProvider.readyPromise;
      }
    },
    credit: {
      get: function get() {
        return this._tileProvider.credit;
      }
    },
    hasAlphaChannel: {
      get: function get() {
        return this._tileProvider.hasAlphaChannel;
      }
    },
    enablePickFeatures: {
      get: function get() {
        return this._tileProvider.enablePickFeatures;
      },
      set: function set(e) {
        this._tileProvider.enablePickFeatures = e;
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
    }
  }), h.prototype.getTileCredits = function (e, t, r) {
    return this._tileProvider.getTileCredits(e, t, r);
  }, h.prototype.requestImage = function (e, t, r, i) {
    var n,
        o,
        a = this._timeDynamicImagery;
    return g(a) && (o = a.currentInterval, n = a.getFromCache(e, t, r, i)), g(n) || (n = f(this, e, t, r, i, o)), g(n) && g(a) && a.checkApproachingInterval(e, t, r, i), n;
  }, h.prototype.pickFeatures = function (e, t, r, i, n) {
    var o,
        a,
        s,
        u,
        c,
        l,
        m,
        d,
        h,
        f = this._timeDynamicImagery,
        P = g(f) ? f.currentInterval : void 0;
    return o = this, a = e, s = t, u = r, c = i, l = n, d = g(m = P) ? m.data : void 0, h = o._tileProvider, g(d) && h._pickFeaturesResource.setQueryParameters(d), h.pickFeatures(a, s, u, c, l);
  }, h.DefaultParameters = t({
    request: "GetMap"
  }), h.GetFeatureInfoDefaultParameters = t({
    request: "GetFeatureInfo"
  }), h.DefaultGetFeatureInfoFormats = t([t(new r("json", "application/json")), t(new r("xml", "text/xml")), t(new r("text", "text/html"))]), h;
});