"use strict";

define(["../../Core/defined"], function (d) {
  "use strict";

  return function (e, n) {
    var i,
        t = e.extensionsRequired;
    d(t) && (0 <= (i = t.indexOf(n)) && t.splice(i, 1), 0 === t.length && delete e.extensionsRequired);
  };
});