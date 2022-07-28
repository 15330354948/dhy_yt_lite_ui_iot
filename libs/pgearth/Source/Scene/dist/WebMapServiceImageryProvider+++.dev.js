"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/freezeObject", "../Core/GeographicTilingScheme", "../Core/Resource", "../Core/WebMercatorProjection", "./GetFeatureInfoFormat", "./TimeDynamicImagery", "./UrlTemplateImageryProvider", "../Core/createGuid"], function (o, P, e, s, t, u, c, l, r, m, h, d) {
  "use strict";

  function f(e) {
    if (e = o(e, o.EMPTY_OBJECT), !P(e.url)) throw new s("options.url is required.");
    if (!P(e.layers)) throw new s("options.layers is required.");
    if (P(e.times) && !P(e.clock)) throw new s("options.times was specified, so options.clock is required.");
    var t = c.createIfNeeded(e.url),
        r = t.clone();
    t.setQueryParameters(f.DefaultParameters, !0), r.setQueryParameters(f.GetFeatureInfoDefaultParameters, !0), P(e.parameters) && t.setQueryParameters(y(e.parameters)), P(e.getFeatureInfoParameters) && r.setQueryParameters(y(e.getFeatureInfoParameters));
    var a = this;
    this._reload = void 0, P(e.times) && (this._timeDynamicImagery = new m({
      clock: e.clock,
      times: e.times,
      requestImageFunction: function requestImageFunction(e, t, r, i, n) {
        return g(a, e, t, r, i, n);
      },
      reloadFunction: function reloadFunction() {
        P(a._reload) && a._reload();
      }
    }));
    var i = {};
    i.layers = e.layers, i.bbox = "{westProjected},{southProjected},{eastProjected},{northProjected}", i.width = "{width}", i.height = "{height}", i.uuid = d(), 1.3 <= parseFloat(t.queryParameters.version) ? i.crs = o(e.crs, e.tilingScheme && e.tilingScheme.projection instanceof l ? "EPSG:3857" : "CRS:84") : i.srs = o(e.srs, e.tilingScheme && e.tilingScheme.projection instanceof l ? "EPSG:3857" : "EPSG:4326"), t.setQueryParameters(i, !0), r.setQueryParameters(i, !0);
    var n = {
      query_layers: e.layers,
      x: "{i}",
      y: "{j}",
      info_format: "{format}"
    };
    r.setQueryParameters(n, !0), this._resource = t, this._pickFeaturesResource = r, this._layers = e.layers, this._tileProvider = new h({
      url: t,
      pickFeaturesUrl: r,
      tilingScheme: o(e.tilingScheme, new u({
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
      getFeatureInfoFormats: o(e.getFeatureInfoFormats, f.DefaultGetFeatureInfoFormats),
      enablePickFeatures: e.enablePickFeatures
    });
  }

  function g(e, t, r, i, n, a) {
    var o = P(a) ? a.data : void 0,
        s = e._tileProvider;
    return P(o) && s._resource.setQueryParameters(o), s.requestImage(t, r, i, n);
  }

  function y(e) {
    var t = {};

    for (var r in e) {
      e.hasOwnProperty(r) && (t[r.toLowerCase()] = e[r]);
    }

    return t;
  }

  return e(f.prototype, {
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
  }), f.prototype.getTileCredits = function (e, t, r) {
    return this._tileProvider.getTileCredits(e, t, r);
  }, f.prototype.requestImage = function (e, t, r, i) {
    var n,
        a,
        o = this._timeDynamicImagery;
    return P(o) && (a = o.currentInterval, n = o.getFromCache(e, t, r, i)), P(n) || (n = g(this, e, t, r, i, a)), P(n) && P(o) && o.checkApproachingInterval(e, t, r, i), n;
  }, f.prototype.pickFeatures = function (e, t, r, i, n) {
    var a,
        o,
        s,
        u,
        c,
        l,
        m,
        h,
        d,
        f = this._timeDynamicImagery,
        g = P(f) ? f.currentInterval : void 0;
    return a = this, o = e, s = t, u = r, c = i, l = n, h = P(m = g) ? m.data : void 0, d = a._tileProvider, P(h) && d._pickFeaturesResource.setQueryParameters(h), d.pickFeatures(o, s, u, c, l);
  }, f.DefaultParameters = t({
    service: "WMS",
    version: "1.1.1",
    request: "GetMap",
    styles: "",
    format: "image/jpeg"
  }), f.GetFeatureInfoDefaultParameters = t({
    service: "WMS",
    version: "1.1.1",
    request: "GetFeatureInfo"
  }), f.DefaultGetFeatureInfoFormats = t([t(new r("json", "application/json")), t(new r("xml", "text/xml")), t(new r("text", "text/html"))]), f;
});