"use strict";

define(["./freezeObject"], function (e) {
  "use strict";

  return e({
    OUTSIDE: -1,
    INTERSECTING: 0,
    INSIDE: 1
  });
});