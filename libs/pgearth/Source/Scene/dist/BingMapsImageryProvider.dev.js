"use strict";

define(["../Core/BingMapsApi", "../Core/buildModuleUrl", "../Core/Check", "../Core/Credit", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/Math", "../Core/Rectangle", "../Core/Resource", "../Core/RuntimeError", "../Core/TileProviderError", "../Core/WebMercatorTilingScheme", "../ThirdParty/when", "./BingMapsStyle", "./DiscardEmptyTileImagePolicy", "./ImageryProvider"], function (l, e, r, g, s, y, t, _, u, f, v, h, p, b, w, P, C, S, m) {
  "use strict";

  function T(e) {
    if (e = s(e, {}), !y(e.url)) throw new _("options.url is required.");
    this._key = l.getKey(e.key), this._resource = h.createIfNeeded(e.url), this._resource.appendForwardSlash(), this._tileProtocol = e.tileProtocol, this._mapStyle = s(e.mapStyle, C.AERIAL), this._culture = s(e.culture, ""), this._tileDiscardPolicy = e.tileDiscardPolicy, y(this._tileDiscardPolicy) || (this._tileDiscardPolicy = new S()), this._proxy = e.proxy, this._credit = new g('<a href="http://www.bing.com"><img src="' + T.logoUrl + '" title="Bing Imagery"/></a>'), this.defaultGamma = 1, this._tilingScheme = new w({
      numberOfLevelZeroTilesX: 2,
      numberOfLevelZeroTilesY: 2,
      ellipsoid: e.ellipsoid
    }), this._tileWidth = void 0, this._tileHeight = void 0, this._maximumLevel = void 0, this._imageUrlTemplate = void 0, this._imageUrlSubdomains = void 0, this._errorEvent = new u(), this._ready = !1, this._readyPromise = P.defer();
    var r = this._tileProtocol;
    y(r) ? 0 < r.length && ":" === r[r.length - 1] && (r = r.substr(0, r.length - 1)) : r = "http:" === document.location.protocol ? "http" : "https";

    var c,
        t = this._resource.getDerivedResource({
      url: "REST/v1/Imagery/Metadata/" + this._mapStyle,
      queryParameters: {
        incl: "ImageryProviders",
        key: this._key,
        uriScheme: r
      }
    }),
        d = this;

    function i(e) {
      if (1 === e.resourceSets.length) {
        var r = e.resourceSets[0].resources[0];
        d._tileWidth = r.imageWidth, d._tileHeight = r.imageHeight, d._maximumLevel = r.zoomMax - 1, d._imageUrlSubdomains = r.imageUrlSubdomains, d._imageUrlTemplate = r.imageUrl;

        for (var t = d._attributionList = r.imageryProviders, i = 0, o = (t = t || (d._attributionList = [])).length; i < o; ++i) {
          var a = t[i];
          if (a.credit instanceof g) break;
          a.credit = new g(a.attribution);

          for (var n = a.coverageAreas, l = 0, s = a.coverageAreas.length; l < s; ++l) {
            var u = n[l],
                h = u.bbox;
            u.bbox = new v(f.toRadians(h[1]), f.toRadians(h[0]), f.toRadians(h[3]), f.toRadians(h[2]));
          }
        }

        d._ready = !0, d._readyPromise.resolve(!0), b.handleSuccess(c);
      } else m();
    }

    function m(e) {
      var r = "An error occurred while accessing " + t.url + ".";
      c = b.handleError(c, d, d._errorEvent, r, void 0, void 0, void 0, a), d._readyPromise.reject(new p(r));
    }

    var o = t.url;

    function a() {
      var e = t.fetchJsonp("jsonp");
      (T._metadataCache[o] = e).then(i).otherwise(m);
    }

    var n = T._metadataCache[o];
    y(n) ? n.then(i).otherwise(m) : a();
  }

  t(T.prototype, {
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
    key: {
      get: function get() {
        return this._key;
      }
    },
    mapStyle: {
      get: function get() {
        return this._mapStyle;
      }
    },
    culture: {
      get: function get() {
        return this._culture;
      }
    },
    tileWidth: {
      get: function get() {
        if (!this._ready) throw new _("tileWidth must not be called before the imagery provider is ready.");
        return this._tileWidth;
      }
    },
    tileHeight: {
      get: function get() {
        if (!this._ready) throw new _("tileHeight must not be called before the imagery provider is ready.");
        return this._tileHeight;
      }
    },
    maximumLevel: {
      get: function get() {
        if (!this._ready) throw new _("maximumLevel must not be called before the imagery provider is ready.");
        return this._maximumLevel;
      }
    },
    minimumLevel: {
      get: function get() {
        if (!this._ready) throw new _("minimumLevel must not be called before the imagery provider is ready.");
        return 0;
      }
    },
    tilingScheme: {
      get: function get() {
        if (!this._ready) throw new _("tilingScheme must not be called before the imagery provider is ready.");
        return this._tilingScheme;
      }
    },
    rectangle: {
      get: function get() {
        if (!this._ready) throw new _("rectangle must not be called before the imagery provider is ready.");
        return this._tilingScheme.rectangle;
      }
    },
    tileDiscardPolicy: {
      get: function get() {
        if (!this._ready) throw new _("tileDiscardPolicy must not be called before the imagery provider is ready.");
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
        return !1;
      }
    }
  });
  var o = new v();
  T.prototype.getTileCredits = function (e, r, t) {
    if (!this._ready) throw new _("getTileCredits must not be called before the imagery provider is ready.");

    var i = this._tilingScheme.tileXYToRectangle(e, r, t, o);

    return function (e, r, t) {
      ++r;

      for (var i = [], o = 0, a = e.length; o < a; ++o) {
        for (var n = e[o], l = n.coverageAreas, s = !1, u = 0, h = n.coverageAreas.length; !s && u < h; ++u) {
          var c,
              d = l[u];
          r >= d.zoomMin && r <= d.zoomMax && (c = v.intersection(t, d.bbox, U), y(c) && (s = !0));
        }

        s && i.push(n.credit);
      }

      return i;
    }(this._attributionList, t, i);
  }, T.prototype.requestImage = function (e, r, t, i) {
    if (!this._ready) throw new _("requestImage must not be called before the imagery provider is ready.");
    var o,
        a,
        n,
        l,
        s,
        u,
        h,
        c,
        d = m.loadImage(this, (a = e, n = r, l = t, s = i, u = (o = this)._imageUrlTemplate, h = o._imageUrlSubdomains, c = (a + n + l) % h.length, o._resource.getDerivedResource({
      url: u,
      request: s,
      templateValues: {
        quadkey: T.tileXYToQuadKey(a, n, l),
        subdomain: h[c],
        culture: o._culture
      },
      queryParameters: {
        n: "z"
      }
    })));
    if (y(d)) return d.otherwise(function (e) {
      return y(e.blob) && 0 === e.blob.size ? S.EMPTY_IMAGE : P.reject(e);
    });
  }, T.prototype.pickFeatures = function (e, r, t, i, o) {}, T.tileXYToQuadKey = function (e, r, t) {
    for (var i = "", o = t; 0 <= o; --o) {
      var a = 1 << o,
          n = 0;
      0 != (e & a) && (n |= 1), 0 != (r & a) && (n |= 2), i += n;
    }

    return i;
  }, T.quadKeyToTileXY = function (e) {
    for (var r = 0, t = 0, i = e.length - 1, o = i; 0 <= o; --o) {
      var a = 1 << o,
          n = +e[i - o];
      0 != (1 & n) && (r |= a), 0 != (2 & n) && (t |= a);
    }

    return {
      x: r,
      y: t,
      level: i
    };
  }, T._logoUrl = void 0, t(T, {
    logoUrl: {
      get: function get() {
        return y(T._logoUrl) || (T._logoUrl = e("Assets/Images/bing_maps_credit.png")), T._logoUrl;
      },
      set: function set(e) {
        r.defined("value", e), T._logoUrl = e;
      }
    }
  });
  var U = new v();
  return T._metadataCache = {}, T;
});