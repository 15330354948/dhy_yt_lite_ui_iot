"use strict";

define(function () {
  "use strict";

  var n = "undefined" != typeof performance && "function" == typeof performance.now && isFinite(performance.now()) ? function () {
    return performance.now();
  } : function () {
    return Date.now();
  };
  return n;
});