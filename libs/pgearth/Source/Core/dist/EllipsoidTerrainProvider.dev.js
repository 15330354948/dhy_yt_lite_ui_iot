"use strict";

define(["../ThirdParty/when", "./defaultValue", "./defined", "./defineProperties", "./Ellipsoid", "./Event", "./GeographicTilingScheme", "./HeightmapTerrainData", "./TerrainProvider"], function (n, t, i, e, r, o, l, a, h) {
  "use strict";

  function s(e) {
    e = t(e, {}), this._tilingScheme = e.tilingScheme, i(this._tilingScheme) || (this._tilingScheme = new l({
      ellipsoid: t(e.ellipsoid, r.WGS84)
    })), this._levelZeroMaximumGeometricError = h.getEstimatedLevelZeroGeometricErrorForAHeightmap(this._tilingScheme.ellipsoid, 64, this._tilingScheme.getNumberOfXTilesAtLevel(0)), this._errorEvent = new o(), this._readyPromise = n.resolve(!0);
  }

  return e(s.prototype, {
    errorEvent: {
      get: function get() {
        return this._errorEvent;
      }
    },
    credit: {
      get: function get() {}
    },
    tilingScheme: {
      get: function get() {
        return this._tilingScheme;
      }
    },
    ready: {
      get: function get() {
        return !0;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise;
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
    }
  }), s.prototype.requestTileGeometry = function (e, t, i, r) {
    return n.resolve(new a({
      buffer: new Uint8Array(256),
      width: 16,
      height: 16
    }));
  }, s.prototype.getLevelMaximumGeometricError = function (e) {
    return this._levelZeroMaximumGeometricError / (1 << e);
  }, s.prototype.getTileDataAvailable = function (e, t, i) {}, s.prototype.loadTileDataAvailability = function (e, t, i) {}, s;
});