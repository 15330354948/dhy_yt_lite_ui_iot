"use strict";

define(["./defined"], function (r) {
  "use strict";

  var t = Array.isArray;
  return r(t) || (t = function t(r) {
    return "[object Array]" === Object.prototype.toString.call(r);
  }), t;
});