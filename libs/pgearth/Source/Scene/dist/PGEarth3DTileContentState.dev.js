"use strict";

define(["../Core/freezeObject"], function (e) {
  "use strict";

  return e({
    UNLOADED: 0,
    LOADING: 1,
    PROCESSING: 2,
    READY: 3,
    EXPIRED: 4,
    FAILED: 5
  });
});