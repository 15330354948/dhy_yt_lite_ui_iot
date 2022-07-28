"use strict";

define(["../ThirdParty/when", "./Credit", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Event", "./GeographicTilingScheme", "./GoogleEarthEnterpriseMetadata", "./GoogleEarthEnterpriseTerrainData", "./HeightmapTerrainData", "./JulianDate", "./Math", "./Rectangle", "./Request", "./RequestState", "./RequestType", "./Resource", "./RuntimeError", "./TaskProcessor", "./TileProviderError"], function (b, o, s, P, e, S, u, d, I, x, k, l, h, f, c, A, v, m, C, r, g) {
  "use strict";

  var R = 0,
      D = 1,
      F = 2,
      j = 3,
      y = new l();

  function T() {
    this._terrainCache = {}, this._lastTidy = l.now();
  }

  function t(e) {
    if (e = s(e, {}), !P(e.url) && !P(e.metadata)) throw new S("options.url or options.metadata is required.");
    var r, t;
    t = P(e.metadata) ? e.metadata : (r = m.createIfNeeded(e.url), new I(r)), this._metadata = t, this._tilingScheme = new d({
      numberOfLevelZeroTilesX: 2,
      numberOfLevelZeroTilesY: 2,
      rectangle: new f(-h.PI, -h.PI, h.PI, h.PI),
      ellipsoid: e.ellipsoid
    });
    var i = e.credit;
    "string" == typeof i && (i = new o(i)), this._credit = i, this._levelZeroMaximumGeometricError = 40075.16, this._terrainCache = new T(), this._terrainPromises = {}, this._terrainRequests = {}, this._errorEvent = new u(), this._ready = !1;
    var n,
        a = this;
    this._readyPromise = t.readyPromise.then(function (e) {
      if (t.terrainPresent) return g.handleSuccess(n), a._ready = e;
      var r = new C("The server " + t.url + " doesn't have terrain");
      return n = g.handleError(n, a, a._errorEvent, r.message, void 0, void 0, void 0, r), b.reject(r);
    }).otherwise(function (e) {
      return n = g.handleError(n, a, a._errorEvent, e.message, void 0, void 0, void 0, e), b.reject(e);
    });
  }

  T.prototype.add = function (e, r) {
    this._terrainCache[e] = {
      buffer: r,
      timestamp: l.now()
    };
  }, T.prototype.get = function (e) {
    var r = this._terrainCache[e];
    if (P(r)) return delete this._terrainCache[e], r.buffer;
  }, T.prototype.tidy = function () {
    if (l.now(y), 10 < l.secondsDifference(y, this._lastTidy)) {
      for (var e = this._terrainCache, r = Object.keys(e), t = r.length, i = 0; i < t; ++i) {
        var n = r[i],
            a = e[n];
        10 < l.secondsDifference(y, a.timestamp) && delete e[n];
      }

      l.clone(y, this._lastTidy);
    }
  }, e(t.prototype, {
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
    tilingScheme: {
      get: function get() {
        if (!this._ready) throw new S("tilingScheme must not be called before the imagery provider is ready.");
        return this._tilingScheme;
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
    hasWaterMask: {
      get: function get() {
        return !1;
      }
    },
    hasVertexNormals: {
      get: function get() {
        return !1;
      }
    },
    availability: {
      get: function get() {}
    }
  });
  var q = new r("decodeGoogleEarthEnterprisePacket", Number.POSITIVE_INFINITY);

  function G(e, r, t) {
    var i = r.getChildBitmask();
    if (r.terrainState === j) for (var n = i = 0; n < 4; ++n) {
      var a = t.getTileInformationFromQuadKey(e + n.toString());
      P(a) && a.hasTerrain() && (i |= 1 << n);
    }
    return i;
  }

  return t.prototype.requestTileGeometry = function (e, r, t, i) {
    if (!this._ready) throw new S("requestTileGeometry must not be called before the terrain provider is ready.");
    var n = I.tileXYToQuadKey(e, r, t),
        s = this._terrainCache,
        u = this._metadata,
        a = u.getTileInformationFromQuadKey(n);
    if (!P(a)) return b.reject(new C("Terrain tile doesn't exist"));
    var o = a.terrainState;
    P(o) || (o = a.terrainState = R);
    var d,
        l = s.get(n);

    if (P(l)) {
      var h = u.providers[a.terrainProvider];
      return b.resolve(new x({
        buffer: l,
        childTileMask: G(n, a, u),
        credits: P(h) ? [h] : void 0,
        negativeAltitudeExponentBias: u.negativeAltitudeExponentBias,
        negativeElevationThreshold: u.negativeAltitudeThreshold
      }));
    }

    if (s.tidy(), !a.ancestorHasTerrain) return b.resolve(new k({
      buffer: new Uint8Array(256),
      width: 16,
      height: 16
    }));
    if (o === D) return b.reject(new C("Terrain tile doesn't exist"));
    var f = n,
        c = -1;

    switch (o) {
      case F:
        c = a.terrainVersion;
        break;

      case j:
        f = f.substring(0, f.length - 1), c = (d = u.getTileInformationFromQuadKey(f)).terrainVersion;
        break;

      case R:
        a.hasTerrain() ? c = a.terrainVersion : (f = f.substring(0, f.length - 1), d = u.getTileInformationFromQuadKey(f), P(d) && d.hasTerrain() && (c = d.terrainVersion));
    }

    if (c < 0) return b.reject(new C("Terrain tile doesn't exist"));
    var v,
        m,
        g,
        y,
        T,
        p,
        _ = this._terrainPromises,
        w = this._terrainRequests;
    if (P(_[f])) v = _[f], m = w[f];else {
      var E = (g = this, y = f, p = m = i, T = P(T = c) && 0 < T ? T : 1, g._metadata.resource.getDerivedResource({
        url: "flatfile?f1c-0" + y + "-t." + T.toString(),
        request: p
      }).fetchArrayBuffer());
      if (!P(E)) return;
      v = E.then(function (e) {
        return P(e) ? q.scheduleTask({
          buffer: e,
          type: "Terrain",
          key: u.key
        }, [e]).then(function (e) {
          var r = u.getTileInformationFromQuadKey(f);
          r.terrainState = F, s.add(f, e[0]);

          for (var t = r.terrainProvider, i = e.length - 1, n = 0; n < i; ++n) {
            var a = f + n.toString(),
                o = u.getTileInformationFromQuadKey(a);
            P(o) && (s.add(a, e[n + 1]), o.terrainState = j, 0 === o.terrainProvider && (o.terrainProvider = t));
          }
        }) : b.reject(new C("Failed to load terrain."));
      }), _[f] = v, w[f] = m, v = v.always(function () {
        delete _[f], delete w[f];
      });
    }
    return v.then(function () {
      var e = s.get(n);

      if (P(e)) {
        var r = u.providers[a.terrainProvider];
        return new x({
          buffer: e,
          childTileMask: G(n, a, u),
          credits: P(r) ? [r] : void 0,
          negativeAltitudeExponentBias: u.negativeAltitudeExponentBias,
          negativeElevationThreshold: u.negativeAltitudeThreshold
        });
      }

      return b.reject(new C("Failed to load terrain."));
    }).otherwise(function (e) {
      return m.state === A.CANCELLED ? i.state = m.state : a.terrainState = D, b.reject(e);
    });
  }, t.prototype.getLevelMaximumGeometricError = function (e) {
    return this._levelZeroMaximumGeometricError / (1 << e);
  }, t.prototype.getTileDataAvailable = function (e, r, t) {
    var i,
        n = this._metadata,
        a = I.tileXYToQuadKey(e, r, t),
        o = n.getTileInformation(e, r, t);
    if (null === o) return !1;

    if (P(o)) {
      if (!o.ancestorHasTerrain) return !0;
      var s = o.terrainState;
      if (s === D) return !1;

      if (!(P(s) && s !== R || (o.terrainState = R, o.hasTerrain()))) {
        a = a.substring(0, a.length - 1);
        var u = n.getTileInformationFromQuadKey(a);
        if (!P(u) || !u.hasTerrain()) return !1;
      }

      return !0;
    }

    return n.isValid(a) && (i = new c({
      throttle: !0,
      throttleByServer: !0,
      type: v.TERRAIN
    }), n.populateSubtree(e, r, t, i)), !1;
  }, t.prototype.loadTileDataAvailability = function (e, r, t) {}, t;
});