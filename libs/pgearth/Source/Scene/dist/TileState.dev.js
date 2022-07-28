"use strict";

define(["../Core/freezeObject"], function (e) {
  "use strict";

  return e({
    START: 0,
    LOADING: 1,
    READY: 2,
    UPSAMPLED_ONLY: 3
  });
});