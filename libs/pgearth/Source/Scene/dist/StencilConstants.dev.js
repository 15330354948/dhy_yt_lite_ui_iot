"use strict";

define(["../Core/freezeObject", "./StencilFunction", "./StencilOperation"], function (e, n, t) {
  "use strict";

  var E = {
    PGEARTH_3D_TILE_MASK: 128,
    SKIP_LOD_MASK: 112,
    SKIP_LOD_BIT_SHIFT: 4,
    CLASSIFICATION_MASK: 15,
    setPGEarth3DTileBit: function setPGEarth3DTileBit() {
      return {
        enabled: !0,
        frontFunction: n.ALWAYS,
        frontOperation: {
          fail: t.KEEP,
          zFail: t.KEEP,
          zPass: t.REPLACE
        },
        backFunction: n.ALWAYS,
        backOperation: {
          fail: t.KEEP,
          zFail: t.KEEP,
          zPass: t.REPLACE
        },
        reference: E.PGEARTH_3D_TILE_MASK,
        mask: E.PGEARTH_3D_TILE_MASK
      };
    }
  };
  return e(E);
});