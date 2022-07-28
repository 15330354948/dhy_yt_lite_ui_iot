"use strict";

define(["./Check", "./defined", "./FeatureDetection"], function (u, a, o) {
  "use strict";

  return function (e, n, r) {
    if (u.defined("array", e), a(n) && u.typeOf.number("begin", n), a(r) && u.typeOf.number("end", r), "function" == typeof e.slice) return e.slice(n, r);

    for (var t = Array.prototype.slice.call(e, n, r), i = o.typedArrayTypes, f = i.length, c = 0; c < f; ++c) {
      if (e instanceof i[c]) {
        t = new i[c](t);
        break;
      }
    }

    return t;
  };
});