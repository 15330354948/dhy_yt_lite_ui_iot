"use strict";

define([], function () {
  "use strict";

  return function (r) {
    var n = {};
    if (!r) return n;

    for (var t = r.split("\r\n"), i = 0; i < t.length; ++i) {
      var e,
          u,
          s = t[i],
          f = s.indexOf(": ");
      0 < f && (e = s.substring(0, f), u = s.substring(f + 2), n[e] = u);
    }

    return n;
  };
});