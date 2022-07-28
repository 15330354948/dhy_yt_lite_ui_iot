"use strict";

define(["./addToArray", "../../Core/defined"], function (d, i) {
  "use strict";

  return function (e, n) {
    var s = e.extensionsUsed;
    i(s) || (s = [], e.extensionsUsed = s), d(s, n, !0);
  };
});