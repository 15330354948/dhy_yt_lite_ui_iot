"use strict";

define(["./defined"], function (o) {
  "use strict";

  if ("undefined" != typeof window) {
    var t = window.cancelAnimationFrame;
    return function () {
      if (!o(t)) for (var n = ["webkit", "moz", "ms", "o"], e = 0, i = n.length; e < i && !o(t);) {
        t = window[n[e] + "CancelAnimationFrame"], o(t) || (t = window[n[e] + "CancelRequestAnimationFrame"]), ++e;
      }
      o(t) || (t = clearTimeout);
    }(), function (n) {
      t(n);
    };
  }
});