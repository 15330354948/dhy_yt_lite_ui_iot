"use strict";

define(["../Core/ApproximateTerrainHeights", "../Core/defined", "../Core/GroundPolylineGeometry"], function (r, t, i) {
  "use strict";

  return function (e, n) {
    return r.initialize().then(function () {
      return t(n) && (e = i.unpack(e, n)), i.createGeometry(e);
    });
  };
});