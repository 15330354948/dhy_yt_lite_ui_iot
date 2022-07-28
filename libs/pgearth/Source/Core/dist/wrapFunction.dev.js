"use strict";

define(["./DeveloperError"], function (e) {
  "use strict";

  return function (n, o, t) {
    if ("function" != typeof o) throw new e("oldFunction is required to be a function.");
    if ("function" != typeof t) throw new e("oldFunction is required to be a function.");
    return function () {
      t.apply(n, arguments), o.apply(n, arguments);
    };
  };
});