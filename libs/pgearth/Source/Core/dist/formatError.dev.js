"use strict";

define(["./defined"], function (s) {
  "use strict";

  return function (n) {
    var e = n.name,
        t = n.message,
        r = s(e) && s(t) ? e + ": " + t : n.toString(),
        i = n.stack;
    return s(i) && (r += "\n" + i), r;
  };
});