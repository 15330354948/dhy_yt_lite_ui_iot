"use strict";

define(["./freezeObject", "./JulianDate", "./TimeInterval"], function (e, t, r) {
  "use strict";

  var M = e(t.fromIso8601("0000-01-01T00:00:00Z")),
      I = e(t.fromIso8601("9999-12-31T24:00:00Z"));
  return {
    MINIMUM_VALUE: M,
    MAXIMUM_VALUE: I,
    MAXIMUM_INTERVAL: e(new r({
      start: M,
      stop: I
    }))
  };
});