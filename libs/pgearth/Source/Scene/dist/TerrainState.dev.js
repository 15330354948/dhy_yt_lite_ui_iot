"use strict";

define(["../Core/freezeObject"], function (e) {
  "use strict";

  return e({
    FAILED: 0,
    UNLOADED: 1,
    RECEIVING: 2,
    RECEIVED: 3,
    TRANSFORMING: 4,
    TRANSFORMED: 5,
    READY: 6
  });
});