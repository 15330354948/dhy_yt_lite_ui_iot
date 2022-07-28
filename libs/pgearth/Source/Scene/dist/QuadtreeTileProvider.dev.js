"use strict";

define(["../Core/defineProperties", "../Core/DeveloperError"], function (t, r) {
  "use strict";

  function o() {
    r.throwInstantiationError();
  }

  return o.computeDefaultLevelZeroMaximumGeometricError = function (t) {
    return 2 * t.ellipsoid.maximumRadius * Math.PI * .25 / (65 * t.getNumberOfXTilesAtLevel(0));
  }, t(o.prototype, {
    quadtree: {
      get: r.throwInstantiationError,
      set: r.throwInstantiationError
    },
    ready: {
      get: r.throwInstantiationError
    },
    tilingScheme: {
      get: r.throwInstantiationError
    },
    errorEvent: {
      get: r.throwInstantiationError
    }
  }), o.prototype.update = r.throwInstantiationError, o.prototype.beginUpdate = r.throwInstantiationError, o.prototype.endUpdate = r.throwInstantiationError, o.prototype.getLevelMaximumGeometricError = r.throwInstantiationError, o.prototype.loadTile = r.throwInstantiationError, o.prototype.computeTileVisibility = r.throwInstantiationError, o.prototype.showTileThisFrame = r.throwInstantiationError, o.prototype.computeDistanceToTile = r.throwInstantiationError, o.prototype.isDestroyed = r.throwInstantiationError, o.prototype.destroy = r.throwInstantiationError, o;
});