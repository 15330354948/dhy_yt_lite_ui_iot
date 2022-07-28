"use strict";

define(["./defined", "./defineProperties", "./DeveloperError", "./Math"], function (g, t, m, u) {
  "use strict";

  function o() {
    m.throwInstantiationError();
  }

  t(o.prototype, {
    errorEvent: {
      get: m.throwInstantiationError
    },
    credit: {
      get: m.throwInstantiationError
    },
    tilingScheme: {
      get: m.throwInstantiationError
    },
    ready: {
      get: m.throwInstantiationError
    },
    readyPromise: {
      get: m.throwInstantiationError
    },
    hasWaterMask: {
      get: m.throwInstantiationError
    },
    hasVertexNormals: {
      get: m.throwInstantiationError
    },
    availability: {
      get: m.throwInstantiationError
    }
  });
  var w = [];
  return o.getRegularGridIndices = function (t, r) {
    if (t * r >= u.SIXTY_FOUR_KILOBYTES) throw new m("The total number of vertices (width * height) must be less than 65536.");
    var e = w[t];
    g(e) || (w[t] = e = []);
    var o = e[r];

    if (!g(o)) {
      o = e[r] = new Uint16Array((t - 1) * (r - 1) * 6);

      for (var i = 0, a = 0, n = 0; n < r - 1; ++n) {
        for (var h = 0; h < t - 1; ++h) {
          var s = i + t,
              l = s + 1,
              E = i + 1;
          o[a++] = i, o[a++] = s, o[a++] = E, o[a++] = E, o[a++] = s, o[a++] = l, ++i;
        }

        ++i;
      }
    }

    return o;
  }, o.heightmapTerrainQuality = .25, o.getEstimatedLevelZeroGeometricErrorForAHeightmap = function (t, r, e) {
    return 2 * t.maximumRadius * Math.PI * o.heightmapTerrainQuality / (r * e);
  }, o.prototype.requestTileGeometry = m.throwInstantiationError, o.prototype.getLevelMaximumGeometricError = m.throwInstantiationError, o.prototype.getTileDataAvailable = m.throwInstantiationError, o.prototype.loadTileDataAvailability = m.throwInstantiationError, o;
});