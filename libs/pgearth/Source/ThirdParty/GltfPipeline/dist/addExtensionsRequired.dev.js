"use strict";

define(["./addExtensionsUsed", "./addToArray", "../../Core/defined"], function (i, r, s) {
  "use strict";

  return function (e, n) {
    var d = e.extensionsRequired;
    s(d) || (d = [], e.extensionsRequired = d), r(d, n, !0), i(e, n);
  };
});