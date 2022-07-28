"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define(["./defaultValue"], function (f) {
  "use strict";

  return function r(n, t) {
    if (null === n || "object" != _typeof(n)) return n;
    t = f(t, !1);
    var e,
        u = new n.constructor();

    for (var o in n) {
      n.hasOwnProperty(o) && (e = n[o], t && (e = r(e, t)), u[o] = e);
    }

    return u;
  };
});