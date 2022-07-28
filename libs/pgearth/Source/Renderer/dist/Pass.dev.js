"use strict";

define(["../Core/freezeObject"], function (E) {
  "use strict";

  return E({
    ENVIRONMENT: 0,
    COMPUTE: 1,
    GLOBE: 2,
    TERRAIN_CLASSIFICATION: 3,
    PGEARTH_3D_TILE: 4,
    PGEARTH_3D_TILE_CLASSIFICATION: 5,
    PGEARTH_3D_TILE_CLASSIFICATION_IGNORE_SHOW: 6,
    OPAQUE: 7,
    TRANSLUCENT: 8,
    OVERLAY: 9,
    NUMBER_OF_PASSES: 10
  });
});