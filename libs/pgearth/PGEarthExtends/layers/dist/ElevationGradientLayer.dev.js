"use strict";

define(["../../Source/Core/sampleTerrainMostDetailed", "../../Source/extends/layers/ElevationGradientImageryProvider", "../../Source/Core/createGuid", "../../Source/Core/defined", "../../Source/Core/DeveloperError"], function (e, r, i, o, n) {
  return function (a) {
    if (!o(a.viewer)) throw new n("viewer is required");
    var t = a.viewer.scene.terrainProvider;
    a.valueSampler = function (r, i) {
      return e(t, r).then(function (e) {
        return e.map(function (e) {
          return e.height;
        });
      });
    }, a.readyPromise = t.readyPromise;
    var d = new r(a);
    return d.id = a.id || i(), d;
  };
});