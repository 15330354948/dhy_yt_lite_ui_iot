"use strict";

define([], function () {
  "use strict";

  return function (n, t) {
    return 0 != (n & t);
  };
});