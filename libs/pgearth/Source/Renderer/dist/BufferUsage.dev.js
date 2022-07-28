"use strict";

define(["../Core/freezeObject", "../Core/WebGLConstants"], function (A, e) {
  "use strict";

  var D = {
    STREAM_DRAW: e.STREAM_DRAW,
    STATIC_DRAW: e.STATIC_DRAW,
    DYNAMIC_DRAW: e.DYNAMIC_DRAW,
    validate: function validate(A) {
      return A === D.STREAM_DRAW || A === D.STATIC_DRAW || A === D.DYNAMIC_DRAW;
    }
  };
  return A(D);
});