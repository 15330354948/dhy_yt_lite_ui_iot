"use strict";

define(["./Check", "./defaultValue", "./defined"], function (l, h, m) {
  "use strict";

  return function (e, n, t, f) {
    if (l.defined("array", e), l.defined("value", n), m(t) && l.typeOf.number("start", t), m(f) && l.typeOf.number("end", f), "function" == typeof e.fill) return e.fill(n, t, f);

    for (var r = e.length >>> 0, a = h(t, 0), i = a < 0 ? Math.max(r + a, 0) : Math.min(a, r), u = h(f, r), d = u < 0 ? Math.max(r + u, 0) : Math.min(u, r); i < d;) {
      e[i] = n, i++;
    }

    return e;
  };
});