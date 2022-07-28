"use strict";

define(["../Core/Credit", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/GeographicTilingScheme", "../Core/Rectangle", "../Core/Resource", "../Core/RuntimeError", "../Core/TileProviderError", "../ThirdParty/when"], function (u, l, c, e, g, m, f, y, _, v, p, w) {
  "use strict";

  function r(e) {
    if (e = l(e, {}), !c(e.url)) throw new g("options.url is required.");

    var t = _.createIfNeeded(e.url),
        r = l(e.rectangle, y.MAX_VALUE),
        i = new f({
      rectangle: r,
      numberOfLevelZeroTilesX: 1,
      numberOfLevelZeroTilesY: 1,
      ellipsoid: e.ellipsoid
    });

    this._tilingScheme = i, this._resource = t, this._image = void 0, this._texture = void 0, this._tileWidth = 0, this._tileHeight = 0, this._errorEvent = new m(), this._ready = !1, this._readyPromise = w.defer();
    var n = e.credit;
    "string" == typeof n && (n = new u(n)), this._credit = n;
    var o,
        h = this;

    function s(e) {
      h._image = e, h._tileWidth = e.width, h._tileHeight = e.height, h._ready = !0, h._readyPromise.resolve(!0), p.handleSuccess(h._errorEvent);
    }

    function a(e) {
      var r = "Failed to load image " + t.url + ".";
      o = p.handleError(o, h, h._errorEvent, r, 0, 0, 0, d, e), h._readyPromise.reject(new v(r));
    }

    function d() {
      t.fetchImage().then(s).otherwise(a);
    }

    d();
  }

  return e(r.prototype, {
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
        if (!this._ready) throw new g("tileWidth must not be called before the imagery provider is ready.");
        return this._tileWidth;
      }
    },
    tileHeight: {
      get: function get() {
        if (!this._ready) throw new g("tileHeight must not be called before the imagery provider is ready.");
        return this._tileHeight;
      }
    },
    maximumLevel: {
      get: function get() {
        if (!this._ready) throw new g("maximumLevel must not be called before the imagery provider is ready.");
        return 0;
      }
    },
    minimumLevel: {
      get: function get() {
        if (!this._ready) throw new g("minimumLevel must not be called before the imagery provider is ready.");
        return 0;
      }
    },
    tilingScheme: {
      get: function get() {
        if (!this._ready) throw new g("tilingScheme must not be called before the imagery provider is ready.");
        return this._tilingScheme;
      }
    },
    rectangle: {
      get: function get() {
        return this._tilingScheme.rectangle;
      }
    },
    tileDiscardPolicy: {
      get: function get() {
        if (!this._ready) throw new g("tileDiscardPolicy must not be called before the imagery provider is ready.");
      }
    },
    errorEvent: {
      get: function get() {
        return this._errorEvent;
      }
    },
    ready: {
      get: function get() {
        return this._ready;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
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
    }
  }), r.prototype.getTileCredits = function (e, r, t) {}, r.prototype.requestImage = function (e, r, t, i) {
    if (!this._ready) throw new g("requestImage must not be called before the imagery provider is ready.");
    return this._image;
  }, r.prototype.pickFeatures = function (e, r, t, i, n) {}, r;
});