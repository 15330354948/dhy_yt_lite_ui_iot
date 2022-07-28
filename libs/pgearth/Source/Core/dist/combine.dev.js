"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define(["./defaultValue", "./defined"], function (s, y) {
  "use strict";

  return function e(r, t, n) {
    n = s(n, !1);
    var o,
        f,
        i,
        a = {},
        u = y(r),
        p = y(t);
    if (u) for (o in r) {
      r.hasOwnProperty(o) && (f = r[o], p && n && "object" == _typeof(f) && t.hasOwnProperty(o) ? (i = t[o], a[o] = "object" == _typeof(i) ? e(f, i, n) : f) : a[o] = f);
    }
    if (p) for (o in t) {
      t.hasOwnProperty(o) && !a.hasOwnProperty(o) && (i = t[o], a[o] = i);
    }
    return a;
  };
});