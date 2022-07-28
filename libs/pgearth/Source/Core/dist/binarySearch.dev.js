"use strict";

define(["./Check"], function (o) {
  "use strict";

  return function (e, n, r) {
    o.defined("array", e), o.defined("itemToFind", n), o.defined("comparator", r);

    for (var i, t, f = 0, d = e.length - 1; f <= d;) {
      if ((t = r(e[i = ~~((f + d) / 2)], n)) < 0) f = 1 + i;else {
        if (!(0 < t)) return i;
        d = i - 1;
      }
    }

    return ~(d + 1);
  };
});