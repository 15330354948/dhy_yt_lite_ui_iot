"use strict";

define(["../Core/freezeObject"], function (e) {
  "use strict";

  return e({
    UNISSUED: 0,
    ISSUED: 1,
    ACTIVE: 2,
    RECEIVED: 3,
    CANCELLED: 4,
    FAILED: 5
  });
});