"use strict";

define(["../Core/freezeObject", "../Core/WebGLConstants"], function (E, A) {
  "use strict";

  var N = {
    NEAREST: A.NEAREST,
    LINEAR: A.LINEAR,
    NEAREST_MIPMAP_NEAREST: A.NEAREST_MIPMAP_NEAREST,
    LINEAR_MIPMAP_NEAREST: A.LINEAR_MIPMAP_NEAREST,
    NEAREST_MIPMAP_LINEAR: A.NEAREST_MIPMAP_LINEAR,
    LINEAR_MIPMAP_LINEAR: A.LINEAR_MIPMAP_LINEAR,
    validate: function validate(E) {
      return E === N.NEAREST || E === N.LINEAR || E === N.NEAREST_MIPMAP_NEAREST || E === N.LINEAR_MIPMAP_NEAREST || E === N.NEAREST_MIPMAP_LINEAR || E === N.LINEAR_MIPMAP_LINEAR;
    }
  };
  return E(N);
});