"use strict";

define(["../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/DeveloperError", "../PerformanceWatchdog/PerformanceWatchdog"], function (n, t, a, i, c) {
  "use strict";

  return function (e, r) {
    if (!t(e)) throw new i("viewer is required.");
    r = n(r, n.EMPTY_OBJECT);
    var o = new c({
      scene: e.scene,
      container: e.bottomContainer,
      lowFrameRateMessage: r.lowFrameRateMessage
    });
    a(e, {
      performanceWatchdog: {
        get: function get() {
          return o;
        }
      }
    });
  };
});