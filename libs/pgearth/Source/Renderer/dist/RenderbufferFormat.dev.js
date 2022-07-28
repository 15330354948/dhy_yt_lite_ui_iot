"use strict";

define(["../Core/freezeObject", "../Core/WebGLConstants"], function (E, N) {
  "use strict";

  var T = {
    RGBA4: N.RGBA4,
    RGB5_A1: N.RGB5_A1,
    RGB565: N.RGB565,
    DEPTH_COMPONENT16: N.DEPTH_COMPONENT16,
    STENCIL_INDEX8: N.STENCIL_INDEX8,
    DEPTH_STENCIL: N.DEPTH_STENCIL,
    validate: function validate(E) {
      return E === T.RGBA4 || E === T.RGB5_A1 || E === T.RGB565 || E === T.DEPTH_COMPONENT16 || E === T.STENCIL_INDEX8 || E === T.DEPTH_STENCIL;
    }
  };
  return E(T);
});