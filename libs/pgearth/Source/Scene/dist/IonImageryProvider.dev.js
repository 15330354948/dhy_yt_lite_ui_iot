"use strict";

define(["../Core/Check", "../Core/Credit", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/IonResource", "../Core/RuntimeError", "../ThirdParty/when", "./ArcGisMapServerImageryProvider", "./BingMapsImageryProvider", "./createTileMapServiceImageryProvider", "./GoogleEarthEnterpriseMapsProvider", "./MapboxImageryProvider", "./SingleTileImageryProvider", "./UrlTemplateImageryProvider", "./WebMapServiceImageryProvider", "./WebMapTileServiceImageryProvider"], function (t, e, d, s, r, n, h, u, l, m, i, o, y, a, c, g, v, f, p) {
  "use strict";

  function _(r) {
    return function (e) {
      return new r(e);
    };
  }

  var P = {
    ARCGIS_MAPSERVER: _(i),
    BING: _(o),
    GOOGLE_EARTH: _(a),
    MAPBOX: _(c),
    SINGLE_TILE: _(g),
    TMS: y,
    URL_TEMPLATE: _(v),
    WMS: _(f),
    WMTS: _(p)
  };

  function w(e) {
    var o = (e = d(e, d.EMPTY_OBJECT)).assetId;
    t.typeOf.number("options.assetId", o), this.defaultAlpha = void 0, this.defaultBrightness = void 0, this.defaultContrast = void 0, this.defaultHue = void 0, this.defaultSaturation = void 0, this.defaultGamma = void 0, this.defaultMinificationFilter = void 0, this.defaultMagnificationFilter = void 0, this._ready = !1, this._tileCredits = void 0, this._errorEvent = new h();

    var n = this,
        a = u._createEndpointResource(o, e),
        r = e.assetId.toString() + e.accessToken + e.server,
        i = w._endpointCache[r];

    s(i) || (i = a.fetchJson(), w._endpointCache[r] = i), this._readyPromise = i.then(function (e) {
      if ("IMAGERY" !== e.type) return m.reject(new l("PGEarth ion asset " + o + " is not an imagery asset."));
      var r,
          i = e.externalType;

      if (s(i)) {
        var t = P[i];
        if (!s(t)) return m.reject(new l("Unrecognized PGEarth ion imagery type: " + i));
        r = t(e.options);
      } else r = y({
        url: new u(e, a)
      });

      return n._tileCredits = u.getCreditsFromEndpoint(e, a), r.errorEvent.addEventListener(function (e) {
        (e.provider = n)._errorEvent.raiseEvent(e);
      }), (n._imageryProvider = r).readyPromise.then(function () {
        return n._ready = !0;
      });
    });
  }

  return r(w.prototype, {
    ready: {
      get: function get() {
        return this._ready;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise;
      }
    },
    rectangle: {
      get: function get() {
        if (!this._ready) throw new n("tileHeight must not be called before the imagery provider is ready.");
        return this._imageryProvider.rectangle;
      }
    },
    tileWidth: {
      get: function get() {
        if (!this._ready) throw new n("tileWidth must not be called before the imagery provider is ready.");
        return this._imageryProvider.tileWidth;
      }
    },
    tileHeight: {
      get: function get() {
        if (!this._ready) throw new n("tileHeight must not be called before the imagery provider is ready.");
        return this._imageryProvider.tileHeight;
      }
    },
    maximumLevel: {
      get: function get() {
        if (!this._ready) throw new n("maximumLevel must not be called before the imagery provider is ready.");
        return this._imageryProvider.maximumLevel;
      }
    },
    minimumLevel: {
      get: function get() {
        if (!this._ready) throw new n("minimumLevel must not be called before the imagery provider is ready.");
        return this._imageryProvider.minimumLevel;
      }
    },
    tilingScheme: {
      get: function get() {
        if (!this._ready) throw new n("tilingScheme must not be called before the imagery provider is ready.");
        return this._imageryProvider.tilingScheme;
      }
    },
    tileDiscardPolicy: {
      get: function get() {
        if (!this._ready) throw new n("tileDiscardPolicy must not be called before the imagery provider is ready.");
        return this._imageryProvider.tileDiscardPolicy;
      }
    },
    errorEvent: {
      get: function get() {
        return this._errorEvent;
      }
    },
    credit: {
      get: function get() {
        if (!this._ready) throw new n("credit must not be called before the imagery provider is ready.");
        return this._imageryProvider.credit;
      }
    },
    hasAlphaChannel: {
      get: function get() {
        if (!this._ready) throw new n("hasAlphaChannel must not be called before the imagery provider is ready.");
        return this._imageryProvider.hasAlphaChannel;
      }
    }
  }), w.prototype.getTileCredits = function (e, r, i) {
    if (!this._ready) throw new n("getTileCredits must not be called before the imagery provider is ready.");

    var t = this._imageryProvider.getTileCredits(e, r, i);

    return s(t) ? this._tileCredits.concat(t) : this._tileCredits;
  }, w.prototype.requestImage = function (e, r, i, t) {
    if (!this._ready) throw new n("requestImage must not be called before the imagery provider is ready.");
    return this._imageryProvider.requestImage(e, r, i, t);
  }, w.prototype.pickFeatures = function (e, r, i, t, o) {
    if (!this._ready) throw new n("pickFeatures must not be called before the imagery provider is ready.");
    return this._imageryProvider.pickFeatures(e, r, i, t, o);
  }, w._endpointCache = {}, w;
});