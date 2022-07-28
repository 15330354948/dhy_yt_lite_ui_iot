"use strict";

define(["../Core/freezeObject", "../Core/WebGLConstants"], function (e, t) {
  "use strict";

  var n = {
    NEAREST: t.NEAREST,
    LINEAR: t.LINEAR,
    validate: function validate(e) {
      return e === n.NEAREST || e === n.LINEAR;
    }
  };
  return e(n);
});