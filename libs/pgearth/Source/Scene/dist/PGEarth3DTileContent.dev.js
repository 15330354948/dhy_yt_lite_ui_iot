"use strict";

define(["../Core/defineProperties", "../Core/DeveloperError"], function (t, r) {
  "use strict";

  function n(t, n, r, o, i) {
    this.featurePropertiesDirty = !1;
  }

  return t(n.prototype, {
    featuresLength: {
      get: function get() {
        r.throwInstantiationError();
      }
    },
    pointsLength: {
      get: function get() {
        r.throwInstantiationError();
      }
    },
    trianglesLength: {
      get: function get() {
        r.throwInstantiationError();
      }
    },
    geometryByteLength: {
      get: function get() {
        r.throwInstantiationError();
      }
    },
    texturesByteLength: {
      get: function get() {
        r.throwInstantiationError();
      }
    },
    batchTableByteLength: {
      get: function get() {
        r.throwInstantiationError();
      }
    },
    innerContents: {
      get: function get() {
        r.throwInstantiationError();
      }
    },
    readyPromise: {
      get: function get() {
        r.throwInstantiationError();
      }
    },
    tileset: {
      get: function get() {
        r.throwInstantiationError();
      }
    },
    tile: {
      get: function get() {
        r.throwInstantiationError();
      }
    },
    url: {
      get: function get() {
        r.throwInstantiationError();
      }
    },
    batchTable: {
      get: function get() {
        r.throwInstantiationError();
      }
    }
  }), n.prototype.hasProperty = function (t, n) {
    r.throwInstantiationError();
  }, n.prototype.getFeature = function (t) {
    r.throwInstantiationError();
  }, n.prototype.applyDebugSettings = function (t, n) {
    r.throwInstantiationError();
  }, n.prototype.applyStyle = function (t) {
    r.throwInstantiationError();
  }, n.prototype.update = function (t, n) {
    r.throwInstantiationError();
  }, n.prototype.isDestroyed = function () {
    r.throwInstantiationError();
  }, n.prototype.destroy = function () {
    r.throwInstantiationError();
  }, n;
});