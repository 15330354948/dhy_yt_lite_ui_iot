"use strict";

define(["./defined"], function (t) {
  "use strict";

  return function (i, n) {
    this.positions = t(i) ? i : [], this.holes = t(n) ? n : [];
  };
});