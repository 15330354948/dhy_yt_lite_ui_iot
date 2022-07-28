"use strict";

define(["./defined", "./DeveloperError", "./isArray"], function (c, d, s) {
  "use strict";

  return function (e) {
    if (!c(e)) throw new d("obj is required.");
    var r = "";

    for (var n in e) {
      if (e.hasOwnProperty(n)) {
        var o = e[n],
            i = encodeURIComponent(n) + "=";
        if (s(o)) for (var t = 0, f = o.length; t < f; ++t) {
          r += i + encodeURIComponent(o[t]) + "&";
        } else r += i + encodeURIComponent(o) + "&";
      }
    }

    return r = r.slice(0, -1);
  };
});