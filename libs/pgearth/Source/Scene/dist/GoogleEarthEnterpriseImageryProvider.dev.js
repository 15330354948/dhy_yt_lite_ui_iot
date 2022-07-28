"use strict";

define(["../Core/Credit", "../Core/decodeGoogleEarthEnterpriseData", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/GeographicTilingScheme", "../Core/GoogleEarthEnterpriseMetadata", "../Core/loadImageFromTypedArray", "../Core/Math", "../Core/Rectangle", "../Core/Request", "../Core/Resource", "../Core/RuntimeError", "../Core/TileProviderError", "../ThirdParty/protobuf-minimal", "../ThirdParty/when"], function (n, v, s, _, e, w, d, h, b, C, l, u, P, c, T, m, E, y) {
  "use strict";

  function g() {
    this._image = new Image();
  }

  function r(e) {
    if (e = s(e, s.EMPTY_OBJECT), !_(e.url) && !_(e.metadata)) throw new w("options.url or options.metadata is required.");
    var r, t;
    t = _(e.metadata) ? e.metadata : (r = c.createIfNeeded(e.url), new b(r)), this._metadata = t, this._tileDiscardPolicy = e.tileDiscardPolicy, this._tilingScheme = new h({
      numberOfLevelZeroTilesX: 2,
      numberOfLevelZeroTilesY: 2,
      rectangle: new u(-l.PI, -l.PI, l.PI, l.PI),
      ellipsoid: e.ellipsoid
    });
    var i = e.credit;
    "string" == typeof i && (i = new n(i)), this._credit = i, this._tileWidth = 256, this._tileHeight = 256, this._maximumLevel = 23, _(this._tileDiscardPolicy) || (this._tileDiscardPolicy = new g()), this._errorEvent = new d(), this._ready = !1;
    var a,
        o = this;
    this._readyPromise = t.readyPromise.then(function (e) {
      if (t.imageryPresent) return m.handleSuccess(a), o._ready = e;
      var r = new T("The server " + t.url + " doesn't have imagery");
      return a = m.handleError(a, o, o._errorEvent, r.message, void 0, void 0, void 0, r), y.reject(r);
    }).otherwise(function (e) {
      return a = m.handleError(a, o, o._errorEvent, e.message, void 0, void 0, void 0, e), y.reject(e);
    });
  }

  return g.prototype.isReady = function () {
    return !0;
  }, g.prototype.shouldDiscardImage = function (e) {
    return e === this._image;
  }, e(r.prototype, {
    url: {
      get: function get() {
        return this._metadata.url;
      }
    },
    proxy: {
      get: function get() {
        return this._metadata.proxy;
      }
    },
    tileWidth: {
      get: function get() {
        if (!this._ready) throw new w("tileWidth must not be called before the imagery provider is ready.");
        return this._tileWidth;
      }
    },
    tileHeight: {
      get: function get() {
        if (!this._ready) throw new w("tileHeight must not be called before the imagery provider is ready.");
        return this._tileHeight;
      }
    },
    maximumLevel: {
      get: function get() {
        if (!this._ready) throw new w("maximumLevel must not be called before the imagery provider is ready.");
        return this._maximumLevel;
      }
    },
    minimumLevel: {
      get: function get() {
        if (!this._ready) throw new w("minimumLevel must not be called before the imagery provider is ready.");
        return 0;
      }
    },
    tilingScheme: {
      get: function get() {
        if (!this._ready) throw new w("tilingScheme must not be called before the imagery provider is ready.");
        return this._tilingScheme;
      }
    },
    rectangle: {
      get: function get() {
        if (!this._ready) throw new w("rectangle must not be called before the imagery provider is ready.");
        return this._tilingScheme.rectangle;
      }
    },
    tileDiscardPolicy: {
      get: function get() {
        if (!this._ready) throw new w("tileDiscardPolicy must not be called before the imagery provider is ready.");
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
        return !1;
      }
    }
  }), r.prototype.getTileCredits = function (e, r, t) {
    if (!this._ready) throw new w("getTileCredits must not be called before the imagery provider is ready.");
    var i = this._metadata,
        a = i.getTileInformation(e, r, t);

    if (_(a)) {
      var o = i.providers[a.imageryProvider];
      if (_(o)) return [o];
    }
  }, r.prototype.requestImage = function (e, r, t, i) {
    if (!this._ready) throw new w("requestImage must not be called before the imagery provider is ready.");
    var o = this._tileDiscardPolicy._image,
        n = this._metadata,
        a = b.tileXYToQuadKey(e, r, t),
        s = n.getTileInformation(e, r, t);

    if (!_(s)) {
      if (n.isValid(a)) {
        var d = new P({
          throttle: i.throttle,
          throttleByServer: i.throttleByServer,
          type: i.type,
          priorityFunction: i.priorityFunction
        });
        return void n.populateSubtree(e, r, t, d);
      }

      return o;
    }

    if (!s.hasImagery()) return o;
    var h,
        l,
        u,
        c,
        m,
        y,
        g,
        p,
        f = (h = this, l = s, u = e, c = r, m = t, y = i, g = b.tileXYToQuadKey(u, c, m), p = l.imageryVersion, p = _(p) && 0 < p ? p : 1, h._metadata.resource.getDerivedResource({
      url: "flatfile?f1-0" + g + "-i." + p.toString(),
      request: y
    }).fetchArrayBuffer());
    return _(f) ? f.then(function (e) {
      v(n.key, e);
      var r,
          t,
          i = new Uint8Array(e),
          a = n.protoImagery;
      return _(a) && a || (t = function (e) {
        var r = "JFIF";
        if (e[6] === r.charCodeAt(0) && e[7] === r.charCodeAt(1) && e[8] === r.charCodeAt(2) && e[9] === r.charCodeAt(3)) return "image/jpeg";
        if (e[1] !== "PNG".charCodeAt(0) || e[2] !== "PNG".charCodeAt(1) || e[3] !== "PNG".charCodeAt(2)) return;
        return "image/png";
      }(i)), _(t) || _(a) && !a || (t = (r = function (e) {
        var r = E.Reader.create(e),
            t = r.len,
            i = {};

        for (; r.pos < t;) {
          var a = r.uint32();

          switch (a >>> 3) {
            case 1:
              i.imageType = r.uint32();
              break;

            case 2:
              i.imageData = r.bytes();
              break;

            case 3:
              i.alphaType = r.uint32();
              break;

            case 4:
              i.imageAlpha = r.bytes();
              break;

            case 5:
              var o = i.copyrightIds;
              if (_(o) || (o = i.copyrightIds = []), 2 == (7 & a)) for (var n = r.uint32() + r.pos; r.pos < n;) {
                o.push(r.uint32());
              } else o.push(r.uint32());
              break;

            default:
              r.skipType(7 & a);
          }
        }

        var s = i.imageType;
        if (_(s)) switch (s) {
          case 0:
            i.imageType = "image/jpeg";
            break;

          case 4:
            i.imageType = "image/png";
            break;

          default:
            throw new T("GoogleEarthEnterpriseImageryProvider: Unsupported image type.");
        }
        var d = i.alphaType;
        _(d) && 0 !== d && (console.log("GoogleEarthEnterpriseImageryProvider: External alpha not supported."), delete i.alphaType, delete i.imageAlpha);
        return i;
      }(i)).imageType, i = r.imageData), _(t) && _(i) ? C({
        uint8Array: i,
        format: t,
        flipY: !0
      }) : o;
    }) : void 0;
  }, r.prototype.pickFeatures = function (e, r, t, i, a) {}, r;
});