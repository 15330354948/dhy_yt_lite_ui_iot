"use strict";

define(["./defaultValue", "./DeveloperError"], function (o, i) {
  "use strict";

  function u() {
    return !0;
  }

  return function (e, t) {
    function n() {
      throw new i(t);
    }

    for (var r in t = o(t, "This object was destroyed, i.e., destroy() was called."), e) {
      "function" == typeof e[r] && (e[r] = n);
    }

    e.isDestroyed = u;
  };
});