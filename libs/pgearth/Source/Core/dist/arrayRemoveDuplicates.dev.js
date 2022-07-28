"use strict";

define(["./Check", "./defaultValue", "./defined", "./Math"], function (h, s, a, e) {
  "use strict";

  var c = e.EPSILON10;
  return function (e, n, t) {
    if (h.defined("equalsEpsilon", n), a(e)) {
      t = s(t, !1);
      var r,
          i,
          f,
          u = e.length;
      if (u < 2) return e;

      for (r = 1; r < u && !n(i = e[r - 1], f = e[r], c); ++r) {
        ;
      }

      if (r === u) return t && n(e[0], e[e.length - 1], c) ? e.slice(1) : e;

      for (var l = e.slice(0, r); r < u; ++r) {
        n(i, f = e[r], c) || (l.push(f), i = f);
      }

      return t && 1 < l.length && n(l[0], l[l.length - 1], c) && l.shift(), l;
    }
  };
});