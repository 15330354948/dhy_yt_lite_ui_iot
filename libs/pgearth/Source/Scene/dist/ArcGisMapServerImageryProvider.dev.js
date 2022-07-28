"use strict";

define(["../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartographic", "../Core/Credit", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/GeographicProjection", "../Core/GeographicTilingScheme", "../Core/Math", "../Core/Rectangle", "../Core/Resource", "../Core/RuntimeError", "../Core/TileProviderError", "../Core/WebMercatorProjection", "../Core/WebMercatorTilingScheme", "../ThirdParty/when", "./DiscardMissingTileImagePolicy", "./ImageryLayerFeatureInfo", "./ImageryProvider"], function (d, m, g, f, n, y, e, p, o, _, v, w, x, s, a, P, b, R, C, E, S, l) {
  "use strict";

  function t(l) {
    if (l = n(l, {}), !y(l.url)) throw new p("options.url is required.");
    var e = s.createIfNeeded(l.url);
    e.appendForwardSlash(), y(l.token) && e.setQueryParameters({
      token: l.token
    }), this._resource = e, this._tileDiscardPolicy = l.tileDiscardPolicy, this._tileWidth = n(l.tileWidth, 256), this._tileHeight = n(l.tileHeight, 256), this._maximumLevel = l.maximumLevel, this._tilingScheme = n(l.tilingScheme, new v({
      ellipsoid: l.ellipsoid
    })), this._useTiles = n(l.usePreCachedTilesIfAvailable, !0), this._rectangle = n(l.rectangle, this._tilingScheme.rectangle), this._layers = l.layers;
    var t = l.credit;
    "string" == typeof t && (t = new f(t)), this._credit = t, this.enablePickFeatures = n(l.enablePickFeatures, !0), this._errorEvent = new o(), this._ready = !1, this._readyPromise = C.defer();
    var c,
        u = this;

    function r(e) {
      var t = e.tileInfo;

      if (y(t)) {
        if (u._tileWidth = t.rows, u._tileHeight = t.cols, 102100 === t.spatialReference.wkid || 102113 === t.spatialReference.wkid) u._tilingScheme = new R({
          ellipsoid: l.ellipsoid
        });else {
          if (4326 !== e.tileInfo.spatialReference.wkid) {
            var r = "Tile spatial reference WKID " + e.tileInfo.spatialReference.wkid + " is not supported.";
            return void (c = P.handleError(c, u, u._errorEvent, r, void 0, void 0, void 0, h));
          }

          u._tilingScheme = new v({
            ellipsoid: l.ellipsoid
          });
        }

        if (u._maximumLevel = e.tileInfo.lods.length - 1, y(e.fullExtent)) {
          if (y(e.fullExtent.spatialReference) && y(e.fullExtent.spatialReference.wkid)) if (102100 === e.fullExtent.spatialReference.wkid || 102113 === e.fullExtent.spatialReference.wkid) {
            var i = new b(),
                n = e.fullExtent,
                o = i.unproject(new m(Math.max(n.xmin, -u._tilingScheme.ellipsoid.maximumRadius * Math.PI), Math.max(n.ymin, -u._tilingScheme.ellipsoid.maximumRadius * Math.PI), 0)),
                s = i.unproject(new m(Math.min(n.xmax, u._tilingScheme.ellipsoid.maximumRadius * Math.PI), Math.min(n.ymax, u._tilingScheme.ellipsoid.maximumRadius * Math.PI), 0));
            u._rectangle = new x(o.longitude, o.latitude, s.longitude, s.latitude);
          } else {
            if (4326 !== e.fullExtent.spatialReference.wkid) {
              var a = "fullExtent.spatialReference WKID " + e.fullExtent.spatialReference.wkid + " is not supported.";
              return void (c = P.handleError(c, u, u._errorEvent, a, void 0, void 0, void 0, h));
            }

            u._rectangle = x.fromDegrees(e.fullExtent.xmin, e.fullExtent.ymin, e.fullExtent.xmax, e.fullExtent.ymax);
          }
        } else u._rectangle = u._tilingScheme.rectangle;

        y(u._tileDiscardPolicy) || (u._tileDiscardPolicy = new E({
          missingImageUrl: T(u, 0, 0, u._maximumLevel).url,
          pixelsToCheck: [new d(0, 0), new d(200, 20), new d(20, 200), new d(80, 110), new d(160, 130)],
          disableCheckIfAllPixelsAreTransparent: !0
        })), u._useTiles = !0;
      } else u._useTiles = !1;

      y(e.copyrightText) && 0 < e.copyrightText.length && (u._credit = new f(e.copyrightText)), u._ready = !0, u._readyPromise.resolve(!0), P.handleSuccess(c);
    }

    function i(e) {
      var t = "An error occurred while accessing " + u._resource.url + ".";
      c = P.handleError(c, u, u._errorEvent, t, void 0, void 0, void 0, h), u._readyPromise.reject(new a(t));
    }

    function h() {
      var e = u._resource.getDerivedResource({
        queryParameters: {
          f: "json"
        }
      }).fetchJsonp();

      C(e, r, i);
    }

    this._useTiles ? h() : (this._ready = !0, this._readyPromise.resolve(!0));
  }

  function T(e, t, r, i, n) {
    var o,
        s,
        a = e._useTiles ? e._resource.getDerivedResource({
      url: "tile/" + i + "/" + r + "/" + t,
      request: n
    }) : (s = {
      bbox: (o = e._tilingScheme.tileXYToNativeRectangle(t, r, i)).west + "," + o.south + "," + o.east + "," + o.north,
      size: e._tileWidth + "," + e._tileHeight,
      format: "png",
      transparent: !0,
      f: "image"
    }, e._tilingScheme.projection instanceof _ ? (s.bboxSR = 4326, s.imageSR = 4326) : (s.bboxSR = 3857, s.imageSR = 3857), e.layers && (s.layers = "show:" + e.layers), e._resource.getDerivedResource({
      url: "export",
      request: n,
      queryParameters: s
    }));
    return a;
  }

  return e(t.prototype, {
    url: {
      get: function get() {
        return this._resource._url;
      }
    },
    token: {
      get: function get() {
        return this._resource.queryParameters.token;
      }
    },
    proxy: {
      get: function get() {
        return this._resource.proxy;
      }
    },
    tileWidth: {
      get: function get() {
        if (!this._ready) throw new p("tileWidth must not be called before the imagery provider is ready.");
        return this._tileWidth;
      }
    },
    tileHeight: {
      get: function get() {
        if (!this._ready) throw new p("tileHeight must not be called before the imagery provider is ready.");
        return this._tileHeight;
      }
    },
    maximumLevel: {
      get: function get() {
        if (!this._ready) throw new p("maximumLevel must not be called before the imagery provider is ready.");
        return this._maximumLevel;
      }
    },
    minimumLevel: {
      get: function get() {
        if (!this._ready) throw new p("minimumLevel must not be called before the imagery provider is ready.");
        return 0;
      }
    },
    tilingScheme: {
      get: function get() {
        if (!this._ready) throw new p("tilingScheme must not be called before the imagery provider is ready.");
        return this._tilingScheme;
      }
    },
    rectangle: {
      get: function get() {
        if (!this._ready) throw new p("rectangle must not be called before the imagery provider is ready.");
        return this._rectangle;
      }
    },
    tileDiscardPolicy: {
      get: function get() {
        if (!this._ready) throw new p("tileDiscardPolicy must not be called before the imagery provider is ready.");
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
    usingPrecachedTiles: {
      get: function get() {
        return this._useTiles;
      }
    },
    hasAlphaChannel: {
      get: function get() {
        return !0;
      }
    },
    layers: {
      get: function get() {
        return this._layers;
      }
    }
  }), t.prototype.getTileCredits = function (e, t, r) {}, t.prototype.requestImage = function (e, t, r, i) {
    if (!this._ready) throw new p("requestImage must not be called before the imagery provider is ready.");
    return l.loadImage(this, T(this, e, t, r, i));
  }, t.prototype.pickFeatures = function (e, t, r, i, n) {
    if (!this._ready) throw new p("pickFeatures must not be called before the imagery provider is ready.");

    if (this.enablePickFeatures) {
      var o,
          s,
          a,
          l,
          c = this._tilingScheme.tileXYToNativeRectangle(e, t, r);

      l = this._tilingScheme.projection instanceof _ ? (s = w.toDegrees(i), a = w.toDegrees(n), "4326") : (s = (o = this._tilingScheme.projection.project(new g(i, n, 0))).x, a = o.y, "3857");
      var u = "visible";
      y(this._layers) && (u += ":" + this._layers);
      var h = {
        f: "json",
        tolerance: 2,
        geometryType: "esriGeometryPoint",
        geometry: s + "," + a,
        mapExtent: c.west + "," + c.south + "," + c.east + "," + c.north,
        imageDisplay: this._tileWidth + "," + this._tileHeight + ",96",
        sr: l,
        layers: u
      };
      return this._resource.getDerivedResource({
        url: "identify",
        queryParameters: h
      }).fetchJson().then(function (e) {
        var t = [],
            r = e.results;
        if (!y(r)) return t;

        for (var i = 0; i < r.length; ++i) {
          var n,
              o,
              s = r[i],
              a = new S();
          a.data = s, a.name = s.value, a.properties = s.attributes, a.configureDescriptionFromProperties(s.attributes), "esriGeometryPoint" === s.geometryType && s.geometry && (4326 === (n = s.geometry.spatialReference && s.geometry.spatialReference.wkid ? s.geometry.spatialReference.wkid : 4326) || 4283 === n ? a.position = g.fromDegrees(s.geometry.x, s.geometry.y, s.geometry.z) : 102100 !== n && 900913 !== n && 3857 !== n || (o = new b(), a.position = o.unproject(new m(s.geometry.x, s.geometry.y, s.geometry.z)))), t.push(a);
        }

        return t;
      });
    }
  }, t;
});