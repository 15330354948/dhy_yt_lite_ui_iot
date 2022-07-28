"use strict";

define(["../Core/freezeObject", "../Core/WebGLConstants"], function (E, A) {
  "use strict";

  return E({
    NEVER: A.NEVER,
    LESS: A.LESS,
    EQUAL: A.EQUAL,
    LESS_OR_EQUAL: A.LEQUAL,
    GREATER: A.GREATER,
    NOT_EQUAL: A.NOTEQUAL,
    GREATER_OR_EQUAL: A.GEQUAL,
    ALWAYS: A.ALWAYS
  });
});