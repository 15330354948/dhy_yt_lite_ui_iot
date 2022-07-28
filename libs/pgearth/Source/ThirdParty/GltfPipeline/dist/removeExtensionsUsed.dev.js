"use strict";

define(["./removeExtensionsRequired", "../../Core/defined"], function (t, d) {
  "use strict";

  return function (e, n) {
    var i,
        s = e.extensionsUsed;
    d(s) && (0 <= (i = s.indexOf(n)) && s.splice(i, 1), t(e, n), 0 === s.length && delete e.extensionsUsed);
  };
});