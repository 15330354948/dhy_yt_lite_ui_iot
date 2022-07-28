"use strict";

define(["./barycentricCoordinates", "./Cartesian3"], function (i, n) {
  "use strict";

  var a = new n();
  return function (n, r, e, t) {
    return i(n, r, e, t, a), 0 < a.x && 0 < a.y && 0 < a.z;
  };
});