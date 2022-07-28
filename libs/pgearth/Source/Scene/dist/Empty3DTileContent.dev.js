"use strict";

define(["../Core/defineProperties", "../Core/destroyObject"], function (t, e) {
  "use strict";

  function n(t, e) {
    this._tileset = t, this._tile = e, this.featurePropertiesDirty = !1;
  }

  return t(n.prototype, {
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
      get: function get() {}
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
      get: function get() {}
    },
    batchTable: {
      get: function get() {}
    }
  }), n.prototype.hasProperty = function (t, e) {
    return !1;
  }, n.prototype.getFeature = function (t) {}, n.prototype.applyDebugSettings = function (t, e) {}, n.prototype.applyStyle = function (t) {}, n.prototype.update = function (t, e) {}, n.prototype.isDestroyed = function () {
    return !1;
  }, n.prototype.destroy = function () {
    return e(this);
  }, n;
});