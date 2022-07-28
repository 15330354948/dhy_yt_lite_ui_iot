"use strict";

define(["../Core/buildModuleUrl", "../Core/Check", "../Core/Credit", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/GeographicTilingScheme", "../Core/Rectangle", "../Core/Resource", "../Core/RuntimeError", "../Core/TileProviderError", "../Core/WebMercatorTilingScheme", "../ThirdParty/when", "./ImageryProvider"], function (e, r, d, u, c, t, g, m, f, v, y, _, p, w, b, n) {
  "use strict";

  function C(n) {
    if (n = u(n, {}), !c(n.url)) throw new g("options.url is required.");
    if (!c(n.channel)) throw new g("options.channel is required.");
    var e = n.url,
        r = u(n.path, "/default_map"),
        t = y.createIfNeeded(e).getDerivedResource({
      url: "/" === r[0] ? r.substring(1) : r
    });
    t.appendForwardSlash(), this._resource = t, this._url = e, this._path = r, this._tileDiscardPolicy = n.tileDiscardPolicy, this._channel = n.channel, this._requestType = "ImageryMaps", this._credit = new d('<a href="http://www.google.com/enterprise/mapsearth/products/earthenterprise.html"><img src="' + C.logoUrl + '" title="Google Imagery"/></a>'), this.defaultGamma = 1.9, this._tilingScheme = void 0, this._version = void 0, this._tileWidth = 256, this._tileHeight = 256, this._maximumLevel = n.maximumLevel, this._errorEvent = new m(), this._ready = !1, this._readyPromise = b.defer();
    var s,
        i = t.getDerivedResource({
      url: "query",
      queryParameters: {
        request: "Json",
        vars: "geeServerDefs",
        is2d: "t"
      }
    }),
        a = this;

    function o(r) {
      var t, e;

      try {
        t = JSON.parse(r);
      } catch (e) {
        t = JSON.parse(r.replace(/([\[\{,])[\n\r ]*([A-Za-z0-9]+)[\n\r ]*:/g, '$1"$2":'));
      }

      for (var i, o = 0; o < t.layers.length; o++) {
        if (t.layers[o].id === a._channel) {
          e = t.layers[o];
          break;
        }
      }

      if (!c(e)) throw i = "Could not find layer with channel (id) of " + a._channel + ".", s = p.handleError(s, a, a._errorEvent, i, void 0, void 0, void 0, h), new _(i);
      if (!c(e.version)) throw i = "Could not find a version in channel (id) " + a._channel + ".", s = p.handleError(s, a, a._errorEvent, i, void 0, void 0, void 0, h), new _(i);
      if (a._version = e.version, c(t.projection) && "flat" === t.projection) a._tilingScheme = new f({
        numberOfLevelZeroTilesX: 2,
        numberOfLevelZeroTilesY: 2,
        rectangle: new v(-Math.PI, -Math.PI, Math.PI, Math.PI),
        ellipsoid: n.ellipsoid
      });else {
        if (c(t.projection) && "mercator" !== t.projection) throw i = "Unsupported projection " + t.projection + ".", s = p.handleError(s, a, a._errorEvent, i, void 0, void 0, void 0, h), new _(i);
        a._tilingScheme = new w({
          numberOfLevelZeroTilesX: 2,
          numberOfLevelZeroTilesY: 2,
          ellipsoid: n.ellipsoid
        });
      }
      a._ready = !0, a._readyPromise.resolve(!0), p.handleSuccess(s);
    }

    function l(e) {
      var r = "An error occurred while accessing " + i.url + ".";
      s = p.handleError(s, a, a._errorEvent, r, void 0, void 0, void 0, h), a._readyPromise.reject(new _(r));
    }

    function h() {
      var e = i.fetchText();
      b(e, o, l);
    }

    h();
  }

  return t(C.prototype, {
    url: {
      get: function get() {
        return this._url;
      }
    },
    path: {
      get: function get() {
        return this._path;
      }
    },
    proxy: {
      get: function get() {
        return this._resource.proxy;
      }
    },
    channel: {
      get: function get() {
        return this._channel;
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
        return this._maximumLevel;
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
    version: {
      get: function get() {
        if (!this._ready) throw new g("version must not be called before the imagery provider is ready.");
        return this._version;
      }
    },
    requestType: {
      get: function get() {
        if (!this._ready) throw new g("requestType must not be called before the imagery provider is ready.");
        return this._requestType;
      }
    },
    rectangle: {
      get: function get() {
        if (!this._ready) throw new g("rectangle must not be called before the imagery provider is ready.");
        return this._tilingScheme.rectangle;
      }
    },
    tileDiscardPolicy: {
      get: function get() {
        if (!this._ready) throw new g("tileDiscardPolicy must not be called before the imagery provider is ready.");
        return this._tileDiscardPolicy;
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
  }), C.prototype.getTileCredits = function (e, r, t) {}, C.prototype.requestImage = function (e, r, t, i) {
    if (!this._ready) throw new g("requestImage must not be called before the imagery provider is ready.");

    var o = this._resource.getDerivedResource({
      url: "query",
      request: i,
      queryParameters: {
        request: this._requestType,
        channel: this._channel,
        version: this._version,
        x: e,
        y: r,
        z: t + 1
      }
    });

    return n.loadImage(this, o);
  }, C.prototype.pickFeatures = function (e, r, t, i, o) {}, C._logoUrl = void 0, t(C, {
    logoUrl: {
      get: function get() {
        return c(C._logoUrl) || (C._logoUrl = e("Assets/Images/google_earth_credit.png")), C._logoUrl;
      },
      set: function set(e) {
        r.defined("value", e), C._logoUrl = e;
      }
    }
  }), C;
});