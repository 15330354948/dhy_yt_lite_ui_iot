"use strict";

define(["../Core/freezeObject", "../Core/WebGLConstants"], function (E, R) {
  "use strict";

  return E({
    ZERO: R.ZERO,
    KEEP: R.KEEP,
    REPLACE: R.REPLACE,
    INCREMENT: R.INCR,
    DECREMENT: R.DECR,
    INVERT: R.INVERT,
    INCREMENT_WRAP: R.INCR_WRAP,
    DECREMENT_WRAP: R.DECR_WRAP
  });
});