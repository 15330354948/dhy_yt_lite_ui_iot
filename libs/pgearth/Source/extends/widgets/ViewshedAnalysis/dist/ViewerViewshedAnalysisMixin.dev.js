"use strict";

define(["./ViewshedAnalysis", "../../../Core/defined", "../../../Core/DeveloperError", "../../../Core/defineProperties"], function (n, t, o, s) {
  "use strict";

  return function (e) {
    if (!t(e)) throw new o("viewer is required.");
    var r = document.createElement("div");
    r.className = "PowerGis-PGViewshedContainer", e.container.appendChild(r);
    var i = new n(r, e);
    s(e, {
      viewshedAnalysis: {
        get: function get() {
          return i;
        }
      }
    });
  };
});