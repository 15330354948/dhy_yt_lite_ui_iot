"use strict";

define(["../../Core/defined"], function (i) {
  "use strict";

  return function (e, n) {
    return i(e.extensionsUsed) && 0 <= e.extensionsUsed.indexOf(n);
  };
});