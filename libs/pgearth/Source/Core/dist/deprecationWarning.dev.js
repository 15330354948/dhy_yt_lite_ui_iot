"use strict";

define(["./defined", "./DeveloperError", "./oneTimeWarning"], function (r, i, t) {
  "use strict";

  return function (e, n) {
    if (!r(e) || !r(n)) throw new i("identifier and message are required.");
    t(e, n);
  };
});