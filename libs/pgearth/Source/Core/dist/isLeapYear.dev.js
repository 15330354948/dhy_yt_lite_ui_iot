"use strict";

define(["./DeveloperError"], function (r) {
  "use strict";

  return function (e) {
    if (null === e || isNaN(e)) throw new r("year is required and must be a number.");
    return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
  };
});