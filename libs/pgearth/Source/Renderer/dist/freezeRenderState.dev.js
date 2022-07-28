"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define(["../Core/freezeObject"], function (u) {
  "use strict";

  return function e(t) {
    if ("object" != _typeof(t) || null === t) return t;

    for (var n, r = Object.keys(t), o = 0; o < r.length; o++) {
      n = r[o], t.hasOwnProperty(n) && "_applyFunctions" !== n && (t[n] = e(t[n]));
    }

    return u(t);
  };
});