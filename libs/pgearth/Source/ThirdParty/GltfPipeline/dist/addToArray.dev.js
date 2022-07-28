"use strict";

define(["../../Core/defaultValue"], function (u) {
  "use strict";

  return function (e, n, r) {
    if (r = u(r, !1)) {
      var t = e.indexOf(n);
      if (-1 < t) return t;
    }

    return e.push(n), e.length - 1;
  };
});