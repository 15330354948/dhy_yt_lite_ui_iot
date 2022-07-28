"use strict";

define(["./defined", "./DeveloperError", "./isArray"], function (p, s, c) {
  "use strict";

  return function (e) {
    if (!p(e)) throw new s("queryString is required.");
    var r = {};
    if ("" === e) return r;

    for (var n = e.replace(/\+/g, "%20").split(/[&;]/), t = 0, i = n.length; t < i; ++t) {
      var o = n[t].split("="),
          u = decodeURIComponent(o[0]),
          d = o[1],
          d = p(d) ? decodeURIComponent(d) : "",
          f = r[u];
      "string" == typeof f ? r[u] = [f, d] : c(f) ? f.push(d) : r[u] = d;
    }

    return r;
  };
});