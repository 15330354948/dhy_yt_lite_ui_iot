"use strict";

define(["./freezeObject", "./WebGLConstants"], function (C, e) {
  "use strict";

  var t = {
    CLOCKWISE: e.CW,
    COUNTER_CLOCKWISE: e.CCW,
    validate: function validate(C) {
      return C === t.CLOCKWISE || C === t.COUNTER_CLOCKWISE;
    }
  };
  return C(t);
});