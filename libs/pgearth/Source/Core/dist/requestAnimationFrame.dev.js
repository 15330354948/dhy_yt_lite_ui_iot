"use strict";

define(["./defined", "./getTimestamp"], function (o, r) {
  "use strict";

  if ("undefined" != typeof window) {
    var u = window.requestAnimationFrame;
    return function () {
      if (!o(u)) for (var n = ["webkit", "moz", "ms", "o"], e = 0, t = n.length; e < t && !o(u);) {
        u = window[n[e] + "RequestAnimationFrame"], ++e;
      }
      var i;
      o(u) || (i = 0, u = function u(n) {
        var e = r(),
            t = Math.max(1e3 / 60 - (e - i), 0);
        return i = e + t, setTimeout(function () {
          n(i);
        }, t);
      });
    }(), function (n) {
      return u(n);
    };
  }
});