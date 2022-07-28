"use strict";

define(["./freezeObject", "./WebGLConstants"], function (I, N) {
  "use strict";

  var L = {
    POINTS: N.POINTS,
    LINES: N.LINES,
    LINE_LOOP: N.LINE_LOOP,
    LINE_STRIP: N.LINE_STRIP,
    TRIANGLES: N.TRIANGLES,
    TRIANGLE_STRIP: N.TRIANGLE_STRIP,
    TRIANGLE_FAN: N.TRIANGLE_FAN,
    validate: function validate(I) {
      return I === L.POINTS || I === L.LINES || I === L.LINE_LOOP || I === L.LINE_STRIP || I === L.TRIANGLES || I === L.TRIANGLE_STRIP || I === L.TRIANGLE_FAN;
    }
  };
  return I(L);
});