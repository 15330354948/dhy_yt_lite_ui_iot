"use strict";

define(["../Core/freezeObject", "../Core/WebGLConstants"], function (E, R) {
  "use strict";

  var e = {
    CLAMP_TO_EDGE: R.CLAMP_TO_EDGE,
    REPEAT: R.REPEAT,
    MIRRORED_REPEAT: R.MIRRORED_REPEAT,
    validate: function validate(E) {
      return E === e.CLAMP_TO_EDGE || E === e.REPEAT || E === e.MIRRORED_REPEAT;
    }
  };
  return E(e);
});