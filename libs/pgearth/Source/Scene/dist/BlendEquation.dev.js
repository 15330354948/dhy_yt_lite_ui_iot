"use strict";

define(["../Core/freezeObject", "../Core/WebGLConstants"], function (e, C) {
  "use strict";

  return e({
    ADD: C.FUNC_ADD,
    SUBTRACT: C.FUNC_SUBTRACT,
    REVERSE_SUBTRACT: C.FUNC_REVERSE_SUBTRACT,
    MIN: C.MIN,
    MAX: C.MAX
  });
});