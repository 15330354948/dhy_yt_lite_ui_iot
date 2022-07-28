"use strict";

define(["../Core/defaultValue", "../Core/defineProperties", "../Core/destroyObject", "../Core/getStringFromTypedArray", "../Core/RuntimeError", "../ThirdParty/when"], function (u, t, e, s, c, i) {
  "use strict";

  function r(t, e, r, n, o) {
    this._tileset = t, this._tile = e, this._resource = r, this._readyPromise = i.defer(), this.featurePropertiesDirty = !1, function (e, t, r) {
      r = u(r, 0);
      var n,
          o = new Uint8Array(t),
          i = s(o, r);

      try {
        n = JSON.parse(i);
      } catch (t) {
        return e._readyPromise.reject(new c("Invalid tile content."));
      }

      e._tileset.loadTileset(e._resource, n, e._tile), e._readyPromise.resolve(e);
    }(this, n, o);
  }

  return t(r.prototype, {
    featuresLength: {
      get: function get() {
        return 0;
      }
    },
    pointsLength: {
      get: function get() {
        return 0;
      }
    },
    trianglesLength: {
      get: function get() {
        return 0;
      }
    },
    geometryByteLength: {
      get: function get() {
        return 0;
      }
    },
    texturesByteLength: {
      get: function get() {
        return 0;
      }
    },
    batchTableByteLength: {
      get: function get() {
        return 0;
      }
    },
    innerContents: {
      get: function get() {}
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
      }
    },
    tileset: {
      get: function get() {
        return this._tileset;
      }
    },
    tile: {
      get: function get() {
        return this._tile;
      }
    },
    url: {
      get: function get() {
        return this._resource.getUrlComponent(!0);
      }
    },
    batchTable: {
      get: function get() {}
    }
  }), r.prototype.hasProperty = function (t, e) {
    return !1;
  }, r.prototype.getFeature = function (t) {}, r.prototype.applyDebugSettings = function (t, e) {}, r.prototype.applyStyle = function (t) {}, r.prototype.update = function (t, e) {}, r.prototype.isDestroyed = function () {
    return !1;
  }, r.prototype.destroy = function () {
    return e(this);
  }, r;
});