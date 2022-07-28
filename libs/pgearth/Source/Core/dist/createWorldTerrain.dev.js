"use strict";

define(["./PGEarthTerrainProvider", "./defaultValue", "./IonResource"], function (r, t, s) {
  "use strict";

  return function (e) {
    return e = t(e, t.EMPTY_OBJECT), new r({
      url: s.fromAssetId(1),
      requestVertexNormals: t(e.requestVertexNormals, !1),
      requestWaterMask: t(e.requestWaterMask, !1)
    });
  };
});