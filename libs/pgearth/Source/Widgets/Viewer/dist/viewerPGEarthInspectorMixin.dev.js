"use strict";

define(["../../Core/defined", "../../Core/defineProperties", "../../Core/DeveloperError", "../PGEarthInspector/PGEarthInspector"], function (t, i, o, a) {
  "use strict";

  return function (e) {
    if (!t(e)) throw new o("viewer is required.");
    var r = document.createElement("div");
    r.className = "pgEarth-viewer-pgEarthInspectorContainer", e.container.appendChild(r);
    var n = new a(r, e.scene);
    i(e, {
      pgEarthInspector: {
        get: function get() {
          return n;
        }
      }
    });
  };
});