"use strict";

define(["./defineProperties", "./DeveloperError"], function (t, r) {
  "use strict";

  function e(t) {
    throw new r("This type should not be instantiated directly.  Instead, use WebMercatorTilingScheme or GeographicTilingScheme.");
  }

  return t(e.prototype, {
    ellipsoid: {
      get: r.throwInstantiationError
    },
    rectangle: {
      get: r.throwInstantiationError
    },
    projection: {
      get: r.throwInstantiationError
    }
  }), e.prototype.getNumberOfXTilesAtLevel = r.throwInstantiationError, e.prototype.getNumberOfYTilesAtLevel = r.throwInstantiationError, e.prototype.rectangleToNativeRectangle = r.throwInstantiationError, e.prototype.tileXYToNativeRectangle = r.throwInstantiationError, e.prototype.tileXYToRectangle = r.throwInstantiationError, e.prototype.positionToTileXY = r.throwInstantiationError, e;
});