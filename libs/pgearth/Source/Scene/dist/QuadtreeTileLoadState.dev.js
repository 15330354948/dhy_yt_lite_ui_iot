"use strict";

define(["../Core/freezeObject"], function (e) {
  "use strict";

  return e({
    START: 0,
    LOADING: 1,
    DONE: 2,
    FAILED: 3
  });
});