"use strict";

define(["../Core/freezeObject", "../Core/WebGLConstants"], function (e, T) {
  "use strict";

  var t = {
    DONT_CARE: T.DONT_CARE,
    FASTEST: T.FASTEST,
    NICEST: T.NICEST,
    validate: function validate(e) {
      return e === t.DONT_CARE || e === t.FASTEST || e === t.NICEST;
    }
  };
  return e(t);
});