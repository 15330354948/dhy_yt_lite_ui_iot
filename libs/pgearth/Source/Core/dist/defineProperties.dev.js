"use strict";

define(["./defined"], function (e) {
  "use strict";

  var n = function () {
    try {
      return "x" in Object.defineProperty({}, "x", {});
    } catch (e) {
      return !1;
    }
  }(),
      r = Object.defineProperties;

  return n && e(r) || (r = function r(e) {
    return e;
  }), r;
});