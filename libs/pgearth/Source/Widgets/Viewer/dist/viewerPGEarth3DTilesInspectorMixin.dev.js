"use strict";

define(["../../Core/Check", "../../Core/defineProperties", "../PGEarth3DTilesInspector/PGEarth3DTilesInspector"], function (n, i, c) {
  "use strict";

  return function (e) {
    n.typeOf.object("viewer", e);
    var r = document.createElement("div");
    r.className = "pgEarth-viewer-pgEarth3DTilesInspectorContainer", e.container.appendChild(r);
    var t = new c(r, e.scene);
    i(e, {
      pgEarth3DTilesInspector: {
        get: function get() {
          return t;
        }
      }
    });
  };
});